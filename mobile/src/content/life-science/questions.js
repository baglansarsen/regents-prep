// Topic constants for Life Science — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js
//
// SCIENCE_PRACTICES is a cross-topic unit (Data & Investigations); its questions
// are tagged by skill ('data'|'model'|'experiment') rather than a content topic.

export const TOPICS = {
  CELLS:             'Cells & Cell Processes',
  GENETICS:          'Genetics & Heredity',
  EVOLUTION:         'Evolution & Natural Selection',
  ECOSYSTEMS:        'Ecosystems & Ecology',
  HUMAN_BODY:        'Human Body Systems',
  // Cross-topic "science practices" unit — questions are tagged skill:'data'|'model'|'experiment'.
  SCIENCE_PRACTICES: 'Data & Investigations',
}

export const TOPIC_ICONS = {
  [TOPICS.CELLS]:             '🔬',
  [TOPICS.GENETICS]:          '🧬',
  [TOPICS.EVOLUTION]:         '🦕',
  [TOPICS.ECOSYSTEMS]:        '🌿',
  [TOPICS.HUMAN_BODY]:        '🫀',
  [TOPICS.SCIENCE_PRACTICES]: '📊',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
