/**
 * PlacementTestScreen
 *
 * Runs once per user on first login. Pulls 10 questions spread across all LE
 * topics (1–2 per topic, every topic guaranteed at least one). Topics the user
 * scores ≥ 80 % on are force-unlocked so they skip beginner content.
 *
 * Flow: intro (start / skip-for-now) → quiz → results.
 * UX: tap a choice → highlight correct/wrong for 1.2 s → auto-advance.
 * No lives, no timer, no RP — this is diagnostic only.
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  Animated, Dimensions, ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useProgress } from '../hooks/useProgress'
import { useUnlocks } from '../hooks/useUnlocks'
import { shuffle } from '../utils/question'
import * as leData    from '../content/living-environment/index'
import * as esData    from '../content/earth-science/index'
import * as chemData  from '../content/chemistry/index'
import * as physData  from '../content/physics/index'
import * as a1Data    from '../content/algebra-1/index'
import * as a2Data    from '../content/algebra-2/index'
import * as geoData   from '../content/geometry/index'
import * as lsData    from '../content/life-science/index'
import { T, duoBtn, duoBtnOutline, cardShadow, elevatedCard } from '../styles/duo'

import * as enData from '../content/english/index'
import * as ghData from '../content/global-history/index'
import * as usData from '../content/us-history/index'

const SUBJECT_DATA = {
  'living-environment': leData,
  'earth-science':      esData,
  'chemistry':          chemData,
  'physics':            physData,
  'algebra-1':          a1Data,
  'algebra-2':          a2Data,
  'geometry':           geoData,
  'life-science':       lsData,
  'english':            enData,
  'global-history':     ghData,
  'us-history':         usData,
}

const { width: W } = Dimensions.get('window')
const LETTERS = ['A', 'B', 'C', 'D']
const LETTER_COLORS = ['#34B3F1', '#7C5CFC', '#FF9600', '#FF5A5F']
const TARGET       = 10        // target question count
const UNLOCK_PCT   = 80        // auto-unlock threshold

// ── Build the placement set ───────────────────────────────────────────────────
// Stable identity for de-dup: questions carry no `id`, so fall back to the
// question text. (Deduping on the missing `id` previously collapsed the whole
// set to a single question.)
const questionKey = (q) => q.id ?? q.text

// Placement is UNIT-aware: it samples by unit using the subject's `getByTopic`
// (which routes the split sub-topic and skill pools exactly like lessons do),
// and tags each question with `__unitTopic`. Scoring/unlocking then key on the
// unit topic, so acing a unit on placement force-unlocks that same unit on the
// Home grid (which gates on the unit topic). Sampling by the raw normalized
// `q.topic` instead would unlock nothing for the split-cell and skill units,
// whose unit names differ from their coarse pool topic.
function buildPlacementSet(units, getByTopic, target = TARGET) {
  function pick(unit, n) {
    const pool = (getByTopic?.(unit.topic) ?? [])
      .filter((q) => Array.isArray(q.choices) && q.choices.length > 0)
    return shuffle(pool).slice(0, n).map((q) => ({ ...q, __unitTopic: unit.topic }))
  }

  // 1. Guarantee exactly 1 question per unit (covers all units)
  const guaranteed = units.map((u) => pick(u, 1)[0]).filter(Boolean)

  // 2. Fill remaining slots with a 2nd question from each unit (random order)
  const extras = shuffle(units).flatMap((u) => pick(u, 2).slice(1))

  const combined = [...guaranteed, ...extras]
  const used = new Set()
  const deduped = combined.filter((q) => {
    const k = questionKey(q)
    if (used.has(k)) return false
    used.add(k)
    return true
  })

  // Shuffle and cap at target
  return shuffle(deduped).slice(0, target)
}

// ── Score helper ─────────────────────────────────────────────────────────────
// Keyed on the unit topic (carried as `__unitTopic`) so the scores line up with
// the unit-unlock store.
function scoreByTopic(questionSet, answers) {
  const map = {}   // unitTopic → { correct, total }
  questionSet.forEach((q, i) => {
    const t = q.__unitTopic ?? q.topic
    if (!map[t]) map[t] = { correct: 0, total: 0 }
    map[t].total++
    const correctIdx = q.correct ?? q.correctIndex
    if (answers[i] === correctIdx) map[t].correct++
  })
  return map
}

// ── Small progress dots at the top ───────────────────────────────────────────
function ProgressDots({ total, current, answered, C }) {
  return (
    <View style={{ flexDirection: 'row', gap: 5, alignSelf: 'center', marginVertical: 12 }}>
      {Array.from({ length: total }, (_, i) => {
        const done   = i < current || (i === current && answered)
        const active = i === current && !answered
        return (
          <View
            key={i}
            style={{
              width: done || active ? 20 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: done ? C.brand : active ? C.brand + '70' : C.surface2,
            }}
          />
        )
      })}
    </View>
  )
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function PlacementTestScreen({ onComplete }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const { subject } = useSubject()
  const uid = user?.uid
  const { history, saveResult } = useProgress(uid)

  const sd = SUBJECT_DATA[subject] ?? leData
  const { forceUnlock } = useUnlocks(history, sd.TOPIC_ORDER ?? [], subject)
  const s = makeStyles(C)

  const questionSet = useMemo(
    () => buildPlacementSet(sd.UNITS ?? [], sd.getByTopic),
    [subject]   // rebuild if subject changes (shouldn't happen mid-test, but safe)
  )
  const total = questionSet.length

  // ── Quiz state ────────────────────────────────────────────────────────────
  const [index,     setIndex]     = useState(0)
  const [selected,  setSelected]  = useState(null)   // pending choice (changeable until submitted)
  const [submitted, setSubmitted] = useState(false)  // answer committed → reveal + lock
  const [answers,   setAnswers]   = useState([])     // final answer per question
  const [phase,     setPhase]     = useState('intro') // 'intro' | 'quiz' | 'results'

  const autoTimer = useRef(null)

  // ── Card slide animation ──────────────────────────────────────────────────
  const slideAnim = useRef(new Animated.Value(0)).current

  function slideIn() {
    slideAnim.setValue(W)
    Animated.spring(slideAnim, { toValue: 0, tension: 120, friction: 12, useNativeDriver: true }).start()
  }

  useEffect(() => { if (phase === 'quiz') slideIn() }, [index, phase])

  // ── Pick a choice (changeable until the answer is submitted) ───────────────
  function selectChoice(idx) {
    if (submitted) return
    setSelected(idx)
  }

  // ── Submit the chosen answer: lock + reveal, then advance ──────────────────
  function submitAnswer() {
    if (selected === null || submitted) return
    setSubmitted(true)

    const newAnswers = [...answers, selected]
    autoTimer.current = setTimeout(() => {
      const next = index + 1
      if (next >= total) {
        finishQuiz(newAnswers)
      } else {
        setAnswers(newAnswers)
        setSelected(null)
        setSubmitted(false)
        setIndex(next)
      }
    }, 1100)
  }

  function finishQuiz(finalAnswers) {
    setAnswers(finalAnswers)
    setPhase('results')
  }

  useEffect(() => () => clearTimeout(autoTimer.current), [])

  // Exam-only subjects (humanities) have no MC pool — finish once, in an effect
  // (never as a side effect during render, which would re-fire every render).
  useEffect(() => {
    if (total === 0) markDone().then(() => onComplete?.())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

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
      return saveResult({ topic, score: correct * 10, total: t, correct, pct, subject })
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

  // Exam-only subjects (humanities) have no practice questions — skip placement
  // test (the effect above performs the markDone + onComplete).
  if (total === 0) return null

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: INTRO
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
        <View style={s.introWrap}>
          <View style={s.introHeroCircle}>
            <Text style={s.introEmoji}>🎯</Text>
          </View>
          <Text style={[T.h1, { color: C.text, textAlign: 'center', marginTop: 20 }]}>
            Placement Test
          </Text>
          <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 8 }]}>
            Answer about {total} quick questions so we can skip what you already know and start you
            in the right place.
          </Text>

          <View style={[s.introCard, elevatedCard(C, { marginTop: 24 })]}>
            {[
              ['⚡', 'Takes about 2 minutes'],
              ['❤️', 'No lives, no timer — just diagnostic'],
              ['🔓', 'Topics you ace get unlocked instantly'],
            ].map(([icon, label]) => (
              <View key={label} style={s.introRow}>
                <Text style={s.introRowIcon}>{icon}</Text>
                <Text style={[T.body, { flex: 1, color: C.text }]}>{label}</Text>
              </View>
            ))}
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={[duoBtn(C.brand, C.brandDark, { alignSelf: 'stretch' })]}
            onPress={() => setPhase('quiz')}
            activeOpacity={0.85}
          >
            <Text style={[T.btn, { color: '#fff' }]}>START TEST →</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[duoBtnOutline(C.border, { alignSelf: 'stretch', marginTop: 12 })]}
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <Text style={[T.btn, { color: C.textMuted }]}>SKIP FOR NOW</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: QUIZ
  // ─────────────────────────────────────────────────────────────────────────
  if (phase === 'quiz') {
    const q          = questionSet[index]
    const correctIdx = q.correct ?? q.correctIndex

    // Pre-submit selection uses a neutral blue (not the green brand/correct color)
    // so a picked-but-unsubmitted answer never looks like it's been marked correct.
    function choiceBg(idx) {
      if (!submitted) return idx === selected ? C.blue + '22' : C.surface
      if (idx === correctIdx) return C.correctBg
      if (idx === selected && idx !== correctIdx) return C.wrongBg
      return C.surface
    }
    function choiceBorder(idx) {
      if (!submitted) return idx === selected ? C.blue : C.border
      if (idx === correctIdx) return C.correct
      if (idx === selected && idx !== correctIdx) return C.wrong
      return C.border + '40'
    }
    function letterBg(idx) {
      if (!submitted) return idx === selected ? C.blue : LETTER_COLORS[idx]
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
          <View style={[s.progressFill, { width: `${((index + (submitted ? 1 : 0)) / total) * 100}%` }]} />
        </View>

        {/* Dots */}
        <ProgressDots total={total} current={index} answered={submitted} C={C} />

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

          {/* Topic chip — the unit being placed (not the coarse pool topic) */}
          <View style={[s.topicChip, { backgroundColor: C.brandBg }]}>
            <Text style={[T.label, { color: C.brand }]}>
              {sd.TOPIC_ICONS?.[q.__unitTopic ?? q.topic] ?? '📖'} {q.__unitTopic ?? q.topic}
            </Text>
          </View>

          {/* Question card */}
          <Animated.View style={[s.questionCard, { transform: [{ translateX: slideAnim }] }]}>
            <Text style={[T.h3, { color: C.text, lineHeight: 26 }]}>{q.text}</Text>
          </Animated.View>

          {/* Choices */}
          <View style={s.choices}>
            {q.choices.map((choice, idx) => (
              <TouchableOpacity
                key={idx}
                style={[s.choice, { backgroundColor: choiceBg(idx), borderColor: choiceBorder(idx) }]}
                onPress={() => selectChoice(idx)}
                disabled={submitted}
                activeOpacity={0.75}
              >
                <View style={[s.letterBadge, { backgroundColor: letterBg(idx) }]}>
                  <Text style={s.letterText}>{LETTERS[idx]}</Text>
                </View>
                <Text style={[T.body, { flex: 1, color: C.text }]}>{choice}</Text>
                {submitted && idx === correctIdx && (
                  <Text style={{ fontSize: 18 }}>✅</Text>
                )}
                {submitted && selected === idx && idx !== correctIdx && (
                  <Text style={{ fontSize: 18 }}>❌</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Submit — under the question so a tap selects (changeable) and only
              this button commits the answer, preventing accidental selection. */}
          <TouchableOpacity
            style={[
              duoBtn(C.brand, C.brandDark, { alignSelf: 'stretch', marginTop: 20 }),
              (selected === null || submitted) && { opacity: 0.5 },
            ]}
            onPress={submitAnswer}
            disabled={selected === null || submitted}
            activeOpacity={0.85}
          >
            <Text style={[T.btn, { color: '#fff' }]}>
              {index + 1 === total ? 'SUBMIT & FINISH' : 'SUBMIT'}
            </Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: RESULTS
  // ─────────────────────────────────────────────────────────────────────────
  const topicScores  = scoreByTopic(questionSet, answers)
  const unlockedList = (sd.TOPIC_ORDER ?? []).filter((t) => {
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
        <View style={s.scorePill}>
          <Text style={[T.num, { color: C.brand }]}>{totalCorrect}</Text>
          <Text style={[T.h2, { color: C.textMuted }]}> / {total}</Text>
          <Text style={[T.label, { color: C.textMuted, marginLeft: 8, textTransform: 'none', letterSpacing: 0 }]}>correct</Text>
        </View>

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
        <Text style={[T.label, { color: C.textMuted, alignSelf: 'stretch', textAlign: 'left', marginBottom: 8, marginTop: 4 }]}>
          Topic Breakdown
        </Text>
        {(sd.TOPIC_ORDER ?? []).map((topic) => {
          const sc       = topicScores[topic]
          const icon     = sd.TOPIC_ICONS?.[topic] ?? '📖'
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
          activeOpacity={0.85}
        >
          {saving ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={[T.btn, { color: '#fff' }]}>SAVING…</Text>
            </View>
          ) : (
            <Text style={[T.btn, { color: '#fff' }]}>START LEARNING →</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:        { flex: 1, backgroundColor: C.bg },

    // Intro
    introWrap:       { flex: 1, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 20, alignItems: 'center' },
    introHeroCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: C.brandBg, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
    introEmoji:      { fontSize: 52 },
    introCard:       { alignSelf: 'stretch', padding: 18, gap: 14 },
    introRow:        { flexDirection: 'row', alignItems: 'center', gap: 12 },
    introRowIcon:    { fontSize: 22, width: 28, textAlign: 'center' },

    // Quiz
    header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8 },
    headerLeft:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
    headerEmoji: { fontSize: 28 },
    skipBtn:     { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: C.surface2, borderRadius: 20 },
    progressBg:  { height: 6, backgroundColor: C.surface2, marginHorizontal: 16, marginTop: 10, borderRadius: 3, overflow: 'hidden' },
    progressFill:{ height: 6, backgroundColor: C.brand, borderRadius: 3 },
    scroll:      { padding: 16, gap: 12 },
    topicChip:   { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
    questionCard:{ ...elevatedCard(C), padding: 20 },
    choices:     { gap: 10 },
    choice:      { flexDirection: 'row', alignItems: 'center', borderRadius: 16, padding: 14, gap: 12, borderWidth: 2.5 },
    letterBadge: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    letterText:  { fontFamily: 'Fredoka_700Bold', fontSize: 14, color: '#fff' },

    // Results
    resultsScroll:{ padding: 20, alignItems: 'center', gap: 12 },
    resultsBigEmoji: { fontSize: 64, marginTop: 8 },
    scorePill:   { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', marginTop: 4, marginBottom: 4 },
    unlockBanner: { alignSelf: 'stretch', borderRadius: 16, padding: 16, borderWidth: 1, marginTop: 4 },
    topicRow:    { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: 14, padding: 14, borderLeftWidth: 4, borderWidth: 1, borderColor: C.border },
    topicRowIcon:{ fontSize: 22 },
    statusBadge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  })
}
