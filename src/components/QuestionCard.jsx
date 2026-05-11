const LABELS = ['A', 'B', 'C', 'D']

export default function QuestionCard({ question, selected, phase, onAnswer }) {
  function choiceClass(i) {
    if (phase === 'answering') return 'choice'
    if (i === question.correct) return 'choice choice--correct'
    if (selected !== 'timeout' && i === selected) return 'choice choice--wrong'
    return 'choice choice--dim'
  }

  return (
    <div className="question-card">
      <p className="question-topic-tag">{question.topic}</p>
      <p className="question-text">{question.text}</p>

      <div className="choices">
        {question.choices.map((text, i) => (
          <button
            key={i}
            className={choiceClass(i)}
            onClick={() => onAnswer(i)}
            disabled={phase !== 'answering'}
          >
            <span className="choice-label">{LABELS[i]}</span>
            <span className="choice-text">{text}</span>
          </button>
        ))}
      </div>

      {phase === 'feedback' && (
        <div className={`feedback-banner ${selected === question.correct ? 'feedback-banner--correct' : 'feedback-banner--wrong'}`}>
          {selected === 'timeout' ? (
            <span>⏰ Time's up! </span>
          ) : selected === question.correct ? (
            <span>✓ Correct! </span>
          ) : (
            <span>✗ Not quite. </span>
          )}
          <span className="feedback-explanation">{question.explanation}</span>
        </div>
      )}
    </div>
  )
}
