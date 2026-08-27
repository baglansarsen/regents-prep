/**
 * unitUnlocks — pure prereq/unlock logic for the learning path, extracted
 * from hooks/useUnitUnlocks.js so it's testable without AsyncStorage/React
 * (mirrors the predictedScore.js / todayMission.js pattern in this codebase).
 *
 * Units unlock by their declared `prereqs` (an array of unit ids) when the
 * content module provides them — every prereq's lessons must be complete, or
 * the unit itself was force-unlocked via the ⚡ Skip Challenge. Falls back to
 * the original positional rule (unit N needs unit N-1 complete) for every
 * subject that doesn't yet declare `prereqs` — every subject but Earth and
 * Space Sciences today — so this is behavior-preserving for them. Earth and
 * Space Sciences' prereqs currently mirror array order 1:1 too, so it's
 * unchanged as well; the graph only diverges from position once content
 * declares a non-linear prereq.
 */

/**
 * @param {Array<{id, title, topic, lessonCount, prereqs?: string[]}>} units
 * @param {number} unitIndex
 * @param {(topic: string, lessonCount: number) => boolean} unitComplete
 * @param {Set<string>} skipUnlocked  topic strings force-unlocked via the Skip Challenge
 */
export function isUnitUnlocked(units, unitIndex, unitComplete, skipUnlocked = new Set()) {
  const current = units[unitIndex]
  if (!current) return false
  if (skipUnlocked.has(current.topic)) return true

  if (current.prereqs !== undefined) {
    return current.prereqs.every((id) => {
      const prereq = units.find((u) => u.id === id)
      return prereq ? unitComplete(prereq.topic, prereq.lessonCount) : true
    })
  }
  if (unitIndex === 0) return true
  const prev = units[unitIndex - 1]
  return unitComplete(prev.topic, prev.lessonCount)
}

export function unitUnlockHint(units, unitIndex) {
  const current = units[unitIndex]
  if (!current) return null

  if (current.prereqs !== undefined) {
    const prereqTitles = current.prereqs
      .map((id) => units.find((u) => u.id === id)?.title)
      .filter(Boolean)
    if (!prereqTitles.length) return null
    return `Complete all lessons in ${prereqTitles.join(' and ')} to unlock, or pass the ⚡ Challenge with ≤3 mistakes`
  }
  if (unitIndex === 0) return null
  const prev = units[unitIndex - 1]
  return `Complete all lessons in ${prev.title} to unlock, or pass the ⚡ Challenge with ≤3 mistakes`
}
