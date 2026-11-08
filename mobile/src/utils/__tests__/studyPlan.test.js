// Study plan engine (docs/designs/exam-date-study-plan.md, Phase 1).
import {
  buildStudyPlan, phaseWindows, studyDaysIn, DEFAULT_AVAILABILITY,
} from '../studyPlan'

// 10 units × 3 lessons, in course order
const UNITS = Array.from({ length: 10 }, (_, i) => ({
  id: `u${i + 1}`, topic: `T${i + 1}`, title: `Unit ${i + 1}`, lessonCount: 3,
}))
const TODAY = '2026-11-08'
const JUNE  = '2027-06-22'   // 226 days after TODAY

const plan = (over = {}) => buildStudyPlan({ today: TODAY, examDateStr: JUNE, target: 75, units: UNITS, ...over })
const addDays = (ymd, n) => {
  const [y, m, d] = ymd.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d + n))
  return dt.toISOString().slice(0, 10)
}

describe('inputs', () => {
  test('no usable exam date → null', () => {
    expect(buildStudyPlan({ today: TODAY, examDateStr: null, units: UNITS })).toBeNull()
    expect(buildStudyPlan({ today: TODAY, examDateStr: 'soon', units: UNITS })).toBeNull()
    expect(buildStudyPlan({ today: null, examDateStr: JUNE, units: UNITS })).toBeNull()
  })

  test('defaults to 5 days × 15 min and clamps availability', () => {
    expect(plan().availability).toEqual(DEFAULT_AVAILABILITY)
    expect(plan({ availability: { daysPerWeek: 0, minutesPerDay: 15 } }).availability.daysPerWeek).toBe(1)
    expect(plan({ availability: { daysPerWeek: 9, minutesPerDay: 15 } }).availability.daysPerWeek).toBe(7)
  })

  test('does not mutate its inputs and is deterministic', () => {
    const units = JSON.parse(JSON.stringify(UNITS))
    const done = { T1: 3 }
    const a = buildStudyPlan({ today: TODAY, examDateStr: JUNE, units, lessonsDoneByTopic: done })
    const b = buildStudyPlan({ today: TODAY, examDateStr: JUNE, units, lessonsDoneByTopic: done })
    expect(a).toEqual(b)
    expect(units).toEqual(UNITS)
    expect(done).toEqual({ T1: 3 })
  })
})

describe('date math', () => {
  test('counts calendar days across a leap day and a DST change', () => {
    expect(buildStudyPlan({ today: '2028-02-28', examDateStr: '2028-03-01', units: UNITS }).daysLeft).toBe(2)
    expect(buildStudyPlan({ today: '2027-03-13', examDateStr: '2027-03-15', units: UNITS }).daysLeft).toBe(2)
    expect(plan().daysLeft).toBe(226)
  })

  test('studyDaysIn scales by days per week', () => {
    expect(studyDaysIn(14, 7)).toBe(14)
    expect(studyDaysIn(14, 5)).toBe(10)
    expect(studyDaysIn(14, 3)).toBe(6)
    expect(studyDaysIn(0, 5)).toBe(0)
    expect(studyDaysIn(1, 1)).toBe(1)   // a single day still counts
  })
})

describe('phases by days left', () => {
  test.each([
    [-1, 'passed'],
    [0,  'exam_day'],
    [1,  'final_week'],
    [7,  'final_week'],
    [8,  'exam_prep'],
    [21, 'learn'],
    [30, 'learn'],
    [226, 'learn'],
  ])('%i days left → %s', (days, phase) => {
    expect(plan({ examDateStr: addDays(TODAY, days) }).phase).toBe(phase)
  })

  test('a long timeline has all four phases ending the day before the exam', () => {
    const p = plan()
    expect(p.phases.map((x) => x.id)).toEqual(['learn', 'strengthen', 'exam_prep', 'final_week'])
    expect(p.phases[0].start).toBe(TODAY)
    expect(p.phases[3].end).toBe('2027-06-21')
    expect(p.phases.reduce((s, x) => s + x.days, 0)).toBe(226)
    // fixed windows: final week 7, prep 14, strengthen 2 days/unit (20)
    expect(p.phases.map((x) => x.days)).toEqual([185, 20, 14, 7])
  })

  test('the coverage date stays put as days pass (no drift)', () => {
    const end = (today) => buildStudyPlan({ today, examDateStr: JUNE, units: UNITS }).phases[0].end
    expect(end(TODAY)).toBe(end(addDays(TODAY, 30)))
  })

  test('with every lesson done there is no learn phase', () => {
    const allDone = Object.fromEntries(UNITS.map((u) => [u.topic, 3]))
    const p = plan({ lessonsDoneByTopic: allDone })
    expect(p.phase).toBe('strengthen')
    expect(p.phases.map((x) => x.id)).not.toContain('learn')
  })

  test('phaseWindows compresses short timelines', () => {
    expect(phaseWindows(5, 10, 30)).toEqual({ finalWeek: 5, prep: 0, strengthen: 0, learn: 0 })
    expect(phaseWindows(21, 10, 30)).toEqual({ finalWeek: 7, prep: 7, strengthen: 1, learn: 6 })
  })
})

describe('passed and exam day', () => {
  test('a passed date schedules nothing', () => {
    const p = plan({ examDateStr: addDays(TODAY, -3) })
    expect(p.phase).toBe('passed')
    expect(p.daysLeft).toBe(-3)
    expect(p.phases).toEqual([])
    expect(p.todayBudgetMinutes).toBe(0)
  })
  test('exam day schedules nothing', () => {
    const p = plan({ examDateStr: TODAY })
    expect(p.phase).toBe('exam_day')
    expect(p.thisWeek.units).toEqual([])
  })
})

describe('pace', () => {
  test('30 lessons over a school year at 15 min is comfortably ahead', () => {
    const p = plan()
    expect(p.pace.lessonsLeft).toBe(30)
    expect(p.pace.lessonsPerStudyDay).toBe(1)
    expect(p.pace.status).toBe('ahead')
    expect(p.pace.shortfallLessons).toBe(0)
  })

  test('counts completed lessons and caps them at each unit size', () => {
    const p = plan({ lessonsDoneByTopic: { T1: 3, T2: 1, T3: 99 } })
    expect(p.pace.lessonsDone).toBe(7)
    expect(p.pace.lessonsLeft).toBe(23)
    expect(p.pace.unitsLeft).toBe(8)   // T2 is part-done, T1/T3 finished
  })

  test('10 units left with two weeks to go is at risk, with the shortfall', () => {
    const p = plan({ examDateStr: addDays(TODAY, 14) })
    expect(p.pace.status).toBe('at_risk')
    expect(p.pace.shortfallLessons).toBeGreaterThan(20)
  })

  test('lessons left but no learn window is at risk', () => {
    const p = plan({ examDateStr: addDays(TODAY, 6) })
    expect(p.pace.learnStudyDays).toBe(0)
    expect(p.pace.status).toBe('at_risk')
  })

  test('status moves from ahead to behind as minutes shrink', () => {
    // 30 lessons, 40 days: 7 final + 14 prep + 19 pre (compressed: 4 strengthen, 15 learn)
    const at = (minutesPerDay) => plan({ examDateStr: addDays(TODAY, 40), availability: { daysPerWeek: 7, minutesPerDay } }).pace.status
    expect(at(60)).toBe('ahead')
    expect(at(10)).toBe('at_risk')
  })
})

describe('feasibility', () => {
  test('a comfortable plan fits with no suggestions', () => {
    const p = plan()
    expect(p.feasibility.fits).toBe(true)
    expect(p.feasibility.suggestions).toEqual([])
  })

  test('3 days a week does not fit; the fix names exact values', () => {
    const units = Array.from({ length: 20 }, (_, i) => ({ topic: `X${i}`, lessonCount: 3 }))
    const p = buildStudyPlan({
      today: TODAY, examDateStr: addDays(TODAY, 60), target: 75, units,
      availability: { daysPerWeek: 3, minutesPerDay: 15 },
    })
    expect(p.feasibility.fits).toBe(false)
    const types = p.feasibility.suggestions.map((s) => s.type)
    expect(types).toEqual(['more_minutes', 'more_days', 'later_session', 'lower_target'])
    expect(p.feasibility.suggestions[0].minutesPerDay).toBeGreaterThanOrEqual(p.feasibility.minutesNeededPerDay)
    expect(p.feasibility.suggestions[1].daysPerWeek).toBeGreaterThan(3)
    expect(p.feasibility.suggestions[3].target).toBe(65)

    const seven = buildStudyPlan({
      today: TODAY, examDateStr: addDays(TODAY, 60), target: 75, units,
      availability: { daysPerWeek: 7, minutesPerDay: 15 },
    })
    expect(seven.feasibility.minutesNeededPerDay).toBeLessThan(p.feasibility.minutesNeededPerDay)
  })

  test('no lower tier is offered at Pass (65)', () => {
    const p = plan({ examDateStr: addDays(TODAY, 14), target: 65 })
    expect(p.feasibility.suggestions.map((s) => s.type)).not.toContain('lower_target')
  })
})

describe('this week', () => {
  test('learn phase: next lessons in course order, skipping finished units', () => {
    const p = plan({ lessonsDoneByTopic: { T1: 3, T2: 2 }, availability: { daysPerWeek: 5, minutesPerDay: 15 } })
    expect(p.thisWeek.units[0]).toMatchObject({ unitId: 'u2', lessons: 1 })
    expect(p.thisWeek.units[1].unitId).toBe('u3')
    const total = p.thisWeek.units.reduce((s, u) => s + u.lessons, 0)
    expect(total).toBe(p.pace.lessonsPerStudyDay * 5)
  })

  test('strengthen phase: the two highest-yield units below target', () => {
    const allDone = Object.fromEntries(UNITS.map((u) => [u.topic, 3]))
    const p = plan({
      lessonsDoneByTopic: allDone,
      topicBreakdown: [
        { topic: 'T1', pct: 90 },            // above target: not weak
        { topic: 'T2', pct: 70 },
        { topic: 'T3', pct: 40 },
        { topic: 'T4', pct: 60 },
        { topic: 'T5', pct: null },          // unattempted: not counted
      ],
    })
    expect(p.thisWeek.weakUnits.map((u) => u.topic)).toEqual(['T3', 'T4'])
    expect(p.thisWeek.weakUnits[0].gap).toBe(35)
  })

  test('exam prep: a practice exam until enough are taken', () => {
    const prep = (taken) => plan({ examDateStr: addDays(TODAY, 8), practiceExamsTaken: taken }).thisWeek.practiceExam
    expect(plan({ examDateStr: addDays(TODAY, 8) }).phase).toBe('exam_prep')
    expect(prep(0)).toBe(true)
    expect(prep(3)).toBe(false)
  })

  test('final week: only reviews, plus one exam if none was ever taken', () => {
    const p = plan({ examDateStr: addDays(TODAY, 5), dueCount: 12 })
    expect(p.thisWeek.units).toEqual([])
    expect(p.thisWeek.reviews).toBe(12)
    expect(p.thisWeek.practiceExam).toBe(true)
    expect(plan({ examDateStr: addDays(TODAY, 5), practiceExamsTaken: 1 }).thisWeek.practiceExam).toBe(false)
    expect(plan({ examDateStr: addDays(TODAY, 2) }).thisWeek.practiceExam).toBe(false)
  })
})

describe('milestones', () => {
  test('long timeline: checkup, coverage, three practice exams, exam', () => {
    const p = plan({ practiceExamsTaken: 1, coldStart: false })
    expect(p.milestones.map((m) => m.id)).toEqual([
      'checkup', 'all_units_covered', 'practice_exam_1', 'practice_exam_2', 'practice_exam_3', 'exam',
    ])
    expect(p.milestones.find((m) => m.id === 'practice_exam_1').done).toBe(true)
    expect(p.milestones.find((m) => m.id === 'practice_exam_2').done).toBe(false)
    expect(p.milestones.at(-1).date).toBe(JUNE)
  })

  test('practice exams start when exam prep starts and stay before the exam', () => {
    const p = plan()
    const prepStart = p.phases.find((x) => x.id === 'exam_prep').start
    expect(p.milestones.find((m) => m.id === 'practice_exam_1').date).toBe(prepStart)
    for (const m of p.milestones.filter((x) => x.id.startsWith('practice_exam'))) {
      expect(m.date < JUNE).toBe(true)
    }
  })

  test('cold start leaves the checkup open', () => {
    expect(plan({ coldStart: true }).milestones[0]).toMatchObject({ id: 'checkup', done: false })
  })
})

test('points to go comes from the predicted score', () => {
  expect(plan({ predicted: 68 }).pointsToGo).toBe(7)
  expect(plan({ predicted: 80 }).pointsToGo).toBe(0)
  expect(plan().pointsToGo).toBeNull()
})
