/**
 * TimerControls — pause/resume and skip transport controls for
 * FocusActiveScreen.
 *
 * Interaction tier per D-01 (02-CONTEXT.md): a thin prop-forwarding wrapper
 * around three callback props with no local state — the exact shape where a
 * wrong-handler mis-wire is invisible to hook tests (FOCUS-03).
 *
 * Reads no theme: accent/text/muted colors arrive as props, derived by the
 * caller from the active scene background.
 */
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function TimerControls({
  phase,
  isBreak,
  accentColor,
  textColor,
  mutedColor,
  onPause,
  onResume,
  onSkip,
}) {
  return (
    <View style={s.timerControls}>
      {phase === 'paused' ? (
        <TouchableOpacity
          style={[s.controlBtn, { backgroundColor: accentColor }]}
          onPress={onResume}
          activeOpacity={0.85}
        >
          <Text style={[s.controlBtnText, { color: '#fff' }]}>▶ Resume</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[s.controlBtn, { backgroundColor: 'rgba(0,0,0,0.15)' }]}
          onPress={onPause}
          activeOpacity={0.85}
        >
          <Text style={[s.controlBtnText, { color: textColor }]}>⏸ Pause</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[s.controlBtn, { backgroundColor: 'rgba(0,0,0,0.12)' }]}
        onPress={onSkip}
        activeOpacity={0.85}
      >
        <Text style={[s.controlBtnText, { color: mutedColor }]}>
          {isBreak ? '⏭ Skip break' : '⏭ Skip'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const s = StyleSheet.create({
  timerControls: {
    flexDirection:     'row',
    gap:               12,
    paddingHorizontal: 20,
    paddingVertical:   12,
  },
  controlBtn: {
    flex:           1,
    borderRadius:   14,
    paddingVertical: 13,
    alignItems:     'center',
  },
  controlBtnText: { fontSize: 14, fontWeight: '700' },
})
