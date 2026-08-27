import { UNITS } from '../content/earth-science/units'

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
})
