import { useMemo } from 'react'
import { REGENTS_EXAMS } from '@content/regents-exams/index'

const UNATTEMPTED_PRIOR_PCT = 40

function getScaledScore(pct) {
  if (pct >= 92) return 100
  if (pct >= 88) return 95
  if (pct >= 84) return 90
  if (pct >= 78) return 85
  if (pct >= 72) return 80
  if (pct >= 66) return 75
  if (pct >= 60) return 70
  if (pct >= 55) return 65
  if (pct >= 50) return 60
  if (pct >= 44) return 55
  return 50
}

export function usePredictedScore(subject, units = [], history = [], streak = 0) {
  return useMemo(() => {
    // 1. Load exam scores from localStorage
    let pbs = {}
    let lasts = {}
    try {
      pbs = JSON.parse(localStorage.getItem('regents_personal_best_v1') || '{}')
      lasts = JSON.parse(localStorage.getItem('regents_last_score_v1') || '{}')
    } catch {}

    const subjectExams = REGENTS_EXAMS[subject] || []
    const subjectExamIds = subjectExams.map(e => e.id)

    // Calculate attempted exam scores
    const examValues = []
    subjectExamIds.forEach(id => {
      const best = pbs[id]
      const last = lasts[id]?.scaled ?? lasts[id] // fallback if plain number
      if (best !== undefined || last !== undefined) {
        const bVal = best ?? last ?? 0
        const lVal = last ?? best ?? 0
        examValues.push(0.5 * bVal + 0.5 * lVal)
      }
    })

    const examCount = examValues.length
    const examAvg = examCount ? examValues.reduce((a, b) => a + b, 0) / examCount : null

    // 2. Mastery component (per-topic best quiz pct)
    const topicBreakdown = units.map(u => {
      const rows = history.filter(h => h.topic === u.topic && (h.subject === subject || !h.subject))
      const pct = rows.length ? Math.max(...rows.map(h => h.pct ?? 0)) : null
      return { topic: u.topic, title: u.title || u.name || u.topic, pct, attempts: rows.length }
    })

    const attemptedTopics = topicBreakdown.filter(t => t.pct !== null)
    const meanPct = topicBreakdown.length
      ? topicBreakdown.reduce((sum, t) => sum + (t.pct ?? UNATTEMPTED_PRIOR_PCT), 0) / topicBreakdown.length
      : 0
    const masteryScaled = getScaledScore(meanPct)

    // 3. Cold Start check
    if (examCount === 0 && attemptedTopics.length === 0) {
      return {
        predicted: null,
        coldStart: true,
        examCount: 0,
        topicBreakdown,
        weakestUnit: topicBreakdown[0] || null
      }
    }

    // 4. Blend exam avg and mastery
    const wExam = examCount === 0 ? 0 : Math.min(0.8, 0.45 + 0.15 * Math.min(examCount, 3))
    const blended = wExam * (examAvg ?? 0) + (1 - wExam) * masteryScaled

    // 5. Consistency bonus (based on streak)
    let consistency = 0
    if (streak >= 3) consistency += 1
    if (streak >= 7) consistency += 1
    if (streak >= 14) consistency += 1

    const finalScore = Math.round(Math.min(100, Math.max(50, blended + consistency)))

    // Find weakest unit (lowest pct)
    const scored = topicBreakdown.map(t => ({ ...t, eff: t.pct ?? -1 }))
    scored.sort((a, b) => a.eff - b.eff)
    const weakestUnit = scored[0] || null

    return {
      predicted: finalScore,
      coldStart: false,
      examCount,
      topicBreakdown,
      weakestUnit,
      hasTakenPracticeExam: examCount > 0
    }
  }, [subject, units, history, streak])
}
