/**
 * BigPetDisplay — large centered pet with bounce + speech bubble.
 *
 * Relocated body-for-body from the module-local `BigPet` component that lived
 * in `mobile/src/screens/FocusScreen.jsx` (lines 39-113 before this plan).
 * No behavior change: same float-loop timings, same speech-bubble fade
 * sequence, same accessory-to-glyph precedence, same null return when no pet
 * config matches. Only the two relative import paths were adjusted for this
 * file's new depth under `components/FocusScreen/`.
 *
 * Guards 02-02-PLAN.md Task 1 (FOCUS-03).
 */
import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import { useTheme } from '../../context/ThemeContext'

export default function BigPetDisplay({ pet, message, onPress }) {
  const { C } = useTheme()
  const config = require('../../data/petConfig').PETS.find((p) => p.id === pet?.petType)
  const bounceY  = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current
  const [bubble, setBubble] = useState(null)
  const bubbleOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const float = Animated.loop(Animated.sequence([
      Animated.timing(bounceY, { toValue: -8, duration: 1600, useNativeDriver: true }),
      Animated.timing(bounceY, { toValue: 0,  duration: 1600, useNativeDriver: true }),
    ]))
    float.start()
    return () => float.stop()
  }, [])

  useEffect(() => {
    if (!message) return
    setBubble(message)
    bubbleOpacity.setValue(0)
    Animated.sequence([
      Animated.timing(bubbleOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(2800),
      Animated.timing(bubbleOpacity, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start(() => setBubble(null))
  }, [message])

  if (!config) return null

  const accessories = pet.accessories ?? []
  const hat = accessories.includes('graduationCap') ? '🎓'
            : accessories.includes('wizardHat')     ? '🧙'
            : accessories.includes('cowboyHat')     ? '🤠'
            : accessories.includes('crown')         ? '👑' : null

  return (
    <View style={{ alignItems: 'center' }}>
      {bubble && (
        <Animated.View style={{
          opacity: bubbleOpacity,
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 10,
          marginBottom: 10,
          maxWidth: 220,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 6,
          elevation: 4,
        }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#1f2937', textAlign: 'center' }}>{bubble}</Text>
        </Animated.View>
      )}
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        <Animated.View style={{
          transform: [{ translateY: bounceY }, { scale: scaleAnim }],
          alignItems: 'center',
          justifyContent: 'center',
          width: 110,
          height: 110,
        }}>
          {hat && <Text style={{ position: 'absolute', top: -8, left: 18, fontSize: 28, zIndex: 2 }}>{hat}</Text>}
          <Text style={{ fontSize: 88 }}>{config.emoji}</Text>
          {accessories.includes('sunglasses') && (
            <Text style={{ position: 'absolute', top: 22, left: 22, fontSize: 22 }}>🕶️</Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}
