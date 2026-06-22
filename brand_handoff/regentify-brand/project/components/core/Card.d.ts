import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show the 2px green selection border. */
  selected?: boolean;
  /** Add hover-lift + pointer (for tappable cards). */
  interactive?: boolean;
  /** Inner padding in px. */
  pad?: number;
  children?: React.ReactNode;
}

/**
 * Soft white surface card with the brand shadow.
 * @startingPoint section="Components" subtitle="Card surface — default / selected / interactive" viewport="700x180"
 */
export function Card(props: CardProps): JSX.Element;
