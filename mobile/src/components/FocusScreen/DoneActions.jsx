/**
 * DoneActions — the done-screen's two stacked action buttons (FOCUS-03).
 *
 * Fires a callback prop for each action, so per D-01 it gets an interaction
 * test — even though it holds no local state of its own (D-02). Moved
 * verbatim out of FocusDoneScreen (02-03-PLAN.md Task 2): full-width primary
 * button in the brand color, full-width secondary button on the muted
 * surface, byte-for-byte styles and copy (UI-SPEC parity lock).
 */
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../context/ThemeContext'

export default function DoneActions({ onNewSession, onViewHistory }) {
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <>
      <TouchableOpacity
        style={[s.primaryBtn, { backgroundColor: C.brand }]}
        onPress={onNewSession}
        activeOpacity={0.85}
      >
        <Text style={s.primaryBtnText}>New Session</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[s.secondaryBtn, { backgroundColor: C.surface2 }]}
        onPress={onViewHistory}
        activeOpacity={0.85}
      >
        <Text style={[s.secondaryBtnText, { color: C.textMuted }]}>View History</Text>
      </TouchableOpacity>
    </>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
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
  })
}
