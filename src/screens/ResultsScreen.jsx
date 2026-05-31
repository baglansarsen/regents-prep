import { useState } from 'react'
import { TOPIC_ICONS } from '@content/questions'

const LABELS = ['A', 'B', 'C', 'D']

export default function ResultsScreen({ score, bestStreak, results, total, onRetry, onHome }) {
  const correct = results.filter((r) => r.correct).length
  const pct = Math.round((correct / total) * 100)

  const [reviewOpen, setReviewOpen] = useState(false)

  const grade =
    pct >= 85 ? { label: 'Mastery', color: '#22c55e', emoji: '🏆' }
    : pct >= 65 ? { label: 'Passing', color: '#f59e0b', emoji: '✅' }
    : { label: 'Keep Practicing', color: '#ef4444', emoji: '📚' }

  // Group results by topic
  const byTopic = results.reduce((acc, r) => {
    const t = r.question.topic
    if (!acc[t]) acc[t] = { correct: 0, total: 0 }
    acc[t].total++
    if (r.correct) acc[t].correct++
    return acc
  }, {})

  return (
    <div className="results-screen">
      <div className="results-hero">
        <span className="results-emoji">{grade.emoji}</span>
        <h2 className="results-grade" style={{ color: grade.color }}>{grade.label}</h2>
        <p className="results-score">{score} pts</p>
        <p className="results-fraction">{correct} / {total} correct ({pct}%)</p>
        {bestStreak > 1 && (
          <p className="results-streak">Best streak: 🔥 {bestStreak}</p>
        )}
      </div>

      <div className="topic-breakdown">
        <h3 className="breakdown-title">Topic Breakdown</h3>
        {Object.entries(byTopic).map(([topic, data]) => {
          const topicPct = Math.round((data.correct / data.total) * 100)
          return (
            <div key={topic} className="breakdown-row">
              <span className="breakdown-icon">{TOPIC_ICONS[topic]}</span>
              <span className="breakdown-topic">{topic}</span>
              <div className="breakdown-bar-track">
                <div
                  className="breakdown-bar-fill"
                  style={{
                    width: `${topicPct}%`,
                    backgroundColor: topicPct >= 65 ? '#22c55e' : '#ef4444',
                  }}
                />
              </div>
              <span className="breakdown-pct">{data.correct}/{data.total}</span>
            </div>
          )
        })}
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
              const timedOut = r.chosen === null
              return (
                <div key={i} className={`review-item ${r.correct ? 'review-item--correct' : 'review-item--wrong'}`}>
                  <div className="review-item-header">
                    <span className="review-num">Q{i + 1}</span>
                    <span className="review-status">{r.correct ? '✓ Correct' : timedOut ? '⏰ Time out' : '✗ Wrong'}</span>
                  </div>
                  <p className="review-question">{q.text}</p>
                  {!r.correct && !timedOut && (
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
        <button className="btn-primary" onClick={onRetry}>Try Again</button>
        <button className="btn-secondary" onClick={onHome}>Choose Topic</button>
      </div>
    </div>
  )
}
