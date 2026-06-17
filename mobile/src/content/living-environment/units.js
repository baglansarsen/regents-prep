import { TOPICS, TOPIC_ICONS } from '../questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import leAug2019 from '../regents-exams/living-environment/august-2019'
import leJun2019 from '../regents-exams/living-environment/june-2019'
import leAug2022 from '../regents-exams/living-environment/august-2022'
import leJun2022 from '../regents-exams/living-environment/june-2022'
import leAug2023 from '../regents-exams/living-environment/august-2023'
import leJun2023 from '../regents-exams/living-environment/june-2023'
import leAug2024 from '../regents-exams/living-environment/august-2024'
import leJun2024 from '../regents-exams/living-environment/june-2024'
import leJun2025 from '../regents-exams/living-environment/june-2025'

const LE_EXAMS = [leAug2019, leJun2019, leAug2022, leJun2022, leAug2023, leJun2023, leAug2024, leJun2024, leJun2025]

const LE_TOPIC_MAP = {
  'Cell Biology':  TOPICS.CELL_BIOLOGY,   // split into 3 sub-topic units (by subTopic tag)
  'Genetics':      TOPICS.GENETICS,
  'Evolution':     TOPICS.EVOLUTION,
  'Ecology':       TOPICS.ECOLOGY,
  'Human Body':    TOPICS.HUMAN_BODY,
  'Reproduction':  TOPICS.HUMAN_BODY,     // merged: reproduction questions join Human Body (subTopic 'Reproduction')
  'General':       TOPICS.MIXED_REVIEW,
  'General Review':TOPICS.MIXED_REVIEW,
}

const _api = makeLessonApi({ exams: LE_EXAMS, topicMap: LE_TOPIC_MAP, lessonSize: 20 })

// Units defined by a content sub-topic (the Cell Biology split) vs by a science
// skill (Science Practices / Lab Skills) vs by a whole topic.
const SUBTOPIC_UNITS = [TOPICS.CELL_STRUCTURE, TOPICS.CELL_ENERGY, TOPICS.BIOCHEM]
const SP_SKILLS = ['data', 'experiment']

export const UNITS = [
  // ── Cell Biology, split into focused sub-units ──
  { id: 'le-cell-1', title: 'Cell Structure & Transport',          icon: TOPIC_ICONS[TOPICS.CELL_STRUCTURE],    color: '#16a34a', darkColor: '#15803d', topic: TOPICS.CELL_STRUCTURE,    lessonCount: 3 },
  { id: 'le-cell-2', title: 'Energy: Photosynthesis & Respiration', icon: TOPIC_ICONS[TOPICS.CELL_ENERGY],       color: '#ca8a04', darkColor: '#a16207', topic: TOPICS.CELL_ENERGY,       lessonCount: 2 },
  { id: 'le-cell-3', title: 'Biochemistry & Enzymes',              icon: TOPIC_ICONS[TOPICS.BIOCHEM],           color: '#0d9488', darkColor: '#0f766e', topic: TOPICS.BIOCHEM,           lessonCount: 1 },
  // ── Science practices (cross-topic skill pool) ──
  { id: 'le-sp',     title: 'Data & Investigations',               icon: TOPIC_ICONS[TOPICS.SCIENCE_PRACTICES], color: '#0891b2', darkColor: '#0e7490', topic: TOPICS.SCIENCE_PRACTICES, lessonCount: 2, skillPool: SP_SKILLS },
  // ── Core content ──
  { id: 'le-u2',     title: 'Genetics',                            icon: TOPIC_ICONS[TOPICS.GENETICS],          color: '#7c3aed', darkColor: '#6d28d9', topic: TOPICS.GENETICS,          lessonCount: 3 },
  { id: 'le-u3',     title: 'Evolution',                           icon: TOPIC_ICONS[TOPICS.EVOLUTION],         color: '#b45309', darkColor: '#92400e', topic: TOPICS.EVOLUTION,         lessonCount: 3 },
  { id: 'le-u4',     title: 'Ecology',                             icon: TOPIC_ICONS[TOPICS.ECOLOGY],           color: '#0369a1', darkColor: '#075985', topic: TOPICS.ECOLOGY,           lessonCount: 3 },
  { id: 'le-u5',     title: 'Human Body',                          icon: TOPIC_ICONS[TOPICS.HUMAN_BODY],        color: '#be123c', darkColor: '#9f1239', topic: TOPICS.HUMAN_BODY,        lessonCount: 3 },
  // ── Lab skills (NY state labs) + final mixed review ──
  { id: 'le-lab',    title: 'Lab Skills',                          icon: TOPIC_ICONS[TOPICS.LAB_SKILLS],        color: '#4f46e5', darkColor: '#4338ca', topic: TOPICS.LAB_SKILLS,        lessonCount: 2, skillPool: ['lab'] },
  { id: 'le-u7',     title: 'Mixed Review',                        icon: TOPIC_ICONS[TOPICS.MIXED_REVIEW],      color: '#6b7280', darkColor: '#4b5563', topic: TOPICS.MIXED_REVIEW,      lessonCount: 3 },
]

// Route each unit to the right pool: sub-topic split, skill pool, or whole topic.
export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  if (topic === TOPICS.SCIENCE_PRACTICES) return _api.getSkillLessonQuestions(SP_SKILLS, lessonIndex, lessonCount)
  if (topic === TOPICS.LAB_SKILLS)        return _api.getSkillLessonQuestions(['lab'], lessonIndex, lessonCount)
  if (SUBTOPIC_UNITS.includes(topic))     return _api.getSubTopicLessonQuestions(topic, lessonIndex, lessonCount)
  return _api.getLessonQuestions(topic, lessonIndex, lessonCount)
}
export function getByTopic(topic) {
  if (topic === TOPICS.SCIENCE_PRACTICES) return SP_SKILLS.flatMap((sk) => _api.getBySkill(sk))
  if (topic === TOPICS.LAB_SKILLS)        return _api.getBySkill('lab')
  if (SUBTOPIC_UNITS.includes(topic))     return _api.getBySubTopic(topic)
  return _api.getByTopic(topic)
}
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
export const getWritten         = _api.getWritten
export const getBySkill         = _api.getBySkill
