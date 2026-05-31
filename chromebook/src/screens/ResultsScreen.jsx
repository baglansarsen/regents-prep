import React from 'react'

export default function ResultsScreen({
  results = {},
  onContinue
}) {
  const { score = 0, correct = 0, total = 0, pct = 0, bestStreak = 0 } = results

  return (
    <div className="screen-container" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div className="card-glass" style={{ maxWidth: '480px', width: '100%', padding: '40px' }}>
        <div style={{ fontSize: '72px', animation: 'float 3s ease infinite' }}>🏆</div>
        
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', marginTop: '16px' }}>
          Session Complete!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '6px' }}>
          Amazing job! You finished the quiz session.
        </p>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '28px 0' }}>
          <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: '12px', border: '1.5px solid var(--border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
              XP Earned
            </div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '24px', color: 'var(--brand-dark)', marginTop: '4px' }}>
              ⭐ {score} XP
            </div>
          </div>

          <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: '12px', border: '1.5px solid var(--border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
              Accuracy
            </div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '24px', color: pct >= 85 ? 'var(--brand-dark)' : pct >= 65 ? 'var(--warn-dark)' : 'var(--wrong)', marginTop: '4px' }}>
              🎯 {pct}%
            </div>
          </div>

          <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: '12px', border: '1.5px solid var(--border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
              Correct
            </div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '24px', color: 'var(--blue-dark)', marginTop: '4px' }}>
              {correct} / {total}
            </div>
          </div>

          <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: '12px', border: '1.5px solid var(--border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
              Best Streak
            </div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '24px', color: 'var(--warn-dark)', marginTop: '4px' }}>
              🔥 {bestStreak}
            </div>
          </div>
        </div>

        {/* Action button */}
        <button
          className="btn-duo btn-duo-blue"
          style={{ width: '100%', padding: '14px' }}
          onClick={onContinue}
        >
          Great, Continue
        </button>
      </div>
    </div>
  )
}
