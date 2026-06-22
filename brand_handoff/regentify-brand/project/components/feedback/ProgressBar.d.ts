import * as React from 'react';

export interface ProgressBarProps {
  /** Fill percentage, 0–100. */
  value?: number;
  /** Left meta label (e.g. topic name). */
  label?: React.ReactNode;
  /** Right meta label (e.g. "12 / 18"). */
  count?: React.ReactNode;
  /** Show the label/count row above the track. */
  showMeta?: boolean;
  /** Track height in px. */
  height?: number;
  style?: React.CSSProperties;
}

/**
 * Mint track + green-gradient fill. The everyday progress meter.
 * @startingPoint section="Components" subtitle="Lesson / quiz progress meter" viewport="700x120"
 */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
