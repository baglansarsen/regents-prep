// Pure function — no state needed
export function useUnlocks(history, topicOrder) {
  const TOPIC_ORDER = topicOrder ?? []
  const passed = new Set(history.filter((h) => h.pct >= 65).map((h) => h.topic))

  const unlocked = new Set([TOPIC_ORDER[0]])
  for (let i = 1; i < TOPIC_ORDER.length; i++) {
    if (passed.has(TOPIC_ORDER[i - 1])) {
      unlocked.add(TOPIC_ORDER[i])
    } else {
      break
    }
  }

  function isUnlocked(topic) {
    if (!topic) return true
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
