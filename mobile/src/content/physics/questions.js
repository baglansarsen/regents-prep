// Topic constants for Physics — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  MECHANICS:                 'Mechanics & Forces',
  ENERGY_AND_POWER:          'Energy & Power',
  ELECTRICITY_AND_MAGNETISM: 'Electricity & Magnetism',
  WAVES:                     'Waves & Optics',
  MODERN_PHYSICS:            'Modern Physics',
}

export const TOPIC_ICONS = {
  [TOPICS.MECHANICS]:                 '🏹',
  [TOPICS.ENERGY_AND_POWER]:          '🔋',
  [TOPICS.ELECTRICITY_AND_MAGNETISM]: '🔌',
  [TOPICS.WAVES]:                     '🌊',
  [TOPICS.MODERN_PHYSICS]:            '🪐',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
