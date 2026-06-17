import { TOPICS } from './questions'

// Computed on the fly from aggregate stats (never persisted). `topicsPassed` is
// a Set of unit topics the student has passed (65%+).
export const ACHIEVEMENTS = [
  {
    id: 'gh_source_sleuth',
    title: 'Source Sleuth',
    description: 'Pass Document & Source Analysis (65%+)',
    icon: '📜',
    tier: 'silver',
    condition: (s) => s.topicsPassed?.has(TOPICS.DOCUMENTS),
  },
  {
    id: 'gh_cause_master',
    title: 'Cause & Effect Master',
    description: 'Pass Causation & Turning Points (65%+)',
    icon: '🔗',
    tier: 'silver',
    condition: (s) => s.topicsPassed?.has(TOPICS.CAUSATION),
  },
  {
    id: 'gh_cartoon_critic',
    title: 'Cartoon Critic',
    description: 'Pass Images & Political Cartoons (65%+)',
    icon: '🖼️',
    tier: 'silver',
    condition: (s) => s.topicsPassed?.has(TOPICS.IMAGES),
  },
  {
    id: 'gh_cartographer',
    title: 'Map Reader',
    description: 'Pass Maps & Geography (65%+)',
    icon: '🗺️',
    tier: 'silver',
    condition: (s) => s.topicsPassed?.has(TOPICS.MAPS),
  },
  {
    id: 'gh_first_quiz',
    title: 'First Step',
    description: 'Complete your first Global History quiz',
    icon: '🎯',
    tier: 'bronze',
    condition: (s) => (s.totalQuizzes ?? 0) >= 1,
  },
  {
    id: 'gh_passing',
    title: 'Passing Grade',
    description: 'Score 65%+ on any quiz',
    icon: '✅',
    tier: 'bronze',
    condition: (s) => (s.bestPct ?? 0) >= 65,
  },
  {
    id: 'gh_mastery',
    title: 'Mastery',
    description: 'Score 85%+ on any quiz',
    icon: '🏆',
    tier: 'gold',
    condition: (s) => (s.bestPct ?? 0) >= 85,
  },
  {
    id: 'gh_historian',
    title: 'Global Historian',
    description: 'Pass all 5 source-analysis units',
    icon: '🌐',
    tier: 'gold',
    condition: (s) => (s.topicsPassed?.size ?? 0) >= 5,
  },
]
