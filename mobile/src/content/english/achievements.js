import { TOPICS } from './questions'

export const ACHIEVEMENTS = [
  { id: 'en_close_reader',  title: 'Close Reader',      description: 'Pass Close Reading (65%+)',            icon: '🔍', tier: 'silver', condition: (s) => s.topicsPassed?.has(TOPICS.CLOSE_READING) },
  { id: 'en_craft',         title: 'Craft Connoisseur', description: "Pass Author's Craft & Tone (65%+)",   icon: '🎭', tier: 'silver', condition: (s) => s.topicsPassed?.has(TOPICS.CRAFT_TONE) },
  { id: 'en_theme',         title: 'Theme Tracker',     description: 'Pass Central Idea & Theme (65%+)',     icon: '💡', tier: 'silver', condition: (s) => s.topicsPassed?.has(TOPICS.CENTRAL_IDEA) },
  { id: 'en_inference',     title: 'Sharp Inferrer',    description: 'Pass Inference (65%+)',                 icon: '🧩', tier: 'silver', condition: (s) => s.topicsPassed?.has(TOPICS.INFERENCE) },
  { id: 'en_vocab',         title: 'Word Detective',    description: 'Pass Word Meaning in Context (65%+)',  icon: '📕', tier: 'silver', condition: (s) => s.topicsPassed?.has(TOPICS.VOCAB_CONTEXT) },
  { id: 'en_first_quiz',    title: 'First Step',        description: 'Complete your first English quiz',      icon: '🎯', tier: 'bronze', condition: (s) => (s.totalQuizzes ?? 0) >= 1 },
  { id: 'en_mastery',       title: 'Mastery',           description: 'Score 85%+ on any quiz',                icon: '🏆', tier: 'gold',   condition: (s) => (s.bestPct ?? 0) >= 85 },
  { id: 'en_close_reader_all', title: 'Master Reader',  description: 'Pass all 6 reading-skill units',        icon: '📖', tier: 'gold',   condition: (s) => (s.topicsPassed?.size ?? 0) >= 6 },
]
