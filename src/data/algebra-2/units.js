import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'

export const UNITS = [
  { id: 'algebra-2-u1', title: 'Polynomial Functions',          icon: TOPIC_ICONS[TOPICS.POLYNOMIAL_FUNCTIONS], color: '#06b6d4', darkColor: '#0891b2', topic: TOPICS.POLYNOMIAL_FUNCTIONS, lessonCount: 3 },
  { id: 'algebra-2-u2', title: 'Rational & Radical Expressions', icon: TOPIC_ICONS[TOPICS.RATIONAL_RADICAL],    color: '#0ea5e9', darkColor: '#0284c7', topic: TOPICS.RATIONAL_RADICAL,    lessonCount: 3 },
  { id: 'algebra-2-u3', title: 'Exponential & Logarithmic',      icon: TOPIC_ICONS[TOPICS.EXPONENTIAL_LOG],     color: '#38bdf8', darkColor: '#0ea5e9', topic: TOPICS.EXPONENTIAL_LOG,     lessonCount: 3 },
  { id: 'algebra-2-u4', title: 'Trigonometric Functions',        icon: TOPIC_ICONS[TOPICS.TRIGONOMETRY],        color: '#22d3ee', darkColor: '#06b6d4', topic: TOPICS.TRIGONOMETRY,        lessonCount: 3 },
  { id: 'algebra-2-u5', title: 'Statistics & Probability',       icon: TOPIC_ICONS[TOPICS.STATISTICS],          color: '#67e8f9', darkColor: '#22d3ee', topic: TOPICS.STATISTICS,          lessonCount: 3 },
  { id: 'algebra-2-u6', title: 'Complex Numbers',                icon: TOPIC_ICONS[TOPICS.COMPLEX_NUMBERS],     color: '#a5f3fc', darkColor: '#67e8f9', topic: TOPICS.COMPLEX_NUMBERS,     lessonCount: 3 },
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
