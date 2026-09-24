import { initializeApp } from 'firebase/app'
import { initializeAuth, GoogleAuthProvider, getReactNativePersistence } from 'firebase/auth'
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey:            'AIzaSyCT60SEmSTxgQQdud3S9HQSS7fojwf-LGM',
  authDomain:        'regents-prep.firebaseapp.com',
  projectId:         'regents-prep',
  storageBucket:     'regents-prep.firebasestorage.app',
  messagingSenderId: '752904748328',
  appId:             '1:752904748328:android:74ee59206cdd2ed8a6641d',
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})

export const googleProvider = new GoogleAuthProvider()
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({}),
})
export const functions = getFunctions(app)
