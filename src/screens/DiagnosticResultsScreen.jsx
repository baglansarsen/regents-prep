import { TOPICS, TOPIC_ICONS, QUESTIONS_PER_DIAGNOSTIC_TOPIC } from '../data/questions'

const TOPIC_ORDER = Object.values(TOPICS)

export default function DiagnosticResultsScreen({ results, onPractice, onRetake, onHome }) {
  // Per-topic breakdown
  const byTopic = results.reduce((acc, r) => {
    const t = r.question.topic
    if (!acc[t]) acc[t] = { correct: 0, total: 0 }
    acc[t].total++
    if (r.correct) acc[t].correct++
    return acc
  }, {})

  const topicStats = TOPIC_ORDER.map((topic) => {
    const d = byTopic[topic] ?? { correct: 0, total: QUESTIONS_PER_DIAGNOSTIC_TOPIC }
    const pct = Math.round((d.correct / d.total) * 100)
    const level = pct >= 85 ? 'strong' : pct >= 65 ? 'passing' : 'weak'
    return { topic, ...d, pct, level }
  })

  const weakTopics    = topicStats.filter((t) => t.level === 'weak')
  const passingTopics = topicStats.filter((t) => t.level === 'passing')
  const strongTopics  = topicStats.filter((t) => t.level === 'strong')

  const totalCorrect = results.filter((r) => r.correct).length
  const overallPct   = Math.round((totalCorrect / results.length) * 100)

  const diagnosis =
    weakTopics.length === 0   ? { label: 'Strong Foundation',  emoji: '🏆', color: '#22c55e' }
    : weakTopics.length <= 2  ? { label: 'Some Areas to Work On', emoji: '📈', color: '#f59e0b' }
    : { label: 'Focus Required', emoji: '📚', color: '#ef4444' }

  return (
    <div className="diag-results">
      {/* Hero */}
      <div className="diag-hero">
        <span className="diag-hero-emoji">{diagnosis.emoji}</span>
        <h2 className="diag-hero-label" style={{ color: diagnosis.color }}>{diagnosis.label}</h2>
        <p className="diag-hero-score">{totalCorrect} / {results.length} correct ({overallPct}%)</p>
        <p className="diag-hero-sub">18-question diagnostic · 3 questions per topic</p>
      </div>

      {/* Weak areas */}
      {weakTopics.length > 0 && (
        <div className="diag-section">
          <p className="diag-section-label">⚠️ Weak Areas — Needs Practice</p>
          <div className="diag-weak-list">
            {weakTopics.map(({ topic, correct, total, pct }) => (
              <div key={topic} className="diag-weak-card">
                <div className="diag-weak-header">
                  <span className="diag-topic-icon">{TOPIC_ICONS[topic]}</span>
                  <div className="diag-weak-info">
                    <p className="diag-topic-name">{topic}</p>
                    <p className="diag-topic-score">{correct}/{total} correct · {pct}%</p>
                  </div>
                  <div className="diag-bar-wrap">
                    <div className="diag-bar-track">
                      <div className="diag-bar-fill diag-bar-fill--weak" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
                <button className="diag-practice-btn" onClick={() => onPractice(topic)}>
                  Practice {topic} →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full breakdown */}
      <div className="diag-section">
        <p className="diag-section-label">All Topics</p>
        <div className="diag-breakdown">
          {topicStats.map(({ topic, correct, total, pct, level }) => (
            <div key={topic} className="diag-row">
              <span className="diag-row-icon">{TOPIC_ICONS[topic]}</span>
              <span className="diag-row-name">{topic}</span>
              <div className="diag-row-bar-track">
                <div
                  className="diag-row-bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: level === 'strong' ? '#22c55e' : level === 'passing' ? '#f59e0b' : '#ef4444',
                  }}
                />
              </div>
              <span
                className="diag-row-pct"
                style={{ color: level === 'strong' ? '#22c55e' : level === 'passing' ? '#f59e0b' : '#ef4444' }}
              >
                {pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="diag-legend">
        <span className="diag-legend-item diag-legend--strong">● Strong (85%+)</span>
        <span className="diag-legend-item diag-legend--passing">● Passing (65–84%)</span>
        <span className="diag-legend-item diag-legend--weak">● Needs Work (&lt;65%)</span>
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={onRetake}>Retake Diagnostic</button>
        <button className="btn-secondary" onClick={onHome}>Home</button>
      </div>
    </div>
  )
}
