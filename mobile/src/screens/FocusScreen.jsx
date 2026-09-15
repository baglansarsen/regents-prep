import React, { useState, useRef, useEffect } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView,
  TextInput, StyleSheet, Animated, KeyboardAvoidingView, Platform,
  useWindowDimensions, Modal,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { PETS_ENABLED } from '../config/features'
import { useFocusScreenState, BACKGROUNDS } from '../hooks/useFocusScreenState'
import FocusTimerRing from '../components/FocusTimerRing'
import StudyBuddyCompanion from '../components/StudyBuddyCompanion'
import RiveDemo from '../components/RiveDemo'
import { T, cardShadow, duoBtn } from '../styles/duo'

// ── BigPet: large centered pet with bounce + speech bubble ───────────────────
function BigPet({ pet, message, onPress }) {
  const { C } = useTheme()
  const config = require('../data/petConfig').PETS.find((p) => p.id === pet?.petType)
  const bounceY  = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current
  const [bubble, setBubble] = useState(null)
  const bubbleOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const float = Animated.loop(Animated.sequence([
      Animated.timing(bounceY, { toValue: -8, duration: 1600, useNativeDriver: true }),
      Animated.timing(bounceY, { toValue: 0,  duration: 1600, useNativeDriver: true }),
    ]))
    float.start()
    return () => float.stop()
  }, [])

  useEffect(() => {
    if (!message) return
    setBubble(message)
    bubbleOpacity.setValue(0)
    Animated.sequence([
      Animated.timing(bubbleOpacity, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(2800),
      Animated.timing(bubbleOpacity, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start(() => setBubble(null))
  }, [message])

  if (!config) return null

  const accessories = pet.accessories ?? []
  const hat = accessories.includes('graduationCap') ? '🎓'
            : accessories.includes('wizardHat')     ? '🧙'
            : accessories.includes('cowboyHat')     ? '🤠'
            : accessories.includes('crown')         ? '👑' : null

  return (
    <View style={{ alignItems: 'center' }}>
      {bubble && (
        <Animated.View style={{
          opacity: bubbleOpacity,
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 10,
          marginBottom: 10,
          maxWidth: 220,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 6,
          elevation: 4,
        }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#1f2937', textAlign: 'center' }}>{bubble}</Text>
        </Animated.View>
      )}
      <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
        <Animated.View style={{
          transform: [{ translateY: bounceY }, { scale: scaleAnim }],
          alignItems: 'center',
          justifyContent: 'center',
          width: 110,
          height: 110,
        }}>
          {hat && <Text style={{ position: 'absolute', top: -8, left: 18, fontSize: 28, zIndex: 2 }}>{hat}</Text>}
          <Text style={{ fontSize: 88 }}>{config.emoji}</Text>
          {accessories.includes('sunglasses') && (
            <Text style={{ position: 'absolute', top: 22, left: 22, fontSize: 22 }}>🕶️</Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

export default function FocusScreen({ navigation }) {
  const { C } = useTheme()
  const { width: screenWidth } = useWindowDimensions()

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
    const doneTodos    = todos.filter((t) => t.done).length
    const totalTodos   = todos.length
    const displayMin   = pomodoroCount * preset.study + partialMinutes

    return (
      <SafeAreaView style={s.safe} edges={['bottom']}>
        <TouchableOpacity
          style={[s.closeBtn, { alignSelf: 'flex-end', margin: 16, backgroundColor: C.surface2 }]}
          onPress={goBack}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[s.closeBtnText, { color: C.textMuted }]}>✕</Text>
        </TouchableOpacity>
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
            onPress={openHistory}
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

        {/* Session goal celebration modal */}
        <Modal transparent visible={goalCelebModal} animationType="fade" onRequestClose={dismissGoalCeleb}>
          <View style={[s.modalBackdrop, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
            <View style={[s.modalCard, { backgroundColor: C.surface }]}>
              <Text style={{ fontSize: 64, textAlign: 'center' }}>🎯</Text>
              <Text style={[T.h2, { color: C.text, textAlign: 'center', marginTop: 8 }]}>Session Goal Reached!</Text>
              <Text style={[T.body, { color: C.textMuted, textAlign: 'center', marginTop: 4 }]}>{sessionGoal} pomodoro{sessionGoal !== 1 ? 's' : ''} completed</Text>
              <View style={{ backgroundColor: C.brand + '20', borderRadius: 12, padding: 12, marginTop: 16, alignItems: 'center' }}>
                <Text style={{ fontSize: 36 }}>🐾</Text>
                <Text style={[T.label, { color: C.brand, marginTop: 4, textAlign: 'center' }]}>+8 Happiness bonus for {pet?.name}!</Text>
              </View>
              <TouchableOpacity
                style={[s.goalCelebBtn, { backgroundColor: C.brand }]}
                onPress={dismissGoalCeleb}
                activeOpacity={0.85}
              >
                <Text style={[T.btn, { color: '#FFF' }]}>Keep Studying! 🚀</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    )
  }

  // ── ACTIVE screen (focus / break / paused) ─────────────────────────────────
  if (isActive) {
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
              <BigPet pet={pet} message={buddyMessage} onPress={clearBuddyMessage} />
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

    // Active session
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
    doneStatSub:   { fontSize: 11, fontWeight: '600', marginTop: 1 },
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

    // Modal
    modalBackdrop: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalCard: {
      borderRadius: 24,
      padding: 28,
      width: '80%',
      maxWidth: 340,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 10,
    },
    goalCelebBtn: {
      width: '100%',
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 20,
    },
  })
}
