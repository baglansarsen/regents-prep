import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localDateStr } from '../utils/localDate'
import { combinePlans } from '../utils/combinedPlan'
import { DEFAULT_AVAILABILITY } from '../utils/studyPlan'

const KEY = '@dailyMinutesGoal_v1'

/**
 * Today's study-minutes target: the minutes a day from every subject's study
 * plan added up (study time isn't tracked per subject), or the plan default
 * (15) before any goal has study time. Replaces the old RP daily goal so the
 * student has one daily target. Pure; used by useDailyMinutesGoal.
 */
export function dailyMinutesGoalFrom(entries = []) {
  const { totalMinutesPerDay } = combinePlans(entries.filter((e) => e.plan))
  return totalMinutesPerDay > 0 ? totalMinutesPerDay : DEFAULT_AVAILABILITY.minutesPerDay
}

/**
 * Daily study-minutes goal (docs/designs/exam-date-study-plan.md: one daily
 * target). Progress is today's tracked study time; `celebrated` is remembered
 * per local day so the celebration fires once.
 */
export function useDailyMinutesGoal({ todaySeconds = 0, goalMinutes = DEFAULT_AVAILABILITY.minutesPerDay } = {}) {
  const today = localDateStr()
  const [celebrated, setCelebrated] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let alive = true
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (!alive) return
        let saved = null
        try { saved = JSON.parse(raw ?? 'null') } catch {}
        setCelebrated(saved?.date === today && saved?.celebrated === true)
        setLoaded(true)
      })
      .catch(() => { if (alive) setLoaded(true) })
    return () => { alive = false }
  }, [today])

  const markCelebrated = useCallback(async () => {
    setCelebrated(true)
    try { await AsyncStorage.setItem(KEY, JSON.stringify({ date: today, celebrated: true })) } catch {}
  }, [today])

  const todayMinutes = Math.floor(todaySeconds / 60)
  const goalMet = loaded && goalMinutes > 0 && todayMinutes >= goalMinutes
  return {
    goalMinutes,
    todayMinutes,
    progress: goalMinutes > 0 ? Math.min(1, todayMinutes / goalMinutes) : 0,
    goalMet,
    celebrated,
    markCelebrated,
  }
}
