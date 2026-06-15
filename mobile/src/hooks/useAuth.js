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
  reauthenticateWithCredential,
  deleteUser,
} from 'firebase/auth'
import { Platform } from 'react-native'
import { auth } from '../firebase'
import { useAuthContext } from '../context/AuthContext'
import { deleteUserData } from '../utils/deleteUserData'
import { clearLocalUserData } from '../utils/clearLocalUserData'
import { logOutPurchases } from './usePurchases'

// Lazy-load to avoid TurboModuleRegistry crash when native module is absent
let _GoogleSignin = null
try {
  _GoogleSignin = require('@react-native-google-signin/google-signin').GoogleSignin
} catch {
  // native module not linked in this build
}

// Native Google sign-in flow → returns a Firebase credential. Shared by both
// initial sign-in and re-authentication (required before account deletion).
async function getGoogleCredentialNative() {
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
  return GoogleAuthProvider.credential(idToken)
}

// Native Sign in with Apple → returns a Firebase credential plus the user's name
// (Apple only provides the name on the first authorization). Shared by initial
// sign-in and re-authentication before account deletion.
async function getAppleCredential() {
  // Lazy-require native modules so this file stays safe to import on Android/web.
  const AppleAuthentication = require('expo-apple-authentication')
  const Crypto = require('expo-crypto')

  // Firebase requires a nonce: the SHA-256 hash goes to Apple, the raw value to Firebase.
  const randomBytes = await Crypto.getRandomBytesAsync(16)
  const rawNonce = Array.from(randomBytes).map((b) => b.toString(16).padStart(2, '0')).join('')
  const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, rawNonce)

  const appleCredential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  })

  const { identityToken, fullName } = appleCredential
  if (!identityToken) throw new Error('No identity token returned from Apple.')

  const credential = new OAuthProvider('apple.com').credential({ idToken: identityToken, rawNonce })
  return { credential, fullName }
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

    const credential = await getGoogleCredentialNative()
    try {
      await signInWithCredential(auth, credential)
    } catch (e) {
      console.error('[useAuth] Firebase signInWithCredential error:', e.code, e.message)
      throw e
    }
  }

  async function signInWithApple() {
    const { credential, fullName } = await getAppleCredential()
    const userCred = await signInWithCredential(auth, credential)

    // Apple returns the user's name only on the first sign-in — persist it once.
    if (fullName?.givenName && !userCred.user.displayName) {
      const name = [fullName.givenName, fullName.familyName].filter(Boolean).join(' ')
      if (name) await updateProfile(userCred.user, { displayName: name })
    }
  }

  async function logOut() {
    // Wipe non-uid-scoped local caches first so the next account on this device
    // doesn't paint this user's streak/RP/pet from stale storage.
    await clearLocalUserData()
    // Reset RevenueCat to anonymous — otherwise the SDK keeps this user's
    // appUserID and the next account is reported (and recorded) as Premium.
    await logOutPurchases()
    await signOut(auth)
  }

  // Permanently deletes the user's account and personal data (App Store
  // Guideline 5.1.1(v)). Firebase requires a recent login to delete, so we
  // re-authenticate first based on the sign-in provider. For email/password,
  // the caller must pass the user's current `password`; an error with
  // code 'PASSWORD_REQUIRED' is thrown if it's missing.
  async function deleteAccount({ password } = {}) {
    const u = auth.currentUser
    if (!u) throw new Error('Not signed in.')
    const providerId = u.providerData?.[0]?.providerId

    if (providerId === 'password') {
      if (!password) {
        const err = new Error('Password required to delete account.')
        err.code = 'PASSWORD_REQUIRED'
        throw err
      }
      await reauthenticateWithCredential(u, EmailAuthProvider.credential(u.email, password))
    } else if (providerId === 'google.com') {
      if (Platform.OS === 'web') {
        const { reauthenticateWithPopup } = require('firebase/auth')
        const { googleProvider } = require('../firebase')
        await reauthenticateWithPopup(u, googleProvider)
      } else {
        await reauthenticateWithCredential(u, await getGoogleCredentialNative())
      }
    } else if (providerId === 'apple.com') {
      const { credential } = await getAppleCredential()
      await reauthenticateWithCredential(u, credential)
    }
    // Anonymous users have no credential to re-authenticate; deleteUser() works directly.

    // Remove Firestore data while still authenticated. This throws
    // DELETE_INCOMPLETE if anything failed — in that case we must NOT delete the
    // auth account (it would orphan the surviving data forever), so let the error
    // propagate and leave the account intact for a retry.
    await deleteUserData(u.uid)

    // Only now is it safe to delete the auth account and wipe local state. Doing
    // the local wipe *after* deleteUser means a failed deletion leaves the
    // still-signed-in user's local data intact rather than silently destroying it.
    await deleteUser(u)
    await logOutPurchases()
    await clearLocalUserData()
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
    deleteAccount,
  }
}
