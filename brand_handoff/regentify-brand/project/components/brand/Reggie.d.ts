import * as React from 'react';

export interface ReggieProps {
  /** Emotional pose — drives the app's mascot moments. */
  pose?: 'happy' | 'cheer' | 'think' | 'sleepy' | 'wave';
  /** Rendered width & height in px (square). */
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Accessible label override. */
  title?: string;
}

/**
 * Reggie — the Regentify mascot. A friendly baby dino in a graduation cap.
 * @startingPoint section="Brand" subtitle="Mascot with 5 expression poses" viewport="700x320"
 */
export function Reggie(props: ReggieProps): JSX.Element;
