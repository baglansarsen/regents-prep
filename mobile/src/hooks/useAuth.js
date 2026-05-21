import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  updateProfile,
  signOut,
  linkWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth'
import { auth } from '../firebase'

export function useAuth() {
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

  async function logOut() {
    await signOut(auth)
  }

  return {
    signInWithEmail,
    signUpWithEmail,
    signInAsGuest,
    linkEmailToGuest,
    signInWithGoogleToken,
    logOut,
  }
}
