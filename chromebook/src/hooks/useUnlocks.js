import { useState, useEffect, useCallback, useMemo } from 'react'

function storageKey(subject) {
  return `@skipUnlocks_${subject ?? 'living-environment'}`
}

// Unit N+1 unlocks only after ALL lessons in unit N are completed with ≥65%
export function useUnlocks(history, units, subject) {
  const UNITS = units ?? []

  // Build best-score map: "topic::lessonIdx" → best pct
  const lessonBest = useMemo(() => {
    const map = new Map()
    for (const h of history) {
      if (h.lessonIndex == null) continue
      const key = `${h.topic}::${h.lessonIndex}`
      if ((h.pct ?? 0) > (map.get(key) ?? 0)) map.set(key, h.pct)
    }
    return map
  }, [history])

  function isUnitMastered(topic, lessonCount) {
    for (let i = 0; i < lessonCount; i++) {
      if ((lessonBest.get(`${topic}::${i}`) ?? 0) < 65) return false
    }
    return lessonCount > 0
  }

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

  // Sequential unlock: first unit always open; each next unit requires previous mastered
  const unlockedTopics = new Set()
  for (let i = 0; i < UNITS.length; i++) {
    const unit = UNITS[i]
    if (i === 0) {
      unlockedTopics.add(unit.topic)
    } else {
      const prev = UNITS[i - 1]
      if (isUnitMastered(prev.topic, prev.lessonCount) || forceSet.has(prev.topic)) {
        unlockedTopics.add(unit.topic)
      } else {
        break // strict sequential — don't skip ahead
      }
    }
  }

  forceSet.forEach((t) => unlockedTopics.add(t))

  function isUnlocked(topic) {
    if (!topic) return true
    return unlockedTopics.has(topic)
  }

  function unlockHint(topic) {
    const idx = UNITS.findIndex((u) => u.topic === topic)
    if (idx <= 0) return null
    const prev = UNITS[idx - 1]
    return `Complete all ${prev.lessonCount} lessons in "${prev.title}" to unlock`
  }

  const completedCount = UNITS.filter((u) => isUnitMastered(u.topic, u.lessonCount) || forceSet.has(u.topic)).length

  return { isUnlocked, unlockHint, forceUnlock, completedCount, totalTopics: UNITS.length }
}
