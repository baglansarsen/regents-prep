import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'

// Simplified challenge screen — starts a 10-question quiz vs a friend
export default function ChallengeScreen({ route, navigation }) {
  const { friendUid, friendName } = route.params ?? {}
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <View style={s.center}>
        <Text style={s.emoji}>⚔️</Text>
        <Text style={s.title}>Challenge</Text>
        <Text style={s.subtitle}>vs {friendName ?? 'Friend'}</Text>
        <Text style={s.desc}>
          Answer 10 random questions as fast as possible.{'\n'}
          Your scores will be compared when both finish!
        </Text>
        <TouchableOpacity
          style={s.startBtn}
          onPress={() => {
            // Navigate to Quiz with challenge mode params
            navigation.navigate('ChallengeResult', { friendName, score: 0, friendScore: null })
          }}
        >
          <Text style={s.startBtnText}>Start Challenge 🚀</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:        { flex: 1, backgroundColor: C.bg },
    center:      { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, gap: 16 },
    emoji:       { fontSize: 64 },
    title:       { fontSize: 28, fontWeight: '900', color: C.text },
    subtitle:    { fontSize: 18, color: C.textMuted },
    desc:        { fontSize: 15, color: C.textMuted, textAlign: 'center', lineHeight: 22 },
    startBtn:    { backgroundColor: C.brand, borderRadius: 16, paddingHorizontal: 32, paddingVertical: 16, marginTop: 8 },
    startBtnText:{ color: '#fff', fontWeight: '800', fontSize: 18 },
    cancelText:  { color: C.textMuted, fontSize: 14, marginTop: 8 },
  })
}
