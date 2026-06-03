/**
 * useRewardedAd — wraps react-native-google-mobile-ads rewarded interstitial lifecycle.
 * No-ops gracefully in Expo Go (where the native module is absent).
 * In a custom dev build / production the ad pre-loads on mount.
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import { Platform, TurboModuleRegistry } from 'react-native'
import { isAdTrackingGranted } from '../utils/adTracking'

// Check once at hook-module load time; avoids the TurboModuleRegistry.getEnforcing throw.
// On web TurboModuleRegistry may be undefined, so guard the access with optional chaining.
const ADS_AVAILABLE = !!TurboModuleRegistry?.get?.('RNGoogleMobileAdsModule')

let _ads = null
function getAds() {
  if (!ADS_AVAILABLE) return {}
  if (_ads) return _ads
  try { _ads = require('react-native-google-mobile-ads') } catch { _ads = {} }
  return _ads
}

const AD_UNIT_ID = Platform.select({
  android: 'ca-app-pub-2023523440912350/9872255238',
  ios: 'ca-app-pub-2023523440912350/9118642423',
  default: 'ca-app-pub-2023523440912350/9872255238',
})

export function useRewardedAd({ onReward } = {}) {
  const [ready,   setReady]   = useState(false)
  const [loading, setLoading] = useState(false)
  const onRewardRef = useRef(onReward)
  onRewardRef.current = onReward
  const adRef = useRef(null)

  useEffect(() => {
    if (!ADS_AVAILABLE) return
    const { RewardedInterstitialAd, RewardedAdEventType, AdEventType, TestIds } = getAds()
    if (!RewardedInterstitialAd) return

    const unitId = __DEV__
      ? (TestIds?.REWARDED_INTERSTITIAL ?? 'ca-app-pub-3940256099942544/5354046379')
      : AD_UNIT_ID

    // Personalized ads only when the user granted ATT; otherwise non-personalized.
    const ad = RewardedInterstitialAd.createForAdRequest(unitId, { requestNonPersonalizedAdsOnly: !isAdTrackingGranted() })
    adRef.current = ad

    const unsubLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => { setReady(true); setLoading(false) })
    const unsubEarned = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => { onRewardRef.current?.() })
    const unsubClosed = ad.addAdEventListener(AdEventType.CLOSED, () => { setReady(false); setLoading(true); ad.load() })
    const unsubError  = ad.addAdEventListener(AdEventType.ERROR,  () => {
      setReady(false); setLoading(false)
      setTimeout(() => { setLoading(true); ad.load() }, 30_000)
    })

    setLoading(true)
    ad.load()
    return () => { unsubLoaded(); unsubEarned(); unsubClosed(); unsubError() }
  }, [])

  const showAd = useCallback(() => { if (adRef.current && ready) adRef.current.show() }, [ready])
  return { ready, loading, showAd }
}
