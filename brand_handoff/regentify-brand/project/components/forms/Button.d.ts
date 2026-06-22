import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` = green, `secondary` = white outline, `pro` = violet, `danger` = coral. */
  variant?: 'primary' | 'secondary' | 'pro' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to container width. */
  full?: boolean;
  /** Optional leading icon/emoji node. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Chunky, tappable button with the signature 5px "pop" shadow (presses down 3px).
 * One primary action per screen.
 * @startingPoint section="Components" subtitle="Pop buttons — primary / secondary / pro" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
