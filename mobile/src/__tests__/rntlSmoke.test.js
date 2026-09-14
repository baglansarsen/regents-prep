/**
 * RNTL v14 smoke test — both entry points, plus the built-in matcher swap
 *
 * Proves that @testing-library/react-native v14 + test-renderer actually
 * render and drive a React hook under this app's jest-expo 54 / React 19.1.0
 * setup, AND that its `render()` entry point plus built-in matchers
 * (`toBeOnTheScreen`) work with zero jest setup wiring — `mobile/package.json`
 * has no `setupFilesAfterEnv` key at all after phase 01 plan 01 deleted it, so
 * a built-in matcher passing here is the executable proof that deletion was
 * correct, not an assumption resting on unrelated tests passing.
 *
 * Every renderHook/render/act call here is awaited: RNTL v14 made all of them
 * return Promises, and Phases 2-5's useFocusScreenState / useFriendsScreenState /
 * useQuizState / useHomeAgenda hook tests, plus extracted sub-component render
 * tests, should copy this awaited shape. `rerender` (not the removed `update`
 * alias) is the v14 API Phases 2-5 use for prop-change tests.
 *
 * Guards phase 01 plans 01 and 02
 * (.planning/phases/01-test-infrastructure/01-01-PLAN.md,
 * .planning/phases/01-test-infrastructure/01-02-PLAN.md).
 */

import { renderHook, act, render, screen } from '@testing-library/react-native'
import { useState } from 'react'
import { View, Text } from 'react-native'

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

test('render() mounts an inline element tree and screen.getByText finds a real node', async () => {
  const view = await render(
    <View>
      <Text>rntl v14 smoke</Text>
    </View>
  )

  const node = screen.getByText('rntl v14 smoke')
  expect(node).toBeTruthy()
  expect(typeof view.rerender).toBe('function')
})

test('the built-in toBeOnTheScreen matcher passes with no setupFilesAfterEnv wiring', async () => {
  await render(
    <View>
      <Text>rntl v14 smoke</Text>
    </View>
  )

  expect(screen.getByText('rntl v14 smoke')).toBeOnTheScreen()
})
