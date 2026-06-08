import enJun2025 from '../regents-exams/english/june-2025'
import enJan2026 from '../regents-exams/english/january-2026'
import enAug2024 from '../regents-exams/english/august-2024'
import enJun2024 from '../regents-exams/english/june-2024'
import enJan2025 from '../regents-exams/english/january-2025'
import enJan2024 from '../regents-exams/english/january-2024'
import enAug2023 from '../regents-exams/english/august-2023'
import enJun2023 from '../regents-exams/english/june-2023'
import enJan2023 from '../regents-exams/english/january-2023'
import enJun2022 from '../regents-exams/english/june-2022'
import enAug2022 from '../regents-exams/english/august-2022'
import enJun2021 from '../regents-exams/english/june-2021'
import enJun2019 from '../regents-exams/english/june-2019'
import enJun2018 from '../regents-exams/english/june-2018'
import enJun2017 from '../regents-exams/english/june-2017'
import enJun2016 from '../regents-exams/english/june-2016'
import enJun2015 from '../regents-exams/english/june-2015'
import enJun2014 from '../regents-exams/english/june-2014'

const EXAMS = [
  enJun2025, enJan2026, enAug2024, enJun2024, enJan2025, enJan2024, enAug2023, enJun2023,
  enJan2023, enJun2022, enAug2022, enJun2021, enJun2019, enJun2018, enJun2017, enJun2016,
  enJun2015, enJun2014,
]

export const UNITS = [
  { id: 'english-u1', title: 'Recent Exams (2024-2025)', icon: '📖', color: '#ef4444', darkColor: '#dc2626', lessonCount: 2 },
  { id: 'english-u2', title: 'Past Exams (2021-2023)', icon: '📚', color: '#f87171', darkColor: '#ef4444', lessonCount: 2 },
  { id: 'english-u3', title: 'Archive (2014-2020)', icon: '📕', color: '#fca5a5', darkColor: '#f87171', lessonCount: 2 },
]

const LESSON_SIZE = 25

function getExamsByYear(minYear, maxYear) {
  return EXAMS.filter(exam => exam.year >= minYear && exam.year <= maxYear)
    .flatMap(exam => (exam.questions || []).filter(q => Array.isArray(q.choices) && q.choices.length > 0))
}

export function getLessonQuestions(unitId, lessonIndex, lessonCount) {
  let examPool = []

  if (unitId === 'english-u1') {
    examPool = getExamsByYear(2024, 2025)
  } else if (unitId === 'english-u2') {
    examPool = getExamsByYear(2021, 2023)
  } else if (unitId === 'english-u3') {
    examPool = getExamsByYear(2014, 2020)
  }

  if (lessonIndex >= lessonCount) {
    return examPool.sort(() => Math.random() - 0.5)
  }

  const eChunk = Math.ceil(examPool.length / lessonCount)
  const examSlice = examPool.slice(lessonIndex * eChunk, lessonIndex * eChunk + eChunk)

  return examSlice.sort(() => Math.random() - 0.5).slice(0, LESSON_SIZE)
}
