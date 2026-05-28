import React, { useRef, useEffect } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { usePetContext } from '../context/PetContext'
import { T } from '../styles/duo'

function colorForLevel(value) {
  if (value > 60) return '#22C55E'   // green
  if (value > 30) return '#F97316'   // orange
  return '#EF4444'                    // red
}

function StatusBar({ icon, value, C }) {
  const animVal = useRef(new Animated.Value(value)).current

  useEffect(() => {
    Animated.spring(animVal, {
      toValue:         value,
      useNativeDriver: false,
      tension:         60,
      friction:        10,
    }).start()
  }, [value])

  const color     = colorForLevel(value)
  const widthPct  = animVal.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] })

  return (
    <View style={s.barRow}>
      <Text style={s.barIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <View style={[s.track, { backgroundColor: C.surface2 }]}>
          <Animated.View style={[s.fill, { width: widthPct, backgroundColor: color }]} />
        </View>
      </View>
      <Text style={[T.label, { color: C.textMuted, marginLeft: 6, minWidth: 30, textAlign: 'right', textTransform: 'none', letterSpacing: 0 }]}>
        {Math.round(value)}
      </Text>
    </View>
  )
}

export default function PetStatusBars() {
  const { C }   = useTheme()
  const { pet } = usePetContext()

  if (!pet.chosen) return null

  return (
    <View style={[s.container, { backgroundColor: C.surface, borderColor: C.border }]}>
      <StatusBar icon="🍖" value={pet.hunger}    C={C} />
      <View style={[s.divider, { backgroundColor: C.border }]} />
      <StatusBar icon="😊" value={pet.happiness} C={C} />
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    marginHorizontal:  16,
    borderRadius:      14,
    borderWidth:       1,
    paddingHorizontal: 14,
    paddingVertical:   10,
    gap:               6,
  },
  barRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
  },
  barIcon: { fontSize: 14, width: 20, textAlign: 'center' },
  track: {
    height:       8,
    borderRadius: 4,
    overflow:     'hidden',
  },
  fill: {
    height:       8,
    borderRadius: 4,
  },
  divider: { height: 1 },
})
