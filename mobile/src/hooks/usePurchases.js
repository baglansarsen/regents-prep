import { useState, useEffect, useCallback, useRef } from 'react'
import { Alert, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

// Lazy-load RevenueCat — absent on web/Expo Go, present in native builds
let Purchases = null
let LOG_LEVEL = null
// Product category for one-time (consumable) products. getProducts() defaults to
// SUBSCRIPTION, so consumables like the tip jar MUST pass NON_SUBSCRIPTION or the
// store returns nothing ("Donation product not found"). Fall back to the string
// literal the native side expects if the enum isn't present.
let NON_SUBSCRIPTION = 'NON_SUBSCRIPTION'
if (Platform.OS !== 'web') {
  try {
    const RC = require('react-native-purchases')
    Purchases = RC.default
    LOG_LEVEL = RC.LOG_LEVEL
    if (RC.PRODUCT_CATEGORY?.NON_SUBSCRIPTION) NON_SUBSCRIPTION = RC.PRODUCT_CATEGORY.NON_SUBSCRIPTION
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
// Android: production Google Play SDK key.
const RC_API_KEY_ANDROID = 'goog_CUpFPWbSCSOZKwxQgRtpLChdNVI'

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

// The entitlement identifier configured in the RevenueCat dashboard
// (Project → Entitlements). Used as the *preferred* match.
export const ENTITLEMENT_KEY = 'regentify Unlimited'

// Premium check. This app has a single premium tier, so we treat ANY active
// entitlement as premium rather than requiring an exact identifier match — a
// dashboard identifier that doesn't byte-for-byte match ENTITLEMENT_KEY (e.g. a
// different name, casing, or the trailing space) was silently locking out
// paying users after a successful purchase. The named key is still preferred;
// the fallback just prevents a mismatch from blocking access.
export function hasPremium(info) {
  const active = info?.entitlements?.active ?? {}
  if (active[ENTITLEMENT_KEY]) return true
  return Object.keys(active).length > 0
}

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
      const active = hasPremium(info)
      if (__DEV__) {
        console.log('[Purchases] active entitlements:', Object.keys(info?.entitlements?.active ?? {}), '→ premium:', active)
      }
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
      const active = hasPremium(customerInfo)
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
      const active = hasPremium(customerInfo)
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
      const active = hasPremium(customerInfo)
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
      // Tips are consumables — query NON_SUBSCRIPTION (getProducts defaults to
      // SUBSCRIPTION). On iOS the category is effectively ignored by StoreKit, so
      // fall back to a category-less query if the first comes back empty.
      let products = await Purchases.getProducts([productId], NON_SUBSCRIPTION)
      if (!products?.length) {
        console.warn(`[Purchases] donate: 0 products for "${productId}" with NON_SUBSCRIPTION; retrying without category`)
        products = await Purchases.getProducts([productId])
      }
      console.log(`[Purchases] donate: "${productId}" resolved ${products?.length ?? 0} product(s)`)
      if (!products?.length) {
        // Genuinely not returned by the store. This is a store-config / run-mode
        // issue, not a purchase failure — surface it as such so it's diagnosable.
        throw new Error(
          `The store didn't return "${productId}". On a TestFlight/release build this means the ` +
          `consumable isn't approved in App Store Connect (or the Paid Apps Agreement isn't active). ` +
          `From Xcode, run the scheme that loads Products.storekit.`,
        )
      }
      await Purchases.purchaseStoreProduct(products[0])
      // The thank-you + RP reward is shown by the caller (SupportScreen) so it
      // can personalize it with the student's name.
      return true
    } catch (e) {
      if (!e.userCancelled) {
        console.warn('[Purchases] donate error:', e?.code ?? '', e?.message)
        Alert.alert('Purchase Failed', e.message)
      }
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
      // Tip products are consumables — query NON_SUBSCRIPTION so prices resolve.
      // Fall back to a category-less query if empty (iOS ignores the category).
      let products = await Purchases.getProducts(ids, NON_SUBSCRIPTION)
      if (!products?.length) products = await Purchases.getProducts(ids)
      console.log(`[Purchases] fetchProducts: requested ${ids.length}, resolved ${products?.length ?? 0} → [${(products ?? []).map((p) => p.identifier).join(', ')}]`)
      return products ?? []
    } catch (e) {
      console.warn('[Purchases] fetchProducts error:', e?.code ?? '', e?.message)
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
      const active = hasPremium(info)
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
        setIsSubscribed(hasPremium(info))
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
