import React, { useState } from 'react'
import { PETS } from '@content/petConfig'

export default function PetPickerScreen({
  initializePet,
  onHatch,
}) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [name, setName] = useState('')

  const active = PETS[selectedIdx] || PETS[0]

  async function handleHatch() {
    const finalName = name.trim() || active.defaultName
    await initializePet(active.id, finalName)
    onHatch()
  }

  return (
    <div className="screen-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="card-glass" style={{ maxWidth: '640px', width: '100%', padding: '40px', textAlign: 'center' }}>
        
        <span style={{ fontSize: '72px', animation: 'float 3s ease infinite' }}>🥚</span>
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', marginTop: '12px' }}>
          Hatch Your Study Buddy!
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '4px', maxWidth: '460px', margin: '6px auto 28px' }}>
          Hatch an egg to study alongside! Your buddy grows, speaks, digests food, and helps you succeed.
        </p>

        {/* Eggs list grid */}
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
                boxShadow: selectedIdx === idx ? '0 0 12px var(--shadow-glow)' : 'none'
              }}
              title={p.name}
            >
              {p.emoji}
            </button>
          ))}
        </div>

        {/* Selected Egg Stats */}
        <div style={{
          backgroundColor: 'var(--surface-2)',
          border: '1.5px solid var(--border)',
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
            <label>Name Your Buddy</label>
            <input
              type="text"
              placeholder={`e.g. ${active.defaultName}`}
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
            />
          </div>
        </div>

        {/* Action Hatch Button */}
        <button
          className="btn-duo btn-duo-purple"
          style={{ width: '100%', padding: '14px' }}
          onClick={handleHatch}
        >
          🐣 Hatch Study Buddy Egg!
        </button>

      </div>
    </div>
  )
}
