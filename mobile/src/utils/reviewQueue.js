/**
 * reviewQueue — pure logic for the Smart Review engine (no React, no storage).
 *
 * The mistakes bank is a self-clearing, prioritized review queue. Each entry is
 * a question object augmented with Leitner-style review metadata:
 *
 *   { ...question, subject, box, wrongCount, lastSeen, due, addedAt }
 *
 *   box        1..MAX_BOX — higher = better remembered (longer interval)
 *   wrongCount total times missed (priority weight)
 *   due        ms epoch when the item is next "due" for review
 *
 * A wrong answer resets the item to box 1 / overdue; a correct answer advances
 * the box and pushes `due` further out, retiring the item once it passes MAX_BOX.
 */

const DAY = 86_400_000
export const MAX_BOX = 5
// Leitner spacing (days) per box the item is advancing INTO.
const INTERVALS = { 1: 1, 2: 3, 3: 7, 4: 16, 5: 35 }

export function questionKey(q) {
  return q.id ?? q.text?.slice(0, 60) ?? String(q.number ?? Math.random())
}

export function intervalMs(box) {
  return (INTERVALS[box] ?? 35) * DAY
}

/** Back-compat: turn a raw/legacy entry into a normalized review entry. */
export function normalizeEntry(entry, subject, now = Date.now()) {
  if (!entry) return null
  return {
    ...entry,
    subject: entry.subject ?? subject ?? 'living-environment',
    box:        Number.isFinite(entry.box) ? entry.box : 1,
    wrongCount: Number.isFinite(entry.wrongCount) ? entry.wrongCount : 1,
    addedAt:    entry.addedAt ?? now,
    lastSeen:   entry.lastSeen ?? now,
    due:        Number.isFinite(entry.due) ? entry.due : now,  // legacy → due now
  }
}

/** A freshly-missed question: box 1, overdue now, wrongCount incremented. */
export function reset(entry, subject, now = Date.now()) {
  const e = normalizeEntry(entry, subject, now)
  return { ...e, box: 1, wrongCount: e.wrongCount + 1, lastSeen: now, due: now }
}

/**
 * Advance after a correct answer. Returns the updated entry, or null if the
 * item has graduated past MAX_BOX (retire it).
 */
export function advance(entry, now = Date.now()) {
  const e = normalizeEntry(entry, entry?.subject, now)
  const nextBox = e.box + 1
  if (nextBox > MAX_BOX) return null
  return { ...e, box: nextBox, lastSeen: now, due: now + intervalMs(nextBox) }
}

function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)) }

/**
 * Priority score for ordering a review session. Higher = review sooner.
 *   score = wrongCount × overdue × topicWeakness × examProximity
 */
export function priority(entry, { now = Date.now(), weakMastery = {}, daysToExam = null } = {}) {
  const overdue = entry.due ? Math.max(1, (now - entry.due) / DAY + 1) : 1
  const mastery = weakMastery[entry.topic]            // 0..100 or undefined
  const topicWeakness = mastery == null ? 1.3 : 1 + (1 - clamp(mastery, 0, 100) / 100)
  const examProximity = daysToExam == null ? 1 : 1 + clamp((30 - daysToExam) / 30, 0, 1)
  return (entry.wrongCount || 1) * overdue * topicWeakness * examProximity
}

/**
 * Build an ordered review set (returns question objects).
 *   items       — the full queue
 *   subject     — filter to this subject
 *   topic       — optional, filter to a single topic (in-unit review)
 *   weakMastery — { [topic]: bestPct } so weak topics rank higher
 *   daysToExam  — null or number (pre-exam emphasis)
 *   limit       — max questions (default 15)
 */
export function buildReviewSet({ items = [], subject, topic = null, weakMastery = {}, daysToExam = null, limit = 15 } = {}) {
  const now = Date.now()
  const pool = items.filter((e) =>
    (!subject || e.subject === subject) && (!topic || e.topic === topic)
  )
  return pool
    .map((e) => ({ e, p: priority(e, { now, weakMastery, daysToExam }) }))
    .sort((a, b) => b.p - a.p)
    .slice(0, limit)
    .map(({ e }) => e)
}
