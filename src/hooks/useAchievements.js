import { useState, useEffect, useRef, useCallback } from 'react'
import { doc, getDoc, setDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'
import { ACHIEVEMENTS } from '../data/achievements'
import { TOPICS } from '../data/questions'

export function useAchievements(uid, { history, streak, xp }) {
  const [earnedIds, setEarnedIds] = useState(new Set())
  const [currentToast, setCurrentToast] = useState(null)
  const [practiceTestBest, setPracticeTestBest] = useState(null)
  const [diagCount, setDiagCount] = useState(0)
  const [practiceTestCount, setPracticeTestCount] = useState(0)

  const prevEarnedRef = useRef(new Set())
  const toastQueueRef = useRef([])
  const showingToastRef = useRef(false)

  // Load earned achievements from Firestore on mount
  useEffect(() => {
    if (!uid) return
    getDoc(doc(db, 'users', uid, 'meta', 'achievements'))
      .then((snap) => {
        if (snap.exists()) {
          const ids = new Set(snap.data().earnedIds ?? [])
          setEarnedIds(ids)
          prevEarnedRef.current = new Set(ids)
          setPracticeTestBest(snap.data().practiceTestBest ?? null)
          setDiagCount(snap.data().diagCount ?? 0)
          setPracticeTestCount(snap.data().practiceTestCount ?? 0)
        }
      })
      .catch(() => {})
  }, [uid])

  const showNextToast = useCallback(() => {
    if (toastQueueRef.current.length === 0) { showingToastRef.current = false; return }
    showingToastRef.current = true
    const next = toastQueueRef.current.shift()
    setCurrentToast(next)
  }, [])

  const dismissToast = useCallback(() => {
    setCurrentToast(null)
    setTimeout(showNextToast, 300)
  }, [showNextToast])

  // Compute stats and check for newly unlocked achievements
  useEffect(() => {
    if (!uid) return

    const topicsPassed = new Set()
    const topicBest = {}
    for (const h of history) {
      if (!h.topic || h.topic === '__diagnostic__') continue
      if (!topicBest[h.topic] || h.pct > topicBest[h.topic]) topicBest[h.topic] = h.pct
    }
    for (const [topic, pct] of Object.entries(topicBest)) {
      if (pct >= 65) topicsPassed.add(topic)
    }

    const topicQuizzes = history.filter((h) => h.topic && h.topic !== '__diagnostic__' && !h.topic.startsWith('__'))
    const totalAnswered = topicQuizzes.reduce((sum, h) => sum + (h.total ?? 0), 0)
    const perfectQuizzes = topicQuizzes.filter((h) => h.pct === 100).length
    const bestPct = topicQuizzes.length ? Math.max(...topicQuizzes.map((h) => h.pct)) : 0

    const stats = {
      totalQuizzes: topicQuizzes.length,
      totalAnswered,
      bestPct,
      perfectQuizzes,
      topicsPassed,
      streak,
      xp,
      diagCount,
      practiceTestCount,
      practiceTestBest: practiceTestBest ?? 0,
    }

    const newlyEarned = []
    for (const ach of ACHIEVEMENTS) {
      if (!prevEarnedRef.current.has(ach.id) && ach.condition(stats)) {
        newlyEarned.push(ach)
      }
    }

    if (newlyEarned.length === 0) return

    const updatedIds = new Set([...prevEarnedRef.current, ...newlyEarned.map((a) => a.id)])
    prevEarnedRef.current = updatedIds
    setEarnedIds(new Set(updatedIds))

    setDoc(
      doc(db, 'users', uid, 'meta', 'achievements'),
      { earnedIds: arrayUnion(...newlyEarned.map((a) => a.id)) },
      { merge: true },
    ).catch(() => {})

    toastQueueRef.current.push(...newlyEarned)
    if (!showingToastRef.current) showNextToast()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, history.length, streak, xp, diagCount, practiceTestCount, practiceTestBest])

  const recordPracticeTest = useCallback((pct) => {
    setPracticeTestCount((c) => c + 1)
    setPracticeTestBest((prev) => (prev === null || pct > prev ? pct : prev))
    if (!uid) return
    setDoc(
      doc(db, 'users', uid, 'meta', 'achievements'),
      {
        practiceTestCount: (practiceTestCount || 0) + 1,
        practiceTestBest: practiceTestBest === null || pct > practiceTestBest ? pct : practiceTestBest,
      },
      { merge: true },
    ).catch(() => {})
  }, [uid, practiceTestCount, practiceTestBest])

  const recordDiagnostic = useCallback(() => {
    setDiagCount((c) => c + 1)
    if (!uid) return
    setDoc(
      doc(db, 'users', uid, 'meta', 'achievements'),
      { diagCount: (diagCount || 0) + 1 },
      { merge: true },
    ).catch(() => {})
  }, [uid, diagCount])

  return { earnedIds, allAchievements: ACHIEVEMENTS, currentToast, dismissToast, recordPracticeTest, recordDiagnostic }
}
