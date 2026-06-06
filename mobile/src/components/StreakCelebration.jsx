import React, { useEffect, useRef, useState } from 'react'
import {
  Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Dimensions,
} from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg'
import { useTheme } from '../context/ThemeContext'
import PetWidget from './PetWidget'
import { hapticTick, hapticSuccess, hapticWarning } from '../utils/haptics'

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window')

// Palette per celebration flavor.
const FLAVORS = {
  continued: { top: '#FFB020', bottom: '#FF7A00', accent: '#FF7A00' },
  milestone: { top: '#FFD34E', bottom: '#FF8A00', accent: '#F59E0B' },
  record:    { top: '#FFE066', bottom: '#FF7A00', accent: '#F59E0B' },
  freeze:    { top: '#5EC8F5', bottom: '#1C8FE0', accent: '#0EA5E9' },
  broken:    { top: '#64748B', bottom: '#334155', accent: '#0EA5E9' },
}

const CONFETTI_COLORS = ['#FFD34E', '#FF7A00', '#22C55E', '#1CB0F6', '#EC4899', '#A855F7']

// ── Confetti ────────────────────────────────────────────────────────────────
function Confetti({ run, count = 28 }) {
  const pieces = useRef(
    Array.from({ length: count }, (_, i) => ({
      key: i,
      x: Math.random() * SCREEN_W,
      size: 7 + Math.random() * 7,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 400,
      drift: (Math.random() - 0.5) * 120,
      rounded: Math.random() > 0.5,
      anim: new Animated.Value(0),
    }))
  ).current

  useEffect(() => {
    if (!run) return
    const animations = pieces.map((p) =>
      Animated.timing(p.anim, {
        toValue: 1,
        duration: 1500 + Math.random() * 900,
        delay: p.delay,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      })
    )
    Animated.stagger(20, animations).start()
  }, [run])

  if (!run) return null
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((p) => {
        const translateY = p.anim.interpolate({ inputRange: [0, 1], outputRange: [-40, SCREEN_H * 0.62] })
        const translateX = p.anim.interpolate({ inputRange: [0, 1], outputRange: [0, p.drift] })
        const rotate = p.anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${720 + Math.random() * 360}deg`] })
        const opacity = p.anim.interpolate({ inputRange: [0, 0.85, 1], outputRange: [1, 1, 0] })
        return (
          <Animated.View
            key={p.key}
            style={{
              position: 'absolute', top: 0, left: p.x,
              width: p.size, height: p.size,
              borderRadius: p.rounded ? p.size / 2 : 2,
              backgroundColor: p.color,
              opacity,
              transform: [{ translateY }, { translateX }, { rotate }],
            }}
          />
        )
      })}
    </View>
  )
}

// ── Animated week chain ───────────────────────────────────────────────────────
function WeekChain({ weekDays, accent }) {
  const anims = useRef(weekDays.map(() => new Animated.Value(0))).current

  useEffect(() => {
    Animated.stagger(
      70,
      anims.map((a) =>
        Animated.spring(a, { toValue: 1, useNativeDriver: true, tension: 140, friction: 7 })
      )
    ).start()
  }, [])

  return (
    <View style={s.weekRow}>
      {weekDays.map((d, i) => {
        const prevStudied = i > 0 && weekDays[i - 1].studied
        return (
          <React.Fragment key={d.date}>
            {i > 0 && (
              <View style={[s.connector, { backgroundColor: prevStudied && d.studied ? accent : 'rgba(255,255,255,0.25)' }]} />
            )}
            <View style={s.dayCol}>
              <Animated.View
                style={[
                  s.dot,
                  d.studied
                    ? { backgroundColor: '#fff' }
                    : { backgroundColor: 'rgba(255,255,255,0.18)' },
                  d.isToday && !d.studied && { borderWidth: 2, borderColor: '#fff' },
                  { transform: [{ scale: anims[i] }] },
                ]}
              >
                <Text style={[s.dotMark, { color: d.studied ? accent : 'rgba(255,255,255,0.7)' }]}>
                  {d.studied ? '🔥' : d.dayLabel[0]}
                </Text>
              </Animated.View>
              <Text style={s.dayLabel}>{d.dayLabel}</Text>
            </View>
          </React.Fragment>
        )
      })}
    </View>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function StreakCelebration({ event, onClose, weekDays, streak, rp, hasFreeze, onBuyFreeze, onRepair }) {
  const { C } = useTheme()
  const cardScale  = useRef(new Animated.Value(0.85)).current
  const cardOpacity = useRef(new Animated.Value(0)).current
  const flameScale = useRef(new Animated.Value(1)).current
  const [count, setCount]   = useState(0)
  const [actionMsg, setActionMsg] = useState(null)

  const type = event?.type
  const isContinued = type === 'continued'
  const isFreeze = type === 'freeze_used'
  const isBroken = type === 'broken'
  const isMilestone = !!event?.isMilestone
  const isRecord = !!event?.isRecord

  const flavor =
    isFreeze ? FLAVORS.freeze :
    isBroken ? FLAVORS.broken :
    isMilestone ? FLAVORS.milestone :
    isRecord ? FLAVORS.record :
    FLAVORS.continued

  const target = isBroken ? 0 : (streak ?? event?.streak ?? 0)

  useEffect(() => {
    if (!event) {
      cardScale.setValue(0.85); cardOpacity.setValue(0); flameScale.setValue(1)
      setCount(0); setActionMsg(null)
      return
    }

    Animated.parallel([
      Animated.spring(cardScale, { toValue: 1, useNativeDriver: true, tension: 120, friction: 8 }),
      Animated.timing(cardOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start()

    // Count-up the streak number (continued only); other states show it static.
    if (isContinued && target > 0) {
      const start = Math.max(0, target - 1)
      setCount(start)
      let cur = start
      const stepDelay = 260
      const tick = setInterval(() => {
        cur += 1
        setCount(cur)
        // Pop the flame on the increment.
        Animated.sequence([
          Animated.timing(flameScale, { toValue: 1.3, duration: 140, useNativeDriver: true }),
          Animated.spring(flameScale, { toValue: 1, useNativeDriver: true, tension: 160, friction: 6 }),
        ]).start()
        if (cur >= target) { clearInterval(tick); hapticSuccess() }
        else hapticTick()
      }, stepDelay)
      return () => clearInterval(tick)
    }

    if (isFreeze) hapticSuccess()
    if (isBroken) hapticWarning()
    setCount(target)
    // Gentle idle pulse for freeze/broken.
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(flameScale, { toValue: 1.12, duration: 600, useNativeDriver: true }),
        Animated.timing(flameScale, { toValue: 1,    duration: 600, useNativeDriver: true }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [event?.type, event?.streak])

  if (!event) return null

  const flameEmoji = isFreeze ? '🧊' : isBroken ? '💔' : '🔥'

  const headline =
    isFreeze    ? 'Freeze used!' :
    isBroken    ? 'Streak lost' :
    isMilestone ? `${target} day streak!` :
    isRecord    ? 'New record!' :
                  `${target} day streak!`

  const subtext =
    isFreeze    ? `Your freeze saved your ${target}-day streak. You opened late — back on track now.` :
    isBroken    ? `Your ${event?.lost ?? ''}-day streak ended. Repair it or start fresh today.` :
    isMilestone ? 'Huge milestone — your dedication is paying off. 🎉' :
    isRecord    ? `${target} days — your longest streak ever!` :
                  'You completed a lesson today. Keep the flame alive!'

  async function handleBuyFreeze() {
    const result = await onBuyFreeze?.()
    if (result === 'success')           setActionMsg('🧊 Freeze activated — your next missed day is covered.')
    else if (result === 'already_have') setActionMsg('You already have a freeze equipped.')
    else                                setActionMsg(`Not enough RP — you have ${xp}, need 200.`)
  }

  async function handleRepair() {
    const result = await onRepair?.()
    if (result === 'success')      onClose?.()
    else if (result === 'insufficient_xp') setActionMsg(`Not enough RP to repair — you have ${xp}, need 500.`)
    else setActionMsg('Nothing to repair.')
  }

  return (
    <Modal transparent animationType="fade" visible statusBarTranslucent onRequestClose={onClose}>
      <View style={s.fill}>
        {/* Gradient backdrop */}
        <Svg style={StyleSheet.absoluteFill} width={SCREEN_W} height={SCREEN_H}>
          <Defs>
            <LinearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={flavor.top} />
              <Stop offset="1" stopColor={flavor.bottom} />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width={SCREEN_W} height={SCREEN_H} fill="url(#bg)" />
        </Svg>

        {/* Confetti for positive events */}
        <Confetti run={isContinued} count={isMilestone || isRecord ? 40 : 26} />

        <Animated.View style={[s.content, { opacity: cardOpacity, transform: [{ scale: cardScale }] }]}>

          {(isMilestone || isRecord) && (
            <View style={s.badge}>
              <Text style={s.badgeText}>{isRecord ? '🏆 PERSONAL RECORD' : '⭐ MILESTONE'}</Text>
            </View>
          )}

          {/* Flame with count-up number */}
          <Animated.View style={{ transform: [{ scale: flameScale }], alignItems: 'center', justifyContent: 'center' }}>
            <Text style={s.flame}>{flameEmoji}</Text>
            {!isBroken && !isFreeze && (
              <Text style={s.flameNum}>{count}</Text>
            )}
          </Animated.View>

          <Text style={s.headline}>{headline}</Text>
          <Text style={s.subtext}>{subtext}</Text>

          <WeekChain weekDays={weekDays} accent={flavor.accent} />

          {/* Pet cheering along */}
          <View style={s.petRow}>
            <PetWidget size={84} />
          </View>

          {/* Freeze status chip (positive states) */}
          {(isContinued) && (
            <Text style={s.freezeChip}>
              {hasFreeze ? '🧊 Freeze equipped — your streak is protected' : '🧊 No freeze yet — protect your streak below'}
            </Text>
          )}

          {/* Action message */}
          {actionMsg && <Text style={s.actionMsg}>{actionMsg}</Text>}

          {/* Buttons */}
          <View style={s.buttons}>
            {isBroken ? (
              <>
                <TouchableOpacity style={[s.primaryBtn, { backgroundColor: '#fff' }]} onPress={handleRepair} activeOpacity={0.85}>
                  <Text style={[s.primaryText, { color: flavor.bottom }]}>🔧 Repair streak (500 RP)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.secondaryBtn} onPress={onClose} activeOpacity={0.85}>
                  <Text style={s.secondaryText}>Start over</Text>
                </TouchableOpacity>
              </>
            ) : (isContinued && !hasFreeze) ? (
              <>
                <TouchableOpacity style={[s.primaryBtn, { backgroundColor: '#fff' }]} onPress={onClose} activeOpacity={0.85}>
                  <Text style={[s.primaryText, { color: flavor.bottom }]}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.secondaryBtn} onPress={handleBuyFreeze} activeOpacity={0.85}>
                  <Text style={s.secondaryText}>🧊 Buy freeze (200 RP)</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={[s.primaryBtn, { backgroundColor: '#fff' }]} onPress={onClose} activeOpacity={0.85}>
                <Text style={[s.primaryText, { color: flavor.bottom }]}>{isFreeze ? 'Phew — continue' : "Let's go! 💪"}</Text>
              </TouchableOpacity>
            )}
          </View>

        </Animated.View>
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  fill: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { width: '100%', paddingHorizontal: 28, alignItems: 'center' },

  badge: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 99, paddingHorizontal: 14, paddingVertical: 6, marginBottom: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)',
  },
  badgeText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 12, color: '#fff', letterSpacing: 1 },

  flame:    { fontSize: 130, textAlign: 'center' },
  flameNum: {
    position: 'absolute',
    fontFamily: 'Nunito_900Black', fontSize: 52, color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.25)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6,
  },

  headline: { fontFamily: 'Nunito_900Black', fontSize: 30, color: '#fff', textAlign: 'center', marginTop: 6 },
  subtext:  { fontFamily: 'Nunito_600SemiBold', fontSize: 15, color: 'rgba(255,255,255,0.92)', textAlign: 'center', marginTop: 8, lineHeight: 21, paddingHorizontal: 8 },

  weekRow:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 22 },
  dayCol:   { alignItems: 'center', gap: 5 },
  connector:{ width: 14, height: 3, borderRadius: 2, marginBottom: 16 },
  dot: {
    width: 34, height: 34, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center',
  },
  dotMark:  { fontSize: 14, fontFamily: 'Nunito_800ExtraBold' },
  dayLabel: { fontFamily: 'Nunito_700Bold', fontSize: 10, color: 'rgba(255,255,255,0.85)' },

  petRow:   { marginTop: 18, alignItems: 'center' },

  freezeChip: { fontFamily: 'Nunito_700Bold', fontSize: 12.5, color: 'rgba(255,255,255,0.95)', textAlign: 'center', marginTop: 14 },
  actionMsg:  { fontFamily: 'Nunito_700Bold', fontSize: 13.5, color: '#fff', textAlign: 'center', marginTop: 14 },

  buttons:    { width: '100%', marginTop: 22, gap: 10 },
  primaryBtn: { borderRadius: 16, paddingVertical: 15, alignItems: 'center', width: '100%' },
  primaryText:{ fontFamily: 'Nunito_800ExtraBold', fontSize: 16 },
  secondaryBtn: { borderRadius: 16, paddingVertical: 13, alignItems: 'center', width: '100%', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.6)' },
  secondaryText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 14, color: '#fff' },
})
