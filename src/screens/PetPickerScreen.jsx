import { useState } from 'react'
import { PETS } from '@content/petConfig'

export default function PetPickerScreen({ onComplete, theme }) {
  const [selected, setSelected] = useState(null)
  const [name, setName] = useState('')
  const isDark = theme === 'dark'

  const pets = PETS ?? []

  function handleConfirm() {
    if (!selected) return
    const petName = name.trim() || pets.find((p) => p.id === selected)?.name || 'Buddy'
    onComplete(selected, petName)
  }

  return (
    <div style={{ minHeight: '100vh', background: isDark ? '#0f172a' : '#f8fafc', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: 8, textAlign: 'center' }}>Choose Your Study Buddy</h1>
      <p style={{ color: '#94a3b8', marginBottom: 32, textAlign: 'center' }}>Your pet grows with you as you earn XP!</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, width: '100%', maxWidth: 400, marginBottom: 28 }}>
        {pets.map((pet) => (
          <button
            key={pet.id}
            onClick={() => setSelected(pet.id)}
            style={{
              padding: '20px 12px', borderRadius: 16, border: `2px solid ${selected === pet.id ? '#6366f1' : (isDark ? '#334155' : '#e2e8f0')}`,
              background: selected === pet.id ? (isDark ? '#1e1b4b' : '#eef2ff') : (isDark ? '#1e293b' : '#fff'),
              cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: 42 }}>{pet.stages?.[0] ?? pet.emoji}</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: isDark ? '#f1f5f9' : '#1e293b' }}>{pet.name}</span>
            <span style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', lineHeight: 1.4 }}>{pet.description}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div style={{ width: '100%', maxWidth: 400, marginBottom: 20 }}>
          <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: isDark ? '#cbd5e1' : '#374151', marginBottom: 6 }}>
            Give your buddy a name (optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={pets.find((p) => p.id === selected)?.name ?? 'Buddy'}
            maxLength={20}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10, fontSize: 15,
              border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`,
              background: isDark ? '#1e293b' : '#fff', color: isDark ? '#f1f5f9' : '#1e293b',
              boxSizing: 'border-box', outline: 'none',
            }}
          />
        </div>
      )}

      <button
        disabled={!selected}
        onClick={handleConfirm}
        style={{
          width: '100%', maxWidth: 400, padding: '14px 0', borderRadius: 14, border: 'none',
          background: selected ? '#6366f1' : '#d1d5db', color: '#fff',
          fontWeight: 700, fontSize: 16, cursor: selected ? 'pointer' : 'not-allowed',
          transition: 'background 0.15s',
        }}
      >
        {selected ? `Choose ${pets.find((p) => p.id === selected)?.name}!` : 'Pick a buddy first'}
      </button>
    </div>
  )
}
