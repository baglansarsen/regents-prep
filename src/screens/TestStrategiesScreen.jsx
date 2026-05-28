import { useState } from 'react'
import { STRATEGY_CATEGORIES } from '../data/strategies-meta'

export default function TestStrategiesScreen({ unit, strategies, onBack }) {
  const [activeKey, setActiveKey] = useState(STRATEGY_CATEGORIES[0].key)

  const unitStrategies = strategies?.[unit?.id] ?? null
  const activeCat = STRATEGY_CATEGORIES.find((c) => c.key === activeKey)
  const tips = unitStrategies?.[activeKey] ?? []
  const accentColor = unit?.color ?? 'var(--brand)'

  return (
    <div className="test-strategies-screen">
      <div className="ts-header">
        <button className="ts-back-btn" onClick={onBack}>← Back to Study</button>
        <div className="ts-header-info">
          <span className="ts-unit-icon">{unit?.icon}</span>
          <div>
            <p className="ts-unit-label">Test Strategies</p>
            <h2 className="ts-unit-title">{unit?.title}</h2>
          </div>
        </div>
      </div>

      <div className="ts-category-tabs">
        {STRATEGY_CATEGORIES.map((cat) => {
          const active = activeKey === cat.key
          return (
            <button
              key={cat.key}
              className={`fc-topic-chip ${active ? 'fc-topic-chip--active' : ''}`}
              onClick={() => setActiveKey(cat.key)}
              style={active ? { backgroundColor: accentColor, borderColor: accentColor, color: '#fff' } : {}}
            >
              {cat.icon} {cat.label}
            </button>
          )
        })}
      </div>

      <div className="ts-content">
        <div className="ts-category-header">
          <span className="ts-cat-icon">{activeCat?.icon}</span>
          <h3 className="ts-cat-title">{activeCat?.label}</h3>
        </div>

        {tips.length > 0 ? (
          <ul className="strategy-tip-list">
            {tips.map((tip, i) => (
              <li key={i} className="strategy-tip-item" style={{ borderLeftColor: accentColor }}>
                {tip}
              </li>
            ))}
          </ul>
        ) : (
          <p className="ts-coming-soon">Tips coming soon for this unit!</p>
        )}
      </div>
    </div>
  )
}
