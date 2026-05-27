import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../firebase'

const AS_KEY     = '@regents_streak_v1'
const FREEZE_KEY = '@streakFreeze_v1'

// ── Date helpers ──────────────────────────────────────────────────────────────
function todayStr() { return new Date().toISOString().slice(0, 10) }

function daysAgoStr(n) {
  const d = new Date(); d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}

function yesterdayStr()  { return daysAgoStr(1) }
function twoDaysAgoStr() { return daysAgoStr(2) }

function last7Days() {
  return Array.from({ length: 7 }, (_, i) => daysAgoStr(6 - i))
}

// ── Streak computation (freeze-aware) ─────────────────────────────────────────
function computeStreak(data, freezeActive) {
  const today     = todayStr()
  const yesterday = yesterdayStr()
  const twoDaysAgo = twoDaysAgoStr()

  if (data.lastDate === today) {
    return { streak: data.streak, studiedToday: true, usedFreeze: false }
  }
  if (data.lastDate === yesterday) {
    return { streak: data.streak, studiedToday: false, usedFreeze: false }
  }
  // Missed exactly one day — freeze can save the streak
  if (data.lastDate === twoDaysAgo && freezeActive && (data.streak ?? 0) > 0) {
    return { streak: data.streak, studiedToday: false, usedFreeze: true, virtualDate: yesterday }
  }
  return { streak: 0, studiedToday: false, usedFreeze: false }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useDailyStreak(uid) {
  const [streak,       setStreak]       = useState(0)
  const [studiedToday, setStudiedToday] = useState(false)
  const [studiedDates, setStudiedDates] = useState([])
  const [hasFreeze,    setHasFreeze]    = useState(false)

  // ── Load streak + freeze together (avoids race condition) ─────────────────
  useEffect(() => {
    if (!uid) return
    Promise.all([
      loadStreak(uid),
      AsyncStorage.getItem(FREEZE_KEY),
    ]).then(([data, freezeRaw]) => {
      const freezeActive = freezeRaw === 'true'
      setHasFreeze(freezeActive)

      if (!data) return

      const { streak: s, studiedToday: st, usedFreeze, virtualDate } = computeStreak(data, freezeActive)

      if (usedFreeze) {
        // Consume the freeze — add the missed day as a virtual "studied" date
        setHasFreeze(false)
        AsyncStorage.setItem(FREEZE_KEY, 'false')
        if (uid) saveFirestoreFreeze(uid, false)
        const updated = [...new Set([...(data.studiedDates ?? []), virtualDate])].slice(-30)
        setStudiedDates(updated)
        saveStreak(uid, { ...data, studiedDates: updated })
      } else {
        setStudiedDates(data.studiedDates ?? [])
      }

      setStreak(s)
      setStudiedToday(st)
    })
  }, [uid])

  // ── Mark studied (called after a quiz) ────────────────────────────────────
  const markStudied = useCallback(() => {
    if (!uid) return
    setStudiedToday((already) => {
      if (already) return true
      const today = todayStr()
      setStreak((prev) => {
        const next = prev + 1
        setStudiedDates((dates) => {
          const updated = [...new Set([...dates, today])].slice(-30)
          saveStreak(uid, { streak: next, lastDate: today, studiedDates: updated })
          return updated
        })
        return next
      })
      return true
    })
  }, [uid])

  // ── Buy a streak freeze (costs 200 XP) ────────────────────────────────────
  const buyFreeze = useCallback(async (spendXP) => {
    if (hasFreeze) return 'already_have'
    const ok = await spendXP(200)
    if (!ok) return 'insufficient_xp'
    setHasFreeze(true)
    await AsyncStorage.setItem(FREEZE_KEY, 'true')
    if (uid) saveFirestoreFreeze(uid, true)
    return 'success'
  }, [hasFreeze, uid])

  const weekDays = last7Days().map((date) => ({
    date,
    dayLabel:  new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' }),
    studied:   studiedDates.includes(date),
    isToday:   date === todayStr(),
  }))

  return { streak, studiedToday, weekDays, markStudied, hasFreeze, buyFreeze }
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

async function saveFirestoreFreeze(uid, active) {
  try { await setDoc(doc(db, 'users', uid), { streakFreeze: active }, { merge: true }) } catch {}
}
