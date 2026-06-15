import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dark, light } from '../theme'

const THEME_KEY  = '@regents_theme'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme()
  const [state, setState] = useState({
    mode: 'dark',        // dark by default — the theme picker onboarding was removed
    themeChosen: null,   // null = loading, true = resolved (picker no longer shown)
  })

  useEffect(() => {
    // Respect a previously saved preference (e.g. the in-app theme toggle);
    // otherwise default to dark. themeChosen is always true now since the
    // first-launch picker was removed.
    AsyncStorage.getItem(THEME_KEY)
      .then((saved) => setState({ mode: saved || 'dark', themeChosen: true }))
      .catch(() => setState({ mode: 'dark', themeChosen: true }))  // fail open
  }, [])

  // Mirror the current mode into a ref so the memoized toggleTheme below reads
  // the live value instead of a stale closure (it has an empty dep array).
  const modeRef = useRef(state.mode)
  modeRef.current = state.mode

  // Toggle light/dark (used by the in-app theme switch in Profile). Stable
  // identity (useCallback) so it doesn't break the memoized context value.
  const toggleTheme = useCallback(async () => {
    const next = modeRef.current === 'dark' ? 'light' : 'dark'
    setState(s => ({ ...s, mode: next }))
    await AsyncStorage.setItem(THEME_KEY, next)
  }, [])

  const { mode, themeChosen } = state

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark'
  const C = isDark ? dark : light

  // Memoize so the ~100 useTheme() consumers only re-render when the theme
  // actually changes — not on every ThemeProvider render. C is a stable module
  // ref (dark/light) so it only changes identity when isDark flips.
  const value = useMemo(
    () => ({ C, isDark, mode, themeChosen, toggleTheme }),
    [C, isDark, mode, themeChosen, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
