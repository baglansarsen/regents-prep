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

// ── Full last-attempt persistence (for Review) ────────────────────────────────
// Stored one key per exam so the picker doesn't deserialize every attempt. Holds
// everything ExamResultsScreen needs to rebuild the review (it recomputes score +
// topic breakdown + per-question review purely from questions + answers).
const ATTEMPT_KEY = (examId) => `exam_attempt_v1_${examId}`

export async function saveExamAttempt(examId, attempt) {
  try {
    await AsyncStorage.setItem(ATTEMPT_KEY(examId), JSON.stringify(attempt))
  } catch {}
}

export async function loadExamAttempt(examId) {
  try {
    const raw = await AsyncStorage.getItem(ATTEMPT_KEY(examId))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
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
