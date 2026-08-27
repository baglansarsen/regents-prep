import { isUnitUnlocked, unitUnlockHint } from '../unitUnlocks'

// Legacy-shaped units — no `prereqs` field, matching every subject but Earth
// and Space Sciences today. Must reproduce the original positional rule
// exactly: unit N unlocks once unit N-1's lessons are complete.
const POSITIONAL_UNITS = [
  { id: 'u0', title: 'Unit 0', topic: 'u0', lessonCount: 2 },
  { id: 'u1', title: 'Unit 1', topic: 'u1', lessonCount: 2 },
  { id: 'u2', title: 'Unit 2', topic: 'u2', lessonCount: 2 },
]

// Graph-shaped units — Earth and Space Sciences' current shape (prereqs
// mirroring array order), plus one branch to prove the graph isn't secretly
// still positional.
const GRAPH_UNITS = [
  { id: 'a', title: 'A', topic: 'a', lessonCount: 1, prereqs: [] },
  { id: 'b', title: 'B', topic: 'b', lessonCount: 1, prereqs: ['a'] },
  { id: 'c', title: 'C', topic: 'c', lessonCount: 1, prereqs: ['a'] }, // branches off A too, not off B
  { id: 'd', title: 'D', topic: 'd', lessonCount: 1, prereqs: ['b', 'c'] }, // needs BOTH
]

describe('isUnitUnlocked — positional fallback (no prereqs field)', () => {
  test('unit 0 is always unlocked', () => {
    const unitComplete = () => false
    expect(isUnitUnlocked(POSITIONAL_UNITS, 0, unitComplete)).toBe(true)
  })

  test('unit N locked until unit N-1 is complete', () => {
    const unitComplete = (topic) => topic === 'u0'
    expect(isUnitUnlocked(POSITIONAL_UNITS, 1, unitComplete)).toBe(true)
    expect(isUnitUnlocked(POSITIONAL_UNITS, 2, unitComplete)).toBe(false)
  })

  test('skip-unlock bypasses the positional gate for that unit only', () => {
    const unitComplete = () => false
    const skipUnlocked = new Set(['u2'])
    expect(isUnitUnlocked(POSITIONAL_UNITS, 2, unitComplete, skipUnlocked)).toBe(true)
    expect(isUnitUnlocked(POSITIONAL_UNITS, 1, unitComplete, skipUnlocked)).toBe(false)
  })

  test('out-of-range index is locked, not a crash', () => {
    expect(isUnitUnlocked(POSITIONAL_UNITS, 99, () => true)).toBe(false)
  })
})

describe('isUnitUnlocked — prereq graph', () => {
  test('a unit with prereqs: [] is always unlocked', () => {
    expect(isUnitUnlocked(GRAPH_UNITS, 0, () => false)).toBe(true)
  })

  test('a unit is locked until ALL of its prereqs are complete', () => {
    const unitComplete = (topic) => topic === 'b' // c not done
    expect(isUnitUnlocked(GRAPH_UNITS, 3, unitComplete)).toBe(false)
  })

  test('a unit unlocks once every prereq is complete', () => {
    const unitComplete = (topic) => topic === 'b' || topic === 'c'
    expect(isUnitUnlocked(GRAPH_UNITS, 3, unitComplete)).toBe(true)
  })

  test('parallel branches (b and c) do not require each other, only their shared parent a', () => {
    const unitComplete = (topic) => topic === 'a'
    expect(isUnitUnlocked(GRAPH_UNITS, 1, unitComplete)).toBe(true) // b needs only a
    expect(isUnitUnlocked(GRAPH_UNITS, 2, unitComplete)).toBe(true) // c needs only a
  })

  test('skip-unlock still bypasses the graph for that unit', () => {
    const skipUnlocked = new Set(['d'])
    expect(isUnitUnlocked(GRAPH_UNITS, 3, () => false, skipUnlocked)).toBe(true)
  })

  // Locks in that a linear prereqs shape (Earth and Space Sciences today)
  // behaves identically to the old positional rule it replaced.
  test('a linear prereqs chain reproduces the positional rule exactly', () => {
    const chain = [
      { id: 'x', title: 'X', topic: 'x', lessonCount: 1, prereqs: [] },
      { id: 'y', title: 'Y', topic: 'y', lessonCount: 1, prereqs: ['x'] },
      { id: 'z', title: 'Z', topic: 'z', lessonCount: 1, prereqs: ['y'] },
    ]
    const unitComplete = (topic) => topic === 'x'
    expect(isUnitUnlocked(chain, 0, unitComplete)).toBe(true)
    expect(isUnitUnlocked(chain, 1, unitComplete)).toBe(true)
    expect(isUnitUnlocked(chain, 2, unitComplete)).toBe(false)
  })
})

describe('unitUnlockHint', () => {
  test('positional fallback names the previous unit', () => {
    expect(unitUnlockHint(POSITIONAL_UNITS, 1)).toBe(
      'Complete all lessons in Unit 0 to unlock, or pass the ⚡ Challenge with ≤3 mistakes',
    )
  })

  test('unit 0 (positional) has no hint', () => {
    expect(unitUnlockHint(POSITIONAL_UNITS, 0)).toBeNull()
  })

  test('a unit with no prereqs has no hint', () => {
    expect(unitUnlockHint(GRAPH_UNITS, 0)).toBeNull()
  })

  test('a unit with multiple prereqs names all of them', () => {
    expect(unitUnlockHint(GRAPH_UNITS, 3)).toBe(
      'Complete all lessons in B and C to unlock, or pass the ⚡ Challenge with ≤3 mistakes',
    )
  })
})
