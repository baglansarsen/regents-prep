/**
 * Phase 0 motion foundation (docs/designs/animation-plan.md):
 * useReducedMotion, PressableDuo, Burst.
 */
import React from 'react'
import { Text, AccessibilityInfo } from 'react-native'
import { render, renderHook, screen, fireEvent, act } from '@testing-library/react-native'

jest.mock('../utils/haptics', () => ({
  hapticTick: jest.fn(), hapticSuccess: jest.fn(), hapticWarning: jest.fn(), hapticHeavy: jest.fn(),
}))
const haptics = require('../utils/haptics')
const { useReducedMotion } = require('../motion/useReducedMotion')
const PressableDuo = require('../motion/PressableDuo').default
const Burst = require('../motion/Burst').default
const { makeParticles, BURST_COUNT } = require('../motion/Burst')

let reduceListener
beforeEach(() => {
  jest.clearAllMocks()
  reduceListener = null
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false)
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockImplementation((evt, cb) => {
    if (evt === 'reduceMotionChanged') reduceListener = cb
    return { remove: jest.fn() }
  })
})

describe('useReducedMotion', () => {
  test('reads the OS setting and follows changes', async () => {
    AccessibilityInfo.isReduceMotionEnabled.mockResolvedValue(true)
    const { result } = await renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
    await act(async () => { reduceListener(false) })
    expect(result.current).toBe(false)
  })
})

describe('PressableDuo', () => {
  test('press-in fires a tap haptic and press fires onPress', async () => {
    const onPress = jest.fn()
    await render(<PressableDuo color="#1FC36B" darkColor="#148F4E" onPress={onPress}><Text>Go</Text></PressableDuo>)
    const btn = screen.getByRole('button')
    await fireEvent(btn, 'pressIn')
    expect(haptics.hapticTick).toHaveBeenCalledTimes(1)
    await fireEvent.press(btn)
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  test('haptic={false} stays silent', async () => {
    await render(<PressableDuo color="#000" darkColor="#111" haptic={false} onPress={() => {}}><Text>Go</Text></PressableDuo>)
    await fireEvent(screen.getByRole('button'), 'pressIn')
    expect(haptics.hapticTick).not.toHaveBeenCalled()
  })

  test('disabled is exposed to assistive tech and blocks presses', async () => {
    const onPress = jest.fn()
    await render(<PressableDuo color="#000" darkColor="#111" disabled onPress={onPress}><Text>Go</Text></PressableDuo>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    await fireEvent.press(btn)
    expect(onPress).not.toHaveBeenCalled()
  })
})

describe('Burst', () => {
  test('intensity sets the particle count', () => {
    expect(makeParticles(BURST_COUNT.small)).toHaveLength(16)
    expect(makeParticles(BURST_COUNT.large)).toHaveLength(48)
  })

  test('particles are deterministic for a given random source', () => {
    const seq = () => { let i = 0; return () => ((i++ * 0.37) % 1) }
    expect(makeParticles(5, undefined, seq())).toEqual(makeParticles(5, undefined, seq()))
  })

  test('renders nothing when not running', async () => {
    await render(<Burst run={false} />)
    expect(screen.queryByTestId('burst')).toBeNull()
  })

  test('renders nothing under Reduce Motion', async () => {
    AccessibilityInfo.isReduceMotionEnabled.mockResolvedValue(true)
    await render(<Burst />)
    await act(async () => {})
    expect(screen.queryByTestId('burst')).toBeNull()
  })

  test('renders when running with motion allowed', async () => {
    await render(<Burst intensity="small" />)
    await act(async () => {})
    expect(screen.getByTestId('burst')).toBeTruthy()
  })
})
