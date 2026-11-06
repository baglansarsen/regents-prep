import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { NATIVE_DRIVER, SPRING } from './tokens'
import { useReducedMotion } from './useReducedMotion'

/**
 * Plays the unlock moment over a path node that just opened
 * (animation-plan.md Phase 3): the lock flies off (scale up, spin, fade) while
 * the node underneath squishes and pops into place. `active` false renders the
 * child untouched. Reduce Motion: the lock simply fades.
 */
export default function UnlockPop({ active, children }) {
  const reduced = useReducedMotion()
  const lock = useRef(new Animated.Value(0)).current   // 0 → 1: lock leaves
  const node = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (!active) return
    lock.setValue(0)
    const lockOut = Animated.timing(lock, { toValue: 1, duration: reduced ? 200 : 480, useNativeDriver: NATIVE_DRIVER })
    const a = reduced ? lockOut : Animated.parallel([
      lockOut,
      Animated.sequence([
        Animated.timing(node, { toValue: 0.82, duration: 120, useNativeDriver: NATIVE_DRIVER }),
        Animated.spring(node, { toValue: 1, ...SPRING.bouncy, useNativeDriver: NATIVE_DRIVER }),
      ]),
    ])
    a.start()
    return () => a.stop()
  }, [active])

  if (!active) return children

  const lockStyle = {
    opacity: lock.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 0.6, 0] }),
    transform: reduced ? [] : [
      { translateY: lock.interpolate({ inputRange: [0, 1], outputRange: [0, -34] }) },
      { scale: lock.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] }) },
      { rotate: lock.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '28deg'] }) },
    ],
  }

  return (
    <View>
      <Animated.View style={{ transform: [{ scale: node }] }}>{children}</Animated.View>
      <Animated.View pointerEvents="none" style={[s.lock, lockStyle]}>
        <Text style={s.lockIcon}>🔒</Text>
      </Animated.View>
    </View>
  )
}

/**
 * Keys present in `now` but not in `before` — nodes that just unlocked.
 * `before` null means "first look" (no animation on initial load).
 */
export function newlyUnlocked(before, now) {
  if (!before) return []
  return now.filter((k) => !before.includes(k))
}

const s = StyleSheet.create({
  lock: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  lockIcon: { fontSize: 30 },
})
