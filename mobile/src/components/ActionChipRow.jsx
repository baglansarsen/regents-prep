import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { T, sectionLabel } from '../styles/duo'

/**
 * ActionChipRow — the ladder's runners-up, reduced to a single horizontal row
 * of compact pills instead of the peer cards they used to be (Daily Trap,
 * Smart Review, Level 0, the streak-freeze banner). Nothing here is a card:
 * no shadow, no subtitle, no per-item CTA — one row that's clearly secondary
 * to the hero above it.
 *
 * Renders nothing when there's nothing to show.
 */
export default function ActionChipRow({ chips = [], streak = null, onPress, onFreeze }) {
  const { C } = useTheme()
  const s = makeStyles(C)

  if (!chips.length && !streak) return null

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={[sectionLabel(C), { marginHorizontal: 16, marginBottom: 6 }]}>ALSO TODAY</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.row}>
        {streak && (
          <TouchableOpacity style={[s.chip, { borderColor: C.wrong + '60', backgroundColor: C.wrong + '12' }]} onPress={onFreeze} activeOpacity={0.8}>
            <Text style={[T.small, { color: C.wrong, fontWeight: '700' }]}>🔥 {streak.days} · Freeze</Text>
          </TouchableOpacity>
        )}
        {chips.map((c) => (
          <TouchableOpacity key={c.id} style={[s.chip, { borderColor: C.border, backgroundColor: C.surface2 }]} onPress={() => onPress?.(c)} activeOpacity={0.8}>
            <Text style={[T.small, { color: C.text }]}>{c.icon} {c.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const makeStyles = (C) => StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, paddingHorizontal: 16 },
  chip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 999, borderWidth: 1,
  },
})
