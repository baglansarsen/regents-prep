import { buildTodayPlan, isEnergyFree, planProgress } from '../todayMission'
import { energyBand } from '../energy'

const base = {
  hasGoal: true,
  coldStart: false,
  weakestUnit: { topic: 'algebra', title: 'Algebra', pct: 40, attempts: 3 },
  predicted: 67,
  target: 75,
}

describe('energyBand', () => {
  it('bands on the same thresholds the battery paints', () => {
    expect(energyBand(0, 10)).toBe('recover')   // 0%
    expect(energyBand(2, 10)).toBe('recover')   // 20%
    expect(energyBand(3, 10)).toBe('steady')    // 30%
    expect(energyBand(5, 10)).toBe('steady')    // 50%
    expect(energyBand(6, 10)).toBe('push')      // 60%
  })

  it('gives subscribers the neutral band — unlimited energy would always read push', () => {
    expect(energyBand(0, 10, true)).toBe('steady')
    expect(energyBand(10, 10, true)).toBe('steady')
  })
})

describe('buildTodayPlan', () => {
  it('states the score gap in the headline', () => {
    expect(buildTodayPlan(base).pointsToGo).toBe(8)
    expect(buildTodayPlan(base).headline).toBe('You need +8 to reach 75')
  })

  it('never reports a negative gap once the student is past target', () => {
    const plan = buildTodayPlan({ ...base, predicted: 90, target: 75 })
    expect(plan.pointsToGo).toBe(0)
    expect(plan.headline).toMatch(/hold it there/)
  })

  it('omits the gap when there is no prediction yet', () => {
    const plan = buildTodayPlan({ ...base, predicted: null })
    expect(plan.pointsToGo).toBeNull()
    expect(plan.headline).toBe('Your plan for today')
  })

  it('builds three distinct tasks in the steady band', () => {
    const { tasks } = buildTodayPlan(base)
    expect(tasks).toHaveLength(3)
    expect(new Set(tasks.map((t) => t.actionType)).size).toBe(3)
  })

  it('leads with queued mistakes over a weak-topic drill', () => {
    const { tasks } = buildTodayPlan({ ...base, dueCount: 4 })
    expect(tasks[0].actionType).toBe('review_mistakes')
    expect(tasks[0].subtitle).toContain('4 items due')
  })

  it('proposes only energy-free work when recovering', () => {
    const { tasks } = buildTodayPlan({ ...base, band: 'recover' })
    expect(tasks.length).toBeGreaterThan(0)
    for (const t of tasks) {
      expect(isEnergyFree(t.actionType)).toBe(true)
    }
  })

  it('drops the practice set while recovering — it would hit the energy gate', () => {
    const { tasks } = buildTodayPlan({ ...base, band: 'recover' })
    expect(tasks.map((t) => t.actionType)).not.toContain('drill_set')
  })

  it('collapses to the single onboarding action before a goal exists', () => {
    const plan = buildTodayPlan({ ...base, hasGoal: false })
    expect(plan.tasks).toHaveLength(1)
    expect(plan.tasks[0].actionType).toBe('set_goal')
    expect(plan.pointsToGo).toBeNull()
  })

  it('collapses to the checkup on a cold start', () => {
    const plan = buildTodayPlan({ ...base, coldStart: true })
    expect(plan.tasks).toHaveLength(1)
    expect(plan.tasks[0].actionType).toBe('checkup')
  })

  it('never lists the same action and topic twice', () => {
    const { tasks } = buildTodayPlan({ ...base, weakestUnit: null, nextLessonTopic: null })
    const keys = tasks.map((t) => `${t.actionType}:${t.topic ?? ''}`)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('caps the plan at three tasks', () => {
    expect(buildTodayPlan({ ...base, dueCount: 9 }).tasks.length).toBeLessThanOrEqual(3)
  })

  it('still exposes the single lead mission for callers that want one action', () => {
    expect(buildTodayPlan({ ...base, dueCount: 4 }).lead.actionType).toBe('review_mistakes')
  })

  it('lead is always tasks[0] — even for a mission type fix/learn/practice never composes', () => {
    // practice_exam wins the ladder here but isn't one of the fix/learn/practice
    // rungs, so it must be force-inserted rather than silently disagreeing
    // with the hero card the caller renders from `lead`.
    const plan = buildTodayPlan({ ...base, daysToExam: 5, hasTakenPracticeExam: false })
    expect(plan.lead.actionType).toBe('practice_exam')
    expect(plan.tasks[0].actionType).toBe('practice_exam')
  })

  it('passes nextLessonTopic through to the lesson task', () => {
    const { tasks } = buildTodayPlan({ ...base, weakestUnit: null, dueCount: 0, nextLessonTopic: 'geometry' })
    const lesson = tasks.find((t) => t.actionType === 'next_lesson')
    expect(lesson.topic).toBe('geometry')
  })

  it('offers a genuinely mixed set instead of drilling the weak topic twice', () => {
    const { tasks } = buildTodayPlan({ ...base, dueCount: 0 })   // weakestUnit = algebra, from `base`
    const drillSet = tasks.find((t) => t.actionType === 'drill_set')
    const weakDrill = tasks.find((t) => t.actionType === 'weak_unit_quiz')
    expect(weakDrill.topic).toBe('algebra')
    expect(drillSet.topic).toBeNull()
  })
})

describe('planProgress', () => {
  const tasks = [
    { id: 'r', actionType: 'review_mistakes' },
    { id: 'l', actionType: 'next_lesson' },
    { id: 's', actionType: 'drill_set' },
    { id: 'w', actionType: 'weak_unit_quiz', topic: 'algebra' },
    { id: 'f', actionType: 'flashcards' },
  ]

  it('marks review done only once the queue is empty', () => {
    expect(planProgress(tasks, { dueCount: 3 }).doneIds.has('r')).toBe(false)
    expect(planProgress(tasks, { dueCount: 0 }).doneIds.has('r')).toBe(true)
  })

  it('marks a weak-topic drill done only for that topic', () => {
    expect(planProgress(tasks, { topicsQuizzedToday: ['geometry'] }).doneIds.has('w')).toBe(false)
    expect(planProgress(tasks, { topicsQuizzedToday: ['algebra'] }).doneIds.has('w')).toBe(true)
  })

  it('marks the practice set done after any quiz today', () => {
    expect(planProgress(tasks, { topicsQuizzedToday: [] }).doneIds.has('s')).toBe(false)
    expect(planProgress(tasks, { topicsQuizzedToday: ['anything'] }).doneIds.has('s')).toBe(true)
  })

  it('marks the lesson done from a lesson-linked result', () => {
    expect(planProgress(tasks, { lessonDoneToday: true }).doneIds.has('l')).toBe(true)
  })

  it('marks the Daily Trap done once played today', () => {
    const withTrap = [...tasks, { id: 't', actionType: 'daily_trap' }]
    expect(planProgress(withTrap, { trapDoneToday: false }).doneIds.has('t')).toBe(false)
    expect(planProgress(withTrap, { trapDoneToday: true }).doneIds.has('t')).toBe(true)
  })

  it('never marks actions with no completion signal', () => {
    const all = planProgress(tasks, {
      dueCount: 0, lessonDoneToday: true, topicsQuizzedToday: ['algebra'],
    })
    expect(all.doneIds.has('f')).toBe(false)   // flashcards leave no trace
    expect(all.done).toBe(4)
    expect(all.total).toBe(5)
  })

  it('counts nothing on an empty day', () => {
    expect(planProgress(tasks, { dueCount: 2 }).done).toBe(0)
  })
})
