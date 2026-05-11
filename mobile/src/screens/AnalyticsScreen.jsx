import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { TOPICS, TOPIC_ICONS } from '../data/questions'
import { C } from '../theme'

export default function AnalyticsScreen({ progress, streak, onHome }) {
  const allTopics = Object.values(TOPICS)

  // Aggregate totals across all topics
  const totals = Object.values(progress).reduce(
    (acc, p) => ({
      answered: acc.answered + (p.totalAnswered || 0),
      correct:  acc.correct  + (p.totalCorrect  || 0),
      played:   acc.played   + (p.totalPlayed   || 0),
    }),
    { answered: 0, correct: 0, played: 0 },
  )

  const overallPct = totals.answered > 0
    ? Math.round((totals.correct / totals.answered) * 100)
    : null

  // Find weakest and strongest topic (only for topics with data)
  const topicStats = allTopics
    .map((t) => {
      const p = progress[t]
      if (!p || p.totalAnswered === 0) return null
      return { topic: t, pct: Math.round((p.totalCorrect / p.totalAnswered) * 100) }
    })
    .filter(Boolean)

  const weakest  = topicStats.length ? topicStats.reduce((a, b) => a.pct < b.pct ? a : b) : null
  const strongest = topicStats.length ? topicStats.reduce((a, b) => a.pct > b.pct ? a : b) : null

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <View style={s.topbar}>
        <TouchableOpacity onPress={onHome} activeOpacity={0.7}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Analytics</Text>
        <View style={{ width: 48 }} />
      </View>

      {/* Summary row */}
      <View style={s.statRow}>
        <StatCard label="Questions" value={totals.answered || '—'} />
        <StatCard label="Accuracy" value={overallPct != null ? `${overallPct}%` : '—'} highlight={overallPct >= 65} />
        <StatCard label="Sessions" value={totals.played || '—'} />
        <StatCard label="Day Streak" value={streak > 0 ? `🔥${streak}` : '—'} />
      </View>

      {/* Insight cards */}
      {weakest && (
        <View style={[s.insightCard, s.insightWeak]}>
          <Text style={s.insightIcon}>📉</Text>
          <View>
            <Text style={s.insightLabel}>Needs Work</Text>
            <Text style={s.insightValue}>{weakest.topic} — {weakest.pct}%</Text>
          </View>
        </View>
      )}
      {strongest && strongest.topic !== weakest?.topic && (
        <View style={[s.insightCard, s.insightStrong]}>
          <Text style={s.insightIcon}>📈</Text>
          <View>
            <Text style={s.insightLabel}>Strongest Topic</Text>
            <Text style={s.insightValue}>{strongest.topic} — {strongest.pct}%</Text>
          </View>
        </View>
      )}

      {/* Per-topic breakdown */}
      <Text style={s.sectionLabel}>BY TOPIC</Text>
      {allTopics.map((topic) => {
        const p = progress[topic]
        const hasData = p && p.totalAnswered > 0
        const pct = hasData ? Math.round((p.totalCorrect / p.totalAnswered) * 100) : null
        const barColor = pct == null ? C.surface2 : pct >= 85 ? C.correct : pct >= 65 ? C.warn : C.wrong

        return (
          <View key={topic} style={s.topicRow}>
            <Text style={s.topicIcon}>{TOPIC_ICONS[topic]}</Text>
            <View style={s.topicInfo}>
              <View style={s.topicMeta}>
                <Text style={s.topicName}>{topic}</Text>
                <Text style={s.topicStat}>
                  {hasData ? `${p.totalCorrect}/${p.totalAnswered} · best ${p.highScore}pts` : 'No data yet'}
                </Text>
              </View>
              <View style={s.barTrack}>
                <View style={[s.barFill, { width: pct != null ? `${pct}%` : '0%', backgroundColor: barColor }]} />
              </View>
            </View>
            <Text style={[s.pctLabel, { color: pct != null ? barColor : C.textMuted }]}>
              {pct != null ? `${pct}%` : '—'}
            </Text>
          </View>
        )
      })}

      {totals.answered === 0 && (
        <View style={s.emptyState}>
          <Text style={s.emptyEmoji}>📊</Text>
          <Text style={s.emptyText}>Complete a quiz to see your analytics.</Text>
        </View>
      )}
    </ScrollView>
  )
}

function StatCard({ label, value, highlight }) {
  return (
    <View style={[s.statCard, highlight && s.statCardHighlight]}>
      <Text style={[s.statValue, highlight && s.statValueHighlight]}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  )
}

const s = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  topbar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 24,
  },
  backText: { fontSize: 14, color: C.textMuted, width: 48 },
  title:    { fontSize: 18, fontWeight: '800', color: C.text },

  statRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: {
    flex: 1, backgroundColor: C.surface, borderRadius: 12, padding: 12,
    alignItems: 'center', borderWidth: 1, borderColor: C.surface2,
  },
  statCardHighlight: { borderColor: C.brand, backgroundColor: C.brand + '15' },
  statValue:          { fontSize: 20, fontWeight: '800', color: C.text },
  statValueHighlight: { color: C.brandLight },
  statLabel:          { fontSize: 10, color: C.textMuted, marginTop: 2, fontWeight: '600' },

  insightCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 12, padding: 14, marginBottom: 8,
    borderWidth: 1,
  },
  insightWeak:   { backgroundColor: 'rgba(239,68,68,0.08)',   borderColor: C.wrong  + '60' },
  insightStrong: { backgroundColor: 'rgba(34,197,94,0.08)',   borderColor: C.correct + '60' },
  insightIcon:  { fontSize: 24 },
  insightLabel: { fontSize: 11, color: C.textMuted, fontWeight: '700', letterSpacing: 0.5 },
  insightValue: { fontSize: 14, color: C.text, fontWeight: '600', marginTop: 2 },

  sectionLabel: { fontSize: 11, fontWeight: '700', color: C.textMuted, letterSpacing: 1, marginTop: 8, marginBottom: 12 },

  topicRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14,
  },
  topicIcon: { fontSize: 22, width: 28 },
  topicInfo: { flex: 1, gap: 4 },
  topicMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  topicName: { fontSize: 13, fontWeight: '600', color: C.text },
  topicStat: { fontSize: 11, color: C.textMuted },
  barTrack:  { height: 7, backgroundColor: C.surface2, borderRadius: 99, overflow: 'hidden' },
  barFill:   { height: '100%', borderRadius: 99 },
  pctLabel:  { fontSize: 12, fontWeight: '700', width: 34, textAlign: 'right' },

  emptyState: { alignItems: 'center', marginTop: 40, gap: 10 },
  emptyEmoji: { fontSize: 40 },
  emptyText:  { fontSize: 14, color: C.textMuted, textAlign: 'center' },
})
