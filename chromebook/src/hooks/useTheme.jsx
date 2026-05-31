import React, { useState, useEffect, createContext, useContext } from 'react'

const THEME_KEY = '@regents_theme'
const CHOSEN_KEY = '@regents_theme_chosen'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('dark') // default to dark first for premium feel
  const [themeChosen, setThemeChosen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY)
    const chosen = localStorage.getItem(CHOSEN_KEY)
    const activeMode = saved || 'dark'
    
    setMode(activeMode)
    setThemeChosen(!!chosen)
    document.documentElement.setAttribute('data-theme', activeMode)
    setLoading(false)
  }, [])

  const toggleTheme = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    localStorage.setItem(THEME_KEY, next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const pickTheme = (next) => {
    setMode(next)
    setThemeChosen(true)
    localStorage.setItem(THEME_KEY, next)
    localStorage.setItem(CHOSEN_KEY, '1')
    document.documentElement.setAttribute('data-theme', next)
  }

  const value = {
    isDark: mode === 'dark',
    mode,
    themeChosen,
    toggleTheme,
    pickTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {!loading && children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
