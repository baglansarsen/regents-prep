const TIER_ORDER = ['gold', 'silver', 'bronze']
const TIER_COLORS = { bronze: '#cd7f32', silver: '#a8a9ad', gold: '#ffd700' }
const TIER_BG = { bronze: '#cd7f3222', silver: '#a8a9ad22', gold: '#ffd70022' }

export default function AchievementsScreen({ allAchievements, earnedIds, onHome }) {
  const earned = allAchievements.filter((a) => earnedIds.has(a.id))
  const locked = allAchievements.filter((a) => !earnedIds.has(a.id))

  const pct = Math.round((earned.length / allAchievements.length) * 100)

  return (
    <div className="achievements-screen">
      <header className="achievements-header">
        <button className="btn-ghost back-btn" onClick={onHome}>← Back</button>
        <h2 className="achievements-title">Achievements</h2>
        <p className="achievements-subtitle">{earned.length} / {allAchievements.length} unlocked · {pct}%</p>
        <div className="achievements-progress-bar">
          <div className="achievements-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </header>

      {TIER_ORDER.map((tier) => {
        const group = allAchievements.filter((a) => a.tier === tier)
        const earnedGroup = group.filter((a) => earnedIds.has(a.id))
        return (
          <section key={tier} className="achievements-tier-section">
            <h3 className="achievements-tier-heading" style={{ color: TIER_COLORS[tier] }}>
              {tier.charAt(0).toUpperCase() + tier.slice(1)} · {earnedGroup.length}/{group.length}
            </h3>
            <div className="achievements-grid">
              {group.map((a) => {
                const isEarned = earnedIds.has(a.id)
                return (
                  <div
                    key={a.id}
                    className={`achievement-card ${isEarned ? 'achievement-card--earned' : 'achievement-card--locked'}`}
                    style={isEarned ? { borderColor: TIER_COLORS[a.tier], backgroundColor: TIER_BG[a.tier] } : {}}
                  >
                    <span className="achievement-card-emoji" style={{ filter: isEarned ? 'none' : 'grayscale(1) opacity(0.4)' }}>
                      {a.emoji}
                    </span>
                    <p className="achievement-card-name" style={{ color: isEarned ? TIER_COLORS[a.tier] : '#666' }}>{a.name}</p>
                    <p className="achievement-card-desc">{a.description}</p>
                    {isEarned && <span className="achievement-card-check">✓</span>}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
