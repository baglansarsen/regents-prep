import { ACHIEVEMENTS } from '../achievements'
import { TOPICS } from '../questions'

// Regression guard for the es_earth_scientist fix (Step 6 of
// ~/.claude/plans/expressive-meandering-lagoon.md): topicsPassed is evaluated
// against COMBINED Living Environment + Earth and Space Sciences history
// (see utils/achievements.js), so a raw `size >= 8` check could fire off
// Living Environment topics alone. The condition must check the 8 specific
// core ES topics instead.

const CORE_TOPICS = [
  TOPICS.ROCKS, TOPICS.PLATE_BOUNDARIES, TOPICS.RELATIVE_DATING, TOPICS.WEATHER_VARIABLES,
  TOPICS.CLIMATE_FACTORS, TOPICS.SOLAR_SYSTEM, TOPICS.WATER_CYCLE_PROCESS, TOPICS.SCIENCE_PRACTICES,
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

// Regression guard: units.js dissolved the whole-topic Plate Tectonics,
// Geologic Time, Meteorology, Climate, and Water Cycle units into finer
// sub-topic units, retiring TOPICS.PLATE_TECTONICS/GEOLOGIC_TIME/
// METEOROLOGY/CLIMATE/WATER_CYCLE as icon-map keys only — no quiz result can
// carry those topic values anymore. Achievements that still checked for them
// would have become permanently unearnable.
describe('achievements for the units that replaced whole-topic units', () => {
  test('es_tectonic_titan fires on Plate Boundaries, not the retired Plate Tectonics value', () => {
    const condition = find('es_tectonic_titan').condition
    expect(condition({ topicsPassed: new Set([TOPICS.PLATE_BOUNDARIES]) })).toBe(true)
    expect(condition({ topicsPassed: new Set([TOPICS.PLATE_TECTONICS]) })).toBeFalsy()
  })

  test('es_time_traveler fires on Relative Dating, not the retired Geologic Time value', () => {
    const condition = find('es_time_traveler').condition
    expect(condition({ topicsPassed: new Set([TOPICS.RELATIVE_DATING]) })).toBe(true)
    expect(condition({ topicsPassed: new Set([TOPICS.GEOLOGIC_TIME]) })).toBeFalsy()
  })

  test('es_storm_chaser fires on Weather Variables, not the retired Meteorology value', () => {
    const condition = find('es_storm_chaser').condition
    expect(condition({ topicsPassed: new Set([TOPICS.WEATHER_VARIABLES]) })).toBe(true)
    expect(condition({ topicsPassed: new Set([TOPICS.METEOROLOGY]) })).toBeFalsy()
  })

  test('es_climate_scientist fires on Climate Factors, not the retired Climate value', () => {
    const condition = find('es_climate_scientist').condition
    expect(condition({ topicsPassed: new Set([TOPICS.CLIMATE_FACTORS]) })).toBe(true)
    expect(condition({ topicsPassed: new Set([TOPICS.CLIMATE]) })).toBeFalsy()
  })

  test('es_ocean_explorer fires on The Water Cycle, not the retired Water Cycle & Oceans value', () => {
    const condition = find('es_ocean_explorer').condition
    expect(condition({ topicsPassed: new Set([TOPICS.WATER_CYCLE_PROCESS]) })).toBe(true)
    expect(condition({ topicsPassed: new Set([TOPICS.WATER_CYCLE]) })).toBeFalsy()
  })

  test('es_seismologist, es_core_explorer, es_isotope_investigator, es_fossil_hunter fire on their own topics', () => {
    expect(find('es_seismologist').condition({ topicsPassed: new Set([TOPICS.EARTHQUAKES]) })).toBe(true)
    expect(find('es_core_explorer').condition({ topicsPassed: new Set([TOPICS.EARTH_INTERIOR]) })).toBe(true)
    expect(find('es_isotope_investigator').condition({ topicsPassed: new Set([TOPICS.RADIOACTIVE_DATING]) })).toBe(true)
    expect(find('es_fossil_hunter').condition({ topicsPassed: new Set([TOPICS.FOSSILS]) })).toBe(true)
  })

  test('es_humidity_hunter, es_front_tracker, es_severe_weather_spotter, es_aquifer_analyst fire on their own topics', () => {
    expect(find('es_humidity_hunter').condition({ topicsPassed: new Set([TOPICS.MOISTURE]) })).toBe(true)
    expect(find('es_front_tracker').condition({ topicsPassed: new Set([TOPICS.AIR_MASSES_FRONTS]) })).toBe(true)
    expect(find('es_severe_weather_spotter').condition({ topicsPassed: new Set([TOPICS.STORMS]) })).toBe(true)
    expect(find('es_aquifer_analyst').condition({ topicsPassed: new Set([TOPICS.GROUNDWATER]) })).toBe(true)
  })
})
