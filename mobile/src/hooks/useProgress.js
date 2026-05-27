import { useState, useEffect } from 'react'
import {
  collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

export function useProgress(uid) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!uid) { setHistory([]); return }
    loadHistory(uid).then(setHistory)
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

  function masteryPct(topic, subject) {
    const relevant = history.filter((h) => {
      const hSubject = h.subject ?? 'living-environment'
      const subjectMatch = subject ? hSubject === subject : true
      const topicMatch   = topic   ? h.topic === topic   : true
      return subjectMatch && topicMatch
    })
    if (!relevant.length) return null
    return Math.max(...relevant.map((h) => h.pct))
  }

  return { history, saveResult, masteryPct }
}

async function loadHistory(uid) {
  const ref = collection(db, 'users', uid, 'quizHistory')
  const q = query(ref, orderBy('timestamp', 'desc'), limit(200))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
