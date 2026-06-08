import { TOPICS, TOPIC_ICONS } from './questions'
import { makeLessonApi } from '../_shared/lessonEngine'
import chemJun2023 from '../regents-exams/chemistry/june-2023'
import chemJun2024 from '../regents-exams/chemistry/june-2024'
import chemAug2024 from '../regents-exams/chemistry/august-2024'
import chemJun2025 from '../regents-exams/chemistry/june-2025'

const CHEM_EXAMS = [chemJun2023, chemJun2024, chemAug2024, chemJun2025]

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
}

const _api = makeLessonApi({ exams: CHEM_EXAMS, topicMap: CHEM_TOPIC_MAP, lessonSize: 20 })

export const UNITS = [
  { id: 'chemistry-u1', title: 'Atomic Structure',                  icon: TOPIC_ICONS[TOPICS.ATOMIC_STRUCTURE],   color: '#ec4899', darkColor: '#be185d', topic: TOPICS.ATOMIC_STRUCTURE,   lessonCount: 3 },
  { id: 'chemistry-u2', title: 'Periodic Table',                    icon: TOPIC_ICONS[TOPICS.PERIODIC_TABLE],     color: '#db2777', darkColor: '#9d174d', topic: TOPICS.PERIODIC_TABLE,     lessonCount: 3 },
  { id: 'chemistry-u3', title: 'Chemical Bonding',                  icon: TOPIC_ICONS[TOPICS.CHEMICAL_BONDING],   color: '#c084fc', darkColor: '#a855f7', topic: TOPICS.CHEMICAL_BONDING,   lessonCount: 3 },
  { id: 'chemistry-u4', title: 'Matter & Energy',                   icon: TOPIC_ICONS[TOPICS.MATTER_AND_ENERGY],  color: '#f43f5e', darkColor: '#e11d48', topic: TOPICS.MATTER_AND_ENERGY,  lessonCount: 3 },
  { id: 'chemistry-u5', title: 'Organic Chemistry',                 icon: TOPIC_ICONS[TOPICS.ORGANIC_CHEMISTRY],  color: '#fb7185', darkColor: '#f43f5e', topic: TOPICS.ORGANIC_CHEMISTRY,  lessonCount: 3 },
  { id: 'chemistry-u6', title: 'Reactions, Kinetics & Stoichiometry', icon: TOPIC_ICONS[TOPICS.REACTIONS_KINETICS], color: '#f97316', darkColor: '#ea580c', topic: TOPICS.REACTIONS_KINETICS, lessonCount: 3 },
  { id: 'chemistry-u7', title: 'Nuclear Chemistry & Solutions',     icon: TOPIC_ICONS[TOPICS.NUCLEAR_SOLUTIONS],  color: '#a855f7', darkColor: '#9333ea', topic: TOPICS.NUCLEAR_SOLUTIONS,  lessonCount: 3 },
  { id: 'chemistry-u8', title: 'Acids, Bases & Redox',              icon: TOPIC_ICONS[TOPICS.ACIDS_REDOX],        color: '#10b981', darkColor: '#059669', topic: TOPICS.ACIDS_REDOX,        lessonCount: 3 },
]

export const getLessonQuestions = _api.getLessonQuestions
export const getByTopic         = _api.getByTopic
export const buildDiagnosticSet = _api.buildDiagnosticSet
export const allQuestions       = _api.allQuestions
