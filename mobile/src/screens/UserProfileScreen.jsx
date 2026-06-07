import React, { useEffect, useRef, useState } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  Animated, ActivityIndicator, Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { doc, getDoc, getDocs, query, collection, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useFriends, timeAgo } from '../hooks/useFriends'
import { getLevel } from '../hooks/useRP'
import { getWeekKey } from '../hooks/useRP'
import { T, duoBtn, cardShadow } from '../styles/duo'

const AVATAR_COLORS = ['#58CC02', '#1CB0F6', '#CE82FF', '#FFC800', '#FF4B4B', '#FF9600']

function avatarColor(name) {
  const code = (name ?? 'S').toUpperCase().charCodeAt(0)
  return AVATAR_COLORS[code % AVATAR_COLORS.length]
}

function initials(name) {
  return (name ?? '?')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const LEVEL_ICONS = ['🌱', '📖', '🎓', '🔬', '💡', '🏅', '🏆']

export default function UserProfileScreen({ route, navigation }) {
  const { targetUid, displayName: paramName } = route.params
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const isSelf = targetUid === uid

  const { friends, sentRequests, sendRequestByUid } = useFriends(uid, user)

  // ── Remote data ───────────────────────────────────────────────────────────
  const [profile,  setProfile]  = useState(null)   // leaderboard doc
  const [activity, setActivity] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        // Public leaderboard doc: { displayName, rp  weeklyXP, weekKey }
        const lbSnap = await getDoc(doc(db, 'leaderboard', targetUid))
        setProfile(lbSnap.exists() ? lbSnap.data() : {})

        // Their public activity feed (readable if security rules allow)
        const actSnap = await getDocs(
          query(
            collection(db, 'users', targetUid, 'activity'),
            orderBy('timestamp', 'desc'),
            limit(5),
          )
        ).catch(() => null)
        if (actSnap) {
          setActivity(actSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
        }
      } catch {}
      setLoading(false)
    })()
  }, [targetUid])

  // ── Derived stats ─────────────────────────────────────────────────────────
  const name      = profile?.displayName ?? paramName ?? 'Student'
  const totalRP   = profile?.xp ?? 0
  const weeklyRP  = profile?.weekKey === getWeekKey() ? (profile?.weeklyXP ?? 0) : 0
  const level     = getLevel(totalRP)
  const levelIcon = LEVEL_ICONS[Math.min(level.level - 1, LEVEL_ICONS.length - 1)]
  const color     = avatarColor(name)
  const inits     = initials(name)

  // ── Friend status ─────────────────────────────────────────────────────────
  const isFriend     = friends.some((f) => f.id === targetUid || f.uid === targetUid)
  const requestSent  = sentRequests.some((r) => r.toUid === targetUid)
  const [reqState, setReqState] = useState(null)  // 'sending' | 'sent' | 'error'

  async function handleAddFriend() {
    setReqState('sending')
    const result = await sendRequestByUid(targetUid, name)
    if (result === 'sent') {
      setReqState('sent')
    } else if (result === 'already_sent' || result === 'already_friends') {
      setReqState('sent')
    } else {
      setReqState('error')
      Alert.alert('Oops', 'Could not send friend request. Try again.')
    }
  }

  // ── Entry animation ───────────────────────────────────────────────────────
  const avatarScale = useRef(new Animated.Value(0)).current
  const contentOp   = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (loading) return
    Animated.parallel([
      Animated.spring(avatarScale, { toValue: 1, tension: 100, friction: 8, useNativeDriver: true }),
      Animated.timing(contentOp, { toValue: 1, duration: 350, useNativeDriver: true }),
    ]).start()
  }, [loading])

  const s = makeStyles(C)

  if (loading) {
    return (
      <SafeAreaView style={s.safe} edges={['bottom']}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backBtnText}>←</Text>
        </TouchableOpacity>
        <View style={s.loadingCenter}>
          <ActivityIndicator size="large" color={C.brand} />
        </View>
      </SafeAreaView>
    )
  }

  // Friend action button
  function FriendButton() {
    if (isSelf) {
      return (
        <View style={[s.selfBadge]}>
          <Text style={[T.body, { color: C.brand }]}>👤 That's you!</Text>
        </View>
      )
    }
    if (isFriend) {
      return (
        <View style={[s.friendedBadge, { borderColor: C.brand }]}>
          <Text style={[T.btn, { color: C.brand }]}>✓ Friends</Text>
        </View>
      )
    }
    if (requestSent || reqState === 'sent') {
      return (
        <View style={[s.friendedBadge, { borderColor: C.textMuted }]}>
          <Text style={[T.btn, { color: C.textMuted }]}>📨 Request Sent</Text>
        </View>
      )
    }
    return (
      <TouchableOpacity
        style={duoBtn(C.brand, C.brandDark)}
        onPress={handleAddFriend}
        disabled={reqState === 'sending'}
      >
        {reqState === 'sending'
          ? <ActivityIndicator color="#fff" />
          : <Text style={[T.btn, { color: '#fff' }]}>+ Add Friend</Text>
        }
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      {/* Back button */}
      <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
        <Text style={s.backBtnText}>←</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Avatar + name ── */}
        <Animated.View style={[s.heroSection, { transform: [{ scale: avatarScale }] }]}>
          <View style={[s.avatarRing, { borderColor: color }]}>
            <View style={[s.avatar, { backgroundColor: color }]}>
              <Text style={[T.h1, { color: '#fff', fontSize: 38 }]}>{inits}</Text>
            </View>
          </View>
          <Text style={[T.h2, { color: C.text, marginTop: 14, textAlign: 'center' }]}>{name}</Text>
          <View style={s.levelBadge}>
            <Text style={s.levelIcon}>{levelIcon}</Text>
            <Text style={[T.label, { color: C.brand }]}>{level.name}</Text>
          </View>
        </Animated.View>

        {/* ── Stats row ── */}
        <Animated.View style={[s.statsRow, cardShadow(C.shadow), { opacity: contentOp }]}>
          <View style={s.statCell}>
            <Text style={s.statValue}>⭐ {totalRP >= 1000 ? `${(totalRP / 1000).toFixed(1)}k` : totalRP}</Text>
            <Text style={[T.label, { color: C.textMuted }]}>Total RP</Text>
          </View>
          <View style={[s.statDivider, { backgroundColor: C.border }]} />
          <View style={s.statCell}>
            <Text style={s.statValue}>🔥 {weeklyRP}</Text>
            <Text style={[T.label, { color: C.textMuted }]}>This Week</Text>
          </View>
          <View style={[s.statDivider, { backgroundColor: C.border }]} />
          <View style={s.statCell}>
            <Text style={s.statValue}>{levelIcon} {level.level}</Text>
            <Text style={[T.label, { color: C.textMuted }]}>Level</Text>
          </View>
        </Animated.View>

        {/* ── Level progress bar ── */}
        <Animated.View style={[s.levelCard, cardShadow(C.shadow), { opacity: contentOp }]}>
          <View style={s.levelRow}>
            <Text style={[T.small, { color: C.textMuted }]}>{level.name}</Text>
            {level.next && (
              <Text style={[T.small, { color: C.textMuted }]}>{level.next.name}</Text>
            )}
          </View>
          <View style={s.progressBg}>
            <View style={[s.progressFill, { width: `${Math.round(level.progress * 100)}%`, backgroundColor: color }]} />
          </View>
          {level.next ? (
            <Text style={[T.label, { color: C.textDim, textAlign: 'center', marginTop: 6, textTransform: 'none', letterSpacing: 0 }]}>
              {level.next.min - totalRP} RP to {level.next.name}
            </Text>
          ) : (
            <Text style={[T.label, { color: C.brand, textAlign: 'center', marginTop: 6 }]}>MAX LEVEL 🏆</Text>
          )}
        </Animated.View>

        {/* ── Friend / challenge actions ── */}
        <Animated.View style={[s.actions, { opacity: contentOp }]}>
          <FriendButton />
          {isFriend && !isSelf && (
            <TouchableOpacity
              style={[s.challengeBtn, { borderColor: C.brand }]}
              onPress={() => navigation.navigate('Challenge', { friendUid: targetUid, friendName: name })}
            >
              <Text style={[T.btn, { color: C.brand }]}>⚔️ Challenge</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* ── Recent activity (if readable) ── */}
        {activity.length > 0 && (
          <Animated.View style={{ opacity: contentOp, width: '100%' }}>
            <Text style={[T.label, { color: C.textMuted, marginTop: 8, marginBottom: 8 }]}>
              Recent Activity
            </Text>
            {activity.map((item) => (
              <View key={item.id} style={[s.feedRow, cardShadow(C.shadow)]}>
                <Text style={[T.small, { color: C.text, flex: 1 }]}>{item.text ?? 'Activity'}</Text>
                <Text style={[T.label, { color: C.textDim, textTransform: 'none', letterSpacing: 0 }]}>
                  {item.timestamp ? timeAgo(item.timestamp.toMillis?.() ?? 0) : ''}
                </Text>
              </View>
            ))}
          </Animated.View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:         { flex: 1, backgroundColor: C.bg },
    loadingCenter:{ flex: 1, alignItems: 'center', justifyContent: 'center' },
    backBtn:      { width: 40, height: 40, borderRadius: 20, backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center', margin: 16, marginBottom: 0 },
    backBtnText:  { fontSize: 20, color: C.text, fontFamily: 'Nunito_700Bold' },

    scroll:       { alignItems: 'center', paddingHorizontal: 20, paddingTop: 16 },

    heroSection:  { alignItems: 'center', marginBottom: 20, width: '100%' },
    avatarRing:   { width: 110, height: 110, borderRadius: 55, borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
    avatar:       { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
    levelBadge:   { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: C.brandBg, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, marginTop: 8 },
    levelIcon:    { fontSize: 14 },

    statsRow:     { flexDirection: 'row', alignSelf: 'stretch', backgroundColor: C.surface, borderRadius: 18, borderWidth: 1, borderColor: C.border, overflow: 'hidden', marginBottom: 12 },
    statCell:     { flex: 1, alignItems: 'center', paddingVertical: 16, gap: 4 },
    statValue:    { fontFamily: 'Nunito_800ExtraBold', fontSize: 16, color: C.text },
    statDivider:  { width: 1, marginVertical: 16 },

    levelCard:    { alignSelf: 'stretch', backgroundColor: C.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.border, marginBottom: 16 },
    levelRow:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    progressBg:   { height: 10, backgroundColor: C.surface2, borderRadius: 5, overflow: 'hidden' },
    progressFill: { height: 10, borderRadius: 5 },

    actions:      { alignSelf: 'stretch', gap: 10, marginBottom: 20 },
    selfBadge:    { alignSelf: 'stretch', alignItems: 'center', paddingVertical: 14, borderRadius: 16, backgroundColor: C.brandBg, borderWidth: 1.5, borderColor: C.brand + '60' },
    friendedBadge:{ alignSelf: 'stretch', alignItems: 'center', paddingVertical: 14, borderRadius: 16, borderWidth: 1.5, backgroundColor: 'transparent' },
    challengeBtn: { alignSelf: 'stretch', alignItems: 'center', paddingVertical: 14, borderRadius: 16, borderWidth: 1.5, backgroundColor: 'transparent' },

    feedRow:      { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface, borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: C.border, gap: 10 },
  })
}
