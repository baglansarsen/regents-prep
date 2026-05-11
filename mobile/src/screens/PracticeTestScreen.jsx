import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { usePracticeTest } from '../hooks/usePracticeTest'
import { C } from '../theme'

const LABELS = ['A', 'B', 'C', 'D']

export default function PracticeTestScreen({ questionSet, onDone, onHome }) {
  const {
    current, index, total, answers, phase,
    elapsedStr, answer, next, goTo,
    correct, score, grade, questions,
  } = usePracticeTest(questionSet)

  if (phase === 'review') {
    return <ReviewScreen
      questions={questions} answers={answers}
      correct={correct} total={total} score={score}
      grade={grade} onDone={onDone} onHome={onHome}
    />
  }

  const chosen = answers[current.id]

  return (
    <View style={s.screen}>
      {/* Top bar */}
      <View style={s.topbar}>
        <TouchableOpacity onPress={onHome} activeOpacity={0.7}>
          <Text style={s.backText}>✕ Exit</Text>
        </TouchableOpacity>
        <Text style={s.examLabel}>PRACTICE TEST</Text>
        <Text style={s.timer}>⏱ {elapsedStr}</Text>
      </View>

      {/* Question navigator dots */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.dotScroll} contentContainerStyle={s.dotRow}>
        {questions.map((q, i) => {
          const picked = answers[q.id] !== undefined
          const isCurrent = i === index
          return (
            <TouchableOpacity key={q.id} onPress={() => goTo(i)} style={[
              s.dot,
              picked && s.dotAnswered,
              isCurrent && s.dotCurrent,
            ]}>
              <Text style={[s.dotText, isCurrent && s.dotTextCurrent]}>{i + 1}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>

      {/* Question */}
      <ScrollView style={s.scroll} contentContainerStyle={s.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={s.qNumber}>Question {index + 1} of {total}</Text>
        <Text style={s.qText}>{current.text}</Text>

        <View style={s.choices}>
          {current.choices.map((text, i) => (
            <TouchableOpacity
              key={i}
              style={[s.choice, chosen === i && s.choiceSelected]}
              onPress={() => answer(i)}
              activeOpacity={0.75}
            >
              <View style={[s.choiceLabel, chosen === i && s.choiceLabelSelected]}>
                <Text style={[s.labelText, chosen === i && s.labelTextSelected]}>{LABELS[i]}</Text>
              </View>
              <Text style={s.choiceText}>{text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={[s.nextBtn, chosen === undefined && s.nextBtnDisabled]} onPress={next} activeOpacity={0.85}>
          <Text style={s.nextBtnText}>
            {index === total - 1 ? 'Submit Test' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

function ReviewScreen({ questions, answers, correct, total, score, grade, onDone, onHome }) {
  const gradeColor = score >= 85 ? C.correct : score >= 65 ? C.warn : C.wrong
  const gradeEmoji = score >= 85 ? '🏆' : score >= 65 ? '✅' : '📚'

  const byTopic = questions.reduce((acc, q) => {
    if (!acc[q.topic]) acc[q.topic] = { correct: 0, total: 0 }
    acc[q.topic].total++
    if (answers[q.id] === q.correct) acc[q.topic].correct++
    return acc
  }, {})

  return (
    <ScrollView style={s.scroll} contentContainerStyle={[s.scrollContent, { paddingTop: 32 }]} showsVerticalScrollIndicator={false}>
      <View style={s.heroCard}>
        <Text style={s.heroEmoji}>{gradeEmoji}</Text>
        <Text style={[s.heroGrade, { color: gradeColor }]}>{grade}</Text>
        <Text style={s.heroScore}>{score}</Text>
        <Text style={s.heroScoreLabel}>/ 100</Text>
        <Text style={s.heroFraction}>{correct} of {total} correct</Text>
        {score >= 65
          ? <Text style={s.heroPassing}>✓ Regents passing score is 65</Text>
          : <Text style={s.heroFailing}>Regents passing score is 65 — keep practicing!</Text>
        }
      </View>

      <Text style={s.sectionLabel}>QUESTION REVIEW</Text>
      {questions.map((q, i) => {
        const chosen = answers[q.id]
        const isCorrect = chosen === q.correct
        return (
          <View key={q.id} style={[s.reviewRow, isCorrect ? s.reviewCorrect : s.reviewWrong]}>
            <View style={s.reviewHeader}>
              <Text style={s.reviewNum}>{i + 1}</Text>
              <Text style={[s.reviewIcon]}>{isCorrect ? '✓' : '✗'}</Text>
            </View>
            <Text style={s.reviewQ} numberOfLines={2}>{q.text}</Text>
            {!isCorrect && (
              <Text style={s.reviewAnswer}>
                Correct: {LABELS[q.correct]}. {q.choices[q.correct]}
              </Text>
            )}
          </View>
        )
      })}

      <View style={s.actions}>
        <TouchableOpacity style={s.btnPrimary} onPress={onDone} activeOpacity={0.85}>
          <Text style={s.btnPrimaryText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btnSecondary} onPress={onHome} activeOpacity={0.85}>
          <Text style={s.btnSecondaryText}>Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  topbar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 10,
    borderBottomWidth: 1, borderBottomColor: C.surface2,
  },
  backText:  { fontSize: 13, color: C.wrong, fontWeight: '600' },
  examLabel: { fontSize: 12, fontWeight: '800', color: C.textMuted, letterSpacing: 1 },
  timer:     { fontSize: 13, color: C.textMuted },

  dotScroll: { maxHeight: 44, borderBottomWidth: 1, borderBottomColor: C.surface2 },
  dotRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, gap: 6 },
  dot: {
    width: 28, height: 28, borderRadius: 6,
    backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center',
  },
  dotAnswered: { backgroundColor: C.brand + '55' },
  dotCurrent:  { backgroundColor: C.brand },
  dotText:     { fontSize: 11, fontWeight: '600', color: C.textMuted },
  dotTextCurrent: { color: '#fff' },

  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  qNumber: { fontSize: 12, fontWeight: '700', color: C.textMuted, marginBottom: 10, letterSpacing: 0.5 },
  qText:   { fontSize: 16, fontWeight: '500', color: C.text, lineHeight: 24, marginBottom: 20 },

  choices: { gap: 10, marginBottom: 20 },
  choice: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: C.surface2, borderRadius: 10, padding: 14,
    borderWidth: 2, borderColor: 'transparent',
  },
  choiceSelected: { borderColor: C.brand, backgroundColor: C.brand + '20' },
  choiceLabel: {
    width: 26, height: 26, borderRadius: 6,
    backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center',
  },
  choiceLabelSelected: { backgroundColor: C.brand },
  labelText:         { fontSize: 12, fontWeight: '700', color: C.textMuted },
  labelTextSelected: { color: '#fff' },
  choiceText: { fontSize: 15, color: C.text, flex: 1, lineHeight: 22, paddingTop: 2 },

  nextBtn: {
    backgroundColor: C.brand, borderRadius: 12, padding: 16, alignItems: 'center',
  },
  nextBtnDisabled: { backgroundColor: C.surface2 },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  // Review
  heroCard: {
    backgroundColor: C.surface, borderRadius: 16, padding: 28,
    alignItems: 'center', borderWidth: 1, borderColor: C.surface2,
    gap: 4, marginBottom: 24,
  },
  heroEmoji:      { fontSize: 48, marginBottom: 4 },
  heroGrade:      { fontSize: 24, fontWeight: '800' },
  heroScore:      { fontSize: 56, fontWeight: '900', color: C.text },
  heroScoreLabel: { fontSize: 16, color: C.textMuted, marginTop: -8 },
  heroFraction:   { fontSize: 14, color: C.textMuted },
  heroPassing:    { fontSize: 13, color: C.correct, fontWeight: '600', marginTop: 4 },
  heroFailing:    { fontSize: 13, color: C.wrong, textAlign: 'center', marginTop: 4 },

  sectionLabel: { fontSize: 11, fontWeight: '700', color: C.textMuted, letterSpacing: 1, marginBottom: 10 },
  reviewRow: {
    borderRadius: 10, padding: 12, marginBottom: 8, gap: 4,
    borderWidth: 1,
  },
  reviewCorrect: { backgroundColor: 'rgba(34,197,94,0.08)', borderColor: C.correct + '60' },
  reviewWrong:   { backgroundColor: 'rgba(239,68,68,0.08)', borderColor: C.wrong + '60' },
  reviewHeader:  { flexDirection: 'row', gap: 8, alignItems: 'center' },
  reviewNum:     { fontSize: 11, color: C.textMuted, fontWeight: '700' },
  reviewIcon:    { fontSize: 14, fontWeight: '700' },
  reviewQ:       { fontSize: 13, color: C.textMuted, lineHeight: 18 },
  reviewAnswer:  { fontSize: 12, color: C.correct, fontWeight: '600', marginTop: 2 },

  actions: { flexDirection: 'row', gap: 10, marginTop: 20 },
  btnPrimary: { flex: 1, backgroundColor: C.brand, borderRadius: 12, padding: 16, alignItems: 'center' },
  btnPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  btnSecondary: { flex: 1, backgroundColor: C.surface2, borderRadius: 12, padding: 16, alignItems: 'center' },
  btnSecondaryText: { color: C.text, fontSize: 15, fontWeight: '700' },
})
