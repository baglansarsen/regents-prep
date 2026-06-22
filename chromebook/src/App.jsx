import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { ThemeProvider, useTheme } from './hooks/useTheme'
import { useXP } from './hooks/useXP'
import { useDailyStreak } from './hooks/useDailyStreak'
import { usePet } from './hooks/usePet'
import { useMistakes } from './hooks/useMistakes'
import { useSchool } from './hooks/useSchool'
import { useProgress } from './hooks/useProgress'
import { useLeaderboard } from './hooks/useLeaderboard'
import { useFriends } from './hooks/useFriends'
import { useClassroom } from './hooks/useClassroom'

import { SUBJECT_META } from '@content/subjects'
import * as livingEnvData from '@content/living-environment/index'
import * as earthScienceData from '@content/earth-science/index'
import * as chemistryData from '@content/chemistry/index'
import * as physicsData from '@content/physics/index'
import * as algebra1Data from '@content/algebra-1/index'
import * as algebra2Data from '@content/algebra-2/index'
import * as geometryData from '@content/geometry/index'
import * as lifeScienceData from '@content/life-science/index'

import OnboardingScreen from './screens/OnboardingScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import ResultsScreen from './screens/ResultsScreen'
import ExamPickerScreen from './screens/ExamPickerScreen'
import ExamScreen from './screens/ExamScreen'
import RegentsExamResultsScreen from './screens/RegentsExamResultsScreen'
import MistakesScreen from './screens/MistakesScreen'
import AnalyticsScreen from './screens/AnalyticsScreen'
import PetShopScreen from './screens/PetShopScreen'
import LeaderboardScreen from './screens/LeaderboardScreen'
import ProfileScreen from './screens/ProfileScreen'
import PetPickerScreen from './screens/PetPickerScreen'
import BattleScreen from './screens/BattleScreen'
import BattleQuizScreen from './screens/BattleQuizScreen'
import BattleResultsScreen from './screens/BattleResultsScreen'
import TeacherDashboardScreen from './screens/TeacherDashboardScreen'
import FocusScreen from './screens/FocusScreen'
import FocusHistoryScreen from './screens/FocusHistoryScreen'
import FlashcardScreen from './screens/FlashcardScreen'
import PlacementTestScreen from './screens/PlacementTestScreen'
import ReggieAnim from './components/ReggieAnim'
import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'

function MainLayout() {
  const { user, loading: authLoading, signInWithGoogle, signInWithEmail, signUpWithEmail, signInAsGuest, logOut } = useAuth()
  const { isDark, mode, themeChosen, toggleTheme, pickTheme } = useTheme()

  // User States & hooks
  const [subject, setSubjectRaw] = useState(() => localStorage.getItem('regents_subject') || 'living-environment')
  const { xp, earnXP, spendXP, level } = useXP(user?.uid)
  const { streak, studiedToday, weekDays, markStudied, hasFreeze, buyFreeze } = useDailyStreak(user?.uid)
  const { mistakes, mistakeCount, dueMistakes, dueCount, saveMistakes, removeMistakes, clearMistakes, getReviewSet } = useMistakes(subject)
  const { school, saveSchool, loading: schoolLoading } = useSchool(user)
  const { history, saveResult } = useProgress(user?.uid)
  const classroomHook = useClassroom(user?.uid, user)
  const [activeAssignmentId, setActiveAssignmentId] = useState(null)
  const { leaderboard, loading: lbLoading, refresh: refreshLb } = useLeaderboard(user?.uid)
  
  const {
    friends,
    incomingRequests,
    friendCode,
    addByCode,
    addError,
    successMsg,
    acceptRequest,
    declineRequest,
    schoolPeers,
    loadSchoolPeers,
    addFriendDirectly
  } = useFriends(user?.uid, user)
  
  const {
    pet,
    inventory,
    pendingEvolution,
    activeReaction,
    activeFloatMessage,
    feedPet,
    playWithPet,
    drinkPotion,
    addInventory,
    toggleCosmetic,
    renamePet,
    checkAndEvolve,
    clearPendingEvolution,
    triggerReaction,
    getPetMessage,
    initializePet,
    switchBuddy,
    petPet,
    dailyDig,
    getTodayQuest,
    updateQuestProgress
  } = usePet(user?.uid)

  const [screen, setScreen] = useState('home') // 'home' | 'focus' | 'focusHistory' | 'flashcards' | 'placement' | 'exams' | 'mistakes' | 'analytics' | 'shop' | 'profile' | 'petPicker' | 'quiz' | 'examActive' | 'results'
  const [flashcardSubject, setFlashcardSubject] = useState(null) // subject key when navigating to flashcards
  const [flashcardTopic, setFlashcardTopic] = useState(null) // topic key when navigating to flashcards

  // Quiz parameters
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizResults, setQuizResults] = useState(null)
  const [activeExam, setActiveExam] = useState(null)
  const [examResultsData, setExamResultsData] = useState(null)

  // Battle Arena parameters
  const [battleOpponent, setBattleOpponent] = useState(null)
  const [battleQuestions, setBattleQuestions] = useState([])
  const [battleResults, setBattleResults] = useState(null)
  const [battleReward, setBattleReward] = useState(null)

  // Gamification & XP Boost States
  const [doubleXPEndTime, setDoubleXPEndTime] = useState(() => {
    return Number(localStorage.getItem('@double_xp_end') || '0')
  })
  const activateXPBoost = useCallback(async (durationSeconds, cost) => {
    if (xp < cost) return 'insufficient_xp'
    const success = await spendXP(cost)
    if (!success) return 'insufficient_xp'
    const currentEnd = Number(localStorage.getItem('@double_xp_end') || '0')
    const newEnd = Math.max(Date.now(), currentEnd) + durationSeconds * 1000
    localStorage.setItem('@double_xp_end', String(newEnd))
    setDoubleXPEndTime(newEnd)
    window.dispatchEvent(new Event('storage'))
    return 'success'
  }, [xp, spendXP])
  const [isMistakeQuiz, setIsMistakeQuiz] = useState(false)

  // Global settings states
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('@sound_effects_enabled') !== 'false'
  })
  const [teacherMode, setTeacherMode] = useState(() => {
    return localStorage.getItem('@is_teacher_mode') === 'true'
  })

  // Level Up Confetti visual states
  const [showLevelUpModal, setShowLevelUpModal] = useState(false)
  const [celebratedLevel, setCelebratedLevel] = useState(null)

  // 🎇 Live Level-Up Monitor with domestic falling confetti!
  useEffect(() => {
    if (level && level.level) {
      if (celebratedLevel === null) {
        setCelebratedLevel(level.level)
        return
      }
      if (level.level > celebratedLevel) {
        setShowLevelUpModal(true)
        setCelebratedLevel(level.level)
        runDOMConfetti()
      }
    }
  }, [level, celebratedLevel])

  function runDOMConfetti() {
    const container = document.createElement('div')
    container.className = 'confetti-canvas-overlay'
    document.body.appendChild(container)

    const colors = ['#58CC02', '#1CB0F6', '#CE82FF', '#FFC800', '#FF4B4B']
    for (let i = 0; i < 75; i++) {
      const p = document.createElement('div')
      p.style.position = 'absolute'
      p.style.width = Math.random() * 12 + 6 + 'px'
      p.style.height = Math.random() * 8 + 4 + 'px'
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      p.style.left = Math.random() * 100 + 'vw'
      p.style.top = '-10px'
      p.style.opacity = Math.random() * 0.7 + 0.3
      p.style.transform = `rotate(${Math.random() * 360}deg)`
      container.appendChild(p)

      const speed = Math.random() * 4 + 3
      const drift = Math.random() * driftFactor()
      let posY = -10
      let posX = parseFloat(p.style.left)

      function driftFactor() {
        return Math.random() * 2 - 1
      }

      const interval = setInterval(() => {
        posY += speed
        posX += drift
        p.style.top = posY + 'px'
        p.style.left = posX + 'vw'

        if (posY > window.innerHeight) {
          clearInterval(interval)
          p.remove()
        }
      }, 16)
    }

    setTimeout(() => {
      container.remove()
    }, 4500)
  }

  // Sync and tick Double XP countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const end = Number(localStorage.getItem('@double_xp_end') || '0')
      if (end !== doubleXPEndTime) {
        setDoubleXPEndTime(end)
      }
    }, 1000)
    
    const syncHandler = () => {
      setDoubleXPEndTime(Number(localStorage.getItem('@double_xp_end') || '0'))
    }
    window.addEventListener('storage', syncHandler)
    
    return () => {
      clearInterval(timer)
      window.removeEventListener('storage', syncHandler)
    }
  }, [doubleXPEndTime])

  const setSubject = useCallback((s) => {
    localStorage.setItem('regents_subject', s)
    setSubjectRaw(s)
  }, [])

  const subjectDataMap = {
    'living-environment': livingEnvData,
    'earth-science': earthScienceData,
    'chemistry': chemistryData,
    'physics': physicsData,
    'algebra-1': algebra1Data,
    'algebra-2': algebra2Data,
    'geometry': geometryData,
    'life-science': lifeScienceData,
  }

  const subjectData = subjectDataMap[subject] || livingEnvData

  // 📱 Mr. SeN's Mobile Beta Sign-up States & Handlers
  const [showBetaPrompt, setShowBetaPrompt] = useState(false)
  const [betaOption, setBetaOption] = useState('ask') // 'ask' | 'submitting' | 'submitted'
  const [betaGmail, setBetaGmail] = useState('')
  const [betaError, setBetaError] = useState(null)

  useEffect(() => {
    if (xp >= 500 && screen === 'home') {
      const prompted = localStorage.getItem('@mobile_beta_prompted')
      if (!prompted) {
        setShowBetaPrompt(true)
      }
    }
  }, [xp, screen])

  const handleCloseBetaPrompt = () => {
    localStorage.setItem('@mobile_beta_prompted', 'true')
    setShowBetaPrompt(false)
  }

  const handleBetaSubmit = async (e) => {
    e.preventDefault()
    if (!betaGmail.trim()) {
      setBetaError('Please enter a valid Gmail address!')
      return
    }
    if (!betaGmail.toLowerCase().endsWith('@gmail.com')) {
      setBetaError('Please enter a valid Gmail address (must end with @gmail.com)!')
      return
    }

    setBetaOption('submitting')
    setBetaError(null)

    try {
      await addDoc(collection(db, 'mobileBetaSignups'), {
        uid: user?.uid || 'guest',
        displayName: user?.displayName || 'Guest Student',
        email: betaGmail.trim(),
        xp: xp,
        school: school || 'Independent',
        timestamp: new Date().toISOString()
      })
      setBetaOption('submitted')
      localStorage.setItem('@mobile_beta_prompted', 'true')
    } catch (err) {
      console.error('[Beta Signup] Error:', err)
      setBetaError('Failed to submit. Please try again!')
      setBetaOption('ask')
    }
  }

  // Auto redirect to onboarding if school not set yet (skip for guest users)
  useEffect(() => {
    if (user && !schoolLoading && !school && screen !== 'onboarding') {
      if (user.isAnonymous) {
        // Guest users skip onboarding — auto-assign Independent
        saveSchool('Independent')
      } else {
        setScreen('onboarding')
      }
    }
  }, [user, school, schoolLoading, screen])

  // Auto redirect to pet picker if egg not chosen yet (and school onboarding complete)
  useEffect(() => {
    if (user && !schoolLoading && school && pet && !pet.chosen && screen !== 'petPicker' && screen !== 'onboarding') {
      setScreen('petPicker')
    }
  }, [user, school, schoolLoading, pet, screen])

  // Setup diagnostic baseline questions
  function handleStartPlacementTest() {
    // Collect 1 question from each major topic in subject
    const pools = subjectData.questions || []
    const topics = subjectData.TOPIC_ORDER || []
    const sample = []
    
    topics.slice(0, 5).forEach(t => {
      const q = pools.find(item => item.topic === t)
      if (q) sample.push(q)
    })
    
    if (sample.length === 0) {
      // fallback
      sample.push(...pools.slice(0, 5))
    }
    
    setQuizQuestions(sample)
    setScreen('quiz')
  }

  // Study lesson question pools loader
  function handleStartLesson(topic, lessonIdx, totalLessons) {
    const questions = subjectData.getLessonQuestions 
      ? subjectData.getLessonQuestions(topic, lessonIdx, totalLessons)
      : subjectData.questions?.filter(q => q.topic === topic)?.slice(lessonIdx * 3, (lessonIdx + 1) * 3) || []

    if (!questions.length) {
      alert('Questions for this lesson could not be loaded.')
      return
    }
    
    // Add lesson metadata to questions
    const tagged = questions.map(q => ({ ...q, topic, lessonIndex: lessonIdx }))
    setIsMistakeQuiz(false)
    setQuizQuestions(tagged)
    setScreen('quiz')
  }

  // Study topic challenge loader
  function handleStartChallenge(topic) {
    const pools = subjectData.questions?.filter(q => q.topic === topic) || []
    if (!pools.length) {
      alert('Challenge questions could not be loaded.')
      return
    }
    // Take 5 random questions
    const selected = [...pools].sort(() => 0.5 - Math.random()).slice(0, 5)
    setIsMistakeQuiz(false)
    setQuizQuestions(selected)
    setScreen('quiz')
  }

  // Start custom quiz (used by HomeScreen for stimulus/context practice and topic review nodes)
  function handleStartCustomQuiz(questions, isMistake = false) {
    if (!questions || questions.length === 0) return
    setIsMistakeQuiz(isMistake)
    setQuizQuestions(questions)
    setScreen('quiz')
  }

  // Mistakes quiz loader (Smart Review prioritized due set)
  function handleStartMistakeQuiz() {
    const selected = getReviewSet({ subject, limit: 10 })
    if (selected.length === 0) return
    setQuizQuestions(selected)
    setIsMistakeQuiz(true)
    setScreen('quiz')
  }

  // Past Exam loader
  function handleStartExam(ex) {
    setActiveExam(ex)
    setScreen('examActive')
  }

  // Quiz end results calculation
  async function handleQuizFinished(resultsData) {
    // 1. Save session to progress history
    const topic = quizQuestions[0]?.topic || 'Mixed Concepts'
    const lessonIdx = quizQuestions[0]?.lessonIndex

    await saveResult({
      topic,
      score: resultsData.score,
      total: resultsData.total,
      correct: resultsData.correct,
      pct: resultsData.pct,
      subject,
      lessonIndex: lessonIdx
    })

    // 2. Add mistakes if wrong answers were given
    if (resultsData.wrongQuestions?.length > 0) {
      await saveMistakes(resultsData.wrongQuestions, subject)
    }

    // 2b. Resolve/advance correctly answered questions in Smart Review
    const correctQuestions = quizQuestions.filter(
      (q) => !resultsData.wrongQuestions?.some((wq) => (wq.id ?? wq.text) === (q.id ?? q.text))
    )
    if (correctQuestions.length > 0) {
      await removeMistakes(correctQuestions)
      if (isMistakeQuiz) {
        const current = Number(localStorage.getItem('@achievement_mistakes_resolved') || '0')
        localStorage.setItem('@achievement_mistakes_resolved', String(current + correctQuestions.length))
      }
    }

    // 3. Earn study XP
    if (resultsData.score > 0) {
      const freshTotal = await earnXP(resultsData.score)
      // Check pet evolution
      if (pet.chosen) checkAndEvolve(freshTotal)
    }

    // 4. Update Daily Streak
    if (resultsData.correct > 0) {
      markStudied()
    }

    // 5. Update Daily Quests
    if (resultsData.correct > 0) {
      updateQuestProgress('answer_correct', resultsData.correct)
    }
    updateQuestProgress('complete_quiz', 1)
    
    if (isMistakeQuiz) {
      updateQuestProgress('complete_mistakes', 1)
      setIsMistakeQuiz(false)
    }

    if (activeAssignmentId) {
      await classroomHook.submitAssignment(activeAssignmentId)
      setActiveAssignmentId(null)
    }

    // 6. Present Results Screen
    setQuizResults(resultsData)
    setScreen('results')
  }

  // Exam (Regents past paper) end results
  async function handleExamFinished(resultsData) {
    // Save wrong MC questions to mistakes
    const wrongMC = (resultsData.fullResults || []).filter(r => !r.correct && r.question.type !== 'written')
    if (wrongMC.length > 0) {
      await saveMistakes(wrongMC.map(r => r.question), subject)
    }

    // Save progress record
    await saveResult({
      topic: activeExam?.subject || subject,
      score: resultsData.score,
      total: resultsData.total,
      correct: resultsData.correct,
      pct: resultsData.pct,
      subject,
    })

    // Earn XP
    let xpEarned = 0
    if (resultsData.score > 0) {
      xpEarned = resultsData.score
      const freshTotal = await earnXP(resultsData.score)
      if (pet.chosen) checkAndEvolve(freshTotal)
    }

    if (activeAssignmentId) {
      await classroomHook.submitAssignment(activeAssignmentId)
      setActiveAssignmentId(null)
    }

    if (resultsData.correct > 0) {
      markStudied()
      updateQuestProgress('answer_correct', resultsData.correct)
    }

    setExamResultsData({ exam: activeExam, fullResults: resultsData.fullResults || [], xpEarned })
    setScreen('examResults')
  }

  // Battle Arena end results calculation
  const handleBattleFinished = useCallback(async (res) => {
    // 1. Calculate XP rewards
    let matchXP = res.score // points scored
    let bonus = 0
    
    // Check if the opponent was the weekly boss
    const isBoss = battleOpponent?.isBoss
    
    if (res.outcome === 'win') {
      bonus = isBoss ? 150 : 50
    } else if (res.outcome === 'draw') {
      bonus = 20
    } else {
      bonus = 10
    }
    
    let finalXP = matchXP + bonus
    if (isBoss && res.outcome === 'win') {
      finalXP *= 2 // Double XP for conquering the boss!
      localStorage.setItem('@boss_slayer_unlocked', 'true')
    }

    const freshTotal = await earnXP(finalXP)
    
    // 2. Roll a loot reward if victory
    let loot = null
    if (res.outcome === 'win') {
      const isRamen = Math.random() < 0.5
      loot = isRamen ? { id: 'ramen', name: 'Ramen Treat Cup', icon: '🍖' } : { id: 'apple', name: 'Crunchy Apple', icon: '🍎' }
      await addInventory(loot.id, 1)

      // Award +180s of Double XP
      const currentEnd = Number(localStorage.getItem('@double_xp_end') || '0')
      const newEnd = Math.max(Date.now(), currentEnd) + 180 * 1000
      localStorage.setItem('@double_xp_end', String(newEnd))
      window.dispatchEvent(new Event('storage'))
    }
    setBattleReward(loot)

    // 3. Update stats in localStorage
    const uid = user?.uid || 'guest'
    const key = `@battle_stats_${uid}`
    const raw = localStorage.getItem(key)
    let stats = { played: 0, wins: 0, losses: 0, draws: 0, streak: 0 }
    if (raw) {
      try { stats = JSON.parse(raw) } catch (_) {}
    }
    
    stats.played += 1
    if (res.outcome === 'win') {
      stats.wins += 1
      stats.streak += 1
    } else if (res.outcome === 'loss') {
      stats.losses += 1
      stats.streak = 0
    } else {
      stats.draws += 1
      stats.streak = 0
    }
    localStorage.setItem(key, JSON.stringify(stats))
    
    // Check pet evolution
    if (pet.chosen) checkAndEvolve(freshTotal)
    
    // Update daily study streak
    if (res.correct > 0) {
      markStudied()
    }
    
    // Update daily quests
    updateQuestProgress('complete_quiz', 1)

    // 4. Update stats state and show results
    setBattleResults({ ...res, score: finalXP })
    setScreen('battleResults')
  }, [user, earnXP, addInventory, pet.chosen, checkAndEvolve, markStudied, updateQuestProgress, battleOpponent])

  // Render loading screen if Firebase Auth is initializing
  if (authLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: '#0f172a',
        color: '#f8fafc',
        fontFamily: 'var(--font-outfit)',
        gap: '16px'
      }}>
        <ReggieAnim scene="loading" size={180} />
        <h2 style={{ fontWeight: 900, fontSize: '22px', margin: 0 }}>Loading Regentify...</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Preparing your study sanctuary</p>
      </div>
    )
  }

  // Render auth login portal first
  if (!user) {
    return (
      <LoginScreen
        signInWithGoogle={signInWithGoogle}
        signInWithEmail={signInWithEmail}
        signUpWithEmail={signUpWithEmail}
        signInAsGuest={signInAsGuest}
      />
    )
  }

  // Render Fullscreen Onboarding screen
  if (screen === 'onboarding') {
    return (
      <OnboardingScreen
        saveSchool={saveSchool}
        onComplete={() => setScreen('home')}
      />
    )
  }

  // Display hatch picker screen if egg not chosen
  if (screen === 'petPicker') {
    return (
      <PetPickerScreen
        initializePet={initializePet}
        onHatch={() => setScreen('home')}
      />
    )
  }

  // Render Fullscreen Quiz view
  if (screen === 'quiz') {
    return (
      <QuizScreen
        questions={quizQuestions}
        updateQuestProgress={updateQuestProgress}
        onFinish={handleQuizFinished}
        onClose={() => setScreen('home')}
        pet={pet}
        subject={subject}
      />
    )
  }

  // Render Fullscreen Active Exam view
  if (screen === 'examActive') {
    return (
      <ExamScreen
        exam={activeExam}
        updateQuestProgress={updateQuestProgress}
        onFinish={handleExamFinished}
        onClose={() => setScreen('home')}
        pet={pet}
      />
    )
  }

  // Render Regents Exam Results view
  if (screen === 'examResults') {
    return (
      <RegentsExamResultsScreen
        exam={examResultsData?.exam}
        results={examResultsData?.fullResults || []}
        xpEarned={examResultsData?.xpEarned}
        onRetake={() => {
          setScreen('examActive')
        }}
        onHome={() => setScreen('home')}
      />
    )
  }

  // Render Results Card view
  if (screen === 'results') {
    return (
      <ResultsScreen
        results={quizResults}
        onContinue={() => setScreen('home')}
      />
    )
  }

  // Render Fullscreen Battle Active view
  if (screen === 'battleActive') {
    return (
      <BattleQuizScreen
        questions={battleQuestions}
        opponent={battleOpponent}
        subject={subject}
        earnXP={earnXP}
        addInventory={addInventory}
        updateQuestProgress={updateQuestProgress}
        onFinish={handleBattleFinished}
        onClose={() => setScreen('battle')}
        pet={pet}
      />
    )
  }

  // Render Fullscreen Battle Results view
  if (screen === 'battleResults') {
    return (
      <BattleResultsScreen
        results={battleResults}
        opponent={battleOpponent}
        rewardItem={battleReward}
        onContinue={() => setScreen('battle')}
      />
    )
  }

  const secondsLeft = Math.max(0, Math.floor((doubleXPEndTime - Date.now()) / 1000))
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="app-container">
      {/* Left Navigation Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-logo" onClick={() => setScreen('home')}>
          <img src="/images/reggie-dino-icon.svg" className="sidebar-logo-img" alt="Regentify Logo" />
          <span className="sidebar-logo-text">Regent<span className="logo-accent">ify</span></span>
        </div>

        <div className="sidebar-menu">
          <button className={`sidebar-btn ${screen === 'home' ? 'active' : ''}`} onClick={() => setScreen('home')}>
            <span className="sidebar-icon">🚀</span> Study units
          </button>

          <button className={`sidebar-btn ${screen === 'exams' ? 'active' : ''}`} onClick={() => setScreen('exams')}>
            <span className="sidebar-icon">📋</span> Past Exams
          </button>

          <button className={`sidebar-btn ${screen === 'battle' || screen === 'battleActive' || screen === 'battleResults' ? 'active' : ''}`} onClick={() => setScreen('battle')}>
            <span className="sidebar-icon">⚔️</span> Battle Arena
          </button>

          <button className={`sidebar-btn ${screen === 'mistakes' ? 'active' : ''}`} onClick={() => setScreen('mistakes')}>
            <span className="sidebar-icon">🩹</span> Smart Review
          </button>

          <button className={`sidebar-btn ${screen === 'focus' || screen === 'focusHistory' ? 'active' : ''}`} onClick={() => setScreen('focus')}>
            <span className="sidebar-icon">🎯</span> Focus Timer
          </button>

          <button className={`sidebar-btn ${screen === 'analytics' ? 'active' : ''}`} onClick={() => setScreen('analytics')}>
            <span className="sidebar-icon">📈</span> Analytics
          </button>

          <button className={`sidebar-btn ${screen === 'shop' ? 'active' : ''}`} onClick={() => setScreen('shop')}>
            <span className="sidebar-icon">🛒</span> Shop
          </button>

          <button className={`sidebar-btn ${screen === 'leaderboard' ? 'active' : ''}`} onClick={() => setScreen('leaderboard')}>
            <span className="sidebar-icon">🏆</span> Leaderboard
          </button>

          {teacherMode && (
            <button className={`sidebar-btn ${screen === 'teacher' ? 'active' : ''}`} onClick={() => setScreen('teacher')}>
              <span className="sidebar-icon">🏫</span> Teacher View
            </button>
          )}

          <button className={`sidebar-btn ${screen === 'profile' ? 'active' : ''}`} onClick={() => setScreen('profile')}>
            <span className="sidebar-icon">⚙️</span> Settings
          </button>
        </div>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 800 }}>
            <span>Theme Mode</span>
            <button className="btn-duo-outline" style={{ padding: '4px 8px', fontSize: '11px', borderBottomWidth: '1.5px' }} onClick={toggleTheme}>
              {isDark ? '🌙' : '☀️'}
            </button>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', textAlign: 'center', marginTop: '4px' }}>
            Chromebook Web v0.1.0
          </div>
        </div>
      </nav>

      {/* Main Panel Content Panel */}
      <div className="main-content">
        
        {/* Topbar statistics */}
        <header className="topbar">
          <div>
            <select
              className="subject-selector"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {Object.values(SUBJECT_META).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.icon} {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="topbar-stats">
            <div className="stat-badge streak" title="Daily study streak">
              🔥 {streak} days
            </div>

            {secondsLeft > 0 && (
              <div className="stat-badge xp-boost" style={{
                background: 'linear-gradient(135deg, var(--purple), #ec4899)',
                color: '#fff',
                fontWeight: 900,
                boxShadow: '0 0 12px rgba(236, 72, 153, 0.6)',
                border: 'none',
                animation: 'pulse 1.5s infinite'
              }} title="Double XP Boost active!">
                ⚡ 2x XP: {formatTime(secondsLeft)}
              </div>
            )}

            <div className="stat-badge xp" title="Study experience points">
              ⭐ {xp} XP
            </div>
          </div>
        </header>

        {/* Display Active Screen Panel */}
        <div style={{ flex: '1 1 0%', overflowY: 'auto', overflowX: 'hidden', minHeight: 0, WebkitOverflowScrolling: 'touch' }}>
          {screen === 'home' && (
            <HomeScreen
              user={user}
              subject={subject}
              setSubject={setSubject}
              subjectData={subjectData}
              history={history}
              streak={streak}
              studiedToday={studiedToday}
              weekDays={weekDays}
              xp={xp}
              level={level}
              hasFreeze={hasFreeze}
              buyFreeze={buyFreeze}
              pet={pet}
              inventory={inventory}
              feedPet={feedPet}
              playWithPet={playWithPet}
              drinkPotion={drinkPotion}
              addInventory={addInventory}
              earnXP={earnXP}
              getTodayQuest={getTodayQuest}
              updateQuestProgress={updateQuestProgress}
              petPet={petPet}
              dailyDig={dailyDig}
              activeReaction={activeReaction}
              activeFloatMessage={activeFloatMessage}
              getPetMessage={getPetMessage}
              onStartLesson={handleStartLesson}
              onStartChallenge={handleStartChallenge}
              onStartCustomQuiz={handleStartCustomQuiz}
              onStartPlacementTest={handleStartPlacementTest}
              mistakeCount={mistakeCount}
              dueCount={dueCount}
              dueMistakes={dueMistakes}
              mistakes={mistakes}
              setScreen={setScreen}
              setFlashcardSubject={setFlashcardSubject}
              setFlashcardTopic={setFlashcardTopic}
              classroomHook={classroomHook}
              setActiveAssignmentId={setActiveAssignmentId}
            />
          )}

          {screen === 'battle' && (
            <BattleScreen
              user={user}
              subject={subject}
              subjectData={subjectData}
              friends={friends}
              incomingRequests={incomingRequests}
              friendCode={friendCode}
              addByCode={addByCode}
              addError={addError}
              successMsg={successMsg}
              acceptRequest={acceptRequest}
              declineRequest={declineRequest}
              school={school}
              schoolPeers={schoolPeers}
              loadSchoolPeers={loadSchoolPeers}
              addFriendDirectly={addFriendDirectly}
              onStartBattle={(opponent, questions) => {
                setBattleOpponent(opponent)
                setBattleQuestions(questions)
                setScreen('battleActive')
              }}
            />
          )}

          {screen === 'exams' && (
            <ExamPickerScreen
              subject={subject}
              onStartExam={handleStartExam}
            />
          )}

          {screen === 'mistakes' && (
            <MistakesScreen
              mistakes={mistakes.filter(m => m.subject === subject)}
              clearMistakes={clearMistakes}
              onStartMistakeQuiz={handleStartMistakeQuiz}
              setScreen={setScreen}
            />
          )}

          {screen === 'analytics' && (
            <AnalyticsScreen
              subject={subject}
              history={history}
              subjectData={subjectData}
              uid={user?.uid}
            />
          )}

          {screen === 'shop' && (
            <PetShopScreen
              xp={xp}
              spendXP={spendXP}
              inventory={inventory}
              addInventory={addInventory}
              pet={pet}
              toggleCosmetic={toggleCosmetic}
              switchBuddy={switchBuddy}
              buyFreeze={buyFreeze}
              hasFreeze={hasFreeze}
              activateXPBoost={activateXPBoost}
              doubleXPEndTime={doubleXPEndTime}
            />
          )}

          {screen === 'leaderboard' && (
            <LeaderboardScreen
              user={user}
              leaderboard={leaderboard}
              loading={lbLoading}
              refresh={refreshLb}
              school={school}
              friends={friends}
              setScreen={setScreen}
            />
          )}

          {screen === 'profile' && (
            <ProfileScreen
              user={user}
              logOut={logOut}
              school={school}
              saveSchool={saveSchool}
              xp={xp}
              level={level}
              streak={streak}
              toggleTheme={toggleTheme}
              mode={mode}
              history={history}
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              teacherMode={teacherMode}
              setTeacherMode={setTeacherMode}
              subject={subject}
              subjectData={subjectData}
              classroomHook={classroomHook}
            />
          )}


          {screen === 'focus' && (
            <FocusScreen
              user={user}
              subject={subject}
              onShowHistory={() => setScreen('focusHistory')}
            />
          )}

          {screen === 'focusHistory' && (
            <FocusHistoryScreen
              onBack={() => setScreen('focus')}
            />
          )}

          {screen === 'flashcards' && (
            <FlashcardScreen
              user={user}
              subject={flashcardSubject || subject}
              topic={flashcardTopic}
              onClose={() => {
                setScreen('home')
                setFlashcardTopic(null)
                setFlashcardSubject(null)
              }}
            />
          )}

          {screen === 'placement' && (
            <PlacementTestScreen
              subject={subject}
              subjectData={subjectData}
              onComplete={() => setScreen('home')}
              onSkip={() => setScreen('home')}
            />
          )}

          {screen === 'teacher' && (
            <TeacherDashboardScreen
              subject={subject}
              school={school}
              user={user}
              classroomHook={classroomHook}
              subjectData={subjectData}
            />
          )}
        </div>
      </div>

      {/* 📱 Mr. SeN's Mobile Beta Sign-up Prompt */}
      {showBetaPrompt && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          animation: 'fade-in 0.25s ease'
        }}>
          <div className="card-glass" style={{
            maxWidth: '520px',
            width: '90%',
            padding: '36px',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            animation: 'scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            border: '2px solid var(--brand)',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={handleCloseBetaPrompt}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            {betaOption === 'submitted' ? (
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', padding: '12px 0' }}>
                <span style={{ fontSize: '72px', animation: 'float 2s ease infinite' }}>🚀</span>
                <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '24px', color: 'var(--brand-dark)' }}>
                  You're on the list!
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '22px' }}>
                  Awesome! Mr. SeN will add you to the exclusive early access mobile beta. Keep practicing on your Chromebook to unlock more surprises!
                </p>
                <button
                  className="btn-duo btn-duo-correct"
                  onClick={() => setShowBetaPrompt(false)}
                  style={{ width: '100%', padding: '14px', marginTop: '10px' }}
                >
                  Awesome, let's study! 🎯
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '48px', animation: 'pulse 1.5s infinite' }}>📱</span>
                  <div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      color: 'var(--brand-dark)',
                      letterSpacing: '1.2px',
                      backgroundColor: 'var(--brand-bg)',
                      padding: '4px 10px',
                      borderRadius: '20px'
                    }}>
                      Milestone Unlocked!
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '22px', marginTop: '4px' }}>
                      Try the Mobile App early!
                    </h2>
                  </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '22px' }}>
                  Congrats on crossing <strong>{xp} XP</strong>! 🎉 To reward your consistency, would you like early access to try out the **mobile version** of this app?
                </p>

                <p style={{
                  fontSize: '13.5px',
                  lineHeight: '20px',
                  backgroundColor: 'var(--surface-2)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  borderLeft: '4px solid var(--brand)',
                  color: 'var(--text)'
                }}>
                  💡 <strong>Notice:</strong> This entire application is designed and built with pride by your teacher, <strong>Mr. SeN</strong>, to support your learning!
                </p>

                <form onSubmit={handleBetaSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-muted)' }}>
                    Enter your Gmail address to receive the beta invite:
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. classmate@gmail.com"
                    value={betaGmail}
                    onChange={(e) => setBetaGmail(e.target.value)}
                    disabled={betaOption === 'submitting'}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '2px solid var(--border)',
                      fontSize: '14px',
                      fontWeight: 700,
                      backgroundColor: 'var(--surface)',
                      outline: 'none',
                      color: 'var(--text)'
                    }}
                    required
                  />

                  {betaError && (
                    <div style={{ color: 'var(--wrong-dark)', backgroundColor: 'var(--wrong-bg)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontWeight: 700 }}>
                      ⚠️ {betaError}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <button
                      type="button"
                      className="btn-duo-outline"
                      onClick={handleCloseBetaPrompt}
                      disabled={betaOption === 'submitting'}
                      style={{ flex: 1, padding: '12px' }}
                    >
                      No, thanks
                    </button>
                    <button
                      type="submit"
                      className="btn-duo btn-duo-correct"
                      disabled={betaOption === 'submitting'}
                      style={{ flex: 2, padding: '12px' }}
                    >
                      {betaOption === 'submitting' ? 'Submitting...' : 'Yes, Invite me! ✉️'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 👑 Widescreen Level Up celebration modal overlay */}
      {showLevelUpModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          animation: 'fade-in 0.3s ease'
        }}>
          <div className="card-glass" style={{
            maxWidth: '480px',
            width: '90%',
            padding: '40px',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(88, 204, 2, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '24px',
            animation: 'scale-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            border: '3px solid var(--brand)',
            position: 'relative'
          }}>
            {/* Pulsing crown emoji */}
            <span style={{ fontSize: '80px', animation: 'float 2s ease infinite alternate' }}>👑</span>
            
            <div>
              <span style={{
                fontSize: '11px',
                fontWeight: 900,
                textTransform: 'uppercase',
                color: 'var(--brand-dark)',
                letterSpacing: '2px',
                backgroundColor: 'var(--brand-bg)',
                padding: '4px 12px',
                borderRadius: '20px'
              }}>
                Achievement Unlocked!
              </span>
              <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '32px', marginTop: '12px', color: 'var(--brand-dark)' }}>
                LEVEL UP! 🎉
              </h2>
            </div>

            <p style={{ fontSize: '16px', lineHeight: '24px', margin: 0, fontWeight: 700 }}>
              Congratulations! You've officially achieved <br />
              <strong style={{ fontSize: '20px', color: 'var(--purple-dark)', fontFamily: 'var(--font-outfit)' }}>
                Level {level.level}: {level.name}
              </strong>
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '18px', margin: 0 }}>
              Your brain is getting stronger! Each correct answer unlocks your potential. Mr. SeN is proud of your consistency! 👨‍🏫
            </p>

            <button
              className="btn-duo btn-duo-correct"
              onClick={() => setShowLevelUpModal(false)}
              style={{ width: '100%', padding: '14px', fontSize: '15px' }}
            >
              Let's Keep Studying! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainLayout />
      </ThemeProvider>
    </AuthProvider>
  )
}
