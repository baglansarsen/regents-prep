import ghJun2025 from '../regents-exams/global-history/june-2025'
import ghJan2026 from '../regents-exams/global-history/january-2026'
import ghAug2024 from '../regents-exams/global-history/august-2024'
import ghJun2024 from '../regents-exams/global-history/june-2024'
import ghJan2025 from '../regents-exams/global-history/january-2025'
import ghJan2024 from '../regents-exams/global-history/january-2024'
import ghAug2023 from '../regents-exams/global-history/august-2023'
import ghJun2023 from '../regents-exams/global-history/june-2023'
import ghJan2023 from '../regents-exams/global-history/january-2023'
import ghJun2022 from '../regents-exams/global-history/june-2022'
import ghAug2022 from '../regents-exams/global-history/august-2022'
import ghJun2019 from '../regents-exams/global-history/june-2019'

const EXAMS = [
  ghJun2025, ghJan2026, ghAug2024, ghJun2024, ghJan2025, ghJan2024, ghAug2023, ghJun2023,
  ghJan2023, ghJun2022, ghAug2022, ghJun2019,
]

export const UNITS = [
  { id: 'global-history-u1', title: 'Recent Exams (2023-2025)', icon: '🌐', color: '#0ea5e9', darkColor: '#0284c7', lessonCount: 2 },
  { id: 'global-history-u2', title: 'Earlier Exams (2019-2022)', icon: '🌍', color: '#38bdf8', darkColor: '#0ea5e9', lessonCount: 2 },
]

const LESSON_SIZE = 25

function getExamsByYear(minYear, maxYear) {
  return EXAMS.filter(exam => exam.year >= minYear && exam.year <= maxYear)
    .flatMap(exam => (exam.questions || []).filter(q => Array.isArray(q.choices) && q.choices.length > 0 && q.choices.every((c) => String(c ?? '').trim() !== '')))
}

export function getLessonQuestions(unitId, lessonIndex, lessonCount) {
  let examPool = []

  if (unitId === 'global-history-u1') {
    examPool = getExamsByYear(2023, 2025)
  } else if (unitId === 'global-history-u2') {
    examPool = getExamsByYear(2019, 2022)
  }

  if (lessonIndex >= lessonCount) {
    return examPool.sort(() => Math.random() - 0.5)
  }

  const eChunk = Math.ceil(examPool.length / lessonCount)
  const examSlice = examPool.slice(lessonIndex * eChunk, lessonIndex * eChunk + eChunk)

  return examSlice.sort(() => Math.random() - 0.5).slice(0, LESSON_SIZE)
}
