import { useState, useEffect, useCallback } from 'react'

const KEY       = '@mistakes_v1'
const MAX_SAVED = 150

function questionKey(q) {
  return q.id ?? q.text?.slice(0, 60) ?? String(Math.random())
}

function mergeMistakes(existing, tagged) {
  const map = new Map()
  for (const q of [...tagged].reverse()) map.set(questionKey(q), q)
  for (const q of existing) {
    if (q && !map.has(questionKey(q))) {
      map.set(questionKey(q), q)
    }
  }
  return [...map.values()].slice(0, MAX_SAVED)
}

export function useMistakes() {
  const [mistakes, setMistakes] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setMistakes(parsed)
        } else {
          setMistakes([])
        }
      }
    } catch (_) {
      setMistakes([])
    }
  }, [])

  const saveMistakes = useCallback(async (wrongQuestions, subject) => {
    if (!wrongQuestions?.length) return

    try {
      const tagged = wrongQuestions.map((q) => ({ ...q, subject: subject ?? 'living-environment' }))
      
      let existing = []
      const raw = localStorage.getItem(KEY)
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          existing = Array.isArray(parsed) ? parsed : []
        } catch (_) {
          existing = []
        }
      }
      
      const updated = mergeMistakes(existing, tagged)
      setMistakes(updated)
      localStorage.setItem(KEY, JSON.stringify(updated))
    } catch (e) {
      console.warn('[useMistakes] Failed to save mistakes:', e)
    }
  }, [])

  const removeMistakes = useCallback(async (correctQuestions) => {
    if (!correctQuestions?.length) return

    try {
      let existing = []
      const raw = localStorage.getItem(KEY)
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          existing = Array.isArray(parsed) ? parsed : []
        } catch (_) {
          existing = []
        }
      }

      const correctKeys = new Set(correctQuestions.map(q => questionKey(q)))
      const updated = existing.filter(q => q && !correctKeys.has(questionKey(q)))

      setMistakes(updated)
      localStorage.setItem(KEY, JSON.stringify(updated))
    } catch (e) {
      console.warn('[useMistakes] Failed to remove mistakes:', e)
    }
  }, [])

  const clearMistakes = useCallback(async () => {
    setMistakes([])
    try {
      localStorage.removeItem(KEY)
    } catch (_) {}
  }, [])

  return {
    mistakes,
    mistakeCount: mistakes.length,
    saveMistakes,
    removeMistakes,
    clearMistakes,
  }
}
