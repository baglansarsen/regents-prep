import { TOPICS } from './questions'

export const ACHIEVEMENTS = [
  {
    id: 'a2_poly_master',
    title: 'Polynomial Wizard',
    description: 'Pass Polynomial Functions with 80%+',
    icon: '📈',
    condition: s => s.topicsPassed?.has(TOPICS.POLYNOMIAL_FUNCTIONS),
  },
  {
    id: 'a2_rational_master',
    title: 'Radical Thinker',
    description: 'Pass Rational & Radical Expressions with 80%+',
    icon: '➗',
    condition: s => s.topicsPassed?.has(TOPICS.RATIONAL_RADICAL),
  },
  {
    id: 'a2_log_master',
    title: 'Logarithm Legend',
    description: 'Pass Exponential & Logarithmic Functions with 80%+',
    icon: '📉',
    condition: s => s.topicsPassed?.has(TOPICS.EXPONENTIAL_LOG),
  },
  {
    id: 'a2_trig_master',
    title: 'Trig Champion',
    description: 'Pass Trigonometric Functions with 80%+',
    icon: '📐',
    condition: s => s.topicsPassed?.has(TOPICS.TRIGONOMETRY),
  },
  {
    id: 'a2_stats_master',
    title: 'Probability Pro',
    description: 'Pass Statistics & Probability with 80%+',
    icon: '🎲',
    condition: s => s.topicsPassed?.has(TOPICS.STATISTICS),
  },
  {
    id: 'a2_complex_master',
    title: 'Imaginary Genius',
    description: 'Pass Complex Numbers with 80%+',
    icon: '🔮',
    condition: s => s.topicsPassed?.has(TOPICS.COMPLEX_NUMBERS),
  },
  {
    id: 'a2_perfect_quiz',
    title: 'Perfect Proof',
    description: 'Score 100% on any Algebra 2 quiz',
    icon: '💯',
    condition: s => s.perfectScore,
  },
  {
    id: 'a2_streak_5',
    title: 'Exponential Habit',
    description: 'Maintain a 5-day study streak',
    icon: '🔥',
    condition: s => (s.streak ?? 0) >= 5,
  },
  {
    id: 'a2_calc_master',
    title: 'Calculator Pro',
    description: 'Pass Using the Graphing Calculator with 80%+',
    icon: '🧮',
    condition: s => s.topicsPassed?.has(TOPICS.CALCULATOR),
  },
]
