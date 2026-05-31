import { useState, useMemo, useEffect } from 'react'
import { useSpacedRepetition, Q_AGAIN, Q_GOOD, Q_EASY, nextReviewLabel } from '../hooks/useSpacedRepetition'
import { useLessonProgress } from '../hooks/useLessonProgress'
import { NY_SCHOOLS, BOROUGHS } from '@content/schools'
import { useLeaderboard } from '../hooks/useLeaderboard'
import TabBar from '../components/TabBar'
import ExamCountdown from '../components/ExamCountdown'
import DailyQuestion from '../components/DailyQuestion'

// ── Shared ─────────────────────────────────────────────────────────────────

function MasteryBadge({ topic, masteryPct, isMastered }) {
  const pct = masteryPct(topic)
  if (pct === null) return null
  // Green only when mastery is earned CONSISTENTLY (85%+ on 2 of last 3), not on
  // a single lucky run — even if the best-ever % shown here is high.
  const mastered = isMastered ? isMastered(topic) : pct >= 85
  const color = mastered ? '#22c55e' : pct >= 65 ? '#f59e0b' : '#ef4444'
  return (
    <span
      className="mastery-badge"
      title="Mastery = 85%+ on 2 of your last 3 attempts"
      style={{ color, borderColor: color, backgroundColor: color + '22' }}
    >
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

const LAB_TYPE_ICONS = {
  experimental: '🔬',
  graphing:     '📈',
  microscopy:   '🔭',
  dissection:   '🫀',
  data:         '📊',
}

// ── Study Tab ──────────────────────────────────────────────────────────────

function timeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

function UnitPath({ units, subjectHistory, masteryPct, isMastered, onStart, onTips, questions, TOPICS, TOPIC_ICONS, onRegentsExams }) {
  const { lessonComplete, unitLessonsCompleted, unitComplete } = useLessonProgress(subjectHistory)

  function isUnitUnlocked(unitIdx) {
    if (unitIdx === 0) return true
    const prev = units[unitIdx - 1]
    return prev ? unitLessonsCompleted(prev.topic, prev.lessonCount) >= 1 : false
  }

  if (!units?.length) return null

  return (
    <div style={{ padding: '0 20px' }}>
      {units.map((unit, unitIdx) => {
        const locked    = !isUnitUnlocked(unitIdx)
        const done      = unitLessonsCompleted(unit.topic, unit.lessonCount)
        const total     = unit.lessonCount
        const mastered  = isMastered?.(unit.topic)
        const pct       = masteryPct?.(unit.topic)
        const color     = locked ? '#94a3b8' : unit.color

        return (
          <div key={unit.id} style={{ marginBottom: 8 }}>
            {/* Unit banner */}
            <div style={{
              borderRadius: 16, padding: '14px 16px', marginBottom: 8,
              background: locked
                ? 'linear-gradient(135deg, #1e293b, #334155)'
                : `linear-gradient(135deg, ${unit.color}, ${unit.darkColor})`,
              display: 'flex', alignItems: 'center', gap: 12,
              opacity: locked ? 0.6 : 1,
            }}>
              <span style={{ fontSize: 28 }}>{locked ? '🔒' : unit.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>{unit.title}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>
                  {locked ? 'Complete previous unit to unlock' : `${done}/${total} lessons done${pct != null ? ` · ${pct}% mastery` : ''}`}
                </div>
                {!locked && (
                  <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.25)', marginTop: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.round((done / total) * 100)}%`, height: '100%', background: '#fff', borderRadius: 2, transition: 'width 0.4s' }} />
                  </div>
                )}
              </div>
              {!locked && onTips && (
                <button
                  onClick={(e) => { e.stopPropagation(); onTips(unit.topic) }}
                  style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, padding: '4px 10px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                >
                  💡 Tips
                </button>
              )}
            </div>

            {/* Lesson nodes */}
            {!locked && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '0 4px 4px', justifyContent: 'center' }}>
                {Array.from({ length: total }, (_, li) => {
                  const done = lessonComplete(unit.topic, li)
                  return (
                    <button
                      key={li}
                      onClick={() => onStart(unit.topic, li, unit.lessonCount)}
                      style={{
                        width: 72, height: 72, borderRadius: '50%', border: 'none',
                        background: done
                          ? `linear-gradient(135deg, ${unit.color}, ${unit.darkColor})`
                          : 'var(--surface, #1e293b)',
                        outline: `3px solid ${done ? unit.color : '#475569'}`,
                        outlineOffset: 2,
                        cursor: 'pointer', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 2,
                        boxShadow: done ? `0 4px 12px ${unit.color}66` : 'none',
                        transition: 'transform 0.15s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <span style={{ fontSize: done ? 20 : 16 }}>{done ? '✅' : unit.icon}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: done ? '#fff' : '#94a3b8' }}>L{li + 1}</span>
                    </button>
                  )
                })}
                {/* Challenge node */}
                {(() => {
                  const challengeDone = unitComplete(unit.topic, unit.lessonCount)
                  const allLessonsDone = done === total
                  return (
                    <button
                      onClick={() => allLessonsDone && onStart(unit.topic, unit.lessonCount, unit.lessonCount)}
                      disabled={!allLessonsDone}
                      style={{
                        width: 72, height: 72, borderRadius: '50%', border: 'none',
                        background: challengeDone
                          ? 'linear-gradient(135deg, #D97706, #F59E0B)'
                          : allLessonsDone ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : '#1e293b',
                        outline: `3px solid ${challengeDone ? '#F59E0B' : allLessonsDone ? '#7c3aed' : '#334155'}`,
                        outlineOffset: 2,
                        cursor: allLessonsDone ? 'pointer' : 'not-allowed', opacity: allLessonsDone ? 1 : 0.4,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                        boxShadow: challengeDone ? '0 4px 12px #F59E0B66' : 'none',
                        transition: 'transform 0.15s',
                      }}
                      onMouseEnter={(e) => { if (allLessonsDone) e.currentTarget.style.transform = 'scale(1.08)' }}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <span style={{ fontSize: 20 }}>{challengeDone ? '🏆' : allLessonsDone ? '⚡' : '🔒'}</span>
                      <span style={{ fontSize: 9, fontWeight: 700, color: allLessonsDone ? '#fff' : '#475569' }}>Challenge</span>
                    </button>
                  )
                })()}
              </div>
            )}
          </div>
        )
      })}

      {/* Regents Exams at the bottom of the path */}
      {onRegentsExams && (
        <button
          onClick={onRegentsExams}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: 16, border: 'none', marginTop: 8,
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 28 }}>📋</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>Regents Exams</div>
            <div style={{ fontSize: 12, color: '#c4b5fd' }}>Real past exams by year</div>
          </div>
          <span style={{ marginLeft: 'auto', color: '#c4b5fd', fontSize: 18 }}>→</span>
        </button>
      )}
    </div>
  )
}

function StudyTab({ user, subjectHistory, onStart, onPracticeTest, onDiagnostic, onSpeedRound, onContextPractice, onLabPractice, masteryPct, isMastered, isUnlocked, unlockHint, streak, studiedToday, weekDays, xp, levelInfo, onBuyStreak, dailyQ, dailyAnswered, dailyRecord, dailyLoading, onDailySubmit, questions, TOPICS, TOPIC_ICONS, LAB_TYPES, onRegentsExams, onTips, subjectData }) {
  const units = subjectData?.UNITS ?? []

  return (
    <div className="tab-panel" style={{ padding: '0 0 16px' }}>

      {/* ── Greeting header ─────────────────────────────────────────────── */}
      <div style={{ padding: '12px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>
            Good {timeOfDay()} 👋
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
            {user?.displayName?.split(' ')[0] ?? 'Student'} · {levelInfo?.emoji} Lv.{levelInfo?.level} {levelInfo?.name}
          </div>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b', background: 'rgba(245,158,11,0.12)', padding: '4px 10px', borderRadius: 20 }}>
          💫 {xp.toLocaleString()} XP
        </span>
      </div>

      {/* ── Week streak dots ────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        {weekDays.map(({ date, dayLabel, studied, isToday }) => (
          <div key={date} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700,
              background: studied ? 'var(--brand, #58CC02)' : 'var(--surface2, #1e293b)',
              border: isToday ? '2.5px solid var(--brand, #58CC02)' : '2px solid transparent',
              color: studied ? '#fff' : 'var(--text-muted, #94a3b8)',
            }}>
              {studied ? '✓' : dayLabel[0]}
            </div>
            <span style={{ fontSize: 9, color: isToday ? 'var(--brand, #58CC02)' : 'var(--text-muted, #64748b)' }}>
              {dayLabel.slice(0, 3)}
            </span>
          </div>
        ))}
      </div>

      {/* ── Streak + buy streak ─────────────────────────────────────────── */}
      <div style={{ margin: '0 16px 12px', padding: '10px 14px', borderRadius: 12, background: 'var(--surface, #1e293b)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 20 }}>🔥</span>
        <div style={{ flex: 1 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{streak} day streak</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>
            {studiedToday ? '✓ Studied today' : 'Study today to keep it!'}
          </span>
        </div>
        {!studiedToday && (
          <button
            onClick={onBuyStreak}
            disabled={xp < 100}
            style={{
              padding: '4px 10px', borderRadius: 8, border: 'none', fontSize: 11, fontWeight: 700,
              background: xp >= 100 ? 'var(--brand, #58CC02)' : '#334155',
              color: xp >= 100 ? '#fff' : '#64748b', cursor: xp >= 100 ? 'pointer' : 'not-allowed',
            }}
          >
            🔁 100 XP
          </button>
        )}
      </div>

      {/* ── Exam Countdown ──────────────────────────────────────────────── */}
      <div style={{ padding: '0 16px 12px' }}>
        <ExamCountdown />
      </div>

      {/* ── Daily Question ──────────────────────────────────────────────── */}
      <div style={{ padding: '0 16px 12px' }}>
        <DailyQuestion
          question={dailyQ}
          answeredToday={dailyAnswered}
          record={dailyRecord}
          loading={dailyLoading}
          onSubmit={onDailySubmit}
        />
      </div>

      {/* ── Quick actions 2×2 grid ──────────────────────────────────────── */}
      <div style={{ padding: '0 16px 4px' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          Quick Practice
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { icon: '⚡', label: 'Quick Quiz',    sub: 'Random questions', color: '#58CC02', dark: '#46a802', fn: () => onStart(null) },
            { icon: '🏃', label: 'Speed Round',   sub: '60 seconds',       color: '#1CB0F6', dark: '#0d8ecb', fn: onSpeedRound },
            { icon: '📝', label: 'Practice Test', sub: `${questions.length} questions`, color: '#A855F7', dark: '#7c3aed', fn: onPracticeTest },
            { icon: '🔍', label: 'Diagnostic',    sub: '18 questions',     color: '#FF9600', dark: '#cc7800', fn: onDiagnostic },
          ].map(({ icon, label, sub, color, dark, fn }) => (
            <button
              key={label}
              onClick={fn}
              style={{
                padding: '14px 12px', borderRadius: 14, border: 'none',
                background: `linear-gradient(135deg, ${color}, ${dark})`,
                cursor: 'pointer', textAlign: 'left',
                boxShadow: `0 4px 12px ${color}44`,
                transition: 'transform 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontWeight: 800, fontSize: 13, color: '#fff' }}>{label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>{sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Learning path ───────────────────────────────────────────────── */}
      <div style={{ padding: '16px 0 0' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, paddingLeft: 20 }}>
          Learning Path
        </p>
        <UnitPath
          units={units}
          subjectHistory={subjectHistory}
          masteryPct={masteryPct}
          isMastered={isMastered}
          onStart={onStart}
          onTips={onTips}
          questions={questions}
          TOPICS={TOPICS}
          TOPIC_ICONS={TOPIC_ICONS}
          onRegentsExams={onRegentsExams}
        />
      </div>

      {/* ── Lab Practice (only when subject has labs) ──────────────────── */}
      {Object.keys(LAB_TYPES ?? {}).length > 0 && (
        <div style={{ padding: '12px 16px 0' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>🧪 Lab Practice</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {Object.entries(LAB_TYPES).map(([key, label]) => (
              <button key={key} className="lab-btn" onClick={() => onLabPractice(key)}>
                <span className="lab-btn-icon">{LAB_TYPE_ICONS[key]}</span>
                <span className="lab-btn-label">{label}</span>
              </button>
            ))}
            <button className="lab-btn lab-btn--all" onClick={() => onLabPractice(null)}>
              <span className="lab-btn-icon">🧪</span>
              <span className="lab-btn-label">All Lab Questions</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Cards Tab (SM-2 spaced repetition) ────────────────────────────────────

function buildMCQuestion(card, flashcards) {
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

function CardsTab({ uid, earnXP, xp, flashcards: rawFlashcards, FLASHCARD_TOPIC_LIST }) {
  // Ensure every card has a stable id (subject flashcards use topic::term)
  const flashcards = useMemo(
    () => (rawFlashcards ?? []).map((c) => ({ ...c, id: c.id ?? `${c.topic}::${c.term}` })),
    [rawFlashcards],
  )
  const { review, resetAll, buildDeck, getStats } = useSpacedRepetition(uid, flashcards)

  const [topic,    setTopic]   = useState(null)
  const [browseAll,setBrowse]  = useState(false)
  const [index,    setIndex]   = useState(0)
  const [flipped,  setFlipped] = useState(false)
  const [done,     setDone]    = useState(false)
  const [mode,     setMode]    = useState('flip')  // 'flip' | 'mc'
  const [mcQ,      setMcQ]     = useState(null)
  const [mcPicked, setMcPicked]= useState(null)    // index of selected MC option
  const [xpFlash,  setXpFlash] = useState(null)    // e.g. '+5' shown briefly after rating

  // Snapshot the deck once per session — never rebuild reactively mid-session.
  // Reactive rebuilds caused the deck to shuffle under the index after every review,
  // making the counter skip half the cards and re-show already-reviewed ones.
  const [deck, setDeck] = useState(() => buildDeck(null, false))

  const stats = useMemo(() => getStats(topic), [topic, getStats])
  const card  = deck[index]

  // Regenerate MC question when the card or mode changes
  useEffect(() => {
    if (mode === 'mc' && card) { setMcQ(buildMCQuestion(card, flashcards ?? [])); setMcPicked(null) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card?.id, mode])

  const XP_BY_QUALITY = { [Q_AGAIN]: 2, [Q_GOOD]: 5, [Q_EASY]: 3 }

  function flashXP(amount) {
    setXpFlash(`+${amount}`)
    setTimeout(() => setXpFlash(null), 1200)
  }

  function rateFlip(quality) {
    const earned = XP_BY_QUALITY[quality] ?? 2
    review(card.id, quality)
    earnXP(earned)
    flashXP(earned)
    setFlipped(false)
    if (index + 1 >= deck.length) setDone(true)
    else setTimeout(() => setIndex(index + 1), 180)
  }

  function pickMC(i) {
    if (mcPicked !== null) return
    setMcPicked(i)
    const isCorrect = mcQ.options[i] === mcQ.correct
    const earned = isCorrect ? 5 : 2
    review(card.id, isCorrect ? Q_GOOD : Q_AGAIN)
    earnXP(earned)
    flashXP(earned)
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

      {/* XP display */}
      <div className="fc-xp-row">
        <span className="fc-xp-total">💫 {(xp ?? 0).toLocaleString()} XP</span>
        {xpFlash && <span className="fc-xp-flash" key={xpFlash + Date.now()}>{xpFlash} XP</span>}
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

function XPHistoryChart({ history, xp, TOPIC_ICONS }) {
  const sessions = [...history].reverse().filter((s) => s.correct > 0 || s.score > 0)
  if (sessions.length < 1) return null

  const xpValues = sessions.map((s) => s.score > 0 ? Math.round(s.score) : (s.correct ?? 0) * 10)
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

function ProgressTab({ history, xp, masteryPct, isUnlocked, completedCount, totalTopics, earnedIds, allAchievements, onAnalytics, onAchievements, onBookmarks, bookmarkedIds, TOPICS, TOPIC_ICONS }) {
  const allTopics   = Object.values(TOPICS ?? {})
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
      <XPHistoryChart history={history} xp={xp} TOPIC_ICONS={TOPIC_ICONS} />
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
                      <span className="activity-time">{timeAgo(item.createdAt ?? item.timestamp)}</span>
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

const profileLinkBtn = (color) => ({
  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
  borderRadius: 12, border: `1px solid ${color}44`, background: `${color}11`,
  color: 'var(--text)', fontWeight: 600, fontSize: 14, cursor: 'pointer',
})

function ProfileTab({ user, school, saveSchool, xp, streak, history, onLogOut, theme, setTheme, onAdmin, subject, setSubject, SUBJECT_META: subjectMeta, onShop, onLeague, tier }) {
  const [editing,    setEditing]    = useState(false)
  const [search,     setSearch]     = useState('')
  const [borough,    setBorough]    = useState(null)
  const [typeFilter, setTypeFilter] = useState(null)

  const bestPct     = history.length ? Math.max(...history.map((h) => h.pct)) : null
  const totalQuizzes = history.length

  const filtered = useMemo(() => {
    let list = NY_SCHOOLS
    if (borough)    list = list.filter((s) => s.borough === borough)
    if (typeFilter) list = list.filter((s) => s.type === typeFilter)
    if (search)     list = list.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    return list
  }, [borough, typeFilter, search])

  function selectSchool(s) {
    saveSchool(s.name)
    setEditing(false)
    setSearch('')
    setBorough(null)
    setTypeFilter(null)
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

      {/* Regents subject section */}
      {subjectMeta && setSubject && (
        <div className="profile-section">
          <div className="profile-section-header">
            <span className="profile-section-label">MY REGENTS</span>
          </div>
          <div className="profile-regents-grid">
            {Object.values(subjectMeta).map(({ id, name, icon, color }) => (
              <button
                key={id}
                className={`profile-regents-chip ${subject === id ? 'profile-regents-chip--active' : ''}`}
                style={{ '--chip-color': color }}
                onClick={() => setSubject(id)}
              >
                <span>{icon}</span>
                <span>{name}</span>
                {subject === id && <span className="profile-regents-check">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

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
            <div className="rankings-borough-row rankings-type-row">
              {[null, 'public', 'private', 'charter'].map((t) => (
                <button key={t ?? 'all'} className={`rankings-borough-chip rankings-type-chip ${typeFilter === t ? 'rankings-borough-chip--active' : ''}`} onClick={() => setTypeFilter(t)}>
                  {t === null ? 'All Types' : t === 'public' ? '🏛 Public' : t === 'private' ? '🎓 Private' : '⭐ Charter'}
                </button>
              ))}
            </div>
            <div className="profile-school-list">
              {filtered.map((s) => (
                <button key={s.id} className="rankings-school-row" onClick={() => selectSchool(s)}>
                  <div>
                    <p className="rankings-school-name">{s.name}</p>
                    <p className="rankings-school-borough">
                      {s.borough}
                      {s.type && <span className={`school-type-badge school-type-badge--${s.type}`}>{s.type === 'public' ? 'Public' : s.type === 'private' ? 'Private' : 'Charter'}</span>}
                    </p>
                  </div>
                  <span className="rankings-school-arrow">›</span>
                </button>
              ))}
              {filtered.length === 0 && <p className="rankings-empty">No schools match.</p>}
            </div>
            {editing && (
              <button className="profile-cancel-btn" onClick={() => { setEditing(false); setSearch(''); setBorough(null); setTypeFilter(null) }}>Cancel</button>
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
          {[
            { id: 'dark',   label: 'Dark'   },
            { id: 'ocean',  label: 'Ocean'  },
            { id: 'purple', label: 'Purple' },
            { id: 'light',  label: 'Light'  },
            { id: 'amber',  label: 'Amber'  },
            { id: 'system', label: 'Auto'   },
          ].map(({ id, label }) => (
            <button
              key={id}
              className={`theme-btn ${theme === id ? 'theme-btn--active' : ''}`}
              onClick={() => setTheme(id)}
            >
              <span className={`theme-swatch theme-swatch--${id}`} />
              <span className="theme-btn-label">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="profile-section">
        <div className="profile-section-header"><span className="profile-section-label">QUICK LINKS</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {onShop && (
            <button onClick={onShop} style={profileLinkBtn('#6366f1')}>
              <span>🛒</span><span style={{ flex: 1, textAlign: 'left' }}>Pet Shop</span><span>→</span>
            </button>
          )}
          {onLeague && (
            <button onClick={onLeague} style={profileLinkBtn('#D97706')}>
              <span>🏆</span><span style={{ flex: 1, textAlign: 'left' }}>League — {tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : 'Bronze'}</span><span>→</span>
            </button>
          )}
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
  onStart, onPracticeTest, onAnalytics, onDiagnostic, onSpeedRound, onContextPractice, onLabPractice, onAchievements, onRegentsExams, onTips,
  user, onLogOut,
  history, streak, studiedToday, weekDays,
  masteryPct, isMastered, isUnlocked, unlockHint,
  completedCount, totalTopics,
  xp, levelInfo, onBuyStreak, earnXP,
  earnedIds, allAchievements,
  school, saveSchool,
  theme, setTheme,
  dailyQ, dailyAnswered, dailyRecord, dailyLoading, onDailySubmit,
  onBookmarks, bookmarkedIds,
  // Subject switcher
  subject, setSubject, SUBJECT_META, subjectData,
  // Friends / battles
  friends, friendCode, friendFeed,
  incomingRequests, sentRequests,
  addFriendError, setAddFriendError, onAddFriend, onRemoveFriend,
  onSendFriendRequest, onAcceptFriendRequest, onDeclineFriendRequest,
  challenges, onSendBattle, onAcceptBattle, onDeclineBattle, onPlayBattle,
  initialTab, onAdmin, onUpgrade,
  // Pets & leagues
  petWidget, onLeague, tier, weeklyXP, petQuest, onShop,
}) {
  const [tab, setTab] = useState(initialTab ?? 'study')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const { questions = [], TOPICS = {}, TOPIC_ICONS = {}, LAB_TYPES = {}, flashcards = [], FLASHCARD_TOPIC_LIST = [] } = subjectData ?? {}
  const subjectName = SUBJECT_META?.[subject]?.name ?? 'Regents Prep'

  return (
    <div className="home-screen">
      <header className="home-header home-header--compact">
        <div className="home-title-row">
          <h1 className="app-title">{subjectName}</h1>
          <p className="app-subtitle">Regents Prep</p>
        </div>
        {SUBJECT_META && setSubject && (
          <div className="subject-dropdown-container">
            <button
              className="subject-dropdown-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ borderColor: SUBJECT_META[subject]?.color }}
            >
              <span className="dropdown-subject-icon">{SUBJECT_META[subject]?.icon}</span>
              <span className="dropdown-subject-name">{SUBJECT_META[subject]?.name}</span>
              <span className={`dropdown-chevron ${dropdownOpen ? 'dropdown-chevron--open' : ''}`}>▼</span>
            </button>
            {dropdownOpen && (
              <>
                <div className="subject-dropdown-backdrop" onClick={() => setDropdownOpen(false)} />
                <div className="subject-dropdown-menu">
                  {Object.values(SUBJECT_META).map(({ id, name, icon, color }) => (
                    <button
                      key={id}
                      className={`subject-dropdown-item ${subject === id ? 'subject-dropdown-item--active' : ''}`}
                      onClick={() => {
                        setSubject(id)
                        setDropdownOpen(false)
                      }}
                      style={subject === id ? { borderLeftColor: color, background: `${color}11` } : {}}
                    >
                      <span className="dropdown-item-icon">{icon}</span>
                      <span className="dropdown-item-name">{name}</span>
                      {subject === id && <span className="dropdown-item-active-dot" style={{ backgroundColor: color }} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </header>

      {tab === 'study' && (
        <StudyTab
          user={user}
          subjectHistory={history}
          subjectData={subjectData}
          onStart={onStart} onPracticeTest={onPracticeTest} onDiagnostic={onDiagnostic} onSpeedRound={onSpeedRound} onContextPractice={onContextPractice} onLabPractice={onLabPractice}
          masteryPct={masteryPct} isMastered={isMastered} isUnlocked={isUnlocked} unlockHint={unlockHint}
          streak={streak} studiedToday={studiedToday} weekDays={weekDays}
          xp={xp} levelInfo={levelInfo} onBuyStreak={onBuyStreak}
          dailyQ={dailyQ} dailyAnswered={dailyAnswered} dailyRecord={dailyRecord}
          dailyLoading={dailyLoading} onDailySubmit={onDailySubmit}
          questions={questions} TOPICS={TOPICS} TOPIC_ICONS={TOPIC_ICONS} LAB_TYPES={LAB_TYPES}
          onRegentsExams={onRegentsExams}
          onTips={onTips}
        />
      )}
      {tab === 'cards' && <CardsTab uid={user?.uid} earnXP={earnXP} xp={xp} flashcards={flashcards} FLASHCARD_TOPIC_LIST={FLASHCARD_TOPIC_LIST} />}
      {tab === 'progress' && (
        <ProgressTab
          history={history} xp={xp} masteryPct={masteryPct} isUnlocked={isUnlocked}
          completedCount={completedCount} totalTopics={totalTopics}
          earnedIds={earnedIds} allAchievements={allAchievements}
          onAnalytics={onAnalytics} onAchievements={onAchievements}
          onBookmarks={onBookmarks} bookmarkedIds={bookmarkedIds}
          TOPICS={TOPICS} TOPIC_ICONS={TOPIC_ICONS}
        />
      )}
      {tab === 'friends' && (
        user?.isAnonymous ? (
          <div className="guest-locked-tab">
            <div className="guest-locked-icon">👥</div>
            <h3 className="guest-locked-title">Friends &amp; Leaderboard</h3>
            <p className="guest-locked-desc">Create a free account to challenge friends, track your rank, and compare scores.</p>
            {onUpgrade && (
              <button className="btn-email" style={{ maxWidth: 280 }} onClick={onUpgrade}>
                Create Free Account
              </button>
            )}
          </div>
        ) : (
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
        )
      )}
      {tab === 'profile' && (
        <ProfileTab
          user={user} school={school} saveSchool={saveSchool}
          xp={xp} streak={streak} history={history} onLogOut={onLogOut}
          theme={theme} setTheme={setTheme} onAdmin={onAdmin}
          subject={subject} setSubject={setSubject} SUBJECT_META={SUBJECT_META}
          onShop={onShop} onLeague={onLeague} tier={tier}
        />
      )}

      {tab === 'pet' && (
        <div style={{ padding: '16px 16px 80px' }}>
          {petWidget ?? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🐾</div>
              <p style={{ fontWeight: 600 }}>No buddy yet</p>
              <p style={{ fontSize: 13 }}>Sign in with a full account to adopt a pet!</p>
            </div>
          )}

          {/* Quest card */}
          {petQuest && petWidget && (
            <div style={{
              background: 'var(--surface, #1e293b)', border: '1px solid var(--border, #334155)',
              borderRadius: 14, padding: '14px 16px', marginTop: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>{petQuest.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{petQuest.label}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{petQuest.progress}/{petQuest.goal} completed</div>
                </div>
                {petQuest.completed
                  ? <span style={{ fontSize: 12, fontWeight: 700, color: '#22c55e' }}>✓ DONE</span>
                  : <span style={{ fontSize: 12, color: '#94a3b8' }}>+125 ⭐</span>}
              </div>
              <div style={{ height: 6, borderRadius: 3, background: 'var(--surface2, #0f172a)', overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.min(100, (petQuest.progress / petQuest.goal) * 100)}%`,
                  height: '100%', borderRadius: 3,
                  background: petQuest.completed ? '#22c55e' : 'var(--brand, #58CC02)',
                  transition: 'width 0.4s',
                }} />
              </div>
            </div>
          )}

          {/* League button */}
          {onLeague && (
            <button
              onClick={onLeague}
              style={{
                width: '100%', marginTop: 8, padding: '12px 16px', borderRadius: 14,
                background: 'linear-gradient(135deg, #D97706, #F59E0B)',
                border: 'none', color: '#fff', fontWeight: 700, fontSize: 15,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}
            >
              <span>🏆 My League — {tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : 'Bronze'}</span>
              <span style={{ fontSize: 13, opacity: 0.85 }}>{weeklyXP?.toLocaleString() ?? 0} XP this week →</span>
            </button>
          )}
        </div>
      )}

      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
