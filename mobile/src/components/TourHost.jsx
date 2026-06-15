import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useTour } from '../context/TourContext'
import { T, duoBtn } from '../styles/duo'

/**
 * TourHost — the spotlight overlay for the first-run guided tour.
 *
 * Mounted once at the TabNavigator root (sibling of StreakCelebrationHost), so
 * it sits above both the GlobalTopBar and the Home content. For each step it
 * measures the target via the context, dims the screen with 4 cutout Views
 * around it (no SVG mask), draws a highlight ring, and shows a coachmark with
 * Next/Skip. The final step (id === null) is a centered card with full dim.
 *
 * Interaction is view-only: the dim layer swallows taps, only Next/Skip advance.
 */

const DIM = 'rgba(0,0,0,0.62)'
const PAD = 8  // breathing room around the highlighted target

export default function TourHost() {
  const { isActive, activeStepIndex, steps, measureTarget, scrollToTarget, next, skip } = useTour()
  const { C } = useTheme()
  const insets = useSafeAreaInsets()

  const [dims, setDims]           = useState(() => Dimensions.get('window'))
  const [rect, setRect]           = useState(null)
  const [measuring, setMeasuring] = useState(true)
  const fade = useRef(new Animated.Value(0)).current

  const step = isActive ? steps[activeStepIndex] : null

  const remeasure = useCallback(async () => {
    if (!isActive) return
    const cur = steps[activeStepIndex]
    if (!cur || cur.id == null) { setRect(null); setMeasuring(false); return }
    setMeasuring(true)
    // Bring below-the-fold Home targets into view before measuring.
    if (cur.placement === 'auto' || cur.placement === 'top') {
      await scrollToTarget(cur.id)
    }
    const r = await measureTarget(cur.id)
    setRect(r)            // null → graceful centered fallback
    setMeasuring(false)
  }, [isActive, activeStepIndex, steps, measureTarget, scrollToTarget])

  // Measure on step change.
  useEffect(() => { remeasure() }, [remeasure])

  // Fade the overlay in/out.
  useEffect(() => {
    Animated.timing(fade, { toValue: isActive ? 1 : 0, duration: 200, useNativeDriver: true }).start()
  }, [isActive, fade])

  // Re-measure on rotation / dimension change.
  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setDims(window)
      remeasure()
    })
    return () => sub?.remove?.()
  }, [remeasure])

  if (!isActive || !step) return null

  const { height: H } = dims
  const isLast  = activeStepIndex >= steps.length - 1
  const s        = makeStyles(C)
  const surface  = { backgroundColor: C.surface, borderColor: C.brand + '40' }

  // No rect (closing step or a failed measure) → centered card over a full dim.
  const useCenter = step.id == null || (!measuring && !rect)

  const Buttons = (
    <View style={s.btnRow}>
      <TouchableOpacity onPress={skip} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Text style={[s.skip, { color: C.textMuted }]}>Skip</Text>
      </TouchableOpacity>
      <View style={s.dots}>
        {steps.map((_, i) => (
          <View key={i} style={[s.dot, { backgroundColor: i === activeStepIndex ? C.brand : C.border }]} />
        ))}
      </View>
      <TouchableOpacity
        style={duoBtn(C.brand, C.brandDark, { paddingVertical: 10, paddingHorizontal: 22 })}
        onPress={next}
        activeOpacity={0.85}
      >
        <Text style={[T.btn, { color: '#fff', fontSize: 13 }]}>{isLast ? 'Done' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  )

  // ── While measuring a spotlight step: keep the screen dimmed (no flash) ─────
  if (measuring && !useCenter) {
    return (
      <Animated.View style={[StyleSheet.absoluteFill, s.root, { opacity: fade }]}>
        <View style={[StyleSheet.absoluteFill, { backgroundColor: DIM }]} />
      </Animated.View>
    )
  }

  // ── Centered card (closing step or measure fallback) ────────────────────────
  if (useCenter) {
    return (
      <Animated.View style={[StyleSheet.absoluteFill, s.root, { opacity: fade }]}>
        <View style={[StyleSheet.absoluteFill, { backgroundColor: DIM }]} />
        <View style={[s.centerWrap, { paddingBottom: insets.bottom + 24 }]} pointerEvents="box-none">
          <View style={[s.bubble, surface, { maxWidth: 320 }]}>
            <Text style={[T.h2, { color: C.text, textAlign: 'center' }]}>{step.title}</Text>
            <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 8 }]}>{step.body}</Text>
            {Buttons}
          </View>
        </View>
      </Animated.View>
    )
  }

  // ── Spotlight: 4 dim rects + highlight ring + coachmark ─────────────────────
  const hole = {
    x: Math.max(0, rect.x - PAD),
    y: Math.max(0, rect.y - PAD),
    w: rect.width + PAD * 2,
    h: rect.height + PAD * 2,
  }
  const below = (rect.y + rect.height / 2) < H / 2  // target in top half → bubble below

  return (
    <Animated.View style={[StyleSheet.absoluteFill, s.root, { opacity: fade }]}>
      {/* dim: top / bottom / left / right of the hole */}
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, height: hole.y, backgroundColor: DIM }} />
      <View style={{ position: 'absolute', left: 0, right: 0, top: hole.y + hole.h, bottom: 0, backgroundColor: DIM }} />
      <View style={{ position: 'absolute', top: hole.y, height: hole.h, left: 0, width: hole.x, backgroundColor: DIM }} />
      <View style={{ position: 'absolute', top: hole.y, height: hole.h, left: hole.x + hole.w, right: 0, backgroundColor: DIM }} />

      {/* highlight ring */}
      <View
        pointerEvents="none"
        style={{ position: 'absolute', left: hole.x, top: hole.y, width: hole.w, height: hole.h, borderRadius: 14, borderWidth: 2, borderColor: '#fff' }}
      />

      {/* coachmark bubble above/below the hole */}
      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute', left: 16, right: 16,
          ...(below ? { top: hole.y + hole.h + 14 } : { bottom: H - hole.y + 14 }),
        }}
      >
        <View style={[s.bubble, surface]}>
          <Text style={[T.h3, { color: C.text }]}>{step.title}</Text>
          <Text style={[T.body, { color: C.textMuted, marginTop: 6 }]}>{step.body}</Text>
          {Buttons}
        </View>
      </View>
    </Animated.View>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    root: { zIndex: 1000 },
    centerWrap: {
      flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28,
    },
    bubble: {
      borderRadius: 20, padding: 18, borderWidth: 2,
      shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.18, shadowRadius: 16, elevation: 12,
    },
    btnRow: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16,
    },
    skip: { fontFamily: 'Nunito_700Bold', fontSize: 14 },
    dots: { flexDirection: 'row', gap: 6, alignItems: 'center' },
    dot: { width: 6, height: 6, borderRadius: 3 },
  })
}
