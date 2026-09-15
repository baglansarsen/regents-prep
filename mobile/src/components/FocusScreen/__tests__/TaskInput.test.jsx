/**
 * TaskInput render + interaction tests.
 *
 * Per D-01, TaskInput fires callback props (no local state), so it gets an
 * interaction test asserting the argument each handler receives — the class
 * of bug D-02 flags (wrong prop wired to the wrong handler) is invisible to
 * a render-only test.
 *
 * Guards 02-07-PLAN.md Task 1 (FOCUS-03, FOCUS-05): the blank/whitespace-only
 * add-affordance boundary and the long-text single-line UI Consideration.
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import TaskInput from '../TaskInput'

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
    value: '',
    onChangeText: jest.fn(),
    onAdd: jest.fn(),
    ...overrides,
  }
}

test('the section label with its parenthetical and the field placeholder render', async () => {
  await render(<TaskInput {...baseProps()} />)

  expect(screen.getByText(/^Tasks/)).toBeOnTheScreen()
  expect(screen.getByText('(optional)')).toBeOnTheScreen()
  expect(screen.getByPlaceholderText('Add a task...')).toBeOnTheScreen()
})

test('typing calls the value setter with the typed text', async () => {
  const props = baseProps()
  await render(<TaskInput {...props} />)

  fireEvent.changeText(screen.getByPlaceholderText('Add a task...'), 'read chapter 4')

  expect(props.onChangeText).toHaveBeenCalledWith('read chapter 4')
})

test('submitting the field calls the add handler exactly once', async () => {
  const props = baseProps({ value: 'buy milk' })
  await render(<TaskInput {...props} />)

  fireEvent(screen.getByPlaceholderText('Add a task...'), 'submitEditing')

  expect(props.onAdd).toHaveBeenCalledTimes(1)
})

test('the add affordance is absent when the value is blank', async () => {
  await render(<TaskInput {...baseProps({ value: '' })} />)

  expect(screen.queryByText('Add')).toBeNull()
})

test('the add affordance is absent when the value is whitespace-only', async () => {
  await render(<TaskInput {...baseProps({ value: '   ' })} />)

  expect(screen.queryByText('Add')).toBeNull()
})

test('the add affordance renders with non-blank text, and pressing it calls the add handler exactly once', async () => {
  const props = baseProps({ value: 'buy milk' })
  await render(<TaskInput {...props} />)

  const addBtn = screen.getByText('Add')
  expect(addBtn).toBeOnTheScreen()

  fireEvent.press(addBtn)

  expect(props.onAdd).toHaveBeenCalledTimes(1)
})

test('the field carries no multiline flag and no line-count limit, so long text scrolls rather than wraps', async () => {
  await render(<TaskInput {...baseProps()} />)

  const field = screen.getByPlaceholderText('Add a task...')
  expect(field.props.multiline).toBeFalsy()
  expect(field.props.numberOfLines).toBeUndefined()
})
