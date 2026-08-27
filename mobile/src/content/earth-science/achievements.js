import { TOPICS } from './questions'

// The 8 topics with their own achievement below — es_earth_scientist checks
// against exactly this list (not s.topicsPassed?.size), since topicsPassed is
// evaluated against COMBINED Living Environment + Earth and Space Sciences
// history (see utils/achievements.js) and a raw size check could fire off
// Living Environment topics alone.
const CORE_TOPICS = [
  TOPICS.ROCKS, TOPICS.PLATE_TECTONICS, TOPICS.GEOLOGIC_TIME, TOPICS.METEOROLOGY,
  TOPICS.CLIMATE, TOPICS.SOLAR_SYSTEM, TOPICS.WATER_CYCLE, TOPICS.SCIENCE_PRACTICES,
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
    description: 'Pass Plate Tectonics with 80%+',
    icon: '🌋',
    condition: s => s.topicsPassed?.has(TOPICS.PLATE_TECTONICS),
  },
  {
    id: 'es_time_traveler',
    title: 'Time Traveler',
    description: 'Pass Geologic Time with 80%+',
    icon: '⏳',
    condition: s => s.topicsPassed?.has(TOPICS.GEOLOGIC_TIME),
  },
  {
    id: 'es_storm_chaser',
    title: 'Storm Chaser',
    description: 'Pass Meteorology & Weather with 80%+',
    icon: '🌩️',
    condition: s => s.topicsPassed?.has(TOPICS.METEOROLOGY),
  },
  {
    id: 'es_climate_scientist',
    title: 'Climate Scientist',
    description: 'Pass Climate & Atmosphere with 80%+',
    icon: '🌤️',
    condition: s => s.topicsPassed?.has(TOPICS.CLIMATE),
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
    description: 'Pass Water Cycle & Oceans with 80%+',
    icon: '🌊',
    condition: s => s.topicsPassed?.has(TOPICS.WATER_CYCLE),
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
