import React, { createContext, useContext } from 'react'
import { useAuthContext } from './AuthContext'
import { useSubscription } from './SubscriptionContext'
import { useLives } from '../hooks/useLives'

const LivesContext = createContext(null)

export function LivesProvider({ children }) {
  const { user }         = useAuthContext()
  const { isSubscribed } = useSubscription()

  const lives = useLives(user?.uid, isSubscribed)

  return (
    <LivesContext.Provider value={lives}>
      {children}
    </LivesContext.Provider>
  )
}

export function useLivesContext() {
  const ctx = useContext(LivesContext)
  if (!ctx) throw new Error('useLivesContext must be used inside <LivesProvider>')
  return ctx
}
