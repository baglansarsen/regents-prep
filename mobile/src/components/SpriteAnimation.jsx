import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useSharedValue, useAnimatedStyle,
  withRepeat, withSequence, withTiming, cancelAnimation,
} from 'react-native-reanimated'
import PET_SPRITES from '../assets/petSprites'

const FRAME_SIZE = 128
const FPS = 8
const FRAME_MS = 1000 / FPS

// Rows and frame counts match the sprite sheet layout
export const ANIMATIONS = {
  idle:        { row: 0, frames: 4 },
  walk:        { row: 1, frames: 6 },
  jump:        { row: 2, frames: 5 },
  eat:         { row: 3, frames: 6 },
  happy_dance: { row: 4, frames: 8 },
  sad:         { row: 5, frames: 4 },
  cheer:       { row: 6, frames: 5 },
  sleep:       { row: 7, frames: 4 },
}

// Max frames across all animations — determines sprite sheet width
const MAX_FRAMES = 8

export default function SpriteAnimation({ petType, animation = 'idle', size = 128 }) {
  const source = PET_SPRITES[petType]
  const frame  = useSharedValue(0)
  const anim   = ANIMATIONS[animation] ?? ANIMATIONS.idle
  const scale  = size / FRAME_SIZE

  useEffect(() => {
    cancelAnimation(frame)
    frame.value = 0
    frame.value = withRepeat(
      withSequence(
        ...Array.from({ length: anim.frames }, (_, i) =>
          withTiming(i + 1, { duration: FRAME_MS })
        ),
      ),
      -1,
    )
  }, [animation, petType])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: -Math.floor(frame.value % anim.frames) * FRAME_SIZE * scale,
    }],
  }))

  // Returns null while sprites are not yet commissioned — PetWidget shows emoji fallback
  if (!source) return null

  return (
    <View style={{ width: FRAME_SIZE * scale, height: FRAME_SIZE * scale, overflow: 'hidden' }}>
      <Animated.Image
        source={source}
        style={[
          {
            width:       FRAME_SIZE * MAX_FRAMES * scale,
            height:      FRAME_SIZE * Object.keys(ANIMATIONS).length * scale,
            top:         -anim.row * FRAME_SIZE * scale,
            resizeMode:  'cover',
          },
          animatedStyle,
        ]}
      />
    </View>
  )
}
