import { TOPICS } from './questions'

export const ACHIEVEMENTS = [
  {
    id: 'a1_linear_master',
    title: 'Equation Solver',
    description: 'Pass Linear Equations & Inequalities with 80%+',
    icon: '📏',
    condition: s => s.topicsPassed?.has(TOPICS.LINEAR_EQUATIONS),
  },
  {
    id: 'a1_functions_master',
    title: 'Function Mapper',
    description: 'Pass Functions & Relations with 80%+',
    icon: '🔀',
    condition: s => s.topicsPassed?.has(TOPICS.FUNCTIONS),
  },
  {
    id: 'a1_systems_master',
    title: 'Systems Analyst',
    description: 'Pass Systems of Equations with 80%+',
    icon: '⚖️',
    condition: s => s.topicsPassed?.has(TOPICS.SYSTEMS),
  },
  {
    id: 'a1_poly_master',
    title: 'Factor Ninja',
    description: 'Pass Polynomials & Factoring with 80%+',
    icon: '🔢',
    condition: s => s.topicsPassed?.has(TOPICS.POLYNOMIALS),
  },
  {
    id: 'a1_quad_master',
    title: 'Parabola Pro',
    description: 'Pass Quadratic Functions with 80%+',
    icon: '🪁',
    condition: s => s.topicsPassed?.has(TOPICS.QUADRATICS),
  },
  {
    id: 'a1_stats_master',
    title: 'Data Analyst',
    description: 'Pass Statistics & Probability with 80%+',
    icon: '📊',
    condition: s => s.topicsPassed?.has(TOPICS.STATISTICS),
  },
  {
    id: 'a1_perfect_quiz',
    title: 'Perfect Score',
    description: 'Score 100% on any Algebra 1 quiz',
    icon: '💯',
    condition: s => s.perfectScore,
  },
  {
    id: 'a1_streak_5',
    title: 'Math Habit',
    description: 'Maintain a 5-day study streak',
    icon: '🔥',
    condition: s => (s.streak ?? 0) >= 5,
  },
]
