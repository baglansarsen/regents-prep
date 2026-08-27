import { ACHIEVEMENTS } from '../achievements'
import { TOPICS } from '../questions'

// Regression guard for the es_earth_scientist fix (Step 6 of
// ~/.claude/plans/expressive-meandering-lagoon.md): topicsPassed is evaluated
// against COMBINED Living Environment + Earth and Space Sciences history
// (see utils/achievements.js), so a raw `size >= 8` check could fire off
// Living Environment topics alone. The condition must check the 8 specific
// core ES topics instead.

const CORE_TOPICS = [
  TOPICS.ROCKS, TOPICS.PLATE_TECTONICS, TOPICS.GEOLOGIC_TIME, TOPICS.METEOROLOGY,
  TOPICS.CLIMATE, TOPICS.SOLAR_SYSTEM, TOPICS.WATER_CYCLE, TOPICS.SCIENCE_PRACTICES,
]

function find(id) {
  return ACHIEVEMENTS.find((a) => a.id === id)
}

describe('es_earth_scientist', () => {
  const condition = find('es_earth_scientist').condition

  test('does NOT fire from 8 unrelated (e.g. Living Environment) topics alone', () => {
    const topicsPassed = new Set(['cell_biology', 'genetics', 'ecology', 'evolution', 'homeostasis', 'reproduction', 'nutrition', 'excretion'])
    expect(condition({ topicsPassed })).toBe(false)
  })

  test('fires once all 8 core ES topics are passed, regardless of other topics also present', () => {
    const topicsPassed = new Set([...CORE_TOPICS, 'cell_biology'])
    expect(condition({ topicsPassed })).toBe(true)
  })

  test('does not fire with 7 of 8 core topics', () => {
    const topicsPassed = new Set(CORE_TOPICS.slice(0, 7))
    expect(condition({ topicsPassed })).toBe(false)
  })
})

describe('new ESS3 unit achievements', () => {
  test('es_risk_analyst fires on the Natural Hazards topic', () => {
    const condition = find('es_risk_analyst').condition
    expect(condition({ topicsPassed: new Set([TOPICS.HAZARDS]) })).toBe(true)
    expect(condition({ topicsPassed: new Set() })).toBeFalsy()
  })

  test('es_climate_guardian fires on the Global Climate Change topic', () => {
    const condition = find('es_climate_guardian').condition
    expect(condition({ topicsPassed: new Set([TOPICS.CLIMATE_CHANGE]) })).toBe(true)
    expect(condition({ topicsPassed: new Set() })).toBeFalsy()
  })
})
