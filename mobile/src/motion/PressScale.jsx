import React, { useEffect, useRef } from 'react'
import { Animated, Pressable } from 'react-native'
import { NATIVE_DRIVER, SPRING } from './tokens'
import { hapticTick } from '../utils/haptics'

/**
 * Squish-on-press for round or irregular targets (path nodes) where the
 * PressableDuo ledge doesn't fit: scales to 0.92 on press-in with a tap
 * haptic, springs back on release. `style` goes on the animated surface.
 * `restScale` is the resting size (e.g. 1.08 for a selected node); the press
 * squish multiplies it, so a selected node still squishes.
 */
export default function PressScale({
  onPress, disabled = false, haptic = true, restScale = 1, style, children,
  accessibilityLabel, accessibilityHint, accessibilityState,
}) {
  const press = useRef(new Animated.Value(1)).current
  const rest = useRef(new Animated.Value(restScale)).current
  const to = (v) => Animated.spring(press, { toValue: v, ...SPRING.snappy, useNativeDriver: NATIVE_DRIVER }).start()

  useEffect(() => {
    const a = Animated.spring(rest, { toValue: restScale, ...SPRING.bouncy, useNativeDriver: NATIVE_DRIVER })
    a.start()
    return () => a.stop()
  }, [restScale])

  const scale = useRef(Animated.multiply(press, rest)).current

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={accessibilityState}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => { if (haptic) hapticTick(); to(0.92) }}
      onPressOut={() => to(1)}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  )
}
