import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc, increment } from 'firebase/firestore'
import { db } from '../firebase'

const LS_KEY = 'regents_xp_v1'

export function useXP(uid) {
  const [xp, setXP] = useState(0)

  useEffect(() => {
    if (!uid) return
    getDoc(doc(db, 'users', uid, 'meta', 'xp'))
      .then((snap) => { if (snap.exists()) setXP(snap.data().total ?? 0) })
      .catch(() => {
        try { setXP(Number(localStorage.getItem(LS_KEY)) || 0) } catch {}
      })
  }, [uid])

  const earnXP = useCallback(async (amount) => {
    if (!uid || amount <= 0) return
    setXP((prev) => prev + amount)
    try { await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(amount) }, { merge: true }) } catch {}
    try { localStorage.setItem(LS_KEY, String(xp + amount)) } catch {}
  }, [uid, xp])

  const spendXP = useCallback(async (amount) => {
    if (xp < amount) return false
    setXP((prev) => prev - amount)
    try { await setDoc(doc(db, 'users', uid, 'meta', 'xp'), { total: increment(-amount) }, { merge: true }) } catch {}
    try { localStorage.setItem(LS_KEY, String(xp - amount)) } catch {}
    return true
  }, [uid, xp])

  return { xp, earnXP, spendXP }
}
