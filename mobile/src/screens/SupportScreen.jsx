import React from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useSubscription } from '../context/SubscriptionContext'
import { PRODUCT_IDS } from '../hooks/usePurchases'
import { T, duoBtn, cardShadow } from '../styles/duo'

const PURPLE      = '#9333EA'
const PURPLE_DARK = '#6B21A8'
const PURPLE_BG   = '#F3E8FF'
const GOLD        = '#F59E0B'
const GOLD_DARK   = '#B45309'

const FEATURES = [
  '♾️  Unlimited hearts — never run out',
  '📚  Study without interruptions',
  '💜  Support a student-built app',
]

const TIP_AMOUNTS = [
  { id: PRODUCT_IDS.TIP_5,  label: '$5',  sublabel: 'Buy me a coffee ☕' },
  { id: PRODUCT_IDS.TIP_10, label: '$10', sublabel: 'Buy me lunch 🍕' },
  { id: PRODUCT_IDS.TIP_25, label: '$25', sublabel: 'You\'re amazing 🙏' },
]

export default function SupportScreen({ navigation }) {
  const { C }          = useTheme()
  const {
    isSubscribed, loading,
    purchaseMonthly, purchaseYearly,
    donate, restorePurchases,
  } = useSubscription()

  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={[T.body, { color: C.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[T.h2, { color: C.text }]}>💜 Support</Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Hero */}
        <View style={s.hero}>
          <Text style={s.heroEmoji}>💜</Text>
          <Text style={[T.h1, { color: C.text, textAlign: 'center' }]}>Go Unlimited</Text>
          <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 6, lineHeight: 22 }]}>
            Remove the heart limit and support{'\n'}a student-built app.
          </Text>
        </View>

        {/* Already subscribed banner */}
        {isSubscribed && (
          <View style={[s.activeBanner, { backgroundColor: PURPLE_BG, borderColor: PURPLE + '55' }]}>
            <Text style={[T.h3, { color: PURPLE, textAlign: 'center' }]}>💜 Premium Active</Text>
            <Text style={[T.small, { color: PURPLE, textAlign: 'center', marginTop: 4 }]}>
              You have unlimited hearts. Thank you for your support!
            </Text>
          </View>
        )}

        {/* ── Subscription plans ── */}
        {!isSubscribed && (
          <>
            {/* Yearly — Best Value */}
            <View style={[s.planCard, s.planCardBest, cardShadow(PURPLE + '44')]}>
              <View style={s.bestBadge}>
                <Text style={s.bestBadgeText}>BEST VALUE</Text>
              </View>
              <View style={s.planLeft}>
                <Text style={{ fontSize: 32 }}>📅</Text>
                <View style={{ marginLeft: 12 }}>
                  <Text style={[T.h3, { color: '#fff' }]}>Yearly Plan</Text>
                  <Text style={[T.small, { color: 'rgba(255,255,255,0.8)', marginTop: 2 }]}>
                    Only $0.42 / month
                  </Text>
                </View>
              </View>
              <View style={s.planRight}>
                <Text style={[T.h2, { color: '#fff' }]}>$4.99</Text>
                <Text style={[T.small, { color: 'rgba(255,255,255,0.75)' }]}>/ year</Text>
                <TouchableOpacity
                  style={[s.planBtn, { backgroundColor: '#fff', borderBottomColor: 'rgba(0,0,0,0.15)' }]}
                  onPress={purchaseYearly}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color={PURPLE} />
                  ) : (
                    <Text style={[T.btn, { color: PURPLE, fontSize: 12 }]}>SUBSCRIBE</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Monthly */}
            <View style={[s.planCard, { borderColor: C.border }, cardShadow(C.shadow)]}>
              <View style={s.planLeft}>
                <Text style={{ fontSize: 32 }}>📆</Text>
                <View style={{ marginLeft: 12 }}>
                  <Text style={[T.h3, { color: C.text }]}>Monthly Plan</Text>
                  <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
                    Cancel anytime
                  </Text>
                </View>
              </View>
              <View style={s.planRight}>
                <Text style={[T.h2, { color: C.text }]}>$1.99</Text>
                <Text style={[T.small, { color: C.textMuted }]}>/ month</Text>
                <TouchableOpacity
                  style={duoBtn(PURPLE, PURPLE_DARK, { paddingVertical: 10, paddingHorizontal: 14, marginTop: 8 })}
                  onPress={purchaseMonthly}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={[T.btn, { color: '#fff', fontSize: 12 }]}>SUBSCRIBE</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {/* Features list */}
        <View style={[s.featuresCard, cardShadow(C.shadow)]}>
          {FEATURES.map((f) => (
            <Text key={f} style={[T.body, { color: C.text, paddingVertical: 6 }]}>{f}</Text>
          ))}
        </View>

        {/* ── Donate section ── */}
        <Text style={[T.label, { color: C.textMuted, marginHorizontal: 16, marginTop: 24, marginBottom: 10 }]}>
          Support the Developer
        </Text>
        <View style={[s.donateCard, cardShadow(C.shadow)]}>
          <Text style={[T.h3, { color: C.text, marginBottom: 4 }]}>Buy me a coffee ☕</Text>
          <Text style={[T.small, { color: C.textMuted, marginBottom: 16, lineHeight: 18 }]}>
            One-time donation to help keep Regents Prep free for all students.
          </Text>
          <View style={s.tipRow}>
            {TIP_AMOUNTS.map((tip) => (
              <TouchableOpacity
                key={tip.id}
                style={[s.tipBtn, cardShadow(GOLD + '44')]}
                onPress={() => donate(tip.id)}
                disabled={loading}
                activeOpacity={0.85}
              >
                <Text style={[T.h3, { color: '#fff' }]}>{tip.label}</Text>
                <Text style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontFamily: 'Nunito_600SemiBold', marginTop: 2 }}>
                  {tip.sublabel}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Restore */}
        <TouchableOpacity style={s.restoreBtn} onPress={restorePurchases} disabled={loading}>
          <Text style={[T.small, { color: C.textMuted, textDecorationLine: 'underline' }]}>
            Restore Purchases
          </Text>
        </TouchableOpacity>

        <Text style={[T.label, { color: C.textDim, textAlign: 'center', marginTop: 8, marginBottom: 12, textTransform: 'none', letterSpacing: 0 }]}>
          Subscriptions auto-renew. Cancel anytime in your device settings.
        </Text>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:   { flex: 1, backgroundColor: C.bg },
    scroll: { paddingBottom: 24 },

    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 16, paddingVertical: 14,
    },
    backBtn: { paddingVertical: 6, paddingRight: 12 },

    hero: { alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16 },
    heroEmoji: { fontSize: 56, marginBottom: 8 },

    activeBanner: {
      marginHorizontal: 16, marginBottom: 16,
      borderRadius: 16, borderWidth: 1.5,
      padding: 16,
    },

    // Subscription plan cards
    planCard: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      backgroundColor: C.surface,
      borderRadius: 20, marginHorizontal: 16, marginBottom: 12,
      padding: 16, borderWidth: 1.5,
    },
    planCardBest: {
      backgroundColor: PURPLE,
      borderColor: PURPLE_DARK,
      position: 'relative',
      paddingTop: 22,
    },
    bestBadge: {
      position: 'absolute', top: -1, left: 16,
      backgroundColor: GOLD, borderRadius: 8,
      paddingHorizontal: 10, paddingVertical: 3,
      borderBottomLeftRadius: 0, borderTopLeftRadius: 8,
      borderTopRightRadius: 8, borderBottomRightRadius: 8,
    },
    bestBadgeText: {
      fontFamily: 'Nunito_800ExtraBold', fontSize: 10,
      color: '#fff', letterSpacing: 0.5,
    },
    planLeft:  { flexDirection: 'row', alignItems: 'center', flex: 1 },
    planRight: { alignItems: 'flex-end' },
    planBtn: {
      borderRadius: 12, paddingVertical: 8, paddingHorizontal: 14,
      borderBottomWidth: 3, alignItems: 'center', marginTop: 8,
    },

    featuresCard: {
      backgroundColor: C.surface, borderRadius: 18,
      marginHorizontal: 16, marginBottom: 8,
      padding: 18, borderWidth: 1, borderColor: C.border,
    },

    // Donate
    donateCard: {
      backgroundColor: C.surface, borderRadius: 18,
      marginHorizontal: 16,
      padding: 18, borderWidth: 1, borderColor: C.border,
    },
    tipRow:  { flexDirection: 'row', gap: 10 },
    tipBtn:  {
      flex: 1, backgroundColor: GOLD,
      borderRadius: 16, padding: 14,
      alignItems: 'center',
      borderBottomWidth: 4, borderBottomColor: GOLD_DARK,
    },

    restoreBtn: { alignItems: 'center', paddingVertical: 16 },
  })
}
