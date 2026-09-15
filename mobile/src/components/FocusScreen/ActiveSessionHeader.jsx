/**
 * ActiveSessionHeader — active-session top bar for FocusActiveScreen.
 *
 * Interaction tier per D-01 (02-CONTEXT.md): two distinct callback props —
 * one asks for confirmation before leaving, the other stops immediately —
 * genuinely different behaviors kept as differently named props so a
 * mis-wire is visible at the call site (FOCUS-03).
 *
 * Reads no theme: text/muted colors arrive as props, derived by the caller
 * from the active scene background (see FocusActiveScreen's module docstring).
 */
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function ActiveSessionHeader({
  subject,
  pomodoroCount,
  sessionGoal,
  textColor,
  mutedColor,
  onRequestStop,
  onStop,
}) {
  return (
    <View style={s.activeHeader}>
      <TouchableOpacity
        style={[s.stopBtn, { backgroundColor: 'rgba(0,0,0,0.15)' }]}
        onPress={onRequestStop}
        activeOpacity={0.8}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text style={[s.stopBtnText, { color: textColor }]}>✕</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {subject ? (
          <Text style={[s.activeSubject, { color: mutedColor }]}>{subject}</Text>
        ) : null}
        {sessionGoal > 0 ? (
          <Text style={{ fontSize: 18, marginTop: 2, fontWeight: '700', color: textColor }}>
            {pomodoroCount}/{sessionGoal} 🍅
          </Text>
        ) : pomodoroCount > 0 ? (
          <Text style={{ fontSize: 18, marginTop: 2 }}>{'🍅'.repeat(Math.min(pomodoroCount, 8))}</Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={[s.stopBtn, { backgroundColor: 'rgba(0,0,0,0.15)' }]}
        onPress={onStop}
        activeOpacity={0.8}
      >
        <Text style={[s.stopBtnText, { color: textColor }]}>■ Stop</Text>
      </TouchableOpacity>
    </View>
  )
}

const s = StyleSheet.create({
  activeHeader: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: 20,
    paddingTop:        12,
    paddingBottom:     4,
  },
  activeSubject:  { fontSize: 15, fontWeight: '700' },
  stopBtn: {
    borderRadius:      12,
    paddingHorizontal: 16,
    paddingVertical:   8,
  },
  stopBtnText: { fontSize: 14, fontWeight: '700' },
})
