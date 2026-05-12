import { useState, useMemo } from 'react'
import { TOPICS, TOPIC_ICONS, questions } from '../data/questions'
import { FLASHCARD_TOPIC_LIST } from '../data/flashcards'
import { useSpacedRepetition, Q_AGAIN, Q_GOOD, Q_EASY, nextReviewLabel } from '../hooks/useSpacedRepetition'
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

function StudyTab({ onStart, onPracticeTest, onDiagnostic, onSpeedRound, masteryPct, isUnlocked, unlockHint, streak, studiedToday, weekDays, xp, onBuyStreak, dailyQ, dailyAnswered, dailyRecord, dailyLoading, onDailySubmit }) {
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
        <button className="quick-speed" onClick={onSpeedRound}>
          <span className="quick-icon">⚡</span>
          <p className="quick-name">Speed Round</p>
          <p className="quick-sub">60 seconds</p>
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

// ── Cards Tab (SM-2 spaced repetition) ────────────────────────────────────

function CardsTab({ uid, earnXP }) {
  const { review, resetAll, buildDeck, getStats } = useSpacedRepetition(uid)

  const [topic,     setTopic]   = useState(null)
  const [browseAll, setBrowse]  = useState(false)
  const [index,     setIndex]   = useState(0)
  const [flipped,   setFlipped] = useState(false)
  const [lastLabel, setLastLabel] = useState(null) // next-review hint after rating
  const [done,      setDone]    = useState(false)

  const deck  = useMemo(() => buildDeck(topic, browseAll), [topic, browseAll, buildDeck])
  const stats = useMemo(() => getStats(topic), [topic, getStats])
  const card  = deck[index]

  const XP_BY_QUALITY = { [Q_AGAIN]: 2, [Q_GOOD]: 5, [Q_EASY]: 3 }

  function rate(quality) {
    review(card.id, quality)
    earnXP(XP_BY_QUALITY[quality] ?? 2)
    const label = quality >= Q_EASY ? 'in 6+ days' : quality >= Q_GOOD ? 'tomorrow' : 'in 1 day'
    setLastLabel(label)
    setFlipped(false)
    if (index + 1 >= deck.length) { setDone(true) }
    else setTimeout(() => { setIndex(index + 1); setLastLabel(null) }, 180)
  }

  function restart() { setIndex(0); setFlipped(false); setDone(false); setLastLabel(null) }
  function changeTopic(val) { setTopic(val); setIndex(0); setFlipped(false); setDone(false); setLastLabel(null) }

  if (done) return (
    <div className="tab-panel">
      <div className="flashcard-done">
        <div className="flashcard-done-emoji">🎉</div>
        <h2 className="flashcard-done-title">Session complete!</h2>
        <p className="flashcard-done-stats">
          {stats.reviewed} reviewed · {stats.mastered} mastered
        </p>
        <div className="flashcard-done-actions">
          <button className="fc-btn fc-btn--restart" onClick={restart}>Study again</button>
          {!browseAll && stats.total > deck.length && (
            <button className="fc-btn fc-btn--review" onClick={() => { setBrowse(true); restart() }}>Browse all cards</button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="tab-panel flashcard-tab-panel">
      {/* Topic chips */}
      <div className="flashcard-topic-row">
        {FLASHCARD_TOPIC_LIST.map(({ label, value }) => (
          <button key={label} className={`fc-topic-chip ${topic === value ? 'fc-topic-chip--active' : ''}`} onClick={() => changeTopic(value)}>
            {value === null ? '⚡ All' : label.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* SM-2 stats bar */}
      <div className="sr-stats-bar">
        <span className="sr-stat sr-stat--due">📚 {stats.due + stats.new} to study</span>
        <span className="sr-stat sr-stat--new">✓ {stats.reviewed} reviewed</span>
        <span className="sr-stat sr-stat--mastered">⭐ {stats.mastered} mastered</span>
        <button
          className={`sr-browse-toggle ${browseAll ? 'sr-browse-toggle--active' : ''}`}
          onClick={() => { setBrowse((b) => !b); restart() }}
        >
          {browseAll ? 'Smart mode' : 'Browse all'}
        </button>
      </div>

      {/* Progress */}
      <div className="flashcard-progress">
        <span className="flashcard-progress-text">{deck.length ? index + 1 : 0} / {deck.length}</span>
        <div className="flashcard-progress-bar">
          <div className="flashcard-progress-known"  style={{ width: deck.length ? `${(stats.mastered / stats.total) * 100}%` : '0%' }} />
          <div className="flashcard-progress-cursor" style={{ width: deck.length ? `${((index + 1) / deck.length) * 100}%` : '0%' }} />
        </div>
        <button className="fc-filter-btn fc-filter-btn--reset" onClick={() => { resetAll(); restart() }}>↺</button>
      </div>

      {deck.length === 0 ? (
        <div className="flashcard-empty">
          <p>🎉 All caught up! No cards due right now.</p>
          <button className="fc-btn fc-btn--restart" style={{ marginTop: 16 }} onClick={() => { setBrowse(true); restart() }}>Browse all cards</button>
        </div>
      ) : (
        <>
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

          {flipped && (
            <div className="sr-rate-row">
              <button className="sr-btn sr-btn--again" onClick={() => rate(Q_AGAIN)}>
                <span className="sr-btn-icon">↩</span>
                <span className="sr-btn-label">Again</span>
                <span className="sr-btn-hint">forgot</span>
              </button>
              <button className="sr-btn sr-btn--good" onClick={() => rate(Q_GOOD)}>
                <span className="sr-btn-icon">✓</span>
                <span className="sr-btn-label">Good</span>
                <span className="sr-btn-hint">got it</span>
              </button>
              <button className="sr-btn sr-btn--easy" onClick={() => rate(Q_EASY)}>
                <span className="sr-btn-icon">⚡</span>
                <span className="sr-btn-label">Easy</span>
                <span className="sr-btn-hint">too easy</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ── XP History Chart ───────────────────────────────────────────────────────

function XPHistoryChart({ history, xp }) {
  const sessions = [...history].reverse() // oldest → newest
  if (sessions.length < 1) return null

  const xpValues = sessions.map((s) => (s.correct ?? 0) * 10)
  const maxXP = Math.max(...xpValues, 1)

  return (
    <div className="xp-chart-card">
      <div className="xp-chart-header">
        <span className="xp-chart-title">XP History</span>
        <span className="xp-chart-total">💫 {xp.toLocaleString()} XP total</span>
      </div>
      <div className="xp-chart-bars">
        {sessions.map((s, i) => {
          const earned = (s.correct ?? 0) * 10
          const heightPct = Math.max(6, Math.round((earned / maxXP) * 100))
          const color = s.pct >= 85 ? '#22c55e' : s.pct >= 65 ? '#6366f1' : '#f59e0b'
          return (
            <div key={s.id ?? i} className="xp-bar-col">
              <span className="xp-bar-value">+{earned}</span>
              <div className="xp-bar-track">
                <div className="xp-bar-fill" style={{ height: `${heightPct}%`, background: color }} />
              </div>
              <span className="xp-bar-label" title={s.topic}>
                {s.topic === 'All Topics' ? '⚡' : (TOPIC_ICONS[s.topic] ?? '📝')}
              </span>
            </div>
          )
        })}
      </div>
      <div className="xp-chart-legend">
        <span className="xp-legend-dot" style={{ background: '#22c55e' }} />mastery
        <span className="xp-legend-dot" style={{ background: '#6366f1', marginLeft: 10 }} />passing
        <span className="xp-legend-dot" style={{ background: '#f59e0b', marginLeft: 10 }} />practice
      </div>
    </div>
  )
}

// ── Progress Tab ───────────────────────────────────────────────────────────

function ProgressTab({ history, xp, masteryPct, isUnlocked, completedCount, totalTopics, earnedIds, allAchievements, onAnalytics, onAchievements, onBookmarks, bookmarkedIds }) {
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
      <XPHistoryChart history={history} xp={xp} />
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

// ── School Leaderboard (reused in FriendsTab) ─────────────────────────────

function SchoolLeaderboard({ user, school, onGoToProfile, friends, sentRequests, onSendRequest }) {
  const { entries, loading, error } = useLeaderboard(school)

  if (!school) return (
    <div className="rankings-no-school">
      <div className="rankings-no-school-icon">🏆</div>
      <h3 className="rankings-no-school-title">Join your school's leaderboard</h3>
      <p className="rankings-no-school-sub">Set your school in Profile to compete with classmates.</p>
      <button className="rankings-set-school-btn" onClick={onGoToProfile}>Set school in Profile →</button>
    </div>
  )

  return (
    <>
      <div className="rankings-school-banner">
        <span className="rankings-school-banner-icon">🏫</span>
        <div>
          <p className="rankings-school-banner-label">LEADERBOARD</p>
          <p className="rankings-school-banner-name">{school}</p>
        </div>
        <button className="rankings-change-btn" onClick={onGoToProfile}>Edit</button>
      </div>
      {loading && <div className="rankings-loading-state"><div className="rankings-loading-spinner" /><p>Loading…</p></div>}
      {error   && <p className="rankings-error">⚠ {error}</p>}
      {!loading && !error && entries.length === 0 && (
        <div className="rankings-be-first">
          <div className="rankings-be-first-icon">🌟</div>
          <p className="rankings-be-first-msg">Be the first from your school!</p>
        </div>
      )}
      <div className="rankings-list">
        {entries.map((entry, i) => {
          const isMe      = entry.uid === user?.uid
          const isFriend  = friends?.some((f) => f.uid === entry.uid)
          const isPending = sentRequests?.some((r) => r.toUid === entry.uid)
          const medal     = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null
          const badges    = entry.badges ?? []
          return (
            <div key={entry.uid} className={`rankings-card ${isMe ? 'rankings-card--me' : ''}`}>
              <div className="rankings-card-rank">
                {medal ? <span className="rankings-medal">{medal}</span> : <span className="rankings-num">#{i + 1}</span>}
              </div>
              <Avatar photoURL={entry.photoURL} name={entry.displayName} size={44} className="rankings-card-avatar" />
              <div className="rankings-card-info">
                <p className="rankings-card-name">{entry.displayName}{isMe && <span className="rankings-card-you"> · you</span>}</p>
                <p className="rankings-card-xp">💫 {entry.xp?.toLocaleString()} XP</p>
                {badges.length > 0 && <div className="rankings-card-badges">{badges.map((e, j) => <span key={j} className="rankings-badge-emoji">{e}</span>)}</div>}
              </div>
              {!isMe && (
                <button
                  className={`lb-add-btn ${isFriend ? 'lb-add-btn--friend' : isPending ? 'lb-add-btn--pending' : ''}`}
                  onClick={() => !isFriend && !isPending && onSendRequest(entry.uid, entry)}
                  disabled={isFriend || isPending}
                >
                  {isFriend ? '✓' : isPending ? '…' : '+ Add'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

// ── Friends Tab ────────────────────────────────────────────────────────────

import { timeAgo } from '../hooks/useFriends'

function FriendsList({ friends, onChallenge, onRemove }) {
  const [confirmUid, setConfirmUid] = useState(null)

  function handleRemoveClick(uid) {
    if (confirmUid === uid) {
      onRemove(uid)
      setConfirmUid(null)
    } else {
      setConfirmUid(uid)
    }
  }

  return (
    <div className="fr-section">
      <p className="fr-section-title">👥 Friends ({friends.length})</p>
      {friends.length === 0 ? (
        <div className="friends-empty">
          <p className="friends-empty-title">No friends yet</p>
          <p className="friends-empty-sub">Share your code or enter a friend's to get started.</p>
        </div>
      ) : (
        <div className="friends-list">
          {friends.map((f, i) => {
            const confirming = confirmUid === f.uid
            return (
              <div key={f.uid} className="friends-card">
                <span className="friends-rank">#{i + 1}</span>
                <Avatar photoURL={f.photoURL} name={f.displayName} size={40} />
                <div className="friends-card-info">
                  <p className="friends-card-name">{f.displayName}</p>
                  <p className="friends-card-xp">💫 {(f.xp ?? 0).toLocaleString()} XP</p>
                </div>
                <div className="friends-card-actions">
                  {!confirming && (
                    <button className="friends-challenge-btn" onClick={() => onChallenge(f)} title="Challenge">⚔️</button>
                  )}
                  <button
                    className={`friends-remove-btn ${confirming ? 'friends-remove-btn--confirm' : ''}`}
                    onClick={() => handleRemoveClick(f.uid)}
                    title="Remove friend"
                  >
                    {confirming ? 'Remove?' : 'Remove'}
                  </button>
                  {confirming && (
                    <button className="friends-cancel-btn" onClick={() => setConfirmUid(null)}>Cancel</button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function FriendsTab({
  user, school,
  friends, friendCode, friendFeed,
  incomingRequests, sentRequests,
  addError, setAddError, addFriend, removeFriend,
  onSendRequest, onAcceptRequest, onDeclineRequest,
  challenges,
  onStartChallenge, onAcceptChallenge,
  onGoToProfile,
}) {
  const [subTab,     setSubTab]  = useState('friends')
  const [codeInput,  setCode]    = useState('')
  const [showAdd,    setShowAdd] = useState(false)
  const [adding,     setAdding]  = useState(false)
  const [copied,     setCopied]  = useState(false)

  const sortedFriends       = [...friends].sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0))
  const pendingChallenges   = challenges.filter((c) => c.status === 'pending' && c.role === 'receiver')
  const completedChallenges = challenges.filter((c) => c.status === 'done').slice(0, 5)

  async function handleAdd() {
    setAdding(true)
    const ok = await addFriend(codeInput)
    setAdding(false)
    if (ok) { setCode(''); setShowAdd(false) }
  }

  function handleCodeChange(e) {
    setAddError(null)
    setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))
  }

  function copyCode() {
    navigator.clipboard?.writeText(friendCode).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="tab-panel">
      {/* Sub-tab pills */}
      <div className="friends-pill-row">
        <button className={`friends-pill ${subTab === 'friends' ? 'friends-pill--active' : ''}`} onClick={() => setSubTab('friends')}>Friends</button>
        <button className={`friends-pill ${subTab === 'school'  ? 'friends-pill--active' : ''}`} onClick={() => setSubTab('school')}>School</button>
      </div>

      {subTab === 'school' && (
        <SchoolLeaderboard
          user={user} school={school} onGoToProfile={onGoToProfile}
          friends={friends} sentRequests={sentRequests} onSendRequest={onSendRequest}
        />
      )}

      {subTab === 'friends' && (
        <>
          {/* My code card */}
          <div className="friend-code-card">
            <div className="friend-code-left">
              <span className="friend-code-label">YOUR CODE</span>
              <span className="friend-code-value">{friendCode ?? '……'}</span>
            </div>
            <div className="friend-code-actions">
              <button className="friend-code-copy" onClick={copyCode}>{copied ? '✓' : 'Copy'}</button>
              <button className={`friend-add-toggle ${showAdd ? 'friend-add-toggle--active' : ''}`} onClick={() => { setShowAdd((v) => !v); setAddError(null); setCode('') }}>+ Add</button>
            </div>
          </div>

          {/* Add friend form */}
          {showAdd && (
            <div className="friend-add-form">
              <input
                className="friend-code-input"
                placeholder="Enter 6-character code"
                value={codeInput}
                onChange={handleCodeChange}
                maxLength={6}
                autoFocus
              />
              <button
                className="friend-add-btn"
                onClick={handleAdd}
                disabled={adding || codeInput.length < 6}
              >
                {adding ? '…' : 'Add'}
              </button>
              {addError && <p className="friend-add-error">{addError}</p>}
            </div>
          )}

          {/* Incoming friend requests */}
          {incomingRequests.length > 0 && (
            <div className="fr-section">
              <p className="fr-section-title">👋 Friend Requests ({incomingRequests.length})</p>
              {incomingRequests.map((req) => (
                <div key={req.id} className="friend-request-card">
                  <Avatar photoURL={req.fromPhoto} name={req.fromName} size={40} />
                  <div className="friend-request-info">
                    <p className="friend-request-name">{req.fromName}</p>
                    <p className="friend-request-sub">wants to be friends</p>
                  </div>
                  <div className="friend-request-actions">
                    <button className="friend-req-accept" onClick={() => onAcceptRequest(req)}>Accept</button>
                    <button className="friend-req-decline" onClick={() => onDeclineRequest(req.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pending challenges */}
          {pendingChallenges.length > 0 && (
            <div className="fr-section">
              <p className="fr-section-title">⚔️ Challenges ({pendingChallenges.length})</p>
              {pendingChallenges.map((c) => (
                <div key={c.id} className="challenge-card">
                  <div className="challenge-card-info">
                    <Avatar photoURL={c.fromPhoto} name={c.fromName} size={36} />
                    <div>
                      <p className="challenge-from">{c.fromName} challenged you</p>
                      <p className="challenge-score-hint">their score: {c.fromScore} pts</p>
                    </div>
                  </div>
                  <button className="challenge-accept-btn" onClick={() => onAcceptChallenge(c)}>Accept</button>
                </div>
              ))}
            </div>
          )}

          {/* Friends leaderboard */}
          <FriendsList
            friends={sortedFriends}
            onChallenge={onStartChallenge}
            onRemove={removeFriend}
          />

          {/* Completed challenges */}
          {completedChallenges.length > 0 && (
            <div className="fr-section">
              <p className="fr-section-title">Recent Results</p>
              {completedChallenges.map((c) => {
                const amSender  = c.role === 'sender'
                const myScore   = amSender ? c.fromScore : c.toScore
                const theirScore = amSender ? c.toScore : c.fromScore
                const name      = amSender ? c.toName   : c.fromName
                const iWon      = myScore > theirScore
                return (
                  <div key={c.id} className={`challenge-result-row ${iWon ? 'challenge-result-row--win' : 'challenge-result-row--loss'}`}>
                    <span className="challenge-result-icon">{iWon ? '🏆' : '😤'}</span>
                    <div className="challenge-result-info">
                      <p className="challenge-result-name">vs {name}</p>
                      <p className="challenge-result-scores">{myScore} pts vs {theirScore} pts</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Activity feed */}
          {friendFeed.length > 0 && (
            <div className="fr-section">
              <p className="fr-section-title">Activity</p>
              <div className="activity-feed">
                {friendFeed.map((item, i) => {
                  const isMe = item.authorUid === user?.uid
                  const name = isMe ? 'You' : (friends.find((f) => f.uid === item.authorUid)?.displayName ?? 'A friend')
                  return (
                    <div key={`${item.id}-${i}`} className="activity-item">
                      <span className="activity-emoji">{item.emoji}</span>
                      <div className="activity-text">
                        <span className="activity-name">{name}</span>
                        <span className="activity-label"> {item.label}</span>
                      </div>
                      <span className="activity-time">{item.createdAt ? timeAgo(item.createdAt) : ''}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ── Profile Tab ────────────────────────────────────────────────────────────

function ProfileTab({ user, school, saveSchool, xp, streak, history, onLogOut, theme, setTheme }) {
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

      {/* Appearance */}
      <div className="profile-section">
        <div className="profile-section-header">
          <span className="profile-section-label">APPEARANCE</span>
        </div>
        <div className="theme-picker">
          {[{ id: 'dark', icon: '🌙', label: 'Dark' }, { id: 'light', icon: '☀️', label: 'Light' }, { id: 'system', icon: '⚙️', label: 'System' }].map(({ id, icon, label }) => (
            <button
              key={id}
              className={`theme-btn ${theme === id ? 'theme-btn--active' : ''}`}
              onClick={() => setTheme(id)}
            >
              <span className="theme-btn-icon">{icon}</span>
              <span className="theme-btn-label">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sign out */}
      <button className="profile-signout-btn" onClick={onLogOut}>Sign out</button>
    </div>
  )
}

// ── Main HomeScreen ────────────────────────────────────────────────────────

export default function HomeScreen({
  onStart, onPracticeTest, onAnalytics, onDiagnostic, onSpeedRound, onAchievements,
  user, onLogOut,
  history, streak, studiedToday, weekDays,
  masteryPct, isUnlocked, unlockHint,
  completedCount, totalTopics,
  xp, onBuyStreak, earnXP,
  earnedIds, allAchievements,
  school, saveSchool,
  theme, setTheme,
  dailyQ, dailyAnswered, dailyRecord, dailyLoading, onDailySubmit,
  onBookmarks, bookmarkedIds,
  // Friends / challenges
  friends, friendCode, friendFeed,
  incomingRequests, sentRequests,
  addFriendError, setAddFriendError, onAddFriend, onRemoveFriend,
  onSendFriendRequest, onAcceptFriendRequest, onDeclineFriendRequest,
  challenges, onStartChallenge, onAcceptChallenge,
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
          onStart={onStart} onPracticeTest={onPracticeTest} onDiagnostic={onDiagnostic} onSpeedRound={onSpeedRound}
          masteryPct={masteryPct} isUnlocked={isUnlocked} unlockHint={unlockHint}
          streak={streak} studiedToday={studiedToday} weekDays={weekDays}
          xp={xp} onBuyStreak={onBuyStreak}
          dailyQ={dailyQ} dailyAnswered={dailyAnswered} dailyRecord={dailyRecord}
          dailyLoading={dailyLoading} onDailySubmit={onDailySubmit}
        />
      )}
      {tab === 'cards' && <CardsTab uid={user?.uid} earnXP={earnXP} />}
      {tab === 'progress' && (
        <ProgressTab
          history={history} xp={xp} masteryPct={masteryPct} isUnlocked={isUnlocked}
          completedCount={completedCount} totalTopics={totalTopics}
          earnedIds={earnedIds} allAchievements={allAchievements}
          onAnalytics={onAnalytics} onAchievements={onAchievements}
          onBookmarks={onBookmarks} bookmarkedIds={bookmarkedIds}
        />
      )}
      {tab === 'friends' && (
        <FriendsTab
          user={user} school={school}
          friends={friends ?? []} friendCode={friendCode} friendFeed={friendFeed ?? []}
          incomingRequests={incomingRequests ?? []} sentRequests={sentRequests ?? []}
          addError={addFriendError} setAddError={setAddFriendError}
          addFriend={onAddFriend} removeFriend={onRemoveFriend}
          onSendRequest={onSendFriendRequest}
          onAcceptRequest={onAcceptFriendRequest}
          onDeclineRequest={onDeclineFriendRequest}
          challenges={challenges ?? []}
          onStartChallenge={onStartChallenge}
          onAcceptChallenge={onAcceptChallenge}
          onGoToProfile={() => setTab('profile')}
        />
      )}
      {tab === 'profile' && (
        <ProfileTab
          user={user} school={school} saveSchool={saveSchool}
          xp={xp} streak={streak} history={history} onLogOut={onLogOut}
          theme={theme} setTheme={setTheme}
        />
      )}

      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
