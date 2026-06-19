import React, { createContext, useContext } from 'react'
import { useAuthContext } from './AuthContext'
import { usePet } from '../hooks/usePet'
import { PETS_ENABLED } from '../config/features'

const PetContext = createContext(null)

export function PetProvider({ children }) {
  const { user } = useAuthContext()
  const pet = usePet(user?.uid)

  // While the pet feature is hidden, report `chosen: true` so the many
  // `pet.chosen` gates (first-run tour, daily celebration, Home buddy/quests)
  // keep working without a pet-picker step. The underlying pet engine stays
  // dormant (usePet's own `chosen` is still false), and PetWidget renders the
  // Reggie mascot instead of a chosen pet.
  const value = PETS_ENABLED ? pet : { ...pet, chosen: true }

  return (
    <PetContext.Provider value={value}>
      {children}
    </PetContext.Provider>
  )
}

export function usePetContext() {
  const ctx = useContext(PetContext)
  if (!ctx) throw new Error('usePetContext must be used inside <PetProvider>')
  return ctx
}
