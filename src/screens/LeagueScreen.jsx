import { useState, useEffect } from 'react'
import { TIERS, TIER_META, msUntilReset, formatCountdown } from '../hooks/useLeague'

export default function LeagueScreen({ uid, tier, members, loading, justPromoted, justDemoted, promoteN, demoteN, weeklyXP, onBack, onRefresh, theme }) {
  const [countdown, setCountdown] = useState(() => formatCountdown(msUntilReset()))
  const isDark = theme === 'dark'
  const meta = TIER_META[tier] ?? TIER_META.bronze

  useEffect(() => {
    const id = setInterval(() => setCountdown(formatCountdown(msUntilReset())), 60_000)
    return () => clearInterval(id)
  }, [])

  const myRank = members.findIndex((m) => m.uid === uid) + 1

  return (
    <div style={{ minHeight: '100vh', background: isDark ? '#0f172a' : '#f8fafc', paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={backBtn(isDark)}>←</button>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: isDark ? '#f1f5f9' : '#1e293b' }}>League</h2>
        <button onClick={onRefresh} style={{ ...backBtn(isDark), marginLeft: 'auto', fontSize: 16 }}>↻</button>
      </div>

      {/* Tier banner */}
      <div style={{
        margin: '16px 20px', padding: '20px', borderRadius: 18,
        background: `linear-gradient(135deg, ${meta.color}22, ${meta.color}44)`,
        border: `2px solid ${meta.color}66`, textAlign: 'center',
      }}>
        {(justPromoted || justDemoted) && (
          <div style={{
            background: justPromoted ? '#10b981' : '#ef4444',
            color: '#fff', borderRadius: 20, padding: '4px 14px',
            fontSize: 13, fontWeight: 700, marginBottom: 10, display: 'inline-block',
          }}>
            {justPromoted ? '⬆️ Promoted!' : '⬇️ Demoted'}
          </div>
        )}
        <div style={{ fontSize: 48 }}>{meta.emoji}</div>
        <div style={{ fontWeight: 800, fontSize: 22, color: meta.color, marginTop: 4 }}>{meta.label} League</div>
        <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 6 }}>
          {myRank > 0 ? `Your rank: #${myRank}` : '—'} · This week: {weeklyXP?.toLocaleString() ?? 0} XP
        </div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Resets in {countdown}</div>
      </div>

      {/* Tier tabs */}
      <div style={{ display: 'flex', gap: 6, padding: '0 20px', marginBottom: 16, overflowX: 'auto' }}>
        {TIERS.map((t) => {
          const m = TIER_META[t]
          const active = t === tier
          return (
            <div key={t} style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700,
              background: active ? m.color : (isDark ? '#1e293b' : '#e2e8f0'),
              color: active ? '#fff' : '#94a3b8', whiteSpace: 'nowrap',
              border: active ? `2px solid ${m.color}` : '2px solid transparent',
            }}>
              {m.emoji} {m.label}
            </div>
          )
        })}
      </div>

      {/* Member list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Loading…</div>
      ) : members.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏆</div>
          <p>No other players in your league yet.<br />Study to climb the ranks!</p>
        </div>
      ) : (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {members.map((m, i) => {
            const rank    = i + 1
            const isMe    = m.uid === uid
            const inPromote = rank <= promoteN && tier !== 'diamond'
            const inDemote  = demoteN > 0 && rank > members.length - demoteN && tier !== 'bronze'
            const rankColor = rank === 1 ? '#D97706' : rank === 2 ? '#8C9BAB' : rank === 3 ? '#CD7F32' : (isDark ? '#94a3b8' : '#6b7280')

            return (
              <div key={m.uid} style={{
                background: isMe
                  ? (isDark ? '#1e1b4b' : '#eef2ff')
                  : (inPromote ? (isDark ? '#052e16' : '#f0fdf4') : inDemote ? (isDark ? '#2d0a0a' : '#fff5f5') : (isDark ? '#1e293b' : '#fff')),
                border: `1px solid ${isMe ? '#6366f1' : inPromote ? '#86efac' : inDemote ? '#fca5a5' : (isDark ? '#334155' : '#e2e8f0')}`,
                borderRadius: 12, padding: '12px 14px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ fontWeight: 800, fontSize: 16, color: rankColor, minWidth: 24, textAlign: 'center' }}>
                  {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: isMe ? 800 : 600, fontSize: 14, color: isDark ? '#f1f5f9' : '#1e293b' }}>
                    {m.displayName} {isMe ? '(you)' : ''}
                  </div>
                </div>
                <span style={{ fontWeight: 700, fontSize: 14, color: meta.color }}>
                  {m.weeklyXP.toLocaleString()} XP
                </span>
              </div>
            )
          })}

          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, color: '#94a3b8', justifyContent: 'center' }}>
            {tier !== 'diamond' && <span style={{ color: '#22c55e' }}>↑ Top {promoteN} promote</span>}
            {tier !== 'bronze' && demoteN > 0 && <span style={{ color: '#ef4444' }}>↓ Bottom {demoteN} demote</span>}
          </div>
        </div>
      )}
    </div>
  )
}

const backBtn = (isDark) => ({
  width: 36, height: 36, borderRadius: '50%', border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
  background: isDark ? '#1e293b' : '#fff', color: isDark ? '#f1f5f9' : '#374151',
  fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
})
