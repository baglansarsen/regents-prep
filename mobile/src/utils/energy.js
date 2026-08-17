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
