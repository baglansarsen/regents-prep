import { useState, useCallback } from 'react'
import { questions, getByTopic, shuffled } from './data/questions'
import { useAuth } from './hooks/useAuth'
import { useProgress } from './hooks/useProgress'
import { useDailyStreak } from './hooks/useDailyStreak'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import ResultsScreen from './screens/ResultsScreen'
import PracticeTestScreen from './screens/PracticeTestScreen'
import AnalyticsScreen from './screens/AnalyticsScreen'

export default function App() {
  const { user, signInWithGoogle, logOut } = useAuth()
  const { history, saveResult, masteryPct } = useProgress(user?.uid)
  const { streak, markStudied } = useDailyStreak()

  const [screen, setScreen] = useState('home')
  const [questionSet, setQuestionSet] = useState([])
  const [quizResult, setQuizResult] = useState(null)
  const [activeTopic, setActiveTopic] = useState(null)

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

  const finishQuiz = useCallback((result) => {
    setQuizResult(result)
    setScreen('results')
    const correct = result.results.filter((r) => r.correct).length
    const pct = Math.round((correct / result.total) * 100)
    saveResult({ topic: activeTopic, score: result.score, total: result.total, correct, pct })
    markStudied()
  }, [activeTopic, saveResult, markStudied])

  const retry  = useCallback(() => startQuiz(activeTopic), [activeTopic, startQuiz])
  const goHome = useCallback(() => { setScreen('home'); setQuizResult(null) }, [])

  if (user === undefined) {
    return <div className="app-shell loading-shell"><span className="loading-dot" /></div>
  }

  if (user === null) {
    return <div className="app-shell"><LoginScreen onSignIn={signInWithGoogle} /></div>
  }

  return (
    <div className="app-shell">
      {screen === 'home' && (
        <HomeScreen
          onStart={startQuiz}
          onPracticeTest={startPracticeTest}
          onAnalytics={() => setScreen('analytics')}
          user={user}
          onLogOut={logOut}
          history={history}
          streak={streak}
          masteryPct={masteryPct}
        />
      )}

      {screen === 'quiz' && questionSet.length > 0 && (
        <QuizScreen key={questionSet[0]?.id} questionSet={questionSet} onDone={finishQuiz} onHome={goHome} />
      )}

      {screen === 'results' && quizResult && (
        <ResultsScreen {...quizResult} onRetry={retry} onHome={goHome} />
      )}

      {screen === 'practiceTest' && questionSet.length > 0 && (
        <PracticeTestScreen
          key={questionSet[0]?.id}
          questionSet={questionSet}
          onDone={() => { markStudied(); startPracticeTest() }}
          onHome={goHome}
        />
      )}

      {screen === 'analytics' && (
        <AnalyticsScreen history={history} streak={streak} onHome={goHome} />
      )}
    </div>
  )
}
