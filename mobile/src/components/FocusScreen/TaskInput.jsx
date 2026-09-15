/**
 * TaskInput — the task-entry row from FocusSetupScreen's setup form: the
 * "Tasks (optional)" label, the bordered entry row, and the conditional
 * "Add" affordance that appears only once the field holds non-blank text.
 *
 * Fourth of four remaining pickers/inputs extracted under
 * components/FocusScreen/ (FOCUS-03). Fires callback props only; holds no
 * local state of its own — per D-01 this shape still gets an interaction
 * test, not render-only, because D-02's mis-wire risk (wrong prop wired to
 * wrong handler) is invisible to a render-only test.
 *
 * The non-blank check below is a trimmed-length check on the *display*
 * value only — it decides whether the "Add" button renders. It is not the
 * same trim that decides what gets stored: that trim lives in
 * useFocusSession's addTodo function and stays there (ASVS V5).
 */
import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../../context/ThemeContext'

export default function TaskInput({ value, onChangeText, onAdd }) {
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <>
      <Text style={[s.sectionLabel, { color: C.textMuted }]}>
        Tasks <Text style={{ fontWeight: '400', fontSize: 12 }}>(optional)</Text>
      </Text>
      <View style={[s.todoInputRow, { backgroundColor: C.surface2, borderColor: C.border }]}>
        <TextInput
          style={[s.todoInputField, { color: C.text }]}
          placeholder="Add a task..."
          placeholderTextColor={C.textMuted}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />
        {value.trim().length > 0 && (
          <TouchableOpacity onPress={onAdd} style={s.todoAddBtn}>
            <Text style={[s.todoAddBtnText, { color: C.brand }]}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    sectionLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10, marginTop: 20 },
    todoInputRow: {
      flexDirection:    'row',
      alignItems:       'center',
      borderRadius:     12,
      borderWidth:      1.5,
      paddingHorizontal: 14,
      paddingVertical:   10,
    },
    todoInputField: { flex: 1, fontSize: 14 },
    todoAddBtn:     { paddingLeft: 12 },
    todoAddBtnText: { fontSize: 13, fontWeight: '700' },
  })
}
