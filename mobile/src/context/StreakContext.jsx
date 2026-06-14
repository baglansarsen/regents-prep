import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../firebase'
import { useAuthContext } from './AuthContext'
import { logActivity } from '../utils/activityLogger'
import { localDateStr, yesterdayStr, daysAgoStr, last7Days } from '../utils/localDate'
import { computeStreak, computeMarkStudied, HISTORY_DAYS, MAX_FREEZE } from '../utils/streakMath'

/**
 * StreakContext — single source of truth for the daily study streak.
 *
 * Previously useDailyStreak() ran independently in ~11 screens, each with its
 * own useState. That meant completing a lesson in QuizScreen never updated the
 * streak shown on Home or in the top bar until an app restart, and the
 * celebration (which lives on Home) could not react to a lesson finished
 * elsewhere. This provider holds the state once so every consumer stays in sync.
 *
 * Trigger model (hybrid, Duolingo-style): opening the app does NOT extend the
 * streak. Completing the first lesson of the day (markStudied) extends it and
 * emits a `continued` celebration event. Passive events — `freeze_used` (a
 * missed day saved by a freeze) and `broken` (streak lost) — are detected at
 * load and surfaced once per session.
 */

const AS_KEY     = '@regents_streak_v1'
const FREEZE_KEY = '@streakFreeze_v2'   // v2: stores a count string ('0'|'1'|'2') instead of boolean
export const FREEZE_COST = 200          // RP to buy one streak freeze

// ── Date helpers ────────────────────────────────────────────────────────────
// All day boundaries are LOCAL (see utils/localDate). `todayStr` is kept as a
// thin local alias so the rest of this file reads unchanged. The freeze-aware
// streak math (computeStreak/computeMarkStudied) and the MILESTONES/HISTORY_DAYS/
// MAX_FREEZE constants now live in utils/streakMath so tests share the real code.
const todayStr = localDateStr

const StreakContext = createContext(null)

export function StreakProvider({ children }) {
  const { user } = useAuthContext()
  const uid = user?.uid

  const [streak,        setStreak]        = useState(0)
  const [studiedToday,  setStudiedToday]  = useState(false)
  const [studiedDates,  setStudiedDates]  = useState([])
  const [frozenDates,   setFrozenDates]   = useState([])  // days a freeze saved (calendar 🧊)
  const [freezeCount,   setFreezeCount]   = useState(0)   // 0–2 stored freezes
  const [longestStreak, setLongestStreak] = useState(0)
  const [pendingEvent,  setPendingEvent]  = useState(null)

  // Always-current snapshot so markStudied/repair can compute without stale
  // closures or nested setState updaters.
  const dataRef = useRef(null)

  // ── Load streak + freeze together (avoids a race) ──────────────────────────
  useEffect(() => {
    if (!uid) {
      setStreak(0); setStudiedToday(false); setStudiedDates([]); setFrozenDates([])
      setFreezeCount(0); setLongestStreak(0); setPendingEvent(null)
      dataRef.current = null
      return
    }
    let cancelled = false

    // ── Optimistic paint from AsyncStorage (instant, ~5ms) ────────────────────
    // Show the locally-cached streak immediately so the home screen isn't blank
    // while Firestore responds. The Promise.all below overwrites this if needed.
    AsyncStorage.getItem(AS_KEY).then((raw) => {
      if (cancelled || !raw) return
      try {
        const cached = JSON.parse(raw)
        const r = computeStreak(cached, 0) // freeze unknown yet — conservative (no bridging)
        if (!dataRef.current) {
          // Don't optimistically flash a streak down to 0: with the freeze count
          // still unknown a freeze may yet bridge the gap, and the authoritative
          // load below settles the true value. Paint the number only when the
          // cache alone proves the streak is alive (studied today/yesterday) or
          // there's genuinely nothing to lose (cached streak already 0).
          const wouldDowngrade = r.streak === 0 && (cached.streak ?? 0) > 0
          if (!wouldDowngrade) {
            setStreak(r.streak)
            setStudiedToday(r.studiedToday)
          }
          setStudiedDates(cached.studiedDates ?? [])
          setFrozenDates(cached.frozenDates ?? [])
          setLongestStreak(cached.longestStreak ?? r.streak)
          dataRef.current = cached
        }
      } catch {}
    }).catch(() => {})

    Promise.all([loadStreak(uid), AsyncStorage.getItem(FREEZE_KEY), loadFirestoreFreeze(uid)]).then(([data, freezeRaw, remoteFreeze]) => {
      if (cancelled) return
      // Freezes are a paid (RP) item, so the cloud value must win on reinstall /
      // new device where AsyncStorage is empty. Reconcile local + remote by taking
      // the larger (never silently destroy a purchased freeze), clamp to the cap,
      // then write the reconciled value back to local cache so both agree.
      const localCount = Math.max(0, parseInt(freezeRaw ?? '0', 10) || 0)
      const count = Math.min(MAX_FREEZE, Math.max(localCount, remoteFreeze ?? 0))
      setFreezeCount(count)
      if (count !== localCount) AsyncStorage.setItem(FREEZE_KEY, String(count)).catch(() => {})

      // Race guard: if a lesson was completed while this load was in flight,
      // markStudied() already extended the streak to today and persisted it.
      // That in-memory state is now the freshest truth, so don't let the
      // resolving (pre-lesson) read overwrite it and silently drop the extension.
      const studiedTodayAlready = dataRef.current?.lastDate === todayStr()

      if (!data) {
        if (!studiedTodayAlready) {
          dataRef.current = { streak: 0, lastDate: null, studiedDates: [], frozenDates: [], longestStreak: 0 }
        }
        return
      }

      const longest = Math.max(data.longestStreak ?? data.streak ?? 0, dataRef.current?.longestStreak ?? 0)
      setLongestStreak(longest)
      const priorFrozen = data.frozenDates ?? []

      if (studiedTodayAlready) {
        // Both local and remote already count today. Adopt the remote record only
        // if it's genuinely ahead — i.e. today was studied on another device and
        // carries a longer streak. Otherwise the local value is the fresher truth
        // (e.g. a lesson finished mid-load whose write hasn't propagated), so the
        // pre-lesson remote read must not overwrite it.
        if (data.lastDate === todayStr() && (data.streak ?? 0) > (dataRef.current?.streak ?? 0)) {
          const merged = {
            streak:        data.streak,
            lastDate:      data.lastDate,
            studiedDates:  data.studiedDates ?? dataRef.current?.studiedDates ?? [],
            frozenDates:   data.frozenDates  ?? dataRef.current?.frozenDates  ?? [],
            longestStreak: longest,
          }
          dataRef.current = merged
          setStreak(merged.streak)
          setStudiedToday(true)
          setStudiedDates(merged.studiedDates)
          setFrozenDates(merged.frozenDates)
          saveStreak(uid, merged)  // keep local cache in sync with the adopted value
        }
        return
      }

      const r = computeStreak(data, count)

      if (r.usedFreeze) {
        // Consume one freeze per missed day — record each as a virtual "studied"
        // date and track it in frozenDates so the calendar can mark it 🧊.
        const consume = r.freezesToConsume ?? 1
        const next    = Math.max(0, count - consume)
        setFreezeCount(next)
        AsyncStorage.setItem(FREEZE_KEY, String(next)).catch(() => {})
        saveFirestoreFreeze(uid, next)
        const updated = [...new Set([...(data.studiedDates ?? []), ...r.virtualDates])].slice(-HISTORY_DAYS)
        const frozen  = [...new Set([...priorFrozen, ...r.virtualDates])].slice(-HISTORY_DAYS)
        setStudiedDates(updated)
        setFrozenDates(frozen)
        // lastDate becomes the most recent bridged day (yesterday).
        const lastVirtual = r.virtualDates[r.virtualDates.length - 1]
        const nd = { streak: r.streak, lastDate: lastVirtual, studiedDates: updated, frozenDates: frozen, longestStreak: longest }
        saveStreak(uid, nd); dataRef.current = nd
        setPendingEvent({ type: 'freeze_used', streak: r.streak, daysFrozen: consume })
      } else {
        setStudiedDates(data.studiedDates ?? [])
        setFrozenDates(priorFrozen)
        dataRef.current = { streak: r.streak, lastDate: data.lastDate, studiedDates: data.studiedDates ?? [], frozenDates: priorFrozen, longestStreak: longest }
        if (r.streak === 0 && (data.streak ?? 0) > 0) {
          setPendingEvent({ type: 'broken', streak: 0, lost: r.lost })
        }
      }

      setStreak(r.streak)
      setStudiedToday(r.studiedToday)
    })
    return () => { cancelled = true }
  }, [uid])

  // ── Extend the streak on the first completed lesson of the day (hybrid) ─────
  const markStudied = useCallback(() => {
    if (!uid) return
    const res = computeMarkStudied(dataRef.current)
    if (!res) return  // already extended today
    const { data: nd, isRecord, isMilestone } = res

    dataRef.current = nd
    setStreak(nd.streak)
    setStudiedToday(true)
    setStudiedDates(nd.studiedDates)
    setLongestStreak(nd.longestStreak)
    saveStreak(uid, nd)

    // Log streak activity
    if (isMilestone) {
      logActivity(uid, 'streak_milestone', `Reached ${nd.streak}-day streak! 🔥`, { streak: nd.streak, isRecord })
    } else {
      logActivity(uid, 'streak_extended', `Continued ${nd.streak}-day streak`, { streak: nd.streak })
    }

    setPendingEvent({ type: 'continued', streak: nd.streak, isRecord, isMilestone })
  }, [uid])

  const clearEvent = useCallback(() => setPendingEvent(null), [])

  // ── Buy a streak freeze (costs 200 RP, max 2 stored) ────────────────────────
  const buyFreeze = useCallback(async (spendRP) => {
    if (freezeCount >= MAX_FREEZE) return 'already_have'
    const ok = await spendRP(FREEZE_COST)
    if (!ok) return 'insufficient_xp'
    const next = freezeCount + 1
    setFreezeCount(next)
    await AsyncStorage.setItem(FREEZE_KEY, String(next)).catch(() => {})
    if (uid) saveFirestoreFreeze(uid, next)
    return 'success'
  }, [freezeCount, uid])

  // ── Repair a just-lost streak — restore it to its previous length for XP ────
  const repairStreak = useCallback(async (spendRP, cost = 500) => {
    const lost = pendingEvent?.lost ?? 0
    if (lost <= 0) return 'nothing_to_repair'
    const ok = await spendRP(cost)
    if (!ok) return 'insufficient_xp'
    const yesterday = yesterdayStr()
    // Backfill the whole restored run (the `lost` consecutive days ending
    // yesterday) so the calendar visually matches the restored streak number —
    // not just yesterday. Sort then keep the most recent HISTORY_DAYS, since we
    // may be inserting dates older than the existing tail.
    const restoredDates = Array.from({ length: lost }, (_, i) => daysAgoStr(lost - i)) // daysAgoStr(lost) … daysAgoStr(1)
    const updated = [...new Set([...(dataRef.current?.studiedDates ?? []), ...restoredDates])]
      .sort()
      .slice(-HISTORY_DAYS)
    const longest = Math.max(longestStreak, lost)
    const nd = { streak: lost, lastDate: yesterday, studiedDates: updated, frozenDates: dataRef.current?.frozenDates ?? [], longestStreak: longest }
    dataRef.current = nd
    setStreak(lost); setStudiedDates(updated); setLongestStreak(longest); setStudiedToday(false)
    if (uid) saveStreak(uid, nd)
    setPendingEvent(null)
    return 'success'
  }, [pendingEvent, longestStreak, uid])

  const weekDays = last7Days().map((date) => {
    const [y, m, d] = date.split('-').map(Number)
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return {
      date,
      dayLabel: DAYS[new Date(y, m - 1, d).getDay()],
      studied:  studiedDates.includes(date),
      isToday:  date === todayStr(),
    }
  })

  const value = {
    streak, studiedToday, studiedDates, frozenDates, weekDays, freezeCount, longestStreak,
    hasFreeze: freezeCount > 0,   // backward compat for any consumer using hasFreeze
    pendingEvent, markStudied, clearEvent, buyFreeze, repairStreak,
    // Retained for backward compatibility; opening no longer extends the streak.
    markOpenedToday: async () => null,
  }

  return <StreakContext.Provider value={value}>{children}</StreakContext.Provider>
}

export function useStreak() {
  const ctx = useContext(StreakContext)
  if (!ctx) throw new Error('useStreak must be used within a StreakProvider')
  return ctx
}

// ── Storage helpers ───────────────────────────────────────────────────────────
async function loadStreak(uid) {
  try {
    const snap = await getDoc(doc(db, 'users', uid, 'meta', 'streak'))
    if (snap.exists()) return snap.data()
  } catch {}
  try {
    const raw = await AsyncStorage.getItem(AS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {}
  return null
}

async function saveStreak(uid, data) {
  try { await AsyncStorage.setItem(AS_KEY, JSON.stringify(data)) } catch {}
  try { await setDoc(doc(db, 'users', uid, 'meta', 'streak'), data) } catch {}
}

async function saveFirestoreFreeze(uid, count) {
  try { await setDoc(doc(db, 'users', uid), { streakFreezeCount: count }, { merge: true }) } catch {}
}

// Read the cloud-persisted freeze count (written by saveFirestoreFreeze). Returns
// null when unavailable/unset so the caller can fall back to the local value.
async function loadFirestoreFreeze(uid) {
  try {
    const snap = await getDoc(doc(db, 'users', uid))
    if (snap.exists()) {
      const n = snap.data()?.streakFreezeCount
      if (typeof n === 'number' && Number.isFinite(n)) return Math.max(0, Math.floor(n))
    }
  } catch {}
  return null
}
