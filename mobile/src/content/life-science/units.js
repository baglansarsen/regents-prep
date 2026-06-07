import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import lsAug2025 from '../regents-exams/life-science/august-2025'
import lsJan2026 from '../regents-exams/life-science/january-2026'
import lsJun2025 from '../regents-exams/life-science/june-2025'

const LS_EXAMS = [lsAug2025, lsJan2026, lsJun2025]

// Exam topic strings match unit topic strings exactly; map 1-to-1.
// 'Classification of Life' has no exam questions so it is omitted from the map.
const LS_TOPIC_MAP = {
  'Cells & Cell Processes':    TOPICS.CELLS,
  'Genetics & Heredity':       TOPICS.GENETICS,
  'Evolution & Natural Selection': TOPICS.EVOLUTION,
  'Ecosystems & Ecology':      TOPICS.ECOSYSTEMS,
  'Human Body Systems':        TOPICS.HUMAN_BODY,
}

const _api = makeLessonApi({ exams: LS_EXAMS, topicMap: LS_TOPIC_MAP, lessonSize: 15 })

export const UNITS = [
  { id: 'life-science-u1', title: 'Cells & Cell Processes',        icon: TOPIC_ICONS[TOPICS.CELLS],      color: '#059669', darkColor: '#047857', topic: TOPICS.CELLS,      lessonCount: 2 },
  { id: 'life-science-u2', title: 'Genetics & Heredity',           icon: TOPIC_ICONS[TOPICS.GENETICS],   color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.GENETICS,   lessonCount: 3 },
  { id: 'life-science-u3', title: 'Evolution & Natural Selection',  icon: TOPIC_ICONS[TOPICS.EVOLUTION],  color: '#b45309', darkColor: '#92400e', topic: TOPICS.EVOLUTION,  lessonCount: 3 },
  { id: 'life-science-u4', title: 'Ecosystems & Ecology',          icon: TOPIC_ICONS[TOPICS.ECOSYSTEMS], color: '#16a34a', darkColor: '#15803d', topic: TOPICS.ECOSYSTEMS, lessonCount: 3 },
  { id: 'life-science-u5', title: 'Human Body Systems',            icon: TOPIC_ICONS[TOPICS.HUMAN_BODY], color: '#dc2626', darkColor: '#b91c1c', topic: TOPICS.HUMAN_BODY, lessonCount: 1 },
]

export const getLessonQuestions = _api.getLessonQuestions
export const getByTopic         = _api.getByTopic
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
