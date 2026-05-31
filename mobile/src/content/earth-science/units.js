import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'
import esAug2019 from '../regents-exams/earth-science/august-2019'
import esJun2019 from '../regents-exams/earth-science/june-2019'
import esAug2022 from '../regents-exams/earth-science/august-2022'
import esJun2022 from '../regents-exams/earth-science/june-2022'
import esAug2023 from '../regents-exams/earth-science/august-2023'
import esJun2023 from '../regents-exams/earth-science/june-2023'
import esAug2024 from '../regents-exams/earth-science/august-2024'
import esJun2024 from '../regents-exams/earth-science/june-2024'
import esJun2025 from '../regents-exams/earth-science/june-2025'

const ES_EXAMS = [esAug2019, esJun2019, esAug2022, esJun2022, esAug2023, esJun2023, esAug2024, esJun2024, esJun2025]

const ES_TOPIC_MAP = {
  'Geology':         TOPICS.GEOLOGY,
  'Plate Tectonics': TOPICS.PLATE_TECTONICS,
  'Geologic Time':   TOPICS.GEOLOGIC_TIME,
  'Meteorology':     TOPICS.METEOROLOGY,
  'Climate':         TOPICS.CLIMATE,
  'Astronomy':       TOPICS.ASTRONOMY,
  'Water Cycle':     TOPICS.WATER_CYCLE,
  'Maps':            TOPICS.MAPS,
}

export const UNITS = [
  { id: 'es-u1', title: 'Geology',         icon: TOPIC_ICONS[TOPICS.GEOLOGY],         color: '#92400e', darkColor: '#78350f', topic: TOPICS.GEOLOGY,         lessonCount: 3 },
  { id: 'es-u2', title: 'Plate Tectonics', icon: TOPIC_ICONS[TOPICS.PLATE_TECTONICS], color: '#b45309', darkColor: '#92400e', topic: TOPICS.PLATE_TECTONICS, lessonCount: 3 },
  { id: 'es-u3', title: 'Geologic Time',   icon: TOPIC_ICONS[TOPICS.GEOLOGIC_TIME],   color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.GEOLOGIC_TIME,   lessonCount: 3 },
  { id: 'es-u4', title: 'Meteorology',     icon: TOPIC_ICONS[TOPICS.METEOROLOGY],     color: '#0369a1', darkColor: '#075985', topic: TOPICS.METEOROLOGY,     lessonCount: 3 },
  { id: 'es-u5', title: 'Climate',         icon: TOPIC_ICONS[TOPICS.CLIMATE],         color: '#0f766e', darkColor: '#0d9488', topic: TOPICS.CLIMATE,         lessonCount: 3 },
  { id: 'es-u6', title: 'Astronomy',       icon: TOPIC_ICONS[TOPICS.ASTRONOMY],       color: '#1d4ed8', darkColor: '#1e40af', topic: TOPICS.ASTRONOMY,       lessonCount: 3 },
  { id: 'es-u7', title: 'Water Cycle',     icon: TOPIC_ICONS[TOPICS.WATER_CYCLE],     color: '#0284c7', darkColor: '#0369a1', topic: TOPICS.WATER_CYCLE,     lessonCount: 3 },
  { id: 'es-u8', title: 'Maps',            icon: TOPIC_ICONS[TOPICS.MAPS],            color: '#16a34a', darkColor: '#15803d', topic: TOPICS.MAPS,            lessonCount: 3 },
]

const LESSON_SIZE = 20

function getExamPool(topic) {
  return ES_EXAMS.flatMap((exam) =>
    (exam.questions ?? []).filter((q) => ES_TOPIC_MAP[q.topic] === topic)
  )
}

export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  const practicePool = getByTopic(topic)
  const examPool     = getExamPool(topic)

  if (lessonIndex >= lessonCount) {
    return [...practicePool, ...examPool].sort(() => Math.random() - 0.5)
  }

  const sorted = [...practicePool].sort((a, b) => a.id - b.id)
  const pChunk = Math.ceil(sorted.length / lessonCount)
  const practiceSlice = sorted.slice(lessonIndex * pChunk, lessonIndex * pChunk + pChunk)

  const eChunk = Math.ceil(examPool.length / lessonCount)
  const examSlice = examPool.slice(lessonIndex * eChunk, lessonIndex * eChunk + eChunk)

  return [...practiceSlice, ...examSlice].sort(() => Math.random() - 0.5).slice(0, LESSON_SIZE)
}
