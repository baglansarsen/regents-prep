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

export function useQuiz(questionSet, { hint = false, repeat = false } = {}) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [selected, setSelected] = useState(null)
  const [lastEarned, setLastEarned] = useState(0)
  const [results, setResults] = useState([])
  const [phase, setPhase] = useState('answering') // 'answering' | 'feedback' | 'done'

  // ── 50/50 hint (a learning aid; eliminates wrong choices) ───────────────────
  const [eliminated, setEliminated] = useState([])   // disabled choice indices
  const [hintUsed,   setHintUsed]   = useState(false)
  const [shaky,      setShaky]      = useState(false) // hinted → recovery scoring

  // ── Duolingo-style end-of-lesson repeat of missed questions ─────────────────
  const [mode,          setMode]          = useState('main')  // 'main' | 'repeat'
  const [repeatQueue,   setRepeatQueue]   = useState([])      // questions in the current repeat pass
  const [repeatPending, setRepeatPending] = useState([])      // missed again this pass → next pass
  const [repeatIdx,     setRepeatIdx]     = useState(0)

  const inRepeat = mode === 'repeat'
  const currentQuestion = inRepeat ? repeatQueue[repeatIdx] : questionSet[index]
  const isLast = index === questionSet.length - 1
  // Open-ended capstone question: no choices to select, so it's never auto-graded.
  const isWritten = !!currentQuestion && currentQuestion.type === 'written'

  // Tap a choice → highlight only (tap-to-confirm). Grading happens in check().
  const select = useCallback(
    (choiceIndex) => {
      if (phase !== 'answering') return
      if (eliminated.includes(choiceIndex)) return
      setSelected(choiceIndex)
    },
    [phase, eliminated],
  )

  // Submit the highlighted choice.
  const check = useCallback(() => {
    if (phase !== 'answering' || selected == null) return
    const isCorrect = selected === correctIndexOf(currentQuestion)

    // Repeat round: pedagogical only — no score, no result row, no life loss.
    // It's a single pass, so nothing is re-queued here.
    if (inRepeat) {
      setLastEarned(0)
      setPhase('feedback')
      return
    }

    const recovered = shaky && isCorrect   // right, but used a hint
    let earned = 0
    if (isCorrect) {
      if (recovered) {
        earned = Math.round(BASE_POINTS / 2)   // half RP; no streak bump
      } else {
        const newStreak = streak + 1           // clean first-try correct
        earned = Math.round(BASE_POINTS * streakMultiplier(newStreak))
        setStreak(newStreak)
        setBestStreak((b) => Math.max(b, newStreak))
      }
      setScore((s) => s + earned)
    } else {
      setStreak(0)
    }

    setLastEarned(earned)
    setResults((r) => [
      ...r,
      {
        question: currentQuestion,
        chosen: selected,
        // Hint-recovered rows are logged as misses so they enter Smart Review
        // and count as seen-wrong (kindness ≠ inflated mastery).
        correct: recovered ? false : isCorrect,
        recovered: recovered || undefined,
        hintUsed: hintUsed || undefined,
        points: earned,
      },
    ])
    setPhase('feedback')
  }, [phase, selected, currentQuestion, inRepeat, repeatIdx, streak, shaky, hintUsed])

  // 50/50: cross out wrong choices until only two remain (correct + one other).
  // Marks the question shaky, so a subsequent correct answer scores as a recovery.
  const takeHint = useCallback(() => {
    if (!hint || hintUsed || phase !== 'answering' || isWritten || inRepeat) return
    const correctIdx = correctIndexOf(currentQuestion)
    const n = currentQuestion.choices?.length ?? 0
    if (n <= 2) return
    const wrongs = []
    for (let i = 0; i < n; i++) {
      if (i !== correctIdx && !eliminated.includes(i)) wrongs.push(i)
    }
    for (let i = wrongs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[wrongs[i], wrongs[j]] = [wrongs[j], wrongs[i]]
    }
    const toCut = wrongs.slice(0, Math.max(0, wrongs.length - 1))
    if (!toCut.length) return
    setEliminated((e) => [...e, ...toCut])
    setHintUsed(true)
    setShaky(true)
  }, [hint, hintUsed, phase, isWritten, inRepeat, currentQuestion, eliminated])

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

  // Clear per-question hint/selection state (next question or reset).
  const clearQ = () => {
    setSelected(null)
    setEliminated([])
    setHintUsed(false)
    setShaky(false)
  }

  // De-dupe questions by id/text (a repeat pass shouldn't ask the same item twice).
  const dedupe = (qs) => {
    const seen = new Set()
    return qs.filter((q) => {
      const k = q?.id ?? q?.text
      if (seen.has(k)) return false
      seen.add(k)
      return true
    })
  }

  const next = useCallback(() => {
    setLastEarned(0)

    if (!inRepeat) {
      if (!isLast) {
        setIndex((i) => i + 1)
        clearQ()
        setPhase('answering')
        return
      }
      // Main pass finished. Re-ask the misses (genuine wrong + hint-recovered),
      // unless repeat is disabled (e.g. challenge gates) or there were none.
      const misses = dedupe(results.filter((r) => !r.written && !r.correct).map((r) => r.question))
      if (repeat && misses.length) {
        setMode('repeat')
        setRepeatQueue(misses)
        setRepeatPending([])
        setRepeatIdx(0)
        clearQ()
        setPhase('answering')
      } else {
        setPhase('done')
      }
      return
    }

    // In the repeat pass.
    if (repeatIdx < repeatQueue.length - 1) {
      setRepeatIdx((i) => i + 1)
      clearQ()
      setPhase('answering')
      return
    }
    // The repeat is a SINGLE pass — we re-ask each miss exactly once, then
    // finish regardless of whether it was answered correctly this time. (Looping
    // until everything is right caused an endless quiz when a question kept being
    // missed.) Items still wrong remain logged in the main-pass results, so they
    // still flow into Smart Review.
    setPhase('done')
  }, [inRepeat, isLast, results, repeat, repeatIdx, repeatQueue])

  const reset = useCallback(() => {
    setIndex(0)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setResults([])
    setMode('main')
    setRepeatQueue([])
    setRepeatPending([])
    setRepeatIdx(0)
    clearQ()
    setPhase('answering')
  }, [])

  return {
    currentQuestion,
    isWritten,
    index,
    total: questionSet.length,
    score,
    streak,
    bestStreak,
    selected,
    lastEarned,
    phase,
    results,
    select,
    check,
    submitWritten,
    next,
    reset,
    streakMultiplier: streakMultiplier(streak + 1),
    // 50/50 hint
    eliminated,
    hintUsed,
    takeHint,
    // Repeat round
    inRepeat,
    repeatTotal: repeatQueue.length,
    repeatIndex: repeatIdx,
  }
}
