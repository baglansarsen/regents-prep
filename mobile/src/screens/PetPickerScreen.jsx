import React, { useState } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { usePetContext } from '../context/PetContext'
import { PETS, DEFAULT_NAMES } from '../data/petConfig'
import { T, duoBtn, cardShadow } from '../styles/duo'

export function petChosenKey(uid) {
  return `@petChosen_v1_${uid}`
}

function randomName() {
  return DEFAULT_NAMES[Math.floor(Math.random() * DEFAULT_NAMES.length)]
}

export default function PetPickerScreen({ onComplete }) {
  const { C }               = useTheme()
  const { user }            = useAuthContext()
  const { initializePet }   = usePetContext()

  const [selectedId, setSelectedId] = useState(null)
  const [loading,    setLoading]    = useState(false)
  const s = makeStyles(C)

  async function confirm() {
    if (!selectedId || !user?.uid) return
    setLoading(true)
    const name = randomName()
    await initializePet(selectedId, name)
    await AsyncStorage.setItem(petChosenKey(user.uid), 'true').catch(() => {})
    onComplete()
  }

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <Text style={[T.h1, { color: C.text, textAlign: 'center' }]}>
            Choose Your{'\n'}StudyBuddy 🐾
          </Text>
          <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 8, lineHeight: 22 }]}>
            Your companion lives on your home screen,{'\n'}reacts to your study sessions, and evolves{'\n'}as you earn XP.
          </Text>
        </View>

        {/* Pet grid */}
        <View style={s.grid}>
          {PETS.map((p) => {
            const isSelected = selectedId === p.id
            return (
              <TouchableOpacity
                key={p.id}
                style={[s.card, cardShadow(C.shadow), isSelected && s.cardSelected]}
                onPress={() => setSelectedId(p.id)}
                activeOpacity={0.85}
              >
                <Text style={s.petEmoji}>{p.emoji}</Text>
                <Text style={[T.h3, { color: C.text, textAlign: 'center' }]}>{p.name}</Text>
                <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginTop: 4, lineHeight: 17 }]}>
                  {p.tagline}
                </Text>
                {isSelected && (
                  <View style={[s.selectedBadge, { backgroundColor: C.brand }]}>
                    <Text style={[T.label, { color: '#fff', textTransform: 'none', letterSpacing: 0 }]}>✓ Selected</Text>
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Confirm */}
        <View style={{ marginHorizontal: 24, marginTop: 8 }}>
          <TouchableOpacity
            style={[duoBtn(C.brand, C.brandDark), !selectedId && { opacity: 0.45 }]}
            onPress={confirm}
            disabled={!selectedId || loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={[T.btn, { color: '#fff' }]}>
                {selectedId ? `CHOOSE ${PETS.find((p) => p.id === selectedId)?.name?.toUpperCase()}` : 'SELECT A PET'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={[T.small, { color: C.textDim, textAlign: 'center', marginTop: 16, lineHeight: 18 }]}>
          You can rename your pet later in the Pet Shop.
        </Text>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:   { flex: 1, backgroundColor: C.bg },
    scroll: { paddingBottom: 24 },
    header: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 20, alignItems: 'center' },
    grid:   {
      flexDirection:    'row',
      flexWrap:         'wrap',
      marginHorizontal: 16,
      gap:              12,
      marginBottom:     20,
    },
    card: {
      width:           '47%',
      backgroundColor: C.surface,
      borderRadius:    20,
      padding:         18,
      alignItems:      'center',
      borderWidth:     2,
      borderColor:     C.border,
      position:        'relative',
      minHeight:       160,
    },
    cardSelected: {
      borderColor: C.brand,
      backgroundColor: C.brandBg,
    },
    petEmoji: { fontSize: 48, marginBottom: 8 },
    selectedBadge: {
      position:         'absolute',
      top:              -1,
      right:            -1,
      borderTopRightRadius: 18,
      borderBottomLeftRadius: 10,
      paddingHorizontal: 10,
      paddingVertical:   4,
    },
  })
}
