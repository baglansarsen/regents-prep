/**
 * adTracking — App Tracking Transparency (ATT) helper.
 *
 * Apple requires the ATT prompt to be shown before the advertising identifier
 * (IDFA) is accessed, so requestAdTracking() must run *before* AdMob is
 * initialized. expo-tracking-transparency is lazy-loaded and wrapped in
 * try/catch so it no-ops cleanly in Expo Go / on web where the native module
 * is absent (mirrors the AdMob guard pattern used elsewhere in the app).
 */

let _granted = false

/** Whether the user granted ATT — drives personalized vs. non-personalized ads. */
export function isAdTrackingGranted() {
  return _granted
}

/**
 * Shows the ATT prompt (iOS 14+) and caches the result. Safe to call anywhere;
 * resolves to false if the native module is unavailable or the user declines.
 */
export async function requestAdTracking() {
  try {
    // Importing expo-tracking-transparency itself throws if the native module is
    // not in the binary (Expo Go, web, or a build without the plugin). Probe with
    // requireOptionalNativeModule first — it returns null instead of throwing — so
    // we never trigger that error and simply fall back to non-personalized ads.
    const { requireOptionalNativeModule } = require('expo-modules-core')
    if (!requireOptionalNativeModule?.('ExpoTrackingTransparency')) return false

    const tt = await import('expo-tracking-transparency')
    if (!tt?.requestTrackingPermissionsAsync) return false
    const { status } = await tt.requestTrackingPermissionsAsync()
    _granted = status === 'granted'
  } catch {
    // Native module absent (Expo Go / web) or prompt unavailable — leave non-personalized.
    _granted = false
  }
  return _granted
}
