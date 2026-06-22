import * as React from 'react';

export interface StatChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Preset metric — sets icon + accent color. */
  kind?: 'xp' | 'streak' | 'lives' | 'pro' | 'info';
  /** The value/label shown, e.g. "1,250 XP" or "7-day streak". */
  value?: React.ReactNode;
  /** Override the preset emoji/icon. */
  icon?: React.ReactNode;
  /** Override the preset accent color. */
  color?: string;
  /** Use a soft tinted background instead of white. */
  solid?: boolean;
}

/**
 * A gamification pill (XP, streak, lives, Pro). Each metric owns exactly one accent color.
 * @startingPoint section="Components" subtitle="XP / streak / lives / Pro chips" viewport="700x120"
 */
export function StatChip(props: StatChipProps): JSX.Element;
