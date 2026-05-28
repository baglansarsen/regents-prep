import { useState, useEffect, useCallback } from 'react'
import { Alert, Platform } from 'react-native'

// Lazy-load RevenueCat — absent in Expo Go, present in dev/prod builds
let Purchases = null
try {
  Purchases = require('react-native-purchases').default
} catch (_) {}

// ─── Configure these in your RevenueCat dashboard ───────────────────────────
// Get your keys at: https://app.revenuecat.com → Project → API Keys
const RC_API_KEY_IOS     = 'appl_REPLACE_WITH_YOUR_REVENUECAT_IOS_KEY'
const RC_API_KEY_ANDROID = 'goog_REPLACE_WITH_YOUR_REVENUECAT_ANDROID_KEY'

// These must match the product IDs in App Store Connect / Google Play Console
export const PRODUCT_IDS = {
  MONTHLY : 'unlimited_hearts_monthly',
  YEARLY  : 'unlimited_hearts_yearly',
  TIP_5   : 'tip_5',
  TIP_10  : 'tip_10',
  TIP_25  : 'tip_25',
}

export const ENTITLEMENT_KEY = 'premium'

export function usePurchases(uid) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading,      setLoading]      = useState(false)

  useEffect(() => {
    if (!Purchases) return
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

  async function getEntitlementActive(customerInfo) {
    return !!customerInfo.entitlements.active[ENTITLEMENT_KEY]
  }

  const purchaseMonthly = useCallback(async () => {
    if (!Purchases) {
      Alert.alert('Requires Native Build', 'Run with expo run:ios or expo run:android to use purchases.')
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
      const active = await getEntitlementActive(customerInfo)
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
    if (!Purchases) {
      Alert.alert('Requires Native Build', 'Run with expo run:ios or expo run:android to use purchases.')
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
      const active = await getEntitlementActive(customerInfo)
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
    if (!Purchases) {
      Alert.alert('Requires Native Build', 'Run with expo run:ios or expo run:android to use purchases.')
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
    if (!Purchases) {
      Alert.alert('Requires Native Build', 'Run with expo run:ios or expo run:android to use purchases.')
      return false
    }
    setLoading(true)
    try {
      const info   = await Purchases.restorePurchases()
      const active = await getEntitlementActive(info)
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

  return {
    isSubscribed,
    loading,
    purchaseMonthly,
    purchaseYearly,
    donate,
    restorePurchases,
  }
}
