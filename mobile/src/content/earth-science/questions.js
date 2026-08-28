// Topic constants for Earth and Space Sciences — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  // GEOLOGY, ASTRONOMY, PLATE_TECTONICS & GEOLOGIC_TIME are icon-map keys
  // only now — units.js's ES_TOPIC_MAP routes all four straight to sub-topic
  // units or MIXED_REVIEW, never to these values directly.
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
  // Split out of Plate Tectonics / Geologic Time once the hand-enrichment
  // pass gave each of these its own well-populated subTopic pool.
  RELATIVE_DATING:    'Relative Dating',
  RADIOACTIVE_DATING: 'Radioactive Dating',
  FOSSILS:            'Fossils & Correlation',
  PLATE_BOUNDARIES:   'Plate Boundaries',
  EARTHQUAKES:        'Earthquakes & Seismic',
  EARTH_INTERIOR:     'Evidence & Convection',
  // ESS3 ("Earth and Human Activity") — authored content, see
  // content/earth-science/authored/ess3.js. The pre-2026 exam never tested
  // this strand, so unlike every other topic here these have no real NYSED
  // exam bank behind them yet.
  HAZARDS:        'Natural Hazards & Risk',
  CLIMATE_CHANGE: 'Global Climate Change',
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
  [TOPICS.RELATIVE_DATING]:    '📏',
  [TOPICS.RADIOACTIVE_DATING]: '☢️',
  [TOPICS.FOSSILS]:            '🦴',
  [TOPICS.PLATE_BOUNDARIES]:   '🌋',
  [TOPICS.EARTHQUAKES]:        '📳',
  [TOPICS.EARTH_INTERIOR]:     '🌐',
  [TOPICS.HAZARDS]:           '⚠️',
  [TOPICS.CLIMATE_CHANGE]:    '🌡️',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
