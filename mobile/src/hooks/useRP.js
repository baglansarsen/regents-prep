import { useState, useEffect, useCallback, useRef } from 'react'
import { Platform } from 'react-native'
import { doc, getDoc, setDoc, increment } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth, db } from '../firebase'
import { logActivity } from '../utils/activityLogger'

const AS_KEY = '@regents_rp_v1'
const OLD_KEY = '@regents_xp_v1'

export const LEVELS = [
  { level: 1, name: 'Beginner',    min: 0    },
  { level: 2, name: 'Learner',     min: 200  },
  { level: 3, name: 'Student',     min: 500  },
  { level: 4, name: 'Scholar',     min: 1000 },
  { level: 5, name: 'Expert',      min: 2000 },
  { level: 6, name: 'Master',      min: 4000 },
  { level: 7, name: 'Grandmaster', min: 8000 },
]

export function getLevel(rp) {
  const current = [...LEVELS].reverse().find((l) => rp >= l.min) ?? LEVELS[0]
  const nextIdx = LEVELS.indexOf(current) + 1
  const next = LEVELS[nextIdx] ?? null
  const progress = next ? (rp - current.min) / (next.min - current.min) : 1
  return { ...current, next, progress }
}

// ISO 8601 week key: "2026-W21" — resets every Monday. Pass a date to get the
// key for that date's week (defaults to now).
export function getWeekKey(date = new Date()) {
  const d = date
  const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const day = utc.getUTCDay() || 7          // make Sunday = 7
  utc.setUTCDate(utc.getUTCDate() + 4 - day) // shift to Thursday of this ISO week
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((utc - yearStart) / 86_400_000) + 1) / 7)
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

// Module-level variables to hold global shared state
let globalRP = 0
let globalWeeklyRP = 0
let globalLoaded = false
const listeners = new Set()

function updateGlobalRP(nextRP, nextWeeklyRP, loadedVal) {
  globalRP = nextRP
  globalWeeklyRP = nextWeeklyRP
  globalLoaded = loadedVal
  listeners.forEach((listener) => {
    listener({ rp: globalRP, weeklyRP: globalWeeklyRP, loaded: globalLoaded })
  })
}

export function useRP(uid) {
  const [rp,        setRP]       = useState(globalRP)
  const [weeklyRP,  setWeeklyRP] = useState(globalWeeklyRP)
  const [loaded,    setLoaded]   = useState(globalLoaded)

  // Refs mirror state so earnRP/spendRP never compute from a stale closure
  const weeklyRPRef = useRef(globalWeeklyRP)
  const rpRef = useRef(globalRP)

  function _setRP(v) {
    updateGlobalRP(v, globalWeeklyRP, globalLoaded)
  }
  function _setWeeklyRP(v) {
    updateGlobalRP(globalRP, v, globalLoaded)
  }

  useEffect(() => {
    const listener = (data) => {
      setRP(data.rp)
      setWeeklyRP(data.weeklyRP)
      setLoaded(data.loaded)
      rpRef.current = data.rp
      weeklyRPRef.current = data.weeklyRP
    }
    listeners.add(listener)
    
    // Sync to current global state on mount
    setRP(globalRP)
    setWeeklyRP(globalWeeklyRP)
    setLoaded(globalLoaded)
    rpRef.current = globalRP
    weeklyRPRef.current = globalWeeklyRP

    return () => {
      listeners.delete(listener)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    if (!uid) {
      updateGlobalRP(0, 0, false)
      return
    }
    ;(async () => {
      // ── Optimistic paint from AsyncStorage (instant, ~5ms) ──────────────────
      // Show cached value immediately so the home screen isn't blank while
      // Firestore responds. Firestore result overwrites this below.
      try {
        const raw = await AsyncStorage.getItem(AS_KEY)
        const cached = Number(raw) || 0
        if (isMounted && !globalLoaded) updateGlobalRP(cached, globalWeeklyRP, false)
      } catch {}

      try {
        // Migrate old AsyncStorage key to new key
        const legacyRaw = await AsyncStorage.getItem(OLD_KEY)
        if (legacyRaw) {
          await AsyncStorage.setItem(AS_KEY, legacyRaw)
          await AsyncStorage.removeItem(OLD_KEY)
        }

        // Load total RP
        let loadedRP = globalRP
        const rpSnap = await getDoc(doc(db, 'users', uid, 'meta', 'xp'))
        if (rpSnap.exists()) {
          loadedRP = rpSnap.data().total ?? 0
        }

        // Load weekly RP (reset to 0 if it belongs to a past week)
        let loadedWeeklyRP = globalWeeklyRP
        const wSnap = await getDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'))
        if (wSnap.exists()) {
          const data = wSnap.data()
          loadedWeeklyRP = data.weekKey === getWeekKey() ? (data.xp ?? 0) : 0
        }

        if (isMounted) updateGlobalRP(loadedRP, loadedWeeklyRP, true)
      } catch {
        if (isMounted) updateGlobalRP(globalRP, globalWeeklyRP, true)
      }
    })()

    return () => { isMounted = false }
  }, [uid])

  const earnRP = useCallback(async (amount, multiplier = 1) => {
    if (!uid || amount <= 0) return
    const earned = Math.round(amount * Math.max(1, multiplier))

    const prevTotal    = rpRef.current
    const prevWeeklyRP = weeklyRPRef.current   // snapshot BEFORE optimistic update
    const nextTotal    = prevTotal + earned     // fresh ref, not stale closure
    _setRP(nextTotal)

    // ── Level-up detection ─────────────────────────────────────────────────────
    const prevLevel = getLevel(prevTotal).level
    const newLevel  = getLevel(nextTotal).level
    if (newLevel > prevLevel) {
      const newLevelName = getLevel(nextTotal).name
      try { await AsyncStorage.setItem('@levelUp', JSON.stringify({ level: newLevel, name: newLevelName })) } catch {}
    }

    const week = getWeekKey()
    _setWeeklyRP(prevWeeklyRP + earned)        // optimistic

    // ── Persist total ────────────────────────────────────────────────────────
    try {
      await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(earned) }, { merge: true })
    } catch {}

    // ── Persist weekly (reset on new week) — capture last-week snapshot ──────
    let isNewWeek   = false
    let lastWeekRP  = null
    let lastWeekKey = null
    try {
      const wSnap = await getDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'))
      isNewWeek = !wSnap.exists() || wSnap.data().weekKey !== week
      if (isNewWeek) {
        // Save previous week's total before resetting
        if (wSnap.exists() && wSnap.data().weekKey) {
          lastWeekRP  = wSnap.data().xp  ?? 0
          lastWeekKey = wSnap.data().weekKey
        }
        await setDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'), { weekKey: week, xp: earned })
        _setWeeklyRP(earned)          // correct the optimistic update
      } else {
        await setDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'), { weekKey: week, xp: increment(earned) }, { merge: true })
      }
    } catch {}

    // ── Sync to public leaderboard ────────────────────────────────────────────
    // Mirror the SAME increment semantics as meta/xp so the leaderboard total
    // can never drift from the authoritative total — writing the locally-derived
    // `nextTotal` would corrupt the public number whenever rpRef still held the
    // optimistic cache value (e.g. an earn that lands before Firestore loads).
    try {
      const lbUpdate = {
        xp:       increment(earned),
        // New week resets the weekly bucket to an absolute value; otherwise add.
        weeklyXP: isNewWeek ? earned : increment(earned),
        weekKey:  week,
      }
      // On new-week: snapshot last week so useLeague can compute promotions
      if (lastWeekRP !== null) {
        lbUpdate.lastWeekXP  = lastWeekRP
        lbUpdate.lastWeekKey = lastWeekKey
      }
      lbUpdate.displayName = auth.currentUser?.displayName ?? 'Student'
      lbUpdate.updatedAt   = Date.now()
      lbUpdate.platform    = Platform.OS   // 'ios' | 'android' — lets admin filter mobile vs web
      await setDoc(doc(db, 'leaderboard', uid), lbUpdate, { merge: true })
    } catch {}

    try { await AsyncStorage.setItem(AS_KEY, String(nextTotal)) } catch {}

    // ── Log level-up activity (RP gains are logged at the quiz/exam level) ────
    if (newLevel > prevLevel) {
      logActivity(uid, 'level_up', `Reached level ${newLevel} — ${getLevel(nextTotal).name}!`, { level: newLevel, levelName: getLevel(nextTotal).name })
    }

    return nextTotal   // authoritative new total for callers (e.g. pet evolution)
  }, [uid])

  const spendRP = useCallback(async (amount) => {
    if (rpRef.current < amount) return false
    const next = rpRef.current - amount
    _setRP(next)
    try { await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(-amount) }, { merge: true }) } catch {}
    try { await setDoc(doc(db, 'leaderboard', uid), { xp: increment(-amount) }, { merge: true }) } catch {}
    try { await AsyncStorage.setItem(AS_KEY, String(next)) } catch {}
    return true
  }, [uid])

  return { rp, weeklyRP, earnRP, spendRP, loaded, level: getLevel(rp), xp: rp, earnXP: earnRP, spendXP: spendRP }
}
