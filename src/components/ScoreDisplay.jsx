export default function ScoreDisplay({ score, streak, multiplier }) {
  return (
    <div className="score-display">
      <div className="score-block">
        <span className="score-value">{score}</span>
        <span className="score-label">pts</span>
      </div>

      {streak > 0 && (
        <div className="streak-block">
          <span className="streak-fire">🔥</span>
          <span className="streak-count">{streak}</span>
          {multiplier > 1 && (
            <span className="streak-multiplier">{multiplier}×</span>
          )}
        </div>
      )}
    </div>
  )
}
