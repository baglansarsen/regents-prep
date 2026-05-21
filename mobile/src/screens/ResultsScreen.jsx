import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'

export default function ResultsScreen({ route, navigation }) {
  const { score, total, results, bestStreak, topic, subject, xpEarned } = route.params
  const { C } = useTheme()
  const s = makeStyles(C)

  const correct  = results.filter((r) => r.correct).length
  const pct      = Math.round((correct / total) * 100)
  const passed   = pct >= 65
  const mastered = pct >= 85

  const statusColor = mastered ? C.correct : passed ? C.warn : C.wrong
  const statusLabel = mastered ? '🏆 Mastered!' : passed ? '✅ Passed' : '📚 Keep Studying'

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={s.scroll}>
        <View style={[s.scoreCircle, { borderColor: statusColor }]}>
          <Text style={[s.scorePct, { color: statusColor }]}>{pct}%</Text>
          <Text style={s.scoreLabel}>{correct}/{total}</Text>
        </View>
        <Text style={[s.status, { color: statusColor }]}>{statusLabel}</Text>
        {xpEarned > 0 && (
          <View style={s.xpBanner}><Text style={s.xpBannerText}>⭐ +{xpEarned} XP earned</Text></View>
        )}
        {bestStreak >= 3 && (
          <View style={s.streakBanner}><Text style={s.streakBannerText}>🔥 Best streak: {bestStreak} in a row!</Text></View>
        )}
        <Text style={s.sectionTitle}>Review</Text>
        {results.map((r, i) => (
          <View key={i} style={[s.resultRow, { borderColor: r.correct ? C.correct : C.wrong }]}>
            <Text style={s.resultNum}>{i + 1}</Text>
            <View style={s.resultBody}>
              <Text style={s.resultQ} numberOfLines={2}>{r.question?.text}</Text>
              {!r.correct && r.question && (
                <Text style={s.resultAnswer}>
                  ✓ {r.question.choices?.[r.question.correct ?? r.question.correctIndex]}
                </Text>
              )}
            </View>
            <Text style={{ fontSize: 18 }}>{r.correct ? '✅' : '❌'}</Text>
          </View>
        ))}
        <View style={s.actions}>
          <TouchableOpacity
            style={[s.btn, { backgroundColor: C.brand }]}
            onPress={() => navigation.navigate('Quiz', {
              questionSet: results.map(r => r.question).sort(() => Math.random() - 0.5),
              topic,
              subject,
            })}
          >
            <Text style={s.btnText}>🔄 Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.btn, { backgroundColor: C.surface, borderWidth: 1, borderColor: C.border }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={[s.btnText, { color: C.text }]}>🏠 Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:             { flex: 1, backgroundColor: C.bg },
    scroll:           { padding: 20, alignItems: 'center', gap: 12 },
    scoreCircle:      { width: 140, height: 140, borderRadius: 70, borderWidth: 4, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
    scorePct:         { fontSize: 40, fontWeight: '900' },
    scoreLabel:       { fontSize: 16, color: C.textMuted, fontWeight: '600' },
    status:           { fontSize: 22, fontWeight: '800' },
    xpBanner:         { backgroundColor: '#f59e0b20', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: '#f59e0b50' },
    xpBannerText:     { color: C.warn, fontWeight: '700', fontSize: 15 },
    streakBanner:     { backgroundColor: C.wrongBg, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 8 },
    streakBannerText: { color: C.wrong, fontWeight: '700', fontSize: 14 },
    sectionTitle:     { alignSelf: 'flex-start', fontSize: 17, fontWeight: '800', color: C.text, marginTop: 8 },
    resultRow:        { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: C.surface, borderRadius: 12, padding: 12, borderLeftWidth: 3 },
    resultNum:        { fontSize: 13, fontWeight: '800', color: C.textMuted, width: 20 },
    resultBody:       { flex: 1, gap: 4 },
    resultQ:          { fontSize: 13, color: C.text, lineHeight: 18 },
    resultAnswer:     { fontSize: 12, color: C.correct, fontWeight: '600' },
    actions:          { alignSelf: 'stretch', flexDirection: 'row', gap: 12, marginTop: 16 },
    btn:              { flex: 1, padding: 16, borderRadius: 14, alignItems: 'center' },
    btnText:          { fontSize: 15, fontWeight: '700', color: '#fff' },
  })
}
