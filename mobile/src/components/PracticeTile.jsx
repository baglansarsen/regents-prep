import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { T, duoBtn } from '../styles/duo'

/**
 * Quick Practice tile (Exams tab). A real button for assistive tech: role
 * "button", a clean one-line name ("Flash Cards", not "🃏 Flash⏎Cards"), and
 * the emoji drawn but hidden from screen readers.
 */
export default function PracticeTile({ icon, label, color, darkColor, onPress, style }) {
  const name = label.replace(/\s*\n\s*/g, ' ')
  return (
    <TouchableOpacity
      style={[s.tile, duoBtn(color, darkColor), style]}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={name}
    >
      <Text
        style={s.icon}
        accessibilityElementsHidden
        importantForAccessibility="no"
        aria-hidden
      >
        {icon}
      </Text>
      <Text style={[T.btn, s.label]}>{label}</Text>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  tile: { flexBasis: '47%', flexGrow: 1, alignItems: 'center', paddingVertical: 14, gap: 4 },
  icon: { fontSize: 24, marginBottom: 2 },
  label: { color: '#fff', fontSize: 11, textAlign: 'center' },
})
