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
  if (!PET_SPRITES[petType]) return null

  const petX      = useSharedValue(0)
  const direction = useSharedValue(1)  // 1 = facing right, -1 = facing left

  useEffect(() => {
    petX.value = withRepeat(
      withSequence(
        withTiming(SCREEN_WIDTH - PET_SIZE, {
          duration: WALK_MS,
          onComplete: () => { direction.value = -1 },
        }),
        withTiming(0, {
          duration: WALK_MS,
          onComplete: () => { direction.value = 1 },
        }),
      ),
      -1,
    )
  }, [])

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: petX.value },
      { scaleX:     direction.value },
    ],
  }))

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
