import { useEffect, useState } from 'react'
import { AccessibilityInfo } from 'react-native'

/**
 * true when the user asked the OS to reduce motion (iOS/Android setting, or
 * `prefers-reduced-motion` on web — RN-web backs AccessibilityInfo with it).
 * Movement should then become an opacity cross-fade; haptics and sound stay.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    let alive = true
    AccessibilityInfo.isReduceMotionEnabled?.()
      .then((v) => { if (alive) setReduced(!!v) })
      .catch(() => {})
    const sub = AccessibilityInfo.addEventListener?.('reduceMotionChanged', (v) => setReduced(!!v))
    return () => { alive = false; sub?.remove?.() }
  }, [])

  return reduced
}
