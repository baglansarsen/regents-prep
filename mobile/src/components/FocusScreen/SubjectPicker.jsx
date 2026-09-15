/**
 * SubjectPicker — the subject chip row from FocusSetupScreen's setup form,
 * including the "Other" chip and its conditional custom-subject field.
 *
 * First of three interactive pickers extracted under components/FocusScreen/
 * (FOCUS-03). Fires callback props only; holds no local state of its own —
 * per D-01 this shape still gets an interaction test, not render-only,
 * because D-02's mis-wire risk (wrong prop wired to wrong handler) is
 * invisible to a render-only test.
 *
 * The active-state comparison below is intentionally a string equality
 * against the assembled "{emoji} {label}" value — not an id comparison —
 * because that is the shape the stored subject string actually takes today.
 */
import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { useTheme } from '../../context/ThemeContext'

export default function SubjectPicker({
  chips,
  subject,
  showCustomInput,
  customSubject,
  onSelectChip,
  onShowCustomInput,
  onCustomSubjectChange,
  onCommitCustomSubject,
}) {
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <>
      <Text style={[s.sectionLabel, { color: C.textMuted }]}>What are you studying?</Text>
      <View style={s.chips}>
        {chips.map((chip) => {
          const active = subject === chip.emoji + ' ' + chip.label
          return (
            <TouchableOpacity
              key={chip.id}
              style={[s.chip, active && { backgroundColor: C.brand, borderColor: C.brand }]}
              onPress={() => onSelectChip(chip)}
              activeOpacity={0.75}
            >
              <Text style={s.chipEmoji}>{chip.emoji}</Text>
              <Text style={[s.chipText, { color: active ? '#fff' : C.text }]}>{chip.label}</Text>
            </TouchableOpacity>
          )
        })}
        <TouchableOpacity
          style={[s.chip, showCustomInput && { backgroundColor: C.surface2, borderColor: C.brand }]}
          onPress={onShowCustomInput}
          activeOpacity={0.75}
        >
          <Text style={s.chipEmoji}>✏️</Text>
          <Text style={[s.chipText, { color: C.text }]}>Other</Text>
        </TouchableOpacity>
      </View>

      {showCustomInput && (
        <View style={[s.customInputRow, { backgroundColor: C.surface2, borderColor: C.border }]}>
          <TextInput
            style={[s.customInput, { color: C.text }]}
            placeholder="e.g. Piano practice, Drawing..."
            placeholderTextColor={C.textMuted}
            value={customSubject}
            onChangeText={onCustomSubjectChange}
            onSubmitEditing={onCommitCustomSubject}
            onBlur={onCommitCustomSubject}
            returnKeyType="done"
            autoFocus
          />
        </View>
      )}
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

    customInputRow: {
      marginTop: 10,
      borderRadius: 12,
      borderWidth: 1.5,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    customInput: { fontSize: 14 },
  })
}
