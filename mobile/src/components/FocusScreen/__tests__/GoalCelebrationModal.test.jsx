/**
 * GoalCelebrationModal interaction tests
 *
 * GoalCelebrationModal fires a dismiss callback prop, so per D-01 it gets an
 * interaction test — even though it holds no local state of its own (D-02).
 * Also pins the singular/plural boundary on the completed-pomodoro count.
 *
 * Guards 02-03-PLAN.md Task 2 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import GoalCelebrationModal from '../GoalCelebrationModal'

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

function baseProps(overrides = {}) {
  return {
    visible: true,
    sessionGoal: 2,
    petName: 'Buddy',
    onDismiss: jest.fn(),
    ...overrides,
  }
}

test('when visible, renders the celebration heading, completed-count line, pet-bonus line, and button label', async () => {
  await render(<GoalCelebrationModal {...baseProps()} />)

  expect(screen.getByText('Session Goal Reached!')).toBeOnTheScreen()
  expect(screen.getByText('2 pomodoros completed')).toBeOnTheScreen()
  expect(screen.getByText('+8 Happiness bonus for Buddy!')).toBeOnTheScreen()
  expect(screen.getByText('Keep Studying! 🚀')).toBeOnTheScreen()
})

test('when not visible, none of the celebration copy renders', async () => {
  await render(<GoalCelebrationModal {...baseProps({ visible: false })} />)

  expect(screen.queryByText('Session Goal Reached!')).toBeNull()
  expect(screen.queryByText(/pomodoro/)).toBeNull()
  expect(screen.queryByText(/Happiness bonus/)).toBeNull()
  expect(screen.queryByText('Keep Studying! 🚀')).toBeNull()
})

test('drops the plural suffix at exactly one completed pomodoro', async () => {
  await render(<GoalCelebrationModal {...baseProps({ sessionGoal: 1 })} />)

  expect(screen.getByText('1 pomodoro completed')).toBeOnTheScreen()
})

test('carries the plural suffix at two completed pomodoros', async () => {
  await render(<GoalCelebrationModal {...baseProps({ sessionGoal: 2 })} />)

  expect(screen.getByText('2 pomodoros completed')).toBeOnTheScreen()
})

test('carries the plural suffix at zero completed pomodoros', async () => {
  await render(<GoalCelebrationModal {...baseProps({ sessionGoal: 0 })} />)

  expect(screen.getByText('0 pomodoros completed')).toBeOnTheScreen()
})

test('pressing the button calls onDismiss exactly once', async () => {
  const props = baseProps()
  await render(<GoalCelebrationModal {...props} />)

  fireEvent.press(screen.getByText('Keep Studying! 🚀'))

  expect(props.onDismiss).toHaveBeenCalledTimes(1)
})
