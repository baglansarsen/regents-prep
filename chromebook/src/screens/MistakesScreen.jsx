import React from 'react'

export default function MistakesScreen({
  mistakes = [],
  clearMistakes,
  onStartMistakeQuiz,
  setScreen,
}) {
  const count = mistakes.length

  return (
    <div className="screen-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        
        {/* Banner Card */}
        <div className="card-glass" style={{
          background: 'linear-gradient(135deg, var(--wrong), #1e293b)',
          color: '#fff',
          border: 'none',
          padding: '32px'
        }}>
          <span style={{ fontSize: '48px' }}>📕</span>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', marginTop: '12px' }}>
            Mistakes review deck
          </h1>
          <p style={{ marginTop: '6px', fontSize: '15px', opacity: 0.9, lineHeight: '22px' }}>
            Whenever you answer questions incorrectly in quizzes, lessons, or mock exams, they are automatically cataloged here. Reviewing mistakes regularly is the most efficient way to close knowledge gaps!
          </p>
        </div>

        {/* Action Panel */}
        <div className="card-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '18px' }}>
              Collected Mistakes: <span style={{ color: count > 0 ? 'var(--wrong)' : 'var(--text-muted)' }}>{count}</span>
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {count > 0 ? 'Hone your weak areas and earn back lives!' : 'Zero mistakes found! Clean slate! ✨'}
            </p>
          </div>
          
          {count > 0 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-duo-outline" onClick={clearMistakes}>
                Clear All
              </button>
              
              <button className="btn-duo btn-duo-wrong" onClick={onStartMistakeQuiz}>
                Start Mistake Quiz
              </button>
            </div>
          )}
        </div>

        {/* List of mistakes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {count === 0 ? (
            <div className="card-glass" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              🌟 Excellent work! You currently have no mistakes cataloged. Continue studying lessons to build up your practice tree.
            </div>
          ) : (
            mistakes.map((m, idx) => (
              <div key={idx} className="card-glass" style={{ padding: '20px', borderLeft: '4px solid var(--wrong)' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  Topic: {m.topic || 'General'}
                </span>
                <p style={{ fontWeight: 700, marginTop: '6px', fontSize: '15px', lineHeight: '20px' }}>{m.text}</p>
                <div style={{
                  marginTop: '12px',
                  backgroundColor: 'var(--surface-2)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)'
                }}>
                  <strong>Correct Answer:</strong> {m.correctAnswer || ((m.choices || m.options) ? (m.choices || m.options)[m.correct] : 'No correct answer cached')}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
