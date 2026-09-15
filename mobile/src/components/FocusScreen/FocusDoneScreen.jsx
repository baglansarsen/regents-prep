/**
 * FocusDoneScreen — the done-phase container for FocusScreen.
 *
 * First named sub-component under components/FocusScreen/ (FOCUS-03). Now
 * composes three extracted widgets — SessionSummaryStats, DoneActions, and
 * GoalCelebrationModal (02-03-PLAN.md) — instead of inlining their JSX. The
 * container still owns the close control, the scroll wrapper, the done
 * emoji, and the subject badge, and still computes the displayed minute
 * total and done/total task counts (that computation stayed where the
 * screen always did it — moving it would be a behavior-location change,
 * not a structural one). Pure presentation: all mutation happens via the
 * callback props supplied by useFocusScreenState.
 */
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import StudyBuddyCompanion from '../StudyBuddyCompanion'
import SessionSummaryStats from './SessionSummaryStats'
import DoneActions from './DoneActions'
import GoalCelebrationModal from './GoalCelebrationModal'
import { T } from '../../styles/duo'

export default function FocusDoneScreen({
  subject,
  pomodoroCount,
  preset,
  partialMinutes,
  sessionRP,
  todos,
  pet,
  buddyMessage,
  sessionGoal,
  goalCelebModal,
  reset,
  openHistory,
  goBack,
  dismissGoalCeleb,
}) {
  const { C } = useTheme()
  const s = makeStyles(C)

  const doneTodos  = todos.filter((t) => t.done).length
  const totalTodos = todos.length
  const displayMin = pomodoroCount * preset.study + partialMinutes

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <TouchableOpacity
        style={[s.closeBtn, { alignSelf: 'flex-end', margin: 16, backgroundColor: C.surface2 }]}
        onPress={goBack}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={[s.closeBtnText, { color: C.textMuted }]}>✕</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={s.doneScroll} showsVerticalScrollIndicator={false}>
        <Text style={s.doneEmoji}>🎉</Text>
        <Text style={[T.h1, { color: C.text, textAlign: 'center' }]}>Great session!</Text>

        {subject ? (
          <View style={[s.subjectBadge, { backgroundColor: C.brand + '18', borderColor: C.brand + '40' }]}>
            <Text style={[s.subjectBadgeText, { color: C.brand }]}>{subject}</Text>
          </View>
        ) : null}

        <SessionSummaryStats
          displayMin={displayMin}
          pomodoroCount={pomodoroCount}
          partialMinutes={partialMinutes}
          sessionRP={sessionRP}
          doneTaskCount={doneTodos}
          totalTaskCount={totalTodos}
        />

        <DoneActions onNewSession={reset} onViewHistory={openHistory} />
      </ScrollView>

      {pet?.chosen && (
        <StudyBuddyCompanion
          petType={pet.petType}
          petName={pet.name}
          accessories={pet.accessories ?? []}
          message={buddyMessage}
        />
      )}

      <GoalCelebrationModal
        visible={goalCelebModal}
        sessionGoal={sessionGoal}
        petName={pet?.name}
        onDismiss={dismissGoalCeleb}
      />
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:      { flex: 1, backgroundColor: C.bg },
    closeBtn:      { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    closeBtnText:  { fontSize: 16, fontWeight: '700' },

    subjectBadge: {
      alignSelf:         'center',
      borderRadius:      20,
      paddingHorizontal: 16,
      paddingVertical:   6,
      borderWidth:       1,
      marginTop:         8,
    },
    subjectBadgeText: { fontSize: 14, fontWeight: '700' },

    doneScroll:  { alignItems: 'center', paddingHorizontal: 28, paddingTop: 40, gap: 14 },
    doneEmoji:   { fontSize: 64 },
  })
}
