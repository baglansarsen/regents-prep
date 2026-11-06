import { buildTodayPlan } from '../todayMission'

// Regression: the onboarding plan used headline = lead.title, so NextActionCard
// printed "Take a quick checkup" a second time under its own CTA.
const base = {
  hasGoal: true,
  coldStart: false,
  weakestUnit: { topic: 'algebra', title: 'Algebra', pct: 40, attempts: 3 },
  predicted: 67,
  target: 75,
}

describe('buildTodayPlan onboarding headline', () => {
  it('has no headline on a cold start (the hero title is already shown)', () => {
    const plan = buildTodayPlan({ ...base, coldStart: true })
    expect(plan.lead.title).toBe('Take a quick checkup')
    expect(plan.headline).toBe('')
  })

  it('has no headline before a goal exists', () => {
    expect(buildTodayPlan({ ...base, hasGoal: false }).headline).toBe('')
  })
})
