import React from 'react'
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useRP } from '../hooks/useRP'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useLivesContext } from '../context/LivesContext'
import { useDoubleRP } from '../context/DoubleRPContext'
import { useSubscription } from '../context/SubscriptionContext'
import { T, duoBtn, cardShadow } from '../styles/duo'

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function ShopScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid

  const { rp, spendXP }                                = useRP(uid)
  const { hasFreeze, buyFreeze }                        = useDailyStreak(uid)
  const { lives, maxLives, refillLives }                = useLivesContext()
  const { isActive, timeLeft, activateBoost, COST_RP }  = useDoubleRP()
  const { isSubscribed } = useSubscription()

  const s = makeStyles(C)

  // ── Buy handlers ──────────────────────────────────────────────────────────

  async function handleBuyFreeze() {
    if (hasFreeze) return
    const result = await buyFreeze(spendXP)
    if (result === 'success')
      Alert.alert('🧊 Freeze Activated!', 'Your streak is protected for one missed day.')
    else if (result === 'insufficient_xp')
      Alert.alert('Not enough RP', `You need 200 RP. You have ${xp} RP.`)
  }

  async function handleRefillLives() {
    if (lives >= maxLives) return
    const ok = await refillLives(spendXP)
    if (ok) Alert.alert('❤️ Lives Refilled!', 'All 5 lives restored.')
    else    Alert.alert('Not enough RP', `You need 300 RP. You have ${xp} RP.`)
  }

  async function handleBuyBoost() {
    if (isActive) return
    const result = await activateBoost(spendXP)
    if (result === 'success')
      Alert.alert('⚡ Boost Active!', 'All RP earned in the next 10 minutes is doubled!')
    else if (result === 'insufficient_xp')
      Alert.alert('Not enough RP', `You need ${COST_RP} RP. You have ${xp} RP.`)
    else if (result === 'already_active')
      Alert.alert('Boost already running!', `${formatTime(timeLeft)} remaining.`)
  }

  // ── Item definitions ──────────────────────────────────────────────────────

  const items = [
    {
      key:      'boost',
      icon:     '⚡',
      name:     '2× RP Boost',
      desc:     'Double all RP earned on correct answers for 10 minutes.',
      cost:     COST_RP,
      accent:   '#F59E0B',
      dark:     '#B45309',
      owned:    isActive,
      ownedLabel: `⏱ ${formatTime(timeLeft)} left`,
      canBuy:   !isActive && rp >= COST_RP,
      onBuy:    handleBuyBoost,
    },
    {
      key:      'freeze',
      icon:     '🧊',
      name:     'Streak Freeze',
      desc:     'Protect your streak for one missed day. Used automatically.',
      cost:     200,
      accent:   '#38BDF8',
      dark:     '#0369A1',
      owned:    hasFreeze,
      ownedLabel: '✓ Protected',
      canBuy:   !hasFreeze && rp >= 200,
      onBuy:    handleBuyFreeze,
    },
    {
      key:      'lives',
      icon:     '❤️',
      name:     'Refill Hearts',
      desc:     isSubscribed ? 'You have unlimited hearts with Premium!' : `Instantly restore all ${maxLives} lives.`,
      cost:     300,
      accent:   '#FF4B4B',
      dark:     '#CC0000',
      owned:    isSubscribed || lives >= maxLives,
      ownedLabel: isSubscribed ? '♾️ Unlimited' : '❤️ Full',
      canBuy:   !isSubscribed && lives < maxLives && rp >= 300,
      onBuy:    handleRefillLives,
    },
  ]

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={[T.body, { color: C.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[T.h2, { color: C.text }]}>🛒 RP Shop</Text>
          <View style={s.xpChip}>
            <Text style={[T.h3, { color: C.warn }]}>⭐ {xp.toLocaleString()}</Text>
          </View>
        </View>

        <Text style={[T.small, { color: C.textMuted, paddingHorizontal: 20, marginBottom: 20 }]}>
          Spend your ⭐ RP on power-ups to boost your studying.
        </Text>

        {/* Shop items */}
        {items.map((item) => (
          <View
            key={item.key}
            style={[s.card, cardShadow(C.shadow), item.owned && { opacity: 0.85 }]}
          >
            {/* Icon + info */}
            <View style={[s.iconWrap, { backgroundColor: item.accent + '22', borderColor: item.accent + '55' }]}>
              <Text style={{ fontSize: 32 }}>{item.icon}</Text>
            </View>

            <View style={s.info}>
              <Text style={[T.h3, { color: C.text }]}>{item.name}</Text>
              <Text style={[T.small, { color: C.textMuted, marginTop: 3, lineHeight: 18 }]}>
                {item.desc}
              </Text>
              <Text style={[T.label, { color: item.accent, marginTop: 6, textTransform: 'none', letterSpacing: 0 }]}>
                ⭐ {item.cost} RP
              </Text>
            </View>

            {/* Action */}
            <View style={s.action}>
              {item.owned ? (
                <View style={[s.ownedBadge, { backgroundColor: item.accent + '22', borderColor: item.accent + '55' }]}>
                  <Text style={[T.label, { color: item.accent, textTransform: 'none', letterSpacing: 0, fontSize: 11 }]}>
                    {item.ownedLabel}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={duoBtn(
                    item.canBuy ? item.accent : C.surface3,
                    item.canBuy ? item.dark   : C.border,
                    { paddingVertical: 10, paddingHorizontal: 16, opacity: item.canBuy ? 1 : 0.5 },
                  )}
                  onPress={item.onBuy}
                  disabled={!item.canBuy}
                  activeOpacity={0.8}
                >
                  <Text style={[T.btn, { color: '#fff', fontSize: 12 }]}>BUY</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {/* Earn more RP hint */}
        <View style={s.hint}>
          <Text style={[T.small, { color: C.textMuted, textAlign: 'center', lineHeight: 20 }]}>
            💡 Earn more RP by completing quizzes{'\n'}and maintaining your daily streak.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:    { flex: 1, backgroundColor: C.bg },
    scroll:  { paddingBottom: 40 },

    header:  {
      flexDirection:   'row',
      alignItems:      'center',
      justifyContent:  'space-between',
      paddingHorizontal: 16,
      paddingVertical:  14,
    },
    backBtn: { paddingVertical: 6, paddingRight: 12 },
    xpChip:  {
      backgroundColor: C.surface2,
      borderRadius:    20,
      paddingHorizontal: 12,
      paddingVertical:   6,
      borderWidth:     1,
      borderColor:     C.border,
    },

    card: {
      flexDirection:   'row',
      alignItems:      'center',
      backgroundColor: C.surface,
      borderRadius:    20,
      marginHorizontal: 16,
      marginBottom:    14,
      padding:         16,
      gap:             14,
      borderWidth:     1,
      borderColor:     C.border,
    },
    iconWrap: {
      width:        64,
      height:       64,
      borderRadius: 18,
      alignItems:   'center',
      justifyContent: 'center',
      borderWidth:  1.5,
      flexShrink:   0,
    },
    info:    { flex: 1 },
    action:  { flexShrink: 0 },
    ownedBadge: {
      borderRadius:    12,
      borderWidth:     1.5,
      paddingHorizontal: 10,
      paddingVertical:   8,
      alignItems:      'center',
    },

    hint: {
      marginTop:    16,
      marginHorizontal: 24,
      backgroundColor: C.surface2,
      borderRadius: 14,
      padding:      16,
    },
  })
}
