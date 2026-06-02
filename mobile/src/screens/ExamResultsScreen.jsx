import React, { useState, useMemo, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { analyzeExamResults } from '../utils/topicAnalysis'
import { T, duoBtn, duoBtnOutline, cardShadow } from '../styles/duo'
import * as leData from '../content/living-environment/index'
import * as esData from '../content/earth-science/index'
import { SUBJECTS } from '../content/subjects'

// ⚠️ ESTIMATE ONLY — not an official NY Regents conversion.
// Real Regents charts are non-linear, published per administration, and the
// actual exam includes constructed-response/lab credits this MC-only practice
// run can't capture. We surface this as a study estimate and label it as such
// in the UI (see disclaimer below) so a student isn't misled near the 65 line.
function getScaledScore(rawScore, total = 50) {
  const pct = rawScore / total
  if (pct >= 0.92) return 100
  if (pct >= 0.88) return 95
  if (pct >= 0.84) return 90
  if (pct >= 0.78) return 85
  if (pct >= 0.72) return 80
  if (pct >= 0.66) return 75
  if (pct >= 0.60) return 70
  if (pct >= 0.55) return 65
  if (pct >= 0.50) return 60
  if (pct >= 0.44) return 55
  return 50
}

function topicIndicator(pct) {
  if (pct < 65) return { emoji: '🔴', label: 'Needs Work',  color: '#FF4B4B' }
  if (pct < 85) return { emoji: '🟡', label: 'Review',      color: '#FF9600' }
  return              { emoji: '🟢', label: 'Strong',       color: '#58CC02' }
}

export default function ExamResultsScreen({ route, navigation }) {
  const { exam, questions, answers, writtenAnswers = {}, correct, total, xpEarned } = route.params
  const { C } = useTheme()
  const s = makeStyles(C)
  const [showReview,    setShowReview]    = useState(false)
  const [showStudyPlan, setShowStudyPlan] = useState(true)
  const [diveDeepQ,     setDiveDeepQ]    = useState(null)

  const raw    = correct
  const scaled = getScaledScore(raw, total)
  const passed = scaled >= 65
  const color  = passed ? C.correct : C.wrong

  const writtenQuestions  = questions.filter((q) => q.type === 'written')
  const writtenMaxPts     = writtenQuestions.reduce((sum, q) => sum + (q.maxPoints ?? 1), 0)
  const mcMaxPts          = questions.filter((q) => q.type !== 'written').length
  const totalMaxPts       = mcMaxPts + writtenMaxPts

  const [displayScore, setDisplayScore] = useState(0)
  const [displayXP,    setDisplayXP]    = useState(0)
  const scoreAnim = useRef(new Animated.Value(0)).current
  const xpAnim    = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const scoreId = scoreAnim.addListener(({ value }) => setDisplayScore(Math.round(value)))
    const xpId    = xpAnim.addListener(({ value }) => setDisplayXP(Math.round(value)))
    Animated.parallel([
      Animated.timing(scoreAnim, { toValue: scaled,   duration: 1000, useNativeDriver: false }),
      Animated.timing(xpAnim,    { toValue: xpEarned, duration: 900,  useNativeDriver: false }),
    ]).start()
    return () => { scoreAnim.removeListener(scoreId); xpAnim.removeListener(xpId) }
  }, [])

  // ── Topic breakdown ───────────────────────────────────────────────────────
  const topicBreakdown = useMemo(
    () => analyzeExamResults(questions, answers, exam.subject),
    [questions, answers, exam.subject],
  )

  const weakTopics = topicBreakdown.filter((t) => t.pct < 65)
  const topPriority = weakTopics.slice(0, 2).map((t) => t.topic).join(', ')

  function studyTopic(topicName) {
    const sd = exam.subject === SUBJECTS.EARTH_SCIENCE ? esData : leData
    const pool = sd.getByTopic ? sd.getByTopic(topicName) : []
    if (!pool?.length) {
      navigation.navigate('Main', { screen: 'StudyTab' })
      return
    }
    const questionSet = [...pool].sort(() => Math.random() - 0.5).slice(0, 20)
    navigation.navigate('Main', {
      screen: 'StudyTab',
      params: {
        screen: 'Quiz',
        params: { questionSet, topic: topicName, subject: exam.subject },
      },
    })
  }

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={s.scroll}>
        {/* Header */}
        <Text style={[T.label, { color: C.textMuted, textAlign: 'center' }]}>{exam.label} Regents</Text>

        {/* Score circle */}
        <View style={[s.scoreBox, { borderColor: color }]}>
          <Text style={[T.num, { color, fontSize: 52 }]}>{displayScore}</Text>
          <Text style={[T.small, { color: C.textMuted }]}>Scaled Score</Text>
          <Text style={[T.label, { color: C.textDim, textTransform: 'none', letterSpacing: 0, marginTop: 2 }]}>
            {raw}/{total} correct
          </Text>
        </View>

        <Text style={[T.h2, { color, textAlign: 'center' }]}>
          {passed ? '🎉 Passed!' : '📚 Not yet — keep studying'}
        </Text>

        {xpEarned > 0 && (
          <View style={s.xpBanner}>
            <Text style={[T.body, { color: C.warn }]}>⭐ +{displayXP} XP earned</Text>
          </View>
        )}

        {/* Score breakdown */}
        <View style={[s.card, cardShadow(C.shadow)]}>
          {[
            { label: 'Raw Score',    value: `${raw} / ${total}`,              valueColor: C.text },
            { label: 'Percentage',   value: `${Math.round((raw/total)*100)}%`, valueColor: C.text },
            { label: 'Scaled Score', value: `${scaled}`,                       valueColor: color  },
            { label: 'Passing (65+)',value: passed ? '✓ Yes' : '✗ No',         valueColor: color  },
          ].map(({ label, value, valueColor }) => (
            <View key={label} style={s.breakdownRow}>
              <Text style={[T.body, { color: C.textMuted }]}>{label}</Text>
              <Text style={[T.h3, { color: valueColor }]}>{value}</Text>
            </View>
          ))}

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: C.border, marginVertical: 10 }} />

          {/* Point breakdown */}
          <Text style={[T.label, { color: C.textMuted, marginBottom: 8 }]}>EXAM POINT BREAKDOWN</Text>
          <View style={s.breakdownRow}>
            <Text style={[T.body, { color: C.textMuted }]}>Part I — MC ({mcMaxPts} pts max)</Text>
            <Text style={[T.h3, { color: C.text }]}>{raw} / {mcMaxPts}</Text>
          </View>
          {writtenQuestions.length > 0 && (
            <View style={s.breakdownRow}>
              <Text style={[T.body, { color: C.textMuted }]}>Written Responses ({writtenMaxPts} pts max)</Text>
              <Text style={[T.h3, { color: C.textMuted }]}>{writtenQuestions.length} submitted</Text>
            </View>
          )}
          <View style={[s.breakdownRow, { marginTop: 4 }]}>
            <Text style={[T.body, { color: C.text, fontWeight: '700' }]}>Total Possible Points</Text>
            <Text style={[T.h3, { color: C.brand }]}>{totalMaxPts}</Text>
          </View>

          <Text style={[T.small, { color: C.textDim, marginTop: 10, lineHeight: 16 }]}>
            ⚠️ Estimated score based on multiple-choice only. The official Regents
            conversion changes each exam and also counts written/lab responses, so
            your real result may differ.
          </Text>
        </View>

        {/* ── 📊 STUDY PLAN ── */}
        <TouchableOpacity
          style={[s.sectionHeader, { backgroundColor: C.surface, borderColor: C.border }]}
          onPress={() => setShowStudyPlan((v) => !v)}
          activeOpacity={0.8}
        >
          <Text style={[T.h3, { color: C.text }]}>📊 Study Plan</Text>
          <Text style={[T.body, { color: C.textMuted }]}>{showStudyPlan ? '↑' : '↓'}</Text>
        </TouchableOpacity>

        {showStudyPlan && (
          <View style={[s.card, cardShadow(C.shadow), { gap: 12 }]}>
            {topicBreakdown.map(({ topic, total: topicTotal, correct: topicCorrect, pct }) => {
              const { emoji, label, color: indicatorColor } = topicIndicator(pct)
              const isStrong = pct >= 85
              return (
                <View key={topic} style={[s.topicRow, { borderColor: indicatorColor + '40', borderWidth: 1 }]}>
                  <View style={s.topicLeft}>
                    <View style={s.topicTitleRow}>
                      <Text style={{ fontSize: 16 }}>{emoji}</Text>
                      <Text style={[T.h3, { color: C.text, flex: 1 }]} numberOfLines={1}>{topic}</Text>
                    </View>
                    <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
                      {topicCorrect}/{topicTotal} correct · {pct}%
                    </Text>
                    {/* Mini progress bar */}
                    <View style={s.miniBar}>
                      <View style={[s.miniBarFill, { width: `${pct}%`, backgroundColor: indicatorColor }]} />
                    </View>
                  </View>
                  <View style={s.topicAction}>
                    {isStrong ? (
                      <View style={[s.strongBadge, { backgroundColor: indicatorColor + '20' }]}>
                        <Text style={[T.label, { color: indicatorColor, textTransform: 'none', letterSpacing: 0 }]}>
                          ✓ Strong
                        </Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={duoBtn(
                          pct < 65 ? '#FF4B4B' : '#FF9600',
                          pct < 65 ? '#CC0000' : '#CC7A00',
                          { paddingVertical: 8, paddingHorizontal: 14 },
                        )}
                        onPress={() => studyTopic(topic)}
                      >
                        <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>
                          {pct < 65 ? 'STUDY NOW →' : 'REVIEW →'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )
            })}

            {topPriority ? (
              <View style={s.priorityBanner}>
                <Text style={[T.small, { color: C.warn }]}>
                  💡 Top priority: <Text style={{ fontFamily: 'Nunito_700Bold' }}>{topPriority}</Text>
                </Text>
              </View>
            ) : (
              <View style={s.priorityBanner}>
                <Text style={[T.small, { color: C.correct }]}>
                  🎯 Great work — all topics at 65%+!
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Review toggle */}
        <TouchableOpacity
          style={[s.sectionHeader, { backgroundColor: C.surface, borderColor: C.border }]}
          onPress={() => setShowReview((v) => !v)}
          activeOpacity={0.8}
        >
          <Text style={[T.h3, { color: C.text }]}>📋 Review Answers</Text>
          <Text style={[T.body, { color: C.textMuted }]}>{showReview ? '↑' : '↓'}</Text>
        </TouchableOpacity>

        {showReview && questions.map((q, i) => {
          if (q.type === 'written') {
            const studentText = writtenAnswers[i] ?? writtenAnswers[String(i)] ?? ''
            return (
              <View key={i} style={[s.reviewRow, { borderColor: studentText ? C.brand : C.border }]}>
                <Text style={[T.label, { color: C.textMuted, width: 22, textTransform: 'none', letterSpacing: 0 }]}>{i + 1}</Text>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={[T.label, { color: C.brand, textTransform: 'none', letterSpacing: 0 }]}>Part {q.part} · Written</Text>
                  <Text style={[T.small, { color: C.text, lineHeight: 18 }]} numberOfLines={2}>{q.text}</Text>
                  {studentText ? (
                    <Text style={[T.small, { color: C.textMuted, fontStyle: 'italic', lineHeight: 16 }]} numberOfLines={3}>
                      Your answer: {studentText}
                    </Text>
                  ) : (
                    <Text style={[T.small, { color: C.wrong }]}>Not answered</Text>
                  )}
                  {q.modelAnswer && (
                    <Text style={[T.small, { color: C.correct, lineHeight: 16 }]} numberOfLines={4}>
                      ✓ Model: {q.modelAnswer}
                    </Text>
                  )}
                </View>
                <Text>{studentText ? '✍️' : '—'}</Text>
              </View>
            )
          }
          const userAns    = answers[i] ?? answers[String(i)]
          const correctAns = q.correct ?? q.correctIndex
          const isCorrect  = userAns === correctAns
          return (
            <View key={i} style={[s.reviewRow, { borderColor: isCorrect ? C.correct : C.wrong }]}>
              <Text style={[T.label, { color: C.textMuted, width: 22, textTransform: 'none', letterSpacing: 0 }]}>{i + 1}</Text>
              <View style={{ flex: 1, gap: 3 }}>
                <Text style={[T.small, { color: C.text, lineHeight: 18 }]} numberOfLines={2}>{q.text}</Text>
                {!isCorrect && (
                  <Text style={[T.label, { color: C.correct, textTransform: 'none', letterSpacing: 0 }]}>
                    ✓ {q.choices?.[correctAns]}
                  </Text>
                )}
                {q.explanation && (
                  <Text style={[T.small, { color: C.textMuted, lineHeight: 16 }]} numberOfLines={2}>
                    {q.explanation}
                  </Text>
                )}
                {q.explanation && (
                  <TouchableOpacity
                    onPress={() => setDiveDeepQ(q)}
                    style={[s.diveDeepBtn, { borderColor: C.brand + '50', backgroundColor: C.brandBg }]}
                    activeOpacity={0.7}
                  >
                    <Text style={[T.label, { color: C.brand, textTransform: 'none', letterSpacing: 0 }]}>🔍 Dive Deep</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text>{isCorrect ? '✅' : '❌'}</Text>
            </View>
          )
        })}

        {/* Actions — read-only after submission, no retake */}
        <View style={s.actions}>
          <TouchableOpacity
            style={[duoBtn(C.brand, C.brandDark, { flex: 1 })]}
            onPress={() => navigation.navigate('Main', { screen: 'ExamsTab', params: { screen: 'ExamPicker' } })}
          >
            <Text style={[T.btn, { color: '#fff' }]}>← ALL EXAMS</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Dive Deep modal */}
      <Modal visible={!!diveDeepQ} transparent animationType="slide" onRequestClose={() => setDiveDeepQ(null)}>
        <TouchableOpacity style={s.diveBackdrop} activeOpacity={1} onPress={() => setDiveDeepQ(null)} />
        <View style={[s.diveSheet, { backgroundColor: C.surface }]}>
          <View style={[s.diveHandle, { backgroundColor: C.border }]} />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 14, paddingBottom: 32 }}>
            <Text style={[s.diveTitle, { color: C.brand }]}>🔍 Explanation</Text>
            <Text style={[s.diveBody, { color: C.text }]}>{diveDeepQ?.explanation}</Text>
            {diveDeepQ?.diveDeep && (
              <>
                <View style={[s.diveDivider, { backgroundColor: C.border }]} />
                <Text style={[s.diveDeepLabel, { color: C.textMuted }]}>DEEP DIVE</Text>
                <Text style={[s.diveBody, { color: C.text }]}>{diveDeepQ?.diveDeep}</Text>
              </>
            )}
          </ScrollView>
          <TouchableOpacity
            style={[s.diveCloseBtn, { backgroundColor: C.brand }]}
            onPress={() => setDiveDeepQ(null)}
            activeOpacity={0.85}
          >
            <Text style={s.diveCloseBtnText}>Got it ✓</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:          { flex: 1, backgroundColor: C.bg },
    scroll:        { padding: 20, gap: 14 },
    scoreBox:      {
      alignSelf: 'center', width: 170, height: 170, borderRadius: 85,
      borderWidth: 4, alignItems: 'center', justifyContent: 'center',
    },
    xpBanner:      {
      backgroundColor: '#f59e0b20', borderRadius: 14, padding: 14,
      alignItems: 'center', borderWidth: 1, borderColor: '#f59e0b50',
    },
    card:          {
      backgroundColor: C.surface, borderRadius: 18, padding: 16,
      borderWidth: 1, borderColor: C.border,
    },
    breakdownRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

    sectionHeader: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      borderRadius: 14, padding: 14, borderWidth: 1,
    },

    // Topic plan rows
    topicRow: {
      flexDirection: 'row', alignItems: 'center', gap: 10,
      backgroundColor: C.bg, borderRadius: 14, padding: 12,
    },
    topicLeft:     { flex: 1, gap: 3 },
    topicTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    topicAction:   { alignItems: 'flex-end' },
    miniBar:       { height: 5, backgroundColor: C.surface2, borderRadius: 3, marginTop: 5, overflow: 'hidden' },
    miniBarFill:   { height: 5, borderRadius: 3 },
    strongBadge:   { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6 },
    priorityBanner:{
      backgroundColor: C.surface2, borderRadius: 10, padding: 10, marginTop: 4,
    },

    reviewRow: {
      flexDirection: 'row', gap: 10, backgroundColor: C.surface,
      borderRadius: 12, padding: 12, borderLeftWidth: 3,
    },
    diveDeepBtn:     { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginTop: 2 },
    diveBackdrop:    { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
    diveSheet:       { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '75%' },
    diveHandle:      { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
    diveTitle:       { fontSize: 17, fontWeight: '800' },
    diveBody:        { fontSize: 15, lineHeight: 24 },
    diveDivider:     { height: 1 },
    diveDeepLabel:   { fontSize: 11, fontWeight: '700', letterSpacing: 1 },
    diveCloseBtn:    { borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
    diveCloseBtnText:{ color: '#fff', fontWeight: '800', fontSize: 15 },
    actions:         { flexDirection: 'row', gap: 12, marginTop: 8 },
  })
}
