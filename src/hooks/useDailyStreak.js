import { useState, useEffect, useCallback } from 'react'

const KEY = 'regents_streak_v1'

function todayStr() { return new Date().toISOString().slice(0, 10) }
function yesterdayStr() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

export function useDailyStreak() {
  const [streak, setStreak] = useState(0)
  const [studiedToday, setStudiedToday] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (!raw) return
      const data = JSON.parse(raw)
      const today = todayStr()
      if (data.lastDate === today) {
        setStreak(data.streak)
        setStudiedToday(true)
      } else if (data.lastDate === yesterdayStr()) {
        setStreak(data.streak)
      } else {
        setStreak(0)
      }
    } catch {}
  }, [])

  const markStudied = useCallback(() => {
    setStudiedToday((already) => {
      if (already) return true
      setStreak((prev) => {
        const next = prev + 1
        try {
          localStorage.setItem(KEY, JSON.stringify({ lastDate: todayStr(), streak: next }))
        } catch {}
        return next
      })
      return true
    })
  }, [])

  return { streak, studiedToday, markStudied }
}
