import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  doc, getDoc, setDoc, deleteDoc, getDocs, addDoc, updateDoc,
  collection, query, where, orderBy, limit,
} from 'firebase/firestore'
// friendCodes/{code} → { uid, displayName, photoURL }
// Direct doc-ID lookup — no query index, no dependency on school being set
import { db } from '../firebase'

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function timeAgo(ms) {
  const d = Date.now() - ms
  if (d < 60_000) return 'just now'
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`
  return `${Math.floor(d / 86_400_000)}d ago`
}

export function useFriends(uid, user) {
  const [friendsBase, setFriendsBase] = useState([])  // { requestId, uid, displayName, photoURL }
  const [xpMap,       setXpMap]       = useState({})
  const [incomingRequests, setIncoming] = useState([]) // pending requests TO me
  const [sentRequests,     setSent]     = useState([]) // pending requests FROM me
  const [friendCode,  setFriendCode]  = useState(null)
  const [feed,        setFeed]        = useState([])
  const [addError,    setAddError]    = useState(null)

  // Init: load/create friend code and load all requests
  useEffect(() => {
    if (!uid) return

    async function init() {
      // Friend code
      const profileRef  = doc(db, 'users', uid, 'meta', 'profile')
      const profileSnap = await getDoc(profileRef)
      let code = profileSnap.exists() ? (profileSnap.data().friendCode ?? null) : null
      if (!code) {
        code = generateCode()
        await setDoc(profileRef, { friendCode: code }, { merge: true })
      }
      // Write to leaderboard (includes uid field so lookups work even without school)
      try { await setDoc(doc(db, 'leaderboard', uid), { friendCode: code, uid }, { merge: true }) } catch {}
      // Write to dedicated lookup table — fast doc-ID lookup, no index required
      try {
        await setDoc(doc(db, 'friendCodes', code), {
          uid,
          displayName: user?.displayName ?? 'Unknown',
          photoURL:    user?.photoURL    ?? null,
        })
      } catch {}
      setFriendCode(code)

      // Load all friendRequests involving this user
      const [sentSnap, incomingSnap] = await Promise.all([
        getDocs(query(collection(db, 'friendRequests'), where('fromUid', '==', uid))),
        getDocs(query(collection(db, 'friendRequests'), where('toUid',   '==', uid))),
      ])

      const sent     = sentSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
      const incoming = incomingSnap.docs.map((d) => ({ id: d.id, ...d.data() }))

      setSent(sent.filter((r) => r.status === 'pending'))
      setIncoming(incoming.filter((r) => r.status === 'pending'))

      // Deduplicate by uid — two requests between the same pair (one sent, one received)
      // both accepted would otherwise produce two entries for the same person
      const seen = new Set()
      const acceptedFriends = [
        ...sent.filter((r) => r.status === 'accepted').map((r) => ({
          requestId:   r.id,
          uid:         r.toUid,
          displayName: r.toName,
          photoURL:    r.toPhoto ?? null,
        })),
        ...incoming.filter((r) => r.status === 'accepted').map((r) => ({
          requestId:   r.id,
          uid:         r.fromUid,
          displayName: r.fromName,
          photoURL:    r.fromPhoto ?? null,
        })),
      ].filter((f) => {
        if (seen.has(f.uid)) return false
        seen.add(f.uid)
        return true
      })
      setFriendsBase(acceptedFriends)
    }

    init().catch(() => {})
  }, [uid])

  // Refresh XP from leaderboard when friend list changes
  useEffect(() => {
    if (!uid || friendsBase.length === 0) { setXpMap({}); return }
    const uids = friendsBase.map((f) => f.uid).slice(0, 30)
    getDocs(query(collection(db, 'leaderboard'), where('uid', 'in', uids)))
      .then((snap) => {
        const map = {}
        snap.docs.forEach((d) => { const data = d.data(); map[data.uid] = data })
        setXpMap(map)
      })
      .catch(() => {})
  }, [uid, friendsBase.length])

  // Activity feed
  useEffect(() => {
    if (!uid) return
    const uids = [uid, ...friendsBase.map((f) => f.uid).slice(0, 9)]
    Promise.all(
      uids.map((authorUid) =>
        getDocs(query(collection(db, 'users', authorUid, 'activity'), orderBy('createdAt', 'desc'), limit(5)))
          .then((snap) => snap.docs.map((d) => ({ id: d.id, authorUid, ...d.data() })))
          .catch(() => []),
      ),
    ).then((results) => {
      const all = results.flat().sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      setFeed(all.slice(0, 20))
    })
  }, [uid, friendsBase.length])

  const friends = useMemo(
    () => friendsBase.map((f) => ({
      ...f,
      xp:     xpMap[f.uid]?.xp     ?? 0,
      badges: xpMap[f.uid]?.badges ?? [],
    })),
    [friendsBase, xpMap],
  )

  // Send a friend request given a target uid + profile object
  const sendRequest = useCallback(
    async (targetUid, targetProfile) => {
      setAddError(null)
      if (!uid || !targetUid) return false
      if (targetUid === uid) { setAddError("That's you!"); return false }
      if (friendsBase.some((f) => f.uid === targetUid))         { setAddError('Already friends!'); return false }
      if (sentRequests.some((r) => r.toUid === targetUid))      { setAddError('Request already sent.'); return false }
      if (incomingRequests.some((r) => r.fromUid === targetUid)) {
        setAddError('They already sent you a request — check your incoming requests.')
        return false
      }

      try {
        const ref = await addDoc(collection(db, 'friendRequests'), {
          fromUid:  uid,
          fromName: user?.displayName ?? 'Unknown',
          fromPhoto: user?.photoURL   ?? null,
          toUid:    targetUid,
          toName:   targetProfile.displayName ?? 'Unknown',
          toPhoto:  targetProfile.photoURL    ?? null,
          status:   'pending',
          createdAt: Date.now(),
        })
        setSent((prev) => [...prev, {
          id: ref.id, fromUid: uid, toUid: targetUid,
          toName: targetProfile.displayName, status: 'pending', createdAt: Date.now(),
        }])
        return true
      } catch {
        setAddError('Could not send request. Try again.')
        return false
      }
    },
    [uid, user, friendsBase, sentRequests, incomingRequests],
  )

  // Add friend by code — looks up friendCodes collection (fast doc-ID lookup),
  // falls back to leaderboard query for users registered before this change
  const addFriend = useCallback(
    async (code) => {
      setAddError(null)
      if (!uid || !code.trim()) return false
      const clean = code.trim().toUpperCase()
      if (clean === friendCode) { setAddError("That's your own code!"); return false }
      try {
        // Primary: direct lookup by document ID (no index, no school required)
        const codeSnap = await getDoc(doc(db, 'friendCodes', clean))
        if (codeSnap.exists()) {
          const profile   = codeSnap.data()
          const targetUid = profile.uid
          if (!targetUid) { setAddError('Invalid code.'); return false }
          return await sendRequest(targetUid, profile)
        }

        // Fallback: leaderboard query (for users who signed up before friendCodes existed)
        const lbSnap = await getDocs(query(collection(db, 'leaderboard'), where('friendCode', '==', clean), limit(1)))
        if (lbSnap.empty) { setAddError('No user found with that code. Ask them to open the app first.'); return false }
        const profile   = lbSnap.docs[0].data()
        const targetUid = profile.uid
        if (!targetUid) { setAddError('No user found with that code. Ask them to open the app first.'); return false }
        return await sendRequest(targetUid, profile)
      } catch {
        setAddError('Could not send request. Try again.')
        return false
      }
    },
    [uid, friendCode, sendRequest],
  )

  const acceptRequest = useCallback(
    async (request) => {
      if (!uid) return
      try {
        await updateDoc(doc(db, 'friendRequests', request.id), { status: 'accepted' })
        const newFriend = {
          requestId:   request.id,
          uid:         request.fromUid,
          displayName: request.fromName,
          photoURL:    request.fromPhoto ?? null,
          xp:          0,
          badges:      [],
        }
        setFriendsBase((prev) => [...prev, newFriend])
        setIncoming((prev) => prev.filter((r) => r.id !== request.id))
      } catch {}
    },
    [uid],
  )

  const declineRequest = useCallback(
    async (requestId) => {
      if (!uid) return
      try {
        await updateDoc(doc(db, 'friendRequests', requestId), { status: 'declined' })
        setIncoming((prev) => prev.filter((r) => r.id !== requestId))
      } catch {}
    },
    [uid],
  )

  const removeFriend = useCallback(
    async (friendUid) => {
      if (!uid) return
      const friend = friendsBase.find((f) => f.uid === friendUid)
      if (!friend?.requestId) return
      try {
        await deleteDoc(doc(db, 'friendRequests', friend.requestId))
        setFriendsBase((prev) => prev.filter((f) => f.uid !== friendUid))
      } catch {}
    },
    [uid, friendsBase],
  )

  const logActivity = useCallback(
    async ({ type, label, emoji, xp = 0 }) => {
      if (!uid) return
      try {
        await addDoc(collection(db, 'users', uid, 'activity'), { type, label, emoji, xp, createdAt: Date.now() })
      } catch {}
    },
    [uid],
  )

  return {
    friends,
    friendCode,
    feed,
    incomingRequests,
    sentRequests,
    addError,
    setAddError,
    addFriend,
    sendRequest,
    acceptRequest,
    declineRequest,
    removeFriend,
    logActivity,
  }
}
