import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, StyleSheet } from 'react-native'
import SpriteAnimation from './SpriteAnimation'
import PET_SPRITES from '../assets/petSprites'

const SCREEN_WIDTH = Dimensions.get('window').width
const PET_SIZE     = 64
const WALK_MS      = 4000  // one-way trip duration

// Absolute-positioned pet that walks left↔right across the bottom of its parent.
// Only renders when sprite sheets are present (falls back gracefully otherwise).
export default function WalkingPet({ petType, bottomOffset = 0 }) {
  const hasSprite = !!PET_SPRITES[petType]

  const petX    = useRef(new Animated.Value(0)).current
  const scaleX  = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (!hasSprite) return

    function walkRight() {
      scaleX.setValue(1)
      Animated.timing(petX, {
        toValue:         SCREEN_WIDTH - PET_SIZE,
        duration:        WALK_MS,
        useNativeDriver: true,
      }).start(({ finished }) => { if (finished) walkLeft() })
    }

    function walkLeft() {
      scaleX.setValue(-1)
      Animated.timing(petX, {
        toValue:         0,
        duration:        WALK_MS,
        useNativeDriver: true,
      }).start(({ finished }) => { if (finished) walkRight() })
    }

    walkRight()
    return () => petX.stopAnimation()
  }, [hasSprite])

  if (!hasSprite) return null

  return (
    <Animated.View
      style={[
        styles.walker,
        { bottom: bottomOffset },
        { transform: [{ translateX: petX }, { scaleX }] },
      ]}
    >
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
