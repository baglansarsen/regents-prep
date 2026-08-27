export { TOPICS, TOPIC_ICONS, shuffled } from './questions'
export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'
export { UNITS, getLessonQuestions, getByTopic, buildDiagnosticSet, getWritten, getBySkill } from './units'
export { STRATEGIES as strategies } from './strategies'

import { TOPICS } from './questions'
import { allQuestions, getByTopic, ES_EXAMS, ES_TOPIC_MAP } from './units'

export const questions = allQuestions()

export const TOPIC_ORDER = [
  TOPICS.ROCKS,
  TOPICS.SCIENCE_PRACTICES,
  TOPICS.SURFACE_PROCESSES,
  TOPICS.MINERALS,
  TOPICS.PLATE_TECTONICS,
  TOPICS.GEOLOGIC_TIME,
  TOPICS.METEOROLOGY,
  TOPICS.CLIMATE,
  TOPICS.WATER_CYCLE,
  TOPICS.SOLAR_SYSTEM,
  TOPICS.COSMOS,
  TOPICS.MIXED_REVIEW,
]

// ── Exam context questions for Stimulus Practice ──────────────────────────────
// Shares ES_EXAMS/ES_TOPIC_MAP with units.js so lessons and Stimulus Practice
// can never drift out of sync.
export function getExamContextQuestions(topic) {
  const normTopic = Object.values(TOPICS).includes(topic) ? topic : ES_TOPIC_MAP[topic]
  const all = ES_EXAMS.flatMap((exam) => exam.questions ?? [])
  // Match the sub-topic units (Geology/Astronomy split) by subTopic; everything
  // else by the normalized topic map. Skill units (Science Practices) get none.
  const filtered = all.filter((q) => q.context && (q.subTopic === normTopic || ES_TOPIC_MAP[q.topic] === normTopic))

  const groups = {}
  filtered.forEach((q) => {
    const key = q.context.slice(0, 80)
    if (!groups[key]) groups[key] = []
    groups[key].push(q)
  })

  return Object.values(groups).sort(() => Math.random() - 0.5).flat()
}
