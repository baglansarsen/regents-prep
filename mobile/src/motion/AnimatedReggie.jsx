import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'
import ReggieMascot, { BLINKABLE_EYES } from '../components/ReggieMascot'
import { POSES } from '../components/reggie/reggieCharacter'
import { NATIVE_DRIVER, SPRING } from './tokens'
import { useReducedMotion } from './useReducedMotion'

/**
 * Reggie, alive (animation-plan.md Phase 5) — a drop-in for <ReggieMascot>:
 *   · idle breathe: scaleY 1 → 1.025 from his feet, 2.4s loop
 *   · blink: eyes close for ~130ms every 3–6s (open-eyed poses only)
 *   · pose change: 120ms cross-fade with a squash-and-stretch
 * Reduce Motion: no breathing or squash; poses cross-fade, blinks stay
 * (a blink is not movement across the screen).
 */
export default function AnimatedReggie({ pose = 'idle', size = 120, avatar = false, breathe = true, style }) {
  const reduced = useReducedMotion()
  const breath = useRef(new Animated.Value(0)).current
  const squash = useRef(new Animated.Value(1)).current
  const fade = useRef(new Animated.Value(1)).current
  const [prevPose, setPrevPose] = useState(null)
  const lastPose = useRef(pose)
  const [blink, setBlink] = useState(false)

  // Breathing
  useEffect(() => {
    if (!breathe || reduced) { breath.setValue(0); return }
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(breath, { toValue: 1, duration: 1200, useNativeDriver: NATIVE_DRIVER }),
      Animated.timing(breath, { toValue: 0, duration: 1200, useNativeDriver: NATIVE_DRIVER }),
    ]))
    loop.start()
    return () => loop.stop()
  }, [breathe, reduced])

  // Blinking — random 3–6s gaps; only for poses whose eyes are open.
  const canBlink = BLINKABLE_EYES.includes((POSES[pose] || POSES.idle).eye)
  useEffect(() => {
    if (!canBlink) { setBlink(false); return }
    let open, close
    const schedule = () => {
      close = setTimeout(() => {
        setBlink(true)
        open = setTimeout(() => { setBlink(false); schedule() }, 130)
      }, 3000 + Math.random() * 3000)
    }
    schedule()
    return () => { clearTimeout(open); clearTimeout(close) }
  }, [canBlink])

  // Pose change → cross-fade the old pose out over the new, with a squash.
  useEffect(() => {
    if (lastPose.current === pose) return
    setPrevPose(lastPose.current)
    lastPose.current = pose
    fade.setValue(0)
    const anims = [Animated.timing(fade, { toValue: 1, duration: 120, useNativeDriver: NATIVE_DRIVER })]
    if (!reduced) {
      squash.setValue(0.9)
      anims.push(Animated.sequence([
        Animated.timing(squash, { toValue: 1.05, duration: 110, useNativeDriver: NATIVE_DRIVER }),
        Animated.spring(squash, { toValue: 1, ...SPRING.bouncy, useNativeDriver: NATIVE_DRIVER }),
      ]))
    }
    const a = Animated.parallel(anims)
    a.start(() => setPrevPose(null))
    return () => a.stop()
  }, [pose])

  const scaleY = useRef(Animated.multiply(
    squash,
    breath.interpolate({ inputRange: [0, 1], outputRange: [1, 1.025] }),
  )).current

  return (
    <Animated.View
      style={[{ width: size, height: size }, style, { transformOrigin: 'bottom', transform: [{ scaleY }] }]}
    >
      {prevPose && (
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: fade.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]}>
          <ReggieMascot pose={prevPose} size={size} avatar={avatar} />
        </Animated.View>
      )}
      <Animated.View style={{ opacity: fade }}>
        <ReggieMascot pose={pose} size={size} avatar={avatar} blink={blink} />
      </Animated.View>
    </Animated.View>
  )
}

/**
 * const [pose, react] = useReggieReaction('idle')
 * react('encourage')          // shows for 1.6s, then back to 'idle'
 * react('oops', 2400)
 */
export function useReggieReaction(basePose = 'idle') {
  const [pose, setPose] = useState(basePose)
  const timer = useRef(null)
  useEffect(() => { setPose(basePose) }, [basePose])
  useEffect(() => () => clearTimeout(timer.current), [])
  const react = useCallback((next, ms = 1600) => {
    clearTimeout(timer.current)
    setPose(next)
    timer.current = setTimeout(() => setPose(basePose), ms)
  }, [basePose])
  return [pose, react]
}
