import { useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Animated, StyleSheet } from 'react-native'
import { useQuiz } from '../hooks/useQuiz'
import QuestionCard from '../components/QuestionCard'
import Timer from '../components/Timer'
import ScoreDisplay from '../components/ScoreDisplay'
import ProgressBar from '../components/ProgressBar'
import { C } from '../theme'

export default function QuizScreen({ questionSet, onDone, onHome }) {
  const {
    currentQuestion,
    index,
    total,
    score,
    streak,
    bestStreak,
    timeLeft,
    timerMax,
    selected,
    lastEarned,
    phase,
    results,
    answer,
    next,
    streakMultiplier,
  } = useQuiz(questionSet)

  // Score popup animation
  const popupY    = useRef(new Animated.Value(0)).current
  const popupFade = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (phase === 'feedback' && lastEarned > 0) {
      popupY.setValue(0)
      popupFade.setValue(1)
      Animated.parallel([
        Animated.timing(popupY,    { toValue: -48, duration: 900, useNativeDriver: true }),
        Animated.sequence([
          Animated.delay(400),
          Animated.timing(popupFade, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]),
      ]).start()
    }
  }, [phase, lastEarned])

  useEffect(() => {
    if (phase === 'done') {
      onDone({ score, bestStreak, results, total })
    }
  }, [phase, score, bestStreak, results, total, onDone])

  if (phase === 'done') return null

  return (
    <View style={s.screen}>
      <View style={s.topbar}>
        <TouchableOpacity onPress={onHome} style={s.homeBtn} activeOpacity={0.7}>
          <Text style={s.homeBtnText}>← Home</Text>
        </TouchableOpacity>

        <View style={s.scoreWrap}>
          <ScoreDisplay score={score} streak={streak} multiplier={streakMultiplier} />
          {lastEarned > 0 && (
            <Animated.Text
              style={[s.scorePopup, { opacity: popupFade, transform: [{ translateY: popupY }] }]}
            >
              +{lastEarned}
            </Animated.Text>
          )}
        </View>
      </View>

      <View style={s.meta}>
        <ProgressBar current={index + 1} total={total} topic={currentQuestion.topic} />
        <View style={s.timerRow}>
          <Timer timeLeft={timeLeft} max={timerMax} />
        </View>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          selected={selected}
          phase={phase}
          onAnswer={answer}
        />

        {phase === 'feedback' && (
          <TouchableOpacity style={s.nextBtn} onPress={next} activeOpacity={0.85}>
            <Text style={s.nextBtnText}>
              {index === total - 1 ? 'See Results →' : 'Next Question →'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  homeBtn:     { padding: 4 },
  homeBtnText: { fontSize: 14, color: C.textMuted },
  scoreWrap:   { position: 'relative' },
  scorePopup: {
    position: 'absolute',
    right: 0,
    top: -4,
    fontSize: 15,
    fontWeight: '800',
    color: C.brandLight,
  },
  meta:     { paddingHorizontal: 20, gap: 8, marginBottom: 4 },
  timerRow: { marginTop: 4 },
  scroll:   { flex: 1 },
  scrollContent: { padding: 20, paddingTop: 8, paddingBottom: 40, gap: 14 },
  nextBtn: {
    backgroundColor: C.brand,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
})
