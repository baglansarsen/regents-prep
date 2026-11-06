import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Modal, StyleSheet, Text, View } from 'react-native'
import Svg, { Polygon } from 'react-native-svg'
import { T } from '../styles/duo'
import { NATIVE_DRIVER, SPRING } from './tokens'
import { useReducedMotion } from './useReducedMotion'
import Burst from './Burst'
import PressableDuo from './PressableDuo'
import { hapticHeavy } from '../utils/haptics'

const RAYS = 12
const RAY_SIZE = 360

function Rays({ color }) {
  const c = RAY_SIZE / 2
  const pts = Array.from({ length: RAYS }, (_, i) => {
    const a0 = (i / RAYS) * Math.PI * 2
    const a1 = a0 + (Math.PI / RAYS) * 0.9
    return `${c},${c} ${c + Math.cos(a0) * c},${c + Math.sin(a0) * c} ${c + Math.cos(a1) * c},${c + Math.sin(a1) * c}`
  })
  return (
    <Svg width={RAY_SIZE} height={RAY_SIZE}>
      {pts.map((p, i) => <Polygon key={i} points={p} fill={color} opacity={0.18} />)}
    </Svg>
  )
}

/**
 * Full-screen level-up moment (animation-plan.md Phase 4): rays turn slowly
 * behind a badge that springs in, confetti, heavy haptic. Shown once per level
 * (the caller clears useRP's @levelUp flag).
 */
export default function LevelUpCelebration({ visible, levelName, bonusRP, C, onClose }) {
  const reduced = useReducedMotion()
  const badge = useRef(new Animated.Value(0)).current
  const spin = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!visible) return
    hapticHeavy()
    badge.setValue(reduced ? 1 : 0)
    const anims = []
    if (!reduced) {
      anims.push(Animated.spring(badge, { toValue: 1, ...SPRING.bouncy, useNativeDriver: NATIVE_DRIVER }))
      anims.push(Animated.loop(Animated.timing(spin, { toValue: 1, duration: 16000, easing: Easing.linear, useNativeDriver: NATIVE_DRIVER })))
    }
    anims.forEach((a) => a.start())
    return () => anims.forEach((a) => a.stop())
  }, [visible, reduced])

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] })
  const scale = badge.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] })

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={[s.backdrop, { backgroundColor: 'rgba(0,0,0,0.88)' }]}>
        <Burst run={visible} intensity="large" />
        <View style={s.center}>
          <Animated.View style={[s.rays, { transform: [{ rotate }] }]} pointerEvents="none">
            <Rays color={C.warn} />
          </Animated.View>
          <Animated.View style={{ alignItems: 'center', opacity: badge, transform: [{ scale }] }}>
            <View style={[s.medal, { backgroundColor: C.warn, borderColor: '#FFFFFF' }]}>
              <Text style={s.trophy}>🏆</Text>
            </View>
            <Text style={[T.h2, s.white, { marginTop: 18 }]}>Level up!</Text>
            <Text style={[T.body, { color: 'rgba(255,255,255,0.8)', marginTop: 4 }]}>You've reached</Text>
            <Text style={[T.h1, { color: C.warn, marginTop: 2, textAlign: 'center' }]}>{levelName}</Text>
            {bonusRP ? (
              <Text style={[T.small, { color: 'rgba(255,255,255,0.75)', marginTop: 8 }]}>+{bonusRP} bonus RP 🎁</Text>
            ) : null}
          </Animated.View>
        </View>
        <PressableDuo color={C.brand} darkColor={C.brandDark} onPress={onClose} style={s.cta}>
          <Text style={[T.btn, { color: '#fff' }]}>AWESOME! 🚀</Text>
        </PressableDuo>
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  backdrop: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  center: { alignItems: 'center', justifyContent: 'center', minHeight: RAY_SIZE },
  rays: { position: 'absolute', width: RAY_SIZE, height: RAY_SIZE },
  medal: { width: 116, height: 116, borderRadius: 58, borderWidth: 5, alignItems: 'center', justifyContent: 'center' },
  trophy: { fontSize: 58 },
  white: { color: '#FFFFFF' },
  cta: { alignSelf: 'stretch', marginTop: 12, maxWidth: 420, width: '100%' },
})
