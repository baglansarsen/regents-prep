import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  Dimensions, Alert, Animated, Modal, Platform,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useProgress } from '../hooks/useProgress'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useRP } from '../hooks/useRP'
import { useLivesContext } from '../context/LivesContext'
import { useDailyGoal } from '../hooks/useDailyGoal'
import { useMistakes } from '../hooks/useMistakes'
import { useLessonProgress } from '../hooks/useLessonProgress'
import { useUnitUnlocks } from '../hooks/useUnitUnlocks'
import { useFocusEffect } from '@react-navigation/native'
import { SUBJECTS } from '../content/subjects'
import * as leData from '../content/living-environment/index'
import * as esData from '../content/earth-science/index'
import * as chemData from '../content/chemistry/index'
import * as physicsData from '../content/physics/index'
import * as algebra1Data from '../content/algebra-1/index'
import * as algebra2Data from '../content/algebra-2/index'
import * as geometryData from '../content/geometry/index'
import * as lifeScienceData from '../content/life-science/index'
import * as englishData from '../content/english/index'
import * as globalHistoryData from '../content/global-history/index'
import * as usHistoryData from '../content/us-history/index'
import { STRATEGY_CATEGORIES } from '../content/strategies-meta'
import { T, duoBtn, duoBtnOutline, cardShadow, elevatedCard, sectionLabel } from '../styles/duo'
import GoalRing from '../components/GoalRing'
import UnitBanner from '../components/UnitBanner'
import PetWidget from '../components/PetWidget'
import PetStatusBars from '../components/PetStatusBars'
import PetTriviaCard from '../components/PetTriviaCard'
import { usePetContext } from '../context/PetContext'
import { useSpeechContext, loadDailyMessage } from '../context/SpeechContext'
import { FOOD_ITEMS } from '../data/petConfig'
import { PET_RESULTS } from '../data/petPersonality'
import PlacementTestScreen from './PlacementTestScreen'
import { useLeague, formatCountdown, msUntilReset } from '../hooks/useLeague'
import { getLevel } from '../hooks/useRP'
import { useStudyTime, formatTime as fmtStudyTime } from '../hooks/useStudyTime'
import { getExamLabel, getDaysUntilExam } from '../utils/examDates'
import NudgeBanner from '../components/NudgeBanner'
import { getEngagementNudge } from '../hooks/useEngagementNudge'

const MILESTONE_GIFTS = {
  3:  { rp: 100,  items: {},                       label: '100 ⭐ RP!' },
  7:  { rp: 250,  items: { apple: 1 },             label: '250 ⭐ RP + 🍎 Apple!' },
  14: { rp: 500,  items: { ramen: 1 },             label: '500 ⭐ RP + 🍜 Ramen!' },
  30: { rp: 1000, items: { sushi: 1, glowAura: 1 }, label: '1000 ⭐ RP + 🍣 Sushi + ✨ Glow Aura!' },
}

const GOAL_PET_MESSAGES = {
  dog:     "WOOF WOOF! You crushed it! I'm so proud of you today! 🐕",
  cat:     "Hmm... I suppose you've done adequately. *purrs approvingly* 🐱",
  parrot:  "GOAL! GOAL! YOU REACHED YOUR GOAL! Squawk! Outstanding! 🦜",
  rabbit:  "You hopped all the way to the finish! Goal complete! 🐰",
  fish:    "*blows celebratory bubbles* You're absolutely amazing today! 🐟",
  hamster: "You ran the whole wheel and made it! Goal reached! 🐹",
  default: "Amazing! You reached your daily goal! Keep it up! 🌟",
}

const W_RAW = Dimensions.get('window').width
const width = Platform.OS === 'web' ? Math.min(Math.max(W_RAW || 360, 320), 480) : W_RAW
const NODE_SIZE = 84
const ZIGZAG   = 72

export default function HomeScreen({ navigation }) {
  const { C, isDark } = useTheme()
  const glassStyle = Platform.OS === 'web' ? {
    backdropFilter: 'blur(24px)',
    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
  } : {}
  const { user } = useAuthContext()
  const uid = user?.uid

  const { subject } = useSubject()
  const mobileSubjectMap = {
    [SUBJECTS.EARTH_SCIENCE]: esData,
    [SUBJECTS.CHEMISTRY]:     chemData,
    [SUBJECTS.PHYSICS]:       physicsData,
    [SUBJECTS.ALGEBRA_1]:     algebra1Data,
    [SUBJECTS.ALGEBRA_2]:     algebra2Data,
    [SUBJECTS.GEOMETRY]:      geometryData,
    [SUBJECTS.LIFE_SCIENCE]:  lifeScienceData,
    [SUBJECTS.ENGLISH]:       englishData,
    [SUBJECTS.GLOBAL_HISTORY]:globalHistoryData,
    [SUBJECTS.US_HISTORY]:    usHistoryData,
  }
  const sd = mobileSubjectMap[subject] ?? leData

  const { history, reloadHistory } = useProgress(uid)
  const { weekDays, streak, studiedToday, hasFreeze, buyFreeze } = useDailyStreak(uid)
  const { rp, earnRP, spendRP, loaded: rpLoaded } = useRP(uid)
  const { lives, maxLives, nextRefillAt, refillLives } = useLivesContext()
  const { todaySeconds } = useStudyTime(uid, null, null)  // read-only: no session, just load persisted totals

  const subjectHistory = useMemo(
    () => history.filter((h) => (h.subject ?? 'living-environment') === subject),
    [history, subject],
  )

  const { lessonComplete, unitLessonsCompleted, unitComplete } = useLessonProgress(subjectHistory)
  const units = sd.UNITS ?? []
  const { isUnitUnlocked, unitUnlockHint, reloadSkipUnlocks } = useUnitUnlocks(units, lessonComplete, unitComplete, subject)
  useFocusEffect(useCallback(() => {
    reloadHistory()
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
        if (gift.xp)      await earnRP(gift.xp)
        for (const [itemId, qty] of Object.entries(gift.items ?? {})) {
          await addInventory(itemId, qty)
        }
        triggerReaction('celebrate')
        setMilestoneModal({ streak: top, label: gift.label })
        say(`Day ${top} streak! I knew you had it in you 🎉`)
      })()
    }

    // Daily greeting (once per day, cached)
    loadDailyMessage({
      uid,
      petType:       pet.petType,
      streak,
      daysUntilExam: daysToExam,
      subject,
    }).then((msg) => { if (msg) say(msg) }).catch(() => {})
  }, [reloadHistory, reloadSkipUnlocks, pendingEvolution, uid, streak]))

  const { goal, setGoal, todayRP, progress: goalProgress, goalMet, GOALS, celebrated, markCelebrated } = useDailyGoal(rp, rpLoaded)
  const { mistakes, mistakeCount } = useMistakes()

  // ── Exam countdown (real dates — computed once per render) ─────────────────
  const daysToExam = getDaysUntilExam(subject)
  const examLabel  = getExamLabel(subject)
  const { pet, pendingEvolution, getPetMessage, dailyDig, getTodayQuest, updateQuestProgress, triggerReaction, addInventory, studyBoost } = usePetContext()
  const { say } = useSpeechContext()

  const [selectedLesson,    setSelectedLesson]    = useState(null)
  const [showGoalPicker,    setShowGoalPicker]     = useState(false)
  const [digReward,         setDigReward]          = useState(null)
  const [questData,         setQuestData]          = useState(null)
  const [goalCelebModal,    setGoalCelebModal]    = useState(false)
  const [milestoneModal,  setMilestoneModal]   = useState(null)
  const [levelUpModal,    setLevelUpModal]     = useState(null)  // { level, name }
  const [showFreezeBanner,setShowFreezeBanner] = useState(false)
  const [tipsUnit,        setTipsUnit]         = useState(null)
  const [expandedTip,     setExpandedTip]      = useState(null)
  const [nudgeDismissed,  setNudgeDismissed]   = useState(false)
  const [bannerResolved,  setBannerResolved]   = useState(false)

  // ── League ────────────────────────────────────────────────────────────────
  const { tier, members, promoteN } = useLeague(uid)

  // ── Level-up detection (reads flag written by useXP) ──────────────────────
  useFocusEffect(useCallback(() => {
    AsyncStorage.getItem('@levelUp').then((raw) => {
      if (!raw) return
      AsyncStorage.removeItem('@levelUp').catch(() => {})
      const data = JSON.parse(raw)
      // Award bonus RP for levelling up
      earnRP(200)
      setLevelUpModal(data)
    }).catch(() => {})

    // Streak-at-risk freeze banner (show once per day if streak > 2 and no freeze)
    if (streak >= 3 && !studiedToday && !hasFreeze) {
      const today = new Date().toISOString().slice(0, 10)
      AsyncStorage.getItem(`@streakWarnDismissed_${today}`).then((val) => {
        if (!val) setShowFreezeBanner(true)
        setBannerResolved(true)
        setNudgeDismissed(false)
      }).catch(() => {
        setBannerResolved(true)
        setNudgeDismissed(false)
      })
    } else {
      setShowFreezeBanner(false)
      setBannerResolved(true)
      setNudgeDismissed(false)
    }
  }, [uid, streak, studiedToday, hasFreeze]))

  // ── Placement test — triggered before the user's first lesson ────────────
  const [placementDone,   setPlacementDone]   = useState(null)   // null = loading
  const [showPlacement,   setShowPlacement]   = useState(false)
  const [pendingLesson,   setPendingLesson]   = useState(null)

  useEffect(() => {
    if (!uid) return
    if (user?.isAnonymous) { setPlacementDone(true); return }
    AsyncStorage.getItem(`@placementDone_v1_${uid}`)
      .then((val) => setPlacementDone(!!val))
      .catch(() => setPlacementDone(true))  // fail open — don't block lessons
  }, [uid])

  // ── Daily goal celebration ────────────────────────────────────────────────
  useEffect(() => {
    if (!goalMet || celebrated || !pet.chosen) return
    markCelebrated()
    triggerReaction('celebrate')
    studyBoost()
    say(GOAL_PET_MESSAGES[pet.petType] ?? GOAL_PET_MESSAGES.default)
    setTimeout(() => setGoalCelebModal(true), 600)
  }, [goalMet, celebrated, pet.petType, pet.chosen])

  const sheetAnim     = useRef(new Animated.Value(400)).current
  const goalSheetAnim = useRef(new Animated.Value(400)).current
  const tipsAnim      = useRef(new Animated.Value(400)).current
  const pulseNodeAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseNodeAnim, { toValue: 1.1, duration: 750, useNativeDriver: true }),
        Animated.timing(pulseNodeAnim, { toValue: 1,   duration: 750, useNativeDriver: true }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [])

  // ── Idle speech — fires every 4–8 min while home screen is active ────────
  const subjectName = {
    'living-environment': 'Living Environment',
    'earth-science':      'Earth Science',
    'chemistry':          'Chemistry',
    'physics':            'Physics',
    'algebra-1':          'Algebra 1',
    'algebra-2':          'Algebra 2',
    'geometry':           'Geometry',
    'life-science':       'Life Science',
    'english':            'English',
    'global-history':     'Global History',
    'us-history':         'US History',
  }[subject] ?? 'Regents'

  const idleMessages = pet.petType ? {
    dog:     [`Your ${subjectName} progress makes me so proud! 🐶`, `One more ${subjectName} quiz? Let's do it together! 🐾`, `I believe in your ${subjectName} skills. Always. 🐶`],
    parrot:  [`Quick ${subjectName} question — let's go! 🦜`, `You're flying through ${subjectName}! 🦜`, `One more ${subjectName} quiz? I'm ready! 🌸`],
    cat:     [`Your ${subjectName} progress is noted. Continue. 🐱`, `Solo ${subjectName} study time. That's where you shine. 🐱`, `Trust your ${subjectName} approach. It works. 🌑`],
    rabbit:  [`Your ${subjectName} dedication means everything 💗`, `One more ${subjectName} quiz? For us? 🐰`, `Steady hops through ${subjectName}. You've got this 🌸`],
    fish:    [`No rush with ${subjectName}. One concept at a time 🐠`, `Stay calm. ${subjectName} mastery flows naturally 🌊`, `Your steady ${subjectName} progress is beautiful 🐠`],
    hamster: [`One more ${subjectName} unit at your pace 🐹`, `Quiet ${subjectName} study sessions suit you best 🐹`, `Grounded progress in ${subjectName}. Keep going 🐹`],
  }[pet.petType] ?? [] : []

  useEffect(() => {
    if (!idleMessages.length) return
    const delay = (4 + Math.random() * 4) * 60 * 1000
    const id = setTimeout(() => {
      say(idleMessages[Math.floor(Math.random() * idleMessages.length)])
    }, delay)
    return () => clearTimeout(id)
  }, [pet.petType])

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
      `Next life in ${min > 0 ? `${min}m` : 'a moment'}, or refill all 5 for 300 ⭐ RP.`,
      [
        { text: 'Refill (300 RP)', onPress: () => refillLives(spendRP).then((ok) => ok && onProceed()) },
        { text: 'Not now', style: 'cancel' },
      ],
    )
  }

  // ── Placement test completion ────────────────────────────────────────────
  function handlePlacementComplete() {
    setShowPlacement(false)
    setPlacementDone(true)
    reloadSkipUnlocks()          // re-read @skipUnlocks_${subject} so unlocked units render immediately
    const p = pendingLesson
    setPendingLesson(null)
    if (p) startLesson(p.unit, p.lessonIndex, true)  // bypassPlacement — resume the tapped lesson
  }

  // Android hardware back inside the placement modal → confirm, then skip
  function handlePlacementBack() {
    Alert.alert(
      'Skip the placement test?',
      "You can take it later — we'll just start you from the beginning for now.",
      [
        { text: 'Keep going', style: 'cancel' },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: async () => {
            try { await AsyncStorage.setItem(`@placementDone_v1_${uid}`, '1') } catch {}
            handlePlacementComplete()
          },
        },
      ],
    )
  }

  // ── Quiz / Flashcards ────────────────────────────────────────────────────
  function startLesson(unit, lessonIndex, bypassPlacement = false) {
    // Show placement test once before the user's first lesson
    if (!bypassPlacement && placementDone === false && !user?.isAnonymous) {
      setPendingLesson({ unit, lessonIndex })
      closeSheet(() => setShowPlacement(true))
      return
    }
    const isChallenge = lessonIndex === unit.lessonCount
    const unitIdx = units.findIndex((u) => u.id === unit.id)
    const nextUnit = isChallenge && unitIdx >= 0 ? units[unitIdx + 1] : null

    // Compute metadata for the next lesson so ResultsScreen can offer a shortcut
    let nextLessonMeta = null
    if (lessonIndex < unit.lessonCount) {
      const nextIdx = lessonIndex + 1
      const nextIsChallenge = nextIdx === unit.lessonCount
      const afterUnit = nextIsChallenge && unitIdx >= 0 ? units[unitIdx + 1] : null
      nextLessonMeta = {
        topic: unit.topic,
        lessonCount: unit.lessonCount,
        lessonIndex: nextIdx,
        isChallenge: nextIsChallenge,
        nextUnitTopic: nextIsChallenge ? (afterUnit?.topic ?? null) : null,
        label: nextIsChallenge ? `⚡ ${unit.title} Challenge` : `${unit.title} — Lesson ${nextIdx + 1}`,
      }
    } else if (isChallenge && nextUnit) {
      nextLessonMeta = {
        topic: nextUnit.topic,
        lessonCount: nextUnit.lessonCount,
        lessonIndex: 0,
        isChallenge: false,
        nextUnitTopic: null,
        label: `${nextUnit.title} — Lesson 1`,
      }
    }

    closeSheet(() => {
      livesGate(() => {
        const questionSet = sd.getLessonQuestions(unit.topic, lessonIndex, unit.lessonCount)
        navigation.navigate('Quiz', {
          questionSet, topic: unit.topic, subject, lessonIndex,
          isChallenge, nextUnitTopic: nextUnit?.topic ?? null,
          nextLessonMeta,
        })
      })
    })
  }

  function startStimulusPractice(unit) {
    const questionSet = sd.getExamContextQuestions(unit.topic)
    if (!questionSet.length) return
    livesGate(() => navigation.navigate('Quiz', { questionSet, topic: unit.topic, subject, lessonIndex: null }))
  }

  function startQuiz(topic) {
    const pool = topic ? sd.getByTopic(topic) : sd.questions
    if (!pool.length) return
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    livesGate(() => navigation.navigate('Quiz', { questionSet: shuffled, topic, subject }))
  }

  function startFlashcards(topic) {
    closeSheet(() => navigation.navigate('Flashcards', { topic, subject }))
  }

  function startStudy(topic) {
    const pool = topic ? sd.getByTopic(topic) : sd.questions
    if (!pool.length) return
    closeSheet(() => navigation.navigate('Study', { questionSet: pool, subject }))
  }

  function startSkipChallenge(unit, unitIdx) {
    const prev = units[unitIdx - 1]
    const pool = sd.getByTopic(prev?.topic ?? unit.topic).sort(() => Math.random() - 0.5).slice(0, 15)
    if (!pool.length) return
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
    if (!pool.length) return
    navigation.navigate('SpeedRound', { questionSet: pool, subject })
  }

  async function handleDig() {
    const result = await dailyDig()
    if (!result.ok) return
    if (result.type === 'xp') await earnRP(result.amount)
    const label = result.type === 'xp'
      ? `${pet.name} found ⭐ ${result.amount} RP!`
      : `${pet.name} dug up a ${FOOD_ITEMS.find((f) => f.id === result.itemId)?.icon ?? '🎁'}!`
    setDigReward(label)
    setTimeout(() => setDigReward(null), 3000)
    say(result.type === 'xp' ? `I found something! +${result.amount} ⭐` : 'Look what I dug up! 🎁')
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

  // ── First unlocked+incomplete path node (for pulse indicator) ─────────────
  let firstActiveKey = null
  for (const item of pathItems) {
    if (item.type !== 'lesson') continue
    const { unit, unitIdx, lessonIndex } = item
    if (!isUnitUnlocked(unitIdx)) continue
    if (!isLessonUnlocked(unit, lessonIndex)) continue
    if (lessonComplete(unit.topic, lessonIndex)) continue
    firstActiveKey = `${unit.id}-l${lessonIndex}`
    break
  }

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

        {/* Greeting + status bar */}
        <View style={s.header}>
          <View style={{ flex: 1 }}>
            <Text style={[T.h1, { color: C.text }]}>Good {timeOfDay()} 👋</Text>
            <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
              {user?.displayName?.split(' ')[0] ?? 'Student'} · {getLevel(rp).name}
            </Text>
            <Text style={[T.small, { color: daysToExam <= 14 ? C.wrong : C.textMuted, marginTop: 3 }]}>
              {examLabel}
            </Text>
          </View>

          {/* Study time today — shown only after 1 min of study */}
          {todaySeconds >= 60 && (
            <View style={[s.studyTimePill, { backgroundColor: C.brand + '18', borderColor: C.brand + '40' }]}>
              <Text style={s.studyTimePillIcon}>📚</Text>
              <Text style={[s.studyTimePillText, { color: C.brand }]}>{fmtStudyTime(todaySeconds)}</Text>
            </View>
          )}
        </View>

        {/* Week streak dots */}
        <View style={s.weekRow}>
          {weekDays.map((d) => (
            <View key={d.date} style={{ alignItems: 'center', gap: 4 }}>
              <View
                style={[
                  s.dayDot,
                  d.studied   && { backgroundColor: C.brand, borderColor: C.brandDark },
                  d.isToday   && { borderColor: C.brandLight, borderWidth: 2.5 },
                ]}
              >
                <Text style={[T.label, { color: d.studied ? '#fff' : C.textMuted, textTransform: 'none', letterSpacing: 0, fontSize: 14 }]}>
                  {d.studied ? '✓' : d.dayLabel[0]}
                </Text>
              </View>
              <Text style={[T.label, { color: d.isToday ? C.brand : C.textDim, fontSize: 9, textTransform: 'none', letterSpacing: 0 }]}>
                {d.dayLabel.slice(0, 3)}
              </Text>
            </View>
          ))}
        </View>

        {/* Engagement nudge */}
        {bannerResolved && !nudgeDismissed && !showFreezeBanner && getEngagementNudge('home', { streak, studiedToday, hasFreeze, weekDays, todayRP, goal, goalMet }) && (
          <NudgeBanner
            {...getEngagementNudge('home', { streak, studiedToday, hasFreeze, weekDays, todayRP, goal, goalMet })}
            onDismiss={() => setNudgeDismissed(true)}
          />
        )}

        {/* Streak-at-risk freeze banner */}
        {showFreezeBanner && (
          <View style={[s.freezeBanner, { backgroundColor: '#FF460015', borderColor: '#FF460040' }]}>
            <Text style={[T.body, { color: C.wrong, flex: 1 }]}>
              ⚠️ Study today to keep your {streak}-day streak!
            </Text>
            <View style={s.freezeBannerBtns}>
              <TouchableOpacity
                style={[s.freezeBtn, { backgroundColor: C.brand }]}
                onPress={() => buyFreeze(spendRP).then((res) => {
                  if (res === 'success') { setShowFreezeBanner(false); Alert.alert('🧊 Streak Freeze active!', 'Your streak is protected if you miss today.') }
                  else if (res === 'insufficient_xp') Alert.alert('Not enough RP', 'You need 200 RP to buy a Streak Freeze.')
                })}
              >
                <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>🧊 Freeze (200 RP)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const today = new Date().toISOString().slice(0, 10)
                  AsyncStorage.setItem(`@streakWarnDismissed_${today}`, '1').catch(() => {})
                  setShowFreezeBanner(false)
                }}
              >
                <Text style={[T.small, { color: C.textMuted, padding: 6 }]}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Daily Goal Ring */}
        <TouchableOpacity
          style={[s.goalCard, elevatedCard(C), glassStyle, { borderLeftWidth: 4, borderLeftColor: goalMet ? C.correct : C.brand }]}
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
              {todayRP}
            </Text>
          </GoalRing>

          {/* Text */}
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={[T.h3, { color: C.text }]}>Daily Goal</Text>
            <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
              {todayRP} / {goal} RP today
            </Text>
            {goalMet
              ? <Text style={[T.small, { color: C.correct, marginTop: 3 }]}>🎯 Goal reached!</Text>
              : <Text style={[T.small, { color: C.textMuted, marginTop: 3 }]}>{goal - todayRP} RP to go</Text>
            }
          </View>

          {/* Tap hint */}
          <Text style={[T.label, { color: C.textDim }]}>TAP TO{'\n'}CHANGE</Text>
        </TouchableOpacity>

        {/* StudyBuddy pet */}
        {pet.chosen && (
          <View style={s.petSection}>
            <View style={s.petRow}>
              <PetWidget size={90} onLongPress={() => navigation.navigate('PetShop')} />
              
              {/* Personality message */}
              {(() => {
                const daysSince = studiedToday ? 0 : 1
                const msg = getPetMessage({ streak, daysSince })
                if (!msg) return null
                return (
                  <View style={[s.petMsgBubble, { backgroundColor: C.surface, borderColor: C.border }, glassStyle]}>
                    <Text style={[T.small, { color: C.text, lineHeight: 18 }]}>
                      {msg}
                    </Text>
                    {/* Speech bubble pointer arrow */}
                    <View style={[s.bubblePointer, { borderRightColor: C.surface, borderLeftColor: 'transparent' }]} />
                  </View>
                )
              })()}
            </View>
            <PetStatusBars />

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
          <View style={[s.questCard, { backgroundColor: C.surface, borderColor: C.border }, glassStyle]}>
            <View style={s.questHeader}>
              <Text style={{ fontSize: 18 }}>{questData.icon}</Text>
              <Text style={[T.h3, { color: C.text, flex: 1 }]}>{questData.label}</Text>
              {questData.completed
                ? <Text style={[T.label, { color: C.correct }]}>✓ DONE</Text>
                : <Text style={[T.small, { color: C.textMuted }]}>+25 ⭐</Text>}
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
        <Text style={[sectionLabel(C), { paddingHorizontal: 20, marginBottom: 12 }]}>Quick Practice</Text>
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

        {/* ── FOCUS TIMER ── */}
        <TouchableOpacity
          style={[s.focusRow, elevatedCard(C), glassStyle]}
          onPress={() => navigation.navigate('FocusMain')}
          activeOpacity={0.85}
        >
          <Text style={{ fontSize: 22 }}>⏱</Text>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[T.h3, { color: C.text }]}>Focus Timer</Text>
            <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>Pomodoro study sessions</Text>
          </View>
          <Text style={{ fontSize: 18, color: C.textMuted }}>›</Text>
        </TouchableOpacity>

        {/* ── LEAGUE WIDGET ── */}
        {tier !== 'none' && (
          <TouchableOpacity
            style={[s.leagueCard, elevatedCard(C), glassStyle]}
            onPress={() => navigation.navigate('FriendsMain')}
            activeOpacity={0.85}
          >
            <View style={{ flex: 1 }}>
              <View style={s.leagueHeader}>
                <Text style={[T.h3, { color: C.text }]}>
                  {tier === 'bronze' ? '🥉' : tier === 'silver' ? '🥈' : tier === 'gold' ? '🥇' : '💎'}{' '}
                  {tier.charAt(0).toUpperCase() + tier.slice(1)} League
                </Text>
                <Text style={[T.small, { color: C.textMuted }]}>
                  {formatCountdown(msUntilReset())} left
                </Text>
              </View>
              {members.length > 0 && (
                <Text style={[T.small, { color: C.textMuted, marginTop: 3 }]}>
                  You're #{members.findIndex((m) => m.uid === uid) + 1 || '–'} of {members.length} · Top {promoteN} promote 🆙
                </Text>
              )}
            </View>
            <Text style={{ fontSize: 18, color: C.textMuted }}>›</Text>
          </TouchableOpacity>
        )}

        {/* ── DUOLINGO UNIT PATH ── */}
        <Text style={[sectionLabel(C), { paddingHorizontal: 20, marginBottom: 16 }]}>Learning Path</Text>
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
            const nodeKey  = `${unit.id}-l${lessonIndex}`
            const isFirstActive = nodeKey === firstActiveKey

            return (
              <View key={nodeKey} style={[s.nodeWrapper, { marginLeft: offsetX }]}>

                <Animated.View style={isFirstActive ? { transform: [{ scale: pulseNodeAnim }] } : undefined}>
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
                      borderWidth: done ? 4 : 2,
                      shadowColor: done ? (isChallenge ? C.warn : unit.color) : C.border,
                      shadowOpacity: done ? 0.45 : 0.15,
                      shadowRadius: done ? 12 : 4,
                      shadowOffset: { width: 0, height: 4 },
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
                </Animated.View>

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
          <Text style={[T.h3, { color: C.text, marginBottom: 4 }]}>🎯 Daily RP Goal</Text>
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
                    <Text style={[T.h3, { color: active ? C.brand : C.text }]}>{g} RP / day</Text>
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

      {/* ── Placement test modal — shown once before first lesson ── */}
      <Modal
        visible={showPlacement}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handlePlacementBack}
      >
        <PlacementTestScreen onComplete={handlePlacementComplete} />
      </Modal>

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

      {/* Level-up modal */}
      <Modal transparent visible={!!levelUpModal} animationType="fade" onRequestClose={() => setLevelUpModal(null)}>
        <View style={s.modalBackdrop}>
          <View style={[s.modalCard, { backgroundColor: C.surface }]}>
            <Text style={{ fontSize: 52, textAlign: 'center' }}>🏆</Text>
            <Text style={[T.h2, { color: C.text, textAlign: 'center', marginTop: 8 }]}>Level Up!</Text>
            <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 4 }]}>
              You've reached
            </Text>
            <Text style={[T.h1, { color: C.brand, textAlign: 'center', marginTop: 4 }]}>
              {levelUpModal?.name}
            </Text>
            <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginTop: 8 }]}>
              +200 bonus RP awarded 🎁
            </Text>
            <TouchableOpacity
              style={[duoBtn(C.brand, C.brandDark), { marginTop: 20 }]}
              onPress={() => setLevelUpModal(null)}
              activeOpacity={0.85}
            >
              <Text style={[T.btn, { color: '#fff' }]}>AWESOME! 🚀</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Daily goal celebration modal */}
      <Modal transparent visible={goalCelebModal} animationType="fade" onRequestClose={() => setGoalCelebModal(false)}>
        <View style={s.modalBackdrop}>
          <View style={[s.modalCard, { backgroundColor: C.surface }]}>
            <Text style={{ fontSize: 64, textAlign: 'center' }}>🎯</Text>
            <Text style={[T.h2, { color: C.text, textAlign: 'center', marginTop: 8 }]}>Daily Goal Reached!</Text>
            <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 4 }]}>
              {todayRP} RP earned today
            </Text>
            <View style={{ backgroundColor: C.brand + '20', borderRadius: 12, padding: 12, marginTop: 16, alignItems: 'center' }}>
              <Text style={{ fontSize: 36 }}>{PET_RESULTS[pet.petType]?.emoji ?? '🐾'}</Text>
              <Text style={[T.label, { color: C.brand, marginTop: 4, textAlign: 'center' }]}>
                +8 Happiness bonus for {pet.name}!
              </Text>
            </View>
            <TouchableOpacity
              style={[duoBtn('#58CC02', '#3D8B02'), { marginTop: 20 }]}
              onPress={() => setGoalCelebModal(false)}
              activeOpacity={0.85}
            >
              <Text style={[T.btn, { color: '#fff' }]}>Keep Studying! 🚀</Text>
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
    header:       { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
    studyTimePill: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 14, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, marginTop: 6, alignSelf: 'flex-start' },
    studyTimePillIcon: { fontSize: 14 },
    studyTimePillText: { fontSize: 13, fontWeight: '700' },
    freezeBanner: { marginHorizontal: 16, marginBottom: 12, borderRadius: 14, padding: 12, borderWidth: 1, gap: 8 },
    freezeBannerBtns: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    freezeBtn:    { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7 },
    focusRow:     { marginHorizontal: 16, marginBottom: 14, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
    leagueCard:   { marginHorizontal: 16, marginBottom: 14, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10 },
    leagueHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    coinChip:   { borderRadius: 16, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1 },
    petSection: { paddingTop: 8, paddingBottom: 4 },
    petRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
      gap: 12,
      marginTop: 8,
      marginBottom: 4,
    },
    petMsgBubble: {
      flex: 1,
      borderRadius: 16,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 12,
      position: 'relative',
      justifyContent: 'center',
    },
    bubblePointer: {
      position: 'absolute',
      left: -8,
      top: '50%',
      marginTop: -8,
      width: 0,
      height: 0,
      borderTopWidth: 8,
      borderBottomWidth: 8,
      borderRightWidth: 8,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      zIndex: 2,
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

    weekRow:    { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 20, paddingHorizontal: 16 },
    dayDot:     { width: 44, height: 44, borderRadius: 22, backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: C.border },

    goalCard: {
      flexDirection:   'row',
      alignItems:      'center',
      marginHorizontal: 16,
      marginBottom:    20,
      padding:         16,
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
    connector:     { width: 5, height: 36, backgroundColor: C.border, marginBottom: 4, borderRadius: 2.5 },
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
