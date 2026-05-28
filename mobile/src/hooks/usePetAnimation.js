import { useState, useEffect } from 'react'

// Maps activeReaction values (from usePet) to sprite animation names
const REACTION_MAP = {
  cheer:        'cheer',
  sad:          'sad',
  happy_dance:  'happy_dance',
  celebrate:    'happy_dance',
  sympathetic:  'sad',
  root_for_you: 'jump',
}

// One-shot animations that return to idle after playing once
const ONE_SHOT_DURATIONS = {
  cheer:       1500,
  eat:         1800,
  jump:        1000,
  happy_dance: 2500,
}

// Derives the current sprite animation from pet state and the last triggered reaction
export function usePetAnimation({ hunger, happiness, activeReaction }) {
  const [currentAnim, setCurrentAnim] = useState('idle')

  useEffect(() => {
    const resting = hunger < 20 || happiness < 20 ? 'sad' : 'idle'

    if (!activeReaction) {
      setCurrentAnim(resting)
      return
    }

    const mapped = REACTION_MAP[activeReaction] ?? 'idle'
    setCurrentAnim(mapped)

    const duration = ONE_SHOT_DURATIONS[mapped]
    if (duration) {
      const t = setTimeout(() => setCurrentAnim(resting), duration)
      return () => clearTimeout(t)
    }
  }, [activeReaction, hunger, happiness])

  return currentAnim
}
