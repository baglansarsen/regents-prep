import { useEffect, useState } from 'react'
import { AccessibilityInfo } from 'react-native'
import { usePreferences } from '../context/PreferencesContext'

/**
 * true when the OS asks for reduced motion (iOS/Android setting, or
 * `prefers-reduced-motion` on web — RN-web backs AccessibilityInfo with it).
 */
export function useSystemReducedMotion() {
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

/**
 * true when motion should be reduced: the OS setting OR the in-app
 * "Reduce animations" toggle (Profile → Settings). Movement then becomes an
 * opacity cross-fade; haptics and sound stay.
 */
export function useReducedMotion() {
  const system = useSystemReducedMotion()
  const { reduceAnimations } = usePreferences()
  return system || reduceAnimations
}
