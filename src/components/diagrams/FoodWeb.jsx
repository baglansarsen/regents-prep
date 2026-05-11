const LEVELS = [
  { label: 'Tertiary Consumer', emoji: '🦅', examples: 'Hawk, Eagle' },
  { label: 'Secondary Consumer', emoji: '🦊', examples: 'Fox, Snake' },
  { label: 'Primary Consumer',   emoji: '🐇', examples: 'Rabbit, Mouse' },
  { label: 'Producer',           emoji: '🌿', examples: 'Grass, Plants' },
]

export default function FoodWeb({ highlight }) {
  return (
    <div className="diagram-foodweb">
      <p className="diagram-title">Food Chain — Energy Flow</p>
      {LEVELS.map((level, i) => (
        <div key={i} className="foodweb-level">
          <div className={`foodweb-card ${highlight === level.label ? 'foodweb-card--highlight' : ''}`}>
            <span className="foodweb-emoji">{level.emoji}</span>
            <div>
              <p className={`foodweb-label ${highlight === level.label ? 'foodweb-label--highlight' : ''}`}>{level.label}</p>
              <p className="foodweb-examples">{level.examples}</p>
            </div>
          </div>
          {i < LEVELS.length - 1 && <p className="foodweb-arrow">↑ 10% energy</p>}
        </div>
      ))}
    </div>
  )
}
