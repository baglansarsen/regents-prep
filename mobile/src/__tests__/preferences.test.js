/**
 * Settings → Sound Effects / Reduce Animations.
 */
import React from 'react'
import { AccessibilityInfo } from 'react-native'
import { renderHook, act } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const mockCreateAsync = jest.fn(() => Promise.resolve({ sound: { replayAsync: jest.fn(), unloadAsync: jest.fn() } }))
jest.mock('expo-av', () => ({
  Audio: { setAudioModeAsync: jest.fn(() => Promise.resolve()), Sound: { createAsync: (...a) => mockCreateAsync(...a) } },
}))

const { PreferencesProvider, usePreferences, SOUND_EFFECTS_KEY, REDUCE_ANIMATIONS_KEY } = require('../context/PreferencesContext')
const { useReducedMotion } = require('../motion/useReducedMotion')
const { useQuizSound } = require('../hooks/useQuizSound')

const wrapper = ({ children }) => <PreferencesProvider>{children}</PreferencesProvider>

beforeEach(async () => {
  await AsyncStorage.clear()
  mockCreateAsync.mockClear()
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false)
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() })
})

describe('PreferencesContext', () => {
  test('defaults: sound on, full animations', async () => {
    const { result } = await renderHook(() => usePreferences(), { wrapper })
    await act(async () => {})
    expect(result.current).toMatchObject({ soundEffects: true, reduceAnimations: false, loaded: true })
  })

  test('loads saved values and persists changes', async () => {
    await AsyncStorage.setItem(SOUND_EFFECTS_KEY, 'false')
    const { result } = await renderHook(() => usePreferences(), { wrapper })
    await act(async () => {})
    expect(result.current.soundEffects).toBe(false)
    await act(async () => { result.current.setReduceAnimations(true) })
    expect(result.current.reduceAnimations).toBe(true)
    expect(await AsyncStorage.getItem(REDUCE_ANIMATIONS_KEY)).toBe('true')
  })

  test('outside the provider: safe defaults', async () => {
    const { result } = await renderHook(() => usePreferences())
    expect(result.current).toMatchObject({ soundEffects: true, reduceAnimations: false })
  })
})

describe('useReducedMotion', () => {
  test('in-app toggle reduces motion even when the OS does not', async () => {
    const { result } = await renderHook(() => ({ rm: useReducedMotion(), prefs: usePreferences() }), { wrapper })
    await act(async () => {})
    expect(result.current.rm).toBe(false)
    await act(async () => { result.current.prefs.setReduceAnimations(true) })
    expect(result.current.rm).toBe(true)
  })

  test('OS Reduce Motion wins even with the toggle off', async () => {
    AccessibilityInfo.isReduceMotionEnabled.mockResolvedValue(true)
    const { result } = await renderHook(() => useReducedMotion(), { wrapper })
    await act(async () => {})
    expect(result.current).toBe(true)
  })
})

describe('useQuizSound', () => {
  test('loads sounds when Sound Effects is on', async () => {
    await renderHook(() => useQuizSound(), { wrapper })
    await act(async () => {})
    expect(mockCreateAsync).toHaveBeenCalledTimes(2)
  })

  test('loads nothing and stays silent when Sound Effects is off', async () => {
    await AsyncStorage.setItem(SOUND_EFFECTS_KEY, 'false')
    const { result } = await renderHook(() => useQuizSound(), { wrapper })
    await act(async () => {})
    expect(mockCreateAsync).not.toHaveBeenCalled()
    await act(async () => { await result.current.playCorrect() })   // no throw, no sound
  })
})
