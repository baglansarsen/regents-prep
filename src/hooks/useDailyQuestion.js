import { useState, useEffect, useCallback } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { questions } from '../data/questions'

const LS_KEY = 'regents_daily_q_v1'

function todayStr() {
  return new Date().toISOString().split('T')[0] // 'YYYY-MM-DD'
}

function pickQuestion() {
  // Same question for everyone on a given day
  const dayIndex = Math.floor(Date.now() / 86400000)
  return questions[dayIndex % questions.length]
}

function loadLocal() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) } catch { return null }
}

export const DAILY_CORRECT_BONUS = 50
export const DAILY_ATTEMPT_BONUS = 10

export function useDailyQuestion(uid) {
  const question = pickQuestion()
  const today    = todayStr()

  // null = not yet answered today, otherwise { choiceIndex, correct, date }
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage first for instant load
    const local = loadLocal()
    if (local?.date === today) { setRecord(local); setLoading(false); return }

    if (!uid) { setLoading(false); return }

    getDoc(doc(db, 'users', uid, 'meta', 'dailyQuestion'))
      .then((snap) => {
        if (snap.exists() && snap.data().date === today) setRecord(snap.data())
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [uid, today])

  const submitAnswer = useCallback(async (choiceIndex) => {
    const correct = choiceIndex === question.correct
    const xpEarned = correct ? DAILY_CORRECT_BONUS : DAILY_ATTEMPT_BONUS
    const rec = { date: today, choiceIndex, correct, questionId: question.id }

    setRecord(rec)
    try { localStorage.setItem(LS_KEY, JSON.stringify(rec)) } catch {}
    if (uid) {
      try { await setDoc(doc(db, 'users', uid, 'meta', 'dailyQuestion'), rec, { merge: true }) } catch {}
    }

    return { correct, xpEarned }
  }, [uid, question, today])

  const answeredToday = record?.date === today

  return { question, answeredToday, record, loading, submitAnswer }
}
