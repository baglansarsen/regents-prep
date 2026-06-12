/**
 * goalConfig — the three Regents goal tiers a student can commit to.
 * Values map to real NY Regents thresholds: 65 passing, 85 mastery
 * (with 75 as a comfortable safety margin above the pass line).
 */

export const GOAL_TIERS = [
  {
    value: 65,
    label: 'Pass',
    icon:  '✅',
    blurb: 'Cross the line — earn the credit you need to graduate.',
  },
  {
    value: 75,
    label: 'Safe Pass',
    icon:  '🛡️',
    blurb: 'A comfortable cushion above the passing score.',
  },
  {
    value: 85,
    label: 'Mastery',
    icon:  '🏆',
    blurb: 'Mastery level — the score colleges love to see.',
  },
]

export function tierFor(value) {
  return GOAL_TIERS.find((t) => t.value === value) ?? GOAL_TIERS[0]
}
