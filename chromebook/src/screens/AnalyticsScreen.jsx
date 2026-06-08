import React, { useMemo } from 'react'
import { SUBJECT_META } from '@content/subjects'

export default function AnalyticsScreen({
  subject,
  history = [],
  subjectData,
}) {
  const meta = SUBJECT_META[subject] || { name: 'Subject', icon: '🔬', color: 'var(--brand)' }
  const { TOPIC_ORDER = [] } = subjectData

  const stats = useMemo(() => {
    const relevant = history.filter(h => (h.subject ?? 'living-environment') === subject)
    const totalSessions = relevant.length
    const avgScore = totalSessions > 0 ? Math.round(relevant.reduce((sum, h) => sum + (h.pct || 0), 0) / totalSessions) : 0
    const totalCorrect = relevant.reduce((sum, h) => sum + (h.correct || 0), 0)
    const totalQuestions = relevant.reduce((sum, h) => sum + (h.total || 0), 0)
    
    // Topic breakdown
    const topicBreakdown = {}
    TOPIC_ORDER.forEach(t => {
      const topicAttempts = relevant.filter(h => h.topic === t)
      if (topicAttempts.length > 0) {
        topicBreakdown[t] = {
          count: topicAttempts.length,
          bestPct: Math.max(...topicAttempts.map(h => h.pct || 0)),
          avgPct: Math.round(topicAttempts.reduce((sum, h) => sum + (h.pct || 0), 0) / topicAttempts.length)
        }
      } else {
        topicBreakdown[t] = { count: 0, bestPct: 0, avgPct: 0 }
      }
    })

    return { totalSessions, avgScore, totalCorrect, totalQuestions, topicBreakdown }
  }, [history, subject, TOPIC_ORDER])

  return (
    <div className="screen-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '900px', width: '100%', margin: '0 auto' }}>
        
        {/* Header Title */}
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>📈</span> Study Analytics & Insights
        </h1>

        {/* Global Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div className="card-glass" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
              Study Sessions
            </div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '32px', color: 'var(--blue)', marginTop: '8px' }}>
              {stats.totalSessions} sessions
            </div>
          </div>

          <div className="card-glass" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
              Average Score
            </div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '32px', color: stats.avgScore >= 85 ? 'var(--brand-dark)' : stats.avgScore >= 65 ? 'var(--warn-dark)' : 'var(--wrong)', marginTop: '8px' }}>
              🎯 {stats.avgScore}%
            </div>
          </div>

          <div className="card-glass" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px' }}>
              Questions Solved
            </div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '32px', color: 'var(--purple)', marginTop: '8px' }}>
              {stats.totalQuestions} items
            </div>
          </div>
        </div>

        {/* Topic Breakdown Bars */}
        <div className="card-glass">
          <h2 className="card-title">🔬 Mastery by Concept ({meta.name})</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Concepts turn green when you achieve high best scores. Aim to push all topics beyond 85%!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {TOPIC_ORDER.map((topic, index) => {
              const data = stats.topicBreakdown[topic] || { count: 0, bestPct: 0, avgPct: 0 }
              const pct = data.bestPct
              const color = pct >= 85 ? 'var(--brand)' : pct >= 65 ? 'var(--warn)' : 'var(--wrong)'

              return (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '15px' }}>
                      {topic}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 800, display: 'flex', gap: '12px' }}>
                      <span style={{ color: 'var(--text-dim)' }}>{data.count} quizzes</span>
                      <span style={{ color }}>Best: {pct}%</span>
                    </div>
                  </div>
                  
                  {/* Progress fill */}
                  <div style={{ height: '14px', background: 'var(--surface-3)', borderRadius: '7px', overflow: 'hidden', border: '1.5px solid var(--border)' }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      backgroundColor: color,
                      borderRadius: '7px',
                      transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Session History List */}
        <div className="card-glass">
          <h2 className="card-title">📋 Recent Quiz History</h2>
          
          {history.filter(h => (h.subject ?? 'living-environment') === subject).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
              📭 No quiz history logged for this subject yet. Go study some units!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto', marginTop: '16px' }}>
              {history.filter(h => (h.subject ?? 'living-environment') === subject).map((h, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  backgroundColor: 'var(--surface-2)',
                  borderRadius: '12px',
                  border: '1.5px solid var(--border)'
                }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '14px' }}>{h.topic}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {h.timestamp ? new Date(h.timestamp).toLocaleDateString() : 'Today'}
                    </div>
                  </div>
                  <div style={{
                    fontWeight: 900,
                    fontSize: '15px',
                    color: h.pct >= 85 ? 'var(--brand-dark)' : h.pct >= 65 ? 'var(--warn-dark)' : 'var(--wrong)'
                  }}>
                    🎯 {h.correct} / {h.total} ({h.pct}%)
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
