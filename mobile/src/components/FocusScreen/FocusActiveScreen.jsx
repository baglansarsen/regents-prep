/**
 * FocusActiveScreen — the active-session container for FocusScreen.jsx.
 *
 * Second named sub-component under components/FocusScreen/ (FOCUS-03). Renders
 * the JSX that used to be FocusScreen.jsx's inline "active" branch (focus,
 * break, and paused phases), unchanged — every copy string, style key, and
 * numeric value carried over verbatim (UI-SPEC parity lock). Pure
 * presentation: all mutation happens via the callback props supplied by
 * useFocusScreenState. It takes only plain values and callbacks — no screen
 * routing prop of any kind reaches this component, which is what keeps it
 * testable with plain callback doubles.
 *
 * Reads no theme: the active branch's colors come entirely from the selected
 * background scene (its two tone values and accent) and a light/dark text
 * pair derived from the scene id, not from theme tokens (confirmed by reading
 * the branch this relocates — see 02-UI-SPEC.md "Color" section). The style
 * block below is therefore a plain module-scope StyleSheet, not a
 * theme-parameterized factory.
 */
import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PETS_ENABLED } from '../../config/features'
import FocusTimerRing from '../FocusTimerRing'
import RiveDemo from '../RiveDemo'
import BigPetDisplay from './BigPetDisplay'

export default function FocusActiveScreen({
  phase,
  secondsLeft,
  progress,
  pomodoroCount,
  sessionGoal,
  cyclePosition,
  subject,
  background,
  todos,
  pet,
  buddyMessage,
  pause,
  resume,
  skip,
  stop,
  confirmStopAndGoBack,
  toggleTodo,
  clearBuddyMessage,
}) {
  const { width: screenWidth } = useWindowDimensions()

  const bg = background
  const isBreak = phase === 'break'
  const textColor = (bg.id === 'night' || bg.id === 'space') ? '#fff' : '#1f2937'
  const mutedColor = (bg.id === 'night' || bg.id === 'space') ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.45)'
  const ringColor = bg.accent

  return (
    <View style={{ flex: 1, backgroundColor: bg.top }}>
      {/* Gradient-style background — two-tone vertical split */}
      <View style={StyleSheet.absoluteFill}>
        <View style={{ flex: 1, backgroundColor: bg.top }} />
        <View style={{ flex: 1, backgroundColor: bg.bottom }} />
      </View>

      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        {/* Top bar */}
        <View style={s.activeHeader}>
          <TouchableOpacity
            style={[s.stopBtn, { backgroundColor: 'rgba(0,0,0,0.15)' }]}
            onPress={confirmStopAndGoBack}
            activeOpacity={0.8}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[s.stopBtnText, { color: textColor }]}>✕</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            {subject ? (
              <Text style={[s.activeSubject, { color: mutedColor }]}>{subject}</Text>
            ) : null}
            {sessionGoal > 0 ? (
              <Text style={{ fontSize: 18, marginTop: 2, fontWeight: '700', color: textColor }}>
                {pomodoroCount}/{sessionGoal} 🍅
              </Text>
            ) : pomodoroCount > 0 ? (
              <Text style={{ fontSize: 18, marginTop: 2 }}>{'🍅'.repeat(Math.min(pomodoroCount, 8))}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={[s.stopBtn, { backgroundColor: 'rgba(0,0,0,0.15)' }]}
            onPress={stop}
            activeOpacity={0.8}
          >
            <Text style={[s.stopBtnText, { color: textColor }]}>■ Stop</Text>
          </TouchableOpacity>
        </View>

        {/* Big centered pet (hidden while pets are disabled — the floating
            Reggie companion above already covers the buddy presence) */}
        {PETS_ENABLED && pet?.chosen && (
          <View style={s.bigPetArea}>
            <BigPetDisplay pet={pet} message={buddyMessage} onPress={clearBuddyMessage} />
          </View>
        )}

        {/* Pomodoro cycle dots */}
        <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
          {[0, 1, 2, 3].map(i => (
            <View key={i} style={{
              width: 12, height: 12, borderRadius: 6,
              backgroundColor: i < cyclePosition ? ringColor
                : i === cyclePosition ? ringColor + '60'
                : 'rgba(0,0,0,0.2)'
            }} />
          ))}
        </View>

        {/* Rive demo buddy — testing the Rive runtime in Focus Mode */}
        <View style={{ alignItems: 'center', marginBottom: 4 }}>
          <RiveDemo size={Math.min(screenWidth * 0.5, 200)} />
        </View>

        {/* Timer ring */}
        <View style={s.ringArea}>
          <FocusTimerRing
            progress={progress}
            secondsLeft={secondsLeft}
            phase={phase}
            size={Math.min(screenWidth * 0.58, 240)}
            color={ringColor}
            textColor={textColor}
          />
        </View>

        {/* Controls */}
        <View style={s.timerControls}>
          {phase === 'paused' ? (
            <TouchableOpacity
              style={[s.controlBtn, { backgroundColor: bg.accent }]}
              onPress={resume}
              activeOpacity={0.85}
            >
              <Text style={[s.controlBtnText, { color: '#fff' }]}>▶ Resume</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[s.controlBtn, { backgroundColor: 'rgba(0,0,0,0.15)' }]}
              onPress={pause}
              activeOpacity={0.85}
            >
              <Text style={[s.controlBtnText, { color: textColor }]}>⏸ Pause</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[s.controlBtn, { backgroundColor: 'rgba(0,0,0,0.12)' }]}
            onPress={skip}
            activeOpacity={0.85}
          >
            <Text style={[s.controlBtnText, { color: mutedColor }]}>
              {isBreak ? '⏭ Skip break' : '⏭ Skip'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tasks */}
        {todos.length > 0 && (
          <ScrollView style={s.activeTodos} showsVerticalScrollIndicator={false}>
            {todos.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={s.todoRow}
                onPress={() => toggleTodo(t.id)}
                activeOpacity={0.7}
              >
                <View style={[s.todoCheck, {
                  borderColor: t.done ? bg.accent : 'rgba(255,255,255,0.5)',
                  backgroundColor: t.done ? bg.accent : 'transparent',
                }]}>
                  {t.done && <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>✓</Text>}
                </View>
                <Text style={[s.todoText, {
                  color: t.done ? mutedColor : textColor,
                  textDecorationLine: t.done ? 'line-through' : 'none',
                }]}>
                  {t.text}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  )
}

const s = StyleSheet.create({
  activeHeader: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: 20,
    paddingTop:        12,
    paddingBottom:     4,
  },
  activeSubject:  { fontSize: 15, fontWeight: '700' },
  stopBtn: {
    borderRadius:      12,
    paddingHorizontal: 16,
    paddingVertical:   8,
  },
  stopBtnText: { fontSize: 14, fontWeight: '700' },
  bigPetArea: {
    alignItems:     'center',
    justifyContent: 'flex-end',
    paddingTop:      8,
    paddingBottom:   4,
  },
  ringArea: { alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  timerControls: {
    flexDirection:     'row',
    gap:               12,
    paddingHorizontal: 20,
    paddingVertical:   12,
  },
  controlBtn: {
    flex:           1,
    borderRadius:   14,
    paddingVertical: 13,
    alignItems:     'center',
  },
  controlBtnText: { fontSize: 14, fontWeight: '700' },
  activeTodos: {
    maxHeight:         160,
    paddingHorizontal: 20,
    marginBottom:      8,
  },
  todoRow:  {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            10,
    paddingVertical: 8,
  },
  todoCheck: {
    width:        20,
    height:       20,
    borderRadius: 6,
    borderWidth:  1.5,
    alignItems:   'center',
    justifyContent: 'center',
  },
  todoText: { flex: 1, fontSize: 14 },
})
