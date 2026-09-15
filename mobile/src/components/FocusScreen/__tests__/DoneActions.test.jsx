/**
 * DoneActions interaction tests
 *
 * DoneActions fires callback props, so per D-01 it gets an interaction test
 * that presses each control and asserts the callback fired — even though it
 * holds no local state of its own (D-02).
 *
 * Guards 02-03-PLAN.md Task 2 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import DoneActions from '../DoneActions'

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
    onNewSession: jest.fn(),
    onViewHistory: jest.fn(),
    ...overrides,
  }
}

test('renders both action labels', async () => {
  await render(<DoneActions {...baseProps()} />)

  expect(screen.getByText('New Session')).toBeOnTheScreen()
  expect(screen.getByText('View History')).toBeOnTheScreen()
})

test('pressing the primary action calls onNewSession exactly once and onViewHistory not at all', async () => {
  const props = baseProps()
  await render(<DoneActions {...props} />)

  fireEvent.press(screen.getByText('New Session'))

  expect(props.onNewSession).toHaveBeenCalledTimes(1)
  expect(props.onViewHistory).not.toHaveBeenCalled()
})

test('pressing the secondary action calls onViewHistory exactly once and onNewSession not at all', async () => {
  const props = baseProps()
  await render(<DoneActions {...props} />)

  fireEvent.press(screen.getByText('View History'))

  expect(props.onViewHistory).toHaveBeenCalledTimes(1)
  expect(props.onNewSession).not.toHaveBeenCalled()
})
