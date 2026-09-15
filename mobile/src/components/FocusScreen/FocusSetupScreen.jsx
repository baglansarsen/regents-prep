/**
 * FocusSetupScreen — the setup-phase container for FocusScreen.jsx.
 *
 * Third and final named sub-component under components/FocusScreen/ (FOCUS-03).
 * Renders the JSX that used to be FocusScreen.jsx's inline "setup" branch —
 * header, subject picker (with its custom-input fallback), duration picker,
 * session-goal picker, task entry and list, sound picker, background picker,
 * the start action, and the past-sessions summary link — unchanged: every
 * copy string, style key, and numeric value carried over verbatim (UI-SPEC
 * parity lock). Pure presentation: all mutation happens via the callback
 * props supplied by useFocusScreenState. It takes only plain values and
 * callbacks — no screen routing prop of any kind reaches this component.
 *
 * The subject, session-length, and session-goal sections were extracted into
 * named pickers by plan 02-06 (FOCUS-03/FOCUS-05). Plan 02-07 completed the
 * decomposition: the task entry field, task rows, background-sound chips,
 * and scene swatches are now named components too. This container holds no
 * option-section JSX at all — it is chrome (safe area, keyboard avoidance,
 * scroll, header, start action, history link) plus composition.
 */
import React from 'react'
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import { T } from '../../styles/duo'
import SubjectPicker from './SubjectPicker'
import DurationPicker from './DurationPicker'
import GoalPicker from './GoalPicker'
import TaskInput from './TaskInput'
import TaskList from './TaskList'
import SoundPicker from './SoundPicker'
import BackgroundPicker from './BackgroundPicker'

export default function FocusSetupScreen({
  subjectChips,
  subject,
  showCustomInput,
  customSubject,
  presets,
  preset,
  sessionGoal,
  todos,
  todoInput,
  soundOptions,
  sound,
  backgrounds,
  background,
  history,
  handleSubjectChip,
  showCustomSubjectInput,
  setCustomSubject,
  handleCustomSubject,
  setPreset,
  setSessionGoal,
  setTodoInput,
  handleAddTodo,
  toggleTodo,
  setSound,
  setBackground,
  start,
  openHistory,
  goBack,
}) {
  const { C } = useTheme()
  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={s.setupScroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={s.setupHeader}>
            <Text style={[T.h1, { color: C.text }]}>🎯 Focus Mode</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <TouchableOpacity onPress={openHistory} activeOpacity={0.7}>
                <Text style={[T.small, { color: C.brand }]}>History</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.closeBtn, { backgroundColor: C.surface2 }]}
                onPress={goBack}
                activeOpacity={0.7}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={[s.closeBtnText, { color: C.textMuted }]}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Subject */}
          <SubjectPicker
            chips={subjectChips}
            subject={subject}
            showCustomInput={showCustomInput}
            customSubject={customSubject}
            onSelectChip={handleSubjectChip}
            onShowCustomInput={showCustomSubjectInput}
            onCustomSubjectChange={setCustomSubject}
            onCommitCustomSubject={handleCustomSubject}
          />

          {/* Duration */}
          <DurationPicker
            presets={presets}
            preset={preset}
            onSelectPreset={setPreset}
          />

          {/* Session Goal */}
          <GoalPicker
            sessionGoal={sessionGoal}
            onSelectGoal={setSessionGoal}
          />

          {/* Tasks */}
          <TaskInput
            value={todoInput}
            onChangeText={setTodoInput}
            onAdd={handleAddTodo}
          />
          <TaskList
            tasks={todos}
            onToggle={toggleTodo}
          />

          {/* Sound */}
          <SoundPicker
            soundOptions={soundOptions}
            sound={sound}
            onSelectSound={setSound}
          />

          {/* Background */}
          <BackgroundPicker
            backgrounds={backgrounds}
            background={background}
            onSelectBackground={setBackground}
          />

          {/* Start button */}
          <TouchableOpacity
            style={[s.startBtn, { backgroundColor: background.accent }]}
            onPress={start}
            activeOpacity={0.85}
          >
            <Text style={s.startBtnText}>▶  Start Focusing</Text>
          </TouchableOpacity>

          {history.length > 0 && (
            <TouchableOpacity
              style={[s.historyLink]}
              onPress={openHistory}
              activeOpacity={0.7}
            >
              <Text style={[T.small, { color: C.textMuted }]}>
                {history.length} past session{history.length > 1 ? 's' : ''} →
              </Text>
            </TouchableOpacity>
          )}

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:      { flex: 1, backgroundColor: C.bg },
    closeBtn:      { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    closeBtnText:  { fontSize: 16, fontWeight: '700' },

    setupScroll:  { paddingHorizontal: 20, paddingTop: 16 },
    setupHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },

    startBtn: {
      marginTop:     24,
      borderRadius:  16,
      paddingVertical: 18,
      alignItems:    'center',
    },
    startBtnText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },
    historyLink:  { alignItems: 'center', paddingTop: 16 },
  })
}
