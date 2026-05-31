import {
  signInWithPopup,
  signInWithRedirect,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  updateProfile,
  signOut,
  linkWithCredential,
  linkWithPopup,
  EmailAuthProvider,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import { useAuthContext } from '../context/AuthContext'

export function useAuth() {
  const { user } = useAuthContext()

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      // Popup blocked or unavailable — fall back to redirect flow
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        await signInWithRedirect(auth, googleProvider)
      } else {
        throw err
      }
    }
  }

  async function resetPassword(email) {
    await sendPasswordResetEmail(auth, email)
  }

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
    const credential = EmailAuthProvider.credential(email, password)
    const cred = await linkWithCredential(auth.currentUser, credential)
    if (displayName) await updateProfile(cred.user, { displayName })
  }

  async function linkGoogleToGuest() {
    await linkWithPopup(auth.currentUser, googleProvider)
  }

  async function logOut() {
    await signOut(auth)
  }

  return { user, signInWithGoogle, signInWithEmail, signUpWithEmail, signInAsGuest, linkEmailToGuest, linkGoogleToGuest, logOut, resetPassword }
}
