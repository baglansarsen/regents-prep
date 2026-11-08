import { useMemo } from 'react'
import { useGoal } from '../context/GoalContext'
import { usePredictedScore } from './usePredictedScore'
import { useLessonProgress } from './useLessonProgress'
import { useMistakes } from './useMistakes'
import { buildStudyPlan } from '../utils/studyPlan'
import { isGoalDatePassed } from '../utils/examDates'
import { localDateStr } from '../utils/localDate'

/**
 * The student's study plan for one subject, from their saved goal and current
 * progress (docs/designs/exam-date-study-plan.md, Phase 3). One source for Home
 * and My Plan so they never disagree.
 *
 * Returns { plan, goal } — plan is null when there's no goal, or its exam date
 * has passed (Home asks for a new date in that case).
 */
export function useStudyPlan(subject, units = [], subjectHistory = []) {
  const { getGoal, loaded } = useGoal()
  const goal = getGoal(subject)
  const { rawPredicted, coldStart, topicBreakdown, examCount } =
    usePredictedScore(subject, units, subjectHistory)
  const { unitLessonsCompleted } = useLessonProgress(subjectHistory)
  const { dueCount } = useMistakes(subject)
  const today = localDateStr()

  const lessonsDoneByTopic = useMemo(
    () => Object.fromEntries(units.map((u) => [u.topic, unitLessonsCompleted(u.topic, u.lessonCount ?? 0)])),
    [units, subjectHistory], // eslint-disable-line react-hooks/exhaustive-deps
  )

  const plan = useMemo(() => {
    if (!loaded || !goal?.examDateStr || isGoalDatePassed(goal.examDateStr)) return null
    return buildStudyPlan({
      today,
      examDateStr:  goal.examDateStr,
      target:       goal.target,
      availability: goal.availability,
      units,
      lessonsDoneByTopic,
      topicBreakdown: topicBreakdown ?? [],
      predicted:    coldStart ? null : rawPredicted,
      dueCount,
      practiceExamsTaken: examCount ?? 0,
      coldStart,
    })
  }, [loaded, goal, today, units, lessonsDoneByTopic, topicBreakdown, coldStart, rawPredicted, dueCount, examCount])

  return { plan, goal }
}
