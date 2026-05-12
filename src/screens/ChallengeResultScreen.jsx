export default function ChallengeResultScreen({ myScore, opponentScore, opponentName, onHome }) {
  const iWon = myScore > opponentScore
  const tied = myScore === opponentScore

  return (
    <div className="results-screen">
      <div className="results-hero">
        <span className="results-emoji">{tied ? '🤝' : iWon ? '🏆' : '😤'}</span>
        <h2
          className="results-grade"
          style={{ color: iWon ? '#22c55e' : tied ? '#f59e0b' : '#ef4444' }}
        >
          {tied ? 'Tied!' : iWon ? 'You Won!' : 'You Lost'}
        </h2>

        <div className="challenge-result-scores">
          <div className="crs-block crs-block--me">
            <p className="crs-pts">{myScore}</p>
            <p className="crs-label">You</p>
          </div>
          <span className="crs-vs">vs</span>
          <div className="crs-block">
            <p className="crs-pts">{opponentScore ?? '?'}</p>
            <p className="crs-label">{opponentName}</p>
          </div>
        </div>
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={onHome}>Back to Friends</button>
      </div>
    </div>
  )
}
