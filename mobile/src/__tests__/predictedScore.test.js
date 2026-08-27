/**
 * predictedScore tests — the pure model behind the Regents goal card.
 * Covers cold start, exam-count weighting, clamping, consistency bonus,
 * smoothing step caps, and weakest-unit selection.
 */
import {
  predictRegentsScore, smoothPrediction, weakestUnitOf, weakestAttemptedUnitOf,
  pointsToGain, rankUnitsByYield,
} from '../utils/predictedScore'

const UNITS = [
  { topic: 'cell_biology', title: 'Cell Biology' },
  { topic: 'genetics',     title: 'Genetics' },
  { topic: 'ecology',      title: 'Ecology' },
]

describe('predictRegentsScore', () => {
  test('cold start: no exams, no quiz history → score null', () => {
    const r = predictRegentsScore({ units: UNITS, history: [], examScores: {}, subjectExamIds: [] })
    expect(r.score).toBeNull()
    expect(r.coldStart).toBe(true)
    expect(r.topicBreakdown).toHaveLength(3)
    expect(r.topicBreakdown.every((t) => t.pct === null)).toBe(true)
  })

  test('quiz-only (no exams): mastery drives the score, wExam = 0', () => {
    const history = [
      { topic: 'cell_biology', pct: 90 },
      { topic: 'genetics',     pct: 80 },
      { topic: 'ecology',      pct: 70 },
    ]
    const r = predictRegentsScore({ units: UNITS, history, examScores: {}, subjectExamIds: [] })
    expect(r.coldStart).toBe(false)
    expect(r.examCount).toBe(0)
    // mean pct = 80 → scaled 85 (≥0.78 threshold)
    expect(r.components.masteryScaled).toBe(85)
    expect(r.score).toBe(85)
  })

  test('unattempted topics pull the mastery mean down via the prior', () => {
    const history = [{ topic: 'cell_biology', pct: 90 }]
    const r = predictRegentsScore({ units: UNITS, history, examScores: {}, subjectExamIds: [] })
    // mean = (90 + 40 + 40)/3 ≈ 56.7 → scaled 65
    expect(r.components.masteryScaled).toBe(65)
  })

  test('exam weighting ramps with exam count (1 → 0.60, 3 → 0.80)', () => {
    const history = [{ topic: 'cell_biology', pct: 100 }, { topic: 'genetics', pct: 100 }, { topic: 'ecology', pct: 100 }]
    // mastery = 100; exams all at 60 — more exams should drag score toward 60
    const oneExam = predictRegentsScore({
      units: UNITS, history,
      examScores: { e1: { best: 60, last: 60 } }, subjectExamIds: ['e1'],
    })
    const threeExams = predictRegentsScore({
      units: UNITS, history,
      examScores: { e1: { best: 60, last: 60 }, e2: { best: 60, last: 60 }, e3: { best: 60, last: 60 } },
      subjectExamIds: ['e1', 'e2', 'e3'],
    })
    // 1 exam: 0.6*60 + 0.4*100 = 76 ; 3 exams: 0.8*60 + 0.2*100 = 68
    expect(oneExam.score).toBe(76)
    expect(threeExams.score).toBe(68)
    expect(threeExams.score).toBeLessThan(oneExam.score)
  })

  test('exams outside the subject are ignored', () => {
    const r = predictRegentsScore({
      units: UNITS, history: [{ topic: 'genetics', pct: 80 }],
      examScores: { foreign: { best: 100, last: 100 } }, subjectExamIds: ['e1'],
    })
    expect(r.examCount).toBe(0)
  })

  test('consistency bonus: streak and studied-day density add up to +3', () => {
    const history = [{ topic: 'cell_biology', pct: 60 }, { topic: 'genetics', pct: 60 }, { topic: 'ecology', pct: 60 }]
    const base = predictRegentsScore({ units: UNITS, history, examScores: {}, subjectExamIds: [] })
    const dates = Array.from({ length: 10 }, (_, i) => `2026-06-${String(i + 1).padStart(2, '0')}`)
    const boosted = predictRegentsScore({
      units: UNITS, history, examScores: {}, subjectExamIds: [],
      streak: 8, studiedDates: dates,
    })
    expect(boosted.score - base.score).toBe(3)
  })

  test('clamps to [50, 100]', () => {
    const low = predictRegentsScore({
      units: UNITS, history: [{ topic: 'cell_biology', pct: 1 }],
      examScores: { e1: { best: 50, last: 50 } }, subjectExamIds: ['e1'],
    })
    expect(low.score).toBeGreaterThanOrEqual(50)
    const high = predictRegentsScore({
      units: UNITS,
      history: [{ topic: 'cell_biology', pct: 100 }, { topic: 'genetics', pct: 100 }, { topic: 'ecology', pct: 100 }],
      examScores: { e1: { best: 100, last: 100 } }, subjectExamIds: ['e1'],
      streak: 10, studiedDates: Array.from({ length: 14 }, (_, i) => `d${i}`),
    })
    expect(high.score).toBeLessThanOrEqual(100)
  })
})

describe('smoothPrediction', () => {
  test('no anchor → raw becomes the anchor', () => {
    expect(smoothPrediction(null, 72, '2026-06-12')).toEqual({ value: 72, date: '2026-06-12' })
  })

  test('null raw keeps the existing anchor', () => {
    const prev = { value: 70, date: '2026-06-11' }
    expect(smoothPrediction(prev, null, '2026-06-12')).toBe(prev)
  })

  test('same day: drops are frozen, rises show immediately', () => {
    const prev = { value: 70, date: '2026-06-12' }
    expect(smoothPrediction(prev, 60, '2026-06-12')).toBe(prev)               // drop frozen
    expect(smoothPrediction(prev, 74, '2026-06-12')).toEqual({ value: 74, date: '2026-06-12' })
  })

  test('new day: step capped at -3 down, +5 up', () => {
    const prev = { value: 70, date: '2026-06-11' }
    expect(smoothPrediction(prev, 50, '2026-06-12')).toEqual({ value: 67, date: '2026-06-12' })
    expect(smoothPrediction(prev, 95, '2026-06-12')).toEqual({ value: 75, date: '2026-06-12' })
    expect(smoothPrediction(prev, 71, '2026-06-12')).toEqual({ value: 71, date: '2026-06-12' })
  })
})

describe('weakestUnitOf', () => {
  test('unattempted topic ranks weakest; otherwise lowest pct', () => {
    expect(weakestUnitOf([
      { topic: 'a', pct: 55 },
      { topic: 'b', pct: null },
      { topic: 'c', pct: 90 },
    ]).topic).toBe('b')
    expect(weakestUnitOf([
      { topic: 'a', pct: 55 },
      { topic: 'c', pct: 90 },
    ]).topic).toBe('a')
    expect(weakestUnitOf([])).toBeNull()
  })
})

describe('weakestAttemptedUnitOf', () => {
  test('skips unattempted units and finds the weakest attempted one', () => {
    expect(weakestAttemptedUnitOf([
      { topic: 'a', pct: 55,   attempts: 3 },
      { topic: 'b', pct: null, attempts: 0 },
      { topic: 'c', pct: 90,   attempts: 5 },
    ]).topic).toBe('a')
  })

  test('null when nothing is attempted', () => {
    expect(weakestAttemptedUnitOf([
      { topic: 'b', pct: null, attempts: 0 },
    ])).toBeNull()
    expect(weakestAttemptedUnitOf([])).toBeNull()
  })
})

describe('examWeight-weighted mastery', () => {
  const WEIGHTED_UNITS = [
    { topic: 'high', title: 'High Weight', examWeight: 0.8 },
    { topic: 'low',  title: 'Low Weight',  examWeight: 0.2 },
  ]

  test('a high-examWeight unit moves the mean more than a low-examWeight one', () => {
    const highStrong = predictRegentsScore({
      units: WEIGHTED_UNITS,
      history: [{ topic: 'high', pct: 100 }, { topic: 'low', pct: 40 }],
    })
    const lowStrong = predictRegentsScore({
      units: WEIGHTED_UNITS,
      history: [{ topic: 'high', pct: 40 }, { topic: 'low', pct: 100 }],
    })
    // Same two pcts, swapped between the 0.8-weight and 0.2-weight unit —
    // the weighted mean must favor whichever arrangement puts the high pct
    // on the high-weight unit.
    expect(highStrong.components.masteryScaled).toBeGreaterThan(lowStrong.components.masteryScaled)
  })

  test('a unit with no examWeight gets the average of its peers\' declared weights, not zero', () => {
    const units = [
      { topic: 'a', examWeight: 0.6 },
      { topic: 'b', examWeight: 0.4 },
      { topic: 'skill' }, // no examWeight, e.g. es-sp
    ]
    const withSkillAttempted = predictRegentsScore({
      units, history: [{ topic: 'a', pct: 40 }, { topic: 'b', pct: 40 }, { topic: 'skill', pct: 100 }],
    })
    const withoutSkillAttempted = predictRegentsScore({
      units, history: [{ topic: 'a', pct: 40 }, { topic: 'b', pct: 40 }],
    })
    // If the no-weight unit counted for nothing, a perfect score on it
    // wouldn't move the mean at all versus not attempting it.
    expect(withSkillAttempted.components.masteryScaled).toBeGreaterThan(withoutSkillAttempted.components.masteryScaled)
  })

  test('no unit declares examWeight → identical to the old flat mean (regression guard)', () => {
    const withWeights = predictRegentsScore({ units: UNITS, history: [
      { topic: 'cell_biology', pct: 90 }, { topic: 'genetics', pct: 80 }, { topic: 'ecology', pct: 70 },
    ] })
    expect(withWeights.components.masteryScaled).toBe(85) // same as the flat-mean test above
  })

  test('topicBreakdown carries id/strand/examWeight through from the unit', () => {
    const units = [{ id: 'u1', topic: 'a', title: 'A', strand: 'ESS2', examWeight: 0.5 }]
    const r = predictRegentsScore({ units, history: [{ topic: 'a', pct: 80 }] })
    expect(r.topicBreakdown[0]).toMatchObject({ id: 'u1', strand: 'ESS2', examWeight: 0.5 })
  })
})

describe('weakestAttemptedUnitOf prefers confidence over best-ever pct', () => {
  test('a decayed high best-ever score loses to a fresher, lower best-ever score', () => {
    const breakdown = [
      { topic: 'stale',  pct: 100, confidence: 20 }, // aced once, long ago / missed since
      { topic: 'steady', pct: 70,  confidence: 70 }, // one recent, middling attempt
    ]
    // Old (pct-only) logic would have picked 'steady' (70 < 100); confidence
    // flips it because 'stale' has actually decayed further.
    expect(weakestAttemptedUnitOf(breakdown).topic).toBe('stale')
  })

  test('falls back to pct when confidence is absent (back-compat with plain breakdowns)', () => {
    expect(weakestAttemptedUnitOf([
      { topic: 'a', pct: 55, attempts: 3 },
      { topic: 'b', pct: null, attempts: 0 },
      { topic: 'c', pct: 90, attempts: 5 },
    ]).topic).toBe('a')
  })
})

describe('pointsToGain / rankUnitsByYield', () => {
  test('higher examWeight and lower confidence both increase points to gain', () => {
    const highYield = pointsToGain({ examWeight: 0.3, confidence: 40 })
    const lowYield  = pointsToGain({ examWeight: 0.05, confidence: 90 })
    expect(highYield).toBeGreaterThan(lowYield)
  })

  test('returns null for a unit with no examWeight', () => {
    expect(pointsToGain({ confidence: 50 })).toBeNull()
  })

  test('rankUnitsByYield sorts highest points-to-gain first, unweighted units last', () => {
    const ranked = rankUnitsByYield([
      { topic: 'a', examWeight: 0.1, confidence: 90 }, // small gain
      { topic: 'b', examWeight: 0.3, confidence: 20 }, // biggest gain
      { topic: 'skill', confidence: 0 },               // no weight — sorts last regardless
    ])
    expect(ranked.map((r) => r.topic)).toEqual(['b', 'a', 'skill'])
  })
})

describe('mixed "All Topics" history (checkup signal)', () => {
  test('a mixed quiz clears coldStart even with no topic-tagged rows', () => {
    const r = predictRegentsScore({
      units: UNITS,
      history: [{ topic: 'All Topics', pct: 60 }],
    })
    expect(r.coldStart).toBe(false)
    expect(r.score).not.toBeNull()
  })

  test('mixed-quiz pct informs the prediction (higher mixed pct → higher score)', () => {
    const low  = predictRegentsScore({ units: UNITS, history: [{ topic: 'All Topics', pct: 40 }] })
    const high = predictRegentsScore({ units: UNITS, history: [{ topic: 'All Topics', pct: 90 }] })
    expect(high.score).toBeGreaterThan(low.score)
  })
})
