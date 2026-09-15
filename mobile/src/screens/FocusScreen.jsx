import React from 'react'
import {
  View, Text, TouchableOpacity, ScrollView,
  TextInput, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useFocusScreenState, BACKGROUNDS } from '../hooks/useFocusScreenState'
import FocusDoneScreen from '../components/FocusScreen/FocusDoneScreen'
import FocusActiveScreen from '../components/FocusScreen/FocusActiveScreen'
import { T } from '../styles/duo'

export default function FocusScreen({ navigation }) {
  const { C } = useTheme()

  const {
    phase, secondsLeft, progress, pomodoroCount, sessionRP, partialMinutes, cyclePosition,
    preset, setPreset, subject, sound, setSound, sessionGoal, setSessionGoal,
    todos, toggleTodo,
    start, pause, resume, skip, stop, reset,
    history, FOCUS_PRESETS,
    isActive, isDone,
    subjectChips, soundOptions,
    buddyMessage, todoInput, setTodoInput,
    customSubject, setCustomSubject, showCustomInput,
    background, setBackground, goalCelebModal, pet,
    handleSubjectChip, showCustomSubjectInput, handleCustomSubject, handleAddTodo,
    clearBuddyMessage, dismissGoalCeleb, goBack, openHistory, confirmStopAndGoBack,
  } = useFocusScreenState(navigation)

  const s = makeStyles(C)

  // ── DONE screen ────────────────────────────────────────────────────────────
  if (isDone) {
    return (
      <FocusDoneScreen
        subject={subject}
        pomodoroCount={pomodoroCount}
        preset={preset}
        partialMinutes={partialMinutes}
        sessionRP={sessionRP}
        todos={todos}
        pet={pet}
        buddyMessage={buddyMessage}
        sessionGoal={sessionGoal}
        goalCelebModal={goalCelebModal}
        reset={reset}
        openHistory={openHistory}
        goBack={goBack}
        dismissGoalCeleb={dismissGoalCeleb}
      />
    )
  }

  // ── ACTIVE screen (focus / break / paused) ─────────────────────────────────
  if (isActive) {
    return (
      <FocusActiveScreen
        phase={phase}
        secondsLeft={secondsLeft}
        progress={progress}
        pomodoroCount={pomodoroCount}
        sessionGoal={sessionGoal}
        cyclePosition={cyclePosition}
        subject={subject}
        background={background}
        todos={todos}
        pet={pet}
        buddyMessage={buddyMessage}
        pause={pause}
        resume={resume}
        skip={skip}
        stop={stop}
        confirmStopAndGoBack={confirmStopAndGoBack}
        toggleTodo={toggleTodo}
        clearBuddyMessage={clearBuddyMessage}
      />
    )
  }

  // ── IDLE setup screen ──────────────────────────────────────────────────────
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
          <Text style={[s.sectionLabel, { color: C.textMuted }]}>What are you studying?</Text>
          <View style={s.chips}>
            {subjectChips.map((chip) => {
              const active = subject === chip.emoji + ' ' + chip.label
              return (
                <TouchableOpacity
                  key={chip.id}
                  style={[s.chip, active && { backgroundColor: C.brand, borderColor: C.brand }]}
                  onPress={() => handleSubjectChip(chip)}
                  activeOpacity={0.75}
                >
                  <Text style={s.chipEmoji}>{chip.emoji}</Text>
                  <Text style={[s.chipText, { color: active ? '#fff' : C.text }]}>{chip.label}</Text>
                </TouchableOpacity>
              )
            })}
            <TouchableOpacity
              style={[s.chip, showCustomInput && { backgroundColor: C.surface2, borderColor: C.brand }]}
              onPress={showCustomSubjectInput}
              activeOpacity={0.75}
            >
              <Text style={s.chipEmoji}>✏️</Text>
              <Text style={[s.chipText, { color: C.text }]}>Other</Text>
            </TouchableOpacity>
          </View>

          {showCustomInput && (
            <View style={[s.customInputRow, { backgroundColor: C.surface2, borderColor: C.border }]}>
              <TextInput
                style={[s.customInput, { color: C.text }]}
                placeholder="e.g. Piano practice, Drawing..."
                placeholderTextColor={C.textMuted}
                value={customSubject}
                onChangeText={setCustomSubject}
                onSubmitEditing={handleCustomSubject}
                onBlur={handleCustomSubject}
                returnKeyType="done"
                autoFocus
              />
            </View>
          )}

          {/* Duration */}
          <Text style={[s.sectionLabel, { color: C.textMuted }]}>Session length</Text>
          <View style={s.presetRow}>
            {FOCUS_PRESETS.map((p) => {
              const active = preset.id === p.id
              return (
                <TouchableOpacity
                  key={p.id}
                  style={[s.presetBtn, active && { backgroundColor: C.brand, borderColor: C.brand }]}
                  onPress={() => setPreset(p)}
                  activeOpacity={0.8}
                >
                  <Text style={[s.presetBtnText, { color: active ? '#fff' : C.text }]}>{p.label}</Text>
                  <Text style={[s.presetBtnSub, { color: active ? 'rgba(255,255,255,0.7)' : C.textMuted }]}>
                    {p.break}m break
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>

          {/* Session Goal */}
          <Text style={[s.sectionLabel, { color: C.textMuted }]}>Session goal</Text>
          <View style={s.goalChips}>
            {[0, 1, 2, 3, 4, 5].map(n => (
              <TouchableOpacity
                key={n}
                onPress={() => setSessionGoal(n)}
                style={[s.goalChip, sessionGoal === n && { backgroundColor: C.brand, borderColor: C.brand }]}
                activeOpacity={0.75}
              >
                <Text style={[s.goalChipText, { color: sessionGoal === n ? '#fff' : C.text }]}>
                  {n === 0 ? 'None' : `${n} 🍅`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
            {BACKGROUNDS.map((bg) => (
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

    // Setup
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

    customInputRow: {
      marginTop: 10,
      borderRadius: 12,
      borderWidth: 1.5,
      paddingHorizontal: 14,
      paddingVertical: 10,
    },
    customInput: { fontSize: 14 },

    presetRow:     { flexDirection: 'row', gap: 10 },
    presetBtn: {
      flex: 1,
      alignItems:      'center',
      paddingVertical:  14,
      borderRadius:    14,
      borderWidth:     1.5,
      borderColor:     C.border,
      backgroundColor: C.surface,
    },
    presetBtnText:  { fontSize: 16, fontWeight: '800' },
    presetBtnSub:   { fontSize: 11, marginTop: 2 },

    goalChips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 8 },
    goalChip: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: C.border,
      backgroundColor: C.surface,
    },
    goalChipText: { fontSize: 13, fontWeight: '600' },

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
