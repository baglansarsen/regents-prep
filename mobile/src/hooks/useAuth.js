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
import { useAuthContext } from '../context/AuthContext'

// Lazy-load to avoid TurboModuleRegistry crash when native module is absent
let _GoogleSignin = null
try {
  _GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin
  _GoogleSignin.configure({
    webClientId: '752904748328-5areedgem0c4na3cuihfliraskr8vlrt.apps.googleusercontent.com',
  })
} catch {
  // native module not linked in this build
}

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

  async function signInWithGoogle() {
    if (!_GoogleSignin) throw new Error('Google Sign-In is not available in this build.')
    await _GoogleSignin.hasPlayServices()
    const { data } = await _GoogleSignin.signIn()
    const credential = GoogleAuthProvider.credential(data.idToken)
    await signInWithCredential(auth, credential)
  }

  async function signInWithApple() {
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
    signInWithGoogle,
    signInWithApple,
    logOut,
  }
}
