// One daily target: the study plan's minutes (replaces the RP daily goal).
import React from 'react'
import { render, act } from '@testing-library/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { buildStudyPlan } from '../utils/studyPlan'
import { useDailyMinutesGoal, dailyMinutesGoalFrom } from '../hooks/useDailyMinutesGoal'

const UNITS = [{ topic: 'A', lessonCount: 2 }]
const plan = (minutesPerDay) => buildStudyPlan({
  today: '2026-11-08', examDateStr: '2027-06-22', target: 75, units: UNITS,
  availability: { daysPerWeek: 5, minutesPerDay },
})

describe('dailyMinutesGoalFrom', () => {
  test('adds up every subject plan', () => {
    expect(dailyMinutesGoalFrom([
      { subject: 'a', name: 'A', goal: { examDateStr: '2027-06-22' }, plan: plan(15) },
      { subject: 'b', name: 'B', goal: { examDateStr: '2027-06-22' }, plan: plan(25) },
    ])).toBe(40)
  })
  test('no plans → the default 15 minutes', () => {
    expect(dailyMinutesGoalFrom([])).toBe(15)
    expect(dailyMinutesGoalFrom([{ subject: 'a', name: 'A', goal: { examDateStr: '2026-01-01' }, plan: null }])).toBe(15)
  })
})

async function run(props) {
  let out
  function Probe() { out = useDailyMinutesGoal(props); return null }
  await render(<Probe />)
  await act(async () => {})
  return () => out
}

beforeEach(() => AsyncStorage.clear())

test('progress is today\'s study minutes against the goal', async () => {
  const get = await run({ todaySeconds: 7 * 60 + 40, goalMinutes: 15 })
  expect(get()).toMatchObject({ todayMinutes: 7, goalMinutes: 15, goalMet: false })
  expect(get().progress).toBeCloseTo(7 / 15)
})

test('reaching the minutes meets the goal; celebrating is remembered for today', async () => {
  const get = await run({ todaySeconds: 15 * 60, goalMinutes: 15 })
  expect(get().goalMet).toBe(true)
  expect(get().celebrated).toBe(false)
  await act(async () => { await get().markCelebrated() })
  expect(get().celebrated).toBe(true)
  const again = await run({ todaySeconds: 20 * 60, goalMinutes: 15 })
  expect(again().celebrated).toBe(true)
})

test('a celebration from another day does not count', async () => {
  await AsyncStorage.setItem('@dailyMinutesGoal_v1', JSON.stringify({ date: '2020-01-01', celebrated: true }))
  const get = await run({ todaySeconds: 30 * 60, goalMinutes: 15 })
  expect(get().celebrated).toBe(false)
})
