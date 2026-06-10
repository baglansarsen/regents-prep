import { useState, useEffect, useCallback, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localDateStr } from '../utils/localDate'

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

  const today = localDateStr()

  // Track the previous RP total and which local day the baseline belongs to, so
  // we can (a) ignore RP *spends* (buying hearts/freezes must not erase today's
  // progress) and (b) roll the baseline over at local midnight even while the
  // app stays mounted past midnight.
  const lastRPRef   = useRef(null)
  const baseDayRef  = useRef(today)
  const goalRef     = useRef(goal)
  goalRef.current   = goal

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

    // The baseline now belongs to `today`; seed the spend/rollover tracker.
    baseDayRef.current = today
    lastRPRef.current  = currentRP

    return () => { isMounted = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rpLoaded])

  // ── Track RP deltas: ignore spends, roll over at local midnight ────────────
  // Runs whenever the lifetime RP total changes (earn or spend). `currentRP`
  // is a net total, so a spend lowers it; without compensation that would shrink
  // today's progress. We shift the baseline down by any decrease so only genuine
  // earnings move the goal. Also resets the baseline when the local day flips.
  useEffect(() => {
    if (!loaded || baseRP === null) return

    // Midnight rollover while mounted: start a fresh day from the current total.
    if (baseDayRef.current !== today) {
      baseDayRef.current = today
      lastRPRef.current  = currentRP
      setBaseRP(currentRP)
      setCelebrated(false)
      AsyncStorage.setItem(KEY, JSON.stringify({
        goal: goalRef.current, date: today, rpAtStart: currentRP, celebrated: false,
      })).catch(() => {})
      return
    }

    const prev = lastRPRef.current ?? currentRP
    if (currentRP < prev) {
      // A spend happened — slide the baseline down by the same amount so
      // todayRP (= currentRP - baseRP) is unaffected by spending.
      const spent = prev - currentRP
      setBaseRP((b) => {
        const nb = (b ?? currentRP) - spent
        AsyncStorage.mergeItem(KEY, JSON.stringify({ rpAtStart: nb })).catch(() => {})
        return nb
      })
    }
    lastRPRef.current = currentRP
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRP, today, loaded])

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
