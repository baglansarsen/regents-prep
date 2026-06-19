/**
 * Product analytics — DISABLED.
 *
 * All tracking was removed for now (the Firebase JS `firebase/analytics` SDK is
 * browser-only and can't run in React Native, and we're deferring a proper GA
 * setup). `logEvent` is kept as a no-op so the existing call sites across the
 * app keep working untouched. Re-implement here when we add analytics back
 * (e.g. via @react-native-firebase/analytics).
 */
export function logEvent(_name, _params = {}) {
  // intentionally a no-op
}
