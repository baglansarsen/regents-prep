import { useState, useCallback } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { questions, getByTopic, shuffled } from './src/data/questions'
import HomeScreen from './src/screens/HomeScreen'
import QuizScreen from './src/screens/QuizScreen'
import ResultsScreen from './src/screens/ResultsScreen'
import StudyScreen from './src/screens/StudyScreen'
import { useProgress } from './src/hooks/useProgress'
import { C } from './src/theme'

export default function App() {
  const [screen, setScreen] = useState('home')       // 'home' | 'quiz' | 'results' | 'study'
  const [questionSet, setQuestionSet] = useState([])
  const [quizResult, setQuizResult] = useState(null)
  const [activeTopic, setActiveTopic] = useState(null)

  const { saveResult, masteryPct } = useProgress()

  const startQuiz = useCallback((topic) => {
    const pool = topic ? getByTopic(topic) : questions
    setQuestionSet(shuffled(pool))
    setActiveTopic(topic)
    setScreen('quiz')
  }, [])

  const startStudy = useCallback((topic) => {
    const pool = topic ? getByTopic(topic) : questions
    setQuestionSet(shuffled(pool))
    setActiveTopic(topic)
    setScreen('study')
  }, [])

  const finishQuiz = useCallback((result) => {
    const correct = result.results.filter((r) => r.correct).length
    saveResult({
      topic: activeTopic,
      score: result.score,
      correct,
      total: result.total,
      bestStreak: result.bestStreak,
    })
    setQuizResult(result)
    setScreen('results')
  }, [activeTopic, saveResult])

  const retry = useCallback(() => startQuiz(activeTopic), [activeTopic, startQuiz])

  const goHome = useCallback(() => {
    setScreen('home')
    setQuizResult(null)
  }, [])

  return (
    <SafeAreaView style={s.root}>
      <StatusBar style="light" />
      {screen === 'home' && (
        <HomeScreen onStart={startQuiz} onStudy={startStudy} masteryPct={masteryPct} />
      )}
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
      {screen === 'study' && questionSet.length > 0 && (
        <StudyScreen questionSet={questionSet} onHome={goHome} />
      )}
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
})
