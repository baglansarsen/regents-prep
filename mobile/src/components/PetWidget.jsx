import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { usePetContext } from '../context/PetContext'
import { useSpeechContext } from '../context/SpeechContext'
import { PETS, STAGE_OVERLAYS } from '../data/petConfig'
import SpeechBubble from './SpeechBubble'
import { usePetAnimation } from '../hooks/usePetAnimation'
import PET_SPRITES from '../assets/petSprites'
import SpriteAnimation from './SpriteAnimation'

const PARTICLE_POSITIONS = [
  { top: -10, left: 10  },
  { top: -5,  right: 10 },
  { top: 20,  left: -15 },
  { top: 20,  right: -15 },
  { bottom: 10, left: 5  },
  { bottom: 10, right: 5  },
]

export default function PetWidget({ size = 120, onPress, onLongPress, mini = false }) {
  const { pet, activeReaction, activeFloatMessage, petPet } = usePetContext()
  const config = PETS.find((p) => p.id === pet.petType)

  // ─── Animation values ───────────────────────────────────────────────────
  const translateY   = useRef(new Animated.Value(0)).current
  const rotateZ      = useRef(new Animated.Value(0)).current
  const scale        = useRef(new Animated.Value(1)).current
  const opacity      = useRef(new Animated.Value(1)).current
  const translateX   = useRef(new Animated.Value(0)).current
  const floatY       = useRef(new Animated.Value(0)).current
  const floatOpacity = useRef(new Animated.Value(0)).current
  const idleRef      = useRef(null)
  const [floatText, setFloatText] = useState('')

  const { current: speechMessage, onDone: onSpeechDone } = useSpeechContext()
  const isSpeaking = !!speechMessage

  const spriteAnim = usePetAnimation({
    hunger:    pet.hunger,
    happiness: pet.happiness,
    activeReaction,
    isSpeaking,
  })

  // ─── Tap handler (non-mini): calls petPet, shows floating text ───────────
  async function handleTap() {
    if (mini) { onPress?.(); return }
    const result = await petPet()
    if (result?.ok) {
      setFloatText('+8 😊')
      floatY.setValue(0)
      floatOpacity.setValue(1)
      Animated.parallel([
        Animated.timing(floatY,       { toValue: -50, duration: 900, useNativeDriver: true }),
        Animated.sequence([
          Animated.delay(400),
          Animated.timing(floatOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        ]),
      ]).start()
    } else if (result?.reason === 'limit') {
      setFloatText('All taps used today 🥹')
      floatY.setValue(0)
      floatOpacity.setValue(1)
      Animated.parallel([
        Animated.timing(floatY,       { toValue: -40, duration: 700, useNativeDriver: true }),
        Animated.sequence([
          Animated.delay(300),
          Animated.timing(floatOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]),
      ]).start()
    }
  }

  // ─── Float message from context (feed/play/equip) ───────────────────────
  useEffect(() => {
    if (!activeFloatMessage) return
    setFloatText(activeFloatMessage)
    floatY.setValue(0)
    floatOpacity.setValue(1)
    Animated.parallel([
      Animated.timing(floatY,       { toValue: -55, duration: 950, useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(450),
        Animated.timing(floatOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
    ]).start()
  }, [activeFloatMessage])

  // ─── Idle animation (per pet type, skipped in mini mode) ────────────────
  useEffect(() => {
    if (!config || mini) return
    idleRef.current?.stop()

    if (config.idleAnim === 'float') {
      idleRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, { toValue: -8, duration: 1200, useNativeDriver: true }),
          Animated.timing(translateY, { toValue:  0, duration: 1200, useNativeDriver: true }),
        ]),
      )
    } else if (config.idleAnim === 'lean') {
      idleRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(rotateZ, { toValue:  0.05, duration: 1500, useNativeDriver: true }),
          Animated.timing(rotateZ, { toValue: -0.05, duration: 1500, useNativeDriver: true }),
          Animated.timing(rotateZ, { toValue:  0,    duration: 600,  useNativeDriver: true }),
        ]),
      )
    } else if (config.idleAnim === 'pulse') {
      idleRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(scale, { toValue: 0.97, duration: 2000, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1.00, duration: 2000, useNativeDriver: true }),
        ]),
      )
    } else if (config.idleAnim === 'glitch') {
      idleRef.current = Animated.loop(
        Animated.sequence([
          Animated.delay(2000),
          Animated.timing(opacity, { toValue: 0.3, duration: 60,  useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1.0, duration: 60,  useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.6, duration: 40,  useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1.0, duration: 80,  useNativeDriver: true }),
        ]),
      )
    }

    idleRef.current?.start()
    return () => idleRef.current?.stop()
  }, [config?.id])

  // ─── Reaction animations (one-shot) ─────────────────────────────────────
  useEffect(() => {
    if (!activeReaction) return
    idleRef.current?.stop()

    let animation = null

    if (activeReaction === 'cheer') {
      animation = Animated.sequence([
        Animated.spring(scale, { toValue: 1.4, tension: 300, friction: 5, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1.0, tension: 200, friction: 8, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1.2, tension: 300, friction: 5, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1.0, tension: 200, friction: 8, useNativeDriver: true }),
      ])
    } else if (activeReaction === 'sad') {
      animation = Animated.parallel([
        Animated.timing(rotateZ, { toValue: -0.15, duration: 400, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.55,  duration: 400, useNativeDriver: true }),
      ])
    } else if (activeReaction === 'happy_dance') {
      animation = Animated.sequence([
        Animated.timing(translateX, { toValue:  20, duration: 100, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: -20, duration: 100, useNativeDriver: true }),
        Animated.timing(translateX, { toValue:  20, duration: 100, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: -20, duration: 100, useNativeDriver: true }),
        Animated.timing(translateX, { toValue:   0, duration: 100, useNativeDriver: true }),
      ])
    } else if (activeReaction === 'sympathetic') {
      animation = Animated.sequence([
        Animated.timing(rotateZ, { toValue: -0.08, duration: 500, useNativeDriver: true }),
        Animated.timing(rotateZ, { toValue:  0,    duration: 500, useNativeDriver: true }),
      ])
    } else if (activeReaction === 'root_for_you') {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, { toValue: -12, duration: 150, useNativeDriver: true }),
          Animated.timing(translateY, { toValue:   0, duration: 150, useNativeDriver: true }),
        ]),
        { iterations: 5 },
      )
    } else if (activeReaction === 'celebrate') {
      animation = Animated.sequence([
        Animated.spring(scale, { toValue: 1.5, tension: 400, friction: 4, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -20, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue:   0, duration: 300, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1.0, tension: 200, friction: 8, useNativeDriver: true }),
      ])
    }

    animation?.start(() => {
      // Reset all values and restart idle
      scale.setValue(1)
      opacity.setValue(1)
      rotateZ.setValue(0)
      translateX.setValue(0)
      translateY.setValue(0)
      idleRef.current?.start()
    })
  }, [activeReaction])

  if (!pet.chosen || !config) return null

  const isSad    = pet.happiness < 15
  const isHungry = pet.hunger < 10

  const petEmoji  = isHungry ? '😿' : (isSad ? '😞' : config.emoji)
  const stageIcon = STAGE_OVERLAYS[pet.stage]

  const rotateStr = rotateZ.interpolate({ inputRange: [-1, 1], outputRange: ['-57.3deg', '57.3deg'] })

  // Mini mode: compact touchable for quiz overlay
  if (mini) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={s.miniContainer}>
        <Animated.View style={[{ transform: [{ scale }, { translateY }], opacity }]}>
          {PET_SPRITES[pet.petType]
            ? <SpriteAnimation petType={pet.petType} animation={spriteAnim} size={size * 0.7} />
            : <Text style={{ fontSize: size * 0.7 }}>{petEmoji}</Text>
          }
        </Animated.View>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={handleTap} onLongPress={onLongPress} activeOpacity={0.85} style={[s.container, { width: size * 1.6, height: size * 1.5 }]}>

      {/* Speech bubble — appears above pet head */}
      <SpeechBubble message={speechMessage} onDone={onSpeechDone} />

      {/* Stage 4 particle effects */}
      {pet.stage >= 4 && PARTICLE_POSITIONS.map((pos, i) => (
        <Text key={i} style={[s.particle, pos]}>✨</Text>
      ))}

      {/* Glow aura (stage 3+ or equipped cosmetic) */}
      {(pet.stage >= 3 || (pet.accessories ?? []).includes('glowAura')) && (
        <View style={[s.glow, { width: size + 24, height: size + 24, borderRadius: (size + 24) / 2 }]} />
      )}

      {/* Gold tint overlay for stage 4 */}
      {pet.stage >= 4 && (
        <View style={[s.goldOverlay, { width: size + 8, height: size + 8, borderRadius: (size + 8) / 2 }]} />
      )}

      {/* Pet body: sprite sheet when available, emoji fallback otherwise */}
      <Animated.View style={[
        s.emojiWrap,
        { transform: [{ translateY }, { translateX }, { rotate: rotateStr }, { scale }], opacity },
      ]}>
        {PET_SPRITES[pet.petType]
          ? <SpriteAnimation petType={pet.petType} animation={spriteAnim} size={size} />
          : <Text style={{ fontSize: size * 0.7, textAlign: 'center' }}>{petEmoji}</Text>
        }
      </Animated.View>

      {/* Stage badge (top-right) */}
      {stageIcon && (
        <View style={s.stageBadge}>
          <Text style={{ fontSize: 18 }}>{stageIcon}</Text>
        </View>
      )}

      {/* Graduation cap cosmetic */}
      {(pet.accessories ?? []).includes('graduationCap') && (
        <Text style={s.graduationCap}>🎓</Text>
      )}

      {/* Tiny backpack cosmetic */}
      {(pet.accessories ?? []).includes('tinyBackpack') && (
        <Text style={s.tinyBackpack}>🎒</Text>
      )}

      {/* Grayscale overlay when very sad */}
      {isSad && (
        <View style={[s.grayOverlay, { width: size * 0.85, height: size * 0.85, borderRadius: size }]} />
      )}

      {/* Pet name */}
      <Text style={s.petName}>{pet.name}</Text>

      {/* Long-press hint */}
      <Text style={s.shopHint}>hold for shop</Text>

      {/* Floating "+8 😊" feedback */}
      {floatText ? (
        <Animated.Text style={[s.floatText, { transform: [{ translateY: floatY }], opacity: floatOpacity }]}>
          {floatText}
        </Animated.Text>
      ) : null}

    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  container: {
    alignItems:     'center',
    justifyContent: 'center',
    alignSelf:      'center',
    position:       'relative',
  },
  miniContainer: {
    alignItems:     'center',
    justifyContent: 'center',
  },
  emojiWrap:     { alignItems: 'center', justifyContent: 'center' },
  stageBadge:    { position: 'absolute', top: 6, right: 12 },
  graduationCap: { position: 'absolute', top: 2, fontSize: 22 },
  tinyBackpack:  { position: 'absolute', bottom: 20, right: 14, fontSize: 18 },
  particle:      { position: 'absolute', fontSize: 14 },
  glow: {
    position:        'absolute',
    backgroundColor: 'rgba(251,191,36,0.12)',
    borderWidth:     2,
    borderColor:     'rgba(251,191,36,0.25)',
  },
  goldOverlay: {
    position:        'absolute',
    backgroundColor: 'rgba(251,191,36,0.08)',
  },
  grayOverlay: {
    position:        'absolute',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  petName: {
    position:    'absolute',
    bottom:       0,
    fontFamily:  'Nunito_700Bold',
    fontSize:    13,
    color:       'rgba(100,100,100,0.85)',
    textAlign:   'center',
  },
  shopHint: {
    position:  'absolute',
    bottom:    -14,
    fontSize:  10,
    color:     'rgba(150,150,150,0.6)',
    textAlign: 'center',
  },
  floatText: {
    position:   'absolute',
    top:        10,
    fontFamily: 'Nunito_800ExtraBold',
    fontSize:   15,
    color:      '#10B981',
    textAlign:  'center',
    zIndex:     10,
  },
})
