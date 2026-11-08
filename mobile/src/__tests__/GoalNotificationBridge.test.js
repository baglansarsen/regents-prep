// Goal notification bridge.
// Phase 0: a passed exam date gets no countdowns / no negative day counts.
// Phase 4: the reminder and weekly report follow the plan.
// Phase 5: countdowns for every subject with a goal; report covers them all.
// Plan: docs/designs/exam-date-study-plan.md
import React from 'react'
import { render, act } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

let mockGoals = {}
let mockEntries = []
jest.mock('../context/AuthContext', () => ({ useAuthContext: () => ({ user: { uid: 'u1' } }) }))
jest.mock('../context/SubjectContext', () => ({ useSubject: () => ({ subject: 'chemistry' }) }))
jest.mock('../context/GoalContext', () => ({
  useGoal: () => ({ getGoal: (s) => mockGoals[s] ?? null, goals: mockGoals, loaded: true }),
}))
jest.mock('../context/StreakContext', () => ({ useStreak: () => ({ streak: 2, studiedToday: false }) }))
jest.mock('../hooks/useNotifications', () => ({
  rescheduleDailyReminder: jest.fn(() => Promise.resolve()),
  REMINDER_GOAL_INFO_KEY: '@reminderGoalInfo_v1',
}))
jest.mock('../hooks/useStudyPlan', () => ({ useAllStudyPlans: () => ({ entries: mockEntries, loaded: true }) }))
jest.mock('../utils/goalNotifications', () => ({
  scheduleExamCountdowns:  jest.fn(() => Promise.resolve()),
  scheduleStreakRisk:      jest.fn(() => Promise.resolve()),
  scheduleWeeklyReport:    jest.fn(() => Promise.resolve()),
  cancelGoalNotifications: jest.fn(() => Promise.resolve()),
  cancelExamCountdowns:    jest.fn(() => Promise.resolve()),
  cancelLegacyCountdowns:  jest.fn(() => Promise.resolve()),
}))

const notif = require('../utils/goalNotifications')
const { rescheduleDailyReminder } = require('../hooks/useNotifications')
const { GoalNotificationBridge } = require('../hooks/useGoalNotificationScheduler')

const ymd = (offsetDays) => {
  const d = new Date(); d.setDate(d.getDate() + offsetDays)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}
const LEARN_PLAN = {
  phase: 'learn', daysLeft: 40, todayBudgetMinutes: 25,
  thisWeek: { units: [{ title: 'Atomic Structure', lessons: 2 }], weakUnits: [] },
  pace: { status: 'on_track', shortfallLessons: 0 },
  feasibility: { fits: true, suggestions: [] },
}

beforeEach(async () => {
  jest.clearAllMocks()
  mockGoals = {}
  mockEntries = []
  await AsyncStorage.clear()
  await AsyncStorage.setItem('@regents_notifications_v2', JSON.stringify({ enabled: true, hour: 19, minute: 0 }))
})

async function runBridge() {
  await render(<GoalNotificationBridge />)
  await act(async () => {})
}

test('a passed exam date (only goal) cancels goal notifications and schedules none', async () => {
  mockGoals = { chemistry: { target: 75, examDateStr: ymd(-3), predicted: { value: 70 } } }
  await runBridge()
  expect(notif.cancelGoalNotifications).toHaveBeenCalled()
  expect(notif.scheduleExamCountdowns).not.toHaveBeenCalled()
  expect(rescheduleDailyReminder).not.toHaveBeenCalled()
})

test('an upcoming exam date schedules countdowns and a goal-aware reminder', async () => {
  mockGoals = { chemistry: { target: 75, examDateStr: ymd(40), predicted: { value: 70 } } }
  await runBridge()
  expect(notif.scheduleExamCountdowns).toHaveBeenCalledWith(expect.objectContaining({ subject: 'chemistry', examDateStr: ymd(40), target: 75 }))
  expect(notif.cancelLegacyCountdowns).toHaveBeenCalled()
  expect(rescheduleDailyReminder).toHaveBeenCalledWith(expect.objectContaining({
    goalInfo: expect.objectContaining({ daysToExam: 40, target: 75 }),
  }))
})

test('exam day itself still counts as upcoming', async () => {
  mockGoals = { chemistry: { target: 65, examDateStr: ymd(0) } }
  await runBridge()
  expect(notif.cancelGoalNotifications).not.toHaveBeenCalled()
  expect(notif.scheduleExamCountdowns).toHaveBeenCalled()
})

test('the reminder carries the plan: phase, next unit and minutes', async () => {
  mockGoals = { chemistry: { target: 75, examDateStr: ymd(40), predicted: { value: 70 } } }
  mockEntries = [{ subject: 'chemistry', name: 'Chemistry', goal: mockGoals.chemistry, plan: LEARN_PLAN }]
  await runBridge()
  expect(rescheduleDailyReminder).toHaveBeenCalledWith(expect.objectContaining({
    goalInfo: expect.objectContaining({ phase: 'learn', nextUp: 'Atomic Structure', minutes: 25 }),
  }))
  expect(notif.scheduleWeeklyReport).toHaveBeenCalledWith({ body: 'Chemistry: On track. Next up in Chemistry: Atomic Structure.' })
})

test('a passed date clears goal text baked into the reminder', async () => {
  await AsyncStorage.setItem('@reminderGoalInfo_v1', JSON.stringify({ pointsToGo: 5, target: 75 }))
  mockGoals = { chemistry: { target: 75, examDateStr: ymd(-1) } }
  await runBridge()
  expect(rescheduleDailyReminder).toHaveBeenCalledWith(expect.objectContaining({ goalInfo: null }))
})

test('no goal text to clear → no extra reschedule', async () => {
  await runBridge()
  expect(rescheduleDailyReminder).not.toHaveBeenCalled()
})

// ── Phase 5 ──────────────────────────────────────────────────────────────────
test('every subject with an upcoming exam gets countdowns; passed ones are cancelled', async () => {
  mockGoals = {
    chemistry: { target: 75, examDateStr: ymd(40) },
    physics:   { target: 85, examDateStr: ymd(60) },
    'living-environment': { target: 65, examDateStr: ymd(-10) },
  }
  await runBridge()
  const subjects = notif.scheduleExamCountdowns.mock.calls.map(([a]) => a.subject).sort()
  expect(subjects).toEqual(['chemistry', 'physics'])
  expect(notif.cancelExamCountdowns).toHaveBeenCalledWith('living-environment')
  expect(notif.cancelGoalNotifications).not.toHaveBeenCalled()
})

test('active subject passed but another upcoming: keep its countdowns, clear reminder goal text', async () => {
  await AsyncStorage.setItem('@reminderGoalInfo_v1', JSON.stringify({ pointsToGo: 5, target: 75 }))
  mockGoals = { chemistry: { target: 75, examDateStr: ymd(-2) }, physics: { target: 85, examDateStr: ymd(60) } }
  await runBridge()
  expect(notif.cancelGoalNotifications).not.toHaveBeenCalled()
  expect(notif.scheduleExamCountdowns).toHaveBeenCalledWith(expect.objectContaining({ subject: 'physics' }))
  expect(rescheduleDailyReminder).toHaveBeenCalledWith(expect.objectContaining({ goalInfo: null }))
})

test('the weekly report covers every subject with a plan', async () => {
  mockGoals = { chemistry: { target: 75, examDateStr: ymd(40) }, physics: { target: 85, examDateStr: ymd(60) } }
  mockEntries = [
    { subject: 'chemistry', name: 'Chemistry', goal: mockGoals.chemistry, plan: LEARN_PLAN },
    { subject: 'physics', name: 'Physics', goal: mockGoals.physics, plan: { ...LEARN_PLAN, pace: { status: 'behind', shortfallLessons: 3 } } },
  ]
  await runBridge()
  expect(notif.scheduleWeeklyReport).toHaveBeenCalledWith({
    body: 'Chemistry: On track. Physics: 3 lessons behind. Next up in Chemistry: Atomic Structure.',
  })
})
