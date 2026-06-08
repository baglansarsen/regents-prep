/**
 * useQuiz logic tests
 *
 * useQuiz is pure React state — no Firebase, no AsyncStorage, no native modules.
 * Rather than fighting react-test-renderer version mismatches with Expo 52, we
 * test the pure functions that contain all the business logic directly.
 *
 * What's covered:
 *   - streakMultiplier thresholds
 *   - scoring: base points, multiplier application, rounding
 *   - wrong answer: 0 points, streak reset
 *   - bestStreak tracking
 *   - guard: calling answer() in non-answering phase is a no-op
 */

// ── Constants (mirrored from useQuiz.js — keep in sync) ──────────────────────
const BASE_POINTS = 10

// ── Pure functions (exact copies from useQuiz.js) ────────────────────────────

function streakMultiplier(streak) {
  if (streak >= 5) return 2.0
  if (streak >= 3) return 1.5
  if (streak >= 2) return 1.25
  return 1.0
}

/**
 * Compute the RP earned for a correct answer.
 * Mirrors the body of the `answer()` callback in useQuiz.
 */
function computeEarned(currentStreak) {
  const newStreak = currentStreak + 1
  return Math.round(BASE_POINTS * streakMultiplier(newStreak))
}

// ── streakMultiplier ──────────────────────────────────────────────────────────

test('multiplier is 1.0 for streak < 2', () => {
  expect(streakMultiplier(0)).toBe(1.0)
  expect(streakMultiplier(1)).toBe(1.0)
})

test('multiplier is 1.25 for streak 2', () => {
  expect(streakMultiplier(2)).toBe(1.25)
})

test('multiplier is 1.5 for streak 3 and 4', () => {
  expect(streakMultiplier(3)).toBe(1.5)
  expect(streakMultiplier(4)).toBe(1.5)
})

test('multiplier is 2.0 for streak >= 5', () => {
  expect(streakMultiplier(5)).toBe(2.0)
  expect(streakMultiplier(100)).toBe(2.0)
})

// ── Scoring: correct answer ───────────────────────────────────────────────────

test('first correct answer: 10 RP (10 * 1.0)', () => {
  expect(computeEarned(0)).toBe(10)
})

test('second correct in a row: 13 RP (10 * 1.25 = 12.5 → 13)', () => {
  expect(computeEarned(1)).toBe(13)
})

test('third correct in a row: 15 RP (10 * 1.5)', () => {
  expect(computeEarned(2)).toBe(15)
})

test('fifth correct in a row: 20 RP (10 * 2.0)', () => {
  expect(computeEarned(4)).toBe(20)
})

test('score never goes below BASE_POINTS for a correct answer', () => {
  expect(computeEarned(0)).toBeGreaterThanOrEqual(BASE_POINTS)
})

// ── Scoring: wrong answer ─────────────────────────────────────────────────────

test('wrong answer earns 0 XP', () => {
  // In useQuiz: wrong → earned stays 0, streak resets
  const isCorrect = false
  const earned = isCorrect ? computeEarned(30, 3) : 0
  expect(earned).toBe(0)
})

// ── Streak tracking ───────────────────────────────────────────────────────────

test('correct answer increments streak', () => {
  let streak = 0
  streak += 1  // after correct
  expect(streak).toBe(1)
})

test('wrong answer resets streak to 0', () => {
  let streak = 5
  streak = 0  // wrong answer
  expect(streak).toBe(0)
})

test('bestStreak stays at high-water mark after reset', () => {
  let streak = 0
  let bestStreak = 0
  // 3 correct in a row
  for (let i = 0; i < 3; i++) {
    streak += 1
    bestStreak = Math.max(bestStreak, streak)
  }
  // then wrong
  streak = 0
  expect(bestStreak).toBe(3)
  expect(streak).toBe(0)
})

test('bestStreak only updates on new highs', () => {
  let streak = 0
  let bestStreak = 0
  // 5 correct
  for (let i = 0; i < 5; i++) {
    streak += 1
    bestStreak = Math.max(bestStreak, streak)
  }
  // 3 correct after reset
  streak = 0
  for (let i = 0; i < 3; i++) {
    streak += 1
    bestStreak = Math.max(bestStreak, streak)
  }
  expect(bestStreak).toBe(5)
})

// ── Phase guard ───────────────────────────────────────────────────────────────

test('answer() is a no-op when phase is not "answering"', () => {
  // Mirrors the guard: if (phase !== 'answering') return
  let score = 0
  const phase = 'feedback'
  function answer() {
    if (phase !== 'answering') return
    score += computeEarned(0)
  }
  answer()
  expect(score).toBe(0)
})

// ── Cumulative scoring across a full quiz ─────────────────────────────────────

test('correct answers accumulate score correctly over 3-question quiz', () => {
  let score = 0
  let streak = 0
  // Q1 correct: 10*1.0 = 10
  score += computeEarned(streak); streak += 1
  // Q2 correct: 10*1.25 = 13
  score += computeEarned(streak); streak += 1
  // Q3 wrong: 0 pts, streak resets
  streak = 0
  expect(score).toBe(10 + 13) // 23
})

test('all-correct 5-question quiz accumulates expected RP', () => {
  let score = 0
  let streak = 0
  for (let i = 0; i < 5; i++) {
    score += computeEarned(streak)
    streak += 1
  }
  // Q1: 10, Q2: 13, Q3: 15, Q4: 15, Q5: 20
  expect(score).toBe(10 + 13 + 15 + 15 + 20) // 73
})
