import React, { useEffect, useRef } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePetContext } from '../context/PetContext'
import { PETS, STAGE_NAMES } from '../data/petConfig'
import { T, duoBtn } from '../styles/duo'

const { width, height } = Dimensions.get('window')

const CONFETTI = ['✨', '🌟', '⭐', '🎉', '💫', '🌟', '✨', '⭐', '🎊', '💥', '🌠', '⚡']
const POSITIONS = CONFETTI.map((_, i) => ({
  left: Math.random() * (width - 40),
  top:  Math.random() * height * 0.6 + 40,
}))

export default function PetEvolutionScreen({ navigation }) {
  const { pet, clearPendingEvolution } = usePetContext()
  const config = PETS.find((p) => p.id === pet.petType)

  const shakeX   = useRef(new Animated.Value(0)).current
  const flashOp  = useRef(new Animated.Value(0)).current
  const revealSc = useRef(new Animated.Value(0.3)).current
  const textOp   = useRef(new Animated.Value(0)).current
  const confettiAnims = useRef(CONFETTI.map(() => ({
    opacity:   new Animated.Value(0),
    translateY: new Animated.Value(-30),
  }))).current

  useEffect(() => {
    Animated.sequence([
      // 1. Shake
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeX, { toValue:  18, duration: 60, useNativeDriver: true }),
          Animated.timing(shakeX, { toValue: -18, duration: 60, useNativeDriver: true }),
        ]),
        { iterations: 4 },
      ),
      // 2. Flash
      Animated.sequence([
        Animated.timing(flashOp, { toValue: 1,   duration: 150, useNativeDriver: true }),
        Animated.timing(flashOp, { toValue: 0,   duration: 150, useNativeDriver: true }),
        Animated.timing(flashOp, { toValue: 0.8, duration: 100, useNativeDriver: true }),
        Animated.timing(flashOp, { toValue: 0,   duration: 150, useNativeDriver: true }),
      ]),
      // 3. Scale reveal
      Animated.spring(revealSc, { toValue: 1, tension: 80, friction: 8, useNativeDriver: true }),
      // 4. Text + confetti
      Animated.parallel([
        Animated.timing(textOp, { toValue: 1, duration: 500, useNativeDriver: true }),
        ...confettiAnims.map((a) =>
          Animated.sequence([
            Animated.delay(Math.random() * 600),
            Animated.parallel([
              Animated.timing(a.opacity,    { toValue: 1,   duration: 300, useNativeDriver: true }),
              Animated.timing(a.translateY, { toValue: 40,  duration: 600, useNativeDriver: true }),
            ]),
            Animated.timing(a.opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
          ]),
        ),
      ]),
    ]).start()
  }, [])

  async function handleContinue() {
    await clearPendingEvolution()
    navigation.goBack()
  }

  const stageName = STAGE_NAMES[pet.stage] ?? 'Evolved'
  const petEmoji  = config?.emoji ?? '🐾'

  return (
    <SafeAreaView style={s.safe}>

      {/* Confetti */}
      {CONFETTI.map((emoji, i) => (
        <Animated.Text
          key={i}
          style={[
            s.confetti,
            { left: POSITIONS[i].left, top: POSITIONS[i].top },
            { opacity: confettiAnims[i].opacity, transform: [{ translateY: confettiAnims[i].translateY }] },
          ]}
        >
          {emoji}
        </Animated.Text>
      ))}

      {/* Flash overlay */}
      <Animated.View style={[StyleSheet.absoluteFill, s.flashOverlay, { opacity: flashOp }]} />

      {/* Content */}
      <View style={s.content}>
        <Animated.Text style={[s.evolvedEmoji, { transform: [{ translateX: shakeX }, { scale: revealSc }] }]}>
          {petEmoji}
        </Animated.Text>

        <Animated.View style={{ opacity: textOp, alignItems: 'center' }}>
          <Text style={s.evolvedLabel}>Stage {pet.stage} — {stageName}!</Text>
          <Text style={s.petNameText}>{pet.name ?? 'Your pet'} evolved! 🌟</Text>
          <Text style={s.descText}>
            {pet.stage === 2 && 'A little older, a little wiser. Your buddy gained some style! 👓'}
            {pet.stage === 3 && 'Full-grown and glowing. The hard work paid off. 🌟'}
            {pet.stage === 4 && 'LEGENDARY. Your companion has transcended ordinary study buddies. 👑'}
          </Text>
        </Animated.View>

        <Animated.View style={{ opacity: textOp, width: '80%', marginTop: 32 }}>
          <TouchableOpacity style={duoBtn('#58CC02', '#3D9B00')} onPress={handleContinue}>
            <Text style={[T.btn, { color: '#fff', fontSize: 17 }]}>LET'S GO! 🚀</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: '#0F0F1A', alignItems: 'center', justifyContent: 'center' },
  flashOverlay: { backgroundColor: '#fff' },
  content:      { alignItems: 'center', paddingHorizontal: 24 },
  evolvedEmoji: { fontSize: 110, marginBottom: 16 },
  evolvedLabel: {
    fontFamily:  'Nunito_900Black',
    fontSize:    28,
    color:       '#FCD34D',
    textAlign:   'center',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  petNameText: {
    fontFamily:   'Nunito_700Bold',
    fontSize:     18,
    color:        '#fff',
    textAlign:    'center',
    marginBottom: 12,
  },
  descText: {
    fontFamily:   'Nunito_600SemiBold',
    fontSize:     14,
    color:        'rgba(255,255,255,0.65)',
    textAlign:    'center',
    lineHeight:   21,
    paddingHorizontal: 8,
  },
  confetti: { position: 'absolute', fontSize: 22 },
})
