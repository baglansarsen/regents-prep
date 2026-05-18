import { useState } from 'react'
import { REGENTS_EXAMS } from '../data/regents-exams/index'
import { SUBJECT_META } from '../data/subjects'

const SUBJECTS = ['living-environment', 'earth-science']

export default function RegentsExamPickerScreen({ onSelect, onHome, subject: initialSubject }) {
  const [subject, setSubject] = useState(initialSubject ?? 'living-environment')

  const exams = REGENTS_EXAMS[subject] ?? []

  // Group by year descending
  const byYear = {}
  exams.forEach((e) => {
    if (!byYear[e.year]) byYear[e.year] = []
    byYear[e.year].push(e)
  })
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)

  return (
    <div className="home-screen">
      <header className="home-header home-header--compact">
        <button className="back-btn" onClick={onHome}>← Back</button>
        <div className="home-title-row">
          <h1 className="app-title">Regents Exams</h1>
          <p className="app-subtitle">Official past exams</p>
        </div>
      </header>

      <div className="tab-panel">
        {/* Subject tabs */}
        <div className="subject-selector" style={{ marginBottom: 16 }}>
          {SUBJECTS.map((s) => {
            const meta = SUBJECT_META[s]
            return (
              <button
                key={s}
                className={`fc-topic-chip ${subject === s ? 'fc-topic-chip--active' : ''}`}
                onClick={() => setSubject(s)}
              >
                {meta.icon} {meta.name}
              </button>
            )
          })}
        </div>

        {/* Exam grid */}
        {years.map((year) => (
          <div key={year} className="regents-year-group">
            <p className="regents-year-label">{year}</p>
            <div className="regents-exam-row">
              {byYear[year].map((exam) => {
                const hasQuestions = exam.questions.length > 0
                return (
                  <button
                    key={exam.id}
                    className={`regents-exam-card ${!hasQuestions ? 'regents-exam-card--empty' : ''}`}
                    onClick={() => hasQuestions && onSelect(exam)}
                    disabled={!hasQuestions}
                  >
                    <span className="regents-exam-session">{exam.session}</span>
                    <span className="regents-exam-count">
                      {hasQuestions ? `${exam.questions.length} questions` : 'Coming soon'}
                    </span>
                    {hasQuestions && <span className="regents-exam-time">⏱ {exam.totalMinutes} min</span>}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <div className="regents-info-box">
          <p className="regents-info-title">📋 About Regents Test Mode</p>
          <p className="regents-info-text">
            Simulates the real exam: {' '}timed, question navigation, flag for review, and a scaled score report. Covers Parts A + B-1 (multiple choice).
          </p>
        </div>
      </div>
    </div>
  )
}
