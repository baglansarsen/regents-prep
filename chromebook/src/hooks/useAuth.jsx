import React, { useState, useEffect, createContext, useContext } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  updateProfile,
  signOut,
  linkWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function signInWithEmail(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function signUpWithEmail(email, password, displayName) {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      await updateProfile(cred.user, { displayName })
    }
  }

  async function signInAsGuest() {
    await signInAnonymously(auth)
  }

  async function linkEmailToGuest(email, password, displayName) {
    if (!auth.currentUser) throw new Error("No guest user active.")
    const credential = EmailAuthProvider.credential(email, password)
    const cred = await linkWithCredential(auth.currentUser, credential)
    if (displayName) await updateProfile(cred.user, { displayName })
  }

  async function signInWithGoogle() {
    await signInWithPopup(auth, googleProvider)
  }

  async function logOut() {
    await signOut(auth)
  }

  const value = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInAsGuest,
    linkEmailToGuest,
    signInWithGoogle,
    logOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
