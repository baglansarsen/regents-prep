// Topic constants for English (ELA) — the Regents Part 1 is reading-comprehension
// MC, so units are organized by the reading-analysis SKILL each question tests
// (taggable from the question stem). See units.js (makeLessonApi).

export const TOPICS = {
  CLOSE_READING: 'Close Reading',
  CRAFT_TONE:    "Author's Craft & Tone",
  CENTRAL_IDEA:  'Central Idea & Theme',
  INFERENCE:     'Inference',
  VOCAB_CONTEXT: 'Word Meaning in Context',
  ARGUMENT:      'Argument & Structure',
}

export const TOPIC_ICONS = {
  [TOPICS.CLOSE_READING]: '🔍',
  [TOPICS.CRAFT_TONE]:    '🎭',
  [TOPICS.CENTRAL_IDEA]:  '💡',
  [TOPICS.INFERENCE]:     '🧩',
  [TOPICS.VOCAB_CONTEXT]: '📕',
  [TOPICS.ARGUMENT]:      '⚖️',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
