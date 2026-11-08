import { useMemo } from 'react'
import { useGoal } from '../context/GoalContext'
import { useAuthContext } from '../context/AuthContext'
import { useExamScores } from './useExamScores'
import { useDailyStreak } from './useDailyStreak'
import { useMistakes } from './useMistakes'
import { useProgress } from './useProgress'
import { buildSubjectPlan, dueCountFor } from '../utils/subjectPlan'
import { subjectData } from '../content/subjectData'
import { SUBJECT_META } from '../content/subjects'
import { REGENTS_EXAMS } from '../content/regents-exams/index'
import { localDateStr } from '../utils/localDate'

const examIdsOf = (subject) => (REGENTS_EXAMS[subject] ?? []).map((e) => e.id)

/**
 * The student's study plan for one subject, from their saved goal and current
 * progress (docs/designs/exam-date-study-plan.md, Phase 3). One source for Home
 * and My Plan so they never disagree; built by utils/subjectPlan like every
 * other subject's plan (useAllStudyPlans).
 *
 * Returns { plan, goal } — plan is null when there's no goal, its exam date
 * has passed, or goals haven't loaded yet.
 */
export function useStudyPlan(subject, units = [], subjectHistory = []) {
  const { getGoal, loaded } = useGoal()
  const goal = getGoal(subject)
  const { scores } = useExamScores()
  const { streak, studiedDates } = useDailyStreak()
  const { mistakes } = useMistakes(null)
  const today = localDateStr()

  const plan = useMemo(() => {
    if (!loaded) return null
    return buildSubjectPlan({
      subject, goal, today, units, subjectHistory,
      subjectExamIds: examIdsOf(subject),
      examScores: scores, streak, studiedDates,
      dueCount: dueCountFor(subject, mistakes),
    })
  }, [loaded, subject, goal, today, units, subjectHistory, scores, streak, studiedDates, mistakes])

  return { plan, goal }
}

/**
 * Every subject with a goal → its plan (study plan Phase 5). Passed-date goals
 * are included with plan: null so callers can show "date passed".
 * Returns { entries: [{ subject, name, icon, goal, plan }], loaded }.
 */
export function useAllStudyPlans() {
  const { user } = useAuthContext()
  const { goals, loaded } = useGoal()
  const { history } = useProgress(user?.uid)
  const { scores } = useExamScores()
  const { streak, studiedDates } = useDailyStreak()
  const { mistakes } = useMistakes(null)
  const today = localDateStr()

  const entries = useMemo(() => {
    if (!loaded) return []
    return Object.entries(goals ?? {})
      .filter(([, goal]) => goal && goal.examDateStr)
      .map(([subject, goal]) => {
        const units = subjectData(subject)?.UNITS ?? []
        const subjectHistory = history.filter((h) => (h.subject ?? 'living-environment') === subject)
        const meta = SUBJECT_META[subject] ?? { name: subject, icon: '🎓' }
        return {
          subject, name: meta.name, icon: meta.icon, goal,
          plan: buildSubjectPlan({
            subject, goal, today, units, subjectHistory,
            subjectExamIds: examIdsOf(subject),
            examScores: scores, streak, studiedDates,
            dueCount: dueCountFor(subject, mistakes),
          }),
        }
      })
  }, [loaded, goals, history, scores, streak, studiedDates, mistakes, today])

  return { entries, loaded }
}
