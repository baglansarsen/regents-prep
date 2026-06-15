import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Per-user state that lives in AsyncStorage but is NOT keyed by uid. On a shared
 * device, signing out and into a different account would otherwise let the
 * second user see the first user's streak / RP / pet / lives via the optimistic
 * "paint from cache" reads — and, worse, those caches are used as a Firestore
 * fallback, so the stale values can be written back into the wrong account.
 *
 * Call this on sign-out and account deletion so the next user starts clean.
 * Cloud data (Firestore) remains the source of truth and re-hydrates on login.
 *
 * Keys are matched by exact name or prefix. Prefix matching covers the
 * date/uid-suffixed keys (quests, daily dig, pet pats, skip-unlocks).
 */
const EXACT_KEYS = [
  '@regents_streak_v1', '@streakFreeze_v2',
  '@regents_rp_v1', '@regents_xp_v1',
  '@lives', '@livesNextRefillAt',
  '@dailyGoal_v4', '@dailyGoal_v3',
  '@mistakes_v1',
  '@petData_v1', '@petPendingEvo_v1',
  '@doubleRPBoost_v1',
  '@levelUp',
  '@isSubscribed_v1',   // cached entitlement — clear so the next account isn't briefly shown as Premium
]

const PREFIXES = [
  '@skipUnlocks_',   // per-subject unit unlocks
  '@petted_v1_',     // daily pet-pat counter
  '@lastDig_v1_',    // daily dig timestamp
  '@dailyQuest_v1_', // daily quest progress
]

export async function clearLocalUserData() {
  try {
    const all = await AsyncStorage.getAllKeys()
    const toRemove = all.filter(
      (k) => EXACT_KEYS.includes(k) || PREFIXES.some((p) => k.startsWith(p)),
    )
    if (toRemove.length) await AsyncStorage.multiRemove(toRemove)
  } catch {
    // Best-effort: failing to clear is non-fatal, the user can still sign in.
  }
}
