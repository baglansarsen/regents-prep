import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { NATIVE_DRIVER, SPRING } from './tokens'
import { useReducedMotion } from './useReducedMotion'

/**
 * Hidden until `shown`, then rises into place (translateY + scale + fade).
 * `from` picks the entrance: 'up' (default), 'pop' (score ring), 'stamp'
 * (big → normal with a tilt, for "Perfect!"). Reduce Motion → fade only.
 * Keeps its layout space while hidden so later items don't jump.
 */
export default function Reveal({ shown, from = 'up', style, children, pointerEvents }) {
  const reduced = useReducedMotion()
  const t = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!shown) { t.setValue(0); return }
    const a = reduced
      ? Animated.timing(t, { toValue: 1, duration: 180, useNativeDriver: NATIVE_DRIVER })
      : Animated.spring(t, { toValue: 1, ...SPRING.bouncy, useNativeDriver: NATIVE_DRIVER })
    a.start()
    return () => a.stop()
  }, [shown, reduced])

  const opacity = t.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 1], extrapolate: 'clamp' })
  let transform = []
  if (!reduced) {
    if (from === 'pop') {
      transform = [{ scale: t.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }]
    } else if (from === 'stamp') {
      transform = [
        { scale: t.interpolate({ inputRange: [0, 1], outputRange: [1.6, 1] }) },
        { rotate: t.interpolate({ inputRange: [0, 1], outputRange: ['-14deg', '-6deg'] }) },
      ]
    } else {
      transform = [
        { translateY: t.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) },
        { scale: t.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) },
      ]
    }
  }

  return (
    <Animated.View
      style={[style, { opacity, transform }]}
      pointerEvents={pointerEvents ?? (shown ? 'auto' : 'none')}
    >
      {children}
    </Animated.View>
  )
}
