import { useState, useEffect, useCallback } from 'react'
import { Alert, Platform } from 'react-native'

// Lazy-load RevenueCat — absent on web/Expo Go, present in native builds
let Purchases = null
let LOG_LEVEL = null
if (Platform.OS !== 'web') {
  try {
    const RC = require('react-native-purchases')
    Purchases = RC.default
    LOG_LEVEL = RC.LOG_LEVEL
  } catch (_) {}
}

// RevenueCat Test Store keys — let us exercise the full purchase flow without
// App Store Connect / Google Play products. NOTE: these do NOT charge real money
// and do NOT use real App Store products; swap in production `appl_` / `goog_`
// keys (and configure real IAP products + Paid Apps Agreement) before App Store
// release, or purchases will fail against the live store.
const RC_API_KEY_IOS     = 'test_AfUgVDbhzDNlbAlRSxHlDCvaMoW'
const RC_API_KEY_ANDROID = 'test_AfUgVDbhzDNlbAlRSxHlDCvaMoW'

// Guard: skip configure() if key is still a placeholder.
// With New Architecture (TurboModules), RevenueCat throws a native NSException
// for an invalid key — this crashes the C++ JSI bridge (SIGABRT on turbomodulemanager
// queue) before JS try/catch can fire.
const RC_CONFIGURED = !RC_API_KEY_IOS.includes('REPLACE_WITH')

// Pricing (set in App Store Connect): monthly $4.99 · season (3-month) $9.99 ·
// yearly $24.99. The Season Pass is the featured plan — it matches the
// Feb–June Regents study window.
export const PRODUCT_IDS = {
  MONTHLY : 'unlimited_hearts_monthly',
  SEASON  : 'unlimited_hearts_season',   // 3-month auto-renewable
  YEARLY  : 'unlimited_hearts_yearly',
  TIP_5   : 'tip_5',
  TIP_10  : 'tip_10',
  TIP_25  : 'tip_25',
}

export const ENTITLEMENT_KEY = 'premium'

const noop = async () => false
const isWeb = Platform.OS === 'web'

export function usePurchases(uid) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading,      setLoading]      = useState(false)

  // All hooks must be called unconditionally — gate behavior inside them
  useEffect(() => {
    if (isWeb || !Purchases || !RC_CONFIGURED) return
    async function init() {
      try {
        if (LOG_LEVEL && __DEV__) Purchases.setLogLevel(LOG_LEVEL.VERBOSE)
        const key = Platform.OS === 'ios' ? RC_API_KEY_IOS : RC_API_KEY_ANDROID
        await Purchases.configure({ apiKey: key, appUserID: uid ?? null })
        const info   = await Purchases.getCustomerInfo()
        const active = !!info.entitlements.active[ENTITLEMENT_KEY]
        setIsSubscribed(active)
      } catch (e) {
        console.warn('[Purchases] init error:', e)
      }
    }
    init()
  }, [uid])

  const purchaseMonthly = useCallback(async () => {
    if (isWeb || !Purchases || !RC_CONFIGURED) {
      if (!isWeb) Alert.alert('Requires Native Build', 'Run with expo run:ios or expo run:android to use purchases.')
      return false
    }
    setLoading(true)
    try {
      const offerings = await Purchases.getOfferings()
      const pkg = offerings.current?.availablePackages?.find(
        p => p.product.identifier === PRODUCT_IDS.MONTHLY,
      ) ?? offerings.current?.monthly
      if (!pkg) throw new Error('Monthly plan not found in offerings')
      const { customerInfo } = await Purchases.purchasePackage(pkg)
      const active = !!customerInfo.entitlements.active[ENTITLEMENT_KEY]
      setIsSubscribed(active)
      if (active) Alert.alert('Welcome to Premium! 💜', 'You now have unlimited hearts. Happy studying!')
      return active
    } catch (e) {
      if (!e.userCancelled) Alert.alert('Purchase Failed', e.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const purchaseSeason = useCallback(async () => {
    if (isWeb || !Purchases || !RC_CONFIGURED) {
      if (!isWeb) Alert.alert('Requires Native Build', 'Run with expo run:ios or expo run:android to use purchases.')
      return false
    }
    setLoading(true)
    try {
      const offerings = await Purchases.getOfferings()
      const pkg = offerings.current?.availablePackages?.find(
        p => p.product.identifier === PRODUCT_IDS.SEASON,
      ) ?? offerings.current?.threeMonth
      if (!pkg) throw new Error('Season Pass not found in offerings')
      const { customerInfo } = await Purchases.purchasePackage(pkg)
      const active = !!customerInfo.entitlements.active[ENTITLEMENT_KEY]
      setIsSubscribed(active)
      if (active) Alert.alert('Welcome to Premium! 💜', 'Unlimited hearts through exam season. Go get that diploma!')
      return active
    } catch (e) {
      if (!e.userCancelled) Alert.alert('Purchase Failed', e.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const purchaseYearly = useCallback(async () => {
    if (isWeb || !Purchases || !RC_CONFIGURED) {
      if (!isWeb) Alert.alert('Requires Native Build', 'Run with expo run:ios or expo run:android to use purchases.')
      return false
    }
    setLoading(true)
    try {
      const offerings = await Purchases.getOfferings()
      const pkg = offerings.current?.availablePackages?.find(
        p => p.product.identifier === PRODUCT_IDS.YEARLY,
      ) ?? offerings.current?.annual
      if (!pkg) throw new Error('Yearly plan not found in offerings')
      const { customerInfo } = await Purchases.purchasePackage(pkg)
      const active = !!customerInfo.entitlements.active[ENTITLEMENT_KEY]
      setIsSubscribed(active)
      if (active) Alert.alert('Welcome to Premium! 💜', 'You now have unlimited hearts for a whole year!')
      return active
    } catch (e) {
      if (!e.userCancelled) Alert.alert('Purchase Failed', e.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const donate = useCallback(async (productId) => {
    if (isWeb || !Purchases || !RC_CONFIGURED) {
      if (!isWeb) Alert.alert('Requires Native Build', 'Run with expo run:ios or expo run:android to use purchases.')
      return false
    }
    setLoading(true)
    try {
      const products = await Purchases.getProducts([productId])
      if (!products?.length) throw new Error('Donation product not found')
      await Purchases.purchaseStoreProduct(products[0])
      Alert.alert('Thank you! ☕', 'Your support means the world and helps keep this app free for students.')
      return true
    } catch (e) {
      if (!e.userCancelled) Alert.alert('Purchase Failed', e.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const restorePurchases = useCallback(async () => {
    if (isWeb || !Purchases || !RC_CONFIGURED) {
      if (!isWeb) Alert.alert('Requires Native Build', 'Run with expo run:ios or expo run:android to use purchases.')
      return false
    }
    setLoading(true)
    try {
      const info   = await Purchases.restorePurchases()
      const active = !!info.entitlements.active[ENTITLEMENT_KEY]
      setIsSubscribed(active)
      Alert.alert(
        active ? 'Restored! 💜' : 'No Subscription Found',
        active
          ? 'Your premium subscription has been restored.'
          : 'No active subscription was found for this Apple/Google account.',
      )
      return active
    } catch (e) {
      Alert.alert('Restore Failed', e.message)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // isConfigured — UI gate. While the RevenueCat key is a placeholder (or the
  // native module is absent: web / Expo Go), all purchase UI stays hidden so
  // App Review never sees a broken paywall (guideline 2.1(b)).
  const isConfigured = !isWeb && !!Purchases && RC_CONFIGURED

  return { isSubscribed, loading, isConfigured, purchaseMonthly, purchaseSeason, purchaseYearly, donate, restorePurchases }
}
