import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = '@dailyGoal_v4'
const OLD_KEY = '@dailyGoal_v3'
const GOALS = [10, 20, 50, 100]
const DEFAULT_GOAL = 20

/**
 * Tracks a user's daily RP goal and how much progress they've made today.
 *
 * @param {number} currentRP  – total lifetime RP from useRP
 * @param {boolean} rpLoaded – whether useRP has finished loading from Firestore
 * @returns {{ goal, setGoal, todayRP, progress, goalMet, GOALS }}
 */
export function useDailyGoal(currentRP, rpLoaded = false) {
  const [goal,       setGoalState] = useState(DEFAULT_GOAL)
  const [baseRP,     setBaseRP]    = useState(null)   // total RP at start of today
  const [loaded,     setLoaded]    = useState(false)
  const [celebrated, setCelebrated] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  // ── Load / migrate when rpLoaded becomes true ─────────────────────────────
  useEffect(() => {
    if (!rpLoaded) return

    let isMounted = true
    AsyncStorage.getItem(KEY).then((raw) => {
      if (!isMounted) return

      if (raw) {
        try {
          const { goal: g, date, rpAtStart, celebrated: wasCelebrated } = JSON.parse(raw)
          // Fallback: read legacy xpAtStart field
          const storedRP = rpAtStart ?? JSON.parse(raw).xpAtStart
          setGoalState(g ?? DEFAULT_GOAL)
          if (date === today) {
            setBaseRP(storedRP ?? currentRP)
            setCelebrated(wasCelebrated ?? false)
          } else {
            // New day — reset baseline to the real loaded RP and celebration flag
            const newBase = currentRP
            setBaseRP(newBase)
            setCelebrated(false)
            AsyncStorage.setItem(KEY, JSON.stringify({ goal: g ?? DEFAULT_GOAL, date: today, rpAtStart: newBase, celebrated: false }))
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
      setBaseRP(currentRP)
      setCelebrated(false)
      AsyncStorage.setItem(KEY, JSON.stringify({ goal: DEFAULT_GOAL, date: today, rpAtStart: currentRP, celebrated: false }))
    }

    return () => { isMounted = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rpLoaded])

  // ── Goal setter ───────────────────────────────────────────────────────────
  const setGoal = useCallback(async (newGoal) => {
    setGoalState(newGoal)
    const raw = await AsyncStorage.getItem(KEY)
    const prev = raw ? JSON.parse(raw) : { date: today, rpAtStart: currentRP, celebrated: false }
    await AsyncStorage.setItem(KEY, JSON.stringify({ ...prev, goal: newGoal }))
  }, [today, currentRP])

  // ── Mark celebration as done ──────────────────────────────────────────────
  const markCelebrated = useCallback(async () => {
    setCelebrated(true)
    const raw = await AsyncStorage.getItem(KEY)
    const prev = raw ? JSON.parse(raw) : { date: today, goal: DEFAULT_GOAL, rpAtStart: currentRP }
    await AsyncStorage.setItem(KEY, JSON.stringify({ ...prev, celebrated: true }))
  }, [today, currentRP])

  const todayRP = loaded && baseRP !== null ? Math.max(0, currentRP - baseRP) : 0
  const progress = Math.min(1, todayRP / goal)
  const goalMet  = todayRP >= goal

  return { goal, setGoal, todayRP, progress, goalMet, GOALS, celebrated, markCelebrated }
}
