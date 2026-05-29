import React, { useRef, useEffect } from 'react'
import LottieView from 'lottie-react-native'
import PET_LOTTIES from '../assets/petLotties'

const ANIM_CONFIG = {
  idle:        { speed: 1.0, loop: true },
  walk:        { speed: 1.4, loop: true },
  jump:        { speed: 2.0, loop: false },
  eat:         { speed: 1.0, loop: false },
  happy_dance: { speed: 1.5, loop: false },
  sad:         { speed: 0.5, loop: true },
  cheer:       { speed: 2.0, loop: false },
  sleep:       { speed: 0.4, loop: true },
  talk:        { speed: 1.2, loop: true },
}

export default function LottieAnimation({ petType, animation = 'idle', size = 100 }) {
  const source = PET_LOTTIES[petType]
  const ref = useRef(null)

  const { speed, loop } = ANIM_CONFIG[animation] ?? ANIM_CONFIG.idle

  useEffect(() => {
    if (!ref.current) return
    ref.current.reset()
    ref.current.play()
  }, [animation])

  if (!source) return null

  return (
    <LottieView
      ref={ref}
      source={source}
      speed={speed}
      loop={loop}
      autoPlay
      style={{ width: size, height: size }}
    />
  )
}
