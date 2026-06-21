import React from 'react'

export default function FocusHistoryScreen({
  history = [],
  setScreen,
}) {
  const formatDate = (dateStr) => {
    try {
      const [year, month, day] = dateStr.split('-')
      const date = new Date(year, month - 1, day)
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="screen-container" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', animation: 'fade-in 0.25s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>⌛</span> Focus Session History
          </h1>
          <button className="btn-duo-outline" style={{ padding: '8px 16px', fontSize: '13px', borderBottomWidth: '2px' }} onClick={() => setScreen('focus')}>
            ✕ Back to Timer
          </button>
        </div>

        {/* Sessions list */}
        {history.length === 0 ? (
          <div className="card-glass" style={{ padding: '48px 32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>📭</span>
            <h3 style={{ fontWeight: 800, fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>No Sessions Logged</h3>
            <p style={{ fontSize: '14px', maxWidth: '380px', margin: '0 auto', lineHeight: '20px' }}>
              Your completed Pomodoro sessions will appear here. Start a timer to track your study goals!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {history.map((session) => {
              const totalMin = (session.pomodorosCompleted || 0) * (session.preset === 'short' ? 15 : session.preset === 'long' ? 50 : 25) + (session.partialMinutes || 0)
              const doneTodos = (session.todos || []).filter(t => t.done).length
              const totalTodos = (session.todos || []).length

              return (
                <div key={session.id} className="card-glass" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
                  {/* Title Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '17px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {session.subject || 'Study Session'}
                      </h3>
                      <p style={{ fontSize: '12px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
                        {formatDate(session.date)} · Preset: {session.preset}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ backgroundColor: 'var(--brand-bg)', color: 'var(--brand-dark)', padding: '4px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 800 }}>
                        ⭐ {session.rpEarned} XP
                      </span>
                    </div>
                  </div>

                  {/* Quick details */}
                  <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--text-muted)', fontWeight: 700 }}>
                    <span>⏱ Duration: {totalMin} minutes</span>
                    {session.pomodorosCompleted > 0 && (
                      <span>🍅 Pomodoros: {session.pomodorosCompleted}</span>
                    )}
                    {totalTodos > 0 && (
                      <span>✓ Tasks: {doneTodos} / {totalTodos}</span>
                    )}
                  </div>

                  {/* Session checklist details */}
                  {totalTodos > 0 && (
                    <div style={{
                      backgroundColor: 'var(--surface-2)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      marginTop: '4px'
                    }}>
                      {session.todos.map((t, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                          <span style={{ color: t.done ? 'var(--brand)' : 'var(--text-dim)', fontWeight: 900 }}>
                            {t.done ? '✓' : '○'}
                          </span>
                          <span style={{
                            color: t.done ? 'var(--text-muted)' : 'var(--text)',
                            textDecoration: t.done ? 'line-through' : 'none',
                            opacity: t.done ? 0.6 : 1
                          }}>
                            {t.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
