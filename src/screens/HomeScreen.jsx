import { useState, useMemo, useEffect } from 'react'
import { TOPICS, TOPIC_ICONS, questions } from '../data/questions'
import { flashcards, FLASHCARD_TOPIC_LIST } from '../data/flashcards'
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

function StudyTab({ onStart, onPracticeTest, onDiagnostic, onSpeedRound, onContextPractice, masteryPct, isUnlocked, unlockHint, streak, studiedToday, weekDays, xp, onBuyStreak, dailyQ, dailyAnswered, dailyRecord, dailyLoading, onDailySubmit }) {
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
        <button className="quick-context" onClick={onContextPractice}>
          <span className="quick-icon">📄</span>
          <p className="quick-name">Context Practice</p>
          <p className="quick-sub">Read & analyze</p>
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

function buildMCQuestion(card) {
  const showTerm = Math.random() > 0.5
  const prompt      = showTerm ? card.term       : card.definition
  const promptLabel = showTerm ? 'DEFINE THIS TERM' : 'NAME THIS TERM'
  const correct     = showTerm ? card.definition  : card.term
  // Prefer distractors from same topic; fall back to other topics
  const pool      = flashcards.filter((c) => c.id !== card.id)
  const sameT     = pool.filter((c) => c.topic === card.topic).sort(() => Math.random() - 0.5)
  const diffT     = pool.filter((c) => c.topic !== card.topic).sort(() => Math.random() - 0.5)
  const distractors = [...sameT, ...diffT].slice(0, 3).map((c) => showTerm ? c.definition : c.term)
  const options   = [...distractors, correct].sort(() => Math.random() - 0.5)
  return { prompt, promptLabel, correct, options }
}

function CardsTab({ uid, earnXP }) {
  const { review, resetAll, buildDeck, getStats } = useSpacedRepetition(uid)

  const [topic,    setTopic]   = useState(null)
  const [browseAll,setBrowse]  = useState(false)
  const [index,    setIndex]   = useState(0)
  const [flipped,  setFlipped] = useState(false)
  const [done,     setDone]    = useState(false)
  const [mode,     setMode]    = useState('flip')  // 'flip' | 'mc'
  const [mcQ,      setMcQ]     = useState(null)
  const [mcPicked, setMcPicked]= useState(null)    // index of selected MC option

  // Snapshot the deck once per session — never rebuild reactively mid-session.
  // Reactive rebuilds caused the deck to shuffle under the index after every review,
  // making the counter skip half the cards and re-show already-reviewed ones.
  const [deck, setDeck] = useState(() => buildDeck(null, false))

  const stats = useMemo(() => getStats(topic), [topic, getStats])
  const card  = deck[index]

  // Regenerate MC question when the card or mode changes
  useEffect(() => {
    if (mode === 'mc' && card) { setMcQ(buildMCQuestion(card)); setMcPicked(null) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card?.id, mode])

  const XP_BY_QUALITY = { [Q_AGAIN]: 2, [Q_GOOD]: 5, [Q_EASY]: 3 }

  function rateFlip(quality) {
    review(card.id, quality)
    earnXP(XP_BY_QUALITY[quality] ?? 2)
    setFlipped(false)
    if (index + 1 >= deck.length) setDone(true)
    else setTimeout(() => setIndex(index + 1), 180)
  }

  function pickMC(i) {
    if (mcPicked !== null) return
    setMcPicked(i)
    const isCorrect = mcQ.options[i] === mcQ.correct
    review(card.id, isCorrect ? Q_GOOD : Q_AGAIN)
    earnXP(isCorrect ? 5 : 2)
    const deckLen = deck.length
    setTimeout(() => {
      if (index + 1 >= deckLen) { setDone(true) }
      else { setIndex((prev) => prev + 1) }
    }, isCorrect ? 900 : 1800)
  }

  // Rebuild the session deck from latest SM-2 data; call with explicit new values
  // to avoid stale state (topic/browseAll setters are async)
  function startSession(newTopic, newBrowse) {
    setDeck(buildDeck(newTopic, newBrowse))
    setIndex(0); setFlipped(false); setDone(false); setMcPicked(null); setMcQ(null)
  }
  function reset()           { startSession(topic, browseAll) }
  function changeTopic(val)  { setTopic(val);   startSession(val, browseAll) }
  function changeMode(m)     { setMode(m); setIndex(0); setFlipped(false); setDone(false); setMcPicked(null); setMcQ(null) }
  function changeBrowse(val) { setBrowse(val);  startSession(topic, val) }

  if (done) return (
    <div className="tab-panel">
      <div className="flashcard-done">
        <div className="flashcard-done-emoji">🎉</div>
        <h2 className="flashcard-done-title">Session complete!</h2>
        <p className="flashcard-done-stats">{stats.reviewed} reviewed · {stats.mastered} mastered</p>
        <div className="flashcard-done-actions">
          <button className="fc-btn fc-btn--restart" onClick={reset}>Study again</button>
          {!browseAll && (
            <button className="fc-btn fc-btn--review" onClick={() => changeBrowse(true)}>Browse all cards</button>
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

      {/* Mode toggle */}
      <div className="fc-mode-row">
        <button className={`fc-mode-btn ${mode === 'flip' ? 'fc-mode-btn--active' : ''}`} onClick={() => changeMode('flip')}>
          🔄 Flip Cards
        </button>
        <button className={`fc-mode-btn ${mode === 'mc' ? 'fc-mode-btn--active' : ''}`} onClick={() => changeMode('mc')}>
          🧠 Multiple Choice
        </button>
      </div>

      {/* SM-2 stats bar */}
      <div className="sr-stats-bar">
        <span className="sr-stat sr-stat--due">📚 {stats.due + stats.new} to study</span>
        <span className="sr-stat sr-stat--new">✓ {stats.reviewed} reviewed</span>
        <span className="sr-stat sr-stat--mastered">⭐ {stats.mastered} mastered</span>
        <button className={`sr-browse-toggle ${browseAll ? 'sr-browse-toggle--active' : ''}`} onClick={() => changeBrowse(!browseAll)}>
          {browseAll ? 'Smart mode' : 'Browse all'}
        </button>
      </div>

      {/* Progress bar */}
      <div className="flashcard-progress">
        <span className="flashcard-progress-text">{deck.length ? index + 1 : 0} / {deck.length}</span>
        <div className="flashcard-progress-bar">
          <div className="flashcard-progress-known"  style={{ width: deck.length ? `${(stats.mastered / stats.total) * 100}%` : '0%' }} />
          <div className="flashcard-progress-cursor" style={{ width: deck.length ? `${((index + 1) / deck.length) * 100}%` : '0%' }} />
        </div>
        <button className="fc-filter-btn fc-filter-btn--reset" onClick={() => { resetAll(); reset() }}>↺</button>
      </div>

      {deck.length === 0 ? (
        <div className="flashcard-empty">
          <p>🎉 All caught up! No cards due right now.</p>
          <button className="fc-btn fc-btn--restart" style={{ marginTop: 16 }} onClick={() => { setBrowse(true); reset() }}>Browse all cards</button>
        </div>
      ) : mode === 'flip' ? (
        // ── FLIP CARD ───────────────────────────────────────────────────────
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
              <button className="sr-btn sr-btn--again" onClick={() => rateFlip(Q_AGAIN)}>
                <span className="sr-btn-icon">↩</span><span className="sr-btn-label">Again</span><span className="sr-btn-hint">forgot</span>
              </button>
              <button className="sr-btn sr-btn--good" onClick={() => rateFlip(Q_GOOD)}>
                <span className="sr-btn-icon">✓</span><span className="sr-btn-label">Good</span><span className="sr-btn-hint">got it</span>
              </button>
              <button className="sr-btn sr-btn--easy" onClick={() => rateFlip(Q_EASY)}>
                <span className="sr-btn-icon">⚡</span><span className="sr-btn-label">Easy</span><span className="sr-btn-hint">too easy</span>
              </button>
            </div>
          )}
        </>
      ) : (
        // ── MULTIPLE CHOICE ─────────────────────────────────────────────────
        mcQ && (
          <>
            <div className="mc-card">
              <span className="mc-prompt-label">{mcQ.promptLabel}</span>
              <p className="mc-prompt-text">{mcQ.prompt}</p>
              <span className="mc-topic-tag">{card.topic}</span>
            </div>
            <div className="mc-options">
              {mcQ.options.map((opt, i) => {
                const isSelected = mcPicked === i
                const isCorrect  = opt === mcQ.correct
                let cls = 'mc-option'
                if (mcPicked !== null) {
                  if (isCorrect)       cls += ' mc-option--correct'
                  else if (isSelected) cls += ' mc-option--wrong'
                  else                 cls += ' mc-option--dim'
                }
                return (
                  <button key={i} className={cls} onClick={() => pickMC(i)} disabled={mcPicked !== null}>
                    <span className="mc-option-letter">{['A','B','C','D'][i]}</span>
                    <span className="mc-option-text">{opt}</span>
                    {mcPicked !== null && isCorrect  && <span className="mc-option-icon">✓</span>}
                    {mcPicked !== null && isSelected && !isCorrect && <span className="mc-option-icon">✗</span>}
                  </button>
                )
              })}
            </div>
          </>
        )
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
  const [reqError, setReqError] = useState(null)
  const [reqSent,  setReqSent]  = useState(null) // uid of last successful request

  async function handleAdd(uid, profile) {
    setReqError(null)
    const ok = await onSendRequest(uid, profile)
    if (ok) { setReqSent(uid); setTimeout(() => setReqSent(null), 2500) }
    else     { setReqError('Could not send request — already sent or a permissions issue.') }
  }

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
      {error    && <p className="rankings-error">⚠ {error}</p>}
      {reqError && <p className="rankings-error">⚠ {reqError}</p>}
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
          const isPending = sentRequests?.some((r) => r.toUid === entry.uid) || reqSent === entry.uid
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
                  onClick={() => !isFriend && !isPending && handleAdd(entry.uid, entry)}
                  disabled={isFriend || isPending}
                >
                  {isFriend ? '✓' : isPending ? 'Sent ✓' : '+ Add'}
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

function FriendsList({ friends, challenges, onSendBattle, onPlayBattle, onRemove }) {
  const [confirmUid,    setConfirmUid]  = useState(null)
  const [sentBattleUid, setSentBattle]  = useState(null)

  // Map friendUid → active (non-done) challenge with that friend
  const battleMap = useMemo(() => {
    const map = {}
    challenges.forEach((c) => {
      if (c.status === 'done' || c.status === 'declined') return
      const friendUid = c.role === 'sender' ? c.toUid : c.fromUid
      if (!map[friendUid]) map[friendUid] = c
    })
    return map
  }, [challenges])

  // W/L/T record per friend
  const recordMap = useMemo(() => {
    const map = {}
    challenges.filter((c) => c.status === 'done').forEach((c) => {
      const friendUid  = c.role === 'sender' ? c.toUid   : c.fromUid
      const myScore    = c.role === 'sender' ? c.fromScore : c.toScore
      const theirScore = c.role === 'sender' ? c.toScore  : c.fromScore
      if (!map[friendUid]) map[friendUid] = { w: 0, l: 0, t: 0 }
      if (myScore > theirScore)      map[friendUid].w++
      else if (myScore < theirScore) map[friendUid].l++
      else                           map[friendUid].t++
    })
    return map
  }, [challenges])

  function handleRemoveClick(uid) {
    if (confirmUid === uid) { onRemove(uid); setConfirmUid(null) }
    else setConfirmUid(uid)
  }

  function handleSend(friend) {
    onSendBattle(friend)
    setSentBattle(friend.uid)
    setTimeout(() => setSentBattle(null), 3000)
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
            const battle     = battleMap[f.uid]
            const rec        = recordMap[f.uid]
            const myScore    = battle ? (battle.role === 'sender' ? battle.fromScore : battle.toScore) : undefined
            const justSent   = sentBattleUid === f.uid

            let battleEl
            if (battle?.status === 'pending' && battle.role === 'sender') {
              battleEl = <span className="battle-chip battle-chip--sent">⚔️ Sent</span>
            } else if (battle?.status === 'pending' && battle.role === 'receiver') {
              battleEl = <span className="battle-chip battle-chip--incoming">⚔️ Accept?</span>
            } else if (battle?.status === 'accepted' && myScore === null) {
              battleEl = <button className="battle-play-btn" onClick={() => onPlayBattle(battle)}>▶ Play</button>
            } else if (battle?.status === 'accepted' && myScore !== null) {
              battleEl = <span className="battle-chip battle-chip--waiting">⏳</span>
            } else if (justSent) {
              battleEl = <span className="battle-chip battle-chip--sent">⚔️ Sent!</span>
            } else {
              battleEl = !confirming
                ? <button className="friends-challenge-btn" onClick={() => handleSend(f)} title="Challenge">⚔️</button>
                : null
            }

            return (
              <div key={f.uid} className="friends-card">
                <span className="friends-rank">#{i + 1}</span>
                <Avatar photoURL={f.photoURL} name={f.displayName} size={40} />
                <div className="friends-card-info">
                  <p className="friends-card-name">{f.displayName}</p>
                  <div className="friends-card-meta">
                    <span className="friends-card-xp">💫 {(f.xp ?? 0).toLocaleString()}</span>
                    {rec && (
                      <span className="battle-record">
                        {rec.w}W {rec.l}L{rec.t > 0 ? ` ${rec.t}T` : ''}
                      </span>
                    )}
                  </div>
                </div>
                <div className="friends-card-actions">
                  {battleEl}
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
  onSendBattle, onAcceptBattle, onDeclineBattle, onPlayBattle,
  onGoToProfile,
}) {
  const [subTab,     setSubTab]  = useState('friends')
  const [codeInput,  setCode]    = useState('')
  const [showAdd,    setShowAdd] = useState(false)
  const [adding,     setAdding]  = useState(false)
  const [copied,     setCopied]  = useState(false)

  const sortedFriends       = [...friends].sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0))
  const incomingBattles     = challenges.filter((c) => c.status === 'pending'  && c.role === 'receiver')
  const activeBattles       = challenges.filter((c) => c.status === 'accepted')
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

          {/* Incoming battle requests */}
          {incomingBattles.length > 0 && (
            <div className="fr-section">
              <p className="fr-section-title">⚔️ Battle Requests ({incomingBattles.length})</p>
              {incomingBattles.map((c) => (
                <div key={c.id} className="challenge-card">
                  <div className="challenge-card-info">
                    <Avatar photoURL={c.fromPhoto} name={c.fromName} size={36} />
                    <div>
                      <p className="challenge-from">{c.fromName} wants to battle</p>
                      <p className="challenge-score-hint">10 questions · accept to play</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    <button className="challenge-accept-btn" onClick={() => onAcceptBattle(c.id)}>Accept</button>
                    <button className="battle-decline-btn" onClick={() => onDeclineBattle(c.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active battles needing attention */}
          {activeBattles.length > 0 && (
            <div className="fr-section">
              <p className="fr-section-title">⚔️ Active Battles ({activeBattles.length})</p>
              {activeBattles.map((c) => {
                const myScore      = c.role === 'sender' ? c.fromScore : c.toScore
                const opponentName = c.role === 'sender' ? c.toName    : c.fromName
                const opponentPhoto = c.role === 'sender' ? c.toPhoto  : c.fromPhoto
                const myTurn       = myScore === null
                return (
                  <div key={c.id} className="challenge-card">
                    <div className="challenge-card-info">
                      <Avatar photoURL={opponentPhoto} name={opponentName} size={36} />
                      <div>
                        <p className="challenge-from">vs {opponentName}</p>
                        <p className="challenge-score-hint">
                          {myTurn ? 'Your turn to play!' : `You scored ${myScore} pts · waiting for ${opponentName}`}
                        </p>
                      </div>
                    </div>
                    {myTurn && (
                      <button className="challenge-accept-btn battle-play-btn--card" onClick={() => onPlayBattle(c)}>▶ Play</button>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Friends leaderboard */}
          <FriendsList
            friends={sortedFriends}
            challenges={challenges}
            onSendBattle={onSendBattle}
            onPlayBattle={onPlayBattle}
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

function ProfileTab({ user, school, saveSchool, xp, streak, history, onLogOut, theme, setTheme, onAdmin }) {
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

      {/* Admin (only visible to admin account) */}
      {onAdmin && (
        <button className="profile-admin-btn" onClick={onAdmin}>🛠 Admin Dashboard</button>
      )}

      {/* Sign out */}
      <button className="profile-signout-btn" onClick={onLogOut}>Sign out</button>
    </div>
  )
}

// ── Main HomeScreen ────────────────────────────────────────────────────────

export default function HomeScreen({
  onStart, onPracticeTest, onAnalytics, onDiagnostic, onSpeedRound, onContextPractice, onAchievements,
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
  // Friends / battles
  friends, friendCode, friendFeed,
  incomingRequests, sentRequests,
  addFriendError, setAddFriendError, onAddFriend, onRemoveFriend,
  onSendFriendRequest, onAcceptFriendRequest, onDeclineFriendRequest,
  challenges, onSendBattle, onAcceptBattle, onDeclineBattle, onPlayBattle,
  initialTab, onAdmin,
}) {
  const [tab, setTab] = useState(initialTab ?? 'study')

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
          onStart={onStart} onPracticeTest={onPracticeTest} onDiagnostic={onDiagnostic} onSpeedRound={onSpeedRound} onContextPractice={onContextPractice}
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
          onSendBattle={onSendBattle}
          onAcceptBattle={onAcceptBattle}
          onDeclineBattle={onDeclineBattle}
          onPlayBattle={onPlayBattle}
          onGoToProfile={() => setTab('profile')}
        />
      )}
      {tab === 'profile' && (
        <ProfileTab
          user={user} school={school} saveSchool={saveSchool}
          xp={xp} streak={streak} history={history} onLogOut={onLogOut}
          theme={theme} setTheme={setTheme} onAdmin={onAdmin}
        />
      )}

      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
