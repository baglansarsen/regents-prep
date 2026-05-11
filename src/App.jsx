import { useState, useCallback } from 'react'
import { questions, getByTopic, shuffled } from './data/questions'
import HomeScreen from './screens/HomeScreen'
import QuizScreen from './screens/QuizScreen'
import ResultsScreen from './screens/ResultsScreen'

export default function App() {
  const [screen, setScreen] = useState('home')          // 'home' | 'quiz' | 'results'
  const [questionSet, setQuestionSet] = useState([])
  const [quizResult, setQuizResult] = useState(null)
  const [activeTopic, setActiveTopic] = useState(null)

  const startQuiz = useCallback((topic) => {
    const pool = topic ? getByTopic(topic) : questions
    setQuestionSet(shuffled(pool))
    setActiveTopic(topic)
    setScreen('quiz')
  }, [])

  const finishQuiz = useCallback((result) => {
    setQuizResult(result)
    setScreen('results')
  }, [])

  const retry = useCallback(() => {
    startQuiz(activeTopic)
  }, [activeTopic, startQuiz])

  const goHome = useCallback(() => {
    setScreen('home')
    setQuizResult(null)
  }, [])

  return (
    <div className="app-shell">
      {screen === 'home' && <HomeScreen onStart={startQuiz} />}

      {screen === 'quiz' && questionSet.length > 0 && (
        <QuizScreen
          key={questionSet[0]?.id}
          questionSet={questionSet}
          onDone={finishQuiz}
          onHome={goHome}
        />
      )}

      {screen === 'results' && quizResult && (
        <ResultsScreen
          {...quizResult}
          onRetry={retry}
          onHome={goHome}
        />
      )}
    </div>
  )
}
