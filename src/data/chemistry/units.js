import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'

export const UNITS = [
  { id: 'chemistry-u1', title: 'Atomic Structure', icon: TOPIC_ICONS[TOPICS.ATOMIC_STRUCTURE], color: '#ec4899', darkColor: '#be185d', topic: TOPICS.ATOMIC_STRUCTURE, lessonCount: 3 },
  { id: 'chemistry-u2', title: 'Periodic Table',   icon: TOPIC_ICONS[TOPICS.PERIODIC_TABLE],   color: '#db2777', darkColor: '#9d174d', topic: TOPICS.PERIODIC_TABLE,   lessonCount: 3 },
  { id: 'chemistry-u3', title: 'Chemical Bonding', icon: TOPIC_ICONS[TOPICS.CHEMICAL_BONDING], color: '#c084fc', darkColor: '#a855f7', topic: TOPICS.CHEMICAL_BONDING, lessonCount: 3 },
  { id: 'chemistry-u4', title: 'Matter & Energy',  icon: TOPIC_ICONS[TOPICS.MATTER_AND_ENERGY], color: '#f43f5e', darkColor: '#e11d48', topic: TOPICS.MATTER_AND_ENERGY,  lessonCount: 3 },
  { id: 'chemistry-u5', title: 'Organic Chemistry',icon: TOPIC_ICONS[TOPICS.ORGANIC_CHEMISTRY],color: '#fb7185', darkColor: '#f43f5e', topic: TOPICS.ORGANIC_CHEMISTRY,lessonCount: 3 },
]

const LESSON_SIZE = 10

export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  const pool = getByTopic(topic)
  const sorted = [...pool].sort((a, b) => a.id - b.id)

  if (lessonIndex >= lessonCount) {
    return [...pool].sort(() => Math.random() - 0.5)
  }

  const chunkSize = Math.ceil(sorted.length / lessonCount)
  const start = lessonIndex * chunkSize
  const slice = sorted.slice(start, start + chunkSize)
  return slice.slice(0, LESSON_SIZE)
}
