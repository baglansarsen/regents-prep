import { TOPICS, TOPIC_ICONS, QUESTIONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import { isEasy } from '../_shared/difficulty'

// Authored questions already use final topic strings, so the topicMap is identity.
const TOPIC_MAP = Object.fromEntries(Object.values(TOPICS).map((t) => [t, t]))

// Wrap the authored set as a single pseudo-"exam" to reuse the whole lesson
// engine (slicing, easy→hard ordering, Dive Deeper). Smaller lessons than the
// Regents subjects — these are short confidence-builders.
const _api = makeLessonApi({ exams: [{ questions: QUESTIONS }], topicMap: TOPIC_MAP, lessonSize: 12 })

// Only units with authored questions are listed (Integers first; the rest are
// authored next). Colors match the warm "foundations" palette.
export const UNITS = [
  { id: 'basic-integers',  title: 'Integers & Order of Operations', icon: TOPIC_ICONS[TOPICS.INTEGERS],  color: '#0d9488', darkColor: '#0f766e', topic: TOPICS.INTEGERS,  lessonCount: 2 },
  { id: 'basic-fractions', title: 'Fractions, Decimals & Percents',  icon: TOPIC_ICONS[TOPICS.FRACTIONS], color: '#d97706', darkColor: '#b45309', topic: TOPICS.FRACTIONS, lessonCount: 2 },
  { id: 'basic-ratios',     title: 'Ratios & Proportions',              icon: TOPIC_ICONS[TOPICS.RATIOS],     color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.RATIOS,     lessonCount: 2 },
  { id: 'basic-equations',  title: 'Expressions & One/Two-Step Equations', icon: TOPIC_ICONS[TOPICS.EQUATIONS], color: '#dc2626', darkColor: '#b91c1c', topic: TOPICS.EQUATIONS,  lessonCount: 2 },
  { id: 'basic-graphing',   title: 'Coordinate Plane & Basic Graphing',    icon: TOPIC_ICONS[TOPICS.GRAPHING],  color: '#2563eb', darkColor: '#1d4ed8', topic: TOPICS.GRAPHING,   lessonCount: 2 },
]

export const getLessonQuestions = _api.getLessonQuestions
export const getByTopic         = _api.getByTopic
export function getEasyPool(topic) { return getByTopic(topic).filter(isEasy) }
export const getWritten         = _api.getWritten
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
export const writtenLabel       = 'Worked Examples'
