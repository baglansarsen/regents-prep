import { useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { C } from '../theme'
import PunnettSquare from './diagrams/PunnettSquare'
import FoodWeb from './diagrams/FoodWeb'

const LABELS = ['A', 'B', 'C', 'D']

export default function QuestionCard({ question, selected, phase, onAnswer }) {
  const slideAnim = useRef(new Animated.Value(40)).current
  const fadeAnim  = useRef(new Animated.Value(0)).current

  useEffect(() => {
    slideAnim.setValue(40)
    fadeAnim.setValue(0)
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 65, friction: 9 }),
      Animated.timing(fadeAnim,  { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start()
  }, [question.id])

  function choiceStyle(i) {
    if (phase === 'answering') return [s.choice]
    if (i === question.correct) return [s.choice, s.choiceCorrect]
    if (selected !== 'timeout' && i === selected) return [s.choice, s.choiceWrong]
    return [s.choice, s.choiceDim]
  }

  function labelStyle(i) {
    if (phase !== 'answering') {
      if (i === question.correct) return [s.choiceLabel, s.labelCorrect]
      if (selected !== 'timeout' && i === selected) return [s.choiceLabel, s.labelWrong]
    }
    return [s.choiceLabel]
  }

  const isCorrect = selected === question.correct
  const timedOut  = selected === 'timeout'

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <View style={s.card}>
        <View style={s.topicTag}>
          <Text style={s.topicTagText}>{question.topic}</Text>
        </View>

        <Text style={s.questionText}>{question.text}</Text>

        {question.diagram?.type === 'punnett' && (
          <PunnettSquare alleles={question.diagram.alleles} title={question.diagram.title} />
        )}
        {question.diagram?.type === 'foodweb' && (
          <FoodWeb />
        )}

        <View style={s.choices}>
          {question.choices.map((text, i) => (
            <TouchableOpacity
              key={i}
              style={choiceStyle(i)}
              onPress={() => onAnswer(i)}
              disabled={phase !== 'answering'}
              activeOpacity={0.7}
            >
              <View style={labelStyle(i)}>
                <Text style={s.labelText}>{LABELS[i]}</Text>
              </View>
              <Text style={[s.choiceText, phase !== 'answering' && s.choiceTextDim]}>
                {text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {phase === 'feedback' && (
          <View style={[s.feedbackBanner, isCorrect ? s.feedbackCorrect : s.feedbackWrong]}>
            <Text style={[s.feedbackTitle, isCorrect ? s.feedbackTitleCorrect : s.feedbackTitleWrong]}>
              {timedOut ? '⏰ Time\'s up!' : isCorrect ? '✓ Correct!' : '✗ Not quite.'}
            </Text>
            <Text style={s.feedbackExplanation}>{question.explanation}</Text>
          </View>
        )}
      </View>
    </Animated.View>
  )
}

const s = StyleSheet.create({
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
  choices: { gap: 10 },
  choice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: C.surface2,
    borderRadius: 10,
    padding: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  choiceCorrect: {
    borderColor: C.correct,
    backgroundColor: 'rgba(34,197,94,0.15)',
  },
  choiceWrong: {
    borderColor: C.wrong,
    backgroundColor: 'rgba(239,68,68,0.15)',
  },
  choiceDim: { opacity: 0.45 },
  choiceLabel: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: C.surface,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  labelCorrect: { backgroundColor: C.correct },
  labelWrong:   { backgroundColor: C.wrong },
  labelText: { fontSize: 12, fontWeight: '700', color: C.textMuted },
  choiceText: { fontSize: 15, color: C.text, flex: 1, lineHeight: 22, paddingTop: 2 },
  choiceTextDim: { color: C.textMuted },
  feedbackBanner: {
    marginTop: 16,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    gap: 4,
  },
  feedbackCorrect: {
    backgroundColor: 'rgba(34,197,94,0.12)',
    borderColor: C.correct,
  },
  feedbackWrong: {
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderColor: C.wrong,
  },
  feedbackTitle: { fontSize: 14, fontWeight: '700' },
  feedbackTitleCorrect: { color: C.correct },
  feedbackTitleWrong:   { color: C.wrong },
  feedbackExplanation: { fontSize: 13, color: C.textMuted, lineHeight: 20 },
})
