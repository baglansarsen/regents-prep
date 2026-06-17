/**
 * useMistakes — the Smart Review store. Wrong answers become a self-clearing,
 * prioritized review queue in AsyncStorage; correct answers advance items along
 * a Leitner schedule and eventually retire them.
 *
 * Storage (@mistakes_v2): array of review entries (newest-first), each a raw
 * question object augmented with { subject, box, wrongCount, lastSeen, due }.
 * Legacy @mistakes_v1 plain-question entries are migrated on first load.
 */

import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  questionKey, normalizeEntry, reset, advance, buildReviewSet,
} from '../utils/reviewQueue'

const KEY     = '@mistakes_v2'
const OLD_KEY = '@mistakes_v1'
const MAX_SAVED = 150

// ── Storage helpers ────────────────────────────────────────────────────────
async function loadRaw() {
  try {
    const raw = await AsyncStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
    // One-time migration from the legacy flat list.
    const old = await AsyncStorage.getItem(OLD_KEY)
    if (old) {
      const migrated = JSON.parse(old).map((q) => normalizeEntry(q, q.subject))
      await AsyncStorage.setItem(KEY, JSON.stringify(migrated))
      return migrated
    }
  } catch (_) {}
  return []
}

async function persist(list) {
  try { await AsyncStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX_SAVED))) } catch (_) {}
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

// ── Standalone writers (for screens that don't read the list) ───────────────
export async function appendMistakes(wrongQuestions, subject) {
  if (!wrongQuestions?.length) return
  const existing = await loadRaw()
  await persist(applyWrong(existing, wrongQuestions, subject))
}

export async function resolveCorrect(correctQuestions, subject) {
  if (!correctQuestions?.length) return
  const existing = await loadRaw()
  await persist(applyCorrect(existing, correctQuestions))
}

// ── Public hook ──────────────────────────────────────────────────────────────
export function useMistakes() {
  const [mistakes, setMistakes] = useState([])   // full queue, newest first

  useEffect(() => { loadRaw().then(setMistakes) }, [])

  const saveMistakes = useCallback(async (wrongQuestions, subject) => {
    if (!wrongQuestions?.length) return
    const updated = applyWrong(await loadRaw(), wrongQuestions, subject)
    setMistakes(updated)
    await persist(updated)
  }, [])

  // Advance/retire correctly-answered items (called after any quiz).
  const resolveCorrectLocal = useCallback(async (correctQuestions) => {
    if (!correctQuestions?.length) return
    const updated = applyCorrect(await loadRaw(), correctQuestions)
    setMistakes(updated)
    await persist(updated)
  }, [])

  const clearMistakes = useCallback(async () => {
    setMistakes([])
    await AsyncStorage.removeItem(KEY)
  }, [])

  // Build a prioritized review session (question objects).
  const getReviewSet = useCallback(
    (opts = {}) => buildReviewSet({ items: mistakes, ...opts }),
    [mistakes],
  )

  const now = Date.now()
  const dueMistakes = mistakes.filter((e) => (e.due ?? 0) <= now)
  // Count under both the normalized topic and the finer subTopic so an in-unit
  // "Fix-ups" node resolves whether the unit is topic- or subTopic-defined.
  const mistakesByTopic = mistakes.reduce((acc, e) => {
    if (e.topic)    acc[e.topic]    = (acc[e.topic] ?? 0) + 1
    if (e.subTopic) acc[e.subTopic] = (acc[e.subTopic] ?? 0) + 1
    return acc
  }, {})

  return {
    mistakes,
    mistakeCount: mistakes.length,
    dueMistakes,
    dueCount: dueMistakes.length,
    mistakesByTopic,
    getReviewSet,
    saveMistakes,
    resolveCorrect: resolveCorrectLocal,
    clearMistakes,
  }
}
