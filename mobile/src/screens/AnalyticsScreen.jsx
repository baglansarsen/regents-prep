import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { useAuthContext } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useProgress } from '../hooks/useProgress'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { TOPICS, TOPIC_ICONS } from '../data/questions'

export default function AnalyticsScreen({ navigation, onHome }) {
  const { user } = useAuthContext()
  const uid = user?.uid
  const { C } = useTheme()
  const { history } = useProgress(uid)
  const { streak } = useDailyStreak(uid)

  // Build topic → stats map from raw history (all subjects)
  const progress = buildProgress(history)

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

  const topicStats = allTopics
    .map((t) => {
      const p = progress[t]
      if (!p || p.totalAnswered === 0) return null
      return { topic: t, pct: Math.round((p.totalCorrect / p.totalAnswered) * 100) }
    })
    .filter(Boolean)

  const weakest   = topicStats.length ? topicStats.reduce((a, b) => a.pct < b.pct ? a : b) : null
  const strongest = topicStats.length ? topicStats.reduce((a, b) => a.pct > b.pct ? a : b) : null

  const s = makeStyles(C)

  function goBack() {
    if (onHome) { onHome(); return }
    if (navigation?.goBack) navigation.goBack()
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <View style={s.topbar}>
        <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Analytics</Text>
        <View style={{ width: 48 }} />
      </View>

      {/* Summary row */}
      <View style={s.statRow}>
        <StatCard C={C} label="Questions" value={totals.answered || '—'} />
        <StatCard C={C} label="Accuracy" value={overallPct != null ? `${overallPct}%` : '—'} highlight={overallPct >= 65} />
        <StatCard C={C} label="Sessions" value={totals.played || '—'} />
        <StatCard C={C} label="Day Streak" value={streak > 0 ? `🔥${streak}` : '—'} />
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
          <Text style={[s.emptyText, { color: C.textMuted }]}>Complete a quiz to see your analytics.</Text>
        </View>
      )}
    </ScrollView>
  )
}

function buildProgress(history) {
  const map = {}
  for (const h of history) {
    const key = h.topic ?? 'All Topics'
    if (!map[key]) map[key] = { totalAnswered: 0, totalCorrect: 0, totalPlayed: 0, highScore: 0 }
    map[key].totalAnswered += h.total ?? 0
    map[key].totalCorrect  += h.correct ?? 0
    map[key].totalPlayed   += 1
    map[key].highScore      = Math.max(map[key].highScore, h.score ?? 0)
  }
  return map
}

function StatCard({ C, label, value, highlight }) {
  const s = makeStyles(C)
  return (
    <View style={[s.statCard, highlight && s.statCardHighlight]}>
      <Text style={[s.statValue, highlight && s.statValueHighlight]}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    scroll: { flex: 1, backgroundColor: C.bg },
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
    emptyText:  { fontSize: 14, textAlign: 'center' },
  })
}
