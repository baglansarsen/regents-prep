// Phase 0 (docs/designs/exam-date-study-plan.md, G4): changing a goal used to
// rebuild the entry via commitGoal, wiping committedAt, the baseline, the
// prediction anchor and the rescue-plan answers. updateGoal merges instead.
import React from 'react'
import { render, act } from '@testing-library/react-native'

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(() => ({})),
  getDoc: jest.fn(() => Promise.resolve({ exists: () => false })),
  setDoc: jest.fn(() => Promise.resolve()),
}))
jest.mock('../firebase', () => ({ db: {} }))
jest.mock('../context/AuthContext', () => ({ useAuthContext: () => ({ user: { uid: 'u1' } }) }))
jest.mock('../utils/activityLogger', () => ({ logActivity: jest.fn() }))

import AsyncStorage from '@react-native-async-storage/async-storage'
const { GoalProvider, useGoal } = require('../context/GoalContext')

const EXISTING = {
  chemistry: {
    target: 65,
    examDateStr: '2027-06-22',
    committedAt: '2026-09-01T12:00:00.000Z',
    baselineScore: 58,
    predicted: { value: 61, date: '2026-11-01' },
    rescuePlan: { urgency: 'long', targetMode: 'pass' },
  },
}

async function mountWith(stored) {
  await AsyncStorage.clear()
  if (stored) await AsyncStorage.setItem('@regentsGoal_v1_u1', JSON.stringify(stored))
  let api
  function Grab() { api = useGoal(); return null }
  await render(<GoalProvider><Grab /></GoalProvider>)
  await act(async () => {})   // let the load effect settle
  return () => api
}

test('updateGoal changes target and date but keeps the goal history', async () => {
  const get = await mountWith(EXISTING)
  expect(get().loaded).toBe(true)
  await act(async () => { await get().updateGoal('chemistry', { target: 75, examDateStr: '2027-08-17' }) })

  const g = get().getGoal('chemistry')
  expect(g.target).toBe(75)
  expect(g.examDateStr).toBe('2027-08-17')
  expect(g.committedAt).toBe(EXISTING.chemistry.committedAt)
  expect(g.baselineScore).toBe(58)
  expect(g.predicted).toEqual({ value: 61, date: '2026-11-01' })
  expect(g.rescuePlan).toEqual({ urgency: 'long', targetMode: 'pass' })
  expect(typeof g.updatedAt).toBe('string')

  const saved = JSON.parse(await AsyncStorage.getItem('@regentsGoal_v1_u1'))
  expect(saved.chemistry.rescuePlan).toEqual({ urgency: 'long', targetMode: 'pass' })
})

test('updateGoal with no existing goal commits a new one', async () => {
  const get = await mountWith(null)
  await act(async () => { await get().updateGoal('physics', { target: 85, examDateStr: '2027-06-22' }) })
  const g = get().getGoal('physics')
  expect(g.target).toBe(85)
  expect(g.examDateStr).toBe('2027-06-22')
  expect(typeof g.committedAt).toBe('string')
})

test('updateGoal leaves other subjects untouched', async () => {
  const get = await mountWith({ ...EXISTING, physics: { target: 85, examDateStr: '2027-06-22', committedAt: 'x' } })
  await act(async () => { await get().updateGoal('chemistry', { target: 75 }) })
  expect(get().getGoal('physics')).toEqual({ target: 85, examDateStr: '2027-06-22', committedAt: 'x' })
})
