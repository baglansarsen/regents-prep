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
