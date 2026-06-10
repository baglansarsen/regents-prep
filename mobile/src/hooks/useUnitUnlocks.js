import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { skipUnlocksKey } from '../utils/storageKeys'

export function useUnitUnlocks(units, lessonComplete, unitComplete, subject) {
  const [skipUnlocked, setSkipUnlocked] = useState(new Set())

  const reloadSkipUnlocks = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(skipUnlocksKey(subject))
      const arr = raw ? JSON.parse(raw) : []
      setSkipUnlocked(new Set(arr))
    } catch {}
  }, [subject])

  useEffect(() => { reloadSkipUnlocks() }, [reloadSkipUnlocks])

  function isUnitUnlocked(unitIndex) {
    if (unitIndex === 0) return true
    const prev    = units[unitIndex - 1]
    const current = units[unitIndex]
    return unitComplete(prev.topic, prev.lessonCount) || skipUnlocked.has(current?.topic)
  }

  function unitUnlockHint(unitIndex) {
    if (unitIndex === 0) return null
    const prev = units[unitIndex - 1]
    return `Complete all lessons in ${prev.title} to unlock, or pass the ⚡ Challenge with ≤3 mistakes`
  }

  return { isUnitUnlocked, unitUnlockHint, reloadSkipUnlocks }
}
