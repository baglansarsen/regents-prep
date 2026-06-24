import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { T } from '../styles/duo'
import { useReadAloud } from '../hooks/useReadAloud'

/**
 * ReadAloudButton — free accessibility control that reads question text (and any
 * passage/context) aloud via the OS voice. Renders nothing when TTS isn't
 * available in this build (Expo Go / web). Not premium-gated.
 *
 * Props:
 *   text — the string to read (caller joins context + question)
 *   C    — theme colors
 *   style — optional extra style
 */
export default function ReadAloudButton({ text, C, style }) {
  const { available, speaking, toggle } = useReadAloud()
  if (!available || !text) return null

  return (
    <TouchableOpacity
      onPress={() => toggle(text)}
      accessibilityRole="button"
      accessibilityLabel={speaking ? 'Stop reading aloud' : 'Read the question aloud'}
      activeOpacity={0.75}
      style={[{
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderWidth: 1,
        borderColor: C.brand + '55',
        backgroundColor: C.brand + '14',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
      }, style]}
    >
      <Text style={{ fontSize: 14 }}>{speaking ? '⏹' : '🔊'}</Text>
      <Text style={[T.label, { color: C.brand, textTransform: 'none', letterSpacing: 0, fontSize: 13 }]}>
        {speaking ? 'Stop' : 'Read aloud'}
      </Text>
    </TouchableOpacity>
  )
}
