/**
 * Phase 5 motion — Reggie comes alive (docs/designs/animation-plan.md).
 */
import React from 'react'
import { AccessibilityInfo } from 'react-native'
import { renderHook, render, act } from '@testing-library/react-native'

const { reggie, POSES } = require('../components/reggie/reggieCharacter')
const { BLINKABLE_EYES } = require('../components/ReggieMascot')
const AnimatedReggie = require('../motion/AnimatedReggie').default
const { useReggieReaction } = require('../motion/AnimatedReggie')

const BLINK_PATH = 'M266 230 Q298 246 330 230'

beforeEach(() => {
  jest.useFakeTimers()
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false)
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() })
})
afterEach(() => jest.useRealTimers())

describe('blink eye', () => {
  test('the blink frame closes the open eye', () => {
    const open = reggie(POSES.idle)
    const blink = reggie({ ...POSES.idle, eye: 'blink' })
    expect(open).not.toContain(BLINK_PATH)
    expect(blink).toContain(BLINK_PATH)
  })

  test('only open-eyed poses blink', () => {
    expect(BLINKABLE_EYES).toContain(POSES.idle.eye)
    expect(BLINKABLE_EYES).toContain(POSES.oops.eye)
    for (const closed of ['wave', 'celebrate', 'encourage', 'sleep']) {
      expect(BLINKABLE_EYES).not.toContain(POSES[closed].eye)
    }
  })
})

describe('useReggieReaction', () => {
  test('react() shows a pose, then returns to the base pose', async () => {
    const { result } = await renderHook(() => useReggieReaction('idle'))
    expect(result.current[0]).toBe('idle')
    await act(async () => { result.current[1]('encourage', 1000) })
    expect(result.current[0]).toBe('encourage')
    await act(async () => { jest.advanceTimersByTime(1000) })
    expect(result.current[0]).toBe('idle')
  })

  test('a new reaction replaces the pending one', async () => {
    const { result } = await renderHook(() => useReggieReaction('idle'))
    await act(async () => { result.current[1]('oops', 1000) })
    await act(async () => { jest.advanceTimersByTime(600); result.current[1]('celebrate', 1000) })
    await act(async () => { jest.advanceTimersByTime(600) })
    expect(result.current[0]).toBe('celebrate')        // first timer was cancelled
    await act(async () => { jest.advanceTimersByTime(500) })
    expect(result.current[0]).toBe('idle')
  })
})

describe('AnimatedReggie', () => {
  test('survives pose changes and blink cycles without errors', async () => {
    const { rerender, unmount } = await render(<AnimatedReggie pose="idle" />)
    await act(async () => { jest.advanceTimersByTime(7000) })   // at least one blink
    await rerender(<AnimatedReggie pose="oops" />)
    await act(async () => { jest.advanceTimersByTime(500) })
    await rerender(<AnimatedReggie pose="celebrate" />)
    await act(async () => { jest.advanceTimersByTime(7000) })   // celebrate can't blink
    await unmount()
  })
})
