import { View, Text, StyleSheet } from 'react-native'
import { C } from '../../theme'

const LEVELS = [
  { label: 'Tertiary Consumer', emoji: '🦅', examples: 'Hawk, Eagle' },
  { label: 'Secondary Consumer', emoji: '🦊', examples: 'Fox, Snake' },
  { label: 'Primary Consumer',   emoji: '🐇', examples: 'Rabbit, Mouse' },
  { label: 'Producer',           emoji: '🌿', examples: 'Grass, Plants' },
]

export default function FoodWeb({ highlight }) {
  return (
    <View style={s.wrapper}>
      <Text style={s.diagramTitle}>Food Chain — Energy Flow</Text>
      {LEVELS.map((level, i) => (
        <View key={i} style={s.levelRow}>
          <View style={[s.levelCard, highlight === level.label && s.levelCardHighlight]}>
            <Text style={s.levelEmoji}>{level.emoji}</Text>
            <View>
              <Text style={[s.levelLabel, highlight === level.label && s.levelLabelHighlight]}>
                {level.label}
              </Text>
              <Text style={s.levelExamples}>{level.examples}</Text>
            </View>
          </View>
          {i < LEVELS.length - 1 && (
            <View style={s.arrowWrap}>
              <Text style={s.arrow}>↑ 10% energy</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  )
}

const s = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  diagramTitle: { fontSize: 12, fontWeight: '700', color: C.textMuted, marginBottom: 8, letterSpacing: 0.5, textAlign: 'center' },
  levelRow: { alignItems: 'center' },
  levelCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: C.surface2, borderRadius: 10, padding: 10,
    width: '100%', borderWidth: 1, borderColor: 'transparent',
  },
  levelCardHighlight: { borderColor: C.brandLight, backgroundColor: C.brand + '20' },
  levelEmoji: { fontSize: 24 },
  levelLabel: { fontSize: 13, fontWeight: '700', color: C.text },
  levelLabelHighlight: { color: C.brandLight },
  levelExamples: { fontSize: 11, color: C.textMuted, marginTop: 1 },
  arrowWrap: { paddingVertical: 2 },
  arrow: { fontSize: 11, color: C.textMuted },
})
