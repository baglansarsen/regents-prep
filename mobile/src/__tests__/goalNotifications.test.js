// Per-subject exam countdowns (study plan Phase 5).
const mockScheduled = new Map()
jest.mock('expo-notifications', () => ({
  scheduleNotificationAsync: jest.fn(async ({ identifier, content }) => { mockScheduled.set(identifier, content) }),
  cancelScheduledNotificationAsync: jest.fn(async (id) => { mockScheduled.delete(id) }),
  getAllScheduledNotificationsAsync: jest.fn(async () => [...mockScheduled.keys()].map((identifier) => ({ identifier }))),
}), { virtual: true })

const {
  scheduleExamCountdowns, cancelExamCountdowns, cancelLegacyCountdowns, cancelGoalNotifications, countdownId,
} = require('../utils/goalNotifications')

const inDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); const p = (x) => String(x).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}` }

beforeEach(() => mockScheduled.clear())

test('each subject gets its own countdown ids; future ones only', async () => {
  await scheduleExamCountdowns({ subject: 'chemistry', examDateStr: inDays(10), target: 75, subjectName: 'Chemistry' })
  await scheduleExamCountdowns({ subject: 'physics', examDateStr: inDays(40), target: 85, subjectName: 'Physics' })
  expect([...mockScheduled.keys()].sort()).toEqual([
    'goal-exam-chemistry-1', 'goal-exam-chemistry-3', 'goal-exam-chemistry-7',
    'goal-exam-physics-1', 'goal-exam-physics-14', 'goal-exam-physics-3', 'goal-exam-physics-30', 'goal-exam-physics-7',
  ])
  expect(mockScheduled.get('goal-exam-physics-30').body).toMatch(/^Physics Regents in 30 days/)
})

test('cancelling one subject leaves the others', async () => {
  await scheduleExamCountdowns({ subject: 'chemistry', examDateStr: inDays(40), target: 75, subjectName: 'Chemistry' })
  await scheduleExamCountdowns({ subject: 'physics', examDateStr: inDays(40), target: 75, subjectName: 'Physics' })
  await cancelExamCountdowns('chemistry')
  expect([...mockScheduled.keys()].every((id) => id.startsWith('goal-exam-physics-'))).toBe(true)
})

test('legacy single-subject ids are cleaned up', async () => {
  mockScheduled.set('goal-exam-7', {}); mockScheduled.set('goal-exam-physics-7', {})
  await cancelLegacyCountdowns()
  expect([...mockScheduled.keys()]).toEqual(['goal-exam-physics-7'])
})

test('turning notifications off removes every goal notification', async () => {
  mockScheduled.set('goal-exam-7', {}); mockScheduled.set('goal-weekly-report', {}); mockScheduled.set('daily-reminder', {})
  await scheduleExamCountdowns({ subject: 'physics', examDateStr: inDays(40), target: 75, subjectName: 'Physics' })
  await cancelGoalNotifications()
  expect([...mockScheduled.keys()]).toEqual(['daily-reminder'])
})

test('countdownId keeps the legacy shape without a subject', () => {
  expect(countdownId(null, 7)).toBe('goal-exam-7')
  expect(countdownId('physics', 7)).toBe('goal-exam-physics-7')
})
