import PunnettSquare from './diagrams/PunnettSquare'
import FoodWeb from './diagrams/FoodWeb'

const LABELS = ['A', 'B', 'C', 'D']

export default function QuestionCard({ question, selected, phase, onAnswer, isBookmarked, onBookmark }) {
  function choiceClass(i) {
    if (phase === 'answering') return 'choice'
    if (i === question.correct) return 'choice choice--correct'
    if (selected !== 'timeout' && i === selected) return 'choice choice--wrong'
    return 'choice choice--dim'
  }

  return (
    <div className="question-card">
      <div className="question-card-header">
        <p className="question-topic-tag">{question.topic}</p>
        {onBookmark && (
          <button
            className={`bookmark-btn ${isBookmarked ? 'bookmark-btn--active' : ''}`}
            onClick={() => onBookmark(question.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark for later'}
          >
            {isBookmarked ? '🔖' : '🔖'}
            <span className="bookmark-btn-label">{isBookmarked ? 'Saved' : 'Save'}</span>
          </button>
        )}
      </div>
      {question.context && (
        <div className="question-context">
          <span className="question-context-label">📄 Read this scenario</span>
          <p className="question-context-text">{question.context}</p>
        </div>
      )}
      <p className="question-text">{question.text}</p>

      {question.diagram?.type === 'punnett' && (
        <PunnettSquare alleles={question.diagram.alleles} title={question.diagram.title} />
      )}
      {question.diagram?.type === 'foodweb' && <FoodWeb />}

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

      {phase === 'feedback' && selected === question.correct && (
        <div className="feedback-banner feedback-banner--correct">
          ✓ Correct!
        </div>
      )}

      {phase === 'feedback' && selected !== question.correct && (
        <div className="feedback-banner feedback-banner--wrong">
          <p className="feedback-wrong-header">
            {selected === 'timeout' ? '⏰ Time\'s up!' : '✗ Not quite.'}
          </p>
          <p className="feedback-correct-line">
            Correct answer:&nbsp;
            <strong>{LABELS[question.correct]}. {question.choices[question.correct]}</strong>
          </p>
          <p className="feedback-explanation">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
