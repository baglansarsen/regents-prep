import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { usePetContext } from '../context/PetContext'
import { useRP } from '../hooks/useRP'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { FOOD_ITEMS } from '../data/petConfig'
import PetWidget from '../components/PetWidget'
import PetStatusBars from '../components/PetStatusBars'
import PetTriviaCard from '../components/PetTriviaCard'
import { T, duoBtn, cardShadow } from '../styles/duo'

/**
 * PetScreen — the dedicated "buddy" hub. Pulled out of HomeScreen so the home
 * screen can stay focused on units and lessons. Holds the pet visual, its
 * message, status bars, the daily dig, a shortcut to the shop, and trivia.
 */
export default function PetScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const { earnRP } = useRP(user?.uid)
  const { streak, studiedToday } = useDailyStreak()
  const { pet, getPetMessage, dailyDig } = usePetContext()
  const [digReward, setDigReward] = useState(null)
  const s = makeStyles(C)

  async function handleDig() {
    const result = await dailyDig()
    if (!result.ok) {
      setDigReward(`${pet.name ?? 'Your buddy'} already dug today — come back tomorrow!`)
      setTimeout(() => setDigReward(null), 3000)
      return
    }
    if (result.type === 'xp') await earnRP(result.amount)
    const label = result.type === 'xp'
      ? `${pet.name} found ⭐ ${result.amount} RP!`
      : `${pet.name} dug up a ${FOOD_ITEMS.find((f) => f.id === result.itemId)?.icon ?? '🎁'}!`
    setDigReward(label)
    setTimeout(() => setDigReward(null), 3000)
  }

  const msg = pet.chosen ? getPetMessage({ streak, daysSince: studiedToday ? 0 : 1 }) : null

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={[T.body, { color: C.text }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[T.h2, { color: C.text }]}>{pet.name ?? 'Your Buddy'}</Text>
        <View style={{ width: 60 }} />
      </View>

      {!pet.chosen ? (
        <View style={s.empty}>
          <Text style={{ fontSize: 56, marginBottom: 12 }}>🐣</Text>
          <Text style={[T.h3, { color: C.text, textAlign: 'center' }]}>You don't have a buddy yet</Text>
          <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginTop: 6, marginBottom: 20 }]}>
            Pick a study buddy to keep you company while you practice.
          </Text>
          <TouchableOpacity style={duoBtn(C.brand, C.brandDark)} onPress={() => navigation.navigate('PetShop')}>
            <Text style={[T.btn, { color: '#fff' }]}>Choose a buddy</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          <View style={s.hero}>
            <PetWidget size={140} />
            {msg && (
              <View style={[s.petMsgBubble, { backgroundColor: C.surface, borderColor: C.border }]}>
                <Text style={[T.body, { color: C.text, textAlign: 'center' }]}>{msg}</Text>
              </View>
            )}
          </View>

          <PetStatusBars />

          <View style={s.actionRow}>
            <TouchableOpacity
              style={[s.actionBtn, { backgroundColor: C.surface, borderColor: C.border }]}
              onPress={handleDig}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 20 }}>🐾</Text>
              <Text style={[T.btn, { color: C.text, fontSize: 13 }]}>Let {pet.name} dig!</Text>
              <Text style={[T.small, { color: C.textMuted }]}>once/day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[s.actionBtn, { backgroundColor: C.surface, borderColor: C.border }]}
              onPress={() => navigation.navigate('PetShop')}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 20 }}>🛍</Text>
              <Text style={[T.btn, { color: C.text, fontSize: 13 }]}>Shop</Text>
            </TouchableOpacity>
          </View>

          {digReward && (
            <View style={[s.digRewardBanner, { backgroundColor: C.brandBg, borderColor: C.brand }]}>
              <Text style={[T.body, { color: C.brand, textAlign: 'center' }]}>{digReward}</Text>
            </View>
          )}

          <PetTriviaCard />

          <View style={{ height: 32 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:   { flex: 1, backgroundColor: C.bg },
    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 16, paddingVertical: 14,
    },
    backBtn: { paddingVertical: 6, paddingRight: 12 },
    scroll:  { paddingBottom: 24 },

    empty:   { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },

    hero:    { alignItems: 'center', paddingVertical: 16 },
    petMsgBubble: {
      marginTop: 14, marginHorizontal: 24,
      borderRadius: 16, borderWidth: 1.5, padding: 14, maxWidth: '85%',
    },

    actionRow: { flexDirection: 'row', marginHorizontal: 16, marginTop: 16, gap: 10 },
    actionBtn: {
      flex: 1, alignItems: 'center', gap: 2,
      borderRadius: 16, borderWidth: 1.5, paddingVertical: 14,
    },
    digRewardBanner: {
      marginHorizontal: 16, marginTop: 12,
      borderRadius: 14, borderWidth: 1.5, padding: 14,
    },
  })
}
