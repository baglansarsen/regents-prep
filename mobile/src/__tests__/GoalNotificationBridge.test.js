// Phase 0 (docs/designs/exam-date-study-plan.md, G3): once the goal's exam
// date has passed, the bridge must not schedule countdowns or a goal-based
// reminder (raw daysUntil went negative and fed the reminder a past exam).
import React from 'react'
import { render, act } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

let mockGoal = null
jest.mock('../context/AuthContext', () => ({ useAuthContext: () => ({ user: { uid: 'u1' } }) }))
jest.mock('../context/SubjectContext', () => ({ useSubject: () => ({ subject: 'chemistry' }) }))
jest.mock('../context/GoalContext', () => ({
  useGoal: () => ({ getGoal: () => mockGoal, goals: { chemistry: mockGoal }, loaded: true }),
}))
jest.mock('../context/StreakContext', () => ({ useStreak: () => ({ streak: 2, studiedToday: false }) }))
jest.mock('../hooks/useNotifications', () => ({
  rescheduleDailyReminder: jest.fn(() => Promise.resolve()),
  REMINDER_GOAL_INFO_KEY: '@reminderGoalInfo_v1',
}))
let mockPlan = null
jest.mock('../hooks/useProgress', () => ({ useProgress: () => ({ history: [] }) }))
jest.mock('../hooks/useStudyPlan', () => ({ useStudyPlan: () => ({ plan: mockPlan, goal: null }) }))
jest.mock('../content/subjectData', () => ({ subjectData: () => ({ UNITS: [] }) }))
jest.mock('../utils/goalNotifications', () => ({
  scheduleExamCountdowns: jest.fn(() => Promise.resolve()),
  scheduleStreakRisk:     jest.fn(() => Promise.resolve()),
  scheduleWeeklyReport:   jest.fn(() => Promise.resolve()),
  cancelGoalNotifications: jest.fn(() => Promise.resolve()),
}))

const notif = require('../utils/goalNotifications')
const { rescheduleDailyReminder } = require('../hooks/useNotifications')
const { GoalNotificationBridge } = require('../hooks/useGoalNotificationScheduler')

const ymd = (offsetDays) => {
  const d = new Date(); d.setDate(d.getDate() + offsetDays)
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

beforeEach(async () => {
  jest.clearAllMocks()
  mockPlan = null
  await AsyncStorage.clear()
  await AsyncStorage.setItem('@regents_notifications_v2', JSON.stringify({ enabled: true, hour: 19, minute: 0 }))
})

async function runBridge() {
  await render(<GoalNotificationBridge />)
  await act(async () => {})
}

test('a passed exam date cancels goal notifications and schedules none', async () => {
  mockGoal = { target: 75, examDateStr: ymd(-3), predicted: { value: 70 } }
  await runBridge()
  expect(notif.cancelGoalNotifications).toHaveBeenCalled()
  expect(notif.scheduleExamCountdowns).not.toHaveBeenCalled()
  expect(rescheduleDailyReminder).not.toHaveBeenCalled()
})

test('an upcoming exam date schedules countdowns and a goal-aware reminder', async () => {
  mockGoal = { target: 75, examDateStr: ymd(40), predicted: { value: 70 } }
  await runBridge()
  expect(notif.scheduleExamCountdowns).toHaveBeenCalledWith(expect.objectContaining({ examDateStr: ymd(40), target: 75 }))
  expect(rescheduleDailyReminder).toHaveBeenCalledWith(expect.objectContaining({
    goalInfo: expect.objectContaining({ daysToExam: 40, target: 75 }),
  }))
})

test('exam day itself still counts as upcoming', async () => {
  mockGoal = { target: 65, examDateStr: ymd(0) }
  await runBridge()
  expect(notif.cancelGoalNotifications).not.toHaveBeenCalled()
  expect(notif.scheduleExamCountdowns).toHaveBeenCalled()
})

// ── Phase 4: plan-aware reminder + weekly report ─────────────────────────────
const LEARN_PLAN = {
  phase: 'learn', daysLeft: 40, todayBudgetMinutes: 25,
  thisWeek: { units: [{ title: 'Atomic Structure', lessons: 2 }], weakUnits: [] },
  pace: { status: 'on_track', shortfallLessons: 0 },
  feasibility: { fits: true, suggestions: [] },
}

test('the reminder carries the plan: phase, next unit and minutes', async () => {
  mockGoal = { target: 75, examDateStr: ymd(40), predicted: { value: 70 } }
  mockPlan = LEARN_PLAN
  await runBridge()
  expect(rescheduleDailyReminder).toHaveBeenCalledWith(expect.objectContaining({
    goalInfo: expect.objectContaining({ phase: 'learn', nextUp: 'Atomic Structure', minutes: 25 }),
  }))
  expect(notif.scheduleWeeklyReport).toHaveBeenCalledWith({ body: expect.stringMatching(/On track\. Next up: Atomic Structure\./) })
})

test('a passed date clears goal text baked into the reminder', async () => {
  await AsyncStorage.setItem('@reminderGoalInfo_v1', JSON.stringify({ pointsToGo: 5, target: 75 }))
  mockGoal = { target: 75, examDateStr: ymd(-1) }
  await runBridge()
  expect(rescheduleDailyReminder).toHaveBeenCalledWith(expect.objectContaining({ goalInfo: null }))
})

test('no goal text to clear → no extra reschedule', async () => {
  mockGoal = null
  await runBridge()
  expect(rescheduleDailyReminder).not.toHaveBeenCalled()
})
