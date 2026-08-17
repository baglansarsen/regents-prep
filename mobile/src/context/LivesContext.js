import React, { createContext, useContext } from 'react'
import { useAuthContext } from './AuthContext'
import { useSubscription } from './SubscriptionContext'
import { useSubject } from './SubjectContext'
import { useLives } from '../hooks/useLives'

const LivesContext = createContext(null)

export function LivesProvider({ children }) {
  const { user }         = useAuthContext()
  const { isSubscribed } = useSubscription()
  const { subject }      = useSubject()

  const lives = useLives(user?.uid, isSubscribed, subject)

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
