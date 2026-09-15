/**
 * SoundPicker — the "Background sound" chip row from FocusSetupScreen's
 * setup form.
 *
 * Extracted under components/FocusScreen/ (FOCUS-03), mirroring the same
 * chip markup and style keys SubjectPicker already established rather than
 * inventing a second shared shape — the two chip rows stay separate
 * components on purpose (this phase only moves code, it does not
 * generalize a shared factory).
 *
 * Active state compares option ids against the currently selected sound.
 * The "Off" option is a normal option: it selects and highlights like any
 * other, with no special casing.
 */
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../../context/ThemeContext'

export default function SoundPicker({ soundOptions, sound, onSelectSound }) {
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <>
      <Text style={[s.sectionLabel, { color: C.textMuted }]}>Background sound</Text>
      <View style={s.chips}>
        {soundOptions.map((opt) => {
          const active = sound.id === opt.id
          return (
            <TouchableOpacity
              key={opt.id}
              style={[s.chip, active && { backgroundColor: C.brand, borderColor: C.brand }]}
              onPress={() => onSelectSound(opt)}
              activeOpacity={0.75}
            >
              <Text style={s.chipEmoji}>{opt.emoji}</Text>
              <Text style={[s.chipText, { color: active ? '#fff' : C.text }]}>{opt.label}</Text>
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
    chips:        { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: {
      flexDirection:    'row',
      alignItems:       'center',
      gap:              5,
      paddingHorizontal: 12,
      paddingVertical:   8,
      borderRadius:     20,
      borderWidth:      1.5,
      borderColor:      C.border,
      backgroundColor:  C.surface,
    },
    chipEmoji: { fontSize: 16 },
    chipText:  { fontSize: 13, fontWeight: '600' },
  })
}
