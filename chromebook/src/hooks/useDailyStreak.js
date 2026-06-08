import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const AS_KEY     = '@regents_streak_v1'
const FREEZE_KEY = '@streakFreeze_v1'

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
  if (data.lastDate === twoDaysAgo && freezeActive && (data.streak ?? 0) > 0) {
    return { streak: data.streak, studiedToday: false, usedFreeze: true, virtualDate: yesterday }
  }
  return { streak: 0, studiedToday: false, usedFreeze: false }
}

export function useDailyStreak(uid) {
  const [streak,       setStreak]       = useState(0)
  const [studiedToday, setStudiedToday] = useState(false)
  const [studiedDates, setStudiedDates] = useState([])
  const [hasFreeze,    setHasFreeze]    = useState(false)

  useEffect(() => {
    const localFreeze = localStorage.getItem(FREEZE_KEY) === 'true'
    setHasFreeze(localFreeze)

    async function load() {
      let data = null
      if (uid) {
        try {
          const snap = await getDoc(doc(db, 'users', uid, 'meta', 'streak'))
          if (snap.exists()) data = snap.data()
        } catch {}
      }
      
      if (!data) {
        const raw = localStorage.getItem(AS_KEY)
        data = raw ? JSON.parse(raw) : null
      }

      if (!data) {
        setStreak(0)
        setStudiedToday(false)
        setStudiedDates([])
        return
      }

      const { streak: s, studiedToday: st, usedFreeze, virtualDate } = computeStreak(data, localFreeze)

      if (usedFreeze) {
        setHasFreeze(false)
        localStorage.setItem(FREEZE_KEY, 'false')
        if (uid) saveFirestoreFreeze(uid, false)
        const updated = [...new Set([...(data.studiedDates ?? []), virtualDate])].slice(-30)
        setStudiedDates(updated)
        saveStreak(uid, { ...data, studiedDates: updated })
      } else {
        setStudiedDates(data.studiedDates ?? [])
      }

      setStreak(s)
      setStudiedToday(st)
    }

    load()
  }, [uid])

  const markStudied = useCallback(() => {
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

  const buyFreeze = useCallback(async (spendXP) => {
    if (hasFreeze) return 'already_have'
    const ok = await spendXP(200)
    if (!ok) return 'insufficient_xp'
    setHasFreeze(true)
    localStorage.setItem(FREEZE_KEY, 'true')
    if (uid) saveFirestoreFreeze(uid, true)
    return 'success'
  }, [hasFreeze, uid])

  const weekDays = last7Days().map((date) => {
    const [y, m, d] = date.split('-').map(Number)
    const parsedDate = new Date(y, m - 1, d)
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const dayLabel = DAYS[parsedDate.getDay()]
    return {
      date,
      dayLabel,
      studied:   studiedDates.includes(date),
      isToday:   date === todayStr(),
    }
  })

  return { streak, studiedToday, weekDays, markStudied, hasFreeze, buyFreeze }
}

async function saveStreak(uid, data) {
  try { localStorage.setItem(AS_KEY, JSON.stringify(data)) } catch {}
  if (uid) {
    try { await setDoc(doc(db, 'users', uid, 'meta', 'streak'), data) } catch {}
  }
}

async function saveFirestoreFreeze(uid, active) {
  try { await setDoc(doc(db, 'users', uid), { streakFreeze: active }, { merge: true }) } catch {}
}
