import { UNITS, getByTopic, allQuestions } from '../content/chemistry/units'
import { predictRegentsScore } from '../utils/predictedScore'
import { isUnitUnlocked } from '../utils/unitUnlocks'

// Guards the unit-metadata invariants added for the Chemistry restructure,
// mirroring esUnitModel.test.js, lifeScienceUnitModel.test.js, and
// geometryUnitModel.test.js.

describe('chemistry UNITS metadata', () => {
  it('examWeight sums to ~1.0 across the weighted (non-null) units', () => {
    const sum = UNITS.reduce((acc, u) => acc + (u.examWeight ?? 0), 0)
    expect(sum).toBeGreaterThan(0.98)
    expect(sum).toBeLessThan(1.02)
  })

  it('every prereq id refers to a real unit', () => {
    const ids = new Set(UNITS.map((u) => u.id))
    for (const u of UNITS) {
      for (const p of u.prereqs ?? []) {
        expect(ids.has(p)).toBe(true)
      }
    }
  })

  it('the prereq graph has no cycles', () => {
    const byId = new Map(UNITS.map((u) => [u.id, u]))
    const visiting = new Set()
    const visited = new Set()

    function visit(id) {
      if (visited.has(id)) return
      if (visiting.has(id)) throw new Error(`prereq cycle at ${id}`)
      visiting.add(id)
      for (const p of byId.get(id)?.prereqs ?? []) visit(p)
      visiting.delete(id)
      visited.add(id)
    }

    expect(() => UNITS.forEach((u) => visit(u.id))).not.toThrow()
  })

  it('every unit is reachable and ids are unique', () => {
    const ids = UNITS.map((u) => u.id)
    const withoutPrereqs = UNITS.filter((u) => (u.prereqs ?? []).length === 0)
    expect(withoutPrereqs.length).toBeGreaterThan(0)
    expect(ids.length).toBe(new Set(ids).size)
  })

  // Regression guard: the Matter & Energy / Reactions,Kinetics&Stoichiometry /
  // Nuclear Chemistry&Solutions / Acids,Bases&Redox families were all
  // dissolved into sub-topic units. Every one of the pooled questions
  // (excluding chemistry-sp, a skill overlay that reuses questions already
  // counted in their own topic unit) should be served by exactly one unit's
  // pool.
  it("every question is served by exactly one non-skill unit's pool", () => {
    const total = allQuestions().length
    const sum = UNITS
      .filter((u) => u.id !== 'chemistry-sp')
      .reduce((acc, u) => acc + getByTopic(u.topic).length, 0)
    expect(sum).toBe(total)
  })

  it('null-examWeight units measurably move masteryScaled via their fallback weight, not zero', () => {
    const weightedUnits = UNITS.filter((u) => typeof u.examWeight === 'number')
    const nullUnits = UNITS.filter((u) => u.examWeight == null)
    expect(nullUnits.length).toBeGreaterThan(0)
    const baseline = weightedUnits.map((u) => ({ topic: u.topic, pct: 50 }))
    const low  = predictRegentsScore({ units: UNITS, history: [...baseline, ...nullUnits.map((u) => ({ topic: u.topic, pct: 0 }))] })
    const high = predictRegentsScore({ units: UNITS, history: [...baseline, ...nullUnits.map((u) => ({ topic: u.topic, pct: 100 }))] })
    expect(high.components.masteryScaled).toBeGreaterThan(low.components.masteryScaled)
  })

  it('unlock graph over the real UNITS: first unit open, later ones gated until prereqs complete', () => {
    const noneComplete = () => false
    expect(isUnitUnlocked(UNITS, 0, noneComplete)).toBe(true)
    const lastIndex = UNITS.length - 1
    expect(isUnitUnlocked(UNITS, lastIndex, noneComplete)).toBe(false)

    const allComplete = () => true
    expect(isUnitUnlocked(UNITS, lastIndex, allComplete)).toBe(true)
  })
})
