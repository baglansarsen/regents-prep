import { useState, useEffect, useCallback, useRef } from 'react'
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

// Call when an in-session account swap (e.g. guest -> real sign-in) discards the
// previous uid's session — without this, an in-flight guest quiz-result write can
// still be sitting in this module-level queue and merge into the next account's
// history the moment its first loadHistory() resolves.
export function resetPendingProgress() {
  _pending.length = 0
}

// Same entries in the same order → keep the old array so consumers' memos and
// effects don't re-run on a no-op reload (Home re-runs its focus effect on
// history-derived values; a fresh array every reload kept it looping).
const entryKey = (h) => `${h.id ?? ''}|${h.topic}|${h.lessonIndex}|${h.pct}`
export function sameHistory(a, b) {
  if (a === b) return true
  if (!a || !b || a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (entryKey(a[i]) !== entryKey(b[i])) return false
  return true
}

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
  // Latest uid, so a reload that resolves after an account switch (guest →
  // signed-in) can't write the previous account's history into the new one.
  const uidRef = useRef(uid)
  uidRef.current = uid

  useEffect(() => {
    if (!uid) { setHistory([]); setHistoryLoaded(true); return }
    setHistoryLoaded(false)
    let cancelled = false
    loadHistory(uid)
      .then((h) => { if (!cancelled) setHistory(mergeWithPending(h)) })
      .catch((err) => {
        console.warn('[useProgress] Failed to load history:', err)
        if (!cancelled) setHistory([..._pending])
      })
      .finally(() => { if (!cancelled) setHistoryLoaded(true) })
    return () => { cancelled = true }
  }, [uid])

  // Reload history from Firestore (useful when returning to screen after quiz).
  // Memoised on uid: HomeScreen lists it in its useFocusEffect deps, and a new
  // function each render re-ran that focus effect on every render — an endless
  // reload → setHistory → render loop (~125 commits/s) on the Home screen.
  const reloadHistory = useCallback(async () => {
    if (!uid) return
    try {
      const updated = await loadHistory(uid)
      if (uidRef.current !== uid) return   // account changed mid-flight
      const next = mergeWithPending(updated)
      setHistory((prev) => (sameHistory(prev, next) ? prev : next))
    } catch (err) {
      console.warn('[useProgress] Failed to reload history:', err)
    }
  }, [uid])

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
