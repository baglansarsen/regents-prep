import React, { useRef, useEffect } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
  Animated, ScrollView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { T, duoBtn } from '../styles/duo'
import Burst from '../motion/Burst'


export default function MasteryCelebration({ topic, onDismiss }) {
  const { C } = useTheme()
  const insets = useSafeAreaInsets()

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
      <Burst intensity="large" />

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
