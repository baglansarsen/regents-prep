/**
 * FocusActiveScreen render + interaction tests
 *
 * FocusActiveScreen takes callback props, so per D-01 it gets an interaction
 * test, not render-only — and per D-02 the failure class this catches is a
 * control wired to the wrong handler, invisible to a render-only test.
 *
 * Guards 02-02-PLAN.md Task 3 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import FocusActiveScreen from '../FocusActiveScreen'

// FocusActiveScreen itself reads no theme (see its module docstring), but it
// statically imports BigPetDisplay, which does call useTheme() — and that
// import chain reaches AsyncStorage, which crashes under Jest without native
// module mocks. The pet block never renders in this test (PETS_ENABLED is
// false), but the module still has to load, so ThemeContext needs a mock here
// too, purely to keep the import chain resolvable.
jest.mock('../../../context/ThemeContext', () => ({
  useTheme: () => ({ C: { bg: '#111827', text: '#F9FAFB', textMuted: '#9CA3AF', brand: '#1FC36B' } }),
}))

jest.mock('../../RiveDemo', () => {
  const { View } = require('react-native')
  return function MockRiveDemo() {
    return <View testID="rive-demo" />
  }
})

jest.mock('../../FocusTimerRing', () => {
  const { View } = require('react-native')
  return function MockFocusTimerRing() {
    return <View testID="focus-timer-ring" />
  }
})

const SKY_BG = { id: 'sky', emoji: '☀️', label: 'Sunny', top: '#FEF3C7', bottom: '#FDE68A', accent: '#F59E0B' }

function baseProps(overrides = {}) {
  return {
    phase: 'focus',
    secondsLeft: 1200,
    progress: 0.2,
    pomodoroCount: 0,
    sessionGoal: 0,
    cyclePosition: 0,
    subject: '📐 Math',
    background: SKY_BG,
    todos: [],
    pet: { chosen: false },
    buddyMessage: null,
    pause: jest.fn(),
    resume: jest.fn(),
    skip: jest.fn(),
    stop: jest.fn(),
    confirmStopAndGoBack: jest.fn(),
    toggleTodo: jest.fn(),
    clearBuddyMessage: jest.fn(),
    ...overrides,
  }
}

test('running phase renders Pause; pressing it calls pause exactly once and resume not at all', async () => {
  const props = baseProps({ phase: 'focus' })
  await render(<FocusActiveScreen {...props} />)

  fireEvent.press(screen.getByText('⏸ Pause'))

  expect(props.pause).toHaveBeenCalledTimes(1)
  expect(props.resume).not.toHaveBeenCalled()
})

test('paused phase renders Resume in place of Pause; pressing it calls resume exactly once', async () => {
  const props = baseProps({ phase: 'paused' })
  await render(<FocusActiveScreen {...props} />)

  expect(screen.queryByText('⏸ Pause')).toBeNull()
  fireEvent.press(screen.getByText('▶ Resume'))

  expect(props.resume).toHaveBeenCalledTimes(1)
})

test('pressing skip calls skip exactly once', async () => {
  const props = baseProps({ phase: 'focus' })
  await render(<FocusActiveScreen {...props} />)

  fireEvent.press(screen.getByText('⏭ Skip'))

  expect(props.skip).toHaveBeenCalledTimes(1)
})

test('skip label is "⏭ Skip break" in the break phase and "⏭ Skip" in the focus phase', async () => {
  await render(<FocusActiveScreen {...baseProps({ phase: 'break' })} />)
  expect(screen.getByText('⏭ Skip break')).toBeOnTheScreen()

  await render(<FocusActiveScreen {...baseProps({ phase: 'focus' })} />)
  expect(screen.getByText('⏭ Skip')).toBeOnTheScreen()
})

test('left header control calls confirmStopAndGoBack exactly once and stop not at all', async () => {
  const props = baseProps()
  await render(<FocusActiveScreen {...props} />)

  fireEvent.press(screen.getByText('✕'))

  expect(props.confirmStopAndGoBack).toHaveBeenCalledTimes(1)
  expect(props.stop).not.toHaveBeenCalled()
})

test('right header control calls stop exactly once and confirmStopAndGoBack not at all', async () => {
  const props = baseProps()
  await render(<FocusActiveScreen {...props} />)

  fireEvent.press(screen.getByText('■ Stop'))

  expect(props.stop).toHaveBeenCalledTimes(1)
  expect(props.confirmStopAndGoBack).not.toHaveBeenCalled()
})

test('renders each task and pressing a row calls toggleTodo with that row id', async () => {
  const props = baseProps({
    todos: [
      { id: 1, text: 'read ch 4', done: false },
      { id: 2, text: 'practice set', done: true },
    ],
  })
  await render(<FocusActiveScreen {...props} />)

  expect(screen.getByText('read ch 4')).toBeOnTheScreen()
  expect(screen.getByText('practice set')).toBeOnTheScreen()

  fireEvent.press(screen.getByText('read ch 4'))

  expect(props.toggleTodo).toHaveBeenCalledWith(1)
})

test('renders no task row and no placeholder copy when todos is empty', async () => {
  await render(<FocusActiveScreen {...baseProps({ todos: [] })} />)

  expect(screen.queryByText(/task/i)).toBeNull()
})

test('shows the count-over-goal figure when a session goal is set', async () => {
  await render(<FocusActiveScreen {...baseProps({ sessionGoal: 4, pomodoroCount: 2 })} />)

  expect(screen.getByText('2/4 🍅')).toBeOnTheScreen()
})

test('shows repeated tomato glyphs when no goal is set and the count is non-zero', async () => {
  await render(<FocusActiveScreen {...baseProps({ sessionGoal: 0, pomodoroCount: 3 })} />)

  expect(screen.getByText('🍅🍅🍅')).toBeOnTheScreen()
})

test('shows neither figure when no goal is set and the count is zero', async () => {
  await render(<FocusActiveScreen {...baseProps({ sessionGoal: 0, pomodoroCount: 0 })} />)

  expect(screen.queryByText(/🍅/)).toBeNull()
})
