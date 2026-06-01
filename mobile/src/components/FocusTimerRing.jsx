/**
 * FocusTimerRing — animated countdown circle using View + border rotation trick.
 * No SVG library required.
 */
import React, { useEffect, useRef } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'

export default function FocusTimerRing({ progress = 0, secondsLeft = 0, phase = 'focus', size = 220 }) {
  const { C } = useTheme()

  const rotAnim = useRef(new Animated.Value(progress)).current
  const prevProgress = useRef(progress)

  useEffect(() => {
    Animated.timing(rotAnim, {
      toValue:         progress,
      duration:        800,
      useNativeDriver: true,
    }).start()
    prevProgress.current = progress
  }, [progress])

  const isBreak   = phase === 'break'
  const isPaused  = phase === 'paused'
  const ringColor = isBreak  ? '#10B981'  // green for break
                  : isPaused ? C.textMuted
                  : C.brand

  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  const phaseLabel = isBreak  ? 'BREAK'
                   : isPaused ? 'PAUSED'
                   : 'FOCUS'

  const stroke     = size * 0.045
  const inner      = size - stroke * 2
  const halfInner  = inner / 2

  // Use two half-circle overlapping technique for progress arc
  const rotation   = rotAnim.interpolate({
    inputRange:  [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Track ring (background) */}
      <View style={[
        styles.ring,
        {
          width: size, height: size,
          borderRadius: size / 2,
          borderWidth: stroke,
          borderColor: C.surface2,
        }
      ]} />

      {/* Progress arc — clip left half, rotate */}
      <View style={[styles.arcWrapper, { width: size, height: size }]}>
        {/* Right half — always visible when progress > 0 */}
        <View style={[
          styles.halfClip,
          {
            width: size / 2, height: size,
            left: size / 2,
          }
        ]}>
          <Animated.View style={[
            styles.arcHalf,
            {
              width:        size,
              height:       size,
              borderRadius: size / 2,
              borderWidth:  stroke,
              borderColor:  ringColor,
              left:         -size / 2,
              transform:    [{ rotate: rotation }],
            }
          ]} />
        </View>

        {/* Left half — visible when progress > 0.5 */}
        {progress > 0.5 && (
          <View style={[
            styles.halfClip,
            { width: size / 2, height: size, left: 0 }
          ]}>
            <View style={[
              styles.arcHalf,
              {
                width:        size,
                height:       size,
                borderRadius: size / 2,
                borderWidth:  stroke,
                borderColor:  ringColor,
                left:         0,
              }
            ]} />
          </View>
        )}
      </View>

      {/* Center content */}
      <View style={[styles.center, { width: inner, height: inner, borderRadius: halfInner }]}>
        <Text style={[styles.time, { color: C.text, fontSize: size * 0.175 }]}>{timeStr}</Text>
        <Text style={[styles.phase, { color: ringColor, fontSize: size * 0.072 }]}>{phaseLabel}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:  { alignItems: 'center', justifyContent: 'center', position: 'relative' },
  ring:       { position: 'absolute' },
  arcWrapper: { position: 'absolute', top: 0, left: 0 },
  halfClip:   { position: 'absolute', top: 0, overflow: 'hidden' },
  arcHalf:    { position: 'absolute', top: 0 },
  center: {
    position:       'absolute',
    alignItems:     'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  time:  { fontFamily: 'Nunito_800ExtraBold', letterSpacing: 1 },
  phase: { fontFamily: 'Nunito_700Bold', letterSpacing: 2, marginTop: 2 },
})
