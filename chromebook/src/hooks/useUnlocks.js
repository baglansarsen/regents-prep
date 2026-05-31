import { useState, useEffect, useCallback } from 'react'

function storageKey(subject) {
  return `@skipUnlocks_${subject ?? 'living-environment'}`
}

export function useUnlocks(history, topicOrder, subject) {
  const TOPIC_ORDER = topicOrder ?? []
  const passed = new Set(history.filter((h) => h.pct >= 65).map((h) => h.topic))

  const [forceSet, setForceSet] = useState(new Set())

  useEffect(() => {
    const val = localStorage.getItem(storageKey(subject))
    if (val) {
      try { setForceSet(new Set(JSON.parse(val))) } catch (_) {}
    } else {
      setForceSet(new Set())
    }
  }, [subject])

  const forceUnlock = useCallback(async (topic) => {
    const updated = new Set(forceSet)
    updated.add(topic)
    setForceSet(updated)
    localStorage.setItem(storageKey(subject), JSON.stringify([...updated]))
  }, [forceSet, subject])

  const unlocked = new Set([TOPIC_ORDER[0]])
  for (let i = 1; i < TOPIC_ORDER.length; i++) {
    const prev = TOPIC_ORDER[i - 1]
    if (passed.has(prev) || forceSet.has(prev)) {
      unlocked.add(TOPIC_ORDER[i])
    } else {
      break
    }
  }

  forceSet.forEach((t) => unlocked.add(t))

  function isUnlocked(topic) {
    if (!topic) return true
    return unlocked.has(topic)
  }

  function unlockHint(topic) {
    const idx = TOPIC_ORDER.indexOf(topic)
    if (idx <= 0) return null
    return `65%+ on ${TOPIC_ORDER[idx - 1]} — or Skip Challenge`
  }

  function prerequisiteTopic(topic) {
    const idx = TOPIC_ORDER.indexOf(topic)
    if (idx <= 0) return null
    return TOPIC_ORDER[idx - 1]
  }

  const completedCount = TOPIC_ORDER.filter((t) => passed.has(t) || forceSet.has(t)).length

  return { isUnlocked, unlockHint, forceUnlock, prerequisiteTopic, completedCount, totalTopics: TOPIC_ORDER.length }
}
