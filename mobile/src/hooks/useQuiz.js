import { useState, useEffect, useCallback, useRef } from 'react'

const TIMER_SECONDS = 30
// Points are denominated directly in XP so the score the student watches climb
// IS what they earn. Baseline 10/correct matches the old payout; speed + streak
// multipliers push it higher, so being fast and accurate now actually pays.
const BASE_POINTS = 10
const SPEED_BONUS_MAX = 5

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
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [selected, setSelected] = useState(null)
  const [lastEarned, setLastEarned] = useState(0)
  const [results, setResults] = useState([])
  const [phase, setPhase] = useState('answering') // 'answering' | 'feedback' | 'done'
  const timerRef = useRef(null)

  const questions = questionSet
  const currentQuestion = questions[index]
  const isLast = index === questions.length - 1

  const handleTimeout = useCallback(() => {
    if (phase !== 'answering') return
    setSelected('timeout')
    setStreak(0)
    setResults((r) => [
      ...r,
      { question: currentQuestion, chosen: null, correct: false, points: 0 },
    ])
    setPhase('feedback')
  }, [phase, currentQuestion])

  useEffect(() => {
    if (phase !== 'answering') return
    setTimeLeft(TIMER_SECONDS)

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [index, phase])

  useEffect(() => {
    if (phase === 'answering' && timeLeft <= 0) {
      clearInterval(timerRef.current)
      handleTimeout()
    }
  }, [timeLeft, phase, handleTimeout])

  const answer = useCallback(
    (choiceIndex) => {
      if (phase !== 'answering') return
      clearInterval(timerRef.current)

      const isCorrect = choiceIndex === currentQuestion.correct
      let earned = 0

      if (isCorrect) {
        const speedBonus = Math.round((Math.max(0, timeLeft) / TIMER_SECONDS) * SPEED_BONUS_MAX)
        const newStreak = streak + 1
        const multiplier = streakMultiplier(newStreak)
        earned = Math.round((BASE_POINTS + speedBonus) * multiplier)
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
    [phase, currentQuestion, streak, timeLeft],
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
    setTimeLeft(TIMER_SECONDS)
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
    timeLeft,
    timerMax: TIMER_SECONDS,
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
