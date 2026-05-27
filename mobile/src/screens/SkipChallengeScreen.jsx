import React, { useRef, useEffect, useState } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView,
  Animated, StyleSheet, Alert,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { T, duoBtn, cardShadow } from '../styles/duo'

const MAX_MISTAKES = 3
const LETTERS = ['A', 'B', 'C', 'D']
const LETTER_COLORS = ['#1CB0F6', '#CE82FF', '#FF9600', '#FF4B4B']

export default function SkipChallengeScreen({ route, navigation }) {
  const { topic, prereqTopic, questions, onUnlockKey, subject } = route.params
  const { C } = useTheme()
  const insets = useSafeAreaInsets()

  const [index,       setIndex]       = useState(0)
  const [selected,    setSelected]    = useState(null)
  const [phase,       setPhase]       = useState('answering') // answering | feedback | done | failed
  const [mistakes,    setMistakes]    = useState(0)
  const [correct,     setCorrect]     = useState(0)

  const slideAnim   = useRef(new Animated.Value(300)).current
  const shakeAnim   = useRef(new Animated.Value(0)).current
  const failTimerRef = useRef(null)

  useEffect(() => () => clearTimeout(failTimerRef.current), [])

  const total           = questions.length
  const currentQuestion = questions[index]
  const correctIdx      = currentQuestion?.correct ?? currentQuestion?.correctIndex
  const isAnswerCorrect = selected !== null && selected === correctIdx
  const correctText     = currentQuestion?.choices?.[correctIdx] ?? ''
  const mistakesLeft    = MAX_MISTAKES - mistakes

  // ── Slide-up panel ──────────────────────────────────────────────────────
  useEffect(() => {
    if (phase === 'feedback') {
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 100, friction: 10 }).start()
    } else {
      slideAnim.setValue(300)
    }
  }, [phase])

  // ── Heart shake on wrong ─────────────────────────────────────────────────
  function shakeHearts() {
    shakeAnim.setValue(0)
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start()
  }

  function answer(choiceIdx) {
    if (phase !== 'answering') return
    setSelected(choiceIdx)
    const isCorrect = choiceIdx === correctIdx
    if (isCorrect) {
      setCorrect((c) => c + 1)
    } else {
      const newMistakes = mistakes + 1
      setMistakes(newMistakes)
      shakeHearts()
      if (newMistakes >= MAX_MISTAKES) {
        // Short delay so student sees which answer was wrong, then fail
        failTimerRef.current = setTimeout(() => setPhase('failed'), 1200)
      }
    }
    setPhase('feedback')
  }

  function next() {
    if (mistakes >= MAX_MISTAKES) { setPhase('failed'); return }
    if (index + 1 >= total) {
      setPhase('done')
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setPhase('answering')
  }

  function choiceStyle(idx) {
    if (phase === 'answering') return [s.choice, selected === idx && s.choiceSelected]
    if (idx === correctIdx)                   return [s.choice, s.choiceCorrect]
    if (idx === selected && idx !== correctIdx) return [s.choice, s.choiceWrong]
    return [s.choice, s.choiceDim]
  }

  const s = makeStyles(C, insets)

  // ── FAILED screen ────────────────────────────────────────────────────────
  if (phase === 'failed') {
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.resultContainer}>
          <Text style={{ fontSize: 72 }}>💔</Text>
          <Text style={[T.h1, { color: C.wrong, marginTop: 16, textAlign: 'center' }]}>
            Challenge Failed
          </Text>
          <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 8, lineHeight: 22 }]}>
            You made {MAX_MISTAKES} mistakes.{'\n'}
            Practice <Text style={{ color: C.text }}>{prereqTopic}</Text> more to get ready.
          </Text>
          <View style={[s.statRow, { marginTop: 24 }]}>
            <View style={s.statBox}>
              <Text style={[T.num, { color: C.correct, fontSize: 30 }]}>{correct}</Text>
              <Text style={[T.small, { color: C.textMuted }]}>Correct</Text>
            </View>
            <View style={s.statBox}>
              <Text style={[T.num, { color: C.wrong, fontSize: 30 }]}>{mistakes}</Text>
              <Text style={[T.small, { color: C.textMuted }]}>Mistakes</Text>
            </View>
            <View style={s.statBox}>
              <Text style={[T.num, { color: C.warn, fontSize: 30 }]}>{index + 1}/{total}</Text>
              <Text style={[T.small, { color: C.textMuted }]}>Done</Text>
            </View>
          </View>
          <View style={{ width: '100%', marginTop: 32, gap: 12 }}>
            <TouchableOpacity
              style={duoBtn(C.brand, C.brandDark)}
              onPress={() => {
                // Retry with fresh shuffle
                navigation.replace('SkipChallenge', route.params)
              }}
            >
              <Text style={[T.btn, { color: '#fff' }]}>TRY AGAIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={duoBtn(C.surface2, C.border)}
              onPress={() => navigation.goBack()}
            >
              <Text style={[T.btn, { color: C.textMuted }]}>BACK TO STUDY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  // Save unlock once when phase transitions to 'done'
  useEffect(() => {
    if (phase !== 'done') return
    const AsyncStorage = require('@react-native-async-storage/async-storage').default
    const key = `@skipUnlocks_${subject}`
    AsyncStorage.getItem(key).then((val) => {
      const arr = val ? JSON.parse(val) : []
      if (!arr.includes(topic)) {
        arr.push(topic)
        AsyncStorage.setItem(key, JSON.stringify(arr))
      }
    }).catch(() => {})
  }, [phase])

  // ── PASSED screen ────────────────────────────────────────────────────────
  if (phase === 'done') {

    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.resultContainer}>
          <Text style={{ fontSize: 72 }}>🏆</Text>
          <Text style={[T.h1, { color: C.brand, marginTop: 16, textAlign: 'center' }]}>
            Topic Unlocked!
          </Text>
          <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 8, lineHeight: 22 }]}>
            You skipped ahead to{'\n'}
            <Text style={[T.h3, { color: C.text }]}>{topic}</Text>
          </Text>
          <View style={[s.statRow, { marginTop: 24 }]}>
            <View style={s.statBox}>
              <Text style={[T.num, { color: C.correct, fontSize: 30 }]}>{correct}</Text>
              <Text style={[T.small, { color: C.textMuted }]}>Correct</Text>
            </View>
            <View style={s.statBox}>
              <Text style={[T.num, { color: C.wrong, fontSize: 30 }]}>{mistakes}</Text>
              <Text style={[T.small, { color: C.textMuted }]}>Mistakes</Text>
            </View>
            <View style={s.statBox}>
              <Text style={[T.num, { color: C.warn, fontSize: 30 }]}>{MAX_MISTAKES - mistakes}</Text>
              <Text style={[T.small, { color: C.textMuted }]}>Lives left</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[duoBtn(C.brand, C.brandDark), { width: '100%', marginTop: 32 }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={[T.btn, { color: '#fff' }]}>START {topic.toUpperCase()} →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  // ── QUIZ ─────────────────────────────────────────────────────────────────
  return (
    <View style={s.root}>
      <SafeAreaView style={s.safe} edges={['top']}>

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => {
            Alert.alert('Quit Challenge?', 'Your progress will be lost.', [
              { text: 'Keep Going', style: 'cancel' },
              { text: 'Quit', style: 'destructive', onPress: () => navigation.goBack() },
            ])
          }} style={s.closeBtn}>
            <Text style={s.closeBtnText}>✕</Text>
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={[T.label, { color: C.textMuted }]}>SKIP CHALLENGE</Text>
            <Text style={[T.small, { color: C.text, marginTop: 1 }]} numberOfLines={1}>{topic}</Text>
          </View>

          {/* Hearts */}
          <Animated.View style={[s.hearts, { transform: [{ translateX: shakeAnim }] }]}>
            {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
              <Text key={i} style={{ fontSize: 20 }}>
                {i < mistakesLeft ? '❤️' : '🖤'}
              </Text>
            ))}
          </Animated.View>
        </View>

        {/* Progress bar */}
        <View style={s.progressBg}>
          <View style={[s.progressFill, { width: `${(index / total) * 100}%` }]} />
        </View>

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          <Text style={[T.label, { color: C.textMuted, textAlign: 'center', marginBottom: 10 }]}>
            {index + 1} of {total} · {mistakesLeft} mistake{mistakesLeft !== 1 ? 's' : ''} left
          </Text>

          {/* Question card */}
          <View style={[s.questionCard, cardShadow(C.shadow)]}>
            {currentQuestion?.context ? (
              <Text style={[T.small, { color: C.textMuted, marginBottom: 8, fontStyle: 'italic' }]}>
                {currentQuestion.context}
              </Text>
            ) : null}
            <Text style={[T.h3, { color: C.text, lineHeight: 26 }]}>{currentQuestion?.text}</Text>
          </View>

          {/* Choices */}
          <View style={s.choices}>
            {currentQuestion?.choices?.map((choice, idx) => (
              <TouchableOpacity
                key={idx}
                style={choiceStyle(idx)}
                onPress={() => answer(idx)}
                activeOpacity={0.75}
                disabled={phase !== 'answering'}
              >
                <View style={[s.letterBadge, { backgroundColor: LETTER_COLORS[idx] }]}>
                  <Text style={s.letterText}>{LETTERS[idx]}</Text>
                </View>
                <Text style={[T.body, { flex: 1, color: C.text }]}>{choice}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 200 }} />
        </ScrollView>
      </SafeAreaView>

      {/* Slide-up feedback panel */}
      {phase === 'feedback' && (
        <Animated.View
          style={[
            s.feedbackPanel,
            {
              backgroundColor: isAnswerCorrect ? C.correctBg : C.wrongBg,
              borderTopColor:  isAnswerCorrect ? C.brand     : C.wrong,
              transform: [{ translateY: slideAnim }],
              paddingBottom: insets.bottom + 16,
            },
          ]}
        >
          <Text style={[T.h2, { color: isAnswerCorrect ? C.correct : C.wrong, marginBottom: 4 }]}>
            {isAnswerCorrect ? '🎉 Correct!' : `❌ Incorrect — ${mistakesLeft > 0 ? `${mistakesLeft} left` : 'No lives!'}`}
          </Text>
          {!isAnswerCorrect && correctText ? (
            <Text style={[T.body, { color: C.wrong, marginBottom: 12 }]}>
              Correct answer: {correctText}
            </Text>
          ) : <View style={{ height: 12 }} />}
          {currentQuestion?.explanation ? (
            <Text style={[T.small, { color: C.textMuted, marginBottom: 16, lineHeight: 20 }]}>
              {currentQuestion.explanation}
            </Text>
          ) : <View style={{ height: 8 }} />}

          {mistakes < MAX_MISTAKES ? (
            <TouchableOpacity
              style={duoBtn(isAnswerCorrect ? C.brand : C.wrong, isAnswerCorrect ? C.brandDark : C.wrongDark)}
              onPress={next}
            >
              <Text style={[T.btn, { color: '#fff' }]}>
                {index + 1 === total ? 'FINISH' : 'CONTINUE'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={duoBtn(C.wrong, C.wrongDark)}
              onPress={() => setPhase('failed')}
            >
              <Text style={[T.btn, { color: '#fff' }]}>SEE RESULTS</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
    </View>
  )
}

function makeStyles(C, insets) {
  return StyleSheet.create({
    root:          { flex: 1, backgroundColor: C.bg },
    safe:          { flex: 1 },
    header:        { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, gap: 10 },
    closeBtn:      { width: 34, height: 34, borderRadius: 17, backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center' },
    closeBtnText:  { fontFamily: 'Nunito_700Bold', fontSize: 14, color: C.textMuted },
    hearts:        { flexDirection: 'row', gap: 2 },
    progressBg:    { height: 8, backgroundColor: C.surface2, marginHorizontal: 16, borderRadius: 4, marginBottom: 10 },
    progressFill:  { height: 8, backgroundColor: C.warn, borderRadius: 4 },
    scroll:        { padding: 16 },
    questionCard:  { backgroundColor: C.surface, borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: C.border },
    choices:       { gap: 10 },
    choice: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface,
      borderRadius: 16, padding: 14, gap: 12, borderWidth: 2.5, borderColor: C.border,
    },
    choiceSelected: { borderColor: C.brand, backgroundColor: C.brandBg },
    choiceCorrect:  { borderColor: C.correct, backgroundColor: C.correctBg },
    choiceWrong:    { borderColor: C.wrong,   backgroundColor: C.wrongBg },
    choiceDim:      { opacity: 0.35 },
    letterBadge:    { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    letterText:     { fontFamily: 'Nunito_900Black', fontSize: 14, color: '#fff' },
    feedbackPanel: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      borderTopLeftRadius: 24, borderTopRightRadius: 24,
      borderTopWidth: 3, padding: 20,
    },
    resultContainer: {
      flex: 1, alignItems: 'center', justifyContent: 'center',
      padding: 32,
    },
    statRow: { flexDirection: 'row', gap: 16 },
    statBox: { flex: 1, alignItems: 'center', backgroundColor: C.surface, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: C.border },
  })
}
