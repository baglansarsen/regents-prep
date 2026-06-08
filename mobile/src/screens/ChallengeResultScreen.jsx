import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'

export default function ChallengeResultScreen({ route, navigation }) {
  const { friendName, score, friendScore } = route.params ?? {}
  const { C } = useTheme()
  const s = makeStyles(C)

  const pending = friendScore === null || friendScore === undefined
  const won = !pending && score > friendScore
  const tied = !pending && score === friendScore

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <View style={s.center}>
        <Text style={s.emoji}>{pending ? '⏳' : won ? '🏆' : tied ? '🤝' : '😤'}</Text>
        <Text style={s.title}>
          {pending ? 'Waiting...' : won ? 'You Won!' : tied ? "It's a Tie!" : 'They Won'}
        </Text>
        <View style={s.scores}>
          <View style={s.scoreBox}>
            <Text style={s.scoreName}>You</Text>
            <Text style={s.scoreNum}>{score}</Text>
          </View>
          <Text style={s.vs}>vs</Text>
          <View style={s.scoreBox}>
            <Text style={s.scoreName}>{friendName}</Text>
            <Text style={s.scoreNum}>{pending ? '?' : friendScore}</Text>
          </View>
        </View>
        {pending && <Text style={s.pendingNote}>Waiting for {friendName} to finish their round...</Text>}
        <TouchableOpacity style={s.homeBtn} onPress={() => navigation.navigate('Friends')}>
          <Text style={s.homeBtnText}>Back to Friends</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:        { flex: 1, backgroundColor: C.bg },
    center:      { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, gap: 20 },
    emoji:       { fontSize: 72 },
    title:       { fontSize: 28, fontWeight: '900', color: C.text },
    scores:      { flexDirection: 'row', alignItems: 'center', gap: 24 },
    scoreBox:    { alignItems: 'center', gap: 4 },
    scoreName:   { fontSize: 14, color: C.textMuted, fontWeight: '600' },
    scoreNum:    { fontSize: 40, fontWeight: '900', color: C.brand },
    vs:          { fontSize: 18, color: C.textDim, fontWeight: '700' },
    pendingNote: { fontSize: 14, color: C.textMuted, textAlign: 'center' },
    homeBtn:     { backgroundColor: C.brand, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 14 },
    homeBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  })
}
