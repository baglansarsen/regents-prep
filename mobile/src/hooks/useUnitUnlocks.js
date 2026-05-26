import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function useUnitUnlocks(units, lessonComplete, subject) {
  const [skipUnlocked, setSkipUnlocked] = useState(new Set())

  const reloadSkipUnlocks = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(`@skipUnlocks_${subject}`)
      const arr = raw ? JSON.parse(raw) : []
      setSkipUnlocked(new Set(arr))
    } catch {}
  }, [subject])

  useEffect(() => { reloadSkipUnlocks() }, [reloadSkipUnlocks])

  function isUnitUnlocked(unitIndex) {
    if (unitIndex === 0) return true
    const prev    = units[unitIndex - 1]
    const current = units[unitIndex]
    return lessonComplete(prev.topic, 0) || skipUnlocked.has(current?.topic)
  }

  function unitUnlockHint(unitIndex) {
    if (unitIndex === 0) return null
    const prev = units[unitIndex - 1]
    return `Complete ${prev.title} Lesson 1 to unlock`
  }

  return { isUnitUnlocked, unitUnlockHint, reloadSkipUnlocks }
}
