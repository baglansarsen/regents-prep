import { useState, useCallback } from 'react'
import { correctIndexOf } from '../utils/question'

// Points are denominated directly in RP so the score the student watches climb
// IS what they earn. Streak multipliers reward accuracy streaks.
const BASE_POINTS = 10

// Flat bonus for the open-ended capstone question when the student self-assesses
// "I got it". Not subject to streak multipliers and never affects the graded %.
const WRITTEN_BONUS_RP = 10

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
  // Open-ended capstone question: no choices to select, so it's never auto-graded.
  const isWritten = !!currentQuestion && currentQuestion.type === 'written'

  const answer = useCallback(
    (choiceIndex) => {
      if (phase !== 'answering') return

      const isCorrect = choiceIndex === correctIndexOf(currentQuestion)
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

  // Self-assessed result for the open-ended capstone. Records a non-graded
  // result entry (correct: null, written: true) so the scoring path can exclude
  // it. Deliberately does NOT touch streak, selected, or phase — the written
  // card advances itself via next(), so it never enters 'feedback' and never
  // trips the life-loss effect in QuizScreen.
  const submitWritten = useCallback(
    ({ gotIt }) => {
      if (phase !== 'answering' || !isWritten) return
      const earned = gotIt ? WRITTEN_BONUS_RP : 0
      if (earned) setScore((s) => s + earned)
      setLastEarned(earned)
      setResults((r) => [
        ...r,
        { question: currentQuestion, written: true, gotIt: !!gotIt, correct: null, points: earned },
      ])
    },
    [phase, isWritten, currentQuestion],
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
    isWritten,
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
    submitWritten,
    next,
    reset,
    streakMultiplier: streakMultiplier(streak + 1),
  }
}
