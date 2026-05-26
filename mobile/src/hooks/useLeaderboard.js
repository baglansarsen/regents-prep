import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export function useLeaderboard(uid) {
  const [leaderboard, setLeaderboard] = useState([])
  const [school,      setSchool]      = useState(null)
  const [loading,     setLoading]     = useState(false)

  useEffect(() => {
    if (!uid) return
    loadSchoolAndLeaderboard()
  }, [uid])

  async function loadSchoolAndLeaderboard() {
    setLoading(true)
    try {
      const schoolSnap = await getDoc(doc(db, 'users', uid, 'meta', 'school'))
      const schoolName = schoolSnap.exists() ? schoolSnap.data().name : null
      setSchool(schoolName)

      if (schoolName) {
        const snap = await getDocs(
          query(
            collection(db, 'leaderboard'),
            where('school', '==', schoolName),
            orderBy('xp', 'desc'),
            limit(25)
          )
        )
        setLeaderboard(snap.docs.map((d) => ({ uid: d.id, ...d.data() })))
      }
    } catch {}
    setLoading(false)
  }

  return { leaderboard, school, loading, refresh: loadSchoolAndLeaderboard }
}
