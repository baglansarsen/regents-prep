export default function ScoreDisplay({ score, streak, multiplier }) {
  const onFire   = streak >= 3
  const blazing  = streak >= 5
  return (
    <div className="score-display">
      <div className="score-block">
        <span className="score-value">{score}</span>
        <span className="score-label">pts</span>
      </div>

      {streak > 0 && (
        <div className={`streak-block ${onFire ? 'streak-block--fire' : ''} ${blazing ? 'streak-block--blazing' : ''}`}>
          <span className="streak-fire">{blazing ? '🔥🔥' : '🔥'}</span>
          <span className="streak-count">{streak}</span>
          {multiplier > 1 && (
            <span className="streak-multiplier">{multiplier}×</span>
          )}
          {onFire && <span className="streak-label">{blazing ? 'BLAZING!' : 'ON FIRE!'}</span>}
        </div>
      )}
    </div>
  )
}
