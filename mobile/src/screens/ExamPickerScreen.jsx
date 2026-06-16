import React from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useSubject } from '../context/SubjectContext'
import { SUBJECTS, SUBJECT_META } from '../content/subjects'
import { T, duoBtn, cardShadow } from '../styles/duo'
import { useExamScores } from '../hooks/useExamScores'
import { useMistakes } from '../hooks/useMistakes'
import { getSubjectData } from '../utils/subjectData'
import { shuffle } from '../utils/question'

// Import exam registry dynamically
const LE_EXAMS = [
  { id: 'le-jun-2025', label: 'June 2025', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2024', label: 'June 2024', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2023', label: 'June 2023', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2022', label: 'June 2022', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2021', label: 'June 2021', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2019', label: 'June 2019', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2018', label: 'June 2018', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2017', label: 'June 2017', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2016', label: 'June 2016', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jan-2026', label: 'January 2026', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jan-2025', label: 'January 2025', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jan-2024', label: 'January 2024', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jan-2023', label: 'January 2023', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jan-2020', label: 'January 2020', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jan-2018', label: 'January 2018', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jan-2017', label: 'January 2017', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jan-2016', label: 'January 2016', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2025', label: 'August 2025', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2024', label: 'August 2024', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2023', label: 'August 2023', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2022', label: 'August 2022', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2021', label: 'August 2021', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2019', label: 'August 2019', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2018', label: 'August 2018', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2017', label: 'August 2017', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2016', label: 'August 2016', subject: SUBJECTS.LIVING_ENVIRONMENT },
]

const ES_EXAMS = [
  { id: 'es-jun-2025', label: 'June 2025', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2024', label: 'June 2024', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2023', label: 'June 2023', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2022', label: 'June 2022', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2021', label: 'June 2021', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2019', label: 'June 2019', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2018', label: 'June 2018', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jan-2026', label: 'January 2026', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jan-2025', label: 'January 2025', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jan-2024', label: 'January 2024', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jan-2023', label: 'January 2023', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jan-2020', label: 'January 2020', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2025', label: 'August 2025', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2024', label: 'August 2024', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2023', label: 'August 2023', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2022', label: 'August 2022', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2021', label: 'August 2021', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2019', label: 'August 2019', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2018', label: 'August 2018', subject: SUBJECTS.EARTH_SCIENCE },
]

const CHEM_EXAMS = [
  { id: 'chem-jun-2025', label: 'June 2025', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jun-2024', label: 'June 2024', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jun-2023', label: 'June 2023', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jun-2022', label: 'June 2022', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jun-2019', label: 'June 2019', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jun-2018', label: 'June 2018', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jun-2017', label: 'June 2017', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jun-2016', label: 'June 2016', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jan-2026', label: 'January 2026', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jan-2025', label: 'January 2025', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jan-2024', label: 'January 2024', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jan-2023', label: 'January 2023', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jan-2020', label: 'January 2020', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jan-2018', label: 'January 2018', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jan-2017', label: 'January 2017', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-aug-2025', label: 'August 2025', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-aug-2024', label: 'August 2024', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-aug-2023', label: 'August 2023', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-aug-2022', label: 'August 2022', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-aug-2019', label: 'August 2019', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-aug-2018', label: 'August 2018', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-aug-2017', label: 'August 2017', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-aug-2016', label: 'August 2016', subject: SUBJECTS.CHEMISTRY },
]

const PHYS_EXAMS = [
  { id: 'phys-jun-2025', label: 'June 2025', subject: SUBJECTS.PHYSICS },
  { id: 'phys-jun-2024', label: 'June 2024', subject: SUBJECTS.PHYSICS },
  { id: 'phys-jun-2023', label: 'June 2023', subject: SUBJECTS.PHYSICS },
  { id: 'phys-jun-2022', label: 'June 2022', subject: SUBJECTS.PHYSICS },
  { id: 'phys-jun-2019', label: 'June 2019', subject: SUBJECTS.PHYSICS },
  { id: 'phys-jun-2018', label: 'June 2018', subject: SUBJECTS.PHYSICS },
  { id: 'phys-jun-2017', label: 'June 2017', subject: SUBJECTS.PHYSICS },
  { id: 'phys-jun-2016', label: 'June 2016', subject: SUBJECTS.PHYSICS },
]

const A1_EXAMS = [
  { id: 'a1-jun-2025', label: 'June 2025', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-jun-2024', label: 'June 2024', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-jun-2023', label: 'June 2023', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-jun-2022', label: 'June 2022', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-jun-2021', label: 'June 2021', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-jun-2019', label: 'June 2019', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-jan-2026', label: 'January 2026', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-jan-2025', label: 'January 2025', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-jan-2024', label: 'January 2024', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-jan-2023', label: 'January 2023', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-jan-2020', label: 'January 2020', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-aug-2025', label: 'August 2025', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-aug-2024', label: 'August 2024', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-aug-2023', label: 'August 2023', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-aug-2022', label: 'August 2022', subject: SUBJECTS.ALGEBRA_1 },
  { id: 'a1-aug-2019', label: 'August 2019', subject: SUBJECTS.ALGEBRA_1 },
]

const A2_EXAMS = [
  { id: 'a2-jun-2025', label: 'June 2025', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-jun-2024', label: 'June 2024', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-jun-2023', label: 'June 2023', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-jun-2022', label: 'June 2022', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-jun-2019', label: 'June 2019', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-jan-2026', label: 'January 2026', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-jan-2025', label: 'January 2025', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-jan-2024', label: 'January 2024', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-jan-2023', label: 'January 2023', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-jan-2020', label: 'January 2020', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-aug-2025', label: 'August 2025', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-aug-2024', label: 'August 2024', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-aug-2023', label: 'August 2023', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-aug-2022', label: 'August 2022', subject: SUBJECTS.ALGEBRA_2 },
  { id: 'a2-aug-2019', label: 'August 2019', subject: SUBJECTS.ALGEBRA_2 },
]

const GEO_EXAMS = [
  { id: 'geo-jun-2025', label: 'June 2025', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-jun-2024', label: 'June 2024', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-jun-2023', label: 'June 2023', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-jun-2022', label: 'June 2022', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-jun-2019', label: 'June 2019', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-jan-2026', label: 'January 2026', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-jan-2025', label: 'January 2025', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-jan-2024', label: 'January 2024', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-jan-2023', label: 'January 2023', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-jan-2020', label: 'January 2020', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-aug-2025', label: 'August 2025', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-aug-2024', label: 'August 2024', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-aug-2023', label: 'August 2023', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-aug-2022', label: 'August 2022', subject: SUBJECTS.GEOMETRY },
  { id: 'geo-aug-2019', label: 'August 2019', subject: SUBJECTS.GEOMETRY },
]

const LS_EXAMS = [
  { id: 'ls-jun-2025', label: 'June 2025',    subject: SUBJECTS.LIFE_SCIENCE, questionCount: 48 },
  { id: 'ls-jan-2026', label: 'January 2026', subject: SUBJECTS.LIFE_SCIENCE, questionCount: 45 },
  { id: 'ls-aug-2025', label: 'August 2025',  subject: SUBJECTS.LIFE_SCIENCE, questionCount: 45 },
]

const ENG_EXAMS = [
  { id: 'eng-jan-2026', label: 'January 2026', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jun-2025', label: 'June 2025', subject: SUBJECTS.ENGLISH },
  { id: 'eng-aug-2025', label: 'August 2025', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jan-2025', label: 'January 2025', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jun-2024', label: 'June 2024', subject: SUBJECTS.ENGLISH },
  { id: 'eng-aug-2024', label: 'August 2024', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jan-2024', label: 'January 2024', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jun-2023', label: 'June 2023', subject: SUBJECTS.ENGLISH },
  { id: 'eng-aug-2023', label: 'August 2023', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jan-2023', label: 'January 2023', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jun-2022', label: 'June 2022', subject: SUBJECTS.ENGLISH },
  { id: 'eng-aug-2022', label: 'August 2022', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jun-2021', label: 'June 2021', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jan-2020', label: 'January 2020', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jun-2019', label: 'June 2019', subject: SUBJECTS.ENGLISH },
  { id: 'eng-aug-2019', label: 'August 2019', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jan-2019', label: 'January 2019', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jun-2018', label: 'June 2018', subject: SUBJECTS.ENGLISH },
  { id: 'eng-aug-2018', label: 'August 2018', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jan-2018', label: 'January 2018', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jun-2017', label: 'June 2017', subject: SUBJECTS.ENGLISH },
  { id: 'eng-aug-2017', label: 'August 2017', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jan-2017', label: 'January 2017', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jun-2016', label: 'June 2016', subject: SUBJECTS.ENGLISH },
  { id: 'eng-aug-2016', label: 'August 2016', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jan-2016', label: 'January 2016', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jun-2015', label: 'June 2015', subject: SUBJECTS.ENGLISH },
  { id: 'eng-aug-2015', label: 'August 2015', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jan-2015', label: 'January 2015', subject: SUBJECTS.ENGLISH },
  { id: 'eng-jun-2014', label: 'June 2014', subject: SUBJECTS.ENGLISH },
  { id: 'eng-aug-2014', label: 'August 2014', subject: SUBJECTS.ENGLISH },
]

const GH_EXAMS = [
  { id: 'gh-jan-2026', label: 'January 2026', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-jun-2025', label: 'June 2025', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-aug-2025', label: 'August 2025', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-jan-2025', label: 'January 2025', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-jun-2024', label: 'June 2024', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-aug-2024', label: 'August 2024', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-jan-2024', label: 'January 2024', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-jun-2023', label: 'June 2023', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-aug-2023', label: 'August 2023', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-jan-2023', label: 'January 2023', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-jun-2022', label: 'June 2022', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-aug-2022', label: 'August 2022', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-jan-2020', label: 'January 2020', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-jun-2019', label: 'June 2019', subject: SUBJECTS.GLOBAL_HISTORY },
  { id: 'gh-aug-2019', label: 'August 2019', subject: SUBJECTS.GLOBAL_HISTORY },
]

const USH_EXAMS = [
  { id: 'ush-jan-2026', label: 'January 2026', subject: SUBJECTS.US_HISTORY },
  { id: 'ush-jun-2025', label: 'June 2025', subject: SUBJECTS.US_HISTORY },
  { id: 'ush-aug-2025', label: 'August 2025', subject: SUBJECTS.US_HISTORY },
  { id: 'ush-jan-2025', label: 'January 2025', subject: SUBJECTS.US_HISTORY },
  { id: 'ush-jun-2024', label: 'June 2024', subject: SUBJECTS.US_HISTORY },
  { id: 'ush-aug-2024', label: 'August 2024', subject: SUBJECTS.US_HISTORY },
  { id: 'ush-jan-2024', label: 'January 2024', subject: SUBJECTS.US_HISTORY },
  { id: 'ush-jun-2023', label: 'June 2023', subject: SUBJECTS.US_HISTORY },
  { id: 'ush-aug-2023', label: 'August 2023', subject: SUBJECTS.US_HISTORY },
]

// Map exam IDs to their data files
const EXAM_DATA_MAP = {
  'le-jun-2025': () => require('../content/regents-exams/living-environment/june-2025'),
  'le-jun-2024': () => require('../content/regents-exams/living-environment/june-2024'),
  'le-jun-2023': () => require('../content/regents-exams/living-environment/june-2023'),
  'le-jun-2022': () => require('../content/regents-exams/living-environment/june-2022'),
  'le-jun-2021': () => require('../content/regents-exams/living-environment/june-2021'),
  'le-jun-2019': () => require('../content/regents-exams/living-environment/june-2019'),
  'le-jun-2018': () => require('../content/regents-exams/living-environment/june-2018'),
  'le-jun-2017': () => require('../content/regents-exams/living-environment/june-2017'),
  'le-jun-2016': () => require('../content/regents-exams/living-environment/june-2016'),
  'le-jan-2026': () => require('../content/regents-exams/living-environment/january-2026'),
  'le-jan-2025': () => require('../content/regents-exams/living-environment/january-2025'),
  'le-jan-2024': () => require('../content/regents-exams/living-environment/january-2024'),
  'le-jan-2023': () => require('../content/regents-exams/living-environment/january-2023'),
  'le-jan-2020': () => require('../content/regents-exams/living-environment/january-2020'),
  'le-jan-2018': () => require('../content/regents-exams/living-environment/january-2018'),
  'le-jan-2017': () => require('../content/regents-exams/living-environment/january-2017'),
  'le-jan-2016': () => require('../content/regents-exams/living-environment/january-2016'),
  'le-aug-2025': () => require('../content/regents-exams/living-environment/august-2025'),
  'le-aug-2024': () => require('../content/regents-exams/living-environment/august-2024'),
  'le-aug-2023': () => require('../content/regents-exams/living-environment/august-2023'),
  'le-aug-2022': () => require('../content/regents-exams/living-environment/august-2022'),
  'le-aug-2021': () => require('../content/regents-exams/living-environment/august-2021'),
  'le-aug-2019': () => require('../content/regents-exams/living-environment/august-2019'),
  'le-aug-2018': () => require('../content/regents-exams/living-environment/august-2018'),
  'le-aug-2017': () => require('../content/regents-exams/living-environment/august-2017'),
  'le-aug-2016': () => require('../content/regents-exams/living-environment/august-2016'),
  'es-jun-2025': () => require('../content/regents-exams/earth-science/june-2025'),
  'es-jun-2024': () => require('../content/regents-exams/earth-science/june-2024'),
  'es-jun-2023': () => require('../content/regents-exams/earth-science/june-2023'),
  'es-jun-2022': () => require('../content/regents-exams/earth-science/june-2022'),
  'es-jun-2021': () => require('../content/regents-exams/earth-science/june-2021'),
  'es-jun-2019': () => require('../content/regents-exams/earth-science/june-2019'),
  'es-jun-2018': () => require('../content/regents-exams/earth-science/june-2018'),
  'es-jan-2026': () => require('../content/regents-exams/earth-science/january-2026'),
  'es-jan-2025': () => require('../content/regents-exams/earth-science/january-2025'),
  'es-jan-2024': () => require('../content/regents-exams/earth-science/january-2024'),
  'es-jan-2023': () => require('../content/regents-exams/earth-science/january-2023'),
  'es-jan-2020': () => require('../content/regents-exams/earth-science/january-2020'),
  'es-aug-2025': () => require('../content/regents-exams/earth-science/august-2025'),
  'es-aug-2024': () => require('../content/regents-exams/earth-science/august-2024'),
  'es-aug-2023': () => require('../content/regents-exams/earth-science/august-2023'),
  'es-aug-2022': () => require('../content/regents-exams/earth-science/august-2022'),
  'es-aug-2021': () => require('../content/regents-exams/earth-science/august-2021'),
  'es-aug-2019': () => require('../content/regents-exams/earth-science/august-2019'),
  'es-aug-2018': () => require('../content/regents-exams/earth-science/august-2018'),
  'chem-jun-2025': () => require('../content/regents-exams/chemistry/june-2025'),
  'chem-jun-2024': () => require('../content/regents-exams/chemistry/june-2024'),
  'chem-jun-2023': () => require('../content/regents-exams/chemistry/june-2023'),
  'chem-jun-2022': () => require('../content/regents-exams/chemistry/june-2022'),
  'chem-jun-2019': () => require('../content/regents-exams/chemistry/june-2019'),
  'chem-jun-2018': () => require('../content/regents-exams/chemistry/june-2018'),
  'chem-jun-2017': () => require('../content/regents-exams/chemistry/june-2017'),
  'chem-jun-2016': () => require('../content/regents-exams/chemistry/june-2016'),
  'chem-jan-2026': () => require('../content/regents-exams/chemistry/january-2026'),
  'chem-jan-2025': () => require('../content/regents-exams/chemistry/january-2025'),
  'chem-jan-2024': () => require('../content/regents-exams/chemistry/january-2024'),
  'chem-jan-2023': () => require('../content/regents-exams/chemistry/january-2023'),
  'chem-jan-2020': () => require('../content/regents-exams/chemistry/january-2020'),
  'chem-jan-2018': () => require('../content/regents-exams/chemistry/january-2018'),
  'chem-jan-2017': () => require('../content/regents-exams/chemistry/january-2017'),
  'chem-aug-2025': () => require('../content/regents-exams/chemistry/august-2025'),
  'chem-aug-2024': () => require('../content/regents-exams/chemistry/august-2024'),
  'chem-aug-2023': () => require('../content/regents-exams/chemistry/august-2023'),
  'chem-aug-2022': () => require('../content/regents-exams/chemistry/august-2022'),
  'chem-aug-2019': () => require('../content/regents-exams/chemistry/august-2019'),
  'chem-aug-2018': () => require('../content/regents-exams/chemistry/august-2018'),
  'chem-aug-2017': () => require('../content/regents-exams/chemistry/august-2017'),
  'chem-aug-2016': () => require('../content/regents-exams/chemistry/august-2016'),
  'phys-jun-2025': () => require('../content/regents-exams/physics/june-2025'),
  'phys-jun-2024': () => require('../content/regents-exams/physics/june-2024'),
  'phys-jun-2023': () => require('../content/regents-exams/physics/june-2023'),
  'phys-jun-2022': () => require('../content/regents-exams/physics/june-2022'),
  'phys-jun-2019': () => require('../content/regents-exams/physics/june-2019'),
  'phys-jun-2018': () => require('../content/regents-exams/physics/june-2018'),
  'phys-jun-2017': () => require('../content/regents-exams/physics/june-2017'),
  'phys-jun-2016': () => require('../content/regents-exams/physics/june-2016'),
  'a1-jun-2025': () => require('../content/regents-exams/algebra-1/june-2025'),
  'a1-jun-2024': () => require('../content/regents-exams/algebra-1/june-2024'),
  'a1-jun-2023': () => require('../content/regents-exams/algebra-1/june-2023'),
  'a1-jun-2022': () => require('../content/regents-exams/algebra-1/june-2022'),
  'a1-jun-2021': () => require('../content/regents-exams/algebra-1/june-2021'),
  'a1-jun-2019': () => require('../content/regents-exams/algebra-1/june-2019'),
  'a1-jan-2026': () => require('../content/regents-exams/algebra-1/january-2026'),
  'a1-jan-2025': () => require('../content/regents-exams/algebra-1/january-2025'),
  'a1-jan-2024': () => require('../content/regents-exams/algebra-1/january-2024'),
  'a1-jan-2023': () => require('../content/regents-exams/algebra-1/january-2023'),
  'a1-jan-2020': () => require('../content/regents-exams/algebra-1/january-2020'),
  'a1-aug-2025': () => require('../content/regents-exams/algebra-1/august-2025'),
  'a1-aug-2024': () => require('../content/regents-exams/algebra-1/august-2024'),
  'a1-aug-2023': () => require('../content/regents-exams/algebra-1/august-2023'),
  'a1-aug-2022': () => require('../content/regents-exams/algebra-1/august-2022'),
  'a1-aug-2019': () => require('../content/regents-exams/algebra-1/august-2019'),
  'a2-jun-2025': () => require('../content/regents-exams/algebra-2/june-2025'),
  'a2-jun-2024': () => require('../content/regents-exams/algebra-2/june-2024'),
  'a2-jun-2023': () => require('../content/regents-exams/algebra-2/june-2023'),
  'a2-jun-2022': () => require('../content/regents-exams/algebra-2/june-2022'),
  'a2-jun-2019': () => require('../content/regents-exams/algebra-2/june-2019'),
  'a2-jan-2026': () => require('../content/regents-exams/algebra-2/january-2026'),
  'a2-jan-2025': () => require('../content/regents-exams/algebra-2/january-2025'),
  'a2-jan-2024': () => require('../content/regents-exams/algebra-2/january-2024'),
  'a2-jan-2023': () => require('../content/regents-exams/algebra-2/january-2023'),
  'a2-jan-2020': () => require('../content/regents-exams/algebra-2/january-2020'),
  'a2-aug-2025': () => require('../content/regents-exams/algebra-2/august-2025'),
  'a2-aug-2024': () => require('../content/regents-exams/algebra-2/august-2024'),
  'a2-aug-2023': () => require('../content/regents-exams/algebra-2/august-2023'),
  'a2-aug-2022': () => require('../content/regents-exams/algebra-2/august-2022'),
  'a2-aug-2019': () => require('../content/regents-exams/algebra-2/august-2019'),
  'geo-jun-2025': () => require('../content/regents-exams/geometry/june-2025'),
  'geo-jun-2024': () => require('../content/regents-exams/geometry/june-2024'),
  'geo-jun-2023': () => require('../content/regents-exams/geometry/june-2023'),
  'geo-jun-2022': () => require('../content/regents-exams/geometry/june-2022'),
  'geo-jun-2019': () => require('../content/regents-exams/geometry/june-2019'),
  'geo-jan-2026': () => require('../content/regents-exams/geometry/january-2026'),
  'geo-jan-2025': () => require('../content/regents-exams/geometry/january-2025'),
  'geo-jan-2024': () => require('../content/regents-exams/geometry/january-2024'),
  'geo-jan-2023': () => require('../content/regents-exams/geometry/january-2023'),
  'geo-jan-2020': () => require('../content/regents-exams/geometry/january-2020'),
  'geo-aug-2025': () => require('../content/regents-exams/geometry/august-2025'),
  'geo-aug-2024': () => require('../content/regents-exams/geometry/august-2024'),
  'geo-aug-2023': () => require('../content/regents-exams/geometry/august-2023'),
  'geo-aug-2022': () => require('../content/regents-exams/geometry/august-2022'),
  'geo-aug-2019': () => require('../content/regents-exams/geometry/august-2019'),
  'ls-jan-2026':  () => require('../content/regents-exams/life-science/january-2026'),
  'ls-jun-2025':  () => require('../content/regents-exams/life-science/june-2025'),
  'ls-aug-2025':  () => require('../content/regents-exams/life-science/august-2025'),

  // English
  'eng-jan-2026': () => require('../content/regents-exams/english/january-2026'),
  'eng-jun-2025': () => require('../content/regents-exams/english/june-2025'),
  'eng-aug-2025': () => require('../content/regents-exams/english/august-2025'),
  'eng-jan-2025': () => require('../content/regents-exams/english/january-2025'),
  'eng-jun-2024': () => require('../content/regents-exams/english/june-2024'),
  'eng-aug-2024': () => require('../content/regents-exams/english/august-2024'),
  'eng-jan-2024': () => require('../content/regents-exams/english/january-2024'),
  'eng-jun-2023': () => require('../content/regents-exams/english/june-2023'),
  'eng-aug-2023': () => require('../content/regents-exams/english/august-2023'),
  'eng-jan-2023': () => require('../content/regents-exams/english/january-2023'),
  'eng-jun-2022': () => require('../content/regents-exams/english/june-2022'),
  'eng-aug-2022': () => require('../content/regents-exams/english/august-2022'),
  'eng-jun-2021': () => require('../content/regents-exams/english/june-2021'),
  'eng-jan-2020': () => require('../content/regents-exams/english/january-2020'),
  'eng-jun-2019': () => require('../content/regents-exams/english/june-2019'),
  'eng-aug-2019': () => require('../content/regents-exams/english/august-2019'),
  'eng-jan-2019': () => require('../content/regents-exams/english/january-2019'),
  'eng-jun-2018': () => require('../content/regents-exams/english/june-2018'),
  'eng-aug-2018': () => require('../content/regents-exams/english/august-2018'),
  'eng-jan-2018': () => require('../content/regents-exams/english/january-2018'),
  'eng-jun-2017': () => require('../content/regents-exams/english/june-2017'),
  'eng-aug-2017': () => require('../content/regents-exams/english/august-2017'),
  'eng-jan-2017': () => require('../content/regents-exams/english/january-2017'),
  'eng-jun-2016': () => require('../content/regents-exams/english/june-2016'),
  'eng-aug-2016': () => require('../content/regents-exams/english/august-2016'),
  'eng-jan-2016': () => require('../content/regents-exams/english/january-2016'),
  'eng-jun-2015': () => require('../content/regents-exams/english/june-2015'),
  'eng-aug-2015': () => require('../content/regents-exams/english/august-2015'),
  'eng-jan-2015': () => require('../content/regents-exams/english/january-2015'),
  'eng-jun-2014': () => require('../content/regents-exams/english/june-2014'),
  'eng-aug-2014': () => require('../content/regents-exams/english/august-2014'),

  // Global History
  'gh-jan-2026': () => require('../content/regents-exams/global-history/january-2026'),
  'gh-jun-2025': () => require('../content/regents-exams/global-history/june-2025'),
  'gh-aug-2025': () => require('../content/regents-exams/global-history/august-2025'),
  'gh-jan-2025': () => require('../content/regents-exams/global-history/january-2025'),
  'gh-jun-2024': () => require('../content/regents-exams/global-history/june-2024'),
  'gh-aug-2024': () => require('../content/regents-exams/global-history/august-2024'),
  'gh-jan-2024': () => require('../content/regents-exams/global-history/january-2024'),
  'gh-jun-2023': () => require('../content/regents-exams/global-history/june-2023'),
  'gh-aug-2023': () => require('../content/regents-exams/global-history/august-2023'),
  'gh-jan-2023': () => require('../content/regents-exams/global-history/january-2023'),
  'gh-jun-2022': () => require('../content/regents-exams/global-history/june-2022'),
  'gh-aug-2022': () => require('../content/regents-exams/global-history/august-2022'),
  'gh-jan-2020': () => require('../content/regents-exams/global-history/january-2020'),
  'gh-jun-2019': () => require('../content/regents-exams/global-history/june-2019'),
  'gh-aug-2019': () => require('../content/regents-exams/global-history/august-2019'),

  // US History
  'ush-jan-2026': () => require('../content/regents-exams/us-history/january-2026'),
  'ush-jun-2025': () => require('../content/regents-exams/us-history/june-2025'),
  'ush-aug-2025': () => require('../content/regents-exams/us-history/august-2025'),
  'ush-jan-2025': () => require('../content/regents-exams/us-history/january-2025'),
  'ush-jun-2024': () => require('../content/regents-exams/us-history/june-2024'),
  'ush-aug-2024': () => require('../content/regents-exams/us-history/august-2024'),
  'ush-jan-2024': () => require('../content/regents-exams/us-history/january-2024'),
  'ush-jun-2023': () => require('../content/regents-exams/us-history/june-2023'),
  'ush-aug-2023': () => require('../content/regents-exams/us-history/august-2023'),
}



export default function ExamPickerScreen({ navigation }) {
  const { C } = useTheme()
  const { subject } = useSubject()
  const { scores, refresh } = useExamScores()
  const s = makeStyles(C)

  useFocusEffect(React.useCallback(() => { refresh() }, []))

  const EXAMS_BY_SUBJECT = {
    [SUBJECTS.LIVING_ENVIRONMENT]: LE_EXAMS,
    [SUBJECTS.EARTH_SCIENCE]:      ES_EXAMS,
    [SUBJECTS.CHEMISTRY]:          CHEM_EXAMS,
    [SUBJECTS.PHYSICS]:            PHYS_EXAMS,
    [SUBJECTS.ALGEBRA_1]:          A1_EXAMS,
    [SUBJECTS.ALGEBRA_2]:          A2_EXAMS,
    [SUBJECTS.GEOMETRY]:           GEO_EXAMS,
    [SUBJECTS.LIFE_SCIENCE]:       LS_EXAMS,
    [SUBJECTS.ENGLISH]:            ENG_EXAMS,
    [SUBJECTS.GLOBAL_HISTORY]:     GH_EXAMS,
    [SUBJECTS.US_HISTORY]:         USH_EXAMS,
  }
  const exams = React.useMemo(() => {
    const rawList = EXAMS_BY_SUBJECT[subject] ?? LE_EXAMS
    const list = [...rawList]
    const sessionOrder = { 'August': 3, 'June': 2, 'January': 1 }
    list.sort((a, b) => {
      const partsA = (a.label || '').split(' ')
      const partsB = (b.label || '').split(' ')
      const sessionA = partsA[0] || ''
      const sessionB = partsB[0] || ''
      const yearA = parseInt(partsA[1]) || 0
      const yearB = parseInt(partsB[1]) || 0

      if (yearA !== yearB) return yearB - yearA
      const orderA = sessionOrder[sessionA] || 0
      const orderB = sessionOrder[sessionB] || 0
      return orderB - orderA
    })
    return list
  }, [subject])
  const meta  = SUBJECT_META[subject] ?? SUBJECT_META['living-environment']


  function openExam(exam) {
    try {
      const loader = EXAM_DATA_MAP[exam.id]
      if (!loader) { alert('Exam data not yet available.'); return }
      const data = loader()
      const questions = data.questions ?? data.QUESTIONS ?? data.default?.questions ?? []
      if (!questions.length) { alert('No questions found for this exam.'); return }
      navigation.navigate('Exam', { exam, questions, subject })
    } catch (e) {
      alert('Could not load exam: ' + e.message)
    }
  }

  // ── Quick Practice (relocated from Home) — build a session from the current
  // subject's question bank and run it in the Study tab's screens. ──
  const sd = getSubjectData(subject)
  const { mistakes, mistakeCount } = useMistakes()

  function runPractice(screen, params) {
    navigation.navigate('StudyTab', { screen, params })
  }
  function practiceQuiz() {
    const pool = sd.questions ?? []
    if (!pool.length) return
    runPractice('Quiz', { questionSet: shuffle(pool), topic: null, subject })
  }
  function practiceSpeed() {
    const pool = shuffle(sd.questions ?? []).slice(0, 30)
    if (!pool.length) return
    runPractice('SpeedRound', { questionSet: pool, subject })
  }
  function practiceFlashcards() {
    runPractice('Flashcards', { topic: null, subject })
  }
  function practiceMistakes() {
    if (!mistakeCount) {
      Alert.alert('No mistakes yet! 🎉', 'Complete some quizzes or exams first — wrong answers will appear here.')
      return
    }
    const forSubject = mistakes.filter((q) => (q.subject ?? 'living-environment') === subject)
    const pool = shuffle((forSubject.length ? forSubject : mistakes).slice(0, 50))
    runPractice('Quiz', { questionSet: pool, topic: null, subject, isMistakesPractice: true })
  }

  const PracticeHeader = (
    <View style={{ marginBottom: 8 }}>
      <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0, fontSize: 13, marginBottom: 10 }]}>Quick Practice</Text>
      <View style={s.practiceGrid}>
        <TouchableOpacity style={[s.practiceBtn, duoBtn(C.brand, C.brandDark)]} onPress={practiceQuiz} activeOpacity={0.85}>
          <Text style={s.practiceIcon}>⚡</Text>
          <Text style={[T.btn, { color: '#fff', fontSize: 11, textAlign: 'center' }]}>Quick{'\n'}Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.practiceBtn, duoBtn(C.blue, C.blueDark)]} onPress={practiceSpeed} activeOpacity={0.85}>
          <Text style={s.practiceIcon}>🏃</Text>
          <Text style={[T.btn, { color: '#fff', fontSize: 11, textAlign: 'center' }]}>Speed{'\n'}Round</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.practiceBtn, duoBtn(C.purple, C.purpleDark)]} onPress={practiceFlashcards} activeOpacity={0.85}>
          <Text style={s.practiceIcon}>🃏</Text>
          <Text style={[T.btn, { color: '#fff', fontSize: 11, textAlign: 'center' }]}>Flash{'\n'}Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.practiceBtn, duoBtn('#B45309', '#92400E')]} onPress={practiceMistakes} activeOpacity={0.85}>
          <Text style={s.practiceIcon}>📕</Text>
          <Text style={[T.btn, { color: '#fff', fontSize: 11, textAlign: 'center' }]}>Practice{'\n'}Mistakes</Text>
        </TouchableOpacity>
      </View>
      <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0, fontSize: 13, marginTop: 22 }]}>Past Exams</Text>
    </View>
  )

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <Text style={[T.h1, { color: C.text, padding: 20, paddingBottom: 16 }]}>Regents Exams</Text>

      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        contentContainerStyle={s.list}
        ListHeaderComponent={PracticeHeader}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={Platform.OS !== 'web'}
        renderItem={({ item }) => {
          const sc = scores[item.id]
          const passColor = sc?.best >= 65 ? C.correct : C.wrong
          return (
            <TouchableOpacity
              style={[s.examCard, cardShadow(C.shadow), { borderLeftColor: meta.color ?? C.brand }]}
              onPress={() => openExam(item)}
              activeOpacity={0.75}
            >
              <Text style={{ fontSize: 28, marginRight: 12 }}>📋</Text>
              <View style={{ flex: 1 }}>
                <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>
                  {meta.name}
                </Text>
                <Text style={[T.h3, { color: C.text, marginTop: 2 }]}>{item.label} Regents</Text>
                {sc && (
                  <View style={s.scoreRow}>
                    <Text style={[s.scoreChip, { color: passColor, borderColor: passColor + '50', backgroundColor: passColor + '12' }]}>
                      Best {sc.best}
                    </Text>
                    <Text style={[s.scoreChip, { color: C.textMuted, borderColor: C.border, backgroundColor: C.surface2 }]}>
                      Last {sc.last}
                    </Text>
                  </View>
                )}
              </View>
              <View style={{ alignItems: 'flex-end', gap: 6, marginLeft: 8 }}>
                <View style={[s.qChip, { backgroundColor: C.surface2 }]}>
                  <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>{item.questionCount ?? 50} Q</Text>
                </View>
                <Text style={[T.h3, { color: C.textMuted }]}>›</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:      { flex: 1, backgroundColor: C.bg },
    list:      { padding: 16, gap: 12 },

    practiceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    practiceBtn:  { flexBasis: '47%', flexGrow: 1, alignItems: 'center', paddingVertical: 14, gap: 4 },
    practiceIcon: { fontSize: 24, marginBottom: 2 },
    examCard:  { backgroundColor: C.surface, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: C.border, borderLeftWidth: 4 },
    scoreRow:  { flexDirection: 'row', gap: 6, marginTop: 6 },
    scoreChip: { fontSize: 11, fontWeight: '700', borderWidth: 1, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
    qChip:     { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  })
}
