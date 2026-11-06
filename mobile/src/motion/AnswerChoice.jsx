import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { NATIVE_DRIVER, SPRING } from './tokens'
import { useReducedMotion } from './useReducedMotion'

/**
 * Motion wrapper for a quiz answer card (animation-plan.md Phase 1).
 *
 *   selected  → quick pop as it's picked
 *   verdict   'correct' → celebratory pop (1 → 1.06 → 1)
 *             'wrong'   → horizontal shake (~300ms)
 *             'reveal'  → the right answer after a miss: gentle pulse, 150ms later
 *
 * Colours stay with the caller's styles; this only moves the card. Under Reduce
 * Motion nothing moves (the colour change still carries the verdict).
 */
export default function AnswerChoice({ selected = false, verdict = null, children, style }) {
  const reduced = useReducedMotion()
  const scale = useRef(new Animated.Value(1)).current
  const shakeX = useRef(new Animated.Value(0)).current

  const spring = (toValue, cfg = SPRING.bouncy) =>
    Animated.spring(scale, { toValue, ...cfg, useNativeDriver: NATIVE_DRIVER })

  useEffect(() => {
    if (!selected || verdict || reduced) return
    scale.setValue(0.96)
    const a = spring(1, SPRING.snappy)
    a.start()
    return () => a.stop()
  }, [selected])

  useEffect(() => {
    if (!verdict || reduced) return
    let a
    if (verdict === 'correct') {
      a = Animated.sequence([spring(1.06), spring(1)])
    } else if (verdict === 'wrong') {
      const step = (toValue) => Animated.timing(shakeX, { toValue, duration: 50, useNativeDriver: NATIVE_DRIVER })
      a = Animated.sequence([step(8), step(-8), step(6), step(-6), step(3), step(0)])
    } else if (verdict === 'reveal') {
      a = Animated.sequence([Animated.delay(150), spring(1.04), spring(1)])
    }
    a?.start()
    return () => a?.stop()
  }, [verdict])

  return (
    <Animated.View style={[style, { transform: [{ translateX: shakeX }, { scale }] }]}>
      {children}
    </Animated.View>
  )
}

/** Which verdict an answer card shows once the question is checked. */
export function verdictFor(idx, { phase, selected, correctIdx }) {
  if (phase !== 'feedback') return null
  if (idx === selected) return idx === correctIdx ? 'correct' : 'wrong'
  if (idx === correctIdx && selected != null) return 'reveal'
  return null
}
