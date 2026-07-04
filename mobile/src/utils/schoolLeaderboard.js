/**
 * schoolLeaderboard — pure helpers behind the school leaderboard
 * (hooks/useLeaderboard.js). Kept import-free so they're unit-testable.
 */

// The onboarding "Skip for now" option stores the school as 'Independent'.
// For leaderboard purposes that means "no school chosen" — skippers shouldn't
// be pooled into a giant pseudo-school together.
export function normalizeSchoolName(name) {
  const trimmed = typeof name === 'string' ? name.trim() : ''
  if (!trimmed || trimmed === 'Independent') return null
  return trimmed
}

/**
 * Rank raw leaderboard docs by this week's RP.
 *
 * - weeklyXP from a past week (doc.weekKey !== weekKey) counts as 0, matching
 *   the friends and league rankings ("this week only").
 * - Ties broken by all-time RP.
 * - Returns ONLY display-safe fields (uid, displayName, weeklyXP, totalXP) —
 *   never forward platform / subscription / tier from the raw docs.
 *
 * @param {Array<{uid, displayName?, weeklyXP?, weekKey?, xp?}>} docs
 * @param {string} weekKey   current ISO week key (getWeekKey())
 * @param {number} cap       max rows returned
 */
export function rankSchoolWeekly(docs = [], weekKey, cap = 25) {
  return docs
    .map((d) => ({
      uid:         d.uid,
      displayName: d.displayName ?? 'Student',
      weeklyXP:    d.weekKey === weekKey ? (d.weeklyXP ?? 0) : 0,
      totalXP:     d.xp ?? 0,
    }))
    .sort((a, b) => b.weeklyXP - a.weeklyXP || b.totalXP - a.totalXP)
    .slice(0, cap)
}
