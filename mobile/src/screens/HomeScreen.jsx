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
import { useSubscription } from '../context/SubscriptionContext'
import { useRewardedAd } from '../hooks/useRewardedAd'
import LivesRefillGate from '../components/LivesRefillGate'
import ShareCardSheet from '../components/ShareCardSheet'
import { useDailyGoal } from '../hooks/useDailyGoal'
import { useLessonProgress } from '../hooks/useLessonProgress'
import { useMistakes } from '../hooks/useMistakes'
import { useUnitUnlocks } from '../hooks/useUnitUnlocks'
import { useFocusEffect } from '@react-navigation/native'
import { localDateStr, yesterdayStr } from '../utils/localDate'
import { shuffle } from '../utils/question'
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
import * as basicMathData from '../content/basic-math/index'
import { STRATEGY_CATEGORIES } from '../content/strategies-meta'
import { T, duoBtn, duoBtnOutline, cardShadow, elevatedCard, sectionLabel } from '../styles/duo'
import GoalRing from '../components/GoalRing'
import UnitBanner from '../components/UnitBanner'
import PetWidget from '../components/PetWidget'
import { usePetContext } from '../context/PetContext'
import { useSpeechContext, loadDailyMessage } from '../context/SpeechContext'
import { useTour, useTourTarget } from '../context/TourContext'
import { PET_RESULTS } from '../data/petPersonality'
import PlacementTestScreen from './PlacementTestScreen'
import { useLeague, formatCountdown, msUntilReset } from '../hooks/useLeague'
import { getLevel } from '../hooks/useRP'
import { useStudyTime, formatTime as fmtStudyTime } from '../hooks/useStudyTime'
import { getExamLabel, getDaysUntilExam, daysUntilExam } from '../utils/examDates'
import { PETS_ENABLED } from '../config/features'
import { useGoal } from '../context/GoalContext'
import { usePredictedScore } from '../hooks/usePredictedScore'
import { pickSmartQuest } from '../utils/smartQuest'
import { pickTodayMission } from '../utils/todayMission'
import { pickRescueAction } from '../utils/rescuePlan'
import { tierFor } from '../data/goalConfig'

const MILESTONE_GIFTS = {
  3:  { rp: 50,   items: {},                       label: '50 ⭐ RP!' },
  7:  { rp: 150,  items: { apple: 1 },             label: '150 ⭐ RP + 🍎 Apple!' },
  14: { rp: 400,  items: { ramen: 1 },             label: '400 ⭐ RP + 🍜 Ramen!' },
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

  const { history, historyLoaded, reloadHistory } = useProgress(uid)
  const { weekDays, streak, studiedToday, studiedDates, hasFreeze, buyFreeze } = useDailyStreak(uid)
  const { rp, earnRP, spendRP, loaded: rpLoaded } = useRP(uid)
  const { lives, maxLives, nextRefillAt, refillLives, grantFullRefill } = useLivesContext()
  const { isSubscribed, isConfigured, presentPaywall } = useSubscription()
  const { ready: adReady, showAd } = useRewardedAd({ onReward: grantFullRefill })
  const [pendingProceed, setPendingProceed] = useState(null)   // callback held while the lesson-start refill gate shows
  const { todaySeconds, reloadTotals: reloadStudyTime } = useStudyTime(uid, null, null)  // read-only: no session, just load persisted totals

  const subjectHistory = useMemo(
    () => history.filter((h) => (h.subject ?? 'living-environment') === subject),
    [history, subject],
  )

  const { lessonComplete, unitLessonsCompleted, unitComplete } = useLessonProgress(subjectHistory)
  const { mistakesByTopic, dueCount, getReviewSet } = useMistakes(subject)
  const units = sd.UNITS ?? []
  const { isUnitUnlocked, unitUnlockHint, reloadSkipUnlocks } = useUnitUnlocks(units, lessonComplete, unitComplete, subject)
  // Declared before the focus effect below — it reads pendingEvolution in its
  // dependency array, so this destructuring must run first or the const is in
  // its temporal dead zone at render time (crashes HomeScreen).
  const { pet, pendingEvolution, getPetMessage, dailyDig, getTodayQuest, updateQuestProgress, triggerReaction, addInventory, studyBoost } = usePetContext()
  const { say } = useSpeechContext()

  // ── Guided tour — first-run trigger only. All tour anchors now live in the
  // fixed top bar (GlobalTopBar), so no scroll-into-view wiring is needed here. ─
  const tour      = useTour()
  const scrollRef = useRef(null)

  // ── Regents goal + predicted score + smart daily quest ─────────────────────
  // (Also before the focus effect: smartQuestDef appears in its deps array.)
  const { getGoal, loaded: goalLoaded } = useGoal()
  const regentsGoal = getGoal(subject)
  const { predicted, coldStart, weakestAttemptedUnit, hasTakenPracticeExam } =
    usePredictedScore(subject, units, subjectHistory)
  const goalDaysToExam = regentsGoal ? daysUntilExam(subject, regentsGoal.examDateStr) : null
  // Countdown the whole screen shares: prefer the student's committed goal
  // session, else the next scheduled Regents session for the subject.
  const daysToExam = goalDaysToExam ?? getDaysUntilExam(subject)
  const examLabel  = getExamLabel(subject, daysToExam)
  const smartQuestDef = useMemo(() => pickSmartQuest({
    hasGoal: !!regentsGoal,
    coldStart,
    daysToExam,
    dayOfWeek: new Date().getDay(),
    studiedYesterday: studiedDates.includes(yesterdayStr()),
    hasTakenPracticeExam,
    weakestUnit: weakestAttemptedUnit,
  }), [regentsGoal, coldStart, daysToExam, subject, studiedDates, hasTakenPracticeExam, weakestAttemptedUnit])

  // ── Today's Mission — single highest-priority action ───────────────────────
  // With a Rescue Plan set and the exam ≤30 days out, the plan's daily
  // recommendation takes over (same actionTypes → same runMission dispatch).
  // set_goal / checkup still win: without a goal or any data there's nothing
  // for the plan to work with.
  const mission = useMemo(() => {
    const base = pickTodayMission({
      hasGoal:              !!regentsGoal,
      coldStart,
      daysToExam,
      hasTakenPracticeExam,
      dueCount,
      weakestUnit:          weakestAttemptedUnit,
    })
    const plan = regentsGoal?.rescuePlan
    if (plan && daysToExam != null && daysToExam <= 30 &&
        base.actionType !== 'set_goal' && base.actionType !== 'checkup') {
      return pickRescueAction({
        plan,
        daysToExam,
        weakestUnit: weakestAttemptedUnit,
        dueCount,
        hasTakenPracticeExam,
      })
    }
    return base
  }, [regentsGoal, coldStart, daysToExam, hasTakenPracticeExam, dueCount, weakestAttemptedUnit])
  useFocusEffect(useCallback(() => {
    reloadHistory()
    reloadSkipUnlocks()
    reloadStudyTime()   // reflect study/quiz time logged on other screens
    if (PETS_ENABLED && pendingEvolution) navigation.navigate('PetEvolution')

    // Refresh quest data (goal-aware when a smart quest applies)
    getTodayQuest(smartQuestDef).then(setQuestData).catch(() => {})

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
  }, [reloadHistory, reloadSkipUnlocks, pendingEvolution, uid, streak, smartQuestDef]))

  const { goal, setGoal, todayRP, progress: goalProgress, goalMet, GOALS, celebrated, markCelebrated } = useDailyGoal(rp, rpLoaded)

  const [selectedLesson,    setSelectedLesson]    = useState(null)
  const [showGoalPicker,    setShowGoalPicker]     = useState(false)
  const [questData,         setQuestData]          = useState(null)
  const [goalCelebModal,    setGoalCelebModal]    = useState(false)
  const [milestoneModal,  setMilestoneModal]   = useState(null)
  const [streakShare,     setStreakShare]      = useState(null)   // streak count → share sheet
  const [levelUpModal,    setLevelUpModal]     = useState(null)  // { level, name }
  const [showFreezeBanner,setShowFreezeBanner] = useState(false)
  const [tipsUnit,        setTipsUnit]         = useState(null)
  const [expandedTip,     setExpandedTip]      = useState(null)

  // ── League ────────────────────────────────────────────────────────────────
  const { tier, members, promoteN } = useLeague(uid)

  // ── Level-up detection (reads flag written by useXP) ──────────────────────
  useFocusEffect(useCallback(() => {
    AsyncStorage.getItem('@levelUp').then((raw) => {
      if (!raw) return
      AsyncStorage.removeItem('@levelUp').catch(() => {})
      const data = JSON.parse(raw)
      // Small bonus for levelling up. Kept low (and flat) so it can't cross the
      // next level threshold and cascade, and doesn't dwarf actual question RP.
      earnRP(25)
      setLevelUpModal(data)
    }).catch(() => {})

    // Streak-at-risk freeze banner (show once per day if streak > 2 and no freeze)
    if (streak >= 3 && !studiedToday && !hasFreeze) {
      const today = localDateStr()
      AsyncStorage.getItem(`@streakWarnDismissed_${today}`).then((val) => {
        if (!val) setShowFreezeBanner(true)
      }).catch(() => {})
    } else {
      setShowFreezeBanner(false)
    }
  }, [uid, streak, studiedToday, hasFreeze]))

  // ── Re-run uid-dependent init when auth resolves after mount ────────────────
  // useFocusEffect fires once on mount (uid may still be null). This effect
  // covers the gap so quest data, history, and unlocks load without requiring
  // the user to switch tabs and back.
  useEffect(() => {
    if (!uid) return
    reloadHistory()
    reloadSkipUnlocks()
    getTodayQuest(smartQuestDef).then(setQuestData).catch(() => {})
  }, [uid, smartQuestDef])

  // ── Placement test — triggered before the user's first lesson ────────────
  const [placementDone,   setPlacementDone]   = useState(null)   // null = loading
  const [showPlacement,   setShowPlacement]   = useState(false)
  const [pendingLesson,   setPendingLesson]   = useState(null)
  const [showLevel0Card,  setShowLevel0Card]  = useState(false)

  useEffect(() => {
    if (!uid) return
    if (user?.isAnonymous) { setPlacementDone(true); return }
    AsyncStorage.getItem(`@placementDone_v1_${uid}`)
      .then((val) => setPlacementDone(!!val))
      .catch(() => setPlacementDone(true))  // fail open — don't block lessons
  }, [uid])

  useEffect(() => {
    if (!uid || user?.isAnonymous) return
    AsyncStorage.getItem(`@needsLevel0_v1_${uid}`)
      .then((val) => setShowLevel0Card(!!val))
      .catch(() => {})
  }, [uid])

  // ── First-run guided tour — start once Home is focused & targets exist ──────
  // Only block while the placement MODAL is actually up (showPlacement). Do not
  // gate on placementDone: a brand-new user lands with placementDone === false
  // (placement is only offered when they start their first lesson, not at
  // landing), so gating on it suppressed the tour for every new user. The tour
  // overlay swallows taps, so it can't collide with starting a lesson anyway.
  useFocusEffect(useCallback(() => {
    if (user?.isAnonymous) return
    if (!tour.doneLoaded || tour.tourDone || tour.isActive) return
    if (!pet.chosen) return
    if (showPlacement) return   // don't overlap the placement modal while it's open
    const id = setTimeout(() => { tour.maybeStartFirstRun() }, 900)  // let top bar + widgets mount/measure
    return () => clearTimeout(id)
  }, [user, pet.chosen, showPlacement, tour.doneLoaded, tour.tourDone, tour.isActive]))

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

  // ── Energy gate (lives mechanics underneath) ──────────────────────────────
  // Subscribers and anyone with energy proceed straight in; out-of-energy free
  // users get the shared recharge gate (ad / RP / premium + live countdown).
  // The pending action runs once a refill lands (see the effect below).
  function livesGate(onProceed) {
    if (lives > 0 || isSubscribed) { onProceed(); return }
    setPendingProceed(() => onProceed)
  }

  // When a refill lands (ad or RP → lives > 0) while the start gate is open,
  // dismiss it and run the held action (start the tapped lesson).
  useEffect(() => {
    if (pendingProceed && lives > 0) {
      const go = pendingProceed
      setPendingProceed(null)
      go()
    }
  }, [pendingProceed, lives])

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

  // Smart Review — prioritized queued mistakes; topic-scoped for in-unit Fix-ups,
  // or cross-topic for the Review card. Pads a thin single-topic set with fresh
  // same-topic questions to confirm mastery.
  function startReview(topic = null) {
    let pool = getReviewSet({ subject, topic, daysToExam: goalDaysToExam, limit: 15 })
    if (topic && pool.length < 6) {
      const seen = new Set(pool.map((q) => q.id ?? q.text))
      const extra = shuffle(sd.getByTopic(topic) ?? []).filter((q) => !seen.has(q.id ?? q.text)).slice(0, 6 - pool.length)
      pool = [...pool, ...extra]
    }
    if (!pool.length) return
    livesGate(() => navigation.navigate('Quiz', { questionSet: pool, topic, subject, isMistakesPractice: true }))
  }

  function startQuiz(topic, { limit } = {}) {
    const pool = topic ? sd.getByTopic(topic) : sd.questions
    if (!pool.length) return
    const shuffled = shuffle(pool)
    const questionSet = limit ? shuffled.slice(0, limit) : shuffled
    livesGate(() => navigation.navigate('Quiz', { questionSet, topic, subject }))
  }

  function startFlashcards(topic) {
    closeSheet(() => navigation.navigate('Flashcards', { topic, subject }))
  }

  function startStudy(topic) {
    const pool = topic ? sd.getByTopic(topic) : sd.questions
    if (!pool.length) return
    closeSheet(() => navigation.navigate('Study', { questionSet: pool, subject }))
  }

  // ── Today's Mission dispatcher — routes each actionType to the right helper ─
  function runMission(m) {
    switch (m.actionType) {
      case 'set_goal':
        navigation.navigate('GoalSetup')
        break
      case 'checkup':
        // Short mixed quiz — just enough to calibrate the prediction
        startQuiz(null, { limit: 12 })
        break
      case 'practice_exam':
        navigation.navigate('ExamsTab')
        break
      case 'review_mistakes':
        startReview(null)
        break
      case 'weak_unit_quiz':
        startQuiz(m.topic)
        break
      case 'next_lesson':
      default:
        if (firstActiveLesson) {
          startLesson(firstActiveLesson.unit, firstActiveLesson.lessonIndex)
        } else {
          startQuiz(null)
        }
        break
    }
  }

  function startSkipChallenge(unit, unitIdx) {
    const prev = units[unitIdx - 1]
    const pool = shuffle(sd.getByTopic(prev?.topic ?? unit.topic)).slice(0, 15)
    if (!pool.length) return
    navigation.navigate('SkipChallenge', {
      topic: unit.topic,
      prereqTopic: prev?.topic ?? unit.topic,
      questions: pool,
      subject,
    })
  }

  // Quick Practice (startSpeedRound / startPracticeMistakes) moved to the Exams
  // tab; the pet's dig (handleDig) moved to PetScreen.

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
    // Targeted "Fix-ups" node — only when this unit's topic has queued mistakes.
    if ((mistakesByTopic[unit.topic] ?? 0) > 0) {
      pathItems.push({ type: 'review', unit, unitIdx, count: mistakesByTopic[unit.topic] })
    }
  })

  // ── First unlocked+incomplete path node (for pulse indicator + mission) ────
  let firstActiveKey    = null
  let firstActiveLesson = null   // { unit, lessonIndex } — used by runMission next_lesson
  for (const item of pathItems) {
    if (item.type !== 'lesson') continue
    const { unit, unitIdx, lessonIndex } = item
    if (!isUnitUnlocked(unitIdx)) continue
    if (!isLessonUnlocked(unit, lessonIndex)) continue
    if (lessonComplete(unit.topic, lessonIndex)) continue
    firstActiveKey    = `${unit.id}-l${lessonIndex}`
    firstActiveLesson = { unit, lessonIndex }
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

      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

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

        {/* ── Outcome-first card — predicted score vs. goal, sits directly under the greeting ── */}
        {goalLoaded && (
          <View
            style={[
              s.outcomeCard,
              elevatedCard(C),
              glassStyle,
              { borderLeftWidth: 4, borderLeftColor: regentsGoal ? (C.warn ?? '#FFC93C') : C.brand },
            ]}
          >
            {/* Row 1: ring + subject info (Tapping here navigates to GoalDetail/GoalSetup) */}
            <TouchableOpacity
              style={s.outcomeRow}
              onPress={() => navigation.navigate(regentsGoal ? 'GoalDetail' : 'GoalSetup')}
              activeOpacity={0.75}
            >
              <GoalRing
                size={60}
                strokeWidth={6}
                progress={
                  regentsGoal && predicted != null && !coldStart
                    ? Math.min(1, Math.max(0, (predicted - 50) / Math.max(1, regentsGoal.target - 50)))
                    : 0
                }
                color={
                  regentsGoal && predicted != null && predicted >= regentsGoal.target
                    ? C.correct
                    : (C.warn ?? '#FFC93C')
                }
                trackColor={C.surface2}
              >
                <Text style={{ fontFamily: 'Fredoka_700Bold', fontSize: 13, color: C.text }}>
                  {!regentsGoal ? '🎯' : coldStart ? '—' : predicted}
                </Text>
              </GoalRing>

              <View style={s.outcomeInfo}>
                <Text style={[T.h3, { color: C.text }]} numberOfLines={1}>{subjectName}</Text>

                {regentsGoal ? (
                  <>
                    <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]} numberOfLines={1}>
                      {coldStart
                        ? 'Checkup needed · take a quiz'
                        : `${predicted} → ${regentsGoal.target} ${tierFor(regentsGoal.target).icon}`}
                    </Text>
                    <Text
                      style={[T.small, { color: daysToExam <= 14 ? C.wrong : C.textMuted, marginTop: 2 }]}
                      numberOfLines={1}
                    >
                      {!coldStart && predicted != null && predicted < regentsGoal.target
                        ? `${regentsGoal.target - predicted} pts to go · `
                        : ''}{examLabel}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]} numberOfLines={1}>
                      Set a target to track your score
                    </Text>
                    <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]} numberOfLines={1}>
                      {examLabel}
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

          </View>
        )}

        {/* Week streak moved to the top bar — tap the 🔥 there for the full calendar */}

        {/* ── Today's Mission — single prioritized next action.
             Waits for quiz history too: acting on the empty initial history
             would misread a veteran as cold-start and offer the wrong mission. ── */}
        {goalLoaded && historyLoaded && (
          <View style={[s.missionCard, elevatedCard(C)]}>
            <View style={s.missionHeader}>
              <Text style={s.missionIcon}>{mission.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[T.label, { color: mission.rescue ? C.warn : C.brand, marginBottom: 2 }]}>
                  {mission.rescue ? `🧭 ${mission.planLabel}` : "TODAY'S MISSION"}
                </Text>
                <Text style={[T.h3, { color: C.text }]} numberOfLines={1}>{mission.title}</Text>
              </View>
              <View style={[s.missionTimePill, { backgroundColor: C.brand + '18', borderColor: C.brand + '40' }]}>
                <Text style={[T.small, { color: C.brand, fontSize: 11 }]}>⏱ ~{mission.estimatedMinutes}m</Text>
              </View>
            </View>
            <Text style={[T.small, { color: C.textMuted, marginTop: 4, marginBottom: 12 }]} numberOfLines={2}>
              {mission.subtitle}
            </Text>
            <TouchableOpacity
              style={duoBtn(C.brand, C.brandDark)}
              onPress={() => runMission(mission)}
              activeOpacity={0.85}
            >
              <Text style={[T.btn, { color: '#fff' }]}>{mission.cta}</Text>
            </TouchableOpacity>
          </View>
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
                  const today = localDateStr()
                  AsyncStorage.setItem(`@streakWarnDismissed_${today}`, '1').catch(() => {})
                  setShowFreezeBanner(false)
                }}
              >
                <Text style={[T.small, { color: C.textMuted, padding: 6 }]}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── Smart Review — one tap to clear due gaps across topics ── */}
        {dueCount > 0 && (
          <TouchableOpacity
            style={[s.reviewCard, cardShadow(C.shadow)]}
            onPress={() => startReview(null)}
            activeOpacity={0.85}
          >
            <Text style={{ fontSize: 26 }}>🩹</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[T.h3, { color: C.text }]}>Review your gaps</Text>
              <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
                {dueCount} {dueCount === 1 ? 'item' : 'items'} due
                {goalDaysToExam != null && goalDaysToExam <= 14 ? ` · exam in ${goalDaysToExam}d` : ''}
              </Text>
            </View>
            <Text style={[T.btn, { color: C.brand }]}>REVIEW ›</Text>
          </TouchableOpacity>
        )}

        {/* ── Level 0 remediation card — shown when placement flagged weak math foundations ── */}
        {showLevel0Card && (
          <View style={[s.reviewCard, cardShadow(C.shadow), { backgroundColor: '#ccfbf1', borderColor: '#0d9488', borderWidth: 1.5 }]}>
            <Text style={{ fontSize: 26 }}>🧮</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[T.h3, { color: '#0d9488' }]}>Level 0 · Basic Math</Text>
              <Text style={[T.small, { color: '#0f766e', marginTop: 2 }]}>
                Build your foundation before tackling algebra
              </Text>
            </View>
            <View style={{ gap: 6, alignItems: 'flex-end' }}>
              <TouchableOpacity
                style={[duoBtn('#0d9488', '#0f766e', { paddingHorizontal: 14, paddingVertical: 8 })]}
                onPress={() => {
                  const topic = basicMathData.TOPIC_ORDER?.[0]
                  if (!topic) return
                  const questionSet = basicMathData.getLessonQuestions(topic, 0, basicMathData.UNITS?.[0]?.lessonCount ?? 2)
                  livesGate(() => {
                    navigation.navigate('Quiz', { questionSet, topic, subject: 'basic-math', lessonIndex: 0 })
                  })
                }}
                activeOpacity={0.85}
              >
                <Text style={[T.btn, { color: '#fff', fontSize: 12 }]}>START →</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  try { await AsyncStorage.removeItem(`@needsLevel0_v1_${uid}`) } catch {}
                  setShowLevel0Card(false)
                }}
              >
                <Text style={[T.small, { color: '#0f766e', padding: 4 }]}>Not now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── LEARNING PATH — the home screen's primary content, lessons first ── */}
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

            if (item.type === 'review') {
              const { unit, count } = item
              const nodeIdx = lessonNodeCount++
              const offsetX = nodeIdx % 2 === 0 ? -ZIGZAG : ZIGZAG
              return (
                <View key={`${unit.id}-review`} style={[s.nodeWrapper, { marginLeft: offsetX }]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => startReview(unit.topic)}
                    style={[s.node, { backgroundColor: '#FEE2E2', borderColor: '#EF4444', borderWidth: 2 }, cardShadow(C.shadow)]}
                  >
                    <Text style={s.nodeIcon}>🩹</Text>
                  </TouchableOpacity>
                  <Text style={[T.small, { color: C.text, textAlign: 'center', marginTop: 8 }]} numberOfLines={1}>
                    Fix-ups ({count})
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

        {/* ── Secondary content (goals, pet, quests, practice) lives below the path ── */}
        {/* Regents Goal card moved to the outcome-first header above the learning path. */}

        {/* Daily Goal ring consolidated away — the Regents Goal card above covers
            goals, and today's RP progress already shows in the top bar. */}

        {/* Pet companion — compact; the full buddy hub (feed, play, dig, shop,
            trivia) now lives on its own Pet screen so home stays lesson-focused. */}
        {pet.chosen && (
          PETS_ENABLED ? (
            <TouchableOpacity
              style={[s.goalCard, elevatedCard(C), glassStyle]}
              onPress={() => navigation.navigate('Pet')}
              activeOpacity={0.85}
            >
              <PetWidget size={56} onPress={() => navigation.navigate('Pet')} />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={[T.h3, { color: C.text }]}>{pet.name ?? 'Your buddy'}</Text>
                <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>Tap to feed, play & dig</Text>
              </View>
              <Text style={[T.label, { color: C.textDim }]}>{'VISIT\n›'}</Text>
            </TouchableOpacity>
          ) : (
            /* Pets hidden — show Reggie as a non-interactive study buddy */
            <View style={[s.goalCard, elevatedCard(C), glassStyle]}>
              <PetWidget size={56} />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={[T.h3, { color: C.text }]}>Reggie</Text>
                <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>Your study buddy — keep going! 🦕</Text>
              </View>
            </View>
          )
        )}


        {/* Daily quest card — tapping a topic-focus quest starts that quiz */}
        {questData && pet.chosen && (
          <TouchableOpacity
            style={[s.questCard, { backgroundColor: C.surface, borderColor: C.border }, glassStyle]}
            disabled={questData.action !== 'complete_quiz_topic' || questData.completed}
            onPress={() => startQuiz(questData.topic)}
            activeOpacity={0.85}
          >
            <View style={s.questHeader}>
              <Text style={{ fontSize: 18 }}>{questData.icon}</Text>
              <Text style={[T.h3, { color: C.text, flex: 1 }]}>{questData.label}</Text>
              {questData.completed
                ? <Text style={[T.label, { color: C.correct }]}>✓ DONE</Text>
                : <Text style={[T.small, { color: C.textMuted }]}>+{questData.rp ?? 30} ⭐</Text>}
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
          </TouchableOpacity>
        )}

        {/* Pet trivia moved to the Pet screen */}

        {/* Quick Practice (Quick Quiz, Speed Round, Flashcards, Mistakes) moved
            to the Exams tab — one tap away in the bottom bar — to keep home
            focused on the lesson path. */}

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
          <View style={s.sheetHeader}>
            <View style={s.sheetHandle} />
            <TouchableOpacity
              onPress={closeGoalPicker}
              style={s.sheetCloseBtn}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Text style={[T.label, { color: C.textMuted, fontSize: 22 }]}>✕</Text>
            </TouchableOpacity>
          </View>
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

      {/* ── Out-of-energy recharge gate (lesson start) ── */}
      {pendingProceed && (
        <LivesRefillGate
          C={C}
          context="start"
          nextRefillAt={nextRefillAt}
          adReady={adReady}
          onWatchAd={showAd}
          onRefill={() => refillLives(spendRP)}
          showPremium={isConfigured && !isSubscribed}
          onGoPremium={presentPaywall}
          onDismiss={() => setPendingProceed(null)}
        />
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
            <TouchableOpacity
              style={{ marginTop: 12, alignItems: 'center', paddingVertical: 4 }}
              onPress={() => {
                const n = milestoneModal?.streak
                setMilestoneModal(null)
                if (n) setStreakShare(n)
              }}
              activeOpacity={0.7}
            >
              <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>
                📤 Share the streak
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ── Streak milestone share card ── */}
      <ShareCardSheet
        visible={!!streakShare}
        onClose={() => setStreakShare(null)}
        variant="streak_milestone"
        streak={streakShare ?? 0}
        subject={subject}
      />

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
              style={[duoBtn('#1FC36B', '#0E9F52'), { marginTop: 20 }]}
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
    shopBtn: {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            8,
      marginHorizontal: 24,
      marginTop:      8,
      borderRadius:   14,
      borderWidth:    1,
      paddingVertical: 12,
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
    outcomeCard: {
      marginHorizontal: 16,
      marginBottom:    14,
      padding:         16,
    },
    outcomeRow: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           14,
    },
    outcomeInfo: {
      flex:       1,
      flexShrink: 1,
    },
    missionCard: {
      marginHorizontal: 16,
      marginBottom:    14,
      padding:         16,
    },
    missionHeader: {
      flexDirection: 'row',
      alignItems:    'center',
      gap:           12,
      marginBottom:  2,
    },
    missionIcon: {
      fontSize: 28,
    },
    missionTimePill: {
      borderRadius:    10,
      paddingHorizontal: 8,
      paddingVertical:  4,
      borderWidth:      1,
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
      fontFamily: 'Fredoka_600SemiBold',
      fontSize:   10,
      color:      '#fff',
      lineHeight: 13,
    },

    pathContainer: { alignItems: 'center', paddingBottom: 20 },
    reviewCard:    { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 14, backgroundColor: C.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#EF4444' + '55' },
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
    starBadge:  { position: 'absolute', top: -2, right: -2, backgroundColor: '#FFC93C', borderRadius: 12, width: 22, height: 22, alignItems: 'center', justifyContent: 'center' },
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
    sheetHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
      position: 'relative',
    },
    sheetCloseBtn: {
      position: 'absolute',
      right: 0,
      padding: 8,
      zIndex: 10,
    },
  })
}
