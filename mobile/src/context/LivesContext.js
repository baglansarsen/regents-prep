/**
 * LivesContext
 *
 * Single source of truth for lives state across the whole app.
 * Both GlobalTopBar (display) and QuizScreen (loseLife) read from here,
 * so a decrement in the quiz is immediately reflected in the top bar.
 *
 * Wrap the app with <LivesProvider> inside <AuthProvider> so that uid
 * is available when the hook initialises.
 */
import React, { createContext, useContext } from 'react'
import { useAuthContext } from './AuthContext'
import { useLives } from '../hooks/useLives'

const LivesContext = createContext(null)

export function LivesProvider({ children }) {
  const { user } = useAuthContext()
  const uid = user?.uid

  const lives = useLives(uid)

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
