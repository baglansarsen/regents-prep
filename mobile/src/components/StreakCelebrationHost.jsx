import React, { useEffect, useRef } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useStreak } from '../context/StreakContext'
import { usePetContext } from '../context/PetContext'
import { useRP } from '../hooks/useRP'
import StreakCelebration from './StreakCelebration'
import { maybeRequestReview } from '../utils/appReview'

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
  const { rp, spendRP } = useRP(uid)
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

  // When the celebration is dismissed after a 3+ day streak advance, ask the
  // user to rate the app — deferred slightly so the overlay's dismiss animation
  // finishes before the system rating sheet appears.
  const handleClose = () => {
    const ev = pendingEvent
    clearEvent()
    if (ev?.type === 'continued' && ev.streak >= 3) {
      setTimeout(() => { maybeRequestReview() }, 600)
    }
  }

  return (
    <StreakCelebration
      event={pendingEvent}
      onClose={handleClose}
      weekDays={weekDays}
      streak={streak}
      rp={rp}
      hasFreeze={hasFreeze}
      onBuyFreeze={() => buyFreeze(spendRP)}
      onRepair={() => repairStreak(spendRP)}
    />
  )
}
