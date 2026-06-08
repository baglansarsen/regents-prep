import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = 'exam_scores_v1'

async function loadAll() {
  try {
    const raw = await AsyncStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export async function saveExamScore(examId, scaledScore) {
  try {
    const all = await loadAll()
    const prev = all[examId] ?? {}
    all[examId] = {
      best: Math.max(scaledScore, prev.best ?? 0),
      last: scaledScore,
    }
    await AsyncStorage.setItem(KEY, JSON.stringify(all))
  } catch {}
}

export function useExamScores() {
  const [scores, setScores] = useState({})

  const refresh = useCallback(async () => {
    const all = await loadAll()
    setScores(all)
  }, [])

  useEffect(() => { refresh() }, [])

  return { scores, refresh }
}
