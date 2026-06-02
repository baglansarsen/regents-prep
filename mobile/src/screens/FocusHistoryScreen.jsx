import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useXP } from '../hooks/useXP'
import { useFocusSession } from '../hooks/useFocusSession'
import { T, cardShadow } from '../styles/duo'

function formatDate(isoDate) {
  const d = new Date(isoDate)
  const today    = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  if (isoDate === today)     return 'Today'
  if (isoDate === yesterday) return 'Yesterday'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function groupByDate(history) {
  const groups = {}
  for (const s of history) {
    const d = s.date ?? s.startedAt?.slice(0, 10) ?? 'Unknown'
    if (!groups[d]) groups[d] = []
    groups[d].push(s)
  }
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
}

export default function FocusHistoryScreen({ navigation, route }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  // Use history passed from FocusScreen if available, else load from hook
  const { history: hookHistory } = useFocusSession(uid, null, null)
  const history = route?.params?.history ?? hookHistory

  const s = makeStyles(C)
  const grouped = groupByDate(history)

  return (
    <SafeAreaView style={s.safe} edges={["bottom"]}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={[T.small, { color: C.brand }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[T.h2, { color: C.text }]}>Focus History</Text>
        <View style={{ width: 50 }} />
      </View>

      {history.length === 0 ? (
        <View style={s.empty}>
          <Text style={{ fontSize: 48 }}>⏱</Text>
          <Text style={[T.h3, { color: C.textMuted, textAlign: 'center', marginTop: 12 }]}>
            No sessions yet
          </Text>
          <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginTop: 6 }]}>
            Complete your first focus session to see it here
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          {grouped.map(([date, sessions]) => (
            <View key={date}>
              <Text style={[s.dateLabel, { color: C.textMuted }]}>{formatDate(date)}</Text>
              {sessions.map((session) => {
                const presetMin = session.preset === 'short' ? 15 : session.preset === 'long' ? 50 : 25
                const duration  = session.pomodorosCompleted * presetMin + (session.partialMinutes ?? 0)
                const doneTasks  = (session.todos ?? []).filter((t) => t.done).length
                const totalTasks = (session.todos ?? []).length

                return (
                  <View key={session.id} style={[s.card, { backgroundColor: C.surface, ...cardShadow(C.shadow) }]}>
                    <View style={s.cardTop}>
                      {session.subject ? (
                        <View style={[s.subjectChip, { backgroundColor: C.brand + '15', borderColor: C.brand + '30' }]}>
                          <Text style={[s.subjectText, { color: C.brand }]}>{session.subject}</Text>
                        </View>
                      ) : (
                        <Text style={[T.small, { color: C.textMuted }]}>Study session</Text>
                      )}
                      {session.xpEarned > 0 && (
                        <Text style={[s.xpBadge, { color: C.warn }]}>+{session.xpEarned} ⭐</Text>
                      )}
                    </View>

                    <View style={s.cardStats}>
                      <Text style={[s.statItem, { color: C.text }]}>⏱ {duration} min</Text>
                      {session.pomodorosCompleted > 0 && (
                        <Text style={[s.statItem, { color: C.text }]}>🍅 ×{session.pomodorosCompleted}</Text>
                      )}
                      {session.partial && (
                        <View style={[s.partialBadge, { backgroundColor: C.warnBg, borderColor: C.warn + '50' }]}>
                          <Text style={[s.partialText, { color: C.warn }]}>partial</Text>
                        </View>
                      )}
                      {totalTasks > 0 && (
                        <Text style={[s.statItem, { color: doneTasks === totalTasks ? C.correct : C.textMuted }]}>
                          ✓ {doneTasks}/{totalTasks}
                        </Text>
                      )}
                    </View>
                  </View>
                )
              })}
            </View>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:   { flex: 1, backgroundColor: C.bg },
    header: {
      flexDirection:    'row',
      alignItems:       'center',
      justifyContent:   'space-between',
      paddingHorizontal: 20,
      paddingVertical:   16,
    },
    scroll:    { paddingHorizontal: 20, paddingTop: 4 },
    dateLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 20, marginBottom: 8 },
    card: {
      borderRadius:  14,
      padding:       14,
      marginBottom:  10,
    },
    cardTop:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    subjectChip: {
      borderRadius:      20,
      borderWidth:       1,
      paddingHorizontal: 12,
      paddingVertical:   4,
    },
    subjectText: { fontSize: 13, fontWeight: '700' },
    xpBadge:     { fontSize: 14, fontWeight: '800' },
    cardStats:    { flexDirection: 'row', gap: 16, alignItems: 'center' },
    statItem:     { fontSize: 14, fontWeight: '600' },
    partialBadge: { borderRadius: 8, borderWidth: 1, paddingHorizontal: 7, paddingVertical: 2 },
    partialText:  { fontSize: 11, fontWeight: '700' },
    empty: {
      flex: 1,
      alignItems:     'center',
      justifyContent: 'center',
      padding:        40,
    },
  })
}
