import { useMemo } from 'react'
import { hapticTick, hapticSuccess, hapticWarning, hapticHeavy } from '../utils/haptics'
import { useQuizSound } from '../hooks/useQuizSound'

/**
 * One call fires the haptic (and sound, where we have one) for a moment, so
 * motion + haptic + sound land in the same frame (animation-plan.md §2.1).
 *
 *   const fb = useFeedback()
 *   fb.correct()
 *
 * Pass { sound: false } for surfaces that should never load audio (e.g. a
 * plain button) — the hook then skips loading the quiz sounds entirely.
 */
export function useFeedback({ sound = true } = {}) {
  const { playCorrect, playWrong } = useQuizSound({ enabled: sound })

  return useMemo(() => ({
    tap:       () => hapticTick(),
    correct:   () => { hapticSuccess(); playCorrect() },
    wrong:     () => { hapticWarning(); playWrong() },
    unlock:    () => hapticSuccess(),
    celebrate: () => hapticHeavy(),
  }), [playCorrect, playWrong])
}
