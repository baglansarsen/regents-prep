export { TOPICS, TOPIC_ICONS, shuffled } from './questions'
export { flashcards, FLASHCARD_TOPIC_LIST } from './flashcards'
export { ACHIEVEMENTS as achievements } from './achievements'
export { UNITS, getLessonQuestions, getByTopic, buildDiagnosticSet, getWritten, getBySkill } from './units'
export { STRATEGIES as strategies } from './strategies'

import { TOPICS } from './questions'
import { allQuestions, getByTopic } from './units'

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
import esAug2019 from '../regents-exams/earth-science/august-2019'
import esAug2022 from '../regents-exams/earth-science/august-2022'
import esAug2023 from '../regents-exams/earth-science/august-2023'
import esAug2024 from '../regents-exams/earth-science/august-2024'
import esJun2019 from '../regents-exams/earth-science/june-2019'
import esJun2022 from '../regents-exams/earth-science/june-2022'
import esJun2023 from '../regents-exams/earth-science/june-2023'
import esJun2024 from '../regents-exams/earth-science/june-2024'
import esJun2025 from '../regents-exams/earth-science/june-2025'

const ES_TOPIC_MAP = {
  'Geology': TOPICS.GEOLOGY, 'Plate Tectonics': TOPICS.PLATE_TECTONICS,
  'Geologic Time': TOPICS.GEOLOGIC_TIME, 'Meteorology': TOPICS.METEOROLOGY,
  'Climate': TOPICS.CLIMATE, 'Astronomy': TOPICS.ASTRONOMY,
  'Water Cycle': TOPICS.WATER_CYCLE, 'Oceanography': TOPICS.WATER_CYCLE,
  'Maps': TOPICS.MIXED_REVIEW, 'General': TOPICS.MIXED_REVIEW,
  'General Review': TOPICS.MIXED_REVIEW, 'Earth Science Skills': TOPICS.MIXED_REVIEW,
}

const ES_EXAM_POOLS = [
  esAug2019, esAug2022, esAug2023, esAug2024,
  esJun2019, esJun2022, esJun2023, esJun2024, esJun2025,
]

export function getExamContextQuestions(topic) {
  const normTopic = Object.values(TOPICS).includes(topic) ? topic : ES_TOPIC_MAP[topic]
  const all = ES_EXAM_POOLS.flatMap((exam) => exam.questions ?? [])
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
