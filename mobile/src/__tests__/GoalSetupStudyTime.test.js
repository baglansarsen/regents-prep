// Goal setup saves the study time the student picks (study plan Phase 2).
// docs/designs/exam-date-study-plan.md
import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react-native'

let mockExisting = null
const mockCommitGoal = jest.fn(async (subject, target, base, date, extra) => ({ target, examDateStr: date, ...extra }))
const mockUpdateGoal = jest.fn(async (subject, patch) => ({ ...mockExisting, ...patch }))

jest.mock('../context/ThemeContext', () => {
  const C = new Proxy({}, { get: () => '#123456' })
  return { useTheme: () => ({ C }) }
})
jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native')
  return { SafeAreaView: View, useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }
})
jest.mock('../context/AuthContext', () => ({ useAuthContext: () => ({ user: { uid: 'u1', displayName: 'Sam' } }) }))
jest.mock('../context/SubjectContext', () => ({ useSubject: () => ({ subject: 'chemistry' }) }))
jest.mock('../context/GoalContext', () => ({
  useGoal: () => ({ getGoal: () => mockExisting, commitGoal: mockCommitGoal, updateGoal: mockUpdateGoal, setRescuePlan: jest.fn() }),
}))
jest.mock('../hooks/useProgress', () => ({ useProgress: () => ({ history: [] }) }))
jest.mock('../hooks/usePredictedScore', () => ({
  usePredictedScore: () => ({ rawPredicted: null, coldStart: true, topicBreakdown: [], examCount: 0 }),
}))
jest.mock('../hooks/useDailyStreak', () => ({ useDailyStreak: () => ({ streak: 0 }) }))
jest.mock('../hooks/useNotifications', () => ({ useNotifications: () => ({ enabled: true, enable: jest.fn() }) }))
jest.mock('../hooks/useMistakes', () => ({ useMistakes: () => ({ dueCount: 0 }) }))
jest.mock('../utils/analytics', () => ({ logEvent: jest.fn() }))
jest.mock('../components/GoalShareSheet', () => () => null)
jest.mock('../components/RescuePlanSheet', () => () => null)

const GoalSetupScreen = require('../screens/GoalSetupScreen').default
const nav = { goBack: jest.fn(), navigate: jest.fn() }

beforeEach(() => { mockCommitGoal.mockClear(); mockUpdateGoal.mockClear() })

test('a new goal is committed with the study time the student picked', async () => {
  mockExisting = null
  await render(<GoalSetupScreen navigation={nav} />)
  expect(screen.getByText('YOUR PLAN')).toBeTruthy()
  await fireEvent.press(screen.getByRole('radio', { name: '3 days a week' }))
  await fireEvent.press(screen.getByRole('radio', { name: '25 minutes a day' }))
  await act(async () => { fireEvent.press(screen.getByText(/COMMIT TO/)) })
  expect(mockCommitGoal).toHaveBeenCalledTimes(1)
  expect(mockCommitGoal.mock.calls[0][4]).toEqual({ availability: { daysPerWeek: 3, minutesPerDay: 25 } })
})

test('editing a goal keeps its saved study time unless changed, via updateGoal', async () => {
  mockExisting = { target: 65, examDateStr: '2099-06-23', availability: { daysPerWeek: 6, minutesPerDay: 40 } }
  await render(<GoalSetupScreen navigation={nav} />)
  expect(screen.getByRole('radio', { name: '6 days a week' }).props.accessibilityState).toMatchObject({ checked: true })
  await fireEvent.press(screen.getByRole('radio', { name: '10 minutes a day' }))
  await act(async () => { fireEvent.press(screen.getByText('UPDATE MY GOAL')) })
  expect(mockCommitGoal).not.toHaveBeenCalled()
  expect(mockUpdateGoal).toHaveBeenCalledWith('chemistry', expect.objectContaining({
    availability: { daysPerWeek: 6, minutesPerDay: 10 },
  }))
})
