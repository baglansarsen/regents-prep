import { useEffect } from 'react'
import { useQuiz } from '../hooks/useQuiz'
import QuestionCard from '../components/QuestionCard'
import ScoreDisplay from '../components/ScoreDisplay'
import ProgressBar from '../components/ProgressBar'

export default function QuizScreen({ questionSet, onDone, onHome, bookmarkedIds, onBookmark }) {
  const {
    currentQuestion,
    index,
    total,
    score,
    streak,
    bestStreak,
    selected,
    phase,
    results,
    answer,
    next,
    streakMultiplier,
  } = useQuiz(questionSet)

  useEffect(() => {
    if (phase === 'done') {
      onDone({ score, bestStreak, results, total })
    }
  }, [phase, score, bestStreak, results, total, onDone])

  if (phase === 'done') {
    return null
  }

  return (
    <div className="quiz-screen">
      <div className="quiz-topbar">
        <button className="btn-ghost" onClick={onHome}>← Home</button>
        <ScoreDisplay score={score} streak={streak} multiplier={streakMultiplier} />
      </div>

      <ProgressBar
        current={index + 1}
        total={total}
        topic={currentQuestion.topic}
      />



      <QuestionCard
        question={currentQuestion}
        selected={selected}
        phase={phase}
        onAnswer={answer}
        isBookmarked={bookmarkedIds?.has(currentQuestion.id)}
        onBookmark={onBookmark}
      />

      {phase === 'feedback' && (
        <button className="btn-primary next-btn" onClick={next}>
          {index === total - 1 ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}
