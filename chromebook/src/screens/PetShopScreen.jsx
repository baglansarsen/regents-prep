import React, { useState, useEffect } from 'react'
import { FOOD_ITEMS, HAPPINESS_ITEMS, COSMETICS } from '@content/petConfig'
import { Reggie } from '../components/brand/Reggie'

export default function PetShopScreen({
  xp,
  spendXP,
  inventory = {},
  addInventory,
  pet = {},
  toggleCosmetic,
  switchBuddy,
  buyFreeze = () => {},
  hasFreeze = false,
  activateXPBoost = () => {},
  doubleXPEndTime = 0
}) {
  
  // local ticker for boost time
  const initialSecondsLeft = Math.max(0, Math.floor((doubleXPEndTime - Date.now()) / 1000));
  const [timeLeft, setTimeLeft] = useState(initialSecondsLeft);

  useEffect(() => {
    setTimeLeft(initialSecondsLeft);
  }, [doubleXPEndTime]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  function formatBoostTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  }

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



  async function handleBuyFreeze() {
    if (hasFreeze) return
    const confirmed = confirm(`Spend 200 XP to purchase a Streak Freeze? 🧊`)
    if (!confirmed) return

    const result = await buyFreeze(spendXP)
    if (result === 'success') {
      alert('Streak Freeze successfully purchased and activated! 🧊')
    } else if (result === 'insufficient_xp') {
      alert('Insufficient XP! You need 200 XP to buy a Streak Freeze. ⭐')
    }
  }

  async function handleBuyBoost() {
    const active = timeLeft > 0;
    if (active) return
    const confirmed = confirm(`Spend 500 XP to purchase a 10-minute Double XP Boost? ⚡`)
    if (!confirmed) return

    const result = await activateXPBoost(600, 500)
    if (result === 'success') {
      alert('Double XP Boost successfully activated! All correct quiz answers will earn 2x XP for the next 10 minutes. ⚡')
    } else if (result === 'insufficient_xp') {
      alert('Insufficient XP! You need 500 XP to buy a Double XP Boost. ⭐')
    }
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
              position: 'relative',
              margin: '0 auto 12px',
              boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.4)',
              overflow: 'hidden'
            }}>
              <Reggie size={100} accessories={activeAccessories} />
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto', lineHeight: '18px' }}>
              Select accessories from the boutique below to dress up your buddy. All purchases are completely free and paid using your study XP!
            </p>
          </div>
        )}

        {/* Section: Study Boosts & Power-Ups */}
        <div>
          <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '20px', marginBottom: '12px' }}>⚡ Study Boosts & Power-Ups</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            
            {/* 1. Double XP Boost */}
            <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '40px', background: 'var(--purple-bg)', color: 'var(--purple-dark)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ⚡
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '16px' }}>
                    2× XP Boost
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '16px' }}>
                    Double all study XP earned on correct answers for 10 minutes.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid var(--border)', paddingTop: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: timeLeft > 0 ? 'var(--purple-dark)' : 'var(--text-dim)' }}>
                  {timeLeft > 0 ? `⏱️ ${formatBoostTime(timeLeft)} active` : 'Inactive'}
                </span>
                <button
                  className={`btn-duo ${timeLeft > 0 ? 'btn-duo-outline' : 'btn-duo-purple'}`}
                  style={{ padding: '8px 16px', fontSize: '13px', borderBottomWidth: '2.5px' }}
                  onClick={handleBuyBoost}
                  disabled={timeLeft > 0}
                >
                  {timeLeft > 0 ? 'Active' : '🏷️ 500 XP'}
                </button>
              </div>
            </div>

            {/* 2. Streak Freeze */}
            <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '40px', background: 'var(--blue-bg)', color: 'var(--blue-dark)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  🧊
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '16px' }}>
                    Streak Freeze
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '16px' }}>
                    Protect your daily streak for one missed day. Used automatically.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid var(--border)', paddingTop: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: hasFreeze ? 'var(--blue-dark)' : 'var(--text-dim)' }}>
                  {hasFreeze ? '🧊 Protected' : 'Not owned'}
                </span>
                <button
                  className={`btn-duo ${hasFreeze ? 'btn-duo-outline' : 'btn-duo-purple'}`}
                  style={{ padding: '8px 16px', fontSize: '13px', borderBottomWidth: '2.5px' }}
                  onClick={handleBuyFreeze}
                  disabled={hasFreeze}
                >
                  {hasFreeze ? 'Protected' : '🏷️ 200 XP'}
                </button>
              </div>
            </div>



          </div>
        </div>

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



      </div>
    </div>
  )
}
