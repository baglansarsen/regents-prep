/**
 * SessionSummaryStats — the done-screen stat row (FOCUS-03).
 *
 * Pure-display component with zero callback props — per D-01 this is the
 * concrete example of the render-only test tier (02-CONTEXT.md "Sub-Component
 * Test Depth"). Renders the elapsed-minutes/pomodoro/earned-RP cards and the
 * tasks-completed line moved verbatim out of FocusDoneScreen (02-03-PLAN.md
 * Task 1) — every copy string, style key, and numeric value is carried over
 * unchanged (UI-SPEC parity lock).
 */
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../context/ThemeContext'
import { T } from '../../styles/duo'

export default function SessionSummaryStats({
  displayMin,
  pomodoroCount,
  partialMinutes,
  sessionRP,
  doneTaskCount,
  totalTaskCount,
}) {
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <>
      <View style={s.doneSummary}>
        <View style={[s.doneStat, { backgroundColor: C.surface2 }]}>
          <Text style={s.doneStatEmoji}>⏱</Text>
          <Text style={[s.doneStatVal, { color: C.text }]}>{displayMin} min</Text>
        </View>
        {pomodoroCount > 0 && (
          <View style={[s.doneStat, { backgroundColor: C.surface2 }]}>
            <Text style={s.doneStatEmoji}>🍅</Text>
            <Text style={[s.doneStatVal, { color: C.text }]}>×{pomodoroCount}</Text>
            {partialMinutes > 0 && (
              <Text style={[s.doneStatSub, { color: C.textMuted }]}>+{partialMinutes}m</Text>
            )}
          </View>
        )}
        {pomodoroCount === 0 && partialMinutes > 0 && (
          <View style={[s.doneStat, { backgroundColor: C.warnBg }]}>
            <Text style={s.doneStatEmoji}>⏳</Text>
            <Text style={[s.doneStatVal, { color: C.warn }]}>{partialMinutes}m</Text>
            <Text style={[s.doneStatSub, { color: C.warn }]}>partial</Text>
          </View>
        )}
        <View style={[s.doneStat, { backgroundColor: C.warnBg }]}>
          <Text style={s.doneStatEmoji}>⭐</Text>
          <Text style={[s.doneStatVal, { color: C.warn }]}>+{sessionRP}</Text>
        </View>
      </View>

      {totalTaskCount > 0 && (
        <Text style={[T.small, { color: C.textMuted, marginTop: 4 }]}>
          ✓ {doneTaskCount} / {totalTaskCount} tasks done
        </Text>
      )}
    </>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    doneSummary: { flexDirection: 'row', gap: 12, marginTop: 8 },
    doneStat: {
      alignItems:       'center',
      justifyContent:   'center',
      borderRadius:     14,
      paddingHorizontal: 18,
      paddingVertical:   14,
      gap:               4,
    },
    doneStatEmoji: { fontSize: 22 },
    doneStatVal:   { fontSize: 20, fontWeight: '800' },
    doneStatSub:   { fontSize: 11, fontWeight: '600', marginTop: 1 },
  })
}
