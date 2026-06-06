import React, { useRef, useState, useEffect } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  Switch, Alert, Animated, Modal, FlatList, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useAuth } from '../hooks/useAuth'
import { useSubject } from '../context/SubjectContext'
import { SUBJECT_META } from '../content/subjects'
import { useProgress } from '../hooks/useProgress'
import { useRP } from '../hooks/useRP'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useNotifications, formatTime } from '../hooks/useNotifications'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { T, duoBtn, cardShadow } from '../styles/duo'
import { useDoubleRP } from '../context/DoubleRPContext'
import { useSubscription } from '../context/SubscriptionContext'
import NudgeBanner from '../components/NudgeBanner'
import { getEngagementNudge } from '../hooks/useEngagementNudge'

const AVATAR_COLORS = ['#58CC02', '#1CB0F6', '#CE82FF', '#FFC800', '#FF4B4B']

// ── Time picker data ───────────────────────────────────────────────────────────
// Every 30 minutes from 6 AM to 11 PM
const TIME_OPTIONS = Array.from({ length: 36 }, (_, i) => {
  const totalMinutes = 6 * 60 + i * 30   // starts at 6:00 AM
  const hour   = Math.floor(totalMinutes / 60)
  const minute = totalMinutes % 60
  return { hour, minute, label: formatTime(hour, minute) }
}).filter(({ hour }) => hour <= 23)

export default function ProfileScreen({ navigation }) {
  const { C, isDark, toggleTheme } = useTheme()
  const { user } = useAuthContext()
  const { deleteAccount } = useAuth()
  const uid = user?.uid

  const { history }                   = useProgress(uid)
  const { rp, xp, weeklyXP }              = useRP(uid)
  const { streak, longestStreak }     = useDailyStreak(uid)
  const level                         = getLevel(xp)
  const { isActive: boostActive, timeLeft: boostTimeLeft } = useDoubleRP()
  const { isSubscribed } = useSubscription()

  const { subject, setSubject } = useSubject()

  const [schoolName, setSchoolName] = useState(null)
  function loadSchool() {
    if (!uid || user?.isAnonymous) return
    getDoc(doc(db, 'users', uid, 'meta', 'school'))
      .then(snap => { if (snap.exists()) setSchoolName(snap.data().name) })
      .catch(() => {})
  }
  useEffect(() => { loadSchool() }, [uid])
  useEffect(() => navigation.addListener('focus', loadSchool), [navigation, uid])

  const {
    enabled: notifEnabled,
    toggle:  toggleNotif,
    setTime, formattedTime, loaded: notifLoaded,
    hour: notifHour, minute: notifMinute,
  } = useNotifications(streak)

  const [showTimePicker,    setShowTimePicker]    = useState(false)
  const [showSubjectPicker, setShowSubjectPicker] = useState(false)
  const [nudgeDismissed,    setNudgeDismissed]    = useState(false)

  // Reset nudge on screen focus
  useEffect(() => navigation.addListener('focus', () => setNudgeDismissed(false)), [navigation])

  // Slide-up animation for time picker modal
  const slideAnim        = useRef(new Animated.Value(400)).current
  const subjectSlideAnim = useRef(new Animated.Value(400)).current

  function openTimePicker() {
    setShowTimePicker(true)
    slideAnim.setValue(400)
    Animated.spring(slideAnim, { toValue: 0, tension: 120, friction: 10, useNativeDriver: true }).start()
  }
  function closeTimePicker() {
    Animated.timing(slideAnim, { toValue: 400, duration: 200, useNativeDriver: true }).start(
      () => setShowTimePicker(false)
    )
  }

  function openSubjectPicker() {
    setShowSubjectPicker(true)
    subjectSlideAnim.setValue(400)
    Animated.spring(subjectSlideAnim, { toValue: 0, tension: 120, friction: 10, useNativeDriver: true }).start()
  }
  function closeSubjectPicker() {
    Animated.timing(subjectSlideAnim, { toValue: 400, duration: 200, useNativeDriver: true }).start(
      () => setShowSubjectPicker(false)
    )
  }

  const displayName = user?.displayName ?? user?.email?.split('@')[0] ?? 'Student'
  const initials    = displayName.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const avatarColor = AVATAR_COLORS[initials.charCodeAt(0) % AVATAR_COLORS.length]

  const totalQuizzes = history.length
  const avgScore     = totalQuizzes > 0
    ? Math.round(history.reduce((a, h) => a + (h.pct ?? 0), 0) / totalQuizzes)
    : 0

  function handleSignOut() {
    Alert.alert('Sign Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: async () => {
        try { await signOut(auth) } catch (e) { Alert.alert('Error', e.message) }
      }},
    ])
  }

  async function performDelete(password) {
    try {
      // On success, onAuthStateChanged clears the user and the app routes to login.
      await deleteAccount({ password })
    } catch (e) {
      const msg =
        e?.code === 'auth/wrong-password' || e?.code === 'auth/invalid-credential'
          ? 'Incorrect password. Please try again.'
          : e?.code === 'auth/requires-recent-login'
          ? 'For your security, please sign out, sign back in, and try again.'
          : (e?.message || 'Could not delete your account. Please try again.')
      Alert.alert('Delete Failed', msg)
    }
  }

  function handleDeleteAccount() {
    const providerId = user?.providerData?.[0]?.providerId
    Alert.alert(
      'Delete Account',
      'This permanently deletes your account and all your data — progress, streaks, friends, and pets. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Email/password users must re-enter their password to confirm.
            if (providerId === 'password' && Platform.OS === 'ios') {
              Alert.prompt(
                'Confirm Password',
                'Enter your password to permanently delete your account.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive', onPress: (pw) => performDelete(pw) },
                ],
                'secure-text',
              )
            } else {
              // Google users re-authenticate via the Google sheet; guests delete directly.
              performDelete()
            }
          },
        },
      ],
    )
  }

  async function handleToggleNotif() {
    if (!notifEnabled) {
      const ok = await toggleNotif()
      if (ok === false) {
        Alert.alert(
          'Notifications Blocked',
          'Go to Settings → Notifications → Regents Prep and enable notifications.',
        )
      }
    } else {
      toggleNotif()
    }
  }

  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Avatar card ── */}
        <View style={[s.profileCard, cardShadow(C.shadow)]}>
          <View style={[s.avatarRing, { borderColor: avatarColor }]}>
            <View style={[s.avatar, { backgroundColor: avatarColor }]}>
              <Text style={[T.h1, { color: '#fff', fontSize: 36 }]}>{initials}</Text>
            </View>
          </View>
          <Text style={[T.h2, { color: C.text, marginTop: 12 }]}>{displayName}</Text>
          <Text style={[T.body, { color: C.textMuted }]}>{user?.email ?? 'Guest Account'}</Text>
          <View style={[s.levelBadge, { backgroundColor: C.brandBg, borderColor: C.brand }]}>
            <Text style={[T.body, { color: C.brand }]}>⭐ {level.name}</Text>
            <Text style={[T.small, { color: C.textMuted, marginLeft: 6 }]}>Lv. {level.level} · {rp} RP</Text>
          </View>
        </View>

        {/* ── Stats ── */}
        <View style={s.statsRow}>
          {[
            { num: totalQuizzes, label: 'Quizzes' },
            { num: `${avgScore}%`, label: 'Avg Score' },
            { num: rp, label: 'Total RP' },
          ].map(({ num, label }) => (
            <View key={label} style={[s.statCard, cardShadow(C.shadow)]}>
              <Text style={[T.num, { color: C.brand, fontSize: 24 }]}>{num}</Text>
              <Text style={[T.label, { color: C.textMuted, marginTop: 2, textTransform: 'none', letterSpacing: 0 }]}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Engagement nudge */}
        {!nudgeDismissed && (() => {
          const nudge = getEngagementNudge('profile', { streak, longestStreak, weeklyXP })
          return nudge && <NudgeBanner {...nudge} onDismiss={() => setNudgeDismissed(true)} />
        })()}

        {/* ── Regents Exam Selection ── */}
        <TouchableOpacity
          style={[s.rowCard, cardShadow(C.shadow)]}
          onPress={openSubjectPicker}
          activeOpacity={0.85}
        >
          <View style={s.rowLeft}>
            <Text style={{ fontSize: 28 }}>{SUBJECT_META[subject]?.icon ?? '📚'}</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={[T.h3, { color: C.text }]}>My Regents Exam</Text>
              <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
                {SUBJECT_META[subject]?.name ?? 'Select subject'}
              </Text>
            </View>
          </View>
          <Text style={[T.body, { color: C.textMuted }]}>›</Text>
        </TouchableOpacity>

        {/* ── School ── */}
        {!user?.isAnonymous && (
          <TouchableOpacity
            style={[s.rowCard, cardShadow(C.shadow)]}
            onPress={() => navigation.navigate('SchoolChange')}
            activeOpacity={0.85}
          >
            <View style={s.rowLeft}>
              <Text style={{ fontSize: 28 }}>🏫</Text>
              <View style={{ marginLeft: 12 }}>
                <Text style={[T.h3, { color: C.text }]}>My School</Text>
                <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
                  {schoolName ?? 'Not set — tap to choose'}
                </Text>
              </View>
            </View>
            <Text style={[T.body, { color: C.textMuted }]}>›</Text>
          </TouchableOpacity>
        )}

        {/* ── RP Shop ── */}
        <TouchableOpacity
          style={[s.rowCard, cardShadow(C.shadow)]}
          onPress={() => navigation.navigate('Shop')}
          activeOpacity={0.85}
        >
          <View style={s.rowLeft}>
            <Text style={{ fontSize: 28 }}>🛒</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={[T.h3, { color: C.text }]}>XP Shop</Text>
              <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>Freeze, hearts, boosts</Text>
            </View>
          </View>
          <View style={s.rowRight}>
            {boostActive && (
              <View style={s.boostPill}>
                <Text style={[T.label, { color: '#F59E0B', textTransform: 'none', letterSpacing: 0 }]}>
                  ⚡ {Math.floor(boostTimeLeft / 60)}:{String(boostTimeLeft % 60).padStart(2, '0')}
                </Text>
              </View>
            )}
            <Text style={[T.body, { color: C.textMuted }]}>›</Text>
          </View>
        </TouchableOpacity>

        {/* ── Feed ── */}
        <TouchableOpacity
          style={[s.rowCard, cardShadow(C.shadow)]}
          onPress={() => navigation.navigate('FriendsMain')}
          activeOpacity={0.85}
        >
          <View style={s.rowLeft}>
            <Text style={{ fontSize: 28 }}>🌐</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={[T.h3, { color: C.text }]}>Feed</Text>
              <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>Friends, league & challenges</Text>
            </View>
          </View>
          <Text style={[T.body, { color: C.textMuted }]}>›</Text>
        </TouchableOpacity>

        {/* ── Pet Personality Quiz ── */}
        <TouchableOpacity
          style={[s.rowCard, cardShadow(C.shadow)]}
          onPress={() => navigation.navigate('PetPersonalityQuiz')}
          activeOpacity={0.85}
        >
          <View style={s.rowLeft}>
            <Text style={{ fontSize: 28 }}>🐾</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={[T.h3, { color: C.text }]}>Find Your Pet</Text>
              <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
                Discover which pet matches your personality
              </Text>
            </View>
          </View>
          <Text style={[T.body, { color: C.textMuted }]}>›</Text>
        </TouchableOpacity>

        {/* ── Support / Subscribe ── */}
        <TouchableOpacity
          style={[s.rowCard, cardShadow(C.shadow), { borderColor: isSubscribed ? '#9333EA55' : C.border }]}
          onPress={() => navigation.navigate('Support')}
          activeOpacity={0.85}
        >
          <View style={s.rowLeft}>
            <Text style={{ fontSize: 28 }}>{isSubscribed ? '💜' : '⭐'}</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={[T.h3, { color: C.text }]}>{isSubscribed ? 'Premium Active' : 'Go Premium'}</Text>
              <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
                {isSubscribed ? 'Unlimited hearts · Thank you!' : 'Unlimited hearts · from $1.99/mo'}
              </Text>
            </View>
          </View>
          <View style={s.rowRight}>
            {isSubscribed && (
              <View style={[s.boostPill, { backgroundColor: '#F3E8FF', borderColor: '#9333EA55' }]}>
                <Text style={[T.label, { color: '#9333EA', textTransform: 'none', letterSpacing: 0 }]}>
                  ♾️ Active
                </Text>
              </View>
            )}
            <Text style={[T.body, { color: C.textMuted }]}>›</Text>
          </View>
        </TouchableOpacity>

        {/* ── Notifications ── */}
        <Text style={[T.label, { color: C.textMuted, marginHorizontal: 16, marginBottom: 8 }]}>Notifications</Text>
        <View style={[s.settingsCard, cardShadow(C.shadow)]}>

          {/* Enable toggle */}
          <View style={s.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={[T.body, { color: C.text }]}>Daily Reminder</Text>
              <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
                {notifEnabled
                  ? `🔔 Reminds you at ${formattedTime}`
                  : 'Turn on to protect your streak'}
              </Text>
            </View>
            <Switch
              value={notifEnabled}
              onValueChange={handleToggleNotif}
              trackColor={{ false: C.surface2, true: C.brand }}
              thumbColor="#fff"
              disabled={!notifLoaded}
            />
          </View>

          {/* Reminder time — only visible when enabled */}
          {notifEnabled && (
            <TouchableOpacity
              style={[s.settingRow, { borderTopWidth: 1, borderTopColor: C.border }]}
              onPress={openTimePicker}
              activeOpacity={0.75}
            >
              <View style={{ flex: 1 }}>
                <Text style={[T.body, { color: C.text }]}>Reminder Time</Text>
                <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
                  {streak > 0
                    ? `"Don't break your 🔥 ${streak}-day streak!"`
                    : '"Ready to start a streak? Study today! 📚"'}
                </Text>
              </View>
              <View style={[s.timeBadge, { backgroundColor: C.brandBg, borderColor: C.brand + '60' }]}>
                <Text style={[T.body, { color: C.brand }]}>{formattedTime}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* ── Settings ── */}
        <Text style={[T.label, { color: C.textMuted, marginHorizontal: 16, marginBottom: 8 }]}>Settings</Text>
        <View style={[s.settingsCard, cardShadow(C.shadow)]}>
          <View style={s.settingRow}>
            <View>
              <Text style={[T.body, { color: C.text }]}>Dark Mode</Text>
              <Text style={[T.small, { color: C.textMuted }]}>{isDark ? 'On' : 'Off'}</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: C.surface2, true: C.brand }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* ── Account ── */}
        <Text style={[T.label, { color: C.textMuted, marginHorizontal: 16, marginBottom: 8, marginTop: 4 }]}>Account</Text>
        <View style={[s.settingsCard, cardShadow(C.shadow)]}>
          <View style={s.settingRow}>
            <Text style={[T.body, { color: C.text }]}>Email</Text>
            <Text style={[T.small, { color: C.textMuted }]}>{user?.email ?? 'Guest'}</Text>
          </View>
          <View style={[s.settingRow, { borderTopWidth: 1, borderTopColor: C.border }]}>
            <Text style={[T.body, { color: C.text }]}>Type</Text>
            <Text style={[T.small, { color: C.textMuted }]}>{user?.isAnonymous ? 'Guest' : 'Full account'}</Text>
          </View>
        </View>

        {/* ── Sign out ── */}
        <View style={{ marginHorizontal: 16, marginTop: 8, marginBottom: 4 }}>
          <TouchableOpacity style={duoBtn(C.wrongBg, C.wrong + '80')} onPress={handleSignOut}>
            <Text style={[T.btn, { color: C.wrong }]}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>

        {/* ── Delete account (App Store Guideline 5.1.1(v)) ── */}
        <TouchableOpacity onPress={handleDeleteAccount} style={{ marginTop: 12, alignItems: 'center', paddingVertical: 8 }}>
          <Text style={[T.label, { color: C.textDim, textTransform: 'none', letterSpacing: 0, textDecorationLine: 'underline' }]}>
            Delete Account
          </Text>
        </TouchableOpacity>

        <Text style={[T.label, { color: C.textDim, textAlign: 'center', marginTop: 12, textTransform: 'none', letterSpacing: 0 }]}>
          Regents Prep · v1.0.0
        </Text>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── Subject Picker Modal ── */}
      <Modal
        visible={showSubjectPicker}
        transparent
        animationType="none"
        onRequestClose={closeSubjectPicker}
      >
        <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={closeSubjectPicker} />
        <Animated.View style={[s.sheet, { transform: [{ translateY: subjectSlideAnim }] }]}>
          <View style={[s.handle, { backgroundColor: C.border }]} />
          <Text style={[T.h3, { color: C.text, textAlign: 'center', marginBottom: 16 }]}>
            My Regents Exam
          </Text>
          {Object.values(SUBJECT_META).map(({ id, name, icon, color }) => {
            const active = subject === id
            return (
              <TouchableOpacity
                key={id}
                style={[s.subjectRow, { borderColor: active ? color : C.border, backgroundColor: active ? color + '15' : C.surface }]}
                onPress={() => { setSubject(id); closeSubjectPicker() }}
                activeOpacity={0.75}
              >
                <Text style={{ fontSize: 24 }}>{icon}</Text>
                <Text style={[T.body, { color: active ? color : C.text, flex: 1, marginLeft: 12, fontWeight: active ? '700' : '400' }]}>{name}</Text>
                {active && <Text style={{ color, fontSize: 16, fontWeight: '800' }}>✓</Text>}
              </TouchableOpacity>
            )
          })}
          <View style={{ height: 24 }} />
        </Animated.View>
      </Modal>

      {/* ── Time Picker Modal ── */}
      <Modal
        visible={showTimePicker}
        transparent
        animationType="none"
        onRequestClose={closeTimePicker}
      >
        <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={closeTimePicker} />
        <Animated.View style={[s.sheet, { transform: [{ translateY: slideAnim }] }]}>
          {/* Handle */}
          <View style={[s.handle, { backgroundColor: C.border }]} />

          <Text style={[T.h3, { color: C.text, textAlign: 'center', marginBottom: 4 }]}>
            Choose Reminder Time
          </Text>
          <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginBottom: 16 }]}>
            We'll remind you daily with your current streak count.
          </Text>

          <FlatList
            data={TIME_OPTIONS}
            keyExtractor={(item) => `${item.hour}:${item.minute}`}
            numColumns={3}
            columnWrapperStyle={{ gap: 10, marginBottom: 10 }}
            contentContainerStyle={{ paddingHorizontal: 4 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isSelected = item.hour === notifHour && item.minute === notifMinute
              return (
                <TimeOption
                  item={item}
                  isSelected={isSelected}
                  onSelect={async (h, m) => {
                    await setTime(h, m)
                    closeTimePicker()
                  }}
                  C={C}
                  s={s}
                />
              )
            }}
          />

          <View style={{ height: 24 }} />
        </Animated.View>
      </Modal>
    </SafeAreaView>
  )
}

// Extracted to avoid closure-in-renderItem pattern
function TimeOption({ item, isSelected, onSelect, C, s }) {
  return (
    <TouchableOpacity
      style={[
        s.timeOption,
        { backgroundColor: isSelected ? C.brandBg : C.surface, borderColor: isSelected ? C.brand : C.border },
      ]}
      onPress={() => onSelect(item.hour, item.minute)}
      activeOpacity={0.7}
    >
      <Text style={[T.body, { color: isSelected ? C.brand : C.text, textAlign: 'center', fontWeight: isSelected ? '700' : '400' }]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:        { flex: 1, backgroundColor: C.bg },

    profileCard: { margin: 16, backgroundColor: C.surface, borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: C.border },
    avatarRing:  { width: 108, height: 108, borderRadius: 54, borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
    avatar:      { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center' },
    levelBadge:  { flexDirection: 'row', alignItems: 'center', borderRadius: 999, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 6, marginTop: 12 },

    statsRow:    { flexDirection: 'row', marginHorizontal: 16, gap: 10, marginBottom: 16 },
    statCard:    { flex: 1, backgroundColor: C.surface, borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: C.border },

    subjectRow:  { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 13, marginBottom: 8 },

    rowCard: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      marginHorizontal: 16, marginBottom: 16,
      backgroundColor: C.surface, borderRadius: 18, padding: 16,
      borderWidth: 1, borderColor: C.border,
    },
    rowLeft:  { flexDirection: 'row', alignItems: 'center' },
    rowRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    boostPill: {
      backgroundColor: '#FEF3C7', borderRadius: 10,
      paddingHorizontal: 8, paddingVertical: 4,
      borderWidth: 1, borderColor: '#F59E0B55',
    },

    settingsCard: { marginHorizontal: 16, marginBottom: 16, backgroundColor: C.surface, borderRadius: 18, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
    settingRow:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },

    timeBadge: {
      borderRadius: 12, borderWidth: 1,
      paddingHorizontal: 12, paddingVertical: 6,
    },

    // Time picker modal
    backdrop:  { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
    sheet: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      backgroundColor: C.bg,
      borderTopLeftRadius: 24, borderTopRightRadius: 24,
      borderTopWidth: 1, borderColor: C.border,
      paddingTop: 12, paddingHorizontal: 16,
      maxHeight: '70%',
    },
    handle:    { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
    timeOption: {
      flex: 1, borderRadius: 12, paddingVertical: 12,
      alignItems: 'center', borderWidth: 1.5,
    },
  })
}
