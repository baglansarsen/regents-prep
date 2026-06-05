import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useProgress } from '../hooks/useProgress'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useXP, getLevel, LEVELS } from '../hooks/useXP'
import { SUBJECTS } from '../content/subjects'
import * as leData   from '../content/living-environment/index'
import * as esData   from '../content/earth-science/index'
import * as chemData from '../content/chemistry/index'
import * as physData from '../content/physics/index'
import * as a1Data   from '../content/algebra-1/index'
import * as a2Data   from '../content/algebra-2/index'
import * as geoData  from '../content/geometry/index'
import * as lsData   from '../content/life-science/index'
import * as enData   from '../content/english/index'
import * as ghData   from '../content/global-history/index'
import * as usData   from '../content/us-history/index'

const SUBJECT_DATA = {
  'living-environment': leData,
  'earth-science':      esData,
  'chemistry':          chemData,
  'physics':            physData,
  'algebra-1':          a1Data,
  'algebra-2':          a2Data,
  'geometry':           geoData,
  'life-science':       lsData,
  'english':            enData,
  'global-history':     ghData,
  'us-history':         usData,
}
import { T, cardShadow, duoBtn } from '../styles/duo'

export default function ProgressScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid

  const { subject } = useSubject()
  const sd = SUBJECT_DATA[subject] ?? leData

  const { history, masteryPct, isMastered } = useProgress(uid)
  const { streak, weekDays, studiedToday } = useDailyStreak(uid)
  const { xp, level, spendXP } = useXP(uid)

  const subjectHistory = history.filter((h) => (h.subject ?? 'living-environment') === subject)
  const totalQuizzes   = subjectHistory.length
  const avgPct         = totalQuizzes > 0
    ? Math.round(subjectHistory.reduce((a, h) => a + (h.pct ?? 0), 0) / totalQuizzes)
    : 0

  const nextLevel  = LEVELS.find((l) => l.min > xp)
  const xpProgress = nextLevel ? (xp - level.min) / (nextLevel.min - level.min) : 1

  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={[T.h1, { color: C.text, padding: 20, paddingBottom: 16 }]}>Progress</Text>

        {/* XP / Level card */}
        <View style={[s.card, cardShadow(C.shadow)]}>
          <View style={s.levelRow}>
            <View style={[s.levelCircle, { borderColor: C.brand }]}>
              <Text style={[T.num, { color: C.brand, fontSize: 26 }]}>{level.level}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[T.h3, { color: C.text }]}>{level.name}</Text>
              <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>{xp} XP total</Text>
            </View>
            {nextLevel && (
              <Text style={[T.small, { color: C.textMuted }]}>
                {nextLevel.min - xp} to next
              </Text>
            )}
          </View>
          <View style={s.xpBarBg}>
            <View style={[s.xpBarFill, { width: `${xpProgress * 100}%` }]} />
          </View>
        </View>

        {/* Streak card */}
        <View style={[s.card, cardShadow(C.shadow)]}>
          <View style={s.cardHeader}>
            <Text style={[T.h3, { color: C.text }]}>🔥 Streak</Text>
            <Text style={[T.h2, { color: C.warn }]}>{streak} days</Text>
          </View>
          <View style={s.weekRow}>
            {weekDays.map((d) => (
              <View
                key={d.date}
                style={[
                  s.dayDot,
                  d.studied && { backgroundColor: C.brand, borderColor: C.brandDark },
                  d.isToday && { borderColor: C.brandLight, borderWidth: 2.5 },
                ]}
              >
                <Text style={[T.label, { color: d.studied ? '#fff' : C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>
                  {d.dayLabel[0]}
                </Text>
              </View>
            ))}
          </View>
          {!studiedToday && (
            <TouchableOpacity
              style={[duoBtn(C.surface2, C.border, { marginTop: 12 })]}
              onPress={() => spendXP(100)}
            >
              <Text style={[T.btn, { color: C.textMuted }]}>🧊 STREAK FREEZE (100 XP)</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats row */}
        <View style={s.statsRow}>
          {[
            { num: totalQuizzes, label: 'Quizzes' },
            { num: `${avgPct}%`, label: 'Avg Score' },
            { num: (sd.TOPIC_ORDER ?? []).filter((t) => isMastered(t, subject)).length, label: 'Mastered' },
          ].map(({ num, label }) => (
            <View key={label} style={[s.statCard, cardShadow(C.shadow)]}>
              <Text style={[T.num, { color: C.brand, fontSize: 28 }]}>{num}</Text>
              <Text style={[T.label, { color: C.textMuted, marginTop: 2, textTransform: 'none', letterSpacing: 0 }]}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Topic mastery */}
        <Text style={[T.label, { color: C.textMuted, marginHorizontal: 16, marginBottom: 10, marginTop: 4 }]}>
          Topic Mastery
        </Text>
        {(sd.TOPIC_ORDER ?? []).map((topic) => {
          const pct     = masteryPct(topic, subject)
          const mastered = isMastered(topic, subject)
          const passing  = pct !== null && pct >= 65
          const barColor = mastered ? C.correct : passing ? C.warn : C.wrong
          return (
            <View key={topic} style={[s.topicCard, cardShadow(C.shadow)]}>
              <Text style={{ fontSize: 22 }}>{sd.TOPIC_ICONS?.[topic] ?? '📖'}</Text>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={[T.small, { color: C.text, flex: 1 }]} numberOfLines={1}>{topic}</Text>
                  <Text style={[T.label, { color: pct === null ? C.textDim : barColor, textTransform: 'none', letterSpacing: 0 }]}>
                    {pct !== null ? `${pct}%` : '—'}
                  </Text>
                </View>
                <View style={s.barBg}>
                  <View style={[s.barFill, {
                    width: pct !== null ? `${Math.min(pct, 100)}%` : '0%',
                    backgroundColor: barColor,
                  }]} />
                </View>
              </View>
            </View>
          )
        })}

        {/* Achievements */}
        <TouchableOpacity
          style={[s.achieveBtn, duoBtn(C.surface, C.border)]}
          onPress={() => navigation.navigate('Achievements')}
        >
          <Text style={[T.btn, { color: C.text }]}>🏅 VIEW ACHIEVEMENTS</Text>
        </TouchableOpacity>

        {/* Analytics */}
        <TouchableOpacity
          style={[s.achieveBtn, duoBtn(C.surface, C.border)]}
          onPress={() => navigation.navigate('Analytics')}
        >
          <Text style={[T.btn, { color: C.text }]}>📊 VIEW ANALYTICS</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:       { flex: 1, backgroundColor: C.bg },
    card:       { margin: 16, marginBottom: 12, backgroundColor: C.surface, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: C.border },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
    levelRow:   { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
    levelCircle:{ width: 56, height: 56, borderRadius: 28, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
    xpBarBg:    { height: 10, backgroundColor: C.surface2, borderRadius: 5, overflow: 'hidden' },
    xpBarFill:  { height: 10, backgroundColor: C.brand, borderRadius: 5 },
    weekRow:    { flexDirection: 'row', gap: 6 },
    dayDot:     { flex: 1, aspectRatio: 1, borderRadius: 999, backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: C.border },
    statsRow:   { flexDirection: 'row', marginHorizontal: 16, gap: 10, marginBottom: 16 },
    statCard:   { flex: 1, backgroundColor: C.surface, borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: C.border },
    topicCard:  { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 16, marginBottom: 10, backgroundColor: C.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border },
    barBg:      { height: 8, backgroundColor: C.surface2, borderRadius: 4, overflow: 'hidden' },
    barFill:    { height: 8, borderRadius: 4 },
    achieveBtn: { marginHorizontal: 16, marginTop: 8 },
  })
}
