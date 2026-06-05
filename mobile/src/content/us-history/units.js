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
  { id: 'us-history-u1', title: 'Recent Exams (2023-2025)', icon: '🗽', color: '#a855f7', darkColor: '#7e22ce', lessonCount: 2 },
]

const LESSON_SIZE = 25

function getExamsByYear(minYear, maxYear) {
  return EXAMS.filter(exam => exam.year >= minYear && exam.year <= maxYear)
    .flatMap(exam => exam.questions || [])
}

export function getLessonQuestions(unitId, lessonIndex, lessonCount) {
  let examPool = []

  if (unitId === 'us-history-u1') {
    examPool = getExamsByYear(2023, 2025)
  }

  if (lessonIndex >= lessonCount) {
    return examPool.sort(() => Math.random() - 0.5)
  }

  const eChunk = Math.ceil(examPool.length / lessonCount)
  const examSlice = examPool.slice(lessonIndex * eChunk, lessonIndex * eChunk + eChunk)

  return examSlice.sort(() => Math.random() - 0.5).slice(0, LESSON_SIZE)
}
