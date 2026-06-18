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

export function useQuiz(questionSet, { secondChance = false } = {}) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [selected, setSelected] = useState(null)
  const [lastEarned, setLastEarned] = useState(0)
  const [results, setResults] = useState([])
  const [phase, setPhase] = useState('answering') // 'answering' | 'feedback' | 'done'

  // ── Second-chance + hint (lesson learning aids; off in graded/gate contexts) ──
  const [eliminated,    setEliminated]    = useState([])   // disabled choice indices (hint + first-wrong)
  const [attempts,      setAttempts]      = useState(0)     // wrong tries on the current question (0/1)
  const [hintUsed,      setHintUsed]      = useState(false)
  const [shaky,         setShaky]         = useState(false) // hinted or already missed once → recovery scoring
  const [awaitingRetry, setAwaitingRetry] = useState(false) // rising edge drives the dino "try again" prompt

  const questions = questionSet
  const currentQuestion = questions[index]
  const isLast = index === questions.length - 1
  // Open-ended capstone question: no choices to select, so it's never auto-graded.
  const isWritten = !!currentQuestion && currentQuestion.type === 'written'

  const answer = useCallback(
    (choiceIndex) => {
      if (phase !== 'answering') return
      if (eliminated.includes(choiceIndex)) return  // tapping a crossed-out choice is a no-op

      const isCorrect = choiceIndex === correctIndexOf(currentQuestion)
      const liveCount = (currentQuestion.choices?.length ?? 0) - eliminated.length

      // First wrong in a learning context → offer a retry instead of finalizing.
      // (Need >2 live choices, else disabling the wrong one reveals the answer.)
      if (secondChance && !isCorrect && attempts === 0 && liveCount > 2) {
        setStreak(0)                                   // combo broken the moment they err
        setEliminated((e) => [...e, choiceIndex])
        setAttempts(1)
        setShaky(true)
        setAwaitingRetry(true)
        return
      }

      // Finalize.
      const recovered = shaky && isCorrect             // right, but had hinted or missed once
      let earned = 0
      if (isCorrect) {
        if (recovered) {
          earned = Math.round(BASE_POINTS / 2)         // half RP; no streak bump
        } else {
          const newStreak = streak + 1                 // clean first-try correct
          earned = Math.round(BASE_POINTS * streakMultiplier(newStreak))
          setStreak(newStreak)
          setBestStreak((b) => Math.max(b, newStreak))
        }
        setScore((s) => s + earned)
      } else {
        setStreak(0)
      }

      setLastEarned(earned)
      setSelected(choiceIndex)
      setAwaitingRetry(false)
      setResults((r) => [
        ...r,
        {
          question: currentQuestion,
          chosen: choiceIndex,
          // Recovered rows are logged as misses so they enter Smart Review and
          // count as seen-wrong for predicted score (kindness ≠ inflated mastery).
          correct: recovered ? false : isCorrect,
          recovered: recovered || undefined,
          hintUsed: hintUsed || undefined,
          points: earned,
        },
      ])
      setPhase('feedback')
    },
    [phase, currentQuestion, streak, secondChance, attempts, eliminated, shaky, hintUsed],
  )

  // 50/50: cross out wrong choices until only two remain (correct + one other).
  // Marks the question shaky, so a subsequent correct answer scores as a recovery.
  const takeHint = useCallback(() => {
    if (!secondChance || hintUsed || phase !== 'answering' || isWritten) return
    const correctIdx = correctIndexOf(currentQuestion)
    const n = currentQuestion.choices?.length ?? 0
    if (n <= 2) return
    const wrongs = []
    for (let i = 0; i < n; i++) {
      if (i !== correctIdx && !eliminated.includes(i)) wrongs.push(i)
    }
    // Shuffle and keep all-but-one wrong → leaves correct + 1 other.
    for (let i = wrongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[wrongs[i], wrongs[j]] = [wrongs[j], wrongs[i]]
    }
    const toCut = wrongs.slice(0, Math.max(0, wrongs.length - 1))
    if (!toCut.length) return
    setEliminated((e) => [...e, ...toCut])
    setHintUsed(true)
    setShaky(true)
  }, [secondChance, hintUsed, phase, isWritten, currentQuestion, eliminated])

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

  // Clear the per-question second-chance/hint state (next question or reset).
  const clearAttemptState = () => {
    setEliminated([])
    setAttempts(0)
    setHintUsed(false)
    setShaky(false)
    setAwaitingRetry(false)
  }

  const next = useCallback(() => {
    setLastEarned(0)
    if (isLast) {
      setPhase('done')
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      clearAttemptState()
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
    clearAttemptState()
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
    // Second-chance + hint
    eliminated,
    hintUsed,
    awaitingRetry,
    takeHint,
  }
}
