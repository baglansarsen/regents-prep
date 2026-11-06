/**
 * Phase 2 motion — lesson-complete reveal (docs/designs/animation-plan.md).
 */
import React from 'react'
import { Text, AccessibilityInfo } from 'react-native'
import { renderHook, render, screen, act } from '@testing-library/react-native'

const { useCelebrationSequence } = require('../motion/useCelebrationSequence')
const Reveal = require('../motion/Reveal').default

const STEPS = [['a', 0], ['b', 300], ['c', 1000]]

beforeEach(() => {
  jest.useFakeTimers()
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false)
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() })
})
afterEach(() => jest.useRealTimers())

describe('useCelebrationSequence', () => {
  test('reaches steps in time order', async () => {
    const { result } = await renderHook(() => useCelebrationSequence(STEPS))
    await act(async () => { jest.advanceTimersByTime(0) })
    expect(result.current.reached('a')).toBe(true)
    expect(result.current.reached('b')).toBe(false)
    await act(async () => { jest.advanceTimersByTime(300) })
    expect(result.current.reached('b')).toBe(true)
    expect(result.current.done).toBe(false)
    await act(async () => { jest.advanceTimersByTime(700) })
    expect(result.current.done).toBe(true)
  })

  test('holds while run is false, then starts', async () => {
    const { result, rerender } = await renderHook(({ run }) => useCelebrationSequence(STEPS, { run }), { initialProps: { run: false } })
    await act(async () => { jest.advanceTimersByTime(5000) })
    expect(result.current.reached('a')).toBe(false)
    await rerender({ run: true })
    await act(async () => { jest.advanceTimersByTime(0) })
    expect(result.current.reached('a')).toBe(true)
  })

  test('skip jumps to the final state and cancels pending steps', async () => {
    const { result } = await renderHook(() => useCelebrationSequence(STEPS))
    await act(async () => { result.current.skip() })
    expect(result.current.done).toBe(true)
    expect(result.current.reached('c')).toBe(true)
  })

  test('instant (Reduce Motion) reaches everything at once', async () => {
    const { result } = await renderHook(() => useCelebrationSequence(STEPS, { instant: true }))
    expect(result.current.done).toBe(true)
  })

  test('unknown keys are never reached', async () => {
    const { result } = await renderHook(() => useCelebrationSequence(STEPS, { instant: true }))
    expect(result.current.reached('nope')).toBe(false)
  })
})

describe('Reveal', () => {
  test('keeps its children mounted (layout space) before and after showing', async () => {
    const { rerender } = await render(<Reveal shown={false}><Text>Score</Text></Reveal>)
    expect(screen.getByText('Score')).toBeTruthy()
    await rerender(<Reveal shown from="stamp"><Text>Score</Text></Reveal>)
    expect(screen.getByText('Score')).toBeTruthy()
  })
})
