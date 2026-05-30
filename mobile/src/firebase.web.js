// Web build of the Firebase entry. Metro picks this over firebase.js when the
// platform is web. It avoids the React-Native-only `@firebase/auth/dist/rn`
// persistence (which doesn't exist on web) and uses browser local persistence.
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            'AIzaSyCT60SEmSTxgQQdud3S9HQSS7fojwf-LGM',
  authDomain:        'regents-prep.firebaseapp.com',
  projectId:         'regents-prep',
  storageBucket:     'regents-prep.firebasestorage.app',
  messagingSenderId: '752904748328',
  appId:             '1:752904748328:android:74ee59206cdd2ed8a6641d',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
// Keep the user signed in across reloads in the browser.
setPersistence(auth, browserLocalPersistence).catch(() => {})

export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
