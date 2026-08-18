import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { clearLocalUserData } from '../utils/clearLocalUserData'
import { resetGlobalRP } from '../hooks/useRP'
import { resetPendingProgress } from '../hooks/useProgress'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(undefined) // undefined = loading
  const [loading, setLoading] = useState(true)
  const prevUserRef = useRef(undefined) // undefined = not yet seen a value

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      const prev = prevUserRef.current
      // A guest (anonymous) uid swapping to a different uid mid-session — sign-in
      // to a real/different account without an app relaunch — abandons the guest's
      // Firestore doc but leaves un-scoped AsyncStorage caches and module-level
      // singletons (RP total, pending progress writes) populated with the guest's
      // data. Left alone, those bleed into the incoming account. Clear them first,
      // exactly as on logout, before anything re-reads them for the new uid.
      if (prev && prev.isAnonymous && u?.uid !== prev.uid) {
        await clearLocalUserData()
        resetGlobalRP()
        resetPendingProgress()
      }
      prevUserRef.current = u ?? null
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  // Memoize so the 80+ useAuthContext consumers only re-render when user/loading
  // actually change, not on every AuthProvider render.
  const value = useMemo(() => ({ user, loading }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used inside <AuthProvider>')
  return ctx
}
