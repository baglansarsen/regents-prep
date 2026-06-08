import { useState, useEffect, useCallback } from 'react'

const KEY       = 'regents_mistakes_v1'
const MAX_SAVED = 150

function questionKey(q) {
  return q.id ?? q.text?.slice(0, 60) ?? String(Math.random())
}

function mergeMistakes(existing, tagged) {
  const map = new Map()
  for (const q of [...tagged].reverse()) map.set(questionKey(q), q)
  for (const q of existing) if (!map.has(questionKey(q))) map.set(questionKey(q), q)
  return [...map.values()].slice(0, MAX_SAVED)
}

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? [] } catch { return [] }
}

function save(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)) } catch {}
}

export function useMistakes() {
  const [mistakes, setMistakes] = useState(() => load())

  useEffect(() => { setMistakes(load()) }, [])

  const saveMistakes = useCallback((wrongQuestions, subject) => {
    if (!wrongQuestions?.length) return
    const tagged = wrongQuestions.map((q) => ({ ...q, subject: subject ?? 'living-environment' }))
    setMistakes((prev) => {
      const updated = mergeMistakes(prev, tagged)
      save(updated)
      return updated
    })
  }, [])

  const clearMistakes = useCallback(() => {
    setMistakes([])
    try { localStorage.removeItem(KEY) } catch {}
  }, [])

  return { mistakes, mistakeCount: mistakes.length, saveMistakes, clearMistakes }
}
