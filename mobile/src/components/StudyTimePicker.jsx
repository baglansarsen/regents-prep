import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { T } from '../styles/duo'
import { MINUTES_PER_DAY_OPTIONS } from '../utils/studyPlan'

const DAY_OPTIONS = [2, 3, 4, 5, 6, 7]

/**
 * "When can you study?" — days per week and minutes per day, as chip rows.
 * Each row is a radio group so screen readers announce the choice and state.
 * value: { daysPerWeek, minutesPerDay }; onChange receives the next value.
 */
export default function StudyTimePicker({ value, onChange }) {
  const { C } = useTheme()
  const s = makeStyles(C)

  const row = (label, options, key, fmt, nameFor) => (
    <View style={s.group}>
      <Text style={[T.label, { color: C.textMuted, marginBottom: 8 }]}>{label}</Text>
      <View style={s.row} accessibilityRole="radiogroup" accessibilityLabel={label}>
        {options.map((opt) => {
          const active = value?.[key] === opt
          return (
            <TouchableOpacity
              key={opt}
              style={[s.chip, active && { borderColor: C.brand, borderWidth: 2, backgroundColor: C.brand + '14' }]}
              onPress={() => onChange({ ...value, [key]: opt })}
              activeOpacity={0.85}
              accessibilityRole="radio"
              accessibilityState={{ checked: active }}
              aria-checked={active}
              accessibilityLabel={nameFor(opt)}
            >
              <Text style={[T.body, { color: active ? C.brand : C.text }]}>{fmt(opt)}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )

  return (
    <View>
      {row('DAYS A WEEK', DAY_OPTIONS, 'daysPerWeek', (d) => String(d), (d) => `${d} days a week`)}
      {row('MINUTES A DAY', MINUTES_PER_DAY_OPTIONS, 'minutesPerDay', (m) => `${m}`, (m) => `${m} minutes a day`)}
    </View>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    group: { marginHorizontal: 16, marginBottom: 12 },
    row:   { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: {
      minWidth: 48, minHeight: 44, alignItems: 'center', justifyContent: 'center',
      paddingHorizontal: 12, borderRadius: 12,
      backgroundColor: C.surface, borderWidth: 1, borderColor: C.border,
    },
  })
}
