import { useState, useEffect } from 'react'

const KEY = 'regents_theme'

function getStored() {
  try { return localStorage.getItem(KEY) ?? 'system' } catch { return 'system' }
}

function applyTheme(choice) {
  const resolved =
    choice === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : choice
  document.documentElement.setAttribute('data-theme', resolved)
}

export function useTheme() {
  const [theme, setThemeState] = useState(getStored)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  function setTheme(choice) {
    try { localStorage.setItem(KEY, choice) } catch {}
    setThemeState(choice)
  }

  return { theme, setTheme }
}
