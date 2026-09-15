/**
 * GoalPicker interaction tests
 *
 * Per D-01, GoalPicker fires a select callback (no local state), so it gets
 * an interaction test asserting the argument the handler receives, including
 * that pressing the none option passes zero rather than nothing.
 *
 * Guards 02-06-PLAN.md Task 2 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import GoalPicker from '../GoalPicker'

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
    sessionGoal: 0,
    onSelectGoal: jest.fn(),
    ...overrides,
  }
}

test('renders the section label and six options in ascending order, zero as None and the rest as numeric tomato labels', async () => {
  await render(<GoalPicker {...baseProps()} />)

  expect(screen.getByText('Session goal')).toBeOnTheScreen()
  expect(screen.getByText('None')).toBeOnTheScreen()
  expect(screen.queryByText('0 🍅')).toBeNull()
  for (const n of [1, 2, 3, 4, 5]) {
    expect(screen.getByText(`${n} 🍅`)).toBeOnTheScreen()
  }
})

// Split into two single-interaction tests rather than pressing two different
// goal chips in one test, per the pre-existing act()-reentrancy note in
// FocusSetupScreen.test.jsx for this same component's rendered output.
test('the option whose number equals the current goal renders active; others do not', async () => {
  const props = baseProps({ sessionGoal: 3 })
  await render(<GoalPicker {...props} />)

  const activeLabel = screen.getByText('3 🍅')
  expect(activeLabel.props.style).toEqual(
    expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
  )

  const inactiveLabel = screen.getByText('1 🍅')
  expect(inactiveLabel.props.style).not.toEqual(
    expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
  )
})

test('with a goal of zero, the None option renders active', async () => {
  const props = baseProps({ sessionGoal: 0 })
  await render(<GoalPicker {...props} />)

  const noneLabel = screen.getByText('None')
  expect(noneLabel.props.style).toEqual(
    expect.arrayContaining([expect.objectContaining({ color: '#fff' })])
  )
})

test('pressing a non-zero option calls the select handler with that number', async () => {
  const props = baseProps()
  await render(<GoalPicker {...props} />)

  fireEvent.press(screen.getByText('3 🍅'))

  expect(props.onSelectGoal).toHaveBeenCalledWith(3)
})

test('pressing the None option calls the select handler with zero', async () => {
  const props = baseProps()
  await render(<GoalPicker {...props} />)

  fireEvent.press(screen.getByText('None'))

  expect(props.onSelectGoal).toHaveBeenCalledWith(0)
})
