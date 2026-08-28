import { TOPICS } from './questions'

// The 8 topics with their own achievement below — es_earth_scientist checks
// against exactly this list (not s.topicsPassed?.size), since topicsPassed is
// evaluated against COMBINED Living Environment + Earth and Space Sciences
// history (see utils/achievements.js) and a raw size check could fire off
// Living Environment topics alone.
//
// TOPICS.PLATE_TECTONICS, TOPICS.GEOLOGIC_TIME, TOPICS.METEOROLOGY, and
// TOPICS.WATER_CYCLE are all swapped for their closest replacement unit
// here: after those four whole-topic units were dissolved into finer
// sub-topic units (units.js), no quiz result can ever carry those old topic
// values again — they're icon-map keys only now (see questions.js) — so
// checking for them would have made this achievement permanently unearnable.
const CORE_TOPICS = [
  TOPICS.ROCKS, TOPICS.PLATE_BOUNDARIES, TOPICS.RELATIVE_DATING, TOPICS.WEATHER_VARIABLES,
  TOPICS.CLIMATE_FACTORS, TOPICS.SOLAR_SYSTEM, TOPICS.WATER_CYCLE_PROCESS, TOPICS.SCIENCE_PRACTICES,
]

export const ACHIEVEMENTS = [
  {
    id: 'es_rock_hound',
    title: 'Rock Hound',
    description: 'Pass Rocks & the Rock Cycle with 80%+',
    icon: '🪨',
    condition: s => s.topicsPassed?.has(TOPICS.ROCKS),
  },
  {
    id: 'es_tectonic_titan',
    title: 'Tectonic Titan',
    description: 'Pass Plate Boundaries with 80%+',
    icon: '🌋',
    condition: s => s.topicsPassed?.has(TOPICS.PLATE_BOUNDARIES),
  },
  {
    id: 'es_time_traveler',
    title: 'Time Traveler',
    description: 'Pass Relative Dating with 80%+',
    icon: '⏳',
    condition: s => s.topicsPassed?.has(TOPICS.RELATIVE_DATING),
  },
  {
    id: 'es_seismologist',
    title: 'Seismologist',
    description: 'Pass Earthquakes & Seismic Waves with 80%+',
    icon: '📳',
    condition: s => s.topicsPassed?.has(TOPICS.EARTHQUAKES),
  },
  {
    id: 'es_core_explorer',
    title: 'Core Explorer',
    description: "Pass Evidence for Earth's Interior with 80%+",
    icon: '🌐',
    condition: s => s.topicsPassed?.has(TOPICS.EARTH_INTERIOR),
  },
  {
    id: 'es_isotope_investigator',
    title: 'Isotope Investigator',
    description: 'Pass Radioactive Dating with 80%+',
    icon: '☢️',
    condition: s => s.topicsPassed?.has(TOPICS.RADIOACTIVE_DATING),
  },
  {
    id: 'es_fossil_hunter',
    title: 'Fossil Hunter',
    description: 'Pass Fossils & Correlation with 80%+',
    icon: '🦴',
    condition: s => s.topicsPassed?.has(TOPICS.FOSSILS),
  },
  {
    id: 'es_storm_chaser',
    title: 'Storm Chaser',
    description: 'Pass Weather Variables with 80%+',
    icon: '🌩️',
    condition: s => s.topicsPassed?.has(TOPICS.WEATHER_VARIABLES),
  },
  {
    id: 'es_humidity_hunter',
    title: 'Humidity Hunter',
    description: 'Pass Moisture & Humidity with 80%+',
    icon: '💧',
    condition: s => s.topicsPassed?.has(TOPICS.MOISTURE),
  },
  {
    id: 'es_front_tracker',
    title: 'Front Tracker',
    description: 'Pass Air Masses, Fronts & Maps with 80%+',
    icon: '🗺️',
    condition: s => s.topicsPassed?.has(TOPICS.AIR_MASSES_FRONTS),
  },
  {
    id: 'es_severe_weather_spotter',
    title: 'Severe Weather Spotter',
    description: 'Pass Storms & Severe Weather with 80%+',
    icon: '🌪️',
    condition: s => s.topicsPassed?.has(TOPICS.STORMS),
  },
  {
    id: 'es_climate_scientist',
    title: 'Climate Scientist',
    description: 'Pass Climate Factors with 80%+',
    icon: '🌤️',
    condition: s => s.topicsPassed?.has(TOPICS.CLIMATE_FACTORS),
  },
  {
    id: 'es_stargazer',
    title: 'Stargazer',
    description: 'Pass Solar System & Earth Motions with 80%+',
    icon: '🔭',
    condition: s => s.topicsPassed?.has(TOPICS.SOLAR_SYSTEM),
  },
  {
    id: 'es_ocean_explorer',
    title: 'Ocean Explorer',
    description: 'Pass The Water Cycle with 80%+',
    icon: '🌊',
    condition: s => s.topicsPassed?.has(TOPICS.WATER_CYCLE_PROCESS),
  },
  {
    id: 'es_aquifer_analyst',
    title: 'Aquifer Analyst',
    description: 'Pass Groundwater & Porosity with 80%+',
    icon: '🪣',
    condition: s => s.topicsPassed?.has(TOPICS.GROUNDWATER),
  },
  {
    id: 'es_data_navigator',
    title: 'Data Navigator',
    description: 'Pass Data, Maps & Reference Tables with 80%+',
    icon: '📊',
    condition: s => s.topicsPassed?.has(TOPICS.SCIENCE_PRACTICES),
  },
  {
    id: 'es_earth_scientist',
    title: 'Earth Scientist',
    description: 'Pass all 8 core Earth and Space Sciences topics',
    icon: '🌍',
    condition: s => CORE_TOPICS.every(t => s.topicsPassed?.has(t)),
  },
  {
    id: 'es_risk_analyst',
    title: 'Risk Analyst',
    description: 'Pass Natural Hazards & Risk with 80%+',
    icon: '⚠️',
    condition: s => s.topicsPassed?.has(TOPICS.HAZARDS),
  },
  {
    id: 'es_climate_guardian',
    title: 'Climate Guardian',
    description: 'Pass Global Climate Change with 80%+',
    icon: '🌡️',
    condition: s => s.topicsPassed?.has(TOPICS.CLIMATE_CHANGE),
  },
  {
    id: 'es_speed_geologist',
    title: 'Speed Geologist',
    description: 'Complete a quiz without any timeouts',
    icon: '⚡',
    condition: s => s.noTimeouts,
  },
  {
    id: 'es_perfect_quiz',
    title: 'Perfect Field Study',
    description: 'Score 100% on any Earth and Space Sciences quiz',
    icon: '💯',
    condition: s => s.perfectScore,
  },
  {
    id: 'es_streak_5',
    title: 'Consistent Geologist',
    description: 'Maintain a 5-day study streak',
    icon: '🔥',
    condition: s => (s.streak ?? 0) >= 5,
  },
]
