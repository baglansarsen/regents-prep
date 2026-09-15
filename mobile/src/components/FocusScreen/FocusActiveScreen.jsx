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
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PETS_ENABLED } from '../../config/features'
import FocusTimerRing from '../FocusTimerRing'
import RiveDemo from '../RiveDemo'
import BigPetDisplay from './BigPetDisplay'
import ActiveSessionHeader from './ActiveSessionHeader'
import PomodoroCycleDots from './PomodoroCycleDots'
import TimerControls from './TimerControls'
import ActiveTaskList from './ActiveTaskList'

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
        <ActiveSessionHeader
          subject={subject}
          pomodoroCount={pomodoroCount}
          sessionGoal={sessionGoal}
          textColor={textColor}
          mutedColor={mutedColor}
          onRequestStop={confirmStopAndGoBack}
          onStop={stop}
        />

        {/* Big centered pet (hidden while pets are disabled — the floating
            Reggie companion above already covers the buddy presence) */}
        {PETS_ENABLED && pet?.chosen && (
          <View style={s.bigPetArea}>
            <BigPetDisplay pet={pet} message={buddyMessage} onPress={clearBuddyMessage} />
          </View>
        )}

        {/* Pomodoro cycle dots */}
        <PomodoroCycleDots cyclePosition={cyclePosition} accentColor={ringColor} />

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
        <TimerControls
          phase={phase}
          isBreak={isBreak}
          accentColor={bg.accent}
          textColor={textColor}
          mutedColor={mutedColor}
          onPause={pause}
          onResume={resume}
          onSkip={skip}
        />

        {/* Tasks */}
        <ActiveTaskList
          tasks={todos}
          onToggle={toggleTodo}
          accentColor={bg.accent}
          textColor={textColor}
          mutedColor={mutedColor}
        />
      </SafeAreaView>
    </View>
  )
}

const s = StyleSheet.create({
  bigPetArea: {
    alignItems:     'center',
    justifyContent: 'flex-end',
    paddingTop:      8,
    paddingBottom:   4,
  },
  ringArea: { alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
})
