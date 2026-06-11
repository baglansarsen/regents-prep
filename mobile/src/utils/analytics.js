import { Platform } from 'react-native'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../firebase'

/**
 * Minimal product analytics → Firestore `events` collection.
 *
 * Fire-and-forget: never throws, never blocks UI. Writes queue locally via
 * the persistent Firestore cache and sync when online.
 *
 * Query share rate (e.g. in a local script or Firebase console):
 *   share rate = count(share_completed) / count(results_viewed where params.pct >= 65)
 *
 * NOTE: iOS cannot distinguish "shared" from "dismissed the sheet" —
 * treat share_completed as an upper bound.
 */
export function logEvent(name, params = {}) {
  try {
    addDoc(collection(db, 'events'), {
      name,
      params,
      uid: auth.currentUser?.uid ?? null,
      platform: Platform.OS,
      ts: serverTimestamp(),
    }).catch((e) => console.warn('[analytics]', name, e?.message))
  } catch (e) {
    console.warn('[analytics]', name, e?.message)
  }
}
