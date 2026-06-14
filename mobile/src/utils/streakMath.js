/**
 * streakMath — the pure date-math heart of the daily streak.
 *
 * Extracted from StreakContext so it can be unit-tested directly (no Firebase,
 * AsyncStorage, or React) AND remain the single source of truth the provider
 * uses. Previously the tests kept a hand-copied, out-of-date version of this
 * logic; importing from here keeps them honest.
 *
 * All day boundaries are LOCAL (see utils/localDate) — date keys are
 * `YYYY-MM-DD` strings whose lexicographic order is chronological.
 */
import { localDateStr, daysAgoStr, yesterdayStr } from './localDate'

// Streak lengths that earn the heightened "milestone" celebration variant.
export const MILESTONES = [7, 14, 30, 50, 100, 150, 200, 365, 500, 1000]

// How many days of studied/frozen history to retain — drives how far back the
// streak calendar can render.
export const HISTORY_DAYS = 180

// `freezeCount` is the number of freezes currently stored (0–MAX). A freeze can
// bridge a gap of up to that many missed days, not just a single day.
export const MAX_FREEZE = 2

// Whole days between two `YYYY-MM-DD` strings (b - a), computed on local calendar
// dates so DST shifts can't introduce a ±1 error.
export function daysBetweenStr(aStr, bStr) {
  const [ay, am, ad] = aStr.split('-').map(Number)
  const [by, bm, bd] = bStr.split('-').map(Number)
  return Math.round((new Date(by, bm - 1, bd) - new Date(ay, am - 1, ad)) / 86_400_000)
}

/**
 * Resolve the streak state at load time given the stored `data` and how many
 * freezes are available. Freeze-aware: a gap of N missed days can be bridged if
 * `N <= freezeCount`.
 */
export function computeStreak(data, freezeCount) {
  const today = localDateStr(), yesterday = yesterdayStr()

  if (data.lastDate === today)     return { streak: data.streak, studiedToday: true,  usedFreeze: false }
  if (data.lastDate === yesterday) return { streak: data.streak, studiedToday: false, usedFreeze: false }

  // Clock moved backward / timezone travel: a lastDate in the FUTURE must not
  // destroy the streak (daysBetween would go negative and fall through to
  // "broken"). Treat it as already-studied/alive and let the calendar catch up.
  if (data.lastDate > today) {
    return { streak: data.streak, studiedToday: true, usedFreeze: false }
  }

  // Missed one or more days — freezes can bridge the gap if we have enough.
  if (data.lastDate && (data.streak ?? 0) > 0) {
    const missed = daysBetweenStr(data.lastDate, today) - 1   // days needing a freeze
    if (missed >= 1 && missed <= freezeCount) {
      // Fill each missed day (oldest → yesterday) with a virtual studied date.
      const virtualDates = []
      for (let i = missed; i >= 1; i--) virtualDates.push(daysAgoStr(i))
      return {
        streak: data.streak, studiedToday: false, usedFreeze: true,
        freezesToConsume: missed, virtualDates,
      }
    }
  }
  // Streak broken — remember what was lost so it can be offered for repair.
  return { streak: 0, studiedToday: false, usedFreeze: false, lost: data.streak ?? 0 }
}

/**
 * Pure computation behind markStudied: extend the streak on the first completed
 * lesson of the day. Returns `null` if today is already counted, otherwise the
 * next persisted record plus the celebration flags.
 */
export function computeMarkStudied(cur) {
  const today = localDateStr()
  const prev = cur ?? { streak: 0, lastDate: null, studiedDates: [], frozenDates: [], longestStreak: 0 }
  if (prev.lastDate === today) return null  // already extended today

  const next     = (prev.streak ?? 0) + 1
  const prevLong = prev.longestStreak ?? 0
  const updated  = [...new Set([...(prev.studiedDates ?? []), today])].slice(-HISTORY_DAYS)
  const longest  = Math.max(prevLong, next)
  const isRecord = next > prevLong && next > 1
  const isMilestone = MILESTONES.includes(next)
  // Carry frozenDates through — saveStreak is a non-merge setDoc, so omitting it
  // would wipe the persisted freeze history.
  const data = { streak: next, lastDate: today, studiedDates: updated, frozenDates: prev.frozenDates ?? [], longestStreak: longest }
  return { data, isRecord, isMilestone }
}
