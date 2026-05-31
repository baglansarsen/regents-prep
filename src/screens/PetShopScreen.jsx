import { FOOD_ITEMS, HAPPINESS_ITEMS, COSMETICS } from '@content/petConfig'

const SECTION = [
  { key: 'food',       label: 'Food',        emoji: '🍎', items: FOOD_ITEMS ?? [] },
  { key: 'happiness',  label: 'Happiness',   emoji: '🎈', items: HAPPINESS_ITEMS ?? [] },
  { key: 'accessory',  label: 'Accessories', emoji: '✨', items: COSMETICS ?? [] },
]

export default function PetShopScreen({ xp, inventory, onBuy, onBack, theme }) {
  const isDark = theme === 'dark'

  return (
    <div style={{ minHeight: '100vh', background: isDark ? '#0f172a' : '#f8fafc', paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={backBtn(isDark)}>←</button>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: isDark ? '#f1f5f9' : '#1e293b' }}>Pet Shop 🛒</h2>
          <p style={{ margin: 0, fontSize: 13, color: '#94a3b8' }}>Your XP: <strong style={{ color: '#6366f1' }}>{xp.toLocaleString()} XP</strong></p>
        </div>
      </div>

      {SECTION.map(({ key, label, emoji, items }) => (
        items.length === 0 ? null :
        <div key={key} style={{ padding: '0 20px', marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: isDark ? '#e2e8f0' : '#374151', marginBottom: 12 }}>
            {emoji} {label}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((item) => {
              const qty  = inventory[item.id] ?? 0
              const cost = item.cost ?? item.price ?? 0
              const canAfford = xp >= cost
              return (
                <div key={item.id} style={{
                  background: isDark ? '#1e293b' : '#fff',
                  border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                  borderRadius: 14, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <span style={{ fontSize: 32 }}>{item.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: isDark ? '#f1f5f9' : '#1e293b' }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{item.description}</div>
                    {qty > 0 && (
                      <div style={{ fontSize: 11, color: '#10b981', marginTop: 2 }}>Owned: {qty}</div>
                    )}
                  </div>
                  <button
                    onClick={() => onBuy(item)}
                    disabled={!canAfford}
                    style={{
                      padding: '8px 14px', borderRadius: 10, border: 'none',
                      background: canAfford ? '#6366f1' : (isDark ? '#334155' : '#e2e8f0'),
                      color: canAfford ? '#fff' : '#94a3b8',
                      fontWeight: 700, fontSize: 13, cursor: canAfford ? 'pointer' : 'not-allowed',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cost} XP
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

const backBtn = (isDark) => ({
  width: 36, height: 36, borderRadius: '50%', border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
  background: isDark ? '#1e293b' : '#fff', color: isDark ? '#f1f5f9' : '#374151',
  fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
})
