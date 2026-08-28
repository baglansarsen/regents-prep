import { UNITS, getByTopic, allQuestions } from '../content/earth-science/units'
import { predictRegentsScore } from '../utils/predictedScore'
import { isUnitUnlocked } from '../utils/unitUnlocks'

// Guards the unit-metadata invariants added for goal-wiring (Step 2 of
// ~/.claude/plans/expressive-meandering-lagoon.md) so a future exam import or
// unit split can't silently break the exam-weight math or the prereq graph.

describe('earth-science UNITS metadata', () => {
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

  it('every unit is reachable (no unit requires a prereq that requires it back down an unreachable branch)', () => {
    const ids = UNITS.map((u) => u.id)
    const withoutPrereqs = UNITS.filter((u) => (u.prereqs ?? []).length === 0)
    expect(withoutPrereqs.length).toBeGreaterThan(0)
    expect(ids.length).toBe(new Set(ids).size) // no duplicate ids
  })

  // Regression guard: 'Geology'/'Astronomy' raw exam questions with no
  // subTopic tag used to be silently dropped from every unit (they normalized
  // to a topic no unit routes on); folding them into Mixed Review without
  // also excluding the already-homed subtopic-tagged questions caused the
  // opposite bug — those showing up twice. Every unit's pool (deduping the
  // es-sp skill overlay, which intentionally reuses questions already counted
  // in their own topic unit) should partition the full pool exactly once.
  it("every question is served by exactly one non-skill unit's pool", () => {
    const total = allQuestions().length
    const sum = UNITS
      .filter((u) => u.id !== 'es-sp')
      .reduce((acc, u) => acc + getByTopic(u.topic).length, 0)
    expect(sum).toBe(total)
  })

  // Step 4b's examWeight-weighted mean must actually count the null-weight
  // units (es-sp, Mixed Review, the authored ESS3 units) via the fallback
  // weight, not silently zero them out of the score — see the comment above
  // `declaredWeights`/`fallbackWeight` in predictedScore.js. With 18 real
  // units, swinging just ONE null-weight unit's pct barely moves the bucketed
  // masteryScaled (getScaledScore is a stepped table, and one unit is now a
  // small share of the total). To make the fallback weight's effect visible
  // through that bucketing, every WEIGHTED unit is held at a fixed 50% here
  // and only the null-weight units swing — their combined fallback weight
  // (~22% of the total) is large enough to cross scaled-score buckets if,
  // and only if, it isn't literally zero.
  it('null-examWeight units measurably move masteryScaled via their fallback weight, not zero', () => {
    const weightedUnits = UNITS.filter((u) => typeof u.examWeight === 'number')
    const nullUnits = UNITS.filter((u) => u.examWeight == null)
    expect(nullUnits.length).toBeGreaterThan(0)
    const baseline = weightedUnits.map((u) => ({ topic: u.topic, pct: 50 }))
    const low  = predictRegentsScore({ units: UNITS, history: [...baseline, ...nullUnits.map((u) => ({ topic: u.topic, pct: 0 }))] })
    const high = predictRegentsScore({ units: UNITS, history: [...baseline, ...nullUnits.map((u) => ({ topic: u.topic, pct: 100 }))] })
    expect(high.components.masteryScaled).toBeGreaterThan(low.components.masteryScaled)
  })

  // Step 4f wired useUnitUnlocks.js to real UNITS.prereqs instead of array
  // position — confirm it actually gates on the real content, not just the
  // synthetic fixtures in unitUnlocks.test.js.
  it('unlock graph over the real UNITS: first unit open, later ones gated until prereqs complete', () => {
    const noneComplete = () => false
    expect(isUnitUnlocked(UNITS, 0, noneComplete)).toBe(true)
    const lastIndex = UNITS.length - 1
    expect(isUnitUnlocked(UNITS, lastIndex, noneComplete)).toBe(false)

    const allComplete = () => true
    expect(isUnitUnlocked(UNITS, lastIndex, allComplete)).toBe(true)
  })
})
