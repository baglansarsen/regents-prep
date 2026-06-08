/**
 * deleteUserData — best-effort removal of a user's personal data from Firestore
 * before their auth account is deleted. Must run while the user is still
 * authenticated (security rules require it). Each subcollection's documents are
 * removed in batches; top-level docs are deleted individually.
 */
import { db } from '../firebase'
import { doc, deleteDoc, collection, getDocs, writeBatch } from 'firebase/firestore'

// Subcollections under users/{uid} that hold this user's personal data.
const USER_SUBCOLLECTIONS = ['meta', 'activity', 'friends', 'petInventory', 'quizHistory']

const BATCH_LIMIT = 400 // Firestore caps batches at 500; stay comfortably under.

async function deleteCollectionDocs(colRef) {
  const snap = await getDocs(colRef)
  if (snap.empty) return
  let batch = writeBatch(db)
  let count = 0
  for (const d of snap.docs) {
    batch.delete(d.ref)
    if (++count % BATCH_LIMIT === 0) {
      await batch.commit()
      batch = writeBatch(db)
    }
  }
  if (count % BATCH_LIMIT !== 0) await batch.commit()
}

export async function deleteUserData(uid) {
  if (!uid) return
  for (const sub of USER_SUBCOLLECTIONS) {
    await deleteCollectionDocs(collection(db, 'users', uid, sub)).catch(() => {})
  }
  await deleteDoc(doc(db, 'users', uid)).catch(() => {})
  await deleteDoc(doc(db, 'leaderboard', uid)).catch(() => {})
}
