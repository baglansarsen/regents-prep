import { TOPICS, TOPIC_ICONS, questions } from '../data/questions'

export default function HomeScreen({ onStart, onPracticeTest, onAnalytics, user, onLogOut, history, streak, masteryPct }) {
  const allTopics = Object.values(TOPICS)

  const bestPct = history.length ? Math.max(...history.map((h) => h.pct)) : null

  function MasteryBadge({ topic }) {
    const pct = masteryPct(topic)
    if (pct === null) return null
    const color = pct >= 85 ? '#22c55e' : pct >= 65 ? '#f59e0b' : '#ef4444'
    return (
      <span className="mastery-badge" style={{ color, borderColor: color, backgroundColor: color + '22' }}>
        {pct}%
      </span>
    )
  }

  return (
    <div className="home-screen">
      <header className="home-header">
        <div className="user-bar">
          {user.photoURL && <img className="user-avatar" src={user.photoURL} alt="" referrerPolicy="no-referrer" />}
          <span className="user-name">{user.displayName}</span>
          {streak > 0 && (
            <span className="streak-badge">🔥 {streak}</span>
          )}
          <button className="btn-ghost logout-btn" onClick={onLogOut}>Sign out</button>
        </div>

        <h1 className="app-title">Living Environment</h1>
        <p className="app-subtitle">Regents Prep</p>
        <p className="app-tagline">Master every topic. Beat the clock. Ace the exam.</p>

        {history.length > 0 && (
          <div className="stats-bar">
            <div className="stat-chip">
              <span className="stat-value">{history.length}</span>
              <span className="stat-label">quizzes</span>
            </div>
            <div className="stat-chip">
              <span className="stat-value">{bestPct}%</span>
              <span className="stat-label">best score</span>
            </div>
            <div className="stat-chip">
              <span className="stat-value">{history[0].pct}%</span>
              <span className="stat-label">last quiz</span>
            </div>
          </div>
        )}
      </header>

      <div className="quick-actions">
        <button className="quick-practice" onClick={onPracticeTest}>
          <span className="quick-icon">📝</span>
          <div>
            <p className="quick-name">Practice Test</p>
            <p className="quick-sub">{questions.length} questions · timed</p>
          </div>
        </button>
        <button className="quick-analytics" onClick={onAnalytics}>
          <span className="quick-icon">📊</span>
          <p className="quick-name">Analytics</p>
        </button>
      </div>

      <section className="topic-grid-section">
        <button className="topic-card topic-card--all" onClick={() => onStart(null)}>
          <span className="topic-icon">⚡</span>
          <span className="topic-name">All Topics</span>
          <span className="topic-count">{questions.length} questions</span>
          <MasteryBadge topic={null} />
        </button>

        {allTopics.map((topic) => {
          const count = questions.filter((q) => q.topic === topic).length
          return (
            <button key={topic} className="topic-card" onClick={() => onStart(topic)}>
              <div className="topic-card-header">
                <span className="topic-icon">{TOPIC_ICONS[topic]}</span>
                <MasteryBadge topic={topic} />
              </div>
              <span className="topic-name">{topic}</span>
              <span className="topic-count">{count} questions</span>
            </button>
          )
        })}
      </section>

      {history.length > 0 && (
        <section className="recent-section">
          <h3 className="recent-title">Recent Activity</h3>
          <div className="recent-list">
            {history.slice(0, 5).map((h) => (
              <div key={h.id} className="recent-row">
                <span className="recent-topic">{h.topic}</span>
                <span className="recent-fraction">{h.correct}/{h.total}</span>
                <span className="recent-pct" style={{ color: h.pct >= 85 ? '#22c55e' : h.pct >= 65 ? '#f59e0b' : '#ef4444' }}>
                  {h.pct}%
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
