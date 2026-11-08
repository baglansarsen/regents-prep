// Study plan Phase 3: the mission ladder and today's tasks follow the plan's
// phase and the student's minutes (docs/designs/exam-date-study-plan.md §3).
import { pickTodayMission, buildTodayPlan } from '../todayMission'

const base = {
  hasGoal: true, coldStart: false, daysToExam: 120, hasTakenPracticeExam: false,
  dueCount: 0, hasNextLesson: true, nextLessonTopic: 'T3',
}
const weak = (pct) => ({ id: 'u2', topic: 'T2', title: 'Unit 2', pct })

describe('pickTodayMission with a plan phase', () => {
  test('no phase: original ladder (a 75% unit beats the next lesson)', () => {
    expect(pickTodayMission({ ...base, weakestUnit: weak(75) }).actionType).toBe('weak_unit_quiz')
  })
  test('learn phase: coverage first unless the unit is below passing', () => {
    expect(pickTodayMission({ ...base, planPhase: 'learn', weakestUnit: weak(75) }).actionType).toBe('next_lesson')
    expect(pickTodayMission({ ...base, planPhase: 'learn', weakestUnit: weak(50) }).actionType).toBe('weak_unit_quiz')
  })
  test('learn phase with no lessons left still drills the weak unit', () => {
    expect(pickTodayMission({ ...base, planPhase: 'learn', hasNextLesson: false, weakestUnit: weak(75) }).actionType).toBe('weak_unit_quiz')
  })
  test('strengthen phase drills weak units', () => {
    expect(pickTodayMission({ ...base, planPhase: 'strengthen', weakestUnit: weak(75) }).actionType).toBe('weak_unit_quiz')
  })
  test('exam prep opens the practice-exam rung before the 14-day window', () => {
    expect(pickTodayMission({ ...base, daysToExam: 20, planPhase: 'exam_prep' }).actionType).toBe('practice_exam')
    expect(pickTodayMission({ ...base, daysToExam: 20 }).actionType).toBe('next_lesson')
  })
  test('final week: no new lessons', () => {
    const m = pickTodayMission({ ...base, daysToExam: 5, hasTakenPracticeExam: true, planPhase: 'final_week', trapAvailable: true })
    expect(m.actionType).toBe('daily_trap')
    expect(pickTodayMission({ ...base, daysToExam: 5, hasTakenPracticeExam: true, planPhase: 'final_week' }).actionType).toBe('all_caught_up')
  })
})

describe('buildTodayPlan sized to the student minutes', () => {
  const day = { ...base, dueCount: 3, weakestUnit: weak(60), predicted: 60, target: 75 }
  test('no budget: up to three tasks', () => {
    expect(buildTodayPlan(day).tasks).toHaveLength(3)
  })
  test('a 15-minute budget keeps what fits (8 + 6 min)', () => {
    const p = buildTodayPlan({ ...day, budgetMinutes: 15 })
    expect(p.tasks.map((t) => t.actionType)).toEqual(['review_mistakes', 'next_lesson'])
  })
  test('a tiny budget still keeps the first task', () => {
    expect(buildTodayPlan({ ...day, budgetMinutes: 5 }).tasks).toHaveLength(1)
  })
  test('a practice exam lead stays even past the budget', () => {
    const p = buildTodayPlan({ ...base, daysToExam: 10, budgetMinutes: 15 })
    expect(p.tasks[0].actionType).toBe('practice_exam')
    expect(p.tasks).toHaveLength(1)
  })
  test('final week drops the new-lesson task', () => {
    const p = buildTodayPlan({ ...day, daysToExam: 5, hasTakenPracticeExam: true, planPhase: 'final_week' })
    expect(p.tasks.map((t) => t.actionType)).not.toContain('next_lesson')
  })
})
