import React, { createContext, useContext, useState, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dark, light } from '../theme'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme()
  const [mode, setMode] = useState('system') // 'light' | 'dark' | 'system'

  useEffect(() => {
    AsyncStorage.getItem('@regents_theme').then(saved => {
      if (saved) setMode(saved)
    })
  }, [])

  const toggleTheme = async () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    await AsyncStorage.setItem('@regents_theme', next)
  }

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark'
  const C = isDark ? dark : light

  return (
    <ThemeContext.Provider value={{ C, isDark, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
