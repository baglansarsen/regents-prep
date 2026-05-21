import React, { useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Animated, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useXP } from '../hooks/useXP'
import { useQuiz } from '../hooks/useQuiz'

export default function QuizScreen({ route, navigation }) {
  const { questionSet, topic, subject } = route.params
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid

  const { saveResult } = useProgress(uid)
  const { markStudied } = useDailyStreak(uid)
  const { earnXP } = useXP(uid)

  const {
    currentQuestion, index, total, score, streak, bestStreak,
    timeLeft, timerMax, selected, lastEarned, phase, results,
    answer, nextQuestion,
  } = useQuiz(questionSet)

  const pulseAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (phase === 'done') {
      const correct = results.filter((r) => r.correct).length
      const pct     = Math.round((correct / total) * 100)
      const xpEarned = correct * 10

      saveResult({ topic, score, total, correct, pct, subject })
      markStudied()
      earnXP(xpEarned)

      navigation.replace('Results', {
        score, total, results, bestStreak, topic, subject, xpEarned,
      })
    }
  }, [phase])

  useEffect(() => {
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.05, duration: 80, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1,    duration: 80, useNativeDriver: true }),
    ]).start()
  }, [index])

  if (!currentQuestion) return null

  const s = makeStyles(C)
  const correctAnswer = currentQuestion.choices?.[currentQuestion.correct] ?? currentQuestion.choices?.[currentQuestion.correctIndex]

  function choiceStyle(idx) {
    if (phase === 'answering') return [s.choice, selected === idx && s.choiceSelected]
    const isCorrect = idx === (currentQuestion.correct ?? currentQuestion.correctIndex)
    const isChosen  = idx === selected
    if (isCorrect)           return [s.choice, s.choiceCorrect]
    if (isChosen && !isCorrect) return [s.choice, s.choiceWrong]
    return [s.choice, s.choiceDim]
  }

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      {/* Progress bar */}
      <View style={s.progressBg}>
        <View style={[s.progressFill, { width: `${((index) / total) * 100}%` }]} />
      </View>

      {/* Header */}
      <View style={s.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.backBtn}>✕</Text>
        </TouchableOpacity>
        <Text style={s.counter}>{index + 1} / {total}</Text>
        <View style={s.scoreRow}>
          <Text style={s.scoreText}>⭐ {score}</Text>
          {streak >= 2 && <Text style={s.streakText}>🔥×{streak}</Text>}
        </View>
      </View>

      {/* Timer bar */}
      <View style={s.timerBg}>
        <Animated.View style={[
          s.timerFill,
          {
            width: `${(timeLeft / timerMax) * 100}%`,
            backgroundColor: timeLeft > 10 ? C.brand : timeLeft > 5 ? C.warn : C.wrong,
          },
        ]} />
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {/* Question */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <View style={s.questionCard}>
            {currentQuestion.context ? (
              <Text style={s.context}>{currentQuestion.context}</Text>
            ) : null}
            <Text style={s.questionText}>{currentQuestion.text}</Text>
          </View>
        </Animated.View>

        {/* Choices */}
        {currentQuestion.choices.map((choice, idx) => (
          <TouchableOpacity
            key={idx}
            style={choiceStyle(idx)}
            onPress={() => phase === 'answering' && answer(idx)}
            activeOpacity={0.8}
            disabled={phase !== 'answering'}
          >
            <Text style={s.choiceLetter}>{['A', 'B', 'C', 'D'][idx]}</Text>
            <Text style={s.choiceText}>{choice}</Text>
          </TouchableOpacity>
        ))}

        {/* Feedback */}
        {phase === 'feedback' && (
          <View style={[s.feedback, {
            backgroundColor: selected === (currentQuestion.correct ?? currentQuestion.correctIndex) ? C.correctBg : C.wrongBg,
            borderColor:     selected === (currentQuestion.correct ?? currentQuestion.correctIndex) ? C.correct    : C.wrong,
          }]}>
            <Text style={[s.feedbackTitle, {
              color: selected === (currentQuestion.correct ?? currentQuestion.correctIndex) ? C.correct : C.wrong,
            }]}>
              {selected === (currentQuestion.correct ?? currentQuestion.correctIndex)
                ? `✓ Correct! +${lastEarned} pts`
                : `✗ Incorrect. Answer: ${correctAnswer}`}
            </Text>
            {currentQuestion.explanation ? (
              <Text style={s.explanation}>{currentQuestion.explanation}</Text>
            ) : null}
            <TouchableOpacity style={s.nextBtn} onPress={nextQuestion}>
              <Text style={s.nextBtnText}>{index + 1 === total ? 'See Results →' : 'Next →'}</Text>
            </TouchableOpacity>
          </View>
        )}

        {phase === 'answering' && selected === 'timeout' && (
          <View style={[s.feedback, { backgroundColor: C.wrongBg, borderColor: C.wrong }]}>
            <Text style={[s.feedbackTitle, { color: C.wrong }]}>⏰ Time's up! Answer: {correctAnswer}</Text>
            <TouchableOpacity style={s.nextBtn} onPress={nextQuestion}>
              <Text style={s.nextBtnText}>Next →</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:          { flex: 1, backgroundColor: C.bg },
    progressBg:    { height: 3, backgroundColor: C.surface2 },
    progressFill:  { height: 3, backgroundColor: C.brand },
    topRow:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    backBtn:       { fontSize: 18, color: C.textMuted, padding: 4 },
    counter:       { fontSize: 14, fontWeight: '700', color: C.textMuted },
    scoreRow:      { flexDirection: 'row', gap: 8, alignItems: 'center' },
    scoreText:     { fontSize: 14, fontWeight: '700', color: C.warn },
    streakText:    { fontSize: 13, color: C.wrong, fontWeight: '700' },
    timerBg:       { height: 4, backgroundColor: C.surface2, marginHorizontal: 16, borderRadius: 2 },
    timerFill:     { height: 4, borderRadius: 2 },
    scroll:        { padding: 16, gap: 10 },
    questionCard:  { backgroundColor: C.surface, borderRadius: 16, padding: 18, marginBottom: 4, borderWidth: 1, borderColor: C.border },
    context:       { fontSize: 13, color: C.textMuted, marginBottom: 8, fontStyle: 'italic', lineHeight: 18 },
    questionText:  { fontSize: 16, fontWeight: '600', color: C.text, lineHeight: 24 },
    choice:        { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: C.surface, borderRadius: 14, padding: 14, gap: 12, borderWidth: 1.5, borderColor: C.border },
    choiceSelected:{ borderColor: C.brand, backgroundColor: C.brandBg },
    choiceCorrect: { borderColor: C.correct, backgroundColor: C.correctBg },
    choiceWrong:   { borderColor: C.wrong,   backgroundColor: C.wrongBg },
    choiceDim:     { opacity: 0.4 },
    choiceLetter:  { fontSize: 14, fontWeight: '800', color: C.textMuted, width: 20 },
    choiceText:    { flex: 1, fontSize: 15, color: C.text, lineHeight: 21 },
    feedback:      { borderRadius: 14, padding: 16, borderWidth: 1, gap: 10 },
    feedbackTitle: { fontSize: 15, fontWeight: '800' },
    explanation:   { fontSize: 14, color: C.textMuted, lineHeight: 20 },
    nextBtn:       { backgroundColor: C.brand, borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 4 },
    nextBtnText:   { color: '#fff', fontWeight: '700', fontSize: 15 },
  })
}
