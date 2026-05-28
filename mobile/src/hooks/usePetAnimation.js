import { useState, useEffect } from 'react'

const REACTION_MAP = {
  cheer:        'cheer',
  sad:          'sad',
  happy_dance:  'happy_dance',
  celebrate:    'happy_dance',
  sympathetic:  'sad',
  root_for_you: 'jump',
}

// One-shot animations block talk/idle override until they finish
const ONE_SHOT_DURATIONS = {
  cheer:       1500,
  eat:         1800,
  jump:        1000,
  happy_dance: 2500,
}

export function usePetAnimation({ hunger, happiness, activeReaction, isSpeaking = false }) {
  const [currentAnim, setCurrentAnim] = useState('idle')

  useEffect(() => {
    const resting = hunger < 20 || happiness < 20 ? 'sad' : 'idle'

    if (!activeReaction) {
      setCurrentAnim(isSpeaking ? 'talk' : resting)
      return
    }

    const mapped = REACTION_MAP[activeReaction] ?? 'idle'
    setCurrentAnim(mapped)

    const duration = ONE_SHOT_DURATIONS[mapped]
    if (duration) {
      const t = setTimeout(() => {
        setCurrentAnim(isSpeaking ? 'talk' : resting)
      }, duration)
      return () => clearTimeout(t)
    }
  }, [activeReaction, hunger, happiness, isSpeaking])

  return currentAnim
}
