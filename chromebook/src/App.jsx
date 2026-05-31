import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { ThemeProvider, useTheme } from './hooks/useTheme'
import { useXP } from './hooks/useXP'
import { useDailyStreak } from './hooks/useDailyStreak'
import { useLives } from './hooks/useLives'
import { usePet } from './hooks/usePet'
import { useMistakes } from './hooks/useMistakes'
import { useSchool } from './hooks/useSchool'
import { useProgress } from './hooks/useProgress'
import { useLeaderboard } from './hooks/useLeaderboard'
import { useFriends } from './hooks/useFriends'

import { SUBJECT_META } from '@content/subjects'
import * as livingEnvData from '@content/living-environment/index'
import * as earthScienceData from '@content/earth-science/index'
import * as chemistryData from '@content/chemistry/index'
import * as physicsData from '@content/physics/index'
import * as algebra1Data from '@content/algebra-1/index'
import * as algebra2Data from '@content/algebra-2/index'
import * as geometryData from '@content/geometry/index'

import OnboardingScreen from './screens/OnboardingScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import ResultsScreen from './screens/ResultsScreen'
import ExamPickerScreen from './screens/ExamPickerScreen'
import ExamScreen from './screens/ExamScreen'
import MistakesScreen from './screens/MistakesScreen'
import AnalyticsScreen from './screens/AnalyticsScreen'
import PetShopScreen from './screens/PetShopScreen'
import LeaderboardScreen from './screens/LeaderboardScreen'
import ProfileScreen from './screens/ProfileScreen'
import PetPickerScreen from './screens/PetPickerScreen'
import BattleScreen from './screens/BattleScreen'
import BattleQuizScreen from './screens/BattleQuizScreen'
import BattleResultsScreen from './screens/BattleResultsScreen'

function MainLayout() {
  const { user, loading: authLoading, signInWithGoogle, signInWithEmail, signUpWithEmail, signInAsGuest, logOut } = useAuth()
  const { isDark, mode, themeChosen, toggleTheme, pickTheme } = useTheme()

  const [screen, setScreen] = useState('home') // 'home' | 'exams' | 'mistakes' | 'analytics' | 'shop' | 'profile' | 'petPicker' | 'quiz' | 'examActive' | 'results'
  const [subject, setSubjectRaw] = useState(() => localStorage.getItem('regents_subject') || 'living-environment')
  
  // Quiz parameters
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizResults, setQuizResults] = useState(null)
  const [activeExam, setActiveExam] = useState(null)

  // Battle Arena parameters
  const [battleOpponent, setBattleOpponent] = useState(null)
  const [battleQuestions, setBattleQuestions] = useState([])
  const [battleResults, setBattleResults] = useState(null)
  const [battleReward, setBattleReward] = useState(null)

  // Gamification & XP Boost States
  const [doubleXPEndTime, setDoubleXPEndTime] = useState(() => {
    return Number(localStorage.getItem('@double_xp_end') || '0')
  })
  const [isMistakeQuiz, setIsMistakeQuiz] = useState(false)

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
  }

  const subjectData = subjectDataMap[subject] || livingEnvData

  // User States & hooks
  const { xp, earnXP, spendXP, level } = useXP(user?.uid)
  const { streak, studiedToday, weekDays, markStudied, hasFreeze, buyFreeze } = useDailyStreak(user?.uid)
  const { lives, maxLives, loseLife, refillLives, addLife } = useLives(user?.uid)
  const { mistakes, mistakeCount, saveMistakes, removeMistakes, clearMistakes } = useMistakes()
  const { school, saveSchool, loading: schoolLoading } = useSchool(user)
  const { history, saveResult } = useProgress(user?.uid)
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

  // Auto redirect to onboarding if school not set yet
  useEffect(() => {
    if (user && !schoolLoading && !school && screen !== 'onboarding') {
      setScreen('onboarding')
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
    if (lives <= 0) {
      alert('You have run out of lives! Refill your hearts using XP or wait for them to regenerate.')
      return
    }
    const questions = subjectData.getLessonQuestions 
      ? subjectData.getLessonQuestions(topic, lessonIdx, totalLessons)
      : subjectData.questions?.filter(q => q.topic === topic)?.slice(lessonIdx * 3, (lessonIdx + 1) * 3) || []

    if (!questions.length) {
      alert('Questions for this lesson could not be loaded.')
      return
    }
    
    // Add lesson metadata to questions
    const tagged = questions.map(q => ({ ...q, topic, lessonIndex: lessonIdx }))
    setQuizQuestions(tagged)
    setScreen('quiz')
  }

  // Study topic challenge loader
  function handleStartChallenge(topic) {
    if (lives <= 0) {
      alert('Refill your lives first to begin unit challenges!')
      return
    }
    const pools = subjectData.questions?.filter(q => q.topic === topic) || []
    if (!pools.length) {
      alert('Challenge questions could not be loaded.')
      return
    }
    // Take 5 random questions
    const selected = [...pools].sort(() => 0.5 - Math.random()).slice(0, 5)
    setQuizQuestions(selected)
    setScreen('quiz')
  }

  // Mistakes quiz loader
  function handleStartMistakeQuiz() {
    if (lives <= 0) {
      alert('Refill your lives to practice mistakes!')
      return
    }
    const selected = [...mistakes].slice(0, 5)
    setQuizQuestions(selected)
    setIsMistakeQuiz(true)
    setScreen('quiz')
  }

  // Past Exam loader
  function handleStartExam(ex) {
    if (lives <= 0) {
      alert('Refill your lives to take mock exams!')
      return
    }
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

    // 2b. If this was a mistakes review quiz, remove correctly answered questions from the review deck
    if (isMistakeQuiz) {
      const correctQuestions = quizQuestions.filter(
        (q) => !resultsData.wrongQuestions?.some((wq) => (wq.id ?? wq.text) === (q.id ?? q.text))
      )
      if (correctQuestions.length > 0) {
        await removeMistakes(correctQuestions)
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

    // 6. Present Results Screen
    setQuizResults(resultsData)
    setScreen('results')
  }

  // Battle Arena end results calculation
  const handleBattleFinished = useCallback(async (res) => {
    // 1. Calculate XP rewards
    let matchXP = res.score // points scored
    let bonus = 0
    if (res.outcome === 'win') bonus = 50
    else if (res.outcome === 'draw') bonus = 20
    else bonus = 10
    
    const finalXP = matchXP + bonus
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
  }, [user, earnXP, addInventory, pet.chosen, checkAndEvolve, markStudied, updateQuestProgress])

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
        gap: '12px'
      }}>
        <div style={{ fontSize: '72px', animation: 'float 1.5s ease-in-out infinite' }}>📖</div>
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
        loseLife={loseLife}
        updateQuestProgress={updateQuestProgress}
        onFinish={handleQuizFinished}
        onClose={() => setScreen('home')}
      />
    )
  }

  // Render Fullscreen Active Exam view
  if (screen === 'examActive') {
    return (
      <ExamScreen
        exam={activeExam}
        updateQuestProgress={updateQuestProgress}
        onFinish={handleQuizFinished}
        onClose={() => setScreen('home')}
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
          <span style={{ fontSize: '32px' }}>📖</span>
          <span className="sidebar-logo-text">Regentify</span>
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
            <span className="sidebar-icon">📕</span> Mistakes
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

            <div className="stat-badge lives" title="Hearts (study lives)">
              ❤️ {lives} lives
              {lives < maxLives && (
                <button
                  onClick={() => {
                    if (confirm(`Refill all lives for ${maxLives * 60} XP?`)) {
                      refillLives(spendXP)
                    }
                  }}
                  style={{
                    marginLeft: '8px',
                    background: 'var(--wrong)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '2px 6px',
                    fontSize: '10px',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  Refill
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Display Active Screen Panel */}
        <div style={{ flexGrow: 1, overflowY: 'auto' }}>
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
              lives={lives}
              maxLives={maxLives}
              refillLives={refillLives}
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
              onStartPlacementTest={handleStartPlacementTest}
              mistakeCount={mistakeCount}
              setScreen={setScreen}
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
              mistakes={mistakes}
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
            />
          )}

          {screen === 'leaderboard' && (
            <LeaderboardScreen
              user={user}
              leaderboard={leaderboard}
              loading={lbLoading}
              refresh={refreshLb}
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
            />
          )}
        </div>
      </div>
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
