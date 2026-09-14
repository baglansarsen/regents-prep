/**
 * RNTL v14 renderHook smoke test
 *
 * Proves that @testing-library/react-native v14 + test-renderer actually
 * render and drive a React hook under this app's jest-expo 54 / React 19.1.0
 * setup. No other test file in mobile/src imports @testing-library/* or
 * calls render/renderHook — the suite being green never exercised the
 * rendering path at all, so this file is the first executable proof that it
 * works, not an assumption resting on unrelated tests passing.
 *
 * Every renderHook/act call here is awaited: RNTL v14 made all of them
 * return Promises, and Phases 2-5's useFocusScreenState / useFriendsScreenState /
 * useQuizState / useHomeAgenda hook tests should copy this awaited shape.
 *
 * Guards phase 01 plan 01 (.planning/phases/01-test-infrastructure/01-01-PLAN.md).
 */

import { renderHook, act } from '@testing-library/react-native'
import { useState } from 'react'

test('renderHook yields a concrete initial value read back from result.current', async () => {
  const { result } = await renderHook(() => useState(0))
  expect(result.current[0]).toBe(0)
})

test('act drives a state transition through to result.current', async () => {
  const { result } = await renderHook(() => useState(0))

  await act(async () => {
    result.current[1](7)
  })

  expect(result.current[0]).toBe(7)
})

test('an un-awaited renderHook call returns a thenable that settles once awaited', async () => {
  const pending = renderHook(() => useState(0))
  expect(typeof pending.then).toBe('function')

  const { result } = await pending
  expect(result.current[0]).toBe(0)
})
