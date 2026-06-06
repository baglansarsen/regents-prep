import React, { useEffect, useRef } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useStreak } from '../context/StreakContext'
import { usePetContext } from '../context/PetContext'
import { useRP } from '../hooks/useRP'
import StreakCelebration from './StreakCelebration'

/**
 * StreakCelebrationHost — mounts the streak celebration once, inside the main
 * tab shell, so it appears the instant a streak event fires (e.g. right after a
 * lesson completes on the results screen) regardless of which tab/screen the
 * user is on. Mounting it here (not at the app root) keeps it scoped to the
 * authenticated main app, so it never overlays the login/onboarding flow.
 */
export default function StreakCelebrationHost() {
  const { user } = useAuthContext()
  const uid = user?.uid
  const { pendingEvent, clearEvent, weekDays, streak, hasFreeze, buyFreeze, repairStreak } = useStreak()
  const { rp, spendXP } = useRP(uid)
  const { triggerReaction } = usePetContext()
  const lastType = useRef(null)

  // Drive the pet's reaction centrally so it fires no matter where the event
  // originated (Quiz, Study, Speed Round, Exam…).
  useEffect(() => {
    if (!pendingEvent) { lastType.current = null; return }
    if (pendingEvent.type === lastType.current) return
    lastType.current = pendingEvent.type
    if (pendingEvent.type === 'continued')   triggerReaction?.('celebrate')
    if (pendingEvent.type === 'freeze_used') triggerReaction?.('cheer')
    if (pendingEvent.type === 'broken')      triggerReaction?.('sad')
  }, [pendingEvent?.type])

  return (
    <StreakCelebration
      event={pendingEvent}
      onClose={clearEvent}
      weekDays={weekDays}
      streak={streak}
      rp={rp}
      hasFreeze={hasFreeze}
      onBuyFreeze={() => buyFreeze(spendXP)}
      onRepair={() => repairStreak(spendXP)}
    />
  )
}
