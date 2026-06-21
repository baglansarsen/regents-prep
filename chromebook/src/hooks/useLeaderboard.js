import { useState, useEffect, useCallback } from 'react'
import { collection, query, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export function useLeaderboard(uid) {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(false)

  const loadLeaderboard = useCallback(async () => {
    setLoading(true)
    try {
      // Query global leaderboard
      const snap = await getDocs(
        query(
          collection(db, 'leaderboard'),
          orderBy('xp', 'desc'),
          limit(25)
        )
      )
      setLeaderboard(snap.docs.map((d) => ({ uid: d.id, ...d.data() })))
    } catch (e) {
      console.warn('[useLeaderboard] Failed to load leaderboard:', e)
      // Provide mock items for rich visual mockups when offline or Firestore has no data
      setLeaderboard([
        { uid: '1', displayName: 'Alex Mercer', xp: 2450, petType: 'reggie', school: 'Brooklyn Technical HS' },
        { uid: '2', displayName: 'Elena Rostova', xp: 1980, petType: 'reggie', school: 'Stuyvesant HS' },
        { uid: '3', displayName: 'Raj Patel', xp: 1720, petType: 'reggie', school: 'Bronx Science' },
        { uid: '4', displayName: 'Chloe Zhao', xp: 1450, petType: 'reggie', school: 'Townsend Harris HS' },
        { uid: uid ?? 'me', displayName: 'You (Studying)', xp: 1250, petType: 'reggie', school: 'Brooklyn Technical HS' },
        { uid: '5', displayName: 'Sofia Bianchi', xp: 950, petType: 'reggie', school: 'Staten Island Tech' },
      ])
    }
    setLoading(false)
  }, [uid])

  useEffect(() => {
    loadLeaderboard()
  }, [loadLeaderboard])

  return { leaderboard, loading, refresh: loadLeaderboard }
}
