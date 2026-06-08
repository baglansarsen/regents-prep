import { useState, useCallback } from 'react'

// Points are denominated directly in RP so the score the student watches climb
// IS what they earn. Streak multipliers reward accuracy streaks.
const BASE_POINTS = 10

function streakMultiplier(streak) {
  if (streak >= 5) return 2.0
  if (streak >= 3) return 1.5
  if (streak >= 2) return 1.25
  return 1.0
}

export function useQuiz(questionSet) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [selected, setSelected] = useState(null)
  const [lastEarned, setLastEarned] = useState(0)
  const [results, setResults] = useState([])
  const [phase, setPhase] = useState('answering') // 'answering' | 'feedback' | 'done'

  const questions = questionSet
  const currentQuestion = questions[index]
  const isLast = index === questions.length - 1

  const answer = useCallback(
    (choiceIndex) => {
      if (phase !== 'answering') return

      const isCorrect = choiceIndex === currentQuestion.correct
      let earned = 0

      if (isCorrect) {
        const newStreak = streak + 1
        earned = Math.round(BASE_POINTS * streakMultiplier(newStreak))
        setScore((s) => s + earned)
        setStreak(newStreak)
        setBestStreak((b) => Math.max(b, newStreak))
      } else {
        setStreak(0)
      }

      setLastEarned(earned)
      setSelected(choiceIndex)
      setResults((r) => [
        ...r,
        { question: currentQuestion, chosen: choiceIndex, correct: isCorrect, points: earned },
      ])
      setPhase('feedback')
    },
    [phase, currentQuestion, streak],
  )

  const next = useCallback(() => {
    setLastEarned(0)
    if (isLast) {
      setPhase('done')
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setPhase('answering')
    }
  }, [isLast])

  const reset = useCallback(() => {
    setIndex(0)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setSelected(null)
    setResults([])
    setPhase('answering')
  }, [])

  return {
    currentQuestion,
    index,
    total: questions.length,
    score,
    streak,
    bestStreak,
    selected,
    lastEarned,
    phase,
    results,
    answer,
    next,
    reset,
    streakMultiplier: streakMultiplier(streak + 1),
  }
}
