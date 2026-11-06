/**
 * Phase 3 motion — Home path (docs/designs/animation-plan.md).
 */
import React from 'react'
import { Text, AccessibilityInfo } from 'react-native'
import { render, screen, fireEvent } from '@testing-library/react-native'

jest.mock('../utils/haptics', () => ({
  hapticTick: jest.fn(), hapticSuccess: jest.fn(), hapticWarning: jest.fn(), hapticHeavy: jest.fn(),
}))
const haptics = require('../utils/haptics')
const UnlockPop = require('../motion/UnlockPop').default
const { newlyUnlocked } = require('../motion/UnlockPop')
const PressScale = require('../motion/PressScale').default
const StartCallout = require('../motion/StartCallout').default

beforeEach(() => {
  jest.clearAllMocks()
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false)
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() })
})

describe('newlyUnlocked', () => {
  test('first look (no baseline) never animates', () => {
    expect(newlyUnlocked(null, ['u1-l0', 'u1-l1'])).toEqual([])
  })
  test('returns only keys that were not unlocked before', () => {
    expect(newlyUnlocked(['u1-l0'], ['u1-l0', 'u1-l1', 'u2-l0'])).toEqual(['u1-l1', 'u2-l0'])
  })
  test('a re-lock (e.g. subject data change) is not an unlock', () => {
    expect(newlyUnlocked(['u1-l0', 'u1-l1'], ['u1-l0'])).toEqual([])
  })
})

describe('UnlockPop', () => {
  test('inactive passes the node through untouched', async () => {
    await render(<UnlockPop active={false}><Text>node</Text></UnlockPop>)
    expect(screen.getByText('node')).toBeTruthy()
    expect(screen.queryByText('🔒')).toBeNull()
  })
  test('active overlays the departing lock on the node', async () => {
    await render(<UnlockPop active><Text>node</Text></UnlockPop>)
    expect(screen.getByText('node')).toBeTruthy()
    expect(screen.getByText('🔒')).toBeTruthy()
  })
})

describe('PressScale', () => {
  test('press-in ticks a haptic and press fires onPress', async () => {
    const onPress = jest.fn()
    await render(<PressScale onPress={onPress} accessibilityLabel="Lesson 1"><Text>⚛️</Text></PressScale>)
    const btn = screen.getByRole('button', { name: 'Lesson 1' })
    await fireEvent(btn, 'pressIn')
    expect(haptics.hapticTick).toHaveBeenCalledTimes(1)
    await fireEvent.press(btn)
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})

describe('StartCallout', () => {
  test('is decorative (hidden from screen readers)', async () => {
    await render(<StartCallout color="#EC4899" />)
    expect(screen.queryByText('START')).toBeNull()                       // hidden from a11y queries
    expect(screen.getByText('START', { includeHiddenElements: true })).toBeTruthy()
  })
})
