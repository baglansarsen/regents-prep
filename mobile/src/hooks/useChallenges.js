import { useState, useEffect, useCallback } from 'react'
import {
  doc, addDoc, updateDoc, getDocs, getDoc,
  collection, query, where, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

/**
 * useChallenges — async same-set PvP battles via the `challenges` collection.
 *
 * Doc shape:
 *   { fromUid, fromName, toUid, toName, subject,
 *     questions: [{ text, choices, correct, image?, context? }],
 *     fromScore, toScore | null, status: 'pending' | 'complete',
 *     winnerUid | 'tie' | null, createdAt, completedAt? }
 *
 * Flow: challenger plays first → createChallenge(...) stores the question set
 * and their score (status 'pending'). The friend later plays the SAME set →
 * submitResult(...) records their score, computes the winner, marks 'complete'.
 */
export function useChallenges(uid, user) {
  const [incoming,  setIncoming]  = useState([])   // pending, addressed to me, awaiting my play
  const [completed, setCompleted] = useState([])   // finished battles involving me

  const load = useCallback(async () => {
    if (!uid) return
    try {
      // Battles sent to me that I haven't played yet.
      const incSnap = await getDocs(
        query(
          collection(db, 'challenges'),
          where('toUid', '==', uid),
          where('status', '==', 'pending'),
        )
      )
      setIncoming(incSnap.docs.map((d) => ({ id: d.id, ...d.data() })))

      // Completed battles I started (so the challenger sees the outcome).
      const doneSnap = await getDocs(
        query(
          collection(db, 'challenges'),
          where('fromUid', '==', uid),
          where('status', '==', 'complete'),
        )
      )
      setCompleted(doneSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (e) {
      console.error('[useChallenges] load error:', e.message)
    }
  }, [uid])

  useEffect(() => { load() }, [load])

  // Challenger creates the battle after playing their round.
  const createChallenge = useCallback(async ({ toUid, toName, subject, questions, fromScore }) => {
    if (!uid) return null
    try {
      const ref = await addDoc(collection(db, 'challenges'), {
        fromUid:   uid,
        fromName:  user?.displayName ?? 'Someone',
        toUid,
        toName:    toName ?? 'Friend',
        subject:   subject ?? null,
        questions,
        fromScore,
        toScore:   null,
        status:    'pending',
        winnerUid: null,
        createdAt: serverTimestamp(),
      })
      return ref.id
    } catch (e) {
      console.error('[useChallenges] createChallenge error:', e.message)
      return null
    }
  }, [uid, user])

  // Friend submits their score; winner is computed and the battle closes.
  const submitResult = useCallback(async (challenge, toScore) => {
    try {
      // Re-fetch fresh and guard: only the addressee may close a still-pending
      // battle. Prevents a double-tap / stale screen from overwriting a result.
      const fresh = await getDoc(doc(db, 'challenges', challenge.id))
      if (!fresh.exists()) return null
      const data = fresh.data()
      if (data.status !== 'pending') {
        // Already settled — surface the recorded outcome instead of rewriting it.
        return { winnerUid: data.winnerUid, fromScore: data.fromScore ?? 0, toScore: data.toScore ?? 0, alreadyComplete: true }
      }
      if (uid && data.toUid !== uid) return null

      const fromScore = data.fromScore ?? 0
      let winnerUid = 'tie'
      if (toScore > fromScore)      winnerUid = data.toUid
      else if (fromScore > toScore) winnerUid = data.fromUid

      await updateDoc(doc(db, 'challenges', challenge.id), {
        toScore,
        winnerUid,
        status: 'complete',
        completedAt: serverTimestamp(),
      })
      load()
      return { winnerUid, fromScore, toScore }
    } catch (e) {
      console.error('[useChallenges] submitResult error:', e.message)
      return null
    }
  }, [load, uid])

  // Fetch a single challenge fresh (responder opening one to play).
  const getChallenge = useCallback(async (challengeId) => {
    try {
      const snap = await getDoc(doc(db, 'challenges', challengeId))
      return snap.exists() ? { id: snap.id, ...snap.data() } : null
    } catch (e) {
      console.error('[useChallenges] getChallenge error:', e.message)
      return null
    }
  }, [])

  return { incoming, completed, createChallenge, submitResult, getChallenge, refresh: load }
}
