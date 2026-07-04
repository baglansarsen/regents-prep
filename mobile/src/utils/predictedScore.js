/**
 * predictedScore — pure functions estimating a student's Regents score from
 * everything they've done in the app: practice-exam results, per-topic quiz
 * mastery, and study consistency.
 *
 * ⚠️ ESTIMATE ONLY (see utils/examScoring.js) — every UI surface must label
 * the number as an estimate.
 *
 * Kept free of hooks/content imports so it's unit-testable: callers supply
 * exam ids, units, and history (see hooks/usePredictedScore.js).
 */

import { getScaledScore } from './examScoring'

// A topic the student has never attempted isn't a 0 — on a real MC exam,
// partial knowledge + elimination puts a floor well above zero. Treat
// unattempted topics as this prior percentage.
const UNATTEMPTED_PRIOR_PCT = 40

/**
 * @param {object} args
 * @param {object} args.examScores      {[examId]: {best,last}} from exam_scores_v1
 * @param {string[]} args.subjectExamIds  exam ids belonging to the active subject
 * @param {Array}  args.units           sd.UNITS — [{topic, title, ...}]
 * @param {Array}  args.history         subject-filtered quiz history [{topic, pct}] newest-first
 * @param {number} args.streak
 * @param {string[]} args.studiedDates  ['YYYY-MM-DD', ...]
 * @returns {{score: number|null, coldStart: boolean, examCount: number,
 *            components: {examAvg: number|null, masteryScaled: number, consistency: number},
 *            topicBreakdown: Array<{topic, title, pct: number|null, attempts: number}>}}
 */
export function predictRegentsScore({
  examScores = {},
  subjectExamIds = [],
  units = [],
  history = [],
  streak = 0,
  studiedDates = [],
} = {}) {
  // ── Exam component (already in 50–100 scaled space) ───────────────────────
  const idSet = new Set(subjectExamIds)
  const attempted = Object.entries(examScores).filter(([id, v]) => idSet.has(id) && v)
  // best = ceiling of demonstrated ability, last = current form
  const examValues = attempted.map(([, v]) => 0.5 * (v.best ?? 0) + 0.5 * (v.last ?? v.best ?? 0))
  const examCount  = examValues.length
  const examAvg    = examCount ? examValues.reduce((a, b) => a + b, 0) / examCount : null

  // ── Mastery component (per-unit best quiz pct → scaled space) ─────────────
  const topicBreakdown = units.map((u) => {
    const rows = history.filter((h) => h.topic === u.topic)
    const pct  = rows.length ? Math.max(...rows.map((h) => h.pct ?? 0)) : null
    return { topic: u.topic, title: u.title, pct, attempts: rows.length }
  })
  const attemptedTopics = topicBreakdown.filter((t) => t.pct !== null)

  // Mixed-topic rows ('All Topics' checkups / mixed quizzes) match no unit but
  // are still real signal: they clear cold start and stand in for the
  // unattempted-topic prior until per-topic data arrives.
  const unitTopics = new Set(units.map((u) => u.topic))
  const mixedRows  = history.filter((h) => !unitTopics.has(h.topic))
  const mixedPct   = mixedRows.length
    ? mixedRows.reduce((sum, h) => sum + (h.pct ?? 0), 0) / mixedRows.length
    : null

  const priorPct = mixedPct ?? UNATTEMPTED_PRIOR_PCT
  const meanPct = topicBreakdown.length
    ? topicBreakdown.reduce((sum, t) => sum + (t.pct ?? priorPct), 0) / topicBreakdown.length
    : 0
  const masteryScaled = getScaledScore(meanPct, 100)

  // ── Cold start: literally nothing to estimate from ────────────────────────
  if (examCount === 0 && attemptedTopics.length === 0 && mixedRows.length === 0) {
    return {
      score: null, coldStart: true, examCount: 0,
      components: { examAvg: null, masteryScaled, consistency: 0 },
      topicBreakdown,
    }
  }

  // ── Blend — exam-heavy as real exam data arrives ───────────────────────────
  const wExam = examCount === 0 ? 0 : Math.min(0.8, 0.45 + 0.15 * Math.min(examCount, 3))
  const blended = wExam * (examAvg ?? 0) + (1 - wExam) * masteryScaled

  // ── Consistency bonus (bounded +3) ─────────────────────────────────────────
  let consistency = 0
  if (streak >= 3) consistency += 1
  if (streak >= 7) consistency += 1
  const last14 = new Set(studiedDates.slice(-14))
  if (last14.size >= 8) consistency += 1

  const score = Math.round(Math.min(100, Math.max(50, blended + consistency)))

  return {
    score, coldStart: false, examCount,
    components: { examAvg, masteryScaled, consistency },
    topicBreakdown,
  }
}

/**
 * Stabilize the displayed prediction so it can't whipsaw:
 *  - no anchor yet → show raw
 *  - same local day → keep the day's number (but improvements show immediately)
 *  - new day → move at most −3 (drops are softened) or +5 (rises ramp quicker)
 *
 * @param {{value:number, date:string}|null} prev   persisted anchor
 * @param {number|null} raw                          today's raw prediction
 * @param {string} todayStr                          localDateStr()
 * @returns {{value:number, date:string}|null}       new anchor (persist this)
 */
export function smoothPrediction(prev, raw, todayStr) {
  if (raw == null) return prev ?? null
  if (!prev || prev.value == null) return { value: raw, date: todayStr }
  if (prev.date === todayStr) {
    return raw > prev.value ? { value: raw, date: todayStr } : prev
  }
  const step = Math.min(5, Math.max(-3, raw - prev.value))
  return { value: prev.value + step, date: todayStr }
}

/** The unit with the lowest effective mastery (unattempted counts lowest). */
export function weakestUnitOf(topicBreakdown = []) {
  if (!topicBreakdown.length) return null
  const scored = topicBreakdown.map((t) => ({ ...t, eff: t.pct ?? -1 }))
  scored.sort((a, b) => a.eff - b.eff)
  return scored[0]
}

/**
 * The weakest unit the student has actually ATTEMPTED (null until any attempt).
 * weakestUnitOf always surfaces unattempted units first, which is right for
 * "where to start" UIs but wrong for "what to strengthen" — this variant is
 * what drives weak-unit drills (Today's Mission, smart quest).
 */
export function weakestAttemptedUnitOf(topicBreakdown = []) {
  const attempted = topicBreakdown.filter((t) => t.pct != null)
  if (!attempted.length) return null
  return attempted.reduce((min, t) => (t.pct < min.pct ? t : min))
}
