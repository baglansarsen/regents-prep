import React, { createContext, useContext } from 'react'
import { useAuthContext } from './AuthContext'
import { useCoins } from '../hooks/useCoins'

const CoinsContext = createContext(null)

export function CoinsProvider({ children }) {
  const { user } = useAuthContext()
  const coins = useCoins(user?.uid)

  return (
    <CoinsContext.Provider value={coins}>
      {children}
    </CoinsContext.Provider>
  )
}

export function useCoinsContext() {
  const ctx = useContext(CoinsContext)
  if (!ctx) throw new Error('useCoinsContext must be used inside <CoinsProvider>')
  return ctx
}
