/**
 * TimerControls interaction tests
 *
 * TimerControls has three callback props, so per D-01 it gets an
 * interaction test — the paused/running swap is asserted in both
 * directions so a mis-wire between the two controls is not invisible.
 *
 * Guards 02-05-PLAN.md Task 2 (FOCUS-03, FOCUS-05).
 */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'
import TimerControls from '../TimerControls'

function baseProps(overrides = {}) {
  return {
    phase: 'focus',
    isBreak: false,
    accentColor: '#F59E0B',
    textColor: '#1f2937',
    mutedColor: 'rgba(0,0,0,0.45)',
    onPause: jest.fn(),
    onResume: jest.fn(),
    onSkip: jest.fn(),
    ...overrides,
  }
}

test('running phase renders Pause and not Resume; pressing Pause calls onPause exactly once and onResume not at all', async () => {
  const props = baseProps({ phase: 'focus' })
  await render(<TimerControls {...props} />)

  expect(screen.queryByText('▶ Resume')).toBeNull()
  fireEvent.press(screen.getByText('⏸ Pause'))

  expect(props.onPause).toHaveBeenCalledTimes(1)
  expect(props.onResume).not.toHaveBeenCalled()
})

test('paused phase renders Resume and not Pause; pressing Resume calls onResume exactly once', async () => {
  const props = baseProps({ phase: 'paused' })
  await render(<TimerControls {...props} />)

  expect(screen.queryByText('⏸ Pause')).toBeNull()
  fireEvent.press(screen.getByText('▶ Resume'))

  expect(props.onResume).toHaveBeenCalledTimes(1)
})

test('pressing skip calls onSkip exactly once in the running phase', async () => {
  const props = baseProps({ phase: 'focus' })
  await render(<TimerControls {...props} />)

  fireEvent.press(screen.getByText('⏭ Skip'))

  expect(props.onSkip).toHaveBeenCalledTimes(1)
})

test('pressing skip calls onSkip exactly once in the paused phase', async () => {
  const props = baseProps({ phase: 'paused', isBreak: true })
  await render(<TimerControls {...props} />)

  fireEvent.press(screen.getByText('⏭ Skip break'))

  expect(props.onSkip).toHaveBeenCalledTimes(1)
})

test('skip label reads "Skip break" during a break phase and "Skip" during a focus phase', async () => {
  await render(<TimerControls {...baseProps({ isBreak: true })} />)
  expect(screen.getByText('⏭ Skip break')).toBeOnTheScreen()

  await render(<TimerControls {...baseProps({ isBreak: false })} />)
  expect(screen.getByText('⏭ Skip')).toBeOnTheScreen()
})
