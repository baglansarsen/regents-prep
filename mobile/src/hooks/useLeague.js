/**
 * useLeague
 *
 * Manages the weekly league competition:
 *   - Reads/initialises the user's tier from leaderboard/{uid}
 *   - On first use each week, runs promotion / demotion against last week's
 *     snapshot (lastWeekXP / lastWeekKey written by useXP on week rollover)
 *   - Fetches all members in the same tier, sorted by this week's XP
 *
 * ── Firestore composite indexes required ────────────────────────────────────
 *   Collection: leaderboard
 *     1. tier ASC + weeklyXP DESC          (current-week member query)
 *     2. tier ASC + lastWeekKey ASC + lastWeekXP DESC   (promotion check)
 *
 *   Add them in Firebase Console → Firestore → Indexes, or via firebase.json.
 * ────────────────────────────────────────────────────────────────────────────
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import {
  collection, query, where, getDocs,
  doc, getDoc, setDoc, orderBy, limit,
} from 'firebase/firestore'
import { db } from '../firebase'
import { getWeekKey } from './useRP'

// ── Tier definitions ──────────────────────────────────────────────────────────
export const TIERS = ['bronze', 'silver', 'gold', 'diamond']

export const TIER_META = {
  bronze:  { label: 'Bronze',  emoji: '🥉', color: '#CD7F32', light: '#FEF3E2', dark: '#2D1F0D' },
  silver:  { label: 'Silver',  emoji: '🥈', color: '#8C9BAB', light: '#F0F4F8', dark: '#1A1F25' },
  gold:    { label: 'Gold',    emoji: '🥇', color: '#D97706', light: '#FFFBE6', dark: '#2D2000' },
  diamond: { label: 'Diamond', emoji: '💎', color: '#1CB0F6', light: '#EBF8FF', dark: '#001D2D' },
}

export const PROMOTE_N = 10   // cap: at most this many promoted per tier each week
export const DEMOTE_N  = 5    // cap: at most this many demoted (except bronze)
export const LEAGUE_CAP = 50  // max members shown per tier

/**
 * Scale promotion/demotion counts to the tier's population so small early-stage
 * leagues don't promote nearly everyone. ~top 20% promote, ~bottom 15% demote,
 * each clamped to the caps above (and promotion always offers at least 1 slot).
 */
export function dynamicCounts(total) {
  const promote = Math.min(PROMOTE_N, Math.max(1, Math.round(total * 0.2)))
  const demote  = Math.min(DEMOTE_N,  Math.max(0, Math.round(total * 0.15)))
  return { promote, demote }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
/** Milliseconds until the next Monday 00:00 UTC (when leagues reset) */
export function msUntilReset() {
  const now = new Date()
  const utcDay = now.getUTCDay()                         // 0=Sun … 6=Sat
  const daysToMonday = utcDay === 0 ? 1 : utcDay === 1 ? 7 : 8 - utcDay
  const nextMon = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + daysToMonday,
  ))
  return nextMon.getTime() - now.getTime()
}

export function formatCountdown(ms) {
  if (ms <= 0) return 'Resetting…'
  const d = Math.floor(ms / 86_400_000)
  const h = Math.floor((ms % 86_400_000) / 3_600_000)
  const m = Math.floor((ms % 3_600_000)  /    60_000)
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useLeague(uid) {
  const [tier,         setTier]         = useState('bronze')
  const [members,      setMembers]      = useState([])
  const [loading,      setLoading]      = useState(true)
  const [justPromoted, setJustPromoted] = useState(false)
  const [justDemoted,  setJustDemoted]  = useState(false)
  const [promoteN,     setPromoteN]     = useState(PROMOTE_N)
  const [demoteN,      setDemoteN]      = useState(DEMOTE_N)

  const uidRef = useRef(uid)
  uidRef.current = uid

  useEffect(() => {
    if (!uid) return
    initLeague(uid)
  }, [uid])

  async function initLeague(uid) {
    setLoading(true)
    try {
      const lbRef  = doc(db, 'leaderboard', uid)
      const lbSnap = await getDoc(lbRef)
      const lb     = lbSnap.exists() ? lbSnap.data() : {}

      let currentTier = lb.tier ?? 'bronze'
      const currentWeek = getWeekKey()

      // ── Bootstrap tier for brand-new users ────────────────────────────────
      if (!lb.tier) {
        await setDoc(lbRef, { tier: 'bronze' }, { merge: true })
      }

      // ── Promotion / demotion check (once per week) ─────────────────────────
      let lastWeekKey = null
      let lastWeekXP = 0
      let needsRolloverUpdate = false

      if (lb.weekKey && lb.weekKey !== currentWeek) {
        lastWeekKey = lb.weekKey
        lastWeekXP = lb.weeklyXP ?? 0
        needsRolloverUpdate = true
      } else {
        lastWeekKey = lb.lastWeekKey
        lastWeekXP = lb.lastWeekXP ?? 0
      }

      const notChecked = lb.promotionChecked !== currentWeek

      if (lastWeekKey && notChecked) {
        const outcome = await computeOutcome(
          uid, currentTier, lastWeekKey, lastWeekXP,
        )
        const idx = TIERS.indexOf(currentTier)

        if (outcome === 'promoted' && idx < TIERS.length - 1) {
          currentTier = TIERS[idx + 1]
          setJustPromoted(true)
        } else if (outcome === 'demoted' && idx > 0) {
          currentTier = TIERS[idx - 1]
          setJustDemoted(true)
        }

        const updateData = {
          tier: currentTier,
          promotionChecked: currentWeek
        }
        if (needsRolloverUpdate) {
          updateData.weekKey = currentWeek
          updateData.weeklyXP = 0
          updateData.lastWeekKey = lastWeekKey
          updateData.lastWeekXP = lastWeekXP
        }
        await setDoc(lbRef, updateData, { merge: true })
      } else if (needsRolloverUpdate) {
        await setDoc(lbRef, {
          weekKey: currentWeek,
          weeklyXP: 0,
          lastWeekKey,
          lastWeekXP
        }, { merge: true })
      }

      setTier(currentTier)
      await loadMembers(currentTier, currentWeek)
    } catch (e) {
      console.warn('[useLeague] init error', e)
    } finally {
      setLoading(false)
    }
  }

  /** Determine if uid should be promoted or demoted based on last week's final ranking */
  async function computeOutcome(uid, tier, lastWeekKey, myLastXP) {
    try {
      // Requires composite index: tier ASC + lastWeekKey ASC + lastWeekXP DESC
      const q = query(
        collection(db, 'leaderboard'),
        where('tier',        '==', tier),
        where('lastWeekKey', '==', lastWeekKey),
        orderBy('lastWeekXP', 'desc'),
        limit(LEAGUE_CAP),
      )
      const snap   = await getDocs(q)
      const ranked = snap.docs.map((d) => ({ uid: d.id, rp: d.data().lastWeekXP ?? 0 }))
      const myRank = ranked.findIndex((m) => m.uid === uid) + 1  // 1-based; 0 = not found
      if (myRank === 0) return 'none'

      const total = ranked.length
      const { promote, demote } = dynamicCounts(total)
      const demoteFrom = Math.max(total - demote + 1, promote + 1)  // first rank in demotion zone

      if (myRank <= promote && tier !== 'diamond') return 'promoted'
      if (demote > 0 && myRank >= demoteFrom && tier !== 'bronze') return 'demoted'
      return 'none'
    } catch {
      return 'none'
    }
  }

  /** Query all users in the same tier, sorted by this week's XP */
  async function loadMembers(tier, weekKey) {
    try {
      // Requires composite index: tier ASC + weeklyXP DESC
      const q = query(
        collection(db, 'leaderboard'),
        where('tier', '==', tier),
        orderBy('weeklyXP', 'desc'),
        limit(LEAGUE_CAP),
      )
      const snap = await getDocs(q)
      const list = snap.docs.map((d) => {
        const data = d.data()
        // Zero out stale weeklyXP from a previous week
        const weekXP = data.weekKey === weekKey ? (data.weeklyXP ?? 0) : 0
        return {
          uid:         d.id,
          displayName: data.displayName ?? 'Student',
          weeklyXP:    weekXP,
          rp:          data.xp ?? 0,
          xp:          data.xp ?? 0,
        }
      })
      // Re-sort after nulling stale entries
      list.sort((a, b) => b.weeklyXP - a.weeklyXP || b.xp - a.xp)
      const { promote, demote } = dynamicCounts(list.length)
      setPromoteN(promote)
      setDemoteN(demote)
      setMembers(list)
    } catch (e) {
      console.warn('[useLeague] loadMembers error', e)
    }
  }

  const refresh = useCallback(async () => {
    const uid = uidRef.current
    if (!uid) return
    setLoading(true)
    try {
      const lbSnap = await getDoc(doc(db, 'leaderboard', uid))
      const t = lbSnap.exists() ? (lbSnap.data().tier ?? 'bronze') : 'bronze'
      setTier(t)
      await loadMembers(t, getWeekKey())
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    tier,
    members,
    loading,
    justPromoted,
    justDemoted,
    refresh,
    promoteN,   // scaled to current tier population
    demoteN,
  }
}
