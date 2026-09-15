/**
 * FocusDoneScreen — the done-phase container for FocusScreen.
 *
 * First named sub-component under components/FocusScreen/ (FOCUS-03). Renders
 * the JSX that used to be FocusScreen.jsx's inline "done" branch, unchanged —
 * every copy string, style key, and numeric value carried over verbatim
 * (UI-SPEC parity lock). Pure presentation: all mutation happens via the
 * callback props supplied by useFocusScreenState.
 */
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import StudyBuddyCompanion from '../StudyBuddyCompanion'
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

        <View style={s.doneSummary}>
          <View style={[s.doneStat, { backgroundColor: C.surface2 }]}>
            <Text style={s.doneStatEmoji}>⏱</Text>
            <Text style={[s.doneStatVal, { color: C.text }]}>{displayMin} min</Text>
          </View>
          {pomodoroCount > 0 && (
            <View style={[s.doneStat, { backgroundColor: C.surface2 }]}>
              <Text style={s.doneStatEmoji}>🍅</Text>
              <Text style={[s.doneStatVal, { color: C.text }]}>×{pomodoroCount}</Text>
              {partialMinutes > 0 && (
                <Text style={[s.doneStatSub, { color: C.textMuted }]}>+{partialMinutes}m</Text>
              )}
            </View>
          )}
          {pomodoroCount === 0 && partialMinutes > 0 && (
            <View style={[s.doneStat, { backgroundColor: C.warnBg }]}>
              <Text style={s.doneStatEmoji}>⏳</Text>
              <Text style={[s.doneStatVal, { color: C.warn }]}>{partialMinutes}m</Text>
              <Text style={[s.doneStatSub, { color: C.warn }]}>partial</Text>
            </View>
          )}
          <View style={[s.doneStat, { backgroundColor: C.warnBg }]}>
            <Text style={s.doneStatEmoji}>⭐</Text>
            <Text style={[s.doneStatVal, { color: C.warn }]}>+{sessionRP}</Text>
          </View>
        </View>

        {totalTodos > 0 && (
          <Text style={[T.small, { color: C.textMuted, marginTop: 4 }]}>
            ✓ {doneTodos} / {totalTodos} tasks done
          </Text>
        )}

        <TouchableOpacity
          style={[s.primaryBtn, { backgroundColor: C.brand }]}
          onPress={reset}
          activeOpacity={0.85}
        >
          <Text style={s.primaryBtnText}>New Session</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.secondaryBtn, { backgroundColor: C.surface2 }]}
          onPress={openHistory}
          activeOpacity={0.85}
        >
          <Text style={[s.secondaryBtnText, { color: C.textMuted }]}>View History</Text>
        </TouchableOpacity>
      </ScrollView>

      {pet?.chosen && (
        <StudyBuddyCompanion
          petType={pet.petType}
          petName={pet.name}
          accessories={pet.accessories ?? []}
          message={buddyMessage}
        />
      )}

      {/* Session goal celebration modal */}
      <Modal transparent visible={goalCelebModal} animationType="fade" onRequestClose={dismissGoalCeleb}>
        <View style={[s.modalBackdrop, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[s.modalCard, { backgroundColor: C.surface }]}>
            <Text style={{ fontSize: 64, textAlign: 'center' }}>🎯</Text>
            <Text style={[T.h2, { color: C.text, textAlign: 'center', marginTop: 8 }]}>Session Goal Reached!</Text>
            <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 4 }]}>{sessionGoal} pomodoro{sessionGoal !== 1 ? 's' : ''} completed</Text>
            <View style={{ backgroundColor: C.brand + '20', borderRadius: 12, padding: 12, marginTop: 16, alignItems: 'center' }}>
              <Text style={{ fontSize: 36 }}>🐾</Text>
              <Text style={[T.label, { color: C.brand, marginTop: 4, textAlign: 'center' }]}>+8 Happiness bonus for {pet?.name}!</Text>
            </View>
            <TouchableOpacity
              style={[s.goalCelebBtn, { backgroundColor: C.brand }]}
              onPress={dismissGoalCeleb}
              activeOpacity={0.85}
            >
              <Text style={[T.btn, { color: '#FFF' }]}>Keep Studying! 🚀</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    doneSummary: { flexDirection: 'row', gap: 12, marginTop: 8 },
    doneStat: {
      alignItems:       'center',
      justifyContent:   'center',
      borderRadius:     14,
      paddingHorizontal: 18,
      paddingVertical:   14,
      gap:               4,
    },
    doneStatEmoji: { fontSize: 22 },
    doneStatVal:   { fontSize: 20, fontWeight: '800' },
    doneStatSub:   { fontSize: 11, fontWeight: '600', marginTop: 1 },
    primaryBtn: {
      width:          '100%',
      borderRadius:    16,
      paddingVertical:  16,
      alignItems:      'center',
      marginTop:        8,
    },
    primaryBtnText:  { color: '#fff', fontSize: 16, fontWeight: '800' },
    secondaryBtn: {
      width:          '100%',
      borderRadius:    16,
      paddingVertical:  14,
      alignItems:      'center',
    },
    secondaryBtnText: { fontSize: 15, fontWeight: '600' },

    // Modal
    modalBackdrop: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalCard: {
      borderRadius: 24,
      padding: 28,
      width: '80%',
      maxWidth: 340,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 10,
    },
    goalCelebBtn: {
      width: '100%',
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 20,
    },
  })
}
