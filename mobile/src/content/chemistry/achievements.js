import { TOPICS } from './questions'

export const ACHIEVEMENTS = [
  {
    id: 'chem_atomic_master',
    title: 'Subatomic Pioneer',
    description: 'Pass Atomic Structure with 80%+',
    icon: '⚛️',
    condition: s => s.topicsPassed?.has(TOPICS.ATOMIC_STRUCTURE),
  },
  {
    id: 'chem_periodic_titan',
    title: 'Periodic Virtuoso',
    description: 'Pass Periodic Table with 80%+',
    icon: '📊',
    condition: s => s.topicsPassed?.has(TOPICS.PERIODIC_TABLE),
  },
  {
    id: 'chem_bond_builder',
    title: 'Valence Commander',
    description: 'Pass Chemical Bonding with 80%+',
    icon: '🤝',
    condition: s => s.topicsPassed?.has(TOPICS.CHEMICAL_BONDING),
  },
  {
    id: 'chem_energy_alchemist',
    title: 'Calorimetry Master',
    description: 'Pass Matter & Energy with 80%+',
    icon: '🔥',
    condition: s => s.topicsPassed?.has(TOPICS.MATTER_AND_ENERGY),
  },
  {
    id: 'chem_organic_synthesizer',
    title: 'Carbon Synthesizer',
    description: 'Pass Organic Chemistry with 80%+',
    icon: '🌿',
    condition: s => s.topicsPassed?.has(TOPICS.ORGANIC_CHEMISTRY),
  },
  {
    id: 'chemistry_perfect_quiz',
    title: 'Perfect Synthesis',
    description: 'Score 100% on any Chemistry quiz',
    icon: '💯',
    condition: s => s.perfectScore,
  },
  {
    id: 'chemistry_speed',
    title: 'Kinetics Master',
    description: 'Complete a Chemistry quiz without any timeouts',
    icon: '⚡',
    condition: s => s.noTimeouts,
  },
  {
    id: 'chemistry_streak_5',
    title: 'Stable Isotope',
    description: 'Maintain a 5-day study streak',
    icon: '🔥',
    condition: s => (s.streak ?? 0) >= 5,
  },
]
