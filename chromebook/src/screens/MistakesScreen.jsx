import React, { useState } from 'react'
import { Reggie } from '../components/brand/Reggie'
import { useTutor } from '../hooks/useTutor'

// Per-card Socratic tutor component
function MistakeTutorPanel({ question }) {
  const [open, setOpen] = useState(false)
  const [level, setLevel] = useState(1)
  const { loading, data, error, explain, reset } = useTutor()

  const correctIdx = question.correct ?? 0
  // For mistakes we don't know what the user chose, so we pass -1 (first wrong choice)
  const wrongIdx = correctIdx === 0 ? 1 : 0

  const handleAsk = async () => {
    setOpen(true)
    if (!data) await explain(question, wrongIdx)
  }

  const handleClose = () => {
    setOpen(false)
    setLevel(1)
    reset()
  }

  return (
    <div style={{ marginTop: '14px' }}>
      {!open ? (
        <button
          onClick={handleAsk}
          style={{
            padding: '8px 16px',
            borderRadius: '12px',
            border: '1.5px solid var(--brand)',
            background: 'var(--brand-bg)',
            color: 'var(--brand-dark)',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          🤔 Ask AI Tutor — Why is this tricky?
        </button>
      ) : (
        <div style={{
          background: 'var(--surface-2)',
          border: '1.5px solid var(--brand)',
          borderRadius: '14px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          animation: 'modal-fade-in 0.25s ease-out',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Reggie size={32} pose="think" isAvatar />
              <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '14px', color: 'var(--brand-dark)' }}>
                Coach Reggie
              </span>
            </div>
            <button onClick={handleClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '18px', cursor: 'pointer', fontWeight: 800 }}>✕</button>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '12px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
              🦕 Reggie is thinking…
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{ fontSize: '13px', color: 'var(--wrong-dark)', background: 'var(--wrong-bg)', padding: '10px 14px', borderRadius: '10px' }}>
              ⚠️ Couldn't load — check your connection.
              <button onClick={() => explain(question, wrongIdx)} style={{ display: 'block', marginTop: '8px', cursor: 'pointer', background: 'var(--wrong)', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 12px', fontWeight: 700, fontSize: '12px' }}>Retry</button>
            </div>
          )}

          {/* Socratic levels */}
          {data && !loading && (
            <>
              {/* Nudge */}
              <div style={{ background: 'var(--brand-bg)', border: '1.5px solid var(--brand)', borderRadius: '12px', padding: '12px 14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>💡</span> Step 1 — Nudge
                </div>
                <div style={{ fontSize: '13px', lineHeight: '19px', color: 'var(--text)' }}>{data.nudge}</div>
              </div>

              {/* Strategy */}
              {level >= 2 ? (
                <div style={{ background: 'var(--warn-bg)', border: '1.5px solid var(--warn)', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--warn-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>🧭</span> Step 2 — Strategy
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '19px', color: 'var(--text)' }}>{data.method}</div>
                </div>
              ) : (
                <button onClick={() => setLevel(2)} style={{ padding: '10px', width: '100%', borderRadius: '10px', border: '1.5px dashed var(--warn)', background: 'transparent', color: 'var(--warn-dark)', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>
                  🧭 Reveal Strategy →
                </button>
              )}

              {/* Full Explanation */}
              {level >= 3 ? (
                <div style={{ background: 'rgba(139,92,246,0.08)', border: '1.5px solid var(--purple)', borderRadius: '12px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--purple)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>🔍</span> Step 3 — Full Coaching
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: '19px', color: 'var(--text)' }}>{data.explanation}</div>
                </div>
              ) : level >= 2 ? (
                <button onClick={() => setLevel(3)} style={{ padding: '10px', width: '100%', borderRadius: '10px', border: '1.5px dashed var(--purple)', background: 'transparent', color: 'var(--purple)', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>
                  🔍 Reveal Full Coaching →
                </button>
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  )
}

function getDueStatus(due) {
  const now = Date.now()
  if (!due || due <= now) {
    return { text: '⚠️ Due Now', isDue: true }
  }
  const diffMs = due - now
  const diffHrs = Math.ceil(diffMs / 3600000)
  if (diffHrs < 24) {
    return { text: `📅 Due in ${diffHrs}h`, isDue: false }
  }
  const diffDays = Math.ceil(diffMs / 86400000)
  return { text: `📅 Due in ${diffDays}d`, isDue: false }
}

export default function MistakesScreen({
  mistakes = [],
  clearMistakes,
  onStartMistakeQuiz,
  setScreen,
}) {
  const count = mistakes.length
  const now = Date.now()
  const dueCount = mistakes.filter(m => (m.due ?? 0) <= now).length

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Reggie size={80} pose="think" isAvatar />
            <div>
              <span style={{ fontSize: '36px' }}>🩹</span>
              <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', marginTop: '8px', marginBottom: '6px' }}>
                Smart Review Deck
              </h1>
              <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: '22px', margin: 0 }}>
                Mistakes are automatically scheduled here using Leitner spaced repetition.
                Answering correctly advances questions through Boxes 1–5 until they graduate. Wrong answers reset them!
              </p>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="card-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '18px' }}>
              Due Gaps: <span style={{ color: dueCount > 0 ? 'var(--wrong)' : 'var(--text-muted)' }}>{dueCount}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 700, marginLeft: '8px' }}>
                ({count} total items)
              </span>
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {dueCount > 0 
                ? 'Practice due items now to clear your weak concepts and build mastery!' 
                : count > 0 
                ? 'All caught up! Next items are scheduled for future review.'
                : 'Zero mistakes found! Clean slate! ✨'}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {count > 0 && (
              <button className="btn-duo-outline" onClick={clearMistakes}>
                Clear All
              </button>
            )}
            
            {dueCount > 0 && (
              <button className="btn-duo btn-duo-wrong" onClick={onStartMistakeQuiz}>
                Review Due Gaps
              </button>
            )}
          </div>
        </div>

        {/* List of mistakes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {count === 0 ? (
            <div className="card-glass" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              🌟 Excellent work! You currently have no mistakes cataloged. Continue studying lessons to build up your practice tree.
            </div>
          ) : (
            mistakes.map((m, idx) => {
              const dueStatus = getDueStatus(m.due)
              return (
                <div key={idx} className="card-glass" style={{ padding: '20px', borderLeft: `4px solid ${dueStatus.isDue ? 'var(--wrong)' : 'var(--text-muted)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                        Topic: {m.topic || 'General'}
                      </span>
                      {/* Leitner Box indicator */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)' }}>Box {m.box || 1}/5:</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {[1, 2, 3, 4, 5].map(b => (
                            <div
                              key={b}
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: b <= (m.box || 1) ? 'var(--brand)' : 'var(--border)'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: dueStatus.isDue ? 'var(--wrong-dark)' : 'var(--text-muted)',
                      backgroundColor: dueStatus.isDue ? 'var(--wrong-bg)' : 'var(--surface-3)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                    }}>
                      {dueStatus.text}
                    </span>
                  </div>

                  <p style={{ fontWeight: 700, marginTop: '12px', fontSize: '15px', lineHeight: '20px' }}>{m.text}</p>
                  
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
                  
                  {/* Socratic AI Tutor panel — one per mistake card */}
                  {(m.choices || m.options) && (
                    <MistakeTutorPanel question={m} />
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
