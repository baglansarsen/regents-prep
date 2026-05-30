import { useState, useEffect } from 'react'
import {
  collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

// Mastery = 85%+ on at least 2 of the last 3 attempts (consistency, not luck)
const MASTERY_MIN    = 85
const MASTERY_WINDOW = 3
const MASTERY_NEED   = 2

export function useProgress(uid) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!uid) { setHistory([]); return }
    loadHistory(uid)
      .then(setHistory)
      .catch((err) => {
        console.warn('[useProgress] Failed to load history:', err)
        setHistory([])
      })
  }, [uid])


  async function saveResult({ topic, score, total, correct, pct, subject, lessonIndex }) {
    if (!uid) return
    const ref = collection(db, 'users', uid, 'quizHistory')
    const doc = {
      topic: topic ?? 'All Topics',
      score,
      total,
      correct,
      pct,
      subject: subject ?? 'living-environment',
      timestamp: serverTimestamp(),
    }
    if (lessonIndex !== undefined && lessonIndex !== null) doc.lessonIndex = lessonIndex
    await addDoc(ref, doc)
    loadHistory(uid).then(setHistory)
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

  return { history, saveResult, masteryPct, isMastered }
}

async function loadHistory(uid) {
  const ref = collection(db, 'users', uid, 'quizHistory')
  const q = query(ref, orderBy('timestamp', 'desc'), limit(200))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
