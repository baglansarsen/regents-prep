// useStudyPlan: one plan for Home and My Plan (study plan Phase 3).
import React from 'react'
import { render } from '@testing-library/react-native'

let mockGoal = null
let mockLoaded = true
jest.mock('../context/GoalContext', () => ({ useGoal: () => ({ getGoal: () => mockGoal, loaded: mockLoaded }) }))
jest.mock('../hooks/usePredictedScore', () => ({
  usePredictedScore: () => ({ rawPredicted: 62, coldStart: false, topicBreakdown: [{ topic: 'T2', pct: 50 }], examCount: 1 }),
}))
jest.mock('../hooks/useMistakes', () => ({ useMistakes: () => ({ dueCount: 4 }) }))

const { useStudyPlan } = require('../hooks/useStudyPlan')
const UNITS = [{ topic: 'T1', lessonCount: 2 }, { topic: 'T2', lessonCount: 2 }]
const inDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); const p = (x) => String(x).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}` }
// T1 lesson 0 passed (≥65), T2 lesson 0 failed
const HISTORY = [{ topic: 'T1', lessonIndex: 0, pct: 80 }, { topic: 'T2', lessonIndex: 0, pct: 40 }]

async function run() {
  let out
  function Probe() { out = useStudyPlan('chemistry', UNITS, HISTORY); return null }
  await render(<Probe />)
  return out
}

beforeEach(() => { mockLoaded = true })

test('builds the plan from the saved goal and progress', async () => {
  mockGoal = { target: 75, examDateStr: inDays(120), availability: { daysPerWeek: 4, minutesPerDay: 25 } }
  const { plan, goal } = await run()
  expect(goal).toBe(mockGoal)
  expect(plan.daysLeft).toBe(120)
  expect(plan.availability).toEqual({ daysPerWeek: 4, minutesPerDay: 25 })
  expect(plan.pace.lessonsDone).toBe(1)          // only T1 lesson 0 is complete
  expect(plan.pointsToGo).toBe(13)               // 75 − 62
  expect(plan.thisWeek.reviews).toBe(4)
})

test('no goal, a passed date, or goals still loading → no plan', async () => {
  mockGoal = null
  expect((await run()).plan).toBeNull()
  mockGoal = { target: 75, examDateStr: inDays(-2) }
  expect((await run()).plan).toBeNull()
  mockGoal = { target: 75, examDateStr: inDays(120) }
  mockLoaded = false
  expect((await run()).plan).toBeNull()
})
