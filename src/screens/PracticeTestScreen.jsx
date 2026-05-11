import { usePracticeTest } from '../hooks/usePracticeTest'

const LABELS = ['A', 'B', 'C', 'D']

export default function PracticeTestScreen({ questionSet, onDone, onHome }) {
  const { current, index, total, answers, phase, elapsedStr, answer, next, goTo, correct, score, grade, questions } =
    usePracticeTest(questionSet)

  if (phase === 'review') {
    return <ReviewScreen questions={questions} answers={answers} correct={correct} total={total} score={score} grade={grade} onDone={onDone} onHome={onHome} />
  }

  const chosen = answers[current.id]

  return (
    <div className="practice-screen">
      <div className="practice-topbar">
        <button className="btn-ghost practice-exit" onClick={onHome}>✕ Exit</button>
        <span className="practice-label">PRACTICE TEST</span>
        <span className="practice-timer">⏱ {elapsedStr}</span>
      </div>

      <div className="dot-nav">
        {questions.map((q, i) => {
          const picked = answers[q.id] !== undefined
          const isCurrent = i === index
          return (
            <button
              key={q.id}
              className={`dot ${picked ? 'dot--answered' : ''} ${isCurrent ? 'dot--current' : ''}`}
              onClick={() => goTo(i)}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      <div className="practice-body">
        <p className="practice-q-number">Question {index + 1} of {total}</p>
        <p className="practice-q-text">{current.text}</p>

        <div className="choices">
          {current.choices.map((text, i) => (
            <button
              key={i}
              className={`choice ${chosen === i ? 'choice--selected' : ''}`}
              onClick={() => answer(i)}
            >
              <span className="choice-label">{LABELS[i]}</span>
              <span className="choice-text">{text}</span>
            </button>
          ))}
        </div>

        <button
          className={`btn-primary next-btn ${chosen === undefined ? 'btn-disabled' : ''}`}
          onClick={next}
          disabled={chosen === undefined}
        >
          {index === total - 1 ? 'Submit Test' : 'Next →'}
        </button>
      </div>
    </div>
  )
}

function ReviewScreen({ questions, answers, correct, total, score, grade, onDone, onHome }) {
  const gradeColor = score >= 85 ? '#22c55e' : score >= 65 ? '#f59e0b' : '#ef4444'
  const gradeEmoji = score >= 85 ? '🏆' : score >= 65 ? '✅' : '📚'

  return (
    <div className="practice-review">
      <div className="practice-hero">
        <span className="results-emoji">{gradeEmoji}</span>
        <h2 className="results-grade" style={{ color: gradeColor }}>{grade}</h2>
        <p className="practice-big-score">{score}</p>
        <p className="practice-out-of">/ 100</p>
        <p className="results-fraction">{correct} of {total} correct</p>
        {score >= 65
          ? <p className="practice-passing">✓ Regents passing score is 65</p>
          : <p className="practice-failing">Regents passing score is 65 — keep practicing!</p>
        }
      </div>

      <p className="review-section-label">QUESTION REVIEW</p>
      <div className="practice-review-list">
        {questions.map((q, i) => {
          const chosen = answers[q.id]
          const isCorrect = chosen === q.correct
          return (
            <div key={q.id} className={`practice-review-row ${isCorrect ? 'review-item--correct' : 'review-item--wrong'}`}>
              <div className="review-item-header">
                <span className="review-num">Q{i + 1}</span>
                <span className="review-status" style={{ color: isCorrect ? '#22c55e' : '#ef4444' }}>
                  {isCorrect ? '✓' : chosen === undefined ? '— Skipped' : '✗'}
                </span>
              </div>
              <p className="review-question">{q.text}</p>
              {!isCorrect && (
                <p className="review-correct-answer">
                  Correct: <span className="review-correct-text">{LABELS[q.correct]}. {q.choices[q.correct]}</span>
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={() => onDone({ correct, total })}>Try Again</button>
        <button className="btn-secondary" onClick={onHome}>Home</button>
      </div>
    </div>
  )
}
