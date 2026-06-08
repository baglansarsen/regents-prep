import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export function useSchool(user) {
  const [school, setSchoolState] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) {
      const saved = localStorage.getItem('@user_school')
      setSchoolState(saved)
      setLoading(false)
      return
    }
    
    getDoc(doc(db, 'users', user.uid, 'meta', 'profile'))
      .then((snap) => {
        const s = snap.exists() ? snap.data().school ?? null : null
        setSchoolState(s)
      })
      .catch(() => {
        const saved = localStorage.getItem('@user_school')
        setSchoolState(saved)
      })
      .finally(() => setLoading(false))
  }, [user?.uid])

  const saveSchool = useCallback(async (newSchool) => {
    setSchoolState(newSchool)
    localStorage.setItem('@user_school', newSchool)
    
    if (!user?.uid) return
    try {
      await setDoc(doc(db, 'users', user.uid, 'meta', 'profile'), { school: newSchool }, { merge: true })
      await setDoc(doc(db, 'leaderboard', user.uid), { school: newSchool }, { merge: true })
    } catch (e) {
      console.warn('[useSchool] Failed to sync school to Firestore:', e)
    }
  }, [user])

  return { school, saveSchool, loading }
}
