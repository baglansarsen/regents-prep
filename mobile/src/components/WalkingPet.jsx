import React, { useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue, useAnimatedStyle,
  withSequence, withTiming, withRepeat,
} from 'react-native-reanimated'
import SpriteAnimation from './SpriteAnimation'
import PET_SPRITES from '../assets/petSprites'

const SCREEN_WIDTH = Dimensions.get('window').width
const PET_SIZE     = 64
const WALK_MS      = 4000  // one-way trip duration

// Absolute-positioned pet that walks left↔right across the bottom of its parent.
// Only renders when sprite sheets are present (falls back gracefully otherwise).
export default function WalkingPet({ petType, bottomOffset = 0 }) {
  const hasSprite = !!PET_SPRITES[petType]

  // Hooks must always be called — guard rendering below, not here
  const petX      = useSharedValue(0)
  const direction = useSharedValue(1)  // 1 = facing right, -1 = facing left

  useEffect(() => {
    if (!hasSprite) return
    petX.value = withRepeat(
      withSequence(
        withTiming(SCREEN_WIDTH - PET_SIZE, { duration: WALK_MS }),
        withTiming(0,                        { duration: WALK_MS }),
      ),
      -1,
    )
  }, [hasSprite])

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: petX.value },
      { scaleX:     direction.value },
    ],
  }))

  // Flip direction midway — petX crosses the midpoint twice per cycle
  useEffect(() => {
    if (!hasSprite) return
    const id = setInterval(() => {
      direction.value = petX.value < (SCREEN_WIDTH - PET_SIZE) / 2 ? 1 : -1
    }, 100)
    return () => clearInterval(id)
  }, [hasSprite])

  if (!hasSprite) return null

  return (
    <Animated.View style={[styles.walker, { bottom: bottomOffset }, containerStyle]}>
      <SpriteAnimation petType={petType} animation="walk" size={PET_SIZE} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  walker: {
    position: 'absolute',
    left:     0,
  },
})
