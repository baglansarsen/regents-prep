import { useState, useEffect, useCallback, useRef } from 'react'
import { doc, getDoc, setDoc, increment } from 'firebase/firestore'
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
  const [xp, setXP] = useState(0)
  const [weeklyXP, setWeeklyXP] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const weeklyXPRef = useRef(0)
  function _setWeeklyXP(v) { weeklyXPRef.current = v; setWeeklyXP(v) }
  const xpRef = useRef(0)
  function _setXP(v) { xpRef.current = v; setXP(v) }

  useEffect(() => {
    if (!uid) {
      // Local Guest fallback
      const raw = localStorage.getItem(AS_KEY)
      _setXP(Number(raw) || 0)
      setLoaded(true)
      return
    }
    ;(async () => {
      try {
        const xpSnap = await getDoc(doc(db, 'users', uid, 'meta', 'xp'))
        if (xpSnap.exists()) _setXP(xpSnap.data().total ?? 0)

        const wSnap = await getDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'))
        if (wSnap.exists()) {
          const data = wSnap.data()
          const wXP  = data.weekKey === getWeekKey() ? (data.xp ?? 0) : 0
          _setWeeklyXP(wXP)
        }
      } catch {
        const raw = localStorage.getItem(AS_KEY)
        _setXP(Number(raw) || 0)
      }
      setLoaded(true)
    })()
  }, [uid])

  const earnXP = useCallback(async (amount, multiplier = 1) => {
    if (amount <= 0) return xpRef.current
    
    let activeMultiplier = multiplier
    const doubleXPEnd = Number(localStorage.getItem('@double_xp_end') || '0')
    if (Date.now() < doubleXPEnd) {
      activeMultiplier = activeMultiplier * 2
    }
    
    const earned = Math.round(amount * Math.max(1, activeMultiplier))

    const prevWeeklyXP = weeklyXPRef.current
    const nextTotal    = xpRef.current + earned
    _setXP(nextTotal)
    _setWeeklyXP(prevWeeklyXP + earned)

    localStorage.setItem(AS_KEY, String(nextTotal))

    if (!uid) return nextTotal

    const week = getWeekKey()
    try {
      await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(earned) }, { merge: true })
    } catch {}

    let isNewWeek   = false
    let lastWeekXP  = null
    let lastWeekKey = null
    try {
      const wSnap = await getDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'))
      isNewWeek = !wSnap.exists() || wSnap.data().weekKey !== week
      if (isNewWeek) {
        if (wSnap.exists() && wSnap.data().weekKey) {
          lastWeekXP  = wSnap.data().xp  ?? 0
          lastWeekKey = wSnap.data().weekKey
        }
        await setDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'), { weekKey: week, xp: earned })
        _setWeeklyXP(earned)
      } else {
        await setDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'), { weekKey: week, xp: increment(earned) }, { merge: true })
      }
    } catch {}

    try {
      const lbUpdate = {
        xp:       nextTotal,
        weeklyXP: isNewWeek ? earned : (prevWeeklyXP + earned),
        weekKey:  week,
      }
      if (lastWeekXP !== null) {
        lbUpdate.lastWeekXP  = lastWeekXP
        lbUpdate.lastWeekKey = lastWeekKey
      }
      await setDoc(doc(db, 'leaderboard', uid), lbUpdate, { merge: true })
    } catch {}

    return nextTotal
  }, [uid])

  const spendXP = useCallback(async (amount) => {
    if (xpRef.current < amount) return false
    const next = xpRef.current - amount
    _setXP(next)
    localStorage.setItem(AS_KEY, String(next))

    if (!uid) return true

    try { await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(-amount) }, { merge: true }) } catch {}
    try { await setDoc(doc(db, 'leaderboard', uid), { xp: next }, { merge: true }) } catch {}
    return true
  }, [uid])

  return { xp, weeklyXP, earnXP, spendXP, loaded, level: getLevel(xp) }
}
