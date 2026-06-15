/**
 * deleteUserData — removal of a user's personal data from Firestore before their
 * auth account is deleted. Must run while the user is still authenticated
 * (security rules require it). Each subcollection's documents are removed in
 * batches; top-level docs are deleted individually.
 *
 * Every target is attempted (one failure doesn't skip the rest), but if ANY
 * delete fails the function throws `DELETE_INCOMPLETE`. The caller MUST NOT
 * delete the auth account when this throws — doing so would orphan the
 * still-present personal data forever (rules block cleanup once auth.uid is
 * gone). Failing loudly lets the user retry; the operation is idempotent.
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
  const failures = []
  for (const sub of USER_SUBCOLLECTIONS) {
    try { await deleteCollectionDocs(collection(db, 'users', uid, sub)) }
    catch (e) { failures.push([`users/${uid}/${sub}`, e]) }
  }
  try { await deleteDoc(doc(db, 'users', uid)) }       catch (e) { failures.push([`users/${uid}`, e]) }
  try { await deleteDoc(doc(db, 'leaderboard', uid)) } catch (e) { failures.push([`leaderboard/${uid}`, e]) }

  if (failures.length) {
    const err = new Error(`Could not delete: ${failures.map(([path]) => path).join(', ')}`)
    err.code = 'DELETE_INCOMPLETE'
    err.causes = failures
    throw err
  }
}
