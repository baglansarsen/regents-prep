import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { NATIVE_DRIVER } from './tokens'
import { useReducedMotion } from './useReducedMotion'

/**
 * "START" speech-tab that bobs above the current lesson node
 * (animation-plan.md Phase 3). Replaces the old node pulse — one loop per
 * screen. Positioned by the caller (absolute, above the node).
 */
export default function StartCallout({ color, label = 'START', style }) {
  const reduced = useReducedMotion()
  const bob = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (reduced) { bob.setValue(0); return }
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(bob, { toValue: -6, duration: 600, useNativeDriver: NATIVE_DRIVER }),
      Animated.timing(bob, { toValue: 0,  duration: 600, useNativeDriver: NATIVE_DRIVER }),
    ]))
    loop.start()
    return () => loop.stop()
  }, [reduced])

  return (
    <Animated.View
      pointerEvents="none"
      style={[s.wrap, style, { transform: [{ translateY: bob }] }]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={[s.tab, { backgroundColor: '#FFFFFF', borderColor: color }]}>
        <Text style={[s.text, { color }]}>{label}</Text>
      </View>
      <View style={[s.tail, { borderTopColor: color }]} />
    </Animated.View>
  )
}

const s = StyleSheet.create({
  wrap: { alignItems: 'center' },
  tab: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10, borderWidth: 2 },
  text: { fontFamily: 'Fredoka_700Bold', fontSize: 14, letterSpacing: 0.5 },
  tail: {
    width: 0, height: 0, marginTop: -1,
    borderLeftWidth: 7, borderRightWidth: 7, borderTopWidth: 8,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
  },
})
