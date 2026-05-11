import { View, Text, StyleSheet } from 'react-native'
import { C } from '../theme'

export default function ScoreDisplay({ score, streak, multiplier }) {
  return (
    <View style={s.row}>
      <View style={s.scoreBlock}>
        <Text style={s.scoreValue}>{score}</Text>
        <Text style={s.scoreLabel}> pts</Text>
      </View>

      {streak > 0 && (
        <View style={s.streakBlock}>
          <Text style={s.fire}>🔥</Text>
          <Text style={s.streakCount}>{streak}</Text>
          {multiplier > 1 && (
            <View style={s.multiBadge}>
              <Text style={s.multiText}>{multiplier}×</Text>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  scoreBlock: { flexDirection: 'row', alignItems: 'baseline' },
  scoreValue: { fontSize: 22, fontWeight: '800', color: C.brandLight },
  scoreLabel: { fontSize: 13, color: C.textMuted },
  streakBlock: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  fire: { fontSize: 16 },
  streakCount: { fontSize: 16, fontWeight: '700', color: C.text },
  multiBadge: {
    backgroundColor: C.warn,
    borderRadius: 99,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  multiText: { fontSize: 11, fontWeight: '700', color: '#000' },
})
