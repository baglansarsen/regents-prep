import * as React from 'react';

export interface LessonNodeProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Path state. */
  state?: 'done' | 'active' | 'locked';
  /** Emoji or short content inside the circle. */
  icon?: React.ReactNode;
  /** Small caption under the icon. */
  label?: React.ReactNode;
  /** Ring/fill accent color (defaults to Spark Green). */
  color?: string;
  /** Diameter in px. */
  size?: number;
}

/**
 * A circular node on the Duolingo-style study path.
 * @startingPoint section="Components" subtitle="Study-path lesson node — done / active / locked" viewport="700x160"
 */
export function LessonNode(props: LessonNodeProps): JSX.Element;
