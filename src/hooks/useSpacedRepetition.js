import { useState, useEffect, useCallback } from 'react'
import { flashcards, getFlashcardsByTopic } from '../data/flashcards'

// SM-2 quality levels
export const Q_AGAIN = 1  // forgot / still learning
export const Q_GOOD  = 3  // remembered with effort
export const Q_EASY  = 5  // remembered easily

const DEFAULT_CARD = { interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: null }

function sm2(card, quality) {
  let { interval, repetitions, easeFactor } = { ...DEFAULT_CARD, ...card }

  if (quality >= 3) {
    if (repetitions === 0)      interval = 1
    else if (repetitions === 1) interval = 6
    else                        interval = Math.round(interval * easeFactor)
    repetitions++
  } else {
    repetitions = 0
    interval = 1
  }

  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  const nextReview = Date.now() + interval * 86400000

  return { interval, repetitions, easeFactor, nextReview }
}

function storageKey(uid) { return `regents_sr2_${uid ?? 'guest'}` }

function loadData(uid) {
  try { return JSON.parse(localStorage.getItem(storageKey(uid))) ?? {} } catch { return {} }
}

function saveData(uid, data) {
  try { localStorage.setItem(storageKey(uid), JSON.stringify(data)) } catch {}
}

export function nextReviewLabel(nextReview) {
  if (!nextReview) return null
  const days = Math.round((nextReview - Date.now()) / 86400000)
  if (days <= 0)  return 'due now'
  if (days === 1) return 'tomorrow'
  return `in ${days} days`
}

export function useSpacedRepetition(uid) {
  const [data, setData] = useState(() => loadData(uid))

  useEffect(() => {
    setData(loadData(uid))
  }, [uid])

  const review = useCallback((cardId, quality) => {
    setData((prev) => {
      const updated = { ...prev, [cardId]: sm2(prev[cardId], quality) }
      saveData(uid, updated)
      return updated
    })
  }, [uid])

  const resetAll = useCallback(() => {
    setData({})
    saveData(uid, {})
  }, [uid])

  // Build an ordered deck for a given topic
  // Order: overdue/due first → new (never seen) → future (not due yet)
  // Wrapped in useCallback so callers get a stable reference that reflects latest data
  const buildDeck = useCallback((topic, browseAll = false) => {
    const now = Date.now()
    const cards = getFlashcardsByTopic(topic)

    if (browseAll) return cards

    const due      = cards.filter((c) => data[c.id]?.nextReview && data[c.id].nextReview <= now)
    const newCards = cards.filter((c) => !data[c.id]?.nextReview)
    const future   = cards.filter((c) => data[c.id]?.nextReview && data[c.id].nextReview > now)

    due.sort((a, b) => data[a.id].nextReview - data[b.id].nextReview)
    future.sort((a, b) => data[a.id].nextReview - data[b.id].nextReview)

    return [...due, ...newCards, ...future]
  }, [data])

  const getStats = useCallback((topic) => {
    const now = Date.now()
    const cards = getFlashcardsByTopic(topic)
    let due = 0, newCards = 0, reviewed = 0, mastered = 0
    for (const c of cards) {
      const d = data[c.id]
      if (!d?.nextReview)           newCards++
      else if (d.nextReview <= now) due++
      else {
        reviewed++
        if (d.repetitions >= 3) mastered++
      }
    }
    return { due, new: newCards, reviewed, mastered, total: cards.length }
  }, [data])

  return { data, review, resetAll, buildDeck, getStats }
}
