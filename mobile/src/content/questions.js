// Shared topic constants for Living Environment.
// Used by living-environment/units.js and living-environment/index.js.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See living-environment/units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  CELL_BIOLOGY:  'Cell Biology',
  GENETICS:      'Genetics',
  EVOLUTION:     'Evolution',
  ECOLOGY:       'Ecology',
  HUMAN_BODY:    'Human Body',
  REPRODUCTION:  'Reproduction',
  MIXED_REVIEW:  'Mixed Review',
}

export const TOPIC_ICONS = {
  [TOPICS.CELL_BIOLOGY]: '🔬',
  [TOPICS.GENETICS]:     '🧬',
  [TOPICS.EVOLUTION]:    '🦕',
  [TOPICS.ECOLOGY]:      '🌿',
  [TOPICS.HUMAN_BODY]:   '🫀',
  [TOPICS.REPRODUCTION]: '🌱',
  [TOPICS.MIXED_REVIEW]: '📚',
}

export const LAB_TYPES = {}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
