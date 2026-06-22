import AsyncStorage from '@react-native-async-storage/async-storage'

// Once-ever flag so we only ever surface the native rating sheet a single time
// per device. (iOS also rate-limits SKStoreReviewController to ~3 prompts/year.)
const REVIEW_ASKED_KEY = '@regents_review_asked_v1'

// Lazy-require with null fallback so the app never crashes in Expo Go, where the
// native module is absent (same guard pattern as hooks/useAuth.js, adTracking.js).
let _StoreReview = null
try {
  _StoreReview = require('expo-store-review')
} catch {
  // native module not linked in this build
}

/**
 * Surface the OS rating sheet, once ever, if it's available. Never throws and
 * never blocks the UI — safe to fire-and-forget from a side effect.
 */
export async function maybeRequestReview() {
  if (!_StoreReview) return
  try {
    if (await AsyncStorage.getItem(REVIEW_ASKED_KEY)) return // already asked
    const available = await _StoreReview.isAvailableAsync?.()
    if (!available) return
    await _StoreReview.requestReview()
    // Set the flag only after the request resolves, so a skipped/failed attempt
    // can retry on a later streak day.
    await AsyncStorage.setItem(REVIEW_ASKED_KEY, '1')
  } catch {
    // swallow — a review prompt must never break the experience
  }
}
