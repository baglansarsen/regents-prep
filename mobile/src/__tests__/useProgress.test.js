/**
 * Regression: reloadHistory must keep a stable identity across renders.
 *
 * HomeScreen lists reloadHistory in its useFocusEffect deps. When it was a
 * plain function recreated every render, the focus effect re-ran on every
 * render (reload → setHistory → render → new reloadHistory → …), looping the
 * Home screen at ~125 commits/s and hanging the web build on resize.
 */
import { renderHook } from '@testing-library/react-native'

jest.mock('../firebase', () => ({ db: {} }))
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(), addDoc: jest.fn(), query: jest.fn(), orderBy: jest.fn(),
  limit: jest.fn(), serverTimestamp: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ docs: [] })),
}))

const { useProgress } = require('../hooks/useProgress')

test('reloadHistory is stable across re-renders for the same uid', async () => {
  const { result, rerender } = await renderHook(({ uid }) => useProgress(uid), { initialProps: { uid: 'u1' } })
  const first = result.current.reloadHistory
  await rerender({ uid: 'u1' })
  expect(result.current.reloadHistory).toBe(first)
})

test('reloadHistory changes when the uid changes', async () => {
  const { result, rerender } = await renderHook(({ uid }) => useProgress(uid), { initialProps: { uid: 'u1' } })
  const first = result.current.reloadHistory
  await rerender({ uid: 'u2' })
  expect(result.current.reloadHistory).not.toBe(first)
})

describe('reloadHistory result handling', () => {
  const { getDocs } = require('firebase/firestore')
  const { act } = require('@testing-library/react-native')
  const snap = (rows) => ({ docs: rows.map((r) => ({ id: r.id, data: () => r })) })
  afterEach(() => getDocs.mockReset().mockImplementation(() => Promise.resolve({ docs: [] })))

  test('an unchanged reload keeps the same history array (no re-render cascade)', async () => {
    const rows = [{ id: 'a', topic: 't', lessonIndex: 0, pct: 80 }]
    getDocs.mockImplementation(() => Promise.resolve(snap(rows)))
    const { result } = await renderHook(() => useProgress('u1'))
    const before = result.current.history
    expect(before).toHaveLength(1)
    await act(async () => { await result.current.reloadHistory() })
    expect(result.current.history).toBe(before)
  })

  test('a reload that resolves after the uid changed does not overwrite the new account', async () => {
    let resolveGuest
    getDocs
      .mockImplementationOnce(() => Promise.resolve(snap([])))                         // guest initial load
      .mockImplementationOnce(() => new Promise((r) => { resolveGuest = r }))           // guest reload (slow)
      .mockImplementationOnce(() => Promise.resolve(snap([{ id: 'r', topic: 'real', lessonIndex: 0, pct: 90 }]))) // real initial load
    const { result, rerender } = await renderHook(({ uid }) => useProgress(uid), { initialProps: { uid: 'guest' } })
    let pending
    await act(async () => { pending = result.current.reloadHistory() })
    await rerender({ uid: 'real' })
    await act(async () => { resolveGuest(snap([{ id: 'g', topic: 'guest', lessonIndex: 0, pct: 10 }])); await pending })
    expect(result.current.history.map((h) => h.topic)).toEqual(['real'])
  })
})
