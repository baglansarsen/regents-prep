// Topic constants for Geometry — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  // CONGRUENCE, SIMILARITY, CIRCLES, COORDINATE_GEO, SOLID_GEOMETRY, and
  // TRIGONOMETRY are icon-map / exam-topic-mapping keys only now — each was
  // dissolved into the finer sub-topic units below once the hand-enrichment
  // pass gave every one of their subtopics a real, well-populated pool. No
  // unit uses these six values as its own `topic` field anymore.
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
  // Split out of SIMILARITY.
  SIMILARITY_RATIOS:      'Similarity',
  TRIANGLE_RELATIONSHIPS: 'Triangle Relationships',
  // Split out of CIRCLES.
  CIRCLE_EQUATIONS: 'Equations of Circles',
  ARCS_ANGLES:      'Arcs & Angles',
  CIRCLE_SEGMENTS:  'Circle Segments & Lines',
  // Split out of COORDINATE_GEO.
  LINES_SLOPE:       'Lines & Slope',
  COORDINATE_PROOFS: 'Coordinate Proofs',
  // Split out of SOLID_GEOMETRY.
  CROSS_SECTIONS:  'Cross-Sections & Solids of Revolution',
  VOLUME_SA:       'Volume & Surface Area',
  DENSITY_MODELING:'Density & Modeling',
  // Split out of TRIGONOMETRY.
  RIGHT_TRIANGLE_TRIG: 'Right Triangle Trig',
  SPECIAL_TRIANGLES:   'Pythagorean & Special Triangles',
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
  [TOPICS.SIMILARITY_RATIOS]:      '🔼',
  [TOPICS.TRIANGLE_RELATIONSHIPS]: '📉',
  [TOPICS.CIRCLE_EQUATIONS]: '⭕',
  [TOPICS.ARCS_ANGLES]:      '🥧',
  [TOPICS.CIRCLE_SEGMENTS]:  '➰',
  [TOPICS.LINES_SLOPE]:       '📈',
  [TOPICS.COORDINATE_PROOFS]: '🗺️',
  [TOPICS.CROSS_SECTIONS]:   '🔪',
  [TOPICS.VOLUME_SA]:        '📦',
  [TOPICS.DENSITY_MODELING]: '🧱',
  [TOPICS.RIGHT_TRIANGLE_TRIG]: '📏',
  [TOPICS.SPECIAL_TRIANGLES]:   '📐',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
