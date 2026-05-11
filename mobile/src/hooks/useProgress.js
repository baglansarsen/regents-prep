import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = '@regents_progress_v1'

const emptyTopic = () => ({
  highScore: 0,
  bestStreak: 0,
  totalPlayed: 0,
  totalCorrect: 0,
  totalAnswered: 0,
})

export function useProgress() {
  const [progress, setProgress] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (raw) setProgress(JSON.parse(raw))
      setLoaded(true)
    }).catch(() => setLoaded(true))
  }, [])

  const saveResult = useCallback(async ({ topic, score, correct, total, bestStreak }) => {
    setProgress((prev) => {
      const key = topic ?? '__all__'
      const existing = prev[key] ?? emptyTopic()
      const isNewHighScore = score > existing.highScore

      const updated = {
        ...prev,
        [key]: {
          highScore: Math.max(existing.highScore, score),
          bestStreak: Math.max(existing.bestStreak, bestStreak),
          totalPlayed: existing.totalPlayed + 1,
          totalCorrect: existing.totalCorrect + correct,
          totalAnswered: existing.totalAnswered + total,
          isNewHighScore,
        },
      }
      AsyncStorage.setItem(KEY, JSON.stringify(updated)).catch(() => {})
      return updated
    })
  }, [])

  const getTopicProgress = useCallback(
    (topic) => progress[topic ?? '__all__'] ?? emptyTopic(),
    [progress],
  )

  const masteryPct = useCallback(
    (topic) => {
      const p = getTopicProgress(topic)
      if (p.totalAnswered === 0) return null
      return Math.round((p.totalCorrect / p.totalAnswered) * 100)
    },
    [getTopicProgress],
  )

  return { progress, loaded, saveResult, getTopicProgress, masteryPct }
}
