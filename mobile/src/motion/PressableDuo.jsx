import React, { useRef } from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { LEDGE, NATIVE_DRIVER, SPRING } from './tokens'
import { hapticTick } from '../utils/haptics'

/**
 * The tactile primary button: a face sitting on a darker 4pt ledge. Pressing
 * pushes the face down onto the ledge (spring) with a light haptic; releasing
 * pops it back. Same footprint as duoBtn(color, darkColor) so it drops in.
 *
 *   <PressableDuo color={C.brand} darkColor={C.brandDark} onPress={go} style={{ marginTop: 24 }}>
 *     <Text style={[T.btn, { color: '#fff' }]}>Let's go →</Text>
 *   </PressableDuo>
 *
 * style     → outer layout (margin, width, alignSelf, flex…)
 * faceStyle → the face (padding, radius, alignment overrides)
 */
export default function PressableDuo({
  color,
  darkColor,
  onPress,
  onPressIn,
  onPressOut,
  disabled = false,
  haptic = true,
  radius = 16,
  style,
  faceStyle,
  children,
  accessibilityLabel,
  accessibilityHint,
  testID,
}) {
  const press = useRef(new Animated.Value(0)).current   // 0 = up, 1 = pressed

  const animateTo = (toValue) => Animated.spring(press, {
    toValue, ...SPRING.snappy, useNativeDriver: NATIVE_DRIVER,
  }).start()

  const translateY = press.interpolate({ inputRange: [0, 1], outputRange: [0, LEDGE] })

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      aria-disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      testID={testID}
      disabled={disabled}
      onPress={onPress}
      onPressIn={(e) => {
        if (haptic) hapticTick()
        animateTo(1)
        onPressIn?.(e)
      }}
      onPressOut={(e) => {
        animateTo(0)
        onPressOut?.(e)
      }}
      style={[s.wrap, { paddingBottom: LEDGE, opacity: disabled ? 0.6 : 1 }, style]}
    >
      {/* Ledge: the darker base the face presses onto */}
      <View
        pointerEvents="none"
        style={[s.ledge, { top: LEDGE, borderRadius: radius, backgroundColor: darkColor }]}
      />
      <Animated.View
        style={[
          s.face,
          { borderRadius: radius, backgroundColor: color, transform: [{ translateY }] },
          faceStyle,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  )
}

const s = StyleSheet.create({
  wrap: { position: 'relative' },
  ledge: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  face: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
