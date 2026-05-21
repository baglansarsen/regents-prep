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
  const d = Date.now() - ms
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
    } catch {}
  }

  async function loadFriends() {
    try {
      const snap = await getDocs(collection(db, 'users', uid, 'friends'))
      setFriends(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch {}
  }

  async function loadFeed() {
    try {
      const snap = await getDocs(
        query(collection(db, 'users', uid, 'activity'), orderBy('timestamp', 'desc'), limit(20))
      )
      setFeed(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch {}
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

  const acceptRequest = useCallback(async (request) => {
    try {
      await updateDoc(doc(db, 'friendRequests', request.id), { status: 'accepted' })
      // Add to both friends lists
      await setDoc(doc(db, 'users', uid, 'friends', request.fromUid), {
        uid: request.fromUid,
        displayName: request.fromName ?? 'Friend',
        addedAt: serverTimestamp(),
      })
      await setDoc(doc(db, 'users', request.fromUid, 'friends', uid), {
        uid,
        displayName: user?.displayName ?? 'Friend',
        addedAt: serverTimestamp(),
      })
      loadRequests()
      loadFriends()
    } catch {}
  }, [uid, user])

  const declineRequest = useCallback(async (request) => {
    try {
      await updateDoc(doc(db, 'friendRequests', request.id), { status: 'declined' })
      loadRequests()
    } catch {}
  }, [])

  return {
    friends, incomingRequests, sentRequests, friendCode, feed,
    addByCode, addError, acceptRequest, declineRequest,
    refreshFeed: loadFeed,
  }
}
