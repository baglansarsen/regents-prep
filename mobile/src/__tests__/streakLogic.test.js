/**
 * Streak logic tests
 *
 * These exercise the REAL production functions from utils/streakMath — the same
 * code StreakContext runs. (They used to re-implement an out-of-date copy that
 * tested single-day boolean freezes and UTC dates, so they could pass while the
 * app behaved differently. Importing the real module keeps them honest.)
 *
 * Dates come from utils/localDate so the local-midnight day boundary matches the
 * app exactly. Tests are relative to "now", so they hold on any day.
 */

import {
  computeStreak,
  computeMarkStudied,
  daysBetweenStr,
  MILESTONES,
  HISTORY_DAYS,
  MAX_FREEZE,
} from '../utils/streakMath'
import { localDateStr, daysAgoStr, yesterdayStr } from '../utils/localDate'

const todayStr = localDateStr
const twoDaysAgoStr   = () => daysAgoStr(2)
const threeDaysAgoStr = () => daysAgoStr(3)

// ── Streak continuation ───────────────────────────────────────────────────────

test('studied today: streak maintained and studiedToday is true', () => {
  const result = computeStreak({ streak: 5, lastDate: todayStr() }, 0)
  expect(result.streak).toBe(5)
  expect(result.studiedToday).toBe(true)
  expect(result.usedFreeze).toBe(false)
})

test('studied yesterday: streak alive but studiedToday is false', () => {
  const result = computeStreak({ streak: 3, lastDate: yesterdayStr() }, 0)
  expect(result.streak).toBe(3)
  expect(result.studiedToday).toBe(false)
  expect(result.usedFreeze).toBe(false)
})

// ── Freeze bridging (multi-day, the current model) ────────────────────────────

test('missed one day with 1 freeze: freeze consumed, streak kept, yesterday bridged', () => {
  const result = computeStreak({ streak: 7, lastDate: twoDaysAgoStr() }, 1)
  expect(result.streak).toBe(7)
  expect(result.usedFreeze).toBe(true)
  expect(result.freezesToConsume).toBe(1)
  expect(result.virtualDates).toEqual([yesterdayStr()])
  expect(result.studiedToday).toBe(false)
})

test('missed two days with 2 freezes: both consumed, gap fully bridged oldest→yesterday', () => {
  const result = computeStreak({ streak: 10, lastDate: threeDaysAgoStr() }, 2)
  expect(result.streak).toBe(10)
  expect(result.usedFreeze).toBe(true)
  expect(result.freezesToConsume).toBe(2)
  expect(result.virtualDates).toEqual([twoDaysAgoStr(), yesterdayStr()])
})

test('missed two days with only 1 freeze: cannot bridge, streak broken', () => {
  const result = computeStreak({ streak: 10, lastDate: threeDaysAgoStr() }, 1)
  expect(result.streak).toBe(0)
  expect(result.usedFreeze).toBe(false)
  expect(result.lost).toBe(10)
})

test('missed one day with no freeze: streak broken', () => {
  const result = computeStreak({ streak: 7, lastDate: twoDaysAgoStr() }, 0)
  expect(result.streak).toBe(0)
  expect(result.usedFreeze).toBe(false)
  expect(result.lost).toBe(7)
})

test('freeze does NOT save a streak of 0 (nothing to protect)', () => {
  const result = computeStreak({ streak: 0, lastDate: twoDaysAgoStr() }, 2)
  expect(result.streak).toBe(0)
  expect(result.usedFreeze).toBe(false)
})

test('after a freeze bridged to yesterday, next open keeps the streak alive without re-spending', () => {
  // freeze previously advanced lastDate to yesterday; opening today (no study) must stay alive.
  const result = computeStreak({ streak: 7, lastDate: yesterdayStr() }, 0)
  expect(result.streak).toBe(7)
  expect(result.studiedToday).toBe(false)
  expect(result.usedFreeze).toBe(false)
})

// ── Clock skew / timezone travel ──────────────────────────────────────────────

test('lastDate in the future (clock moved back) does NOT break the streak', () => {
  const tomorrow = daysAgoStr(-1)  // one day ahead of today
  const result = computeStreak({ streak: 9, lastDate: tomorrow }, 0)
  expect(result.streak).toBe(9)
  expect(result.studiedToday).toBe(true)
  expect(result.usedFreeze).toBe(false)
})

// ── New user ──────────────────────────────────────────────────────────────────

test('new user with no lastDate: streak is 0', () => {
  const result = computeStreak({ streak: 0, lastDate: null }, 0)
  expect(result.streak).toBe(0)
  expect(result.studiedToday).toBe(false)
})

test('broken streak reports correct lost count', () => {
  const result = computeStreak({ streak: 42, lastDate: threeDaysAgoStr() }, 0)
  expect(result.lost).toBe(42)
})

// ── daysBetweenStr ────────────────────────────────────────────────────────────

test('daysBetweenStr counts whole calendar days (b - a)', () => {
  expect(daysBetweenStr('2026-06-10', '2026-06-14')).toBe(4)
  expect(daysBetweenStr('2026-06-14', '2026-06-14')).toBe(0)
  // Across a DST spring-forward boundary in US Eastern (2026-03-08) — still 1 day.
  expect(daysBetweenStr('2026-03-08', '2026-03-09')).toBe(1)
})

// ── Milestone detection ───────────────────────────────────────────────────────

test.each(MILESTONES)('streak %i is a milestone', (n) => {
  expect(MILESTONES.includes(n)).toBe(true)
})

test('streak 6 is NOT a milestone', () => {
  expect(MILESTONES.includes(6)).toBe(false)
})

test('MAX_FREEZE caps how large a gap can be bridged', () => {
  // A gap larger than MAX_FREEZE can never be bridged, even with that many freezes.
  const lastDate = daysAgoStr(MAX_FREEZE + 2)  // missed = MAX_FREEZE + 1
  const result = computeStreak({ streak: 5, lastDate }, MAX_FREEZE)
  expect(result.usedFreeze).toBe(false)
  expect(result.streak).toBe(0)
})

// ── computeMarkStudied (the real markStudied computation) ──────────────────────

test('computeMarkStudied increments streak by 1', () => {
  const { data } = computeMarkStudied({ streak: 4, lastDate: yesterdayStr(), studiedDates: [], longestStreak: 4 })
  expect(data.streak).toBe(5)
  expect(data.lastDate).toBe(todayStr())
})

test('computeMarkStudied updates longestStreak when new streak exceeds it', () => {
  const { data } = computeMarkStudied({ streak: 9, lastDate: yesterdayStr(), studiedDates: [], longestStreak: 9 })
  expect(data.longestStreak).toBe(10)
})

test('computeMarkStudied does NOT lower longestStreak', () => {
  const { data } = computeMarkStudied({ streak: 3, lastDate: yesterdayStr(), studiedDates: [], longestStreak: 20 })
  expect(data.longestStreak).toBe(20)
})

test('computeMarkStudied returns null if already marked today', () => {
  const result = computeMarkStudied({ streak: 5, lastDate: todayStr(), studiedDates: [], longestStreak: 5 })
  expect(result).toBeNull()
})

test('computeMarkStudied handles a null/undefined current record (brand-new user)', () => {
  const { data } = computeMarkStudied(undefined)
  expect(data.streak).toBe(1)
  expect(data.lastDate).toBe(todayStr())
})

test('computeMarkStudied flags isMilestone correctly at day 7', () => {
  const { isMilestone } = computeMarkStudied({ streak: 6, lastDate: yesterdayStr(), studiedDates: [], longestStreak: 6 })
  expect(isMilestone).toBe(true)
})

test('computeMarkStudied does not flag isMilestone at a non-milestone day', () => {
  const { isMilestone } = computeMarkStudied({ streak: 8, lastDate: yesterdayStr(), studiedDates: [], longestStreak: 8 })
  expect(isMilestone).toBe(false)
})

test('computeMarkStudied flags isRecord only past day 1', () => {
  const first = computeMarkStudied({ streak: 0, lastDate: null, studiedDates: [], longestStreak: 0 })
  expect(first.isRecord).toBe(false)        // day 1 is not a "record"
  const later = computeMarkStudied({ streak: 5, lastDate: yesterdayStr(), studiedDates: [], longestStreak: 5 })
  expect(later.isRecord).toBe(true)
})

test('computeMarkStudied carries frozenDates through (non-merge save would otherwise wipe them)', () => {
  const frozen = [daysAgoStr(3)]
  const { data } = computeMarkStudied({ streak: 2, lastDate: yesterdayStr(), studiedDates: [], frozenDates: frozen, longestStreak: 2 })
  expect(data.frozenDates).toEqual(frozen)
})

test(`computeMarkStudied caps studiedDates at HISTORY_DAYS (${HISTORY_DAYS}) entries`, () => {
  const oldDates = Array.from({ length: HISTORY_DAYS }, (_, i) => daysAgoStr(HISTORY_DAYS + 1 - i))
  const { data } = computeMarkStudied({ streak: HISTORY_DAYS, lastDate: yesterdayStr(), studiedDates: oldDates, longestStreak: HISTORY_DAYS })
  expect(data.studiedDates.length).toBe(HISTORY_DAYS)
  expect(data.studiedDates[data.studiedDates.length - 1]).toBe(todayStr())
})
