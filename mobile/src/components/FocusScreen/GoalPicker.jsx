/**
 * GoalPicker — the session-goal chip row from FocusSetupScreen's setup form.
 *
 * Third of three interactive pickers extracted under components/FocusScreen/
 * (FOCUS-03). Fires a select callback only; holds no local state — per D-01
 * this still gets an interaction test (see D-02).
 *
 * Renders the fixed 0-5 option range (presentation, not state, kept exactly
 * as the container held it). Active state compares numbers; the zero option
 * renders the none label instead of a numeric one.
 */
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../../context/ThemeContext'

export default function GoalPicker({ sessionGoal, onSelectGoal }) {
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <>
      <Text style={[s.sectionLabel, { color: C.textMuted }]}>Session goal</Text>
      <View style={s.goalChips}>
        {[0, 1, 2, 3, 4, 5].map(n => (
          <TouchableOpacity
            key={n}
            onPress={() => onSelectGoal(n)}
            style={[s.goalChip, sessionGoal === n && { backgroundColor: C.brand, borderColor: C.brand }]}
            activeOpacity={0.75}
          >
            <Text style={[s.goalChipText, { color: sessionGoal === n ? '#fff' : C.text }]}>
              {n === 0 ? 'None' : `${n} 🍅`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    sectionLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10, marginTop: 20 },
    goalChips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 8 },
    goalChip: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: C.border,
      backgroundColor: C.surface,
    },
    goalChipText: { fontSize: 13, fontWeight: '600' },
  })
}
