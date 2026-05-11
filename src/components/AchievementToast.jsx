import { useEffect } from 'react'

const TIER_COLORS = { bronze: '#cd7f32', silver: '#a8a9ad', gold: '#ffd700' }

export default function AchievementToast({ achievement, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000)
    return () => clearTimeout(t)
  }, [achievement, onDismiss])

  if (!achievement) return null

  const color = TIER_COLORS[achievement.tier] ?? '#888'

  return (
    <div className="achievement-toast" style={{ borderColor: color }} onClick={onDismiss}>
      <span className="achievement-toast-emoji">{achievement.emoji}</span>
      <div className="achievement-toast-body">
        <p className="achievement-toast-unlocked">Achievement Unlocked!</p>
        <p className="achievement-toast-name" style={{ color }}>{achievement.name}</p>
        <p className="achievement-toast-desc">{achievement.description}</p>
      </div>
      <span className="achievement-toast-tier" style={{ color }}>{achievement.tier}</span>
    </div>
  )
}
