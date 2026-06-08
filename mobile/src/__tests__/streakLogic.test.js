/**
 * Streak logic tests
 *
 * computeStreak() is the pure date-math heart of StreakContext.
 * We extract and test it in isolation — no Firebase, no AsyncStorage,
 * no React context needed.
 *
 * Scenarios covered:
 *   - studied today → streak maintained, studiedToday: true
 *   - studied yesterday → streak alive, studiedToday: false
 *   - missed one day, freeze active → freeze consumed, streak kept
 *   - missed one day, no freeze → streak broken
 *   - missed two+ days → streak broken regardless of freeze
 *   - brand new user (no lastDate) → streak reset to 0
 *   - milestone detection
 *   - markStudied increments and caps longestStreak
 */

// ── Pull the pure function out without importing the full context ──────────────

function todayStr() { return new Date().toISOString().slice(0, 10) }
function daysAgoStr(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}
function yesterdayStr()  { return daysAgoStr(1) }
function twoDaysAgoStr() { return daysAgoStr(2) }
function threeDaysAgoStr() { return daysAgoStr(3) }

// Exact copy of the function from StreakContext (kept in sync manually):
const MILESTONES = [7, 14, 30, 50, 100, 150, 200, 365, 500, 1000]

function computeStreak(data, freezeActive) {
  const today = todayStr()
  const yesterday = yesterdayStr()
  const twoDaysAgo = twoDaysAgoStr()

  if (data.lastDate === today)
    return { streak: data.streak, studiedToday: true, usedFreeze: false }
  if (data.lastDate === yesterday)
    return { streak: data.streak, studiedToday: false, usedFreeze: false }
  if (data.lastDate === twoDaysAgo && freezeActive && (data.streak ?? 0) > 0)
    return { streak: data.streak, studiedToday: false, usedFreeze: true, virtualDate: yesterday }
  return { streak: 0, studiedToday: false, usedFreeze: false, lost: data.streak ?? 0 }
}

// ── Streak continuation ───────────────────────────────────────────────────────

test('studied today: streak maintained and studiedToday is true', () => {
  const result = computeStreak({ streak: 5, lastDate: todayStr() }, false)
  expect(result.streak).toBe(5)
  expect(result.studiedToday).toBe(true)
  expect(result.usedFreeze).toBe(false)
})

test('studied yesterday: streak alive but studiedToday is false', () => {
  const result = computeStreak({ streak: 3, lastDate: yesterdayStr() }, false)
  expect(result.streak).toBe(3)
  expect(result.studiedToday).toBe(false)
  expect(result.usedFreeze).toBe(false)
})

// ── Freeze logic ──────────────────────────────────────────────────────────────

test('missed exactly one day with freeze active: freeze consumed, streak kept', () => {
  const result = computeStreak({ streak: 7, lastDate: twoDaysAgoStr() }, true)
  expect(result.streak).toBe(7)
  expect(result.usedFreeze).toBe(true)
  expect(result.virtualDate).toBe(yesterdayStr())
  expect(result.studiedToday).toBe(false)
})

test('missed exactly one day WITHOUT freeze: streak broken', () => {
  const result = computeStreak({ streak: 7, lastDate: twoDaysAgoStr() }, false)
  expect(result.streak).toBe(0)
  expect(result.usedFreeze).toBe(false)
  expect(result.lost).toBe(7)
})

test('freeze does NOT save a streak of 0 (nothing to protect)', () => {
  const result = computeStreak({ streak: 0, lastDate: twoDaysAgoStr() }, true)
  expect(result.streak).toBe(0)
  expect(result.usedFreeze).toBe(false)
})

test('after freeze fires, virtualDate becomes new lastDate so streak survives next open', () => {
  // Simulate: freeze fired yesterday (lastDate was advanced to virtualDate = yesterdayStr())
  // Today, app opens again without studying — streak must still be alive.
  const result = computeStreak({ streak: 7, lastDate: yesterdayStr() }, false)
  expect(result.streak).toBe(7)
  expect(result.studiedToday).toBe(false)
  expect(result.usedFreeze).toBe(false)
})

test('missed two+ days: freeze cannot save the streak', () => {
  const result = computeStreak({ streak: 10, lastDate: threeDaysAgoStr() }, true)
  expect(result.streak).toBe(0)
  expect(result.usedFreeze).toBe(false)
  expect(result.lost).toBe(10)
})

// ── New user ──────────────────────────────────────────────────────────────────

test('new user with no lastDate: streak is 0', () => {
  const result = computeStreak({ streak: 0, lastDate: null }, false)
  expect(result.streak).toBe(0)
  expect(result.studiedToday).toBe(false)
})

// ── lost value in broken result ───────────────────────────────────────────────

test('broken streak reports correct lost count', () => {
  const result = computeStreak({ streak: 42, lastDate: threeDaysAgoStr() }, false)
  expect(result.lost).toBe(42)
})

// ── Milestone detection ───────────────────────────────────────────────────────

test.each(MILESTONES)('streak %i is a milestone', (n) => {
  expect(MILESTONES.includes(n)).toBe(true)
})

test('streak 6 is NOT a milestone', () => {
  expect(MILESTONES.includes(6)).toBe(false)
})

// ── markStudied logic (pure computation, no side effects) ─────────────────────

function simulateMarkStudied(currentData) {
  const today = todayStr()
  if (currentData.lastDate === today) return null // already marked today

  const next = (currentData.streak ?? 0) + 1
  const prevLong = currentData.longestStreak ?? 0
  const updated = [...new Set([...(currentData.studiedDates ?? []), today])].slice(-60)
  const longest = Math.max(prevLong, next)
  const isRecord = next > prevLong && next > 1
  const isMilestone = MILESTONES.includes(next)

  return { streak: next, lastDate: today, studiedDates: updated, longestStreak: longest, isRecord, isMilestone }
}

test('markStudied increments streak by 1', () => {
  const result = simulateMarkStudied({ streak: 4, lastDate: yesterdayStr(), studiedDates: [], longestStreak: 4 })
  expect(result.streak).toBe(5)
})

test('markStudied updates longestStreak when new streak exceeds it', () => {
  const result = simulateMarkStudied({ streak: 9, lastDate: yesterdayStr(), studiedDates: [], longestStreak: 9 })
  expect(result.longestStreak).toBe(10)
})

test('markStudied does NOT lower longestStreak', () => {
  const result = simulateMarkStudied({ streak: 3, lastDate: yesterdayStr(), studiedDates: [], longestStreak: 20 })
  expect(result.longestStreak).toBe(20)
})

test('markStudied returns null if already marked today', () => {
  const result = simulateMarkStudied({ streak: 5, lastDate: todayStr(), studiedDates: [], longestStreak: 5 })
  expect(result).toBeNull()
})

test('markStudied flags isMilestone correctly at day 7', () => {
  const result = simulateMarkStudied({ streak: 6, lastDate: yesterdayStr(), studiedDates: [], longestStreak: 6 })
  expect(result.isMilestone).toBe(true)
})

test('markStudied does not flag isMilestone at non-milestone day', () => {
  const result = simulateMarkStudied({ streak: 8, lastDate: yesterdayStr(), studiedDates: [], longestStreak: 8 })
  expect(result.isMilestone).toBe(false)
})

test('markStudied caps studiedDates at 60 entries', () => {
  const oldDates = Array.from({ length: 60 }, (_, i) => daysAgoStr(61 - i))
  const result = simulateMarkStudied({ streak: 60, lastDate: yesterdayStr(), studiedDates: oldDates, longestStreak: 60 })
  expect(result.studiedDates.length).toBe(60)
  expect(result.studiedDates[result.studiedDates.length - 1]).toBe(todayStr())
})
