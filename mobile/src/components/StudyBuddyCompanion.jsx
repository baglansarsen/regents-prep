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
  const [bubble, setBubble] = useState(null)
  const bubbleOpacity = useRef(new Animated.Value(0)).current
  const bounceY       = useRef(new Animated.Value(0)).current
  const scaleAnim     = useRef(new Animated.Value(1)).current

  const config = PETS.find((p) => p.id === petType)

  function showBubble(text) {
    setBubble(text)
    bubbleOpacity.setValue(0)
    Animated.sequence([
      Animated.timing(bubbleOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(2800),
      Animated.timing(bubbleOpacity, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start(() => setBubble(null))
  }

  function bounce() {
    Animated.sequence([
      Animated.spring(bounceY, { toValue: -14, useNativeDriver: true, tension: 420, friction: 5 }),
      Animated.spring(bounceY, { toValue: -6,  useNativeDriver: true, tension: 300, friction: 5 }),
      Animated.spring(bounceY, { toValue: -10, useNativeDriver: true, tension: 400, friction: 6 }),
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

  // React to milestone messages from parent
  useEffect(() => {
    if (message) {
      bounce()
      showBubble(message)
    }
  }, [message])

  // Guard after all hooks
  if (!config || !petType) return null

  const hat = accessories.includes('graduationCap') ? '🎓'
            : accessories.includes('wizardHat')     ? '🧙'
            : accessories.includes('cowboyHat')     ? '🤠'
            : accessories.includes('crown')         ? '👑'
            : null

  const s = makeStyles(C)

  return (
    <View style={s.container} pointerEvents="box-none">
      {/* Speech bubble — appears above and to the left of the pet */}
      {bubble && (
        <Animated.View style={[s.bubble, { opacity: bubbleOpacity }]}>
          <Text style={s.bubbleText}>{bubble}</Text>
          {/* Tail points down-right toward the pet */}
          <View style={s.bubbleTail} />
        </Animated.View>
      )}

      <TouchableOpacity
        activeOpacity={0.85}
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
      bottom: 110,     // clear the stats bar at bottom
      right: 12,
      alignItems: 'flex-end',
      zIndex: 100,
    },
    petWrap: {
      width: 54,
      height: 54,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emoji: { fontSize: 40 },
    hat: {
      position: 'absolute',
      top: -8,
      left: 8,
      fontSize: 20,
      zIndex: 2,
    },
    sunglasses: {
      position: 'absolute',
      top: 12,
      left: 10,
      fontSize: 15,
    },
    backpack: {
      position: 'absolute',
      bottom: 0,
      right: -4,
      fontSize: 15,
    },
    bubble: {
      backgroundColor: C.surface,
      borderColor: C.border,
      borderWidth: 1.5,
      borderRadius: 14,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 8,
      maxWidth: 180,
      shadowColor: C.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.18,
      shadowRadius: 6,
      elevation: 4,
    },
    bubbleText: {
      fontSize: 13,
      fontWeight: '600',
      color: C.text,
      lineHeight: 18,
    },
    // Tail points toward the pet (bottom-right corner of bubble)
    bubbleTail: {
      position: 'absolute',
      bottom: -7,
      right: 14,
      width: 12,
      height: 12,
      backgroundColor: C.surface,
      borderRightWidth: 1.5,
      borderBottomWidth: 1.5,
      borderColor: C.border,
      transform: [{ rotate: '45deg' }],
    },
  })
}
