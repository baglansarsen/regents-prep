import React, { useState, useCallback, useRef, useEffect } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView,
  TextInput, StyleSheet, Animated, KeyboardAvoidingView, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useXP } from '../hooks/useXP'
import { usePetContext } from '../context/PetContext'
import { useFocusSession, SUBJECT_CHIPS, SOUND_OPTIONS } from '../hooks/useFocusSession'
import FocusTimerRing from '../components/FocusTimerRing'
import StudyBuddyCompanion from '../components/StudyBuddyCompanion'
import { T, cardShadow } from '../styles/duo'

export default function FocusScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { earnXP } = useXP(uid)
  const { triggerReaction, studyBoost, pet } = usePetContext()

  const [buddyMessage, setBuddyMessage] = useState(null)
  const [todoInput, setTodoInput]       = useState('')
  const [customSubject, setCustomSubject] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  const handlePomodoroComplete = useCallback((count) => {
    triggerReaction('happy_dance')
    studyBoost?.()
    setBuddyMessage(`Amazing! ${count} pomodoro${count > 1 ? 's' : ''} done! 🍅`)
    setTimeout(() => setBuddyMessage(null), 3500)
  }, [triggerReaction, studyBoost])

  const session = useFocusSession(uid, earnXP, handlePomodoroComplete)
  const { phase, secondsLeft, progress, pomodoroCount, sessionXP,
          preset, setPreset, subject, setSubject, sound, setSound,
          todos, addTodo, toggleTodo,
          start, pause, resume, skip, stop, reset,
          history, FOCUS_PRESETS } = session

  // Pet reactions on phase transitions
  const prevPhase = useRef(phase)
  useEffect(() => {
    if (prevPhase.current === phase) return
    const prev = prevPhase.current
    prevPhase.current = phase

    if (phase === 'focus' && prev === 'idle') {
      triggerReaction('cheer')
      const name = pet?.name ?? 'Buddy'
      setBuddyMessage(`${name} is ready to focus! 📚`)
      setTimeout(() => setBuddyMessage(null), 3000)
    }
    if (phase === 'break') {
      triggerReaction('celebrate')
      setBuddyMessage('Take a break, you earned it! ☕')
      setTimeout(() => setBuddyMessage(null), 3500)
    }
    if (phase === 'focus' && prev === 'break') {
      setBuddyMessage("Let's go again! 💪")
      setTimeout(() => setBuddyMessage(null), 2500)
    }
    if (phase === 'done') {
      triggerReaction('cheer')
      setBuddyMessage('Incredible focus today! ⭐')
      setTimeout(() => setBuddyMessage(null), 4000)
    }
  }, [phase])

  function handleSubjectChip(chip) {
    setShowCustomInput(false)
    setCustomSubject('')
    setSubject(chip.emoji + ' ' + chip.label)
  }

  function handleCustomSubject() {
    if (customSubject.trim()) {
      setSubject(customSubject.trim())
    }
  }

  function handleAddTodo() {
    if (!todoInput.trim()) return
    addTodo(todoInput)
    setTodoInput('')
  }

  const s = makeStyles(C)
  const isActive = phase === 'focus' || phase === 'break' || phase === 'paused'
  const isDone   = phase === 'done'

  // ── DONE screen ────────────────────────────────────────────────────────────
  if (isDone) {
    const doneTodos    = todos.filter((t) => t.done).length
    const totalTodos   = todos.length
    const displayMin   = pomodoroCount * preset.study

    return (
      <SafeAreaView style={s.safe} edges={["bottom"]}>
        <ScrollView contentContainerStyle={s.doneScroll} showsVerticalScrollIndicator={false}>
          <Text style={s.doneEmoji}>🎉</Text>
          <Text style={[T.h1, { color: C.text, textAlign: 'center' }]}>Great session!</Text>

          {subject ? (
            <View style={[s.subjectBadge, { backgroundColor: C.brand + '18', borderColor: C.brand + '40' }]}>
              <Text style={[s.subjectBadgeText, { color: C.brand }]}>{subject}</Text>
            </View>
          ) : null}

          <View style={s.doneSummary}>
            <View style={[s.doneStat, { backgroundColor: C.surface2 }]}>
              <Text style={s.doneStatEmoji}>⏱</Text>
              <Text style={[s.doneStatVal, { color: C.text }]}>{displayMin} min</Text>
            </View>
            <View style={[s.doneStat, { backgroundColor: C.surface2 }]}>
              <Text style={s.doneStatEmoji}>🍅</Text>
              <Text style={[s.doneStatVal, { color: C.text }]}>×{pomodoroCount}</Text>
            </View>
            <View style={[s.doneStat, { backgroundColor: C.warnBg }]}>
              <Text style={s.doneStatEmoji}>⭐</Text>
              <Text style={[s.doneStatVal, { color: C.warn }]}>+{sessionXP}</Text>
            </View>
          </View>

          {totalTodos > 0 && (
            <Text style={[T.small, { color: C.textMuted, marginTop: 4 }]}>
              ✓ {doneTodos} / {totalTodos} tasks done
            </Text>
          )}

          <TouchableOpacity
            style={[s.primaryBtn, { backgroundColor: C.brand }]}
            onPress={reset}
            activeOpacity={0.85}
          >
            <Text style={s.primaryBtnText}>New Session</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.secondaryBtn, { backgroundColor: C.surface2 }]}
            onPress={() => navigation.navigate('FocusHistory', { history })}
            activeOpacity={0.85}
          >
            <Text style={[s.secondaryBtnText, { color: C.textMuted }]}>View History</Text>
          </TouchableOpacity>
        </ScrollView>

        {pet?.chosen && (
          <StudyBuddyCompanion
            petType={pet.petType}
            petName={pet.name}
            accessories={pet.accessories ?? []}
            message={buddyMessage}
          />
        )}
      </SafeAreaView>
    )
  }

  // ── ACTIVE screen (focus / break / paused) ─────────────────────────────────
  if (isActive) {
    return (
      <SafeAreaView style={s.safe} edges={["bottom"]}>
        <View style={s.activeHeader}>
          <View style={{ flex: 1 }}>
            {subject ? <Text style={[s.activeSubject, { color: C.textMuted }]}>{subject}</Text> : null}
            <Text style={[s.pomodoroCount, { color: C.text }]}>
              {'🍅'.repeat(pomodoroCount)} {pomodoroCount > 0 ? '' : ''}
            </Text>
          </View>
          <TouchableOpacity
            style={[s.stopBtn, { backgroundColor: C.surface2 }]}
            onPress={stop}
            activeOpacity={0.8}
          >
            <Text style={[s.stopBtnText, { color: C.text }]}>■ Stop</Text>
          </TouchableOpacity>
        </View>

        {/* Ring */}
        <View style={s.ringArea}>
          <FocusTimerRing
            progress={progress}
            secondsLeft={secondsLeft}
            phase={phase}
            size={220}
          />
        </View>

        {/* Pause / Skip controls */}
        <View style={s.timerControls}>
          {phase === 'paused' ? (
            <TouchableOpacity
              style={[s.controlBtn, { backgroundColor: C.brand }]}
              onPress={resume}
              activeOpacity={0.85}
            >
              <Text style={s.controlBtnText}>▶ Resume</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[s.controlBtn, { backgroundColor: C.surface2 }]}
              onPress={pause}
              activeOpacity={0.85}
            >
              <Text style={[s.controlBtnText, { color: C.text }]}>⏸ Pause</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[s.controlBtn, { backgroundColor: C.surface2 }]}
            onPress={skip}
            activeOpacity={0.85}
          >
            <Text style={[s.controlBtnText, { color: C.textMuted }]}>
              {phase === 'break' ? '⏭ Skip break' : '⏭ Skip'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tasks during session */}
        {todos.length > 0 && (
          <ScrollView style={s.activeTodos} showsVerticalScrollIndicator={false}>
            <Text style={[s.sectionLabel, { color: C.textMuted }]}>Tasks</Text>
            {todos.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={s.todoRow}
                onPress={() => toggleTodo(t.id)}
                activeOpacity={0.7}
              >
                <View style={[s.todoCheck, { borderColor: t.done ? C.correct : C.border, backgroundColor: t.done ? C.correct : 'transparent' }]}>
                  {t.done && <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>✓</Text>}
                </View>
                <Text style={[s.todoText, { color: t.done ? C.textMuted : C.text, textDecorationLine: t.done ? 'line-through' : 'none' }]}>
                  {t.text}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Pet */}
        {pet?.chosen && (
          <StudyBuddyCompanion
            petType={pet.petType}
            petName={pet.name}
            accessories={pet.accessories ?? []}
            message={buddyMessage}
          />
        )}
      </SafeAreaView>
    )
  }

  // ── IDLE setup screen ──────────────────────────────────────────────────────
  return (
    <SafeAreaView style={s.safe} edges={["bottom"]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={s.setupScroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={s.setupHeader}>
            <Text style={[T.h1, { color: C.text }]}>🎯 Focus Mode</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FocusHistory', { history })} activeOpacity={0.7}>
              <Text style={[T.small, { color: C.brand }]}>History</Text>
            </TouchableOpacity>
          </View>

          {/* Subject */}
          <Text style={[s.sectionLabel, { color: C.textMuted }]}>What are you studying?</Text>
          <View style={s.chips}>
            {SUBJECT_CHIPS.map((chip) => {
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
              onPress={() => { setShowCustomInput(true); setSubject('') }}
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
            {SOUND_OPTIONS.map((opt) => {
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

          {/* Start button */}
          <TouchableOpacity
            style={[s.startBtn, { backgroundColor: C.brand }]}
            onPress={start}
            activeOpacity={0.85}
          >
            <Text style={s.startBtnText}>▶  Start Focusing</Text>
          </TouchableOpacity>

          {history.length > 0 && (
            <TouchableOpacity
              style={[s.historyLink]}
              onPress={() => navigation.navigate('FocusHistory', { history })}
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

    // Active
    activeHeader: {
      flexDirection:    'row',
      alignItems:       'center',
      paddingHorizontal: 20,
      paddingTop:        16,
      paddingBottom:     8,
    },
    activeSubject:  { fontSize: 15, fontWeight: '600' },
    pomodoroCount:  { fontSize: 22, marginTop: 2 },
    stopBtn: {
      borderRadius:     12,
      paddingHorizontal: 16,
      paddingVertical:   10,
    },
    stopBtnText: { fontSize: 14, fontWeight: '700' },
    ringArea: { alignItems: 'center', justifyContent: 'center', flex: 1, paddingVertical: 16 },
    timerControls: {
      flexDirection:    'row',
      gap:              12,
      paddingHorizontal: 20,
      paddingBottom:    16,
    },
    controlBtn: {
      flex:            1,
      borderRadius:    14,
      paddingVertical:  13,
      alignItems:      'center',
    },
    controlBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
    activeTodos: {
      maxHeight:        200,
      paddingHorizontal: 20,
      marginBottom:     16,
    },

    subjectBadge: {
      alignSelf:         'center',
      borderRadius:      20,
      paddingHorizontal: 16,
      paddingVertical:   6,
      borderWidth:       1,
      marginTop:         8,
    },
    subjectBadgeText: { fontSize: 14, fontWeight: '700' },

    // Done
    doneScroll:  { alignItems: 'center', paddingHorizontal: 28, paddingTop: 40, gap: 14 },
    doneEmoji:   { fontSize: 64 },
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
    primaryBtn: {
      width:          '100%',
      borderRadius:    16,
      paddingVertical:  16,
      alignItems:      'center',
      marginTop:        8,
    },
    primaryBtnText:  { color: '#fff', fontSize: 16, fontWeight: '800' },
    secondaryBtn: {
      width:          '100%',
      borderRadius:    16,
      paddingVertical:  14,
      alignItems:      'center',
    },
    secondaryBtnText: { fontSize: 15, fontWeight: '600' },
  })
}
