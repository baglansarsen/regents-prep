/**
 * energy — the user-facing framing of the lives system, plus the pure policy
 * for when a wrong answer actually spends energy.
 *
 * The mechanics (counts, refill timers, subscriber bypass) live in
 * hooks/useLives.js and are unchanged; this module only decides WHEN a miss
 * costs energy, so the policy is testable and can't drift between screens.
 */

/**
 * Should a wrong answer spend energy (a life)?
 *
 * Free (no energy spent):
 *  - the end-of-lesson repeat round — it's pedagogical, not graded
 *  - adaptive struggle mode ("confidence round") — the student is already
 *    struggling; easier questions are served to rebuild, not to punish
 *
 * Subscriber bypass is handled inside loseLife() itself (no-op when
 * subscribed) — callers don't need to check it here.
 */
export function shouldSpendEnergy({ inRepeat = false, struggleMode = false } = {}) {
  return !inRepeat && !struggleMode
}
