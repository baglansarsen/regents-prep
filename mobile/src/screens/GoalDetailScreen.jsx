import React, { useState, useMemo, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useGoal } from '../context/GoalContext'
import { useProgress } from '../hooks/useProgress'
import { usePredictedScore } from '../hooks/usePredictedScore'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { tierFor } from '../data/goalConfig'
import { SUBJECT_META } from '../content/subjects'
import { subjectData } from '../content/subjectData'
import { daysUntil } from '../utils/examDates'
import { topicIndicator } from '../utils/examScoring'
import { shuffle } from '../utils/question'
import GoalRing from '../components/GoalRing'
import GoalShareSheet from '../components/GoalShareSheet'
import { T, duoBtn, duoBtnOutline, cardShadow } from '../styles/duo'

/**
 * GoalDetailScreen — predicted score vs target, per-topic readiness, and the
 * shortest path to more points (weakest-topic quiz / practice exam).
 */
export default function GoalDetailScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { subject } = useSubject()
  const { getGoal, clearGoal } = useGoal()
  const { history } = useProgress(uid)
  const { streak } = useDailyStreak(uid)

  const sd   = subjectData(subject)
  const meta = SUBJECT_META[subject] ?? { name: 'Regents', icon: '🎓' }
  const subjectHistory = useMemo(
    () => history.filter((h) => (h.subject ?? 'living-environment') === subject),
    [history, subject],
  )
  const { predicted, coldStart, topicBreakdown, weakestUnit } =
    usePredictedScore(subject, sd.UNITS ?? [], subjectHistory)

  const goal = getGoal(subject)
  const [showShare, setShowShare] = useState(false)

  // Goal removed (or never set) — bounce back gracefully (in an effect, not
  // during render).
  useEffect(() => {
    if (!goal) navigation.goBack()
  }, [goal])
  if (!goal) return null

  const tier       = tierFor(goal.target)
  const days       = goal.examDateStr ? daysUntil(goal.examDateStr) : null
  const pointsToGo = predicted != null ? Math.max(0, goal.target - predicted) : null
  const onTrack    = pointsToGo === 0
  // Ring: how far through the 50→target climb the prediction is.
  const ringProgress = predicted != null
    ? Math.min(1, Math.max(0, (predicted - 50) / Math.max(1, goal.target - 50)))
    : 0

  function startWeakestQuiz() {
    if (!weakestUnit?.topic) return
    const pool = shuffle(sd.getByTopic ? sd.getByTopic(weakestUnit.topic) : []).slice(0, 10)
    if (!pool.length) return
    navigation.navigate('Quiz', { questionSet: pool, topic: weakestUnit.topic, subject })
  }

  function startPracticeExam() {
    navigation.getParent()?.navigate('ExamsTab')
  }

  function handleRemove() {
    Alert.alert('Remove goal?', 'Your progress data stays — only the goal is removed.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: async () => { await clearGoal(subject); navigation.goBack() } },
    ])
  }

  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={[T.body, { color: C.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[T.h2, { color: C.text }]}>🎯 {meta.name}</Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Hero: predicted → target */}
        <View style={[s.heroCard, cardShadow(C.shadow)]}>
          <GoalRing
            size={110}
            strokeWidth={10}
            progress={ringProgress}
            color={onTrack ? C.correct : C.brand}
            trackColor={C.surface2}
          >
            <Text style={[T.num, { color: C.text, fontSize: 30 }]}>{coldStart ? '—' : predicted}</Text>
            <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>predicted</Text>
          </GoalRing>

          <View style={{ flex: 1, marginLeft: 18 }}>
            <Text style={[T.h1, { color: C.text }]}>
              {coldStart ? '—' : predicted} → {goal.target} {tier.icon}
            </Text>
            <Text style={[T.body, { color: onTrack ? C.correct : C.textMuted, marginTop: 4 }]}>
              {coldStart
                ? 'Take a quiz to unlock your prediction'
                : onTrack
                  ? `You're predicted at your ${tier.label} goal! 🎉`
                  : `${pointsToGo} points to go`}
            </Text>
            {days != null && (
              <View style={[s.daysChip, { backgroundColor: C.brand + '18', borderColor: C.brand + '50' }]}>
                <Text style={[T.small, { color: C.brand }]}>📅 {days} days until the exam</Text>
              </View>
            )}
          </View>
        </View>

        {/* Recommended actions */}
        <Text style={[T.label, { color: C.textMuted, marginHorizontal: 16, marginTop: 6, marginBottom: 8 }]}>FASTEST PATH TO POINTS</Text>
        {weakestUnit?.topic && (
          <TouchableOpacity style={[s.actionRow, cardShadow(C.shadow)]} onPress={startWeakestQuiz} activeOpacity={0.85}>
            <Text style={{ fontSize: 22 }}>🎯</Text>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={[T.h3, { color: C.text }]}>Quiz your weakest topic</Text>
              <Text style={[T.small, { color: C.textMuted }]}>{weakestUnit.title ?? weakestUnit.topic}</Text>
            </View>
            <Text style={[T.body, { color: C.textMuted }]}>›</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[s.actionRow, cardShadow(C.shadow)]} onPress={startPracticeExam} activeOpacity={0.85}>
          <Text style={{ fontSize: 22 }}>📝</Text>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={[T.h3, { color: C.text }]}>Take a practice exam</Text>
            <Text style={[T.small, { color: C.textMuted }]}>The strongest signal for your prediction</Text>
          </View>
          <Text style={[T.body, { color: C.textMuted }]}>›</Text>
        </TouchableOpacity>

        {/* Topic readiness */}
        <Text style={[T.label, { color: C.textMuted, marginHorizontal: 16, marginTop: 18, marginBottom: 8 }]}>TOPIC READINESS</Text>
        <View style={[s.topicsCard, cardShadow(C.shadow)]}>
          {topicBreakdown.map((t) => {
            const ind = t.pct != null ? topicIndicator(t.pct) : { emoji: '⚪', label: 'Not started', color: C.textMuted }
            return (
              <View key={t.topic} style={s.topicRow}>
                <Text style={{ fontSize: 14 }}>{ind.emoji}</Text>
                <Text style={[T.body, { color: C.text, flex: 1, marginLeft: 8 }]} numberOfLines={1}>{t.title ?? t.topic}</Text>
                <Text style={[T.small, { color: ind.color }]}>{t.pct != null ? `${t.pct}%` : ind.label}</Text>
              </View>
            )
          })}
        </View>

        {/* Goal management */}
        <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 16, marginTop: 18 }}>
          <TouchableOpacity style={duoBtnOutline(C.border, { flex: 1 })} onPress={() => setShowShare(true)} activeOpacity={0.85}>
            <Text style={[T.btn, { color: C.text }]}>📤 SHARE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={duoBtn(C.brand, C.brandDark, { flex: 1 })} onPress={() => navigation.navigate('GoalSetup')} activeOpacity={0.85}>
            <Text style={[T.btn, { color: '#fff' }]}>CHANGE GOAL</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleRemove} style={{ alignItems: 'center', paddingVertical: 16 }}>
          <Text style={[T.small, { color: C.textMuted, textDecorationLine: 'underline' }]}>Remove goal</Text>
        </TouchableOpacity>

        <Text style={[T.label, { color: C.textDim, textAlign: 'center', marginHorizontal: 24, textTransform: 'none', letterSpacing: 0 }]}>
          ⚠️ Estimate only — official Regents score conversions change each exam and include written responses.
        </Text>

        <View style={{ height: 32 }} />
      </ScrollView>

      <GoalShareSheet
        visible={showShare}
        onClose={() => setShowShare(false)}
        subject={subject}
        target={goal.target}
        examDateStr={goal.examDateStr}
        daysToExam={days}
        baselineScore={goal.baselineScore}
        streak={streak}
        name={user?.displayName?.split(' ')[0] ?? null}
      />
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:   { flex: 1, backgroundColor: C.bg },
    scroll: { paddingBottom: 24 },
    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 16, paddingVertical: 14,
    },
    backBtn: { paddingVertical: 6, paddingRight: 12 },
    heroCard: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: C.surface, borderRadius: 20, borderWidth: 1, borderColor: C.border,
      marginHorizontal: 16, marginBottom: 14, padding: 18,
    },
    daysChip: {
      alignSelf: 'flex-start', borderRadius: 999, borderWidth: 1,
      paddingHorizontal: 10, paddingVertical: 4, marginTop: 8,
    },
    actionRow: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: C.surface, borderRadius: 16, borderWidth: 1, borderColor: C.border,
      marginHorizontal: 16, marginBottom: 10, paddingHorizontal: 14, paddingVertical: 13,
    },
    topicsCard: {
      backgroundColor: C.surface, borderRadius: 16, borderWidth: 1, borderColor: C.border,
      marginHorizontal: 16, paddingHorizontal: 14, paddingVertical: 6,
    },
    topicRow: {
      flexDirection: 'row', alignItems: 'center', paddingVertical: 9,
    },
  })
}
