import React, { useMemo } from 'react'
import { REGENTS_EXAMS } from '@content/regents-exams/index'
import { SUBJECT_META } from '@content/subjects'

export default function ExamPickerScreen({
  subject,
  onStartExam,
}) {
  const exams = useMemo(() => {
    return REGENTS_EXAMS[subject] || []
  }, [subject])

  const meta = SUBJECT_META[subject] || { name: 'Subject', icon: '🔬', color: 'var(--brand)' }

  return (
    <div className="screen-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        
        {/* Banner header */}
        <div className="card-glass" style={{
          background: `linear-gradient(135deg, ${meta.color}, #1e293b)`,
          color: '#fff',
          border: 'none',
          padding: '32px'
        }}>
          <span style={{ fontSize: '48px' }}>{meta.icon}</span>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', marginTop: '12px' }}>
            {meta.name} Past Exams
          </h1>
          <p style={{ marginTop: '6px', fontSize: '15px', opacity: 0.9, lineHeight: '22px' }}>
            Simulate standard NY State Regents tests with authentic, chronological past exam papers. Take full-length sessions or practice specific papers to prepare for the test day.
          </p>
        </div>

        {/* List of Exams */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '20px' }}>Available Regents papers</h2>
          
          {exams.length === 0 ? (
            <div className="card-glass" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              📭 No past papers uploaded for this subject yet. Check back soon!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {exams.map((ex) => (
                <div key={ex.id} className="card-glass" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 24px',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onClick={() => onStartExam(ex)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '18px' }}>
                      📋 {ex.title || ex.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {ex.questions?.length ?? 0} multiple choice & stimulus questions · 45 mins limit
                    </p>
                  </div>
                  <button className="btn-duo btn-duo-blue" style={{ padding: '10px 20px', fontSize: '14px' }}>
                    Start Exam
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
