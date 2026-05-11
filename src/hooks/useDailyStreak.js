import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const LS_KEY = 'regents_streak_v1'

function todayStr() { return new Date().toISOString().slice(0, 10) }
function yesterdayStr() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

function last7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })
}

function computeStreak(data) {
  const today = todayStr()
  const yesterday = yesterdayStr()
  if (data.lastDate === today)      return { streak: data.streak, studiedToday: true }
  if (data.lastDate === yesterday)  return { streak: data.streak, studiedToday: false }
  return { streak: 0, studiedToday: false }
}

export function useDailyStreak(uid) {
  const [streak,       setStreak]       = useState(0)
  const [studiedToday, setStudiedToday] = useState(false)
  const [studiedDates, setStudiedDates] = useState([])

  useEffect(() => {
    if (!uid) return
    loadStreak(uid).then((data) => {
      if (!data) return
      const { streak: s, studiedToday: st } = computeStreak(data)
      setStreak(s)
      setStudiedToday(st)
      setStudiedDates(data.studiedDates ?? [])
    })
  }, [uid])

  const markStudied = useCallback(() => {
    if (!uid) return
    setStudiedToday((already) => {
      if (already) return true
      const today = todayStr()
      setStreak((prev) => {
        const next = prev + 1
        setStudiedDates((dates) => {
          const updated = [...new Set([...dates, today])].slice(-30)
          const payload = { streak: next, lastDate: today, studiedDates: updated }
          saveStreak(uid, payload)
          return updated
        })
        return next
      })
      return true
    })
  }, [uid])

  const weekDays = last7Days().map((date) => ({
    date,
    dayLabel: new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' }),
    studied: studiedDates.includes(date),
    isToday: date === todayStr(),
  }))

  return { streak, studiedToday, weekDays, markStudied }
}

async function loadStreak(uid) {
  try {
    // Try Firestore first
    const snap = await getDoc(doc(db, 'users', uid, 'meta', 'streak'))
    if (snap.exists()) return snap.data()
  } catch {}
  // Fall back to localStorage
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {}
  return null
}

async function saveStreak(uid, data) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data))
  } catch {}
  try {
    await setDoc(doc(db, 'users', uid, 'meta', 'streak'), data)
  } catch {}
}
