import React, { createContext, useContext, useState, useEffect } from 'react'
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

  // Toggle light/dark (used by the in-app theme switch in Profile)
  const toggleTheme = async () => {
    const next = state.mode === 'dark' ? 'light' : 'dark'
    setState(s => ({ ...s, mode: next }))
    await AsyncStorage.setItem(THEME_KEY, next)
  }

  const { mode, themeChosen } = state

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark'
  const C = isDark ? dark : light

  return (
    <ThemeContext.Provider value={{ C, isDark, mode, themeChosen, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
