import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  updateProfile,
  signOut,
  linkWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
} from 'firebase/auth'
import * as Crypto from 'expo-crypto'
import { auth } from '../firebase'
import { useAuthContext } from '../context/AuthContext'

export function useAuth() {
  const { user } = useAuthContext()

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

  async function signInWithGoogleToken(idToken) {
    // Called after expo-auth-session Google flow returns an idToken
    const credential = GoogleAuthProvider.credential(idToken)
    await signInWithCredential(auth, credential)
  }

  async function signInWithApple() {
    // Apple Sign-In requires a paid Apple Developer account.
    // Disabled for dev builds — re-enable by restoring expo-apple-authentication import.
    throw new Error('Apple Sign-In is not available in this build.')
  }

  async function logOut() {
    await signOut(auth)
  }

  return {
    user,
    signInWithEmail,
    signUpWithEmail,
    signInAsGuest,
    linkEmailToGuest,
    signInWithGoogleToken,
    signInWithApple,
    logOut,
  }
}
