import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useXP } from '../hooks/useXP'
import { useLivesContext } from '../context/LivesContext'
import { useRewardedAd } from '../hooks/useRewardedAd'
import { SUBJECTS, SUBJECT_META } from '../../../src/data/subjects'
import { useDoubleXP } from '../context/DoubleXPContext'
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

  const { subject, setSubject }                          = useSubject()
  const { streak, hasFreeze, buyFreeze }                 = useDailyStreak(uid)
  const { xp, spendXP }                                  = useXP(uid)
  const { lives, maxLives, nextRefillAt, refillLives, addLife } = useLivesContext()
  const secsUntilRefill = useCountdown(lives < maxLives ? nextRefillAt : null)
  const { isActive: boostActive, timeLeft: boostTimeLeft }     = useDoubleXP()
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

    const canAfford = xp >= 200
    Alert.alert(
      `🔥 ${streak}-Day Streak`,
      canAfford
        ? `Keep it going!\n\nBuy a 🧊 Streak Freeze for 200 XP to protect your streak if you miss a day. You have ${xp} XP.`
        : `Keep it going!\n\nYou need 200 XP to buy a Streak Freeze. You have ${xp} XP — earn more by completing quizzes!`,
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
                  Alert.alert('Not enough XP', 'You need 200 XP to buy a streak freeze.')
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
        ? `You're out of lives!\n\nNext life in ${formatRefillTime(nextRefillAt)}, or watch an ad / refill now for 300 ⭐ XP.`
        : `Next life in ${formatRefillTime(nextRefillAt)}.\n\nWatch an ad for +1 ❤️, or refill all 5 lives for 300 ⭐ XP.`,
      buttons,
    )
  }

  const s = makeStyles(insets.top)

  return (
    <View style={s.bar}>
      {/* Subject switcher */}
      <View style={s.pills}>
        {Object.values(SUBJECTS).map((sub) => {
          const meta   = SUBJECT_META[sub]
          const active = subject === sub
          return (
            <TouchableOpacity
              key={sub}
              style={[s.pill, active ? s.pillActive : s.pillInactive]}
              onPress={() => setSubject(sub)}
              activeOpacity={0.75}
            >
              <Text style={[s.pillText, active ? s.pillTextActive : s.pillTextInactive]}>
                {meta.icon} {sub === SUBJECTS.LIVING_ENVIRONMENT ? 'LE' : 'ES'}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {/* Stats */}
      <View style={s.stats}>

        {/* 🔥 Streak (+ 🧊 when freeze is active) */}
        <TouchableOpacity style={s.stat} onPress={handleStreakTap} activeOpacity={0.75}>
          <View style={s.streakRow}>
            <Text style={s.statText}>🔥 {streak}</Text>
            {hasFreeze && (
              <View style={s.freezeBadge}>
                <Text style={s.freezeText}>🧊</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* ⭐ XP (+ ⚡2× badge when boost is active) */}
        <View style={s.stat}>
          <View style={s.xpRow}>
            <Text style={s.statText}>
              ⭐ {xp >= 1000 ? `${(xp / 1000).toFixed(1)}k` : xp}
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
        <TouchableOpacity style={s.stat} onPress={handleLivesTap} activeOpacity={0.8}>
          <Text style={s.statText}>
            {'❤️'.repeat(lives)}{'🖤'.repeat(maxLives - lives)}
            {lives < maxLives && secsUntilRefill > 0 ? `  ${formatSecs(secsUntilRefill)}` : ''}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

function makeStyles(topInset) {
  const BAR_H = 48
  return StyleSheet.create({
    bar: {
      flexDirection:     'row',
      alignItems:        'flex-end',
      justifyContent:    'space-between',
      backgroundColor:   '#16a34a',
      paddingTop:        topInset + 6,
      paddingBottom:     10,
      paddingHorizontal: 14,
      height:            topInset + BAR_H,
    },
    pills:       { flexDirection: 'row', gap: 6 },
    pill:        { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
    pillActive:  { backgroundColor: '#fff' },
    pillInactive:{ backgroundColor: 'rgba(255,255,255,0.15)' },
    pillText:    { fontFamily: 'Nunito_800ExtraBold', fontSize: 12 },
    pillTextActive:   { color: '#16a34a' },
    pillTextInactive: { color: 'rgba(255,255,255,0.85)' },

    stats:       { flexDirection: 'row', alignItems: 'center', gap: 10 },
    stat:        { alignItems: 'center' },
    statText:    { fontFamily: 'Nunito_800ExtraBold', fontSize: 13, color: '#fff' },

    streakRow:   { flexDirection: 'row', alignItems: 'center', gap: 4 },
    freezeBadge: {
      backgroundColor:  'rgba(186,230,253,0.25)',   // icy blue tint
      borderRadius:     8,
      paddingHorizontal: 4,
      paddingVertical:   1,
      borderWidth:      1,
      borderColor:      'rgba(186,230,253,0.5)',
    },
    freezeText:  { fontSize: 11 },

    xpRow:      { flexDirection: 'row', alignItems: 'center', gap: 5 },
    boostBadge: {
      backgroundColor:  'rgba(245,158,11,0.25)',
      borderRadius:     8,
      paddingHorizontal: 5,
      paddingVertical:   2,
      borderWidth:      1,
      borderColor:      'rgba(245,158,11,0.5)',
    },
    boostText:  {
      fontFamily: 'Nunito_800ExtraBold',
      fontSize:   10,
      color:      '#FCD34D',
    },
  })
}
