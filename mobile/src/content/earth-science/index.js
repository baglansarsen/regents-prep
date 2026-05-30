export {
  questions,
  TOPICS,
  TOPIC_ICONS,
  LAB_TYPES,
  getByTopic,
  getContextual,
  buildDiagnosticSet,
  shuffled,
} from './questions'

export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'
export { UNITS, getLessonQuestions } from './units'
export { STRATEGIES as strategies } from './strategies'

import { TOPICS } from './questions'

export const TOPIC_ORDER = [
  TOPICS.GEOLOGY,
  TOPICS.PLATE_TECTONICS,
  TOPICS.GEOLOGIC_TIME,
  TOPICS.METEOROLOGY,
  TOPICS.CLIMATE,
  TOPICS.ASTRONOMY,
  TOPICS.WATER_CYCLE,
  TOPICS.MAPS,
]

// ── Exam context questions for Stimulus Practice ──────────────────────────────
import esAug2019  from '../regents-exams/earth-science/august-2019'
import esAug2022  from '../regents-exams/earth-science/august-2022'
import esAug2023  from '../regents-exams/earth-science/august-2023'
import esAug2024  from '../regents-exams/earth-science/august-2024'
import esJun2019  from '../regents-exams/earth-science/june-2019'
import esJun2022  from '../regents-exams/earth-science/june-2022'
import esJun2023  from '../regents-exams/earth-science/june-2023'
import esJun2024  from '../regents-exams/earth-science/june-2024'
import esJun2025  from '../regents-exams/earth-science/june-2025'

const ES_EXAM_POOLS = [
  esAug2019, esAug2022, esAug2023, esAug2024,
  esJun2019, esJun2022, esJun2023, esJun2024, esJun2025,
]

export function getExamContextQuestions(topic) {
  const all = ES_EXAM_POOLS.flatMap((exam) => exam.questions ?? [])
  const filtered = all.filter((q) => q.context && q.topic === topic)

  const groups = {}
  filtered.forEach((q) => {
    const key = q.context.slice(0, 80)
    if (!groups[key]) groups[key] = []
    groups[key].push(q)
  })

  return Object.values(groups).sort(() => Math.random() - 0.5).flat()
}
