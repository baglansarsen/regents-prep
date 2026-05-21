import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useXP, getLevel, LEVELS } from '../hooks/useXP'
import { SUBJECTS, SUBJECT_META } from '../../../src/data/subjects'
import * as leData from '../../../src/data/living-environment/index'
import * as esData from '../../../src/data/earth-science/index'

export default function ProgressScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid

  const [subject, setSubject] = useState(SUBJECTS.LIVING_ENVIRONMENT)
  const sd = subject === SUBJECTS.EARTH_SCIENCE ? esData : leData

  const { history, masteryPct } = useProgress(uid)
  const { streak, weekDays, studiedToday } = useDailyStreak(uid)
  const { xp, level, spendXP } = useXP(uid)

  const s = makeStyles(C)
  const subjectHistory = history.filter((h) => (h.subject ?? 'living-environment') === subject)
  const totalQuizzes   = subjectHistory.length
  const avgPct         = totalQuizzes > 0
    ? Math.round(subjectHistory.reduce((acc, h) => acc + (h.pct ?? 0), 0) / totalQuizzes)
    : 0

  const nextLevel = LEVELS.find((l) => l.min > xp)
  const xpProgress = nextLevel
    ? (xp - level.min) / (nextLevel.min - level.min)
    : 1

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={s.pageTitle}>Progress</Text>

        {/* XP / Level card */}
        <View style={s.card}>
          <View style={s.levelRow}>
            <View>
              <Text style={s.levelName}>{level.name}</Text>
              <Text style={s.xpText}>{xp} XP</Text>
            </View>
            <Text style={s.levelBadge}>Lv. {level.level}</Text>
          </View>
          <View style={s.xpBarBg}>
            <View style={[s.xpBarFill, { width: `${xpProgress * 100}%` }]} />
          </View>
          {nextLevel && (
            <Text style={s.xpNext}>{nextLevel.min - xp} XP to {nextLevel.name}</Text>
          )}
        </View>

        {/* Streak card */}
        <View style={s.card}>
          <View style={s.streakHeader}>
            <Text style={s.cardTitle}>🔥 Streak</Text>
            <Text style={s.streakCount}>{streak} days</Text>
          </View>
          <View style={s.weekRow}>
            {weekDays.map((d) => (
              <View key={d.date} style={[s.dayDot, d.studied && s.dayStudied, d.isToday && s.dayToday]}>
                <Text style={s.dayLabel}>{d.dayLabel[0]}</Text>
              </View>
            ))}
          </View>
          {!studiedToday && (
            <TouchableOpacity
              style={s.freezeBtn}
              onPress={async () => { await spendXP(100) }}
            >
              <Text style={s.freezeBtnText}>🧊 Buy Streak Freeze (100 XP)</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Subject switcher */}
        <View style={s.subjectRow}>
          {Object.values(SUBJECTS).map((sub) => {
            const meta = SUBJECT_META[sub]
            return (
              <TouchableOpacity
                key={sub}
                style={[s.subjectBtn, subject === sub && { backgroundColor: meta.color ?? C.brand, borderColor: meta.color ?? C.brand }]}
                onPress={() => setSubject(sub)}
              >
                <Text style={s.subjectText}>{meta.icon} {meta.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Stats row */}
        <View style={s.statsGrid}>
          <View style={s.statCard}>
            <Text style={s.statNum}>{totalQuizzes}</Text>
            <Text style={s.statLabel}>Quizzes</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statNum}>{avgPct}%</Text>
            <Text style={s.statLabel}>Avg Score</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statNum}>{sd.TOPIC_ORDER.filter((t) => (masteryPct(t, subject) ?? 0) >= 85).length}</Text>
            <Text style={s.statLabel}>Mastered</Text>
          </View>
        </View>

        {/* Topic mastery */}
        <Text style={s.sectionTitle}>Topic Mastery</Text>
        {sd.TOPIC_ORDER.map((topic) => {
          const pct = masteryPct(topic, subject)
          const mastered = pct !== null && pct >= 85
          const passing  = pct !== null && pct >= 65
          return (
            <View key={topic} style={s.topicRow}>
              <Text style={s.topicIcon}>{sd.TOPIC_ICONS?.[topic] ?? '📖'}</Text>
              <View style={s.topicBar}>
                <Text style={s.topicName}>{topic}</Text>
                <View style={s.barBg}>
                  <View style={[s.barFill, {
                    width: pct !== null ? `${Math.min(pct, 100)}%` : '0%',
                    backgroundColor: mastered ? C.correct : passing ? C.warn : C.wrong,
                  }]} />
                </View>
              </View>
              <Text style={[s.pctLabel, {
                color: pct === null ? C.textDim : mastered ? C.correct : passing ? C.warn : C.wrong,
              }]}>
                {pct !== null ? `${pct}%` : '—'}
              </Text>
            </View>
          )
        })}

        {/* Achievements button */}
        <TouchableOpacity style={s.achieveBtn} onPress={() => navigation.navigate('Achievements')}>
          <Text style={s.achieveBtnText}>🏅 View Achievements →</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:         { flex: 1, backgroundColor: C.bg },
    pageTitle:    { fontSize: 26, fontWeight: '900', color: C.text, padding: 20, paddingBottom: 12 },
    card:         { margin: 16, marginBottom: 0, backgroundColor: C.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.border },
    levelRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    levelName:    { fontSize: 18, fontWeight: '800', color: C.text },
    xpText:       { fontSize: 14, color: C.textMuted, marginTop: 2 },
    levelBadge:   { fontSize: 28, fontWeight: '900', color: C.brand },
    xpBarBg:      { height: 8, backgroundColor: C.surface2, borderRadius: 4 },
    xpBarFill:    { height: 8, backgroundColor: C.brand, borderRadius: 4 },
    xpNext:       { fontSize: 12, color: C.textMuted, marginTop: 6, textAlign: 'right' },
    streakHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    cardTitle:    { fontSize: 16, fontWeight: '700', color: C.text },
    streakCount:  { fontSize: 24, fontWeight: '900', color: C.warn },
    weekRow:      { flexDirection: 'row', gap: 6 },
    dayDot:       { flex: 1, aspectRatio: 1, borderRadius: 999, backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border },
    dayStudied:   { backgroundColor: C.brand, borderColor: C.brand },
    dayToday:     { borderColor: C.brandLight, borderWidth: 2 },
    dayLabel:     { fontSize: 11, fontWeight: '700', color: C.textMuted },
    freezeBtn:    { marginTop: 12, borderWidth: 1, borderColor: C.border, borderRadius: 10, padding: 10, alignItems: 'center' },
    freezeBtnText:{ fontSize: 13, color: C.textMuted },
    subjectRow:   { flexDirection: 'row', margin: 16, marginBottom: 8, gap: 10 },
    subjectBtn:   { flex: 1, paddingVertical: 8, borderRadius: 20, alignItems: 'center', backgroundColor: C.surface, borderWidth: 1.5, borderColor: C.border },
    subjectText:  { fontSize: 12, fontWeight: '700', color: '#fff' },
    statsGrid:    { flexDirection: 'row', marginHorizontal: 16, gap: 10, marginBottom: 16 },
    statCard:     { flex: 1, backgroundColor: C.surface, borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: C.border },
    statNum:      { fontSize: 24, fontWeight: '900', color: C.brand },
    statLabel:    { fontSize: 12, color: C.textMuted, marginTop: 2 },
    sectionTitle: { fontSize: 17, fontWeight: '800', color: C.text, marginHorizontal: 16, marginBottom: 10 },
    topicRow:     { flexDirection: 'row', alignItems: 'center', gap: 10, marginHorizontal: 16, marginBottom: 12 },
    topicIcon:    { fontSize: 22, width: 30 },
    topicBar:     { flex: 1, gap: 4 },
    topicName:    { fontSize: 13, fontWeight: '600', color: C.text },
    barBg:        { height: 6, backgroundColor: C.surface2, borderRadius: 3 },
    barFill:      { height: 6, borderRadius: 3 },
    pctLabel:     { fontSize: 13, fontWeight: '700', width: 36, textAlign: 'right' },
    achieveBtn:   { margin: 16, backgroundColor: C.surface, borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: C.border },
    achieveBtnText:{ fontSize: 15, fontWeight: '700', color: C.text },
  })
}
