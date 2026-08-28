import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useProgress } from '../hooks/useProgress'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useRP } from '../hooks/useRP'
import { useExamScores } from '../hooks/useExamScores'
import { computeAchievements } from '../utils/achievements'

const TIER_ORDER = ['gold', 'silver', 'bronze']
const TIER_COLORS = {
  gold:   '#f59e0b',
  silver: '#94a3b8',
  bronze: '#b45309',
}

export default function AchievementsScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { history } = useProgress(uid)
  const { streak } = useDailyStreak(uid)
  const { rp } = useRP(uid)
  const { scores: examScores } = useExamScores()
  const [diagCount, setDiagCount] = useState(0)
  const s = makeStyles(C)

  const leHistory   = history.filter((h) => (h.subject ?? 'living-environment') === 'living-environment')
  const esHistory   = history.filter((h) => h.subject === 'earth-science')
  const lsHistory   = history.filter((h) => h.subject === 'life-science')
  const geoHistory  = history.filter((h) => h.subject === 'geometry')
  const chemHistory = history.filter((h) => h.subject === 'chemistry')

  useEffect(() => {
    async function checkDiag() {
      try {
        const leDiag = await AsyncStorage.getItem('@placement_done_living-environment')
        const esDiag = await AsyncStorage.getItem('@placement_done_earth-science')
        let count = 0
        if (leDiag === 'true') count++
        if (esDiag === 'true') count++
        setDiagCount(count)
      } catch {}
    }
    checkDiag()
  }, [])

  const { earned, locked, total: totalAchievements } = computeAchievements({
    history: [...leHistory, ...esHistory, ...lsHistory, ...geoHistory, ...chemHistory],
    streak, rp, examScores, diagCount,
  })

  function AchievementCard({ item, unlocked }) {
    const tierColor = TIER_COLORS[item.tier] ?? C.textMuted
    return (
      <View style={[s.badge, !unlocked && s.badgeLocked]}>
        <View style={[s.badgeIcon, { borderColor: unlocked ? tierColor : C.border }]}>
          <Text style={s.badgeEmoji}>{item.emoji}</Text>
        </View>
        <Text style={[s.badgeName, { color: unlocked ? C.text : C.textDim }]}>{item.name}</Text>
        <Text style={[s.badgeDesc, { color: unlocked ? C.textMuted : C.textDim }]} numberOfLines={2}>
          {item.description}
        </Text>
        {unlocked && (
          <View style={[s.tierPill, { backgroundColor: tierColor + '30', borderColor: tierColor }]}>
            <Text style={[s.tierText, { color: tierColor }]}>{item.tier}</Text>
          </View>
        )}
      </View>
    )
  }

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Achievements</Text>
        <Text style={s.count}>{earned.length}/{totalAchievements}</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {earned.length > 0 && (
          <>
            <Text style={s.section}>🏅 Earned ({earned.length})</Text>
            <View style={s.grid}>
              {earned.map((a) => <AchievementCard key={a.id} item={a} unlocked />)}
            </View>
          </>
        )}
        {locked.length > 0 && (
          <>
            <Text style={s.section}>🔒 Locked ({locked.length})</Text>
            <View style={s.grid}>
              {locked.map((a) => <AchievementCard key={a.id} item={a} unlocked={false} />)}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:       { flex: 1, backgroundColor: C.bg },
    header:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
    back:       { fontSize: 15, color: C.brand, fontWeight: '600' },
    title:      { fontSize: 18, fontWeight: '800', color: C.text },
    count:      { fontSize: 14, color: C.textMuted },
    scroll:     { padding: 16 },
    section:    { fontSize: 15, fontWeight: '800', color: C.text, marginBottom: 12, marginTop: 8 },
    grid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 8 },
    badge:      { width: '30%', alignItems: 'center', gap: 6, padding: 10, backgroundColor: C.surface, borderRadius: 14, borderWidth: 1, borderColor: C.border },
    badgeLocked:{ opacity: 0.45 },
    badgeIcon:  { width: 56, height: 56, borderRadius: 28, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: C.surface2 },
    badgeEmoji: { fontSize: 26 },
    badgeName:  { fontSize: 12, fontWeight: '700', textAlign: 'center' },
    badgeDesc:  { fontSize: 10, textAlign: 'center', lineHeight: 14 },
    tierPill:   { borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1 },
    tierText:   { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  })
}
