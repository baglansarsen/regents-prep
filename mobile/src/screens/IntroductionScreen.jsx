import React, { useRef, useState, useEffect } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, Animated, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { T, duoBtn, cardShadow } from '../styles/duo'

const W_RAW = Dimensions.get('window').width
const H_RAW = Dimensions.get('window').height
const W = Platform.OS === 'web' ? Math.min(Math.max(W_RAW || 360, 320), 480) : W_RAW
const H = Platform.OS === 'web' ? Math.min(Math.max(H_RAW || 800, 568), 850) : H_RAW

// Decorative streak preview shown on the "Consistency" slide
function StreakPreview({ accent }) {
  const flameScale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(flameScale, { toValue: 1.3, duration: 500, useNativeDriver: true }),
        Animated.timing(flameScale, { toValue: 1,   duration: 500, useNativeDriver: true }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [])

  // Example week: 5 studied days, today is 6th (ring), 7th empty
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const state = ['filled', 'filled', 'filled', 'filled', 'filled', 'today', 'empty']

  return (
    <View style={sp.wrap}>
      {/* Flame + count */}
      <View style={sp.row}>
        <Animated.View style={{ transform: [{ scale: flameScale }] }}>
          <Text style={sp.flame}>🔥</Text>
        </Animated.View>
        <Text style={[sp.count, { color: accent }]}>5</Text>
        <Text style={sp.label}>-day streak</Text>
      </View>

      {/* Week dots */}
      <View style={sp.dotsRow}>
        {DAYS.map((day, i) => {
          const filled  = state[i] === 'filled'
          const isToday = state[i] === 'today'
          return (
            <View key={day} style={sp.dayCol}>
              <View style={[
                sp.dot,
                filled  && { backgroundColor: '#f97316' },
                isToday && { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#f97316' },
                !filled && !isToday && { backgroundColor: '#d1d5db' },
              ]}>
                {filled && <Text style={sp.check}>✓</Text>}
              </View>
              <Text style={sp.dayLabel}>{day}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const sp = StyleSheet.create({
  wrap:     { alignItems: 'center', marginBottom: 20 },
  row:      { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 4 },
  flame:    { fontSize: 40 },
  count:    { fontFamily: 'Nunito_900Black', fontSize: 36 },
  label:    { fontFamily: 'Nunito_700Bold', fontSize: 16, color: '#6b7280', marginLeft: 2 },
  dotsRow:  { flexDirection: 'row', gap: 6 },
  dayCol:   { alignItems: 'center', gap: 4 },
  dot: {
    width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#d1d5db',
  },
  check:    { fontSize: 13, color: '#fff' },
  dayLabel: { fontFamily: 'Nunito_700Bold', fontSize: 9, color: '#9ca3af' },
})

export default function IntroductionScreen({ onComplete }) {
  const { C, isDark } = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Opacity, translate, and scale spring animations for smooth slide transitions
  const fadeAnim = useRef(new Animated.Value(1)).current
  const slideAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current

  const nextBtnScale = useRef(new Animated.Value(1)).current
  const skipBtnScale = useRef(new Animated.Value(1)).current

  const glassStyle = Platform.OS === 'web' ? {
    backdropFilter: 'blur(30px)',
    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.65)' : 'rgba(255, 255, 255, 0.65)',
  } : {}

  const SLIDES = [
    {
      emoji: '🚀',
      title: 'Welcome to Regentify!',
      subtitle: 'Learn smarter. Score higher.',
      desc: 'Your ultimate gamified companion custom-built to master New York State Regents exams. Consistency yields success!',
      accent: C.brand || '#58CC02',
    },
    {
      emoji: '🐾',
      title: 'Your Study Buddy',
      subtitle: 'A companion for your journey.',
      desc: 'Pick a cute pet that studies by your side, offers trivia, speaks encouragement, and evolves as you earn study RP.',
      accent: '#FF9600',
    },
    {
      emoji: '🔥',
      title: 'Build Your Streak',
      subtitle: 'One day at a time.',
      desc: 'Open the app daily to keep your flame alive. Miss a day? A 🧊 Streak Freeze has your back.',
      accent: '#f97316',
      streakPreview: true,
    },
    {
      emoji: '🏆',
      title: 'School Pride & Leagues',
      subtitle: 'Compete and win together.',
      desc: 'Join your high school, climb local borough leaderboards, and advance through global leagues against peer rivals.',
      accent: '#CE82FF',
    },
  ]

  function goToSlide(nextIdx) {
    if (nextIdx < 0 || nextIdx >= SLIDES.length) return

    // Slide out
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue:         0,
        duration:        120,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue:         -20,
        duration:        120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue:         0.94,
        duration:        120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentIndex(nextIdx)
      slideAnim.setValue(20)

      // Slide in with organic spring bounce
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue:         1,
          duration:        180,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue:         0,
          duration:        180,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue:         1,
          tension:         160,
          friction:        7,
          useNativeDriver: true,
        }),
      ]).start()
    })
  }

  function handleNext() {
    if (currentIndex === SLIDES.length - 1) {
      onComplete?.()
    } else {
      goToSlide(currentIndex + 1)
    }
  }

  const currentSlide = SLIDES[currentIndex]
  const isLast = currentIndex === SLIDES.length - 1

  const s = makeStyles(C, currentSlide.accent)

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>

        {/* Header absolute actions */}
        <View style={s.header}>
          <Animated.View style={{ transform: [{ scale: skipBtnScale }] }}>
            <TouchableOpacity
              style={s.skipBtn}
              onPress={onComplete}
              activeOpacity={0.7}
              onPressIn={() => {
                Animated.timing(skipBtnScale, {
                  toValue: 0.95,
                  duration: 80,
                  useNativeDriver: true,
                }).start()
              }}
              onPressOut={() => {
                Animated.spring(skipBtnScale, {
                  toValue: 1,
                  tension: 180,
                  friction: 12,
                  useNativeDriver: true,
                }).start()
              }}
            >
              <Text style={s.skipText}>Skip</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Animated Slide Content Card */}
        <Animated.View
          style={[
            s.card,
            cardShadow(C.shadow),
            glassStyle,
            {
              opacity:   fadeAnim,
              transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          {/* Emoji circle OR streak preview */}
          {currentSlide.streakPreview ? (
            <StreakPreview accent={currentSlide.accent} />
          ) : (
            <View style={s.emojiCircle}>
              <Text style={s.emoji}>{currentSlide.emoji}</Text>
            </View>
          )}

          {/* Titles */}
          <Text style={[T.h1, s.title]}>{currentSlide.title}</Text>
          <Text style={[T.label, s.subtitle]}>{currentSlide.subtitle}</Text>

          {/* Description */}
          <Text style={[T.body, s.desc]}>{currentSlide.desc}</Text>

          {/* Progress Indicators */}
          <View style={s.dotsRow}>
            {SLIDES.map((_, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => goToSlide(idx)}
                style={[
                  s.dot,
                  currentIndex === idx ? s.dotActive : s.dotInactive,
                ]}
                activeOpacity={0.8}
              />
            ))}
          </View>
        </Animated.View>

        {/* Bottom CTA Action Bar */}
        <View style={s.footer}>
          <Animated.View style={{ transform: [{ scale: nextBtnScale }], width: '100%' }}>
            <TouchableOpacity
              style={duoBtn(currentSlide.accent, C.brandDark || '#3D9B00', { width: '100%' })}
              onPress={handleNext}
              activeOpacity={0.85}
              onPressIn={() => {
                Animated.timing(nextBtnScale, {
                  toValue: 0.96,
                  duration: 80,
                  useNativeDriver: true,
                }).start()
              }}
              onPressOut={() => {
                Animated.spring(nextBtnScale, {
                  toValue: 1,
                  tension: 180,
                  friction: 12,
                  useNativeDriver: true,
                }).start()
              }}
            >
              <Text style={[T.btn, { color: '#fff' }]}>
                {isLast ? 'GET STARTED 🚀' : 'NEXT →'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

      </SafeAreaView>
    </View>
  )
}

function makeStyles(C, activeAccent) {
  return StyleSheet.create({
    root: {
      flex:            1,
      backgroundColor: C.bg,
      alignItems:      'center',
      justifyContent:  'center',
    },
    safe: {
      width:             '100%',
      maxWidth:          480,
      flex:              1,
      justifyContent:    'space-between',
      paddingHorizontal: 24,
    },
    header: {
      width:          '100%',
      flexDirection:  'row',
      justifyContent: 'flex-end',
      paddingTop:     16,
      height:         54,
    },
    skipBtn: {
      paddingVertical:   6,
      paddingHorizontal: 14,
      borderRadius:      20,
      backgroundColor:   C.surface2,
      borderWidth:       1,
      borderColor:       C.border,
    },
    skipText: {
      fontFamily: 'Nunito_700Bold',
      fontSize:   13,
      color:      C.textMuted,
    },
    card: {
      backgroundColor:   C.surface,
      borderRadius:      28,
      padding:           28,
      alignItems:        'center',
      borderWidth:       2.5,
      borderColor:       activeAccent + '35',
      marginVertical:    12,
      width:             '100%',
      position:          'relative',
    },
    emojiCircle: {
      width:           96,
      height:          96,
      borderRadius:    48,
      backgroundColor: activeAccent + '15',
      alignItems:      'center',
      justifyContent:  'center',
      borderWidth:     2,
      borderColor:     activeAccent + '30',
      marginBottom:    20,
    },
    emoji: {
      fontSize: 48,
    },
    title: {
      textAlign:    'center',
      color:        C.text,
      fontSize:     24,
      fontFamily:   'Nunito_900Black',
      lineHeight:   30,
      marginBottom: 6,
    },
    subtitle: {
      textAlign:    'center',
      color:        activeAccent,
      marginBottom: 20,
    },
    desc: {
      textAlign:    'center',
      color:        C.textMuted,
      lineHeight:   22,
      fontSize:     15,
      marginBottom: 32,
    },
    dotsRow: {
      flexDirection:  'row',
      gap:            8,
      justifyContent: 'center',
      alignItems:     'center',
    },
    dot: {
      height:       8,
      borderRadius: 4,
    },
    dotActive: {
      width:           20,
      backgroundColor: activeAccent,
    },
    dotInactive: {
      width:           8,
      backgroundColor: C.surface3 || C.border,
      opacity:         0.55,
    },
    footer: {
      width:         '100%',
      paddingBottom: 24,
    },
  })
}
