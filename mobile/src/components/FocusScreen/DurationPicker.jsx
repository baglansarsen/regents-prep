/**
 * DurationPicker — the session-length preset row from FocusSetupScreen's
 * setup form.
 *
 * Second of three interactive pickers extracted under components/FocusScreen/
 * (FOCUS-03). Fires a select callback only; holds no local state — per D-01
 * this still gets an interaction test (see D-02).
 *
 * Active state compares preset ids.
 */
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../../context/ThemeContext'

export default function DurationPicker({ presets, preset, onSelectPreset }) {
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <>
      <Text style={[s.sectionLabel, { color: C.textMuted }]}>Session length</Text>
      <View style={s.presetRow}>
        {presets.map((p) => {
          const active = preset.id === p.id
          return (
            <TouchableOpacity
              key={p.id}
              style={[s.presetBtn, active && { backgroundColor: C.brand, borderColor: C.brand }]}
              onPress={() => onSelectPreset(p)}
              activeOpacity={0.8}
            >
              <Text style={[s.presetBtnText, { color: active ? '#fff' : C.text }]}>{p.label}</Text>
              <Text style={[s.presetBtnSub, { color: active ? 'rgba(255,255,255,0.7)' : C.textMuted }]}>
                {p.break}m break
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    sectionLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10, marginTop: 20 },
    presetRow:     { flexDirection: 'row', gap: 10 },
    presetBtn: {
      flex: 1,
      alignItems:      'center',
      paddingVertical:  14,
      borderRadius:    14,
      borderWidth:     1.5,
      borderColor:     C.border,
      backgroundColor: C.surface,
    },
    presetBtnText:  { fontSize: 16, fontWeight: '800' },
    presetBtnSub:   { fontSize: 11, marginTop: 2 },
  })
}
