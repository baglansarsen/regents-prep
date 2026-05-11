import { TOPICS, TOPIC_ICONS } from '../data/questions'

export default function AnalyticsScreen({ history, streak, onHome }) {
  const allTopics = Object.values(TOPICS)

  const totals = history.reduce(
    (acc, h) => ({ answered: acc.answered + h.total, correct: acc.correct + h.correct, played: acc.played + 1 }),
    { answered: 0, correct: 0, played: 0 },
  )

  const overallPct = totals.answered > 0
    ? Math.round((totals.correct / totals.answered) * 100)
    : null

  const topicStats = allTopics.map((t) => {
    const sessions = history.filter((h) => h.topic === t)
    if (!sessions.length) return null
    const totalAnswered = sessions.reduce((s, h) => s + h.total, 0)
    const totalCorrect  = sessions.reduce((s, h) => s + h.correct, 0)
    return { topic: t, pct: Math.round((totalCorrect / totalAnswered) * 100), sessions: sessions.length }
  }).filter(Boolean)

  const weakest   = topicStats.length ? topicStats.reduce((a, b) => a.pct < b.pct ? a : b) : null
  const strongest = topicStats.length ? topicStats.reduce((a, b) => a.pct > b.pct ? a : b) : null

  return (
    <div className="analytics-screen">
      <div className="analytics-topbar">
        <button className="btn-ghost" onClick={onHome}>← Back</button>
        <span className="analytics-title">Analytics</span>
        <span style={{ width: 48 }} />
      </div>

      <div className="analytics-stat-grid">
        <StatCard label="Questions" value={totals.answered || '—'} />
        <StatCard label="Accuracy" value={overallPct != null ? `${overallPct}%` : '—'} highlight={overallPct >= 65} />
        <StatCard label="Sessions" value={totals.played || '—'} />
        <StatCard label="Day Streak" value={streak > 0 ? `🔥${streak}` : '—'} />
      </div>

      {weakest && (
        <div className="analytics-insight analytics-insight--weak">
          <span className="analytics-insight-icon">📉</span>
          <div>
            <p className="analytics-insight-label">Needs Work</p>
            <p className="analytics-insight-value">{weakest.topic} — {weakest.pct}%</p>
          </div>
        </div>
      )}
      {strongest && strongest.topic !== weakest?.topic && (
        <div className="analytics-insight analytics-insight--strong">
          <span className="analytics-insight-icon">📈</span>
          <div>
            <p className="analytics-insight-label">Strongest Topic</p>
            <p className="analytics-insight-value">{strongest.topic} — {strongest.pct}%</p>
          </div>
        </div>
      )}

      <p className="analytics-section-label">BY TOPIC</p>
      {allTopics.map((topic) => {
        const sessions = history.filter((h) => h.topic === topic)
        const hasData = sessions.length > 0
        const totalAnswered = sessions.reduce((s, h) => s + h.total, 0)
        const totalCorrect  = sessions.reduce((s, h) => s + h.correct, 0)
        const pct = hasData ? Math.round((totalCorrect / totalAnswered) * 100) : null
        const barColor = pct == null ? '#334155' : pct >= 85 ? '#22c55e' : pct >= 65 ? '#f59e0b' : '#ef4444'

        return (
          <div key={topic} className="analytics-topic-row">
            <span className="analytics-topic-icon">{TOPIC_ICONS[topic]}</span>
            <div className="analytics-topic-info">
              <div className="analytics-topic-meta">
                <span className="analytics-topic-name">{topic}</span>
                <span className="analytics-topic-stat">
                  {hasData ? `${totalCorrect}/${totalAnswered} correct` : 'No data yet'}
                </span>
              </div>
              <div className="analytics-bar-track">
                <div className="analytics-bar-fill" style={{ width: pct != null ? `${pct}%` : '0%', backgroundColor: barColor }} />
              </div>
            </div>
            <span className="analytics-pct" style={{ color: pct != null ? barColor : '#94a3b8' }}>
              {pct != null ? `${pct}%` : '—'}
            </span>
          </div>
        )
      })}

      {totals.answered === 0 && (
        <div className="analytics-empty">
          <span style={{ fontSize: '2.5rem' }}>📊</span>
          <p>Complete a quiz to see your analytics.</p>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, highlight }) {
  return (
    <div className={`analytics-stat-card ${highlight ? 'analytics-stat-card--highlight' : ''}`}>
      <span className={`analytics-stat-value ${highlight ? 'analytics-stat-value--highlight' : ''}`}>{value}</span>
      <span className="analytics-stat-label">{label}</span>
    </div>
  )
}
