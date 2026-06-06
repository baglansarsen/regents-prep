import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = '@dailyGoal_v3'
const GOALS = [10, 20, 50, 100]
const DEFAULT_GOAL = 20

/**
 * Tracks a user's daily XP goal and how much progress they've made today.
 *
 * @param {number} currentXP  – total lifetime XP from useXP
 * @param {boolean} xpLoaded – whether useXP has finished loading from Firestore
 * @returns {{ goal, setGoal, todayXP, progress, goalMet, GOALS }}
 */
export function useDailyGoal(currentXP, xpLoaded = false) {
  const [goal,    setGoalState] = useState(DEFAULT_GOAL)
  const [baseXP,  setBaseXP]   = useState(null)   // total XP at start of today
  const [loaded,  setLoaded]   = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  // ── Load / migrate when xpLoaded becomes true ─────────────────────────────
  useEffect(() => {
    if (!xpLoaded) return

    AsyncStorage.getItem(KEY).then((raw) => {
      if (raw) {
        try {
          const { goal: g, date, xpAtStart } = JSON.parse(raw)
          setGoalState(g ?? DEFAULT_GOAL)
          if (date === today) {
            setBaseXP(xpAtStart ?? currentXP)
          } else {
            // New day — reset baseline to the real loaded XP
            const newBase = currentXP
            setBaseXP(newBase)
            AsyncStorage.setItem(KEY, JSON.stringify({ goal: g ?? DEFAULT_GOAL, date: today, xpAtStart: newBase }))
          }
        } catch (_) {
          init()
        }
      } else {
        init()
      }
      setLoaded(true)
    })

    function init() {
      setBaseXP(currentXP)
      AsyncStorage.setItem(KEY, JSON.stringify({ goal: DEFAULT_GOAL, date: today, xpAtStart: currentXP }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xpLoaded])

  // ── Goal setter ───────────────────────────────────────────────────────────
  const setGoal = useCallback(async (newGoal) => {
    setGoalState(newGoal)
    const raw = await AsyncStorage.getItem(KEY)
    const prev = raw ? JSON.parse(raw) : { date: today, xpAtStart: currentXP }
    await AsyncStorage.setItem(KEY, JSON.stringify({ ...prev, goal: newGoal }))
  }, [today, currentXP])

  const todayXP = loaded && baseXP !== null ? Math.max(0, currentXP - baseXP) : 0
  const progress = Math.min(1, todayXP / goal)
  const goalMet  = todayXP >= goal

  return { goal, setGoal, todayXP, progress, goalMet, GOALS }
}
