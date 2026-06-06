import usJun2025 from '../regents-exams/us-history/june-2025'
import usJan2026 from '../regents-exams/us-history/january-2026'
import usAug2024 from '../regents-exams/us-history/august-2024'
import usJun2024 from '../regents-exams/us-history/june-2024'
import usJan2025 from '../regents-exams/us-history/january-2025'
import usJan2024 from '../regents-exams/us-history/january-2024'
import usAug2023 from '../regents-exams/us-history/august-2023'
import usJun2023 from '../regents-exams/us-history/june-2023'

const EXAMS = [
  usJun2025, usJan2026, usAug2024, usJun2024, usJan2025, usJan2024, usAug2023, usJun2023,
]

export const UNITS = [
  { id: 'us-history-u1', title: 'Foundations & Early Republic', icon: '🗽', color: '#a855f7', darkColor: '#7e22ce', lessonCount: 2 },
  { id: 'us-history-u2', title: 'Westward Expansion & Civil War', icon: '🐴', color: '#d946ef', darkColor: '#a855f7', lessonCount: 2 },
  { id: 'us-history-u3', title: 'Industrial Age & Progressivism', icon: '🏭', color: '#f97316', darkColor: '#d97706', lessonCount: 2 },
  { id: 'us-history-u4', title: '20th Century America', icon: '📺', color: '#ca8a04', darkColor: '#a16207', lessonCount: 2 },
  { id: 'us-history-u5', title: 'Modern & Contemporary America', icon: '🇺🇸', color: '#3b82f6', darkColor: '#1d4ed8', lessonCount: 2 },
]

const LESSON_SIZE = 25

function getExamsByTopic(topicIndex) {
  const totalQuestions = EXAMS.flatMap(exam => exam.questions || [])
  const questionsPerTopic = Math.ceil(totalQuestions.length / 5)
  const startIdx = topicIndex * questionsPerTopic
  const endIdx = startIdx + questionsPerTopic
  return totalQuestions.slice(startIdx, endIdx)
}

export function getLessonQuestions(unitId, lessonIndex, lessonCount) {
  let examPool = []

  if (unitId === 'us-history-u1') {
    examPool = getExamsByTopic(0)
  } else if (unitId === 'us-history-u2') {
    examPool = getExamsByTopic(1)
  } else if (unitId === 'us-history-u3') {
    examPool = getExamsByTopic(2)
  } else if (unitId === 'us-history-u4') {
    examPool = getExamsByTopic(3)
  } else if (unitId === 'us-history-u5') {
    examPool = getExamsByTopic(4)
  }

  if (lessonIndex >= lessonCount) {
    return examPool.sort(() => Math.random() - 0.5)
  }

  const eChunk = Math.ceil(examPool.length / lessonCount)
  const examSlice = examPool.slice(lessonIndex * eChunk, lessonIndex * eChunk + eChunk)

  return examSlice.sort(() => Math.random() - 0.5).slice(0, LESSON_SIZE)
}
