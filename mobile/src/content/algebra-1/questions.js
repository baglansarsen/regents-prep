// Topic constants for Algebra 1 — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  LINEAR_EQUATIONS: 'Linear Equations & Inequalities',
  FUNCTIONS:        'Functions & Relations',
  SYSTEMS:          'Systems of Equations',
  POLYNOMIALS:      'Polynomials & Factoring',
  QUADRATICS:       'Quadratic Functions',
  STATISTICS:       'Statistics & Probability',
  CALCULATOR:       'Using the Graphing Calculator', // kept for achievements/flashcards; no unit card
  SEQUENCES:        'Sequences & Patterns',
}

export const TOPIC_ICONS = {
  [TOPICS.LINEAR_EQUATIONS]: '📏',
  [TOPICS.FUNCTIONS]:        '🔀',
  [TOPICS.SYSTEMS]:          '⚖️',
  [TOPICS.POLYNOMIALS]:      '🔢',
  [TOPICS.QUADRATICS]:       '🪁',
  [TOPICS.STATISTICS]:       '📊',
  [TOPICS.CALCULATOR]:       '🧮',
  [TOPICS.SEQUENCES]:        '🔁',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
