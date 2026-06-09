import { useState, useEffect, useCallback } from 'react'
import {
  doc, getDoc, setDoc, deleteDoc, getDocs, addDoc, updateDoc,
  collection, query, where, orderBy, limit, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function timeAgo(ms) {
  if (!ms || ms === 0) return 'just now'
  const d = Date.now() - ms
  if (d < 0) return 'just now'
  if (d < 60_000)        return 'just now'
  if (d < 3_600_000)     return `${Math.floor(d / 60_000)}m ago`
  if (d < 86_400_000)    return `${Math.floor(d / 3_600_000)}h ago`
  return `${Math.floor(d / 86_400_000)}d ago`
}

export function useFriends(uid, user) {
  const [friends,          setFriends]   = useState([])
  const [incomingRequests, setIncoming]  = useState([])
  const [sentRequests,     setSent]      = useState([])
  const [friendCode,       setFriendCode]= useState(null)
  const [feed,             setFeed]      = useState([])
  const [addError,         setAddError]  = useState(null)

  useEffect(() => {
    if (!uid) return
    initFriendCode()
    loadRequests()
    loadFriends()
    loadFeed()
  }, [uid])

  async function initFriendCode() {
    const profileRef  = doc(db, 'users', uid, 'meta', 'profile')
    const profileSnap = await getDoc(profileRef)
    let code = profileSnap.exists() ? (profileSnap.data().friendCode ?? null) : null
    if (!code) {
      code = generateCode()
      await setDoc(profileRef, { friendCode: code }, { merge: true })
    }
    try {
      await setDoc(doc(db, 'friendCodes', code), {
        uid,
        displayName: user?.displayName ?? 'Anonymous',
      }, { merge: true })
    } catch {}
    setFriendCode(code)
  }

  async function loadRequests() {
    try {
      const incSnap = await getDocs(
        query(collection(db, 'friendRequests'), where('toUid', '==', uid), where('status', '==', 'pending'))
      )
      setIncoming(incSnap.docs.map((d) => ({ id: d.id, ...d.data() })))

      const sentSnap = await getDocs(
        query(collection(db, 'friendRequests'), where('fromUid', '==', uid), where('status', '==', 'pending'))
      )
      setSent(sentSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (e) {
      console.error('[useFriends] loadRequests error:', e.message)
    }
  }

  async function loadFriends() {
    try {
      const snap = await getDocs(collection(db, 'users', uid, 'friends'))
      const friendDocs = snap.docs.map((d) => ({ id: d.id, ...d.data() }))

      // Enrich friend data with stats
      const enrichedFriends = await Promise.all(
        friendDocs.map(async (friend) => {
          try {
            const userUid = friend.uid || friend.id

            // Get RP/level
            const rpDoc = await getDoc(doc(db, 'users', userUid, 'meta', 'xp'))
            const totalRP = rpDoc.exists() ? (rpDoc.data().total ?? 0) : 0

            // Get weekly RP
            const weeklyDoc = await getDoc(doc(db, 'users', userUid, 'meta', 'weeklyXP'))
            const weeklyRP = weeklyDoc.exists() ? (weeklyDoc.data().xp ?? 0) : 0

            // Get streak
            const streakDoc = await getDoc(doc(db, 'users', userUid, 'meta', 'streak'))
            const streak = streakDoc.exists() ? (streakDoc.data().streak ?? streakDoc.data().count ?? 0) : 0

            // Get pet emoji
            const petDoc = await getDoc(doc(db, 'users', userUid, 'meta', 'pet'))
            const petType = petDoc.exists() ? (petDoc.data().petType ?? 'dog') : 'dog'
            const petEmojis = { dog: '🐶', cat: '🐱', parrot: '🦜', rabbit: '🐰', fish: '🐠', hamster: '🐹' }
            const petEmoji = petEmojis[petType] ?? '🐾'

            // Calculate level
            const LEVELS = [
              { level: 1, min: 0 },
              { level: 2, min: 200 },
              { level: 3, min: 500 },
              { level: 4, min: 1000 },
              { level: 5, min: 2000 },
              { level: 6, min: 4000 },
              { level: 7, min: 8000 },
            ]
            const level = [...LEVELS].reverse().find((l) => totalRP >= l.min)?.level ?? 1

            return {
              ...friend,
              level,
              totalRP,
              weeklyRP,
              streak,
              petEmoji,
            }
          } catch (e) {
            console.error(`[useFriends] Failed to enrich friend ${friend.id}:`, e.message)
            return friend
          }
        })
      )

      setFriends(enrichedFriends)
    } catch (e) {
      console.error('[useFriends] loadFriends error:', e.message)
    }
  }

  async function loadFeed() {
    try {
      const friendList = await getDocs(collection(db, 'users', uid, 'friends'))
      const friendUids = friendList.docs.map((d) => d.data().uid || d.id)

      // Load activities from all friends + user
      const allActivityDocs = []
      const uidsToCheck = [uid, ...friendUids]

      for (const checkUid of uidsToCheck) {
        try {
          const snap = await getDocs(
            query(collection(db, 'users', checkUid, 'activity'), orderBy('timestamp', 'desc'), limit(10))
          )
          allActivityDocs.push(
            ...snap.docs.map((d) => ({
              id: d.id,
              fromUid: checkUid,
              ...d.data(),
            }))
          )
        } catch (e) {
          console.warn(`[useFriends] Failed to load activity for ${checkUid}:`, e.message)
        }
      }

      // Sort all activities by timestamp (newest first)
      allActivityDocs.sort((a, b) => {
        const aTime = a.timestamp?.toMillis?.() ?? a.timestamp ?? 0
        const bTime = b.timestamp?.toMillis?.() ?? b.timestamp ?? 0
        return bTime - aTime
      })

      setFeed(allActivityDocs.slice(0, 20))
    } catch (e) {
      console.error('[useFriends] loadFeed error:', e.message)
    }
  }

  const addByCode = useCallback(async (code) => {
    setAddError(null)
    try {
      const codeDoc = await getDoc(doc(db, 'friendCodes', code.toUpperCase()))
      if (!codeDoc.exists()) { setAddError('Friend code not found.'); return }
      const target = codeDoc.data()
      if (target.uid === uid) { setAddError("That's your own code!"); return }

      await addDoc(collection(db, 'friendRequests'), {
        fromUid: uid,
        fromName: user?.displayName ?? 'Someone',
        toUid: target.uid,
        status: 'pending',
        timestamp: serverTimestamp(),
      })
      setSent((prev) => [...prev, { fromUid: uid, toUid: target.uid, toName: target.displayName }])
    } catch (e) {
      setAddError(e.message)
    }
  }, [uid, user])

  // Send a friend request directly by UID (used from leaderboard / profile views)
  const sendRequestByUid = useCallback(async (toUid, toName) => {
    if (!uid || toUid === uid) return 'self'
    // Check if already friends
    const alreadyFriend = friends.some((f) => f.id === toUid || f.uid === toUid)
    if (alreadyFriend) return 'already_friends'
    // Check if request already pending
    const alreadySent = sentRequests.some((r) => r.toUid === toUid)
    if (alreadySent) return 'already_sent'
    try {
      await addDoc(collection(db, 'friendRequests'), {
        fromUid: uid,
        fromName: user?.displayName ?? 'Someone',
        toUid,
        status: 'pending',
        timestamp: serverTimestamp(),
      })
      setSent((prev) => [...prev, { fromUid: uid, toUid, toName }])
      return 'sent'
    } catch (e) {
      return 'error'
    }
  }, [uid, user, friends, sentRequests])

  const acceptRequest = useCallback(async (request) => {
    try {
      await updateDoc(doc(db, 'friendRequests', request.id), { status: 'accepted' })

      // Add the requester to MY friends list (my own subtree — always allowed).
      await setDoc(doc(db, 'users', uid, 'friends', request.fromUid), {
        uid: request.fromUid,
        displayName: request.fromName ?? 'Friend',
        addedAt: serverTimestamp(),
      })

      // Reciprocal: add ME to the requester's friends list. This writes into
      // the requester's subtree, allowed only because firestore.rules grants
      // create when the docId equals our own uid. If it fails the friendship
      // is one-sided, so surface the error rather than swallowing it.
      await setDoc(doc(db, 'users', request.fromUid, 'friends', uid), {
        uid,
        displayName: user?.displayName ?? 'Friend',
        addedAt: serverTimestamp(),
      })

      loadRequests()
      loadFriends()
      return 'accepted'
    } catch (e) {
      console.error('[useFriends] acceptRequest error:', e.message)
      return 'error'
    }
  }, [uid, user])

  const declineRequest = useCallback(async (request) => {
    try {
      await updateDoc(doc(db, 'friendRequests', request.id), { status: 'declined' })
      loadRequests()
    } catch {}
  }, [])

  return {
    friends, incomingRequests, sentRequests, friendCode, feed,
    addByCode, addError, sendRequestByUid, acceptRequest, declineRequest,
    refreshFeed: loadFeed, refreshRequests: loadRequests, refreshFriends: loadFriends,
  }
}
