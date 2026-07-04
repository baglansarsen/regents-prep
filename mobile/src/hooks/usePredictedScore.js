import { useEffect, useMemo } from 'react'
import { useExamScores } from './useExamScores'
import { useDailyStreak } from './useDailyStreak'
import { useGoal } from '../context/GoalContext'
import { predictRegentsScore, smoothPrediction, weakestUnitOf, weakestAttemptedUnitOf } from '../utils/predictedScore'
import { REGENTS_EXAMS } from '../content/regents-exams/index'
import { localDateStr } from '../utils/localDate'

/**
 * usePredictedScore — assembles every study signal into a predicted Regents
 * score for the active subject and keeps the goal's smoothing anchor fresh.
 *
 * @param {string} subject   active subject id
 * @param {Array}  units     sd.UNITS for that subject
 * @param {Array}  history   subject-filtered quiz history (from useProgress)
 * @returns {{ predicted: number|null, rawPredicted: number|null, coldStart: boolean,
 *             examCount: number, topicBreakdown: Array, weakestUnit: object|null,
 *             hasTakenPracticeExam: boolean }}
 */
export function usePredictedScore(subject, units = [], history = []) {
  const { scores }                 = useExamScores()
  const { streak, studiedDates }   = useDailyStreak()
  const { getGoal, updatePredicted } = useGoal()

  const subjectExamIds = useMemo(
    () => (REGENTS_EXAMS[subject] ?? []).map((e) => e.id),
    [subject],
  )

  const result = useMemo(
    () => predictRegentsScore({
      examScores: scores,
      subjectExamIds,
      units,
      history,
      streak,
      studiedDates,
    }),
    [scores, subjectExamIds, units, history, streak, studiedDates],
  )

  const goal   = getGoal(subject)
  const anchor = goal?.predicted ?? null
  const smoothed = useMemo(
    () => smoothPrediction(anchor, result.score, localDateStr()),
    [anchor?.value, anchor?.date, result.score],
  )

  // Persist the anchor whenever it moves (updatePredicted skips no-op writes
  // and does nothing when no goal is set for the subject).
  useEffect(() => {
    if (smoothed) updatePredicted(subject, smoothed)
  }, [subject, smoothed?.value, smoothed?.date, updatePredicted])

  // Memoized — a fresh object identity per render here would cascade into
  // HomeScreen's smartQuestDef memo and its focus effect, re-running it every
  // render (render loop). Stable as long as `result` is stable.
  const weakestUnit          = useMemo(() => weakestUnitOf(result.topicBreakdown), [result])
  // Attempted-only variant for weak-unit drills (mission card / smart quest) —
  // weakestUnit ranks unattempted units first, which would mask genuinely weak
  // attempted topics behind untouched ones.
  const weakestAttemptedUnit = useMemo(() => weakestAttemptedUnitOf(result.topicBreakdown), [result])

  return {
    predicted:    smoothed?.value ?? result.score,
    rawPredicted: result.score,
    coldStart:    result.coldStart,
    examCount:    result.examCount,
    topicBreakdown: result.topicBreakdown,
    weakestUnit,
    weakestAttemptedUnit,
    hasTakenPracticeExam: result.examCount > 0,
  }
}
