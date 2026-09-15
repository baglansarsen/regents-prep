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
 * named pickers by plan 02-06 (FOCUS-03/FOCUS-05); this container now
 * composes them rather than inlining their JSX.
 */
import React from 'react'
import {
  View, Text, TouchableOpacity, ScrollView,
  TextInput, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../context/ThemeContext'
import { T } from '../../styles/duo'
import SubjectPicker from './SubjectPicker'
import DurationPicker from './DurationPicker'
import GoalPicker from './GoalPicker'

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
          <Text style={[s.sectionLabel, { color: C.textMuted }]}>Tasks <Text style={{ fontWeight: '400', fontSize: 12 }}>(optional)</Text></Text>
          <View style={[s.todoInputRow, { backgroundColor: C.surface2, borderColor: C.border }]}>
            <TextInput
              style={[s.todoInputField, { color: C.text }]}
              placeholder="Add a task..."
              placeholderTextColor={C.textMuted}
              value={todoInput}
              onChangeText={setTodoInput}
              onSubmitEditing={handleAddTodo}
              returnKeyType="done"
            />
            {todoInput.trim().length > 0 && (
              <TouchableOpacity onPress={handleAddTodo} style={s.todoAddBtn}>
                <Text style={[s.todoAddBtnText, { color: C.brand }]}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
          {todos.map((t) => (
            <View key={t.id} style={s.todoRow}>
              <View style={[s.todoCheck, { borderColor: C.border }]} />
              <Text style={[s.todoText, { color: C.text }]}>{t.text}</Text>
              <TouchableOpacity onPress={() => toggleTodo(t.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={{ color: C.textMuted, fontSize: 16 }}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Sound */}
          <Text style={[s.sectionLabel, { color: C.textMuted }]}>Background sound</Text>
          <View style={s.chips}>
            {soundOptions.map((opt) => {
              const active = sound.id === opt.id
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[s.chip, active && { backgroundColor: C.brand, borderColor: C.brand }]}
                  onPress={() => setSound(opt)}
                  activeOpacity={0.75}
                >
                  <Text style={s.chipEmoji}>{opt.emoji}</Text>
                  <Text style={[s.chipText, { color: active ? '#fff' : C.text }]}>{opt.label}</Text>
                </TouchableOpacity>
              )
            })}
          </View>

          {/* Background */}
          <Text style={[s.sectionLabel, { color: C.textMuted }]}>Background</Text>
          <View style={s.bgRow}>
            {backgrounds.map((bg) => (
              <TouchableOpacity
                key={bg.id}
                onPress={() => setBackground(bg)}
                activeOpacity={0.8}
                style={[
                  s.bgSwatch,
                  { backgroundColor: bg.bottom },
                  background.id === bg.id && { borderColor: C.text, borderWidth: 3 },
                ]}
              >
                <Text style={{ fontSize: 18 }}>{bg.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>

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
    sectionLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 10, marginTop: 20 },
    chips:        { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: {
      flexDirection:    'row',
      alignItems:       'center',
      gap:              5,
      paddingHorizontal: 12,
      paddingVertical:   8,
      borderRadius:     20,
      borderWidth:      1.5,
      borderColor:      C.border,
      backgroundColor:  C.surface,
    },
    chipEmoji: { fontSize: 16 },
    chipText:  { fontSize: 13, fontWeight: '600' },

    todoInputRow: {
      flexDirection:    'row',
      alignItems:       'center',
      borderRadius:     12,
      borderWidth:      1.5,
      paddingHorizontal: 14,
      paddingVertical:   10,
    },
    todoInputField: { flex: 1, fontSize: 14 },
    todoAddBtn:     { paddingLeft: 12 },
    todoAddBtnText: { fontSize: 13, fontWeight: '700' },
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

    startBtn: {
      marginTop:     24,
      borderRadius:  16,
      paddingVertical: 18,
      alignItems:    'center',
    },
    startBtnText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },
    historyLink:  { alignItems: 'center', paddingTop: 16 },

    // Background picker
    bgRow:   { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
    bgSwatch: {
      width:          48,
      height:         48,
      borderRadius:   14,
      alignItems:     'center',
      justifyContent: 'center',
      borderWidth:    2,
      borderColor:    'transparent',
    },
  })
}
