import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, Easing, StyleSheet, View, useWindowDimensions } from 'react-native'
import { NATIVE_DRIVER } from './tokens'
import { useReducedMotion } from './useReducedMotion'

// The one confetti for the app (replaces the copies that lived in
// MasteryCelebration and StreakCelebration). Escalate by intensity, never by
// copying the component — animation-plan.md §2.4.

export const BURST_COUNT = { small: 16, medium: 28, large: 48 }
export const BURST_COLORS = ['#FFD34E', '#FF7A00', '#1FC36B', '#34B3F1', '#EC4899', '#7C5CFC', '#FF5A5F']

export function makeParticles(count, colors = BURST_COLORS, rand = Math.random) {
  return Array.from({ length: count }, (_, i) => ({
    id:        i,
    xFrac:     rand(),                                  // × live window width
    size:      6 + rand() * 7,                          // 6–13pt
    aspect:    0.45 + rand() * 0.8,                     // height / width
    rounded:   rand() > 0.6,
    color:     colors[i % colors.length],
    delay:     rand() * 450,
    duration:  1500 + rand() * 1100,
    drift:     (rand() - 0.5) * 120,
    spin:      (rand() > 0.5 ? 1 : -1) * (360 + Math.floor(rand() * 3) * 360),
  }))
}

function Particle({ p, W, fallTo, run }) {
  const t = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!run) return
    t.setValue(0)
    const a = Animated.timing(t, {
      toValue: 1, duration: p.duration, delay: p.delay,
      easing: Easing.in(Easing.quad), useNativeDriver: NATIVE_DRIVER,
    })
    a.start()
    return () => a.stop()
  }, [run])

  const translateY = t.interpolate({ inputRange: [0, 1], outputRange: [-p.size - 20, fallTo] })
  const translateX = t.interpolate({ inputRange: [0, 1], outputRange: [0, p.drift] })
  const rotate     = t.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${p.spin}deg`] })
  const opacity    = t.interpolate({ inputRange: [0, 0.85, 1], outputRange: [1, 1, 0] })

  return (
    <Animated.View
      style={{
        position: 'absolute', top: 0, left: p.xFrac * Math.max(0, W - p.size),
        width: p.size, height: p.size * p.aspect,
        borderRadius: p.rounded ? p.size / 2 : 2,
        backgroundColor: p.color,
        opacity,
        transform: [{ translateY }, { translateX }, { rotate }],
      }}
    />
  )
}

/**
 * <Burst run intensity="medium" />
 * run        start (or restart) the burst
 * intensity  'small' | 'medium' | 'large' (or pass count)
 * fall       fraction of window height the pieces fall to (default 1 = off-screen)
 */
export default function Burst({ run = true, intensity = 'medium', count, colors, fall = 1 }) {
  const reduced = useReducedMotion()
  const { width: W, height: H } = useWindowDimensions()
  const n = count ?? BURST_COUNT[intensity] ?? BURST_COUNT.medium
  const particles = useMemo(() => makeParticles(n, colors), [n, colors])

  if (!run || reduced) return null
  const fallTo = fall >= 1 ? H + 20 : H * fall

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill} testID="burst">
      {particles.map((p) => <Particle key={p.id} p={p} W={W} fallTo={fallTo} run={run} />)}
    </View>
  )
}
