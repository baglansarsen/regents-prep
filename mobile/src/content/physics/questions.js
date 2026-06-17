// Topic constants for Physics — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  // MECHANICS / ELECTRICITY_AND_MAGNETISM / WAVES stay for exam-topic mapping,
  // but are no longer units — each is split into 2 sub-topic units below.
  MECHANICS:                 'Mechanics & Forces',
  KINEMATICS:                'Kinematics & Projectile Motion',
  FORCES:                    'Forces, Gravity & Momentum',
  ENERGY_AND_POWER:          'Energy & Power',
  ELECTRICITY_AND_MAGNETISM: 'Electricity & Magnetism',
  CIRCUITS:                  'Circuits',
  ELECTROSTATICS:            'Electrostatics, Fields & Magnetism',
  WAVES:                     'Waves & Optics',
  WAVES_SOUND:               'Waves & Sound',
  LIGHT_OPTICS:              'Light & Optics',
  MODERN_PHYSICS:            'Modern Physics',
  SCIENCE_PRACTICES:         'Formulas, Graphs & Diagrams',
  MIXED_REVIEW:              'Physics Mixed Review',
}

export const TOPIC_ICONS = {
  [TOPICS.MECHANICS]:                 '🏹',
  [TOPICS.KINEMATICS]:                '🏃',
  [TOPICS.FORCES]:                    '🏹',
  [TOPICS.ENERGY_AND_POWER]:          '🔋',
  [TOPICS.ELECTRICITY_AND_MAGNETISM]: '🔌',
  [TOPICS.CIRCUITS]:                  '🔌',
  [TOPICS.ELECTROSTATICS]:            '🧲',
  [TOPICS.WAVES]:                     '🌊',
  [TOPICS.WAVES_SOUND]:               '🌊',
  [TOPICS.LIGHT_OPTICS]:              '🔦',
  [TOPICS.MODERN_PHYSICS]:            '🪐',
  [TOPICS.SCIENCE_PRACTICES]:         '📊',
  [TOPICS.MIXED_REVIEW]:              '📚',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
