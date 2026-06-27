/**
 * Per-question difficulty for scaffolded, easy→hard math lessons.
 *
 * There is no authored difficulty on the Regents exam bank, so we DERIVE one
 * from the structure already on each item, while honoring an explicit
 * `q.difficulty` (1–5) when present — that override is the hook for both
 * authored Level-0 content and a future LLM enrichment pass:
 *
 *     difficultyOf(q) = q.difficulty ?? heuristic(q)
 *
 * Heuristic (NY Regents structure): Part I is multiple-choice and roughly
 * escalates by number; Parts II–IV are constructed-response and are the hardest.
 *   - written / constructed-response → 5 if Part C/D, else 4
 *   - MC Part A by number            → ≤8: 1, ≤16: 2, else 3
 *   - any non-A multiple-choice      → 4
 * Pools merge ~9 exams, so `number` repeats across them — that's fine: difficulty
 * is per-item (position within an exam), not a global ordering.
 */

export const DIFFICULTY_MIN = 1
export const DIFFICULTY_MAX = 5

export function difficultyOf(q) {
  if (!q) return 3
  const explicit = q.difficulty
  if (Number.isFinite(explicit) && explicit >= DIFFICULTY_MIN && explicit <= DIFFICULTY_MAX) {
    return Math.round(explicit)
  }

  const part = typeof q.part === 'string' ? q.part.toUpperCase() : ''

  // Constructed-response / written items are the hardest tier.
  if (q.type === 'written' || !Array.isArray(q.choices)) {
    return part === 'C' || part === 'D' ? 5 : 4
  }

  // Multiple-choice outside Part A (rare) reads as harder.
  if (part && part !== 'A') return 4

  // Part A MC escalates by position.
  const n = Number.isFinite(q.number) ? q.number : 12
  if (n <= 8) return 1
  if (n <= 16) return 2
  return 3
}

/** 'easy' (≤2) | 'medium' (3) | 'hard' (≥4) */
export function band(q) {
  const d = difficultyOf(q)
  return d <= 2 ? 'easy' : d === 3 ? 'medium' : 'hard'
}

export function isEasy(q) { return difficultyOf(q) <= 2 }

// Deterministic-enough shuffle for intra-tier variety (no Date/random-seed needs).
function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Order questions easy→hard, shuffling WITHIN each difficulty tier so a lesson is
 * scaffolded but not identical on every attempt.
 */
export function orderByDifficulty(questions) {
  const tiers = new Map()   // difficulty → [questions]
  for (const q of questions) {
    const d = difficultyOf(q)
    if (!tiers.has(d)) tiers.set(d, [])
    tiers.get(d).push(q)
  }
  const out = []
  for (let d = DIFFICULTY_MIN; d <= DIFFICULTY_MAX; d++) {
    const group = tiers.get(d)
    if (group) out.push(...shuffleInPlace(group))
  }
  return out
}

/**
 * Pick up to `n` of the EASIEST unseen questions from a pool, for the in-lesson
 * confidence loop. `excludeIds` is a Set of already-served question keys.
 */
export function getEasier(pool, n, excludeIds = new Set(), keyOf = (q) => q.id ?? q.text) {
  const easy = pool
    .filter((q) => isEasy(q) && !excludeIds.has(keyOf(q)))
    .sort((a, b) => difficultyOf(a) - difficultyOf(b))
  return shuffleInPlace(easy.slice(0, Math.min(easy.length, n * 3))).slice(0, n)
}
