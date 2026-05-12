import { useState } from 'react'
import { DAILY_CORRECT_BONUS, DAILY_ATTEMPT_BONUS } from '../hooks/useDailyQuestion'

export default function DailyQuestion({ question, answeredToday, record, loading, onSubmit }) {
  const [expanded,    setExpanded]    = useState(false)
  const [selected,    setSelected]    = useState(null)
  const [result,      setResult]      = useState(null) // { correct, xpEarned }
  const [submitting,  setSubmitting]  = useState(false)

  async function handleChoice(i) {
    if (selected !== null || submitting) return
    setSelected(i)
    setSubmitting(true)
    const res = await onSubmit(i)
    setResult(res)
    setSubmitting(false)
  }

  const choices = question?.choices ?? []

  // ── Already answered today ─────────────────────────────────────────────
  if (loading) return null

  if (answeredToday && !result) {
    const wasCorrect = record.correct
    const prevChoice = record.choiceIndex
    return (
      <div className={`daily-card daily-card--done ${wasCorrect ? 'daily-card--correct' : 'daily-card--wrong'}`}>
        <div className="daily-card-header">
          <span className="daily-badge">⭐ Daily Question</span>
          <span className={`daily-done-tag ${wasCorrect ? 'daily-done-tag--correct' : 'daily-done-tag--wrong'}`}>
            {wasCorrect ? '✓ Correct' : '✗ Incorrect'} · +{wasCorrect ? DAILY_CORRECT_BONUS : DAILY_ATTEMPT_BONUS} XP
          </span>
        </div>
        <p className="daily-question-text">{question.text}</p>
        <div className="daily-choices daily-choices--readonly">
          {choices.map((c, i) => (
            <div
              key={i}
              className={`daily-choice daily-choice--readonly
                ${i === question.answer ? 'daily-choice--correct' : ''}
                ${i === prevChoice && !wasCorrect ? 'daily-choice--wrong' : ''}
              `}
            >
              <span className="daily-choice-letter">{String.fromCharCode(65 + i)}</span>
              <span className="daily-choice-text">{c}</span>
              {i === question.answer && <span className="daily-choice-check">✓</span>}
            </div>
          ))}
        </div>
        {question.explanation && (
          <p className="daily-explanation">{question.explanation}</p>
        )}
        <p className="daily-next-hint">Come back tomorrow for a new question!</p>
      </div>
    )
  }

  // ── Collapsed (not yet answered) ───────────────────────────────────────
  if (!expanded) {
    return (
      <button className="daily-card daily-card--collapsed" onClick={() => setExpanded(true)}>
        <div className="daily-card-header">
          <span className="daily-badge">⭐ Daily Question</span>
          <span className="daily-xp-teaser">+{DAILY_CORRECT_BONUS} XP bonus</span>
        </div>
        <p className="daily-question-preview">{question.text}</p>
        <p className="daily-tap-hint">Tap to answer →</p>
      </button>
    )
  }

  // ── Result (just answered) ─────────────────────────────────────────────
  if (result) {
    return (
      <div className={`daily-card ${result.correct ? 'daily-card--correct' : 'daily-card--wrong'}`}>
        <div className="daily-card-header">
          <span className="daily-badge">⭐ Daily Question</span>
          <span className={`daily-result-tag ${result.correct ? 'daily-result-tag--correct' : 'daily-result-tag--wrong'}`}>
            {result.correct ? '🎉 Correct!' : '✗ Not quite'} · +{result.xpEarned} XP
          </span>
        </div>
        <p className="daily-question-text">{question.text}</p>
        <div className="daily-choices daily-choices--readonly">
          {choices.map((c, i) => (
            <div
              key={i}
              className={`daily-choice daily-choice--readonly
                ${i === question.answer ? 'daily-choice--correct' : ''}
                ${i === selected && !result.correct ? 'daily-choice--wrong' : ''}
              `}
            >
              <span className="daily-choice-letter">{String.fromCharCode(65 + i)}</span>
              <span className="daily-choice-text">{c}</span>
              {i === question.answer && <span className="daily-choice-check">✓</span>}
            </div>
          ))}
        </div>
        {question.explanation && (
          <p className="daily-explanation">{question.explanation}</p>
        )}
        <p className="daily-next-hint">Come back tomorrow for a new question!</p>
      </div>
    )
  }

  // ── Expanded — answer choices ──────────────────────────────────────────
  return (
    <div className="daily-card daily-card--expanded">
      <div className="daily-card-header">
        <span className="daily-badge">⭐ Daily Question</span>
        <span className="daily-xp-teaser">+{DAILY_CORRECT_BONUS} XP if correct</span>
        <button className="daily-collapse-btn" onClick={() => setExpanded(false)}>✕</button>
      </div>
      <p className="daily-question-text">{question.text}</p>
      <div className="daily-choices">
        {choices.map((c, i) => (
          <button
            key={i}
            className={`daily-choice ${selected === i ? 'daily-choice--selected' : ''}`}
            onClick={() => handleChoice(i)}
            disabled={submitting}
          >
            <span className="daily-choice-letter">{String.fromCharCode(65 + i)}</span>
            <span className="daily-choice-text">{c}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
