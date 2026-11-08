// Exam-date helpers behind the Home countdown and goal setup.
// Plan: docs/designs/exam-date-study-plan.md (Phase 0: G2, G3)
import {
  daysUntil, daysUntilExam, getExamLabel, sessionMonthOf, isGoalDatePassed,
} from '../examDates'

beforeEach(() => {
  jest.useFakeTimers()
  jest.setSystemTime(new Date(2026, 10, 8, 10, 0, 0))   // Nov 8 2026, 10:00 local
})
afterEach(() => jest.useRealTimers())

describe('daysUntil', () => {
  test('counts whole days from local midnight', () => {
    expect(daysUntil('2026-11-08')).toBe(0)
    expect(daysUntil('2026-11-09')).toBe(1)
    expect(daysUntil('2026-11-07')).toBe(-1)
    expect(daysUntil('2027-06-22')).toBe(226)
  })
})

describe('sessionMonthOf', () => {
  test('names the month of a YYYY-MM-DD date', () => {
    expect(sessionMonthOf('2027-06-22')).toBe('June')
    expect(sessionMonthOf('2027-01-26')).toBe('January')
  })
  test('null for missing or malformed input', () => {
    expect(sessionMonthOf(null)).toBeNull()
    expect(sessionMonthOf('')).toBeNull()
    expect(sessionMonthOf('soon')).toBeNull()
  })
})

describe('isGoalDatePassed', () => {
  test('only a date before today counts as passed', () => {
    expect(isGoalDatePassed('2026-11-07')).toBe(true)
    expect(isGoalDatePassed('2026-11-08')).toBe(false)   // exam day is not "passed"
    expect(isGoalDatePassed('2027-06-22')).toBe(false)
    expect(isGoalDatePassed(null)).toBe(false)
  })
})

describe('getExamLabel', () => {
  test('names the chosen session instead of "next Regents"', () => {
    expect(getExamLabel('chemistry', 226, '2027-06-22')).toBe('📅 226 days to your June Regents')
    expect(getExamLabel('chemistry', 10, '2026-11-18')).toBe('📅 10 days to your November Regents')
    expect(getExamLabel('chemistry', 1, '2026-11-09')).toBe('📅 Your November Regents is tomorrow!')
    expect(getExamLabel('chemistry', 0, '2026-11-08')).toBe('📅 Your November Regents is today!')
  })
  test('without a chosen session keeps the generic wording', () => {
    expect(getExamLabel('chemistry', 60)).toBe('📅 60 days to next Regents')
    expect(getExamLabel('chemistry', 20)).toBe('📅 20 days to Regents')
    expect(getExamLabel('chemistry', 5)).toBe('📅 5 days until Regents')
    expect(getExamLabel('chemistry', 0)).toBe('📅 Exam is today!')
  })
})

describe('daysUntilExam (countdown source)', () => {
  test('uses the committed date while it is upcoming', () => {
    expect(daysUntilExam('chemistry', '2027-06-22')).toBe(226)
  })
  test('never returns a negative count for a passed date', () => {
    expect(daysUntilExam('chemistry', '2026-06-23')).toBeGreaterThanOrEqual(0)
  })
})

// ── Official NYSED calendar (data/regentsCalendar.js) ────────────────────────
import { getUpcomingExamSessions, examSessionsFor, officialSessionDate, getNextExamDate } from '../examDates'

describe('official calendar', () => {
  test('sessions use NYSED dates and times, per subject', () => {
    const chem = getUpcomingExamSessions('chemistry')
    expect(chem.map((s) => s.dateStr)).toEqual(['2027-01-26', '2027-06-23', '2027-08-18'])
    expect(chem[1]).toMatchObject({ label: 'June 2027', time: '9:15 a.m.', estimated: false })
    expect(getUpcomingExamSessions('geometry').map((s) => s.dateStr)).toEqual(['2027-01-28', '2027-06-22', '2027-08-18'])
  })
  test('physics has no August session', () => {
    expect(getUpcomingExamSessions('physics').map((s) => s.label)).toEqual(['January 2027', 'June 2027', 'January 2028'])
    expect(getUpcomingExamSessions('physics')[2].estimated).toBe(true)
  })
  test('Living Environment students get the Life Science: Biology dates', () => {
    expect(getUpcomingExamSessions('living-environment').map((s) => s.dateStr))
      .toEqual(getUpcomingExamSessions('life-science').map((s) => s.dateStr))
  })
  test('sessions after the published ones are estimated', () => {
    const later = examSessionsFor('algebra-1').filter((s) => s.dateStr > '2027-12-31')
    expect(later.length).toBeGreaterThan(0)
    expect(later.every((s) => s.estimated && s.time === null)).toBe(true)
  })
  test('the next exam is the official one', () => {
    const d = getNextExamDate('english')
    expect([d.getFullYear(), d.getMonth() + 1, d.getDate()]).toEqual([2027, 1, 26])
  })
  test('officialSessionDate snaps only within the same session month', () => {
    expect(officialSessionDate('chemistry', '2027-06-22')).toBe('2027-06-23')
    expect(officialSessionDate('chemistry', '2027-06-23')).toBe('2027-06-23')
    expect(officialSessionDate('chemistry', '2028-01-25')).toBe('2028-01-25')
    expect(officialSessionDate('chemistry', null)).toBeNull()
  })
})
