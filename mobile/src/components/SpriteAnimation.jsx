import React, { useEffect, useRef } from 'react'
import { View, Animated } from 'react-native'
import PET_SPRITES, { PET_FRAME_SIZES } from '../assets/petSprites'

const DEFAULT_FRAME_SIZE = 128
const FPS                = 8
const SHEET_COLS         = 8   // frames per row  (sheet width:  1024px / 2048px)
const SHEET_ROWS         = 9   // animation rows  (sheet height: 1152px / 2304px)

export const ANIMATIONS = {
  idle:        { row: 0, frames: 4 },
  walk:        { row: 1, frames: 6 },
  jump:        { row: 2, frames: 5 },
  eat:         { row: 3, frames: 6 },
  happy_dance: { row: 4, frames: 8 },
  sad:         { row: 5, frames: 4 },
  cheer:       { row: 6, frames: 5 },
  sleep:       { row: 7, frames: 4 },
  talk:        { row: 8, frames: 2 },  // 2-frame mouth open/close
}

// Returns null while sprites are not yet commissioned — PetWidget shows emoji fallback.
export default function SpriteAnimation({ petType, animation = 'idle', size = 128 }) {
  const source    = PET_SPRITES[petType]
  const anim      = ANIMATIONS[animation] ?? ANIMATIONS.idle
  const FRAME_SIZE = PET_FRAME_SIZES[petType] ?? DEFAULT_FRAME_SIZE
  const scale     = size / FRAME_SIZE

  const frameIndex = useRef(0)
  const translateX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!source) return
    frameIndex.current = 0
    translateX.setValue(0)

    const id = setInterval(() => {
      frameIndex.current = (frameIndex.current + 1) % anim.frames
      translateX.setValue(-frameIndex.current * FRAME_SIZE * scale)
    }, 1000 / FPS)

    return () => clearInterval(id)
  }, [animation, petType, scale, source])

  if (!source) return null

  return (
    <View style={{ width: FRAME_SIZE * scale, height: FRAME_SIZE * scale, overflow: 'hidden' }}>
      <Animated.Image
        source={source}
        style={{
          width:      FRAME_SIZE * SHEET_COLS * scale,
          height:     FRAME_SIZE * SHEET_ROWS * scale,
          top:        -anim.row * FRAME_SIZE * scale,
          resizeMode: 'cover',
          transform:  [{ translateX }],
        }}
      />
    </View>
  )
}
