import { TOPICS } from '../data/questions'

const TOPIC_ORDER = [
  TOPICS.CELL_BIOLOGY,
  TOPICS.GENETICS,
  TOPICS.EVOLUTION,
  TOPICS.ECOLOGY,
  TOPICS.HUMAN_BODY,
  TOPICS.REPRODUCTION,
]

export function useUnlocks(history) {
  // Build set of topics where user scored 65%+ at least once
  const passed = new Set(history.filter((h) => h.pct >= 65).map((h) => h.topic))

  // First topic always unlocked; each subsequent unlocks when previous is passed
  const unlocked = new Set([TOPIC_ORDER[0]])
  for (let i = 1; i < TOPIC_ORDER.length; i++) {
    if (passed.has(TOPIC_ORDER[i - 1])) {
      unlocked.add(TOPIC_ORDER[i])
    } else {
      break
    }
  }

  function isUnlocked(topic) {
    if (!topic) return true // "All Topics" always available
    return unlocked.has(topic)
  }

  function unlockHint(topic) {
    const idx = TOPIC_ORDER.indexOf(topic)
    if (idx <= 0) return null
    return `Score 65%+ on ${TOPIC_ORDER[idx - 1]} to unlock`
  }

  const completedCount = TOPIC_ORDER.filter((t) => passed.has(t)).length

  return { isUnlocked, unlockHint, completedCount, totalTopics: TOPIC_ORDER.length }
}
