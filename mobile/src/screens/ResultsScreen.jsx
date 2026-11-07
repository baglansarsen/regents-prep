import React, { useState, useRef, useEffect } from 'react'
import { formatTime } from '../hooks/useStudyTime'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useRP } from '../hooks/useRP'
import { T, duoBtnOutline, cardShadow } from '../styles/duo'
import MasteryCelebration from '../components/MasteryCelebration'
import ReactingReggie from '../motion/ReactingReggie'
import Reveal from '../motion/Reveal'
import Burst from '../motion/Burst'
import PressableDuo from '../motion/PressableDuo'
import { useCelebrationSequence } from '../motion/useCelebrationSequence'
import { useReducedMotion } from '../motion/useReducedMotion'
import { NATIVE_DRIVER } from '../motion/tokens'
import { useRewardFlight } from '../motion/RewardFlight'
import { hapticTick, hapticSuccess, hapticHeavy } from '../utils/haptics'
import ShareCardSheet from '../components/ShareCardSheet'
import { logEvent } from '../utils/analytics'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { trapDoneKey } from '../utils/dailyTrap'
import { localDateStr } from '../utils/localDate'
import NudgeBanner from '../components/NudgeBanner'
import { getEngagementNudge } from '../hooks/useEngagementNudge'
import { shuffle } from '../utils/question'
import * as leData   from '../content/living-environment/index'
import * as esData   from '../content/earth-science/index'
import * as chemData from '../content/chemistry/index'
import * as physData from '../content/physics/index'
import * as a1Data   from '../content/algebra-1/index'
import * as a2Data   from '../content/algebra-2/index'
import * as geoData  from '../content/geometry/index'
import * as lsData   from '../content/life-science/index'
import * as enData   from '../content/english/index'
import * as ghData   from '../content/global-history/index'
import * as usData   from '../content/us-history/index'

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

// Compute metadata for the lesson AFTER nextLessonMeta, so the chain continues past one hop
function computeNextNextMeta(sd, nextLessonMeta) {
  if (!nextLessonMeta) return null
  const units   = sd.UNITS ?? []
  const unitIdx = units.findIndex((u) => u.topic === nextLessonMeta.topic)
  const unit    = units[unitIdx]
  if (!unit) return null
  const nli = nextLessonMeta.lessonIndex
  if (nli < unit.lessonCount) {
    const nnIdx        = nli + 1
    const nnIsChallenge = nnIdx === unit.lessonCount
    const afterUnit    = nnIsChallenge ? units[unitIdx + 1] : null
    return {
      topic:        unit.topic,
      lessonCount:  unit.lessonCount,
      lessonIndex:  nnIdx,
      isChallenge:  nnIsChallenge,
      nextUnitTopic: nnIsChallenge ? (afterUnit?.topic ?? null) : null,
      label: nnIsChallenge ? `⚡ ${unit.title} Challenge` : `${unit.title} — Lesson ${nnIdx + 1}`,
    }
  }
  if (nextLessonMeta.isChallenge && nextLessonMeta.nextUnitTopic) {
    const nextUnit    = units.find((u) => u.topic === nextLessonMeta.nextUnitTopic)
    const nextUnitIdx = units.findIndex((u) => u.topic === nextLessonMeta.nextUnitTopic)
    if (nextUnit && nextUnit.lessonCount > 1) {
      return {
        topic:        nextUnit.topic,
        lessonCount:  nextUnit.lessonCount,
        lessonIndex:  1,
        isChallenge:  false,
        nextUnitTopic: null,
        label:        `${nextUnit.title} — Lesson 2`,
      }
    }
  }
  return null
}

// Reveal schedule (ms). RP counts up for 700ms from 'rp'; the streak lands
// after it with a short beat; actions come last. Tap anywhere skips to the end.
const RESULTS_SEQUENCE = [
  ['reggie',  0],
  ['score',   300],
  ['status',  600],
  ['perfect', 650],
  ['unlock',  850],
  ['rp',      930],
  ['combo',   1010],
  ['time',    1090],
  ['streak',  1950],
  ['summary', 2200],
  ['cta',     2350],
]
const PERFECT_COLORS = ['#F5B301', '#FFD34E', '#FFE58A', '#FF9600', '#FFFFFF']

export default function ResultsScreen({ route, navigation }) {
  const {
    score, total, results, bestStreak, topic, subject,
    rpEarned, doubleRP = false,
    firstMastery = false, masteredTopic,
    lessonIndex,
    challengeUnlocked = false, unlockedTopic = null,
    nextLessonMeta = null,
    sessionTime = 0,
    isDailyTrap = false,
  } = route.params
  const { C } = useTheme()
  const { user } = useAuthContext()
  const { streak, weekDays } = useDailyStreak(user?.uid)
  const { rp, level } = useRP(user?.uid)

  const [diveDeepQ,      setDiveDeepQ]      = useState(null)
  const [showShare,      setShowShare]      = useState(false)
  const [showCelebration, setShowCelebration] = useState(firstMastery)
  const [displayRP,    setDisplayRP]    = useState(0)
  const rpAnim     = useRef(new Animated.Value(0)).current
  const flame      = useRef(new Animated.Value(0)).current
  const rpBannerRef = useRef(null)
  const { fly }     = useRewardFlight()

  // Auto-advance to next unit Lesson 1 after a challenge pass
  useEffect(() => {
    if (!challengeUnlocked || !nextLessonMeta) return
    const sd = SUBJECT_DATA[subject] ?? leData
    const t = setTimeout(() => {
      const qs = sd.getLessonQuestions(
        nextLessonMeta.topic,
        nextLessonMeta.lessonIndex,
        nextLessonMeta.lessonCount,
      )
      navigation.replace('Quiz', {
        questionSet:    qs,
        topic:          nextLessonMeta.topic,
        subject,
        lessonIndex:    nextLessonMeta.lessonIndex,
        isChallenge:    nextLessonMeta.isChallenge,
        nextUnitTopic:  nextLessonMeta.nextUnitTopic,
        nextLessonMeta: computeNextNextMeta(sd, nextLessonMeta),
      })
    }, 2500)
    return () => clearTimeout(t)
  }, [])

  // The open-ended capstone is a non-graded reflection — exclude it from the
  // score/%/mastery. `total` already arrives as the graded count from QuizScreen.
  const graded   = results.filter((r) => !r.written)
  const correct  = graded.filter((r) => r.correct).length
  const pct      = total ? Math.round((correct / total) * 100) : 0   // guard reflection-only (total = 0)
  const passed   = pct >= 65
  const mastered = pct >= 85
  const perfect  = !isDailyTrap && total >= 3 && correct === total

  // ── Staged, skippable reveal (animation-plan.md Phase 2) ───────────────────
  // Held while the first-mastery overlay is up; Reduce Motion reveals at once.
  const reduced = useReducedMotion()
  const seq = useCelebrationSequence(RESULTS_SEQUENCE, { run: !showCelebration, instant: reduced })
  const at = seq.reached

  // Haptic beats: arrival, and the Perfect stamp landing.
  useEffect(() => { if (at('reggie') && passed) hapticSuccess() }, [at('reggie')])
  useEffect(() => { if (at('perfect') && perfect) hapticHeavy() }, [at('perfect')])

  // RP counts up once its banner is in, with a light tick at each quarter.
  useEffect(() => {
    if (!at('rp') || rpEarned <= 0) return
    let lastQuarter = 0
    const id = rpAnim.addListener(({ value }) => {
      setDisplayRP(Math.round(value))
      const q = Math.floor((value / rpEarned) * 4)
      if (q > lastQuarter && q < 4) { lastQuarter = q; hapticTick() }
    })
    Animated.timing(rpAnim, { toValue: rpEarned, duration: reduced ? 0 : 700, useNativeDriver: false }).start(({ finished }) => {
      // Counted up naturally (not skipped) → the stars fly home to the top bar.
      if (finished) fly({ fromRef: rpBannerRef, to: 'rp', icon: '⭐', count: Math.min(8, Math.max(4, Math.round(rpEarned / 10))) })
    })
    return () => rpAnim.removeListener(id)
  }, [at('rp')])

  // Streak flame ignites (0 → 1.15 → 1), then a gentle flicker.
  useEffect(() => {
    if (!at('streak') || streak <= 0) return
    if (reduced) { flame.setValue(1); return }
    flame.setValue(0)
    const a = Animated.sequence([
      Animated.spring(flame, { toValue: 1, tension: 260, friction: 6, useNativeDriver: NATIVE_DRIVER }),
      Animated.loop(Animated.sequence([
        Animated.timing(flame, { toValue: 1.08, duration: 380, useNativeDriver: NATIVE_DRIVER }),
        Animated.timing(flame, { toValue: 0.97, duration: 420, useNativeDriver: NATIVE_DRIVER }),
      ]), { iterations: 4 }),
    ])
    a.start()
    return () => a.stop()
  }, [at('streak'), streak])

  // Tap anywhere skips to the final state (RP lands at its total).
  function skipReveal() {
    if (seq.done) return
    seq.skip()
    rpAnim.stopAnimation()
    setDisplayRP(rpEarned)
  }

  // Denominator for share-rate: every results view, with score context
  useEffect(() => {
    logEvent('results_viewed', { pct, subject, topic, passed })
  }, [])

  const ringColor  = perfect ? '#F5B301' : mastered ? C.correct : passed ? C.warn : C.wrong
  const ringDark   = mastered ? C.brandDark : passed ? '#B38500' : C.wrongDark
  // Daily Trap gets its own framing — a miss here is a WIN for exam day.
  const trapDodged  = isDailyTrap && correct === total
  const statusLabel = isDailyTrap
    ? (trapDodged ? '🪤 You dodged the trap!' : '🛡 Good catch for exam day')
    : mastered ? '🏆 Amazing!' : passed ? '✅ Great job!' : '📚 Keep going!'

  // Record today's trap as solved (attempted) — keyed by uid + subject + local
  // date so the Home card flips to "Solved today" until midnight.
  useEffect(() => {
    if (!isDailyTrap || !user?.uid) return
    AsyncStorage.setItem(
      trapDoneKey(user.uid, subject, localDateStr()),
      trapDodged ? 'correct' : 'wrong',
    ).catch(() => {})
  }, [])

  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe} edges={['bottom']} onTouchStart={skipReveal} onClick={skipReveal}>
      {/* Confetti for a pass; gold and bigger for a perfect lesson */}
      <Burst
        run={passed && at('reggie')}
        intensity={perfect ? 'large' : 'medium'}
        colors={perfect ? PERFECT_COLORS : undefined}
      />
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Reggie reacts to the result (mounting on reveal plays his hop) */}
        <View style={{ width: 120, height: 120, marginBottom: 8 }}>
          {at('reggie') && (
            <Reveal shown from="pop">
              <ReactingReggie size={120} pose={passed ? 'celebrate' : 'encourage'} />
            </Reveal>
          )}
        </View>

        {/* Score circle (+ Perfect stamp) */}
        <Reveal shown={at('score')} from="pop">
          <View style={[s.circleOuter, { borderColor: ringColor, ...cardShadow(C.shadow) }]}>
            <View style={[s.circleInner, { backgroundColor: ringColor + '20' }]}>
              <Text style={[T.num, { color: ringColor }]}>{pct}%</Text>
              <Text style={[T.small, { color: C.textMuted }]}>{correct} / {total}</Text>
            </View>
          </View>
          {perfect && (
            <Reveal shown={at('perfect')} from="stamp" style={s.perfectStamp}>
              <Text style={s.perfectText}>PERFECT!</Text>
            </Reveal>
          )}
        </Reveal>

        <Reveal shown={at('status')} style={{ alignItems: 'center' }}>
          <Text style={[T.h1, { color: C.text, marginBottom: 16 }]}>{statusLabel}</Text>
        </Reveal>

        {/* Banners, staggered */}
        {challengeUnlocked && unlockedTopic && (
          <Reveal shown={at('unlock')} style={[s.banner, { backgroundColor: '#22C55E15', borderColor: '#22C55E60' }]}>
            <Text style={[T.h3, { color: '#16a34a' }]}>
              🔓 Next unit unlocked! ({unlockedTopic})
            </Text>
          </Reveal>
        )}
        {rpEarned > 0 && (
          <Reveal shown={at('rp')} style={[s.banner, { backgroundColor: C.warnBg, borderColor: C.warn + '60' }]}>
            <View ref={rpBannerRef} collapsable={false}>
              <Text style={[T.h3, { color: C.warn }]}>
                ⭐ +{displayRP} RP earned{doubleRP ? '  ⚡ 2× boost!' : ''}
              </Text>
            </View>
          </Reveal>
        )}
        {bestStreak >= 3 && (
          <Reveal shown={at('combo')} style={[s.banner, { backgroundColor: '#FF960015', borderColor: '#FF960040' }]}>
            <Text style={[T.body, { color: '#FF9600' }]}>
              🔥 Best combo: {bestStreak} in a row!
            </Text>
          </Reveal>
        )}
        {sessionTime >= 60 && (
          <Reveal shown={at('time')} style={[s.banner, { backgroundColor: C.surface2, borderColor: C.border }]}>
            <Text style={[T.body, { color: C.textMuted }]}>
              ⏱ Time: {formatTime(sessionTime)}
            </Text>
          </Reveal>
        )}

        {/* Streak banner — flame ignites when it lands */}
        {streak > 0 && (
          <Reveal shown={at('streak')} style={[
            s.streakBanner,
            { backgroundColor: C.surface, borderColor: C.brand + '60' },
          ]}>
            <Animated.Text style={[s.streakFire, { transform: [{ scale: flame }] }]}>🔥</Animated.Text>
            <View style={{ flex: 1 }}>
              <Text style={[T.h3, { color: C.text }]}>
                {streak}-day streak!{streak >= 7 ? ' 🏆' : ''}
              </Text>
              <View style={s.streakDots}>
                {weekDays.map((d) => (
                  <View
                    key={d.date}
                    style={[s.streakDot, d.studied && { backgroundColor: C.brand }, d.isToday && { borderColor: C.brand, borderWidth: 2 }]}
                  />
                ))}
              </View>
            </View>
          </Reveal>
        )}

        {/* Everything below the headline arrives together, after the streak */}
        <Reveal shown={at('summary')} style={{ alignSelf: 'stretch', alignItems: 'center' }}>
        {/* Engagement nudge */}
        {rp !== undefined && (() => {
          const nudge = getEngagementNudge('results', { pct, rpEarned, rp, level })
          return nudge && <NudgeBanner {...nudge} />
        })()}

        {/* Summary card */}
        <View style={[s.summaryCard, cardShadow(C.shadow)]}>
          <View style={s.summaryRow}>
            <Text style={[T.body, { color: C.correct }]}>✓  Correct</Text>
            <Text style={[T.h3, { color: C.correct }]}>{correct}</Text>
          </View>
          <View style={[s.summaryRow, s.summaryBorder]}>
            <Text style={[T.body, { color: C.wrong }]}>✗  Incorrect</Text>
            <Text style={[T.h3, { color: C.wrong }]}>{total - correct}</Text>
          </View>
          <View style={[s.summaryRow, s.summaryBorder]}>
            <Text style={[T.body, { color: C.text }]}>📊  Score</Text>
            <Text style={[T.h3, { color: C.text }]}>{score} pts</Text>
          </View>
        </View>

        {/* Share — only surface wins (65%+); people share flexes, not fails */}
        {passed && (
          <PressableDuo
            color={C.warn}
            darkColor="#B38500"
            style={{ alignSelf: 'stretch' }}
            onPress={() => setShowShare(true)}
          >
            <Text style={[T.btn, { color: '#fff' }]}>📤 FLEX MY SCORE</Text>
          </PressableDuo>
        )}

        {/* Review */}
        <Text style={[T.label, { color: C.textMuted, alignSelf: 'flex-start', marginTop: 8, marginBottom: 10 }]}>
          Question Review
        </Text>
        {results.map((r, i) => (
          <View key={i} style={[s.resultRow, { borderLeftColor: r.written ? C.brand : r.correct ? C.correct : C.wrong }]}>
            <Text style={[T.label, { color: C.textMuted, width: 22, textTransform: 'none', letterSpacing: 0 }]}>{i + 1}.</Text>
            <View style={{ flex: 1 }}>
              <Text style={[T.small, { color: C.text, lineHeight: 19 }]} numberOfLines={2}>
                {r.question?.text}
              </Text>
              {r.written && (
                <Text style={[T.label, { color: C.brand, marginTop: 3, textTransform: 'none', letterSpacing: 0 }]}>
                  ✍️ Self-reviewed{r.gotIt ? ' · +10 RP' : ''}
                </Text>
              )}
              {!r.written && !r.correct && r.question && (() => {
                const q = r.question
                const mcAnswer = q.choices?.[q.correct ?? q.correctIndex]
                if (mcAnswer) {
                  return (
                    <Text style={[T.label, { color: C.correct, marginTop: 3, textTransform: 'none', letterSpacing: 0 }]}>
                      ✓ {mcAnswer}
                    </Text>
                  )
                }
                if (q.explanation) {
                  return (
                    <Text style={[T.small, { color: C.correct, marginTop: 3, lineHeight: 18 }]} numberOfLines={3}>
                      ✓ {q.explanation}
                    </Text>
                  )
                }
                return null
              })()}
              {r.question?.diveDeep && (
                <TouchableOpacity
                  onPress={() => setDiveDeepQ(r.question)}
                  style={[s.diveDeepBtn, { borderColor: C.brand + '50', backgroundColor: C.brand + '18' }]}
                  activeOpacity={0.7}
                >
                  <Text style={[T.label, { color: C.brand, textTransform: 'none', letterSpacing: 0, fontSize: 12 }]}>🔍 Dive Deep</Text>
                </TouchableOpacity>
              )}
            </View>
            <Text style={{ fontSize: 16, marginLeft: 6 }}>{r.written ? '✍️' : r.correct ? '✅' : '❌'}</Text>
          </View>
        ))}

        </Reveal>

        <View style={{ height: 8 }} />
      </ScrollView>

      {/* ── Sticky action footer — always visible without scrolling ── */}
      <Reveal shown={at('cta')} style={[s.stickyFooter, { backgroundColor: C.bg, borderTopColor: C.border }]}>
        {passed ? (
          <View style={s.actions}>
            <TouchableOpacity
              style={duoBtnOutline(C.border, { flex: nextLessonMeta ? 1 : undefined, paddingHorizontal: nextLessonMeta ? 0 : 32 })}
              onPress={() => navigation.navigate('Home')}
              accessibilityRole="button"
              accessibilityLabel="Home"
            >
              <Text style={[T.btn, { color: C.text }]}>🏠 HOME</Text>
            </TouchableOpacity>
            {nextLessonMeta && (
              <PressableDuo
                color={C.brand}
                darkColor={C.brandDark}
                style={{ flex: 1 }}
                faceStyle={{ paddingHorizontal: 12 }}
                onPress={() => {
                  const sd = SUBJECT_DATA[subject] ?? leData
                  const qs = sd.getLessonQuestions(
                    nextLessonMeta.topic,
                    nextLessonMeta.lessonIndex,
                    nextLessonMeta.lessonCount,
                  )
                  navigation.replace('Quiz', {
                    questionSet:    qs,
                    topic:          nextLessonMeta.topic,
                    subject,
                    lessonIndex:    nextLessonMeta.lessonIndex,
                    isChallenge:    nextLessonMeta.isChallenge,
                    nextUnitTopic:  nextLessonMeta.nextUnitTopic,
                    nextLessonMeta: computeNextNextMeta(sd, nextLessonMeta),
                  })
                }}
              >
                <Text style={[T.btn, { color: '#fff' }]} numberOfLines={1}>
                  {nextLessonMeta.isChallenge ? '⚡' : '▶'} {nextLessonMeta.label}
                </Text>
              </PressableDuo>
            )}
          </View>
        ) : (
          <View style={s.actions}>
            <PressableDuo
              color={C.brand}
              darkColor={C.brandDark}
              style={{ flex: 1 }}
              faceStyle={{ paddingHorizontal: 12 }}
              onPress={() => navigation.replace('Quiz', {
                questionSet: shuffle(results.map((r) => r.question)),
                topic, subject, lessonIndex,
              })}
            >
              <Text style={[T.btn, { color: '#fff' }]}>🔁 TRY AGAIN</Text>
            </PressableDuo>
            <TouchableOpacity
              style={duoBtnOutline(C.border, { flex: 1 })}
              onPress={() => navigation.navigate('Home')}
              accessibilityRole="button"
              accessibilityLabel="Home"
            >
              <Text style={[T.btn, { color: C.text }]}>🏠 HOME</Text>
            </TouchableOpacity>
          </View>
        )}
      </Reveal>
      {/* ── Mastery celebration overlay ── */}
      {showCelebration && (
        <MasteryCelebration
          topic={masteredTopic}
          onDismiss={() => setShowCelebration(false)}
        />
      )}

      {/* ── Share card sheet — first mastery gets the comeback story ── */}
      <ShareCardSheet
        visible={showShare}
        onClose={() => setShowShare(false)}
        variant={firstMastery && masteredTopic ? 'weak_topic_mastered' : 'quiz_result'}
        pct={pct}
        correct={correct}
        total={total}
        subject={subject}
        streak={streak}
        topic={firstMastery && masteredTopic ? masteredTopic : topic}
      />

      {/* ── Dive Deep modal ── */}
      <Modal visible={!!diveDeepQ} transparent animationType="slide" onRequestClose={() => setDiveDeepQ(null)}>
        <TouchableOpacity style={s.diveBackdrop} activeOpacity={1} onPress={() => setDiveDeepQ(null)} />
        <View style={[s.diveSheet, { backgroundColor: C.surface }]}>
          <View style={[s.diveHandle, { backgroundColor: C.border }]} />
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 14, paddingBottom: 32 }}>
            <Text style={[s.diveTitle, { color: C.brand }]}>🔍 Explanation</Text>
            <Text style={[s.diveBody, { color: C.text }]}>{diveDeepQ?.explanation}</Text>
            {diveDeepQ?.diveDeep && (
              <>
                <View style={[s.diveDivider, { backgroundColor: C.border }]} />
                <Text style={[s.diveDeepLabel, { color: C.textMuted }]}>DEEP DIVE</Text>
                <Text style={[s.diveBody, { color: C.text }]}>{diveDeepQ?.diveDeep}</Text>
              </>
            )}
          </ScrollView>
          <TouchableOpacity
            style={[s.diveCloseBtn, { backgroundColor: C.brand }]}
            onPress={() => setDiveDeepQ(null)}
            activeOpacity={0.85}
          >
            <Text style={s.diveCloseBtnText}>Got it ✓</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:         { flex: 1, backgroundColor: C.bg },
    scroll:       { padding: 20, alignItems: 'center', gap: 14 },
    circleOuter:  { width: 170, height: 170, borderRadius: 85, borderWidth: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 6 },
    circleInner:  { width: 150, height: 150, borderRadius: 75, alignItems: 'center', justifyContent: 'center', gap: 4 },
    banner:       { alignSelf: 'stretch', borderRadius: 16, paddingHorizontal: 18, paddingVertical: 13, borderWidth: 1 },
    streakBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, alignSelf: 'stretch', borderRadius: 16, padding: 14, borderWidth: 1.5 },
    streakFire:   { fontSize: 36 },
    perfectStamp: {
      position: 'absolute', top: -6, right: -38,
      paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
      backgroundColor: '#F5B301', borderWidth: 2, borderColor: '#FFFFFF',
    },
    perfectText:  { fontFamily: 'Fredoka_700Bold', fontSize: 16, color: '#3B2A00', letterSpacing: 1 },
    streakDots:   { flexDirection: 'row', gap: 5, marginTop: 6 },
    streakDot:    { width: 12, height: 12, borderRadius: 6, backgroundColor: C.surface2, borderWidth: 1, borderColor: C.border },
    summaryCard:  { alignSelf: 'stretch', backgroundColor: C.surface, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: C.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
    summaryRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
    summaryBorder:{ borderTopWidth: 1, borderTopColor: C.border },
    resultRow:    { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: C.surface, borderRadius: 12, padding: 12, borderLeftWidth: 3 },
    stickyFooter: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12, borderTopWidth: StyleSheet.hairlineWidth },
    actions:      { alignSelf: 'stretch', flexDirection: 'row', gap: 12 },
    diveDeepBtn:  { alignSelf: 'flex-start', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginTop: 6 },
    diveBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
    diveSheet:    { position: 'absolute', bottom: 0, left: 0, right: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '75%' },
    diveHandle:   { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
    diveTitle:    { fontSize: 17, fontWeight: '800' },
    diveBody:     { fontSize: 15, lineHeight: 24 },
    diveDivider:  { height: 1 },
    diveDeepLabel:{ fontSize: 11, fontWeight: '700', letterSpacing: 1 },
    diveCloseBtn: { borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
    diveCloseBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  })
}
