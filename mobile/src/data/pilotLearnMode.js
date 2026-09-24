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
 *
 * v2, teacher-reviewed 2026-09-24 against observed student errors — see
 * docs/designs/learn-mode-pilot-content.md for the per-question rationale.
 * v1 (undocumented here) leaked the answer on Q3003 and risked being
 * factually wrong on Q3004; do not revert to it.
 */

// docs/designs/learn-mode-pilot-content.md — question ids 3001-3006,
// Congruence & Transformations (shared/content/geometry/questions.js).
export const PILOT_HINTS = {
  3001: 'Why: "Isometry" is just the textbook word for what the Regents calls a rigid motion — a move where the image is congruent to the original. The catch: "same shape" is not enough. Ask which option keeps the shape but changes the size.',
  3002: 'Why: SAS only works when the angle is the included angle — the one between the two matching sides, like a hinge. If the angle sits at the end of the sides instead of between them, it’s not SAS.',
  3003: 'Why: Points sitting on the mirror line don’t move when you reflect. So before you answer, ask: for a point on the x-axis, which coordinate is already fixed? That’s the coordinate that stays the same for every point.',
  3004: 'Why: A shortcut is only valid if the given pieces lock in exactly one triangle. Two combos fail that test: one lets you build a bigger or smaller copy of the same shape, the other can swing to two different triangles. Look for the combo that doesn’t pin the triangle down.',
  3005: 'Why: A 180° spin is a half-turn — the point lands on the exact opposite side of the origin, same distance away. If you started in Quadrant I, where do you have to end up?',
  3006: 'Why: Reflexive is the reason you cite when something equals itself — the go-to case is a side or angle shared by two triangles. If two different things are being set equal, it’s a different property.',
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
