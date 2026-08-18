import { pickTodayMission, nextActionChips, isEnergyFree } from '../todayMission'

// Callers pass the weakest ATTEMPTED unit (weakestAttemptedUnitOf); the picker
// still guards on pct so an unattempted unit passed by mistake falls through.
const weakAttempted = { topic: 'cell-biology', title: 'Cell Biology', pct: 55, attempts: 3 }
// A unit that has never been attempted (defensive: producer should never send this)
const weakUnattempted = { topic: 'ecology', title: 'Ecology', pct: null, attempts: 0 }
// A unit that has been mastered
const weakMastered = { topic: 'genetics', title: 'Genetics', pct: 90, attempts: 5 }

describe('pickTodayMission — priority cascade', () => {
  test('① set_goal when no goal is set (ignores all other signals)', () => {
    const m = pickTodayMission({
      hasGoal: false,
      coldStart: true,
      daysToExam: 5,
      hasTakenPracticeExam: false,
      dueCount: 10,
      weakestUnit: weakAttempted,
    })
    expect(m.actionType).toBe('set_goal')
    expect(m.priority).toBe(1)
    expect(m.topic).toBeNull()
    expect(typeof m.cta).toBe('string')
  })

  test('② checkup when goal is set but coldStart (ignores exam/mistakes/weakUnit)', () => {
    const m = pickTodayMission({
      hasGoal: true,
      coldStart: true,
      daysToExam: 5,
      hasTakenPracticeExam: false,
      dueCount: 7,
      weakestUnit: weakAttempted,
    })
    expect(m.actionType).toBe('checkup')
    expect(m.priority).toBe(2)
  })

  test('③ practice_exam when daysToExam ≤ 14 and no exam taken', () => {
    const m = pickTodayMission({
      hasGoal: true,
      coldStart: false,
      daysToExam: 14,
      hasTakenPracticeExam: false,
      dueCount: 3,
      weakestUnit: weakAttempted,
    })
    expect(m.actionType).toBe('practice_exam')
    expect(m.priority).toBe(3)
    expect(m.subtitle).toContain('14 days')
  })

  test('③ practice_exam singular day label when daysToExam = 1', () => {
    const m = pickTodayMission({ hasGoal: true, coldStart: false, daysToExam: 1, hasTakenPracticeExam: false })
    expect(m.subtitle).toContain('1 day to go')
  })

  test('③ skipped when daysToExam = 15 (not within 14 days)', () => {
    const m = pickTodayMission({
      hasGoal: true,
      coldStart: false,
      daysToExam: 15,
      hasTakenPracticeExam: false,
      dueCount: 0,
      weakestUnit: null,
    })
    expect(m.actionType).toBe('next_lesson')
  })

  test('③ skipped when daysToExam ≤ 14 but practice exam already taken', () => {
    const m = pickTodayMission({
      hasGoal: true,
      coldStart: false,
      daysToExam: 10,
      hasTakenPracticeExam: true,
      dueCount: 0,
      weakestUnit: null,
    })
    expect(m.actionType).toBe('next_lesson')
  })

  test('③ skipped when daysToExam is null (no exam date committed)', () => {
    const m = pickTodayMission({
      hasGoal: true,
      coldStart: false,
      daysToExam: null,
      hasTakenPracticeExam: false,
      dueCount: 0,
      weakestUnit: null,
    })
    // null daysToExam means condition fails → should NOT be practice_exam
    expect(m.actionType).not.toBe('practice_exam')
  })

  test('④ review_mistakes when dueCount > 0 (exam not within 14 days)', () => {
    const m = pickTodayMission({
      hasGoal: true,
      coldStart: false,
      daysToExam: 30,
      hasTakenPracticeExam: false,
      dueCount: 5,
      weakestUnit: weakAttempted,
    })
    expect(m.actionType).toBe('review_mistakes')
    expect(m.priority).toBe(4)
    expect(m.subtitle).toContain('5 items')
  })

  test('④ subtitle uses singular "item" when dueCount = 1', () => {
    const m = pickTodayMission({ hasGoal: true, coldStart: false, daysToExam: 30, dueCount: 1 })
    expect(m.subtitle).toContain('1 item queued')
  })

  test('⑤ weak_unit_quiz for attempted+weak topic', () => {
    const m = pickTodayMission({
      hasGoal: true,
      coldStart: false,
      daysToExam: 30,
      hasTakenPracticeExam: false,
      dueCount: 0,
      weakestUnit: weakAttempted,
    })
    expect(m.actionType).toBe('weak_unit_quiz')
    expect(m.priority).toBe(5)
    expect(m.topic).toBe('cell-biology')
    expect(m.title).toContain('Cell Biology')
  })

  test('⑤ skipped (→ next_lesson) when weakestUnit is unattempted', () => {
    const m = pickTodayMission({
      hasGoal: true,
      coldStart: false,
      daysToExam: 30,
      hasTakenPracticeExam: false,
      dueCount: 0,
      weakestUnit: weakUnattempted,
    })
    expect(m.actionType).toBe('next_lesson')
  })

  test('⑤ skipped (→ next_lesson) when weakestUnit is mastered (pct ≥ 85)', () => {
    const m = pickTodayMission({
      hasGoal: true,
      coldStart: false,
      daysToExam: 30,
      hasTakenPracticeExam: false,
      dueCount: 0,
      weakestUnit: weakMastered,
    })
    expect(m.actionType).toBe('next_lesson')
  })

  test('⑥ next_lesson as guaranteed fallback when all signals are clear', () => {
    const m = pickTodayMission({
      hasGoal: true,
      coldStart: false,
      daysToExam: 60,
      hasTakenPracticeExam: true,
      dueCount: 0,
      weakestUnit: null,
    })
    expect(m.actionType).toBe('next_lesson')
    expect(m.priority).toBe(6)
    expect(m.topic).toBeNull()
  })

  test('⑥ next_lesson when called with no args (all defaults)', () => {
    const m = pickTodayMission()
    // hasGoal defaults false → set_goal (the actual highest priority default)
    expect(m.actionType).toBe('set_goal')
  })
})

describe('pickTodayMission — return shape', () => {
  const REQUIRED = ['id', 'icon', 'title', 'subtitle', 'cta', 'priority', 'actionType', 'topic', 'estimatedMinutes']

  for (const actionType of ['set_goal', 'checkup', 'practice_exam', 'review_mistakes', 'weak_unit_quiz', 'next_lesson']) {
    test(`${actionType} returns all required fields`, () => {
      let args = { hasGoal: true, coldStart: false, daysToExam: 60, hasTakenPracticeExam: true, dueCount: 0, weakestUnit: null }
      if (actionType === 'set_goal')       args = { ...args, hasGoal: false }
      if (actionType === 'checkup')        args = { ...args, coldStart: true }
      if (actionType === 'practice_exam')  args = { ...args, daysToExam: 10, hasTakenPracticeExam: false }
      if (actionType === 'review_mistakes') args = { ...args, dueCount: 3 }
      if (actionType === 'weak_unit_quiz') args = { ...args, weakestUnit: weakAttempted }

      const m = pickTodayMission(args)
      for (const key of REQUIRED) {
        expect(m).toHaveProperty(key)
      }
      expect(typeof m.estimatedMinutes).toBe('number')
      expect(m.estimatedMinutes).toBeGreaterThan(0)
    })
  }

  test('topic is null for all non-weak_unit_quiz missions', () => {
    const missions = [
      pickTodayMission({ hasGoal: false }),
      pickTodayMission({ hasGoal: true, coldStart: true }),
      pickTodayMission({ hasGoal: true, coldStart: false, daysToExam: 60, dueCount: 0, weakestUnit: null }),
    ]
    missions.forEach((m) => expect(m.topic).toBeNull())
  })

  test('topic is set for weak_unit_quiz', () => {
    const m = pickTodayMission({ hasGoal: true, coldStart: false, dueCount: 0, weakestUnit: weakAttempted })
    expect(m.topic).toBe('cell-biology')
  })
})

describe('pickTodayMission — Level 0 remediation', () => {
  const mathArgs = { hasGoal: true, coldStart: true, needsLevel0: true, mathSubject: true }

  test('outranks checkup for a flagged math student', () => {
    const m = pickTodayMission(mathArgs)
    expect(m.actionType).toBe('level0_math')
  })

  test('never fires outside a math subject', () => {
    const m = pickTodayMission({ ...mathArgs, mathSubject: false })
    expect(m.actionType).not.toBe('level0_math')
    expect(m.actionType).toBe('checkup')
  })

  test('drops out once snoozed for today', () => {
    const m = pickTodayMission({ ...mathArgs, level0Snoozed: true })
    expect(m.actionType).not.toBe('level0_math')
  })

  test('still loses to set_goal — nothing outranks having no goal at all', () => {
    const m = pickTodayMission({ ...mathArgs, hasGoal: false })
    expect(m.actionType).toBe('set_goal')
  })
})

describe('pickTodayMission — Daily Trap and the all-caught-up floor', () => {
  const clear = { hasGoal: true, coldStart: false, daysToExam: 60, hasTakenPracticeExam: true, dueCount: 0, weakestUnit: null }

  test('never outranks a real lesson', () => {
    const m = pickTodayMission({ ...clear, hasNextLesson: true, trapAvailable: true })
    expect(m.actionType).toBe('next_lesson')
  })

  test('wins once the path is exhausted', () => {
    const m = pickTodayMission({ ...clear, hasNextLesson: false, trapAvailable: true })
    expect(m.actionType).toBe('daily_trap')
  })

  test('falls through to all_caught_up when nothing is left, including the trap', () => {
    const m = pickTodayMission({ ...clear, hasNextLesson: false, trapAvailable: false })
    expect(m.actionType).toBe('all_caught_up')
  })
})

describe('pickTodayMission — streak urgency is decoration, not a rung', () => {
  const args = { hasGoal: true, coldStart: false, daysToExam: 60, hasTakenPracticeExam: true, dueCount: 3, weakestUnit: null }

  test('does not change which action wins', () => {
    const calm  = pickTodayMission(args)
    const urgent = pickTodayMission({ ...args, streakAtRisk: true, streakDays: 12 })
    expect(urgent.actionType).toBe(calm.actionType)
    expect(urgent.urgencyNote).toContain('12-day streak')
    expect(calm.urgencyNote).toBeNull()
  })
})

describe('nextActionChips', () => {
  const loaded = {
    dueCount: 4, weakestUnit: weakAttempted, daysToExam: 10, hasTakenPracticeExam: false,
    needsLevel0: true, mathSubject: true, level0Snoozed: false, trapAvailable: true,
  }

  test('excludes whichever action type is currently the hero', () => {
    const chips = nextActionChips(loaded, 'review_mistakes')
    expect(chips.some((c) => c.actionType === 'review_mistakes')).toBe(false)
  })

  test('caps at 3 even when every surface is eligible', () => {
    const chips = nextActionChips(loaded, 'next_lesson')
    expect(chips.length).toBeLessThanOrEqual(3)
  })

  test('never surfaces next_lesson, set_goal, checkup, or all_caught_up as a chip', () => {
    const chips = nextActionChips(loaded, 'weak_unit_quiz')
    const types = chips.map((c) => c.actionType)
    expect(types).not.toContain('next_lesson')
    expect(types).not.toContain('set_goal')
    expect(types).not.toContain('checkup')
    expect(types).not.toContain('all_caught_up')
  })

  test('empty when nothing else is eligible', () => {
    const chips = nextActionChips({ dueCount: 0, weakestUnit: null, daysToExam: null, trapAvailable: false }, 'next_lesson')
    expect(chips).toEqual([])
  })
})

describe('isEnergyFree', () => {
  test('the Daily Trap is free — a miss costs nothing', () => {
    expect(isEnergyFree('daily_trap')).toBe(true)
  })
})
