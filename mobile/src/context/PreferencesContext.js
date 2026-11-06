import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Device-level app preferences (Profile → Settings).
//   soundEffects      — correct/wrong quiz sounds (not read-aloud or Focus sounds)
//   reduceAnimations  — in-app Reduce Motion; useReducedMotion() ORs it with the OS setting
export const SOUND_EFFECTS_KEY = '@pref_soundEffects'
export const REDUCE_ANIMATIONS_KEY = '@pref_reduceAnimations'

const DEFAULTS = { soundEffects: true, reduceAnimations: false }

const PreferencesContext = createContext(null)

export function PreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState({ ...DEFAULTS, loaded: false })

  useEffect(() => {
    AsyncStorage.multiGet([SOUND_EFFECTS_KEY, REDUCE_ANIMATIONS_KEY])
      .then(([[, sound], [, reduce]]) => setPrefs({
        soundEffects:     sound == null ? DEFAULTS.soundEffects : sound === 'true',
        reduceAnimations: reduce == null ? DEFAULTS.reduceAnimations : reduce === 'true',
        loaded: true,
      }))
      .catch(() => setPrefs((p) => ({ ...p, loaded: true })))   // fail open to defaults
  }, [])

  const setSoundEffects = useCallback((on) => {
    setPrefs((p) => ({ ...p, soundEffects: !!on }))
    AsyncStorage.setItem(SOUND_EFFECTS_KEY, String(!!on)).catch(() => {})
  }, [])

  const setReduceAnimations = useCallback((on) => {
    setPrefs((p) => ({ ...p, reduceAnimations: !!on }))
    AsyncStorage.setItem(REDUCE_ANIMATIONS_KEY, String(!!on)).catch(() => {})
  }, [])

  const value = useMemo(
    () => ({ ...prefs, setSoundEffects, setReduceAnimations }),
    [prefs, setSoundEffects, setReduceAnimations],
  )
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

/** Preferences, or the defaults when rendered outside the provider (tests, isolated screens). */
export function usePreferences() {
  return useContext(PreferencesContext) ?? { ...DEFAULTS, loaded: true, setSoundEffects: () => {}, setReduceAnimations: () => {} }
}
