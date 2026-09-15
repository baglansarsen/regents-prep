/**
 * SessionSummaryStats render/snapshot tests
 *
 * SessionSummaryStats has zero callback props, so per D-01 it gets a
 * render/snapshot test only — no press simulation, no callback assertions.
 *
 * Guards 02-03-PLAN.md Task 1 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen } from '@testing-library/react-native'
import SessionSummaryStats from '../SessionSummaryStats'

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
    displayMin: 53,
    pomodoroCount: 2,
    partialMinutes: 3,
    sessionRP: 30,
    doneTaskCount: 1,
    totalTaskCount: 2,
    ...overrides,
  }
}

test('two pomodoros with three partial minutes renders all four figures and matches snapshot', async () => {
  await render(<SessionSummaryStats {...baseProps()} />)

  expect(screen.getByText('53 min')).toBeOnTheScreen()
  expect(screen.getByText('×2')).toBeOnTheScreen()
  expect(screen.getByText('+3m')).toBeOnTheScreen()
  expect(screen.getByText('+30')).toBeOnTheScreen()
  expect(screen.toJSON()).toMatchSnapshot()
})

test('zero pomodoros with partial minutes above zero renders the partial-only card, not the pomodoro card', async () => {
  await render(<SessionSummaryStats {...baseProps({ pomodoroCount: 0, partialMinutes: 5 })} />)

  expect(screen.queryByText(/^×/)).toBeNull()
  expect(screen.getByText('5m')).toBeOnTheScreen()
  expect(screen.getByText('partial')).toBeOnTheScreen()
})

test('zero pomodoros and zero partial minutes renders neither the pomodoro nor the partial-only card, but keeps elapsed-minutes and earned-RP', async () => {
  await render(<SessionSummaryStats {...baseProps({ pomodoroCount: 0, partialMinutes: 0 })} />)

  expect(screen.queryByText(/^×/)).toBeNull()
  expect(screen.queryByText('partial')).toBeNull()
  expect(screen.getByText('53 min')).toBeOnTheScreen()
  expect(screen.getByText('+30')).toBeOnTheScreen()
})

test('renders the tasks-completed line when the session had at least one task', async () => {
  await render(<SessionSummaryStats {...baseProps({ doneTaskCount: 1, totalTaskCount: 2 })} />)

  expect(screen.getByText('✓ 1 / 2 tasks done')).toBeOnTheScreen()
})

test('omits the tasks-completed line entirely for an empty task list, with no substitute copy', async () => {
  await render(<SessionSummaryStats {...baseProps({ doneTaskCount: 0, totalTaskCount: 0 })} />)

  expect(screen.queryByText(/tasks done/)).toBeNull()
})
