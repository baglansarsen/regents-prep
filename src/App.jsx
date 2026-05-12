import { useState, useCallback } from 'react'
import { questions, getByTopic, shuffled, buildDiagnosticSet, getContextual } from './data/questions'
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
import BookmarksScreen from './screens/BookmarksScreen'
import SpeedRoundScreen, { SpeedResults } from './screens/SpeedRoundScreen'
import ChallengeResultScreen from './screens/ChallengeResultScreen'
import SchoolOnboardingScreen from './screens/SchoolOnboardingScreen'

export default function App() {
  const { theme, setTheme } = useTheme()
  const { user, signInWithGoogle, logOut } = useAuth()
  const { history, saveResult, masteryPct } = useProgress(user?.uid)
  const { streak, studiedToday, weekDays, markStudied } = useDailyStreak(user?.uid)
  const { isUnlocked, unlockHint, completedCount, totalTopics } = useUnlocks(history)
  const { xp, earnXP, spendXP } = useXP(user?.uid)
  const { earnedIds, allAchievements, currentToast, dismissToast, recordPracticeTest, recordDiagnostic } =
    useAchievements(user?.uid, { history, streak, xp })
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
  // Battle state
  const [activeBattle, setActiveBattle]   = useState(null)
  const [challengeResult, setChallengeResult] = useState(null)

  const startQuiz = useCallback((topic) => {
    const pool = topic ? getByTopic(topic) : questions
    setQuestionSet(shuffled(pool))
    setActiveTopic(topic)
    setScreen('quiz')
  }, [])

  const startPracticeTest = useCallback(() => {
    setQuestionSet(shuffled(questions))
    setScreen('practiceTest')
  }, [])

  const startSpeedRound = useCallback(() => {
    setQuestionSet(shuffled(questions))
    setScreen('speedRound')
  }, [])

  const startContextPractice = useCallback(() => {
    setQuestionSet(shuffled(getContextual()))
    setActiveTopic(null)
    setScreen('quiz')
  }, [])

  const startDiagnostic = useCallback(() => {
    setQuestionSet(buildDiagnosticSet())
    setActiveTopic('__diagnostic__')
    setScreen('diagnostic')
  }, [])

  // Send a battle request to a friend (no quiz yet — they must accept first)
  const handleSendBattle = useCallback((friend) => {
    const questionIds = shuffled(questions).slice(0, 10).map((q) => q.id)
    sendBattleRequest({ friend, questionIds, user })
    logActivity({ type: 'challenge', label: `challenged ${friend.displayName}`, emoji: '⚔️' })
  }, [sendBattleRequest, user, logActivity])

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
  }, [])

  const finishBattleQuiz = useCallback(async (result) => {
    const correct = result.results.filter((r) => r.correct).length
    const score   = correct * 10
    earnXP(score)
    markStudied()
    logActivity({ type: 'challenge', label: 'finished a battle', emoji: '⚔️', xp: score })
    const opponentName = activeBattle.role === 'sender' ? activeBattle.toName : activeBattle.fromName
    const { done, opponentScore } = await submitScore(activeBattle.id, score, activeBattle.role)
    setChallengeResult({ myScore: score, opponentScore: done ? opponentScore : null, opponentName })
    setActiveBattle(null)
    setScreen('challengeResult')
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
    earnXP(correct * 10)
    logActivity({ type: 'quiz', label: `scored ${pct}% on ${activeTopic ?? 'All Topics'}`, emoji: pct >= 85 ? '🏆' : pct >= 65 ? '✅' : '📝', xp: correct * 10 })
  }, [activeTopic, saveResult, markStudied, earnXP, logActivity])

  const buyStreak = useCallback(async () => {
    const ok = await spendXP(100)
    if (ok) markStudied()
  }, [spendXP, markStudied])

  const retry  = useCallback(() => startQuiz(activeTopic), [activeTopic, startQuiz])
  const goHome = useCallback(() => {
    setScreen('home')
    setQuizResult(null)
    setDiagResult(null)
    setSpeedResult(null)
    setActiveBattle(null)
    setChallengeResult(null)
  }, [])

  if (user === undefined || (user !== null && schoolLoading)) {
    return <div className="app-shell loading-shell"><span className="loading-dot" /></div>
  }

  if (user === null) {
    return <div className="app-shell"><LoginScreen onSignIn={signInWithGoogle} /></div>
  }

  // First-time login: school has never been set (null means no Firestore doc yet)
  if (school === null) {
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
          history={history}
          streak={streak}
          studiedToday={studiedToday}
          weekDays={weekDays}
          masteryPct={masteryPct}
          isUnlocked={isUnlocked}
          unlockHint={unlockHint}
          completedCount={completedCount}
          totalTopics={totalTopics}
          xp={xp}
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
        />
      )}

      {screen === 'quiz' && questionSet.length > 0 && (
        <QuizScreen key={questionSet[0]?.id} questionSet={questionSet} onDone={finishQuiz} onHome={goHome} bookmarkedIds={bookmarkedIds} onBookmark={toggleBookmark} />
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
        <ChallengeResultScreen {...challengeResult} onHome={goHome} />
      )}

      {currentToast && <AchievementToast achievement={currentToast} onDismiss={dismissToast} />}
    </div>
  )
}
