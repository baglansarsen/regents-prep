import { View, Text, StyleSheet } from 'react-native'
import { C } from '../theme'

export default function ProgressBar({ current, total, topic }) {
  const pct = `${Math.round((current / total) * 100)}%`

  return (
    <View style={s.wrapper}>
      <View style={s.meta}>
        <Text style={s.topic}>{topic}</Text>
        <Text style={s.count}>{current} / {total}</Text>
      </View>
      <View style={s.track}>
        <View style={[s.fill, { width: pct }]} />
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  wrapper: { gap: 6 },
  meta: { flexDirection: 'row', justifyContent: 'space-between' },
  topic: { fontSize: 12, color: C.textMuted, fontWeight: '500' },
  count: { fontSize: 12, color: C.textMuted },
  track: {
    height: 6,
    backgroundColor: C.surface2,
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: C.brandLight,
    borderRadius: 99,
  },
})
