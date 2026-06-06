export const LEVELS = [
  { level: 1,  xpMin: 0,     title: 'Cell Apprentice',        emoji: '🔬' },
  { level: 2,  xpMin: 250,   title: 'Bio Explorer',            emoji: '🌱' },
  { level: 3,  xpMin: 600,   title: 'Lab Scientist',           emoji: '🧪' },
  { level: 4,  xpMin: 1200,  title: 'Field Researcher',        emoji: '🦋' },
  { level: 5,  xpMin: 2200,  title: 'Bio Analyst',             emoji: '🧬' },
  { level: 6,  xpMin: 3800,  title: 'Science Scholar',         emoji: '📚' },
  { level: 7,  xpMin: 6000,  title: 'Master Biologist',        emoji: '🏆' },
  { level: 8,  xpMin: 9000,  title: 'Regents Expert',          emoji: '⭐' },
  { level: 9,  xpMin: 13000, title: 'Distinguished Scientist', emoji: '🎓' },
  { level: 10, xpMin: 18000, title: 'Regents Champion',        emoji: '👑' },
]

export function getLevel(xp) {
  let idx = 0
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xpMin) idx = i
    else break
  }
  const current = LEVELS[idx]
  const next    = LEVELS[idx + 1] ?? null
  const xpSpan  = next ? next.xpMin - current.xpMin : 1
  return {
    ...current,
    next,
    progress:  next ? Math.min(1, (xp - current.xpMin) / xpSpan) : 1,
    xpToNext:  next ? Math.max(0, next.xpMin - rp  : 0,
  }
}

export function regentsXP(scaled) {
  if (scaled >= 90) return 500
  if (scaled >= 80) return 350
  if (scaled >= 65) return 200
  if (scaled >= 50) return 100
  return 50
}
