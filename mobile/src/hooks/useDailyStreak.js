import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = '@regents_streak_v1'

function todayStr() {
  return new Date().toISOString().slice(0, 10) // 'YYYY-MM-DD'
}

function yesterdayStr() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

export function useDailyStreak() {
  const [streak, setStreak]       = useState(0)
  const [studiedToday, setStudiedToday] = useState(false)
  const [loaded, setLoaded]       = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (raw) {
        const data = JSON.parse(raw)
        const today = todayStr()
        const yesterday = yesterdayStr()

        if (data.lastDate === today) {
          setStreak(data.streak)
          setStudiedToday(true)
        } else if (data.lastDate === yesterday) {
          // Streak alive but not yet studied today
          setStreak(data.streak)
          setStudiedToday(false)
        } else {
          // Gap of 2+ days — streak broken
          setStreak(0)
          setStudiedToday(false)
        }
      }
      setLoaded(true)
    }).catch(() => setLoaded(true))
  }, [])

  const markStudied = useCallback(() => {
    const today = todayStr()
    setStudiedToday((already) => {
      if (already) return already // idempotent

      setStreak((prev) => {
        const next = prev + 1
        AsyncStorage.setItem(KEY, JSON.stringify({ lastDate: today, streak: next })).catch(() => {})
        return next
      })
      return true
    })
  }, [])

  return { streak, studiedToday, loaded, markStudied }
}
