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
jest.mock('../context/SubjectContext', () => ({ useSubject: () => ({ subject: 'chemistry' }) }))
jest.mock('../hooks/useProgress', () => ({ useProgress: () => ({ history: [] }) }))
jest.mock('../hooks/useStudyPlan', () => ({ useStudyPlan: () => mockPlanState }))

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
