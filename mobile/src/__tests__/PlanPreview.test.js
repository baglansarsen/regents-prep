// Plan preview + study-time picker (docs/designs/exam-date-study-plan.md, Phase 2).
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'

jest.mock('../context/ThemeContext', () => {
  const C = new Proxy({}, { get: () => '#123456' })
  return { useTheme: () => ({ C }) }
})

const { buildStudyPlan } = require('../utils/studyPlan')
const PlanPreviewCard = require('../components/PlanPreviewCard').default
const StudyTimePicker = require('../components/StudyTimePicker').default

const UNITS = Array.from({ length: 10 }, (_, i) => ({ topic: `T${i + 1}`, lessonCount: 3 }))
const plan = (over = {}) => buildStudyPlan({ today: '2026-11-08', examDateStr: '2027-06-22', target: 75, units: UNITS, ...over })

describe('PlanPreviewCard', () => {
  test('a plan that fits shows the headline and status, no fixes', async () => {
    await render(<PlanPreviewCard plan={plan()} onApply={jest.fn()} />)
    expect(screen.getByText(/Finish all 10 units by/)).toBeTruthy()
    expect(screen.getByText('Ahead of pace')).toBeTruthy()
    expect(screen.queryByRole('button')).toBeNull()
  })

  test('a plan that does not fit offers one-tap fixes that report the fix', async () => {
    const onApply = jest.fn()
    const tight = plan({ examDateStr: '2026-12-08', availability: { daysPerWeek: 3, minutesPerDay: 15 } })
    await render(<PlanPreviewCard plan={tight} nextSessionLabel="January 2027" onApply={onApply} />)
    expect(screen.getByText(/This plan needs about \d+ min a day/)).toBeTruthy()
    const later = screen.getByRole('button', { name: 'Take the January 2027 Regents instead' })
    await fireEvent.press(later)
    expect(onApply).toHaveBeenCalledWith({ type: 'later_session' })
    await fireEvent.press(screen.getByRole('button', { name: 'Aim for Pass (65)' }))
    expect(onApply).toHaveBeenLastCalledWith({ type: 'lower_target', target: 65 })
  })

  test('without a later session, that fix is not offered', async () => {
    const tight = plan({ examDateStr: '2026-12-08' })
    await render(<PlanPreviewCard plan={tight} onApply={jest.fn()} />)
    expect(screen.queryByRole('button', { name: /Regents instead/ })).toBeNull()
  })

  test('no plan renders nothing', async () => {
    await render(<PlanPreviewCard plan={null} onApply={jest.fn()} />)
    expect(screen.queryByText(/YOUR PLAN/)).toBeNull()
  })
})

describe('StudyTimePicker', () => {
  test('choices are radios with their checked state', async () => {
    await render(<StudyTimePicker value={{ daysPerWeek: 5, minutesPerDay: 15 }} onChange={jest.fn()} />)
    expect(screen.getByRole('radio', { name: '5 days a week' }).props.accessibilityState).toMatchObject({ checked: true })
    expect(screen.getByRole('radio', { name: '3 days a week' }).props.accessibilityState).toMatchObject({ checked: false })
    expect(screen.getByRole('radio', { name: '15 minutes a day' }).props.accessibilityState).toMatchObject({ checked: true })
  })

  test('tapping a chip changes only that field', async () => {
    const onChange = jest.fn()
    await render(<StudyTimePicker value={{ daysPerWeek: 5, minutesPerDay: 15 }} onChange={onChange} />)
    await fireEvent.press(screen.getByRole('radio', { name: '25 minutes a day' }))
    expect(onChange).toHaveBeenCalledWith({ daysPerWeek: 5, minutesPerDay: 25 })
    await fireEvent.press(screen.getByRole('radio', { name: '7 days a week' }))
    expect(onChange).toHaveBeenLastCalledWith({ daysPerWeek: 7, minutesPerDay: 15 })
  })
})
