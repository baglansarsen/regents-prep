import { useState } from 'react'

const LABELS = ['A', 'B', 'C', 'D']

// Approximate scaled score for MC-only (45 questions).
// Real Regents use per-year conversion charts; this is a reasonable approximation.
// Raw 45/45 = 100 scaled, raw 0/45 = 0 scaled, 65 scaled ≈ 29/45 raw (~65%)
function estimateScaled(correct, total) {
  if (total === 0) return 0
  const pct = correct / total
  // Slight curve — Regents MC passing is ~64% raw → 65 scaled
  const scaled = Math.round(pct * 100)
  return Math.min(100, Math.max(0, scaled))
}

export default function RegentsExamResultsScreen({ exam, results, correct, total, timedOut, onRetake, onHome }) {
  const [showAll, setShowAll] = useState(false)
  const scaled = estimateScaled(correct, total)
  const passed = scaled >= 65
  const pct    = total ? Math.round((correct / total) * 100) : 0

  const wrongItems = results.filter((r) => !r.correct)
  const byPart = {}
  results.forEach((r) => {
    const p = r.question.part ?? 'A'
    if (!byPart[p]) byPart[p] = { correct: 0, total: 0 }
    byPart[p].total++
    if (r.correct) byPart[p].correct++
  })

  return (
    <div className="home-screen">
      <header className="home-header home-header--compact">
        <div className="home-title-row">
          <h1 className="app-title">Exam Results</h1>
          <p className="app-subtitle">{exam.session} {exam.year}</p>
        </div>
      </header>

      <div className="tab-panel">
        {timedOut && (
          <div className="feedback-banner feedback-banner--wrong" style={{ marginBottom: 12 }}>
            ⏰ Time expired — exam auto-submitted
          </div>
        )}

        {/* Score card */}
        <div className={`regents-score-card ${passed ? 'regents-score-card--pass' : 'regents-score-card--fail'}`}>
          <div className="regents-score-scaled">{scaled}</div>
          <div className="regents-score-label">Scaled Score</div>
          <div className={`regents-score-verdict ${passed ? 'regents-score-verdict--pass' : 'regents-score-verdict--fail'}`}>
            {passed ? '✓ Passing' : '✗ Not Yet Passing'}
          </div>
          <p className="regents-score-raw">{correct} / {total} correct ({pct}%) · Need 65 to pass</p>
        </div>

        {/* Per-part breakdown */}
        <div className="regents-breakdown">
          {Object.entries(byPart).sort(([a],[b]) => a.localeCompare(b)).map(([part, d]) => (
            <div key={part} className="regents-breakdown-row">
              <span className="regents-breakdown-part">Part {part}</span>
              <div className="regents-breakdown-bar-track">
                <div
                  className="regents-breakdown-bar-fill"
                  style={{ width: `${Math.round((d.correct / d.total) * 100)}%`, background: d.correct / d.total >= 0.65 ? '#22c55e' : '#ef4444' }}
                />
              </div>
              <span className="regents-breakdown-score">{d.correct}/{d.total}</span>
            </div>
          ))}
        </div>

        {/* Question review */}
        <div className="regents-review-header">
          <p className="regents-review-title">Question Review</p>
          <button className="regents-review-toggle" onClick={() => setShowAll((s) => !s)}>
            {showAll ? 'Show wrong only' : `Show all ${total}`}
          </button>
        </div>

        <div className="regents-review-list">
          {(showAll ? results : wrongItems).map((r, idx) => {
            const q = r.question
            const selLabel = r.selected !== null ? LABELS[r.selected] : '—'
            const corrLabel = LABELS[q.correct]
            return (
              <div key={idx} className={`regents-review-item ${r.correct ? 'regents-review-item--correct' : 'regents-review-item--wrong'}`}>
                <div className="regents-review-item-header">
                  <span className="regents-review-qnum">Q{q.number} · Part {q.part}</span>
                  <span className="regents-review-verdict">{r.correct ? '✓' : r.selected === null ? '— skipped' : `✗ You: ${selLabel}`}</span>
                </div>
                <p className="regents-review-qtext">{q.text}</p>
                {!r.correct && (
                  <p className="regents-review-correct">
                    Correct: <strong>{corrLabel}. {q.choices[q.correct]}</strong>
                  </p>
                )}
                {!r.correct && q.explanation && (
                  <p className="regents-review-explanation">{q.explanation}</p>
                )}
              </div>
            )
          })}
        </div>

        <div className="regents-result-actions">
          <button className="btn-secondary" onClick={onRetake}>Retake Exam</button>
          <button className="btn-primary" onClick={onHome}>Done</button>
        </div>
      </div>
    </div>
  )
}
