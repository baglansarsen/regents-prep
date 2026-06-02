import React, { useEffect, useRef, useState } from 'react'
import {
  Modal, View, Text, TouchableOpacity, StyleSheet, Animated,
} from 'react-native'
import { useTheme } from '../context/ThemeContext'

// ── Week dots ─────────────────────────────────────────────────────────────────
function WeekDots({ weekDays }) {
  const { C } = useTheme()
  return (
    <View style={s.weekRow}>
      {weekDays.map((d) => {
        const filled  = d.studied
        const isToday = d.isToday
        return (
          <View key={d.date} style={s.dayCol}>
            <View style={[
              s.dot,
              filled  && { backgroundColor: '#f97316' },
              isToday && !filled && { borderColor: '#f97316', borderWidth: 2, backgroundColor: 'transparent' },
              !filled && !isToday && { backgroundColor: C?.border ?? '#e5e7eb' },
            ]}>
              {filled && <Text style={s.dotCheck}>✓</Text>}
            </View>
            <Text style={[s.dayLabel, { color: C?.textSecondary ?? '#6b7280' }]}>{d.dayLabel}</Text>
          </View>
        )
      })}
    </View>
  )
}

// ── Main modal ────────────────────────────────────────────────────────────────
export default function StreakCelebrationModal({ event, onClose, weekDays, streak, xp, onBuyFreeze }) {
  const { C } = useTheme()
  const flameScale = useRef(new Animated.Value(1)).current
  const cardScale  = useRef(new Animated.Value(0.7)).current
  const [buyMsg, setBuyMsg] = useState(null)

  useEffect(() => {
    if (!event) {
      cardScale.setValue(0.7)
      flameScale.setValue(1)
      setBuyMsg(null)
      return
    }

    // Card entrance
    Animated.spring(cardScale, { toValue: 1, useNativeDriver: true, tension: 120, friction: 8 }).start()

    if (event.type === 'continued' || event.type === 'freeze_used') {
      // Pulsing flame loop
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(flameScale, { toValue: 1.35, duration: 420, useNativeDriver: true }),
          Animated.timing(flameScale, { toValue: 1,    duration: 420, useNativeDriver: true }),
        ])
      )
      loop.start()
      return () => loop.stop()
    }
  }, [event?.type])

  if (!event) return null

  const { type } = event
  const displayStreak = type === 'broken' ? 0 : (streak ?? event.streak ?? 0)

  const headline =
    type === 'continued'   ? `${displayStreak}-Day Streak!` :
    type === 'freeze_used' ? 'Freeze Saved It!' :
                             'Streak Lost'

  const subtext =
    type === 'continued'   ? 'You opened the app today — keep the flame alive! 🔥' :
    type === 'freeze_used' ? 'Your 🧊 Freeze protected your streak for the missed day.' :
                             "Don't let it happen again — protect your next streak."

  const icon =
    type === 'continued'   ? '🔥' :
    type === 'freeze_used' ? '🧊🔥' :
                             '💔'

  async function handleBuyFreeze() {
    setBuyMsg(null)
    const result = await onBuyFreeze()
    if (result === 'success') {
      setBuyMsg('🧊 Freeze activated! Your next streak is protected.')
    } else if (result === 'already_have') {
      setBuyMsg('You already have a freeze.')
    } else {
      setBuyMsg(`Not enough XP. You have ${xp} XP — need 200.`)
    }
  }

  return (
    <Modal transparent animationType="fade" visible statusBarTranslucent>
      <View style={s.backdrop}>
        <Animated.View style={[s.card, { backgroundColor: C?.card ?? '#fff', transform: [{ scale: cardScale }] }]}>

          {/* Icon / flame */}
          <Animated.Text style={[s.icon, { transform: [{ scale: type !== 'broken' ? flameScale : 1 }] }]}>
            {icon}
          </Animated.Text>

          {/* Headline */}
          <Text style={[s.headline, { color: C?.text ?? '#111827' }]}>{headline}</Text>
          <Text style={[s.subtext, { color: C?.textSecondary ?? '#6b7280' }]}>{subtext}</Text>

          {/* Week dots */}
          <WeekDots weekDays={weekDays} />

          {/* Buy freeze (broken state only) */}
          {type === 'broken' && (
            <View style={s.buySection}>
              {buyMsg ? (
                <Text style={[s.buyMsg, { color: C?.text ?? '#111827' }]}>{buyMsg}</Text>
              ) : (
                <>
                  <Text style={[s.buyHint, { color: C?.textSecondary ?? '#6b7280' }]}>
                    Protect your next streak with a 🧊 Freeze
                  </Text>
                  <TouchableOpacity
                    style={[s.buyBtn, xp < 200 && s.buyBtnDisabled]}
                    onPress={handleBuyFreeze}
                    activeOpacity={0.8}
                  >
                    <Text style={s.buyBtnText}>
                      🧊 Buy Freeze (200 XP)
                      {xp < 200 ? `  — you have ${xp}` : ''}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}

          {/* Dismiss */}
          <TouchableOpacity style={s.closeBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={s.closeBtnText}>{type === 'broken' ? 'Start Over' : 'Let\'s go! 💪'}</Text>
          </TouchableOpacity>

        </Animated.View>
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 10,
  },
  icon:     { fontSize: 64, marginBottom: 10 },
  headline: { fontFamily: 'Nunito_800ExtraBold', fontSize: 26, textAlign: 'center', marginBottom: 6 },
  subtext:  { fontFamily: 'Nunito_600SemiBold', fontSize: 14, textAlign: 'center', marginBottom: 20, lineHeight: 20 },

  weekRow:  { flexDirection: 'row', gap: 8, marginBottom: 24 },
  dayCol:   { alignItems: 'center', gap: 4 },
  dot: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#e5e7eb',
  },
  dotCheck:  { fontSize: 14, color: '#fff' },
  dayLabel:  { fontFamily: 'Nunito_700Bold', fontSize: 10 },

  buySection: { width: '100%', alignItems: 'center', marginBottom: 16 },
  buyHint:    { fontFamily: 'Nunito_600SemiBold', fontSize: 13, textAlign: 'center', marginBottom: 10 },
  buyBtn: {
    backgroundColor: '#0ea5e9',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  buyBtnDisabled: { backgroundColor: '#94a3b8' },
  buyBtnText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 14, color: '#fff' },
  buyMsg: { fontFamily: 'Nunito_700Bold', fontSize: 14, textAlign: 'center' },

  closeBtn: {
    marginTop: 4,
    backgroundColor: '#f97316',
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 13,
    width: '100%',
    alignItems: 'center',
  },
  closeBtnText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 16, color: '#fff' },
})
