import React, { useRef, useEffect, useState } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView,
  Animated, StyleSheet, Image,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useXP } from '../hooks/useXP'
import { useLivesContext } from '../context/LivesContext'
import { useRewardedAd } from '../hooks/useRewardedAd'
import { useQuiz } from '../hooks/useQuiz'
import { appendMistakes } from '../hooks/useMistakes'
import { useDoubleXP } from '../context/DoubleXPContext'
import { usePetContext } from '../context/PetContext'
import { T, duoBtn, cardShadow } from '../styles/duo'
import PetWidget from '../components/PetWidget'

const LETTERS = ['A', 'B', 'C', 'D']
const CDN_BASE = 'https://regents-csas.web.app'
const LETTER_COLORS = ['#1CB0F6', '#CE82FF', '#FF9600', '#FF4B4B']

// Combo threshold labels
function comboInfo(streak) {
  if (streak >= 10) return { label: `${streak} in a row!`, mult: '×2.0', color: '#FF4B4B' }
  if (streak >= 5)  return { label: `${streak} in a row!`, mult: '×2.0', color: '#FF4B4B' }
  if (streak >= 3)  return { label: `${streak} in a row!`, mult: '×1.5', color: '#FF9600' }
  if (streak >= 2)  return { label: `${streak} in a row!`, mult: '×1.25', color: '#FF9600' }
  return null
}

// Calculate bonus XP from combos at quiz end
function calcComboBonus(results) {
  let bonus = 0
  let run = 0
  results.forEach((r) => {
    if (r.correct) {
      run++
      if (run >= 3) bonus += 5   // +5 XP per question while on a 3+ combo
    } else {
      run = 0
    }
  })
  return bonus
}

export default function QuizScreen({ route, navigation }) {
  const { questionSet, topic, subject, lessonIndex } = route.params
  const { C } = useTheme()
  const insets = useSafeAreaInsets()
  const { user } = useAuthContext()
  const uid = user?.uid

  const { saveResult, masteryPct } = useProgress(uid)
  const { xpMultiplier }           = useDoubleXP()
  const { markStudied }          = useDailyStreak(uid)
  const { xp, earnXP, spendXP }  = useXP(uid)
  const { lives, maxLives, nextRefillAt, loseLife, refillLives, addLife } = useLivesContext()
  const { ready: adReady, showAd } = useRewardedAd({ onReward: addLife })
  const { checkAndEvolve, triggerReaction, updateQuestProgress, getPetMessage } = usePetContext()

  const [showBubble, setShowBubble] = useState(false)

  const {
    currentQuestion, index, total, score, streak, bestStreak,
    timeLeft, timerMax, selected, lastEarned, phase, results,
    answer, next: nextQuestion,
  } = useQuiz(questionSet)

  const slideAnim  = useRef(new Animated.Value(300)).current
  const pulseAnim  = useRef(new Animated.Value(1)).current
  const comboAnim  = useRef(new Animated.Value(0)).current

  // (No-lives gate is now rendered as an overlay — see NoLivesGate below)

  // ── Feedback panel slide ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase === 'feedback') {
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, tension: 100, friction: 10 }).start()
    } else {
      slideAnim.setValue(300)
    }
  }, [phase])

  // ── Combo badge pop animation ─────────────────────────────────────────────
  useEffect(() => {
    if (phase === 'feedback' && streak >= 2) {
      comboAnim.setValue(0)
      Animated.spring(comboAnim, {
        toValue: 1, useNativeDriver: true, tension: 200, friction: 7,
      }).start()
    } else {
      comboAnim.setValue(0)
    }
  }, [phase, streak])

  // ── Lose life + pet reaction on wrong/right answer ────────────────────────
  useEffect(() => {
    if (phase === 'feedback' && selected !== null && selected !== 'timeout') {
      const correctIdx = currentQuestion?.correct ?? currentQuestion?.correctIndex
      if (selected !== correctIdx) {
        loseLife()
        triggerReaction('sad')
      } else {
        triggerReaction('cheer')
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // ── Card pulse on new question ────────────────────────────────────────────
  useEffect(() => {
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.02, duration: 80, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1,    duration: 80, useNativeDriver: true }),
    ]).start()
  }, [index])

  // ── Quiz done: award XP with combo bonus ──────────────────────────────────
  useEffect(() => {
    if (phase === 'done') {
      const correct    = results.filter((r) => r.correct).length
      const pct        = Math.round((correct / total) * 100)
      const comboBonus = calcComboBonus(results)
      const xpEarned   = Math.round((correct * 10 + comboBonus) * xpMultiplier)

      // Detect first-time topic mastery (before saving — masteryPct reflects previous best)
      const prevBest     = masteryPct(topic, subject) ?? 0
      const firstMastery = !!topic && pct >= 85 && prevBest < 85

      // Persist wrong answers for "Practice Mistakes" mode
      const wrongQs = results.filter((r) => !r.correct).map((r) => r.question)
      appendMistakes(wrongQs, subject)

      saveResult({ topic, score, total, correct, pct, subject, lessonIndex })
      markStudied()
      earnXP(xpEarned)
      checkAndEvolve(xp + xpEarned)
      if (pct === 100)       triggerReaction('cheer')
      else if (pct >= 85)    triggerReaction('happy_dance')
      else if (pct <= 30)    triggerReaction('sympathetic')
      else                   triggerReaction('root_for_you')
      // Quest progress
      updateQuestProgress('answer_correct', correct)
      updateQuestProgress('complete_quiz')
      if (route.params?.isMistakesPractice) updateQuestProgress('complete_mistakes')
      navigation.replace('Results', {
        score, total, results, bestStreak, topic, subject,
        xpEarned, comboBonus, firstMastery, masteredTopic: topic ?? null,
        lessonIndex,
      })
    }
  }, [phase])

  if (!currentQuestion) return null

  const correctIdx  = currentQuestion.correct ?? currentQuestion.correctIndex
  const isCorrect   = selected !== null && selected !== 'timeout' && selected === correctIdx
  const correctText = currentQuestion.choices?.[correctIdx] ?? ''
  const combo       = isCorrect ? comboInfo(streak) : null
  const s           = makeStyles(C, insets)

  function choiceStyle(idx) {
    if (phase === 'answering') {
      return [s.choice, selected === idx && s.choiceSelected]
    }
    if (idx === correctIdx) return [s.choice, s.choiceCorrect]
    if (idx === selected && idx !== correctIdx) return [s.choice, s.choiceWrong]
    return [s.choice, s.choiceDim]
  }

  function letterBgColor(idx) {
    if (phase === 'answering') {
      return selected === idx ? C.brand : LETTER_COLORS[idx]
    }
    if (idx === correctIdx) return C.correct
    if (idx === selected)   return C.wrong
    return LETTER_COLORS[idx]
  }

  return (
    <View style={s.root}>
      <SafeAreaView style={s.safe} edges={['top']}>
        {/* ── Top row ── */}
        <View style={s.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.closeBtn}>
            <Text style={s.closeBtnText}>✕</Text>
          </TouchableOpacity>

          <View style={s.progressWrap}>
            <View style={s.progressBg}>
              <View style={[s.progressFill, { width: `${(index / total) * 100}%` }]} />
            </View>
          </View>

          <View style={s.scoreChip}>
            <Text style={[T.body, { color: C.warn }]}>⭐ {score}</Text>
            {streak >= 2 && (
              <Text style={[T.small, { color: '#FF9600', marginLeft: 4 }]}>🔥{streak}</Text>
            )}
          </View>
        </View>

        {/* Timer bar */}
        <View style={s.timerBg}>
          <View style={[
            s.timerFill,
            { width: `${(timeLeft / timerMax) * 100}%`,
              backgroundColor: timeLeft > 10 ? C.brand : timeLeft > 5 ? C.warn : C.wrong },
          ]} />
        </View>

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          <Text style={[T.label, { color: C.textMuted, textAlign: 'center', marginBottom: 12 }]}>
            {index + 1} of {total}
          </Text>

          <Animated.View style={[s.questionCard, cardShadow(C.shadow), { transform: [{ scale: pulseAnim }] }]}>
            {currentQuestion.context ? (
              <Text style={[T.small, { color: C.textMuted, marginBottom: 8, fontStyle: 'italic', lineHeight: 18 }]}>
                {currentQuestion.context}
              </Text>
            ) : null}
            {currentQuestion.image ? (
              <Image
                source={{ uri: `${CDN_BASE}${currentQuestion.image}` }}
                style={s.questionImage}
                resizeMode="contain"
              />
            ) : null}
            <Text style={[T.h3, { color: C.text, lineHeight: 26 }]}>{currentQuestion.text}</Text>
          </Animated.View>

          <View style={s.choices}>
            {currentQuestion.choices.map((choice, idx) => (
              <TouchableOpacity
                key={idx}
                style={choiceStyle(idx)}
                onPress={() => phase === 'answering' && answer(idx)}
                activeOpacity={0.75}
                disabled={phase !== 'answering'}
              >
                <View style={[s.letterBadge, { backgroundColor: letterBgColor(idx) }]}>
                  <Text style={s.letterText}>{LETTERS[idx]}</Text>
                </View>
                <Text style={[T.body, { flex: 1, color: C.text }]}>{choice}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 200 }} />
        </ScrollView>
      </SafeAreaView>

      {/* ── Slide-up feedback panel ── */}
      {(phase === 'feedback' || (phase === 'answering' && selected === 'timeout')) && (
        <Animated.View
          style={[
            s.feedbackPanel,
            {
              backgroundColor: isCorrect ? C.correctBg : C.wrongBg,
              borderTopColor:  isCorrect ? C.brand     : C.wrong,
              transform: [{ translateY: slideAnim }],
              paddingBottom: insets.bottom + 16,
            },
          ]}
        >
          {/* Header row: result + combo badge */}
          <View style={s.feedbackHeader}>
            <Text style={[T.h2, { color: isCorrect ? C.correct : C.wrong }]}>
              {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
            </Text>

            {/* 🔥 Combo badge */}
            {combo && (
              <Animated.View
                style={[
                  s.comboBadge,
                  { backgroundColor: combo.color + '22',
                    borderColor: combo.color + '55',
                    transform: [
                      { scale: comboAnim.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0.5, 1.15, 1] }) },
                    ],
                    opacity: comboAnim,
                  },
                ]}
              >
                <Text style={[T.label, { color: combo.color, textTransform: 'none', letterSpacing: 0 }]}>
                  🔥 {combo.label}
                </Text>
                <Text style={[T.label, { color: combo.color, marginLeft: 4 }]}>
                  {combo.mult}
                </Text>
              </Animated.View>
            )}
          </View>

          {!isCorrect && correctText ? (
            <Text style={[T.body, { color: C.wrong, marginBottom: 8, marginTop: 2 }]}>
              Correct answer: {correctText}
            </Text>
          ) : null}
          {currentQuestion.explanation ? (
            <Text style={[T.small, { color: C.textMuted, marginBottom: 16, lineHeight: 20, marginTop: 4 }]}>
              {currentQuestion.explanation}
            </Text>
          ) : <View style={{ height: 16 }} />}

          <TouchableOpacity
            style={duoBtn(isCorrect ? C.brand : C.wrong, isCorrect ? C.brandDark : C.wrongDark)}
            onPress={nextQuestion}
          >
            <Text style={[T.btn, { color: '#fff' }]}>
              {index + 1 === total ? 'SEE RESULTS' : 'CONTINUE'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* ── Mini pet study-along overlay ── */}
      <View style={s.miniPetWrap} pointerEvents="box-none">
        <TouchableOpacity
          onPress={() => { setShowBubble(true); setTimeout(() => setShowBubble(false), 2200) }}
          activeOpacity={0.9}
        >
          <PetWidget mini size={56} />
        </TouchableOpacity>
        {showBubble && (
          <View style={[s.bubble, { backgroundColor: '#fff' }]}>
            <Text style={s.bubbleText}>{getPetMessage() ?? 'You got this! 💪'}</Text>
          </View>
        )}
      </View>

      {/* ── No-lives gate — reactive overlay, auto-dismisses when lives > 0 ── */}
      {lives === 0 && (
        <NoLivesGate
          C={C}
          s={s}
          insets={insets}
          nextRefillAt={nextRefillAt}
          adReady={adReady}
          onWatchAd={showAd}
          onRefill={() => refillLives(spendXP)}
          onGoBack={() => navigation.goBack()}
        />
      )}
    </View>
  )
}

// ── No-lives overlay ──────────────────────────────────────────────────────────
function NoLivesGate({ C, s, insets, nextRefillAt, adReady, onWatchAd, onRefill, onGoBack }) {
  const ms  = nextRefillAt ? Math.max(0, new Date(nextRefillAt).getTime() - Date.now()) : 0
  const min = Math.ceil(ms / 60_000)

  const scaleAnim = useRef(new Animated.Value(0.85)).current
  const opAnim    = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, tension: 130, friction: 8, useNativeDriver: true }),
      Animated.timing(opAnim,    { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start()
  }, [])

  return (
    <View style={[StyleSheet.absoluteFill, s.gateBackdrop]}>
      <Animated.View style={[s.gateCard, { opacity: opAnim, transform: [{ scale: scaleAnim }], paddingBottom: insets.bottom + 16 }]}>

        <Text style={{ fontSize: 52, textAlign: 'center', marginBottom: 8 }}>💔</Text>
        <Text style={[T.h2, { color: C.text, textAlign: 'center' }]}>Out of Lives!</Text>
        <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 6, marginBottom: 24 }]}>
          {min > 0
            ? `Next life in ${min}m — or get one now.`
            : 'Your next life is almost ready — or get one now.'}
        </Text>

        {/* Watch ad — primary CTA */}
        {adReady ? (
          <TouchableOpacity
            style={[s.gateBtn, { backgroundColor: C.brand }]}
            onPress={onWatchAd}
            activeOpacity={0.85}
          >
            <Text style={[T.btn, { color: '#fff' }]}>▶  Watch Ad  (+1 ❤️)</Text>
          </TouchableOpacity>
        ) : (
          <View style={[s.gateBtn, { backgroundColor: C.surface2 }]}>
            <Text style={[T.btn, { color: C.textMuted }]}>Loading ad…</Text>
          </View>
        )}

        {/* Refill with XP */}
        <TouchableOpacity
          style={[s.gateBtn, { backgroundColor: C.warnBg, borderWidth: 1, borderColor: C.warn + '60', marginTop: 10 }]}
          onPress={onRefill}
          activeOpacity={0.85}
        >
          <Text style={[T.btn, { color: C.warn }]}>⭐ Refill All (300 XP)</Text>
        </TouchableOpacity>

        {/* Go back */}
        <TouchableOpacity style={s.gateLinkBtn} onPress={onGoBack}>
          <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>
            Save progress &amp; go back
          </Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  )
}

function makeStyles(C, insets) {
  return StyleSheet.create({
    root:          { flex: 1, backgroundColor: C.bg },
    safe:          { flex: 1 },
    topRow:        { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8, gap: 10 },
    closeBtn:      { width: 36, height: 36, borderRadius: 18, backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center' },
    closeBtnText:  { fontSize: 15, color: C.textMuted, fontFamily: 'Nunito_700Bold' },
    progressWrap:  { flex: 1 },
    progressBg:    { height: 10, backgroundColor: C.surface2, borderRadius: 5, overflow: 'hidden' },
    progressFill:  { height: 10, backgroundColor: C.brand, borderRadius: 5 },
    scoreChip:     { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface2, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
    timerBg:       { height: 5, backgroundColor: C.surface2, marginHorizontal: 16, borderRadius: 3, marginBottom: 8 },
    timerFill:     { height: 5, borderRadius: 3 },
    scroll:        { padding: 16 },
    questionCard:  { backgroundColor: C.surface, borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: C.border },
    questionImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 12, backgroundColor: C.surface2 },
    choices:       { gap: 10 },
    choice: {
      flexDirection:  'row',
      alignItems:     'center',
      backgroundColor: C.surface,
      borderRadius:   16,
      padding:        14,
      gap:            12,
      borderWidth:    2.5,
      borderColor:    C.border,
    },
    choiceSelected: { borderColor: C.brand, backgroundColor: C.brandBg },
    choiceCorrect:  { borderColor: C.correct, backgroundColor: C.correctBg },
    choiceWrong:    { borderColor: C.wrong,   backgroundColor: C.wrongBg },
    choiceDim:      { opacity: 0.35 },
    letterBadge:    { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    letterText:     { fontFamily: 'Nunito_900Black', fontSize: 14, color: '#fff' },

    // No-lives gate
    gateBackdrop:   { backgroundColor: 'rgba(0,0,0,0.72)', justifyContent: 'flex-end', zIndex: 200 },
    gateCard:       { backgroundColor: C.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingTop: 28 },
    gateBtn:        { borderRadius: 16, paddingVertical: 15, alignItems: 'center' },
    gateLinkBtn:    { alignItems: 'center', paddingVertical: 16 },

    miniPetWrap: {
      position:   'absolute',
      bottom:     160,
      right:      16,
      alignItems: 'flex-end',
      zIndex:     50,
    },
    bubble: {
      position:     'absolute',
      bottom:       58,
      right:        0,
      borderRadius: 12,
      padding:      10,
      maxWidth:     200,
      borderWidth:  1,
      borderColor:  '#E5E7EB',
      shadowColor:  '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation:    4,
    },
    bubbleText: { fontSize: 12, color: '#374151', lineHeight: 16 },

    feedbackPanel: {
      position:             'absolute',
      bottom:               0, left: 0, right: 0,
      borderTopLeftRadius:  24,
      borderTopRightRadius: 24,
      borderTopWidth:       3,
      padding:              20,
    },
    feedbackHeader: {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'space-between',
      marginBottom:   4,
      flexWrap:       'wrap',
      gap:            8,
    },
    comboBadge: {
      flexDirection:  'row',
      alignItems:     'center',
      borderRadius:   12,
      borderWidth:    1.5,
      paddingHorizontal: 10,
      paddingVertical:    5,
    },
  })
}
