import React, { useState, useEffect, useRef } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, Image,
  StyleSheet, Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useXP } from '../hooks/useXP'
import { useDailyStreak } from '../hooks/useDailyStreak'

const EXAM_MINUTES = 85
const CDN_BASE = 'https://regents-csas.web.app/images/exams'

export default function ExamScreen({ route, navigation }) {
  const { exam, questions, subject } = route.params
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { earnXP } = useXP(uid)
  const { markStudied } = useDailyStreak(uid)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers,    setAnswers]    = useState({})
  const [flagged,    setFlagged]    = useState(new Set())
  const [phase,      setPhase]      = useState('test') // 'test' | 'review'
  const [timeLeft,   setTimeLeft]   = useState(EXAM_MINUTES * 60)
  const timerRef = useRef(null)
  const s = makeStyles(C)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); submit(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  function submit() {
    clearInterval(timerRef.current)
    const correct = questions.filter((q, i) => answers[i] === (q.correct ?? q.correctIndex)).length
    const xp = correct * 5
    earnXP(xp)
    markStudied()
    navigation.replace('ExamResults', {
      exam, questions, answers: { ...answers }, correct, total: questions.length, xpEarned: xp,
    })
  }

  function confirmSubmit() {
    const answered = Object.keys(answers).length
    const unanswered = questions.length - answered
    if (unanswered > 0) {
      Alert.alert('Submit Exam?', `You have ${unanswered} unanswered questions.`, [
        { text: 'Continue', style: 'cancel' },
        { text: 'Submit', style: 'destructive', onPress: submit },
      ])
    } else {
      submit()
    }
  }

  const q = questions[currentIdx]
  if (!q) return null

  const mins = Math.floor(timeLeft / 60)
  const secs = String(timeLeft % 60).padStart(2, '0')
  const timerColor = timeLeft < 300 ? C.wrong : timeLeft < 600 ? C.warn : C.text

  // Build CDN image URL if question has an image reference
  const imgKey = exam.id.replace('le-', 'le-').replace('es-', 'es-')
  const imageUrl = q.imageFile
    ? `${CDN_BASE}/${imgKey}/q${q.number ?? currentIdx + 1}.png`
    : null

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      {/* Top bar */}
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => Alert.alert('Exit?', 'Progress will be lost.', [
          { text: 'Stay', style: 'cancel' },
          { text: 'Exit', style: 'destructive', onPress: () => navigation.goBack() },
        ])}>
          <Text style={s.exitBtn}>✕</Text>
        </TouchableOpacity>
        <Text style={[s.timer, { color: timerColor }]}>{mins}:{secs}</Text>
        <TouchableOpacity style={s.submitBtn} onPress={confirmSubmit}>
          <Text style={s.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Progress dots */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.dotsScroll} contentContainerStyle={s.dotsContainer}>
        {questions.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => setCurrentIdx(i)}>
            <View style={[
              s.dot,
              i === currentIdx && s.dotCurrent,
              answers[i] !== undefined && s.dotAnswered,
              flagged.has(i) && s.dotFlagged,
            ]} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={s.scroll}>
        {/* Question header */}
        <View style={s.qHeader}>
          <Text style={s.qNum}>Question {currentIdx + 1} of {questions.length}</Text>
          <TouchableOpacity onPress={() => {
            setFlagged((prev) => {
              const next = new Set(prev)
              next.has(currentIdx) ? next.delete(currentIdx) : next.add(currentIdx)
              return next
            })
          }}>
            <Text style={[s.flagBtn, flagged.has(currentIdx) && { color: C.warn }]}>
              {flagged.has(currentIdx) ? '🚩' : '⚑'} Flag
            </Text>
          </TouchableOpacity>
        </View>

        {/* Context */}
        {q.context && <Text style={s.context}>{q.context}</Text>}

        {/* Image */}
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={s.image}
            resizeMode="contain"
          />
        )}

        {/* Question text */}
        <Text style={s.questionText}>{q.text}</Text>

        {/* Choices */}
        {q.choices?.map((choice, idx) => (
          <TouchableOpacity
            key={idx}
            style={[s.choice, answers[currentIdx] === idx && s.choiceSelected]}
            onPress={() => setAnswers((a) => ({ ...a, [currentIdx]: idx }))}
          >
            <Text style={s.choiceLetter}>{['A','B','C','D'][idx]}</Text>
            <Text style={s.choiceText}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom nav */}
      <View style={s.bottomNav}>
        <TouchableOpacity
          style={[s.navBtn, { opacity: currentIdx === 0 ? 0.3 : 1 }]}
          onPress={() => setCurrentIdx((i) => Math.max(0, i - 1))}
          disabled={currentIdx === 0}
        >
          <Text style={s.navBtnText}>← Prev</Text>
        </TouchableOpacity>
        <Text style={s.answeredCount}>{Object.keys(answers).length}/{questions.length}</Text>
        <TouchableOpacity
          style={[s.navBtn, { opacity: currentIdx === questions.length - 1 ? 0.3 : 1 }]}
          onPress={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
          disabled={currentIdx === questions.length - 1}
        >
          <Text style={s.navBtnText}>Next →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:         { flex: 1, backgroundColor: C.bg },
    topBar:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    exitBtn:      { fontSize: 18, color: C.textMuted, padding: 4 },
    timer:        { fontSize: 20, fontWeight: '900' },
    submitBtn:    { backgroundColor: C.brand, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8 },
    submitBtnText:{ color: '#fff', fontWeight: '700', fontSize: 14 },
    dotsScroll:   { maxHeight: 28, flexGrow: 0 },
    dotsContainer:{ paddingHorizontal: 16, gap: 5, alignItems: 'center' },
    dot:          { width: 14, height: 14, borderRadius: 7, backgroundColor: C.surface2, borderWidth: 1, borderColor: C.border },
    dotCurrent:   { borderColor: C.brand, borderWidth: 2 },
    dotAnswered:  { backgroundColor: C.brand },
    dotFlagged:   { backgroundColor: C.warn },
    scroll:       { padding: 16, gap: 12 },
    qHeader:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    qNum:         { fontSize: 13, fontWeight: '700', color: C.textMuted },
    flagBtn:      { fontSize: 14, color: C.textMuted, fontWeight: '600' },
    context:      { fontSize: 13, color: C.textMuted, fontStyle: 'italic', lineHeight: 18 },
    image:        { width: '100%', height: 200, borderRadius: 12, backgroundColor: C.surface },
    questionText: { fontSize: 16, fontWeight: '600', color: C.text, lineHeight: 24 },
    choice:       { flexDirection: 'row', alignItems: 'flex-start', gap: 12, backgroundColor: C.surface, borderRadius: 14, padding: 14, borderWidth: 1.5, borderColor: C.border },
    choiceSelected:{ borderColor: C.brand, backgroundColor: C.brandBg },
    choiceLetter: { fontSize: 14, fontWeight: '800', color: C.textMuted, width: 20 },
    choiceText:   { flex: 1, fontSize: 15, color: C.text, lineHeight: 21 },
    bottomNav:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderTopWidth: 1, borderTopColor: C.border },
    navBtn:       { backgroundColor: C.surface, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, borderWidth: 1, borderColor: C.border },
    navBtnText:   { color: C.text, fontWeight: '700', fontSize: 14 },
    answeredCount:{ fontSize: 13, color: C.textMuted },
  })
}
