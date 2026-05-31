import { useState } from 'react'
import { PETS, STAGE_NAMES, FOOD_ITEMS, HAPPINESS_ITEMS } from '@content/petConfig'

function StatBar({ value, color, emoji }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: 14 }}>{emoji}</span>
      <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#e5e7eb', overflow: 'hidden' }}>
        <div style={{ width: `${Math.round(value)}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.4s' }} />
      </div>
      <span style={{ fontSize: 11, color: '#6b7280', minWidth: 28 }}>{Math.round(value)}%</span>
    </div>
  )
}

export default function PetWidget({ pet, inventory, onFeed, onPlay, onPetTap, onShop, activeReaction, activeFloatMessage, onDig, theme }) {
  const [showItems, setShowItems] = useState(false)
  const isDark = theme === 'dark'

  if (!pet?.chosen) return null

  const petType  = PETS?.find?.((p) => p.id === pet.petType)
  const stageName = STAGE_NAMES?.[pet.stage] ?? `Stage ${pet.stage}`
  const emoji    = petType?.stages?.[pet.stage - 1] ?? petType?.emoji ?? '🐾'

  const foodInInv  = (FOOD_ITEMS ?? []).filter((f) => (inventory[f.id] ?? 0) > 0)
  const happyInInv = (HAPPINESS_ITEMS ?? []).filter((h) => (inventory[h.id] ?? 0) > 0)

  return (
    <div style={{
      background: isDark ? '#1e293b' : '#f8fafc',
      border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
      borderRadius: 16, padding: '16px 20px', marginBottom: 16, position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Pet avatar */}
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={onPetTap}>
          <div style={{
            fontSize: 52, lineHeight: 1,
            filter: activeReaction === 'cheer' ? 'brightness(1.3)' : 'none',
            transform: activeReaction === 'happy_dance' ? 'rotate(-10deg)' : activeReaction === 'celebrate' ? 'scale(1.2)' : 'none',
            transition: 'transform 0.3s, filter 0.3s',
            userSelect: 'none',
          }}>
            {emoji}
          </div>
          {activeFloatMessage && (
            <div style={{
              position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)',
              background: '#10b981', color: '#fff', borderRadius: 12, padding: '2px 10px',
              fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', pointerEvents: 'none',
            }}>
              {activeFloatMessage}
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: isDark ? '#f1f5f9' : '#1e293b' }}>
              {pet.name ?? petType?.name}
            </span>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>{stageName}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <StatBar value={pet.hunger}    color="#f97316" emoji="🍖" />
            <StatBar value={pet.happiness} color="#a855f7" emoji="😊" />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          onClick={() => setShowItems((s) => !s)}
          style={{
            flex: 1, padding: '7px 0', borderRadius: 10, border: 'none',
            background: showItems ? '#f97316' : (isDark ? '#334155' : '#fff'),
            color: showItems ? '#fff' : (isDark ? '#f1f5f9' : '#374151'),
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
            outline: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
          }}
        >
          🎒 Items
        </button>
        <button
          onClick={onDig}
          style={{
            flex: 1, padding: '7px 0', borderRadius: 10, border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
            background: isDark ? '#334155' : '#fff', color: isDark ? '#f1f5f9' : '#374151',
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}
        >
          ⛏️ Daily Dig
        </button>
        <button
          onClick={onShop}
          style={{
            flex: 1, padding: '7px 0', borderRadius: 10, border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
            background: isDark ? '#334155' : '#fff', color: isDark ? '#f1f5f9' : '#374151',
            fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}
        >
          🛒 Shop
        </button>
      </div>

      {showItems && (foodInInv.length > 0 || happyInInv.length > 0) && (
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {foodInInv.map((f) => (
            <button key={f.id} onClick={() => onFeed(f.id)} style={itemBtnStyle(isDark)}>
              {f.emoji} {f.name} <span style={{ fontSize: 10, color: '#94a3b8' }}>×{inventory[f.id]}</span>
            </button>
          ))}
          {happyInInv.map((h) => (
            <button key={h.id} onClick={() => onPlay(h.id)} style={itemBtnStyle(isDark)}>
              {h.emoji} {h.name} <span style={{ fontSize: 10, color: '#94a3b8' }}>×{inventory[h.id]}</span>
            </button>
          ))}
        </div>
      )}
      {showItems && foodInInv.length === 0 && happyInInv.length === 0 && (
        <p style={{ marginTop: 8, fontSize: 13, color: '#94a3b8', textAlign: 'center' }}>
          No items — visit the Shop to stock up!
        </p>
      )}
    </div>
  )
}

const itemBtnStyle = (isDark) => ({
  padding: '5px 10px', borderRadius: 8, border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
  background: isDark ? '#0f172a' : '#f1f5f9', color: isDark ? '#e2e8f0' : '#374151',
  fontSize: 13, cursor: 'pointer', fontWeight: 600,
})
