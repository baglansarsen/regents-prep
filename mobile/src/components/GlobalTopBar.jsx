import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useRP } from '../hooks/useRP'
import { useLivesContext } from '../context/LivesContext'
import { useRewardedAd } from '../hooks/useRewardedAd'
import { SUBJECTS, SUBJECT_META } from '../content/subjects'
import { useDoubleRP } from '../context/DoubleRPContext'
import { T } from '../styles/duo'

function useCountdown(isoStr) {
  const [secs, setSecs] = useState(() =>
    isoStr ? Math.max(0, Math.ceil((new Date(isoStr).getTime() - Date.now()) / 1000)) : 0
  )
  useEffect(() => {
    if (!isoStr) { setSecs(0); return }
    const id = setInterval(() => {
      setSecs(Math.max(0, Math.ceil((new Date(isoStr).getTime() - Date.now()) / 1000)))
    }, 1000)
    return () => clearInterval(id)
  }, [isoStr])
  return secs
}

function formatSecs(s) {
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

function formatRefillTime(isoStr) {
  if (!isoStr) return 'soon'
  const ms = new Date(isoStr).getTime() - Date.now()
  if (ms <= 0) return 'now'
  const min = Math.ceil(ms / 60000)
  if (min < 60) return `${min}m`
  return `${Math.ceil(min / 60)}h`
}

export default function GlobalTopBar() {
  const insets = useSafeAreaInsets()
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const { subject, setSubject }                          = useSubject()
  const { streak, hasFreeze, buyFreeze }                 = useDailyStreak(uid)
  const { rp, xp, spendXP }                                  = useRP(uid)
  const { lives, maxLives, nextRefillAt, refillLives, addLife, isSubscribed } = useLivesContext()
  const secsUntilRefill = useCountdown(lives < maxLives ? nextRefillAt : null)
  const { isActive: boostActive, timeLeft: boostTimeLeft }     = useDoubleRP()
  const { ready: adReady, showAd }                             = useRewardedAd({ onReward: addLife })

  // ── Streak / freeze tap ───────────────────────────────────────────────────
  function handleStreakTap() {
    if (hasFreeze) {
      Alert.alert(
        '🧊 Streak Freeze Active',
        `Your ${streak}-day streak is protected!\n\nIf you miss a day, the freeze will automatically shield your streak.`,
        [{ text: 'Got it 👍' }],
      )
      return
    }

    const canAfford = rp >= 200
    Alert.alert(
      `🔥 ${streak}-Day Streak`,
      canAfford
        ? `Keep it going!\n\nBuy a 🧊 Streak Freeze for 200 RP to protect your streak if you miss a day. You have ${xp} RP.`
        : `Keep it going!\n\nYou need 200 RP to buy a Streak Freeze. You have ${xp} RP — earn more by completing quizzes!`,
      canAfford
        ? [
            {
              text: '🧊 Buy Freeze (200 XP)',
              onPress: async () => {
                const result = await buyFreeze(spendXP)
                if (result === 'success') {
                  Alert.alert('🧊 Freeze Activated!', 'Your streak is protected for one missed day.')
                } else if (result === 'already_have') {
                  Alert.alert('Already protected!', 'You already have an active streak freeze.')
                } else {
                  Alert.alert('Not enough RP', 'You need 200 RP to buy a streak freeze.')
                }
              },
            },
            { text: 'Not now', style: 'cancel' },
          ]
        : [{ text: 'OK' }],
    )
  }

  // ── Lives tap ─────────────────────────────────────────────────────────────
  function handleLivesTap() {
    if (lives >= maxLives) return

    const buttons = [
      { text: 'Refill All (300 XP)', style: 'default', onPress: () => refillLives(spendXP) },
      ...(adReady
        ? [{ text: '▶ Watch Ad (+1 ❤️)', onPress: showAd }]
        : []),
      { text: 'OK', style: 'cancel' },
    ]

    Alert.alert(
      `❤️ ${lives} / ${maxLives} Lives`,
      lives === 0
        ? `You're out of lives!\n\nNext life in ${formatRefillTime(nextRefillAt)}, or watch an ad / refill now for 300 ⭐ RP.`
        : `Next life in ${formatRefillTime(nextRefillAt)}.\n\nWatch an ad for +1 ❤️, or refill all 5 lives for 300 ⭐ RP.`,
      buttons,
    )
  }

  const subjectColor = SUBJECT_META[subject]?.color ?? '#16a34a'
  const s = makeStyles(insets.top, subjectColor)

  const activeMeta = SUBJECT_META[subject] ?? SUBJECT_META['living-environment']

  const barTop = insets.top + 48

  return (
    <View style={s.bar}>

      {/* Subject dropdown button */}
      <TouchableOpacity
        style={s.subjectBtn}
        onPress={() => setDropdownOpen(true)}
        activeOpacity={0.75}
        accessibilityLabel={`Select Subject. Current subject is ${activeMeta.name}`}
        accessibilityRole="button"
        accessibilityHint="Opens a menu to switch between Living Environment, Earth Science, Chemistry, Physics, Algebra, and Geometry subjects."
      >
        <Text style={s.subjectBtnText}>
          {activeMeta.icon} {activeMeta.shortName ?? activeMeta.name.slice(0, 2).toUpperCase()}
        </Text>
        <Text style={s.chevron}>{dropdownOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Stats */}
      <View style={s.stats}>

        {/* 🔥 Streak */}
        <TouchableOpacity
          style={s.stat}
          onPress={handleStreakTap}
          activeOpacity={0.75}
          accessibilityLabel={`${streak} day study streak`}
          accessibilityRole="button"
          accessibilityHint={hasFreeze ? "Your streak is protected today by a active streak freeze. Tap to see protection details." : "Tap to buy a streak freeze protection for 200 RP."}
        >
          <View style={s.streakRow}>
            <Text style={s.statText}>🔥 {streak}</Text>
            {hasFreeze && (
              <View style={s.freezeBadge}>
                <Text style={s.freezeText}>🧊</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* ⭐ RP */}
        <View
          style={s.stat}
          accessibilityLabel={`${xp} experience points earned`}
          accessibilityRole="text"
          accessibilityHint={boostActive ? `Double RP boost is active with ${Math.floor(boostTimeLeft / 60)} minutes left.` : ""}
        >
          <View style={s.xpRow}>
            <Text style={s.statText}>
              ⭐ {xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : rp} 
            </Text>
            {boostActive && (
              <View style={s.boostBadge}>
                <Text style={s.boostText}>
                  ⚡2× {Math.floor(boostTimeLeft / 60)}:{String(boostTimeLeft % 60).padStart(2, '0')}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* ❤️ Lives */}
        {isSubscribed ? (
          <View
            style={s.stat}
            accessibilityLabel="Unlimited lives subscription active"
            accessibilityRole="text"
          >
            <Text style={s.statText}>♾️ ❤️</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={s.stat}
            onPress={handleLivesTap}
            activeOpacity={0.8}
            accessibilityLabel={`${lives} out of ${maxLives} lives remaining`}
            accessibilityRole="button"
            accessibilityHint={lives < maxLives ? `Next life refills in ${formatRefillTime(nextRefillAt)}. Tap to refill lives instantly using RP or watch a rewarded ad.` : "Your lives are fully charged."}
          >
            <Text style={s.statText}>
              {'❤️'.repeat(lives)}{'🖤'.repeat(maxLives - lives)}
              {lives < maxLives && secsUntilRefill > 0 ? `  ${formatSecs(secsUntilRefill)}` : ''}
            </Text>
          </TouchableOpacity>
        )}


      </View>

      {/* Dropdown modal */}
      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={() => setDropdownOpen(false)}>
          <View style={[s.dropdown, { top: barTop }]}>
            {Object.values(SUBJECTS).map((sub) => {
              const meta   = SUBJECT_META[sub]
              const active = subject === sub
              return (
                <TouchableOpacity
                  key={sub}
                  style={[s.dropdownItem, active && s.dropdownItemActive]}
                  onPress={() => { setSubject(sub); setDropdownOpen(false) }}
                  activeOpacity={0.7}
                >
                  <Text style={s.dropdownIcon}>{meta.icon}</Text>
                  <Text style={[s.dropdownText, active && { color: subjectColor, fontFamily: 'Nunito_800ExtraBold' }]}>
                    {meta.name}
                  </Text>
                  {active && <Text style={[s.dropdownCheck, { color: subjectColor }]}>✓</Text>}
                </TouchableOpacity>
              )
            })}
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  )
}

function makeStyles(topInset, subjectColor) {
  return StyleSheet.create({
    bar: {
      flexDirection:     'row',
      alignItems:        'center',
      justifyContent:    'space-between',
      backgroundColor:   subjectColor,
      paddingTop:        topInset + 6,
      paddingBottom:     10,
      paddingHorizontal: 14,
      height:            topInset + 48,
    },

    subjectBtn:     {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: 'rgba(255,255,255,0.18)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 14,
      ...(Platform.OS === 'web' ? { backdropFilter: 'blur(16px)' } : {}),
    },
    subjectBtnText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 13, color: '#fff' },
    chevron:        { fontSize: 10, color: 'rgba(255,255,255,0.85)' },

    stats:       { flexDirection: 'row', alignItems: 'center', gap: 8 },
    stat:        {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.18)',
      borderRadius:   14,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth:    1,
      borderColor:    'rgba(255,255,255,0.08)',
      ...(Platform.OS === 'web' ? { backdropFilter: 'blur(16px)' } : {}),
    },
    statText:    { fontFamily: 'Nunito_800ExtraBold', fontSize: 13, color: '#fff' },

    streakRow:   { flexDirection: 'row', alignItems: 'center', gap: 4 },
    freezeBadge: {
      backgroundColor:   'rgba(186,230,253,0.25)',
      borderRadius:       8,
      paddingHorizontal:  4,
      paddingVertical:    1,
      borderWidth:        1,
      borderColor:        'rgba(186,230,253,0.5)',
    },
    freezeText:  { fontSize: 11 },

    xpRow:      { flexDirection: 'row', alignItems: 'center', gap: 5 },
    boostBadge: {
      backgroundColor:   'rgba(245,158,11,0.25)',
      borderRadius:       8,
      paddingHorizontal:  5,
      paddingVertical:    2,
      borderWidth:        1,
      borderColor:        'rgba(245,158,11,0.5)',
    },
    boostText:  { fontFamily: 'Nunito_800ExtraBold', fontSize: 10, color: '#FCD34D' },

    backdrop:   { flex: 1 },
    dropdown:   {
      position:          'absolute',
      left:              14,
      backgroundColor:   '#fff',
      borderRadius:      14,
      paddingVertical:   6,
      minWidth:          220,
      shadowColor:       '#000',
      shadowOpacity:     0.15,
      shadowOffset:      { width: 0, height: 4 },
      shadowRadius:      12,
      elevation:         8,
    },
    dropdownItem:       { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, gap: 10 },
    dropdownItemActive: { backgroundColor: 'rgba(0,0,0,0.04)' },
    dropdownIcon:       { fontSize: 18 },
    dropdownText:       { fontFamily: 'Nunito_700Bold', fontSize: 15, color: '#1f2937', flex: 1 },
    dropdownCheck:      { fontSize: 16, fontFamily: 'Nunito_800ExtraBold' },
  })
}
