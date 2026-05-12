// NY Living Environment Regents — update EXAM_DATE each year
const EXAM_DATE = new Date('2026-06-17T08:00:00')

function getMessage(days) {
  if (days < 0)  return { text: 'Exam complete — great work!', color: '#22c55e' }
  if (days === 0) return { text: 'Exam day — you\'ve got this!', color: '#22c55e' }
  if (days <= 3)  return { text: 'Final days — review your weak topics!', color: '#ef4444' }
  if (days <= 7)  return { text: 'Last week — stay focused!', color: '#f97316' }
  if (days <= 14) return { text: 'Two weeks out — push hard!', color: '#f59e0b' }
  if (days <= 30) return { text: 'Keep the momentum going!', color: '#a78bfa' }
  return { text: 'Build your foundation now.', color: '#60a5fa' }
}

export default function ExamCountdown() {
  const now  = new Date()
  const ms   = EXAM_DATE - now
  const days = Math.ceil(ms / 86400000)
  const { text, color } = getMessage(days)

  const dateStr = EXAM_DATE.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="exam-countdown" style={{ borderColor: color + '55' }}>
      <div className="exam-countdown-left">
        <p className="exam-countdown-label">REGENTS EXAM</p>
        <p className="exam-countdown-date">{dateStr}</p>
        <p className="exam-countdown-msg" style={{ color }}>{text}</p>
      </div>
      <div className="exam-countdown-right">
        {days > 0 ? (
          <>
            <span className="exam-countdown-days" style={{ color }}>{days}</span>
            <span className="exam-countdown-days-label">days left</span>
          </>
        ) : days === 0 ? (
          <span className="exam-countdown-today" style={{ color }}>TODAY</span>
        ) : (
          <span className="exam-countdown-done" style={{ color }}>✓ Done</span>
        )}
      </div>
    </div>
  )
}
