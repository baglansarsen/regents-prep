import React, { useState, useEffect } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, ActivityIndicator, Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useTheme } from '../context/ThemeContext'

// Simple school list — can expand later
const NY_SCHOOLS = [
  { id: 'csas', name: 'Corcoran High School - CSAS', district: 'Syracuse City SD' },
  { id: 'corcoran', name: 'Corcoran High School', district: 'Syracuse City SD' },
  { id: 'nottingham', name: 'Nottingham High School', district: 'Syracuse City SD' },
  { id: 'henninger', name: 'Henninger High School', district: 'Syracuse City SD' },
  { id: 'fowler', name: 'Fowler High School', district: 'Syracuse City SD' },
  { id: 'westhill', name: 'West Hill High School', district: 'Syracuse City SD' },
  { id: 'other', name: 'Other / Home School', district: '' },
]

export default function SchoolOnboardingScreen({ navigation }) {
  const { C } = useTheme()
  const [search, setSearch]   = useState('')
  const [loading, setLoading] = useState(false)
  const s = makeStyles(C)

  const user = auth.currentUser
  const firstName = user?.displayName?.split(' ')[0] ?? 'there'

  const filtered = NY_SCHOOLS.filter(sc =>
    sc.name.toLowerCase().includes(search.toLowerCase()) ||
    sc.district.toLowerCase().includes(search.toLowerCase())
  )

  async function selectSchool(school) {
    if (!user) return
    setLoading(true)
    try {
      await setDoc(doc(db, 'users', user.uid, 'meta', 'school'), {
        name: school.name,
        district: school.district,
        setAt: serverTimestamp(),
      })
      // Mirror school name to leaderboard doc so the school leaderboard query works
      await setDoc(doc(db, 'leaderboard', user.uid), { school: school.name }, { merge: true })
      // Navigation is handled by onAuthStateChanged → AppNavigator shows tabs
    } catch (e) {
      Alert.alert('Error', e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Text style={s.emoji}>🏫</Text>
        <Text style={s.title}>Welcome, {firstName}!</Text>
        <Text style={s.subtitle}>Pick your school to join the leaderboard.</Text>
      </View>

      <TextInput
        style={s.search}
        placeholder="Search schools..."
        placeholderTextColor={C.textDim}
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <ActivityIndicator color={C.brand} style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={s.schoolCard} onPress={() => selectSchool(item)}>
              <View>
                <Text style={s.schoolName}>{item.name}</Text>
                {item.district ? <Text style={s.schoolDistrict}>{item.district}</Text> : null}
              </View>
              <Text style={s.arrow}>→</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={s.skipBtn} onPress={() => selectSchool({ name: 'Independent', district: '' })}>
        <Text style={s.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:          { flex: 1, backgroundColor: C.bg },
    header:        { alignItems: 'center', padding: 24, paddingBottom: 16 },
    emoji:         { fontSize: 48 },
    title:         { fontSize: 24, fontWeight: '800', color: C.text, marginTop: 8 },
    subtitle:      { fontSize: 14, color: C.textMuted, marginTop: 4, textAlign: 'center' },
    search:        { margin: 16, marginTop: 8, backgroundColor: C.surface, borderRadius: 12, padding: 12, color: C.text, fontSize: 15, borderWidth: 1, borderColor: C.border },
    schoolCard:    { backgroundColor: C.surface, borderRadius: 14, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: C.border },
    schoolName:    { fontSize: 15, fontWeight: '700', color: C.text },
    schoolDistrict:{ fontSize: 12, color: C.textMuted, marginTop: 2 },
    arrow:         { fontSize: 18, color: C.textMuted },
    skipBtn:       { padding: 20, alignItems: 'center' },
    skipText:      { color: C.textMuted, fontSize: 14 },
  })
}
