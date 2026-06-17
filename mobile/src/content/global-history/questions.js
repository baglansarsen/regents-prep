// Topic constants for Global History — the post-2019 NY Regents is a
// source-analysis exam, so units are organized by the analysis SKILL the
// question exercises (reliably taggable) rather than by era (era lives on the
// subTopic for review). See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  DOCUMENTS:  'Document & Source Analysis',
  CAUSATION:  'Causation & Turning Points',
  IMAGES:     'Images & Political Cartoons',
  MAPS:       'Maps & Geography',
  THEMES:     'Themes & Review',
}

export const TOPIC_ICONS = {
  [TOPICS.DOCUMENTS]: '📜',
  [TOPICS.CAUSATION]: '🔗',
  [TOPICS.IMAGES]:    '🖼️',
  [TOPICS.MAPS]:      '🗺️',
  [TOPICS.THEMES]:    '🌐',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
