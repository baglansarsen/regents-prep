import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, getDocs, setDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { getWeekKey } from './useRP'

/**
 * Fetches weekly XP for the current user + all their friends from
 * the public `leaderboard/{uid}` docs, sorts by weeklyXP desc, and
 * returns a ranked array including the current user.
 *
 * Stale weeklyXP (from a past week) is treated as 0 so the ranking
 * is always "this week only."
 */
export function useFriendsLeaderboard(uid, user) {
  const [weeklyRanking, setWeeklyRanking] = useState([])
  const [loading,       setLoading]       = useState(false)

  const load = useCallback(async () => {
    if (!uid) return
    setLoading(true)
    try {
      const week = getWeekKey()

      // 1. Get friend uid list
      const friendsSnap = await getDocs(collection(db, 'users', uid, 'friends'))
      const friendUids  = friendsSnap.docs.map((d) => d.id)

      // 2. Fetch leaderboard docs for self + all friends in parallel
      const allUids = [uid, ...friendUids]
      const lbDocs  = await Promise.all(
        allUids.map((u) => getDoc(doc(db, 'leaderboard', u)).catch(() => null))
      )

      // 3. Fetch friend display names from their friendCodes docs as fallback
      //    (the friendCode doc was created with { uid, displayName } in useFriends)
      const friendNameMap = {}
      friendsSnap.docs.forEach((d) => {
        const data = d.data()
        friendNameMap[d.id] = data.displayName ?? null
      })

      // 4. Build ranking rows
      const rows = allUids.map((u, i) => {
        const lb = lbDocs[i]?.exists() ? lbDocs[i].data() : {}

        // Name priority: leaderboard doc > friends subcollection displayName > fallback
        const name =
          lb.displayName ??
          (u === uid ? (user?.displayName ?? 'You') : (friendNameMap[u] ?? 'Friend'))

        // Reset stale weekly XP to 0 so past weeks don't pollute this week's rank
        const weeklyXP = lb.weekKey === week ? (lb.weeklyXP ?? 0) : 0
        const totalXP  = lb.xp ?? 0

        return { uid: u, displayName: name, weeklyXP, totalXP, isSelf: u === uid }
      })

      // 5. Sort by weekly XP desc, total XP as tiebreaker
      rows.sort((a, b) => b.weeklyXP - a.weeklyXP || b.totalXP - a.totalXP)

      setWeeklyRanking(rows)

      // 6. Bootstrap own leaderboard doc with displayName if missing
      if (user?.displayName) {
        const ownLb = lbDocs[0]?.exists() ? lbDocs[0].data() : {}
        if (!ownLb.displayName) {
          setDoc(
            doc(db, 'leaderboard', uid),
            { displayName: user.displayName },
            { merge: true },
          ).catch(() => {})
        }
      }
    } catch (e) {
      console.warn('[useFriendsLeaderboard]', e)
    }
    setLoading(false)
  }, [uid, user])

  useEffect(() => { load() }, [load])

  return { weeklyRanking, loading, refresh: load }
}
