import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import a1Aug2019 from '../regents-exams/algebra-1/august-2019'
import a1Jun2019 from '../regents-exams/algebra-1/june-2019'
import a1Aug2022 from '../regents-exams/algebra-1/august-2022'
import a1Jun2022 from '../regents-exams/algebra-1/june-2022'
import a1Aug2023 from '../regents-exams/algebra-1/august-2023'
import a1Jun2023 from '../regents-exams/algebra-1/june-2023'
import a1Aug2024 from '../regents-exams/algebra-1/august-2024'
import a1Jun2024 from '../regents-exams/algebra-1/june-2024'
import a1Jun2025 from '../regents-exams/algebra-1/june-2025'

const A1_EXAMS = [a1Aug2019, a1Jun2019, a1Aug2022, a1Jun2022, a1Aug2023, a1Jun2023, a1Aug2024, a1Jun2024, a1Jun2025]

// Normalize exam topic strings → unit topic constants.
// Unmapped topics (General, Geometry Applications, etc.) are silently dropped.
const A1_TOPIC_MAP = {
  'Linear Equations & Inequalities':  TOPICS.LINEAR_EQUATIONS,
  'Linear Equations':                 TOPICS.LINEAR_EQUATIONS,
  'Inequalities':                     TOPICS.LINEAR_EQUATIONS,
  'Real Number System':               TOPICS.LINEAR_EQUATIONS,
  'Real Numbers & Number Properties': TOPICS.LINEAR_EQUATIONS,
  'Number Properties':                TOPICS.LINEAR_EQUATIONS,
  'Number Sense':                     TOPICS.LINEAR_EQUATIONS,
  'Number Theory':                    TOPICS.LINEAR_EQUATIONS,
  'Functions & Relations':            TOPICS.FUNCTIONS,
  'Linear & Quadratic Functions':     TOPICS.FUNCTIONS,
  'Systems of Equations':             TOPICS.SYSTEMS,
  'Polynomials & Factoring':          TOPICS.POLYNOMIALS,
  'Quadratic Functions':              TOPICS.QUADRATICS,
  'Exponential Functions':            TOPICS.QUADRATICS,
  'Statistics & Probability':         TOPICS.STATISTICS,
  'Sequences':                        TOPICS.SEQUENCES,
  'Sequences & Series':               TOPICS.SEQUENCES,
}

const _api = makeLessonApi({ exams: A1_EXAMS, topicMap: A1_TOPIC_MAP, lessonSize: 20 })

export const UNITS = [
  { id: 'algebra-1-u1', title: 'Linear Equations & Inequalities', icon: TOPIC_ICONS[TOPICS.LINEAR_EQUATIONS], color: '#8b5cf6', darkColor: '#6d28d9', topic: TOPICS.LINEAR_EQUATIONS, lessonCount: 3 },
  { id: 'algebra-1-u2', title: 'Functions & Relations',           icon: TOPIC_ICONS[TOPICS.FUNCTIONS],        color: '#7c3aed', darkColor: '#5b21b6', topic: TOPICS.FUNCTIONS,        lessonCount: 3 },
  { id: 'algebra-1-u3', title: 'Systems of Equations',           icon: TOPIC_ICONS[TOPICS.SYSTEMS],          color: '#6d28d9', darkColor: '#4c1d95', topic: TOPICS.SYSTEMS,          lessonCount: 3 },
  { id: 'algebra-1-u4', title: 'Polynomials & Factoring',        icon: TOPIC_ICONS[TOPICS.POLYNOMIALS],      color: '#a855f7', darkColor: '#7e22ce', topic: TOPICS.POLYNOMIALS,      lessonCount: 3 },
  { id: 'algebra-1-u5', title: 'Quadratic Functions',            icon: TOPIC_ICONS[TOPICS.QUADRATICS],       color: '#9333ea', darkColor: '#6b21a8', topic: TOPICS.QUADRATICS,       lessonCount: 3 },
  { id: 'algebra-1-u6', title: 'Statistics & Probability',       icon: TOPIC_ICONS[TOPICS.STATISTICS],       color: '#c084fc', darkColor: '#9333ea', topic: TOPICS.STATISTICS,       lessonCount: 3 },
  { id: 'algebra-1-u7', title: 'Sequences & Patterns',           icon: TOPIC_ICONS[TOPICS.SEQUENCES],        color: '#14b8a6', darkColor: '#0f766e', topic: TOPICS.SEQUENCES,        lessonCount: 3 },
]

export const getLessonQuestions  = _api.getLessonQuestions
export const getByTopic          = _api.getByTopic
export const buildDiagnosticSet  = _api.buildDiagnosticSet
export const allQuestions        = _api.allQuestions
