/**
 * pilotLearnMode — Learn Mode pilot probe (docs/designs/learn-mode-pilot-probe.md).
 *
 * Client-side only, scoped to this pilot. Deliberately NOT added to
 * shared/content/geometry/questions.js — these are draft pre-answer hints for
 * one topic (Congruence & Transformations), pending teacher-friend validation
 * before any wider rollout. Delete or promote after the pilot resolves.
 *
 * Tests whether showing a "why" hint BEFORE the student attempts the question
 * changes 24h retention, vs. the existing post-answer explanation flow.
 */

// docs/designs/learn-mode-pilot-content.md — question ids 3001-3006,
// Congruence & Transformations (shared/content/geometry/questions.js).
export const PILOT_HINTS = {
  3001: "Why: An isometry is any move that doesn't stretch or shrink the shape — think of sliding a puzzle piece across a table without resizing it.",
  3002: 'Why: SAS only works when the angle is *between* the two matching sides — like a hinge. If the angle isn’t sandwiched between the two sides, SAS doesn’t apply.',
  3003: 'Why: Reflecting across the x-axis flips a point vertically — the x stays put, the y flips sign. Picture folding the graph paper along the x-axis.',
  3004: 'Why: Of all the side/angle combos, only one lets you build two different triangles from the same three pieces — that’s why it’s excluded as a valid shortcut. Think about which combo leaves the triangle’s shape ambiguous.',
  3005: 'Why: A 180° spin is a half-turn — every point ends up diagonally opposite where it started, on the other side of the origin.',
  3006: 'Why: "Reflexive" comes from "reflect back on itself" — this reason is used whenever a proof needs to say something is equal to itself, like a shared side in two triangles.',
}

export function isPilotQuestion(question) {
  return !!question && Object.prototype.hasOwnProperty.call(PILOT_HINTS, question.id)
}

// Deterministic string hash (djb2) — same uid always lands in the same
// variant, no server round-trip needed for a 6-question pilot.
function hashString(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i)
  }
  return hash >>> 0
}

/** 'A' (control, no pre-answer hint) or 'B' (test, sees the hint). */
export function getPilotVariant(uid) {
  if (!uid) return 'A'
  return hashString(uid) % 2 === 0 ? 'A' : 'B'
}

/** The pre-answer hint text for this question+user, or null if not applicable. */
export function getPilotHint(question, uid) {
  if (!isPilotQuestion(question)) return null
  if (getPilotVariant(uid) !== 'B') return null
  return PILOT_HINTS[question.id]
}
