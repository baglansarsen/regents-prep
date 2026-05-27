import React, { useState, useRef, useEffect } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  RefreshControl, Animated,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useFriends, timeAgo } from '../hooks/useFriends'
import { useLeaderboard } from '../hooks/useLeaderboard'
import { useFriendsLeaderboard } from '../hooks/useFriendsLeaderboard'
import { T, cardShadow } from '../styles/duo'
import { useLeague, TIER_META, msUntilReset, formatCountdown } from '../hooks/useLeague'

const TABS = ['Leaderboard', 'Friends', 'Activity']

// Medal config — index 0 = 1st, 1 = 2nd, 2 = 3rd
const MEDALS = [
  { emoji: '🥇', border: '#FCD34D', text: '#B45309', avatarSize: 52 },
  { emoji: '🥈', border: '#94A3B8', text: '#475569', avatarSize: 44 },
  { emoji: '🥉', border: '#D97706', text: '#92400E', avatarSize: 44 },
]

// Podium column heights (left=2nd, center=1st, right=3rd)
const BAR_HEIGHTS = [72, 96, 60]

// Reveal order for suspense: 3rd place → 2nd → 1st
const REVEAL_ORDER = [2, 0, 1]  // col indices: right, left, center

// ── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ name, size = 36, C }) {
  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: C.brand, alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{ fontSize: size * 0.4, color: '#fff', fontFamily: 'Nunito_900Black' }}>
        {(name ?? '?')[0].toUpperCase()}
      </Text>
    </View>
  )
}

// ── Animated podium ──────────────────────────────────────────────────────────
function Podium({ top3, uid, C, s, onPressEntry }) {
  // One set of animated values per podium column (0=left/2nd, 1=center/1st, 2=right/3rd)
  const barScale    = useRef([0, 1, 2].map(() => new Animated.Value(0))).current
  const avatarY     = useRef([0, 1, 2].map(() => new Animated.Value(-60))).current
  const avatarOp    = useRef([0, 1, 2].map(() => new Animated.Value(0))).current
  const medalScale  = useRef([0, 1, 2].map(() => new Animated.Value(0))).current
  const xpOp        = useRef([0, 1, 2].map(() => new Animated.Value(0))).current

  useEffect(() => {
    if (top3.length === 0) return

    // ── Phase 1: bars rise (staggered 3rd → 2nd → 1st) ─────────────────
    Animated.stagger(130,
      REVEAL_ORDER.map((col) =>
        Animated.spring(barScale[col], {
          toValue: 1, tension: 70, friction: 8, useNativeDriver: true,
        })
      )
    ).start()

    // ── Phase 2: avatars drop in from above (150ms after bars start) ────
    const avatarTimer = setTimeout(() => {
      Animated.stagger(130,
        REVEAL_ORDER.map((col) =>
          Animated.parallel([
            Animated.spring(avatarY[col], {
              toValue: 0, tension: 110, friction: 9, useNativeDriver: true,
            }),
            Animated.timing(avatarOp[col], {
              toValue: 1, duration: 180, useNativeDriver: true,
            }),
          ])
        )
      ).start()
    }, 150)

    // ── Phase 3: medal emoji pops with overshoot (after avatar lands) ───
    const medalTimer = setTimeout(() => {
      Animated.stagger(130,
        REVEAL_ORDER.map((col) =>
          Animated.sequence([
            Animated.spring(medalScale[col], {
              toValue: 1.35, tension: 250, friction: 5, useNativeDriver: true,
            }),
            Animated.spring(medalScale[col], {
              toValue: 1, tension: 300, friction: 10, useNativeDriver: true,
            }),
          ])
        )
      ).start()
    }, 480)

    // ── Phase 4: XP numbers fade in (after medals pop) ──────────────────
    const xpTimer = setTimeout(() => {
      Animated.stagger(110,
        REVEAL_ORDER.map((col) =>
          Animated.timing(xpOp[col], {
            toValue: 1, duration: 280, useNativeDriver: true,
          })
        )
      ).start()
    }, 700)

    return () => {
      clearTimeout(avatarTimer)
      clearTimeout(medalTimer)
      clearTimeout(xpTimer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (top3.length === 0) {
    return (
      <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginVertical: 24 }]}>
        No XP earned this week yet — go study! 📚
      </Text>
    )
  }

  // Map display columns: [left=2nd, center=1st, right=3rd]
  const slots = top3.length === 1
    ? [null, top3[0], null]
    : top3.length === 2
    ? [top3[1], top3[0], null]
    : [top3[1], top3[0], top3[2]]

  return (
    <View style={s.podiumRow}>
      {slots.map((entry, col) => {
        const rankIdx = col === 0 ? 1 : col === 1 ? 0 : 2   // col → 0-based medal index
        const medal   = MEDALS[rankIdx]
        if (!entry) return <View key={col} style={{ flex: 1 }} />

        const isSelf = entry.uid === uid

        return (
          <TouchableOpacity
            key={col}
            style={[s.podiumCol, { flex: 1 }]}
            onPress={() => onPressEntry?.(entry)}
            activeOpacity={0.75}
          >

            {/* Medal emoji — pops in with overshoot */}
            <Animated.Text style={[s.podiumMedalEmoji, { transform: [{ scale: medalScale[col] }] }]}>
              {medal.emoji}
            </Animated.Text>

            {/* Avatar — drops from above */}
            <Animated.View style={[
              s.podiumAvatar,
              {
                borderColor: medal.border,
                borderWidth: isSelf ? 3 : 2,
                opacity: avatarOp[col],
                transform: [{ translateY: avatarY[col] }],
              },
            ]}>
              <Avatar name={entry.displayName} size={medal.avatarSize} C={C} />
            </Animated.View>

            {/* Name */}
            <Animated.Text
              style={[s.podiumName, { color: isSelf ? C.brand : C.text, opacity: avatarOp[col] }]}
              numberOfLines={1}
            >
              {isSelf ? 'You' : entry.displayName}
            </Animated.Text>

            {/* XP — fades in last */}
            <Animated.Text style={[s.podiumXP, { color: medal.text, opacity: xpOp[col] }]}>
              ⭐ {entry.weeklyXP}
            </Animated.Text>

            {/* Column bar — scales up from bottom */}
            <View style={{ height: BAR_HEIGHTS[col], width: '100%', justifyContent: 'flex-end', overflow: 'hidden' }}>
              <Animated.View style={[
                s.podiumBar,
                {
                  backgroundColor: medal.border + '44',
                  borderColor: medal.border,
                  height: BAR_HEIGHTS[col],
                  transform: [
                    { translateY: BAR_HEIGHTS[col] / 2 * (1 - 1) },
                    { scaleY: barScale[col] },
                  ],
                },
              ]} />
            </View>

          </TouchableOpacity>
        )
      })}
    </View>
  )
}

// ── Rank row (4th place and below) — slides in from right ───────────────────
function RankRow({ entry, rank, uid, C, s, index = 0, onPress }) {
  const slideX = useRef(new Animated.Value(60)).current
  const opAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const delay = 750 + index * 80   // starts after podium finishes
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.spring(slideX, { toValue: 0, tension: 80, friction: 9, useNativeDriver: true }),
        Animated.timing(opAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start()
    }, delay)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isSelf = entry.uid === uid
  return (
    <Animated.View style={{ opacity: opAnim, transform: [{ translateX: slideX }] }}>
      <TouchableOpacity
        style={[s.lbRow, isSelf && s.lbRowSelf, cardShadow(C.shadow)]}
        onPress={onPress}
        activeOpacity={0.75}
      >
        <Text style={[s.lbRank, { color: C.textMuted }]}>#{rank}</Text>
        <Avatar name={entry.displayName} size={36} C={C} />
        <View style={{ flex: 1 }}>
          <Text style={[s.lbName, { color: isSelf ? C.brand : C.text }]} numberOfLines={1}>
            {isSelf ? 'You' : entry.displayName}
          </Text>
        </View>
        <Text style={s.lbXP}>⭐ {entry.weeklyXP}</Text>
        <Text style={[s.lbChevron, { color: C.textDim }]}>›</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

// ── League entry banner ───────────────────────────────────────────────────────
function LeagueBanner({ tier, C, s, onPress }) {
  const meta = TIER_META[tier] ?? TIER_META.bronze
  const [countdown, setCountdown] = React.useState(() => formatCountdown(msUntilReset()))
  React.useEffect(() => {
    const id = setInterval(() => setCountdown(formatCountdown(msUntilReset())), 60_000)
    return () => clearInterval(id)
  }, [])
  return (
    <TouchableOpacity
      style={[s.leagueBanner, { borderColor: meta.color + '60', backgroundColor: meta.color + '15' }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={{ fontSize: 28 }}>{meta.emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[T.body, { color: meta.color, fontFamily: 'Nunito_800ExtraBold' }]}>
          {meta.label} League
        </Text>
        <Text style={[T.small, { color: C.textMuted }]}>Resets in {countdown}</Text>
      </View>
      <Text style={[T.h3, { color: C.textMuted }]}>›</Text>
    </TouchableOpacity>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function FriendsScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const s = makeStyles(C)

  const [tab,        setTab]        = useState('Leaderboard')
  const [lbMode,     setLbMode]     = useState('week')   // 'week' | 'school'
  const [refreshing, setRefreshing] = useState(false)
  // key increments on refresh so Podium unmounts/remounts → animation replays
  const [podiumKey, setPodiumKey]   = useState(0)

  const { friends, incomingRequests, friendCode, feed, acceptRequest, declineRequest } = useFriends(uid, user)
  const { leaderboard, school, loading: schoolLoading, refresh: refreshSchool } = useLeaderboard(uid)
  const { weeklyRanking, loading: weekLoading, refresh: refreshWeekly } = useFriendsLeaderboard(uid, user)
  const { tier } = useLeague(uid)

  const top3     = weeklyRanking.slice(0, 3)
  const restList = weeklyRanking.slice(3)

  function navigateToProfile(entry) {
    navigation.navigate('UserProfile', {
      targetUid: entry.uid,
      displayName: entry.displayName ?? entry.name ?? 'Student',
    })
  }

  async function handleRefresh() {
    setRefreshing(true)
    await Promise.all([refreshWeekly(), refreshSchool()])
    setPodiumKey((k) => k + 1)   // remount Podium → replay animation
    setRefreshing(false)
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <Text style={[T.h1, s.pageTitle]}>Social</Text>

      {/* Friend code banner */}
      {friendCode && (
        <View style={[s.codeBanner, cardShadow(C.shadow)]}>
          <View>
            <Text style={[T.label, { color: C.textMuted }]}>Your Friend Code</Text>
            <Text style={s.codeValue}>{friendCode}</Text>
          </View>
          <Text style={{ fontSize: 28 }}>🤝</Text>
        </View>
      )}

      {/* Add friend button */}
      <TouchableOpacity style={s.addFriendBtn} onPress={() => navigation.navigate('AddFriend')}>
        <Text style={[T.btn, { color: '#fff' }]}>+ Add Friend by Code</Text>
      </TouchableOpacity>

      {/* League entry banner */}
      <LeagueBanner tier={tier} C={C} s={s} onPress={() => navigation.navigate('League')} />

      {/* Pending requests */}
      {incomingRequests.length > 0 && (
        <View style={s.requests}>
          {incomingRequests.map((req) => (
            <View key={req.id} style={[s.requestRow, cardShadow(C.shadow)]}>
              <Text style={[T.small, { color: C.text, flex: 1 }]}>{req.fromName} wants to be friends</Text>
              <View style={s.requestBtns}>
                <TouchableOpacity style={[s.requestBtn, { backgroundColor: C.brand }]} onPress={() => acceptRequest(req)}>
                  <Text style={[s.requestBtnText, { color: '#fff' }]}>✓</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.requestBtn, { backgroundColor: C.surface2 }]} onPress={() => declineRequest(req)}>
                  <Text style={[s.requestBtnText, { color: C.textMuted }]}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Tabs */}
      <View style={s.tabRow}>
        {TABS.map((t) => (
          <TouchableOpacity key={t} style={[s.tabBtn, tab === t && s.tabActive]} onPress={() => setTab(t)}>
            <Text style={[s.tabText, tab === t && s.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={C.brand} />
        }
      >
        {/* ── LEADERBOARD TAB ── */}
        {tab === 'Leaderboard' && (
          <View style={s.list}>

            {/* This Week / All Time toggle */}
            <View style={s.modeToggle}>
              <TouchableOpacity
                style={[s.modeBtn, lbMode === 'week' && s.modeBtnActive]}
                onPress={() => setLbMode('week')}
              >
                <Text style={[s.modeBtnText, lbMode === 'week' && s.modeBtnTextActive]}>🔥 This Week</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.modeBtn, lbMode === 'school' && s.modeBtnActive]}
                onPress={() => setLbMode('school')}
              >
                <Text style={[s.modeBtnText, lbMode === 'school' && s.modeBtnTextActive]}>🏫 All Time</Text>
              </TouchableOpacity>
            </View>

            {/* ── THIS WEEK ── */}
            {lbMode === 'week' && (
              <>
                <Text style={[T.label, { color: C.textMuted, textAlign: 'center', marginBottom: 4 }]}>
                  Friends + You · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} week
                </Text>

                {weekLoading && (
                  <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginVertical: 20 }]}>
                    Loading...
                  </Text>
                )}

                {!weekLoading && weeklyRanking.length === 0 && (
                  <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginVertical: 24 }]}>
                    Add some friends to see how you stack up! 👇
                  </Text>
                )}

                {/* Podium — key forces remount on refresh to replay animation */}
                {!weekLoading && weeklyRanking.length > 0 && (
                  <Podium key={podiumKey} top3={top3} uid={uid} C={C} s={s} onPressEntry={navigateToProfile} />
                )}

                {/* Rank 4+ list — each row self-animates with staggered delay */}
                {!weekLoading && restList.map((entry, i) => (
                  <RankRow
                    key={`${podiumKey}-${entry.uid}`}
                    entry={entry}
                    rank={i + 4}
                    uid={uid}
                    C={C}
                    s={s}
                    index={i}
                    onPress={() => navigateToProfile(entry)}
                  />
                ))}

                {!weekLoading && weeklyRanking.length > 0 && (
                  <Text style={[T.label, { color: C.textDim, textAlign: 'center', marginTop: 8, textTransform: 'none', letterSpacing: 0 }]}>
                    Resets every Monday 🗓
                  </Text>
                )}
              </>
            )}

            {/* ── ALL TIME ── */}
            {lbMode === 'school' && (
              <>
                {!school && (
                  <Text style={[T.body, { color: C.textMuted, textAlign: 'center', padding: 20 }]}>
                    Set your school in onboarding to see the school leaderboard.
                  </Text>
                )}
                {school && (
                  <Text style={[T.label, { color: C.textMuted, textAlign: 'center', marginBottom: 8 }]}>
                    🏫 {school} · Top 25
                  </Text>
                )}
                {leaderboard.map((entry, i) => {
                  const isSelf = entry.uid === uid
                  const medal  = i < 3 ? MEDALS[i] : null
                  return (
                    <TouchableOpacity
                      key={entry.uid}
                      style={[s.lbRow, isSelf && s.lbRowSelf, cardShadow(C.shadow)]}
                      onPress={() => navigateToProfile(entry)}
                      activeOpacity={0.75}
                    >
                      {medal
                        ? <Text style={s.lbMedalEmoji}>{medal.emoji}</Text>
                        : <Text style={[s.lbRank, { color: C.textMuted }]}>#{i + 1}</Text>
                      }
                      <Avatar name={entry.displayName} size={36} C={C} />
                      <View style={{ flex: 1 }}>
                        <Text style={[s.lbName, { color: isSelf ? C.brand : C.text }]} numberOfLines={1}>
                          {entry.displayName ?? 'Student'}
                        </Text>
                      </View>
                      <Text style={s.lbXP}>⭐ {entry.xp ?? 0}</Text>
                      <Text style={[s.lbChevron, { color: C.textDim }]}>›</Text>
                    </TouchableOpacity>
                  )
                })}
                {schoolLoading && (
                  <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginVertical: 12 }]}>
                    Loading...
                  </Text>
                )}
              </>
            )}
          </View>
        )}

        {/* ── FRIENDS TAB ── */}
        {tab === 'Friends' && (
          <View style={s.list}>
            {friends.length === 0 && (
              <Text style={[T.body, { color: C.textMuted, textAlign: 'center', padding: 20 }]}>
                No friends yet. Add a friend by their code!
              </Text>
            )}
            {friends.map((f) => (
              <TouchableOpacity
                key={f.id}
                style={[s.friendRow, cardShadow(C.shadow)]}
                onPress={() => navigateToProfile({ uid: f.id ?? f.uid, displayName: f.displayName })}
                activeOpacity={0.75}
              >
                <Avatar name={f.displayName} size={42} C={C} />
                <View style={{ flex: 1 }}>
                  <Text style={[s.friendName, { color: C.text }]}>{f.displayName}</Text>
                </View>
                <TouchableOpacity
                  style={[s.challengeBtn, { backgroundColor: C.brand }]}
                  onPress={(e) => {
                    e.stopPropagation?.()
                    navigation.navigate('Challenge', { friendUid: f.id, friendName: f.displayName })
                  }}
                >
                  <Text style={[T.label, { color: '#fff', textTransform: 'none', letterSpacing: 0 }]}>⚔️</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ── ACTIVITY TAB ── */}
        {tab === 'Activity' && (
          <View style={s.list}>
            {feed.length === 0 && (
              <Text style={[T.body, { color: C.textMuted, textAlign: 'center', padding: 20 }]}>
                No recent activity.
              </Text>
            )}
            {feed.map((item) => (
              <View key={item.id} style={[s.feedRow, cardShadow(C.shadow)]}>
                <Text style={[T.body, { color: C.text }]}>{item.text ?? 'Activity'}</Text>
                <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>
                  {item.timestamp ? timeAgo(item.timestamp.toMillis?.() ?? 0) : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:          { flex: 1, backgroundColor: C.bg },
    pageTitle:     { color: C.text, paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 },

    codeBanner:    { marginHorizontal: 16, marginBottom: 10, backgroundColor: C.surface, borderRadius: 14, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: C.border },
    codeValue:     { fontSize: 22, fontFamily: 'Nunito_900Black', color: C.brand, letterSpacing: 3, marginTop: 2 },

    addFriendBtn:  { marginHorizontal: 16, marginBottom: 12, backgroundColor: C.brand, borderRadius: 14, paddingVertical: 13, alignItems: 'center' },
    leagueBanner:  { marginHorizontal: 16, marginBottom: 12, borderRadius: 14, paddingVertical: 12, paddingHorizontal: 14, borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', gap: 10 },

    requests:      { marginHorizontal: 16, marginBottom: 8, gap: 8 },
    requestRow:    { backgroundColor: C.surface, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: C.brand + '60' },
    requestBtns:   { flexDirection: 'row', gap: 6 },
    requestBtn:    { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    requestBtnText:{ fontFamily: 'Nunito_800ExtraBold', fontSize: 16 },

    tabRow:        { flexDirection: 'row', marginHorizontal: 16, marginBottom: 10, backgroundColor: C.surface2, borderRadius: 14, padding: 4, gap: 2 },
    tabBtn:        { flex: 1, paddingVertical: 9, borderRadius: 11, alignItems: 'center' },
    tabActive:     { backgroundColor: C.brand },
    tabText:       { fontFamily: 'Nunito_700Bold', fontSize: 13, color: C.textMuted },
    tabTextActive: { color: '#fff' },

    list:          { paddingHorizontal: 16, paddingTop: 4, gap: 10 },

    modeToggle:        { flexDirection: 'row', backgroundColor: C.surface, borderRadius: 12, padding: 3, borderWidth: 1, borderColor: C.border, marginBottom: 4 },
    modeBtn:           { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center' },
    modeBtnActive:     { backgroundColor: C.brand },
    modeBtnText:       { fontFamily: 'Nunito_700Bold', fontSize: 13, color: C.textMuted },
    modeBtnTextActive: { color: '#fff' },

    // Podium
    podiumRow:        { flexDirection: 'row', alignItems: 'flex-end', marginVertical: 12, gap: 6 },
    podiumCol:        { alignItems: 'center', gap: 3 },
    podiumMedalEmoji: { fontSize: 26, marginBottom: 2 },
    podiumAvatar:     { borderRadius: 50, overflow: 'hidden' },
    podiumName:       { fontFamily: 'Nunito_800ExtraBold', fontSize: 12, textAlign: 'center', maxWidth: 84 },
    podiumXP:         { fontFamily: 'Nunito_700Bold', fontSize: 11, marginBottom: 4 },
    podiumBar:        { width: '100%', borderTopWidth: 2, borderRadius: 6 },

    // Leaderboard list rows
    lbRow:         { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.surface, borderRadius: 14, padding: 12, borderWidth: 1, borderColor: C.border },
    lbRowSelf:     { borderColor: C.brand },
    lbRank:        { fontFamily: 'Nunito_800ExtraBold', fontSize: 15, width: 32, textAlign: 'center' },
    lbMedalEmoji:  { fontSize: 20, width: 32, textAlign: 'center' },
    lbName:        { fontFamily: 'Nunito_700Bold', fontSize: 14 },
    lbXP:          { fontFamily: 'Nunito_800ExtraBold', fontSize: 13, color: '#F59E0B' },
    lbChevron:     { fontFamily: 'Nunito_700Bold', fontSize: 20, marginLeft: 2 },

    // Friends tab
    friendRow:     { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: 14, padding: 12, borderWidth: 1, borderColor: C.border },
    friendName:    { fontFamily: 'Nunito_700Bold', fontSize: 15 },
    challengeBtn:  { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },

    // Activity tab
    feedRow:       { backgroundColor: C.surface, borderRadius: 14, padding: 14, gap: 4, borderWidth: 1, borderColor: C.border },
  })
}
