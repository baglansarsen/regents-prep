import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from './AuthContext'
import { getNextExamDate } from '../utils/examDates'
import { toLocalDateStr } from '../utils/localDate'
import { logActivity } from '../utils/activityLogger'

/**
 * GoalContext — the student's Regents goal(s), one per subject.
 *
 * Shape (per-subject map):
 *   {
 *     'living-environment': {
 *       target: 65|75|85,            // goal tier (data/goalConfig GOAL_TIERS)
 *       examDateStr: 'YYYY-MM-DD',   // next session date, frozen at commit
 *       committedAt: ISO string,
 *       baselineScore: number|null,  // predicted score at commit (null = cold start)
 *       predicted: { value, date } | null,  // smoothing anchor (usePredictedScore)
 *       rescuePlan: { urgency, targetMode } | undefined,  // utils/rescuePlan.js profile
 *     },
 *   }
 *
 * Storage: uid-scoped AsyncStorage + Firestore mirror users/{uid}/meta/goals
 * (same offline-first pattern as the pet/streak meta docs).
 */

const asKey = (uid) => `@regentsGoal_v1_${uid}`

const GoalContext = createContext(null)

export function GoalProvider({ children }) {
  const { user } = useAuthContext()
  const uid = user?.uid

  const [goals,  setGoals]  = useState({})
  const [loaded, setLoaded] = useState(false)
  const goalsRef = useRef({})
  const uidRef   = useRef(uid)
  uidRef.current = uid

  // ── Load (Firestore first, AsyncStorage fallback) ───────────────────────────
  useEffect(() => {
    if (!uid) { goalsRef.current = {}; setGoals({}); setLoaded(false); return }
    let cancelled = false
    ;(async () => {
      let data = null
      try {
        const snap = await getDoc(doc(db, 'users', uid, 'meta', 'goals'))
        if (snap.exists()) data = snap.data()
      } catch {}
      if (!data) {
        try {
          const raw = await AsyncStorage.getItem(asKey(uid))
          if (raw) data = JSON.parse(raw)
        } catch {}
      }
      if (cancelled) return
      goalsRef.current = data ?? {}
      setGoals(goalsRef.current)
      setLoaded(true)
    })()
    return () => { cancelled = true }
  }, [uid])

  async function persist(next) {
    goalsRef.current = next
    setGoals(next)
    const id = uidRef.current
    if (!id) return
    try { await AsyncStorage.setItem(asKey(id), JSON.stringify(next)) } catch {}
    try { await setDoc(doc(db, 'users', id, 'meta', 'goals'), next, { merge: true }) } catch {}
  }

  const getGoal = useCallback((subject) => goalsRef.current[subject] ?? null, [goals])

  // ── Commit a goal for a subject (freezes the exam date at commit time) ──────
  // `chosenExamDateStr` (optional): the session the student picked in goal setup;
  // falls back to the auto next session when omitted (back-compat).
  const commitGoal = useCallback(async (subject, target, baselineScore = null, chosenExamDateStr = null) => {
    const examDateStr = chosenExamDateStr ?? toLocalDateStr(getNextExamDate(subject))
    const entry = {
      target,
      examDateStr,
      committedAt: new Date().toISOString(),
      baselineScore,
      predicted: baselineScore != null
        ? { value: baselineScore, date: toLocalDateStr(new Date()) }
        : null,
    }
    await persist({ ...goalsRef.current, [subject]: entry })
    logActivity(uidRef.current, 'goal_committed',
      `Committed to a ${target} on the ${subject} Regents 🎯`, { subject, target, examDateStr })
    return entry
  }, [])

  const clearGoal = useCallback(async (subject) => {
    const next = { ...goalsRef.current }
    delete next[subject]
    // Firestore merge can't delete a key via setDoc(merge) with a plain object —
    // write an explicit null marker the loader treats as absent.
    goalsRef.current = next
    setGoals(next)
    const id = uidRef.current
    if (!id) return
    try { await AsyncStorage.setItem(asKey(id), JSON.stringify(next)) } catch {}
    try { await setDoc(doc(db, 'users', id, 'meta', 'goals'), { [subject]: null }, { merge: true }) } catch {}
  }, [])

  // ── Persist the smoothed prediction anchor (skip no-op writes) ──────────────
  const updatePredicted = useCallback(async (subject, anchor) => {
    const cur = goalsRef.current[subject]
    if (!cur) return
    if (cur.predicted?.value === anchor?.value && cur.predicted?.date === anchor?.date) return
    await persist({ ...goalsRef.current, [subject]: { ...cur, predicted: anchor } })
  }, [])

  // ── Rescue Plan profile ({ urgency, targetMode }) — lives on the goal entry ─
  const setRescuePlan = useCallback(async (subject, plan) => {
    const cur = goalsRef.current[subject]
    if (!cur) return
    await persist({ ...goalsRef.current, [subject]: { ...cur, rescuePlan: plan ?? null } })
  }, [])

  return (
    <GoalContext.Provider value={{ goals, loaded, getGoal, commitGoal, clearGoal, updatePredicted, setRescuePlan }}>
      {children}
    </GoalContext.Provider>
  )
}

export function useGoal() {
  const ctx = useContext(GoalContext)
  if (!ctx) throw new Error('useGoal must be used within a GoalProvider')
  return ctx
}
