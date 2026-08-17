import { useState, useEffect, useMemo, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { pickDailyTrap, trapDoneKey } from '../utils/dailyTrap'
import { localDateStr } from '../utils/localDate'

/**
 * useDailyTrap — today's trap question for the active subject plus its
 * completion state ('correct' | 'wrong' | null). Completion is written by
 * ResultsScreen (see trapDoneKey) and re-read here via refresh() on focus.
 * Local-only — no backend for v1.
 */
export function useDailyTrap(uid, subject, questions) {
  const dateStr = localDateStr()
  const [done,   setDone]   = useState(null)
  const [loaded, setLoaded] = useState(false)

  const trapQuestion = useMemo(
    () => pickDailyTrap({ questions, subject, dateStr }),
    [questions, subject, dateStr],
  )

  const refresh = useCallback(async () => {
    if (!uid || !subject) { setDone(null); setLoaded(true); return }
    try {
      const v = await AsyncStorage.getItem(trapDoneKey(uid, subject, localDateStr()))
      setDone(v === 'correct' || v === 'wrong' ? v : null)
    } catch {
      setDone(null)
    }
    setLoaded(true)
  }, [uid, subject])

  useEffect(() => { refresh() }, [refresh])

  return { trapQuestion, done, loaded, refresh }
}
