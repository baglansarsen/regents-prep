import React, { useRef, useEffect, useMemo } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
  Animated, Dimensions, ScrollView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { T, duoBtn } from '../styles/duo'

const { width: W, height: H } = Dimensions.get('window')

const COLORS   = ['#FF4B4B', '#FF9600', '#58CC02', '#1CB0F6', '#CE82FF', '#FFC800', '#FF69B4']
const COUNT    = 48

// Stable per-particle config (generated once, never changes)
function makeParticles() {
  return Array.from({ length: COUNT }, (_, i) => ({
    id:        i,
    x:         Math.random() * (W - 10),
    color:     COLORS[Math.floor(Math.random() * COLORS.length)],
    delay:     Math.random() * 700,
    duration:  1800 + Math.random() * 1200,
    size:      6 + Math.random() * 7,           // 6–13 dp
    aspect:    0.4 + Math.random() * 0.8,       // width/height ratio
    rotations: (Math.random() > 0.5 ? 1 : -1)  // clockwise or counter
               * (1 + Math.floor(Math.random() * 3)), // 1–3 full spins
  }))
}

function ConfettiParticle({ x, color, delay, duration, size, aspect, rotations }) {
  const translateY = useRef(new Animated.Value(-size - 10)).current
  const rotate     = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue:         H + size + 20,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue:         1,
          duration,
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }, [])

  const rotateDeg = rotate.interpolate({
    inputRange:  [0, 1],
    outputRange: ['0deg', `${rotations * 360}deg`],
  })

  return (
    <Animated.View
      style={{
        position:        'absolute',
        left:            x,
        top:             0,
        width:           size,
        height:          size * aspect,
        borderRadius:    2,
        backgroundColor: color,
        transform:       [{ translateY }, { rotate: rotateDeg }],
      }}
    />
  )
}

export default function MasteryCelebration({ topic, onDismiss }) {
  const { C } = useTheme()
  const insets = useSafeAreaInsets()

  // Stable particle config — must not change on re-render
  const particles = useMemo(makeParticles, [])

  // Entry animations
  const bgOpacity   = useRef(new Animated.Value(0)).current
  const cardScale   = useRef(new Animated.Value(0.5)).current
  const cardOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bgOpacity, {
        toValue: 1, duration: 220, useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1, tension: 120, friction: 8, useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1, duration: 180, useNativeDriver: true,
      }),
    ]).start()
  }, [])

  // Dismiss with fade-out
  function dismiss() {
    Animated.parallel([
      Animated.timing(bgOpacity,   { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(cardOpacity, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start(onDismiss)
  }

  const s = makeStyles(C, insets)

  return (
    <Animated.View style={[s.overlay, { opacity: bgOpacity }]} pointerEvents="box-none">

      {/* Confetti layer */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {particles.map((p) => (
          <ConfettiParticle key={p.id} {...p} />
        ))}
      </View>

      {/* Card */}
      <Animated.View
        style={[
          s.card,
          {
            opacity:   cardOpacity,
            transform: [{ scale: cardScale }],
          },
        ]}
      >
        {/* Stars */}
        <Text style={s.stars}>⭐⭐⭐</Text>

        {/* Headline */}
        <Text style={[T.h1, { color: C.brand, textAlign: 'center', marginTop: 8 }]}>
          Topic Mastered!
        </Text>

        {/* Topic name */}
        {topic ? (
          <Text style={[T.h2, { color: C.text, textAlign: 'center', marginTop: 6, lineHeight: 28 }]}>
            {topic}
          </Text>
        ) : null}

        {/* Sub-text */}
        <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 12, lineHeight: 22 }]}>
          You've reached 85%+ — this topic is complete!{'\n'}Keep the streak going 🔥
        </Text>

        {/* CTA */}
        <TouchableOpacity
          style={[duoBtn(C.brand, C.brandDark, { marginTop: 28, width: '100%' })]}
          onPress={dismiss}
          activeOpacity={0.85}
        >
          <Text style={[T.btn, { color: '#fff' }]}>🎉  AMAZING!  CONTINUE →</Text>
        </TouchableOpacity>
      </Animated.View>

    </Animated.View>
  )
}

function makeStyles(C, insets) {
  return StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex:          999,
      backgroundColor: C.bg + 'F2',   // ~95% opaque background tint
      alignItems:      'center',
      justifyContent:  'center',
      paddingHorizontal: 28,
      paddingBottom:   insets.bottom + 16,
    },
    card: {
      width:           '100%',
      backgroundColor: C.surface,
      borderRadius:    28,
      padding:         28,
      alignItems:      'center',
      borderWidth:     2,
      borderColor:     C.brand + '40',
      // shadow
      shadowColor:     '#000',
      shadowOffset:    { width: 0, height: 8 },
      shadowOpacity:   0.15,
      shadowRadius:    20,
      elevation:       12,
    },
    stars: {
      fontSize: 44,
      letterSpacing: 8,
    },
  })
}
