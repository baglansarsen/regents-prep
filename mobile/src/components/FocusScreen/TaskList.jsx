/**
 * TaskList — the setup-phase task rows from FocusSetupScreen's setup form:
 * one row per task with an unfilled checkbox, the task text, and a trailing
 * control.
 *
 * Deliberately separate from ActiveTaskList (the active-session sibling
 * plan 02-05 wrote): each screen phase gets its own component with a single
 * obvious callback prop, rather than one component branching on a variant
 * flag (02-RESEARCH.md Open Question 1's own recommendation).
 *
 * The trailing "✕" glyph reads like a dismissal, but its handler only
 * toggles the task's done state. No other interaction exists on this row,
 * and this extraction adds none: the glyph's appearance is preserved
 * exactly, its wiring is not reinterpreted.
 */
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../../context/ThemeContext'

export default function TaskList({ tasks, onToggle }) {
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <>
      {tasks.map((t) => (
        <View key={t.id} style={s.todoRow}>
          <View style={[s.todoCheck, { borderColor: C.border }]} />
          <Text style={[s.todoText, { color: C.text }]}>{t.text}</Text>
          <TouchableOpacity onPress={() => onToggle(t.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={{ color: C.textMuted, fontSize: 16 }}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    todoRow:  {
      flexDirection:  'row',
      alignItems:     'center',
      gap:            10,
      paddingVertical: 8,
    },
    todoCheck: {
      width:        20,
      height:       20,
      borderRadius: 6,
      borderWidth:  1.5,
      alignItems:   'center',
      justifyContent: 'center',
    },
    todoText: { flex: 1, fontSize: 14 },
  })
}
