import { View, Text, Animated, StyleSheet } from 'react-native'
import { useEffect, useRef } from 'react'
import { C } from '../theme'

export default function Timer({ timeLeft, max }) {
  const pct = timeLeft / max
  const urgent = timeLeft <= 10

  const animPct = useRef(new Animated.Value(pct)).current

  useEffect(() => {
    Animated.timing(animPct, {
      toValue: pct,
      duration: 900,
      useNativeDriver: false,
    }).start()
  }, [timeLeft])

  const animWidth = animPct.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={s.container}>
      <View style={s.track}>
        <Animated.View
          style={[s.fill, { width: animWidth }, urgent && s.fillUrgent]}
        />
      </View>
      <Text style={[s.label, urgent && s.labelUrgent]}>{timeLeft}s</Text>
    </View>
  )
}

const s = StyleSheet.create({
  container: { marginBottom: 4 },
  track: {
    height: 8,
    backgroundColor: C.surface2,
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: C.brand,
    borderRadius: 99,
  },
  fillUrgent: { backgroundColor: C.wrong },
  label: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: C.textMuted,
    marginTop: 4,
  },
  labelUrgent: { color: C.wrong, fontWeight: '700' },
})
