import { useState, useEffect, useCallback } from 'react'
import {
  questionKey, normalizeEntry, reset, advance, buildReviewSet,
} from '../utils/reviewQueue'

const KEY     = '@mistakes_v2'
const OLD_KEY = '@mistakes_v1'
const MAX_SAVED = 150

// ── Storage helpers ────────────────────────────────────────────────────────
function loadRaw() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
    // One-time migration from the legacy flat list.
    const old = localStorage.getItem(OLD_KEY)
    if (old) {
      const migrated = JSON.parse(old).map((q) => normalizeEntry(q, q.subject))
      localStorage.setItem(KEY, JSON.stringify(migrated))
      return migrated
    }
  } catch (_) {}
  return []
}

function persist(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX_SAVED))) } catch (_) {}
}

// Apply a batch of newly-missed questions: reset/insert at front, dedup, cap.
function applyWrong(existing, wrongQuestions, subject) {
  const now = Date.now()
  const map = new Map(existing.map((e) => [questionKey(e), e]))
  for (const q of wrongQuestions) {
    const k = questionKey(q)
    map.set(k, reset({ ...q, ...map.get(k) }, subject, now))
  }
  // Newest (most-recently-touched, lowest due) first.
  return [...map.values()].sort((a, b) => (b.lastSeen ?? 0) - (a.lastSeen ?? 0)).slice(0, MAX_SAVED)
}

// Apply correct answers: advance matched entries; drop those that graduate.
function applyCorrect(existing, correctQuestions) {
  const correctKeys = new Set(correctQuestions.map(questionKey))
  const out = []
  for (const e of existing) {
    if (!correctKeys.has(questionKey(e))) { out.push(e); continue }
    const adv = advance(e)
    if (adv) out.push(adv)   // null = retired, drop it
  }
  return out
}

// ── Standalone writers (for screens/functions that don't read the list directly) ───────────────
export function appendMistakes(wrongQuestions, subject) {
  if (!wrongQuestions?.length) return
  const existing = loadRaw()
  persist(applyWrong(existing, wrongQuestions, subject))
}

export function resolveCorrect(correctQuestions, subject) {
  if (!correctQuestions?.length) return
  const existing = loadRaw()
  persist(applyCorrect(existing, correctQuestions))
}

// ── Public hook ──────────────────────────────────────────────────────────────
// `subjectScope` (optional): when set, dueCount / dueMistakes / mistakesByTopic
// are scoped to that subject.
export function useMistakes(subjectScope = null) {
  const [mistakes, setMistakes] = useState([])   // full queue, newest first

  useEffect(() => { setMistakes(loadRaw()) }, [])

  const saveMistakes = useCallback(async (wrongQuestions, subject) => {
    if (!wrongQuestions?.length) return
    const updated = applyWrong(loadRaw(), wrongQuestions, subject)
    setMistakes(updated)
    persist(updated)
  }, [])

  // Advance/retire correctly-answered items (called after any quiz).
  const resolveCorrectLocal = useCallback(async (correctQuestions) => {
    if (!correctQuestions?.length) return
    const updated = applyCorrect(loadRaw(), correctQuestions)
    setMistakes(updated)
    persist(updated)
  }, [])

  const clearMistakes = useCallback(async () => {
    setMistakes([])
    try {
      localStorage.removeItem(KEY)
    } catch (_) {}
  }, [])

  // Build a prioritized review session (question objects).
  const getReviewSet = useCallback(
    (opts = {}) => buildReviewSet({ items: mistakes, ...opts }),
    [mistakes],
  )

  const now = Date.now()
  // Scope to the active subject (when given)
  const scoped = subjectScope ? mistakes.filter((e) => e.subject === subjectScope) : mistakes
  const dueMistakes = scoped.filter((e) => (e.due ?? 0) <= now)
  // Count under both the topic and subTopic
  const mistakesByTopic = scoped.reduce((acc, e) => {
    if (e.topic)    acc[e.topic]    = (acc[e.topic] ?? 0) + 1
    if (e.subTopic) acc[e.subTopic] = (acc[e.subTopic] ?? 0) + 1
    return acc
  }, {})

  return {
    mistakes,
    mistakeCount: scoped.length,
    dueMistakes,
    dueCount: dueMistakes.length,
    mistakesByTopic,
    getReviewSet,
    saveMistakes,
    resolveCorrect: resolveCorrectLocal,
    removeMistakes: resolveCorrectLocal, // backwards-compatibility alias
    clearMistakes,
  }
}
