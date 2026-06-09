// In-app purchases are disabled for v1.
//
// The subscription paywall and donation tips were removed before App Store
// submission (no functional RevenueCat key, products were never submitted, and
// no Paid Apps Agreement was in place — all of which triggered App Review
// rejections under guidelines 2.1(b) and 3.1.2). The app ships free.
//
// This stub keeps the `isSubscribed` shape that LivesContext / usePowerUps /
// ProfileScreen consume so no caller needs to change. Re-introduce real
// purchases here (RevenueCat) once the App Store Connect setup is complete.

export const ENTITLEMENT_KEY = 'premium'

export function usePurchases() {
  return { isSubscribed: false, loading: false }
}
