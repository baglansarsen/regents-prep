/**
 * ActiveSessionHeader interaction tests
 *
 * ActiveSessionHeader has two distinct callback props, so per D-01 it gets
 * an interaction test — and per D-02 the two stop controls must be asserted
 * as mutually exclusive, since a mis-wire between them is otherwise
 * invisible to a render-only test.
 *
 * Guards 02-05-PLAN.md Task 1 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import ActiveSessionHeader from '../ActiveSessionHeader'

function baseProps(overrides = {}) {
  return {
    subject: '📐 Math',
    pomodoroCount: 0,
    sessionGoal: 0,
    textColor: '#1f2937',
    mutedColor: 'rgba(0,0,0,0.45)',
    onRequestStop: jest.fn(),
    onStop: jest.fn(),
    ...overrides,
  }
}

test('renders the subject line when a subject is set', async () => {
  await render(<ActiveSessionHeader {...baseProps({ subject: '📐 Math' })} />)

  expect(screen.getByText('📐 Math')).toBeOnTheScreen()
})

test('renders no subject line when the subject is an empty string', async () => {
  await render(<ActiveSessionHeader {...baseProps({ subject: '' })} />)

  expect(screen.queryByText('📐 Math')).toBeNull()
})

test('shows the count-over-goal figure when a session goal is set', async () => {
  await render(<ActiveSessionHeader {...baseProps({ sessionGoal: 4, pomodoroCount: 2 })} />)

  expect(screen.getByText('2/4 🍅')).toBeOnTheScreen()
})

test('shows repeated tomato glyphs when no goal is set and the count is above zero, capped at eight', async () => {
  await render(<ActiveSessionHeader {...baseProps({ sessionGoal: 0, pomodoroCount: 12 })} />)

  expect(screen.getByText('🍅'.repeat(8))).toBeOnTheScreen()
})

test('shows neither figure when no goal is set and the count is zero', async () => {
  await render(<ActiveSessionHeader {...baseProps({ sessionGoal: 0, pomodoroCount: 0 })} />)

  expect(screen.queryByText(/🍅/)).toBeNull()
})

test('left control calls onRequestStop exactly once and onStop not at all', async () => {
  const props = baseProps()
  await render(<ActiveSessionHeader {...props} />)

  fireEvent.press(screen.getByText('✕'))

  expect(props.onRequestStop).toHaveBeenCalledTimes(1)
  expect(props.onStop).not.toHaveBeenCalled()
})

test('right control calls onStop exactly once and onRequestStop not at all', async () => {
  const props = baseProps()
  await render(<ActiveSessionHeader {...props} />)

  fireEvent.press(screen.getByText('■ Stop'))

  expect(props.onStop).toHaveBeenCalledTimes(1)
  expect(props.onRequestStop).not.toHaveBeenCalled()
})
