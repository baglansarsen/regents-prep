import React, { useMemo } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useProgress } from '../hooks/useProgress'
import { useStudyPlan } from '../hooks/useStudyPlan'
import { subjectData } from '../content/subjectData'
import { SUBJECT_META } from '../content/subjects'
import { getExamLabel } from '../utils/examDates'
import { localDateStr } from '../utils/localDate'
import {
  describePlan, planProgressLine, catchUpHint, shortDate, PHASE_INFO, milestoneTitle,
} from '../utils/studyPlanCopy'
import { T, duoBtn, cardShadow } from '../styles/duo'

/**
 * My Plan — the whole study plan for the active subject: where the student is
 * in the timeline, this week's work, milestones and pace. Read-only; changes go
 * through goal setup. Design: docs/designs/exam-date-study-plan.md (§5, Phase 3).
 */
export default function MyPlanScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const { subject } = useSubject()
  const { history } = useProgress(user?.uid)
  const sd = subjectData(subject)
  const units = sd.UNITS ?? []
  const subjectHistory = useMemo(
    () => history.filter((h) => (h.subject ?? 'living-environment') === subject),
    [history, subject],
  )
  const { plan, goal } = useStudyPlan(subject, units, subjectHistory)
  const meta = SUBJECT_META[subject] ?? { name: 'Regents', icon: '🎓' }
  const s = makeStyles(C)
  const today = localDateStr()

  const header = (
    <View style={s.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn} accessibilityRole="button" accessibilityLabel="Back">
        <Text style={[T.body, { color: C.text }]}>← Back</Text>
      </TouchableOpacity>
      <Text style={[T.h2, { color: C.text }]} accessibilityRole="header">🗓️ My Plan</Text>
      <View style={{ width: 60 }} />
    </View>
  )

  if (!plan) {
    return (
      <SafeAreaView style={s.safe} edges={['bottom']}>
        {header}
        <View style={[s.card, cardShadow(C.shadow), { alignItems: 'center' }]}>
          <Text style={{ fontSize: 36 }}>🎯</Text>
          <Text style={[T.h3, { color: C.text, marginTop: 8, textAlign: 'center' }]}>
            {goal ? 'Pick your next exam date' : 'Set a goal to get your plan'}
          </Text>
          <Text style={[T.small, { color: C.textMuted, marginTop: 6, textAlign: 'center' }]}>
            Your plan is built from your exam date, your target and the time you can study.
          </Text>
          <TouchableOpacity style={duoBtn(C.brand, C.brandDark, { marginTop: 16, alignSelf: 'stretch' })} onPress={() => navigation.navigate('GoalSetup')} accessibilityRole="button">
            <Text style={[T.btn, { color: '#fff' }]}>{goal ? 'Pick a date' : 'Set my goal'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  const copy = describePlan(plan)
  const line = planProgressLine(plan, { committedAt: goal?.committedAt ?? null, today })
  const hint = catchUpHint(plan)
  const { thisWeek, pace } = plan

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {header}

        {/* Summary */}
        <View style={[s.card, cardShadow(C.shadow)]}>
          <Text style={[T.small, { color: C.textMuted }]}>
            {meta.icon} {meta.name} · goal {goal.target} · {getExamLabel(subject, plan.daysLeft, goal.examDateStr).replace('📅 ', '')}
          </Text>
          <Text style={[T.h3, { color: C.text, marginTop: 6 }]}>{copy.headline}</Text>
          <Text style={[T.small, { color: C.textMuted, marginTop: 4 }]}>{copy.detail}</Text>
          {line && <Text style={[T.body, { color: C.brand, marginTop: 8 }]}>{line}</Text>}
          {hint && <Text style={[T.small, { color: C.text, marginTop: 6 }]}>{hint}</Text>}
        </View>

        {/* Timeline */}
        <Text style={s.section} accessibilityRole="header">Timeline</Text>
        <View style={[s.card, cardShadow(C.shadow), { paddingVertical: 8 }]}>
          {plan.phases.map((p, i) => {
            const current = p.id === plan.phase
            const info = PHASE_INFO[p.id]
            return (
              <View
                key={p.id}
                style={[s.phaseRow, i > 0 && { borderTopWidth: 1, borderTopColor: C.border }]}
                accessible
                accessibilityLabel={`${info.title}${current ? ', now' : ''}, ${shortDate(p.start)} to ${shortDate(p.end)}. ${info.blurb}`}
              >
                <View style={[s.dot, { backgroundColor: current ? C.brand : C.border }]} />
                <View style={{ flex: 1 }}>
                  <Text style={[T.body, { color: current ? C.brand : C.text }]}>
                    {info.title}{current ? ' · now' : ''}
                  </Text>
                  <Text style={[T.small, { color: C.textMuted }]}>{shortDate(p.start)} – {shortDate(p.end)} · {info.blurb}</Text>
                </View>
              </View>
            )
          })}
          <View style={[s.phaseRow, { borderTopWidth: 1, borderTopColor: C.border }]} accessible accessibilityLabel={`Regents exam, ${shortDate(goal.examDateStr)}`}>
            <Text style={{ fontSize: 14, width: 18 }}>🎓</Text>
            <Text style={[T.body, { color: C.text, flex: 1 }]}>Regents exam · {shortDate(goal.examDateStr)}</Text>
          </View>
        </View>

        {/* This week */}
        <Text style={s.section} accessibilityRole="header">This week</Text>
        <View style={[s.card, cardShadow(C.shadow)]}>
          {thisWeek.units.map((u) => (
            <Text key={u.unitId} style={[T.body, s.item, { color: C.text }]}>📘 {u.title} · {u.lessons} {u.lessons === 1 ? 'lesson' : 'lessons'}</Text>
          ))}
          {thisWeek.weakUnits.map((u) => (
            <Text key={u.unitId} style={[T.body, s.item, { color: C.text }]}>🎯 Drill {u.title} (now {u.pct}%)</Text>
          ))}
          {thisWeek.practiceExam && <Text style={[T.body, s.item, { color: C.text }]}>📝 One practice exam</Text>}
          {thisWeek.reviews > 0 && <Text style={[T.body, s.item, { color: C.text }]}>🩹 Review {thisWeek.reviews} {thisWeek.reviews === 1 ? 'mistake' : 'mistakes'}</Text>}
          {!thisWeek.units.length && !thisWeek.weakUnits.length && !thisWeek.practiceExam && thisWeek.reviews === 0 && (
            <Text style={[T.body, { color: C.textMuted }]}>Nothing extra this week. Keep your daily sessions going.</Text>
          )}
          <Text style={[T.small, { color: C.textMuted, marginTop: 8 }]}>
            {pace.lessonsDone} of {pace.lessonsTotal} lessons done
            {pace.lessonsPerStudyDay > 0 ? ` · about ${pace.lessonsPerStudyDay} ${pace.lessonsPerStudyDay === 1 ? 'lesson' : 'lessons'} a study day` : ''}
          </Text>
        </View>

        {/* Milestones */}
        <Text style={s.section} accessibilityRole="header">Milestones</Text>
        <View style={[s.card, cardShadow(C.shadow), { paddingVertical: 6 }]}>
          {plan.milestones.map((m) => (
            <View key={m.id} style={s.milestone} accessible accessibilityLabel={`${milestoneTitle(m.id)}, ${shortDate(m.date)}, ${m.done ? 'done' : 'not done yet'}`}>
              <Text style={{ fontSize: 16, width: 24, color: m.done ? C.brand : C.textMuted }}>{m.done ? '✓' : '○'}</Text>
              <Text style={[T.body, { color: m.done ? C.textMuted : C.text, flex: 1 }]}>{milestoneTitle(m.id)}</Text>
              <Text style={[T.small, { color: C.textMuted }]}>{shortDate(m.date)}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={duoBtn(C.brand, C.brandDark, { marginHorizontal: 16, marginTop: 20 })}
          onPress={() => navigation.navigate('GoalSetup')}
          accessibilityRole="button"
        >
          <Text style={[T.btn, { color: '#fff' }]}>Change date, goal or study time</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:    { flex: 1, backgroundColor: C.bg },
    header:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
    backBtn: { paddingVertical: 6, paddingRight: 12, minHeight: 44, justifyContent: 'center' },
    card: {
      backgroundColor: C.surface, borderRadius: 18, borderWidth: 1, borderColor: C.border,
      marginHorizontal: 16, marginBottom: 6, padding: 16,
    },
    section: { ...T.label, color: C.textMuted, marginHorizontal: 16, marginTop: 14, marginBottom: 8 },
    phaseRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
    dot:     { width: 12, height: 12, borderRadius: 6, marginHorizontal: 3 },
    item:    { marginBottom: 6 },
    milestone: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  })
}
