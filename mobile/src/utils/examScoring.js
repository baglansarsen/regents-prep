/**
 * examScoring — shared Regents score estimation helpers.
 *
 * ⚠️ ESTIMATE ONLY — not an official NY Regents conversion.
 * Real Regents charts are non-linear, published per administration, and the
 * actual exam includes constructed-response/lab credits an MC-only practice
 * run can't capture. Every UI surface that shows these numbers must label
 * them as estimates so a student isn't misled near the 65 line.
 *
 * Extracted from ExamResultsScreen so the predicted-score model
 * (utils/predictedScore.js) and the results screen share one table.
 */

export function getScaledScore(rawScore, total = 50) {
  const pct = rawScore / total
  if (pct >= 0.92) return 100
  if (pct >= 0.88) return 95
  if (pct >= 0.84) return 90
  if (pct >= 0.78) return 85
  if (pct >= 0.72) return 80
  if (pct >= 0.66) return 75
  if (pct >= 0.60) return 70
  if (pct >= 0.55) return 65
  if (pct >= 0.50) return 60
  if (pct >= 0.44) return 55
  return 50
}

export function topicIndicator(pct) {
  if (pct < 65) return { emoji: '🔴', label: 'Needs Work',  color: '#FF5A5F' }
  if (pct < 85) return { emoji: '🟡', label: 'Review',      color: '#FF9600' }
  return              { emoji: '🟢', label: 'Strong',       color: '#1FC36B' }
}
