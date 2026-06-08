import React from 'react'
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme }     from '../context/ThemeContext'
import { usePowerUps }  from '../hooks/usePowerUps'
import { T, duoBtn, cardShadow } from '../styles/duo'

export default function ShopScreen({ navigation }) {
  const { C }              = useTheme()
  const { items, rp }      = usePowerUps()

  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={[T.body, { color: C.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[T.h2, { color: C.text }]}>🛒 RP Shop</Text>
          <View style={s.rpChip}>
            <Text style={[T.h3, { color: C.warn }]}>⭐ {rp.toLocaleString()}</Text>
          </View>
        </View>

        <Text style={[T.small, { color: C.textMuted, paddingHorizontal: 20, marginBottom: 20 }]}>
          Spend your ⭐ RP on power-ups to boost your studying.
        </Text>

        {/* Shop items */}
        {items.map((item) => (
          <View
            key={item.key}
            style={[s.card, cardShadow(C.shadow), item.owned && { opacity: 0.85 }]}
          >
            {/* Icon */}
            <View style={[s.iconWrap, { backgroundColor: item.accent + '22', borderColor: item.accent + '55' }]}>
              <Text style={{ fontSize: 32 }}>{item.icon}</Text>
            </View>

            {/* Info */}
            <View style={s.info}>
              <Text style={[T.h3, { color: C.text }]}>{item.name}</Text>
              <Text style={[T.small, { color: C.textMuted, marginTop: 3, lineHeight: 18 }]}>
                {item.desc}
              </Text>
              <Text style={[T.label, { color: item.accent, marginTop: 6, textTransform: 'none', letterSpacing: 0 }]}>
                ⭐ {item.cost} RP
              </Text>
            </View>

            {/* Action */}
            <View style={s.action}>
              {item.owned ? (
                <View style={[s.ownedBadge, { backgroundColor: item.accent + '22', borderColor: item.accent + '55' }]}>
                  <Text style={[T.label, { color: item.accent, textTransform: 'none', letterSpacing: 0, fontSize: 11 }]}>
                    {item.ownedLabel}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={duoBtn(
                    item.canBuy ? item.accent : C.surface3,
                    item.canBuy ? item.dark   : C.border,
                    { paddingVertical: 10, paddingHorizontal: 16, opacity: item.canBuy ? 1 : 0.5 },
                  )}
                  onPress={item.onBuy}
                  disabled={!item.canBuy}
                  activeOpacity={0.8}
                >
                  <Text style={[T.btn, { color: '#fff', fontSize: 12 }]}>BUY</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {/* Earn more RP hint */}
        <View style={s.hint}>
          <Text style={[T.small, { color: C.textMuted, textAlign: 'center', lineHeight: 20 }]}>
            💡 Earn more RP by completing quizzes{'\n'}and maintaining your daily streak.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:    { flex: 1, backgroundColor: C.bg },
    scroll:  { paddingBottom: 40 },

    header:  {
      flexDirection:   'row',
      alignItems:      'center',
      justifyContent:  'space-between',
      paddingHorizontal: 16,
      paddingVertical:  14,
    },
    backBtn: { paddingVertical: 6, paddingRight: 12 },
    rpChip:  {
      backgroundColor: C.surface2,
      borderRadius:    20,
      paddingHorizontal: 12,
      paddingVertical:   6,
      borderWidth:     1,
      borderColor:     C.border,
    },

    card: {
      flexDirection:   'row',
      alignItems:      'center',
      backgroundColor: C.surface,
      borderRadius:    20,
      marginHorizontal: 16,
      marginBottom:    14,
      padding:         16,
      gap:             14,
      borderWidth:     1,
      borderColor:     C.border,
    },
    iconWrap: {
      width:        64,
      height:       64,
      borderRadius: 18,
      alignItems:   'center',
      justifyContent: 'center',
      borderWidth:  1.5,
      flexShrink:   0,
    },
    info:      { flex: 1 },
    action:    { flexShrink: 0 },
    ownedBadge: {
      borderRadius:    12,
      borderWidth:     1.5,
      paddingHorizontal: 10,
      paddingVertical:   8,
      alignItems:      'center',
    },

    hint: {
      marginTop:    16,
      marginHorizontal: 24,
      backgroundColor: C.surface2,
      borderRadius: 14,
      padding:      16,
    },
  })
}
