// Shared per-subject plan builder (study plan Phase 5).
import { lessonsDoneByTopicFrom, dueCountFor, buildSubjectPlan } from '../subjectPlan'

const UNITS = [{ topic: 'A', lessonCount: 3 }, { topic: 'B', lessonCount: 2 }]
const inDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); const p = (x) => String(x).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}` }

test('a lesson counts once its best score reaches passing', () => {
  const history = [
    { topic: 'A', lessonIndex: 0, pct: 50 }, { topic: 'A', lessonIndex: 0, pct: 70 },   // retake passes
    { topic: 'A', lessonIndex: 1, pct: 64 },                                            // just under
    { topic: 'B', lessonIndex: 1, pct: 100 },
    { topic: 'B', pct: 90 },                                                             // not a lesson
  ]
  expect(lessonsDoneByTopicFrom(UNITS, history)).toEqual({ A: 1, B: 1 })
})

test('due mistakes are counted per subject', () => {
  const now = 1000
  const mistakes = [
    { subject: 'chemistry', due: 500 }, { subject: 'chemistry', due: 2000 },
    { subject: 'physics', due: 0 }, { subject: 'chemistry' },
  ]
  expect(dueCountFor('chemistry', mistakes, now)).toBe(2)
  expect(dueCountFor('physics', mistakes, now)).toBe(1)
})

test('no goal or a passed date → no plan; an upcoming goal → a plan', () => {
  const base = { subject: 'chemistry', today: inDays(0), units: UNITS }
  expect(buildSubjectPlan({ ...base, goal: null })).toBeNull()
  expect(buildSubjectPlan({ ...base, goal: { target: 75, examDateStr: inDays(-1) } })).toBeNull()
  const p = buildSubjectPlan({ ...base, goal: { target: 75, examDateStr: inDays(90), availability: { daysPerWeek: 3, minutesPerDay: 25 } } })
  expect(p.daysLeft).toBe(90)
  expect(p.availability).toEqual({ daysPerWeek: 3, minutesPerDay: 25 })
  expect(p.pace.lessonsTotal).toBe(5)
})
