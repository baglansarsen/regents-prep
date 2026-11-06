import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import { NATIVE_DRIVER, SPRING } from './tokens'
import { useReducedMotion } from './useReducedMotion'
import { hapticTick } from '../utils/haptics'

/**
 * Rewards travel (animation-plan.md Phase 4): particles arc from where a
 * reward was earned to the top-bar chip that counts it, and the chip bumps as
 * each one lands.
 *
 *   <RewardFlightProvider>…app…</RewardFlightProvider>          (once, above both ends)
 *   const bump = useFlightTarget('rp', chipRef)                    (the chip)
 *   <Animated.View style={{ transform: [{ scale: bump }] }}>…
 *   const { fly } = useRewardFlight()
 *   fly({ fromRef: bannerRef, to: 'rp', icon: '⭐', count: 6 })   (the source)
 *
 * Coordinates come from measureInWindow; the overlay fills the provider, which
 * must sit at the window origin (the tab navigator root does).
 */

const FlightContext = createContext(null)
const FLIGHT_MS = 720
const STAGGER_MS = 70

function Particle({ p, onDone }) {
  const t = useRef(new Animated.Value(0)).current
  React.useEffect(() => {
    const a = Animated.timing(t, {
      toValue: 1, duration: FLIGHT_MS, delay: p.delay,
      easing: Easing.inOut(Easing.cubic), useNativeDriver: NATIVE_DRIVER,
    })
    a.start(({ finished }) => finished && onDone(p))
    return () => a.stop()
  }, [])

  const midX = (p.from.x + p.to.x) / 2 + p.swing
  const midY = Math.min(p.from.y, p.to.y) - p.arc
  const translateX = t.interpolate({ inputRange: [0, 0.5, 1], outputRange: [p.from.x, midX, p.to.x] })
  const translateY = t.interpolate({ inputRange: [0, 0.5, 1], outputRange: [p.from.y, midY, p.to.y] })
  const scale = t.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0.4, 1.15, 0.6] })
  const opacity = t.interpolate({ inputRange: [0, 0.1, 0.9, 1], outputRange: [0, 1, 1, 0] })

  return (
    <Animated.View style={[s.particle, { opacity, transform: [{ translateX }, { translateY }, { scale }] }]}>
      <Text style={s.icon}>{p.icon}</Text>
    </Animated.View>
  )
}

export function RewardFlightProvider({ children }) {
  const reduced = useReducedMotion()
  const targets = useRef({})          // name → ref
  const bumps = useRef({})            // name → Animated.Value
  const [particles, setParticles] = useState([])
  const nextId = useRef(0)

  const bumpOf = (name) => {
    if (!bumps.current[name]) bumps.current[name] = new Animated.Value(1)
    return bumps.current[name]
  }

  const land = useCallback((p) => {
    setParticles((list) => list.filter((x) => x.id !== p.id))
    const b = bumpOf(p.to.name)
    b.setValue(1.28)
    Animated.spring(b, { toValue: 1, ...SPRING.bouncy, useNativeDriver: NATIVE_DRIVER }).start()
    if (p.last) hapticTick()
  }, [])

  const fly = useCallback(({ fromRef, to, icon = '⭐', count = 6 }) => {
    const target = targets.current[to]?.current
    const source = fromRef?.current
    if (reduced || !target?.measureInWindow || !source?.measureInWindow) return
    source.measureInWindow((sx, sy, sw, sh) => {
      target.measureInWindow((tx, ty, tw, th) => {
        if (!tw && !th) return                       // target not laid out (hidden)
        const from = { x: sx + sw / 2 - 12, y: sy + sh / 2 - 12 }
        const dest = { x: tx + tw / 2 - 12, y: ty + th / 2 - 12, name: to }
        const batch = Array.from({ length: count }, (_, i) => ({
          id: nextId.current++,
          icon,
          from: { x: from.x + (i - count / 2) * 9, y: from.y },
          to: dest,
          delay: i * STAGGER_MS,
          arc: 60 + (i % 3) * 22,
          swing: (i % 2 ? 1 : -1) * (20 + i * 4),
          last: i === count - 1,
        }))
        setParticles((list) => [...list, ...batch])
      })
    })
  }, [reduced])

  const api = useMemo(() => ({
    fly,
    registerTarget: (name, ref) => { targets.current[name] = ref },
    unregisterTarget: (name, ref) => { if (targets.current[name] === ref) delete targets.current[name] },
    bumpOf,
  }), [fly])

  return (
    <FlightContext.Provider value={api}>
      <View style={s.fill}>
        {children}
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          {particles.map((p) => <Particle key={p.id} p={p} onDone={land} />)}
        </View>
      </View>
    </FlightContext.Provider>
  )
}

const NOOP = { fly: () => {}, registerTarget: () => {}, unregisterTarget: () => {}, bumpOf: () => new Animated.Value(1) }

/** { fly } — safe to call outside a provider (no-op). */
export function useRewardFlight() {
  return useContext(FlightContext) ?? NOOP
}

/**
 * Registers `ref` as the landing spot for `name` and returns the Animated
 * scale to apply to the chip so it bumps when rewards land.
 */
export function useFlightTarget(name, ref) {
  const ctx = useRewardFlight()
  React.useEffect(() => {
    ctx.registerTarget(name, ref)
    return () => ctx.unregisterTarget(name, ref)
  }, [ctx, name, ref])
  return useMemo(() => ctx.bumpOf(name), [ctx, name])
}

const s = StyleSheet.create({
  fill: { flex: 1 },
  particle: { position: 'absolute', top: 0, left: 0, width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 20 },
})
