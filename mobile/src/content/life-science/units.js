import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import lsAug2025 from '../regents-exams/life-science/august-2025'
import lsJan2026 from '../regents-exams/life-science/january-2026'
import lsJun2025 from '../regents-exams/life-science/june-2025'

const LS_EXAMS = [lsAug2025, lsJan2026, lsJun2025]

// Exam topic strings match unit topic strings exactly; map 1-to-1.
// (Science Practices is not a topic here — it pools by question `skill` tag.)
const LS_TOPIC_MAP = {
  'Cells & Cell Processes':    TOPICS.CELLS,
  'Genetics & Heredity':       TOPICS.GENETICS,
  'Evolution & Natural Selection': TOPICS.EVOLUTION,
  'Ecosystems & Ecology':      TOPICS.ECOSYSTEMS,
  'Human Body Systems':        TOPICS.HUMAN_BODY,
}

const _api = makeLessonApi({ exams: LS_EXAMS, topicMap: LS_TOPIC_MAP, lessonSize: 15 })

// The Science Practices unit draws from any topic — its questions are tagged by
// the science practice they exercise rather than a content topic.
const SCIENCE_PRACTICE_SKILLS = ['data', 'model', 'experiment']

export const UNITS = [
  { id: 'life-science-u1', title: 'Cells & Cell Processes',         icon: TOPIC_ICONS[TOPICS.CELLS],             color: '#059669', darkColor: '#047857', topic: TOPICS.CELLS,             lessonCount: 3 },
  // Science practices early: data/model/experiment skills recur on nearly every stimulus item.
  { id: 'life-science-sp', title: 'Data & Investigations',          icon: TOPIC_ICONS[TOPICS.SCIENCE_PRACTICES], color: '#0891b2', darkColor: '#0e7490', topic: TOPICS.SCIENCE_PRACTICES, lessonCount: 2, skillPool: SCIENCE_PRACTICE_SKILLS },
  { id: 'life-science-u2', title: 'Genetics & Heredity',            icon: TOPIC_ICONS[TOPICS.GENETICS],          color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.GENETICS,          lessonCount: 3 },
  { id: 'life-science-u3', title: 'Evolution & Natural Selection',  icon: TOPIC_ICONS[TOPICS.EVOLUTION],         color: '#b45309', darkColor: '#92400e', topic: TOPICS.EVOLUTION,         lessonCount: 3 },
  { id: 'life-science-u4', title: 'Ecosystems & Ecology',           icon: TOPIC_ICONS[TOPICS.ECOSYSTEMS],        color: '#16a34a', darkColor: '#15803d', topic: TOPICS.ECOSYSTEMS,        lessonCount: 3 },
  { id: 'life-science-u5', title: 'Human Body Systems',             icon: TOPIC_ICONS[TOPICS.HUMAN_BODY],        color: '#dc2626', darkColor: '#b91c1c', topic: TOPICS.HUMAN_BODY,        lessonCount: 1 },
]

// Route the Science Practices unit to the skill pool; everything else by topic.
export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  if (topic === TOPICS.SCIENCE_PRACTICES) return _api.getSkillLessonQuestions(SCIENCE_PRACTICE_SKILLS, lessonIndex, lessonCount)
  return _api.getLessonQuestions(topic, lessonIndex, lessonCount)
}
export function getByTopic(topic) {
  if (topic === TOPICS.SCIENCE_PRACTICES) return _api.getBySkill(SCIENCE_PRACTICE_SKILLS[0]).concat(_api.getBySkill('model'), _api.getBySkill('experiment'))
  return _api.getByTopic(topic)
}
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
export const getWritten         = _api.getWritten
export const getBySkill         = _api.getBySkill
