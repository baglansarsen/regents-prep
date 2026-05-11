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

  async function saveResult({ topic, score, total, correct, pct }) {
    if (!uid) return
    const ref = collection(db, 'users', uid, 'quizHistory')
    await addDoc(ref, { topic: topic ?? 'All Topics', score, total, correct, pct, timestamp: serverTimestamp() })
    loadHistory(uid).then(setHistory)
  }

  function masteryPct(topic) {
    const relevant = history.filter((h) => topic ? h.topic === topic : true)
    if (!relevant.length) return null
    return Math.max(...relevant.map((h) => h.pct))
  }

  return { history, saveResult, masteryPct }
}

async function loadHistory(uid) {
  const ref = collection(db, 'users', uid, 'quizHistory')
  const q = query(ref, orderBy('timestamp', 'desc'), limit(10))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
