import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'

// NY Regents scaled score tables (simplified — 85 minutes, 50 MC)
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

export default function ExamResultsScreen({ route, navigation }) {
  const { exam, questions, answers, correct, total, xpEarned } = route.params
  const { C } = useTheme()
  const s = makeStyles(C)
  const [showReview, setShowReview] = useState(false)

  const raw    = correct
  const scaled = getScaledScore(raw, total)
  const passed = scaled >= 65
  const color  = passed ? C.correct : C.wrong

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={s.scroll}>
        {/* Header */}
        <Text style={s.examLabel}>{exam.label} Regents</Text>

        {/* Score */}
        <View style={[s.scoreBox, { borderColor: color }]}>
          <Text style={[s.scaledScore, { color }]}>{scaled}</Text>
          <Text style={s.scaledLabel}>Scaled Score</Text>
          <Text style={s.rawScore}>{raw}/{total} correct</Text>
        </View>

        <Text style={[s.verdict, { color }]}>
          {passed ? '🎉 Passed!' : '📚 Not yet — keep studying'}
        </Text>

        {xpEarned > 0 && (
          <View style={s.xpBanner}>
            <Text style={s.xpText}>⭐ +{xpEarned} XP earned</Text>
          </View>
        )}

        {/* Score breakdown */}
        <View style={s.breakdown}>
          <View style={s.breakdownRow}>
            <Text style={s.breakdownLabel}>Raw Score</Text>
            <Text style={s.breakdownValue}>{raw} / {total}</Text>
          </View>
          <View style={s.breakdownRow}>
            <Text style={s.breakdownLabel}>Percentage</Text>
            <Text style={s.breakdownValue}>{Math.round((raw/total)*100)}%</Text>
          </View>
          <View style={s.breakdownRow}>
            <Text style={s.breakdownLabel}>Scaled Score</Text>
            <Text style={[s.breakdownValue, { color }]}>{scaled}</Text>
          </View>
          <View style={s.breakdownRow}>
            <Text style={s.breakdownLabel}>Passing (65+)</Text>
            <Text style={[s.breakdownValue, { color }]}>{passed ? '✓ Yes' : '✗ No'}</Text>
          </View>
        </View>

        {/* Review toggle */}
        <TouchableOpacity style={s.reviewToggle} onPress={() => setShowReview((v) => !v)}>
          <Text style={s.reviewToggleText}>{showReview ? 'Hide Review' : 'Review Answers'} {showReview ? '↑' : '↓'}</Text>
        </TouchableOpacity>

        {showReview && questions.map((q, i) => {
          const userAns  = answers[i]
          const correctAns = q.correct ?? q.correctIndex
          const isCorrect  = userAns === correctAns
          return (
            <View key={i} style={[s.reviewRow, { borderColor: isCorrect ? C.correct : C.wrong }]}>
              <Text style={s.reviewNum}>{i + 1}</Text>
              <View style={{ flex: 1 }}>
                <Text style={s.reviewQ} numberOfLines={2}>{q.text}</Text>
                {!isCorrect && <Text style={s.reviewAnswer}>✓ {q.choices?.[correctAns]}</Text>}
              </View>
              <Text>{isCorrect ? '✅' : '❌'}</Text>
            </View>
          )
        })}

        {/* Actions */}
        <View style={s.actions}>
          <TouchableOpacity
            style={[s.btn, { backgroundColor: C.brand }]}
            onPress={() => navigation.navigate('Exam', { exam, questions, subject: exam.subject })}
          >
            <Text style={s.btnText}>🔄 Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.btn, { backgroundColor: C.surface, borderWidth: 1, borderColor: C.border }]}
            onPress={() => navigation.navigate('ExamPicker')}
          >
            <Text style={[s.btnText, { color: C.text }]}>← All Exams</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:          { flex: 1, backgroundColor: C.bg },
    scroll:        { padding: 20, gap: 14 },
    examLabel:     { fontSize: 14, color: C.textMuted, fontWeight: '600', textAlign: 'center' },
    scoreBox:      { alignSelf: 'center', width: 160, height: 160, borderRadius: 80, borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
    scaledScore:   { fontSize: 48, fontWeight: '900' },
    scaledLabel:   { fontSize: 13, color: C.textMuted },
    rawScore:      { fontSize: 12, color: C.textDim, marginTop: 2 },
    verdict:       { fontSize: 22, fontWeight: '800', textAlign: 'center' },
    xpBanner:      { backgroundColor: '#f59e0b20', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#f59e0b50' },
    xpText:        { color: C.warn, fontWeight: '700', fontSize: 15 },
    breakdown:     { backgroundColor: C.surface, borderRadius: 16, padding: 16, gap: 10, borderWidth: 1, borderColor: C.border },
    breakdownRow:  { flexDirection: 'row', justifyContent: 'space-between' },
    breakdownLabel:{ fontSize: 14, color: C.textMuted },
    breakdownValue:{ fontSize: 14, fontWeight: '700', color: C.text },
    reviewToggle:  { backgroundColor: C.surface, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: C.border },
    reviewToggleText:{ color: C.text, fontWeight: '600', fontSize: 14 },
    reviewRow:     { flexDirection: 'row', gap: 10, backgroundColor: C.surface, borderRadius: 12, padding: 12, borderLeftWidth: 3 },
    reviewNum:     { fontSize: 13, fontWeight: '800', color: C.textMuted, width: 20 },
    reviewQ:       { fontSize: 13, color: C.text, lineHeight: 18 },
    reviewAnswer:  { fontSize: 12, color: C.correct, fontWeight: '600', marginTop: 2 },
    actions:       { flexDirection: 'row', gap: 12, marginTop: 8 },
    btn:           { flex: 1, padding: 16, borderRadius: 14, alignItems: 'center' },
    btnText:       { fontSize: 15, fontWeight: '700', color: '#fff' },
  })
}
