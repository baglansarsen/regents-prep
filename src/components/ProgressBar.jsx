export default function ProgressBar({ current, total, topic }) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-meta">
        <span className="progress-topic">{topic}</span>
        <span className="progress-count">{current} / {total}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
