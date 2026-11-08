import { useEffect, useRef, useCallback, useMemo } from 'react'
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useGoal } from '../context/GoalContext'
import { useStreak } from '../context/StreakContext'
import { SUBJECT_META } from '../content/subjects'
import { daysUntil } from '../utils/examDates'
import { localDateStr } from '../utils/localDate'
import { rescheduleDailyReminder, REMINDER_GOAL_INFO_KEY } from './useNotifications'
import { useProgress } from './useProgress'
import { useStudyPlan } from './useStudyPlan'
import { subjectData } from '../content/subjectData'
import { planProgressLine } from '../utils/studyPlanCopy'
import {
  scheduleExamCountdowns, scheduleStreakRisk, scheduleWeeklyReport,
  cancelGoalNotifications,
} from '../utils/goalNotifications'

const PREFS_KEY = '@regents_notifications_v2'
const PASS_KEY  = (uid) => `@goalNotifs_v1_${uid}`

/**
 * GoalNotificationBridge — keeps every goal notification fresh.
 *
 * Local scheduled notifications have static bodies, so numbers (predicted
 * score, streak, days-to-exam) go stale the moment they change. This bridge
 * re-asserts everything with current values on app start, on foreground, and
 * whenever the goal or today's study status changes.
 *
 * Daily-cadence work (exam countdowns, weekly report, reminder body) is
 * guarded by a per-day stamp; the streak-risk alert re-evaluates on every
 * pass because it depends on whether the user studied *today*.
 *
 * Renders nothing. Only acts when the user has notifications enabled — the
 * permission flow stays exclusively in useNotifications.enable().
 */
export function GoalNotificationBridge() {
  const { user } = useAuthContext()
  const uid = user?.uid
  const { subject } = useSubject()
  const { getGoal, goals, loaded } = useGoal()
  const { streak, studiedToday } = useStreak()

  // The study plan feeds the reminder text ("Next up: Unit 7, about 15 min")
  // and the weekly report (docs/designs/exam-date-study-plan.md, Phase 4).
  const { history } = useProgress(uid)
  const units = subjectData(subject)?.UNITS ?? []
  const subjectHistory = useMemo(
    () => history.filter((h) => (h.subject ?? 'living-environment') === subject),
    [history, subject],
  )
  const { plan } = useStudyPlan(subject, units, subjectHistory)

  const passBusy = useRef(false)

  const runPass = useCallback(async () => {
    if (!uid || passBusy.current) return
    passBusy.current = true
    try {
      // Notifications off (or never enabled) → nothing to assert.
      let prefs = null
      try { prefs = JSON.parse((await AsyncStorage.getItem(PREFS_KEY)) ?? 'null') } catch {}
      if (!prefs?.enabled) return

      const goal = getGoal(subject)
      // No goal, or its exam date has passed: no countdowns or goal-based text
      // (raw daysUntil would go negative and feed the reminder a past exam).
      if (!goal || (goal.examDateStr && daysUntil(goal.examDateStr) < 0)) {
        await cancelGoalNotifications()
        // Drop goal/plan text from the daily reminder too (only when some was baked in).
        const hadGoalText = await AsyncStorage.getItem(REMINDER_GOAL_INFO_KEY).catch(() => null)
        if (hadGoalText) await rescheduleDailyReminder({ streak, goalInfo: null })
        return
      }

      const subjectName = SUBJECT_META[subject]?.name ?? 'Regents'
      const predicted   = goal.predicted?.value ?? goal.baselineScore ?? null
      const pointsToGo  = predicted != null ? Math.max(0, goal.target - predicted) : null
      const daysToExam  = goal.examDateStr ? daysUntil(goal.examDateStr) : null
      const today       = localDateStr()
      const nextUp =
        plan?.phase === 'learn'      ? plan.thisWeek.units[0]?.title ?? null
        : plan?.phase === 'strengthen' ? plan.thisWeek.weakUnits[0]?.title ?? null
        : null
      const planInfo = plan
        ? { phase: plan.phase, nextUp, minutes: plan.todayBudgetMinutes }
        : {}

      // Streak-risk: re-evaluated every pass (depends on studiedToday intra-day).
      await scheduleStreakRisk({ studiedToday, streak })

      // Daily-cadence work: once per local day, or when the goal itself changed.
      let stamp = null
      try { stamp = JSON.parse((await AsyncStorage.getItem(PASS_KEY(uid))) ?? 'null') } catch {}
      const stale =
        stamp?.date !== today ||
        stamp?.examDateStr !== goal.examDateStr ||
        stamp?.target !== goal.target ||
        (stamp?.phase ?? null) !== (plan?.phase ?? null) ||
        (stamp?.nextUp ?? null) !== nextUp
      if (!stale) return

      await scheduleExamCountdowns({ examDateStr: goal.examDateStr, target: goal.target, subjectName })
      const planLine = plan ? planProgressLine(plan, { committedAt: goal.committedAt ?? null, today }) : null
      await scheduleWeeklyReport({
        body: planLine
          ? `${subjectName}: ${planLine}.${nextUp ? ` Next up: ${nextUp}.` : ''}`
          : pointsToGo != null
          ? `Predicted ${predicted} on ${subjectName} — ${pointsToGo} points to your ${goal.target} goal. Keep going!`
          : `Your ${subjectName} goal: ${goal.target}. Take a practice quiz to unlock your predicted score.`,
      })
      await rescheduleDailyReminder({ streak, goalInfo: { pointsToGo, target: goal.target, daysToExam, ...planInfo } })

      await AsyncStorage.setItem(PASS_KEY(uid), JSON.stringify({
        date: today, examDateStr: goal.examDateStr, target: goal.target,
        phase: plan?.phase ?? null, nextUp,
      })).catch(() => {})
    } finally {
      passBusy.current = false
    }
  }, [uid, subject, getGoal, streak, studiedToday, plan])

  // On mount + whenever goal/studiedToday/subject change.
  useEffect(() => {
    if (!loaded) return
    runPass()
  }, [loaded, goals, subject, studiedToday, runPass])

  // On app foreground.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') runPass()
    })
    return () => sub.remove()
  }, [runPass])

  return null
}
