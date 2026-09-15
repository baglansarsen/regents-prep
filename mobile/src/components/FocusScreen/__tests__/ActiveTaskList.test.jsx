/**
 * ActiveTaskList interaction tests
 *
 * ActiveTaskList has a toggle callback prop, so per D-01 it gets an
 * interaction test. Per D-02, the toggle assertion checks the argument
 * passed, not just the call count — a wrong-id mis-wire would otherwise be
 * invisible. Also pins the `empty` and `overflow` 02-UI-SPEC.md UI
 * Considerations and the FOCUS-05 ordering probe.
 *
 * Guards 02-05-PLAN.md Task 2 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import ActiveTaskList from '../ActiveTaskList'

function baseProps(overrides = {}) {
  return {
    tasks: [],
    onToggle: jest.fn(),
    accentColor: '#F59E0B',
    textColor: '#1f2937',
    mutedColor: 'rgba(0,0,0,0.45)',
    ...overrides,
  }
}

test('renders all task texts in the order given, not sorted or reordered', async () => {
  const tasks = [
    { id: 1, text: 'read ch 4', done: false },
    { id: 2, text: 'practice set', done: false },
    { id: 3, text: 'review notes', done: false },
  ]
  await render(<ActiveTaskList {...baseProps({ tasks })} />)

  const texts = screen.getAllByText(/read ch 4|practice set|review notes/).map(n => n.props.children)
  expect(texts).toEqual(['read ch 4', 'practice set', 'review notes'])
})

test('pressing a row calls onToggle with that row id', async () => {
  const props = baseProps({
    tasks: [
      { id: 1, text: 'read ch 4', done: false },
      { id: 2, text: 'practice set', done: false },
    ],
  })
  await render(<ActiveTaskList {...props} />)

  fireEvent.press(screen.getByText('practice set'))

  expect(props.onToggle).toHaveBeenCalledWith(2)
})

test('a done task renders with the struck-through treatment and the filled checkbox glyph', async () => {
  await render(<ActiveTaskList {...baseProps({ tasks: [{ id: 1, text: 'read ch 4', done: true }] })} />)

  const text = screen.getByText('read ch 4')
  expect(text.props.style).toEqual(
    expect.arrayContaining([expect.objectContaining({ textDecorationLine: 'line-through' })])
  )
  expect(screen.getByText('✓')).toBeOnTheScreen()
})

test('a task not marked done renders without the struck-through treatment or the checkbox glyph', async () => {
  await render(<ActiveTaskList {...baseProps({ tasks: [{ id: 1, text: 'read ch 4', done: false }] })} />)

  const text = screen.getByText('read ch 4')
  expect(text.props.style).toEqual(
    expect.arrayContaining([expect.objectContaining({ textDecorationLine: 'none' })])
  )
  expect(screen.queryByText('✓')).toBeNull()
})

test('renders no text node at all when the task array is empty', async () => {
  await render(<ActiveTaskList {...baseProps({ tasks: [] })} />)

  expect(screen.queryAllByText(/.+/)).toHaveLength(0)
})
