/**
 * LeagueScreen
 *
 * Weekly tier-based competition.
 *   - Top PROMOTE_N users move up a tier next Monday
 *   - Bottom DEMOTE_N users move down (except Bronze)
 *   - Tier resets Monday 00:00 UTC; countdown shown live
 */
import React, { useEffect, useRef, useState } from 'react'
import {
  View, Text, TouchableOpacity, FlatList,
  StyleSheet, Animated, ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import {
  useLeague, TIER_META, PROMOTE_N, DEMOTE_N,
  msUntilReset, formatCountdown,
} from '../hooks/useLeague'
import { T, cardShadow } from '../styles/duo'

// ── Avatar initials ───────────────────────────────────────────────────────────
const AVATAR_COLORS = ['#58CC02','#1CB0F6','#CE82FF','#FF9600','#FF4B4B','#FFC800']
function avatarColor(name) {
  const code = (name ?? 'S').charCodeAt(0)
  return AVATAR_COLORS[code % AVATAR_COLORS.length]
}

function Avatar({ name, size = 36, C }) {
  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: avatarColor(name),
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{ fontSize: size * 0.42, color: '#fff', fontFamily: 'Nunito_900Black' }}>
        {(name ?? '?')[0].toUpperCase()}
      </Text>
    </View>
  )
}

// ── Promotion banner (shown once per promotion/demotion) ──────────────────────
function PromotionBanner({ justPromoted, justDemoted, tier, C }) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current
  const opAnim    = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!justPromoted && !justDemoted) return
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, tension: 130, friction: 8, useNativeDriver: true }),
      Animated.timing(opAnim,    { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start()
  }, [justPromoted, justDemoted])

  if (!justPromoted && !justDemoted) return null

  const meta = TIER_META[tier]
  return (
    <Animated.View style={[
      s.promotionBanner,
      {
        backgroundColor: justPromoted ? '#58CC02' : '#FF4B4B',
        opacity: opAnim,
        transform: [{ scale: scaleAnim }],
      },
    ]}>
      <Text style={[T.h2, { color: '#fff', textAlign: 'center' }]}>
        {justPromoted
          ? `🎉 Promoted to ${meta.label} ${meta.emoji}`
          : `📉 Demoted to ${meta.label} ${meta.emoji}`}
      </Text>
      <Text style={[T.body, { color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 4 }]}>
        {justPromoted ? 'Keep it going — finish at the top!' : 'Fight your way back up!'}
      </Text>
    </Animated.View>
  )
}

// ── Section label between zones ───────────────────────────────────────────────
function ZoneLabel({ label, color }) {
  return (
    <View style={[s.zoneLabel, { backgroundColor: color + '18', borderColor: color + '40' }]}>
      <Text style={[T.label, { color, textTransform: 'uppercase', letterSpacing: 1 }]}>
        {label}
      </Text>
    </View>
  )
}

// ── Single member row ─────────────────────────────────────────────────────────
function MemberRow({ entry, rank, isMe, inPromote, inDemote, C }) {
  const borderColor = isMe
    ? C.brand
    : inPromote ? '#58CC02'
    : inDemote  ? '#FF4B4B'
    : C.border

  const bgColor = isMe
    ? C.brandBg
    : C.surface

  return (
    <View style={[
      s.memberRow,
      { backgroundColor: bgColor, borderColor, borderLeftWidth: isMe || inPromote || inDemote ? 3 : 1 },
      cardShadow(C.shadow),
    ]}>
      {/* Rank */}
      <Text style={[s.rankText, { color: rank <= 3 ? C.warn : C.textMuted }]}>
        {rank <= 3 ? ['🥇','🥈','🥉'][rank - 1] : rank}
      </Text>

      {/* Avatar */}
      <Avatar name={entry.displayName} size={34} C={C} />

      {/* Name */}
      <Text style={[T.body, { flex: 1, color: C.text, marginLeft: 10 }]} numberOfLines={1}>
        {entry.displayName}
        {isMe ? '  👈' : ''}
      </Text>

      {/* Weekly RP */}
      <View style={s.rpChip}>
        <Text style={[T.label, { color: C.warn, textTransform: 'none', letterSpacing: 0, fontSize: 13 }]}>
          ⭐ {entry.weeklyXP.toLocaleString()}
        </Text>
      </View>
    </View>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function LeagueScreen({ navigation }) {
  const { C, isDark } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid

  const { tier, members, loading, justPromoted, justDemoted, refresh, promoteN, demoteN } = useLeague(uid)
  const meta = TIER_META[tier] ?? TIER_META.bronze

  // ── Weekly countdown (updates every minute) ───────────────────────────────
  const [countdown, setCountdown] = useState(() => formatCountdown(msUntilReset()))
  useEffect(() => {
    const id = setInterval(() => setCountdown(formatCountdown(msUntilReset())), 60_000)
    return () => clearInterval(id)
  }, [])

  // ── Tier header fade-in ───────────────────────────────────────────────────
  const headerAnim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    if (!loading) {
      Animated.timing(headerAnim, { toValue: 1, duration: 350, useNativeDriver: true }).start()
    }
  }, [loading, tier])

  // ── Build flat list items with section markers ────────────────────────────
  function buildRows() {
    const items = []
    const total = members.length
    const demoteFrom = Math.max(total - demoteN + 1, promoteN + 1)

    members.forEach((m, i) => {
      const rank      = i + 1
      const inPromote = rank <= promoteN
      const inDemote  = rank >= demoteFrom && tier !== 'bronze'
      const isMe      = m.uid === uid

      // Section headers
      if (rank === 1 && total > 0) {
        items.push({ type: 'zone', key: 'z-promote', label: `▲  Promotion Zone  (top ${promoteN})`, color: '#58CC02' })
      }
      if (rank === promoteN + 1 && total > promoteN) {
        items.push({ type: 'zone', key: 'z-safe', label: '—  Safe Zone', color: C.textMuted })
      }
      if (rank === demoteFrom && demoteFrom <= total && tier !== 'bronze') {
        items.push({ type: 'zone', key: 'z-demote', label: `▼  Demotion Zone  (bottom ${demoteN})`, color: '#FF4B4B' })
      }

      items.push({ type: 'member', key: m.uid, entry: m, rank, isMe, inPromote, inDemote })
    })

    return items
  }

  const rows = buildRows()

  return (
    <SafeAreaView style={[s.safe, { backgroundColor: C.bg }]} edges={['top', 'bottom']}>

      {/* ── Navigation row ── */}
      <View style={s.navRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn} activeOpacity={0.7}>
          <Text style={[T.body, { color: C.textMuted }]}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={refresh} style={s.refreshBtn} activeOpacity={0.7}>
          <Text style={{ fontSize: 20 }}>↻</Text>
        </TouchableOpacity>
      </View>

      {/* ── Tier banner ── */}
      <Animated.View
        style={[
          s.tierBanner,
          {
            backgroundColor: isDark ? meta.dark : meta.light,
            borderColor:     meta.color + '60',
            opacity:         headerAnim,
            transform: [{ scale: headerAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }],
          },
        ]}
      >
        <Text style={s.tierEmoji}>{meta.emoji}</Text>
        <Text style={[T.h1, { color: meta.color, textAlign: 'center' }]}>
          {meta.label} League
        </Text>
        <Text style={[T.small, { color: C.textMuted, marginTop: 4, textAlign: 'center' }]}>
          Top {promoteN} promoted · Bottom {demoteN} demoted
        </Text>
        <View style={[s.countdownChip, { backgroundColor: meta.color + '20', borderColor: meta.color + '40' }]}>
          <Text style={[T.label, { color: meta.color, textTransform: 'none', letterSpacing: 0 }]}>
            ⏳ Resets in {countdown}
          </Text>
        </View>
      </Animated.View>

      {/* ── Promotion / demotion banner ── */}
      <PromotionBanner justPromoted={justPromoted} justDemoted={justDemoted} tier={tier} C={C} />

      {/* ── League list ── */}
      {loading ? (
        <View style={s.loadingWrap}>
          <ActivityIndicator size="large" color={meta.color} />
          <Text style={[T.body, { color: C.textMuted, marginTop: 12 }]}>Loading league…</Text>
        </View>
      ) : members.length === 0 ? (
        <View style={s.emptyWrap}>
          <Text style={{ fontSize: 48 }}>{meta.emoji}</Text>
          <Text style={[T.h3, { color: C.text, marginTop: 12, textAlign: 'center' }]}>
            No one here yet!
          </Text>
          <Text style={[T.body, { color: C.textMuted, marginTop: 8, textAlign: 'center' }]}>
            Earn RP this week to appear on the leaderboard.
          </Text>
        </View>
      ) : (
        <FlatList
          data={rows}
          keyExtractor={(item) => item.key}
          contentContainerStyle={s.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            if (item.type === 'zone') {
              return <ZoneLabel label={item.label} color={item.color} />
            }
            return (
              <MemberRow
                entry={item.entry}
                rank={item.rank}
                isMe={item.isMe}
                inPromote={item.inPromote}
                inDemote={item.inDemote}
                C={C}
              />
            )
          }}
        />
      )}

    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe:       { flex: 1 },
  navRow:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  backBtn:    { paddingVertical: 4, paddingHorizontal: 2 },
  refreshBtn: { padding: 8 },

  tierBanner: {
    marginHorizontal: 16,
    borderRadius:     20,
    padding:          20,
    alignItems:       'center',
    borderWidth:      1.5,
    marginBottom:     12,
  },
  tierEmoji: {
    fontSize:     52,
    marginBottom: 4,
  },
  countdownChip: {
    marginTop:         12,
    borderRadius:      20,
    paddingHorizontal: 14,
    paddingVertical:    6,
    borderWidth:        1,
  },

  promotionBanner: {
    marginHorizontal: 16,
    borderRadius:     16,
    padding:          16,
    marginBottom:     8,
  },

  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyWrap:   { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },

  list:     { paddingHorizontal: 16, paddingBottom: 24, gap: 4 },

  zoneLabel: {
    borderRadius:      10,
    paddingVertical:    6,
    paddingHorizontal: 12,
    borderWidth:        1,
    marginVertical:     4,
    alignSelf:         'stretch',
    alignItems:        'center',
  },

  memberRow: {
    flexDirection:  'row',
    alignItems:     'center',
    borderRadius:   14,
    padding:        12,
    gap:             8,
    borderWidth:     1,
  },
  rankText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize:   14,
    width:      30,
    textAlign:  'center',
  },
  rpChip: {
    backgroundColor:   'transparent',
    alignItems:        'flex-end',
    minWidth:          70,
  },
})
