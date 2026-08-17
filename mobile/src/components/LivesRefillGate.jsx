import React, { useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { T } from '../styles/duo'
import { useCountdown, formatCountdown } from '../hooks/useCountdown'
import ReggieMascot from './ReggieMascot'

/**
 * LivesRefillGate — the "out of energy" recharge sheet, shared by the
 * lesson-start gate (HomeScreen) and the end-of-lesson gate (QuizScreen).
 * User-facing copy says "energy"; the mechanics underneath are still the
 * lives system (see hooks/useLives.js). A bottom card with Reggie, a LIVE
 * ticking countdown to the next free recharge, and actions:
 *   • Watch Ad (full recharge) — primary CTA; disabled→"Loading ad…" if not ready
 *   • Recharge All (300 RP)
 *   • Go Unlimited (premium) — only when `showPremium`
 *   • Dismiss link — label/behavior set by `context` ('start' | 'end')
 *
 * Always dismissable so the ad is never forced.
 *
 * Props:
 *   C, nextRefillAt, adReady, onWatchAd, onRefill (→ Promise<bool>),
 *   showPremium, onGoPremium, onDismiss, context ('start' | 'end')
 */
export default function LivesRefillGate({
  C, nextRefillAt, adReady, onWatchAd, onRefill, showPremium, onGoPremium, onDismiss,
  context = 'end',
}) {
  const insets = useSafeAreaInsets()
  const s = makeStyles(C)
  const secs = useCountdown(nextRefillAt)

  const scaleAnim = useRef(new Animated.Value(0.85)).current
  const opAnim    = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, tension: 130, friction: 8, useNativeDriver: true }),
      Animated.timing(opAnim,    { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start()
  }, [])

  const dismissLabel = context === 'start' ? 'Not now' : 'Continue without recharging'

  return (
    <View style={[StyleSheet.absoluteFill, s.backdrop]}>
      <Animated.View style={[s.card, { opacity: opAnim, transform: [{ scale: scaleAnim }], paddingBottom: insets.bottom + 16 }]}>

        <View style={{ alignItems: 'center', marginBottom: 4 }}>
          <ReggieMascot size={96} pose="sleep" />
        </View>
        <Text style={[T.h2, { color: C.text, textAlign: 'center' }]}>Time to recharge!</Text>
        <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 6, marginBottom: 24 }]}>
          {secs > 0
            ? `Energy refills in ${formatCountdown(secs)} — or get a full recharge now.`
            : 'Your energy is almost back — or get a full recharge now.'}
        </Text>

        {/* Watch ad — full recharge (primary CTA) */}
        {adReady ? (
          <TouchableOpacity style={[s.btn, { backgroundColor: C.brand }]} onPress={onWatchAd} activeOpacity={0.85}>
            <Text style={[T.btn, { color: '#fff' }]}>▶  Watch Ad  (full battery)</Text>
          </TouchableOpacity>
        ) : (
          <View style={[s.btn, { backgroundColor: C.surface2 }]}>
            <Text style={[T.btn, { color: C.textMuted }]}>Loading ad…</Text>
          </View>
        )}

        {/* Recharge with RP */}
        <TouchableOpacity
          style={[s.btn, { backgroundColor: C.warnBg, borderWidth: 1, borderColor: C.warn + '60', marginTop: 10 }]}
          onPress={onRefill}
          activeOpacity={0.85}
        >
          <Text style={[T.btn, { color: C.warn }]}>⭐ Recharge All (300 RP)</Text>
        </TouchableOpacity>

        {/* Go Premium */}
        {showPremium && (
          <TouchableOpacity style={[s.btn, { backgroundColor: C.purple, marginTop: 10 }]} onPress={onGoPremium} activeOpacity={0.85}>
            <Text style={[T.btn, { color: '#fff' }]}>💜 Go Unlimited — unlimited energy</Text>
          </TouchableOpacity>
        )}

        {/* Dismiss */}
        <TouchableOpacity style={s.linkBtn} onPress={onDismiss}>
          <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>{dismissLabel}</Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    backdrop: { backgroundColor: 'rgba(0,0,0,0.72)', justifyContent: 'flex-end', zIndex: 200 },
    card:     { backgroundColor: C.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingTop: 28 },
    btn:      { borderRadius: 16, paddingVertical: 15, alignItems: 'center' },
    linkBtn:  { alignItems: 'center', paddingVertical: 16 },
  })
}
