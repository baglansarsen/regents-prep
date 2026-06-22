import React from 'react';

const CSS = `
.rgf-choice{
  display: flex; align-items: flex-start; gap: 12px; width: 100%;
  background: #fff; border: 2px solid var(--line, #E3EDE7);
  border-radius: var(--r-lg, 18px); padding: 14px 16px;
  cursor: pointer; text-align: left; color: var(--ink, #0F2018);
  font-family: var(--font-body, 'Nunito', sans-serif); font-weight: 700; font-size: 15px;
  transition: border-color .15s, background .15s, transform .12s;
  -webkit-tap-highlight-color: transparent;
}
.rgf-choice:hover:not(:disabled):not(.is-correct):not(.is-wrong){
  border-color: var(--spark-green, #1FC36B); background: var(--mint-wash, #EAFBF1); transform: translateX(3px);
}
.rgf-choice:active:not(:disabled){ transform: translateX(1px); }
.rgf-choice:disabled{ cursor: default; }
.rgf-choice.is-correct{ border-color: var(--spark-green, #1FC36B); background: rgba(31,195,107,.12); }
.rgf-choice.is-wrong{ border-color: var(--coral, #FF5A5F); background: rgba(255,90,95,.10); }
.rgf-choice.is-dim{ opacity: .45; }

.rgf-choice__label{
  flex-shrink: 0; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  background: var(--mint-2, #D6F5E3); color: var(--green-deep, #0A7D40);
  border-radius: var(--r-sm, 10px); font-family: var(--font-display, 'Fredoka', sans-serif);
  font-weight: 700; font-size: 13px;
}
.rgf-choice.is-correct .rgf-choice__label{ background: var(--spark-green, #1FC36B); color: #fff; }
.rgf-choice.is-wrong   .rgf-choice__label{ background: var(--coral, #FF5A5F); color: #fff; }
.rgf-choice__text{ line-height: 1.45; padding-top: 3px; }
`;

let injected = false;
function inject() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-rgf', 'choice');
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * ChoiceButton — a single multiple-choice answer row used in quizzes.
 * Drive feedback by switching `state` after an answer is picked.
 */
export function ChoiceButton({ label, state = 'idle', disabled = false, className = '', children, ...rest }) {
  inject();
  const cls = [
    'rgf-choice',
    state === 'correct' ? 'is-correct' : '',
    state === 'wrong' ? 'is-wrong' : '',
    state === 'dim' ? 'is-dim' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button className={cls} disabled={disabled} {...rest}>
      {label != null && <span className="rgf-choice__label">{label}</span>}
      <span className="rgf-choice__text">{children}</span>
    </button>
  );
}
