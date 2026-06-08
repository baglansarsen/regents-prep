import React from 'react'
import { FOOD_ITEMS, HAPPINESS_ITEMS, COSMETICS } from '@content/petConfig'

export default function PetShopScreen({
  xp,
  spendXP,
  inventory = {},
  addInventory,
  pet = {},
  toggleCosmetic,
  switchBuddy,
}) {
  
  async function buyItem(item) {
    if (xp < item.cost) {
      alert('Insufficient XP! Keep studying lessons to earn more XP! ⭐')
      return
    }
    const confirmed = confirm(`Spend ${item.cost} XP to purchase ${item.icon} ${item.name}?`)
    if (!confirmed) return

    const success = await spendXP(item.cost)
    if (success) {
      await addInventory(item.id, 1)
      alert(`Successfully bought ${item.name}! Added to your inventory. 🎒`)
    } else {
      alert('Failed to complete purchase.')
    }
  }

  async function equipItem(item) {
    await toggleCosmetic(item.id)
  }

  const activeAccessories = pet.accessories || []

  return (
    <div className="screen-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '900px', width: '100%', margin: '0 auto' }}>
        
        {/* Title Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>🛒</span> Buddy Shop & Sanctuary
          </h1>
          <div className="stat-badge xp">
            ⭐ {xp} XP Available
          </div>
        </div>

        {/* Live Dressing Cabin */}
        {pet.chosen && (
          <div className="card-glass" style={{
            background: 'linear-gradient(135deg, #1e1b4b, #0f172a)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '28px',
            borderRadius: '16px',
            textAlign: 'center',
            border: '2px solid var(--purple)',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '20px', color: '#fff', marginBottom: '16px' }}>
              👚 Dressing Cabin: {pet.name || 'Your Buddy'}
            </h2>
            
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: 'var(--surface-3)',
              border: '3px dashed var(--purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '80px',
              position: 'relative',
              margin: '0 auto 12px',
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.4)'
            }}>
              <span className="pet-sprite" style={{ fontSize: '80px' }}>
                {pet.petType === 'axolotl' ? '🦎' : pet.petType === 'fox' ? '🦊' : pet.petType === 'capybara' ? '🦫' : pet.petType === 'bear' ? '🐻' : pet.petType === 'bunny' ? '🐰' : '🐱'}
              </span>

              {/* Layered cosmetics */}
              {activeAccessories.includes('graduationCap') && <span style={{ position: 'absolute', top: '12px', fontSize: '28px' }}>🎓</span>}
              {activeAccessories.includes('wizardHat') && <span style={{ position: 'absolute', top: '12px', fontSize: '28px' }}>🧙</span>}
              {activeAccessories.includes('cowboyHat') && <span style={{ position: 'absolute', top: '12px', fontSize: '28px' }}>🤠</span>}
              {activeAccessories.includes('crown') && <span style={{ position: 'absolute', top: '12px', fontSize: '28px' }}>👑</span>}
              {activeAccessories.includes('sunglasses') && <span style={{ position: 'absolute', top: '38px', fontSize: '28px' }}>🕶️</span>}
              {activeAccessories.includes('tinyBackpack') && <span style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '28px' }}>🎒</span>}
              {activeAccessories.includes('glowAura') && <span style={{ position: 'absolute', inset: 0, fontSize: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 1.5s infinite', opacity: 0.3 }}>✨</span>}
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', lineHeight: '18px' }}>
              Select accessories from the boutique below to dress up your buddy. All purchases are completely free and paid using your study XP!
            </p>
          </div>
        )}

        {/* Section: Snacks */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '20px', marginBottom: '12px' }}>🍖 Nourishing Snacks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {FOOD_ITEMS.map((item) => {
              const owned = inventory[item.id] || 0
              return (
                <div key={item.id} className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '40px', background: 'var(--surface-2)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '16px' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '16px' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid var(--border)', paddingTop: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-dim)' }}>
                      Owned: {owned}
                    </span>
                    <button
                      className="btn-duo btn-duo-outline"
                      style={{ padding: '8px 16px', fontSize: '13px', borderBottomWidth: '2.5px' }}
                      onClick={() => buyItem(item)}
                    >
                      🏷️ {item.cost} XP
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Section: Happiness Toys */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '20px', marginBottom: '12px' }}>⚽ Interactive Play Toys</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {HAPPINESS_ITEMS.map((item) => {
              const owned = inventory[item.id] || 0
              return (
                <div key={item.id} className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '40px', background: 'var(--surface-2)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '16px' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '16px' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid var(--border)', paddingTop: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-dim)' }}>
                      Owned: {owned}
                    </span>
                    <button
                      className="btn-duo btn-duo-outline"
                      style={{ padding: '8px 16px', fontSize: '13px', borderBottomWidth: '2.5px' }}
                      onClick={() => buyItem(item)}
                    >
                      🏷️ {item.cost} XP
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Section: Cosmetics */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '20px', marginBottom: '12px' }}>🎓 Cosmetics & Gear</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {COSMETICS.map((item) => {
              const owned = inventory[item.id] > 0
              const isEquipped = activeAccessories.includes(item.id)

              return (
                <div key={item.id} className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '40px', background: 'var(--surface-2)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '16px' }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '16px' }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid var(--border)', paddingTop: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: isEquipped ? 'var(--brand-dark)' : 'var(--text-dim)' }}>
                      {isEquipped ? '⭐ Equipped' : owned ? 'Owned' : 'Not purchased'}
                    </span>
                    
                    {owned ? (
                      <button
                        className={`btn-duo ${isEquipped ? 'btn-duo-outline' : 'btn-duo-purple'}`}
                        style={{ padding: '8px 16px', fontSize: '13px', borderBottomWidth: '2.5px' }}
                        onClick={() => equipItem(item)}
                      >
                        {isEquipped ? 'Unequip' : 'Equip'}
                      </button>
                    ) : (
                      <button
                        className="btn-duo btn-duo-outline"
                        style={{ padding: '8px 16px', fontSize: '13px', borderBottomWidth: '2.5px' }}
                        onClick={() => buyItem(item)}
                      >
                        🏷️ {item.cost} XP
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Section: Switch Buddy */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '20px', marginBottom: '12px' }}>🦎 Choose Another Egg (Hatch New Buddy)</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Want to study with a different personality? Switch your study buddy below (transfers current evolution stage and name).
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['axolotl', 'fox', 'capybara', 'bear', 'bunny', 'voidCat'].map((buddy) => {
              const emoji = buddy === 'axolotl' ? '🦎' : buddy === 'fox' ? '🦊' : buddy === 'capybara' ? '🦫' : buddy === 'bear' ? '🐻' : buddy === 'bunny' ? '🐰' : '🐱'
              const isActive = pet.petType === buddy
              return (
                <button
                  key={buddy}
                  className={`btn-duo-outline ${isActive ? 'active' : ''}`}
                  style={{
                    padding: '12px 18px',
                    borderColor: isActive ? 'var(--brand)' : 'var(--border)',
                    background: isActive ? 'var(--brand-bg)' : 'var(--surface)',
                    color: isActive ? 'var(--brand-dark)' : 'var(--text)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  disabled={isActive}
                  onClick={() => {
                    if (confirm(`Switch your buddy egg to ${buddy}?`)) {
                      switchBuddy(buddy)
                    }
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{emoji}</span> {buddy}
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
