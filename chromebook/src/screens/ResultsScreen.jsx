import React, { useEffect } from 'react'

export default function ResultsScreen({
  results = {},
  onContinue
}) {
  const { score = 0, correct = 0, total = 0, pct = 0, bestStreak = 0 } = results

  // CRITICAL: Allow body to scroll when results are shown
  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.body.style.height = 'auto'
    document.documentElement.style.overflow = 'auto'
    document.documentElement.style.height = 'auto'

    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.documentElement.style.overflow = ''
      document.documentElement.style.height = ''
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font-outfit)',
      padding: '40px 16px 60px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <div className="card-glass" style={{
        maxWidth: '480px',
        width: '100%',
        padding: '32px 24px',
        textAlign: 'center',
        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        animation: 'fade-in 0.3s ease-out'
      }}>
        <div style={{ fontSize: '72px', display: 'inline-block', animation: 'float 3s ease infinite' }}>🏆</div>
        
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', marginTop: '16px' }}>
          Session Complete!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '6px' }}>
          Amazing job! You finished the quiz session.
        </p>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', margin: '28px 0' }}>
          <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: '12px', border: '2px solid var(--border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
              XP Earned
            </div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '24px', color: 'var(--brand-dark)', marginTop: '4px' }}>
              ⭐ {score} XP
            </div>
          </div>

          <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: '12px', border: '2px solid var(--border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
              Accuracy
            </div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '24px', color: pct >= 85 ? 'var(--brand-dark)' : pct >= 65 ? 'var(--warn-dark)' : 'var(--wrong)', marginTop: '4px' }}>
              🎯 {pct}%
            </div>
          </div>

          <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: '12px', border: '2px solid var(--border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
              Correct
            </div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '24px', color: 'var(--blue-dark)', marginTop: '4px' }}>
              {correct} / {total}
            </div>
          </div>

          <div style={{ background: 'var(--surface-2)', padding: '16px', borderRadius: '12px', border: '2px solid var(--border)' }}>
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
          style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}
          onClick={onContinue}
        >
          Great, Continue
        </button>
      </div>
    </div>
  )
}
