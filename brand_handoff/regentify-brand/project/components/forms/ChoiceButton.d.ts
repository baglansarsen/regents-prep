import * as React from 'react';

export interface ChoiceButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Short label badge, e.g. "A", "B", "1". */
  label?: React.ReactNode;
  /** Answer feedback state. */
  state?: 'idle' | 'correct' | 'wrong' | 'dim';
  children?: React.ReactNode;
}

/**
 * A multiple-choice answer row. Set `state` to `correct`/`wrong`/`dim` after the user answers.
 */
export function ChoiceButton(props: ChoiceButtonProps): JSX.Element;
