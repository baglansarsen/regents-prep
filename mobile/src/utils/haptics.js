/**
 * haptics — thin guarded wrapper around expo-haptics.
 *
 * Lazy-required so it no-ops cleanly where the native module is absent
 * (Expo Go, web, or a dev build predating the dependency). Mirrors the
 * native-module guard pattern used elsewhere in the app.
 */
let H = null
try {
  H = require('expo-haptics')
} catch {
  // native module not linked in this build
}

export function hapticTick() {
  try { H?.impactAsync?.(H.ImpactFeedbackStyle.Light) } catch {}
}

export function hapticSuccess() {
  try { H?.notificationAsync?.(H.NotificationFeedbackType.Success) } catch {}
}

export function hapticWarning() {
  try { H?.notificationAsync?.(H.NotificationFeedbackType.Warning) } catch {}
}
