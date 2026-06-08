import { useState, useEffect, useCallback, useRef } from 'react'
import { doc, getDoc, setDoc, increment } from 'firebase/firestore'
import { db } from '../firebase'
import { getLevel } from '@content/levels'

const LS_KEY = 'regents_xp_v1'

// ISO 8601 week key: "2026-W21" — resets every Monday (matches mobile getWeekKey)
export function getWeekKey() {
  const d = new Date()
  const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const day = utc.getUTCDay() || 7
  utc.setUTCDate(utc.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((utc - yearStart) / 86_400_000) + 1) / 7)
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

export function useXP(uid) {
  const [xp,       setXP]       = useState(0)
  const [weeklyXP, setWeeklyXP] = useState(0)
  const [loaded,   setLoaded]   = useState(false)

  // Refs so callbacks never close over stale state
  const xpRef       = useRef(0)
  const weeklyXPRef = useRef(0)
  const _setXP       = (v) => { xpRef.current = v; setXP(v) }
  const _setWeeklyXP = (v) => { weeklyXPRef.current = v; setWeeklyXP(v) }

  useEffect(() => {
    if (!uid) { setLoaded(true); return }
    ;(async () => {
      try {
        const [xpSnap, wSnap] = await Promise.all([
          getDoc(doc(db, 'users', uid, 'meta', 'xp')),
          getDoc(doc(db, 'users', uid, 'meta', 'weeklyXP')),
        ])
        if (xpSnap.exists()) _setXP(xpSnap.data().total ?? 0)
        if (wSnap.exists()) {
          const d = wSnap.data()
          _setWeeklyXP(d.weekKey === getWeekKey() ? (d.xp ?? 0) : 0)
        }
      } catch {
        try { _setXP(Number(localStorage.getItem(LS_KEY)) || 0) } catch {}
      }
      setLoaded(true)
    })()
  }, [uid])

  const earnXP = useCallback(async (amount) => {
    if (!uid || amount <= 0) return
    const earned   = Math.round(amount)
    const nextTotal = xpRef.current + earned
    const prevWeekly = weeklyXPRef.current
    _setXP(nextTotal)
    _setWeeklyXP(prevWeekly + earned)   // optimistic

    const week = getWeekKey()

    // Persist total XP
    try {
      await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(earned) }, { merge: true })
    } catch {}

    // Persist weekly XP (reset on new week, snapshot last week for leagues)
    let isNewWeek = false
    let lastWeekXP = null
    let lastWeekKey = null
    try {
      const wSnap = await getDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'))
      isNewWeek = !wSnap.exists() || wSnap.data().weekKey !== week
      if (isNewWeek) {
        if (wSnap.exists() && wSnap.data().weekKey) {
          lastWeekXP  = wSnap.data().xp ?? 0
          lastWeekKey = wSnap.data().weekKey
        }
        await setDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'), { weekKey: week, xp: earned })
        _setWeeklyXP(earned)
      } else {
        await setDoc(doc(db, 'users', uid, 'meta', 'weeklyXP'), { weekKey: week, xp: increment(earned) }, { merge: true })
      }
    } catch {}

    // Sync to public leaderboard (same path mobile writes)
    try {
      const lbUpdate = {
        xp:       nextTotal,
        weeklyXP: isNewWeek ? earned : prevWeekly + earned,
        weekKey:  week,
      }
      if (lastWeekXP !== null) {
        lbUpdate.lastWeekXP  = lastWeekXP
        lbUpdate.lastWeekKey = lastWeekKey
      }
      await setDoc(doc(db, 'leaderboard', uid), lbUpdate, { merge: true })
    } catch {}

    try { localStorage.setItem(LS_KEY, String(nextTotal)) } catch {}
    return nextTotal
  }, [uid])

  const spendXP = useCallback(async (amount) => {
    if (xpRef.current < amount) return false
    const next = xpRef.current - amount
    _setXP(next)
    try {
      await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(-amount) }, { merge: true })
      await setDoc(doc(db, 'leaderboard', uid), { xp: next }, { merge: true })
    } catch {}
    try { localStorage.setItem(LS_KEY, String(next)) } catch {}
    return true
  }, [uid])

  return { xp, weeklyXP, earnXP, spendXP, loaded, level: getLevel(xp) }
}
