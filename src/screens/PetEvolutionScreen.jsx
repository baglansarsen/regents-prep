import { useEffect, useState } from 'react'
import { PETS, STAGE_NAMES } from '@content/petConfig'

export default function PetEvolutionScreen({ pet, onDismiss, theme }) {
  const [show, setShow] = useState(false)
  const isDark = theme === 'dark'

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  const petType  = PETS?.find?.((p) => p.id === pet?.petType)
  const newEmoji = petType?.stages?.[( pet?.stage ?? 1) - 1] ?? petType?.emoji ?? '🌟'
  const stageName = STAGE_NAMES?.[pet?.stage] ?? `Stage ${pet?.stage}`

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: isDark ? '#1e293b' : '#fff',
        borderRadius: 24, padding: '40px 32px', textAlign: 'center', maxWidth: 340, width: '90%',
        transform: show ? 'scale(1)' : 'scale(0.8)',
        opacity: show ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s',
      }}>
        <div style={{ fontSize: 80, marginBottom: 16, lineHeight: 1 }}>{newEmoji}</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: 8 }}>
          {pet?.name ?? 'Your pet'} evolved!
        </h2>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 24 }}>
          Reached <strong style={{ color: '#6366f1' }}>{stageName}</strong> stage! 🌟
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {['✨', '🎉', '⭐', '💫', '🏆'].map((e, i) => (
            <span key={i} style={{ fontSize: 28, animation: 'none' }}>{e}</span>
          ))}
        </div>
        <button
          onClick={onDismiss}
          style={{
            width: '100%', padding: '14px 0', borderRadius: 14, border: 'none',
            background: '#6366f1', color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer',
          }}
        >
          Amazing! 🎊
        </button>
      </div>
    </div>
  )
}
