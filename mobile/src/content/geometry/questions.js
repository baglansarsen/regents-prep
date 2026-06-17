// Topic constants for Geometry — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  // CONGRUENCE stays for exam-topic mapping, but is no longer a unit —
  // split into the 2 sub-topic units below.
  CONGRUENCE:       'Congruence & Transformations',
  LINES_ANGLES:     'Lines, Angles & Transformations',
  TRIANGLE_CONG:    'Triangle Congruence & Constructions',
  SIMILARITY:       'Similarity & Proof',
  CIRCLES:          'Circles',
  COORDINATE_GEO:   'Coordinate Geometry',
  SOLID_GEOMETRY:   '3D Geometry & Volume',
  TRIGONOMETRY:     'Trigonometry',
  QUADRILATERALS:   'Quadrilaterals & Polygons',
  PROOFS_REASONING: 'Proofs & Reasoning',
}

export const TOPIC_ICONS = {
  [TOPICS.CONGRUENCE]:       '🔄',
  [TOPICS.LINES_ANGLES]:     '📐',
  [TOPICS.TRIANGLE_CONG]:    '🔺',
  [TOPICS.SIMILARITY]:       '🔼',
  [TOPICS.CIRCLES]:          '⭕',
  [TOPICS.COORDINATE_GEO]:   '🗺️',
  [TOPICS.SOLID_GEOMETRY]:   '📦',
  [TOPICS.TRIGONOMETRY]:     '📏',
  [TOPICS.QUADRILATERALS]:   '🔷',
  [TOPICS.PROOFS_REASONING]: '🧠',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
