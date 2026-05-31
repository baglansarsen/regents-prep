import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            "AIzaSyBZrJZ1MBnLAefK2gmc9B8YY5IS_AGBAUI",
  authDomain:        "regents-prep.firebaseapp.com",
  projectId:         "regents-prep",
  storageBucket:     "regents-prep.firebasestorage.app",
  messagingSenderId: "752904748328",
  appId:             "1:752904748328:web:31fa4d51c44db138a6641d",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Setup persistent single tab cache for lightning fast reloads
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager({ forceOwnership: false }),
  }),
})
