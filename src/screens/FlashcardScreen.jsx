import { useState, useMemo } from 'react'
import { flashcards, getFlashcardsByTopic, FLASHCARD_TOPIC_LIST } from '@content/flashcards'

export default function FlashcardScreen({ onHome, knownIds, markKnown, markLearning, resetAll }) {
  const [topic, setTopic] = useState(null)
  const [reviewOnly, setReviewOnly] = useState(false)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(false)

  const deck = useMemo(() => {
    let cards = getFlashcardsByTopic(topic)
    if (reviewOnly) cards = cards.filter((c) => !knownIds.has(c.id))
    return cards
  }, [topic, reviewOnly, knownIds])

  const card = deck[index]
  const knownCount = deck.filter((c) => knownIds.has(c.id)).length

  function next(isKnown) {
    if (isKnown) markKnown(card.id)
    else markLearning(card.id)

    setFlipped(false)
    if (index + 1 >= deck.length) { setDone(true) }
    else setTimeout(() => setIndex(index + 1), 120)
  }

  function restart() {
    setIndex(0)
    setFlipped(false)
    setDone(false)
  }

  function changeTopic(val) {
    setTopic(val)
    setIndex(0)
    setFlipped(false)
    setDone(false)
  }

  function toggleReviewOnly() {
    setReviewOnly((r) => !r)
    setIndex(0)
    setFlipped(false)
    setDone(false)
  }

  const stillLearning = deck.filter((c) => !knownIds.has(c.id)).length

  // ── Done screen ────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="flashcard-screen">
        <button className="btn-ghost back-btn" onClick={onHome}>← Home</button>
        <div className="flashcard-done">
          <div className="flashcard-done-emoji">🎉</div>
          <h2 className="flashcard-done-title">Deck complete!</h2>
          <p className="flashcard-done-stats">
            {knownCount} known · {stillLearning} still learning
          </p>
          <div className="flashcard-done-actions">
            {stillLearning > 0 && (
              <button className="fc-btn fc-btn--review" onClick={() => { setReviewOnly(true); restart() }}>
                Review {stillLearning} remaining
              </button>
            )}
            <button className="fc-btn fc-btn--restart" onClick={restart}>Start over</button>
            <button className="fc-btn fc-btn--home" onClick={onHome}>Back to Home</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flashcard-screen">
      {/* Header */}
      <div className="flashcard-header">
        <button className="btn-ghost back-btn" onClick={onHome}>← Home</button>
        <h2 className="flashcard-title">Flashcards</h2>
      </div>

      {/* Topic selector */}
      <div className="flashcard-topic-row">
        {FLASHCARD_TOPIC_LIST.map(({ label, value }) => (
          <button
            key={label}
            className={`fc-topic-chip ${topic === value ? 'fc-topic-chip--active' : ''}`}
            onClick={() => changeTopic(value)}
          >
            {value === null ? '⚡ All' : label.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flashcard-filter-row">
        <button
          className={`fc-filter-btn ${reviewOnly ? 'fc-filter-btn--active' : ''}`}
          onClick={toggleReviewOnly}
        >
          📚 Still learning only
        </button>
        <button className="fc-filter-btn fc-filter-btn--reset" onClick={() => { resetAll(); restart() }}>
          ↺ Reset progress
        </button>
      </div>

      {/* Progress */}
      <div className="flashcard-progress">
        <span className="flashcard-progress-text">{index + 1} / {deck.length}</span>
        <div className="flashcard-progress-bar">
          <div className="flashcard-progress-known" style={{ width: `${(knownCount / deck.length) * 100}%` }} />
          <div className="flashcard-progress-cursor" style={{ width: `${((index + 1) / deck.length) * 100}%` }} />
        </div>
        <span className="flashcard-progress-known-label">✓ {knownCount}</span>
      </div>

      {/* Card */}
      {deck.length === 0 ? (
        <div className="flashcard-empty">
          <p>No cards to review! Change the filter or topic.</p>
        </div>
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

      {/* Action buttons — only show after flip */}
      {flipped && deck.length > 0 && (
        <div className="flashcard-actions">
          <button className="fc-action fc-action--learning" onClick={() => next(false)}>
            ↻ Still learning
          </button>
          <button className="fc-action fc-action--known" onClick={() => next(true)}>
            ✓ Got it!
          </button>
        </div>
      )}
    </div>
  )
}
