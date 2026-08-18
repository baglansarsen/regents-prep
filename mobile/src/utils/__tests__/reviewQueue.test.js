import {
  findSimilar, buildReviewSet, questionKey, mistakeLabelOf, MISTAKE_TYPES, stickiestTopicOf,
} from '../reviewQueue'

// Difficulty comes from difficultyOf(): explicit `difficulty` wins, so these
// fixtures pin it directly rather than relying on the part/number heuristic.
const q = (id, over = {}) => ({
  id,
  text: `Question ${id}`,
  choices: ['a', 'b', 'c', 'd'],
  topic: 'Algebra',
  subTopic: 'Linear Equations',
  difficulty: 3,
  ...over,
})

describe('findSimilar', () => {
  const origin = q('origin')

  it('never returns the question it was asked about', () => {
    expect(findSimilar(origin, [origin])).toEqual([])
  })

  it('never crosses topics', () => {
    const other = q('other', { topic: 'Geometry' })
    expect(findSimilar(origin, [other])).toEqual([])
  })

  it('rejects questions more than one difficulty step away', () => {
    const far = q('far', { difficulty: 5 })
    const near = q('near', { difficulty: 4 })
    expect(findSimilar(origin, [far])).toEqual([])
    expect(findSimilar(origin, [near])[0].id).toBe('near')
  })

  it('prefers a matching subTopic over a closer difficulty', () => {
    const sameDifficultyOtherSubTopic = q('a', { subTopic: 'Quadratics', difficulty: 3 })
    const sameSubTopicHarder = q('b', { subTopic: 'Linear Equations', difficulty: 4 })
    expect(findSimilar(origin, [sameDifficultyOtherSubTopic, sameSubTopicHarder])[0].id).toBe('b')
  })

  it('skips written items — review runs in multiple-choice mode', () => {
    const written = { id: 'w', text: 'Explain', topic: 'Algebra', difficulty: 3 }
    expect(findSimilar(origin, [written])).toEqual([])
  })

  it('honors the exclude set', () => {
    const only = q('only')
    expect(findSimilar(origin, [only], { exclude: new Set(['only']) })).toEqual([])
  })

  it('tolerates an empty or missing pool', () => {
    expect(findSimilar(origin, [])).toEqual([])
    expect(findSimilar(origin, null)).toEqual([])
    expect(findSimilar(null, [q('x')])).toEqual([])
  })
})

describe('buildReviewSet substitution', () => {
  const entry = (id, box) => ({ ...q(id), subject: 'algebra-1', box, wrongCount: 1, due: 0, lastSeen: 0 })

  it('serves the identical question on the first re-encounter (box 1)', () => {
    const items = [entry('missed', 1)]
    const [served] = buildReviewSet({ items, subject: 'algebra-1', similarPool: [q('sibling')] })
    expect(served.id).toBe('missed')
    expect(served.__retryFor).toBeUndefined()
  })

  it('swaps in a sibling once the item has been recovered (box 2+)', () => {
    const items = [entry('missed', 2)]
    const [served] = buildReviewSet({ items, subject: 'algebra-1', similarPool: [q('sibling')] })
    expect(served.id).toBe('sibling')
    // Provenance is what lets the original entry still resolve.
    expect(served.__retryFor).toBe(questionKey(items[0]))
    expect(served.subject).toBe('algebra-1')
  })

  it('falls back to the original when no sibling qualifies', () => {
    const items = [entry('missed', 3)]
    const [served] = buildReviewSet({
      items, subject: 'algebra-1', similarPool: [q('far', { topic: 'Geometry' })],
    })
    expect(served.id).toBe('missed')
  })

  it('is unchanged when no similarPool is supplied', () => {
    const items = [entry('missed', 4)]
    const [served] = buildReviewSet({ items, subject: 'algebra-1' })
    expect(served.id).toBe('missed')
  })

  it('never serves the same sibling twice in one set', () => {
    const items = [entry('a', 2), entry('b', 2)]
    const served = buildReviewSet({ items, subject: 'algebra-1', similarPool: [q('only-sibling')] })
    const ids = served.map((s) => s.id)
    expect(new Set(ids).size).toBe(2)          // no duplicates
    expect(ids).toContain('only-sibling')      // first one swapped
  })
})

describe('mistake labels', () => {
  it('exposes exactly the five types the tutor can return', () => {
    expect(MISTAKE_TYPES).toEqual([
      'concept_gap', 'careless', 'reading_trap', 'formula_setup', 'test_strategy',
    ])
  })

  it('returns null for absent or unknown types rather than throwing', () => {
    expect(mistakeLabelOf(undefined)).toBeNull()
    expect(mistakeLabelOf('not_a_type')).toBeNull()
    expect(mistakeLabelOf('careless').label).toBe('Careless slip')
  })
})

describe('stickiestTopicOf', () => {
  const e = (topic, wrongCount, over = {}) => ({ topic, wrongCount, ...over })

  it('returns the topic with the most total misses', () => {
    const top = stickiestTopicOf([e('algebra', 2), e('geometry', 4), e('algebra', 2)])
    expect(top.topic).toBe('algebra')   // 4 total, tie broken by first seen
    expect(top.misses).toBe(4)
  })

  it('stays quiet below the threshold — one bad day is not a pattern', () => {
    expect(stickiestTopicOf([e('algebra', 1), e('geometry', 1)])).toBeNull()
    expect(stickiestTopicOf([e('algebra', 3)]).topic).toBe('algebra')
  })

  it('counts an entry with no wrongCount as one miss', () => {
    expect(stickiestTopicOf([{ topic: 'algebra' }, { topic: 'algebra' }, { topic: 'algebra' }]).misses).toBe(3)
  })

  it('ignores entries with no topic', () => {
    expect(stickiestTopicOf([{ wrongCount: 9 }])).toBeNull()
  })

  it('handles an empty queue', () => {
    expect(stickiestTopicOf([])).toBeNull()
    expect(stickiestTopicOf()).toBeNull()
  })
})
