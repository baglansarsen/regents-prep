/**
 * StudyBuddyCompanion — floating mini-pet that accompanies study & quiz sessions.
 * Shows milestone reactions, speech bubbles, and cheers you on.
 */
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Animated, StyleSheet, TouchableOpacity } from 'react-native'
import { PETS } from '../data/petConfig'
import { useTheme } from '../context/ThemeContext'

const IDLE_MESSAGES = [
  "You've got this! 💪",
  "Keep going! 📚",
  "Great focus! 🧠",
  "You're doing amazing! ⭐",
  "Learning is power! 🚀",
]

export default function StudyBuddyCompanion({
  petType,
  petName,
  accessories = [],
  message = null,
  onPress,
}) {
  const { C } = useTheme()
  const config = PETS.find((p) => p.id === petType)
  if (!config || !petType) return null

  const [bubble, setBubble] = useState(null)
  const bubbleOpacity = useRef(new Animated.Value(0)).current
  const bounceY       = useRef(new Animated.Value(0)).current
  const scaleAnim     = useRef(new Animated.Value(1)).current

  // Show message in speech bubble for 3s
  function showBubble(text) {
    setBubble(text)
    bubbleOpacity.setValue(0)
    Animated.sequence([
      Animated.timing(bubbleOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2500),
      Animated.timing(bubbleOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start(() => setBubble(null))
  }

  // Bounce animation
  function bounce() {
    Animated.sequence([
      Animated.spring(bounceY, { toValue: -12, useNativeDriver: true, tension: 400, friction: 5 }),
      Animated.spring(bounceY, { toValue: -6,  useNativeDriver: true, tension: 300, friction: 5 }),
      Animated.spring(bounceY, { toValue: -10, useNativeDriver: true, tension: 400, friction: 5 }),
      Animated.spring(bounceY, { toValue: 0,   useNativeDriver: true, tension: 200, friction: 8 }),
    ]).start()
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.2, useNativeDriver: true, tension: 400, friction: 5 }),
      Animated.spring(scaleAnim, { toValue: 1.0, useNativeDriver: true, tension: 200, friction: 8 }),
    ]).start()
  }

  // Idle gentle float
  useEffect(() => {
    const float = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceY, { toValue: -4, duration: 1800, useNativeDriver: true }),
        Animated.timing(bounceY, { toValue: 0,  duration: 1800, useNativeDriver: true }),
      ])
    )
    float.start()
    return () => float.stop()
  }, [])

  // React to external message prop
  useEffect(() => {
    if (message) {
      bounce()
      showBubble(message)
    }
  }, [message])

  const hat = accessories.includes('graduationCap') ? '🎓'
            : accessories.includes('wizardHat')     ? '🧙'
            : accessories.includes('cowboyHat')     ? '🤠'
            : accessories.includes('crown')         ? '👑'
            : null

  const s = makeStyles(C)

  return (
    <View style={s.container} pointerEvents="box-none">
      {/* Speech bubble */}
      {bubble && (
        <Animated.View style={[s.bubble, { opacity: bubbleOpacity }]}>
          <Text style={s.bubbleText}>{bubble}</Text>
          <View style={s.bubbleTail} />
        </Animated.View>
      )}

      {/* Pet */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          bounce()
          const idx = Math.floor(Math.random() * IDLE_MESSAGES.length)
          showBubble(IDLE_MESSAGES[idx])
          onPress?.()
        }}
      >
        <Animated.View style={[s.petWrap, { transform: [{ translateY: bounceY }, { scale: scaleAnim }] }]}>
          {hat && <Text style={s.hat}>{hat}</Text>}
          <Text style={s.emoji}>{config.emoji}</Text>
          {accessories.includes('sunglasses') && <Text style={s.sunglasses}>🕶️</Text>}
          {accessories.includes('tinyBackpack') && <Text style={s.backpack}>🎒</Text>}
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 100,
      right: 16,
      alignItems: 'flex-end',
      zIndex: 100,
    },
    petWrap: {
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emoji: { fontSize: 42 },
    hat: {
      position: 'absolute',
      top: -10,
      left: 10,
      fontSize: 20,
      zIndex: 2,
    },
    sunglasses: {
      position: 'absolute',
      top: 10,
      left: 12,
      fontSize: 16,
    },
    backpack: {
      position: 'absolute',
      bottom: 2,
      right: -2,
      fontSize: 16,
    },
    bubble: {
      backgroundColor: C.surface,
      borderColor: C.border,
      borderWidth: 1.5,
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 7,
      marginBottom: 6,
      maxWidth: 170,
      shadowColor: C.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    bubbleText: {
      fontSize: 12,
      fontWeight: '600',
      color: C.text,
      textAlign: 'right',
    },
    bubbleTail: {
      position: 'absolute',
      bottom: -6,
      right: 18,
      width: 10,
      height: 10,
      backgroundColor: C.surface,
      borderRightWidth: 1.5,
      borderBottomWidth: 1.5,
      borderColor: C.border,
      transform: [{ rotate: '45deg' }],
    },
  })
}
