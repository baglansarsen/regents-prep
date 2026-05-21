import React, { useState, useMemo } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useXP } from '../hooks/useXP'
import { useUnlocks } from '../hooks/useUnlocks'
import { SUBJECTS, SUBJECT_META } from '../../../src/data/subjects'
import * as leData from '../../../src/data/living-environment/index'
import * as esData from '../../../src/data/earth-science/index'

const { width } = Dimensions.get('window')

export default function HomeScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid

  const [subject, setSubject] = useState(SUBJECTS.LIVING_ENVIRONMENT)
  const sd = subject === SUBJECTS.EARTH_SCIENCE ? esData : leData

  const { history, masteryPct } = useProgress(uid)
  const { streak, weekDays }    = useDailyStreak(uid)
  const { xp, level }           = useXP(uid)

  const subjectHistory = useMemo(
    () => history.filter((h) => (h.subject ?? 'living-environment') === subject),
    [history, subject]
  )
  const { isUnlocked, unlockHint } = useUnlocks(subjectHistory, sd.TOPIC_ORDER)

  const s = makeStyles(C)
  const topics = sd.TOPIC_ORDER
  const icons  = sd.TOPIC_ICONS ?? {}

  function startQuiz(topic) {
    const pool = topic ? sd.getByTopic(topic) : sd.questions
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    navigation.navigate('Quiz', { questionSet: shuffled, topic, subject })
  }

  function startFlashcards(topic) {
    navigation.navigate('Flashcards', { topic, subject })
  }

  function startSpeedRound() {
    const pool = [...sd.questions].sort(() => Math.random() - 0.5).slice(0, 30)
    navigation.navigate('SpeedRound', { questionSet: pool, subject })
  }

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Good {timeOfDay()} 👋</Text>
            <Text style={s.name}>{user?.displayName?.split(' ')[0] ?? 'Student'}</Text>
          </View>
          <View style={s.headerRight}>
            {streak > 0 && (
              <View style={s.streakBadge}>
                <Text style={s.streakText}>🔥 {streak}</Text>
              </View>
            )}
            <View style={s.xpBadge}>
              <Text style={s.xpText}>⭐ {xp}</Text>
            </View>
          </View>
        </View>

        {/* Subject switcher */}
        <View style={s.subjectRow}>
          {Object.values(SUBJECTS).map((sub) => {
            const meta = SUBJECT_META[sub]
            const active = subject === sub
            return (
              <TouchableOpacity
                key={sub}
                style={[s.subjectBtn, active && { backgroundColor: meta.color ?? C.brand, borderColor: meta.color ?? C.brand }]}
                onPress={() => setSubject(sub)}
              >
                <Text style={s.subjectBtnText}>{meta.icon} {meta.name}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Week streak calendar */}
        <View style={s.weekRow}>
          {weekDays.map((d) => (
            <View key={d.date} style={[s.dayDot, d.studied && s.dayDotStudied, d.isToday && s.dayDotToday]}>
              <Text style={s.dayLabel}>{d.dayLabel[0]}</Text>
            </View>
          ))}
        </View>

        {/* Quick actions */}
        <View style={s.quickRow}>
          <TouchableOpacity style={[s.quickBtn, { backgroundColor: C.brand }]} onPress={() => startQuiz(null)}>
            <Text style={s.quickIcon}>⚡</Text>
            <Text style={s.quickLabel}>Quick Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.quickBtn, { backgroundColor: C.blue }]} onPress={startSpeedRound}>
            <Text style={s.quickIcon}>🏃</Text>
            <Text style={s.quickLabel}>Speed Round</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.quickBtn, { backgroundColor: C.purple }]} onPress={() => startFlashcards(null)}>
            <Text style={s.quickIcon}>🃏</Text>
            <Text style={s.quickLabel}>Flashcards</Text>
          </TouchableOpacity>
        </View>

        {/* Topic grid */}
        <Text style={s.sectionTitle}>Topics</Text>
        <View style={s.grid}>
          {topics.map((topic) => {
            const pct      = masteryPct(topic, subject)
            const locked   = !isUnlocked(topic)
            const hint     = locked ? unlockHint(topic) : null
            const mastered = pct !== null && pct >= 85
            const passing  = pct !== null && pct >= 65

            return (
              <TouchableOpacity
                key={topic}
                style={[s.topicCard, locked && s.topicLocked]}
                onPress={() => !locked && startQuiz(topic)}
                disabled={locked}
                activeOpacity={locked ? 1 : 0.7}
              >
                <View style={s.topicCardInner}>
                  <Text style={s.topicIcon}>{icons[topic] ?? '📖'}</Text>
                  <Text style={[s.topicName, locked && { color: C.textDim }]} numberOfLines={2}>
                    {locked ? '🔒 ' : ''}{topic}
                  </Text>
                  {pct !== null ? (
                    <View style={[s.pctBadge,
                      { backgroundColor: mastered ? C.correctBg : passing ? C.warnBg : C.wrongBg }]}>
                      <Text style={[s.pctText,
                        { color: mastered ? C.correct : passing ? C.warn : C.wrong }]}>
                        {pct}%
                      </Text>
                    </View>
                  ) : null}
                  {hint ? <Text style={s.hintText}>{hint}</Text> : null}
                </View>

                {pct !== null && (
                  <View style={s.progressBarBg}>
                    <View style={[s.progressBarFill, {
                      width: `${Math.min(pct, 100)}%`,
                      backgroundColor: mastered ? C.correct : passing ? C.warn : C.wrong,
                    }]} />
                  </View>
                )}

                <View style={s.topicBtns}>
                  <TouchableOpacity
                    style={[s.topicAction, { backgroundColor: C.brand }]}
                    onPress={() => !locked && startQuiz(topic)}
                    disabled={locked}
                  >
                    <Text style={s.topicActionText}>Quiz</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[s.topicAction, { backgroundColor: C.surface2 }]}
                    onPress={() => !locked && startFlashcards(topic)}
                    disabled={locked}
                  >
                    <Text style={[s.topicActionText, { color: C.textMuted }]}>Cards</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function timeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

function makeStyles(C) {
  const cardW = (width - 48) / 2
  return StyleSheet.create({
    safe:           { flex: 1, backgroundColor: C.bg },
    header:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 20, paddingBottom: 12 },
    greeting:       { fontSize: 13, color: C.textMuted },
    name:           { fontSize: 22, fontWeight: '800', color: C.text, marginTop: 2 },
    headerRight:    { flexDirection: 'row', gap: 8, alignItems: 'center' },
    streakBadge:    { backgroundColor: '#f59e0b20', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: '#f59e0b50' },
    streakText:     { color: C.warn, fontWeight: '700', fontSize: 13 },
    xpBadge:        { backgroundColor: C.surface2, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
    xpText:         { color: C.textMuted, fontWeight: '700', fontSize: 13 },

    subjectRow:     { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 12 },
    subjectBtn:     { flex: 1, paddingVertical: 8, borderRadius: 20, alignItems: 'center', backgroundColor: C.surface, borderWidth: 1.5, borderColor: C.border },
    subjectBtnText: { fontSize: 12, fontWeight: '700', color: '#fff' },

    weekRow:        { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 16, paddingHorizontal: 16 },
    dayDot:         { width: 36, height: 36, borderRadius: 18, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border },
    dayDotStudied:  { backgroundColor: C.brand, borderColor: C.brand },
    dayDotToday:    { borderColor: C.brandLight, borderWidth: 2 },
    dayLabel:       { fontSize: 11, fontWeight: '700', color: C.textMuted },

    quickRow:       { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 24 },
    quickBtn:       { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center' },
    quickIcon:      { fontSize: 22 },
    quickLabel:     { fontSize: 11, fontWeight: '700', color: '#fff', marginTop: 4 },

    sectionTitle:   { fontSize: 17, fontWeight: '800', color: C.text, marginHorizontal: 16, marginBottom: 12 },
    grid:           { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 12 },
    topicCard:      { width: cardW, backgroundColor: C.surface, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
    topicLocked:    { opacity: 0.5 },
    topicCardInner: { gap: 6, marginBottom: 10 },
    topicIcon:      { fontSize: 28 },
    topicName:      { fontSize: 13, fontWeight: '700', color: C.text, lineHeight: 18 },
    pctBadge:       { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
    pctText:        { fontSize: 12, fontWeight: '800' },
    hintText:       { fontSize: 10, color: C.textDim, marginTop: 2 },
    progressBarBg:  { height: 3, backgroundColor: C.surface2, borderRadius: 2, marginBottom: 10 },
    progressBarFill:{ height: 3, borderRadius: 2 },
    topicBtns:      { flexDirection: 'row', gap: 6 },
    topicAction:    { flex: 1, paddingVertical: 7, borderRadius: 8, alignItems: 'center' },
    topicActionText:{ fontSize: 12, fontWeight: '700', color: '#fff' },
  })
}
