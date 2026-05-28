import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { T, cardShadow } from '../styles/duo'

export default function UnitBanner({ unit, unitIndex, completed, total, locked, C, onTips }) {
  const bg          = locked ? C.surface2 : unit.color
  const textColor   = locked ? C.text     : '#fff'
  const subColor    = locked ? C.textMuted : 'rgba(255,255,255,0.8)'
  const barFill     = locked ? C.border   : unit.darkColor
  const barTrack    = locked ? C.surface3 : 'rgba(255,255,255,0.25)'
  const fillPct     = total > 0 ? Math.min(completed / total, 1) : 0

  return (
    <View style={[styles.banner, { backgroundColor: bg }, cardShadow(C.shadow)]}>
      <View style={styles.row}>
        <View style={[styles.pill, { backgroundColor: locked ? C.surface3 : unit.darkColor }]}>
          <Text style={[T.label, { color: locked ? C.textMuted : '#fff' }]}>UNIT {unitIndex + 1}</Text>
        </View>
        <Text style={{ fontSize: 22, marginLeft: 10 }}>{locked ? '🔒' : unit.icon}</Text>
        <View style={styles.titleBlock}>
          <Text style={[T.h3, { color: textColor }]} numberOfLines={1}>{unit.title}</Text>
          <Text style={[T.small, { color: subColor }]}>
            {completed}/{total} lessons
          </Text>
        </View>
        {onTips && !locked && (
          <TouchableOpacity
            onPress={onTips}
            style={[styles.tipsPill, { backgroundColor: unit.darkColor }]}
            activeOpacity={0.8}
          >
            <Text style={[T.label, { color: '#fff' }]}>💡 TIPS</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Progress bar */}
      <View style={[styles.barTrack, { backgroundColor: barTrack }]}>
        <View style={[styles.barFill, { backgroundColor: barFill, width: `${fillPct * 100}%` }]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    borderRadius: 18,
    padding: 16,
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pill: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  titleBlock: {
    flex: 1,
    marginLeft: 10,
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: 6,
    borderRadius: 3,
  },
  tipsPill: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
})
