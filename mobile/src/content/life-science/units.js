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

// Unit metadata (strand/essCodes/examWeight/prereqs) follows the pattern
// established in content/earth-science/units.js — see the comment block
// there for what each field means and how consumers (usePredictedScore,
// useUnitUnlocks) use it. Unlike Earth Science, life-science's exam bank is
// small (138 questions across 3 exams) and fully enriched, so weights are
// computed directly from the real per-topic counts rather than via a
// separate script: Cells 34, Genetics 30, Evolution 30, Ecosystems 37,
// Human Body 7 — sums to 138. strand values use NGSS Life Science strand
// codes (LS1 Molecules→Organisms, LS2 Ecosystems, LS3 Heredity, LS4
// Evolution) since there's no NY-specific crosswalk for this newer exam yet.
export const UNITS = [
  { id: 'life-science-u1', title: 'Cells & Cell Processes',         icon: TOPIC_ICONS[TOPICS.CELLS],             color: '#059669', darkColor: '#047857', topic: TOPICS.CELLS,             lessonCount: 3, strand: 'LS1', essCodes: ['HS-LS1-1', 'HS-LS1-2', 'HS-LS1-5', 'HS-LS1-7'], examWeight: 0.246, prereqs: [] },
  // Science practices early: data/model/experiment skills recur on nearly every stimulus item.
  { id: 'life-science-sp', title: 'Data & Investigations',          icon: TOPIC_ICONS[TOPICS.SCIENCE_PRACTICES], color: '#0891b2', darkColor: '#0e7490', topic: TOPICS.SCIENCE_PRACTICES, lessonCount: 2, skillPool: SCIENCE_PRACTICE_SKILLS, strand: 'PRACTICE', essCodes: [], examWeight: null, prereqs: ['life-science-u1'] },
  { id: 'life-science-u2', title: 'Genetics & Heredity',            icon: TOPIC_ICONS[TOPICS.GENETICS],          color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.GENETICS,          lessonCount: 3, strand: 'LS3', essCodes: ['HS-LS1-4', 'HS-LS3-1', 'HS-LS3-2', 'HS-LS3-3'], examWeight: 0.217, prereqs: ['life-science-sp'] },
  { id: 'life-science-u3', title: 'Evolution & Natural Selection',  icon: TOPIC_ICONS[TOPICS.EVOLUTION],         color: '#b45309', darkColor: '#92400e', topic: TOPICS.EVOLUTION,         lessonCount: 3, strand: 'LS4', essCodes: ['HS-LS4-1', 'HS-LS4-2', 'HS-LS4-3', 'HS-LS4-4', 'HS-LS4-5'], examWeight: 0.217, prereqs: ['life-science-u2'] },
  { id: 'life-science-u4', title: 'Ecosystems & Ecology',           icon: TOPIC_ICONS[TOPICS.ECOSYSTEMS],        color: '#16a34a', darkColor: '#15803d', topic: TOPICS.ECOSYSTEMS,        lessonCount: 3, strand: 'LS2', essCodes: ['HS-LS2-1', 'HS-LS2-2', 'HS-LS2-6', 'HS-LS2-7', 'HS-LS2-8'], examWeight: 0.268, prereqs: ['life-science-u3'] },
  { id: 'life-science-u5', title: 'Human Body Systems',             icon: TOPIC_ICONS[TOPICS.HUMAN_BODY],        color: '#dc2626', darkColor: '#b91c1c', topic: TOPICS.HUMAN_BODY,        lessonCount: 1, strand: 'LS1', essCodes: ['HS-LS1-2', 'HS-LS1-3'], examWeight: 0.051, prereqs: ['life-science-u4'] },
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
