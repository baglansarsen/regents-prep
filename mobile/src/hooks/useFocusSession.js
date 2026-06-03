/**
 * useFocusSession — Pomodoro focus timer for the standalone Study Buddy screen.
 * Fully subject-agnostic: works for math, music, reading — anything.
 */
import { useState, useRef, useEffect, useCallback } from 'react'
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// ── Presets ───────────────────────────────────────────────────────────────────
export const FOCUS_PRESETS = [
  { id: 'short',  study: 15, break: 5,  label: '15 min' },
  { id: 'medium', study: 25, break: 5,  label: '25 min' },
  { id: 'long',   study: 50, break: 10, label: '50 min' },
]

export const SUBJECT_CHIPS = [
  { id: 'math',    label: 'Math',    emoji: '📐' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'english', label: 'English', emoji: '📖' },
  { id: 'history', label: 'History', emoji: '🏛️' },
  { id: 'art',     label: 'Art',     emoji: '🎨' },
  { id: 'music',   label: 'Music',   emoji: '🎵' },
  { id: 'reading', label: 'Reading', emoji: '📚' },
]

export const SOUND_OPTIONS = [
  { id: 'off',    label: 'Off',    emoji: '🔇' },
  { id: 'rain',   label: 'Rain',   emoji: '🌧️', url: 'https://regents-prep.web.app/sounds/rain.mp3' },
  { id: 'forest', label: 'Forest', emoji: '🌿', url: 'https://regents-prep.web.app/sounds/forest.mp3' },
  { id: 'lofi',   label: 'Lo-fi',  emoji: '🎧', url: 'https://regents-prep.web.app/sounds/lofi.mp3' },
]

const XP_PER_FOCUS_MINUTE = 1
const XP_PER_POMODORO     = 10
const MAX_HISTORY         = 60

function historyKey(uid) { return `@focusHistory_v1_${uid ?? 'anon'}` }
function todayISO() { return new Date().toISOString().slice(0, 10) }

// ── Sound helper (graceful if expo-av not installed) ──────────────────────────
let Audio = null
try { Audio = require('expo-av').Audio } catch {}

async function loadSound(url) {
  if (!Audio) return null
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
    const { sound } = await Audio.Sound.createAsync({ uri: url }, { isLooping: true, volume: 0.4 })
    return sound
  } catch { return null }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useFocusSession(uid, earnXP, onPomodoroComplete) {
  // ── Config ────────────────────────────────────────────────────────────────
  const [preset,  setPreset]  = useState(FOCUS_PRESETS[1])  // 25 min default
  const [subject, setSubject] = useState('')
  const [sound,   setSound]   = useState(SOUND_OPTIONS[0])  // off

  // ── Todos ─────────────────────────────────────────────────────────────────
  const [todos, setTodos] = useState([])
  const addTodo    = useCallback((text) => {
    const t = text.trim()
    if (!t) return
    setTodos((prev) => [...prev, { id: Date.now(), text: t, done: false }])
  }, [])
  const toggleTodo = useCallback((id) => {
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t))
  }, [])
  const clearTodos = useCallback(() => setTodos([]), [])

  // ── Timer state ───────────────────────────────────────────────────────────
  const [phase,          setPhase]          = useState('idle')   // idle|focus|break|paused|done
  const prePausePhase = useRef('focus')   // phase before pausing
  const [secondsLeft,    setSecondsLeft]    = useState(0)
  const [pomodoroCount,  setPomodoroCount]  = useState(0)
  const [sessionXP,      setSessionXP]      = useState(0)
  const [partialMinutes, setPartialMinutes] = useState(0)

  const intervalRef     = useRef(null)
  const activeRef       = useRef(false)
  const secsLeftRef     = useRef(0)
  const phaseRef        = useRef('idle')
  const presetRef       = useRef(preset)
  const pomodoroRef     = useRef(0)
  const sessionXPRef    = useRef(0)
  const sessionStartRef = useRef(null)
  const soundRef        = useRef(null)

  presetRef.current = preset

  // ── History ───────────────────────────────────────────────────────────────
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!uid) return
    AsyncStorage.getItem(historyKey(uid)).then((raw) => {
      try { if (raw) setHistory(JSON.parse(raw)) } catch {}
    })
  }, [uid])

  async function saveSession(entry) {
    const next = [entry, ...history].slice(0, MAX_HISTORY)
    setHistory(next)
    try { await AsyncStorage.setItem(historyKey(uid), JSON.stringify(next)) } catch {}
  }

  // ── AppState ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'background' || state === 'inactive') {
        activeRef.current = false
        soundRef.current?.pauseAsync?.().catch(() => {})
      } else if (state === 'active') {
        if (phaseRef.current === 'focus' || phaseRef.current === 'break') {
          activeRef.current = true
          if (sound.id !== 'off' && phaseRef.current === 'focus') {
            soundRef.current?.playAsync?.().catch(() => {})
          }
        }
      }
    })
    return () => sub.remove()
  }, [sound])

  // ── Sound management ──────────────────────────────────────────────────────
  useEffect(() => {
    return () => { soundRef.current?.unloadAsync?.().catch(() => {}) }
  }, [])

  async function startSound() {
    soundRef.current?.unloadAsync?.().catch(() => {})
    soundRef.current = null
    if (sound.id === 'off' || !sound.url) return
    soundRef.current = await loadSound(sound.url)
    soundRef.current?.playAsync?.().catch(() => {})
  }

  // ── Tick ──────────────────────────────────────────────────────────────────
  function tick() {
    if (!activeRef.current) return
    secsLeftRef.current -= 1
    setSecondsLeft(secsLeftRef.current)

    if (secsLeftRef.current <= 0) {
      clearInterval(intervalRef.current)
      intervalRef.current = null

      if (phaseRef.current === 'focus') {
        // Pomodoro complete
        const newCount = pomodoroRef.current + 1
        pomodoroRef.current = newCount
        setPomodoroCount(newCount)

        const xpEarned = presetRef.current.study * XP_PER_FOCUS_MINUTE + XP_PER_POMODORO
        earnXP?.(xpEarned)
        sessionXPRef.current += xpEarned
        setSessionXP(sessionXPRef.current)

        onPomodoroComplete?.(newCount)

        // Auto-start break
        soundRef.current?.pauseAsync?.().catch(() => {})
        startPhase('break')
      } else if (phaseRef.current === 'break') {
        // Break done — auto-start next focus
        startPhase('focus')
      }
    }
  }

  function startPhase(newPhase) {
    const secs = newPhase === 'focus'
      ? presetRef.current.study * 60
      : presetRef.current.break * 60

    phaseRef.current  = newPhase
    secsLeftRef.current = secs
    setPhase(newPhase)
    setSecondsLeft(secs)
    activeRef.current = true

    if (newPhase === 'focus') {
      startSound()
    }

    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(tick, 1000)
  }

  // ── Controls ──────────────────────────────────────────────────────────────
  const start = useCallback(() => {
    if (phaseRef.current !== 'idle' && phaseRef.current !== 'done') return
    sessionStartRef.current = new Date().toISOString()
    pomodoroRef.current   = 0
    sessionXPRef.current  = 0
    setPomodoroCount(0)
    setSessionXP(0)
    startPhase('focus')
  }, [sound])

  const pause = useCallback(() => {
    if (phaseRef.current !== 'focus' && phaseRef.current !== 'break') return
    prePausePhase.current = phaseRef.current
    activeRef.current = false
    clearInterval(intervalRef.current)
    intervalRef.current = null
    soundRef.current?.pauseAsync?.().catch(() => {})
    setPhase('paused')
    phaseRef.current = 'paused'
  }, [])

  const resume = useCallback(() => {
    if (phaseRef.current !== 'paused') return
    const resumedPhase = prePausePhase.current
    phaseRef.current = resumedPhase
    setPhase(resumedPhase)
    activeRef.current = true
    if (resumedPhase === 'focus') {
      startSound()
    }
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(tick, 1000)
  }, [sound])

  const skip = useCallback(() => {
    if (phaseRef.current === 'idle' || phaseRef.current === 'done') return
    clearInterval(intervalRef.current)
    intervalRef.current = null
    soundRef.current?.pauseAsync?.().catch(() => {})
    const nextPhase = phaseRef.current === 'focus' ? 'break' : 'focus'
    startPhase(nextPhase)
  }, [sound])

  const stop = useCallback(async () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    activeRef.current   = false
    soundRef.current?.stopAsync?.().catch(() => {})
    soundRef.current?.unloadAsync?.().catch(() => {})
    soundRef.current = null

    // Partial focus time: seconds elapsed in the current (incomplete) focus interval
    const inFocus = phaseRef.current === 'focus' || phaseRef.current === 'paused'
    const secsElapsed = inFocus ? (presetRef.current.study * 60 - secsLeftRef.current) : 0
    const partial = Math.floor(secsElapsed / 60)

    // Award XP for partial minutes (≥1 min threshold)
    if (partial >= 1) {
      const partialXP = partial * XP_PER_FOCUS_MINUTE
      earnXP?.(partialXP)
      sessionXPRef.current += partialXP
      setSessionXP(sessionXPRef.current)
    }

    setPartialMinutes(partial)
    phaseRef.current = 'done'
    setPhase('done')

    // Skip saving if nothing meaningful happened (<1 min total)
    const totalMinutes = pomodoroRef.current * presetRef.current.study + partial
    if (totalMinutes < 1) return

    const entry = {
      id:                 Date.now(),
      date:               todayISO(),
      startedAt:          sessionStartRef.current ?? new Date().toISOString(),
      subject:            subject || 'Study',
      preset:             presetRef.current.id,
      pomodorosCompleted: pomodoroRef.current,
      partialMinutes:     partial > 0 ? partial : undefined,
      partial:            partial > 0,
      xpEarned:           sessionXPRef.current,
      todos:              todos.map((t) => ({ text: t.text, done: t.done })),
    }
    await saveSession(entry)
  }, [subject, todos, history])

  const reset = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    activeRef.current   = false
    phaseRef.current    = 'idle'
    secsLeftRef.current = 0
    setPhase('idle')
    setSecondsLeft(0)
    setPomodoroCount(0)
    setSessionXP(0)
    setPartialMinutes(0)
    setTodos([])
  }, [])

  // ── Computed ──────────────────────────────────────────────────────────────
  const totalSecs = phase === 'focus' || phase === 'paused'
    ? preset.study * 60
    : preset.break * 60
  const progress = totalSecs > 0 ? 1 - (secondsLeft / totalSecs) : 0

  return {
    // Config
    preset, setPreset,
    subject, setSubject,
    sound, setSound,
    // Todos
    todos, addTodo, toggleTodo, clearTodos,
    // Timer state
    phase, secondsLeft, pomodoroCount, sessionXP, partialMinutes,
    // Controls
    start, pause, resume, skip, stop, reset,
    // History
    history,
    // Computed
    progress,
    FOCUS_PRESETS,
  }
}
