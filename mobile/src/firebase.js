import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey:            'AIzaSyDNc-pNBC0Si4Xe_H4yVTw6QagSbhMRRY0',
  authDomain:        'csas-dismissal.firebaseapp.com',
  projectId:         'csas-dismissal',
  storageBucket:     'csas-dismissal.firebasestorage.app',
  messagingSenderId: '649168596163',
  appId:             '1:649168596163:web:6d0fb9f5bccfdafeeec676',
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const googleProvider = new GoogleAuthProvider()
export const emailProvider  = new EmailAuthProvider()
export const db = getFirestore(app)
