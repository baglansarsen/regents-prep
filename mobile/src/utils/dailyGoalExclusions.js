import AsyncStorage from '@react-native-async-storage/async-storage'
import { localDateStr } from './localDate'

// RP that should NOT count toward the daily study goal (e.g. tip-jar thank-you
// bonuses). The daily goal measures study effort via lifetime-RP delta, so a
// large non-study earn would otherwise blow past the goal. We record such earns
// here, per local day, and useDailyGoal subtracts today's total.
const KEY = '@dailyGoalExcluded_v1'

/** Add `amount` RP to today's excluded total (resets automatically each day). */
export async function addDailyGoalExclusion(amount) {
  if (!amount) return
  try {
    const today = localDateStr()
    const raw = await AsyncStorage.getItem(KEY)
    const prev = raw ? JSON.parse(raw) : null
    const base = prev && prev.date === today ? (prev.amount ?? 0) : 0
    await AsyncStorage.setItem(KEY, JSON.stringify({ date: today, amount: base + amount }))
  } catch {}
}

/** RP excluded from the daily goal today (0 if none / not today). */
export async function getDailyGoalExclusion() {
  try {
    const raw = await AsyncStorage.getItem(KEY)
    if (!raw) return 0
    const { date, amount } = JSON.parse(raw)
    return date === localDateStr() ? (amount ?? 0) : 0
  } catch {
    return 0
  }
}
