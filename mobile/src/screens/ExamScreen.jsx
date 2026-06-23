import React, { useState, useEffect, useRef } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, Image,
  StyleSheet, Alert, Animated, TextInput, KeyboardAvoidingView, Platform, Keyboard,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useRP } from '../hooks/useRP'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { appendMistakes } from '../hooks/useMistakes'
import { usePetContext } from '../context/PetContext'
import { useSubscription } from '../context/SubscriptionContext'
import { hapticTick } from '../utils/haptics'
import { logActivity } from '../utils/activityLogger'
import { examMinutes } from '../utils/examConfig'
import ExamImage from '../components/ExamImage'
import AiGradeButton from '../components/AiGradeButton'

export default function ExamScreen({ route, navigation }) {
  const { exam, questions, subject } = route.params
  const { C } = useTheme()
  const insets = useSafeAreaInsets()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { rp, earnRP } = useRP(uid)
  const { markStudied } = useDailyStreak(uid)
  const { checkAndEvolve } = usePetContext()
  const { isSubscribed, isConfigured, presentPaywall } = useSubscription()

  const [currentIdx,     setCurrentIdx]     = useState(0)
  const [answers,        setAnswers]        = useState({})
  const [writtenAnswers, setWrittenAnswers] = useState({})
  const [writtenScores,  setWrittenScores]  = useState({})   // qIdx → { score, maxPoints } from AI grade
  const [revealedModels, setRevealedModels] = useState(new Set())
  const [flagged,        setFlagged]        = useState(new Set())
  const [phase,      setPhase]      = useState('test') // 'test' | 'review'
  const [timeLeft,   setTimeLeft]   = useState(examMinutes(subject) * 60)
  const timerRef = useRef(null)
  const submitRef = useRef(null)
  const choiceScales = useRef(Array.from({ length: 4 }, () => new Animated.Value(1))).current
  const s = makeStyles(C)

  function animateChoice(idx) {
    Animated.sequence([
      Animated.spring(choiceScales[idx], { toValue: 0.95, useNativeDriver: true, tension: 300, friction: 10 }),
      Animated.spring(choiceScales[idx], { toValue: 1,    useNativeDriver: true, tension: 300, friction: 10 }),
    ]).start()
  }

  // Keep submitRef current so the timer always calls the latest submit closure
  useEffect(() => { submitRef.current = submit })

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); submitRef.current(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  function submit() {
    clearInterval(timerRef.current)
    const mcQuestions = questions.filter((q) => q.type !== 'written')
    const correct   = mcQuestions.filter((q, i) => {
      const idx = questions.indexOf(q)
      return answers[idx] === (q.correct ?? q.correctIndex)
    }).length
    const rpEarned  = correct * 10   // match per-question anchor (1 correct = 10 RP)
    // Written-only exams have no MC denominator — avoid NaN.
    const pct = mcQuestions.length ? Math.round((correct / mcQuestions.length) * 100) : 0
    earnRP(rpEarned)
    checkAndEvolve(rp + rpEarned)
    markStudied()

    // Log exam activity
    logActivity(uid, 'exam_complete', `Completed ${exam.name} exam (${pct}%)`, {
      exam: exam.name, correct, total: mcQuestions.length, pct, rpEarned,
    })

    // Persist wrong MC answers for "Practice Mistakes" mode
    const wrongQs = mcQuestions.filter((q) => {
      const idx = questions.indexOf(q)
      return answers[idx] !== (q.correct ?? q.correctIndex)
    })
    appendMistakes(wrongQs, exam.subject)

    navigation.replace('ExamResults', {
      exam, questions, answers: { ...answers }, writtenAnswers: { ...writtenAnswers },
      writtenScores: { ...writtenScores },
      correct, total: mcQuestions.length, rpEarned,
    })
  }

  // A question counts as answered if it has an MC selection or non-empty text.
  const isAnswered = (i) => answers[i] !== undefined || !!writtenAnswers[i]?.trim()

  // Navigate to a question (dismiss the keyboard first so written input doesn't
  // leave the keyboard up over the next question).
  function goTo(i) {
    Keyboard.dismiss()
    setPhase('test')
    setCurrentIdx(Math.max(0, Math.min(questions.length - 1, i)))
  }

  function confirmSubmit() {
    const unanswered = questions.filter((_, i) => !isAnswered(i)).length
    if (unanswered > 0) {
      Alert.alert('Submit Exam?', `You have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}.`, [
        { text: 'Keep reviewing', style: 'cancel' },
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

  const answeredCount = questions.filter((_, i) => isAnswered(i)).length

  return (
    <KeyboardAvoidingView style={s.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Top bar */}
      <View style={[s.topBar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => Alert.alert('Exit?', 'Progress will be lost.', [
          { text: 'Stay', style: 'cancel' },
          { text: 'Exit', style: 'destructive', onPress: () => navigation.goBack() },
        ])}>
          <Text style={s.exitBtn}>✕</Text>
        </TouchableOpacity>
        <Text style={[s.timer, { color: timerColor }]} accessibilityLabel={`Time remaining ${mins} minutes ${secs} seconds`}>{mins}:{secs}</Text>
        {phase === 'test' ? (
          <TouchableOpacity style={s.submitBtn} onPress={() => { Keyboard.dismiss(); setPhase('review') }}>
            <Text style={s.submitBtnText}>Review</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 64 }} />
        )}
      </View>

      {phase === 'review' ? (
        <ReviewPanel
          s={s} C={C} questions={questions} flagged={flagged}
          isAnswered={isAnswered} answeredCount={answeredCount}
          onJump={goTo} onBack={() => setPhase('test')} onSubmit={confirmSubmit}
          insets={insets}
        />
      ) : (
      <>
      {/* Progress dots */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.dotsScroll} contentContainerStyle={s.dotsContainer}>
        {questions.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => { Keyboard.dismiss(); setCurrentIdx(i) }}
            accessibilityLabel={`Question ${i + 1}${isAnswered(i) ? ', answered' : ''}${flagged.has(i) ? ', flagged' : ''}`}
          >
            <View style={[
              s.dot,
              i === currentIdx && s.dotCurrent,
              isAnswered(i) && s.dotAnswered,
              flagged.has(i) && s.dotFlagged,
            ]} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={s.scroll}>
        {/* Question header */}
        <View style={s.qHeader}>
          <Text style={s.qNum}>Question {currentIdx + 1} of {questions.length}</Text>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={flagged.has(currentIdx) ? 'Unflag this question' : 'Flag this question for review'}
            onPress={() => {
              hapticTick()
              setFlagged((prev) => {
                const next = new Set(prev)
                next.has(currentIdx) ? next.delete(currentIdx) : next.add(currentIdx)
                return next
              })
            }}
          >
            <Text style={[s.flagBtn, flagged.has(currentIdx) && { color: C.warn }]}>
              {flagged.has(currentIdx) ? '🚩' : '⚑'} Flag
            </Text>
          </TouchableOpacity>
        </View>

        {/* Context */}
        {q.context && <Text style={s.context}>{q.context}</Text>}

        {/* Image — hidden if URL fails to load */}
        {q.image && <ExamImage path={q.image} style={s.image} />}

        {/* Question text */}
        <Text style={s.questionText}>{q.text}</Text>

        {/* Multiple-choice questions */}
        {q.type !== 'written' && q.choices?.map((choice, idx) => (
          <Animated.View key={idx} style={{ transform: [{ scale: choiceScales[idx] }] }}>
            <TouchableOpacity
              style={[s.choice, answers[currentIdx] === idx && s.choiceSelected]}
              onPress={() => {
                hapticTick()
                animateChoice(idx)
                setAnswers((a) => ({ ...a, [currentIdx]: idx }))
              }}
            >
              <Text style={s.choiceLetter}>{['A','B','C','D'][idx]}</Text>
              <Text style={s.choiceText}>{choice}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Written / constructed-response questions */}
        {q.type === 'written' && (
          <View>
            <View style={s.writtenHeader}>
              <Text style={[s.writtenLabel, { color: C.brand }]}>
                Part {q.part} · {q.maxPoints ?? 1} {(q.maxPoints ?? 1) === 1 ? 'point' : 'points'}
              </Text>
              <Text style={[s.writtenHint, { color: C.textMuted }]}>Write your answer below</Text>
            </View>
            <TextInput
              style={[s.writtenInput, { color: C.text, borderColor: writtenAnswers[currentIdx] ? C.brand : C.border, backgroundColor: C.surface }]}
              multiline
              placeholder="Type your answer here..."
              placeholderTextColor={C.textDim}
              value={writtenAnswers[currentIdx] ?? ''}
              onChangeText={(t) => setWrittenAnswers((w) => ({ ...w, [currentIdx]: t }))}
              textAlignVertical="top"
            />
            {q.modelAnswer && (
              <>
                <TouchableOpacity
                  style={[s.modelAnswerBtn, { borderColor: C.border }]}
                  onPress={() => setRevealedModels((prev) => {
                    const next = new Set(prev)
                    next.has(currentIdx) ? next.delete(currentIdx) : next.add(currentIdx)
                    return next
                  })}
                >
                  <Text style={[s.modelAnswerBtnText, { color: C.textMuted }]}>
                    💡 {revealedModels.has(currentIdx) ? 'Hide' : 'Show'} model answer (after you've tried)
                  </Text>
                </TouchableOpacity>
                {revealedModels.has(currentIdx) && (
                  <View style={[s.modelAnswerCard, { backgroundColor: C.surface, borderColor: C.brand + '55' }]}>
                    <Text style={[s.modelAnswerCardLabel, { color: C.brand }]}>MODEL ANSWER</Text>
                    <Text style={[s.modelAnswerCardText, { color: C.text }]}>{q.modelAnswer}</Text>
                  </View>
                )}
                {/* AI grading (Premium) — keyed per question so state resets on navigation */}
                <AiGradeButton
                  key={currentIdx}
                  question={q}
                  studentAnswer={writtenAnswers[currentIdx]}
                  subject={subject}
                  isSubscribed={isSubscribed}
                  isConfigured={isConfigured}
                  onUpgrade={presentPaywall}
                  onGraded={(res) => setWrittenScores((prev) => ({
                    ...prev,
                    [currentIdx]: { score: res.score, maxPoints: res.maxPoints },
                  }))}
                  C={C}
                />
              </>
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom nav */}
      <View style={[s.bottomNav, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity
          style={[s.navBtn, { opacity: currentIdx === 0 ? 0.3 : 1 }]}
          onPress={() => { Keyboard.dismiss(); setCurrentIdx((i) => Math.max(0, i - 1)) }}
          disabled={currentIdx === 0}
        >
          <Text style={s.navBtnText}>← Prev</Text>
        </TouchableOpacity>
        <Text style={s.answeredCount}>{answeredCount}/{questions.length}</Text>
        <TouchableOpacity
          style={[s.navBtn, { opacity: currentIdx === questions.length - 1 ? 0.3 : 1 }]}
          onPress={() => { Keyboard.dismiss(); setCurrentIdx((i) => Math.min(questions.length - 1, i + 1)) }}
          disabled={currentIdx === questions.length - 1}
        >
          <Text style={s.navBtnText}>Next →</Text>
        </TouchableOpacity>
      </View>
      </>
      )}
    </KeyboardAvoidingView>
  )
}

// ── Review panel — shown before final submit ─────────────────────────────────
function ReviewPanel({ s, C, questions, flagged, isAnswered, answeredCount, onJump, onBack, onSubmit, insets }) {
  const unanswered = questions.map((_, i) => i).filter((i) => !isAnswered(i))
  const flaggedList = [...flagged].sort((a, b) => a - b)
  const Row = ({ i }) => (
    <TouchableOpacity style={s.reviewRow} onPress={() => onJump(i)}>
      <Text style={s.reviewRowNum}>Q{i + 1}</Text>
      <Text style={s.reviewRowText} numberOfLines={1}>{questions[i]?.text ?? ''}</Text>
      <Text style={s.reviewRowChevron}>›</Text>
    </TouchableOpacity>
  )
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.reviewTitle}>Review before submitting</Text>
        <Text style={s.reviewSummary}>
          {answeredCount} of {questions.length} answered · {unanswered.length} left · {flaggedList.length} flagged
        </Text>

        {unanswered.length > 0 && (
          <View style={s.reviewSection}>
            <Text style={[s.reviewSectionTitle, { color: C.wrong }]}>Unanswered ({unanswered.length})</Text>
            {unanswered.map((i) => <Row key={i} i={i} />)}
          </View>
        )}

        {flaggedList.length > 0 && (
          <View style={s.reviewSection}>
            <Text style={[s.reviewSectionTitle, { color: C.warn }]}>🚩 Flagged ({flaggedList.length})</Text>
            {flaggedList.map((i) => <Row key={i} i={i} />)}
          </View>
        )}

        {unanswered.length === 0 && flaggedList.length === 0 && (
          <Text style={s.reviewAllClear}>✅ Every question answered, nothing flagged. You're ready to submit.</Text>
        )}
      </ScrollView>

      <View style={[s.bottomNav, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity style={s.navBtn} onPress={onBack}>
          <Text style={s.navBtnText}>← Back to test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.submitBtn} onPress={onSubmit}>
          <Text style={s.submitBtnText}>Submit exam</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:         { flex: 1, backgroundColor: C.bg },
    topBar:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 12 },
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
    bottomNav:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border },
    navBtn:       { backgroundColor: C.surface, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, borderWidth: 1, borderColor: C.border },
    navBtnText:       { color: C.text, fontWeight: '700', fontSize: 14 },
    answeredCount:    { fontSize: 13, color: C.textMuted },
    writtenHeader:    { gap: 2, marginBottom: 8 },
    writtenLabel:     { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
    writtenHint:      { fontSize: 12 },
    writtenInput:     { borderWidth: 1.5, borderRadius: 14, padding: 14, minHeight: 120, fontSize: 15, lineHeight: 22 },

    modelAnswerBtn:   { marginTop: 10, borderWidth: 1, borderRadius: 10, padding: 12, alignItems: 'center' },
    modelAnswerBtnText: { fontSize: 13, fontWeight: '600' },
    modelAnswerCard:  { marginTop: 10, borderWidth: 1.5, borderRadius: 12, padding: 14, borderLeftWidth: 4 },
    modelAnswerCardLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
    modelAnswerCardText:  { fontSize: 14, lineHeight: 21 },

    // Review panel
    reviewTitle:        { fontSize: 20, fontWeight: '900', color: C.text },
    reviewSummary:      { fontSize: 13, color: C.textMuted, marginTop: 2 },
    reviewSection:      { marginTop: 18, gap: 8 },
    reviewSectionTitle: { fontSize: 13, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
    reviewRow:          { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: C.border },
    reviewRowNum:       { fontSize: 13, fontWeight: '800', color: C.textMuted, width: 36 },
    reviewRowText:      { flex: 1, fontSize: 14, color: C.text },
    reviewRowChevron:   { fontSize: 20, color: C.textMuted },
    reviewAllClear:     { fontSize: 15, color: C.text, marginTop: 24, textAlign: 'center', lineHeight: 22 },
  })
}
