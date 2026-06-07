/**
 * useFocusSession — Pomodoro focus timer for the standalone Study Buddy screen.
 * Fully subject-agnostic: works for math, music, reading — anything.
 */
import { useState, useRef, useEffect, useCallback } from 'react'
import { AppState } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logActivity } from '../utils/activityLogger'

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

const RP_PER_FOCUS_MINUTE = 1
const RP_PER_POMODORO     = 10
const MAX_HISTORY         = 60
const LONG_BREAK_AFTER    = 4
const LONG_BREAK_MIN      = 15

function historyKey(uid) { return `@focusHistory_v1_${uid ?? 'anon'}` }
function todayISO() { return new Date().toISOString().slice(0, 10) }

// ── Sound helper (graceful if expo-av not installed) ──────────────────────────
let Audio = null
try { Audio = require('expo-av').Audio } catch {}

// ── Notifications helper (graceful if expo-notifications not installed) ────────
let Notifications = null
try { Notifications = require('expo-notifications') } catch {}

async function loadSound(url) {
  if (!Audio) return null
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
    const { sound } = await Audio.Sound.createAsync({ uri: url }, { isLooping: true, volume: 0.4 })
    return sound
  } catch { return null }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useFocusSession(uid, earnRP, onPomodoroComplete) {
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
  const [sessionRP,      setSessionRP]      = useState(0)
  const [partialMinutes, setPartialMinutes] = useState(0)
  const [sessionGoal,    setSessionGoal]    = useState(0)  // 0 = no goal, >0 = target pomodoros

  const intervalRef     = useRef(null)
  const activeRef       = useRef(false)
  const secsLeftRef     = useRef(0)
  const phaseRef        = useRef('idle')
  const presetRef       = useRef(preset)
  const pomodoroRef     = useRef(0)
  const sessionRPRef    = useRef(0)
  const sessionStartRef = useRef(null)
  const soundRef        = useRef(null)
  const endTimeRef      = useRef(null)
  const sessionGoalRef  = useRef(0)

  presetRef.current = preset
  sessionGoalRef.current = sessionGoal

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
        // Schedule notification for phase completion if one is in progress
        if (Notifications && endTimeRef.current && (phaseRef.current === 'focus' || phaseRef.current === 'break')) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: phaseRef.current === 'focus' ? 'Focus phase complete!' : 'Break time over!',
              body: phaseRef.current === 'focus' ? 'Time to take a break 🧘' : 'Time to get back to work 📚'
            },
            trigger: { date: new Date(endTimeRef.current) }
          }).catch(() => {})
        }
      } else if (state === 'active') {
        // Cancel any scheduled notifications when returning
        if (Notifications) {
          Notifications.cancelAllScheduledNotificationsAsync().catch(() => {})
        }
        // Catch up if phase ended while backgrounded
        if (phaseRef.current === 'focus' || phaseRef.current === 'break') {
          if (endTimeRef.current && Date.now() >= endTimeRef.current) {
            // Phase already ended, auto-advance
            clearInterval(intervalRef.current)
            intervalRef.current = null
            if (phaseRef.current === 'focus') {
              const newCount = pomodoroRef.current + 1
              pomodoroRef.current = newCount
              setPomodoroCount(newCount)
              const rpEarned = presetRef.current.study * RP_PER_FOCUS_MINUTE + RP_PER_POMODORO
              earnRP?.(rpEarned)
              sessionRPRef.current += rpEarned
              setSessionRP(sessionRPRef.current)
              onPomodoroComplete?.(newCount)
              soundRef.current?.pauseAsync?.().catch(() => {})
              startPhase('break')
            } else if (phaseRef.current === 'break') {
              startPhase('focus')
            }
          } else {
            activeRef.current = true
            if (sound.id !== 'off' && phaseRef.current === 'focus') {
              soundRef.current?.playAsync?.().catch(() => {})
            }
            clearInterval(intervalRef.current)
            intervalRef.current = setInterval(tick, 1000)
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
    if (!activeRef.current || !endTimeRef.current) return
    const now = Date.now()
    const remaining = Math.ceil((endTimeRef.current - now) / 1000)
    secsLeftRef.current = Math.max(0, remaining)
    setSecondsLeft(secsLeftRef.current)

    if (secsLeftRef.current <= 0) {
      clearInterval(intervalRef.current)
      intervalRef.current = null

      if (phaseRef.current === 'focus') {
        // Pomodoro complete
        const newCount = pomodoroRef.current + 1
        pomodoroRef.current = newCount
        setPomodoroCount(newCount)

        const rpEarned = presetRef.current.study * RP_PER_FOCUS_MINUTE + RP_PER_POMODORO
        earnRP?.(rpEarned)
        sessionRPRef.current += rpEarned
        setSessionRP(sessionRPRef.current)

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
    let secs
    if (newPhase === 'focus') {
      secs = presetRef.current.study * 60
    } else {
      // Check if this break is a long break (after 4th pomodoro)
      const isLongBreak = pomodoroRef.current % LONG_BREAK_AFTER === 0
      secs = isLongBreak ? LONG_BREAK_MIN * 60 : presetRef.current.break * 60
    }

    phaseRef.current  = newPhase
    secsLeftRef.current = secs
    endTimeRef.current = Date.now() + secs * 1000
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
    sessionRPRef.current  = 0
    setPomodoroCount(0)
    setSessionRP(0)
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
    endTimeRef.current = Date.now() + secsLeftRef.current * 1000
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

    // Award RP for partial minutes (≥1 min threshold)
    if (partial >= 1) {
      const partialRP = partial * RP_PER_FOCUS_MINUTE
      earnRP?.(partialRP)
      sessionRPRef.current += partialRP
      setSessionRP(sessionRPRef.current)
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
      rpEarned:           sessionRPRef.current,
      todos:              todos.map((t) => ({ text: t.text, done: t.done })),
    }

    // Log focus session activity
    const totalMinutes = pomodoroRef.current * presetRef.current.study + partial
    logActivity(uid, 'focus_session_complete', `Completed focus session: ${subject || 'Study'} (${pomodoroRef.current} pomodoros)`, {
      subject: subject || 'Study',
      pomodorosCompleted: pomodoroRef.current,
      totalMinutes,
      rpEarned: sessionRPRef.current,
    })

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
    setSessionRP(0)
    setPartialMinutes(0)
    setTodos([])
  }, [])

  // ── Computed ──────────────────────────────────────────────────────────────
  const cyclePosition = pomodoroCount % LONG_BREAK_AFTER  // 0–3
  const totalSecs = phase === 'focus' || phase === 'paused'
    ? preset.study * 60
    : (pomodoroCount % LONG_BREAK_AFTER === 0 ? LONG_BREAK_MIN * 60 : preset.break * 60)
  const progress = totalSecs > 0 ? 1 - (secondsLeft / totalSecs) : 0

  return {
    // Config
    preset, setPreset,
    subject, setSubject,
    sound, setSound,
    sessionGoal, setSessionGoal,
    // Todos
    todos, addTodo, toggleTodo, clearTodos,
    // Timer state
    phase, secondsLeft, pomodoroCount, sessionRP, partialMinutes, sessionXP: sessionRP,
    cyclePosition,
    // Controls
    start, pause, resume, skip, stop, reset,
    // History
    history,
    // Computed
    progress,
    FOCUS_PRESETS,
  }
}
