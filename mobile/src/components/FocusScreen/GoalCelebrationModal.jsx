/**
 * GoalCelebrationModal — the session-goal celebration modal (FOCUS-03).
 *
 * Fires a dismiss callback prop, so per D-01 it gets an interaction test —
 * even though it holds no local state of its own (D-02). Moved verbatim out
 * of FocusDoneScreen (02-03-PLAN.md Task 2): transparent fade-animated modal,
 * dimmed backdrop, celebration card, and singular/plural completed-count
 * line, byte-for-byte styles and copy (UI-SPEC parity lock). Both the
 * button press and the modal's own request-to-close wire to the same
 * dismiss callback, exactly as the inline version did.
 */
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { useTheme } from '../../context/ThemeContext'
import { T } from '../../styles/duo'

export default function GoalCelebrationModal({ visible, sessionGoal, petName, onDismiss }) {
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onDismiss}>
      <View style={[s.modalBackdrop, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[s.modalCard, { backgroundColor: C.surface }]}>
          <Text style={{ fontSize: 64, textAlign: 'center' }}>🎯</Text>
          <Text style={[T.h2, { color: C.text, textAlign: 'center', marginTop: 8 }]}>Session Goal Reached!</Text>
          <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 4 }]}>{sessionGoal} pomodoro{sessionGoal !== 1 ? 's' : ''} completed</Text>
          <View style={{ backgroundColor: C.brand + '20', borderRadius: 12, padding: 12, marginTop: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 36 }}>🐾</Text>
            <Text style={[T.label, { color: C.brand, marginTop: 4, textAlign: 'center' }]}>+8 Happiness bonus for {petName}!</Text>
          </View>
          <TouchableOpacity
            style={[s.goalCelebBtn, { backgroundColor: C.brand }]}
            onPress={onDismiss}
            activeOpacity={0.85}
          >
            <Text style={[T.btn, { color: '#FFF' }]}>Keep Studying! 🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
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
