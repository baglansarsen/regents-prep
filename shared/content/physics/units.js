import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'
import physJun2023 from '../regents-exams/physics/june-2023'
import physJun2024 from '../regents-exams/physics/june-2024'
import physAug2024 from '../regents-exams/physics/august-2024'
import physJun2025 from '../regents-exams/physics/june-2025'

const PHYS_EXAMS = [physJun2023, physJun2024, physAug2024, physJun2025]

export const UNITS = [
  { id: 'physics-u1', title: 'Mechanics & Motion',         icon: TOPIC_ICONS[TOPICS.MECHANICS],                  color: '#f59e0b', darkColor: '#d97706', topic: TOPICS.MECHANICS,                  lessonCount: 3 },
  { id: 'physics-u2', title: 'Energy, Work & Power',       icon: TOPIC_ICONS[TOPICS.ENERGY_AND_POWER],           color: '#fb8c00', darkColor: '#e65100', topic: TOPICS.ENERGY_AND_POWER,           lessonCount: 3 },
  { id: 'physics-u3', title: 'Electricity & Magnetism',    icon: TOPIC_ICONS[TOPICS.ELECTRICITY_AND_MAGNETISM],  color: '#f59e0b', darkColor: '#d97706', topic: TOPICS.ELECTRICITY_AND_MAGNETISM,  lessonCount: 3 },
  { id: 'physics-u4', title: 'Waves & Optics',             icon: TOPIC_ICONS[TOPICS.WAVES],                      color: '#fb8c00', darkColor: '#e65100', topic: TOPICS.WAVES,                      lessonCount: 3 },
  { id: 'physics-u5', title: 'Modern Physics',             icon: TOPIC_ICONS[TOPICS.MODERN_PHYSICS],             color: '#f59e0b', darkColor: '#d97706', topic: TOPICS.MODERN_PHYSICS,             lessonCount: 3 },
]

const LESSON_SIZE = 20

function getExamPool(topic) {
  return PHYS_EXAMS.flatMap((exam) => (exam.questions ?? []).filter((q) => q.topic === topic && Array.isArray(q.choices) && q.choices.length > 0 && q.choices.every((c) => String(c ?? '').trim() !== '')))
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
