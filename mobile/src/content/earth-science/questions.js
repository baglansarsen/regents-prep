// Topic constants for Earth Science — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  GEOLOGY:        'Geology & Rocks',
  PLATE_TECTONICS:'Plate Tectonics',
  GEOLOGIC_TIME:  'Geologic Time',
  METEOROLOGY:    'Meteorology & Weather',
  CLIMATE:        'Climate & Atmosphere',
  ASTRONOMY:      'Astronomy',
  WATER_CYCLE:    'Water Cycle & Oceans',
  MAPS:           'Maps & Topography',
  MIXED_REVIEW:   'Earth Science Mixed Review',
}

export const TOPIC_ICONS = {
  [TOPICS.GEOLOGY]:        '🪨',
  [TOPICS.PLATE_TECTONICS]:'🌋',
  [TOPICS.GEOLOGIC_TIME]:  '⏳',
  [TOPICS.METEOROLOGY]:    '🌩️',
  [TOPICS.CLIMATE]:        '🌤️',
  [TOPICS.ASTRONOMY]:      '🔭',
  [TOPICS.WATER_CYCLE]:    '🌊',
  [TOPICS.MAPS]:           '🗺️',
  [TOPICS.MIXED_REVIEW]:   '📚',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
