import { useState, useEffect } from 'react'

const LABELS = ['A', 'B', 'C', 'D']
const PB_KEY = 'regents_personal_best_v1'

const LAST_KEY = 'regents_last_score_v1'

function getPersonalBests() {
  try { return JSON.parse(localStorage.getItem(PB_KEY) || '{}') } catch { return {} }
}
function getLastScores() {
  try { return JSON.parse(localStorage.getItem(LAST_KEY) || '{}') } catch { return {} }
}

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

export default function RegentsExamResultsScreen({ exam, results = [], xpEarned, onRetake, onHome }) {
  const [showAll, setShowAll] = useState(false)
  const [selfGrades, setSelfGrades] = useState({})
  const [diveDeepQ, setDiveDeepQ] = useState(null)

  const mcItems = results.filter((r) => r.question.type !== 'written')
  const writtenItems = results.filter((r) => r.question.type === 'written')

  const totalMCCorrect = mcItems.filter((r) => r.correct).length
  const maxMCPoints = mcItems.length

  const maxWrittenPoints = writtenItems.reduce((acc, r) => acc + (r.question.maxPoints || 1), 0)
  const totalWrittenPoints = writtenItems.reduce((acc, r) => acc + (selfGrades[r.question.number] || 0), 0)

  const totalEarnedPoints = totalMCCorrect + totalWrittenPoints
  const maxTotalPoints = maxMCPoints + maxWrittenPoints

  const pct = maxTotalPoints ? Math.round((totalEarnedPoints / maxTotalPoints) * 100) : 0
  const scaled = toScaledScore(pct)
  const passed = scaled >= 65
  const pb = getPersonalBests()[exam?.id] ?? -1
  const isNewPB = scaled > pb && scaled > 0

  const wrongItems = results.filter((r) => {
    const isWritten = r.question.type === 'written'
    const awarded = selfGrades[r.question.number] || 0
    return isWritten ? awarded === 0 : !r.correct
  })

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

  // Weak topic analysis — group wrong MC answers by topic
  const topicErrors = {}
  results.forEach((r) => {
    if (r.question.type === 'written') return
    if (r.correct) return
    const t = r.question.topic || 'General'
    topicErrors[t] = (topicErrors[t] || 0) + 1
  })
  const weakTopics = Object.entries(topicErrors).sort((a, b) => b[1] - a[1]).slice(0, 5)

  // Save scores to localStorage once on mount
  useEffect(() => {
    if (!exam?.id) return
    const pbs = getPersonalBests()
    if (scaled > (pbs[exam.id] ?? -1)) {
      localStorage.setItem(PB_KEY, JSON.stringify({ ...pbs, [exam.id]: scaled }))
    }
    const lasts = getLastScores()
    localStorage.setItem(LAST_KEY, JSON.stringify({ ...lasts, [exam.id]: { scaled, pct } }))
  }, [scaled, pct])

  return (
    <div style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: 'var(--bg)', WebkitOverflowScrolling: 'touch' }}>
      <div style={{ maxWidth: '760px', width: '100%', margin: '0 auto', padding: '40px 24px 80px', display: 'flex', flexDirection: 'column', gap: '0' }}>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '26px', margin: 0 }}>
            Exam Results
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            {exam?.session} {exam?.year} · {exam?.subject || 'Regents Exam'}
          </p>
        </div>

        {/* XP banner */}
        {xpEarned != null && (
          <div className="regents-xp-banner">
            <span className="regents-xp-earned">+{xpEarned} XP earned</span>
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

        <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5, margin: '0 0 16px' }}>
          ⚠️ Estimated score based on multiple-choice only. The official Regents conversion changes each exam and also counts written/lab responses, so your real result may differ.
        </p>

        {/* Per-part breakdown */}
        {Object.keys(byPart).length > 0 && (
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
        )}

        {/* Weak topic analysis */}
        {weakTopics.length > 0 && (
          <div className="card-glass" style={{ padding: '16px 20px', marginBottom: '20px', borderLeft: '4px solid #f97316' }}>
            <p style={{ fontWeight: 800, fontSize: '14px', color: '#f97316', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              📉 Topics to Review
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {weakTopics.map(([topic, count]) => (
                <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ flex: 1, fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{topic}</div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {Array.from({ length: count }).map((_, i) => (
                      <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                    ))}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', minWidth: '60px', textAlign: 'right' }}>
                    {count} wrong
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                    <div style={{ padding: '10px', background: 'rgba(34,197,94,0.05)', borderRadius: '6px', border: '1px solid rgba(34,197,94,0.2)' }}>
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
                              onClick={() => setSelfGrades((prev) => ({ ...prev, [q.number]: credit }))}
                              className={active ? 'btn-duo btn-duo-blue' : 'btn-duo-outline'}
                              style={{ padding: '4px 12px', fontSize: '12px' }}
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
                        Correct: <strong>{corrLabel}. {q.choices?.[q.correct]}</strong>
                      </p>
                    )}
                    {q.explanation && (
                      <p className="regents-review-explanation" style={{ WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {q.explanation}
                      </p>
                    )}
                    {q.explanation && (
                      <button
                        onClick={() => setDiveDeepQ(q)}
                        style={{ alignSelf: 'flex-start', marginTop: '6px', padding: '3px 10px', fontSize: '12px', fontWeight: 700, borderRadius: '8px', border: '1px solid rgba(88,204,2,0.4)', background: 'rgba(88,204,2,0.08)', color: 'var(--brand-dark)', cursor: 'pointer' }}
                      >
                        🔍 Dive Deep
                      </button>
                    )}
                  </>
                )}
              </div>
            )
          })}

          {(showAll ? results : wrongItems).length === 0 && (
            <div className="card-glass" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              🎉 No wrong answers to review!
            </div>
          )}
        </div>

        <div className="regents-result-actions">
          <button className="btn-duo-outline" onClick={onRetake} style={{ flex: 1, padding: '12px' }}>Retake Exam</button>
          <button className="btn-duo btn-duo-blue" onClick={onHome} style={{ flex: 1, padding: '12px' }}>Done</button>
        </div>
      </div>

      {/* Dive Deep modal */}
      {diveDeepQ && (
        <div
          onClick={() => setDiveDeepQ(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: 'var(--surface)', borderRadius: '24px 24px 0 0', padding: '20px 24px 32px', width: '100%', maxWidth: '760px', maxHeight: '75vh', display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'var(--border)', alignSelf: 'center', marginBottom: '4px' }} />
            <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '8px' }}>
              <p style={{ fontWeight: 800, fontSize: '17px', color: 'var(--brand-dark)', margin: 0 }}>🔍 Explanation</p>
              <p style={{ fontSize: '15px', lineHeight: '24px', color: 'var(--text)', margin: 0 }}>{diveDeepQ.explanation}</p>
              {diveDeepQ.diveDeep && (
                <>
                  <div style={{ height: '1px', background: 'var(--border)' }} />
                  <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: 'var(--text-muted)', margin: 0 }}>DEEP DIVE</p>
                  <p style={{ fontSize: '15px', lineHeight: '24px', color: 'var(--text)', margin: 0 }}>{diveDeepQ.diveDeep}</p>
                </>
              )}
            </div>
            <button
              onClick={() => setDiveDeepQ(null)}
              className="btn-duo btn-duo-correct"
              style={{ width: '100%', padding: '14px', fontSize: '15px', marginTop: '4px' }}
            >
              Got it ✓
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
