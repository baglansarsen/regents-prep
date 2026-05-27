/**
 * useMistakes — saves wrong answers from quizzes/exams to AsyncStorage and
 * exposes a deduplicated, capped list of recent mistakes ready to quiz from.
 *
 * Storage format  (@mistakes_v1):
 *   Array of up to MAX_SAVED question objects, newest first.
 *   Each entry is the raw question object augmented with { subject }.
 *
 * Deduplication: questions are keyed by their `id` field if present,
 * otherwise by a hash of `text` — so the same question doesn't pile up.
 */

import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY       = '@mistakes_v1'
const MAX_SAVED = 150   // cap so storage stays small

function questionKey(q) {
  return q.id ?? q.text?.slice(0, 60) ?? String(Math.random())
}

// ── Public hook ──────────────────────────────────────────────────────────────
export function useMistakes() {
  const [mistakes, setMistakes] = useState([])   // full list, newest first

  // Load on mount
  useEffect(() => {
    AsyncStorage.getItem(KEY).then((raw) => {
      if (raw) {
        try { setMistakes(JSON.parse(raw)) } catch (_) {}
      }
    })
  }, [])

  /**
   * saveMistakes(wrongQuestions, subject)
   * wrongQuestions – array of question objects that the user got wrong
   * subject        – 'living-environment' | 'earth-science'
   */
  const saveMistakes = useCallback(async (wrongQuestions, subject) => {
    if (!wrongQuestions?.length) return

    const tagged = wrongQuestions.map((q) => ({ ...q, subject: subject ?? 'living-environment' }))

    const raw = await AsyncStorage.getItem(KEY)
    const existing = raw ? JSON.parse(raw) : []

    // Build a map keyed by question identity so we don't duplicate
    const map = new Map(existing.map((q) => [questionKey(q), q]))

    // Newer entries overwrite older ones (updates subject if changed)
    tagged.forEach((q) => map.set(questionKey(q), q))

    // Keep newest MAX_SAVED (map insertion order = arrival order; reverse for newest-first)
    const updated = [...map.values()].slice(-MAX_SAVED).reverse()

    setMistakes(updated)
    await AsyncStorage.setItem(KEY, JSON.stringify(updated))
  }, [])

  /** clearMistakes() — wipe the full list (e.g., after a clean session) */
  const clearMistakes = useCallback(async () => {
    setMistakes([])
    await AsyncStorage.removeItem(KEY)
  }, [])

  return {
    mistakes,                             // full list
    mistakeCount: mistakes.length,        // for badge display
    saveMistakes,
    clearMistakes,
  }
}

// ── Standalone save (for screens that don't need to read the list) ───────────
export async function appendMistakes(wrongQuestions, subject) {
  if (!wrongQuestions?.length) return
  try {
    const tagged = wrongQuestions.map((q) => ({ ...q, subject: subject ?? 'living-environment' }))
    const raw = await AsyncStorage.getItem(KEY)
    const existing = raw ? JSON.parse(raw) : []
    const map = new Map(existing.map((q) => [questionKey(q), q]))
    tagged.forEach((q) => map.set(questionKey(q), q))
    const updated = [...map.values()].slice(-MAX_SAVED).reverse()
    await AsyncStorage.setItem(KEY, JSON.stringify(updated))
  } catch (_) {}
}
