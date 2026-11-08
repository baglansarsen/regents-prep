// The week across subjects (study plan Phase 5).
import { buildStudyPlan } from '../studyPlan'
import { combinePlans, warningText, formatMinutes, HEAVY_DAY_MINUTES } from '../combinedPlan'

const UNITS = Array.from({ length: 4 }, (_, i) => ({ topic: `T${i}`, lessonCount: 2 }))
const add = (n) => new Date(Date.UTC(2026, 10, 8 + n)).toISOString().slice(0, 10)
const entry = (subject, name, days, availability = { daysPerWeek: 5, minutesPerDay: 15 }) => {
  const goal = { target: 75, examDateStr: add(days), availability }
  const plan = days >= 0 ? buildStudyPlan({ today: add(0), examDateStr: goal.examDateStr, target: 75, units: UNITS, availability }) : null
  return { subject, name, goal, plan }
}

test('rows are sorted by exam date with totals', () => {
  const c = combinePlans([entry('physics', 'Physics', 200), entry('chemistry', 'Chemistry', 100)])
  expect(c.rows.map((r) => r.subject)).toEqual(['chemistry', 'physics'])
  expect(c.totalMinutesPerDay).toBe(30)
  expect(c.totalMinutesPerWeek).toBe(150)
  expect(c.warnings).toEqual([])
})

test('a heavy total day is flagged', () => {
  const big = { daysPerWeek: 5, minutesPerDay: 60 }
  const c = combinePlans([entry('a', 'A', 200, big), entry('b', 'B', 120, big)])
  expect(c.totalMinutesPerDay).toBeGreaterThan(HEAVY_DAY_MINUTES)
  expect(c.warnings.map((w) => w.type)).toContain('heavy_day')
})

test('one subject alone is never "heavy"', () => {
  expect(combinePlans([entry('a', 'A', 200, { daysPerWeek: 5, minutesPerDay: 120 })]).warnings).toEqual([])
})

test('exams within 3 weeks of each other share exam prep', () => {
  const c = combinePlans([entry('a', 'Chemistry', 100), entry('b', 'Physics', 102), entry('c', 'Algebra', 160)])
  const overlaps = c.warnings.filter((w) => w.type === 'exam_overlap')
  expect(overlaps).toEqual([{ type: 'exam_overlap', first: 'Chemistry', second: 'Physics', daysApart: 2, month: 'February' }])
  expect(warningText(overlaps[0])).toMatch(/^Chemistry and Physics are 2 days apart/)
})

test('a passed goal is listed but adds no time or warnings', () => {
  const c = combinePlans([entry('a', 'Chemistry', -5), entry('b', 'Physics', 100)])
  expect(c.rows[1]).toMatchObject({ subject: 'a', status: 'passed', minutesPerDay: 0 })
  expect(c.totalMinutesPerDay).toBe(15)
})

test('a plan that does not fit counts the minutes it needs and is flagged', () => {
  const c = combinePlans([entry('a', 'Chemistry', 6, { daysPerWeek: 2, minutesPerDay: 10 }), entry('b', 'Physics', 200)])
  const chem = c.rows.find((r) => r.subject === 'a')
  expect(chem.status).toBe('at_risk')
  expect(chem.minutesPerDay).toBeGreaterThan(10)
  expect(c.warnings.some((w) => w.type === 'at_risk' && w.name === 'Chemistry')).toBe(true)
})

test('formatMinutes', () => {
  expect(formatMinutes(45)).toBe('45 min')
  expect(formatMinutes(60)).toBe('1h')
  expect(formatMinutes(75)).toBe('1h 15m')
})

test('same estimated date says "same session", not "same day"', () => {
  const w = combinePlans([entry('a', 'Chemistry', 226), entry('b', 'Physics', 226)]).warnings[0]
  expect(warningText(w)).toBe('Chemistry and Physics are both in the June session, so their exam prep overlaps. Start practice exams for one of them a week early.')
})
