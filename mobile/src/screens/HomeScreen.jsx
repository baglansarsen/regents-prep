import React, { useMemo, useState, useRef, useCallback } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  Dimensions, Alert, Animated, Modal,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useProgress } from '../hooks/useProgress'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useXP } from '../hooks/useXP'
import { useLivesContext } from '../context/LivesContext'
import { useDailyGoal } from '../hooks/useDailyGoal'
import { useMistakes } from '../hooks/useMistakes'
import { useLessonProgress } from '../hooks/useLessonProgress'
import { useUnitUnlocks } from '../hooks/useUnitUnlocks'
import { useFocusEffect } from '@react-navigation/native'
import { SUBJECTS } from '../../../src/data/subjects'
import * as leData from '../../../src/data/living-environment/index'
import * as esData from '../../../src/data/earth-science/index'
import { STRATEGY_CATEGORIES } from '../../../src/data/strategies-meta'
import { T, duoBtn, duoBtnOutline, cardShadow } from '../styles/duo'
import GoalRing from '../components/GoalRing'
import UnitBanner from '../components/UnitBanner'
import PetWidget from '../components/PetWidget'
import PetStatusBars from '../components/PetStatusBars'
import PetTriviaCard from '../components/PetTriviaCard'
import { usePetContext } from '../context/PetContext'
import { FOOD_ITEMS } from '../data/petConfig'

const MILESTONE_GIFTS = {
  3:  { xp: 100,  items: {},                       label: '100 ⭐ XP!' },
  7:  { xp: 250,  items: { apple: 1 },             label: '250 ⭐ XP + 🍎 Apple!' },
  14: { xp: 500,  items: { ramen: 1 },             label: '500 ⭐ XP + 🍜 Ramen!' },
  30: { xp: 1000, items: { sushi: 1, glowAura: 1 }, label: '1000 ⭐ XP + 🍣 Sushi + ✨ Glow Aura!' },
}

const { width } = Dimensions.get('window')
const NODE_SIZE = 84
const ZIGZAG   = 72

export default function HomeScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid

  const { subject } = useSubject()
  const sd = subject === SUBJECTS.EARTH_SCIENCE ? esData : leData

  const { history } = useProgress(uid)
  const { weekDays, streak, studiedToday } = useDailyStreak(uid)
  const { xp, earnXP, spendXP } = useXP(uid)
  const { lives, maxLives, nextRefillAt, refillLives } = useLivesContext()

  const subjectHistory = useMemo(
    () => history.filter((h) => (h.subject ?? 'living-environment') === subject),
    [history, subject],
  )

  const { lessonComplete, unitLessonsCompleted } = useLessonProgress(subjectHistory)
  const units = sd.UNITS ?? []
  const { isUnitUnlocked, unitUnlockHint, reloadSkipUnlocks } = useUnitUnlocks(units, lessonComplete, subject)
  useFocusEffect(useCallback(() => {
    reloadSkipUnlocks()
    if (pendingEvolution) navigation.navigate('PetEvolution')

    // Refresh quest data
    getTodayQuest().then(setQuestData).catch(() => {})

    // Streak milestone gifts
    if (uid && streak > 0) {
      ;(async () => {
        const MILESTONES = [3, 7, 14, 30]
        const key        = `@milestoneGiven_v1_${uid}`
        const lastStr    = await AsyncStorage.getItem(key).catch(() => null)
        const last       = parseInt(lastStr || '0')
        const earned     = MILESTONES.filter((m) => streak >= m && m > last)
        if (earned.length === 0) return
        const top  = earned[earned.length - 1]
        const gift = MILESTONE_GIFTS[top]
        await AsyncStorage.setItem(key, String(top)).catch(() => {})
        if (gift.xp)      await earnXP(gift.xp)
        for (const [itemId, qty] of Object.entries(gift.items ?? {})) {
          await addInventory(itemId, qty)
        }
        triggerReaction('celebrate')
        setMilestoneModal({ streak: top, label: gift.label })
      })()
    }
  }, [reloadSkipUnlocks, pendingEvolution, uid, streak]))

  const { goal, setGoal, todayXP, progress: goalProgress, goalMet, GOALS } = useDailyGoal(xp)
  const { mistakes, mistakeCount } = useMistakes()
  const { pet, pendingEvolution, getPetMessage, dailyDig, getTodayQuest, updateQuestProgress, triggerReaction, addInventory } = usePetContext()

  const [selectedLesson,  setSelectedLesson]  = useState(null)
  const [showGoalPicker,  setShowGoalPicker]   = useState(false)
  const [digReward,       setDigReward]        = useState(null)
  const [questData,       setQuestData]        = useState(null)
  const [milestoneModal,  setMilestoneModal]   = useState(null)
  const [tipsUnit,        setTipsUnit]         = useState(null)
  const [expandedTip,     setExpandedTip]      = useState(null)
  const sheetAnim     = useRef(new Animated.Value(400)).current
  const goalSheetAnim = useRef(new Animated.Value(400)).current
  const tipsAnim      = useRef(new Animated.Value(400)).current

  // ── Tips sheet open / close ──────────────────────────────────────────────
  function openTips(unit) {
    if (selectedLesson) closeSheet()
    setTipsUnit(unit)
    setExpandedTip(null)
    tipsAnim.setValue(400)
    Animated.spring(tipsAnim, { toValue: 0, useNativeDriver: true, tension: 120, friction: 9 }).start()
  }

  function closeTips() {
    Animated.timing(tipsAnim, { toValue: 400, duration: 200, useNativeDriver: true }).start(
      () => setTipsUnit(null),
    )
  }

  // ── Goal picker open / close ─────────────────────────────────────────────
  function openGoalPicker() {
    setShowGoalPicker(true)
    goalSheetAnim.setValue(400)
    Animated.spring(goalSheetAnim, { toValue: 0, useNativeDriver: true, tension: 120, friction: 9 }).start()
  }

  function closeGoalPicker() {
    Animated.timing(goalSheetAnim, { toValue: 400, duration: 200, useNativeDriver: true }).start(
      () => setShowGoalPicker(false),
    )
  }

  // ── Sheet open / close ────────────────────────────────────────────────────
  function openSheet(lesson) {
    setSelectedLesson(lesson)
    sheetAnim.setValue(400)
    Animated.spring(sheetAnim, {
      toValue: 0, useNativeDriver: true, tension: 120, friction: 9,
    }).start()
  }

  function closeSheet(cb) {
    Animated.timing(sheetAnim, {
      toValue: 400, duration: 200, useNativeDriver: true,
    }).start(() => { setSelectedLesson(null); cb?.() })
  }

  function selectLesson(lesson) {
    if (selectedLesson?.unit?.id === lesson.unit.id && selectedLesson?.lessonIndex === lesson.lessonIndex) {
      closeSheet(); return
    }
    openSheet(lesson)
  }

  // ── Lives gate ───────────────────────────────────────────────────────────
  function livesGate(onProceed) {
    if (lives > 0) { onProceed(); return }
    const ms  = nextRefillAt ? Math.max(0, new Date(nextRefillAt).getTime() - Date.now()) : 0
    const min = Math.ceil(ms / 60000)
    Alert.alert(
      '🚫 Out of Lives!',
      `Next life in ${min > 0 ? `${min}m` : 'a moment'}, or refill all 5 for 300 ⭐ XP.`,
      [
        { text: 'Refill (300 XP)', onPress: () => refillLives(spendXP).then((ok) => ok && onProceed()) },
        { text: 'Not now', style: 'cancel' },
      ],
    )
  }

  // ── Quiz / Flashcards ────────────────────────────────────────────────────
  function startLesson(unit, lessonIndex) {
    closeSheet(() => {
      livesGate(() => {
        const questionSet = sd.getLessonQuestions(unit.topic, lessonIndex, unit.lessonCount)
        navigation.navigate('Quiz', { questionSet, topic: unit.topic, subject, lessonIndex })
      })
    })
  }

  function startStimulusPractice(unit) {
    const questionSet = sd.getExamContextQuestions(unit.topic)
    livesGate(() => navigation.navigate('Quiz', { questionSet, topic: unit.topic, subject, lessonIndex: null }))
  }

  function startQuiz(topic) {
    const pool = topic ? sd.getByTopic(topic) : sd.questions
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    livesGate(() => navigation.navigate('Quiz', { questionSet: shuffled, topic, subject }))
  }

  function startFlashcards(topic) {
    closeSheet(() => navigation.navigate('Flashcards', { topic, subject }))
  }

  function startStudy(topic) {
    const pool = topic ? sd.getByTopic(topic) : sd.questions
    closeSheet(() => navigation.navigate('Study', { questionSet: pool, subject }))
  }

  function startSkipChallenge(unit, unitIdx) {
    const pool = sd.getByTopic(unit.topic).sort(() => Math.random() - 0.5).slice(0, 15)
    const prev = units[unitIdx - 1]
    navigation.navigate('SkipChallenge', {
      topic: unit.topic,
      prereqTopic: prev?.topic ?? unit.topic,
      questions: pool,
      subject,
    })
  }

  function startPracticeMistakes() {
    if (!mistakeCount) {
      Alert.alert('No mistakes yet! 🎉', 'Complete some quizzes or exams first — wrong answers will appear here.')
      return
    }
    // Filter to current subject, then shuffle; fall back to all subjects if none
    const forSubject = mistakes.filter((q) => (q.subject ?? 'living-environment') === subject)
    const pool = (forSubject.length ? forSubject : mistakes)
      .slice(0, 50)                                  // cap at 50 questions
      .sort(() => Math.random() - 0.5)
    livesGate(() =>
      navigation.navigate('Quiz', { questionSet: pool, topic: null, subject, isMistakesPractice: true }),
    )
  }

  function startSpeedRound() {
    const pool = [...sd.questions].sort(() => Math.random() - 0.5).slice(0, 30)
    navigation.navigate('SpeedRound', { questionSet: pool, subject })
  }

  async function handleDig() {
    const result = await dailyDig()
    if (!result.ok) return
    if (result.type === 'xp') await earnXP(result.amount)
    const label = result.type === 'xp'
      ? `${pet.name} found ⭐ ${result.amount} XP!`
      : `${pet.name} dug up a ${FOOD_ITEMS.find((f) => f.id === result.itemId)?.icon ?? '🎁'}!`
    setDigReward(label)
    setTimeout(() => setDigReward(null), 3000)
  }

  const s = makeStyles(C)

  // ── Within-unit lesson unlock ──────────────────────────────────────────────
  function isLessonUnlocked(unit, lessonIndex) {
    if (lessonIndex === 0) return true
    if (lessonIndex < unit.lessonCount) return lessonComplete(unit.topic, lessonIndex - 1)
    return unitLessonsCompleted(unit.topic, unit.lessonCount) >= unit.lessonCount
  }

  // ── Path items: interleave banners + lesson nodes ──────────────────────────
  const pathItems = []
  units.forEach((unit, unitIdx) => {
    pathItems.push({ type: 'banner', unit, unitIdx })
    for (let li = 0; li <= unit.lessonCount; li++) {
      pathItems.push({ type: 'lesson', unit, unitIdx, lessonIndex: li, isChallenge: li === unit.lessonCount })
    }
    if ((sd.getExamContextQuestions(unit.topic) ?? []).length > 0) {
      pathItems.push({ type: 'stimulus', unit, unitIdx })
    }
  })

  // Zigzag counter uses only lesson nodes
  let lessonNodeCount = 0

  // ── Sheet derivations ──────────────────────────────────────────────────────
  const sheetUnit       = selectedLesson?.unit
  const sheetLessonIdx  = selectedLesson?.lessonIndex
  const sheetChallenge  = selectedLesson?.isChallenge
  const sheetLabel      = sheetUnit
    ? (sheetChallenge ? `${sheetUnit.title} — Challenge ⚡` : `${sheetUnit.title} — Lesson ${sheetLessonIdx + 1}`)
    : ''
  const sheetDone = sheetUnit != null ? lessonComplete(sheetUnit.topic, sheetLessonIdx) : false

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Greeting + coin balance */}
        <View style={s.header}>
          <View>
            <Text style={[T.h1, { color: C.text }]}>Good {timeOfDay()} 👋</Text>
            <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
              {user?.displayName?.split(' ')[0] ?? 'Student'} · Level {Math.floor(xp / 500) + 1}
            </Text>
          </View>
        </View>

        {/* Week streak dots */}
        <View style={s.weekRow}>
          {weekDays.map((d) => (
            <View
              key={d.date}
              style={[
                s.dayDot,
                d.studied   && { backgroundColor: C.brand, borderColor: C.brandDark },
                d.isToday   && { borderColor: C.brandLight, borderWidth: 2.5 },
              ]}
            >
              <Text style={[T.label, { color: d.studied ? '#fff' : C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>
                {d.dayLabel[0]}
              </Text>
            </View>
          ))}
        </View>

        {/* Daily Goal Ring */}
        <TouchableOpacity
          style={[s.goalCard, cardShadow(C.shadow)]}
          onPress={openGoalPicker}
          activeOpacity={0.85}
        >
          {/* Ring */}
          <GoalRing
            size={72}
            strokeWidth={7}
            progress={goalProgress}
            color={goalMet ? C.correct : C.brand}
            trackColor={C.surface2}
          >
            <Text style={[T.label, { color: C.text, textTransform: 'none', letterSpacing: 0, fontSize: 13 }]}>
              {todayXP}
            </Text>
          </GoalRing>

          {/* Text */}
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={[T.h3, { color: C.text }]}>Daily Goal</Text>
            <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
              {todayXP} / {goal} XP today
            </Text>
            {goalMet
              ? <Text style={[T.small, { color: C.correct, marginTop: 3 }]}>🎯 Goal reached!</Text>
              : <Text style={[T.small, { color: C.textMuted, marginTop: 3 }]}>{goal - todayXP} XP to go</Text>
            }
          </View>

          {/* Tap hint */}
          <Text style={[T.label, { color: C.textDim }]}>TAP TO{'\n'}CHANGE</Text>
        </TouchableOpacity>

        {/* StudyBuddy pet */}
        {pet.chosen && (
          <View style={s.petSection}>
            <PetWidget onLongPress={() => navigation.navigate('PetShop')} />
            <PetStatusBars />

            {/* Personality message */}
            {(() => {
              const daysSince = studiedToday ? 0 : 1
              const msg = getPetMessage({ streak, daysSince })
              if (!msg) return null
              return (
                <View style={[s.petMsgCard, { backgroundColor: C.surface, borderColor: C.border }]}>
                  <Text style={[T.small, { color: C.textMuted, fontStyle: 'italic', lineHeight: 18, textAlign: 'center' }]}>
                    "{msg}"
                  </Text>
                </View>
              )
            })()}

            {/* Daily dig button */}
            <TouchableOpacity
              style={[s.digBtn, { backgroundColor: C.surface, borderColor: C.border }]}
              onPress={handleDig}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 18 }}>🐾</Text>
              <Text style={[T.btn, { color: C.text, fontSize: 13 }]}>Let {pet.name} dig!</Text>
              <Text style={[T.small, { color: C.textMuted }]}>once/day</Text>
            </TouchableOpacity>
            {digReward && (
              <View style={[s.digRewardBanner, { backgroundColor: C.brandBg, borderColor: C.brand }]}>
                <Text style={[T.body, { color: C.brand, textAlign: 'center' }]}>{digReward}</Text>
              </View>
            )}
          </View>
        )}

        {/* Daily quest card */}
        {questData && pet.chosen && (
          <View style={[s.questCard, { backgroundColor: C.surface, borderColor: C.border }]}>
            <View style={s.questHeader}>
              <Text style={{ fontSize: 18 }}>{questData.icon}</Text>
              <Text style={[T.h3, { color: C.text, flex: 1 }]}>{questData.label}</Text>
              {questData.completed
                ? <Text style={[T.label, { color: C.correct }]}>✓ DONE</Text>
                : <Text style={[T.small, { color: C.textMuted }]}>+25 💰</Text>}
            </View>
            <View style={s.questBg}>
              <View style={[s.questFill, {
                width: `${Math.min(100, (questData.progress / questData.goal) * 100)}%`,
                backgroundColor: questData.completed ? C.correct : C.brand,
              }]} />
            </View>
            <Text style={[T.small, { color: C.textMuted, marginTop: 4 }]}>
              {questData.progress}/{questData.goal} completed
            </Text>
          </View>
        )}

        {/* Pet trivia card */}
        <PetTriviaCard />

        {/* Quick actions — 2×2 grid */}
        <View style={s.quickGrid}>
          <TouchableOpacity style={[s.quickBtn, duoBtn(C.brand, C.brandDark)]} onPress={() => startQuiz(null)}>
            <Text style={s.quickIcon}>⚡</Text>
            <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>Quick{'\n'}Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.quickBtn, duoBtn(C.blue, C.blueDark)]} onPress={startSpeedRound}>
            <Text style={s.quickIcon}>🏃</Text>
            <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>Speed{'\n'}Round</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.quickBtn, duoBtn(C.purple, C.purpleDark)]} onPress={() => startFlashcards(null)}>
            <Text style={s.quickIcon}>🃏</Text>
            <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>Flash{'\n'}Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.quickBtn, duoBtn('#B45309', '#92400E')]}
            onPress={startPracticeMistakes}
          >
            {/* Badge showing mistake count */}
            {mistakeCount > 0 && (
              <View style={s.mistakeBadge}>
                <Text style={s.mistakeBadgeText}>{mistakeCount > 99 ? '99+' : mistakeCount}</Text>
              </View>
            )}
            <Text style={s.quickIcon}>📕</Text>
            <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>Practice{'\n'}Mistakes</Text>
          </TouchableOpacity>
        </View>

        {/* ── DUOLINGO UNIT PATH ── */}
        <View style={s.pathContainer}>
          {pathItems.map((item) => {
            if (item.type === 'banner') {
              const { unit, unitIdx } = item
              const unitLocked = !isUnitUnlocked(unitIdx)
              const done = unitLessonsCompleted(unit.topic, unit.lessonCount)
              return (
                <UnitBanner
                  key={unit.id}
                  unit={unit}
                  unitIndex={unitIdx}
                  completed={done}
                  total={unit.lessonCount}
                  locked={unitLocked}
                  C={C}
                  onTips={() => openTips(unit)}
                />
              )
            }

            // stimulus node
            if (item.type === 'stimulus') {
              const { unit, unitIdx } = item
              const unitLocked = !isUnitUnlocked(unitIdx)
              const nodeIdx = lessonNodeCount++
              const offsetX = nodeIdx % 2 === 0 ? -ZIGZAG : ZIGZAG
              return (
                <View key={`${unit.id}-stimulus`} style={[s.nodeWrapper, { marginLeft: offsetX }]}>
                  <View style={[s.connector, { borderColor: unitLocked ? C.surface3 : C.border }]} />
                  <TouchableOpacity
                    activeOpacity={unitLocked ? 1 : 0.8}
                    onPress={() => {
                      if (unitLocked) {
                        Alert.alert('🔒 Unit Locked', unitUnlockHint(unitIdx) ?? 'Complete the previous unit to unlock.')
                      } else {
                        startStimulusPractice(unit)
                      }
                    }}
                    style={[
                      s.node,
                      {
                        backgroundColor: unitLocked ? C.surface : '#FEF3C7',
                        borderColor: unitLocked ? C.border : '#F59E0B',
                        borderWidth: 2,
                      },
                      cardShadow(C.shadow),
                      unitLocked && { opacity: 0.5 },
                    ]}
                  >
                    <Text style={s.nodeIcon}>{unitLocked ? '🔒' : '📄'}</Text>
                  </TouchableOpacity>
                  <Text
                    style={[T.small, { color: unitLocked ? C.textDim : C.text, textAlign: 'center', marginTop: 8 }]}
                    numberOfLines={1}
                  >
                    Regents Context
                  </Text>
                </View>
              )
            }

            // lesson node
            const { unit, unitIdx, lessonIndex, isChallenge } = item
            const unitLocked   = !isUnitUnlocked(unitIdx)
            const lessonLocked = unitLocked || !isLessonUnlocked(unit, lessonIndex)
            const done         = lessonComplete(unit.topic, lessonIndex)
            const selected     = selectedLesson?.unit?.id === unit.id && selectedLesson?.lessonIndex === lessonIndex
            const label        = isChallenge ? 'Challenge' : `Lesson ${lessonIndex + 1}`
            const icon         = isChallenge ? '⚡' : unit.icon

            const nodeIdx  = lessonNodeCount++
            const offsetX  = nodeIdx % 2 === 0 ? -ZIGZAG : ZIGZAG

            return (
              <View key={`${unit.id}-l${lessonIndex}`} style={[s.nodeWrapper, { marginLeft: offsetX }]}>

                {/* Connector line — only between lessons within a unit (not before first) */}
                {lessonIndex > 0 && (
                  <View style={[s.connector, { borderColor: lessonLocked ? C.surface3 : C.border }]} />
                )}

                <TouchableOpacity
                  activeOpacity={lessonLocked ? 1 : 0.8}
                  onPress={() => {
                    if (unitLocked) {
                      Alert.alert(
                        '🔒 Unit Locked',
                        unitUnlockHint(unitIdx) ?? 'Complete the previous unit to unlock.',
                        [
                          { text: 'Dismiss', style: 'cancel' },
                          { text: '⚡ Skip Challenge', onPress: () => startSkipChallenge(unit, unitIdx) },
                        ]
                      )
                    } else if (lessonLocked) {
                      Alert.alert('🔒 Lesson Locked', 'Complete the previous lesson to unlock this one.')
                    } else {
                      selectLesson({ unit, lessonIndex, isChallenge })
                    }
                  }}
                  style={[
                    s.node,
                    {
                      backgroundColor: done ? (isChallenge ? C.warnBg : C.brandBg) : C.surface,
                      borderColor: done ? (isChallenge ? C.warn : unit.color) : C.border,
                      borderWidth: done ? 3 : 2,
                    },
                    cardShadow(C.shadow),
                    selected     && { transform: [{ scale: 1.08 }] },
                    lessonLocked && { opacity: 0.5 },
                  ]}
                >
                  <Text style={s.nodeIcon}>{lessonLocked ? '🔒' : icon}</Text>
                  {done && !isChallenge && (
                    <View style={s.starBadge}>
                      <Text style={{ fontSize: 12 }}>⭐</Text>
                    </View>
                  )}
                </TouchableOpacity>

                <Text
                  style={[T.small, { color: lessonLocked ? C.textDim : C.text, textAlign: 'center', marginTop: 8 }]}
                  numberOfLines={1}
                >
                  {label}
                </Text>

              </View>
            )
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── Backdrop (tap-outside to dismiss) ── */}
      {selectedLesson && (
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, s.backdrop]}
          onPress={() => closeSheet()}
          activeOpacity={1}
        />
      )}

      {/* ── Bottom-sheet popup ── */}
      {selectedLesson && (
        <Animated.View
          style={[
            s.sheet,
            cardShadow(C.shadow),
            { backgroundColor: C.surface, transform: [{ translateY: sheetAnim }] },
          ]}
        >
          <View style={s.sheetHandle} />

          <Text style={[T.h3, { color: C.text, marginBottom: 4 }]} numberOfLines={1}>
            {sheetChallenge ? '⚡' : sheetUnit?.icon} {sheetLabel}
          </Text>

          {sheetDone && (
            <Text style={[T.small, { color: C.textMuted, marginBottom: 12 }]}>
              ✅ Completed
            </Text>
          )}

          <View style={{ flexDirection: 'row', gap: 10, marginTop: sheetDone ? 0 : 12 }}>
            <TouchableOpacity
              style={duoBtn(sheetChallenge ? C.warn : C.brand, sheetChallenge ? '#B38500' : C.brandDark, { flex: 1, paddingVertical: 14 })}
              onPress={() => startLesson(sheetUnit, sheetLessonIdx)}
            >
              <Text style={[T.btn, { color: '#fff' }]}>{sheetDone ? '🔁 REDO' : '▶ START'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={duoBtnOutline(C.border, { flex: 1, paddingVertical: 14 })}
              onPress={() => startFlashcards(sheetUnit?.topic)}
            >
              <Text style={[T.btn, { color: C.text }]}>🃏 CARDS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={duoBtnOutline(C.border, { flex: 1, paddingVertical: 14 })}
              onPress={() => startStudy(sheetUnit?.topic)}
            >
              <Text style={[T.btn, { color: C.text }]}>📖 STUDY</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* ── Goal picker backdrop ── */}
      {showGoalPicker && (
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, s.backdrop]}
          onPress={closeGoalPicker}
          activeOpacity={1}
        />
      )}

      {/* ── Goal picker sheet ── */}
      {showGoalPicker && (
        <Animated.View
          style={[s.sheet, cardShadow(C.shadow), { backgroundColor: C.surface, transform: [{ translateY: goalSheetAnim }] }]}
        >
          <View style={s.sheetHandle} />
          <Text style={[T.h3, { color: C.text, marginBottom: 4 }]}>🎯 Daily XP Goal</Text>
          <Text style={[T.small, { color: C.textMuted, marginBottom: 20 }]}>
            How much do you want to learn today?
          </Text>

          <View style={{ gap: 10 }}>
            {GOALS.map((g) => {
              const labels = { 10: 'Casual', 20: 'Regular', 50: 'Intense', 100: 'Champion' }
              const emojis = { 10: '🌱', 20: '⚡', 50: '🔥', 100: '🏆' }
              const active = g === goal
              return (
                <TouchableOpacity
                  key={g}
                  style={[
                    s.goalOption,
                    { borderColor: active ? C.brand : C.border,
                      backgroundColor: active ? C.brandBg : C.surface2 },
                  ]}
                  onPress={() => { setGoal(g); closeGoalPicker() }}
                  activeOpacity={0.8}
                >
                  <Text style={{ fontSize: 22 }}>{emojis[g]}</Text>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={[T.h3, { color: active ? C.brand : C.text }]}>{g} XP / day</Text>
                    <Text style={[T.small, { color: C.textMuted }]}>{labels[g]}</Text>
                  </View>
                  {active && <Text style={[T.label, { color: C.brand }]}>✓ ACTIVE</Text>}
                </TouchableOpacity>
              )
            })}
          </View>
        </Animated.View>
      )}

      {/* ── Tips backdrop ── */}
      {tipsUnit && (
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, s.backdrop]}
          onPress={closeTips}
          activeOpacity={1}
        />
      )}

      {/* ── Tips sheet ── */}
      {tipsUnit && (
        <Animated.View
          style={[s.sheet, cardShadow(C.shadow), { backgroundColor: C.surface, transform: [{ translateY: tipsAnim }], maxHeight: Math.round(Dimensions.get('window').height * 0.82) }]}
        >
          <View style={s.sheetHandle} />
          <Text style={[T.h3, { color: C.text, marginBottom: 16 }]} numberOfLines={1}>
            {tipsUnit.icon} {tipsUnit.title} — Test Tips
          </Text>
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 0 }} contentContainerStyle={{ paddingBottom: 8 }}>
            {STRATEGY_CATEGORIES.map((cat) => {
              const tips = (sd.strategies?.[tipsUnit.id]?.[cat.key]) ?? []
              const open = expandedTip === cat.key
              return (
                <TouchableOpacity
                  key={cat.key}
                  onPress={() => setExpandedTip(open ? null : cat.key)}
                  activeOpacity={0.8}
                  style={[s.tipRow, { borderColor: open ? tipsUnit.color : C.border, backgroundColor: open ? C.surface2 : C.surface }]}
                >
                  <View style={s.tipRowHeader}>
                    <Text style={{ fontSize: 18 }}>{cat.icon}</Text>
                    <Text style={[T.h3, { color: C.text, flex: 1, marginLeft: 10, fontSize: 14 }]}>{cat.label}</Text>
                    <Text style={[T.label, { color: C.textMuted }]}>{open ? '▲' : '▼'}</Text>
                  </View>
                  {open && tips.length > 0 && (
                    <View style={s.tipList}>
                      {tips.map((tip, i) => (
                        <View key={i} style={[s.tipItem, { borderLeftColor: tipsUnit.color }]}>
                          <Text style={[T.small, { color: C.text, lineHeight: 20 }]}>{tip}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {open && tips.length === 0 && (
                    <Text style={[T.small, { color: C.textMuted, marginTop: 8 }]}>Coming soon!</Text>
                  )}
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          <TouchableOpacity
            style={duoBtn(tipsUnit.color, tipsUnit.darkColor, { marginTop: 14 })}
            onPress={closeTips}
            activeOpacity={0.85}
          >
            <Text style={[T.btn, { color: '#fff' }]}>GOT IT</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* ── Streak milestone gift modal ── */}
      <Modal transparent visible={!!milestoneModal} animationType="fade" onRequestClose={() => setMilestoneModal(null)}>
        <View style={s.modalBackdrop}>
          <View style={[s.modalCard, { backgroundColor: C.surface }]}>
            <Text style={{ fontSize: 52, textAlign: 'center' }}>🎁</Text>
            <Text style={[T.h2, { color: C.text, textAlign: 'center', marginTop: 8 }]}>
              {milestoneModal?.streak}-Day Streak!
            </Text>
            <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 4 }]}>
              {pet.name} has a gift for you!
            </Text>
            <Text style={[T.h3, { color: C.brand, textAlign: 'center', marginTop: 12 }]}>
              {milestoneModal?.label}
            </Text>
            <TouchableOpacity
              style={[duoBtn(C.brand, C.brandDark), { marginTop: 20 }]}
              onPress={() => setMilestoneModal(null)}
              activeOpacity={0.85}
            >
              <Text style={[T.btn, { color: '#fff' }]}>CLAIM! 🎉</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function timeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:       { flex: 1, backgroundColor: C.bg },
    scroll:     { paddingBottom: 20 },
    header:     { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    coinChip:   { borderRadius: 16, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1 },
    petSection: { paddingTop: 8, paddingBottom: 4 },
    petMsgCard: {
      marginHorizontal: 24, marginTop: 10,
      borderRadius: 14, borderWidth: 1,
      paddingHorizontal: 16, paddingVertical: 10,
    },
    digBtn: {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            8,
      marginHorizontal: 24,
      marginTop:      10,
      borderRadius:   14,
      borderWidth:    1,
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    digRewardBanner: {
      marginHorizontal: 24, marginTop: 8,
      borderRadius: 12, borderWidth: 1,
      paddingVertical: 8, paddingHorizontal: 14,
    },
    questCard: {
      marginHorizontal: 16, marginTop: 12, marginBottom: 4,
      borderRadius: 16, borderWidth: 1,
      padding: 14, gap: 4,
    },
    questHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
    questBg:     { height: 8, backgroundColor: C.surface2, borderRadius: 4, overflow: 'hidden' },
    questFill:   { height: 8, borderRadius: 4 },
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.55)',
      justifyContent:  'center',
      alignItems:      'center',
      padding:         24,
    },
    modalCard: {
      width:        '100%',
      borderRadius: 24,
      padding:      28,
      alignItems:   'center',
      gap:          4,
    },

    weekRow:    { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 20, paddingHorizontal: 16 },
    dayDot:     { width: 38, height: 38, borderRadius: 19, backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: C.border },

    goalCard: {
      flexDirection:   'row',
      alignItems:      'center',
      marginHorizontal: 16,
      marginBottom:    20,
      backgroundColor: C.surface,
      borderRadius:    20,
      padding:         16,
      borderWidth:     1,
      borderColor:     C.border,
    },
    goalOption: {
      flexDirection: 'row',
      alignItems:    'center',
      borderRadius:  14,
      borderWidth:   2,
      padding:       14,
    },

    quickGrid: {
      flexDirection:  'row',
      flexWrap:       'wrap',
      paddingHorizontal: 16,
      gap:            10,
      marginBottom:   24,
    },
    quickBtn: {
      // each button takes ~half the row width minus gap
      width:          (width - 16 * 2 - 10) / 2,
      alignItems:     'center',
      paddingVertical: 14,
      paddingHorizontal: 6,
      gap:            4,
      position:       'relative',
    },
    quickIcon:  { fontSize: 24, marginBottom: 2 },
    mistakeBadge: {
      position:        'absolute',
      top:             6,
      right:           10,
      backgroundColor: '#EF4444',
      borderRadius:    10,
      minWidth:        20,
      height:          20,
      alignItems:      'center',
      justifyContent:  'center',
      paddingHorizontal: 5,
      borderWidth:     1.5,
      borderColor:     '#fff',
      zIndex:          1,
    },
    mistakeBadgeText: {
      fontFamily: 'Nunito_800ExtraBold',
      fontSize:   10,
      color:      '#fff',
      lineHeight: 13,
    },

    pathContainer: { alignItems: 'center', paddingBottom: 20 },
    nodeWrapper:   { alignItems: 'center', marginBottom: 4 },
    connector:     { width: 2, height: 32, borderStyle: 'dashed', borderWidth: 1, marginBottom: 4 },
    node: {
      width:          NODE_SIZE,
      height:         NODE_SIZE,
      borderRadius:   NODE_SIZE / 2,
      alignItems:     'center',
      justifyContent: 'center',
      position:       'relative',
    },
    nodeIcon:   { fontSize: 34 },
    starBadge:  { position: 'absolute', top: -2, right: -2, backgroundColor: '#FFC800', borderRadius: 12, width: 22, height: 22, alignItems: 'center', justifyContent: 'center' },
    pctBadge:   { position: 'absolute', bottom: -4, borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },

    // ── Tips ──
    tipRow: {
      borderRadius: 12,
      borderWidth:  1.5,
      marginBottom: 8,
      padding:      12,
    },
    tipRowHeader: {
      flexDirection: 'row',
      alignItems:    'center',
    },
    tipList: {
      marginTop: 10,
      gap:       8,
    },
    tipItem: {
      borderLeftWidth: 3,
      paddingLeft:     10,
    },

    // ── Overlay ──
    backdrop: {
      zIndex: 50,
      backgroundColor: 'rgba(0,0,0,0.25)',
    },
    sheet: {
      position:            'absolute',
      bottom:              0,
      left:                0,
      right:               0,
      zIndex:              100,
      borderTopLeftRadius: 28,
      borderTopRightRadius:28,
      borderTopWidth:      1,
      borderColor:         'rgba(0,0,0,0.08)',
      padding:             24,
      paddingBottom:       36,
      gap:                 0,
    },
    sheetHandle: {
      alignSelf:    'center',
      width:        40,
      height:       5,
      borderRadius: 3,
      backgroundColor: 'rgba(0,0,0,0.15)',
      marginBottom: 16,
    },
  })
}
