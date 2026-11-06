import { Easing, Platform } from 'react-native'

// Shared motion vocabulary — see docs/designs/animation-plan.md §2.
// Use these instead of ad-hoc durations/springs so the app moves as one system.

export const DUR = {
  instant:   90,
  fast:      150,
  base:      250,
  slow:      400,
  celebrate: 1200,
}

export const SPRING = {
  snappy: { tension: 400, friction: 22 },  // presses, selection
  bouncy: { tension: 300, friction: 10 },  // verdicts, pops
  gentle: { tension: 120, friction: 14 },  // sheets, panels
}

export const EASE = {
  out:   Easing.out(Easing.cubic),
  inOut: Easing.inOut(Easing.cubic),
}

// Height of the 3D ledge under a Duo button (matches duoBtn's borderBottomWidth).
export const LEDGE = 4

// RN-web has no native animation driver; asking for it there only logs a warning.
export const NATIVE_DRIVER = Platform.OS !== 'web'
