/**
 * TaskList render + interaction tests.
 *
 * Per D-01, TaskList fires a toggle callback (no local state), so it gets an
 * interaction test asserting the argument the handler receives. Also pins
 * the zero-one-many and ordering edges (FOCUS-05, 02-UI-SPEC.md) and the
 * toggle-not-a-remove-affordance boundary the plan's prohibitions call out.
 *
 * Guards 02-07-PLAN.md Task 1 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import TaskList from '../TaskList'

jest.mock('../../../context/ThemeContext', () => ({
  useTheme: () => ({
    C: {
      bg: '#111827', text: '#F9FAFB', textMuted: '#9CA3AF', brand: '#1FC36B',
      surface: '#1F2937', surface2: '#374151', border: '#4B5563',
    },
  }),
}))

function baseProps(overrides = {}) {
  return {
    tasks: [],
    onToggle: jest.fn(),
    ...overrides,
  }
}

test('with three tasks, all three texts render in the order of the array given', async () => {
  const props = baseProps({
    tasks: [
      { id: 1, text: 'read ch 4', done: false },
      { id: 2, text: 'practice set', done: false },
      { id: 3, text: 'review notes', done: true },
    ],
  })
  await render(<TaskList {...props} />)

  const rowTexts = screen.getAllByText(/^(read ch 4|practice set|review notes)$/)
  expect(rowTexts.map((n) => n.props.children)).toEqual(['read ch 4', 'practice set', 'review notes'])
})

test("pressing a row's trailing control calls the toggle handler with that row's id", async () => {
  const props = baseProps({
    tasks: [
      { id: 1, text: 'read ch 4', done: false },
      { id: 2, text: 'practice set', done: false },
    ],
  })
  await render(<TaskList {...props} />)

  const controls = screen.getAllByText('✕')
  expect(controls).toHaveLength(2)
  fireEvent.press(controls[1])

  expect(props.onToggle).toHaveBeenCalledWith(2)
})

test('with one task, exactly one row renders', async () => {
  const props = baseProps({ tasks: [{ id: 1, text: 'read ch 4', done: false }] })
  await render(<TaskList {...props} />)

  expect(screen.getAllByText('✕')).toHaveLength(1)
  expect(screen.getByText('read ch 4')).toBeOnTheScreen()
})

test('with an empty array, no row renders and no text node appears at all', async () => {
  await render(<TaskList {...baseProps({ tasks: [] })} />)

  expect(screen.queryByText('✕')).toBeNull()
  expect(screen.queryAllByText(/./)).toHaveLength(0)
})
