export {
  questions,
  TOPICS,
  TOPIC_ICONS,
  LAB_TYPES,
  getByTopic,
  getContextual,
  getLabQuestions,
  buildDiagnosticSet,
  shuffled,
} from '../questions'

export { flashcards, FLASHCARD_TOPIC_LIST } from '../flashcards'
export { ACHIEVEMENTS as achievements } from '../achievements'
export { UNITS, getLessonQuestions } from './units'

import { TOPICS } from '../questions'

export const TOPIC_ORDER = [
  TOPICS.CELL_BIOLOGY,
  TOPICS.GENETICS,
  TOPICS.EVOLUTION,
  TOPICS.ECOLOGY,
  TOPICS.HUMAN_BODY,
  TOPICS.REPRODUCTION,
]

// ── Exam context questions for Stimulus Practice ──────────────────────────────
import leAug2024  from '../regents-exams/living-environment/august-2024'
import leJun2023  from '../regents-exams/living-environment/june-2023'
import leJun2024  from '../regents-exams/living-environment/june-2024'
import leJun2025  from '../regents-exams/living-environment/june-2025'

const LE_TOPIC_MAP = {
  'Cell Biology':  TOPICS.CELL_BIOLOGY,
  'Genetics':      TOPICS.GENETICS,
  'Evolution':     TOPICS.EVOLUTION,
  'Ecology':       TOPICS.ECOLOGY,
  'Human Body':    TOPICS.HUMAN_BODY,
  'Reproduction':  TOPICS.REPRODUCTION,
}

const LE_EXAM_POOLS = [leAug2024, leJun2023, leJun2024, leJun2025]

export function getExamContextQuestions(topic) {
  const all = LE_EXAM_POOLS.flatMap((exam) => exam.questions ?? [])
  const filtered = all.filter((q) => q.context && LE_TOPIC_MAP[q.topic] === topic)

  const groups = {}
  filtered.forEach((q) => {
    const key = q.context.slice(0, 80)
    if (!groups[key]) groups[key] = []
    groups[key].push(q)
  })

  return Object.values(groups).sort(() => Math.random() - 0.5).flat()
}
