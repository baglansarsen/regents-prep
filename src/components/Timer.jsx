export default function Timer({ timeLeft, max }) {
  const pct = (timeLeft / max) * 100
  const urgent = timeLeft <= 10

  return (
    <div className="timer">
      <div
        className={`timer-bar ${urgent ? 'timer-bar--urgent' : ''}`}
        style={{ width: `${pct}%` }}
      />
      <span className={`timer-label ${urgent ? 'timer-label--urgent' : ''}`}>
        {timeLeft}s
      </span>
    </div>
  )
}
