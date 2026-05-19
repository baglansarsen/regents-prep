import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { getLevel, regentsXP } from './data/levels'
import * as livingEnvData from './data/living-environment/index'
import * as earthScienceData from './data/earth-science/index'
import { SUBJECT_META } from './data/subjects'
import { useAuth } from './hooks/useAuth'
import { useTheme } from './hooks/useTheme'
import { useProgress } from './hooks/useProgress'
import { useDailyStreak } from './hooks/useDailyStreak'
import { useUnlocks } from './hooks/useUnlocks'
import { useXP } from './hooks/useXP'
import { useAchievements } from './hooks/useAchievements'
import { useSchool } from './hooks/useSchool'
import { useDailyQuestion } from './hooks/useDailyQuestion'
import { useBookmarks } from './hooks/useBookmarks'
import { useFriends } from './hooks/useFriends'
import { useChallenges } from './hooks/useChallenges'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import ResultsScreen from './screens/ResultsScreen'
import PracticeTestScreen from './screens/PracticeTestScreen'
import AnalyticsScreen from './screens/AnalyticsScreen'
import DiagnosticResultsScreen from './screens/DiagnosticResultsScreen'
import AchievementsScreen from './screens/AchievementsScreen'
import AchievementToast from './components/AchievementToast'
import GuestUpgradeModal from './components/GuestUpgradeModal'
import BookmarksScreen from './screens/BookmarksScreen'
import SpeedRoundScreen, { SpeedResults } from './screens/SpeedRoundScreen'
import ChallengeResultScreen from './screens/ChallengeResultScreen'
import SchoolOnboardingScreen from './screens/SchoolOnboardingScreen'
import AdminScreen, { ADMIN_EMAIL } from './screens/AdminScreen'
import RegentsExamPickerScreen from './screens/RegentsExamPickerScreen'
import RegentsExamScreen from './screens/RegentsExamScreen'
import RegentsExamResultsScreen from './screens/RegentsExamResultsScreen'

export default function App() {
  const { theme, setTheme } = useTheme()
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, signInAsGuest, linkEmailToGuest, linkGoogleToGuest, logOut } = useAuth()

  const [subject, setSubjectRaw] = useState(
    () => localStorage.getItem('regents_subject') || 'living-environment'
  )
  const setSubject = useCallback((s) => {
    localStorage.setItem('regents_subject', s)
    setSubjectRaw(s)
  }, [])

  const sd = subject === 'earth-science' ? earthScienceData : livingEnvData
  const { questions, getByTopic, shuffled, buildDiagnosticSet, getContextual, TOPIC_ORDER } = sd
  const getLabQuestions = sd.getLabQuestions ?? (() => [])

  const { history, saveResult: saveResultRaw, masteryPct: masteryPctRaw } = useProgress(user?.uid)

  const subjectHistory = useMemo(
    () => history.filter((h) => (h.subject ?? 'living-environment') === subject),
    [history, subject]
  )

  const saveResult = useCallback((args) => saveResultRaw({ ...args, subject }), [saveResultRaw, subject])
  const masteryPct = useCallback((topic) => masteryPctRaw(topic, subject), [masteryPctRaw, subject])

  const { streak, studiedToday, weekDays, markStudied } = useDailyStreak(user?.uid)
  const { isUnlocked, unlockHint, completedCount, totalTopics } = useUnlocks(subjectHistory, TOPIC_ORDER)
  const { xp, earnXP, spendXP, loaded: xpLoaded } = useXP(user?.uid)
  const { earnedIds, allAchievements, currentToast, dismissToast, queueToast, recordPracticeTest, recordDiagnostic } =
    useAchievements(user?.uid, { history: subjectHistory, streak, xp, achievements: sd.achievements })

  // Level-up detection — only fires after initial XP load
  const prevLevelRef = useRef(null)
  useEffect(() => {
    if (!xpLoaded) return
    const cur = getLevel(xp).level
    if (prevLevelRef.current === null) { prevLevelRef.current = cur; return }
    if (cur > prevLevelRef.current) {
      const info = getLevel(xp)
      queueToast({ emoji: info.emoji, name: `Level Up! ${info.title}`, description: `You reached Level ${info.level}`, tier: 'gold' })
    }
    prevLevelRef.current = cur
  }, [xp, xpLoaded, queueToast])
  const { school, saveSchool, loading: schoolLoading } = useSchool(user, xp, earnedIds)
  const { bookmarkedIds, toggle: toggleBookmark, remove: removeBookmark } = useBookmarks(user?.uid)
  const { question: dailyQ, answeredToday: dailyAnswered, record: dailyRecord, loading: dailyLoading, submitAnswer: submitDailyAnswer } = useDailyQuestion(user?.uid)
  const {
    friends, friendCode, feed: friendFeed,
    incomingRequests, sentRequests,
    addError: addFriendError, setAddError: setAddFriendError,
    addFriend, sendRequest: sendFriendRequest,
    acceptRequest, declineRequest, removeFriend, logActivity,
  } = useFriends(user?.uid, user)
  const { challenges, sendBattleRequest, acceptBattle, declineBattle, submitScore } = useChallenges(user?.uid)

  const handleDailySubmit = useCallback(async (choiceIndex) => {
    const res = await submitDailyAnswer(choiceIndex)
    if (res) { earnXP(res.xpEarned); markStudied() }
    return res
  }, [submitDailyAnswer, earnXP, markStudied])

  const [screen, setScreen]           = useState('home')
  const [questionSet, setQuestionSet] = useState([])
  const [quizResult, setQuizResult]   = useState(null)
  const [activeTopic, setActiveTopic] = useState(null)
  const [diagResult, setDiagResult]   = useState(null)
  const [speedResult, setSpeedResult] = useState(null)
  const [noTimer, setNoTimer]         = useState(false)
  // Regents exam state
  const [activeExam, setActiveExam]         = useState(null)
  const [examResult, setExamResult]         = useState(null)
  // Battle state
  const [activeBattle, setActiveBattle]   = useState(null)
  const [challengeResult, setChallengeResult] = useState(null)
  // Guest upgrade modal
  const [showUpgrade, setShowUpgrade] = useState(false)

  const startQuiz = useCallback((topic) => {
    const pool = topic ? getByTopic(topic) : questions
    setQuestionSet(shuffled(pool))
    setActiveTopic(topic)
    setNoTimer(false)
    setScreen('quiz')
  }, [questions, getByTopic, shuffled])

  const startPracticeTest = useCallback(() => {
    setQuestionSet(shuffled(questions))
    setScreen('practiceTest')
  }, [questions, shuffled])

  const startSpeedRound = useCallback(() => {
    setQuestionSet(shuffled(questions))
    setScreen('speedRound')
  }, [questions, shuffled])

  const startContextPractice = useCallback(() => {
    setQuestionSet(shuffled(getContextual()))
    setActiveTopic(null)
    setNoTimer(true)
    setScreen('quiz')
  }, [getContextual, shuffled])

  const startLabPractice = useCallback((labType) => {
    setQuestionSet(shuffled(getLabQuestions(labType)))
    setActiveTopic(null)
    setScreen('quiz')
  }, [getLabQuestions, shuffled])

  const startDiagnostic = useCallback(() => {
    setQuestionSet(buildDiagnosticSet())
    setActiveTopic('__diagnostic__')
    setScreen('diagnostic')
  }, [buildDiagnosticSet])

  // Send a battle request to a friend (no quiz yet — they must accept first)
  const handleSendBattle = useCallback((friend) => {
    const questionIds = shuffled(questions).slice(0, 10).map((q) => q.id)
    sendBattleRequest({ friend, questionIds, user })
    logActivity({ type: 'challenge', label: `challenged ${friend.displayName}`, emoji: '⚔️' })
  }, [sendBattleRequest, user, logActivity, questions, shuffled])

  // Load questions and start the quiz for an accepted battle
  const handlePlayBattle = useCallback((challenge) => {
    const qs = challenge.questionIds
      .map((id) => questions.find((q) => q.id === id))
      .filter(Boolean)
    if (qs.length === 0) return
    setQuestionSet(qs)
    setActiveBattle(challenge)
    setActiveTopic(null)
    setScreen('battleQuiz')
  }, [questions])

  const finishBattleQuiz = useCallback(async (result) => {
    const correct = result.results.filter((r) => r.correct).length
    const score   = correct * 10
    earnXP(score)
    markStudied()
    logActivity({ type: 'challenge', label: 'finished a battle', emoji: '⚔️', xp: score })
    const opponentName = activeBattle.role === 'sender' ? activeBattle.toName : activeBattle.fromName
    const { done, opponentScore } = await submitScore(activeBattle.id, score, activeBattle.role)
    setActiveBattle(null)
    if (done) {
      // Both players have finished — show win/lose/tie result
      setChallengeResult({ myScore: score, opponentScore, opponentName })
      setScreen('challengeResult')
    } else {
      // Opponent hasn't played yet — go straight to Friends tab to wait there
      setHomeTab('friends')
      setScreen('home')
      setChallengeResult(null)
    }
  }, [activeBattle, submitScore, earnXP, markStudied, logActivity])

  const finishDiagnostic = useCallback((result) => {
    setDiagResult(result)
    setScreen('diagResults')
    markStudied()
    recordDiagnostic()
    earnXP(result.results.filter((r) => r.correct).length * 10)
    const byTopic = result.results.reduce((acc, r) => {
      const t = r.question.topic
      if (!acc[t]) acc[t] = { correct: 0, total: 0 }
      acc[t].total++
      if (r.correct) acc[t].correct++
      return acc
    }, {})
    Object.entries(byTopic).forEach(([topic, d]) => {
      saveResult({ topic, score: 0, total: d.total, correct: d.correct, pct: Math.round((d.correct / d.total) * 100) })
    })
  }, [markStudied, earnXP, saveResult, recordDiagnostic])

  const finishQuiz = useCallback((result) => {
  setQuizResult(result)
    setScreen('results')
    const correct = result.results.filter((r) => r.correct).length
    const pct     = Math.round((correct / result.total) * 100)
    saveResult({ topic: activeTopic, score: result.score, total: result.total, correct, pct })
    markStudied()
    const xpEarned = Math.max(correct * 10, Math.round(result.score / 10))
    earnXP(xpEarned)
    logActivity({ type: 'quiz', label: `scored ${pct}% on ${activeTopic ?? 'All Topics'}`, emoji: pct >= 85 ? '🏆' : pct >= 65 ? '✅' : '📝', xp: xpEarned })
    if (user?.isAnonymous) setShowUpgrade(true)
  }, [activeTopic, saveResult, markStudied, earnXP, logActivity, user])

  const buyStreak = useCallback(async () => {
    const ok = await spendXP(100)
    if (ok) markStudied()
  }, [spendXP, markStudied])

  const retry  = useCallback(() => startQuiz(activeTopic), [activeTopic, startQuiz])
  const [homeTab, setHomeTab] = useState('study')

  const goHome = useCallback(() => {
    setHomeTab('study')
    setScreen('home')
    setQuizResult(null)
    setDiagResult(null)
    setSpeedResult(null)
    setActiveBattle(null)
    setChallengeResult(null)
  }, [])

  const goFriends = useCallback(() => {
    setHomeTab('friends')
    setScreen('home')
    setActiveBattle(null)
    setChallengeResult(null)
  }, [])

  const startRegentsExam = useCallback((exam) => {
    setActiveExam(exam)
    setExamResult(null)
    setScreen('regentsExam')
  }, [])

  const finishRegentsExam = useCallback((result) => {
    const scaled = result.total ? Math.round((result.correct / result.total) * 100) : 0
    const xpEarned = regentsXP(scaled)
    // Save personal best
    const PB_KEY = 'regents_personal_best_v1'
    try {
      const pbs = JSON.parse(localStorage.getItem(PB_KEY) || '{}')
      if ((pbs[result.exam?.id] ?? -1) < scaled) {
        pbs[result.exam?.id] = scaled
        localStorage.setItem(PB_KEY, JSON.stringify(pbs))
      }
    } catch {}
    setExamResult({ ...result, xpEarned, scaled })
    setScreen('regentsExamResults')
    markStudied()
    earnXP(xpEarned)
  }, [markStudied, earnXP])

  if (user === undefined || (user !== null && schoolLoading)) {
    return <div className="app-shell loading-shell"><span className="loading-dot" /></div>
  }

  if (user === null) {
    return (
      <div className="app-shell">
        <LoginScreen
          onSignInGoogle={signInWithGoogle}
          onSignInEmail={signInWithEmail}
          onSignUpEmail={signUpWithEmail}
          onGuest={signInAsGuest}
        />
      </div>
    )
  }

  // First-time login: school has never been set — skip for anonymous/guest users
  if (school === null && !user.isAnonymous) {
    return (
      <div className="app-shell">
        <SchoolOnboardingScreen user={user} onSelect={saveSchool} />
      </div>
    )
  }

  return (
    <div className="app-shell">
      {screen === 'home' && (
        <HomeScreen
          onStart={startQuiz}
          onPracticeTest={startPracticeTest}
          onAnalytics={() => setScreen('analytics')}
          onAchievements={() => setScreen('achievements')}
          onBookmarks={() => setScreen('bookmarks')}
          bookmarkedIds={bookmarkedIds}
          user={user}
          onLogOut={logOut}
          history={subjectHistory}
          streak={streak}
          studiedToday={studiedToday}
          weekDays={weekDays}
          masteryPct={masteryPct}
          isUnlocked={isUnlocked}
          unlockHint={unlockHint}
          completedCount={completedCount}
          totalTopics={totalTopics}
          xp={xp}
          levelInfo={getLevel(xp)}
          onBuyStreak={buyStreak}
          onDiagnostic={startDiagnostic}
          onSpeedRound={startSpeedRound}
          onContextPractice={startContextPractice}
          earnedIds={earnedIds}
          allAchievements={allAchievements}
          earnXP={earnXP}
          school={school}
          saveSchool={saveSchool}
          theme={theme}
          setTheme={setTheme}
          dailyQ={dailyQ}
          dailyAnswered={dailyAnswered}
          dailyRecord={dailyRecord}
          dailyLoading={dailyLoading}
          onDailySubmit={handleDailySubmit}
          onRegentsExams={() => setScreen('regentsExamPicker')}
          // Subject switcher
          subject={subject}
          setSubject={setSubject}
          SUBJECT_META={SUBJECT_META}
          subjectData={sd}
          // Friends
          friends={friends}
          friendCode={friendCode}
          friendFeed={friendFeed}
          addFriendError={addFriendError}
          setAddFriendError={setAddFriendError}
          onAddFriend={addFriend}
          onRemoveFriend={removeFriend}
          incomingRequests={incomingRequests}
          sentRequests={sentRequests}
          onSendFriendRequest={sendFriendRequest}
          onAcceptFriendRequest={acceptRequest}
          onDeclineFriendRequest={declineRequest}
          challenges={challenges}
          onSendBattle={handleSendBattle}
          onAcceptBattle={acceptBattle}
          onDeclineBattle={declineBattle}
          onPlayBattle={handlePlayBattle}
          initialTab={homeTab}
          onLabPractice={startLabPractice}
          onAdmin={user?.email === ADMIN_EMAIL ? () => setScreen('admin') : null}
          onUpgrade={user?.isAnonymous ? () => setShowUpgrade(true) : null}
        />
      )}

      {screen === 'quiz' && questionSet.length > 0 && (
        <QuizScreen key={questionSet[0]?.id} questionSet={questionSet} onDone={finishQuiz} onHome={goHome} bookmarkedIds={bookmarkedIds} onBookmark={toggleBookmark} noTimer={noTimer} />
      )}

      {screen === 'results' && quizResult && (
        <ResultsScreen {...quizResult} onRetry={retry} onHome={goHome} />
      )}

      {screen === 'practiceTest' && questionSet.length > 0 && (
        <PracticeTestScreen
          key={questionSet[0]?.id}
          questionSet={questionSet}
          onDone={(result) => {
            const pct = result?.total ? Math.round(((result?.correct ?? 0) / result.total) * 100) : 0
            markStudied()
            earnXP((result?.correct ?? 0) * 10)
            recordPracticeTest(pct)
            startPracticeTest()
          }}
          onHome={goHome}
        />
      )}

      {screen === 'analytics' && (
        <AnalyticsScreen history={history} streak={streak} onHome={goHome} />
      )}

      {screen === 'achievements' && (
        <AchievementsScreen allAchievements={allAchievements} earnedIds={earnedIds} onHome={goHome} />
      )}

      {screen === 'diagnostic' && questionSet.length > 0 && (
        <QuizScreen key={questionSet[0]?.id} questionSet={questionSet} onDone={finishDiagnostic} onHome={goHome} bookmarkedIds={bookmarkedIds} onBookmark={toggleBookmark} />
      )}

      {screen === 'diagResults' && diagResult && (
        <DiagnosticResultsScreen
          results={diagResult.results}
          onPractice={(topic) => { setDiagResult(null); startQuiz(topic) }}
          onRetake={startDiagnostic}
          onHome={goHome}
        />
      )}

      {screen === 'bookmarks' && (
        <BookmarksScreen
          bookmarkedIds={bookmarkedIds}
          onRemove={removeBookmark}
          onHome={goHome}
          onPractice={(qs) => {
            setQuestionSet(shuffled(qs))
            setActiveTopic(null)
            setScreen('quiz')
          }}
        />
      )}

      {screen === 'speedRound' && questionSet.length > 0 && !speedResult && (
        <SpeedRoundScreen
          key={questionSet[0]?.id}
          questionSet={questionSet}
          onDone={(result) => {
            setSpeedResult(result)
            markStudied()
            earnXP(result.results.filter((r) => r.correct).length * 10)
          }}
          onHome={goHome}
        />
      )}

      {screen === 'speedRound' && speedResult && (
        <SpeedResults {...speedResult} onRetry={startSpeedRound} onHome={goHome} />
      )}

      {screen === 'battleQuiz' && questionSet.length > 0 && (
        <QuizScreen key={`bq-${questionSet[0]?.id}`} questionSet={questionSet} onDone={finishBattleQuiz} onHome={goHome} bookmarkedIds={bookmarkedIds} onBookmark={toggleBookmark} />
      )}

      {screen === 'challengeResult' && challengeResult && (
        <ChallengeResultScreen {...challengeResult} onHome={goFriends} />
      )}

      {screen === 'admin' && (
        <AdminScreen user={user} onHome={goHome} />
      )}

      {screen === 'regentsExamPicker' && (
        <RegentsExamPickerScreen
          subject={subject}
          onSelect={startRegentsExam}
          onHome={goHome}
        />
      )}

      {screen === 'regentsExam' && activeExam && (
        <RegentsExamScreen
          exam={activeExam}
          onDone={finishRegentsExam}
          onHome={goHome}
        />
      )}

      {screen === 'regentsExamResults' && examResult && (
        <RegentsExamResultsScreen
          {...examResult}
          onRetake={() => startRegentsExam(activeExam)}
          onHome={goHome}
        />
      )}

      {currentToast && <AchievementToast achievement={currentToast} onDismiss={dismissToast} />}

      {showUpgrade && user?.isAnonymous && (
        <GuestUpgradeModal
          onLinkEmail={linkEmailToGuest}
          onLinkGoogle={linkGoogleToGuest}
          onDismiss={() => setShowUpgrade(false)}
        />
      )}
    </div>
  )
}
