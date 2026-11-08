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
jest.mock('../hooks/useNotifications', () => ({ rescheduleDailyReminder: jest.fn(() => Promise.resolve()) }))
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
