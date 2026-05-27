/**
 * PlacementTestScreen
 *
 * Runs once per user on first login. Pulls 10 questions spread across all LE
 * topics (1–2 per topic, every topic guaranteed at least one). Topics the user
 * scores ≥ 80 % on are force-unlocked so they skip beginner content.
 *
 * UX: tap a choice → highlight correct/wrong for 1.2 s → auto-advance.
 * No lives, no timer, no XP — this is diagnostic only.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  Animated, Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { useUnlocks } from '../hooks/useUnlocks'
import * as leData from '../../../src/data/living-environment/index'
import { T, duoBtn, cardShadow } from '../styles/duo'

const { width: W } = Dimensions.get('window')
const LETTERS = ['A', 'B', 'C', 'D']
const LETTER_COLORS = ['#1CB0F6', '#CE82FF', '#FF9600', '#FF4B4B']
const TARGET       = 10        // target question count
const UNLOCK_PCT   = 80        // auto-unlock threshold

// ── Build the placement set ───────────────────────────────────────────────────
function buildPlacementSet(topicOrder, questions, target = TARGET) {
  function pick(topic, n) {
    const pool = questions.filter((q) => q.topic === topic)
    const arr  = [...pool].sort(() => Math.random() - 0.5)
    return arr.slice(0, n)
  }

  // 1. Guarantee exactly 1 question per topic (covers all topics)
  const guaranteed = topicOrder
    .map((t) => pick(t, 1)[0])
    .filter(Boolean)

  // 2. Fill remaining slots with a 2nd question from each topic (in random order)
  const extras = [...topicOrder]
    .sort(() => Math.random() - 0.5)
    .flatMap((t) => pick(t, 2).slice(1))   // 2nd question per topic

  const combined = [...guaranteed, ...extras]
  const used = new Set()
  const deduped = combined.filter((q) => {
    if (used.has(q.id)) return false
    used.add(q.id)
    return true
  })

  // Shuffle and cap at target
  return [...deduped].sort(() => Math.random() - 0.5).slice(0, target)
}

// ── Score helper ─────────────────────────────────────────────────────────────
function scoreByTopic(questionSet, answers) {
  const map = {}   // topic → { correct, total }
  questionSet.forEach((q, i) => {
    const t = q.topic
    if (!map[t]) map[t] = { correct: 0, total: 0 }
    map[t].total++
    const correctIdx = q.correct ?? q.correctIndex
    if (answers[i] === correctIdx) map[t].correct++
  })
  return map
}

// ── Small progress dots at the top ───────────────────────────────────────────
function ProgressDots({ total, current, C }) {
  return (
    <View style={{ flexDirection: 'row', gap: 5, alignSelf: 'center', marginVertical: 12 }}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={{
            width: i < current ? 20 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: i < current ? C.brand : C.surface2,
          }}
        />
      ))}
    </View>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function PlacementTestScreen({ onComplete }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { history, saveResult } = useProgress(uid)
  const { forceUnlock } = useUnlocks(history, leData.TOPIC_ORDER, 'living-environment')
  const s = makeStyles(C)

  const questionSet = useMemo(
    () => buildPlacementSet(leData.TOPIC_ORDER, leData.questions),
    []
  )
  const total = questionSet.length

  // ── Quiz state ────────────────────────────────────────────────────────────
  const [index,     setIndex]     = useState(0)
  const [selected,  setSelected]  = useState(null)   // chosen idx or null
  const [answers,   setAnswers]   = useState([])     // final answer per question
  const [phase,     setPhase]     = useState('quiz') // 'quiz' | 'results'

  const autoTimer = useRef(null)

  // ── Card slide animation ──────────────────────────────────────────────────
  const slideAnim = useRef(new Animated.Value(0)).current

  function slideIn() {
    slideAnim.setValue(W)
    Animated.spring(slideAnim, { toValue: 0, tension: 120, friction: 12, useNativeDriver: true }).start()
  }

  useEffect(() => { slideIn() }, [index])

  // ── Answer a question ─────────────────────────────────────────────────────
  function handleAnswer(idx) {
    if (selected !== null) return
    setSelected(idx)

    const correctIdx = questionSet[index].correct ?? questionSet[index].correctIndex
    const newAnswers = [...answers, idx]

    autoTimer.current = setTimeout(() => {
      const next = index + 1
      if (next >= total) {
        finishQuiz(newAnswers)
      } else {
        setAnswers(newAnswers)
        setSelected(null)
        setIndex(next)
      }
    }, 1300)
  }

  function finishQuiz(finalAnswers) {
    setAnswers(finalAnswers)
    setPhase('results')
  }

  useEffect(() => () => clearTimeout(autoTimer.current), [])

  // ── Skip entire test ──────────────────────────────────────────────────────
  async function handleSkip() {
    clearTimeout(autoTimer.current)
    await markDone()
    onComplete?.()
  }

  // ── Apply results and complete ────────────────────────────────────────────
  const [saving, setSaving] = useState(false)

  async function applyAndContinue() {
    setSaving(true)
    const topicScores = scoreByTopic(questionSet, answers)

    // Save one quiz history entry per topic so useProgress / useUnlocks sees it
    const saves = Object.entries(topicScores).map(([topic, { correct, total: t }]) => {
      const pct = Math.round((correct / t) * 100)
      return saveResult({ topic, score: correct * 10, total: t, correct, pct, subject: 'living-environment' })
    })
    await Promise.all(saves)

    // Force-unlock topics that scored ≥ UNLOCK_PCT
    const unlocks = Object.entries(topicScores)
      .filter(([, { correct, total: t }]) => Math.round((correct / t) * 100) >= UNLOCK_PCT)
      .map(([topic]) => forceUnlock(topic))
    await Promise.all(unlocks)

    await markDone()
    setSaving(false)
    onComplete?.()
  }

  async function markDone() {
    try {
      await AsyncStorage.setItem(`@placementDone_v1_${uid}`, '1')
    } catch {}
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: QUIZ
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const q          = questionSet[index]
    const correctIdx = q.correct ?? q.correctIndex

    function choiceBg(idx) {
      if (selected === null) return C.surface
      if (idx === correctIdx) return C.correctBg
      if (idx === selected && idx !== correctIdx) return C.wrongBg
      return C.surface
    }
    function choiceBorder(idx) {
      if (selected === null) return C.border
      if (idx === correctIdx) return C.correct
      if (idx === selected && idx !== correctIdx) return C.wrong
      return C.border + '40'
    }
    function letterBg(idx) {
      if (selected === null) return LETTER_COLORS[idx]
      if (idx === correctIdx) return C.correct
      if (idx === selected && idx !== correctIdx) return C.wrong
      return LETTER_COLORS[idx] + '60'
    }

    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>

        {/* ── Header ── */}
        <View style={s.header}>
          <View style={s.headerLeft}>
            <Text style={s.headerEmoji}>🎯</Text>
            <View>
              <Text style={[T.label, { color: C.textMuted }]}>Placement Test</Text>
              <Text style={[T.h3, { color: C.text }]}>{index + 1} of {total}</Text>
            </View>
          </View>
          <TouchableOpacity style={s.skipBtn} onPress={handleSkip}>
            <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>Skip test →</Text>
          </TouchableOpacity>
        </View>

        {/* Progress bar */}
        <View style={s.progressBg}>
          <View style={[s.progressFill, { width: `${(index / total) * 100}%` }]} />
        </View>

        {/* Dots */}
        <ProgressDots total={total} current={index} C={C} />

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

          {/* Topic chip */}
          <View style={[s.topicChip, { backgroundColor: C.brandBg }]}>
            <Text style={[T.label, { color: C.brand }]}>
              {leData.TOPIC_ICONS?.[q.topic] ?? '📖'} {q.topic}
            </Text>
          </View>

          {/* Question card */}
          <Animated.View style={[s.questionCard, cardShadow(C.shadow), { transform: [{ translateX: slideAnim }] }]}>
            <Text style={[T.h3, { color: C.text, lineHeight: 26 }]}>{q.text}</Text>
          </Animated.View>

          {/* Choices */}
          <View style={s.choices}>
            {q.choices.map((choice, idx) => (
              <TouchableOpacity
                key={idx}
                style={[s.choice, { backgroundColor: choiceBg(idx), borderColor: choiceBorder(idx) }]}
                onPress={() => handleAnswer(idx)}
                disabled={selected !== null}
                activeOpacity={0.75}
              >
                <View style={[s.letterBadge, { backgroundColor: letterBg(idx) }]}>
                  <Text style={s.letterText}>{LETTERS[idx]}</Text>
                </View>
                <Text style={[T.body, { flex: 1, color: C.text }]}>{choice}</Text>
                {selected !== null && idx === correctIdx && (
                  <Text style={{ fontSize: 18 }}>✅</Text>
                )}
                {selected === idx && idx !== correctIdx && (
                  <Text style={{ fontSize: 18 }}>❌</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: RESULTS
  // ─────────────────────────────────────────────────────────────────────────
  const topicScores  = scoreByTopic(questionSet, answers)
  const unlockedList = leData.TOPIC_ORDER.filter((t) => {
    const sc = topicScores[t]
    if (!sc) return false
    return Math.round((sc.correct / sc.total) * 100) >= UNLOCK_PCT
  })
  const totalCorrect = answers.reduce((sum, ans, i) => {
    const q = questionSet[i]
    return sum + (ans === (q.correct ?? q.correctIndex) ? 1 : 0)
  }, 0)

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={s.resultsScroll} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <Text style={s.resultsBigEmoji}>🎯</Text>
        <Text style={[T.h1, { color: C.text, textAlign: 'center' }]}>Placement Complete!</Text>
        <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 6, marginBottom: 4 }]}>
          {totalCorrect}/{total} correct
        </Text>

        {unlockedList.length > 0 ? (
          <View style={[s.unlockBanner, { backgroundColor: C.brandBg, borderColor: C.brand + '50' }]}>
            <Text style={[T.h3, { color: C.brand, textAlign: 'center' }]}>
              🔓 {unlockedList.length} topic{unlockedList.length > 1 ? 's' : ''} unlocked!
            </Text>
            <Text style={[T.small, { color: C.brand, textAlign: 'center', marginTop: 3 }]}>
              You've already mastered these — we'll skip them.
            </Text>
          </View>
        ) : (
          <View style={[s.unlockBanner, { backgroundColor: C.surface2, borderColor: C.border }]}>
            <Text style={[T.body, { color: C.textMuted, textAlign: 'center' }]}>
              📚 You'll start from the beginning — that's totally fine!
            </Text>
          </View>
        )}

        {/* Per-topic breakdown */}
        <Text style={[T.label, { color: C.textMuted, alignSelf: 'flex-start', marginBottom: 8, marginTop: 4 }]}>
          Topic Breakdown
        </Text>
        {leData.TOPIC_ORDER.map((topic) => {
          const sc       = topicScores[topic]
          const icon     = leData.TOPIC_ICONS?.[topic] ?? '📖'
          const tested   = !!sc
          const pct      = tested ? Math.round((sc.correct / sc.total) * 100) : null
          const unlocked = tested && pct >= UNLOCK_PCT

          return (
            <View key={topic} style={[s.topicRow, cardShadow(C.shadow), {
              borderLeftColor: unlocked ? C.correct : tested ? C.warn : C.border,
            }]}>
              <Text style={s.topicRowIcon}>{icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[T.body, { color: C.text }]}>{topic}</Text>
                {tested ? (
                  <Text style={[T.small, { color: C.textMuted }]}>
                    {sc.correct}/{sc.total} correct · {pct}%
                  </Text>
                ) : (
                  <Text style={[T.small, { color: C.textDim }]}>Not tested</Text>
                )}
              </View>
              {unlocked && (
                <View style={[s.statusBadge, { backgroundColor: C.correctBg }]}>
                  <Text style={[T.label, { color: C.correct, textTransform: 'none', letterSpacing: 0 }]}>✓ Unlocked</Text>
                </View>
              )}
              {tested && !unlocked && (
                <View style={[s.statusBadge, { backgroundColor: C.warnBg }]}>
                  <Text style={[T.label, { color: C.warn, textTransform: 'none', letterSpacing: 0 }]}>📚 Practice</Text>
                </View>
              )}
              {!tested && (
                <View style={[s.statusBadge, { backgroundColor: C.surface2 }]}>
                  <Text style={[T.label, { color: C.textDim, textTransform: 'none', letterSpacing: 0 }]}>Locked</Text>
                </View>
              )}
            </View>
          )
        })}

        <Text style={[T.label, { color: C.textDim, textAlign: 'center', marginTop: 12, textTransform: 'none', letterSpacing: 0 }]}>
          You can always go back to any topic later.
        </Text>

        {/* CTA */}
        <TouchableOpacity
          style={[duoBtn(C.brand, C.brandDark, { alignSelf: 'stretch', marginTop: 20 })]}
          onPress={applyAndContinue}
          disabled={saving}
        >
          <Text style={[T.btn, { color: '#fff' }]}>
            {saving ? 'Saving…' : 'START LEARNING →'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:        { flex: 1, backgroundColor: C.bg },

    // Quiz
    header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8 },
    headerLeft:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
    headerEmoji: { fontSize: 28 },
    skipBtn:     { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: C.surface2, borderRadius: 20 },
    progressBg:  { height: 6, backgroundColor: C.surface2, marginHorizontal: 16, marginTop: 10, borderRadius: 3, overflow: 'hidden' },
    progressFill:{ height: 6, backgroundColor: C.brand, borderRadius: 3 },
    scroll:      { padding: 16, gap: 12 },
    topicChip:   { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
    questionCard:{ backgroundColor: C.surface, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: C.border },
    choices:     { gap: 10 },
    choice:      { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 14, gap: 12, borderWidth: 2.5 },
    letterBadge: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    letterText:  { fontFamily: 'Nunito_900Black', fontSize: 14, color: '#fff' },

    // Results
    resultsScroll:{ padding: 20, alignItems: 'center', gap: 12 },
    resultsBigEmoji: { fontSize: 64, marginTop: 8 },
    unlockBanner: { alignSelf: 'stretch', borderRadius: 16, padding: 16, borderWidth: 1, marginTop: 4 },
    topicRow:    { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: 14, padding: 14, borderLeftWidth: 4, borderWidth: 1, borderColor: C.border },
    topicRowIcon:{ fontSize: 22 },
    statusBadge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  })
}
