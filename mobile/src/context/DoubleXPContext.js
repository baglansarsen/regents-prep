import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY           = '@doubleXPBoost_v1'
const DURATION_MS   = 10 * 60 * 1000   // 10 minutes
const COST_XP       = 150

const DoubleXPContext = createContext({
  isActive:      false,
  timeLeft:      0,        // seconds remaining
  xpMultiplier:  1,
  activateBoost: async () => 'error',
  COST_XP,
})

export function DoubleXPProvider({ children }) {
  const [expiresAt, setExpiresAt] = useState(null)   // ms timestamp or null
  const [timeLeft,  setTimeLeft]  = useState(0)       // seconds
  const tickRef = useRef(null)

  // ── Load persisted expiry on mount ────────────────────────────────────────
  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (!raw) return
      const ts = Number(raw)
      if (ts > Date.now()) setExpiresAt(ts)
    })
  }, [])

  // ── Countdown tick ────────────────────────────────────────────────────────
  useEffect(() => {
    clearInterval(tickRef.current)
    if (!expiresAt) { setTimeLeft(0); return }

    function tick() {
      const ms = expiresAt - Date.now()
      if (ms <= 0) {
        setTimeLeft(0)
        setExpiresAt(null)
        clearInterval(tickRef.current)
      } else {
        setTimeLeft(Math.ceil(ms / 1000))
      }
    }
    tick()
    tickRef.current = setInterval(tick, 1000)
    return () => clearInterval(tickRef.current)
  }, [expiresAt])

  const isActive     = Boolean(expiresAt && expiresAt > Date.now())
  const xpMultiplier = isActive ? 2 : 1

  /**
   * activateBoost(spendXP)
   *   spendXP – from useXP; returns true if successful
   * Returns: 'success' | 'already_active' | 'insufficient_xp'
   */
  const activateBoost = useCallback(async (spendXP) => {
    if (isActive) return 'already_active'
    const ok = await spendXP(COST_XP)
    if (!ok) return 'insufficient_xp'
    const exp = Date.now() + DURATION_MS
    setExpiresAt(exp)
    await AsyncStorage.setItem(KEY, String(exp))
    return 'success'
  }, [isActive])

  return (
    <DoubleXPContext.Provider value={{ isActive, timeLeft, xpMultiplier, activateBoost, COST_XP }}>
      {children}
    </DoubleXPContext.Provider>
  )
}

export const useDoubleXP = () => useContext(DoubleXPContext)
