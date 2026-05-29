import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'

export const UNITS = [
  { id: 'physics-u1', title: 'Mechanics & Motion',         icon: TOPIC_ICONS[TOPICS.MECHANICS],                  color: '#f59e0b', darkColor: '#d97706', topic: TOPICS.MECHANICS,                  lessonCount: 3 },
  { id: 'physics-u2', title: 'Energy, Work & Power',       icon: TOPIC_ICONS[TOPICS.ENERGY_AND_POWER],           color: '#fb8c00', darkColor: '#e65100', topic: TOPICS.ENERGY_AND_POWER,           lessonCount: 3 },
  { id: 'physics-u3', title: 'Electricity & Magnetism',    icon: TOPIC_ICONS[TOPICS.ELECTRICITY_AND_MAGNETISM],  color: '#f59e0b', darkColor: '#d97706', topic: TOPICS.ELECTRICITY_AND_MAGNETISM,  lessonCount: 3 },
  { id: 'physics-u4', title: 'Waves & Optics',             icon: TOPIC_ICONS[TOPICS.WAVES],                      color: '#fb8c00', darkColor: '#e65100', topic: TOPICS.WAVES,                      lessonCount: 3 },
  { id: 'physics-u5', title: 'Modern Physics',             icon: TOPIC_ICONS[TOPICS.MODERN_PHYSICS],             color: '#f59e0b', darkColor: '#d97706', topic: TOPICS.MODERN_PHYSICS,             lessonCount: 3 },
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
