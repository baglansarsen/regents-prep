import { buildHomeAgenda } from '../homeAgenda'

const base = {
  hasGoal: true, coldStart: false, daysToExam: 60, hasTakenPracticeExam: true,
  dueCount: 0, weakestUnit: null,
}

describe('buildHomeAgenda — loading state', () => {
  test('returns an empty agenda while not ready, never computing from unloaded data', () => {
    const agenda = buildHomeAgenda({ ...base, ready: false, dueCount: 5 })
    expect(agenda.hero).toBeNull()
    expect(agenda.chips).toEqual([])
    expect(agenda.plan.tasks).toEqual([])
  })
})

describe('buildHomeAgenda — normal ladder', () => {
  test('hero matches the ladder winner when there is no rescue plan', () => {
    const agenda = buildHomeAgenda({ ...base, dueCount: 3 })
    expect(agenda.hero.actionType).toBe('review_mistakes')
    expect(agenda.rescue).toBe(false)
    expect(agenda.planLabel).toBeNull()
  })

  test('chips exclude the hero action type', () => {
    const agenda = buildHomeAgenda({
      ...base, dueCount: 3, weakestUnit: { topic: 'algebra', title: 'Algebra', pct: 40, attempts: 2 },
      needsLevel0: true, mathSubject: true,
    })
    expect(agenda.chips.every((c) => c.actionType !== agenda.hero.actionType)).toBe(true)
    expect(agenda.chips.length).toBeGreaterThan(0)
  })

  test('set_goal blocks chips entirely — nothing else is actionable yet', () => {
    const agenda = buildHomeAgenda({ ...base, hasGoal: false, dueCount: 5, needsLevel0: true, mathSubject: true })
    expect(agenda.hero.actionType).toBe('set_goal')
    expect(agenda.chips).toEqual([])
  })

  test('checkup also blocks chips — no data yet to base a runner-up on', () => {
    const agenda = buildHomeAgenda({ ...base, coldStart: true, dueCount: 5, trapAvailable: true })
    expect(agenda.hero.actionType).toBe('checkup')
    expect(agenda.chips).toEqual([])
  })
})

describe('buildHomeAgenda — rescue override', () => {
  const plan = { urgency: 'week', targetMode: 'pass' }

  test('overrides the hero when a rescue plan exists within 30 days', () => {
    const agenda = buildHomeAgenda({ ...base, daysToExam: 10, dueCount: 4, rescuePlan: plan })
    expect(agenda.rescue).toBe(true)
    expect(agenda.hero.rescue).toBe(true)
    expect(agenda.planLabel).toBeTruthy()
  })

  test('does not override set_goal/checkup — nothing for the plan to act on yet', () => {
    const agenda = buildHomeAgenda({ ...base, hasGoal: false, daysToExam: 10, rescuePlan: plan })
    expect(agenda.rescue).toBe(false)
    expect(agenda.hero.actionType).toBe('set_goal')
  })

  test('does not override once the exam is more than 30 days out', () => {
    const agenda = buildHomeAgenda({ ...base, daysToExam: 45, dueCount: 4, rescuePlan: plan })
    expect(agenda.rescue).toBe(false)
  })

  test('runner-up chips still come from the normal ladder during rescue', () => {
    const agenda = buildHomeAgenda({
      ...base, daysToExam: 10, dueCount: 4, rescuePlan: plan,
      needsLevel0: true, mathSubject: true,
    })
    expect(agenda.chips.some((c) => c.actionType === 'level0_math')).toBe(true)
  })
})
