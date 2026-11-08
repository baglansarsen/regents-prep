import { useEffect, useRef, useCallback } from 'react'
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
import { useAllStudyPlans } from './useStudyPlan'
import { planProgressLine } from '../utils/studyPlanCopy'
import {
  scheduleExamCountdowns, scheduleStreakRisk, scheduleWeeklyReport,
  cancelGoalNotifications, cancelExamCountdowns, cancelLegacyCountdowns,
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

  // Every subject's plan: the active one feeds the reminder text ("Next up:
  // Unit 7, about 15 min"), all of them feed countdowns and the weekly report
  // (docs/designs/exam-date-study-plan.md, Phases 4–5).
  const { entries } = useAllStudyPlans()

  const passBusy = useRef(false)

  const runPass = useCallback(async () => {
    if (!uid || passBusy.current) return
    passBusy.current = true
    try {
      // Notifications off (or never enabled) → nothing to assert.
      let prefs = null
      try { prefs = JSON.parse((await AsyncStorage.getItem(PREFS_KEY)) ?? 'null') } catch {}
      if (!prefs?.enabled) return

      const today = localDateStr()
      const upcoming = (g) => !!g?.examDateStr && daysUntil(g.examDateStr) >= 0
      const goalSubjects = Object.keys(goals ?? {}).filter((sub) => goals[sub])

      // Nothing to plan for in any subject: no countdowns, report or goal text.
      if (!goalSubjects.some((sub) => upcoming(goals[sub]))) {
        await cancelGoalNotifications()
        const hadGoalText = await AsyncStorage.getItem(REMINDER_GOAL_INFO_KEY).catch(() => null)
        if (hadGoalText) await rescheduleDailyReminder({ streak, goalInfo: null })
        return
      }

      // The active subject drives the daily reminder.
      const goal = getGoal(subject)
      const activeUpcoming = upcoming(goal)
      const plan = entries.find((e) => e.subject === subject)?.plan ?? null
      const subjectName = SUBJECT_META[subject]?.name ?? 'Regents'
      const predicted   = goal?.predicted?.value ?? goal?.baselineScore ?? null
      const pointsToGo  = activeUpcoming && predicted != null ? Math.max(0, goal.target - predicted) : null
      const daysToExam  = activeUpcoming ? daysUntil(goal.examDateStr) : null
      const nextUp =
        plan?.phase === 'learn'      ? plan.thisWeek.units[0]?.title ?? null
        : plan?.phase === 'strengthen' ? plan.thisWeek.weakUnits[0]?.title ?? null
        : null
      const planInfo = plan ? { phase: plan.phase, nextUp, minutes: plan.todayBudgetMinutes } : {}

      // Streak-risk: re-evaluated every pass (depends on studiedToday intra-day).
      await scheduleStreakRisk({ studiedToday, streak })

      // Daily-cadence work: once per local day, or when any goal or the active plan changed.
      const goalsSig = goalSubjects.sort().map((sub) => `${sub}:${goals[sub].examDateStr}:${goals[sub].target}`).join('|')
      let stamp = null
      try { stamp = JSON.parse((await AsyncStorage.getItem(PASS_KEY(uid))) ?? 'null') } catch {}
      const stale =
        stamp?.date !== today ||
        stamp?.goalsSig !== goalsSig ||
        stamp?.subject !== subject ||
        (stamp?.phase ?? null) !== (plan?.phase ?? null) ||
        (stamp?.nextUp ?? null) !== nextUp
      if (!stale) return

      // Countdowns for every subject with an upcoming exam (Phase 5).
      await cancelLegacyCountdowns()
      for (const sub of goalSubjects) {
        const g = goals[sub]
        if (upcoming(g)) {
          await scheduleExamCountdowns({ subject: sub, examDateStr: g.examDateStr, target: g.target, subjectName: SUBJECT_META[sub]?.name ?? 'Regents' })
        } else {
          await cancelExamCountdowns(sub)
        }
      }

      // Weekly report: one line per subject with a live plan.
      const lines = entries
        .filter((e) => e.plan)
        .map((e) => `${e.name}: ${planProgressLine(e.plan, { committedAt: e.goal.committedAt ?? null, today })}.`)
      if (lines.length) {
        await scheduleWeeklyReport({ body: `${lines.join(' ')}${nextUp ? ` Next up in ${subjectName}: ${nextUp}.` : ''}` })
      } else if (activeUpcoming) {
        await scheduleWeeklyReport({
          body: pointsToGo != null
            ? `Predicted ${predicted} on ${subjectName} — ${pointsToGo} points to your ${goal.target} goal. Keep going!`
            : `Your ${subjectName} goal: ${goal.target}. Take a practice quiz to unlock your predicted score.`,
        })
      }

      // Daily reminder: the active subject's plan, else plain streak text.
      if (activeUpcoming) {
        await rescheduleDailyReminder({ streak, goalInfo: { pointsToGo, target: goal.target, daysToExam, ...planInfo } })
      } else {
        const hadGoalText = await AsyncStorage.getItem(REMINDER_GOAL_INFO_KEY).catch(() => null)
        if (hadGoalText) await rescheduleDailyReminder({ streak, goalInfo: null })
      }

      await AsyncStorage.setItem(PASS_KEY(uid), JSON.stringify({
        date: today, goalsSig, subject, phase: plan?.phase ?? null, nextUp,
      })).catch(() => {})
    } finally {
      passBusy.current = false
    }
  }, [uid, subject, getGoal, goals, streak, studiedToday, entries])

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
