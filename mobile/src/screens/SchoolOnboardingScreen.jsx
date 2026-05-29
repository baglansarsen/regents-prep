import React, { useState, useMemo, useCallback } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  ScrollView, StyleSheet, ActivityIndicator, Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
let Location = null
try { Location = require('expo-location') } catch (_) {}
import { db, auth } from '../firebase'
import { useTheme } from '../context/ThemeContext'
import { NY_SCHOOLS, getSchoolsSortedByDistance, distanceMi } from '../../../src/data/schools'

const TYPE_FILTERS = [
  { key: null,      label: 'All',     emoji: '🏫' },
  { key: 'public',  label: 'Public',  emoji: '🏛' },
  { key: 'private', label: 'Private', emoji: '🎓' },
  { key: 'charter', label: 'Charter', emoji: '⭐' },
]

const TYPE_COLORS = {
  public:  '#16a34a',
  private: '#9333ea',
  charter: '#d97706',
}

export default function SchoolOnboardingScreen({ navigation, onComplete }) {
  const { C } = useTheme()
  const [search,       setSearch]       = useState('')
  const [typeFilter,   setTypeFilter]   = useState(null)
  const [loading,      setLoading]      = useState(false)
  const [locLoading,   setLocLoading]   = useState(false)
  const [userLocation, setUserLocation] = useState(null)  // { lat, lng }
  const [nearby,       setNearby]       = useState([])

  const user = auth.currentUser
  const firstName = user?.displayName?.split(' ')[0] ?? 'there'

  const filtered = useMemo(() => {
    let list = NY_SCHOOLS
    if (typeFilter) list = list.filter(s => s.type === typeFilter)
    if (search)     list = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.borough.toLowerCase().includes(search.toLowerCase()))
    return list
  }, [typeFilter, search])

  const handleLocate = useCallback(async () => {
    setLocLoading(true)
    if (Location) {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert('Location Denied', 'Enable location in Settings to find nearby schools.')
          setLocLoading(false)
          return
        }
        const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
        const loc = { lat: coords.latitude, lng: coords.longitude }
        setUserLocation(loc)
        setNearby(getSchoolsSortedByDistance(loc.lat, loc.lng, 6))
      } catch {
        Alert.alert('Location Error', 'Could not get your location. Search manually below.')
      }
      setLocLoading(false)
    } else if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude }
          setUserLocation(loc)
          setNearby(getSchoolsSortedByDistance(loc.lat, loc.lng, 6))
          setLocLoading(false)
        },
        () => {
          Alert.alert('Location Denied', 'Enable location in Settings to find nearby schools.')
          setLocLoading(false)
        },
        { enableHighAccuracy: false, timeout: 10000 }
      )
      // setLocLoading(false) is called inside the callbacks above
    } else {
      Alert.alert('Not Available', 'Location is not supported on this device. Search manually.')
      setLocLoading(false)
    }
  }, [])

  async function selectSchool(school) {
    if (!user) { onComplete?.(); return }
    setLoading(true)
    try {
      await setDoc(doc(db, 'users', user.uid, 'meta', 'school'), {
        name:     school.name,
        district: school.borough ?? '',
        type:     school.type ?? 'public',
        setAt:    serverTimestamp(),
      })
      await setDoc(doc(db, 'leaderboard', user.uid), { school: school.name }, { merge: true })
      onComplete?.()
    } catch (e) {
      Alert.alert('Error', e.message)
      onComplete?.()   // still advance even on error so user isn't stuck
    } finally {
      setLoading(false)
    }
  }

  const s = makeStyles(C)

  if (loading) {
    return (
      <SafeAreaView style={[s.safe, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color={C.brand} size="large" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.emoji}>🏫</Text>
        <Text style={s.title}>Welcome, {firstName}!</Text>
        <Text style={s.subtitle}>Pick your school to join the leaderboard.</Text>
      </View>

      {/* GPS locate button */}
      {!userLocation && (
        <TouchableOpacity style={s.locateBtn} onPress={handleLocate} disabled={locLoading}>
          {locLoading
            ? <ActivityIndicator color={C.brand} size="small" />
            : <Text style={s.locateBtnText}>📍  Find Schools Near Me</Text>
          }
        </TouchableOpacity>
      )}

      {/* Nearby schools */}
      {nearby.length > 0 && (
        <View style={s.nearbySection}>
          <Text style={s.nearbyLabel}>📍 Near You</Text>
          {nearby.map(school => {
            const mi = distanceMi(userLocation.lat, userLocation.lng, school.lat, school.lng)
            return (
              <TouchableOpacity key={school.id} style={s.nearbyCard} onPress={() => selectSchool(school)}>
                <View style={{ flex: 1 }}>
                  <Text style={s.nearbyName}>{school.name}</Text>
                  <Text style={s.nearbyMeta}>
                    {school.borough}
                    <Text style={{ color: TYPE_COLORS[school.type] ?? '#6b7280' }}> · {school.type}</Text>
                  </Text>
                </View>
                <Text style={s.nearbyDist}>~{mi.toFixed(1)} mi</Text>
              </TouchableOpacity>
            )
          })}
          <TouchableOpacity onPress={() => { setUserLocation(null); setNearby([]) }}>
            <Text style={s.clearLoc}>Clear location</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Search */}
      <TextInput
        style={s.search}
        placeholder="Search schools…"
        placeholderTextColor={C.textDim}
        value={search}
        onChangeText={setSearch}
      />

      {/* Type filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.typeRow} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
        {TYPE_FILTERS.map(({ key, label, emoji }) => (
          <TouchableOpacity
            key={key ?? 'all'}
            style={[s.typeChip, typeFilter === key && s.typeChipActive]}
            onPress={() => setTypeFilter(typeFilter === key ? null : key)}
          >
            <Text style={[s.typeChipText, typeFilter === key && s.typeChipTextActive]}>
              {emoji} {label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Full school list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, gap: 10, paddingTop: 8 }}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          const typeColor = TYPE_COLORS[item.type] ?? '#6b7280'
          return (
            <TouchableOpacity style={s.schoolCard} onPress={() => selectSchool(item)}>
              <View style={{ flex: 1 }}>
                <Text style={s.schoolName}>{item.name}</Text>
                <View style={s.schoolMeta}>
                  <Text style={s.schoolBorough}>{item.borough}</Text>
                  <View style={[s.typeBadge, { backgroundColor: typeColor + '33' }]}>
                    <Text style={[s.typeBadgeText, { color: typeColor }]}>
                      {item.type === 'public' ? 'Public' : item.type === 'private' ? 'Private' : 'Charter'}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={s.arrow}>›</Text>
            </TouchableOpacity>
          )
        }}
        ListEmptyComponent={<Text style={s.empty}>No schools match.</Text>}
      />

      <TouchableOpacity style={s.skipBtn} onPress={() => selectSchool({ name: 'Independent', borough: '', type: 'public' })}>
        <Text style={s.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:     { flex: 1, backgroundColor: C.bg },
    header:   { alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 12 },
    emoji:    { fontSize: 44 },
    title:    { fontSize: 22, fontWeight: '800', color: C.text, marginTop: 6 },
    subtitle: { fontSize: 14, color: C.textMuted, marginTop: 4, textAlign: 'center' },

    locateBtn: {
      marginHorizontal: 16, marginBottom: 10, padding: 13,
      borderRadius: 12, borderWidth: 1.5, borderStyle: 'dashed',
      borderColor: C.brand, alignItems: 'center',
      backgroundColor: C.brand + '12',
    },
    locateBtnText: { color: C.brand, fontWeight: '700', fontSize: 15 },

    nearbySection: { marginHorizontal: 16, marginBottom: 8 },
    nearbyLabel:   { fontSize: 12, fontWeight: '700', color: C.brand, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
    nearbyCard:    {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: C.brand + '14', borderRadius: 10,
      padding: 12, marginBottom: 6,
      borderWidth: 1, borderColor: C.brand + '30',
    },
    nearbyName:    { fontSize: 14, fontWeight: '700', color: C.text },
    nearbyMeta:    { fontSize: 12, color: C.textMuted, marginTop: 2 },
    nearbyDist:    { fontSize: 13, fontWeight: '700', color: C.brand, marginLeft: 8 },
    clearLoc:      { fontSize: 12, color: C.textMuted, textAlign: 'center', marginTop: 4, paddingVertical: 4 },

    search:   {
      marginHorizontal: 16, marginBottom: 8, backgroundColor: C.surface,
      borderRadius: 12, padding: 12, color: C.text, fontSize: 15,
      borderWidth: 1, borderColor: C.border,
    },

    typeRow:   { flexGrow: 0, marginBottom: 8, height: 44 },
    typeChip:  {
      paddingHorizontal: 14, paddingVertical: 7, borderRadius: 99,
      backgroundColor: C.surface2, borderWidth: 1.5, borderColor: C.surface3,
    },
    typeChipActive:     { backgroundColor: C.brand, borderColor: C.brand },
    typeChipText:       { fontSize: 13, fontWeight: '700', color: C.text },
    typeChipTextActive: { color: '#fff' },

    schoolCard:   {
      backgroundColor: C.surface, borderRadius: 14, padding: 14,
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      borderWidth: 1, borderColor: C.border,
    },
    schoolName:   { fontSize: 15, fontWeight: '700', color: C.text },
    schoolMeta:   { flexDirection: 'row', alignItems: 'center', marginTop: 3, gap: 6 },
    schoolBorough:{ fontSize: 12, color: C.textMuted },
    typeBadge:    { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 99 },
    typeBadgeText:{ fontSize: 11, fontWeight: '700' },
    arrow:        { fontSize: 18, color: C.textMuted },

    empty:   { textAlign: 'center', color: C.textMuted, padding: 32 },
    skipBtn: { padding: 20, alignItems: 'center' },
    skipText:{ color: C.textMuted, fontSize: 14 },
  })
}
