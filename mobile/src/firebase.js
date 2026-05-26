import { initializeApp } from 'firebase/app'
import { initializeAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth'
// firebase v12's `firebase/auth` doesn't re-export getReactNativePersistence by
// default in React Native — Metro's main-field resolution lands on the Node
// bundle. Import the RN variant directly to guarantee it's available.
import { getReactNativePersistence } from '@firebase/auth/dist/rn'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey:            'AIzaSyBZrJZ1MBnLAefK2gmc9B8YY5IS_AGBAUI',
  authDomain:        'regents-prep.firebaseapp.com',
  projectId:         'regents-prep',
  storageBucket:     'regents-prep.firebasestorage.app',
  messagingSenderId: '752904748328',
  appId:             '1:752904748328:web:31fa4d51c44db138a6641d',
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const googleProvider = new GoogleAuthProvider()
export const emailProvider  = new EmailAuthProvider()
export const db = getFirestore(app)
