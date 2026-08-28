import * as leData from '../content/living-environment/index'
import * as esData from '../content/earth-science/index'
import * as lsData from '../content/life-science/index'
import * as geoData from '../content/geometry/index'
import * as chemData from '../content/chemistry/index'

/**
 * computeAchievements — evaluate which achievements a student has earned.
 *
 * Extracted from AchievementsScreen so both the full Achievements screen and the
 * Progress tab's preview row evaluate from one source. Achievements are computed
 * on the fly from aggregate stats (never persisted).
 *
 * Note: the achievement catalog is Living-Environment + Earth-Science +
 * Life-Science + Geometry + Chemistry only (the subjects that ship
 * `achievements`), so `history` should already be the combined history of
 * those subjects, matching the prior screen behavior.
 *
 * @param {object} args
 * @param {Array}  args.history     combined LE+ES+LS+Geometry+Chemistry quiz history rows
 * @param {number} args.streak      current day streak
 * @param {number} args.rp          total RP
 * @param {object} args.examScores  useExamScores().scores  ({ [id]: {best,last} })
 * @param {number} args.diagCount   number of diagnostics taken
 * @returns {{ earned: Array, locked: Array, total: number }}
 */
export function computeAchievements({ history = [], streak = 0, rp = 0, examScores = {}, diagCount = 0 }) {
  const totalQuizzes   = history.length
  const totalCorrect   = history.reduce((a, h) => a + (h.correct ?? 0), 0)
  const totalAnswered  = history.reduce((a, h) => a + (h.total ?? 0), 0)
  const avgPct         = totalQuizzes > 0 ? history.reduce((a, h) => a + (h.pct ?? 0), 0) / totalQuizzes : 0
  const bestPct        = totalQuizzes > 0 ? Math.max(...history.map((h) => h.pct ?? 0)) : 0
  const perfectQuizzes = history.filter((h) => h.pct === 100).length

  const examScoreList     = Object.values(examScores ?? {})
  const practiceTestCount = examScoreList.length
  const practiceTestBest  = examScoreList.length > 0 ? Math.max(...examScoreList.map((s) => s.best ?? 0)) : 0

  const topicsPassed = new Set()
  history.forEach((h) => { if ((h.pct ?? 0) >= 65) topicsPassed.add(h.topic) })

  const stats = {
    totalQuizzes, totalCorrect, totalAnswered, avgPct, bestPct, perfectQuizzes,
    diagCount, practiceTestCount, practiceTestBest, streak,
    xp: rp, rp, topicsPassed,
    perfectScore: perfectQuizzes >= 1,
    noTimeouts: totalQuizzes >= 1,
  }

  const all = [...(leData.achievements ?? []), ...(esData.achievements ?? []), ...(lsData.achievements ?? []), ...(geoData.achievements ?? []), ...(chemData.achievements ?? [])]
  const passes = (a) => { try { return a.condition(stats) } catch { return false } }

  const earned = all.filter(passes)
  const locked = all.filter((a) => !passes(a))
  return { earned, locked, total: all.length }
}
