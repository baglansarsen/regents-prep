// useStudyPlan: one plan for Home and My Plan (study plan Phase 3).
import React from 'react'
import { render } from '@testing-library/react-native'

let mockGoal = null
let mockLoaded = true
jest.mock('../context/GoalContext', () => ({ useGoal: () => ({ getGoal: () => mockGoal, goals: mockGoals, loaded: mockLoaded }) }))
jest.mock('../utils/predictedScore', () => ({
  predictRegentsScore: () => ({ score: 62, coldStart: false, topicBreakdown: [{ topic: 'T2', pct: 50 }], examCount: 1 }),
}))
jest.mock('../hooks/useExamScores', () => ({ useExamScores: () => ({ scores: {} }) }))
jest.mock('../hooks/useDailyStreak', () => ({ useDailyStreak: () => ({ streak: 0, studiedDates: [] }) }))
const mockMistakes = [0, 1, 2, 3].map(() => ({ subject: 'chemistry', due: 0 })).concat([{ subject: 'physics', due: 0 }])
jest.mock('../hooks/useMistakes', () => ({ useMistakes: () => ({ mistakes: mockMistakes }) }))
jest.mock('../context/AuthContext', () => ({ useAuthContext: () => ({ user: { uid: 'u1' } }) }))
let mockHistory = []
jest.mock('../hooks/useProgress', () => ({ useProgress: () => ({ history: mockHistory }) }))
let mockGoals = {}
jest.mock('../content/subjectData', () => ({ subjectData: () => ({ UNITS: [{ topic: 'T1', lessonCount: 2 }, { topic: 'T2', lessonCount: 2 }] }) }))

const { useStudyPlan, useAllStudyPlans } = require('../hooks/useStudyPlan')
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

test('useAllStudyPlans: one entry per goal, passed dates with plan null', async () => {
  mockGoals = {
    chemistry: { target: 75, examDateStr: inDays(120) },
    physics:   { target: 85, examDateStr: inDays(-3) },
    english:   null,
  }
  mockHistory = [{ topic: 'T1', lessonIndex: 0, pct: 80, subject: 'chemistry' }, { topic: 'T1', lessonIndex: 1, pct: 90, subject: 'physics' }]
  let out
  function Probe() { out = useAllStudyPlans(); return null }
  await render(<Probe />)
  expect(out.entries.map((e) => e.subject).sort()).toEqual(['chemistry', 'physics'])
  const chem = out.entries.find((e) => e.subject === 'chemistry')
  expect(chem.name).toBe('Chemistry')
  expect(chem.plan.pace.lessonsDone).toBe(1)          // physics history doesn't count for chemistry
  expect(chem.plan.thisWeek.reviews).toBe(4)          // chemistry's due mistakes only
  expect(out.entries.find((e) => e.subject === 'physics').plan).toBeNull()
})
