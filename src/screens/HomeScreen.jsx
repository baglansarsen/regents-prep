import { useState, useMemo } from 'react'
import { TOPICS, TOPIC_ICONS, questions } from '../data/questions'
import { getFlashcardsByTopic, FLASHCARD_TOPIC_LIST } from '../data/flashcards'
import { NY_SCHOOLS, BOROUGHS } from '../data/schools'
import { useLeaderboard } from '../hooks/useLeaderboard'
import TabBar from '../components/TabBar'
import ExamCountdown from '../components/ExamCountdown'
import DailyQuestion from '../components/DailyQuestion'

// ── Shared ─────────────────────────────────────────────────────────────────

function MasteryBadge({ topic, masteryPct }) {
  const pct = masteryPct(topic)
  if (pct === null) return null
  const color = pct >= 85 ? '#22c55e' : pct >= 65 ? '#f59e0b' : '#ef4444'
  return (
    <span className="mastery-badge" style={{ color, borderColor: color, backgroundColor: color + '22' }}>
      {pct}%
    </span>
  )
}

function Avatar({ photoURL, name, size = 32, className = '' }) {
  if (photoURL) return <img className={`avatar-img ${className}`} style={{ width: size, height: size }} src={photoURL} alt="" referrerPolicy="no-referrer" />
  return (
    <div className={`avatar-placeholder ${className}`} style={{ width: size, height: size, fontSize: size * 0.4 }}>
      {(name ?? '?')[0].toUpperCase()}
    </div>
  )
}

// ── Study Tab ──────────────────────────────────────────────────────────────

function StudyTab({ onStart, onPracticeTest, onDiagnostic, masteryPct, isUnlocked, unlockHint, streak, studiedToday, weekDays, xp, onBuyStreak, dailyQ, dailyAnswered, dailyRecord, dailyLoading, onDailySubmit }) {
  const allTopics = Object.values(TOPICS)
  return (
    <div className="tab-panel">
      <ExamCountdown />
      <DailyQuestion
        question={dailyQ}
        answeredToday={dailyAnswered}
        record={dailyRecord}
        loading={dailyLoading}
        onSubmit={onDailySubmit}
      />
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
          <button className={`buy-streak-btn ${xp < 100 ? 'buy-streak-btn--disabled' : ''}`} onClick={onBuyStreak} disabled={xp < 100}>
            🔁 Buy streak day · <strong>100 XP</strong>
            {xp < 100 && <span className="buy-streak-hint"> (need {100 - xp} more XP)</span>}
          </button>
        )}
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
      </div>

      <section className="topic-grid-section">
        <button className="topic-card topic-card--all" onClick={() => onStart(null)}>
          <span className="topic-icon">⚡</span>
          <span className="topic-name">All Topics</span>
          <span className="topic-count">{questions.length} questions</span>
          <MasteryBadge topic={null} masteryPct={masteryPct} />
        </button>
        {allTopics.map((topic) => {
          const count    = questions.filter((q) => q.topic === topic).length
          const unlocked = isUnlocked(topic)
          const hint     = unlockHint(topic)
          return (
            <button key={topic} className={`topic-card ${!unlocked ? 'topic-card--locked' : ''}`} onClick={() => unlocked && onStart(topic)} disabled={!unlocked}>
              <div className="topic-card-header">
                <span className="topic-icon">{unlocked ? TOPIC_ICONS[topic] : '🔒'}</span>
                {unlocked && <MasteryBadge topic={topic} masteryPct={masteryPct} />}
              </div>
              <span className="topic-name">{topic}</span>
              {unlocked ? <span className="topic-count">{count} questions</span> : <span className="topic-locked-hint">{hint}</span>}
            </button>
          )
        })}
      </section>
    </div>
  )
}

// ── Cards Tab ──────────────────────────────────────────────────────────────

function CardsTab({ knownIds, markKnown, markLearning, resetAll }) {
  const [topic, setTopic]     = useState(null)
  const [reviewOnly, setReview] = useState(false)
  const [index, setIndex]     = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone]       = useState(false)

  const deck = useMemo(() => {
    let cards = getFlashcardsByTopic(topic)
    if (reviewOnly) cards = cards.filter((c) => !knownIds.has(c.id))
    return cards
  }, [topic, reviewOnly, knownIds])

  const card         = deck[index]
  const knownCount   = deck.filter((c) =>  knownIds.has(c.id)).length
  const stillLearning = deck.filter((c) => !knownIds.has(c.id)).length

  function next(isKnown) {
    if (isKnown) markKnown(card.id); else markLearning(card.id)
    setFlipped(false)
    if (index + 1 >= deck.length) setDone(true)
    else setTimeout(() => setIndex(index + 1), 120)
  }
  function restart() { setIndex(0); setFlipped(false); setDone(false) }
  function changeTopic(val) { setTopic(val); setIndex(0); setFlipped(false); setDone(false) }

  if (done) return (
    <div className="tab-panel">
      <div className="flashcard-done">
        <div className="flashcard-done-emoji">🎉</div>
        <h2 className="flashcard-done-title">Deck complete!</h2>
        <p className="flashcard-done-stats">{knownCount} known · {stillLearning} still learning</p>
        <div className="flashcard-done-actions">
          {stillLearning > 0 && <button className="fc-btn fc-btn--review" onClick={() => { setReview(true); restart() }}>Review {stillLearning} remaining</button>}
          <button className="fc-btn fc-btn--restart" onClick={restart}>Start over</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="tab-panel flashcard-tab-panel">
      <div className="flashcard-topic-row">
        {FLASHCARD_TOPIC_LIST.map(({ label, value }) => (
          <button key={label} className={`fc-topic-chip ${topic === value ? 'fc-topic-chip--active' : ''}`} onClick={() => changeTopic(value)}>
            {value === null ? '⚡ All' : label.split(' ')[0]}
          </button>
        ))}
      </div>
      <div className="flashcard-filter-row">
        <button className={`fc-filter-btn ${reviewOnly ? 'fc-filter-btn--active' : ''}`} onClick={() => { setReview((r) => !r); setIndex(0); setFlipped(false); setDone(false) }}>
          📚 Still learning only
        </button>
        <button className="fc-filter-btn fc-filter-btn--reset" onClick={() => { resetAll(); restart() }}>↺ Reset</button>
      </div>
      <div className="flashcard-progress">
        <span className="flashcard-progress-text">{deck.length ? index + 1 : 0} / {deck.length}</span>
        <div className="flashcard-progress-bar">
          <div className="flashcard-progress-known"  style={{ width: deck.length ? `${(knownCount / deck.length) * 100}%` : '0%' }} />
          <div className="flashcard-progress-cursor" style={{ width: deck.length ? `${((index + 1) / deck.length) * 100}%` : '0%' }} />
        </div>
        <span className="flashcard-progress-known-label">✓ {knownCount}</span>
      </div>
      {deck.length === 0 ? (
        <div className="flashcard-empty"><p>No cards to review. Change the filter or topic.</p></div>
      ) : (
        <div className={`flashcard-card ${flipped ? 'flashcard-card--flipped' : ''}`} onClick={() => setFlipped((f) => !f)}>
          <div className="flashcard-card-inner">
            <div className="flashcard-face flashcard-face--front">
              <span className="flashcard-face-label">TERM</span>
              <p className="flashcard-term">{card.term}</p>
              <span className="flashcard-tap-hint">tap to reveal</span>
            </div>
            <div className="flashcard-face flashcard-face--back">
              <span className="flashcard-face-label">DEFINITION</span>
              <p className="flashcard-definition">{card.definition}</p>
              <span className="flashcard-topic-tag">{card.topic}</span>
            </div>
          </div>
        </div>
      )}
      {flipped && deck.length > 0 && (
        <div className="flashcard-actions">
          <button className="fc-action fc-action--learning" onClick={() => next(false)}>↻ Still learning</button>
          <button className="fc-action fc-action--known"    onClick={() => next(true)}>✓ Got it!</button>
        </div>
      )}
    </div>
  )
}

// ── Progress Tab ───────────────────────────────────────────────────────────

function ProgressTab({ history, masteryPct, isUnlocked, completedCount, totalTopics, earnedIds, allAchievements, onAnalytics, onAchievements, onBookmarks, bookmarkedIds }) {
  const allTopics   = Object.values(TOPICS)
  const bestPct     = history.length ? Math.max(...history.map((h) => h.pct)) : null
  const earnedCount = earnedIds?.size ?? 0
  const totalAch    = allAchievements?.length ?? 0

  return (
    <div className="tab-panel">
      {history.length > 0 && (
        <div className="stats-bar">
          <div className="stat-chip"><span className="stat-value">{history.length}</span><span className="stat-label">quizzes</span></div>
          <div className="stat-chip"><span className="stat-value">{bestPct}%</span><span className="stat-label">best score</span></div>
          <div className="stat-chip"><span className="stat-value">{history[0].pct}%</span><span className="stat-label">last quiz</span></div>
        </div>
      )}
      <div className="unlock-path">
        <div className="unlock-path-header">
          <span className="unlock-path-label">TOPIC PATH</span>
          <span className="unlock-path-count">{completedCount} / {totalTopics} passed</span>
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
                {i < allTopics.length - 1 && <div className={`unlock-connector ${passed ? 'unlock-connector--passed' : ''}`} />}
              </div>
            )
          })}
        </div>
      </div>
      <div className="progress-actions">
        <button className="progress-action-card" onClick={onAnalytics}>
          <span className="progress-action-icon">📊</span>
          <div><p className="progress-action-name">Analytics</p><p className="progress-action-sub">Topic breakdown & trends</p></div>
        </button>
        <button className="progress-action-card" onClick={onAchievements}>
          <span className="progress-action-icon">🏅</span>
          <div><p className="progress-action-name">Badges</p><p className="progress-action-sub">{earnedCount} / {totalAch} unlocked</p></div>
        </button>
        <button className="progress-action-card" onClick={onBookmarks}>
          <span className="progress-action-icon">🔖</span>
          <div><p className="progress-action-name">Bookmarks</p><p className="progress-action-sub">{bookmarkedIds?.size ?? 0} question{(bookmarkedIds?.size ?? 0) !== 1 ? 's' : ''} saved</p></div>
        </button>
      </div>
      {history.length > 0 && (
        <section className="recent-section">
          <h3 className="recent-title">Recent Activity</h3>
          <div className="recent-list">
            {history.slice(0, 8).map((h) => (
              <div key={h.id} className="recent-row">
                <span className="recent-topic">{h.topic}</span>
                <span className="recent-fraction">{h.correct}/{h.total}</span>
                <span className="recent-pct" style={{ color: h.pct >= 85 ? '#22c55e' : h.pct >= 65 ? '#f59e0b' : '#ef4444' }}>{h.pct}%</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// ── Rankings Tab ───────────────────────────────────────────────────────────

function RankingsTab({ user, school, onGoToProfile }) {
  const { entries, loading, error } = useLeaderboard(school)

  if (!school) return (
    <div className="tab-panel">
      <div className="rankings-no-school">
        <div className="rankings-no-school-icon">🏆</div>
        <h3 className="rankings-no-school-title">Join your school's leaderboard</h3>
        <p className="rankings-no-school-sub">Set your school in Profile to compete with classmates and see how you rank.</p>
        <button className="rankings-set-school-btn" onClick={onGoToProfile}>Set school in Profile →</button>
      </div>
    </div>
  )

  return (
    <div className="tab-panel">
      <div className="rankings-school-banner">
        <span className="rankings-school-banner-icon">🏫</span>
        <div>
          <p className="rankings-school-banner-label">LEADERBOARD</p>
          <p className="rankings-school-banner-name">{school}</p>
        </div>
        <button className="rankings-change-btn" onClick={onGoToProfile}>Edit</button>
      </div>

      {loading && (
        <div className="rankings-loading-state">
          <div className="rankings-loading-spinner" />
          <p>Loading rankings…</p>
        </div>
      )}
      {error && <p className="rankings-error">⚠ {error}</p>}

      {!loading && !error && entries.length === 0 && (
        <div className="rankings-be-first">
          <div className="rankings-be-first-icon">🌟</div>
          <p className="rankings-be-first-msg">Be the first from your school!</p>
          <p className="rankings-be-first-sub">Complete quizzes to earn XP and appear here.</p>
        </div>
      )}

      <div className="rankings-list">
        {entries.map((entry, i) => {
          const isMe  = entry.uid === user?.uid
          const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null
          const badges = entry.badges ?? []
          return (
            <div key={entry.uid} className={`rankings-card ${isMe ? 'rankings-card--me' : ''}`}>
              <div className="rankings-card-rank">
                {medal
                  ? <span className="rankings-medal">{medal}</span>
                  : <span className="rankings-num">#{i + 1}</span>
                }
              </div>
              <Avatar photoURL={entry.photoURL} name={entry.displayName} size={44} className="rankings-card-avatar" />
              <div className="rankings-card-info">
                <p className="rankings-card-name">
                  {entry.displayName}
                  {isMe && <span className="rankings-card-you"> · you</span>}
                </p>
                <p className="rankings-card-xp">💫 {entry.xp?.toLocaleString()} XP</p>
                {badges.length > 0 && (
                  <div className="rankings-card-badges">
                    {badges.map((emoji, j) => (
                      <span key={j} className="rankings-badge-emoji">{emoji}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Profile Tab ────────────────────────────────────────────────────────────

function ProfileTab({ user, school, saveSchool, xp, streak, history, onLogOut }) {
  const [editing, setEditing]   = useState(false)
  const [search,  setSearch]    = useState('')
  const [borough, setBorough]   = useState(null)

  const bestPct     = history.length ? Math.max(...history.map((h) => h.pct)) : null
  const totalQuizzes = history.length

  const filtered = useMemo(() => {
    let list = NY_SCHOOLS
    if (borough) list = list.filter((s) => s.borough === borough)
    if (search)  list = list.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    return list
  }, [borough, search])

  function selectSchool(s) {
    saveSchool(s.name)
    setEditing(false)
    setSearch('')
    setBorough(null)
  }

  return (
    <div className="tab-panel profile-tab">
      {/* Profile card */}
      <div className="profile-card">
        <Avatar photoURL={user.photoURL} name={user.displayName} size={80} className="profile-avatar-lg" />
        <div className="profile-card-info">
          <h2 className="profile-name">{user.displayName}</h2>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="profile-stats-row">
        <div className="profile-stat"><span className="profile-stat-value">💫 {xp.toLocaleString()}</span><span className="profile-stat-label">XP</span></div>
        <div className="profile-stat"><span className="profile-stat-value">🔥 {streak}</span><span className="profile-stat-label">streak</span></div>
        <div className="profile-stat"><span className="profile-stat-value">{totalQuizzes}</span><span className="profile-stat-label">quizzes</span></div>
        {bestPct !== null && <div className="profile-stat"><span className="profile-stat-value">{bestPct}%</span><span className="profile-stat-label">best</span></div>}
      </div>

      {/* School section */}
      <div className="profile-section">
        <div className="profile-section-header">
          <span className="profile-section-label">MY SCHOOL</span>
          {school && !editing && <button className="profile-section-edit" onClick={() => setEditing(true)}>Change</button>}
        </div>

        {school && !editing && (
          <div className="profile-school-display">
            <span className="profile-school-icon">🏫</span>
            <span className="profile-school-name">{school}</span>
          </div>
        )}

        {(!school || editing) && (
          <div className="profile-school-picker">
            <input
              className="rankings-search"
              placeholder="Search schools..."
              value={search}
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="rankings-borough-row">
              <button className={`rankings-borough-chip ${!borough ? 'rankings-borough-chip--active' : ''}`} onClick={() => setBorough(null)}>All</button>
              {BOROUGHS.map((b) => (
                <button key={b} className={`rankings-borough-chip ${borough === b ? 'rankings-borough-chip--active' : ''}`} onClick={() => setBorough(b)}>{b}</button>
              ))}
            </div>
            <div className="profile-school-list">
              {filtered.map((s) => (
                <button key={s.id} className="rankings-school-row" onClick={() => selectSchool(s)}>
                  <div>
                    <p className="rankings-school-name">{s.name}</p>
                    <p className="rankings-school-borough">{s.borough}</p>
                  </div>
                  <span className="rankings-school-arrow">›</span>
                </button>
              ))}
              {filtered.length === 0 && <p className="rankings-empty">No schools match.</p>}
            </div>
            {editing && (
              <button className="profile-cancel-btn" onClick={() => { setEditing(false); setSearch(''); setBorough(null) }}>Cancel</button>
            )}
          </div>
        )}
      </div>

      {/* Sign out */}
      <button className="profile-signout-btn" onClick={onLogOut}>Sign out</button>
    </div>
  )
}

// ── Main HomeScreen ────────────────────────────────────────────────────────

export default function HomeScreen({
  onStart, onPracticeTest, onAnalytics, onDiagnostic, onAchievements,
  user, onLogOut,
  history, streak, studiedToday, weekDays,
  masteryPct, isUnlocked, unlockHint,
  completedCount, totalTopics,
  xp, onBuyStreak,
  earnedIds, allAchievements,
  knownIds, markKnown, markLearning, resetAll,
  school, saveSchool,
  dailyQ, dailyAnswered, dailyRecord, dailyLoading, onDailySubmit,
  onBookmarks, bookmarkedIds,
}) {
  const [tab, setTab] = useState('study')

  return (
    <div className="home-screen">
      <header className="home-header home-header--compact">
        <div className="home-title-row">
          <h1 className="app-title">Living Environment</h1>
          <p className="app-subtitle">Regents Prep</p>
        </div>
      </header>

      {tab === 'study' && (
        <StudyTab
          onStart={onStart} onPracticeTest={onPracticeTest} onDiagnostic={onDiagnostic}
          masteryPct={masteryPct} isUnlocked={isUnlocked} unlockHint={unlockHint}
          streak={streak} studiedToday={studiedToday} weekDays={weekDays}
          xp={xp} onBuyStreak={onBuyStreak}
          dailyQ={dailyQ} dailyAnswered={dailyAnswered} dailyRecord={dailyRecord}
          dailyLoading={dailyLoading} onDailySubmit={onDailySubmit}
        />
      )}
      {tab === 'cards' && (
        <CardsTab knownIds={knownIds} markKnown={markKnown} markLearning={markLearning} resetAll={resetAll} />
      )}
      {tab === 'progress' && (
        <ProgressTab
          history={history} masteryPct={masteryPct} isUnlocked={isUnlocked}
          completedCount={completedCount} totalTopics={totalTopics}
          earnedIds={earnedIds} allAchievements={allAchievements}
          onAnalytics={onAnalytics} onAchievements={onAchievements}
          onBookmarks={onBookmarks} bookmarkedIds={bookmarkedIds}
        />
      )}
      {tab === 'rankings' && (
        <RankingsTab user={user} school={school} onGoToProfile={() => setTab('profile')} />
      )}
      {tab === 'profile' && (
        <ProfileTab
          user={user} school={school} saveSchool={saveSchool}
          xp={xp} streak={streak} history={history} onLogOut={onLogOut}
        />
      )}

      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
