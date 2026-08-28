/**
 * question — shared helpers for the MCQ question shape used across the app.
 *
 * Content authored under `shared/content` uses `correct` for the answer index,
 * but several call sites also tolerate a legacy `correctIndex`. Centralising the
 * lookup here keeps grading consistent everywhere (useQuiz previously read only
 * `correct`, so any future `correctIndex` question would have graded every
 * answer wrong).
 */

/** The 0-based index of the correct choice, or -1 if the question has none. */
export function correctIndexOf(q) {
  if (!q) return -1
  const idx = q.correct ?? q.correctIndex
  return Number.isInteger(idx) ? idx : -1
}

/**
 * Fisher–Yates shuffle — unbiased and non-mutating. Replaces the common
 * `arr.sort(() => Math.random() - 0.5)` idiom, which is statistically skewed
 * (comparator isn't a consistent ordering) and engine-dependent.
 */
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Stable identity for de-dup: questions carry no `id`, so fall back to text. */
export function questionKey(q) {
  return q?.id ?? q?.text
}

// Placement test's original hardcoded target question count — kept as the
// default floor for any unit-aware diagnostic that doesn't specify its own.
export const DEFAULT_DIAGNOSTIC_TARGET = 10

/**
 * Unit-aware diagnostic sample: guarantees at least 1 question per unit (when
 * that unit's pool has any), fills remaining slots with a 2nd question per
 * unit, dedupes, shuffles, and caps at `target`. Used by both the placement
 * test and the cold-start checkup so a diagnostic quiz surveys the whole
 * subject's units instead of a lucky random slice that could skew to 2-3
 * topics. `getByTopic` must already route split sub-topic/skill units
 * correctly — every subject's `content/<subject>/units.js` does.
 *
 * Each returned question is tagged with `__unitTopic` (the unit it was drawn
 * for) — consumers that score per-unit (e.g. PlacementTestScreen's
 * scoreByTopic) key off this rather than the question's own normalized topic,
 * since a subtopic/skill unit's name can differ from its coarse pool topic.
 */
export function buildUnitSampledSet(units, getByTopic, target) {
  const list = Array.isArray(units) ? units : []
  const cappedTarget = target ?? Math.max(DEFAULT_DIAGNOSTIC_TARGET, list.length)

  function pick(unit, n) {
    const pool = (getByTopic?.(unit.topic) ?? [])
      .filter((q) => Array.isArray(q.choices) && q.choices.length > 0)
    return shuffle(pool).slice(0, n).map((q) => ({ ...q, __unitTopic: unit.topic }))
  }

  // 1. Guarantee exactly 1 question per unit (covers all units)
  const guaranteed = list.map((u) => pick(u, 1)[0]).filter(Boolean)

  // 2. Fill remaining slots with a 2nd question from each unit (random order)
  const extras = shuffle(list).flatMap((u) => pick(u, 2).slice(1))

  const combined = [...guaranteed, ...extras]
  const used = new Set()
  const deduped = combined.filter((q) => {
    const k = questionKey(q)
    if (used.has(k)) return false
    used.add(k)
    return true
  })

  // Shuffle and cap at target
  return shuffle(deduped).slice(0, cappedTarget)
}

// Cold-start checkup length: a floor so small subjects still get a
// meaningful spread, a ceiling so a large subject (earth-science has 22
// units) doesn't blow past the "quick checkup" / ~10-minute framing.
export const CHECKUP_MIN = 12
export const CHECKUP_MAX = 16

/** Clamp a subject's unit count into the checkup's target question count. */
export function checkupTarget(unitCount) {
  return Math.min(Math.max(unitCount || 0, CHECKUP_MIN), CHECKUP_MAX)
}
