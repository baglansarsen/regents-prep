import { useStreak } from '../context/StreakContext'

/**
 * useDailyStreak — backwards-compatible accessor for the shared streak state.
 *
 * The implementation now lives in StreakContext so that every screen/component
 * reads and writes one source of truth (see context/StreakContext.jsx). The
 * `uid` argument is accepted for call-site compatibility but ignored — the
 * provider derives the user from AuthContext.
 */
export function useDailyStreak(_uid) {
  return useStreak()
}
