import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'

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
