/**
 * ThemePickerScreen
 *
 * Shown exactly once on first launch, before the login screen.
 * Lets the user tap Light or Dark (with a live preview of both options)
 * then calls pickTheme() — which persists the choice and marks it done
 * so AppNavigator never shows this screen again.
 */
import React, { useRef, useState } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
  Dimensions, Animated, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { dark, light } from '../theme'
import { T } from '../styles/duo'

const W_RAW = Dimensions.get('window').width
const H_RAW = Dimensions.get('window').height
const W = Platform.OS === 'web' ? Math.min(Math.max(W_RAW || 360, 320), 480) : W_RAW
const H = Platform.OS === 'web' ? Math.min(Math.max(H_RAW || 800, 568), 850) : H_RAW

// ── Mini phone mockup previewing a theme ─────────────────────────────────────
function PhoneMockup({ colors, label, selected, onPress, scale }) {
  const C = colors
  return (
    <Animated.View style={[styles.mockupWrap, { transform: [{ scale }] }]}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        style={[
          styles.mockupOuter,
          {
            borderColor: selected ? '#58CC02' : C.border,
            borderWidth: selected ? 3 : 1.5,
            shadowColor: selected ? '#58CC02' : '#000',
            shadowOpacity: selected ? 0.35 : 0.12,
            shadowRadius: selected ? 16 : 6,
            shadowOffset: { width: 0, height: 4 },
            elevation: selected ? 10 : 3,
          },
        ]}
      >
        {/* Phone body */}
        <View style={[styles.mockupBody, { backgroundColor: C.bg }]}>

          {/* Top bar (simulates GlobalTopBar) */}
          <View style={[styles.mTop, { backgroundColor: '#16a34a' }]}>
            <View style={[styles.mPill, { backgroundColor: 'rgba(255,255,255,0.25)' }]} />
            <View style={styles.mStats}>
              {['🔥 5', '⭐ 340', '❤️❤️❤️'].map((t) => (
                <Text key={t} style={styles.mStatText}>{t}</Text>
              ))}
            </View>
          </View>

          {/* Simulated topic nodes */}
          <View style={[styles.mContent, { backgroundColor: C.bg }]}>
            {[
              { left: 30, color: '#58CC02', locked: false },
              { left: 90, color: '#58CC02', locked: false },
              { left: 30, color: '#9CA3AF', locked: true  },
            ].map((node, i) => (
              <View
                key={i}
                style={[
                  styles.mNode,
                  {
                    left: node.left,
                    backgroundColor: node.locked ? C.surface2 : node.color,
                    borderColor: node.locked ? C.border : node.color + 'AA',
                  },
                ]}
              />
            ))}

            {/* Simulated card */}
            <View style={[styles.mCard, { backgroundColor: C.surface, borderColor: C.border }]}>
              <View style={[styles.mCardLine, { backgroundColor: C.surface2, width: '80%' }]} />
              <View style={[styles.mCardLine, { backgroundColor: C.surface2, width: '55%', marginTop: 5 }]} />
            </View>
          </View>

          {/* Tab bar */}
          <View style={[styles.mTabBar, { backgroundColor: C.surface, borderTopColor: C.border }]}>
            {['🏠', '📊', '👥', '👤'].map((icon, i) => (
              <Text key={i} style={[styles.mTabIcon, { opacity: i === 0 ? 1 : 0.35 }]}>{icon}</Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>

      {/* Label + checkmark */}
      <View style={styles.mockupLabelRow}>
        {selected && (
          <View style={styles.checkCircle}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        )}
        <Text style={[T.h3, { color: selected ? '#58CC02' : '#6B7280' }]}>{label}</Text>
      </View>
    </Animated.View>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function ThemePickerScreen({ onComplete }) {
  const { pickTheme } = useTheme()
  const [chosen, setChosen] = useState(null)  // 'light' | 'dark' | null

  // Scale animations — selected card pops up, other shrinks
  const lightScale = useRef(new Animated.Value(1)).current
  const darkScale  = useRef(new Animated.Value(1)).current

  function selectTheme(mode) {
    setChosen(mode)
    const [sel, other] = mode === 'light'
      ? [lightScale, darkScale]
      : [darkScale, lightScale]

    Animated.parallel([
      Animated.spring(sel,   { toValue: 1.06, tension: 180, friction: 8, useNativeDriver: true }),
      Animated.spring(other, { toValue: 0.94, tension: 180, friction: 8, useNativeDriver: true }),
    ]).start()
  }

  async function handleContinue() {
    const mode = chosen ?? 'system'
    // Optimistically update and mark as complete
    // We don't await here to avoid UI hang if AsyncStorage is slow,
    // as pickTheme now updates state immediately.
    pickTheme(mode)
  }

  // The outer container uses a neutral mid-tone so both previews look good
  const bgColor = '#1a1a2e'

  return (
    <View style={[styles.root, { backgroundColor: bgColor }]}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>

        {/* Hero text */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🦉</Text>
          <Text style={styles.heroTitle}>Choose your look</Text>
          <Text style={styles.heroSub}>You can change this any time in your profile.</Text>
        </View>

        {/* Side-by-side phone mockups */}
        <View style={styles.mockupsRow}>
          <PhoneMockup
            colors={light}
            label="Light"
            selected={chosen === 'light'}
            onPress={() => selectTheme('light')}
            scale={lightScale}
          />
          <PhoneMockup
            colors={dark}
            label="Dark"
            selected={chosen === 'dark'}
            onPress={() => selectTheme('dark')}
            scale={darkScale}
          />
        </View>

        {/* CTA */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueBtn,
              { backgroundColor: chosen ? '#58CC02' : 'rgba(255,255,255,0.12)' },
            ]}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={[styles.continueBtnText, { color: chosen ? '#fff' : 'rgba(255,255,255,0.5)' }]}>
              {chosen ? 'CONTINUE →' : 'USE SYSTEM DEFAULT →'}
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  )
}

const MOCKUP_W = (W - 64) / 2    // two columns with 16px gutters
const MOCKUP_H = MOCKUP_W * 1.88 // ~iPhone aspect ratio

const styles = StyleSheet.create({
  root:   { flex: 1 },
  safe:   { flex: 1, justifyContent: 'space-between' },

  hero: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 8,
  },
  heroEmoji: { fontSize: 52, marginBottom: 12 },
  heroTitle: {
    fontSize: 28,
    fontFamily: 'Nunito_900Black',
    color: '#fff',
    textAlign: 'center',
  },
  heroSub: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: 'rgba(255,255,255,0.55)',
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 32,
  },

  mockupsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
  },

  mockupWrap: {
    alignItems: 'center',
    gap: 12,
  },
  mockupOuter: {
    width: MOCKUP_W,
    height: MOCKUP_H,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  mockupBody: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
  },

  // Top bar
  mTop: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  mPill: { width: 32, height: 14, borderRadius: 7 },
  mStats: { flexDirection: 'row', gap: 4 },
  mStatText: { fontSize: 7, color: '#fff', fontWeight: '800' },

  // Scrollable content area
  mContent: {
    flex: 1,
    position: 'relative',
    paddingTop: 8,
  },
  mNode: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    top: 10,
    borderWidth: 2,
  },
  mCard: {
    position: 'absolute',
    bottom: 10,
    left: 8,
    right: 8,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  mCardLine: { height: 6, borderRadius: 3 },

  // Tab bar
  mTabBar: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
  },
  mTabIcon: { fontSize: 12 },

  mockupLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkCircle: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#58CC02',
    alignItems: 'center', justifyContent: 'center',
  },
  checkText: { color: '#fff', fontSize: 11, fontWeight: '900' },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 12,
    paddingTop: 8,
  },
  continueBtn: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueBtnText: {
    fontFamily: 'Nunito_900Black',
    fontSize: 16,
    letterSpacing: 0.5,
  },
})
