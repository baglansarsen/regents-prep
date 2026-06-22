import React from 'react';

/**
 * ProgressBar — mint track with a green-gradient fill. The everyday progress meter
 * for lessons, units, and quizzes.
 */
export function ProgressBar({ value = 0, label, count, showMeta = true, height = 14, style = {} }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {showMeta && (label || count) && (
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: "var(--font-body, 'Nunito', sans-serif)", fontWeight: 700, fontSize: 13,
          color: 'var(--slate, #5B6B62)',
        }}>
          <span>{label}</span>
          <span>{count}</span>
        </div>
      )}
      <div style={{
        height, background: 'var(--mint-2, #D6F5E3)',
        borderRadius: 'var(--r-pill, 999px)', overflow: 'hidden', padding: 0,
      }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: 'linear-gradient(90deg, var(--forest, #0E9F52), var(--spark-green, #1FC36B))',
          borderRadius: 'var(--r-pill, 999px)', transition: 'width .4s ease',
        }} />
      </div>
    </div>
  );
}
