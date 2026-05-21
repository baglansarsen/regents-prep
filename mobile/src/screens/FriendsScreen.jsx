import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useFriends, timeAgo } from '../hooks/useFriends'
import { useLeaderboard } from '../hooks/useLeaderboard'

const TABS = ['Leaderboard', 'Friends', 'Activity']

export default function FriendsScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const s = makeStyles(C)

  const [tab, setTab] = useState('Leaderboard')

  const { friends, incomingRequests, friendCode, feed, acceptRequest, declineRequest } = useFriends(uid, user)
  const { leaderboard, school, loading: lbLoading } = useLeaderboard(uid)

  function Avatar({ name, size = 36 }) {
    return (
      <View style={[s.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
        <Text style={{ fontSize: size * 0.4, color: '#fff', fontWeight: '800' }}>
          {(name ?? '?')[0].toUpperCase()}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <Text style={s.pageTitle}>Social</Text>

      {/* Friend code banner */}
      {friendCode && (
        <View style={s.codeBanner}>
          <Text style={s.codeLabel}>Your Friend Code</Text>
          <Text style={s.codeValue}>{friendCode}</Text>
        </View>
      )}

      {/* Add friend button */}
      <TouchableOpacity style={s.addFriendBtn} onPress={() => navigation.navigate('AddFriend')}>
        <Text style={s.addFriendText}>+ Add Friend by Code</Text>
      </TouchableOpacity>

      {/* Pending requests */}
      {incomingRequests.length > 0 && (
        <View style={s.requests}>
          {incomingRequests.map((req) => (
            <View key={req.id} style={s.requestRow}>
              <Text style={s.requestName}>{req.fromName} wants to be friends</Text>
              <View style={s.requestBtns}>
                <TouchableOpacity style={[s.requestBtn, { backgroundColor: C.brand }]} onPress={() => acceptRequest(req)}>
                  <Text style={s.requestBtnText}>✓</Text>
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

      <ScrollView>
        {/* Leaderboard */}
        {tab === 'Leaderboard' && (
          <View style={s.list}>
            {!school && (
              <Text style={s.emptyText}>Set your school in onboarding to see the leaderboard.</Text>
            )}
            {leaderboard.map((entry, i) => (
              <View key={entry.uid} style={[s.lbRow, entry.uid === uid && s.lbRowSelf]}>
                <Text style={s.lbRank}>#{i + 1}</Text>
                <Avatar name={entry.displayName} />
                <View style={{ flex: 1 }}>
                  <Text style={s.lbName}>{entry.displayName ?? 'Student'}</Text>
                </View>
                <Text style={s.lbXP}>⭐ {entry.xp ?? 0}</Text>
              </View>
            ))}
            {lbLoading && <Text style={s.emptyText}>Loading...</Text>}
          </View>
        )}

        {/* Friends list */}
        {tab === 'Friends' && (
          <View style={s.list}>
            {friends.length === 0 && (
              <Text style={s.emptyText}>No friends yet. Add a friend by their code!</Text>
            )}
            {friends.map((f) => (
              <View key={f.id} style={s.friendRow}>
                <Avatar name={f.displayName} />
                <View style={{ flex: 1 }}>
                  <Text style={s.friendName}>{f.displayName}</Text>
                </View>
                <TouchableOpacity
                  style={[s.challengeBtn, { backgroundColor: C.blue }]}
                  onPress={() => navigation.navigate('Challenge', { friendUid: f.id, friendName: f.displayName })}
                >
                  <Text style={s.challengeBtnText}>⚔️ Challenge</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Activity feed */}
        {tab === 'Activity' && (
          <View style={s.list}>
            {feed.length === 0 && <Text style={s.emptyText}>No recent activity.</Text>}
            {feed.map((item) => (
              <View key={item.id} style={s.feedRow}>
                <Text style={s.feedText}>{item.text ?? 'Activity'}</Text>
                <Text style={s.feedTime}>{item.timestamp ? timeAgo(item.timestamp.toMillis?.() ?? 0) : ''}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:           { flex: 1, backgroundColor: C.bg },
    pageTitle:      { fontSize: 26, fontWeight: '900', color: C.text, padding: 20, paddingBottom: 12 },
    codeBanner:     { marginHorizontal: 16, backgroundColor: C.surface, borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: C.border },
    codeLabel:      { fontSize: 12, color: C.textMuted },
    codeValue:      { fontSize: 20, fontWeight: '900', color: C.brand, letterSpacing: 2 },
    addFriendBtn:   { margin: 16, marginTop: 10, backgroundColor: C.brand, borderRadius: 12, padding: 14, alignItems: 'center' },
    addFriendText:  { color: '#fff', fontWeight: '700', fontSize: 15 },
    requests:       { marginHorizontal: 16, marginBottom: 8, gap: 8 },
    requestRow:     { backgroundColor: C.surface, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: C.blue },
    requestName:    { fontSize: 13, color: C.text, flex: 1 },
    requestBtns:    { flexDirection: 'row', gap: 6 },
    requestBtn:     { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    requestBtnText: { fontWeight: '800', color: '#fff', fontSize: 16 },
    tabRow:         { flexDirection: 'row', marginHorizontal: 16, marginBottom: 8, backgroundColor: C.surface, borderRadius: 12, padding: 4 },
    tabBtn:         { flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center' },
    tabActive:      { backgroundColor: C.brand },
    tabText:        { fontSize: 13, fontWeight: '600', color: C.textMuted },
    tabTextActive:  { color: '#fff' },
    list:           { padding: 16, gap: 10 },
    emptyText:      { textAlign: 'center', color: C.textMuted, fontSize: 14, padding: 20 },
    lbRow:          { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.surface, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: C.border },
    lbRowSelf:      { borderColor: C.brand },
    lbRank:         { fontSize: 16, fontWeight: '800', color: C.textMuted, width: 32 },
    avatar:         { backgroundColor: C.brand, alignItems: 'center', justifyContent: 'center' },
    lbName:         { fontSize: 14, fontWeight: '700', color: C.text },
    lbXP:           { fontSize: 13, fontWeight: '700', color: C.warn },
    friendRow:      { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.surface, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: C.border },
    friendName:     { fontSize: 15, fontWeight: '700', color: C.text },
    challengeBtn:   { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
    challengeBtnText:{ color: '#fff', fontWeight: '700', fontSize: 13 },
    feedRow:        { backgroundColor: C.surface, borderRadius: 12, padding: 12, gap: 4, borderWidth: 1, borderColor: C.border },
    feedText:       { fontSize: 14, color: C.text },
    feedTime:       { fontSize: 12, color: C.textMuted },
  })
}
