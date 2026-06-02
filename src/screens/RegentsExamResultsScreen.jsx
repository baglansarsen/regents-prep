import { useState } from 'react'

const LABELS = ['A', 'B', 'C', 'D']
const PB_KEY = 'regents_personal_best_v1'

function getPersonalBests() {
  try { return JSON.parse(localStorage.getItem(PB_KEY) || '{}') } catch { return {} }
}

// NY Regents approximate conversion: raw % → scaled score (65 = passing)
// Based on typical conversion charts — not official but close enough for practice
const SCALE_TABLE = [
  [100,100],[98,99],[96,98],[94,97],[92,96],[90,95],[88,94],[86,93],[84,91],
  [82,89],[80,87],[78,85],[76,83],[74,81],[72,79],[70,77],[68,75],[66,73],
  [64,71],[62,69],[60,67],[58,65],[56,63],[54,61],[52,59],[50,57],[48,55],
  [46,53],[44,51],[42,49],[40,47],[38,45],[36,43],[34,40],[32,37],[30,34],
  [28,31],[26,28],[24,25],[22,22],[20,19],[18,16],[16,13],[14,10],[0,0],
]

function toScaledScore(pct) {
  for (const [raw, scaled] of SCALE_TABLE) {
    if (pct >= raw) return scaled
  }
  return 0
}

export default function RegentsExamResultsScreen({ exam, results, correct: mcCorrectProp, total: totalProp, timedOut, xpEarned, scaled: scaledProp, onRetake, onHome }) {
  const [showAll, setShowAll] = useState(false)
  const [selfGrades, setSelfGrades] = useState({})

  // Find all multiple-choice and written items
  const mcItems = results.filter((r) => r.question.type !== 'written')
  const writtenItems = results.filter((r) => r.question.type === 'written')

  const totalMCCorrect = mcItems.filter((r) => r.correct).length
  const maxMCPoints = mcItems.length

  const maxWrittenPoints = writtenItems.reduce((acc, r) => acc + (r.question.maxPoints || 1), 0)
  const totalWrittenPoints = writtenItems.reduce((acc, r) => acc + (selfGrades[r.question.number] || 0), 0)

  // Combined score calculations
  const totalEarnedPoints = totalMCCorrect + totalWrittenPoints
  const maxTotalPoints = maxMCPoints + maxWrittenPoints

  const pct = maxTotalPoints ? Math.round((totalEarnedPoints / maxTotalPoints) * 100) : 0
  const scaled = toScaledScore(pct)
  const passed = scaled >= 65
  const pb = getPersonalBests()[exam?.id] ?? -1
  const isNewPB = scaled > pb && scaled > 0

  // Filter items for display
  const wrongItems = results.filter((r) => {
    const isWritten = r.question.type === 'written'
    const awarded = selfGrades[r.question.number] || 0
    return isWritten ? awarded === 0 : !r.correct
  })

  // Group correct rates by part
  const byPart = {}
  results.forEach((r) => {
    const p = r.question.part ?? 'A'
    const isWritten = r.question.type === 'written'
    const maxPts = isWritten ? (r.question.maxPoints || 1) : 1
    const earnedPts = isWritten ? (selfGrades[r.question.number] || 0) : (r.correct ? 1 : 0)

    if (!byPart[p]) byPart[p] = { correct: 0, total: 0 }
    byPart[p].total += maxPts
    byPart[p].correct += earnedPts
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

        {/* XP earned banner */}
        {xpEarned != null && (
          <div className="regents-xp-banner">
            <span className="regents-xp-earned">+{xpEarned} XP</span>
            {isNewPB && <span className="regents-pb-badge">🏅 New Personal Best!</span>}
          </div>
        )}

        {/* Score card */}
        <div className={`regents-score-card ${passed ? 'regents-score-card--pass' : 'regents-score-card--fail'}`}>
          <div className="regents-score-scaled">{scaled}</div>
          <div className="regents-score-label">Scaled Score</div>
          <div className={`regents-score-verdict ${passed ? 'regents-score-verdict--pass' : 'regents-score-verdict--fail'}`}>
            {passed ? '✓ Passing' : '✗ Not Yet Passing'}
          </div>
          <p className="regents-score-raw">{totalEarnedPoints} / {maxTotalPoints} points ({pct}%) · Need 65 to pass</p>
        </div>

        <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5, margin: '10px 4px 0' }}>
          ⚠️ Estimated score based on multiple-choice only. The official Regents
          conversion changes each exam and also counts written/lab responses, so
          your real result may differ.
        </p>

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
            {showAll ? 'Show wrong only' : `Show all ${maxTotalPoints} pts`}
          </button>
        </div>

        <div className="regents-review-list">
          {(showAll ? results : wrongItems).map((r, idx) => {
            const q = r.question
            const isWritten = q.type === 'written'
            const awarded = selfGrades[q.number] || 0
            const isWrittenCorrect = awarded > 0
            const isItemCorrect = isWritten ? isWrittenCorrect : r.correct

            const selLabel = !isWritten && r.selected !== null ? LABELS[r.selected] : '—'
            const corrLabel = !isWritten ? LABELS[q.correct] : ''

            return (
              <div key={idx} className={`regents-review-item ${isItemCorrect ? 'regents-review-item--correct' : 'regents-review-item--wrong'}`}>
                <div className="regents-review-item-header">
                  <span className="regents-review-qnum">Q{q.number} · Part {q.part}</span>
                  <span className="regents-review-verdict">
                    {isWritten 
                      ? `Self-Graded: ${awarded}/${q.maxPoints} Pts`
                      : (r.correct ? '✓' : r.selected === null ? '— skipped' : `✗ You: ${selLabel}`)}
                  </span>
                </div>
                <p className="regents-review-qtext">{q.text}</p>

                {isWritten ? (
                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                      <strong>Your Response:</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '0.9rem', fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>
                        {r.selected || '(No response provided)'}
                      </p>
                    </div>
                    <div style={{ padding: '10px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '6px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                      <strong>🔑 Official Model Answer:</strong>
                      <p style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>{q.modelAnswer}</p>
                    </div>
                    <div style={{ marginTop: '8px', padding: '8px 0' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                        🎓 Award Credits (Max: {q.maxPoints} Pts):
                      </span>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                        {Array.from({ length: (q.maxPoints || 1) + 1 }).map((_, credit) => {
                          const active = (selfGrades[q.number] ?? 0) === credit
                          return (
                            <button
                              key={credit}
                              onClick={() => {
                                setSelfGrades((prev) => ({ ...prev, [q.number]: credit }))
                              }}
                              style={{
                                padding: '4px 12px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                borderRadius: '6px',
                                border: '1.5px solid var(--border)',
                                backgroundColor: active ? 'var(--correct-bg)' : 'transparent',
                                color: active ? 'var(--correct-dark)' : 'var(--text)',
                                cursor: 'pointer'
                              }}
                            >
                              {credit} Pts
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {!r.correct && (
                      <p className="regents-review-correct">
                        Correct: <strong>{corrLabel}. {q.choices[q.correct]}</strong>
                      </p>
                    )}
                    {!r.correct && q.explanation && (
                      <p className="regents-review-explanation">{q.explanation}</p>
                    )}
                  </>
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
