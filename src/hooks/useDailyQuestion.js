import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const DAILY_CORRECT_BONUS = 50
export const DAILY_ATTEMPT_BONUS = 10

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

function pickQuestion(pool) {
  if (!pool?.length) return null
  const dayIndex = Math.floor(Date.now() / 86400000)
  return pool[dayIndex % pool.length]
}

// Storage key is subject-specific so switching subjects resets the daily question state
function lsKey(subject) {
  return `regents_daily_q_v1_${subject ?? 'le'}`
}

function loadLocal(subject) {
  try { return JSON.parse(localStorage.getItem(lsKey(subject))) } catch { return null }
}

export function useDailyQuestion(uid, subjectQuestions, subject) {
  const question = pickQuestion(subjectQuestions)
  const today    = todayStr()
  const key      = lsKey(subject)

  const [record,  setRecord]  = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setRecord(null)
    setLoading(true)

    const local = loadLocal(subject)
    if (local?.date === today) { setRecord(local); setLoading(false); return }

    if (!uid) { setLoading(false); return }

    getDoc(doc(db, 'users', uid, 'meta', `dailyQuestion_${subject ?? 'le'}`))
      .then((snap) => {
        if (snap.exists() && snap.data().date === today) setRecord(snap.data())
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [uid, today, subject])

  const submitAnswer = useCallback(async (choiceIndex) => {
    if (!question) return null
    const correct  = choiceIndex === question.correct
    const xpEarned = correct ? DAILY_CORRECT_BONUS : DAILY_ATTEMPT_BONUS
    const rec      = { date: today, choiceIndex, correct, questionId: question.id }

    setRecord(rec)
    try { localStorage.setItem(key, JSON.stringify(rec)) } catch {}
    if (uid) {
      try {
        await setDoc(
          doc(db, 'users', uid, 'meta', `dailyQuestion_${subject ?? 'le'}`),
          rec,
          { merge: true },
        )
      } catch {}
    }
    return { correct, xpEarned }
  }, [uid, question, today, key, subject])

  const answeredToday = record?.date === today

  return { question, answeredToday, record, loading, submitAnswer }
}
