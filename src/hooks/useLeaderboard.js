import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export function useLeaderboard(school) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState(null)

  useEffect(() => {
    if (!school) { setEntries([]); return }
    setLoading(true)
    setError(null)

    const q = query(
      collection(db, 'leaderboard'),
      where('school', '==', school),
      orderBy('xp', 'desc'),
      limit(25),
    )

    getDocs(q)
      .then((snap) => setEntries(snap.docs.map((d) => d.data())))
      .catch((err) => setError(err.code === 'permission-denied' ? 'Update Firestore rules to allow leaderboard reads.' : err.message))
      .finally(() => setLoading(false))
  }, [school])

  return { entries, loading, error }
}
