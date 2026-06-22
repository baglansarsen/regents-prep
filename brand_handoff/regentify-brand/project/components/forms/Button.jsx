import React from 'react';

const CSS = `
.rgf-btn{
  font-family: var(--font-display, 'Fredoka', sans-serif);
  font-weight: 600; letter-spacing: .02em;
  border: none; cursor: pointer; color: #fff;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border-radius: var(--r-btn, 16px);
  transition: transform .06s ease, filter .15s ease, box-shadow .15s ease;
  -webkit-tap-highlight-color: transparent; user-select: none;
}
.rgf-btn--md{ padding: 14px 26px; font-size: 16px; }
.rgf-btn--lg{ padding: 17px 34px; font-size: 19px; }
.rgf-btn--sm{ padding: 10px 18px; font-size: 14px; }
.rgf-btn--full{ width: 100%; }

.rgf-btn--primary{ background: var(--spark-green, #1FC36B); box-shadow: var(--pop-green, 0 5px 0 #0E9F52); }
.rgf-btn--primary:hover{ filter: brightness(1.04); }
.rgf-btn--secondary{ background: #fff; color: var(--green-deep, #0A7D40); border: 1px solid var(--line, #E3EDE7); box-shadow: var(--pop-grey, 0 5px 0 #E3EDE7); }
.rgf-btn--secondary:hover{ background: var(--mint-wash, #EAFBF1); }
.rgf-btn--pro{ background: var(--violet, #7C5CFC); box-shadow: var(--pop-violet, 0 5px 0 #5b3fd1); }
.rgf-btn--pro:hover{ filter: brightness(1.05); }
.rgf-btn--danger{ background: var(--coral, #FF5A5F); box-shadow: var(--pop-coral, 0 5px 0 #d8403f); }

.rgf-btn:active:not(:disabled){ transform: translateY(3px); box-shadow: 0 2px 0 var(--shadow-pop-color, transparent); }
.rgf-btn--primary:active:not(:disabled){ box-shadow: 0 2px 0 var(--forest,#0E9F52); }
.rgf-btn--secondary:active:not(:disabled){ box-shadow: 0 2px 0 var(--line,#E3EDE7); }
.rgf-btn--pro:active:not(:disabled){ box-shadow: 0 2px 0 #5b3fd1; }
.rgf-btn--danger:active:not(:disabled){ box-shadow: 0 2px 0 #d8403f; }

.rgf-btn:disabled{ opacity: .5; cursor: not-allowed; box-shadow: none; transform: none; }
`;

let injected = false;
function inject() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const s = document.createElement('style');
  s.setAttribute('data-rgf', 'button');
  s.textContent = CSS;
  document.head.appendChild(s);
}

/**
 * Button — the signature chunky, tappable Regentify button with a solid "pop" shadow.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  icon = null,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  inject();
  const cls = [
    'rgf-btn',
    `rgf-btn--${variant}`,
    `rgf-btn--${size}`,
    full ? 'rgf-btn--full' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} disabled={disabled} {...rest}>
      {icon && <span aria-hidden="true" style={{ display: 'inline-flex', fontSize: '1.1em' }}>{icon}</span>}
      {children}
    </button>
  );
}
