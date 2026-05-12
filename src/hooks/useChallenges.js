import { useState, useEffect, useCallback } from 'react'
import {
  collection, query, where, getDocs,
  addDoc, updateDoc, doc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

export function useChallenges(uid) {
  const [challenges, setChallenges] = useState([])

  const refresh = useCallback(async () => {
    if (!uid) return
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
  }, [uid])

  useEffect(() => { refresh() }, [refresh])

  // Create a battle request — no scores yet, receiver must accept before either plays
  const sendBattleRequest = useCallback(
    async ({ friend, questionIds, user }) => {
      if (!uid) return null
      try {
        const ref = await addDoc(collection(db, 'challenges'), {
          fromUid:    uid,
          fromName:   user?.displayName ?? 'Someone',
          fromPhoto:  user?.photoURL    ?? null,
          toUid:      friend.uid,
          toName:     friend.displayName,
          toPhoto:    friend.photoURL   ?? null,
          questionIds,
          fromScore:  null,
          toScore:    null,
          status:     'pending',
          createdAt:  serverTimestamp(),
        })
        refresh()
        return ref.id
      } catch { return null }
    },
    [uid, refresh],
  )

  const acceptBattle = useCallback(async (challengeId) => {
    try {
      await updateDoc(doc(db, 'challenges', challengeId), { status: 'accepted' })
      refresh()
    } catch {}
  }, [refresh])

  const declineBattle = useCallback(async (challengeId) => {
    try {
      await updateDoc(doc(db, 'challenges', challengeId), { status: 'declined' })
      refresh()
    } catch {}
  }, [refresh])

  // Record a player's score; if both are now in, marks the battle done
  const submitScore = useCallback(
    async (challengeId, score, role) => {
      const challenge   = challenges.find((c) => c.id === challengeId)
      const field       = role === 'sender' ? 'fromScore' : 'toScore'
      const otherScore  = role === 'sender' ? (challenge?.toScore ?? null) : (challenge?.fromScore ?? null)
      const update      = { [field]: score }
      if (otherScore !== null) update.status = 'done'
      try {
        await updateDoc(doc(db, 'challenges', challengeId), update)
        refresh()
        return { done: otherScore !== null, opponentScore: otherScore }
      } catch { return { done: false, opponentScore: null } }
    },
    [refresh, challenges],
  )

  return { challenges, refresh, sendBattleRequest, acceptBattle, declineBattle, submitScore }
}
