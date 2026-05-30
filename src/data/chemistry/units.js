import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'
import chemJun2023 from '../regents-exams/chemistry/june-2023'
import chemJun2024 from '../regents-exams/chemistry/june-2024'
import chemAug2024 from '../regents-exams/chemistry/august-2024'
import chemJun2025 from '../regents-exams/chemistry/june-2025'

const CHEM_EXAMS = [chemJun2023, chemJun2024, chemAug2024, chemJun2025]

export const UNITS = [
  { id: 'chemistry-u1', title: 'Atomic Structure', icon: TOPIC_ICONS[TOPICS.ATOMIC_STRUCTURE], color: '#ec4899', darkColor: '#be185d', topic: TOPICS.ATOMIC_STRUCTURE, lessonCount: 3 },
  { id: 'chemistry-u2', title: 'Periodic Table',   icon: TOPIC_ICONS[TOPICS.PERIODIC_TABLE],   color: '#db2777', darkColor: '#9d174d', topic: TOPICS.PERIODIC_TABLE,   lessonCount: 3 },
  { id: 'chemistry-u3', title: 'Chemical Bonding', icon: TOPIC_ICONS[TOPICS.CHEMICAL_BONDING], color: '#c084fc', darkColor: '#a855f7', topic: TOPICS.CHEMICAL_BONDING, lessonCount: 3 },
  { id: 'chemistry-u4', title: 'Matter & Energy',  icon: TOPIC_ICONS[TOPICS.MATTER_AND_ENERGY], color: '#f43f5e', darkColor: '#e11d48', topic: TOPICS.MATTER_AND_ENERGY,  lessonCount: 3 },
  { id: 'chemistry-u5', title: 'Organic Chemistry',icon: TOPIC_ICONS[TOPICS.ORGANIC_CHEMISTRY],color: '#fb7185', darkColor: '#f43f5e', topic: TOPICS.ORGANIC_CHEMISTRY,lessonCount: 3 },
]

const LESSON_SIZE = 20

function getExamPool(topic) {
  return CHEM_EXAMS.flatMap((exam) => (exam.questions ?? []).filter((q) => q.topic === topic))
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
