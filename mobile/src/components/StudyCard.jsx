import { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'

const LABELS = ['A', 'B', 'C', 'D']

export default function StudyCard({ question, onGotIt, onStudyMore }) {
  const { C } = useTheme()
  const [revealed, setRevealed] = useState(false)

  const slideAnim = useRef(new Animated.Value(40)).current
  const fadeAnim  = useRef(new Animated.Value(0)).current
  const revealAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 65, friction: 9 }),
      Animated.timing(fadeAnim,  { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start()
  }, [])

  function reveal() {
    setRevealed(true)
    Animated.timing(revealAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start()
  }

  const s = makeStyles(C)

  return (
    <Animated.View style={[s.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={s.topicTag}>
        <Text style={s.topicTagText}>{question.topic}</Text>
      </View>

      <Text style={s.questionText}>{question.text}</Text>

      {!revealed ? (
        <View style={s.choices}>
          {question.choices.map((text, i) => (
            <View key={i} style={s.choiceRow}>
              <View style={s.choiceLabel}>
                <Text style={s.labelText}>{LABELS[i]}</Text>
              </View>
              <Text style={s.choiceText}>{text}</Text>
            </View>
          ))}
          <TouchableOpacity style={s.revealBtn} onPress={reveal} activeOpacity={0.8}>
            <Text style={s.revealBtnText}>Reveal Answer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Animated.View style={{ opacity: revealAnim }}>
          <View style={s.answerBlock}>
            <Text style={s.answerLabel}>Correct Answer</Text>
            <View style={s.answerRow}>
              <View style={s.answerBadge}>
                <Text style={s.answerBadgeText}>{LABELS[question.correct]}</Text>
              </View>
              <Text style={s.answerText}>{question.choices[question.correct]}</Text>
            </View>
          </View>

          <View style={s.explanationBlock}>
            <Text style={s.explanationText}>{question.explanation}</Text>
          </View>

          <View style={s.selfAssess}>
            <TouchableOpacity style={s.studyMoreBtn} onPress={onStudyMore} activeOpacity={0.8}>
              <Text style={s.studyMoreText}>✗  Still Learning</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.gotItBtn} onPress={onGotIt} activeOpacity={0.8}>
              <Text style={s.gotItText}>✓  Got It!</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  )
}

function makeStyles(C) { return StyleSheet.create({
  card: {
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: C.surface2,
  },
  topicTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(34,197,94,0.12)',
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 12,
  },
  topicTagText: { fontSize: 12, fontWeight: '600', color: C.brandLight },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    color: C.text,
    lineHeight: 24,
    marginBottom: 18,
  },
  choices: { gap: 8 },
  choiceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: C.surface2,
    borderRadius: 10,
    padding: 12,
  },
  choiceLabel: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: C.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: { fontSize: 11, fontWeight: '700', color: C.textMuted },
  choiceText: { fontSize: 14, color: C.textMuted, flex: 1, lineHeight: 20 },
  revealBtn: {
    marginTop: 8,
    backgroundColor: C.brand,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  revealBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  answerBlock: {
    backgroundColor: 'rgba(34,197,94,0.12)',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: C.correct,
    marginBottom: 12,
  },
  answerLabel: { fontSize: 11, fontWeight: '700', color: C.brandLight, marginBottom: 8, letterSpacing: 0.5 },
  answerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  answerBadge: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: C.correct,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerBadgeText: { fontSize: 13, fontWeight: '800', color: '#fff' },
  answerText: { fontSize: 15, fontWeight: '600', color: C.text, flex: 1 },
  explanationBlock: {
    backgroundColor: C.surface2,
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  explanationText: { fontSize: 13, color: C.textMuted, lineHeight: 20 },
  selfAssess: { flexDirection: 'row', gap: 10 },
  studyMoreBtn: {
    flex: 1,
    backgroundColor: 'rgba(239,68,68,0.15)',
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.wrong,
  },
  studyMoreText: { color: C.wrong, fontSize: 14, fontWeight: '700' },
  gotItBtn: {
    flex: 1,
    backgroundColor: 'rgba(34,197,94,0.15)',
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.correct,
  },
  gotItText: { color: C.correct, fontSize: 14, fontWeight: '700' },
}) }
