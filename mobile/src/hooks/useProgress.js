import { useState, useEffect } from 'react'
import {
  collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { MASTERY_MIN } from '../utils/studyConstants'

// Mastery = MASTERY_MIN%+ on at least 2 of the last 3 attempts (consistency, not luck)
const MASTERY_WINDOW = 3
const MASTERY_NEED   = 2

// Module-level pending queue so every useProgress instance (QuizScreen, HomeScreen, etc.)
// sees results immediately — before the Firestore write round-trips. Cleared once confirmed.
const _pending = []

function mergeWithPending(firestoreHistory) {
  if (!_pending.length) return firestoreHistory
  const ids = new Set(firestoreHistory.map((h) => `${h.topic}::${h.lessonIndex}::${h.pct}`))
  const extras = _pending.filter((p) => !ids.has(`${p.topic}::${p.lessonIndex}::${p.pct}`))
  return [...extras, ...firestoreHistory]
}

export function useProgress(uid) {
  const [history, setHistory] = useState([])
  // false until the first Firestore load settles — lets consumers avoid acting
  // on the empty initial history (e.g. Home briefly misreading a veteran as cold-start)
  const [historyLoaded, setHistoryLoaded] = useState(false)

  useEffect(() => {
    if (!uid) { setHistory([]); setHistoryLoaded(true); return }
    setHistoryLoaded(false)
    loadHistory(uid)
      .then((h) => setHistory(mergeWithPending(h)))
      .catch((err) => {
        console.warn('[useProgress] Failed to load history:', err)
        setHistory([..._pending])
      })
      .finally(() => setHistoryLoaded(true))
  }, [uid])

  // Reload history from Firestore (useful when returning to screen after quiz)
  async function reloadHistory() {
    if (!uid) return
    try {
      const updated = await loadHistory(uid)
      setHistory(mergeWithPending(updated))
    } catch (err) {
      console.warn('[useProgress] Failed to reload history:', err)
    }
  }

  async function saveResult({ topic, score, total, correct, pct, subject, lessonIndex }) {
    if (!uid) return

    // Push to the shared pending queue immediately so HomeScreen sees it on next focus
    const pending = {
      id: `_pending_${Date.now()}`,
      topic: topic ?? 'All Topics',
      score, total, correct, pct,
      subject: subject ?? 'living-environment',
    }
    if (lessonIndex != null) pending.lessonIndex = lessonIndex
    _pending.unshift(pending)
    setHistory((prev) => mergeWithPending(prev))

    const ref = collection(db, 'users', uid, 'quizHistory')
    const doc = {
      topic: topic ?? 'All Topics',
      score, total, correct, pct,
      subject: subject ?? 'living-environment',
      timestamp: serverTimestamp(),
    }
    if (lessonIndex !== undefined && lessonIndex !== null) doc.lessonIndex = lessonIndex
    try {
      await addDoc(ref, doc)
    } finally {
      const idx = _pending.indexOf(pending)
      if (idx >= 0) _pending.splice(idx, 1)
    }
    loadHistory(uid).then((h) => setHistory(mergeWithPending(h)))
  }

  function relevantHistory(topic, subject) {
    return history.filter((h) => {
      const hSubject = h.subject ?? 'living-environment'
      const subjectMatch = subject ? hSubject === subject : true
      const topicMatch   = topic   ? h.topic === topic   : true
      return subjectMatch && topicMatch
    })
  }

  // Best single score — used for the progress-bar fill (history is newest-first)
  function masteryPct(topic, subject) {
    const relevant = relevantHistory(topic, subject)
    if (!relevant.length) return null
    return Math.max(...relevant.map((h) => h.pct))
  }

  // Mastery requires CONSISTENCY, not one lucky run. Pass `pendingPct` to fold
  // in an attempt not yet saved, so the quiz screen can detect mastery the
  // moment it's achieved.
  function isMastered(topic, subject, pendingPct = null) {
    const pcts = relevantHistory(topic, subject).map((h) => h.pct)   // newest-first
    const seq  = (pendingPct != null ? [pendingPct, ...pcts] : pcts).slice(0, MASTERY_WINDOW)
    if (seq.length < MASTERY_NEED) return false
    return seq.filter((p) => p >= MASTERY_MIN).length >= MASTERY_NEED
  }

  return { history, historyLoaded, saveResult, reloadHistory, masteryPct, isMastered }
}

async function loadHistory(uid) {
  const ref = collection(db, 'users', uid, 'quizHistory')
  const q = query(ref, orderBy('timestamp', 'desc'), limit(200))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
