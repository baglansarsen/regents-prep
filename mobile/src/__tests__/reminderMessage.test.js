// Daily reminder text (study plan Phase 4): plan-aware first, then goal, then streak.
import AsyncStorage from '@react-native-async-storage/async-storage'

const mockSchedule = jest.fn(() => Promise.resolve())
jest.mock('expo-notifications', () => ({
  scheduleNotificationAsync: (...a) => mockSchedule(...a),
  cancelScheduledNotificationAsync: jest.fn(() => Promise.resolve()),
  setNotificationHandler: jest.fn(),
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
}), { virtual: true })

const { buildMessage, rescheduleDailyReminder, REMINDER_GOAL_INFO_KEY } = require('../hooks/useNotifications')

describe('buildMessage', () => {
  test('learn phase names the next unit and minutes', () => {
    expect(buildMessage(3, { phase: 'learn', nextUp: 'Atomic Structure', minutes: 15, pointsToGo: 5, target: 75 }))
      .toBe('📘 Next up: Atomic Structure, about 15 min today.')
  })
  test('strengthen phase names the unit to drill', () => {
    expect(buildMessage(0, { phase: 'strengthen', nextUp: 'Bonding', minutes: 25 })).toBe('🎯 Today: drill Bonding, about 25 min.')
  })
  test('exam prep and final week', () => {
    expect(buildMessage(0, { phase: 'exam_prep', minutes: 40 })).toBe('📝 Exam prep: a practice exam or mistake review today, about 40 min.')
    expect(buildMessage(0, { phase: 'final_week', daysToExam: 4, minutes: 15 })).toBe('🎯 4 days to your Regents. Review your mistakes today, about 15 min.')
    expect(buildMessage(0, { phase: 'final_week', daysToExam: 1 })).toBe('🎯 Your Regents is tomorrow. A light review, then rest up.')
  })
  test('without a plan it falls back to goal points, then streak', () => {
    expect(buildMessage(0, { pointsToGo: 6, target: 75, daysToExam: 60 })).toMatch(/^📈 6 points to your 75 goal/)
    expect(buildMessage(8, null)).toMatch(/8-day streak/)
  })
})

describe('reminder goal text survives a streak reschedule', () => {
  beforeEach(async () => {
    mockSchedule.mockClear()
    await AsyncStorage.clear()
    await AsyncStorage.setItem('@regents_notifications_v2', JSON.stringify({ enabled: true, hour: 19, minute: 0 }))
  })
  test('the bridge stores its goal info, and clearing removes it', async () => {
    await rescheduleDailyReminder({ streak: 2, goalInfo: { phase: 'learn', nextUp: 'Unit 1', minutes: 15 } })
    expect(JSON.parse(await AsyncStorage.getItem(REMINDER_GOAL_INFO_KEY))).toMatchObject({ nextUp: 'Unit 1' })
    expect(mockSchedule.mock.calls[0][0].content.body).toBe('📘 Next up: Unit 1, about 15 min today.')
    await rescheduleDailyReminder({ streak: 2, goalInfo: null })
    expect(await AsyncStorage.getItem(REMINDER_GOAL_INFO_KEY)).toBeNull()
  })
})
