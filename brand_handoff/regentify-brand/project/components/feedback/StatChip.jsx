import React from 'react';

const PRESETS = {
  xp:     { icon: '🪙', color: '#0A7D40', tint: 'rgba(31,195,107,.10)' },
  streak: { icon: '🔥', color: '#FF5A5F', tint: 'rgba(255,90,95,.10)' },
  lives:  { icon: '❤️', color: '#FF5A5F', tint: 'rgba(255,90,95,.10)' },
  pro:    { icon: '⭐', color: '#7C5CFC', tint: 'rgba(124,92,252,.12)' },
  info:   { icon: 'ℹ️', color: '#34B3F1', tint: 'rgba(52,179,241,.12)' },
};

/**
 * StatChip — a gamification pill. Each metric owns one accent color.
 * Use `kind` for a preset (xp/streak/lives/pro/info) or pass your own icon/color.
 */
export function StatChip({ kind = 'xp', value, icon, color, solid = false, style = {}, ...rest }) {
  const p = PRESETS[kind] || PRESETS.xp;
  const ic = icon ?? p.icon;
  const col = color ?? p.color;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        background: solid ? p.tint : '#fff',
        border: `1px solid ${solid ? 'transparent' : 'var(--line, #E3EDE7)'}`,
        borderRadius: 'var(--r-pill, 999px)',
        padding: '8px 15px',
        fontFamily: "var(--font-body, 'Nunito', sans-serif)",
        fontWeight: 800, fontSize: 14, color: col, whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ fontSize: '1.05em', lineHeight: 1 }}>{ic}</span>
      {value}
    </span>
  );
}
