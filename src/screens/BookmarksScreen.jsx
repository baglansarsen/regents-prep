import { useState } from 'react'
import { questions } from '../data/questions'

const LABELS = ['A', 'B', 'C', 'D']

function BookmarkCard({ question, onRemove }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bm-card">
      <div className="bm-card-top" onClick={() => setExpanded((e) => !e)}>
        <div className="bm-card-meta">
          <span className="bm-topic-tag">{question.topic}</span>
        </div>
        <div className="bm-card-row">
          <p className="bm-question-text">{question.text}</p>
          <span className="bm-expand-icon">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {expanded && (
        <div className="bm-card-body">
          <div className="bm-choices">
            {question.choices.map((c, i) => (
              <div key={i} className={`bm-choice ${i === question.correct ? 'bm-choice--correct' : ''}`}>
                <span className="bm-choice-label">{LABELS[i]}</span>
                <span className="bm-choice-text">{c}</span>
                {i === question.correct && <span className="bm-choice-check">✓</span>}
              </div>
            ))}
          </div>
          {question.explanation && (
            <p className="bm-explanation">{question.explanation}</p>
          )}
          <button className="bm-remove-btn" onClick={() => onRemove(question.id)}>
            🗑 Remove bookmark
          </button>
        </div>
      )}
    </div>
  )
}

export default function BookmarksScreen({ bookmarkedIds, onRemove, onPractice, onHome }) {
  const bookmarked = questions.filter((q) => bookmarkedIds.has(q.id))

  return (
    <div className="bookmarks-screen">
      <div className="bookmarks-header">
        <button className="btn-ghost back-btn" onClick={onHome}>← Back</button>
        <div>
          <h2 className="bookmarks-title">🔖 Bookmarks</h2>
          <p className="bookmarks-sub">{bookmarked.length} question{bookmarked.length !== 1 ? 's' : ''} saved</p>
        </div>
      </div>

      {bookmarked.length === 0 ? (
        <div className="bookmarks-empty">
          <p className="bookmarks-empty-icon">🔖</p>
          <p className="bookmarks-empty-title">No bookmarks yet</p>
          <p className="bookmarks-empty-sub">Tap the bookmark button on any question during a quiz to save it here.</p>
        </div>
      ) : (
        <>
          <button className="bookmarks-practice-btn" onClick={() => onPractice(bookmarked)}>
            ▶ Practice all {bookmarked.length} bookmarked questions
          </button>

          <div className="bookmarks-list">
            {bookmarked.map((q) => (
              <BookmarkCard key={q.id} question={q} onRemove={onRemove} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
