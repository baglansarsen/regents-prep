import { useState, useEffect, useCallback } from 'react'
import { Alert, Platform } from 'react-native'

// Lazy-load RevenueCat — absent on web/Expo Go, present in native builds
let Purchases = null
if (Platform.OS !== 'web') {
  try {
    Purchases = require('react-native-purchases').default
  } catch (_) {}
}

const RC_API_KEY_IOS     = 'appl_REPLACE_WITH_YOUR_REVENUECAT_IOS_KEY'
const RC_API_KEY_ANDROID = 'goog_REPLACE_WITH_YOUR_REVENUECAT_ANDROID_KEY'

// Guard: skip configure() if key is still a placeholder.
// With New Architecture (TurboModules), RevenueCat throws a native NSException
// for an invalid key — this crashes the C++ JSI bridge (SIGABRT on turbomodulemanager
// queue) before JS try/catch can fire. Remove this check once real keys are set.
const RC_CONFIGURED = !RC_API_KEY_IOS.includes('REPLACE_WITH')

export const PRODUCT_IDS = {
  MONTHLY : 'unlimited_hearts_monthly',
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

  return { isSubscribed, loading, purchaseMonthly, purchaseYearly, donate, restorePurchases }
}
