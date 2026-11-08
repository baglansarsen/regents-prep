/**
 * subjectPlan — one subject's study plan from raw app data, as a pure function.
 * Shared by useStudyPlan (active subject) and useAllStudyPlans (every subject
 * with a goal) so the numbers for a subject are identical everywhere.
 * Design: docs/designs/exam-date-study-plan.md (Phases 3 and 5).
 */
import { buildStudyPlan } from './studyPlan'
import { predictRegentsScore } from './predictedScore'
import { isGoalDatePassed } from './examDates'
import { PASSING_PCT } from './studyConstants'

/** Completed lessons per unit topic: a lesson counts once its best score ≥ passing (as useLessonProgress). */
export function lessonsDoneByTopicFrom(units = [], subjectHistory = []) {
  const best = new Map()
  for (const h of subjectHistory) {
    if (h.lessonIndex == null) continue
    const key = `${h.topic}::${h.lessonIndex}`
    if ((h.pct ?? 0) > (best.get(key) ?? 0)) best.set(key, h.pct)
  }
  const out = {}
  for (const u of units) {
    let n = 0
    for (let i = 0; i < (u.lessonCount ?? 0); i++) {
      if ((best.get(`${u.topic}::${i}`) ?? 0) >= PASSING_PCT) n++
    }
    out[u.topic] = n
  }
  return out
}

/** Mistakes due now for one subject (same rule as useMistakes). */
export function dueCountFor(subject, mistakes = [], now = Date.now()) {
  return mistakes.filter((e) => e.subject === subject && (e.due ?? 0) <= now).length
}

/**
 * @returns {object|null} buildStudyPlan output, or null with no goal / a passed date
 */
export function buildSubjectPlan({
  subject, goal, today, units = [], subjectHistory = [], subjectExamIds = [],
  examScores = {}, streak = 0, studiedDates = [], dueCount = 0,
}) {
  if (!goal?.examDateStr || isGoalDatePassed(goal.examDateStr)) return null
  const prediction = predictRegentsScore({
    examScores, subjectExamIds, units, history: subjectHistory, streak, studiedDates,
  })
  return buildStudyPlan({
    today,
    examDateStr:  goal.examDateStr,
    target:       goal.target,
    availability: goal.availability,
    units,
    lessonsDoneByTopic: lessonsDoneByTopicFrom(units, subjectHistory),
    topicBreakdown: prediction.topicBreakdown ?? [],
    predicted:    prediction.coldStart ? null : prediction.score,
    dueCount,
    practiceExamsTaken: prediction.examCount ?? 0,
    coldStart:    prediction.coldStart,
  })
}
