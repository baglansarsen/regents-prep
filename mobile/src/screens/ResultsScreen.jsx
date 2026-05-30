import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { T, duoBtn, duoBtnOutline, cardShadow } from '../styles/duo'
import MasteryCelebration from '../components/MasteryCelebration'
import * as leData   from '../../../src/data/living-environment/index'
import * as esData   from '../../../src/data/earth-science/index'
import * as chemData from '../../../src/data/chemistry/index'
import * as physData from '../../../src/data/physics/index'
import * as a1Data   from '../../../src/data/algebra-1/index'
import * as a2Data   from '../../../src/data/algebra-2/index'
import * as geoData  from '../../../src/data/geometry/index'

const SUBJECT_DATA = {
  'living-environment': leData,
  'earth-science':      esData,
  'chemistry':          chemData,
  'physics':            physData,
  'algebra-1':          a1Data,
  'algebra-2':          a2Data,
  'geometry':           geoData,
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

export default function ResultsScreen({ route, navigation }) {
  const {
    score, total, results, bestStreak, topic, subject,
    xpEarned, comboBonus = 0,
    firstMastery = false, masteredTopic,
    lessonIndex,
    challengeUnlocked = false, unlockedTopic = null,
    nextLessonMeta = null,
  } = route.params
  const { C } = useTheme()

  const [showCelebration, setShowCelebration] = useState(firstMastery)
  const [displayXP, setDisplayXP] = useState(0)
  const xpAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (xpEarned <= 0) return
    const id = xpAnim.addListener(({ value }) => setDisplayXP(Math.round(value)))
    Animated.timing(xpAnim, { toValue: xpEarned, duration: 900, useNativeDriver: false }).start()
    return () => xpAnim.removeListener(id)
  }, [])

  const correct  = results.filter((r) => r.correct).length
  const pct      = Math.round((correct / total) * 100)
  const passed   = pct >= 65
  const mastered = pct >= 85

  const ringColor  = mastered ? C.correct : passed ? C.warn : C.wrong
  const ringDark   = mastered ? C.brandDark : passed ? '#B38500' : C.wrongDark
  const statusLabel = mastered ? '🏆 Amazing!' : passed ? '✅ Great job!' : '📚 Keep going!'

  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Score circle */}
        <View style={[s.circleOuter, { borderColor: ringColor, ...cardShadow(C.shadow) }]}>
          <View style={[s.circleInner, { backgroundColor: ringColor + '20' }]}>
            <Text style={[T.num, { color: ringColor }]}>{pct}%</Text>
            <Text style={[T.small, { color: C.textMuted }]}>{correct} / {total}</Text>
          </View>
        </View>

        <Text style={[T.h1, { color: C.text, marginBottom: 16 }]}>{statusLabel}</Text>

        {/* Banners */}
        {challengeUnlocked && unlockedTopic && (
          <View style={[s.banner, { backgroundColor: '#22C55E15', borderColor: '#22C55E60' }]}>
            <Text style={[T.h3, { color: '#16a34a' }]}>
              🔓 Next unit unlocked! ({unlockedTopic})
            </Text>
          </View>
        )}
        {xpEarned > 0 && (
          <View style={[s.banner, { backgroundColor: C.warnBg, borderColor: C.warn + '60' }]}>
            <Text style={[T.h3, { color: C.warn }]}>
              ⭐ +{displayXP} XP earned{xpEarned > (correct * 10 + (comboBonus ?? 0)) ? '  ⚡ 2× boost!' : ''}
            </Text>
          </View>
        )}
        {bestStreak >= 3 && (
          <View style={[s.banner, { backgroundColor: '#FF960015', borderColor: '#FF960040' }]}>
            <Text style={[T.body, { color: '#FF9600' }]}>
              🔥 Best combo: {bestStreak} in a row!{comboBonus > 0 ? `  +${comboBonus} bonus XP` : ''}
            </Text>
          </View>
        )}

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

        {/* Review */}
        <Text style={[T.label, { color: C.textMuted, alignSelf: 'flex-start', marginTop: 8, marginBottom: 10 }]}>
          Question Review
        </Text>
        {results.map((r, i) => (
          <View key={i} style={[s.resultRow, { borderLeftColor: r.correct ? C.correct : C.wrong }]}>
            <Text style={[T.label, { color: C.textMuted, width: 22, textTransform: 'none', letterSpacing: 0 }]}>{i + 1}.</Text>
            <View style={{ flex: 1 }}>
              <Text style={[T.small, { color: C.text, lineHeight: 19 }]} numberOfLines={2}>
                {r.question?.text}
              </Text>
              {!r.correct && r.question && (
                <Text style={[T.label, { color: C.correct, marginTop: 3, textTransform: 'none', letterSpacing: 0 }]}>
                  ✓ {r.question.choices?.[r.question.correct ?? r.question.correctIndex]}
                </Text>
              )}
            </View>
            <Text style={{ fontSize: 16, marginLeft: 6 }}>{r.correct ? '✅' : '❌'}</Text>
          </View>
        ))}

        {/* Actions */}
        {passed ? (
          <View style={s.actions}>
            <TouchableOpacity
              style={duoBtnOutline(C.border, { flex: nextLessonMeta ? 1 : undefined, paddingHorizontal: nextLessonMeta ? 0 : 32 })}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={[T.btn, { color: C.text }]}>🏠 HOME</Text>
            </TouchableOpacity>
            {nextLessonMeta && (
              <TouchableOpacity
                style={duoBtn(C.brand, C.brandDark, { flex: 1 })}
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
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={s.actions}>
            <TouchableOpacity
              style={duoBtn(C.brand, C.brandDark, { flex: 1 })}
              onPress={() => navigation.replace('Quiz', {
                questionSet: results.map((r) => r.question).sort(() => Math.random() - 0.5),
                topic, subject, lessonIndex,
              })}
            >
              <Text style={[T.btn, { color: '#fff' }]}>🔁 TRY AGAIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={duoBtnOutline(C.border, { flex: 1 })}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={[T.btn, { color: C.text }]}>🏠 HOME</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
      {/* ── Mastery celebration overlay ── */}
      {showCelebration && (
        <MasteryCelebration
          topic={masteredTopic}
          onDismiss={() => setShowCelebration(false)}
        />
      )}

    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:         { flex: 1, backgroundColor: C.bg },
    scroll:       { padding: 20, alignItems: 'center', gap: 12 },
    circleOuter:  { width: 160, height: 160, borderRadius: 80, borderWidth: 5, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
    circleInner:  { width: 140, height: 140, borderRadius: 70, alignItems: 'center', justifyContent: 'center', gap: 4 },
    banner:       { alignSelf: 'stretch', borderRadius: 14, paddingHorizontal: 18, paddingVertical: 12, borderWidth: 1 },
    summaryCard:  { alignSelf: 'stretch', backgroundColor: C.surface, borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: C.border },
    summaryRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
    summaryBorder:{ borderTopWidth: 1, borderTopColor: C.border },
    resultRow:    { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'flex-start', gap: 8, backgroundColor: C.surface, borderRadius: 12, padding: 12, borderLeftWidth: 3 },
    actions:      { alignSelf: 'stretch', flexDirection: 'row', gap: 12, marginTop: 8 },
  })
}
