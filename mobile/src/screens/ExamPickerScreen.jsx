import React from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useSubject } from '../context/SubjectContext'
import { SUBJECTS, SUBJECT_META } from '../../../src/data/subjects'
import { T, cardShadow } from '../styles/duo'

// Import exam registry dynamically
const LE_EXAMS = [
  { id: 'le-jun-2025', label: 'June 2025', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2024', label: 'August 2024', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2024', label: 'June 2024', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2023', label: 'August 2023', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2023', label: 'June 2023', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2022', label: 'August 2022', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2022', label: 'June 2022', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2021', label: 'August 2021', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2021', label: 'June 2021', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2019', label: 'August 2019', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2019', label: 'June 2019', subject: SUBJECTS.LIVING_ENVIRONMENT },
]

const ES_EXAMS = [
  { id: 'es-jun-2025', label: 'June 2025', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2024', label: 'August 2024', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2024', label: 'June 2024', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2023', label: 'August 2023', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2023', label: 'June 2023', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2022', label: 'August 2022', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2022', label: 'June 2022', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2021', label: 'August 2021', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2021', label: 'June 2021', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-aug-2019', label: 'August 2019', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2019', label: 'June 2019', subject: SUBJECTS.EARTH_SCIENCE },
]

const CHEM_EXAMS = [
  { id: 'chem-jun-2025', label: 'June 2025', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-aug-2024', label: 'August 2024', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jun-2024', label: 'June 2024', subject: SUBJECTS.CHEMISTRY },
  { id: 'chem-jun-2023', label: 'June 2023', subject: SUBJECTS.CHEMISTRY },
]

const PHYS_EXAMS = [
  { id: 'phys-jun-2025', label: 'June 2025', subject: SUBJECTS.PHYSICS },
  { id: 'phys-aug-2024', label: 'August 2024', subject: SUBJECTS.PHYSICS },
  { id: 'phys-jun-2024', label: 'June 2024', subject: SUBJECTS.PHYSICS },
  { id: 'phys-jun-2023', label: 'June 2023', subject: SUBJECTS.PHYSICS },
]

// Map exam IDs to their data files
const EXAM_DATA_MAP = {
  'le-jun-2025': () => require('../../../src/data/regents-exams/living-environment/june-2025'),
  'le-aug-2024': () => require('../../../src/data/regents-exams/living-environment/august-2024'),
  'le-jun-2024': () => require('../../../src/data/regents-exams/living-environment/june-2024'),
  'le-jun-2023': () => require('../../../src/data/regents-exams/living-environment/june-2023'),
  'le-aug-2023': () => require('../../../src/data/regents-exams/living-environment/august-2023'),
  'le-jun-2022': () => require('../../../src/data/regents-exams/living-environment/june-2022'),
  'le-aug-2022': () => require('../../../src/data/regents-exams/living-environment/august-2022'),
  'le-jun-2021': () => require('../../../src/data/regents-exams/living-environment/june-2021'),
  'le-aug-2021': () => require('../../../src/data/regents-exams/living-environment/august-2021'),
  'le-aug-2019': () => require('../../../src/data/regents-exams/living-environment/august-2019'),
  'le-jun-2019': () => require('../../../src/data/regents-exams/living-environment/june-2019'),
  'es-jun-2025': () => require('../../../src/data/regents-exams/earth-science/june-2025'),
  'es-aug-2024': () => require('../../../src/data/regents-exams/earth-science/august-2024'),
  'es-jun-2024': () => require('../../../src/data/regents-exams/earth-science/june-2024'),
  'es-aug-2023': () => require('../../../src/data/regents-exams/earth-science/august-2023'),
  'es-jun-2023': () => require('../../../src/data/regents-exams/earth-science/june-2023'),
  'es-aug-2022': () => require('../../../src/data/regents-exams/earth-science/august-2022'),
  'es-jun-2022': () => require('../../../src/data/regents-exams/earth-science/june-2022'),
  'es-jun-2021': () => require('../../../src/data/regents-exams/earth-science/june-2021'),
  'es-aug-2021': () => require('../../../src/data/regents-exams/earth-science/august-2021'),
  'es-aug-2019': () => require('../../../src/data/regents-exams/earth-science/august-2019'),
  'es-jun-2019': () => require('../../../src/data/regents-exams/earth-science/june-2019'),
  'chem-jun-2025': () => require('../../../src/data/regents-exams/chemistry/june-2025'),
  'chem-aug-2024': () => require('../../../src/data/regents-exams/chemistry/august-2024'),
  'chem-jun-2024': () => require('../../../src/data/regents-exams/chemistry/june-2024'),
  'chem-jun-2023': () => require('../../../src/data/regents-exams/chemistry/june-2023'),
  'phys-jun-2025': () => require('../../../src/data/regents-exams/physics/june-2025'),
  'phys-aug-2024': () => require('../../../src/data/regents-exams/physics/august-2024'),
  'phys-jun-2024': () => require('../../../src/data/regents-exams/physics/june-2024'),
  'phys-jun-2023': () => require('../../../src/data/regents-exams/physics/june-2023'),
}

export default function ExamPickerScreen({ navigation }) {
  const { C } = useTheme()
  const { subject } = useSubject()
  const s = makeStyles(C)

  const exams = subject === SUBJECTS.EARTH_SCIENCE
    ? ES_EXAMS
    : (subject === SUBJECTS.LIVING_ENVIRONMENT 
       ? LE_EXAMS 
       : (subject === SUBJECTS.CHEMISTRY ? CHEM_EXAMS : PHYS_EXAMS))
  const meta  = SUBJECT_META[subject]

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

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <Text style={[T.h1, { color: C.text, padding: 20, paddingBottom: 16 }]}>Regents Exams</Text>

      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
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
            </View>
            <View style={s.examRight}>
              <View style={[s.qChip, { backgroundColor: C.surface2 }]}>
                <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>50 Q</Text>
              </View>
              <Text style={[T.h3, { color: C.textMuted }]}>›</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:      { flex: 1, backgroundColor: C.bg },
    list:      { padding: 16, gap: 12 },
    examCard:  { backgroundColor: C.surface, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: C.border, borderLeftWidth: 4 },
    examRight: { flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 8 },
    qChip:     { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
  })
}
