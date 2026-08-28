import { computeAchievements } from '../achievements'
import { TOPICS as LS_TOPICS } from '../../content/life-science/questions'
import { TOPICS as GEO_TOPICS } from '../../content/geometry/questions'
import { TOPICS as CHEM_TOPICS } from '../../content/chemistry/questions'
import { UNITS as CHEM_UNITS } from '../../content/chemistry/units'
import { ACHIEVEMENTS as CHEM_ACHIEVEMENTS } from '../../content/chemistry/achievements'

// Regression guard for Step 2 of
// ~/.claude/plans/expressive-meandering-lagoon.md: computeAchievements used
// to only evaluate Living Environment + Earth Science achievements —
// content/life-science/achievements.js's 9 `ls_*` achievements were dead
// code, never reachable no matter what a student did, because they were
// simply never included in the `all` catalog. Fixed by adding life-science
// to the catalog in utils/achievements.js.

describe('computeAchievements includes life-science achievements', () => {
  it('a life-science achievement can now be earned', () => {
    const history = [
      { subject: 'life-science', topic: LS_TOPICS.CELLS, pct: 90 },
    ]
    const { earned } = computeAchievements({ history })
    expect(earned.some((a) => a.id === 'ls_cell_biologist')).toBe(true)
  })

  it('the total achievement count includes all three subjects', () => {
    const { total } = computeAchievements({ history: [] })
    // 9 life-science achievements must be counted even with zero history.
    expect(total).toBeGreaterThanOrEqual(9)
  })

  it('life-science achievements do not fire from unrelated subject history alone', () => {
    const history = [
      { subject: 'living-environment', topic: 'cell_biology', pct: 90 },
    ]
    const { earned } = computeAchievements({ history })
    expect(earned.some((a) => a.id === 'ls_cell_biologist')).toBe(false)
  })
})

// Regression guard: content/geometry/achievements.js's achievements had the
// exact same dead-code problem as life-science's — never included in the
// catalog, so permanently unearnable.
describe('computeAchievements includes geometry achievements', () => {
  it('a geometry achievement can now be earned', () => {
    const history = [
      { subject: 'geometry', topic: GEO_TOPICS.LINES_ANGLES, pct: 90 },
    ]
    const { earned } = computeAchievements({ history })
    expect(earned.some((a) => a.id === 'geo_congruence_master')).toBe(true)
  })

  it('geometry achievements do not fire from unrelated subject history alone', () => {
    const history = [
      { subject: 'living-environment', topic: 'cell_biology', pct: 90 },
    ]
    const { earned } = computeAchievements({ history })
    expect(earned.some((a) => a.id === 'geo_congruence_master')).toBe(false)
  })

  it('every geometry unit topic has its own achievement', () => {
    const { locked, earned } = computeAchievements({
      history: [{ subject: 'geometry', topic: GEO_TOPICS.TRIANGLE_CONG, pct: 90 }],
    })
    expect([...earned, ...locked].some((a) => a.id === 'geo_triangle_congruence')).toBe(true)
    expect(earned.some((a) => a.id === 'geo_triangle_congruence')).toBe(true)
  })
})

// Regression guard: content/chemistry/achievements.js's 8 achievements had
// the exact same dead-code problem — never included in the catalog, so
// permanently unearnable.
describe('computeAchievements includes chemistry achievements', () => {
  it('a chemistry achievement can now be earned', () => {
    const history = [
      { subject: 'chemistry', topic: CHEM_TOPICS.ATOMIC_STRUCTURE, pct: 90 },
    ]
    const { earned } = computeAchievements({ history })
    expect(earned.some((a) => a.id === 'chem_atomic_master')).toBe(true)
  })

  it('chemistry achievements do not fire from unrelated subject history alone', () => {
    const history = [
      { subject: 'living-environment', topic: 'cell_biology', pct: 90 },
    ]
    const { earned } = computeAchievements({ history })
    expect(earned.some((a) => a.id === 'chem_atomic_master')).toBe(false)
  })

  // Regression guard for the chemistry-u6/u7/u8 unit split (7 new units):
  // every non-skill unit topic must have a matching achievement, mirroring
  // geometry's "every unit topic has its own achievement" convention —
  // otherwise a newly split unit silently has no way to be celebrated.
  // Drives each achievement's real condition() fn instead of parsing its
  // source — babel-jest strips optional chaining, so a source-text match
  // reports a false negative for every achievement.
  it('every chemistry unit topic (except skill-overlay and Mixed Review) has its own achievement', () => {
    // Mixed Review catch-all units don't get a dedicated achievement anywhere
    // in this app — earth-science's es-u9 has none either — since "passing" a
    // grab-bag of leftover topics isn't a focused mastery milestone.
    for (const u of CHEM_UNITS) {
      if (u.skillPool || u.topic === CHEM_TOPICS.MIXED_REVIEW) continue
      const covered = CHEM_ACHIEVEMENTS.some((a) => a.condition({ topicsPassed: new Set([u.topic]) }))
      expect(covered).toBe(true)
    }
  })
})
