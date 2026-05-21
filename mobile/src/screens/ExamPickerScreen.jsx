import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { SUBJECTS, SUBJECT_META } from '../../../src/data/subjects'

// Import exam registry dynamically
const LE_EXAMS = [
  { id: 'le-jun-2025', label: 'June 2025', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2024', label: 'August 2024', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2024', label: 'June 2024', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2023', label: 'June 2023', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2023', label: 'August 2023', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-jun-2022', label: 'June 2022', subject: SUBJECTS.LIVING_ENVIRONMENT },
  { id: 'le-aug-2022', label: 'August 2022', subject: SUBJECTS.LIVING_ENVIRONMENT },
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
  { id: 'es-aug-2019', label: 'August 2019', subject: SUBJECTS.EARTH_SCIENCE },
  { id: 'es-jun-2019', label: 'June 2019', subject: SUBJECTS.EARTH_SCIENCE },
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
  'le-jun-2019': () => require('../../../src/data/regents-exams/living-environment/june-2019'),
  'es-jun-2025': () => require('../../../src/data/regents-exams/earth-science/june-2025'),
  'es-aug-2024': () => require('../../../src/data/regents-exams/earth-science/august-2024'),
  'es-jun-2024': () => require('../../../src/data/regents-exams/earth-science/june-2024'),
  'es-aug-2023': () => require('../../../src/data/regents-exams/earth-science/august-2023'),
  'es-jun-2023': () => require('../../../src/data/regents-exams/earth-science/june-2023'),
  'es-aug-2022': () => require('../../../src/data/regents-exams/earth-science/august-2022'),
  'es-jun-2022': () => require('../../../src/data/regents-exams/earth-science/june-2022'),
  'es-aug-2019': () => require('../../../src/data/regents-exams/earth-science/august-2019'),
  'es-jun-2019': () => require('../../../src/data/regents-exams/earth-science/june-2019'),
}

export default function ExamPickerScreen({ navigation }) {
  const { C } = useTheme()
  const [subject, setSubject] = useState(SUBJECTS.LIVING_ENVIRONMENT)
  const s = makeStyles(C)

  const exams = subject === SUBJECTS.EARTH_SCIENCE ? ES_EXAMS : LE_EXAMS
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
    <SafeAreaView style={s.safe} edges={['top']}>
      <Text style={s.title}>Regents Exams</Text>

      {/* Subject switcher */}
      <View style={s.subjectRow}>
        {Object.values(SUBJECTS).map((sub) => {
          const m = SUBJECT_META[sub]
          return (
            <TouchableOpacity
              key={sub}
              style={[s.subjectBtn, subject === sub && { backgroundColor: m.color ?? C.brand, borderColor: m.color ?? C.brand }]}
              onPress={() => setSubject(sub)}
            >
              <Text style={s.subjectText}>{m.icon} {m.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        contentContainerStyle={s.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.examCard} onPress={() => openExam(item)}>
            <View>
              <Text style={s.examLabel}>{meta.name}</Text>
              <Text style={s.examDate}>{item.label} Regents</Text>
            </View>
            <View style={s.examRight}>
              <Text style={s.examQCount}>50 Q</Text>
              <Text style={s.examArrow}>→</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:        { flex: 1, backgroundColor: C.bg },
    title:       { fontSize: 26, fontWeight: '900', color: C.text, padding: 20, paddingBottom: 12 },
    subjectRow:  { flexDirection: 'row', marginHorizontal: 16, marginBottom: 16, gap: 10 },
    subjectBtn:  { flex: 1, paddingVertical: 8, borderRadius: 20, alignItems: 'center', backgroundColor: C.surface, borderWidth: 1.5, borderColor: C.border },
    subjectText: { fontSize: 12, fontWeight: '700', color: '#fff' },
    list:        { padding: 16, gap: 12 },
    examCard:    { backgroundColor: C.surface, borderRadius: 14, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: C.border },
    examLabel:   { fontSize: 12, color: C.textMuted, fontWeight: '600' },
    examDate:    { fontSize: 17, fontWeight: '800', color: C.text, marginTop: 2 },
    examRight:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
    examQCount:  { fontSize: 13, color: C.textMuted, backgroundColor: C.surface2, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
    examArrow:   { fontSize: 18, color: C.textMuted },
  })
}
