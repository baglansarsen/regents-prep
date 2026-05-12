import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  doc, getDoc, setDoc, deleteDoc, getDocs, addDoc,
  collection, query, where, orderBy, limit,
} from 'firebase/firestore'
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

export function useFriends(uid) {
  const [friendsBase, setFriendsBase] = useState([])
  const [friendsLB, setFriendsLB]   = useState({})
  const [friendCode, setFriendCode] = useState(null)
  const [feed, setFeed]             = useState([])
  const [loading, setLoading]       = useState(true)
  const [addError, setAddError]     = useState(null)

  // Load / create friend code and friend list on mount
  useEffect(() => {
    if (!uid) { setLoading(false); return }

    async function init() {
      const profileRef  = doc(db, 'users', uid, 'meta', 'profile')
      const profileSnap = await getDoc(profileRef)
      let code = profileSnap.exists() ? (profileSnap.data().friendCode ?? null) : null

      if (!code) {
        code = generateCode()
        await setDoc(profileRef, { friendCode: code }, { merge: true })
      }
      // Publish code in leaderboard doc so others can search by it
      try { await setDoc(doc(db, 'leaderboard', uid), { friendCode: code }, { merge: true }) } catch {}
      setFriendCode(code)

      try {
        const snap = await getDocs(collection(db, 'users', uid, 'friends'))
        setFriendsBase(snap.docs.map((d) => d.data()))
      } catch {}
      setLoading(false)
    }

    init().catch(() => setLoading(false))
  }, [uid])

  // Refresh XP from leaderboard when friend count changes
  useEffect(() => {
    if (!uid || friendsBase.length === 0) { setFriendsLB({}); return }
    const uids = friendsBase.map((f) => f.uid).slice(0, 30)
    getDocs(query(collection(db, 'leaderboard'), where('uid', 'in', uids)))
      .then((snap) => {
        const map = {}
        snap.docs.forEach((d) => { const data = d.data(); map[data.uid] = data })
        setFriendsLB(map)
      })
      .catch(() => {})
  }, [uid, friendsBase.length])

  // Refresh activity feed (own + friends)
  useEffect(() => {
    if (!uid) return
    const uids = [uid, ...friendsBase.map((f) => f.uid).slice(0, 9)]

    Promise.all(
      uids.map((authorUid) =>
        getDocs(
          query(
            collection(db, 'users', authorUid, 'activity'),
            orderBy('createdAt', 'desc'),
            limit(5),
          ),
        )
          .then((snap) => snap.docs.map((d) => ({ id: d.id, authorUid, ...d.data() })))
          .catch(() => []),
      ),
    ).then((results) => {
      const all = results.flat().sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
      setFeed(all.slice(0, 20))
    })
  }, [uid, friendsBase.length])

  const friends = useMemo(
    () =>
      friendsBase.map((f) => ({
        ...f,
        xp:     friendsLB[f.uid]?.xp     ?? f.xp     ?? 0,
        badges: friendsLB[f.uid]?.badges ?? [],
      })),
    [friendsBase, friendsLB],
  )

  const addFriend = useCallback(
    async (code) => {
      setAddError(null)
      if (!uid || !code.trim()) return false
      const clean = code.trim().toUpperCase()
      if (clean === friendCode) { setAddError("That's your own code!"); return false }

      try {
        const q    = query(collection(db, 'leaderboard'), where('friendCode', '==', clean), limit(1))
        const snap = await getDocs(q)
        if (snap.empty) { setAddError('No user found with that code.'); return false }

        const profile   = snap.docs[0].data()
        const friendUid = profile.uid
        if (!friendUid)                              { setAddError('Invalid code.'); return false }
        if (friendsBase.some((f) => f.uid === friendUid)) { setAddError('Already friends!'); return false }

        const entry = {
          uid:         friendUid,
          displayName: profile.displayName ?? 'Unknown',
          photoURL:    profile.photoURL    ?? null,
          xp:          profile.xp          ?? 0,
          addedAt:     Date.now(),
        }
        await setDoc(doc(db, 'users', uid, 'friends', friendUid), entry)
        setFriendsBase((prev) => [...prev, entry])
        return true
      } catch {
        setAddError('Could not add friend. Try again.')
        return false
      }
    },
    [uid, friendCode, friendsBase],
  )

  const removeFriend = useCallback(
    async (friendUid) => {
      if (!uid) return
      await deleteDoc(doc(db, 'users', uid, 'friends', friendUid)).catch(() => {})
      setFriendsBase((prev) => prev.filter((f) => f.uid !== friendUid))
    },
    [uid],
  )

  const logActivity = useCallback(
    async ({ type, label, emoji, xp = 0 }) => {
      if (!uid) return
      try {
        await addDoc(collection(db, 'users', uid, 'activity'), {
          type, label, emoji, xp, createdAt: Date.now(),
        })
      } catch {}
    },
    [uid],
  )

  return {
    friends,
    friendCode,
    feed,
    loading,
    addError,
    setAddError,
    addFriend,
    removeFriend,
    logActivity,
  }
}
