import React, { createContext, useContext } from 'react'
import { useAuthContext } from './AuthContext'
import { usePurchases } from '../hooks/usePurchases'

const SubscriptionContext = createContext(null)

export function SubscriptionProvider({ children }) {
  const { user } = useAuthContext()
  const purchases = usePurchases(user?.uid)

  return (
    <SubscriptionContext.Provider value={purchases}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext)
  if (!ctx) throw new Error('useSubscription must be used inside <SubscriptionProvider>')
  return ctx
}
