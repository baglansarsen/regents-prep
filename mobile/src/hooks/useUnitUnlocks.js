import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { skipUnlocksKey } from '../utils/storageKeys'
import { isUnitUnlocked as isUnitUnlockedPure, unitUnlockHint as unitUnlockHintPure } from '../utils/unitUnlocks'

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

  const isUnitUnlocked  = (unitIndex) => isUnitUnlockedPure(units, unitIndex, unitComplete, skipUnlocked)
  const unitUnlockHint  = (unitIndex) => unitUnlockHintPure(units, unitIndex)

  return { isUnitUnlocked, unitUnlockHint, reloadSkipUnlocks }
}
