import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useSubject } from '../context/SubjectContext'
import { SUBJECT_META } from '../content/subjects'

const SUBJECTS = Object.values(SUBJECT_META)

export default function SubjectOnboardingScreen({ onComplete }) {
  const { C } = useTheme()
  const { setSubject } = useSubject()

  function handlePick(subjectId) {
    setSubject(subjectId)
    onComplete()
  }

  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.emoji}>📚</Text>
        <Text style={s.title}>Which Regents exam are you preparing for?</Text>
        <Text style={s.subtitle}>You can change this any time in your profile.</Text>

        <View style={s.grid}>
          {SUBJECTS.map(({ id, name, icon, color }) => (
            <TouchableOpacity
              key={id}
              style={[s.card, { borderColor: color, backgroundColor: color + '18' }]}
              onPress={() => handlePick(id)}
              activeOpacity={0.75}
            >
              <Text style={s.cardIcon}>{icon}</Text>
              <Text style={s.cardName}>{name}{'\n'}Regents</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:     { flex: 1, backgroundColor: C.bg },
    scroll:   { padding: 24, alignItems: 'center', paddingBottom: 48 },
    emoji:    { fontSize: 52, marginBottom: 12 },
    title:    { fontSize: 20, fontWeight: '800', color: C.text, textAlign: 'center', lineHeight: 28, marginBottom: 8 },
    subtitle: { fontSize: 14, color: C.textMuted, textAlign: 'center', marginBottom: 28 },
    grid:     { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', width: '100%' },
    card:     {
      width: '46%',
      borderWidth: 2,
      borderRadius: 16,
      padding: 18,
      alignItems: 'center',
      gap: 8,
    },
    cardIcon: { fontSize: 36 },
    cardName: { fontSize: 13, fontWeight: '700', color: C.text, textAlign: 'center', lineHeight: 19 },
  })
}
