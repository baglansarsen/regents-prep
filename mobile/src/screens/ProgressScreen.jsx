import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useGoal } from '../context/GoalContext'
import { useProgress } from '../hooks/useProgress'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useRP, LEVELS } from '../hooks/useRP'
import { useExamScores } from '../hooks/useExamScores'
import { useStudyTime } from '../hooks/useStudyTime'
import { usePredictedScore } from '../hooks/usePredictedScore'
import { getSubjectData } from '../utils/subjectData'
import { computeAchievements } from '../utils/achievements'
import { REGENTS_EXAMS } from '../content/regents-exams/index'
import { tierFor } from '../data/goalConfig'
import { daysUntil } from '../utils/examDates'
import { T, cardShadow, duoBtn } from '../styles/duo'
import GoalRing from '../components/GoalRing'
import StreakCalendar from '../components/StreakCalendar'

export default function ProgressScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid

  const { subject } = useSubject()
  const sd    = getSubjectData(subject)
  const units = sd.UNITS ?? []

  const { history, isMastered } = useProgress(uid)
  const { streak, studiedToday, studiedDates, frozenDates, longestStreak } = useDailyStreak(uid)
  const { rp, weeklyRP, level, spendRP } = useRP(uid)
  const { scores: examScores } = useExamScores()
  const { todaySeconds, formatTime } = useStudyTime()
  const { getGoal } = useGoal()

  const subjectHistory = history.filter((h) => (h.subject ?? 'living-environment') === subject)
  const { predicted, coldStart, topicBreakdown, weakestUnit } =
    usePredictedScore(subject, units, subjectHistory)

  const goal     = getGoal(subject)
  const target   = goal?.target ?? null
  const daysLeft = goal?.examDateStr ? daysUntil(goal.examDateStr) : null
  const atGoal   = predicted != null && target != null && predicted >= target

  // ── Stat strip values ───────────────────────────────────────────────────────
  const totalQuizzes  = subjectHistory.length
  const sumCorrect    = subjectHistory.reduce((a, h) => a + (h.correct ?? 0), 0)
  const sumTotal      = subjectHistory.reduce((a, h) => a + (h.total ?? 0), 0)
  const accuracy      = sumTotal > 0 ? Math.round((sumCorrect / sumTotal) * 100) : null
  const masteredCount = units.filter((u) => isMastered(u.topic, subject)).length

  const examIds  = (REGENTS_EXAMS[subject] ?? []).map((e) => e.id)
  const bestExam = examIds.reduce((m, id) => Math.max(m, examScores?.[id]?.best ?? 0), 0)

  // ── Insights (single source: topicBreakdown) ────────────────────────────────
  const attempted = topicBreakdown.filter((t) => t.pct !== null)
  const strongest = attempted.length ? attempted.reduce((a, b) => (b.pct > a.pct ? b : a)) : null
  // Some subjects (e.g. English) have no per-topic question sets — hide the
  // Practice CTA there so it's never a dead button.
  const canPracticeWeakest = !!weakestUnit && (sd.getExamContextQuestions?.(weakestUnit.topic) ?? []).length > 0

  // ── Achievements preview (LE+ES catalog, matches AchievementsScreen) ─────────
  const [diagCount, setDiagCount] = useState(0)
  useEffect(() => {
    (async () => {
      try {
        const [le, es] = await Promise.all([
          AsyncStorage.getItem('@placement_done_living-environment'),
          AsyncStorage.getItem('@placement_done_earth-science'),
        ])
        setDiagCount((le === 'true' ? 1 : 0) + (es === 'true' ? 1 : 0))
      } catch {}
    })()
  }, [])
  const achHistory = history.filter((h) => {
    const sub = h.subject ?? 'living-environment'
    return sub === 'living-environment' || sub === 'earth-science'
  })
  const { earned, total: achTotal } = computeAchievements({ history: achHistory, streak, rp, examScores, diagCount })

  const nextLevel  = LEVELS.find((l) => l.min > rp)
  const rpProgress = nextLevel ? (rp - level.min) / (nextLevel.min - level.min) : 1

  const s = makeStyles(C)

  function practiceTopic(topic) {
    const pool = sd.getExamContextQuestions?.(topic) ?? []
    if (!pool.length) return
    navigation.navigate('StudyTab', { screen: 'Quiz', params: { questionSet: pool, topic, subject } })
  }

  const STATS = [
    { num: weeklyRP ?? 0, label: 'RP this week' },
    { num: formatTime(todaySeconds || 0), label: 'Studied today' },
    { num: bestExam > 0 ? `${bestExam}` : '—', label: 'Best exam' },
    { num: totalQuizzes, label: 'Quizzes' },
    { num: accuracy != null ? `${accuracy}%` : '—', label: 'Accuracy' },
    { num: masteredCount, label: 'Mastered' },
  ]

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={[T.h1, { color: C.text, padding: 20, paddingBottom: 12 }]}>Progress</Text>

        {/* ── Predicted-score hero ── */}
        <View style={[s.card, s.heroCard, cardShadow(C.shadow)]}>
          <GoalRing
            size={96}
            strokeWidth={9}
            progress={predicted != null && target != null
              ? Math.min(1, Math.max(0, (predicted - 50) / Math.max(1, target - 50)))
              : 0}
            color={atGoal ? C.correct : (C.warn ?? '#FFC800')}
            trackColor={C.surface2}
          >
            <Text style={[T.num, { color: C.text, fontSize: 30 }]}>{coldStart ? '—' : predicted}</Text>
          </GoalRing>
          <View style={{ flex: 1, marginLeft: 18 }}>
            <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>
              Predicted Regents score
            </Text>
            {coldStart ? (
              <Text style={[T.small, { color: C.textMuted, marginTop: 4 }]}>
                Take a quiz to unlock your prediction.
              </Text>
            ) : target != null ? (
              <>
                <Text style={[T.h2, { color: C.text, marginTop: 2 }]}>
                  {predicted} → {target} {tierFor(target).icon}
                </Text>
                <Text style={[T.small, { color: atGoal ? C.correct : C.textMuted, marginTop: 3 }]}>
                  {atGoal ? '🎉 Predicted at your goal!' : `${target - predicted} points to go`}
                  {daysLeft != null ? ` · ${daysLeft} days left` : ''}
                </Text>
              </>
            ) : (
              <TouchableOpacity
                style={[duoBtn(C.brand, C.brandDark, { marginTop: 8, alignSelf: 'flex-start', paddingHorizontal: 16 })]}
                onPress={() => navigation.navigate('StudyTab', { screen: 'GoalSetup' })}
              >
                <Text style={[T.btn, { color: '#fff', fontSize: 12 }]}>SET A GOAL</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ── Stat strip (3×2) ── */}
        <View style={s.statsGrid}>
          {STATS.map(({ num, label }) => (
            <View key={label} style={[s.statCard, cardShadow(C.shadow)]}>
              <Text style={[T.num, { color: C.brand, fontSize: 22 }]}>{num}</Text>
              <Text style={[T.label, { color: C.textMuted, marginTop: 2, textTransform: 'none', letterSpacing: 0, fontSize: 11 }]}>
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Insights ── */}
        {weakestUnit && (
          <View style={[s.insightCard, { backgroundColor: C.wrong + '14', borderColor: C.wrong + '55' }]}>
            <Text style={s.insightIcon}>📉</Text>
            <View style={{ flex: 1 }}>
              <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>Needs work</Text>
              <Text style={[T.small, { color: C.text, marginTop: 2 }]} numberOfLines={1}>
                {weakestUnit.title} {weakestUnit.pct != null ? `· ${weakestUnit.pct}%` : ''}
              </Text>
            </View>
            {canPracticeWeakest && (
              <TouchableOpacity
                style={[duoBtn(C.brand, C.brandDark, { paddingVertical: 8, paddingHorizontal: 16 })]}
                onPress={() => practiceTopic(weakestUnit.topic)}
              >
                <Text style={[T.btn, { color: '#fff', fontSize: 12 }]}>PRACTICE</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        {strongest && strongest.topic !== weakestUnit?.topic && (
          <View style={[s.insightCard, { backgroundColor: C.correct + '14', borderColor: C.correct + '55' }]}>
            <Text style={s.insightIcon}>📈</Text>
            <View style={{ flex: 1 }}>
              <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>Strongest topic</Text>
              <Text style={[T.small, { color: C.text, marginTop: 2 }]} numberOfLines={1}>
                {strongest.title} · {strongest.pct}%
              </Text>
            </View>
          </View>
        )}

        {/* ── RP / Level card ── */}
        <View style={[s.card, cardShadow(C.shadow)]}>
          <View style={s.levelRow}>
            <View style={[s.levelCircle, { borderColor: C.brand }]}>
              <Text style={[T.num, { color: C.brand, fontSize: 26 }]}>{level.level}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[T.h3, { color: C.text }]}>{level.name}</Text>
              <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>{rp} RP total</Text>
            </View>
            {nextLevel && <Text style={[T.small, { color: C.textMuted }]}>{nextLevel.min - rp} to next</Text>}
          </View>
          <View style={s.rpBarBg}>
            <View style={[s.rpBarFill, { width: `${rpProgress * 100}%` }]} />
          </View>
        </View>

        {/* ── Streak card ── */}
        <View style={[s.card, cardShadow(C.shadow)]}>
          <View style={s.cardHeader}>
            <Text style={[T.h3, { color: C.text }]}>🔥 Streak</Text>
            <Text style={[T.h2, { color: C.warn }]}>{streak} days</Text>
          </View>
          <StreakCalendar
            studiedDates={studiedDates}
            frozenDates={frozenDates}
            streak={streak}
            longestStreak={longestStreak}
            C={C}
          />
          {!studiedToday && (
            <TouchableOpacity style={[duoBtn(C.surface2, C.border, { marginTop: 12 })]} onPress={() => spendRP(100)}>
              <Text style={[T.btn, { color: C.textMuted }]}>🧊 STREAK FREEZE (100 RP)</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── Topic mastery (single source: topicBreakdown) ── */}
        <Text style={[T.label, { color: C.textMuted, marginHorizontal: 16, marginBottom: 10, marginTop: 4 }]}>
          Topic Mastery
        </Text>
        {topicBreakdown.map(({ topic, title, pct, attempts }) => {
          const started = attempts > 0 && pct !== null
          const mastered = isMastered(topic, subject)
          const passing  = started && pct >= 65
          const barColor = !started ? C.surface3 : mastered ? C.correct : passing ? C.warn : C.wrong
          return (
            <View key={topic} style={[s.topicCard, cardShadow(C.shadow)]}>
              <Text style={{ fontSize: 22 }}>{sd.TOPIC_ICONS?.[topic] ?? '📖'}</Text>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={[T.small, { color: C.text, flex: 1 }]} numberOfLines={1}>{title}</Text>
                  <Text style={[T.label, { color: started ? barColor : C.textDim, textTransform: 'none', letterSpacing: 0 }]}>
                    {started ? `${pct}%` : 'Not started'}
                  </Text>
                </View>
                <View style={s.barBg}>
                  <View style={[s.barFill, { width: started ? `${Math.min(pct, 100)}%` : '0%', backgroundColor: barColor }]} />
                </View>
              </View>
            </View>
          )
        })}

        {/* ── Achievements preview row ── */}
        <TouchableOpacity
          style={[s.achievementRow, cardShadow(C.shadow)]}
          onPress={() => navigation.navigate('Achievements')}
          activeOpacity={0.85}
        >
          <Text style={{ fontSize: 26 }}>🏅</Text>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[T.h3, { color: C.text }]}>Achievements</Text>
            <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>{earned.length} of {achTotal} earned</Text>
          </View>
          <Text style={s.achievementEmojis} numberOfLines={1}>
            {earned.slice(-3).map((a) => a.emoji).join(' ')}
          </Text>
          <Text style={[T.body, { color: C.textMuted, marginLeft: 8 }]}>›</Text>
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
    heroCard:   { flexDirection: 'row', alignItems: 'center' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
    levelRow:   { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 14 },
    levelCircle:{ width: 56, height: 56, borderRadius: 28, borderWidth: 3, alignItems: 'center', justifyContent: 'center' },
    rpBarBg:    { height: 10, backgroundColor: C.surface2, borderRadius: 5, overflow: 'hidden' },
    rpBarFill:  { height: 10, backgroundColor: C.brand, borderRadius: 5 },

    statsGrid:  { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 16, gap: 10, marginBottom: 12 },
    statCard:   { flexBasis: '31%', flexGrow: 1, backgroundColor: C.surface, borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: C.border },

    insightCard:{ flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 16, marginBottom: 10, borderRadius: 14, padding: 14, borderWidth: 1 },
    insightIcon:{ fontSize: 24 },

    topicCard:  { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 16, marginBottom: 10, backgroundColor: C.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border },
    barBg:      { height: 8, backgroundColor: C.surface2, borderRadius: 4, overflow: 'hidden' },
    barFill:    { height: 8, borderRadius: 4 },

    achievementRow:   { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 4, backgroundColor: C.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: C.border },
    achievementEmojis:{ fontSize: 18 },
  })
}
