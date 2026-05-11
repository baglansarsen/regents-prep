import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { TOPIC_ICONS } from '../data/questions'
import { C } from '../theme'

export default function ResultsScreen({ score, bestStreak, results, total, onRetry, onHome }) {
  const correct = results.filter((r) => r.correct).length
  const pct = Math.round((correct / total) * 100)

  const grade =
    pct >= 85 ? { label: 'Mastery',        color: C.correct, emoji: '🏆' }
    : pct >= 65 ? { label: 'Passing',       color: C.warn,    emoji: '✅' }
    :             { label: 'Keep Practicing', color: C.wrong,  emoji: '📚' }

  const byTopic = results.reduce((acc, r) => {
    const t = r.question.topic
    if (!acc[t]) acc[t] = { correct: 0, total: 0 }
    acc[t].total++
    if (r.correct) acc[t].correct++
    return acc
  }, {})

  return (
    <ScrollView
      style={s.scroll}
      contentContainerStyle={s.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={s.hero}>
        <Text style={s.emoji}>{grade.emoji}</Text>
        <Text style={[s.gradeLabel, { color: grade.color }]}>{grade.label}</Text>
        <Text style={s.scoreValue}>{score} pts</Text>
        <Text style={s.fraction}>{correct} / {total} correct ({pct}%)</Text>
        {bestStreak > 1 && (
          <Text style={s.streakLine}>Best streak: 🔥 {bestStreak}</Text>
        )}
      </View>

      <View style={s.breakdown}>
        <Text style={s.breakdownTitle}>TOPIC BREAKDOWN</Text>
        {Object.entries(byTopic).map(([topic, data]) => {
          const tPct = Math.round((data.correct / data.total) * 100)
          const barColor = tPct >= 65 ? C.correct : C.wrong
          return (
            <View key={topic} style={s.breakdownRow}>
              <Text style={s.breakdownIcon}>{TOPIC_ICONS[topic]}</Text>
              <Text style={s.breakdownTopic} numberOfLines={1}>{topic}</Text>
              <View style={s.barTrack}>
                <View style={[s.barFill, { width: `${tPct}%`, backgroundColor: barColor }]} />
              </View>
              <Text style={s.breakdownCount}>{data.correct}/{data.total}</Text>
            </View>
          )
        })}
      </View>

      <View style={s.actions}>
        <TouchableOpacity style={s.btnPrimary} onPress={onRetry} activeOpacity={0.85}>
          <Text style={s.btnPrimaryText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btnSecondary} onPress={onHome} activeOpacity={0.85}>
          <Text style={s.btnSecondaryText}>Choose Topic</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const s = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 40, gap: 20 },

  hero: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.surface2,
    gap: 6,
  },
  emoji:      { fontSize: 48, marginBottom: 4 },
  gradeLabel: { fontSize: 26, fontWeight: '800' },
  scoreValue: { fontSize: 36, fontWeight: '800', color: C.brandLight },
  fraction:   { fontSize: 15, color: C.textMuted },
  streakLine: { fontSize: 14, color: C.warn, fontWeight: '600' },

  breakdown: {
    backgroundColor: C.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: C.surface2,
    gap: 14,
  },
  breakdownTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: C.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  breakdownIcon: { fontSize: 16, width: 24 },
  breakdownTopic: { fontSize: 12, color: C.textMuted, width: 120, flexShrink: 0 },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: C.surface2,
    borderRadius: 99,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 99 },
  breakdownCount: { fontSize: 12, color: C.textMuted, width: 30, textAlign: 'right' },

  actions: { flexDirection: 'row', gap: 10 },
  btnPrimary: {
    flex: 1,
    backgroundColor: C.brand,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  btnPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  btnSecondary: {
    flex: 1,
    backgroundColor: C.surface2,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  btnSecondaryText: { color: C.text, fontSize: 15, fontWeight: '700' },
})
