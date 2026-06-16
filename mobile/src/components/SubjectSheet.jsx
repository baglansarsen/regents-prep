/**
 * SubjectSheet — bottom sheet opened from the GlobalTopBar subject pill.
 *
 * Combines two things the top bar couldn't show before:
 *   1. The active subject's Regents goal — predicted score vs committed target,
 *      points-to-go, and exam-date countdown (mirrors HomeScreen's goal card).
 *   2. A subject switcher — tapping a subject sets it and closes the sheet.
 *
 * Presentational: predicted/goal arrive as props (read from GoalContext by the
 * top bar), so no heavy hooks run here. Modeled on RewardsSheet's slide-up sheet.
 *
 * Props:
 *   visible    boolean
 *   onClose    () => void
 *   subject    active subject id
 *   setSubject (id) => void
 *   goal       getGoal(subject) result | null  ({ target, examDateStr, predicted })
 *   predicted  number | null  (goal?.predicted?.value)
 */
import React from 'react'
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../context/ThemeContext'
import { SUBJECTS, SUBJECT_META } from '../content/subjects'
import { tierFor } from '../data/goalConfig'
import { daysUntil } from '../utils/examDates'
import GoalRing from './GoalRing'
import { T, duoBtn } from '../styles/duo'

export default function SubjectSheet({ visible, onClose, subject, setSubject, goal, predicted }) {
  const { C } = useTheme()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const s = makeStyles(C)

  const goalSet  = !!goal
  const target   = goal?.target ?? null
  const coldStart = predicted == null
  const daysLeft = goal?.examDateStr ? daysUntil(goal.examDateStr) : null
  const atGoal   = predicted != null && target != null && predicted >= target

  function go(routeName) {
    onClose?.()
    // Top bar lives at the TabNavigator root; goal routes are in the Study stack.
    navigation.navigate('StudyTab', { screen: routeName })
  }

  function chooseSubject(sub) {
    setSubject(sub)
    onClose?.()
  }

  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={onClose} />

      <View style={[s.sheet, { backgroundColor: C.bg, paddingBottom: insets.bottom + 20 }]}>
        <View style={s.handleWrap}><View style={[s.handle, { backgroundColor: C.surface3 }]} /></View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.body}>

          {/* ── Goal card (active subject) ── */}
          {goalSet ? (
            <TouchableOpacity
              style={[s.goalCard, { backgroundColor: C.surface, borderColor: C.border, borderLeftColor: C.warn ?? '#FFC800' }]}
              onPress={() => go('GoalDetail')}
              activeOpacity={0.85}
            >
              <GoalRing
                size={72}
                strokeWidth={7}
                progress={predicted != null ? Math.min(1, Math.max(0, (predicted - 50) / Math.max(1, target - 50))) : 0}
                color={atGoal ? C.correct : (C.warn ?? '#FFC800')}
                trackColor={C.surface2}
              >
                <Text style={[T.label, { color: C.text, textTransform: 'none', letterSpacing: 0, fontSize: 15 }]}>
                  {coldStart ? '—' : predicted}
                </Text>
              </GoalRing>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={[T.h3, { color: C.text }]}>🎯 Regents Goal</Text>
                <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
                  {coldStart
                    ? `Goal: ${target} ${tierFor(target).icon} · take a quiz to unlock your prediction`
                    : `${predicted} → ${target} ${tierFor(target).icon}`}
                </Text>
                {!coldStart && (
                  <Text style={[T.small, { color: atGoal ? C.correct : C.textMuted, marginTop: 3 }]}>
                    {atGoal ? '🎉 Predicted at your goal!' : `${target - predicted} points to go`}
                    {daysLeft != null ? ` · ${daysLeft} days left` : ''}
                  </Text>
                )}
              </View>
              <Text style={[T.label, { color: C.textDim }]}>{'VIEW\n›'}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[s.goalCard, { backgroundColor: C.surface, borderColor: C.border, borderLeftColor: C.brand }]}
              onPress={() => go('GoalSetup')}
              activeOpacity={0.85}
            >
              <Text style={{ fontSize: 34 }}>🎯</Text>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={[T.h3, { color: C.text }]}>Set your Regents goal</Text>
                <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
                  Commit to a score and watch your prediction climb
                </Text>
              </View>
              <Text style={[T.label, { color: C.textDim }]}>{'SET\n›'}</Text>
            </TouchableOpacity>
          )}

          {/* ── Subject switcher ── */}
          <Text style={[T.label, { color: C.textMuted, marginTop: 20, marginBottom: 8 }]}>Switch subject</Text>
          {Object.values(SUBJECTS).map((sub) => {
            const meta   = SUBJECT_META[sub]
            const active = subject === sub
            const color  = meta?.color ?? C.brand
            return (
              <TouchableOpacity
                key={sub}
                style={[s.subjectRow, { borderColor: C.border }, active && { backgroundColor: color + '14', borderColor: color + '55' }]}
                onPress={() => chooseSubject(sub)}
                activeOpacity={0.75}
              >
                <Text style={s.subjectIcon}>{meta.icon}</Text>
                <Text style={[T.body, { color: C.text, flex: 1 }, active && { color, fontFamily: 'Nunito_800ExtraBold' }]}>
                  {meta.name}
                </Text>
                {active && <Text style={[s.check, { color }]}>✓</Text>}
              </TouchableOpacity>
            )
          })}

        </ScrollView>
      </View>
    </Modal>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
    sheet: {
      borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '82%',
      ...(Platform.OS !== 'web' ? {
        shadowColor: '#000', shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: -4 }, shadowRadius: 16, elevation: 20,
      } : {}),
    },
    handleWrap: { alignItems: 'center', paddingTop: 10, paddingBottom: 4 },
    handle:     { width: 40, height: 4, borderRadius: 2 },
    body:       { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },

    goalCard: {
      flexDirection: 'row', alignItems: 'center',
      borderRadius: 18, borderWidth: 1, borderLeftWidth: 4,
      padding: 16,
    },

    subjectRow: {
      flexDirection: 'row', alignItems: 'center', gap: 12,
      paddingHorizontal: 14, paddingVertical: 13,
      borderRadius: 14, borderWidth: 1, marginBottom: 8,
    },
    subjectIcon: { fontSize: 20 },
    check:       { fontSize: 16, fontFamily: 'Nunito_800ExtraBold' },
  })
}
