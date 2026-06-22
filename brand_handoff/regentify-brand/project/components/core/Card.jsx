import React from 'react';

const CSS = `
.rgf-card{
  background: var(--paper, #fff);
  border: 1px solid var(--line, #E3EDE7);
  border-radius: var(--r-xl, 22px);
  box-shadow: var(--shadow-card, 0 10px 30px rgba(15,32,24,.08));
}
.rgf-card--selected{ border: 2px solid var(--spark-green, #1FC36B); }
.rgf-card--interactive{ cursor: pointer; transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
.rgf-card--interactive:hover{
  transform: translateY(-2px);
  border-color: var(--spark-green, #1FC36B);
  box-shadow: var(--shadow-float, 0 14px 40px rgba(15,32,24,.12));
}
.rgf-card--interactive:active{ transform: translateY(0); }
`;

let injected = false;
function inject() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-rgf', 'card');
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Card — the soft white surface used everywhere. Optional selected (green border)
 * and interactive (hover lift) modes.
 */
export function Card({ selected = false, interactive = false, pad = 22, className = '', style = {}, children, ...rest }) {
  inject();
  const cls = [
    'rgf-card',
    selected ? 'rgf-card--selected' : '',
    interactive ? 'rgf-card--interactive' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <div className={cls} style={{ padding: pad, ...style }} {...rest}>
      {children}
    </div>
  );
}
