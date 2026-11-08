// Plan wording (docs/designs/exam-date-study-plan.md, Phase 2).
import { buildStudyPlan } from '../studyPlan'
import { describePlan, suggestionLabel, shortDate } from '../studyPlanCopy'

const UNITS = Array.from({ length: 10 }, (_, i) => ({ id: `u${i + 1}`, topic: `T${i + 1}`, lessonCount: 3 }))
const TODAY = '2026-11-08'
const add = (n) => new Date(Date.UTC(2026, 10, 8 + n)).toISOString().slice(0, 10)
const plan = (over = {}) => buildStudyPlan({ today: TODAY, examDateStr: '2027-06-22', target: 75, units: UNITS, ...over })
const allDone = Object.fromEntries(UNITS.map((u) => [u.topic, 3]))

test('shortDate formats a local calendar date', () => {
  expect(shortDate('2027-03-03')).toBe('Mar 3')
  expect(shortDate(null)).toBe('')
})

describe('describePlan', () => {
  test('a fresh, comfortable plan names the units, the date and the exams', () => {
    const d = describePlan(plan())
    expect(d.fits).toBe(true)
    expect(d.headline).toBe('Finish all 10 units by May 11, then 3 practice exams')
    expect(d.detail).toBe('About 15 min, 5 days a week.')
    expect(d.statusLabel).toBe('Ahead of pace')
  })

  test('with progress it says "the last N units"', () => {
    expect(describePlan(plan({ lessonsDoneByTopic: { T1: 3, T2: 3 } })).headline)
      .toMatch(/^Finish the last 8 units by /)
  })

  test('one day a week uses the singular', () => {
    expect(describePlan(plan({ availability: { daysPerWeek: 1, minutesPerDay: 60 } })).detail)
      .toBe('About 60 min, 1 day a week.')
  })

  test('everything covered → strengthen wording', () => {
    expect(describePlan(plan({ lessonsDoneByTopic: allDone })).headline)
      .toBe('Every unit is covered. Next: your weakest units, then 3 practice exams')
  })

  test('exam prep and final week wording', () => {
    expect(describePlan(plan({ examDateStr: add(8), lessonsDoneByTopic: allDone })).headline)
      .toBe('Exam prep: 1 practice exam and mistake review')
    expect(describePlan(plan({ examDateStr: add(5), lessonsDoneByTopic: allDone, practiceExamsTaken: 1 })).headline)
      .toBe('Final week: short reviews, no new units')
  })

  test('a plan that does not fit leads with the minutes it needs', () => {
    const d = describePlan(plan({ examDateStr: add(14) }))
    expect(d.fits).toBe(false)
    expect(d.headline).toMatch(/^This plan needs about \d+ min a day$/)
    expect(d.detail).toBe('You have 15 min, 5 days a week. Pick a fix:')
    expect(d.statusLabel).toBe("Won't fit yet")
  })

  test('passed date and exam day', () => {
    expect(describePlan(plan({ examDateStr: add(-1) })).headline).toBe('This exam date has passed')
    expect(describePlan(plan({ examDateStr: TODAY })).headline).toBe('Exam day')
  })

  test('null plan → null', () => {
    expect(describePlan(null)).toBeNull()
  })
})

describe('suggestionLabel', () => {
  test('each fix names its exact value', () => {
    expect(suggestionLabel({ type: 'more_minutes', minutesPerDay: 25 })).toBe('Study 25 min a day')
    expect(suggestionLabel({ type: 'more_days', daysPerWeek: 6 })).toBe('Study 6 days a week')
    expect(suggestionLabel({ type: 'lower_target', target: 65 })).toBe('Aim for Pass (65)')
    expect(suggestionLabel({ type: 'later_session' }, { nextSessionLabel: 'August 2027' }))
      .toBe('Take the August 2027 Regents instead')
  })
  test('no later session to offer → no button', () => {
    expect(suggestionLabel({ type: 'later_session' })).toBeNull()
  })
})
