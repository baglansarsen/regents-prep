import { View, Text, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native'
import { TOPICS, TOPIC_ICONS, questions } from '../data/questions'
import { C } from '../theme'

export default function HomeScreen({ onStart, onStudy, onPracticeTest, onAnalytics, masteryPct, streak, notificationsEnabled, onToggleNotifications }) {
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

      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.title}>Living{'\n'}Environment</Text>
          <Text style={s.subtitle}>Regents Prep</Text>
        </View>
        {streak > 0 && (
          <View style={s.streakBadge}>
            <Text style={s.streakFire}>🔥</Text>
            <Text style={s.streakNum}>{streak}</Text>
            <Text style={s.streakLabel}>day streak</Text>
          </View>
        )}
      </View>

      {/* Quick actions */}
      <View style={s.quickRow}>
        <TouchableOpacity style={s.practiceBtn} onPress={onPracticeTest} activeOpacity={0.85}>
          <Text style={s.practiceIcon}>📝</Text>
          <Text style={s.practiceName}>Practice Test</Text>
          <Text style={s.practiceCount}>{questions.length} questions · timed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.analyticsBtn} onPress={onAnalytics} activeOpacity={0.85}>
          <Text style={s.analyticsIcon}>📊</Text>
          <Text style={s.analyticsName}>Analytics</Text>
        </TouchableOpacity>
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
          <Text style={s.allName}>All Topics — Study</Text>
          <Text style={s.cardCount}>Flashcard mode · no timer</Text>
        </View>
        <Text style={s.chevron}>›</Text>
      </TouchableOpacity>

      {/* Per-topic grid */}
      <Text style={s.sectionLabel}>BY TOPIC</Text>
      <View style={s.grid}>
        {allTopics.map((topic) => {
          const count = questions.filter((q) => q.topic === topic).length
          return (
            <View key={topic} style={s.topicCard}>
              <View style={s.topicCardHeader}>
                <Text style={s.topicIcon}>{TOPIC_ICONS[topic]}</Text>
                <MasteryBadge topic={topic} />
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

      {/* Reminder toggle */}
      <View style={s.reminderRow}>
        <View>
          <Text style={s.reminderTitle}>Daily Reminder</Text>
          <Text style={s.reminderSub}>7:00 PM · keep your streak alive</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={onToggleNotifications}
          trackColor={{ false: C.surface2, true: C.brand }}
          thumbColor="#fff"
        />
      </View>
    </ScrollView>
  )
}

const s = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, marginTop: 8 },
  title:    { fontSize: 36, fontWeight: '800', color: C.brandLight, lineHeight: 42 },
  subtitle: { fontSize: 14, fontWeight: '600', color: C.textMuted, marginTop: 2 },

  streakBadge: { alignItems: 'center', backgroundColor: C.surface, borderRadius: 14, padding: 12, borderWidth: 1, borderColor: C.surface2 },
  streakFire: { fontSize: 24 },
  streakNum:  { fontSize: 22, fontWeight: '900', color: C.text },
  streakLabel:{ fontSize: 10, color: C.textMuted, fontWeight: '600' },

  quickRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  practiceBtn: {
    flex: 2, backgroundColor: '#1e3a5f', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: '#2d5a9e',
  },
  practiceIcon:  { fontSize: 24, marginBottom: 4 },
  practiceName:  { fontSize: 15, fontWeight: '700', color: C.text },
  practiceCount: { fontSize: 11, color: C.textMuted, marginTop: 2 },
  analyticsBtn: {
    flex: 1, backgroundColor: C.surface, borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: C.surface2, alignItems: 'center', justifyContent: 'center',
  },
  analyticsIcon: { fontSize: 28, marginBottom: 4 },
  analyticsName: { fontSize: 12, fontWeight: '700', color: C.text },

  allCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.brandDark, borderRadius: 14, padding: 18,
    marginBottom: 8, borderWidth: 1, borderColor: C.brand, gap: 12,
  },
  studyAllCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.surface, borderRadius: 14, padding: 18,
    marginBottom: 20, borderWidth: 1, borderColor: C.surface2, gap: 12,
  },
  allIcon: { fontSize: 24 },
  allTextBlock: { flex: 1 },
  allName:   { fontSize: 15, fontWeight: '700', color: C.text },
  cardCount: { fontSize: 12, color: C.textMuted, marginTop: 2 },
  chevron:   { fontSize: 20, color: C.textMuted },

  masteryBadge: { borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1 },
  masteryText:  { fontSize: 11, fontWeight: '700' },

  sectionLabel: { fontSize: 11, fontWeight: '700', color: C.textMuted, letterSpacing: 1, marginBottom: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  topicCard: {
    width: '48%', backgroundColor: C.surface, borderRadius: 14,
    padding: 16, borderWidth: 1, borderColor: C.surface2, gap: 4,
  },
  topicCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  topicIcon: { fontSize: 24 },
  topicName: { fontSize: 13, fontWeight: '700', color: C.text },
  topicActions: { flexDirection: 'row', gap: 6, marginTop: 10 },
  actionBtn: { flex: 1, backgroundColor: C.brand, borderRadius: 8, padding: 8, alignItems: 'center' },
  actionBtnStudy: { backgroundColor: C.surface2 },
  actionBtnText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  actionBtnStudyText: { color: C.text },

  reminderRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: C.surface, borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: C.surface2, marginTop: 20,
  },
  reminderTitle: { fontSize: 14, fontWeight: '700', color: C.text },
  reminderSub:   { fontSize: 12, color: C.textMuted, marginTop: 2 },
})
