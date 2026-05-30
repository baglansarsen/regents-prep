import { useState, useEffect, useCallback, useRef } from 'react'
import { doc, getDoc, setDoc, increment } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../firebase'

const AS_KEY = '@regents_xp_v1'

export const LEVELS = [
  { level: 1, name: 'Beginner',    min: 0    },
  { level: 2, name: 'Learner',     min: 200  },
  { level: 3, name: 'Student',     min: 500  },
  { level: 4, name: 'Scholar',     min: 1000 },
  { level: 5, name: 'Expert',      min: 2000 },
  { level: 6, name: 'Master',      min: 4000 },
  { level: 7, name: 'Grandmaster', min: 8000 },
]

export function getLevel(xp) {
  const current = [...LEVELS].reverse().find((l) => xp >= l.min) ?? LEVELS[0]
  const nextIdx = LEVELS.indexOf(current) + 1
  const next = LEVELS[nextIdx] ?? null
  const progress = next ? (xp - current.min) / (next.min - current.min) : 1
  return { ...current, next, progress }
}

// ISO 8601 week key: "2026-W21" — resets every Monday
export function getWeekKey() {
  const d = new Date()
  const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const day = utc.getUTCDay() || 7          // make Sunday = 7
  utc.setUTCDate(utc.getUTCDate() + 4 - day) // shift to Thursday of this ISO week
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((utc - yearStart) / 86_400_000) + 1) / 7)
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

export function useXP(uid) {
  const [xp,        setXP]       = useState(0)
  const [weeklyXP,  setWeeklyXP] = useState(0)
  const [loaded,    setLoaded]   = useState(false)

  // Refs mirror state so earnXP/spendXP never compute from a stale closure
  const weeklyXPRef = useRef(0)
  function _setWeeklyXP(v) { weeklyXPRef.current = v; setWeeklyXP(v) }
  const xpRef = useRef(0)
  function _setXP(v) { xpRef.current = v; setXP(v) }

  useEffect(() => {
    if (!uid) return
    ;(async () => {
      try {
        // Load total XP
        const xpSnap = await getDoc(doc(db, 'users', uid, 'meta', 'xp'))
        if (xpSnap.exists()) _setXP(xpSnap.data().total ?? 0)

        // Load weekly XP (reset to 0 if it belongs to a past week)
        const wSnap = await getDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'))
        if (wSnap.exists()) {
          const data = wSnap.data()
          const wXP  = data.weekKey === getWeekKey() ? (data.xp ?? 0) : 0
          _setWeeklyXP(wXP)
        }
      } catch {
        try {
          const raw = await AsyncStorage.getItem(AS_KEY)
          _setXP(Number(raw) || 0)
        } catch {}
      }
      setLoaded(true)
    })()
  }, [uid])

  const earnXP = useCallback(async (amount, multiplier = 1) => {
    if (!uid || amount <= 0) return
    const earned = Math.round(amount * Math.max(1, multiplier))

    const prevWeeklyXP = weeklyXPRef.current   // snapshot BEFORE optimistic update
    const nextTotal    = xpRef.current + earned   // fresh ref, not stale closure
    _setXP(nextTotal)

    const week = getWeekKey()
    _setWeeklyXP(prevWeeklyXP + earned)        // optimistic

    // ── Persist total ────────────────────────────────────────────────────────
    try {
      await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(earned) }, { merge: true })
    } catch {}

    // ── Persist weekly (reset on new week) — capture last-week snapshot ──────
    let isNewWeek   = false
    let lastWeekXP  = null
    let lastWeekKey = null
    try {
      const wSnap = await getDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'))
      isNewWeek = !wSnap.exists() || wSnap.data().weekKey !== week
      if (isNewWeek) {
        // Save previous week's total before resetting
        if (wSnap.exists() && wSnap.data().weekKey) {
          lastWeekXP  = wSnap.data().xp  ?? 0
          lastWeekKey = wSnap.data().weekKey
        }
        await setDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'), { weekKey: week, xp: earned })
        _setWeeklyXP(earned)          // correct the optimistic update
      } else {
        await setDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'), { weekKey: week, xp: increment(earned) }, { merge: true })
      }
    } catch {}

    // ── Sync to public leaderboard ────────────────────────────────────────────
    try {
      const lbUpdate = {
        xp:       nextTotal,
        weeklyXP: isNewWeek ? earned : (prevWeeklyXP + earned),
        weekKey:  week,
      }
      // On new-week: snapshot last week so useLeague can compute promotions
      if (lastWeekXP !== null) {
        lbUpdate.lastWeekXP  = lastWeekXP
        lbUpdate.lastWeekKey = lastWeekKey
      }
      await setDoc(doc(db, 'leaderboard', uid), lbUpdate, { merge: true })
    } catch {}

    try { await AsyncStorage.setItem(AS_KEY, String(nextTotal)) } catch {}

    return nextTotal   // authoritative new total for callers (e.g. pet evolution)
  }, [uid])

  const spendXP = useCallback(async (amount) => {
    if (xpRef.current < amount) return false
    const next = xpRef.current - amount
    _setXP(next)
    try { await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(-amount) }, { merge: true }) } catch {}
    try { await setDoc(doc(db, 'leaderboard', uid), { xp: next }, { merge: true }) } catch {}
    try { await AsyncStorage.setItem(AS_KEY, String(next)) } catch {}
    return true
  }, [uid])

  return { xp, weeklyXP, earnXP, spendXP, loaded, level: getLevel(xp) }
}
