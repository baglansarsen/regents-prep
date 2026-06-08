import { useState, useEffect } from 'react'
import {
  collection, addDoc, query, orderBy, limit, getDocs,
} from 'firebase/firestore'
import { db } from '../firebase'

const MASTERY_MIN    = 85
const MASTERY_WINDOW = 3
const MASTERY_NEED   = 2
const LOCAL_HISTORY_KEY = '@quizHistory_v1'

export function useProgress(uid) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!uid) {
      // Local Guest progress
      const raw = localStorage.getItem(LOCAL_HISTORY_KEY)
      if (raw) {
        try { setHistory(JSON.parse(raw)) } catch (_) { setHistory([]) }
      } else {
        setHistory([])
      }
      return
    }

    loadHistory(uid)
      .then(setHistory)
      .catch((err) => {
        console.warn('[useProgress] Failed to load history:', err)
        setHistory([])
      })
  }, [uid])

  async function saveResult({ topic, score, total, correct, pct, subject, lessonIndex }) {
    const docData = {
      topic: topic ?? 'All Topics',
      score,
      total,
      correct,
      pct,
      subject: subject ?? 'living-environment',
      timestamp: new Date().toISOString(),
    }
    if (lessonIndex !== undefined && lessonIndex !== null) docData.lessonIndex = lessonIndex

    if (!uid) {
      const updated = [docData, ...history].slice(0, 200)
      setHistory(updated)
      localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(updated))
      return
    }

    try {
      const ref = collection(db, 'users', uid, 'quizHistory')
      // Map to server-compatible JSON timestamp
      await addDoc(ref, {
        ...docData,
        timestamp: new Date(), // Firestore converts JS dates to native Timestamp objects automatically
      })
      const freshHistory = await loadHistory(uid)
      setHistory(freshHistory)
    } catch (e) {
      console.error('[useProgress] Failed to save result to Firestore:', e)
      // Optimistic local update
      const updated = [docData, ...history].slice(0, 200)
      setHistory(updated)
    }
  }

  function relevantHistory(topic, subject) {
    return history.filter((h) => {
      const hSubject = h.subject ?? 'living-environment'
      const subjectMatch = subject ? hSubject === subject : true
      const topicMatch   = topic   ? h.topic === topic   : true
      return subjectMatch && topicMatch
    })
  }

  function masteryPct(topic, subject) {
    const relevant = relevantHistory(topic, subject)
    if (!relevant.length) return null
    return Math.max(...relevant.map((h) => h.pct))
  }

  function isMastered(topic, subject, pendingPct = null) {
    const pcts = relevantHistory(topic, subject).map((h) => h.pct)
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
  return snap.docs.map((d) => {
    const data = d.data()
    // normalize timestamp to ISO string
    let timestamp = data.timestamp
    if (timestamp && typeof timestamp.toDate === 'function') {
      timestamp = timestamp.toDate().toISOString()
    } else if (timestamp && timestamp.seconds) {
      timestamp = new Date(timestamp.seconds * 1000).toISOString()
    }
    return { id: d.id, ...data, timestamp }
  })
}
