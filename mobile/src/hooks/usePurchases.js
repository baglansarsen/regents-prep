import { useState, useEffect, useCallback, useRef } from 'react'
import { Alert, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

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

// Lazy-load the hosted Paywall UI (separate native module: react-native-purchases-ui).
// This renders the paywall configured in the RevenueCat dashboard, so plan/pricing
// changes never require an app update.
let RevenueCatUI = null
let PAYWALL_RESULT = null
if (Platform.OS !== 'web') {
  try {
    const UI = require('react-native-purchases-ui')
    RevenueCatUI = UI.default
    PAYWALL_RESULT = UI.PAYWALL_RESULT
  } catch (_) {}
}

// iOS: production App Store public SDK key. Real purchases require the App Store
// Connect side to be complete — Paid Apps Agreement signed, IAP products created,
// and an In-App Purchase Key / shared secret configured in RevenueCat.
const RC_API_KEY_IOS     = 'appl_FQIPzvELTjrEQzZcRZgrlTIXdET'
// Android: still the RevenueCat Test Store key (no real charges, no Play products).
// Replace with the production `goog_` key before any Android release.
const RC_API_KEY_ANDROID = 'test_AfUgVDbhzDNlbAlRSxHlDCvaMoW'

// Guard: skip configure() if key is still a placeholder.
// With New Architecture (TurboModules), RevenueCat throws a native NSException
// for an invalid key — this crashes the C++ JSI bridge (SIGABRT on turbomodulemanager
// queue) before JS try/catch can fire.
const RC_CONFIGURED = !RC_API_KEY_IOS.includes('REPLACE_WITH')

// Pricing (set in App Store Connect): monthly $4.99 · season (3-month) $9.99 ·
// yearly $24.99. The Season Pass is the featured plan — it matches the
// Feb–June Regents study window.
//
// IMPORTANT: these must be the exact STORE product identifiers (the immutable
// Product ID in App Store Connect / RevenueCat), NOT the reference names. The
// monthly and season IDs are intentionally "off" (com.regentify.app, hearts_season)
// because that's how they were created in App Store Connect and Product IDs can't
// be renamed. purchaseX() matches on these directly, so they must stay in sync.
export const PRODUCT_IDS = {
  MONTHLY : 'com.regentify.app',         // 1-month auto-renewable (legacy store ID)
  SEASON  : 'hearts_season',             // 3-month auto-renewable
  YEARLY  : 'unlimited_hearts_yearly',
  TIP_5   : 'tip_5',
  TIP_10  : 'tip_10',
  TIP_25  : 'tip_25',
}

// Must EXACTLY match the entitlement identifier in the RevenueCat dashboard
// (Project → Entitlements) — including the space and capitalization. A mismatch
// silently leaves isSubscribed false even after a successful purchase.
export const ENTITLEMENT_KEY = 'regentify Unlimited'

// Last known entitlement, cached so a returning subscriber is treated as premium
// immediately on launch instead of for the ~moment before getCustomerInfo resolves.
const SUB_CACHE_KEY = '@isSubscribed_v1'

const isWeb = Platform.OS === 'web'

// RevenueCat is a process-wide singleton: `configure()` may only run once per
// launch, so account switches after the first configure must go through
// logIn()/logOut(), not another configure(). This flag tracks whether the SDK
// has been started so the effect below knows which path to take.
let _rcStarted = false

// Blocks the leaderboard writeback in applyInfo while no user is authoritatively
// signed in. Set on sign-out/delete; cleared when a real uid logs in. Without
// it, a CustomerInfoUpdate queued on the native side can fire applyInfo with the
// old uid still captured in the effect closure AFTER deleteUserData removed
// leaderboard/{uid} — re-creating the doc for a deleted account.
let _rcWritebackBlocked = false

/**
 * Reset RevenueCat to an anonymous identity on sign-out. Without this the SDK
 * keeps the previous user's appUserID, so on a shared device the next account
 * is reported as owning the prior user's entitlement (and recorded Premium in
 * their leaderboard doc). Call from the auth sign-out / delete paths.
 */
export async function logOutPurchases() {
  _rcWritebackBlocked = true  // block before logOut so any in-flight update is suppressed
  if (isWeb || !Purchases || !RC_CONFIGURED || !_rcStarted) return
  try { await Purchases.logOut() } catch (_) {} // throws if already anonymous — harmless
}

export function usePurchases(uid) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading,      setLoading]      = useState(false)
  // Set true once an authoritative CustomerInfo has been applied, so the async
  // cache-seed below can't clobber a fresh (e.g. expired) result with a stale one.
  const settledRef = useRef(false)

  // ── Seed from the cached entitlement on launch ──────────────────────────────
  // Avoids briefly treating a paying user as free (which would cost them a heart)
  // during the moment before getCustomerInfo resolves.
  useEffect(() => {
    if (isWeb) return
    AsyncStorage.getItem(SUB_CACHE_KEY).then((v) => {
      if (v === '1' && !settledRef.current) setIsSubscribed(true)
    }).catch(() => {})
  }, [])

  // All hooks must be called unconditionally — gate behavior inside them
  useEffect(() => {
    if (isWeb || !Purchases || !RC_CONFIGURED) return
    let listener = null

    // Authoritative entitlement state → React state + cache + leaderboard flag.
    const applyInfo = (info) => {
      const active = !!info?.entitlements?.active?.[ENTITLEMENT_KEY]
      settledRef.current = true
      setIsSubscribed(active)
      AsyncStorage.setItem(SUB_CACHE_KEY, active ? '1' : '0').catch(() => {})
      // Skip the leaderboard write once the user has signed out/deleted —
      // otherwise a late update resurrects the removed doc for the old account.
      if (uid && !_rcWritebackBlocked) {
        setDoc(doc(db, 'leaderboard', uid), { isSubscribed: active }, { merge: true }).catch(() => {})
      }
    }

    async function init() {
      try {
        if (LOG_LEVEL && __DEV__) Purchases.setLogLevel(LOG_LEVEL.VERBOSE)
        const key = Platform.OS === 'ios' ? RC_API_KEY_IOS : RC_API_KEY_ANDROID
        if (!_rcStarted) {
          // First launch this process: configure (once) with the current user.
          await Purchases.configure({ apiKey: key, appUserID: uid ?? null })
          _rcStarted = true
          if (uid) _rcWritebackBlocked = false
        } else if (uid) {
          // Already configured (e.g. a previous account signed out): switch
          // identity so this user sees THEIR entitlements, not the prior user's.
          await Purchases.logIn(uid)
          _rcWritebackBlocked = false  // authoritative user present → writeback allowed
        } else {
          await Purchases.logOut() // signed out → drop to anonymous
        }
        // Keep entitlement state live: renewals, expirations, restores, and
        // cross-device changes push a fresh CustomerInfo with no app restart.
        listener = applyInfo
        Purchases.addCustomerInfoUpdateListener(listener)
        const info = await Purchases.getCustomerInfo()
        applyInfo(info)
      } catch (e) {
        console.warn('[Purchases] init error:', e)
      }
    }
    init()

    return () => {
      if (listener) {
        try { Purchases.removeCustomerInfoUpdateListener(listener) } catch (_) {}
      }
    }
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

  // Fetch StoreProduct details (e.g. localized priceString) for the given store
  // product IDs. Used by the Tip Jar so the buttons show Apple's real charged
  // price instead of a hardcoded label that can drift from the store. Returns []
  // on web / Expo Go / unconfigured, or if the IDs aren't found.
  const fetchProducts = useCallback(async (ids) => {
    if (isWeb || !Purchases || !RC_CONFIGURED) return []
    try {
      const products = await Purchases.getProducts(ids)
      return products ?? []
    } catch (e) {
      console.warn('[Purchases] fetchProducts error:', e)
      return []
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

  // Present the dashboard-configured hosted paywall. Returns true on a
  // purchase/restore. Re-reads customer info afterward so isSubscribed reflects
  // the new entitlement regardless of which package the user bought.
  const presentPaywall = useCallback(async () => {
    if (isWeb || !RevenueCatUI || !RC_CONFIGURED) {
      if (!isWeb) Alert.alert('Requires Native Build', 'Run with expo run:ios or expo run:android to use purchases.')
      return false
    }
    try {
      const result = await RevenueCatUI.presentPaywall()
      const success = result === PAYWALL_RESULT.PURCHASED || result === PAYWALL_RESULT.RESTORED
      // Refresh entitlement state whatever the outcome (purchase, restore, cancel).
      try {
        const info = await Purchases.getCustomerInfo()
        setIsSubscribed(!!info.entitlements.active[ENTITLEMENT_KEY])
      } catch {}
      return success
    } catch (e) {
      console.warn('[Purchases] presentPaywall error:', e)
      return false
    }
  }, [])

  // isConfigured — UI gate. While the RevenueCat key is a placeholder (or the
  // native module is absent: web / Expo Go), all purchase UI stays hidden so
  // App Review never sees a broken paywall (guideline 2.1(b)).
  const isConfigured = !isWeb && !!Purchases && RC_CONFIGURED

  return { isSubscribed, loading, isConfigured, presentPaywall, purchaseMonthly, purchaseSeason, purchaseYearly, donate, fetchProducts, restorePurchases }
}
