import { TOPICS } from './questions'

export const ACHIEVEMENTS = [
  {
    id: 'ls_cell_biologist',
    title: 'Cell Biologist',
    description: 'Pass Cells & Cell Processes with 80%+',
    icon: '🔬',
    condition: s => s.topicsPassed?.has(TOPICS.CELLS),
  },
  {
    id: 'ls_gene_master',
    title: 'Gene Master',
    description: 'Pass Genetics & Heredity with 80%+',
    icon: '🧬',
    condition: s => s.topicsPassed?.has(TOPICS.GENETICS),
  },
  {
    id: 'ls_darwin_award',
    title: 'Darwin\'s Apprentice',
    description: 'Pass Evolution & Natural Selection with 80%+',
    icon: '🦕',
    condition: s => s.topicsPassed?.has(TOPICS.EVOLUTION),
  },
  {
    id: 'ls_ecologist',
    title: 'Ecosystem Expert',
    description: 'Pass Ecosystems & Ecology with 80%+',
    icon: '🌿',
    condition: s => s.topicsPassed?.has(TOPICS.ECOSYSTEMS),
  },
  {
    id: 'ls_body_systems',
    title: 'Body Systems Pro',
    description: 'Pass Human Body Systems with 80%+',
    icon: '🫀',
    condition: s => s.topicsPassed?.has(TOPICS.HUMAN_BODY),
  },
  {
    id: 'ls_data_detective',
    title: 'Data Detective',
    description: 'Pass Data & Investigations with 80%+',
    icon: '📊',
    condition: s => s.topicsPassed?.has(TOPICS.SCIENCE_PRACTICES),
  },
  {
    id: 'ls_perfect_quiz',
    title: 'Perfect Specimen',
    description: 'Score 100% on any Life Science quiz',
    icon: '💯',
    condition: s => s.perfectScore,
  },
  {
    id: 'ls_speed_round',
    title: 'Speed Biologist',
    description: 'Complete a Life Science quiz without any timeouts',
    icon: '⚡',
    condition: s => s.noTimeouts,
  },
  {
    id: 'ls_streak_5',
    title: 'Five-Day Naturalist',
    description: 'Maintain a 5-day study streak',
    icon: '🔥',
    condition: s => (s.streak ?? 0) >= 5,
  },
]
