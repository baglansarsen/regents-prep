// Topic constants for Earth and Space Sciences — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  // GEOLOGY & ASTRONOMY are icon-map keys only now — units.js's ES_TOPIC_MAP
  // routes both straight to sub-topic units or MIXED_REVIEW, never to these.
  GEOLOGY:           'Geology & Rocks',
  ROCKS:             'Rocks & the Rock Cycle',
  SURFACE_PROCESSES: 'Weathering, Erosion & Deposition',
  MINERALS:          'Minerals',
  PLATE_TECTONICS:   'Plate Tectonics',
  GEOLOGIC_TIME:     'Geologic Time',
  METEOROLOGY:       'Meteorology & Weather',
  CLIMATE:           'Climate & Atmosphere',
  ASTRONOMY:         'Astronomy',
  SOLAR_SYSTEM:      'Solar System & Earth Motions',
  COSMOS:            'Moon, Stars & the Universe',
  WATER_CYCLE:       'Water Cycle & Oceans',
  SCIENCE_PRACTICES: 'Data, Maps & Reference Tables',
  MIXED_REVIEW:      'Earth Science Mixed Review',
}

export const TOPIC_ICONS = {
  [TOPICS.GEOLOGY]:           '🪨',
  [TOPICS.ROCKS]:             '🪨',
  [TOPICS.SURFACE_PROCESSES]: '⛰️',
  [TOPICS.MINERALS]:          '💎',
  [TOPICS.PLATE_TECTONICS]:   '🌋',
  [TOPICS.GEOLOGIC_TIME]:     '⏳',
  [TOPICS.METEOROLOGY]:       '🌩️',
  [TOPICS.CLIMATE]:           '🌤️',
  [TOPICS.ASTRONOMY]:         '🔭',
  [TOPICS.SOLAR_SYSTEM]:      '🪐',
  [TOPICS.COSMOS]:            '🌌',
  [TOPICS.WATER_CYCLE]:       '🌊',
  [TOPICS.SCIENCE_PRACTICES]: '📊',
  [TOPICS.MIXED_REVIEW]:      '📚',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
