import React, { useState, useEffect } from 'react'
import { PETS } from '@content/petConfig'
import { Reggie } from '../components/brand/Reggie'

export default function PetPickerScreen({
  initializePet,
  onHatch,
}) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [name, setName] = useState('')

  const active = PETS[selectedIdx] || PETS[0]

  // CRITICAL: Allow body to scroll when pet picker is shown
  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.body.style.height = 'auto'
    document.documentElement.style.overflow = 'auto'
    document.documentElement.style.height = 'auto'

    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.documentElement.style.overflow = ''
      document.documentElement.style.height = ''
    }
  }, [])

  async function handleHatch() {
    const finalName = name.trim() || active.defaultName
    await initializePet(active.id, finalName)
    onHatch()
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font-outfit)',
      padding: '40px 16px 60px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <div className="card-glass" style={{
        maxWidth: '640px',
        width: '100%',
        padding: '32px 24px',
        textAlign: 'center',
        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
        animation: 'fade-in 0.3s ease-out'
      }}>
        
        <div style={{ display: 'inline-block', animation: 'float 3s ease infinite', marginBottom: '12px' }}>
          <Reggie pose="happy" size={160} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', marginTop: '12px' }}>
          Hatch Your Study Buddy!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '4px', maxWidth: '460px', margin: '6px auto 28px' }}>
          Meet Reggie, your encouraging study companion! Your buddy grows, speaks, digests food, and helps you succeed.
        </p>

        {/* Eggs list grid */}
        {PETS.length > 1 && (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
            {PETS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedIdx(idx)}
                className="btn-duo-outline"
                style={{
                  width: '64px',
                  height: '64px',
                  padding: 0,
                  fontSize: '28px',
                  borderColor: selectedIdx === idx ? 'var(--brand)' : 'var(--border)',
                  backgroundColor: selectedIdx === idx ? 'var(--brand-bg)' : 'var(--surface)',
                  boxShadow: selectedIdx === idx ? '0 0 12px var(--shadow-glow)' : 'none',
                  cursor: 'pointer'
                }}
                title={p.name}
              >
                {p.emoji}
              </button>
            ))}
          </div>
        )}

        {/* Selected Egg Stats */}
        <div style={{
          backgroundColor: 'var(--surface-2)',
          border: '2px solid var(--border)',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'left',
          marginBottom: '28px'
        }}>
          <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{active.emoji}</span> {active.name} Egg
          </h3>
          <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--brand-dark)', marginTop: '4px' }}>
            ✨ Personality: {active.personality}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '18px' }}>
            "{active.tagline}"
          </p>

          {/* Name input */}
          <div className="auth-input-group" style={{ marginTop: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-muted)' }}>Name Your Buddy</label>
            <input
              type="text"
              placeholder={`e.g. ${active.defaultName}`}
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '2px solid var(--border)',
                fontSize: '14px',
                fontWeight: 700,
                backgroundColor: 'var(--surface)',
                outline: 'none',
                color: 'var(--text)',
                marginTop: '6px'
              }}
            />
          </div>
        </div>

        {/* Action Hatch Button */}
        <button
          className="btn-duo btn-duo-purple"
          style={{ width: '100%', padding: '16px', fontSize: '16px', fontWeight: 800, cursor: 'pointer' }}
          onClick={handleHatch}
        >
          🐣 Hatch Study Buddy Egg!
        </button>

      </div>
    </div>
  )
}
