import { useState, useCallback } from 'react'

// Persists known card IDs per user in localStorage
function storageKey(uid) { return `regents_flashcards_${uid ?? 'guest'}` }

function loadKnown(uid) {
  try { return new Set(JSON.parse(localStorage.getItem(storageKey(uid))) ?? []) } catch { return new Set() }
}

function saveKnown(uid, set) {
  try { localStorage.setItem(storageKey(uid), JSON.stringify([...set])) } catch {}
}

export function useFlashcards(uid) {
  const [knownIds, setKnownIds] = useState(() => loadKnown(uid))

  const markKnown = useCallback((id) => {
    setKnownIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      saveKnown(uid, next)
      return next
    })
  }, [uid])

  const markLearning = useCallback((id) => {
    setKnownIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      saveKnown(uid, next)
      return next
    })
  }, [uid])

  const resetAll = useCallback(() => {
    setKnownIds(new Set())
    saveKnown(uid, new Set())
  }, [uid])

  return { knownIds, markKnown, markLearning, resetAll }
}
