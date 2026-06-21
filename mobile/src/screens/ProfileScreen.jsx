import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useRP } from '../hooks/useRP'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { T, cardShadow, pillTab } from '../styles/duo'
import ProgressPanel from './profile/ProgressPanel'
import SettingsPanel from './profile/SettingsPanel'

const AVATAR_COLORS = ['#1FC36B', '#34B3F1', '#7C5CFC', '#FFC93C', '#FF5A5F']

const TABS = [
  { id: 'progress', label: 'Progress' },
  { id: 'settings', label: 'Settings' },
]

/**
 * Profile tab — the single "you" screen. A fixed identity header (avatar, name,
 * compact Lv · RP · 🔥) sits above a Progress | Settings segmented control:
 *   • Progress → the dashboard (former Progress tab): prediction, stats, Smart
 *     Review, streak calendar, topic mastery, achievements.
 *   • Settings → account & preferences: subject, school, shop, premium,
 *     notifications, theme, sign out.
 * The level/RP/streak numbers live here once (header) and in the Progress
 * detail — not duplicated across two tabs as before.
 */
export default function ProfileScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { rp, level } = useRP(uid)
  const { streak } = useDailyStreak(uid)

  const [tab, setTab] = useState('progress')

  const displayName = user?.displayName ?? user?.email?.split('@')[0] ?? 'Student'
  const initials    = displayName.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const avatarColor = AVATAR_COLORS[(initials.charCodeAt(0) || 0) % AVATAR_COLORS.length]

  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Identity header ── */}
        <View style={[s.header, cardShadow(C.shadow)]}>
          <View style={[s.avatarRing, { borderColor: avatarColor }]}>
            <View style={[s.avatar, { backgroundColor: avatarColor }]}>
              <Text style={[T.h1, { color: '#fff', fontSize: 30 }]}>{initials}</Text>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={[T.h2, { color: C.text }]} numberOfLines={1}>{displayName}</Text>
            <Text style={[T.small, { color: C.textMuted, marginTop: 1 }]} numberOfLines={1}>
              {user?.email ?? 'Guest Account'}
            </Text>
            <View style={s.metaRow}>
              <Text style={[T.small, { color: C.brand }]}>⭐ Lv {level.level}</Text>
              <Text style={[T.small, { color: C.textMuted }]}>·</Text>
              <Text style={[T.small, { color: C.textMuted }]}>{rp} RP</Text>
              <Text style={[T.small, { color: C.textMuted }]}>·</Text>
              <Text style={[T.small, { color: C.warn }]}>🔥 {streak}</Text>
            </View>
          </View>
        </View>

        {/* ── Progress | Settings segmented control ── */}
        <View style={s.segment}>
          {TABS.map(({ id, label }) => {
            const active = tab === id
            return (
              <TouchableOpacity
                key={id}
                style={[pillTab(active, C), s.segPill]}
                onPress={() => setTab(id)}
                activeOpacity={0.8}
              >
                <Text style={[T.btn, { fontSize: 13, color: active ? '#fff' : C.textMuted }]}>{label}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {tab === 'progress'
          ? <ProgressPanel navigation={navigation} />
          : <SettingsPanel navigation={navigation} />}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.bg },

    header: {
      flexDirection: 'row', alignItems: 'center',
      margin: 16, marginBottom: 12,
      backgroundColor: C.surface, borderRadius: 24, padding: 18,
      borderWidth: 1, borderColor: C.border,
    },
    avatarRing: { width: 76, height: 76, borderRadius: 38, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
    avatar:     { width: 66, height: 66, borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
    metaRow:    { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },

    segment: { flexDirection: 'row', gap: 10, marginHorizontal: 16, marginBottom: 12 },
    segPill: { flex: 1, alignItems: 'center' },
  })
}
