import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY           = '@doubleRPBoost_v1'
const DURATION_MS   = 10 * 60 * 1000   // 10 minutes
const COST_RP       = 150

const DoubleRPContext = createContext({
  isActive:      false,
  timeLeft:      0,        // seconds remaining
  rpMultiplier:  1,
  activateBoost: async () => 'error',
  COST_RP,
})

export function DoubleRPProvider({ children }) {
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
  const rpMultiplier = isActive ? 2 : 1

  /**
   * activateBoost(spendRP)
   *   spendRP – from useRP; returns true if successful
   * Returns: 'success' | 'already_active' | 'insufficient_rp'
   */
  const activateBoost = useCallback(async (spendRP) => {
    if (isActive) return 'already_active'
    const ok = await spendRP(COST_RP)
    if (!ok) return 'insufficient_rp'
    const exp = Date.now() + DURATION_MS
    setExpiresAt(exp)
    await AsyncStorage.setItem(KEY, String(exp))
    return 'success'
  }, [isActive])

  return (
    <DoubleRPContext.Provider value={{ isActive, timeLeft, rpMultiplier, activateBoost, COST_RP }}>
      {children}
    </DoubleRPContext.Provider>
  )
}

export const useDoubleRP = () => useContext(DoubleRPContext)
