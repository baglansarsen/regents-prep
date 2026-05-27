import React, { createContext, useContext, useState, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dark, light } from '../theme'

const THEME_KEY  = '@regents_theme'
const CHOSEN_KEY = '@regents_theme_chosen'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme()
  const [mode,        setModeState]  = useState('system') // 'light' | 'dark' | 'system'
  const [themeChosen, setThemeChosen] = useState(null)    // null = loading, true/false = resolved

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(THEME_KEY),
      AsyncStorage.getItem(CHOSEN_KEY),
    ]).then(([saved, chosen]) => {
      if (saved) setModeState(saved)
      setThemeChosen(!!chosen)
    }).catch(() => setThemeChosen(true))  // fail open
  }, [])

  // Persist mode; does NOT mark as "chosen" (use pickTheme for that)
  const toggleTheme = async () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setModeState(next)
    await AsyncStorage.setItem(THEME_KEY, next)
  }

  // Called from ThemePickerScreen — saves + marks chosen so it never shows again
  const pickTheme = async (next) => {
    setModeState(next)
    setThemeChosen(true)
    await Promise.all([
      AsyncStorage.setItem(THEME_KEY,  next),
      AsyncStorage.setItem(CHOSEN_KEY, '1'),
    ])
  }

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark'
  const C = isDark ? dark : light

  return (
    <ThemeContext.Provider value={{ C, isDark, mode, themeChosen, toggleTheme, pickTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
