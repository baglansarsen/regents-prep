import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { ACHIEVEMENTS } from '../data/achievements'

// Tier priority for choosing which badges to show first
const TIER_RANK = { gold: 0, silver: 1, bronze: 2 }

function topBadgeEmojis(earnedIds, max = 5) {
  if (!earnedIds?.size) return []
  return ACHIEVEMENTS
    .filter((a) => earnedIds.has(a.id))
    .sort((a, b) => (TIER_RANK[a.tier] ?? 9) - (TIER_RANK[b.tier] ?? 9))
    .slice(0, max)
    .map((a) => a.emoji)
}

async function syncLeaderboard(uid, displayName, photoURL, school, xp, earnedIds) {
  if (!uid || !school) return
  try {
    await setDoc(
      doc(db, 'leaderboard', uid),
      {
        uid,
        displayName: displayName ?? 'Anonymous',
        photoURL: photoURL ?? null,
        school,
        xp: xp ?? 0,
        badges: topBadgeEmojis(earnedIds),
        updatedAt: Date.now(),
      },
      { merge: true },
    )
  } catch {}
}

export function useSchool(user, xp, earnedIds) {
  const [school, setSchoolState] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    getDoc(doc(db, 'users', user.uid, 'meta', 'profile'))
      .then((snap) => {
        const s = snap.exists() ? snap.data().school ?? null : null
        setSchoolState(s)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user?.uid])

  // Keep leaderboard in sync whenever XP, school, or badges change
  useEffect(() => {
    if (!user?.uid || !school) return
    syncLeaderboard(user.uid, user.displayName, user.photoURL, school, xp, earnedIds)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid, user?.displayName, user?.photoURL, school, xp, earnedIds?.size])

  const saveSchool = useCallback(async (newSchool) => {
    setSchoolState(newSchool)
    if (!user?.uid) return
    try {
      await setDoc(doc(db, 'users', user.uid, 'meta', 'profile'), { school: newSchool }, { merge: true })
    } catch {}
    syncLeaderboard(user.uid, user.displayName, user.photoURL, newSchool, xp, earnedIds)
  }, [user, xp, earnedIds])

  return { school, saveSchool, loading }
}
