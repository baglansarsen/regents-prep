import React, { useRef, useEffect, useState, useCallback } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView,
  Animated, StyleSheet, Image, TextInput, Keyboard, ActivityIndicator, Modal,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useProgress } from '../hooks/useProgress'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useRP } from '../hooks/useRP'
import { useLivesContext } from '../context/LivesContext'
import { useRewardedAd } from '../hooks/useRewardedAd'
import { useQuiz } from '../hooks/useQuiz'
import { useTutor } from '../hooks/useTutor'
import { useSubscription } from '../context/SubscriptionContext'
import { appendMistakes, resolveCorrect } from '../hooks/useMistakes'
import { useDoubleRP } from '../context/DoubleRPContext'
import { usePetContext } from '../context/PetContext'
import { useSpeechContext } from '../context/SpeechContext'
import { T, duoBtn, cardShadow } from '../styles/duo'
import PetWidget from '../components/PetWidget'
import StudyBuddyCompanion from '../components/StudyBuddyCompanion'
import ReggieMascot from '../components/ReggieMascot'
import { useStudyTime } from '../hooks/useStudyTime'
import { hapticTick, hapticSuccess, hapticWarning } from '../utils/haptics'
import { useQuizSound } from '../hooks/useQuizSound'
import { logActivity } from '../utils/activityLogger'
import { skipUnlocksKey } from '../utils/storageKeys'
import ExamImage from '../components/ExamImage'

const LETTERS = ['A', 'B', 'C', 'D']
const LETTER_COLORS = ['#34B3F1', '#7C5CFC', '#FF9600', '#FF5A5F']

// Combo threshold labels
function comboInfo(streak) {
  if (streak >= 10) return { label: `${streak} in a row!`, mult: '×2.0', color: '#FF5A5F' }
  if (streak >= 5)  return { label: `${streak} in a row!`, mult: '×2.0', color: '#FF5A5F' }
  if (streak >= 3)  return { label: `${streak} in a row!`, mult: '×1.5', color: '#FF9600' }
  if (streak >= 2)  return { label: `${streak} in a row!`, mult: '×1.25', color: '#FF9600' }
  return null
}

export default function QuizScreen({ route, navigation }) {
  const { questionSet, topic, subject, lessonIndex, isChallenge, nextUnitTopic, nextLessonMeta } = route.params
  const { C } = useTheme()
  const insets = useSafeAreaInsets()
  const { user } = useAuthContext()
  const uid = user?.uid

  const { saveResult, isMastered } = useProgress(uid)
  const { rpMultiplier }           = useDoubleRP()
  const { markStudied }          = useDailyStreak(uid)
  const { rp, earnRP, spendRP }  = useRP(uid)
  const { lives, maxLives, nextRefillAt, loseLife, refillLives, addLife } = useLivesContext()
  const { ready: adReady, showAd } = useRewardedAd({ onReward: addLife })
  const { checkAndEvolve, triggerReaction, updateQuestProgress, getPetMessage, studyBoost, pet } = usePetContext()
  const { say } = useSpeechContext()
  const { isSubscribed, isConfigured, presentPaywall } = useSubscription()
  const { playCorrect, playWrong } = useQuizSound()

  const [showBubble,    setShowBubble]    = useState(false)
  const [buddyMessage,  setBuddyMessage]  = useState(null)
  const [petSay,        setPetSay]        = useState(null)   // custom Reggie line (retry / hint)
  const [repeatIntro,   setRepeatIntro]   = useState(false)  // full-screen Reggie before the repeat round

  // Reggie says something in the speech bubble for ~2.4s.
  const dinoSay = useCallback((msg) => {
    setPetSay(msg)
    setShowBubble(true)
    setTimeout(() => { setShowBubble(false); setPetSay(null) }, 2400)
  }, [])

  // ── Study time session tracking ───────────────────────────────────────────
  const sessionSecondsRef = useRef(0)

  const handleMilestone = useCallback((milestone) => {
    setBuddyMessage(milestone.message)
    triggerReaction(milestone.reaction)
    studyBoost?.()
  }, [triggerReaction, studyBoost])

  const { startSession, endSession } = useStudyTime(uid, earnRP, handleMilestone)

  useEffect(() => {
    startSession('quiz')
    return () => {
      const { seconds } = endSession()
      sessionSecondsRef.current = seconds
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    currentQuestion, isWritten, index, total, score, streak, bestStreak,
    selected, lastEarned, phase, results,
    select, check, submitWritten, next: nextQuestion,
    eliminated, hintUsed, takeHint,
    inRepeat, repeatTotal, repeatIndex,
  } = useQuiz(questionSet, { hint: !isChallenge, repeat: !isChallenge })

  const slideAnim  = useRef(new Animated.Value(300)).current
  const pulseAnim  = useRef(new Animated.Value(1)).current
  const comboAnim  = useRef(new Animated.Value(0)).current

  // Pet animation: bounce up on correct, shake left-right on incorrect
  const petBounceY = useRef(new Animated.Value(0)).current
  const petShakeX  = useRef(new Animated.Value(0)).current
  const petScale   = useRef(new Animated.Value(1)).current

  function animatePetCorrect() {
    Animated.sequence([
      Animated.spring(petBounceY, { toValue: -14, useNativeDriver: true, tension: 400, friction: 6 }),
      Animated.spring(petBounceY, { toValue: -6,  useNativeDriver: true, tension: 300, friction: 5 }),
      Animated.spring(petBounceY, { toValue: -11, useNativeDriver: true, tension: 400, friction: 6 }),
      Animated.spring(petBounceY, { toValue: 0,   useNativeDriver: true, tension: 200, friction: 8 }),
    ]).start()
    Animated.sequence([
      Animated.spring(petScale, { toValue: 1.25, useNativeDriver: true, tension: 400, friction: 5 }),
      Animated.spring(petScale, { toValue: 1.0,  useNativeDriver: true, tension: 200, friction: 8 }),
    ]).start()
  }

  function animatePetIncorrect() {
    Animated.sequence([
      Animated.timing(petShakeX, { toValue:  8, duration: 50, useNativeDriver: true }),
      Animated.timing(petShakeX, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(petShakeX, { toValue:  6, duration: 50, useNativeDriver: true }),
      Animated.timing(petShakeX, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(petShakeX, { toValue:  3, duration: 50, useNativeDriver: true }),
      Animated.timing(petShakeX, { toValue:  0, duration: 50, useNativeDriver: true }),
    ]).start()
    Animated.sequence([
      Animated.spring(petScale, { toValue: 0.85, useNativeDriver: true, tension: 400, friction: 5 }),
      Animated.spring(petScale, { toValue: 1.0,  useNativeDriver: true, tension: 200, friction: 8 }),
    ]).start()
  }

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
  // A timeout is a failed question too — it breaks the streak and is logged as
  // a mistake, so it must also cost a life (otherwise walking away is "free").
  useEffect(() => {
    if (phase === 'feedback' && selected !== null) {
      const correctIdx = currentQuestion?.correct ?? currentQuestion?.correctIndex
      const wasCorrect = selected === correctIdx
      if (wasCorrect) {
        hapticSuccess()
        playCorrect()
        triggerReaction('cheer')
        animatePetCorrect()
      } else {
        hapticWarning()
        playWrong()
        if (!inRepeat) loseLife()   // the end-of-lesson repeat round costs no hearts
        triggerReaction('sad')
        animatePetIncorrect()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // ── Entering the end-of-lesson repeat round → full-screen Reggie cue ──────
  useEffect(() => {
    if (inRepeat) setRepeatIntro(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inRepeat])

  // ── Card pulse on new question ────────────────────────────────────────────
  useEffect(() => {
    Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.02, duration: 80, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1,    duration: 80, useNativeDriver: true }),
    ]).start()
  }, [index])

  // ── Quiz done: award RP with combo bonus ──────────────────────────────────
  useEffect(() => {
    if (phase === 'done') {
      // The open-ended capstone is a non-graded reflection — exclude it from
      // every scoring computation (%, mastery, mistakes, results total) so it
      // never drags the lesson score down or re-enters Mistakes Practice.
      const graded     = results.filter((r) => !r.written)
      const gradedTotal = graded.length || 1
      const correct    = graded.filter((r) => r.correct).length
      const mistakes   = gradedTotal - correct
      const pct        = Math.round((correct / gradedTotal) * 100)
      // `score` already bakes in speed + streak multipliers, so it IS the RP.
      const rpEarned   = Math.round(score * rpMultiplier)
      const doubleRP   = rpMultiplier > 1

      // First-time mastery = consistency rule flips from false → true with this
      // attempt included (isMastered = 85%+ on 2 of the last 3 attempts).
      const firstMastery = !!topic && isMastered(topic, subject, pct) && !isMastered(topic, subject)

      // Challenge passed with ≤3 mistakes → unlock next unit immediately
      const challengeUnlocked = isChallenge && !!nextUnitTopic && mistakes <= 3
      if (challengeUnlocked) {
        const AsyncStorage = require('@react-native-async-storage/async-storage').default
        const key = skipUnlocksKey(subject)
        AsyncStorage.getItem(key).then((val) => {
          const arr = val ? JSON.parse(val) : []
          if (!arr.includes(nextUnitTopic)) {
            arr.push(nextUnitTopic)
            return AsyncStorage.setItem(key, JSON.stringify(arr))
          }
        }).catch(() => {})
      }

      // Persist wrong answers for "Practice Mistakes" mode — graded only, so the
      // choice-less written question is never re-queued into a MC-only mode.
      const wrongQs = graded.filter((r) => !r.correct).map((r) => r.question)
      appendMistakes(wrongQs, subject)
      // Self-clearing review queue: a correct answer advances/retires the item.
      const correctQs = graded.filter((r) => r.correct).map((r) => r.question)
      resolveCorrect(correctQs, subject)

      saveResult({ topic, score, total: gradedTotal, correct, pct, subject, lessonIndex })
      markStudied()
      // Evolve against the authoritative post-award total, not the stale `xp` state
      earnRP(rpEarned).then((newTotal) => checkAndEvolve(newTotal ?? rp + rpEarned))

      // Log quiz completion activity
      logActivity(uid, 'quiz_complete', `Completed quiz: ${topic ?? subject} (${pct}%)`, {
        topic, subject, pct, correct, total: gradedTotal, rpEarned, mastered: firstMastery, challenge: isChallenge,
      })

      if (challengeUnlocked)   { triggerReaction('cheer');        say(`⚡ Challenge passed! Next unit unlocked 🔓`) }
      else if (pct === 100)    { triggerReaction('cheer');        say(`Perfect score! +${rpEarned} ⭐ You're incredible 🎉`) }
      else if (pct >= 85)      { triggerReaction('happy_dance');  say(`+${rpEarned} ⭐ RP! Really solid work 🌟`) }
      else if (pct <= 30)      { triggerReaction('sympathetic');  say('Tough one. Review those and try again 💪') }
      else                     { triggerReaction('root_for_you'); say(`+${rpEarned} ⭐ You're on a roll!`) }
      // Quest progress — award the daily-quest RP when one completes. Only the
      // call matching the active quest returns { rp }, and the hook's alreadyDone
      // guard pays it out once, so awarding from each result is safe (no double-grant).
      const awardQuest = (r) => { if (r?.rp) earnRP(r.rp) }
      updateQuestProgress('answer_correct', correct).then(awardQuest)
      updateQuestProgress('complete_quiz', 1, { topic }).then(awardQuest)   // topic lets smart topic-quests match
      if (route.params?.isMistakesPractice) updateQuestProgress('complete_mistakes').then(awardQuest)
      const { seconds: sessionSecs } = endSession()
      navigation.replace('Results', {
        score, total: gradedTotal, results, bestStreak, topic, subject,
        rpEarned, doubleRP, firstMastery, masteredTopic: topic ?? null,
        lessonIndex, challengeUnlocked, unlockedTopic: nextUnitTopic ?? null,
        nextLessonMeta: nextLessonMeta ?? null,
        sessionTime: sessionSecs,
      })
    }
  }, [phase])

  if (!currentQuestion) return null

  const correctIdx  = currentQuestion.correct ?? currentQuestion.correctIndex
  const isCorrect   = selected !== null && selected === correctIdx
  const correctText = currentQuestion.choices?.[correctIdx] ?? ''
  const combo       = isCorrect ? comboInfo(streak) : null
  const s           = makeStyles(C, insets)

  function choiceStyle(idx) {
    if (phase === 'answering') {
      // Crossed-out (hint or first-wrong) choices show wrong + dimmed and are disabled.
      if (eliminated?.includes(idx)) return [s.choice, s.choiceWrong, s.choiceDim]
      return [s.choice, selected === idx && s.choiceSelected]
    }
    if (idx === correctIdx) return [s.choice, s.choiceCorrect]
    if (idx === selected && idx !== correctIdx) return [s.choice, s.choiceWrong]
    return [s.choice, s.choiceDim]
  }

  function letterBgColor(idx) {
    if (phase === 'answering') {
      if (eliminated?.includes(idx)) return C.wrong
      return selected === idx ? C.brand : LETTER_COLORS[idx]
    }
    if (idx === correctIdx) return C.correct
    if (idx === selected)   return C.wrong
    return LETTER_COLORS[idx]
  }

  return (
    <View style={s.root}>
      {/* Full-screen Reggie intro before the end-of-lesson repeat round */}
      <Modal visible={repeatIntro} transparent animationType="fade" onRequestClose={() => setRepeatIntro(false)}>
        <View style={s.repeatIntroBackdrop}>
          <ReggieMascot size={180} />
          <Text style={s.repeatIntroTitle}>Let's fix those mistakes!</Text>
          <Text style={s.repeatIntroSub}>
            We'll go back through the {repeatTotal === 1 ? 'one you missed' : `${repeatTotal} you missed`} — one more try each.
          </Text>
          <TouchableOpacity
            style={s.repeatIntroBtn}
            onPress={() => setRepeatIntro(false)}
            activeOpacity={0.85}
          >
            <Text style={[T.btn, { color: '#fff' }]}>Let's go! 🦕</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <SafeAreaView style={s.safe} edges={[]}>
        {/* ── Top row ── */}
        <View style={s.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.closeBtn}>
            <Text style={s.closeBtnText}>✕</Text>
          </TouchableOpacity>

          <View style={s.progressWrap}>
            <View style={s.progressBg}>
              <View style={[s.progressFill, {
                width: inRepeat
                  ? `${repeatTotal ? (repeatIndex / repeatTotal) * 100 : 0}%`
                  : `${(index / total) * 100}%`,
              }]} />
            </View>
            {/* Hearts inline under progress bar — premium has unlimited (∞) */}
            <View style={s.heartsRow}>
              {isSubscribed ? (
                <Text style={s.heart}>❤️ ∞</Text>
              ) : (
                Array.from({ length: maxLives }).map((_, i) => (
                  <Text key={i} style={[s.heart, { opacity: i < lives ? 1 : 0.2 }]}>❤️</Text>
                ))
              )}
            </View>
          </View>

          {/* Pet + score side-by-side */}
          <View style={s.topRightCol}>
            <Animated.View style={{
              transform: [
                { translateY: petBounceY },
                { translateX: petShakeX },
                { scale: petScale },
              ],
            }}>
              <TouchableOpacity
                onPress={() => { setShowBubble(true); setTimeout(() => setShowBubble(false), 2200) }}
                activeOpacity={0.85}
              >
                <PetWidget mini size={44} />
              </TouchableOpacity>
            </Animated.View>
            <View style={s.scoreChip}>
              <Text style={[T.body, { color: C.warn }]}>⭐ {score}</Text>
              {streak >= 2 && (
                <Text style={[T.small, { color: '#FF9600', marginLeft: 4 }]}>🔥{streak}</Text>
              )}
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          {inRepeat && (
            <View style={s.repeatBanner}>
              <Text style={s.repeatBannerText}>🦕  Reviewing your misses — get each one right to finish</Text>
            </View>
          )}
          <Animated.View style={[s.questionCard, cardShadow(C.shadow), { transform: [{ scale: pulseAnim }] }]}>
            {currentQuestion.context ? (
              <Text style={[T.small, { color: C.textMuted, marginBottom: 8, fontStyle: 'italic', lineHeight: 18 }]}>
                {currentQuestion.context}
              </Text>
            ) : null}
            {currentQuestion.image ? (
              <ExamImage path={currentQuestion.image} style={s.questionImage} />
            ) : null}
            <Text style={[T.h3, { color: C.text, lineHeight: 26 }]}>{currentQuestion.text}</Text>
          </Animated.View>

          {isWritten ? (
            <WrittenAnswerBlock
              key={index}
              question={currentQuestion}
              C={C}
              s={s}
              onSubmit={(gotIt) => { submitWritten({ gotIt }); nextQuestion() }}
              isLast={index + 1 === total}
            />
          ) : (
            <View style={s.choices}>
              {/* 50/50 hint — Reggie crosses out two wrong choices (lessons only) */}
              {phase === 'answering' && !isChallenge && !hintUsed && (currentQuestion.choices?.length ?? 0) > 2 && (
                <TouchableOpacity
                  style={s.hintBtn}
                  onPress={() => { takeHint(); dinoSay('Here, I crossed two out! 🦕') }}
                  activeOpacity={0.85}
                >
                  <Text style={s.hintText}>💡 Hint — cross out two</Text>
                </TouchableOpacity>
              )}
              {currentQuestion.choices.map((choice, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={choiceStyle(idx)}
                  onPress={() => { if (phase !== 'answering' || eliminated?.includes(idx)) return; hapticTick(); select(idx) }}
                  activeOpacity={0.75}
                  disabled={phase !== 'answering' || eliminated?.includes(idx)}
                >
                  <View style={[s.letterBadge, { backgroundColor: letterBgColor(idx) }]}>
                    <Text style={s.letterText}>{LETTERS[idx]}</Text>
                  </View>
                  <Text style={[T.body, { flex: 1, color: C.text }]}>{choice}</Text>
                </TouchableOpacity>
              ))}

              {/* Tap-to-confirm: a choice highlights on tap; CHECK submits it. */}
              {phase === 'answering' && (
                <TouchableOpacity
                  style={[duoBtn(C.brand, C.brandDark, { marginTop: 6 }), selected == null && { opacity: 0.4 }]}
                  onPress={() => { if (selected == null) return; hapticTick(); check() }}
                  disabled={selected == null}
                  activeOpacity={0.85}
                >
                  <Text style={[T.btn, { color: '#fff' }]}>CHECK</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <View style={{ height: 200 }} />
        </ScrollView>
      </SafeAreaView>

      {/* ── Slide-up feedback panel ── */}
      {phase === 'feedback' && (
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
          {(currentQuestion.explanation || currentQuestion.diveDeep) ? (
            <ExplanationBlock question={currentQuestion} C={C} />
          ) : <View style={{ height: 16 }} />}

          {!isCorrect && selected !== null && (
            <TutorButton
              question={currentQuestion}
              wrongIdx={selected}
              say={say}
              C={C}
              isSubscribed={isSubscribed}
              isConfigured={isConfigured}
              onUpgrade={presentPaywall}
            />
          )}

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

      {/* Speech bubble from top-bar pet tap */}
      {showBubble && (
        <View style={[s.bubble, { backgroundColor: C.surface }]} pointerEvents="none">
          <Text style={[s.bubbleText, { color: C.text }]}>{petSay ?? getPetMessage() ?? 'You got this! 💪'}</Text>
        </View>
      )}


      {/* ── No-lives gate — reactive overlay, auto-dismisses when lives > 0 ── */}
      {lives === 0 && (
        <NoLivesGate
          C={C}
          s={s}
          insets={insets}
          nextRefillAt={nextRefillAt}
          adReady={adReady}
          onWatchAd={showAd}
          onRefill={() => refillLives(spendRP)}
          onGoBack={() => navigation.goBack()}
          showPremium={isConfigured && !isSubscribed}
          onGoPremium={presentPaywall}
        />
      )}
    </View>
  )
}

// ── AI tutor: "Why was I wrong?" ──────────────────────────────────────────────
// Calls the grounded explainMistake Cloud Function. The pet voices the nudge;
// the full why-wrong/why-right explanation reveals inline.
function TutorButton({ question, wrongIdx, say, C, isSubscribed, isConfigured, onUpgrade }) {
  const { loading, data, error, explain } = useTutor()

  // Premium gate: non-subscribers see an upsell that opens the paywall directly.
  // (Falls back to a spoken nudge on web / Expo Go where the paywall isn't available.)
  if (!isSubscribed) {
    return (
      <TouchableOpacity
        onPress={() => {
          if (isConfigured && onUpgrade) onUpgrade()
          else say('💜 AI explanations are a Premium feature — unlock Premium in your Profile.')
        }}
        style={{
          marginBottom: 12, paddingVertical: 12, borderRadius: 12,
          borderWidth: 1.5, borderColor: C.purple, alignItems: 'center',
          flexDirection: 'row', justifyContent: 'center', gap: 8,
          backgroundColor: C.purple + '12',
        }}
      >
        <Text style={[T.btn, { color: C.purple }]}>💜 Unlock “Why was I wrong?” with Premium</Text>
      </TouchableOpacity>
    )
  }

  const onPress = async () => {
    const res = await explain(question, wrongIdx)
    if (res?.nudge) say(`🤔 ${res.nudge}`)
    else if (!res) say('Hmm, I couldn’t load that explanation — try again in a moment.')
  }

  if (data) {
    return (
      <View style={{ marginBottom: 12, padding: 12, borderRadius: 12, backgroundColor: C.surface }}>
        <Text style={[T.label, { color: C.brand, marginBottom: 6 }]}>🤔 Coach</Text>
        <Text style={[T.body, { color: C.text, marginBottom: data.method ? 8 : 0 }]}>
          {data.explanation}
        </Text>
        {data.method ? (
          <Text style={[T.body, { color: C.textDim, fontStyle: 'italic' }]}>{data.method}</Text>
        ) : null}
      </View>
    )
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{
        marginBottom: 12, paddingVertical: 12, borderRadius: 12,
        borderWidth: 1.5, borderColor: C.brand, alignItems: 'center',
        flexDirection: 'row', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1,
      }}
    >
      {loading && <ActivityIndicator size="small" color={C.brand} />}
      <Text style={[T.btn, { color: C.brand }]}>
        {loading ? 'Thinking…' : error ? 'Try again' : '🤔 Why was I wrong?'}
      </Text>
    </TouchableOpacity>
  )
}

// ── Explanation + Dive Deeper ─────────────────────────────────────────────────
function ExplanationBlock({ question, C }) {
  const [showDeep, setShowDeep] = useState(false)
  return (
    <View style={{ marginBottom: 16, marginTop: 4 }}>
      <Text style={[T.small, { color: C.textMuted, lineHeight: 20 }]}>
        {question.explanation}
      </Text>
      {question.diveDeep ? (
        showDeep ? (
          <View style={{
            marginTop: 14,
            backgroundColor: C.surface,
            borderRadius: 14,
            padding: 16,
            borderWidth: 1.5,
            borderColor: C.brand + '55',
            borderLeftWidth: 4,
            borderLeftColor: C.brand,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ fontSize: 18 }}>🔍</Text>
                <Text style={[T.label, { color: C.brand, fontSize: 13, letterSpacing: 1 }]}>DIVE DEEPER</Text>
              </View>
              <TouchableOpacity onPress={() => setShowDeep(false)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={{ fontSize: 16, color: C.textMuted }}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={[T.body, { color: C.text, lineHeight: 23, fontSize: 15 }]}>{question.diveDeep}</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setShowDeep(true)}
            activeOpacity={0.75}
            style={{
              alignSelf: 'flex-start',
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              borderWidth: 1,
              borderColor: C.brand + '55',
              backgroundColor: C.brand + '18',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Text style={{ fontSize: 14 }}>🔍</Text>
            <Text style={[T.label, { color: C.brand, textTransform: 'none', letterSpacing: 0, fontSize: 13 }]}>Dive Deeper</Text>
          </TouchableOpacity>
        )
      ) : null}
    </View>
  )
}

// ── Open-ended capstone: write → reveal model answer → self-assess ────────────
function WrittenAnswerBlock({ question, C, s, onSubmit, isLast }) {
  const [text, setText]         = useState('')
  const [revealed, setRevealed] = useState(false)

  function reveal() {
    Keyboard.dismiss()
    setRevealed(true)
  }

  return (
    <View style={s.written}>
      {!revealed ? (
        <>
          <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0, marginBottom: 8 }]}>
            ✍️ Write your answer, then reveal the model answer to check yourself.
          </Text>
          <TextInput
            style={[s.writtenInput, { color: C.text, borderColor: C.border, backgroundColor: C.surface }]}
            multiline
            placeholder="Type your answer here…"
            placeholderTextColor={C.textMuted}
            value={text}
            onChangeText={setText}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={duoBtn(C.brand, C.brandDark, { marginTop: 14 })}
            onPress={reveal}
            activeOpacity={0.85}
          >
            <Text style={[T.btn, { color: '#fff' }]}>🔍 Reveal Model Answer</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Student's own answer, for side-by-side comparison */}
          {text.trim() ? (
            <View style={[s.writtenYourAnswer, { backgroundColor: C.surface2, borderColor: C.border }]}>
              <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0, marginBottom: 4 }]}>
                Your answer
              </Text>
              <Text style={[T.body, { color: C.text, lineHeight: 22 }]}>{text.trim()}</Text>
            </View>
          ) : null}

          {/* Model answer */}
          <View style={[s.writtenModel, { backgroundColor: C.correctBg, borderColor: C.brand + '55', borderLeftColor: C.brand }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Text style={{ fontSize: 16 }}>✅</Text>
              <Text style={[T.label, { color: C.brand, fontSize: 13, letterSpacing: 1 }]}>MODEL ANSWER</Text>
            </View>
            <Text style={[T.body, { color: C.text, lineHeight: 23 }]}>{question.modelAnswer}</Text>
          </View>

          {/* Reuse explanation + Dive Deeper */}
          {(question.explanation || question.diveDeep) ? (
            <ExplanationBlock question={question} C={C} />
          ) : null}

          {/* Self-assessment */}
          <Text style={[T.h3, { color: C.text, marginTop: 4, marginBottom: 10 }]}>Did you get it right?</Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              style={[duoBtn(C.correct, C.brandDark, { flex: 1 })]}
              onPress={() => onSubmit(true)}
              activeOpacity={0.85}
            >
              <Text style={[T.btn, { color: '#fff' }]}>✅ I got it  +10</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[duoBtn(C.surface2, C.border, { flex: 1 })]}
              onPress={() => onSubmit(false)}
              activeOpacity={0.85}
            >
              <Text style={[T.btn, { color: C.textMuted }]}>❌ Not quite</Text>
            </TouchableOpacity>
          </View>
          <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginTop: 12 }]}>
            {isLast ? 'This finishes the lesson — choose one to see your results.' : 'Choose one to continue.'}
          </Text>
        </>
      )}
    </View>
  )
}

// ── No-lives overlay ──────────────────────────────────────────────────────────
function NoLivesGate({ C, s, insets, nextRefillAt, adReady, onWatchAd, onRefill, onGoBack, showPremium, onGoPremium }) {
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

        {/* Refill with RP */}
        <TouchableOpacity
          style={[s.gateBtn, { backgroundColor: C.warnBg, borderWidth: 1, borderColor: C.warn + '60', marginTop: 10 }]}
          onPress={onRefill}
          activeOpacity={0.85}
        >
          <Text style={[T.btn, { color: C.warn }]}>⭐ Refill All (300 RP)</Text>
        </TouchableOpacity>

        {/* Go Premium — unlimited hearts (only when not already subscribed) */}
        {showPremium && (
          <TouchableOpacity
            style={[s.gateBtn, { backgroundColor: C.purple, marginTop: 10 }]}
            onPress={onGoPremium}
            activeOpacity={0.85}
          >
            <Text style={[T.btn, { color: '#fff' }]}>💜 Go Unlimited — never run out</Text>
          </TouchableOpacity>
        )}

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

    // Full-screen Reggie intro before the repeat round
    repeatIntroBackdrop: {
      flex: 1,
      backgroundColor: C.bg,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    repeatIntroTitle: {
      fontSize: 26,
      color: C.text,
      fontFamily: 'Fredoka_600SemiBold',
      textAlign: 'center',
      marginTop: 20,
    },
    repeatIntroSub: {
      fontSize: 15,
      color: C.textMuted,
      fontFamily: 'Nunito_600SemiBold',
      textAlign: 'center',
      marginTop: 10,
      lineHeight: 22,
    },
    repeatIntroBtn: {
      marginTop: 28,
      backgroundColor: C.brand,
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 16,
    },
    topRow:        { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12, gap: 10 },
    closeBtn:      { width: 36, height: 36, borderRadius: 18, backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center' },
    closeBtnText:  { fontSize: 15, color: C.textMuted, fontFamily: 'Nunito_700Bold' },
    progressWrap:  { flex: 1 },
    progressBg:    { height: 14, backgroundColor: C.surface2, borderRadius: 7, overflow: 'hidden' },
    progressFill:  { height: 14, backgroundColor: C.brand, borderRadius: 7 },
    topRightCol:   { flexDirection: 'row', alignItems: 'center', gap: 6 },
    scoreChip:     { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface2, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
    heartsRow:     { flexDirection: 'row', justifyContent: 'flex-start', gap: 3, marginTop: 6 },
    heart:         { fontSize: 13 },
    scroll:        { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16 },
    questionCard:  { backgroundColor: C.surface, borderRadius: 20, padding: 18, marginBottom: 20, borderWidth: 1, borderColor: C.border, borderTopWidth: 3, borderTopColor: C.brand, shadowColor: C.shadow, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 10, elevation: 5 },
    questionImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 12, backgroundColor: C.surface2 },
    choices:       { gap: 12 },
    repeatBanner:  {
      backgroundColor: C.warn + '1A', borderColor: C.warn + '55', borderWidth: 1,
      borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 12,
    },
    repeatBannerText: { fontFamily: 'Fredoka_600SemiBold', fontSize: 13, color: C.warn, textAlign: 'center' },
    hintBtn:       {
      alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center',
      paddingVertical: 8, paddingHorizontal: 14, borderRadius: 99,
      borderWidth: 1.5, borderColor: C.warn, backgroundColor: C.warn + '1A', marginBottom: 4,
    },
    hintText:      { fontFamily: 'Fredoka_600SemiBold', fontSize: 13, color: C.warn },
    choice: {
      flexDirection:  'row',
      alignItems:     'center',
      backgroundColor: C.surface,
      borderRadius:   18,
      padding:        16,
      gap:            14,
      borderWidth:    2,
      borderColor:    C.border,
      shadowColor:    C.shadow,
      shadowOffset:   { width: 0, height: 2 },
      shadowOpacity:  1,
      shadowRadius:   6,
      elevation:      3,
    },
    // Written capstone
    written:          { marginTop: 4 },
    writtenInput: {
      minHeight:       120,
      borderRadius:    16,
      borderWidth:     2,
      padding:         14,
      fontFamily:      'Nunito_600SemiBold',
      fontSize:        15,
      lineHeight:      22,
    },
    writtenYourAnswer: {
      borderRadius:    14,
      borderWidth:     1,
      padding:         14,
      marginBottom:    12,
    },
    writtenModel: {
      borderRadius:    14,
      borderWidth:     1.5,
      borderLeftWidth: 4,
      padding:         16,
      marginBottom:    4,
    },

    choiceSelected: { borderColor: C.brand, backgroundColor: C.brandBg },
    choiceCorrect:  { borderColor: C.correct, backgroundColor: C.correctBg },
    choiceWrong:    { borderColor: C.wrong,   backgroundColor: C.wrongBg },
    choiceDim:      { opacity: 0.35 },
    letterBadge:    { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    letterText:     { fontFamily: 'Fredoka_700Bold', fontSize: 15, color: '#fff' },

    // No-lives gate
    gateBackdrop:   { backgroundColor: 'rgba(0,0,0,0.72)', justifyContent: 'flex-end', zIndex: 200 },
    gateCard:       { backgroundColor: C.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingTop: 28 },
    gateBtn:        { borderRadius: 16, paddingVertical: 15, alignItems: 'center' },
    gateLinkBtn:    { alignItems: 'center', paddingVertical: 16 },

    bubble: {
      position:     'absolute',
      top:          90,
      right:        16,
      borderRadius: 12,
      padding:      10,
      maxWidth:     180,
      borderWidth:  1,
      borderColor:  C.border,
      shadowColor:  '#000',
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation:    6,
      zIndex:       60,
    },
    bubbleText: { fontSize: 12, color: C.text, lineHeight: 16 },

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
