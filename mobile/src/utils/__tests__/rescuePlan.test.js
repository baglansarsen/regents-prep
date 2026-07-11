import {
  pickRescueAction, urgencyFromDays, targetModeFromTarget, planLabelOf,
  URGENCY_OPTIONS, TARGET_MODE_OPTIONS,
} from '../rescuePlan'

const weakLow  = { topic: 'genetics', title: 'Genetics', pct: 55, attempts: 3 }
const weak80   = { topic: 'ecology',  title: 'Ecology',  pct: 80, attempts: 4 }

// Mission-shaped contract expected by HomeScreen's card + runMission dispatcher
const MISSION_FIELDS = ['id', 'icon', 'title', 'subtitle', 'cta', 'actionType', 'estimatedMinutes', 'planLabel']
const VALID_ACTIONS  = ['review_mistakes', 'weak_unit_quiz', 'practice_exam', 'next_lesson']

describe('profile derivation', () => {
  test('urgencyFromDays buckets', () => {
    expect(urgencyFromDays(3)).toBe('week')
    expect(urgencyFromDays(7)).toBe('week')
    expect(urgencyFromDays(8)).toBe('month')
    expect(urgencyFromDays(30)).toBe('month')
    expect(urgencyFromDays(31)).toBe('long')
    expect(urgencyFromDays(null)).toBe('long')
  })

  test('targetModeFromTarget buckets', () => {
    expect(targetModeFromTarget(65)).toBe('pass')
    expect(targetModeFromTarget(75)).toBe('boost')
    expect(targetModeFromTarget(85)).toBe('mastery')
  })

  test('option lists cover the profile enums', () => {
    expect(URGENCY_OPTIONS.map((o) => o.value)).toEqual(['week', 'month', 'long'])
    expect(TARGET_MODE_OPTIONS.map((o) => o.value)).toEqual(['pass', 'boost', 'mastery'])
  })

  test('emergency pass plan label', () => {
    expect(planLabelOf({ urgency: 'week', targetMode: 'pass' })).toBe('EMERGENCY PASS PLAN')
  })
})

describe('pickRescueAction — crunch week ordering', () => {
  const plan = { urgency: 'week', targetMode: 'pass' }

  test('mistakes first (fastest points)', () => {
    const m = pickRescueAction({ plan, daysToExam: 5, dueCount: 4, weakestUnit: weakLow, hasTakenPracticeExam: false })
    expect(m.actionType).toBe('review_mistakes')
    expect(m.rescue).toBe(true)
    expect(m.estimatedMinutes).toBe(8)          // “You need 8 focused minutes”
  })

  test('then the weak spot', () => {
    const m = pickRescueAction({ plan, daysToExam: 5, dueCount: 0, weakestUnit: weakLow, hasTakenPracticeExam: false })
    expect(m.actionType).toBe('weak_unit_quiz')
    expect(m.topic).toBe('genetics')
    expect(m.title).toBe('Today: fix your highest-value weak spot')
  })

  test('practice exam only with ≥3 days left', () => {
    const withTime = pickRescueAction({ plan, daysToExam: 5, dueCount: 0, weakestUnit: null, hasTakenPracticeExam: false })
    expect(withTime.actionType).toBe('practice_exam')
    const examDay = pickRescueAction({ plan, daysToExam: 1, dueCount: 0, weakestUnit: null, hasTakenPracticeExam: false })
    expect(examDay.actionType).toBe('next_lesson')   // no 90-min exam the day before
  })

  test('pass mode ignores a topic that already clears 65', () => {
    const m = pickRescueAction({ plan, daysToExam: 5, dueCount: 0, weakestUnit: weak80, hasTakenPracticeExam: true })
    expect(m.actionType).toBe('next_lesson')
  })
})

describe('pickRescueAction — month/long ordering', () => {
  const plan = { urgency: 'month', targetMode: 'mastery' }

  test('diagnose first: practice exam before drills when none taken', () => {
    const m = pickRescueAction({ plan, daysToExam: 21, dueCount: 5, weakestUnit: weakLow, hasTakenPracticeExam: false })
    expect(m.actionType).toBe('practice_exam')
  })

  test('then weak spot (mastery flags anything under 85)', () => {
    const m = pickRescueAction({ plan, daysToExam: 21, dueCount: 5, weakestUnit: weak80, hasTakenPracticeExam: true })
    expect(m.actionType).toBe('weak_unit_quiz')
    expect(m.topic).toBe('ecology')
  })

  test('then mistakes, then steady reps', () => {
    const mistakes = pickRescueAction({ plan, daysToExam: 21, dueCount: 3, weakestUnit: null, hasTakenPracticeExam: true })
    expect(mistakes.actionType).toBe('review_mistakes')
    const steady = pickRescueAction({ plan, daysToExam: 21, dueCount: 0, weakestUnit: null, hasTakenPracticeExam: true })
    expect(steady.actionType).toBe('next_lesson')
  })

  test('longer runway gets longer sessions', () => {
    const m = pickRescueAction({ plan: { urgency: 'long', targetMode: 'boost' }, daysToExam: 45, dueCount: 2, weakestUnit: null, hasTakenPracticeExam: true })
    expect(m.estimatedMinutes).toBe(15)
  })
})

describe('mission-shape contract', () => {
  test('every branch returns the fields HomeScreen renders and dispatches on', () => {
    const cases = [
      { plan: { urgency: 'week',  targetMode: 'pass' },    dueCount: 3 },
      { plan: { urgency: 'week',  targetMode: 'boost' },   weakestUnit: weakLow },
      { plan: { urgency: 'week',  targetMode: 'pass' },    daysToExam: 5 },
      { plan: { urgency: 'week',  targetMode: 'pass' },    daysToExam: 1, hasTakenPracticeExam: true },
      { plan: { urgency: 'month', targetMode: 'mastery' } },
      { plan: { urgency: 'month', targetMode: 'pass' },    hasTakenPracticeExam: true, dueCount: 2 },
      { plan: { urgency: 'long',  targetMode: 'boost' },   hasTakenPracticeExam: true },
    ]
    for (const c of cases) {
      const m = pickRescueAction({ daysToExam: 10, dueCount: 0, weakestUnit: null, hasTakenPracticeExam: false, ...c })
      for (const f of MISSION_FIELDS) expect(m).toHaveProperty(f)
      expect(m.rescue).toBe(true)
      expect(VALID_ACTIONS).toContain(m.actionType)
      expect(m.topic !== undefined).toBe(true)   // null or a topic string, never undefined
    }
  })

  test('defaults do not crash (no plan at all)', () => {
    const m = pickRescueAction()
    expect(VALID_ACTIONS).toContain(m.actionType)
  })
})
