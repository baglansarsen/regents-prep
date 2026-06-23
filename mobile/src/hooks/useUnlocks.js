import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { skipUnlocksKey as storageKey } from '../utils/storageKeys'

export function useUnlocks(history, topicOrder, subject) {
  const TOPIC_ORDER = topicOrder ?? []
  const passed = new Set(history.filter((h) => h.pct >= 65).map((h) => h.topic))

  // Force-unlocked topics (via skip challenge)
  const [forceSet, setForceSet] = useState(new Set())

  useEffect(() => {
    AsyncStorage.getItem(storageKey(subject)).then((val) => {
      if (val) {
        try { setForceSet(new Set(JSON.parse(val))) } catch (_) {}
      }
    })
  }, [subject])

  // Save a force-unlock after passing the skip challenge
  const forceUnlock = useCallback(async (topic) => {
    const updated = new Set(forceSet)
    updated.add(topic)
    setForceSet(updated)
    await AsyncStorage.setItem(storageKey(subject), JSON.stringify([...updated]))
  }, [forceSet, subject])

  // Build normally-unlocked set (sequential progression). Guard the empty case:
  // `new Set([TOPIC_ORDER[0]])` would seed the set with `undefined`, making
  // isUnlocked(undefined) truthy and corrupting unlock checks.
  const unlocked = new Set(TOPIC_ORDER[0] != null ? [TOPIC_ORDER[0]] : [])
  for (let i = 1; i < TOPIC_ORDER.length; i++) {
    const prev = TOPIC_ORDER[i - 1]
    if (passed.has(prev) || forceSet.has(prev)) {
      unlocked.add(TOPIC_ORDER[i])
    } else {
      break
    }
  }

  // Add all force-unlocked topics
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

  // Which topic is the prerequisite for a locked topic
  function prerequisiteTopic(topic) {
    const idx = TOPIC_ORDER.indexOf(topic)
    if (idx <= 0) return null
    return TOPIC_ORDER[idx - 1]
  }

  const completedCount = TOPIC_ORDER.filter((t) => passed.has(t) || forceSet.has(t)).length

  return { isUnlocked, unlockHint, forceUnlock, prerequisiteTopic, completedCount, totalTopics: TOPIC_ORDER.length }
}
