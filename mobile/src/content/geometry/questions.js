// Topic constants for Geometry — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  CONGRUENCE:       'Congruence & Transformations',
  SIMILARITY:       'Similarity & Proof',
  CIRCLES:          'Circles',
  COORDINATE_GEO:   'Coordinate Geometry',
  SOLID_GEOMETRY:   '3D Geometry & Volume',
  TRIGONOMETRY:     'Trigonometry',
  QUADRILATERALS:   'Quadrilaterals & Polygons',
}

export const TOPIC_ICONS = {
  [TOPICS.CONGRUENCE]:     '🔄',
  [TOPICS.SIMILARITY]:     '📐',
  [TOPICS.CIRCLES]:        '⭕',
  [TOPICS.COORDINATE_GEO]: '🗺️',
  [TOPICS.SOLID_GEOMETRY]: '📦',
  [TOPICS.TRIGONOMETRY]:   '📏',
  [TOPICS.QUADRILATERALS]: '🔷',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
