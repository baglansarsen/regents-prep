import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import chemAug2016 from '../regents-exams/chemistry/august-2016'
import chemJun2016 from '../regents-exams/chemistry/june-2016'
import chemAug2017 from '../regents-exams/chemistry/august-2017'
import chemJan2017 from '../regents-exams/chemistry/january-2017'
import chemJun2017 from '../regents-exams/chemistry/june-2017'
import chemAug2018 from '../regents-exams/chemistry/august-2018'
import chemJan2018 from '../regents-exams/chemistry/january-2018'
import chemJun2018 from '../regents-exams/chemistry/june-2018'
import chemAug2019 from '../regents-exams/chemistry/august-2019'
import chemJun2019 from '../regents-exams/chemistry/june-2019'
import chemJan2020 from '../regents-exams/chemistry/january-2020'
import chemAug2022 from '../regents-exams/chemistry/august-2022'
import chemJun2022 from '../regents-exams/chemistry/june-2022'
import chemJun2023 from '../regents-exams/chemistry/june-2023'
import chemAug2023 from '../regents-exams/chemistry/august-2023'
import chemJan2023 from '../regents-exams/chemistry/january-2023'
import chemJan2024 from '../regents-exams/chemistry/january-2024'
import chemJun2024 from '../regents-exams/chemistry/june-2024'
import chemAug2024 from '../regents-exams/chemistry/august-2024'
import chemJan2025 from '../regents-exams/chemistry/january-2025'
import chemJun2025 from '../regents-exams/chemistry/june-2025'
import chemAug2025 from '../regents-exams/chemistry/august-2025'
import chemJan2026 from '../regents-exams/chemistry/january-2026'
import chemJun2026 from '../regents-exams/chemistry/june-2026'

// Every posted NYSED Chemistry exam we have on disk — 15 more than before
// (all of 2016-2022 plus january-2023 and june-2026) were sitting unused.
const CHEM_EXAMS = [
  chemAug2016, chemJun2016,
  chemJan2017, chemAug2017, chemJun2017,
  chemJan2018, chemAug2018, chemJun2018,
  chemAug2019, chemJun2019,
  chemJan2020,
  chemAug2022, chemJun2022,
  chemJan2023, chemAug2023, chemJun2023,
  chemJan2024, chemAug2024, chemJun2024,
  chemJan2025, chemAug2025, chemJun2025,
  chemJan2026, chemJun2026,
]

const CHEM_TOPIC_MAP = {
  'Atomic Structure':         TOPICS.ATOMIC_STRUCTURE,
  'Atomic Concepts':          TOPICS.ATOMIC_STRUCTURE,
  'Periodic Table':           TOPICS.PERIODIC_TABLE,
  'Chemical Bonding':         TOPICS.CHEMICAL_BONDING,
  'Bonding':                  TOPICS.CHEMICAL_BONDING,
  'Matter & Energy':          TOPICS.MATTER_AND_ENERGY,
  'Thermochemistry':          TOPICS.MATTER_AND_ENERGY,
  'Gases':                    TOPICS.MATTER_AND_ENERGY,
  'Gas Laws':                 TOPICS.MATTER_AND_ENERGY,
  'Organic Chemistry':        TOPICS.ORGANIC_CHEMISTRY,
  'Equilibrium & Kinetics':   TOPICS.REACTIONS_KINETICS,
  'Kinetics & Equilibrium':   TOPICS.REACTIONS_KINETICS,
  'Kinetics':                 TOPICS.REACTIONS_KINETICS,
  'Stoichiometry':            TOPICS.REACTIONS_KINETICS,
  'Reactions & Stoichiometry':TOPICS.REACTIONS_KINETICS,
  'Reactions':                TOPICS.REACTIONS_KINETICS,
  'The Mole':                 TOPICS.REACTIONS_KINETICS,
  'Nuclear Chemistry':        TOPICS.NUCLEAR_SOLUTIONS,
  'Solutions':                TOPICS.NUCLEAR_SOLUTIONS,
  'Solutions & Solubility':   TOPICS.NUCLEAR_SOLUTIONS,
  'Acids & Bases':            TOPICS.ACIDS_REDOX,
  'Acids, Bases & Salts':     TOPICS.ACIDS_REDOX,
  'Redox & Electrochemistry': TOPICS.ACIDS_REDOX,
  'Redox Chemistry':          TOPICS.ACIDS_REDOX,
  'Electrochemistry':         TOPICS.ACIDS_REDOX,
  'Oxidation-Reduction':      TOPICS.ACIDS_REDOX,
  'Redox':                    TOPICS.ACIDS_REDOX,
  'General':                  TOPICS.MIXED_REVIEW,
  'General Review':           TOPICS.MIXED_REVIEW,
  'Measurement':              TOPICS.MIXED_REVIEW,
  'Laboratory':               TOPICS.MIXED_REVIEW,
}

const _api = makeLessonApi({ exams: CHEM_EXAMS, topicMap: CHEM_TOPIC_MAP, lessonSize: 20 })

const SUBTOPIC_UNITS = [TOPICS.CLASSIFICATION, TOPICS.ENERGY_PHASES, TOPICS.GAS_LAWS]
// Chemistry leans on the Chemistry Reference Tables (solubility curves, heating
// curves, PE diagrams, activity series) + Lewis/particle models.
const SP_SKILLS = ['reference', 'data', 'model', 'experiment']

export const UNITS = [
  { id: 'chemistry-u1', title: 'Atomic Structure',                   icon: TOPIC_ICONS[TOPICS.ATOMIC_STRUCTURE],   color: '#ec4899', darkColor: '#be185d', topic: TOPICS.ATOMIC_STRUCTURE,   lessonCount: 3 },
  { id: 'chemistry-u2', title: 'Periodic Table',                     icon: TOPIC_ICONS[TOPICS.PERIODIC_TABLE],     color: '#db2777', darkColor: '#9d174d', topic: TOPICS.PERIODIC_TABLE,     lessonCount: 2 },
  { id: 'chemistry-u3', title: 'Chemical Bonding',                   icon: TOPIC_ICONS[TOPICS.CHEMICAL_BONDING],   color: '#c084fc', darkColor: '#a855f7', topic: TOPICS.CHEMICAL_BONDING,   lessonCount: 2 },
  // Reference Tables & Data early: the Chemistry Reference Tables are used throughout.
  { id: 'chemistry-sp', title: 'Reference Tables & Data',            icon: TOPIC_ICONS[TOPICS.SCIENCE_PRACTICES],  color: '#0891b2', darkColor: '#0e7490', topic: TOPICS.SCIENCE_PRACTICES,  lessonCount: 3, skillPool: SP_SKILLS },
  // ── Matter & Energy, split ──
  { id: 'chemistry-cls', title: 'Classification of Matter',          icon: TOPIC_ICONS[TOPICS.CLASSIFICATION],     color: '#f43f5e', darkColor: '#e11d48', topic: TOPICS.CLASSIFICATION,     lessonCount: 3 },
  { id: 'chemistry-eng', title: 'Energy & Phase Changes',            icon: TOPIC_ICONS[TOPICS.ENERGY_PHASES],      color: '#f97316', darkColor: '#ea580c', topic: TOPICS.ENERGY_PHASES,      lessonCount: 2 },
  { id: 'chemistry-gas', title: 'Gas Laws',                          icon: TOPIC_ICONS[TOPICS.GAS_LAWS],           color: '#fb923c', darkColor: '#f97316', topic: TOPICS.GAS_LAWS,           lessonCount: 2 },
  { id: 'chemistry-u6', title: 'Reactions, Kinetics & Stoichiometry', icon: TOPIC_ICONS[TOPICS.REACTIONS_KINETICS], color: '#d97706', darkColor: '#b45309', topic: TOPICS.REACTIONS_KINETICS, lessonCount: 3 },
  { id: 'chemistry-u7', title: 'Nuclear Chemistry & Solutions',      icon: TOPIC_ICONS[TOPICS.NUCLEAR_SOLUTIONS],  color: '#a855f7', darkColor: '#9333ea', topic: TOPICS.NUCLEAR_SOLUTIONS,  lessonCount: 3 },
  { id: 'chemistry-u8', title: 'Acids, Bases & Redox',               icon: TOPIC_ICONS[TOPICS.ACIDS_REDOX],        color: '#10b981', darkColor: '#059669', topic: TOPICS.ACIDS_REDOX,        lessonCount: 3 },
  { id: 'chemistry-u5', title: 'Organic Chemistry',                  icon: TOPIC_ICONS[TOPICS.ORGANIC_CHEMISTRY],  color: '#22c55e', darkColor: '#16a34a', topic: TOPICS.ORGANIC_CHEMISTRY,  lessonCount: 2 },
  { id: 'chemistry-u9', title: 'Chemistry Mixed Review',             icon: TOPIC_ICONS[TOPICS.MIXED_REVIEW],       color: '#6b7280', darkColor: '#4b5563', topic: TOPICS.MIXED_REVIEW,       lessonCount: 1 },
]

export function getLessonQuestions(topic, lessonIndex, lessonCount) {
  if (topic === TOPICS.SCIENCE_PRACTICES) return _api.getSkillLessonQuestions(SP_SKILLS, lessonIndex, lessonCount)
  if (SUBTOPIC_UNITS.includes(topic))     return _api.getSubTopicLessonQuestions(topic, lessonIndex, lessonCount)
  return _api.getLessonQuestions(topic, lessonIndex, lessonCount)
}
export function getByTopic(topic) {
  if (topic === TOPICS.SCIENCE_PRACTICES) return SP_SKILLS.flatMap((sk) => _api.getBySkill(sk))
  if (SUBTOPIC_UNITS.includes(topic))     return _api.getBySubTopic(topic)
  return _api.getByTopic(topic)
}
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
export const getWritten         = _api.getWritten
export const getBySkill         = _api.getBySkill
