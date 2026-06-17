// Shared topic constants for Living Environment.
// Used by living-environment/units.js and living-environment/index.js.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See living-environment/units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  // CELL_BIOLOGY stays for exam-topic mapping, but is no longer a unit itself —
  // the 131 cell questions are split into 3 sub-topic units below.
  CELL_BIOLOGY:      'Cell Biology',
  CELL_STRUCTURE:    'Cell Structure & Transport',
  CELL_ENERGY:       'Energy: Photosynthesis & Respiration',
  BIOCHEM:           'Biochemistry & Enzymes',
  GENETICS:          'Genetics',
  EVOLUTION:         'Evolution',
  ECOLOGY:           'Ecology',
  HUMAN_BODY:        'Human Body',   // absorbs Reproduction (a subTopic now)
  SCIENCE_PRACTICES: 'Data & Investigations',
  LAB_SKILLS:        'Lab Skills',
  MIXED_REVIEW:      'Mixed Review',
}

export const TOPIC_ICONS = {
  [TOPICS.CELL_BIOLOGY]:      '🔬',
  [TOPICS.CELL_STRUCTURE]:    '🔬',
  [TOPICS.CELL_ENERGY]:       '⚡',
  [TOPICS.BIOCHEM]:           '🧪',
  [TOPICS.GENETICS]:          '🧬',
  [TOPICS.EVOLUTION]:         '🦕',
  [TOPICS.ECOLOGY]:           '🌿',
  [TOPICS.HUMAN_BODY]:        '🫀',
  [TOPICS.SCIENCE_PRACTICES]: '📊',
  [TOPICS.LAB_SKILLS]:        '🥽',
  [TOPICS.MIXED_REVIEW]:      '📚',
}

export const LAB_TYPES = {}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
