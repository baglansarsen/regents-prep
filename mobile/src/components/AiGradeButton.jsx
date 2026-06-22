import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { T } from '../styles/duo'
import { useEssayGrader } from '../hooks/useEssayGrader'

/**
 * AiGradeButton — premium "Grade with AI" control for written answers.
 *
 * Mirrors the TutorButton pattern: non-subscribers see an upsell that opens the
 * paywall; subscribers get a button that grades the typed answer via the
 * gradeWriting Cloud Function and renders the score + feedback inline. Used by
 * both QuizScreen (capstone) and ExamScreen (Regents written parts).
 *
 * Props:
 *   question, studentAnswer, subject  — grading inputs
 *   isSubscribed, isConfigured, onUpgrade — premium gate (from useSubscription)
 *   onGraded(result) — optional callback fired with the grade result
 *   C — theme colors
 */
function verdictColor(verdict, C) {
  if (verdict === 'correct') return C.correct ?? C.brand
  if (verdict === 'partial') return '#FF9600'
  return C.wrong
}

export default function AiGradeButton({
  question, studentAnswer, subject, isSubscribed, isConfigured, onUpgrade, onGraded, C,
}) {
  const { loading, data, error, grade } = useEssayGrader()

  // Premium gate — non-subscribers see an upsell that opens the paywall.
  if (!isSubscribed) {
    return (
      <TouchableOpacity
        onPress={() => { if (isConfigured && onUpgrade) onUpgrade() }}
        style={{
          marginTop: 12, paddingVertical: 12, borderRadius: 12,
          borderWidth: 1.5, borderColor: C.purple ?? C.brand, alignItems: 'center',
          flexDirection: 'row', justifyContent: 'center', gap: 8,
          backgroundColor: (C.purple ?? C.brand) + '12',
        }}
      >
        <Text style={[T.btn, { color: C.purple ?? C.brand }]}>✨ Grade with AI — Premium</Text>
      </TouchableOpacity>
    )
  }

  // Result card.
  if (data) {
    const vc = verdictColor(data.verdict, C)
    return (
      <View style={{ marginTop: 12, padding: 14, borderRadius: 12, backgroundColor: C.surface, borderWidth: 1.5, borderColor: vc + '55', borderLeftWidth: 4, borderLeftColor: vc }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={[T.label, { color: vc, letterSpacing: 1 }]}>✨ AI SCORE</Text>
          <Text style={[T.h3, { color: vc }]}>{data.score}/{data.maxPoints}</Text>
        </View>
        {data.strengths ? (
          <Text style={[T.body, { color: C.text, marginBottom: 6 }]}>
            <Text style={{ fontWeight: '700' }}>What you got right: </Text>{data.strengths}
          </Text>
        ) : null}
        {data.missing ? (
          <Text style={[T.body, { color: C.text, marginBottom: 6 }]}>
            <Text style={{ fontWeight: '700' }}>What’s missing: </Text>{data.missing}
          </Text>
        ) : null}
        {data.tip ? (
          <Text style={[T.body, { color: C.textDim ?? C.textMuted, fontStyle: 'italic' }]}>
            💡 {data.tip}
          </Text>
        ) : null}
      </View>
    )
  }

  const onPress = async () => {
    const res = await grade(question, studentAnswer, subject)
    if (res && onGraded) onGraded(res)
  }

  const disabled = loading || !(studentAnswer ?? '').trim()
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        marginTop: 12, paddingVertical: 12, borderRadius: 12,
        borderWidth: 1.5, borderColor: C.brand, alignItems: 'center',
        flexDirection: 'row', justifyContent: 'center', gap: 8,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {loading && <ActivityIndicator size="small" color={C.brand} />}
      <Text style={[T.btn, { color: C.brand }]}>
        {loading ? 'Grading…' : error ? 'Try again' : '✨ Grade with AI'}
      </Text>
    </TouchableOpacity>
  )
}
