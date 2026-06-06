import React, { useState } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  TextInput, Alert, ActivityIndicator,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { usePetContext } from '../context/PetContext'
import { useSpeechContext } from '../context/SpeechContext'
import { useRP } from '../hooks/useRP'
import { FOOD_ITEMS, HAPPINESS_ITEMS, COSMETICS, PETS } from '../data/petConfig'
import { T, duoBtn, cardShadow, pillTab } from '../styles/duo'

const TABS = ['Food', 'Play', 'Cosmetics', 'Rename', 'Switch']

export default function PetShopScreen({ navigation }) {
  const { C }              = useTheme()
  const { user }           = useAuthContext()
  const { pet, inventory, feedPet, playWithPet, addInventory, toggleCosmetic, renamePet, switchBuddy } = usePetContext()
  const { xp, spendXP }   = useRP(user?.uid)
  const { say }           = useSpeechContext()

  const insets = useSafeAreaInsets()
  const [tab,           setTab]          = useState(0)
  const [nameInput,     setNameInput]    = useState(pet.name ?? '')
  const [switchTarget,  setSwitchTarget] = useState(null)
  const [switching,     setSwitching]    = useState(false)
  const s = makeStyles(C)

  async function handleBuyItem(item) {
    const ok = await spendXP(item.cost)
    if (!ok) {
      Alert.alert('Not enough XP!', `You need ${item.cost} ⭐ XP. You have ${xp}.`)
      return
    }
    await addInventory(item.id, 1)
    Alert.alert('Purchased! 🎉', `${item.icon} ${item.name} added to your inventory.`)
  }

  async function handleBuyCosmetic(item) {
    const owned = (inventory[item.id] ?? 0) > 0
    if (owned) {
      await toggleCosmetic(item.id)
      return
    }
    const ok = await spendXP(item.cost)
    if (!ok) {
      Alert.alert('Not enough XP!', `You need ${item.cost} ⭐ XP. You have ${xp}.`)
      return
    }
    await addInventory(item.id, 1)
    await toggleCosmetic(item.id)
    Alert.alert('Equipped! ✨', `${item.icon} ${item.name} is now on ${pet.name ?? 'your pet'}.`)
  }

  async function handleRename() {
    const trimmed = nameInput.trim()
    if (!trimmed) return
    if (trimmed === pet.name) { Alert.alert('Same name!', 'Choose a different name.'); return }
    const ok = await spendXP(150)
    if (!ok) { Alert.alert('Not enough XP!', `Renaming costs 150 ⭐ XP. You have ${xp}.`); return }
    await renamePet(trimmed)
    Alert.alert('Renamed! 🏷️', `Your pet is now called ${trimmed}!`)
  }

  async function handleSwitchBuddy() {
    if (!switchTarget || switchTarget === pet.petType) return
    const target = PETS.find((p) => p.id === switchTarget)
    Alert.alert(
      `Switch to ${target?.name}?`,
      `${pet.name} will become a ${target?.name}.\nHunger, happiness & accessories reset to full — your name stays.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Switch',
          style: 'destructive',
          onPress: async () => {
            setSwitching(true)
            await switchBuddy(switchTarget)
            setSwitching(false)
            setSwitchTarget(null)
            Alert.alert('Buddy switched! 🎉', `${pet.name} is now a ${target?.name}. Full energy restored!`)
          },
        },
      ],
    )
  }

  function renderSwitchTab() {
    const PET_ICON_PLACEHOLDERS = {
      dog:    null,
      cat:    null,
      parrot: null,
      rabbit: null,
    }
    const anyIconReady = Object.values(PET_ICON_PLACEHOLDERS).some(Boolean)

    return (
      <View style={s.switchContainer}>
        {/* Icon suggestion card */}
        <View style={[s.iconSuggestionCard, { backgroundColor: C.surface2, borderColor: C.brand + '55' }]}>
          <Text style={s.iconSuggestionEmoji}>🎨</Text>
          <View style={{ flex: 1 }}>
            <Text style={[T.h3, { color: C.text }]}>Match Your App Icon</Text>
            <Text style={[T.small, { color: C.textMuted, marginTop: 3, lineHeight: 17 }]}>
              {anyIconReady
                ? `Set your home screen icon to match ${pet.name}!`
                : `Per-buddy icons are in the works.\nSwitch your buddy now — icons drop soon! 🐾`}
            </Text>
          </View>
          {anyIconReady && (
            <TouchableOpacity
              style={[duoBtn(C.brand, C.brandDark, { paddingVertical: 8, paddingHorizontal: 14 })]}
              onPress={() => {
                // TODO: call setAppIcon(pet.petType) once icon assets are added
                Alert.alert('Coming Soon', 'Per-buddy app icons are on the way!')
              }}
            >
              <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>SET ICON</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Pet picker grid */}
        <Text style={[T.label, { color: C.textMuted, marginBottom: 10 }]}>Choose a new buddy</Text>
        <View style={s.switchGrid}>
          {PETS.map((p) => {
            const isCurrent  = p.id === pet.petType
            const isSelected = p.id === switchTarget
            return (
              <TouchableOpacity
                key={p.id}
                style={[
                  s.switchCard,
                  cardShadow(C.shadow),
                  isCurrent  && { borderColor: C.brand,       backgroundColor: C.brandBg },
                  isSelected && { borderColor: '#F59E0B',     backgroundColor: '#F59E0B22' },
                ]}
                onPress={() => setSwitchTarget(isCurrent ? null : p.id)}
                activeOpacity={0.85}
              >
                <Text style={{ fontSize: 38, marginBottom: 6 }}>{p.emoji}</Text>
                <Text style={[T.h3, { color: C.text, textAlign: 'center', fontSize: 13 }]}>{p.name}</Text>
                <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginTop: 3, lineHeight: 16, fontSize: 11 }]}>
                  {p.tagline}
                </Text>
                {isCurrent && (
                  <View style={[s.currentBadge, { backgroundColor: C.brand }]}>
                    <Text style={[T.label, { color: '#fff', fontSize: 9, textTransform: 'none', letterSpacing: 0 }]}>Current</Text>
                  </View>
                )}
                {isSelected && !isCurrent && (
                  <View style={[s.currentBadge, { backgroundColor: '#F59E0B' }]}>
                    <Text style={[T.label, { color: '#fff', fontSize: 9, textTransform: 'none', letterSpacing: 0 }]}>Selected</Text>
                  </View>
                )}
              </TouchableOpacity>
            )
          })}
        </View>

        <Text style={[T.small, { color: C.textMuted, textAlign: 'center', lineHeight: 17, marginBottom: 16 }]}>
          Switching resets hunger, happiness & accessories to full.{'\n'}Your buddy's name stays the same.
        </Text>

        <TouchableOpacity
          style={[
            duoBtn('#EF4444', '#B91C1C', { marginTop: 0 }),
            (!switchTarget || switchTarget === pet.petType || switching) && { opacity: 0.4 },
          ]}
          onPress={handleSwitchBuddy}
          disabled={!switchTarget || switchTarget === pet.petType || switching}
        >
          {switching ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[T.btn, { color: '#fff' }]}>
              {switchTarget && switchTarget !== pet.petType
                ? `SWITCH TO ${PETS.find((p) => p.id === switchTarget)?.name?.toUpperCase()}`
                : 'SELECT A BUDDY'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }

  function renderItem(item, onBuy) {
    const qty     = inventory[item.id] ?? 0
    const isFood  = 'hungerRestore' in item
    const isHappy = 'happinessRestore' in item
    const isCosmetic = !isFood && !isHappy
    const equipped  = isCosmetic && (pet.accessories ?? []).includes(item.id)
    const owned     = isCosmetic && qty > 0

    return (
      <View key={item.id} style={[s.card, cardShadow(C.shadow)]}>
        <View style={[s.iconWrap, { backgroundColor: item.accent + '22', borderColor: item.accent + '55' }]}>
          <Text style={{ fontSize: 30 }}>{item.icon}</Text>
          {item.rare && <Text style={s.rareBadge}>RARE</Text>}
        </View>

        <View style={s.info}>
          <Text style={[T.h3, { color: C.text }]}>{item.name}</Text>
          <Text style={[T.small, { color: C.textMuted, marginTop: 2, lineHeight: 17 }]}>{item.desc}</Text>
          {!isCosmetic && qty > 0 && (
            <Text style={[T.label, { color: C.textMuted, marginTop: 4, textTransform: 'none', letterSpacing: 0 }]}>
              In bag: {qty}
            </Text>
          )}
        </View>

        <View style={s.action}>
          {isCosmetic ? (
            equipped ? (
              <TouchableOpacity
                style={[s.equippedBtn, { borderColor: item.accent }]}
                onPress={() => toggleCosmetic(item.id)}
              >
                <Text style={[T.label, { color: item.accent, textTransform: 'none', letterSpacing: 0, fontSize: 11 }]}>✓ Equipped</Text>
              </TouchableOpacity>
            ) : owned ? (
              <TouchableOpacity
                style={duoBtn(item.accent, item.dark, { paddingVertical: 10, paddingHorizontal: 12 })}
                onPress={() => toggleCosmetic(item.id)}
              >
                <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>EQUIP</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={duoBtn(xp >= item.cost ? item.accent : C.surface3, xp >= item.cost ? item.dark : C.border, { paddingVertical: 10, paddingHorizontal: 12, opacity: xp >= item.cost ? 1 : 0.5 })}
                onPress={() => handleBuyCosmetic(item)}
                disabled={xp < item.cost}
              >
                <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>⭐ {item.cost}</Text>
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity
              style={duoBtn(xp >= item.cost ? item.accent : C.surface3, xp >= item.cost ? item.dark : C.border, { paddingVertical: 10, paddingHorizontal: 12, opacity: xp >= item.cost ? 1 : 0.5 })}
              onPress={() => handleBuyItem(item)}
              disabled={xp < item.cost}
            >
              <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>⭐ {item.cost}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  const items = tab === 0 ? FOOD_ITEMS : tab === 1 ? HAPPINESS_ITEMS : tab === 2 ? COSMETICS : []

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={[s.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={[T.body, { color: C.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[T.h2, { color: C.text }]}>🐾 Pet Shop</Text>
          <View style={[s.coinChip, { backgroundColor: C.surface2, borderColor: C.border }]}>
            <Text style={[T.h3, { color: '#F59E0B' }]}>⭐ {xp.toLocaleString()}</Text>
          </View>
        </View>

        {/* Pet greeting */}
        {pet.name && (
          <Text style={[T.small, { color: C.textMuted, paddingHorizontal: 20, marginBottom: 14, textAlign: 'center' }]}>
            Shopping for {pet.name} 🐾  ·  Feed them, play with them, or add some style!
          </Text>
        )}

        {/* Tabs */}
        <View style={s.tabs}>
          {TABS.map((t, i) => (
            <TouchableOpacity key={t} style={pillTab(tab === i, C)} onPress={() => setTab(i)}>
              <Text style={[T.label, { color: tab === i ? '#fff' : C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Items */}
        {tab < 3 && items.map((item) => renderItem(item, handleBuyItem))}

        {/* Switch buddy tab */}
        {tab === 4 && renderSwitchTab()}

        {/* Use inventory — feed / play buttons */}
        {(tab === 0 || tab === 1) && Object.keys(inventory).some((k) => {
          const list = tab === 0 ? FOOD_ITEMS : HAPPINESS_ITEMS
          return list.find((i) => i.id === k) && (inventory[k] ?? 0) > 0
        }) && (
          <View style={s.useSection}>
            <Text style={[T.label, { color: C.textMuted, marginBottom: 8 }]}>Use Now</Text>
            {(tab === 0 ? FOOD_ITEMS : HAPPINESS_ITEMS)
              .filter((i) => (inventory[i.id] ?? 0) > 0)
              .map((item) => (
                <TouchableOpacity
                  key={`use-${item.id}`}
                  style={[s.useBtn, duoBtn(item.accent, item.dark)]}
                  onPress={() => {
                    if (tab === 0) { feedPet(item.id); say('Thank you!! That hit different 😋') }
                    else           { playWithPet(item.id); say('Yay! Best study break ever 🎉') }
                  }}
                >
                  <Text style={[T.btn, { color: '#fff' }]}>
                    {item.icon} Use {item.name} ({inventory[item.id]}× left)
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* Rename tab */}
        {tab === 3 && (
          <View style={s.renameCard}>
            <Text style={[T.h3, { color: C.text, marginBottom: 4 }]}>🏷️ Rename {pet.name}</Text>
            <Text style={[T.small, { color: C.textMuted, marginBottom: 16 }]}>
              Costs 150 ⭐ XP. Current name: {pet.name}
            </Text>
            <TextInput
              style={[s.nameInput, { color: C.text, borderColor: C.border, backgroundColor: C.surface2 }]}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="New name..."
              placeholderTextColor={C.textDim}
              maxLength={20}
            />
            <TouchableOpacity
              style={[duoBtn(C.brand, C.brandDark, { marginTop: 12 }), (!nameInput.trim() || nameInput.trim() === pet.name) && { opacity: 0.5 }]}
              onPress={handleRename}
              disabled={!nameInput.trim() || nameInput.trim() === pet.name}
            >
              <Text style={[T.btn, { color: '#fff' }]}>RENAME (150 ⭐)</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:   { flex: 1, backgroundColor: C.bg },
    scroll: { paddingBottom: 24 },
    header: {
      flexDirection:   'row',
      alignItems:      'center',
      justifyContent:  'space-between',
      paddingHorizontal: 16,
      paddingVertical:  14,
    },
    backBtn: { paddingVertical: 6, paddingRight: 12 },
    coinChip: {
      borderRadius:    20,
      paddingHorizontal: 12,
      paddingVertical:  6,
      borderWidth:     1,
    },
    tabs: {
      flexDirection:    'row',
      marginHorizontal: 16,
      marginBottom:     16,
      gap:              8,
      flexWrap:         'wrap',
    },
    card: {
      flexDirection:   'row',
      alignItems:      'center',
      backgroundColor: C.surface,
      borderRadius:    20,
      marginHorizontal: 16,
      marginBottom:    14,
      padding:         16,
      gap:             12,
      borderWidth:     1,
      borderColor:     C.border,
    },
    iconWrap: {
      width:        60,
      height:       60,
      borderRadius: 16,
      alignItems:   'center',
      justifyContent: 'center',
      borderWidth:  1.5,
      flexShrink:   0,
      position:     'relative',
    },
    rareBadge: {
      position:    'absolute',
      bottom:      -6,
      fontFamily:  'Nunito_800ExtraBold',
      fontSize:    8,
      color:       '#F59E0B',
      letterSpacing: 0.3,
    },
    info:   { flex: 1 },
    action: { flexShrink: 0 },
    equippedBtn: {
      borderRadius:    12,
      borderWidth:     1.5,
      paddingHorizontal: 10,
      paddingVertical:   8,
      alignItems:      'center',
    },
    useSection: {
      marginHorizontal: 16,
      marginTop:        4,
      marginBottom:     14,
      backgroundColor:  C.surface2,
      borderRadius:     16,
      padding:          14,
      borderWidth:      1,
      borderColor:      C.border,
      gap:              8,
    },
    useBtn: { marginBottom: 0 },
    renameCard: {
      marginHorizontal: 16,
      backgroundColor:  C.surface,
      borderRadius:     18,
      padding:          20,
      borderWidth:      1,
      borderColor:      C.border,
    },
    nameInput: {
      borderWidth:  1,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical:   10,
      fontFamily:   'Nunito_700Bold',
      fontSize:     15,
    },
    switchContainer: {
      marginHorizontal: 16,
      marginTop:        4,
    },
    iconSuggestionCard: {
      flexDirection:   'row',
      alignItems:      'center',
      borderRadius:    18,
      padding:         16,
      borderWidth:     1.5,
      gap:             12,
      marginBottom:    22,
    },
    iconSuggestionEmoji: {
      fontSize: 32,
    },
    switchGrid: {
      flexDirection:   'row',
      flexWrap:        'wrap',
      gap:             10,
      marginBottom:    14,
    },
    switchCard: {
      width:           '47.5%',
      backgroundColor: C.surface,
      borderRadius:    18,
      padding:         14,
      alignItems:      'center',
      borderWidth:     2,
      borderColor:     C.border,
      position:        'relative',
      minHeight:       140,
    },
    currentBadge: {
      position:             'absolute',
      top:                  -1,
      right:                -1,
      borderTopRightRadius: 16,
      borderBottomLeftRadius: 8,
      paddingHorizontal:    8,
      paddingVertical:      3,
    },
  })
}
