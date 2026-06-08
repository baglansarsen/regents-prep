import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export async function logActivity(uid, type, text, metadata = {}) {
  if (!uid) return
  try {
    await addDoc(collection(db, 'users', uid, 'activity'), {
      type,
      text,
      timestamp: serverTimestamp(),
      ...metadata,
    })
  } catch (e) {
    console.warn(`[activityLogger] Failed to log ${type}:`, e.message)
  }
}
