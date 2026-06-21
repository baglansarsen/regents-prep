import { useState, useEffect, useCallback } from 'react'
import {
  doc, getDoc, setDoc, deleteDoc, getDocs, addDoc, updateDoc,
  collection, query, where, orderBy, limit
} from 'firebase/firestore'
import { db } from '../firebase'

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function useFriends(uid, user) {
  const [friends, setFriends] = useState([])
  const [incomingRequests, setIncoming] = useState([])
  const [sentRequests, setSent] = useState([])
  const [friendCode, setFriendCode] = useState(null)
  const [schoolPeers, setSchoolPeers] = useState([])
  const [addError, setAddError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)

  useEffect(() => {
    if (!uid) {
      // Local Guest mock friends
      setFriendCode('GUEST-CODE')
      setFriends([
        { id: 'mock1', displayName: 'Study Buddy Sophia' },
        { id: 'mock2', displayName: 'Alex from Chemistry' }
      ])
      return
    }
    initFriendCode()
    loadRequests()
    loadFriends()
  }, [uid])

  async function initFriendCode() {
    try {
      const profileRef = doc(db, 'users', uid, 'meta', 'profile')
      const profileSnap = await getDoc(profileRef)
      let code = profileSnap.exists() ? (profileSnap.data().friendCode ?? null) : null
      if (!code) {
        code = generateCode()
        await setDoc(profileRef, { friendCode: code }, { merge: true })
      }
      await setDoc(doc(db, 'friendCodes', code), {
        uid,
        displayName: user?.displayName || 'Anonymous Student',
      }, { merge: true })
      setFriendCode(code)
    } catch (e) {
      console.warn('[useFriends] Failed to init friend code:', e)
    }
  }

  async function loadRequests() {
    if (!uid) return
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
      console.warn('[useFriends] Failed to load requests:', e)
    }
  }

  async function loadFriends() {
    if (!uid) return
    try {
      const snap = await getDocs(collection(db, 'users', uid, 'friends'))
      setFriends(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (e) {
      console.warn('[useFriends] Failed to load friends:', e)
    }
  }

  const loadSchoolPeers = useCallback(async (schoolName) => {
    if (!schoolName) {
      setSchoolPeers([])
      return
    }
    
    if (!uid) {
      // Guest local mock peers
      setSchoolPeers([
        { uid: 'peer1', displayName: 'Elena Rostova', xp: 1980, petType: 'reggie', school: schoolName },
        { uid: 'peer2', displayName: 'Raj Patel', xp: 1720, petType: 'reggie', school: schoolName },
        { uid: 'peer3', displayName: 'Chloe Zhao', xp: 1450, petType: 'reggie', school: schoolName },
        { uid: 'peer4', displayName: 'Sofia Bianchi', xp: 950, petType: 'reggie', school: schoolName },
      ])
      return
    }

    try {
      const snap = await getDocs(
        query(
          collection(db, 'leaderboard'),
          where('school', '==', schoolName)
        )
      )
      const peers = snap.docs
        .map((d) => ({ uid: d.id, displayName: d.data().displayName || 'Classmate', xp: d.data().xp || 0, petType: d.data().petType || 'reggie', school: d.data().school }))
        .filter((p) => p.uid !== uid) // exclude self
      setSchoolPeers(peers)
    } catch (e) {
      console.warn('[useFriends] Failed to load school peers:', e)
      // offline/no-data mock fallback
      setSchoolPeers([
        { uid: 'peer1', displayName: 'Elena Rostova', xp: 1980, petType: 'reggie', school: schoolName },
        { uid: 'peer2', displayName: 'Raj Patel', xp: 1720, petType: 'reggie', school: schoolName },
        { uid: 'peer3', displayName: 'Chloe Zhao', xp: 1450, petType: 'reggie', school: schoolName },
        { uid: 'peer4', displayName: 'Sofia Bianchi', xp: 950, petType: 'reggie', school: schoolName },
      ])
    }
  }, [uid])

  const addByCode = useCallback(async (code) => {
    setAddError(null)
    setSuccessMsg(null)
    const upperCode = code.trim().toUpperCase()

    if (!uid) {
      // Local Guest mock adding
      if (upperCode === 'GUEST-CODE') {
        setAddError("That's your own code!");
        return;
      }
      const newMock = { id: `mock-${Date.now()}`, displayName: `Classmate ${upperCode}` };
      setFriends(prev => [...prev, newMock]);
      setSuccessMsg(`Classmate ${upperCode} added to your local lobby!`);
      return;
    }

    try {
      const codeDoc = await getDoc(doc(db, 'friendCodes', upperCode))
      if (!codeDoc.exists()) {
        setAddError('Friend code not found. Double check the code!');
        return
      }
      const target = codeDoc.data()
      if (target.uid === uid) {
        setAddError("That's your own code!")
        return
      }

      // Check if already friends
      const alreadyFriend = friends.some((f) => f.uid === target.uid)
      if (alreadyFriend) {
        setAddError('You are already friends with this student!')
        return
      }

      await addDoc(collection(db, 'friendRequests'), {
        fromUid: uid,
        fromName: user?.displayName || 'Anonymous Student',
        toUid: target.uid,
        status: 'pending',
        timestamp: new Date().toISOString(),
      })
      setSuccessMsg(`Friend request sent successfully to ${target.displayName}!`)
      loadRequests()
    } catch (e) {
      setAddError(e.message)
    }
  }, [uid, user, friends])

  const addFriendDirectly = useCallback(async (peerUid, peerName) => {
    setSuccessMsg(null)
    setAddError(null)

    if (!uid) {
      // Guest local add
      const newFriend = { id: peerUid, displayName: peerName }
      setFriends(prev => [...prev, newFriend])
      setSchoolPeers(prev => prev.filter(p => p.uid !== peerUid))
      setSuccessMsg(`${peerName} added directly to your duel list! 🤝`)
      return
    }

    try {
      // Add directly to current user's friends list
      await setDoc(doc(doc(db, 'users', uid, 'friends', peerUid)), {
        uid: peerUid,
        displayName: peerName,
        addedAt: new Date().toISOString(),
      })
      // Add back-link to other user's friends list as well for bi-directional peer list
      await setDoc(doc(doc(db, 'users', peerUid, 'friends', uid)), {
        uid,
        displayName: user?.displayName || 'Classmate',
        addedAt: new Date().toISOString(),
      })
      
      setSuccessMsg(`Classmate ${peerName} added directly to your duel list! 🤝`)
      loadFriends()
    } catch (e) {
      console.error('[useFriends] Failed to add friend directly:', e)
      setAddError('Failed to add peer: ' + e.message)
    }
  }, [uid, user])

  const acceptRequest = useCallback(async (request) => {
    if (!uid) return
    try {
      await updateDoc(doc(db, 'friendRequests', request.id), { status: 'accepted' })
      // Add to both friends lists
      await setDoc(doc(db, 'users', uid, 'friends', request.fromUid), {
        uid: request.fromUid,
        displayName: request.fromName || 'Classmate',
        addedAt: new Date().toISOString(),
      })
      await setDoc(doc(db, 'users', request.fromUid, 'friends', uid), {
        uid,
        displayName: user?.displayName || 'Classmate',
        addedAt: new Date().toISOString(),
      })
      loadRequests()
      loadFriends()
    } catch (e) {
      console.error('[useFriends] Failed to accept request:', e)
    }
  }, [uid, user])

  const declineRequest = useCallback(async (request) => {
    if (!uid) return
    try {
      await updateDoc(doc(db, 'friendRequests', request.id), { status: 'declined' })
      loadRequests()
    } catch (e) {}
  }, [uid])

  return {
    friends,
    incomingRequests,
    sentRequests,
    friendCode,
    schoolPeers,
    addByCode,
    loadSchoolPeers,
    addFriendDirectly,
    addError,
    successMsg,
    acceptRequest,
    declineRequest,
    refreshFriends: loadFriends
  }
}
