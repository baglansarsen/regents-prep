import { TOPICS, TOPIC_ICONS, getByTopic } from './questions'
import a2Aug2019 from '../regents-exams/algebra-2/august-2019'
import a2Jun2019 from '../regents-exams/algebra-2/june-2019'
import a2Aug2021 from '../regents-exams/algebra-2/august-2021'
import a2Jun2021 from '../regents-exams/algebra-2/june-2021'
import a2Aug2022 from '../regents-exams/algebra-2/august-2022'
import a2Jun2022 from '../regents-exams/algebra-2/june-2022'
import a2Aug2023 from '../regents-exams/algebra-2/august-2023'
import a2Jun2023 from '../regents-exams/algebra-2/june-2023'
import a2Aug2024 from '../regents-exams/algebra-2/august-2024'
import a2Jun2024 from '../regents-exams/algebra-2/june-2024'
import a2Jun2025 from '../regents-exams/algebra-2/june-2025'

const A2_EXAMS = [a2Aug2019, a2Jun2019, a2Aug2021, a2Jun2021, a2Aug2022, a2Jun2022, a2Aug2023, a2Jun2023, a2Aug2024, a2Jun2024, a2Jun2025]

export const UNITS = [
  { id: 'algebra-2-u1', title: 'Polynomial Functions',          icon: TOPIC_ICONS[TOPICS.POLYNOMIAL_FUNCTIONS], color: '#06b6d4', darkColor: '#0891b2', topic: TOPICS.POLYNOMIAL_FUNCTIONS, lessonCount: 3 },
  { id: 'algebra-2-u2', title: 'Rational & Radical Expressions', icon: TOPIC_ICONS[TOPICS.RATIONAL_RADICAL],    color: '#0ea5e9', darkColor: '#0284c7', topic: TOPICS.RATIONAL_RADICAL,    lessonCount: 3 },
  { id: 'algebra-2-u3', title: 'Exponential & Logarithmic',      icon: TOPIC_ICONS[TOPICS.EXPONENTIAL_LOG],     color: '#38bdf8', darkColor: '#0ea5e9', topic: TOPICS.EXPONENTIAL_LOG,     lessonCount: 3 },
  { id: 'algebra-2-u4', title: 'Trigonometric Functions',        icon: TOPIC_ICONS[TOPICS.TRIGONOMETRY],        color: '#22d3ee', darkColor: '#06b6d4', topic: TOPICS.TRIGONOMETRY,        lessonCount: 3 },
  { id: 'algebra-2-u5', title: 'Statistics & Probability',       icon: TOPIC_ICONS[TOPICS.STATISTICS],          color: '#67e8f9', darkColor: '#22d3ee', topic: TOPICS.STATISTICS,          lessonCount: 3 },
  { id: 'algebra-2-u6', title: 'Complex Numbers',                icon: TOPIC_ICONS[TOPICS.COMPLEX_NUMBERS],     color: '#a5f3fc', darkColor: '#67e8f9', topic: TOPICS.COMPLEX_NUMBERS,     lessonCount: 3 },
  { id: 'algebra-2-u7', title: 'Using the Graphing Calculator',  icon: TOPIC_ICONS[TOPICS.CALCULATOR],          color: '#14b8a6', darkColor: '#0f766e', topic: TOPICS.CALCULATOR,          lessonCount: 3 },
]

const LESSON_SIZE = 20

function getExamPool(topic) {
  return A2_EXAMS.flatMap((exam) => (exam.questions ?? []).filter((q) => q.topic === topic))
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
