import { useState, useEffect, useCallback, useRef } from 'react'

const ROUND_SECONDS = 60
const BASE_POINTS = 50
const SPEED_BONUS_MAX = 30

function streakMultiplier(streak) {
  if (streak >= 5) return 2.0
  if (streak >= 3) return 1.5
  if (streak >= 2) return 1.25
  return 1.0
}

export function useSpeedRound(questionSet) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [selected, setSelected] = useState(null)
  const [results, setResults] = useState([])
  const [phase, setPhase] = useState('answering') // 'answering' | 'feedback' | 'done'

  const timeLeftRef = useRef(ROUND_SECONDS)
  const questionStartRef = useRef(Date.now())
  const timerRef = useRef(null)
  const autoAdvanceRef = useRef(null)

  const questions = questionSet

  // Single global countdown — starts once
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        const next = t - 1
        timeLeftRef.current = next
        if (next <= 0) clearInterval(timerRef.current)
        return Math.max(0, next)
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  // End round when time runs out
  useEffect(() => {
    if (timeLeft <= 0) {
      clearTimeout(autoAdvanceRef.current)
      setPhase('done')
    }
  }, [timeLeft])

  // Reset question start time on each new question
  useEffect(() => {
    questionStartRef.current = Date.now()
  }, [index])

  const answer = useCallback((choiceIndex) => {
    if (phase !== 'answering') return

    const reactionMs = Date.now() - questionStartRef.current
    const currentQuestion = questions[index % questions.length]
    const isCorrect = choiceIndex === currentQuestion.correct
    let earned = 0

    if (isCorrect) {
      const speedBonus = Math.round(Math.max(0, 1 - reactionMs / 10000) * SPEED_BONUS_MAX)
      const newStreak = streak + 1
      earned = Math.round((BASE_POINTS + speedBonus) * streakMultiplier(newStreak))
      setScore((s) => s + earned)
      setStreak(newStreak)
      setBestStreak((b) => Math.max(b, newStreak))
    } else {
      setStreak(0)
    }

    setSelected(choiceIndex)
    setResults((r) => [...r, { question: currentQuestion, chosen: choiceIndex, correct: isCorrect, points: earned }])
    setPhase('feedback')

    autoAdvanceRef.current = setTimeout(() => {
      if (timeLeftRef.current > 0) {
        setIndex((i) => i + 1)
        setSelected(null)
        setPhase('answering')
      } else {
        setPhase('done')
      }
    }, 700)
  }, [phase, questions, index, streak])

  useEffect(() => () => {
    clearInterval(timerRef.current)
    clearTimeout(autoAdvanceRef.current)
  }, [])

  const currentQuestion = questions[index % questions.length]

  return {
    currentQuestion,
    index,
    score,
    streak,
    bestStreak,
    timeLeft,
    roundMax: ROUND_SECONDS,
    selected,
    phase,
    results,
    answered: results.length,
    answer,
    streakMultiplier: streakMultiplier(streak + 1),
  }
}
