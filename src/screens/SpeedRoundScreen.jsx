import { useEffect, useState } from 'react'
import { useSpeedRound } from '../hooks/useSpeedRound'
import { TOPIC_ICONS } from '@content/questions'

const LABELS = ['A', 'B', 'C', 'D']

function SpeedResults({ score, results, bestStreak, onRetry, onHome }) {
  const correct = results.filter((r) => r.correct).length
  const total = results.length
  const pct = total ? Math.round((correct / total) * 100) : 0
  const [reviewOpen, setReviewOpen] = useState(false)

  const grade =
    pct >= 80 ? { label: 'Lightning Fast!', color: '#22c55e', emoji: '⚡' }
    : pct >= 60 ? { label: 'Speed Demon', color: '#f59e0b', emoji: '🔥' }
    : { label: 'Keep Grinding', color: '#ef4444', emoji: '💪' }

  return (
    <div className="results-screen">
      <div className="results-hero">
        <span className="results-emoji">{grade.emoji}</span>
        <h2 className="results-grade" style={{ color: grade.color }}>{grade.label}</h2>
        <p className="results-score">{score} pts</p>
        <p className="results-fraction">{correct} / {total} correct ({pct}%)</p>
        {bestStreak > 1 && <p className="results-streak">Best streak: 🔥 {bestStreak}</p>}
        <p className="speed-round-answered">{total} answered in 60 s</p>
      </div>

      <div className="review-section">
        <button className="review-toggle" onClick={() => setReviewOpen((o) => !o)}>
          {reviewOpen ? '▲ Hide Review' : '▼ Review Answers'}
          <span className="review-toggle-sub">{correct}/{total} correct</span>
        </button>
        {reviewOpen && (
          <div className="review-list">
            {results.map((r, i) => {
              const q = r.question
              return (
                <div key={i} className={`review-item ${r.correct ? 'review-item--correct' : 'review-item--wrong'}`}>
                  <div className="review-item-header">
                    <span className="review-num">Q{i + 1}</span>
                    <span className="review-status">{r.correct ? '✓ Correct' : '✗ Wrong'}</span>
                    {r.points > 0 && <span className="review-pts">+{r.points} pts</span>}
                  </div>
                  <p className="review-question">{q.text}</p>
                  {!r.correct && (
                    <p className="review-your-answer">
                      Your answer: <span className="review-wrong-text">{LABELS[r.chosen]}. {q.choices[r.chosen]}</span>
                    </p>
                  )}
                  <p className="review-correct-answer">
                    Correct: <span className="review-correct-text">{LABELS[q.correct]}. {q.choices[q.correct]}</span>
                  </p>
                  <p className="review-explanation">{q.explanation}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={onRetry}>Play Again</button>
        <button className="btn-secondary" onClick={onHome}>Home</button>
      </div>
    </div>
  )
}

export default function SpeedRoundScreen({ questionSet, onDone, onHome }) {
  const {
    currentQuestion,
    score,
    streak,
    bestStreak,
    timeLeft,
    roundMax,
    selected,
    phase,
    results,
    answered,
    answer,
    streakMultiplier,
  } = useSpeedRound(questionSet)

  useEffect(() => {
    if (phase === 'done') {
      onDone({ score, bestStreak, results, total: results.length })
    }
  }, [phase, score, bestStreak, results, onDone])

  if (phase === 'done') return null

  const urgentTime = timeLeft <= 10
  const timePct = (timeLeft / roundMax) * 100

  return (
    <div className="quiz-screen speed-round-screen">
      <div className="quiz-topbar">
        <button className="btn-ghost" onClick={onHome}>← Home</button>
        <div className="speed-score-cluster">
          {streak >= 2 && (
            <span className="speed-streak-badge">🔥 x{streakMultiplier.toFixed(2)}</span>
          )}
          <span className="speed-score">{score} pts</span>
        </div>
      </div>

      {/* Big countdown */}
      <div className={`speed-timer-block ${urgentTime ? 'speed-timer-block--urgent' : ''}`}>
        <span className={`speed-timer-num ${urgentTime ? 'speed-timer-num--urgent' : ''}`}>{timeLeft}</span>
        <div className="speed-timer-track">
          <div
            className={`speed-timer-fill ${urgentTime ? 'speed-timer-fill--urgent' : ''}`}
            style={{ width: `${timePct}%` }}
          />
        </div>
        <div className="speed-round-meta">
          <span className="speed-answered-count">{answered} answered</span>
          <span className="speed-label">SPEED ROUND</span>
        </div>
      </div>

      {/* Question */}
      <div className={`speed-question-card ${phase === 'feedback' ? (results[results.length - 1]?.correct ? 'speed-card--correct' : 'speed-card--wrong') : ''}`}>
        <div className="speed-topic-tag">
          {TOPIC_ICONS[currentQuestion.topic]} {currentQuestion.topic}
        </div>
        <p className="speed-question-text">{currentQuestion.text}</p>
      </div>

      {/* Choices */}
      <div className="speed-choices">
        {currentQuestion.choices.map((choice, i) => {
          let cls = 'speed-choice'
          if (phase === 'feedback') {
            if (i === currentQuestion.correct) cls += ' speed-choice--correct'
            else if (i === selected) cls += ' speed-choice--wrong'
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => answer(i)}
              disabled={phase !== 'answering'}
            >
              <span className="speed-choice-label">{LABELS[i]}</span>
              <span className="speed-choice-text">{choice}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { SpeedResults }
