import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Q_AGAIN = 1
export const Q_HARD  = 2
export const Q_GOOD  = 3
export const Q_EASY  = 5

const DEFAULT_CARD = { interval: 0, repetitions: 0, easeFactor: 2.5, nextReview: null }

function sm2(card, quality) {
  let { interval, repetitions, easeFactor } = { ...DEFAULT_CARD, ...card }
  if (quality >= 3) {
    // Good / Easy — clean recall, interval grows by the ease factor
    if (repetitions === 0)      interval = 1
    else if (repetitions === 1) interval = 6
    else                        interval = Math.round(interval * easeFactor)
    repetitions++
  } else if (quality === 2) {
    // Hard — recalled, but shakily. Don't lapse: keep the card progressing with
    // a gentle interval bump (and let the ease-factor formula below dock EF), so
    // it comes back sooner than "Good" but isn't reset to day-1 like "Again".
    interval = Math.max(1, Math.round((interval || 1) * 1.2))
  } else {
    // Again — failed recall, full lapse back to daily review
    repetitions = 0
    interval    = 1
  }
  easeFactor   = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  const nextReview = Date.now() + interval * 86400000
  return { interval, repetitions, easeFactor, nextReview }
}

function storageKey(uid) { return `@regents_sr2_${uid ?? 'guest'}` }

export function nextReviewLabel(nextReview) {
  if (!nextReview) return null
  const days = Math.round((nextReview - Date.now()) / 86400000)
  if (days <= 0)  return 'due now'
  if (days === 1) return 'tomorrow'
  return `in ${days} days`
}

export function useSpacedRepetition(uid, flashcards = []) {
  const [data, setData] = useState({})

  useEffect(() => {
    AsyncStorage.getItem(storageKey(uid)).then((raw) => {
      try { if (raw) setData(JSON.parse(raw)) } catch {}
    })
  }, [uid])

  const review = useCallback((cardId, quality) => {
    setData((prev) => {
      const updated = { ...prev, [cardId]: sm2(prev[cardId], quality) }
      AsyncStorage.setItem(storageKey(uid), JSON.stringify(updated)).catch(() => {})
      return updated
    })
  }, [uid])

  const resetAll = useCallback(() => {
    setData({})
    AsyncStorage.removeItem(storageKey(uid)).catch(() => {})
  }, [uid])

  const buildDeck = useCallback((topic, browseAll = false) => {
    const now   = Date.now()
    const cards = topic ? flashcards.filter((c) => c.topic === topic) : flashcards
    if (browseAll) return cards
    const due      = cards.filter((c) => data[c.id]?.nextReview && data[c.id].nextReview <= now)
    const newCards = cards.filter((c) => !data[c.id]?.nextReview)
    const future   = cards.filter((c) => data[c.id]?.nextReview && data[c.id].nextReview > now)
    due.sort((a, b)    => data[a.id].nextReview - data[b.id].nextReview)
    future.sort((a, b) => data[a.id].nextReview - data[b.id].nextReview)
    return [...due, ...newCards, ...future]
  }, [data, flashcards])

  const getStats = useCallback((topic) => {
    const now   = Date.now()
    const cards = topic ? flashcards.filter((c) => c.topic === topic) : flashcards
    let due = 0, newCount = 0, reviewed = 0, mastered = 0
    for (const c of cards) {
      const d = data[c.id]
      if (!d?.nextReview)           newCount++
      else if (d.nextReview <= now) due++
      else {
        reviewed++
        if (d.repetitions >= 3) mastered++
      }
    }
    return { due, new: newCount, reviewed, mastered, total: cards.length }
  }, [data, flashcards])

  return { data, review, resetAll, buildDeck, getStats }
}
