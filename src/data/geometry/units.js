import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'

export const UNITS = [
  { id: 'geometry-u1', title: 'Congruence & Transformations', icon: TOPIC_ICONS[TOPICS.CONGRUENCE],     color: '#10b981', darkColor: '#059669', topic: TOPICS.CONGRUENCE,     lessonCount: 3 },
  { id: 'geometry-u2', title: 'Similarity & Proof',           icon: TOPIC_ICONS[TOPICS.SIMILARITY],     color: '#34d399', darkColor: '#10b981', topic: TOPICS.SIMILARITY,     lessonCount: 3 },
  { id: 'geometry-u3', title: 'Circles',                      icon: TOPIC_ICONS[TOPICS.CIRCLES],        color: '#6ee7b7', darkColor: '#34d399', topic: TOPICS.CIRCLES,        lessonCount: 3 },
  { id: 'geometry-u4', title: 'Coordinate Geometry',          icon: TOPIC_ICONS[TOPICS.COORDINATE_GEO], color: '#059669', darkColor: '#047857', topic: TOPICS.COORDINATE_GEO, lessonCount: 3 },
  { id: 'geometry-u5', title: '3D Geometry & Volume',         icon: TOPIC_ICONS[TOPICS.SOLID_GEOMETRY], color: '#047857', darkColor: '#065f46', topic: TOPICS.SOLID_GEOMETRY, lessonCount: 3 },
  { id: 'geometry-u6', title: 'Trigonometry',                 icon: TOPIC_ICONS[TOPICS.TRIGONOMETRY],   color: '#065f46', darkColor: '#064e3b', topic: TOPICS.TRIGONOMETRY,   lessonCount: 3 },
]

const LESSON_SIZE = 10

export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  const pool = getByTopic(topic)
  const sorted = [...pool].sort((a, b) => a.id - b.id)
  if (lessonIndex >= lessonCount) return [...pool].sort(() => Math.random() - 0.5)
  const chunkSize = Math.ceil(sorted.length / lessonCount)
  const start = lessonIndex * chunkSize
  return sorted.slice(start, start + chunkSize).slice(0, LESSON_SIZE)
}
