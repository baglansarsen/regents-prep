/**
 * ActiveTaskList — height-capped scrolling task list for the active session,
 * rendered by FocusActiveScreen.
 *
 * Interaction tier per D-01 (02-CONTEXT.md): a thin prop-forwarding wrapper
 * around a toggle callback with no local state (FOCUS-03).
 *
 * Renders nothing for an empty task array — the guard moved inside this
 * component from its previous position in FocusActiveScreen, which is
 * render-equivalent and matches the guard shape ActionChipRow already uses
 * in this repo (02-UI-SPEC.md `empty` UI Consideration).
 *
 * Reads no theme: accent/text/muted colors arrive as props, derived by the
 * caller from the active scene background.
 */
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'

export default function ActiveTaskList({ tasks = [], onToggle, accentColor, textColor, mutedColor }) {
  if (!tasks.length) return null

  return (
    <ScrollView style={s.activeTodos} showsVerticalScrollIndicator={false}>
      {tasks.map((t) => (
        <TouchableOpacity
          key={t.id}
          style={s.todoRow}
          onPress={() => onToggle(t.id)}
          activeOpacity={0.7}
        >
          <View style={[s.todoCheck, {
            borderColor: t.done ? accentColor : 'rgba(255,255,255,0.5)',
            backgroundColor: t.done ? accentColor : 'transparent',
          }]}>
            {t.done && <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>✓</Text>}
          </View>
          <Text style={[s.todoText, {
            color: t.done ? mutedColor : textColor,
            textDecorationLine: t.done ? 'line-through' : 'none',
          }]}>
            {t.text}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const s = StyleSheet.create({
  activeTodos: {
    maxHeight:         160,
    paddingHorizontal: 20,
    marginBottom:      8,
  },
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
