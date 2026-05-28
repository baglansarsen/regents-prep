import React, { createContext, useContext } from 'react'
import { useAuthContext } from './AuthContext'
import { usePet } from '../hooks/usePet'

const PetContext = createContext(null)

export function PetProvider({ children }) {
  const { user } = useAuthContext()
  const pet = usePet(user?.uid)

  return (
    <PetContext.Provider value={pet}>
      {children}
    </PetContext.Provider>
  )
}

export function usePetContext() {
  const ctx = useContext(PetContext)
  if (!ctx) throw new Error('usePetContext must be used inside <PetProvider>')
  return ctx
}
