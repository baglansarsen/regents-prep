/**
 * predictedScore tests — the pure model behind the Regents goal card.
 * Covers cold start, exam-count weighting, clamping, consistency bonus,
 * smoothing step caps, and weakest-unit selection.
 */
import { predictRegentsScore, smoothPrediction, weakestUnitOf } from '../utils/predictedScore'

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
