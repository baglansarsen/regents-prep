/**
 * useStudyTime — tracks active study + quiz session time, awards RP drip,
 * fires milestone bonuses, and persists daily totals to AsyncStorage + Firestore.
 *
 * Usage:
 *   const { startSession, endSession, sessionSeconds, todaySeconds, formatTime } =
 *     useStudyTime(uid, earnXP, onMilestone)
 */
import { useState, useEffect, useRef, useCallback } from 'react'
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { localDateStr, daysAgoStr } from '../utils/localDate'

// ── Constants ─────────────────────────────────────────────────────────────────
export const MILESTONES = [
  { seconds: 600,  rp: 10, label: '10 min',  reaction: 'celebrate',   message: "10 minutes of studying! Keep it up! 🎉" },
  { seconds: 1800, rp: 25, label: '30 min',  reaction: 'happy_dance', message: "30 minutes! You're on fire! 🔥" },
  { seconds: 3600, rp: 50, label: '1 hour',  reaction: 'cheer',       message: "ONE HOUR! Legendary! 🏆" },
]
const RP_DRIP_INTERVAL = 60      // award 1 RP every 60 seconds
const SAVE_INTERVAL    = 30      // persist to storage every 30 seconds

function todayKey() {
  return localDateStr()          // local 'YYYY-MM-DD'
}

function asKey(uid) {
  return `@studyTime_v1_${uid}`
}

// ── formatTime ────────────────────────────────────────────────────────────────
export function formatTime(seconds) {
  if (!seconds || seconds <= 0) return '0m'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return `${s}s`
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useStudyTime(uid, earnRP, onMilestone) {
  const [sessionSeconds, setSessionSeconds] = useState(0)
  const [todaySeconds,   setTodaySeconds]   = useState(0)
  const [allTimeSeconds, setAllTimeSeconds] = useState(0)

  // Refs to avoid stale closures in intervals
  const sessionRef    = useRef(0)
  const activeRef     = useRef(false)
  const sessionType   = useRef('study')
  const intervalRef   = useRef(null)
  const drip60Ref     = useRef(0)      // seconds-since-last-RP-drip
  const saveCountRef  = useRef(0)      // seconds-since-last-persist
  const hitMilestones = useRef(new Set())
  const todayRef      = useRef(0)
  const allTimeRef    = useRef(0)
  const uidRef        = useRef(uid)
  uidRef.current = uid

  // ── Load persisted totals from storage ─────────────────────────────────────
  // Exposed as reloadTotals so a read-only consumer (e.g. the Home pill) can
  // refresh on focus and reflect a session another screen just finished, instead
  // of showing the mount-time snapshot until the app restarts.
  const reloadTotals = useCallback(async () => {
    const id = uidRef.current
    if (!id) return
    // Don't stomp a session in progress — its live counters are the truth.
    if (intervalRef.current) return
    try {
      const raw = await AsyncStorage.getItem(asKey(id))
      if (!raw) return
      const data = JSON.parse(raw)
      allTimeRef.current = data.allTime ?? 0
      setAllTimeSeconds(allTimeRef.current)

      // Sum today's seconds from dailyLog
      const today = todayKey()
      const todayEntry = (data.dailyLog ?? []).find((e) => e.date === today)
      const todaySecs  = todayEntry ? (todayEntry.study ?? 0) + (todayEntry.quiz ?? 0) : 0
      todayRef.current = todaySecs
      setTodaySeconds(todaySecs)
    } catch {}
  }, [])

  useEffect(() => { reloadTotals() }, [uid, reloadTotals])

  // ── AppState listener: pause on background ─────────────────────────────────
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'background' || state === 'inactive') {
        activeRef.current = false
      } else if (state === 'active') {
        activeRef.current = !!intervalRef.current  // resume only if session open
      }
    })
    return () => sub.remove()
  }, [])

  // ── Persist to AsyncStorage + Firestore ───────────────────────────────────
  const persist = useCallback(async (addedSeconds, type) => {
    const uid = uidRef.current
    if (!uid) return
    try {
      const key  = asKey(uid)
      const raw  = await AsyncStorage.getItem(key)
      const data = raw ? JSON.parse(raw) : { allTime: 0, dailyLog: [] }
      const today = todayKey()
      let log = data.dailyLog ?? []

      // Prune to last 7 days (local boundary)
      const cutoff = daysAgoStr(7)
      log = log.filter((e) => e.date >= cutoff)

      const idx = log.findIndex((e) => e.date === today)
      if (idx >= 0) {
        log[idx] = { ...log[idx], [type]: (log[idx][type] ?? 0) + addedSeconds }
      } else {
        log.push({ date: today, study: type === 'study' ? addedSeconds : 0, quiz: type === 'quiz' ? addedSeconds : 0 })
      }

      const newAllTime = (data.allTime ?? 0) + addedSeconds
      const updated = { allTime: newAllTime, dailyLog: log }
      await AsyncStorage.setItem(key, JSON.stringify(updated))

      // Mirror total to Firestore
      await setDoc(doc(db, 'users', uid, 'meta', 'studyTime'), { allTime: newAllTime }, { merge: true })
    } catch {}
  }, [])

  // ── startSession ──────────────────────────────────────────────────────────
  const startSession = useCallback((type = 'study') => {
    if (intervalRef.current) return   // already running
    sessionRef.current    = 0
    drip60Ref.current     = 0
    saveCountRef.current  = 0
    sessionType.current   = type
    activeRef.current     = true
    hitMilestones.current = new Set()
    setSessionSeconds(0)

    intervalRef.current = setInterval(() => {
      if (!activeRef.current) return   // paused (background)

      sessionRef.current += 1
      const secs = sessionRef.current
      setSessionSeconds(secs)

      // RP drip: 1 RP per minute
      drip60Ref.current += 1
      if (drip60Ref.current >= RP_DRIP_INTERVAL) {
        drip60Ref.current = 0
        earnRP?.(1)
      }

      // Milestone bonuses
      for (const m of MILESTONES) {
        if (secs >= m.seconds && !hitMilestones.current.has(m.seconds)) {
          hitMilestones.current.add(m.seconds)
          earnRP?.(m.rp)
          onMilestone?.(m)
        }
      }

      // Periodic persist (every SAVE_INTERVAL seconds)
      saveCountRef.current += 1
      if (saveCountRef.current >= SAVE_INTERVAL) {
        const saved = saveCountRef.current
        saveCountRef.current = 0
        todayRef.current += saved
        allTimeRef.current += saved
        setTodaySeconds(todayRef.current)
        setAllTimeSeconds(allTimeRef.current)
        persist(saved, sessionType.current)
      }
    }, 1000)
  }, [earnRP, onMilestone, persist])

  // ── endSession ────────────────────────────────────────────────────────────
  const endSession = useCallback(() => {
    if (!intervalRef.current) return { seconds: 0, type: sessionType.current }
    clearInterval(intervalRef.current)
    intervalRef.current = null
    activeRef.current   = false

    const finalSeconds = sessionRef.current
    const type         = sessionType.current

    // Persist the remaining unsaved seconds
    const remainder = saveCountRef.current
    if (remainder > 0) {
      todayRef.current   += remainder
      allTimeRef.current += remainder
      setTodaySeconds(todayRef.current)
      setAllTimeSeconds(allTimeRef.current)
      persist(remainder, type)
    }

    setSessionSeconds(0)
    sessionRef.current = 0
    return { seconds: finalSeconds, type }
  }, [persist])

  return {
    startSession,
    endSession,
    reloadTotals,
    sessionSeconds,
    todaySeconds,
    allTimeSeconds,
    formatTime,
    MILESTONES,
  }
}
