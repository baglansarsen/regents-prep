import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { TOPICS, TOPIC_ICONS, questions } from '../data/questions'
import { C } from '../theme'

export default function HomeScreen({ onStart, onStudy, masteryPct }) {
  const allTopics = Object.values(TOPICS)

  function MasteryBadge({ topic }) {
    const pct = masteryPct(topic)
    if (pct === null) return null
    const color = pct >= 85 ? C.correct : pct >= 65 ? C.warn : C.wrong
    return (
      <View style={[s.masteryBadge, { backgroundColor: color + '25', borderColor: color }]}>
        <Text style={[s.masteryText, { color }]}>{pct}%</Text>
      </View>
    )
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
      <View style={s.header}>
        <Text style={s.title}>Living{'\n'}Environment</Text>
        <Text style={s.subtitle}>Regents Prep</Text>
        <Text style={s.tagline}>Master every topic. Beat the clock. Ace the exam.</Text>
      </View>

      {/* All Topics */}
      <TouchableOpacity style={s.allCard} onPress={() => onStart(null)} activeOpacity={0.8}>
        <Text style={s.allIcon}>⚡</Text>
        <View style={s.allTextBlock}>
          <Text style={s.allName}>All Topics — Quiz</Text>
          <Text style={s.cardCount}>{questions.length} questions</Text>
        </View>
        <MasteryBadge topic={null} />
        <Text style={s.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.studyAllCard} onPress={() => onStudy(null)} activeOpacity={0.8}>
        <Text style={s.allIcon}>📖</Text>
        <View style={s.allTextBlock}>
          <Text style={s.studyAllName}>All Topics — Study</Text>
          <Text style={s.cardCount}>Flashcard mode · no timer</Text>
        </View>
        <Text style={s.chevron}>›</Text>
      </TouchableOpacity>

      {/* Per-topic grid */}
      <Text style={s.sectionLabel}>BY TOPIC</Text>
      <View style={s.grid}>
        {allTopics.map((topic) => {
          const count = questions.filter((q) => q.topic === topic).length
          const pct = masteryPct(topic)
          return (
            <View key={topic} style={s.topicCard}>
              <View style={s.topicCardHeader}>
                <Text style={s.topicIcon}>{TOPIC_ICONS[topic]}</Text>
                {pct !== null && <MasteryBadge topic={topic} />}
              </View>
              <Text style={s.topicName}>{topic}</Text>
              <Text style={s.cardCount}>{count} questions</Text>
              <View style={s.topicActions}>
                <TouchableOpacity style={s.actionBtn} onPress={() => onStart(topic)} activeOpacity={0.8}>
                  <Text style={s.actionBtnText}>Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.actionBtn, s.actionBtnStudy]} onPress={() => onStudy(topic)} activeOpacity={0.8}>
                  <Text style={[s.actionBtnText, s.actionBtnStudyText]}>Study</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const s = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 24, marginTop: 12 },
  title:    { fontSize: 42, fontWeight: '800', color: C.brandLight, lineHeight: 48 },
  subtitle: { fontSize: 16, fontWeight: '600', color: C.textMuted, marginTop: 4 },
  tagline:  { fontSize: 13, color: C.textMuted, marginTop: 10, lineHeight: 20 },

  allCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.brandDark,
    borderRadius: 14,
    padding: 18,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: C.brand,
    gap: 12,
  },
  studyAllCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: C.surface2,
    gap: 12,
  },
  allIcon: { fontSize: 26 },
  allTextBlock: { flex: 1 },
  allName:     { fontSize: 16, fontWeight: '700', color: C.text },
  studyAllName: { fontSize: 16, fontWeight: '700', color: C.text },
  cardCount: { fontSize: 12, color: C.textMuted, marginTop: 2 },
  chevron:   { fontSize: 22, color: C.textMuted },

  masteryBadge: {
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
  },
  masteryText: { fontSize: 11, fontWeight: '700' },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: C.textMuted,
    letterSpacing: 1,
    marginBottom: 10,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  topicCard: {
    width: '48%',
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: C.surface2,
    gap: 4,
  },
  topicCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  topicIcon: { fontSize: 26 },
  topicName: { fontSize: 13, fontWeight: '700', color: C.text },
  topicActions: { flexDirection: 'row', gap: 6, marginTop: 10 },
  actionBtn: {
    flex: 1,
    backgroundColor: C.brand,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  actionBtnStudy: { backgroundColor: C.surface2 },
  actionBtnText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  actionBtnStudyText: { color: C.text },
})
