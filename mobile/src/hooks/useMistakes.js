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

// A substitute served by the retry loop carries `__retryFor` — the key of the
// entry it stands in for. Both writers below must credit (or re-fault) the
// ORIGINAL entry, or a swapped question would never clear the mistake it was
// chosen to test.
const entryKeyOf = (q) => q?.__retryFor ?? questionKey(q)

// Apply a batch of newly-missed questions: reset/insert at front, dedup, cap.
function applyWrong(existing, wrongQuestions, subject) {
  const now = Date.now()
  const map = new Map(existing.map((e) => [questionKey(e), e]))
  for (const q of wrongQuestions) {
    const k = entryKeyOf(q)
    // Never persist the substitute's own text over the original question, and
    // never persist the provenance marker itself.
    const { __retryFor, ...clean } = q
    const merged = reset({ ...clean, ...map.get(k) }, subject, now)
    // The existing entry wins on question fields, but a fresh classification
    // should replace a stale one — how you miss something changes over time.
    if (clean.mistakeType) merged.mistakeType = clean.mistakeType
    map.set(k, merged)
  }
  // Newest (most-recently-touched, lowest due) first.
  return [...map.values()].sort((a, b) => (b.lastSeen ?? 0) - (a.lastSeen ?? 0)).slice(0, MAX_SAVED)
}

// Apply correct answers: advance matched entries; drop those that graduate.
function applyCorrect(existing, correctQuestions) {
  const correctKeys = new Set(correctQuestions.map(entryKeyOf))
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
// `subjectScope` (optional): when set, dueCount / dueMistakes / mistakesByTopic
// are scoped to that subject so the "Review your gaps" card matches what the
// REVIEW button (which always builds a subject-scoped pool) will actually run.
// Omit it for a global count (e.g. the Exams-tab Practice Mistakes entry).
export function useMistakes(subjectScope = null) {
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
  // Scope to the active subject (when given) so the count agrees with the
  // subject-scoped review pool — a global count over a subject-scoped button is
  // what made the "Review your gaps" card show a number but do nothing on tap.
  const scoped = subjectScope ? mistakes.filter((e) => e.subject === subjectScope) : mistakes
  const dueMistakes = scoped.filter((e) => (e.due ?? 0) <= now)
  // Count under both the normalized topic and the finer subTopic so an in-unit
  // "Fix-ups" node resolves whether the unit is topic- or subTopic-defined.
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
    clearMistakes,
  }
}
