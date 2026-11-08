// My Plan screen (study plan Phase 3, docs/designs/exam-date-study-plan.md §5).
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'

let mockPlanState = { plan: null, goal: null }
jest.mock('../context/ThemeContext', () => {
  const C = new Proxy({}, { get: () => '#123456' })
  return { useTheme: () => ({ C }) }
})
jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native')
  return { SafeAreaView: View }
})
jest.mock('../context/AuthContext', () => ({ useAuthContext: () => ({ user: { uid: 'u1' } }) }))
jest.mock('../context/SubjectContext', () => ({ useSubject: () => ({ subject: 'chemistry', setSubject: mockSetSubject }) }))
jest.mock('../hooks/useProgress', () => ({ useProgress: () => ({ history: [] }) }))
let mockEntries = []
const mockSetSubject = jest.fn()
jest.mock('../hooks/useStudyPlan', () => ({ useStudyPlan: () => mockPlanState, useAllStudyPlans: () => ({ entries: mockEntries, loaded: true }) }))

const { buildStudyPlan } = require('../utils/studyPlan')
const MyPlanScreen = require('../screens/MyPlanScreen').default
const nav = () => ({ goBack: jest.fn(), navigate: jest.fn() })
const UNITS = Array.from({ length: 6 }, (_, i) => ({ id: `u${i + 1}`, topic: `T${i + 1}`, title: `Unit ${i + 1}`, lessonCount: 3 }))
const today = (() => { const d = new Date(); const p = (n) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}` })()
const inDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); const p = (x) => String(x).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}` }

test('no goal: invites the student to set one', async () => {
  mockPlanState = { plan: null, goal: null }
  const n = nav()
  await render(<MyPlanScreen navigation={n} />)
  expect(screen.getByText('Set a goal to get your plan')).toBeTruthy()
  await fireEvent.press(screen.getByRole('button', { name: 'Set my goal' }))
  expect(n.navigate).toHaveBeenCalledWith('GoalSetup')
})

test('a plan shows summary, timeline, this week and milestones', async () => {
  const goal = { target: 75, examDateStr: inDays(200), committedAt: new Date().toISOString() }
  const plan = buildStudyPlan({ today, examDateStr: goal.examDateStr, target: 75, units: UNITS, lessonsDoneByTopic: { T1: 3 }, dueCount: 2 })
  mockPlanState = { plan, goal }
  const n = nav()
  await render(<MyPlanScreen navigation={n} />)
  expect(screen.getByText(/Finish the last 5 units by/)).toBeTruthy()
  expect(screen.getByText(/Week 1 of 29/)).toBeTruthy()
  expect(screen.getByText('Learn · now')).toBeTruthy()
  expect(screen.getByText('Final week')).toBeTruthy()
  expect(screen.getByText(/Unit 2 · /)).toBeTruthy()
  expect(screen.getByText('🩹 Review 2 mistakes')).toBeTruthy()
  expect(screen.getByText('3 of 18 lessons done · about 1 lesson a study day')).toBeTruthy()
  expect(screen.getByText('Practice exam 3')).toBeTruthy()
  await fireEvent.press(screen.getByRole('button', { name: 'Change date, goal or study time' }))
  expect(n.navigate).toHaveBeenCalledWith('GoalSetup')
})

// ── Phase 5: all subjects ────────────────────────────────────────────────────
test('one subject → no "All subjects" section', async () => {
  const goal = { target: 75, examDateStr: inDays(200) }
  mockPlanState = { plan: buildStudyPlan({ today, examDateStr: goal.examDateStr, target: 75, units: UNITS }), goal }
  mockEntries = [{ subject: 'chemistry', name: 'Chemistry', icon: '🧪', goal, plan: mockPlanState.plan }]
  await render(<MyPlanScreen navigation={nav()} />)
  expect(screen.queryByText('All subjects')).toBeNull()
})

test('two subjects: rows, totals, overlap warning, and switching', async () => {
  const chemGoal = { target: 75, examDateStr: inDays(100) }
  const physGoal = { target: 85, examDateStr: inDays(105), availability: { daysPerWeek: 5, minutesPerDay: 25 } }
  const chem = buildStudyPlan({ today, examDateStr: chemGoal.examDateStr, target: 75, units: UNITS })
  const phys = buildStudyPlan({ today, examDateStr: physGoal.examDateStr, target: 85, units: UNITS, availability: physGoal.availability })
  mockPlanState = { plan: chem, goal: chemGoal }
  mockEntries = [
    { subject: 'chemistry', name: 'Chemistry', icon: '🧪', goal: chemGoal, plan: chem },
    { subject: 'physics', name: 'Physics', icon: '⚛️', goal: physGoal, plan: phys },
  ]
  mockSetSubject.mockClear()
  await render(<MyPlanScreen navigation={nav()} />)
  expect(screen.getByText('All subjects')).toBeTruthy()
  expect(screen.getByText('Chemistry · showing')).toBeTruthy()
  expect(screen.getByText(/Together: up to 40 min a day/)).toBeTruthy()
  expect(screen.getByText(/Chemistry and Physics are 5 days apart/)).toBeTruthy()
  await fireEvent.press(screen.getByRole('button', { name: /^Physics\./ }))
  expect(mockSetSubject).toHaveBeenCalledWith('physics')
})
