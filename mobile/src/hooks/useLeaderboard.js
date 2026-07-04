import { useState, useEffect, useCallback } from 'react'
import { collection, query, where, limit, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { getWeekKey } from './useRP'
import { normalizeSchoolName, rankSchoolWeekly } from '../utils/schoolLeaderboard'

// Fetch cap for the school query. Ranking happens client-side, so this bounds
// the read; slice to DISPLAY_CAP after sorting.
const FETCH_CAP   = 50
const DISPLAY_CAP = 25

/**
 * useLeaderboard — weekly school leaderboard.
 *
 * Reads the student's school from users/{uid}/meta/school (set during
 * onboarding), then ranks classmates from the public leaderboard/{uid} docs
 * by this week's RP — same "this week only" semantics as the friends and
 * league rankings.
 *
 * Firestore shape notes:
 * - The school query is equality-only (where school ==, no orderBy) so it
 *   needs no composite index and stays cache-friendly. Sorting by weeklyXP
 *   happens client-side; FETCH_CAP bounds the read. Fine while school cohorts
 *   are small — revisit with a school+weeklyXP index if cohorts outgrow it.
 * - Rows expose only uid / displayName / weekly & total RP (see
 *   rankSchoolWeekly) — nothing else from the raw docs.
 */
export function useLeaderboard(uid, user) {
  const [leaderboard, setLeaderboard] = useState([])
  const [school,      setSchool]      = useState(null)
  const [loading,     setLoading]     = useState(false)

  const load = useCallback(async () => {
    if (!uid) return
    setLoading(true)
    try {
      const schoolSnap = await getDoc(doc(db, 'users', uid, 'meta', 'school'))
      const schoolName = normalizeSchoolName(schoolSnap.exists() ? schoolSnap.data().name : null)
      setSchool(schoolName)

      if (!schoolName) {
        setLeaderboard([])
        return
      }

      const snap = await getDocs(
        query(
          collection(db, 'leaderboard'),
          where('school', '==', schoolName),
          limit(FETCH_CAP),
        )
      )
      const docs = snap.docs.map((d) => ({ uid: d.id, ...d.data() }))

      // Self-heal: accounts that picked a school before the leaderboard doc
      // carried it won't match the query. Pull own doc so the student still
      // sees themselves, and stamp the school for future loads.
      if (!docs.some((d) => d.uid === uid)) {
        const ownSnap = await getDoc(doc(db, 'leaderboard', uid)).catch(() => null)
        const own = ownSnap?.exists() ? ownSnap.data() : {}
        docs.push({ uid, displayName: user?.displayName ?? own.displayName, ...own })
        setDoc(doc(db, 'leaderboard', uid), { school: schoolName }, { merge: true }).catch(() => {})
      }

      setLeaderboard(rankSchoolWeekly(docs, getWeekKey(), DISPLAY_CAP))
    } catch (e) {
      console.warn('[useLeaderboard]', e)
    } finally {
      setLoading(false)
    }
  }, [uid, user?.displayName])

  useEffect(() => { load() }, [load])

  return { leaderboard, school, loading, refresh: load }
}
