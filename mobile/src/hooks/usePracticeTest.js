import { useState, useEffect, useRef, useCallback } from 'react'

export function usePracticeTest(questionSet) {
  const [index,    setIndex]    = useState(0)
  const [answers,  setAnswers]  = useState({})   // { [questionId]: choiceIndex }
  const [phase,    setPhase]    = useState('testing') // 'testing' | 'review'
  const [elapsed,  setElapsed]  = useState(0)    // seconds
  const timerRef = useRef(null)

  const questions = questionSet
  const current   = questions[index]
  const total     = questions.length
  const isLast    = index === total - 1

  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  const answer = useCallback((choiceIndex) => {
    setAnswers((prev) => ({ ...prev, [current.id]: choiceIndex }))
  }, [current])

  const next = useCallback(() => {
    if (isLast) {
      clearInterval(timerRef.current)
      setPhase('review')
    } else {
      setIndex((i) => i + 1)
    }
  }, [isLast])

  const goTo = useCallback((i) => setIndex(i), [])

  // Scoring helpers
  const correct = Object.entries(answers).filter(([id, choice]) => {
    const q = questions.find((q) => String(q.id) === id)
    return q && q.correct === choice
  }).length

  const score = Math.round((correct / total) * 100)

  // Regents: 65 = passing
  const grade =
    score >= 85 ? 'Mastery'
    : score >= 65 ? 'Passing'
    : 'Not Yet Passing'

  const elapsedStr = (() => {
    const m = Math.floor(elapsed / 60)
    const s = elapsed % 60
    return `${m}:${String(s).padStart(2, '0')}`
  })()

  return {
    current,
    index,
    total,
    answers,
    phase,
    elapsed,
    elapsedStr,
    answer,
    next,
    goTo,
    correct,
    score,
    grade,
    questions,
  }
}
