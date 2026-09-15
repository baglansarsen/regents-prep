/**
 * FocusDoneScreen render + interaction tests
 *
 * FocusDoneScreen takes callback props, so per D-01 it gets an interaction
 * test, not render-only — and per D-02 the bug class that matters here is a
 * prop wired to the wrong handler, which only firing the callbacks can catch.
 *
 * Guards 02-01-PLAN.md Task 3 (FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import FocusDoneScreen from '../FocusDoneScreen'

jest.mock('../../../context/ThemeContext', () => ({
  useTheme: () => ({
    C: {
      bg: '#111827',
      surface: '#1F2937',
      surface2: '#374151',
      text: '#F9FAFB',
      textMuted: '#9CA3AF',
      brand: '#1FC36B',
      warn: '#FFC93C',
      warnBg: '#3A2A00',
      border: '#374151',
    },
  }),
}))

jest.mock('../../StudyBuddyCompanion', () => {
  const { View } = require('react-native')
  return function MockStudyBuddyCompanion() {
    return <View testID="study-buddy-companion" />
  }
})

const PRESET_25 = { id: 'medium', study: 25, break: 5, label: '25 min' }

function baseProps(overrides = {}) {
  return {
    subject: '📐 Math',
    pomodoroCount: 2,
    preset: PRESET_25,
    partialMinutes: 3,
    sessionRP: 30,
    todos: [
      { id: 1, text: 'read ch 4', done: true },
      { id: 2, text: 'practice set', done: false },
    ],
    pet: { chosen: true, petType: 'dog', name: 'Buddy', accessories: [] },
    buddyMessage: null,
    sessionGoal: 2,
    goalCelebModal: false,
    reset: jest.fn(),
    openHistory: jest.fn(),
    goBack: jest.fn(),
    dismissGoalCeleb: jest.fn(),
    ...overrides,
  }
}

test('renders done heading and the computed minute total (2 pomodoros on 25min preset + 3 partial min)', async () => {
  await render(<FocusDoneScreen {...baseProps()} />)

  expect(screen.getByText('Great session!')).toBeOnTheScreen()
  // 2 * 25 + 3 = 53
  expect(screen.getByText('53 min')).toBeOnTheScreen()
})

test('renders the earned-RP figure and the pomodoro multiplier row', async () => {
  await render(<FocusDoneScreen {...baseProps()} />)

  expect(screen.getByText('+30')).toBeOnTheScreen()
  expect(screen.getByText('×2')).toBeOnTheScreen()
})

test('renders the tasks-completed line when the session had tasks', async () => {
  await render(<FocusDoneScreen {...baseProps()} />)

  expect(screen.getByText('✓ 1 / 2 tasks done')).toBeOnTheScreen()
})

test('omits the tasks-completed line entirely when todos is empty', async () => {
  await render(<FocusDoneScreen {...baseProps({ todos: [] })} />)

  expect(screen.queryByText(/tasks done/)).toBeNull()
})

test('pressing the primary action calls reset exactly once and openHistory not at all', async () => {
  const props = baseProps()
  await render(<FocusDoneScreen {...props} />)

  fireEvent.press(screen.getByText('New Session'))

  expect(props.reset).toHaveBeenCalledTimes(1)
  expect(props.openHistory).not.toHaveBeenCalled()
})

test('pressing the secondary action calls openHistory exactly once and reset not at all', async () => {
  const props = baseProps()
  await render(<FocusDoneScreen {...props} />)

  fireEvent.press(screen.getByText('View History'))

  expect(props.openHistory).toHaveBeenCalledTimes(1)
  expect(props.reset).not.toHaveBeenCalled()
})

test('pressing the close control calls goBack exactly once', async () => {
  const props = baseProps()
  await render(<FocusDoneScreen {...props} />)

  fireEvent.press(screen.getByText('✕'))

  expect(props.goBack).toHaveBeenCalledTimes(1)
})

test('renders without the subject badge when subject is an empty string', async () => {
  await render(<FocusDoneScreen {...baseProps({ subject: '' })} />)

  expect(screen.queryByText('📐 Math')).toBeNull()
})
