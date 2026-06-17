import { TOPICS } from './questions'

export const ACHIEVEMENTS = [
  { id: 'us_source_sleuth', title: 'Source Sleuth',       description: 'Pass Document & Source Analysis (65%+)', icon: '📜', tier: 'silver', condition: (s) => s.topicsPassed?.has(TOPICS.DOCUMENTS) },
  { id: 'us_cause_master',  title: 'Cause & Effect Master', description: 'Pass Causation & Turning Points (65%+)', icon: '🔗', tier: 'silver', condition: (s) => s.topicsPassed?.has(TOPICS.CAUSATION) },
  { id: 'us_thematic',      title: 'Thematic Thinker',     description: 'Pass Themes & Review (65%+)',            icon: '🇺🇸', tier: 'silver', condition: (s) => s.topicsPassed?.has(TOPICS.THEMES) },
  { id: 'us_cartoon_critic',title: 'Cartoon Critic',       description: 'Pass Images & Political Cartoons (65%+)', icon: '🖼️', tier: 'silver', condition: (s) => s.topicsPassed?.has(TOPICS.IMAGES) },
  { id: 'us_first_quiz',    title: 'First Step',           description: 'Complete your first US History quiz',     icon: '🎯', tier: 'bronze', condition: (s) => (s.totalQuizzes ?? 0) >= 1 },
  { id: 'us_passing',       title: 'Passing Grade',        description: 'Score 65%+ on any quiz',                  icon: '✅', tier: 'bronze', condition: (s) => (s.bestPct ?? 0) >= 65 },
  { id: 'us_mastery',       title: 'Mastery',              description: 'Score 85%+ on any quiz',                  icon: '🏆', tier: 'gold',   condition: (s) => (s.bestPct ?? 0) >= 85 },
  { id: 'us_historian',     title: 'American Historian',   description: 'Pass all 5 source-analysis units',       icon: '🦅', tier: 'gold',   condition: (s) => (s.topicsPassed?.size ?? 0) >= 5 },
]
