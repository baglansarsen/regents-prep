/**
 * PomodoroCycleDots — four-dot pomodoro-cycle indicator for FocusActiveScreen.
 *
 * Render-only tier per D-01 (02-CONTEXT.md): zero callback props, the
 * pure-display example 02-RESEARCH.md names for this tier (FOCUS-03).
 *
 * Reads no theme: the accent color arrives as a prop, derived by the caller
 * from the active scene background.
 */
import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function PomodoroCycleDots({ cyclePosition, accentColor }) {
  return (
    <View style={s.row}>
      {[0, 1, 2, 3].map(i => (
        <View
          key={i}
          testID={`cycle-dot-${i}`}
          style={[s.dot, {
            backgroundColor: i < cyclePosition ? accentColor
              : i === cyclePosition ? accentColor + '60'
              : 'rgba(0,0,0,0.2)',
          }]}
        />
      ))}
    </View>
  )
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 12 },
  dot: { width: 12, height: 12, borderRadius: 6 },
})
