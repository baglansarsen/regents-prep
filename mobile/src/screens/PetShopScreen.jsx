import React, { useState } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  TextInput, Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { usePetContext } from '../context/PetContext'
import { useCoinsContext } from '../context/CoinsContext'
import { FOOD_ITEMS, HAPPINESS_ITEMS, COSMETICS } from '../data/petConfig'
import { T, duoBtn, cardShadow, pillTab } from '../styles/duo'

const TABS = ['Food', 'Play', 'Cosmetics', 'Rename']

export default function PetShopScreen({ navigation }) {
  const { C }              = useTheme()
  const { pet, inventory, feedPet, playWithPet, addInventory, toggleCosmetic, renamePet } = usePetContext()
  const { coins, spendCoins } = useCoinsContext()

  const [tab,      setTab]      = useState(0)
  const [nameInput, setNameInput] = useState(pet.name ?? '')
  const s = makeStyles(C)

  async function handleBuyItem(item) {
    const ok = await spendCoins(item.cost)
    if (!ok) {
      Alert.alert('Not enough coins!', `You need ${item.cost} 💰 coins. You have ${coins}.`)
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
    const ok = await spendCoins(item.cost)
    if (!ok) {
      Alert.alert('Not enough coins!', `You need ${item.cost} 💰 coins. You have ${coins}.`)
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
    const ok = await spendCoins(30)
    if (!ok) { Alert.alert('Not enough coins!', `Renaming costs 30 💰 coins. You have ${coins}.`); return }
    await renamePet(trimmed)
    Alert.alert('Renamed! 🏷️', `Your pet is now called ${trimmed}!`)
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
                style={duoBtn(coins >= item.cost ? item.accent : C.surface3, coins >= item.cost ? item.dark : C.border, { paddingVertical: 10, paddingHorizontal: 12, opacity: coins >= item.cost ? 1 : 0.5 })}
                onPress={() => handleBuyCosmetic(item)}
                disabled={coins < item.cost}
              >
                <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>💰 {item.cost}</Text>
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity
              style={duoBtn(coins >= item.cost ? item.accent : C.surface3, coins >= item.cost ? item.dark : C.border, { paddingVertical: 10, paddingHorizontal: 12, opacity: coins >= item.cost ? 1 : 0.5 })}
              onPress={() => handleBuyItem(item)}
              disabled={coins < item.cost}
            >
              <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>💰 {item.cost}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  const items = tab === 0 ? FOOD_ITEMS : tab === 1 ? HAPPINESS_ITEMS : tab === 2 ? COSMETICS : []

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={[T.body, { color: C.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[T.h2, { color: C.text }]}>🐾 Pet Shop</Text>
          <View style={[s.coinChip, { backgroundColor: C.surface2, borderColor: C.border }]}>
            <Text style={[T.h3, { color: '#F59E0B' }]}>💰 {coins.toLocaleString()}</Text>
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
                  onPress={() => tab === 0 ? feedPet(item.id) : playWithPet(item.id)}
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
              Costs 30 💰 coins. Current name: {pet.name}
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
              <Text style={[T.btn, { color: '#fff' }]}>RENAME (30 💰)</Text>
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
  })
}
