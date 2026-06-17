// Topic constants for Algebra 1 — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  // LINEAR_EQUATIONS stays for exam-topic mapping, but is no longer a unit —
  // split into the 2 sub-topic units below.
  LINEAR_EQUATIONS: 'Linear Equations & Inequalities',
  LINEAR_SOLVING:   'Solving Equations & Inequalities',
  LINEAR_FUNCTIONS: 'Linear Functions & Graphing',
  FUNCTIONS:        'Functions & Relations',
  SYSTEMS:          'Systems of Equations',
  POLYNOMIALS:      'Polynomials & Factoring',
  QUADRATICS:       'Quadratic Functions',
  PROBLEM_SOLVING:  'Problem-Solving & Modeling',
  STATISTICS:       'Statistics & Probability',
  CALCULATOR:       'Using the Graphing Calculator', // kept for achievements/flashcards; no unit card
  SEQUENCES:        'Sequences & Patterns',
  MIXED_REVIEW:     'Algebra 1 Mixed Review',
}

export const TOPIC_ICONS = {
  [TOPICS.LINEAR_EQUATIONS]: '📏',
  [TOPICS.LINEAR_SOLVING]:   '🟰',
  [TOPICS.LINEAR_FUNCTIONS]: '📈',
  [TOPICS.FUNCTIONS]:        '🔀',
  [TOPICS.SYSTEMS]:          '⚖️',
  [TOPICS.POLYNOMIALS]:      '🔢',
  [TOPICS.QUADRATICS]:       '🪁',
  [TOPICS.PROBLEM_SOLVING]:  '🧠',
  [TOPICS.STATISTICS]:       '📊',
  [TOPICS.CALCULATOR]:       '🧮',
  [TOPICS.SEQUENCES]:        '🔁',
  [TOPICS.MIXED_REVIEW]:     '📚',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
