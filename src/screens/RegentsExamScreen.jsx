import { useState, useEffect, useRef, useCallback } from 'react'

const LABELS = ['A', 'B', 'C', 'D']

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function RegentsExamScreen({ exam, onDone, onHome }) {
  const { questions, totalMinutes, session, year } = exam
  const totalSeconds = totalMinutes * 60

  const [answers, setAnswers]     = useState({})   // questionIndex → choiceIndex
  const [flagged, setFlagged]     = useState(new Set())
  const [current, setCurrent]     = useState(0)
  const [timeLeft, setTimeLeft]   = useState(totalSeconds)
  const [submitted, setSubmitted] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          handleSubmit(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = useCallback((timedOut = false) => {
    clearInterval(timerRef.current)
    setSubmitted(true)
    const results = questions.map((q, i) => {
      const isWritten = q.type === 'written'
      return {
        question: q,
        selected: answers[i] ?? null,
        correct: isWritten ? false : (answers[i] === q.correct),
        timedOut,
      }
    })
    const correct = results.filter((r) => r.correct).length
    onDone({ exam, results, correct, total: questions.length, timedOut })
  }, [answers, exam, questions, onDone])

  function pickAnswer(choiceIndex) {
    setAnswers((prev) => ({ ...prev, [current]: choiceIndex }))
  }

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev)
      next.has(current) ? next.delete(current) : next.add(current)
      return next
    })
  }

  const answered   = Object.keys(answers).length
  const unanswered = questions.length - answered
  const timerWarning = timeLeft < 300 // under 5 min

  const q = questions[current]

  return (
    <div className="home-screen">
      {/* Header */}
      <header className="home-header home-header--compact regents-exam-header">
        <button className="back-btn" onClick={onHome} title="Exit exam (progress will be lost)">✕</button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <p className="regents-exam-title">{session} {year}</p>
          <p className="regents-exam-meta">{answered}/{questions.length} answered</p>
        </div>
        <div className={`regents-timer ${timerWarning ? 'regents-timer--warning' : ''}`}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </header>

      {/* Question nav dots */}
      <div className="regents-nav-dots">
        {questions.map((_, i) => {
          const ans = answers[i] !== undefined
          const isFlagged = flagged.has(i)
          const isCurrent = i === current
          let cls = 'regents-dot'
          if (isCurrent)      cls += ' regents-dot--current'
          else if (ans)        cls += ' regents-dot--answered'
          if (isFlagged)       cls += ' regents-dot--flagged'
          return (
            <button key={i} className={cls} onClick={() => setCurrent(i)} title={`Q${i + 1}`}>
              {i + 1}
            </button>
          )
        })}
      </div>

      {/* Question */}
      <div className="tab-panel">
        <div className="regents-question-header">
          <span className="regents-question-num">Question {current + 1} · Part {q.part}</span>
          <button
            className={`regents-flag-btn ${flagged.has(current) ? 'regents-flag-btn--active' : ''}`}
            onClick={toggleFlag}
          >
            {flagged.has(current) ? '🚩 Flagged' : '⚑ Flag'}
          </button>
        </div>

        {q.context && (
          <div className="question-context">
            <span className="question-context-label">📄 Read this</span>
            <p className="question-context-text">{q.context}</p>
          </div>
        )}

        <p className="question-text">{q.text}</p>

        {q.image && (
          <div className="regents-question-image">
            <img src={q.image} alt={`Diagram for question ${current + 1}`} className="regents-diagram-img" />
          </div>
        )}

        {q.type === 'written' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '16px 0' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-muted)' }}>
              ✍️ Write your answer or show your work:
            </span>
            <textarea
              className="free-response-textarea"
              placeholder="Type your explanation, equations, or justification here..."
              value={answers[current] || ''}
              onChange={(e) => {
                const val = e.target.value
                setAnswers((prev) => ({ ...prev, [current]: val }))
              }}
              style={{
                width: '100%',
                minHeight: '140px',
                padding: '12px',
                fontSize: '15px',
                color: 'var(--text)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                resize: 'vertical',
                outline: 'none',
                fontFamily: 'inherit',
                lineHeight: '22px'
              }}
            />
          </div>
        ) : (
          <div className="choices">
            {q.choices?.map((text, i) => {
              const selected = answers[current] === i
              return (
                <button
                  key={i}
                  className={`choice ${selected ? 'choice--selected-regents' : ''}`}
                  onClick={() => pickAnswer(i)}
                >
                  <span className="choice-label">{LABELS[i]}</span>
                  <span className="choice-text">{text}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Navigation */}
        <div className="regents-nav-row">
          <button
            className="regents-nav-btn"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
          >
            ← Prev
          </button>

          {current < questions.length - 1 ? (
            <button
              className="regents-nav-btn regents-nav-btn--next"
              onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
            >
              Next →
            </button>
          ) : (
            <button
              className="regents-nav-btn regents-nav-btn--submit"
              onClick={() => setShowConfirm(true)}
            >
              Submit Exam
            </button>
          )}
        </div>

        {/* Unanswered warning */}
        {unanswered > 0 && (
          <p className="regents-unanswered-note">
            {unanswered} question{unanswered !== 1 ? 's' : ''} not yet answered
            {flagged.size > 0 && ` · ${flagged.size} flagged`}
          </p>
        )}
      </div>

      {/* Confirm submit modal */}
      {showConfirm && (
        <div className="regents-modal-overlay">
          <div className="regents-modal">
            <p className="regents-modal-title">Submit Exam?</p>
            {unanswered > 0 ? (
              <p className="regents-modal-body">
                You have <strong>{unanswered}</strong> unanswered question{unanswered !== 1 ? 's' : ''}.
                Unanswered questions will be marked wrong.
              </p>
            ) : (
              <p className="regents-modal-body">All {questions.length} questions answered. Ready to submit?</p>
            )}
            <div className="regents-modal-actions">
              <button className="regents-modal-cancel" onClick={() => setShowConfirm(false)}>Go back</button>
              <button className="regents-modal-confirm" onClick={() => handleSubmit(false)}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
