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

import { difficultyOf } from '../content/_shared/difficulty'

const DAY = 86_400_000
export const MAX_BOX = 5
// Leitner spacing (days) per box the item is advancing INTO.
const INTERVALS = { 1: 1, 2: 3, 3: 7, 4: 16, 5: 35 }

/**
 * How a miss is classified, so a mistake points somewhere instead of just
 * counting against you. Set by the tutor's `mistakeType` (see MISTAKE_TYPES in
 * functions/index.js — keep the two lists in sync); undefined when the student
 * never asked the coach, which is the common case.
 */
export const MISTAKE_LABELS = {
  concept_gap:   { label: 'Concept gap',   icon: '🧩', hint: "The idea underneath isn't solid yet" },
  careless:      { label: 'Careless slip', icon: '⚡', hint: 'You knew it — it slipped' },
  reading_trap:  { label: 'Reading trap',  icon: '🔍', hint: 'The question asked something else' },
  formula_setup: { label: 'Setup error',   icon: '📐', hint: 'Right idea, wrong setup' },
  test_strategy: { label: 'Test strategy', icon: '♟️', hint: 'A test-taking habit to fix' },
}

export const MISTAKE_TYPES = Object.keys(MISTAKE_LABELS)

/** Safe lookup — unknown/absent types render as nothing rather than crashing. */
export function mistakeLabelOf(type) {
  return MISTAKE_LABELS[type] ?? null
}

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

/**
 * Find questions that test the same thing as `question` without being the same
 * question — the "one similar retry" half of the mistake loop. Re-serving the
 * identical item rewards recognition; a sibling question tests the skill.
 *
 * Never crosses topics (a "similar" question from another unit isn't similar).
 * Ranks a matching subTopic above a near-equal difficulty, and rejects anything
 * more than one difficulty step away so the retry is neither a gimme nor a wall.
 * Ties keep pool order, so the result is deterministic for a given pool.
 *
 *   exclude — Set of question keys already served this session
 */
export function findSimilar(question, pool = [], { exclude = new Set(), limit = 1 } = {}) {
  if (!question || !Array.isArray(pool) || !pool.length) return []

  const originKey = questionKey(question)
  const originDiff = difficultyOf(question)
  const { topic, subTopic } = question

  const scored = []
  for (const q of pool) {
    const key = questionKey(q)
    if (key === originKey || exclude.has(key)) continue
    // Review runs in multiple-choice mode; a written item can't stand in.
    if (!Array.isArray(q.choices) || q.choices.length < 2) continue
    if (topic && q.topic !== topic) continue

    const gap = Math.abs(difficultyOf(q) - originDiff)
    if (gap > 1) continue

    const score = (subTopic && q.subTopic === subTopic ? 2 : 0) + (1 - gap * 0.5)
    scored.push({ q, score })
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ q }) => q)
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
 *   similarPool — optional question pool; when given, an item the student has
 *                 already re-answered correctly (box ≥ swapFromBox) is served as
 *                 a SIMILAR question instead of the identical one, so the retry
 *                 tests the skill rather than recognition. The substitute
 *                 carries `__retryFor` (the original's key) so answering it
 *                 still advances or resets the original queue entry.
 *   swapFromBox — first Leitner box eligible for substitution (default 2: the
 *                 first re-encounter after a miss is always the same question).
 */
export function buildReviewSet({ items = [], subject, topic = null, weakMastery = {}, daysToExam = null, limit = 15, similarPool = null, swapFromBox = 2 } = {}) {
  const now = Date.now()
  // Match `topic` against either the normalized topic OR the finer subTopic, so
  // sub-topic-defined units (e.g. the LE Cell Biology split) resolve correctly.
  const pool = items.filter((e) =>
    (!subject || e.subject === subject) && (!topic || e.topic === topic || e.subTopic === topic)
  )
  const chosen = pool
    .map((e) => ({ e, p: priority(e, { now, weakMastery, daysToExam }) }))
    .sort((a, b) => b.p - a.p)
    .slice(0, limit)
    .map(({ e }) => e)

  if (!similarPool?.length) return chosen

  // Swap in siblings where recognition would otherwise do the work.
  const used = new Set(chosen.map(questionKey))
  return chosen.map((e) => {
    if ((e.box ?? 1) < swapFromBox) return e
    const [sub] = findSimilar(e, similarPool, { exclude: used })
    if (!sub) return e
    used.add(questionKey(sub))
    // Keep the entry's subject so the substitute files under the right subject.
    return { ...sub, subject: e.subject, __retryFor: questionKey(e) }
  })
}
