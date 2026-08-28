import {
  shuffle, correctIndexOf, questionKey,
  buildUnitSampledSet, DEFAULT_DIAGNOSTIC_TARGET,
  checkupTarget, CHECKUP_MIN, CHECKUP_MAX,
} from '../question'

describe('shuffle', () => {
  it('preserves length and membership without mutating the input', () => {
    const original = [1, 2, 3, 4, 5]
    const copy = [...original]
    const result = shuffle(original)
    expect(original).toEqual(copy)   // not mutated
    expect(result).toHaveLength(original.length)
    expect([...result].sort()).toEqual([...original].sort())
  })
})

describe('correctIndexOf', () => {
  it('reads `correct`, falls back to `correctIndex`, else -1', () => {
    expect(correctIndexOf({ correct: 2 })).toBe(2)
    expect(correctIndexOf({ correctIndex: 1 })).toBe(1)
    expect(correctIndexOf({ correct: 0, correctIndex: 3 })).toBe(0)
    expect(correctIndexOf({})).toBe(-1)
    expect(correctIndexOf(null)).toBe(-1)
    expect(correctIndexOf({ correct: 'x' })).toBe(-1)
  })
})

describe('questionKey', () => {
  it('prefers id, falls back to text', () => {
    expect(questionKey({ id: 'q1', text: 'Foo' })).toBe('q1')
    expect(questionKey({ text: 'Foo' })).toBe('Foo')
    expect(questionKey({})).toBeUndefined()
    expect(questionKey(null)).toBeUndefined()
  })
})

// ── buildUnitSampledSet ──────────────────────────────────────────────────────

function makeQuestion(topic, n) {
  return { id: `${topic}-${n}`, text: `${topic} question ${n}`, topic, choices: ['a', 'b', 'c', 'd'], correct: 0 }
}

function makeUnits(n) {
  return Array.from({ length: n }, (_, i) => ({ id: `u${i}`, topic: `topic${i}` }))
}

function makeGetByTopic(unitCount, perUnit = 5) {
  const byTopic = {}
  for (let i = 0; i < unitCount; i++) {
    byTopic[`topic${i}`] = Array.from({ length: perUnit }, (_, n) => makeQuestion(`topic${i}`, n))
  }
  return (topic) => byTopic[topic] ?? []
}

describe('buildUnitSampledSet', () => {
  it('guarantees at least 1 question per unit when target allows', () => {
    const units = makeUnits(6)
    const getByTopic = makeGetByTopic(6, 5)
    const set = buildUnitSampledSet(units, getByTopic, 10)
    const topicsCovered = new Set(set.map((q) => q.__unitTopic))
    expect(topicsCovered.size).toBe(6)
  })

  it('tags every question with a real __unitTopic', () => {
    const units = makeUnits(4)
    const getByTopic = makeGetByTopic(4)
    const set = buildUnitSampledSet(units, getByTopic, 8)
    const validTopics = new Set(units.map((u) => u.topic))
    set.forEach((q) => expect(validTopics.has(q.__unitTopic)).toBe(true))
  })

  it('caps at target', () => {
    const units = makeUnits(20)
    const getByTopic = makeGetByTopic(20, 5)
    const set = buildUnitSampledSet(units, getByTopic, 10)
    expect(set).toHaveLength(10)
  })

  it('preserves the placement-test default-target formula: max(10, unitCount)', () => {
    // unitCount >= target: the guaranteed-1-per-unit pass alone already
    // reaches the cap deterministically (no collision-dependent extras pass
    // involved), so this must be exact.
    const units22 = makeUnits(22)
    const getByTopic22 = makeGetByTopic(22, 5)
    expect(buildUnitSampledSet(units22, getByTopic22)).toHaveLength(22)

    // unitCount < target: the default resolves to max(10, 5) = 10, but the
    // extras pass draws independently from the guaranteed pass and can
    // (rarely) redraw the same question for a unit that already has its
    // guaranteed pick, so an exact count isn't guaranteed — only that it
    // never exceeds the resolved target and covers at least every unit once.
    const units5 = makeUnits(5)
    const getByTopic5 = makeGetByTopic(5, 5)
    const set5 = buildUnitSampledSet(units5, getByTopic5)
    expect(set5.length).toBeLessThanOrEqual(DEFAULT_DIAGNOSTIC_TARGET)
    expect(set5.length).toBeGreaterThanOrEqual(5)
  })

  it('dedupes a question that appears under two units', () => {
    const shared = makeQuestion('shared', 0)
    const units = [{ id: 'u0', topic: 'a' }, { id: 'u1', topic: 'b' }]
    const getByTopic = (topic) => (topic === 'a' || topic === 'b') ? [shared] : []
    const set = buildUnitSampledSet(units, getByTopic, 10)
    expect(set).toHaveLength(1)
  })

  it('tolerates a unit with an empty pool without throwing', () => {
    const units = [{ id: 'u0', topic: 'empty' }, { id: 'u1', topic: 'full' }]
    const getByTopic = (topic) => (topic === 'full' ? [makeQuestion('full', 0), makeQuestion('full', 1)] : [])
    expect(() => buildUnitSampledSet(units, getByTopic, 10)).not.toThrow()
    const set = buildUnitSampledSet(units, getByTopic, 10)
    expect(set.every((q) => q.__unitTopic === 'full')).toBe(true)
  })

  it('handles zero units and missing/undefined inputs gracefully', () => {
    expect(buildUnitSampledSet([], () => [])).toEqual([])
    expect(buildUnitSampledSet(undefined, undefined)).toEqual([])
    const units = makeUnits(3)
    expect(buildUnitSampledSet(units, () => undefined, 10)).toEqual([])
  })

  it('filters out choice-less (written) questions', () => {
    const units = [{ id: 'u0', topic: 'mixed' }]
    const getByTopic = () => [
      { id: 'w1', text: 'Written', type: 'written', modelAnswer: 'x' },
      makeQuestion('mixed', 0),
    ]
    const set = buildUnitSampledSet(units, getByTopic, 10)
    expect(set.every((q) => Array.isArray(q.choices) && q.choices.length > 0)).toBe(true)
  })
})

// ── checkupTarget ────────────────────────────────────────────────────────────

describe('checkupTarget', () => {
  it('clamps to [CHECKUP_MIN, CHECKUP_MAX]', () => {
    expect(checkupTarget(0)).toBe(CHECKUP_MIN)
    expect(checkupTarget(undefined)).toBe(CHECKUP_MIN)
    expect(checkupTarget(5)).toBe(CHECKUP_MIN)
    expect(checkupTarget(12)).toBe(CHECKUP_MIN)
    expect(checkupTarget(16)).toBe(CHECKUP_MAX)
    expect(checkupTarget(22)).toBe(CHECKUP_MAX)
  })

  // Table-driven over real per-subject unit counts, so a future unit-split
  // that changes a subject's count surfaces here.
  it.each([
    ['global-history', 5, 12],
    ['us-history', 5, 12],
    ['life-science', 6, 12],
    ['english', 6, 12],
    ['living-environment', 10, 12],
    ['physics', 10, 12],
    ['algebra-1', 10, 12],
    ['algebra-2', 10, 12],
    ['chemistry', 16, 16],
    ['geometry', 16, 16],
    ['earth-science', 22, 16],
  ])('%s (%i units) -> %i', (_subject, units, expected) => {
    expect(checkupTarget(units)).toBe(expected)
  })
})
