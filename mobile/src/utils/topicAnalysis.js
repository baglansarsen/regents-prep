import { LE_TOPIC_KEYWORDS, ES_TOPIC_KEYWORDS } from '../data/topicKeywords'
import { SUBJECTS } from '../../../src/data/subjects'

/**
 * Returns the best-matching topic name for a question, or 'General Review'.
 * Scans question text + all choices for keyword matches (case-insensitive).
 * The topic with the most keyword hits wins; ties go to the first match.
 */
export function inferTopic(question, subject) {
  if (question.topic) return question.topic

  const keywords = subject === SUBJECTS.EARTH_SCIENCE ? ES_TOPIC_KEYWORDS : LE_TOPIC_KEYWORDS
  const haystack = `${question.text ?? ''} ${(question.choices ?? []).join(' ')}`.toLowerCase()

  let bestTopic = 'General Review'
  let bestScore = 0

  for (const [topic, words] of Object.entries(keywords)) {
    const score = words.reduce((n, w) => n + (haystack.includes(w.toLowerCase()) ? 1 : 0), 0)
    if (score > bestScore) {
      bestScore = score
      bestTopic = topic
    }
  }
  return bestTopic
}

/**
 * Analyzes exam results by topic.
 *
 * @param {Array}  questions  Full question array (from exam route params)
 * @param {Object} answers    Map of { questionIndex: choiceIndex } (may be sparse)
 * @param {string} subject    Subject string (e.g. 'living-environment')
 * @returns {Array} Sorted worst-first:
 *   [{ topic, total, correct, wrong: [{q, idx, userAnswer}], pct, questions: [{q, idx, isCorrect}] }, ...]
 */
export function analyzeExamResults(questions, answers, subject) {
  const map = {}

  questions.forEach((q, i) => {
    const topic = inferTopic(q, subject)
    if (!map[topic]) {
      map[topic] = { topic, total: 0, correct: 0, wrong: [], questions: [] }
    }
    const correctIdx = q.correct ?? q.correctIndex
    const userAnswer = answers[i] ?? answers[String(i)]   // handle numeric or string keys
    const isCorrect  = userAnswer !== undefined && userAnswer === correctIdx

    map[topic].total++
    map[topic].questions.push({ q, idx: i, isCorrect })
    if (isCorrect) {
      map[topic].correct++
    } else {
      map[topic].wrong.push({ q, idx: i, userAnswer })
    }
  })

  return Object.values(map)
    .map((t) => ({ ...t, pct: Math.round((t.correct / t.total) * 100) }))
    .sort((a, b) => a.pct - b.pct)   // worst first
}
