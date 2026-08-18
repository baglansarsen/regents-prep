/**
 * energy — the user-facing framing of the lives system, plus the pure policy
 * for when a wrong answer actually spends energy.
 *
 * The mechanics (counts, refill timers, subscriber bypass) live in
 * hooks/useLives.js and are unchanged; this module only decides WHEN a miss
 * costs energy, so the policy is testable and can't drift between screens.
 */

export const BASE_MAX_ENERGY = 5
export const MATH_MAX_ENERGY = BASE_MAX_ENERGY * 2

const MATH_SUBJECT_IDS = new Set([
  'algebra-1',
  'algebra-2',
  'geometry',
  'basic-math',
])

export function isMathSubject(subject) {
  return MATH_SUBJECT_IDS.has(subject)
}

export function maxEnergyForSubject(subject) {
  return isMathSubject(subject) ? MATH_MAX_ENERGY : BASE_MAX_ENERGY
}

export function energyPercent(lives = 0, maxLives = BASE_MAX_ENERGY) {
  if (!maxLives || maxLives <= 0) return 0
  const clampedLives = Math.max(0, Math.min(lives, maxLives))
  return Math.round((clampedLives / maxLives) * 100)
}

/**
 * Energy as a PACING signal rather than a paywall.
 *
 * Energy already gates quizzes, so a student who is out of it gets an ad/refill
 * sheet where a task should be. Reading the same number as a band lets the day's
 * plan offer work that fits: review and flashcards cost nothing, so they're the
 * right suggestion at low energy; a challenge or a past exam suits a full tank.
 *
 * Thresholds match the battery fill colors in components/EnergyBattery.jsx, so
 * the recommendation always agrees with what the student sees in the top bar.
 *
 *   'recover' — ≤20% (red): free, no-risk work only
 *   'steady'  — ≤50% (amber): normal lessons and short quizzes
 *   'push'    — otherwise (green): the demanding stuff
 *
 * Subscribers have unlimited energy, so the band would always read 'push' and
 * stop meaning anything — they get 'steady', the neutral default, and their
 * plan is driven by the other signals instead.
 */
export function energyBand(lives = 0, maxLives = BASE_MAX_ENERGY, isSubscribed = false) {
  if (isSubscribed) return 'steady'
  const pct = energyPercent(lives, maxLives)
  if (pct <= 20) return 'recover'
  if (pct <= 50) return 'steady'
  return 'push'
}

/**
 * Should a wrong answer spend energy (a life)?
 *
 * Free (no energy spent):
 *  - the end-of-lesson repeat round — it's pedagogical, not graded
 *  - adaptive struggle mode ("confidence round") — the student is already
 *    struggling; easier questions are served to rebuild, not to punish
 *  - the Daily Regents Trap — it's designed to be missed; "good catch for
 *    exam day" shouldn't cost anything
 *
 * Subscriber bypass is handled inside loseLife() itself (no-op when
 * subscribed) — callers don't need to check it here.
 */
export function shouldSpendEnergy({ inRepeat = false, struggleMode = false, isDailyTrap = false } = {}) {
  return !inRepeat && !struggleMode && !isDailyTrap
}
