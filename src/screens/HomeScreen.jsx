import { TOPICS, TOPIC_ICONS, questions } from '../data/questions'

export default function HomeScreen({
  onStart, onPracticeTest, onAnalytics, onDiagnostic,
  user, onLogOut, history, streak, studiedToday, weekDays,
  masteryPct, isUnlocked, unlockHint,
  completedCount, totalTopics,
  xp, onBuyStreak,
}) {
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

      {/* Streak card */}
      <div className={`streak-card ${studiedToday ? 'streak-card--done' : ''}`}>
        <div className="streak-card-top">
          <div className="streak-card-left">
            <span className="streak-card-flame">🔥</span>
            <div>
              <p className="streak-card-count">{streak} day{streak !== 1 ? 's' : ''}</p>
              <p className="streak-card-status">
                {studiedToday ? 'Studied today ✓' : streak > 0 ? 'Study today to keep your streak!' : 'Start your streak today!'}
              </p>
            </div>
          </div>
          <span className="xp-badge">💫 {xp.toLocaleString()} XP</span>
        </div>

        <div className="streak-week">
          {weekDays.map(({ date, dayLabel, studied, isToday }) => (
            <div key={date} className="streak-day">
              <div className={`streak-dot ${studied ? 'streak-dot--studied' : ''} ${isToday ? 'streak-dot--today' : ''}`} />
              <span className={`streak-day-label ${isToday ? 'streak-day-label--today' : ''}`}>{dayLabel}</span>
            </div>
          ))}
        </div>

        {!studiedToday && (
          <button
            className={`buy-streak-btn ${xp < 100 ? 'buy-streak-btn--disabled' : ''}`}
            onClick={onBuyStreak}
            disabled={xp < 100}
          >
            🔁 Buy streak day · <strong>100 XP</strong>
            {xp < 100 && <span className="buy-streak-hint"> (need {100 - xp} more XP)</span>}
          </button>
        )}
      </div>

      {/* Progress path */}
      <div className="unlock-path">
        <div className="unlock-path-header">
          <span className="unlock-path-label">YOUR PROGRESS</span>
          <span className="unlock-path-count">{completedCount} / {totalTopics} topics passed</span>
        </div>
        <div className="unlock-path-track">
          {allTopics.map((topic, i) => {
            const unlocked = isUnlocked(topic)
            const passed   = masteryPct(topic) !== null && masteryPct(topic) >= 65
            return (
              <div key={topic} className="unlock-step">
                <div className={`unlock-node ${passed ? 'unlock-node--passed' : unlocked ? 'unlock-node--open' : 'unlock-node--locked'}`}>
                  {passed ? '✓' : unlocked ? i + 1 : '🔒'}
                </div>
                {i < allTopics.length - 1 && (
                  <div className={`unlock-connector ${passed ? 'unlock-connector--passed' : ''}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="quick-actions">
        <button className="quick-practice" onClick={onPracticeTest}>
          <span className="quick-icon">📝</span>
          <div>
            <p className="quick-name">Practice Test</p>
            <p className="quick-sub">{questions.length} questions · timed</p>
          </div>
        </button>
        <button className="quick-diagnostic" onClick={onDiagnostic}>
          <span className="quick-icon">🔍</span>
          <p className="quick-name">Diagnostic</p>
          <p className="quick-sub">18 questions</p>
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
          const count    = questions.filter((q) => q.topic === topic).length
          const unlocked = isUnlocked(topic)
          const hint     = unlockHint(topic)

          return (
            <button
              key={topic}
              className={`topic-card ${!unlocked ? 'topic-card--locked' : ''}`}
              onClick={() => unlocked && onStart(topic)}
              disabled={!unlocked}
            >
              <div className="topic-card-header">
                <span className="topic-icon">{unlocked ? TOPIC_ICONS[topic] : '🔒'}</span>
                {unlocked && <MasteryBadge topic={topic} />}
              </div>
              <span className="topic-name">{topic}</span>
              {unlocked
                ? <span className="topic-count">{count} questions</span>
                : <span className="topic-locked-hint">{hint}</span>
              }
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
