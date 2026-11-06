import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import { NATIVE_DRIVER, SPRING } from './tokens'
import { useReducedMotion } from './useReducedMotion'

/**
 * Lesson progress bar that springs to its value (transform only — never
 * animates width), sweeps a sheen across the fill each time `sheenKey`
 * changes (a correct answer), and pulses gently while `glow` is on (a combo).
 */
export default function ProgressBar({
  progress = 0, color, trackColor, height = 14, sheenKey = 0, glow = false, style,
}) {
  const reduced = useReducedMotion()
  const [w, setW] = useState(0)
  const p = useRef(new Animated.Value(progress)).current
  const sheen = useRef(new Animated.Value(0)).current
  const pulse = useRef(new Animated.Value(1)).current
  const first = useRef(true)

  useEffect(() => {
    if (reduced) { p.setValue(progress); return }
    const a = Animated.spring(p, { toValue: progress, ...SPRING.gentle, useNativeDriver: NATIVE_DRIVER })
    a.start()
    return () => a.stop()
  }, [progress, reduced])

  useEffect(() => {
    if (first.current) { first.current = false; return }   // no sheen on mount
    if (reduced || !w) return
    sheen.setValue(0)
    const a = Animated.timing(sheen, { toValue: 1, duration: 650, delay: 120, easing: Easing.out(Easing.cubic), useNativeDriver: NATIVE_DRIVER })
    a.start()
    return () => a.stop()
  }, [sheenKey])

  useEffect(() => {
    if (!glow || reduced) { pulse.setValue(1); return }
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 0.72, duration: 520, useNativeDriver: NATIVE_DRIVER }),
      Animated.timing(pulse, { toValue: 1,    duration: 520, useNativeDriver: NATIVE_DRIVER }),
    ]))
    loop.start()
    return () => loop.stop()
  }, [glow, reduced])

  // Slide a full-width fill in from the left: translateX = -(1 - p) * w.
  const translateX = p.interpolate({ inputRange: [0, 1], outputRange: [-w, 0], extrapolate: 'clamp' })
  const sheenX = sheen.interpolate({ inputRange: [0, 1], outputRange: [-60, w] })

  return (
    <View
      style={[s.track, { height, borderRadius: height / 2, backgroundColor: trackColor }, style]}
      onLayout={(e) => setW(e.nativeEvent.layout.width)}
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
      // RN-web ignores accessibilityValue; the aria-value* props reach the DOM.
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      {w > 0 && (
        <Animated.View
          style={[s.fill, { borderRadius: height / 2, backgroundColor: color, opacity: pulse, transform: [{ translateX }] }]}
        >
          <Animated.View
            pointerEvents="none"
            style={[s.sheen, { height, transform: [{ translateX: sheenX }, { skewX: '-20deg' }] }]}
          />
        </Animated.View>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  track: { overflow: 'hidden' },
  fill: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  sheen: { position: 'absolute', top: 0, left: 0, width: 36, backgroundColor: 'rgba(255,255,255,0.45)' },
})
