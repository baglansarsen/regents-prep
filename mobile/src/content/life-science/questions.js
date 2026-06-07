// Topic constants for Life Science — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js
//
// NOTE: CLASSIFICATION kept for flashcards/achievements; no exam questions exist for it,
// so it has no unit card in the learning path.

export const TOPICS = {
  CELLS:          'Cells & Cell Processes',
  GENETICS:       'Genetics & Heredity',
  EVOLUTION:      'Evolution & Natural Selection',
  ECOSYSTEMS:     'Ecosystems & Ecology',
  HUMAN_BODY:     'Human Body Systems',
  CLASSIFICATION: 'Classification of Life', // no exam Qs — kept for backwards compat
}

export const TOPIC_ICONS = {
  [TOPICS.CELLS]:          '🔬',
  [TOPICS.GENETICS]:       '🧬',
  [TOPICS.EVOLUTION]:      '🦕',
  [TOPICS.ECOSYSTEMS]:     '🌿',
  [TOPICS.HUMAN_BODY]:     '🫀',
  [TOPICS.CLASSIFICATION]: '🌳',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
