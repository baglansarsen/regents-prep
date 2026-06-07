import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import a2Aug2019 from '../regents-exams/algebra-2/august-2019'
import a2Jun2019 from '../regents-exams/algebra-2/june-2019'
import a2Aug2022 from '../regents-exams/algebra-2/august-2022'
import a2Jun2022 from '../regents-exams/algebra-2/june-2022'
import a2Aug2023 from '../regents-exams/algebra-2/august-2023'
import a2Jun2023 from '../regents-exams/algebra-2/june-2023'
import a2Aug2024 from '../regents-exams/algebra-2/august-2024'
import a2Jun2024 from '../regents-exams/algebra-2/june-2024'
import a2Jun2025 from '../regents-exams/algebra-2/june-2025'

const A2_EXAMS = [a2Aug2019, a2Jun2019, a2Aug2022, a2Jun2022, a2Aug2023, a2Jun2023, a2Aug2024, a2Jun2024, a2Jun2025]

const A2_TOPIC_MAP = {
  'Polynomial Functions':      TOPICS.POLYNOMIAL_FUNCTIONS,
  'Polynomials':               TOPICS.POLYNOMIAL_FUNCTIONS,
  'Functions':                 TOPICS.POLYNOMIAL_FUNCTIONS,
  'Conic Sections':            TOPICS.POLYNOMIAL_FUNCTIONS,
  'Quadratic Functions':       TOPICS.POLYNOMIAL_FUNCTIONS,
  'Equations':                 TOPICS.POLYNOMIAL_FUNCTIONS,
  'Rational & Radical':        TOPICS.RATIONAL_RADICAL,
  'Rational Functions':        TOPICS.RATIONAL_RADICAL,
  'Radical Equations':         TOPICS.RATIONAL_RADICAL,
  'Exponential & Logarithmic': TOPICS.EXPONENTIAL_LOG,
  'Trigonometric Functions':   TOPICS.TRIGONOMETRY,
  'Trigonometry':              TOPICS.TRIGONOMETRY,
  'Statistics & Probability':  TOPICS.STATISTICS,
  'Complex Numbers':           TOPICS.COMPLEX_NUMBERS,
  'Sequences & Series':        TOPICS.SEQUENCES,
  'Systems & Inequalities':    TOPICS.SYSTEMS_INEQUALITIES,
  'Systems of Equations':      TOPICS.SYSTEMS_INEQUALITIES,
}

const _api = makeLessonApi({ exams: A2_EXAMS, topicMap: A2_TOPIC_MAP, lessonSize: 20 })

export const UNITS = [
  { id: 'algebra-2-u1', title: 'Polynomial Functions',           icon: TOPIC_ICONS[TOPICS.POLYNOMIAL_FUNCTIONS], color: '#06b6d4', darkColor: '#0891b2', topic: TOPICS.POLYNOMIAL_FUNCTIONS, lessonCount: 3 },
  { id: 'algebra-2-u2', title: 'Rational & Radical Expressions', icon: TOPIC_ICONS[TOPICS.RATIONAL_RADICAL],     color: '#0ea5e9', darkColor: '#0284c7', topic: TOPICS.RATIONAL_RADICAL,     lessonCount: 3 },
  { id: 'algebra-2-u3', title: 'Exponential & Logarithmic',      icon: TOPIC_ICONS[TOPICS.EXPONENTIAL_LOG],      color: '#38bdf8', darkColor: '#0ea5e9', topic: TOPICS.EXPONENTIAL_LOG,      lessonCount: 3 },
  { id: 'algebra-2-u4', title: 'Trigonometric Functions',        icon: TOPIC_ICONS[TOPICS.TRIGONOMETRY],         color: '#22d3ee', darkColor: '#06b6d4', topic: TOPICS.TRIGONOMETRY,         lessonCount: 3 },
  { id: 'algebra-2-u5', title: 'Statistics & Probability',       icon: TOPIC_ICONS[TOPICS.STATISTICS],           color: '#67e8f9', darkColor: '#22d3ee', topic: TOPICS.STATISTICS,           lessonCount: 3 },
  { id: 'algebra-2-u6', title: 'Complex Numbers',                icon: TOPIC_ICONS[TOPICS.COMPLEX_NUMBERS],      color: '#a5f3fc', darkColor: '#67e8f9', topic: TOPICS.COMPLEX_NUMBERS,      lessonCount: 3 },
  { id: 'algebra-2-u7', title: 'Sequences & Series',             icon: TOPIC_ICONS[TOPICS.SEQUENCES],            color: '#10b981', darkColor: '#059669', topic: TOPICS.SEQUENCES,            lessonCount: 3 },
  { id: 'algebra-2-u8', title: 'Systems & Inequalities',         icon: TOPIC_ICONS[TOPICS.SYSTEMS_INEQUALITIES], color: '#14b8a6', darkColor: '#0f766e', topic: TOPICS.SYSTEMS_INEQUALITIES, lessonCount: 3 },
]

export const getLessonQuestions = _api.getLessonQuestions
export const getByTopic         = _api.getByTopic
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
