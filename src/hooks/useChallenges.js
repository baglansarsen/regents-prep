import { useState, useEffect, useCallback } from 'react'
import {
  collection, query, where, getDocs,
  addDoc, updateDoc, doc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

export function useChallenges(uid) {
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading]       = useState(false)

  const refresh = useCallback(async () => {
    if (!uid) return
    setLoading(true)
    try {
      const [sentSnap, recvSnap] = await Promise.all([
        getDocs(query(collection(db, 'challenges'), where('fromUid', '==', uid))),
        getDocs(query(collection(db, 'challenges'), where('toUid',   '==', uid))),
      ])
      const all = [
        ...sentSnap.docs.map((d) => ({ id: d.id, ...d.data(), role: 'sender' })),
        ...recvSnap.docs.map((d) => ({ id: d.id, ...d.data(), role: 'receiver' })),
      ].sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))
      setChallenges(all)
    } catch {}
    setLoading(false)
  }, [uid])

  useEffect(() => { refresh() }, [refresh])

  const sendChallenge = useCallback(
    async ({ friend, questionIds, score, user }) => {
      if (!uid) return null
      try {
        const ref = await addDoc(collection(db, 'challenges'), {
          fromUid:   uid,
          fromName:  user?.displayName ?? 'Someone',
          fromPhoto: user?.photoURL    ?? null,
          toUid:     friend.uid,
          toName:    friend.displayName,
          toPhoto:   friend.photoURL   ?? null,
          questionIds,
          fromScore: score,
          toScore:   null,
          status:    'pending',
          createdAt: serverTimestamp(),
        })
        refresh()
        return ref.id
      } catch { return null }
    },
    [uid, refresh],
  )

  const completeChallenge = useCallback(
    async (challengeId, score) => {
      try {
        await updateDoc(doc(db, 'challenges', challengeId), { toScore: score, status: 'done' })
        refresh()
      } catch {}
    },
    [refresh],
  )

  return { challenges, loading, refresh, sendChallenge, completeChallenge }
}
