export { TOPICS, TOPIC_ICONS, LAB_TYPES, shuffled } from '../questions'
export { flashcards, FLASHCARD_TOPIC_LIST } from '../flashcards'
export { ACHIEVEMENTS as achievements } from '../achievements'
export { UNITS, getLessonQuestions, getByTopic, buildDiagnosticSet, getWritten, getBySkill } from './units'
export { STRATEGIES as strategies } from './strategies'

import { TOPICS } from '../questions'
import { allQuestions, getByTopic } from './units'

export const questions = allQuestions()

export const TOPIC_ORDER = [
  TOPICS.CELL_STRUCTURE,
  TOPICS.CELL_ENERGY,
  TOPICS.BIOCHEM,
  TOPICS.SCIENCE_PRACTICES,
  TOPICS.GENETICS,
  TOPICS.EVOLUTION,
  TOPICS.ECOLOGY,
  TOPICS.HUMAN_BODY,
  TOPICS.LAB_SKILLS,
  TOPICS.MIXED_REVIEW,
]

// ── Exam context questions for Stimulus Practice ──────────────────────────────
import leAug2024 from '../regents-exams/living-environment/august-2024'
import leJun2023 from '../regents-exams/living-environment/june-2023'
import leJun2024 from '../regents-exams/living-environment/june-2024'
import leJun2025 from '../regents-exams/living-environment/june-2025'

const LE_TOPIC_MAP = {
  'Cell Biology': TOPICS.CELL_BIOLOGY,
  'Genetics':     TOPICS.GENETICS,
  'Evolution':    TOPICS.EVOLUTION,
  'Ecology':      TOPICS.ECOLOGY,
  'Human Body':   TOPICS.HUMAN_BODY,
  'Reproduction': TOPICS.HUMAN_BODY,
  'General':      TOPICS.MIXED_REVIEW,
  'General Review': TOPICS.MIXED_REVIEW,
}

const LE_EXAM_POOLS = [leAug2024, leJun2023, leJun2024, leJun2025]

export function getExamContextQuestions(topic) {
  const all = LE_EXAM_POOLS.flatMap((exam) => exam.questions ?? [])
  // Match the sub-topic units (Cell split) by subTopic; everything else by the
  // normalized topic map. Skill units (Science Practices / Lab) have no single
  // topic, so they get no stimulus node — fine, they're skill drills.
  const filtered = all.filter((q) => q.context && (q.subTopic === topic || LE_TOPIC_MAP[q.topic] === topic))

  const groups = {}
  filtered.forEach((q) => {
    const key = q.context.slice(0, 80)
    if (!groups[key]) groups[key] = []
    groups[key].push(q)
  })

  return Object.values(groups).sort(() => Math.random() - 0.5).flat()
}
