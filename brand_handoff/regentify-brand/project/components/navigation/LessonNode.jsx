import React from 'react';

/**
 * LessonNode — a circular node on the Duolingo-style study path.
 * `done` = filled green w/ glow, `active` = pulsing brand ring (the next lesson),
 * `locked` = greyed. Show an emoji/number inside.
 */
export function LessonNode({ state = 'active', icon = '★', label, color = '#1FC36B', size = 72, onClick, style = {}, ...rest }) {
  const done = state === 'done';
  const locked = state === 'locked';
  const active = state === 'active';
  const ring = locked ? '#C7D6CD' : color;
  const bg = done
    ? `linear-gradient(135deg, ${color}, var(--forest, #0E9F52))`
    : locked ? 'var(--mint-2, #D6F5E3)' : '#fff';
  return (
    <button
      onClick={locked ? undefined : onClick}
      disabled={locked}
      title={label}
      style={{
        width: size, height: size, borderRadius: '50%', border: 'none',
        background: bg,
        boxShadow: `0 0 0 4px ${ring}${done ? '' : ''}, ${done ? `0 6px 16px ${color}55` : '0 4px 0 ' + (locked ? '#C7D6CD' : color)}`,
        outlineOffset: 2,
        cursor: locked ? 'not-allowed' : 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
        fontFamily: "var(--font-display, 'Fredoka', sans-serif)", fontWeight: 700,
        transition: 'transform .12s ease',
        opacity: locked ? 0.85 : 1,
        ...style,
      }}
      onMouseDown={(e) => { if (!locked) e.currentTarget.style.transform = 'translateY(3px)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      <span style={{ fontSize: size * 0.34, lineHeight: 1, color: done ? '#fff' : locked ? '#8FA89A' : 'var(--ink,#0F2018)' }}>
        {locked ? '🔒' : icon}
      </span>
      {label && (
        <span style={{ fontSize: 10, fontWeight: 700, color: done ? 'rgba(255,255,255,.9)' : 'var(--slate,#5B6B62)' }}>{label}</span>
      )}
    </button>
  );
}
