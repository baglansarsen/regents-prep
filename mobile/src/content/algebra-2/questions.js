// Topic constants for Algebra 2 — kept for flashcards, achievements, and navigation.
// Practice questions removed; lessons are now sourced from the Regents exam bank.
// See units.js (makeLessonApi) and _shared/lessonEngine.js

export const TOPICS = {
  // POLYNOMIAL_FUNCTIONS stays for exam-topic mapping, but is no longer a unit —
  // split into the 2 sub-topic units below.
  POLYNOMIAL_FUNCTIONS:   'Polynomial Functions',
  POLY_OPS:               'Polynomial Operations & Factoring',
  POLY_GRAPHS:            'Polynomial Graphs, Zeros & Conics',
  RATIONAL_RADICAL:       'Rational & Radical Expressions',
  EXPONENTIAL_LOG:        'Exponential & Logarithmic Functions',
  TRIGONOMETRY:           'Trigonometric Functions',
  STATISTICS:             'Statistics & Probability',
  COMPLEX_NUMBERS:        'Complex Numbers',
  PROBLEM_SOLVING:        'Problem-Solving & Modeling',
  CALCULATOR:             'Using the Graphing Calculator', // kept for achievements/flashcards; no unit card
  SEQUENCES:              'Sequences & Series',
  SYSTEMS_INEQUALITIES:   'Systems & Inequalities',
}

export const TOPIC_ICONS = {
  [TOPICS.POLYNOMIAL_FUNCTIONS]:  '📈',
  [TOPICS.POLY_OPS]:              '🔢',
  [TOPICS.POLY_GRAPHS]:           '📈',
  [TOPICS.RATIONAL_RADICAL]:      '➗',
  [TOPICS.EXPONENTIAL_LOG]:       '📉',
  [TOPICS.TRIGONOMETRY]:          '📐',
  [TOPICS.STATISTICS]:            '🎲',
  [TOPICS.COMPLEX_NUMBERS]:       '🔮',
  [TOPICS.PROBLEM_SOLVING]:       '🧠',
  [TOPICS.CALCULATOR]:            '🧮',
  [TOPICS.SEQUENCES]:             '🔁',
  [TOPICS.SYSTEMS_INEQUALITIES]:  '⚖️',
}

export function shuffled(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}
