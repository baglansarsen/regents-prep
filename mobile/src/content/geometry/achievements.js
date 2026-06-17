import { TOPICS } from './questions'

export const ACHIEVEMENTS = [
  {
    id: 'geo_congruence_master',
    title: 'Proof Builder',
    description: 'Pass Congruence & Transformations with 80%+',
    icon: '🔄',
    condition: s => s.topicsPassed?.has(TOPICS.LINES_ANGLES),
  },
  {
    id: 'geo_similarity_master',
    title: 'Proportional Thinker',
    description: 'Pass Similarity & Proof with 80%+',
    icon: '📐',
    condition: s => s.topicsPassed?.has(TOPICS.SIMILARITY),
  },
  {
    id: 'geo_circles_master',
    title: 'Circle Scholar',
    description: 'Pass Circles with 80%+',
    icon: '⭕',
    condition: s => s.topicsPassed?.has(TOPICS.CIRCLES),
  },
  {
    id: 'geo_coordinate_master',
    title: 'Coordinate Navigator',
    description: 'Pass Coordinate Geometry with 80%+',
    icon: '🗺️',
    condition: s => s.topicsPassed?.has(TOPICS.COORDINATE_GEO),
  },
  {
    id: 'geo_solid_master',
    title: '3D Architect',
    description: 'Pass 3D Geometry & Volume with 80%+',
    icon: '📦',
    condition: s => s.topicsPassed?.has(TOPICS.SOLID_GEOMETRY),
  },
  {
    id: 'geo_trig_master',
    title: 'Triangle Whisperer',
    description: 'Pass Trigonometry with 80%+',
    icon: '📏',
    condition: s => s.topicsPassed?.has(TOPICS.TRIGONOMETRY),
  },
  {
    id: 'geo_perfect_quiz',
    title: 'Perfect Geometry',
    description: 'Score 100% on any Geometry quiz',
    icon: '💯',
    condition: s => s.perfectScore,
  },
  {
    id: 'geo_streak_5',
    title: 'Parallel Lines',
    description: 'Maintain a 5-day study streak',
    icon: '🔥',
    condition: s => (s.streak ?? 0) >= 5,
  },
]
