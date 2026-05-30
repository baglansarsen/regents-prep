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
import { Platform } from 'react-native'
import { auth } from '../firebase'
import { useAuthContext } from '../context/AuthContext'

// Lazy-load to avoid TurboModuleRegistry crash when native module is absent
let _GoogleSignin = null
try {
  _GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin
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
    if (Platform.OS === 'web') {
      const { signInWithPopup } = require('firebase/auth')
      const { googleProvider } = require('../firebase')
      await signInWithPopup(auth, googleProvider)
      return
    }

    if (!_GoogleSignin) throw new Error('Google Sign-In is not available in this build.')

    // Real iOS client ID from GoogleService-Info.plist
    const IOS_CLIENT_ID = '752904748328-82me96mfpu3vhv9qm2f5u300qllktr4t.apps.googleusercontent.com'

    // Configure lazily to ensure native bridge is active
    try {
      _GoogleSignin.configure({
        webClientId: '752904748328-5areedgem0c4na3cuihfliraskr8vlrt.apps.googleusercontent.com',
        iosClientId: IOS_CLIENT_ID,
        offlineAccess: false,
      })
    } catch (e) {
      console.warn('[useAuth] GoogleSignin.configure error:', e)
    }

    // hasPlayServices() is Android-only — calling it on iOS throws
    if (Platform.OS === 'android') {
      try {
        await _GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      } catch (e) {
        console.warn('[useAuth] Play Services check failed:', e)
        throw new Error('Google Play Services are required but not available.')
      }
    }

    let res
    try {
      res = await _GoogleSignin.signIn()
    } catch (e) {
      console.error('[useAuth] GoogleSignin.signIn error code:', e.code, 'message:', e.message)
      throw e
    }

    const idToken = res?.data?.idToken ?? res?.idToken
    if (!idToken) throw new Error('No Google ID Token found in response.')

    const credential = GoogleAuthProvider.credential(idToken)
    try {
      await signInWithCredential(auth, credential)
    } catch (e) {
      console.error('[useAuth] Firebase signInWithCredential error:', e.code, e.message)
      throw e
    }
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
