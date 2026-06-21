import { useState, useRef, useEffect, useCallback } from 'react'

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

function todayISO() {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  const local = new Date(d.getTime() - offset * 60 * 1000)
  return local.toISOString().split('T')[0]
}

export function useFocusSession(uid, earnRP, onPomodoroComplete) {
  // Config
  const [preset,  setPreset]  = useState(FOCUS_PRESETS[1])  // 25 min default
  const [subject, setSubject] = useState('')
  const [sound,   setSound]   = useState(SOUND_OPTIONS[0])  // off
  const [sessionGoal, setSessionGoal] = useState(0)

  // Todos
  const [todos, setTodos] = useState([])
  const addTodo = useCallback((text) => {
    const t = text.trim()
    if (!t) return
    setTodos((prev) => [...prev, { id: Date.now(), text: t, done: false }])
  }, [])
  const toggleTodo = useCallback((id) => {
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, done: !t.done } : t))
  }, [])
  const clearTodos = useCallback(() => setTodos([]), [])

  // Timer state
  const [phase,          setPhase]          = useState('idle')   // idle|focus|break|paused|done
  const prePausePhase = useRef('focus')
  const [secondsLeft,    setSecondsLeft]    = useState(0)
  const [pomodoroCount,  setPomodoroCount]  = useState(0)
  const [sessionRP,      setSessionRP]      = useState(0)
  const [partialMinutes, setPartialMinutes] = useState(0)

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

  presetRef.current = preset
  phaseRef.current  = phase

  // History
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!uid) return
    const raw = localStorage.getItem(historyKey(uid))
    try {
      if (raw) setHistory(JSON.parse(raw))
    } catch {}
  }, [uid])

  async function saveSession(entry) {
    const next = [entry, ...history].slice(0, MAX_HISTORY)
    setHistory(next)
    localStorage.setItem(historyKey(uid), JSON.stringify(next))
  }

  // Chime and notifications helper
  const playChime = useCallback(() => {
    try {
      const chime = new Audio('https://regents-prep.web.app/sounds/chime.mp3')
      chime.volume = 0.5
      chime.play().catch(() => {})
    } catch {}
  }, [])

  const notify = useCallback((title, body) => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, { body })
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(title, { body })
          }
        })
      }
    }
  }, [])

  // Audio Player Management
  const startSound = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.pause()
      soundRef.current = null
    }
    if (sound.id === 'off' || !sound.url) return
    try {
      const audio = new Audio(sound.url)
      audio.loop = true
      audio.volume = 0.35
      soundRef.current = audio
      audio.play().catch((e) => console.log('[useFocusSession] Audio autoplay blocked:', e))
    } catch (e) {
      console.warn('[useFocusSession] Audio initialization failed:', e)
    }
  }, [sound])

  const pauseSound = useCallback(() => {
    soundRef.current?.pause()
  }, [])

  const resumeSound = useCallback(() => {
    if (sound.id !== 'off' && soundRef.current) {
      soundRef.current.play().catch(() => {})
    }
  }, [sound])

  const stopSound = useCallback(() => {
    if (soundRef.current) {
      soundRef.current.pause()
      soundRef.current = null
    }
  }, [])

  // Tick logic
  const tick = useCallback(() => {
    if (!activeRef.current || !endTimeRef.current) return
    const now = Date.now()
    const remaining = Math.ceil((endTimeRef.current - now) / 1000)
    secsLeftRef.current = Math.max(0, remaining)
    setSecondsLeft(secsLeftRef.current)

    if (secsLeftRef.current <= 0) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      playChime()

      if (phaseRef.current === 'focus') {
        const newCount = pomodoroRef.current + 1
        pomodoroRef.current = newCount
        setPomodoroCount(newCount)

        const rpEarned = presetRef.current.study * RP_PER_FOCUS_MINUTE + RP_PER_POMODORO
        if (earnRP) earnRP(rpEarned)
        sessionRPRef.current += rpEarned
        setSessionRP(sessionRPRef.current)

        if (onPomodoroComplete) onPomodoroComplete(newCount)
        notify('Focus Phase Complete!', 'Time to take a break! 🧘')

        pauseSound()
        startPhase('break')
      } else if (phaseRef.current === 'break') {
        notify('Break time over!', 'Time to get back to work! 📚')
        startPhase('focus')
      }
    }
  }, [earnRP, onPomodoroComplete, playChime, notify, pauseSound])

  function startPhase(newPhase) {
    let secs
    if (newPhase === 'focus') {
      secs = presetRef.current.study * 60
    } else {
      const isLongBreak = pomodoroRef.current > 0 && pomodoroRef.current % LONG_BREAK_AFTER === 0
      secs = isLongBreak ? LONG_BREAK_MIN * 60 : presetRef.current.break * 60
    }

    phaseRef.current = newPhase
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

  // Visibility catching up
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        activeRef.current = false
        pauseSound()
      } else {
        if (phaseRef.current === 'focus' || phaseRef.current === 'break') {
          if (endTimeRef.current && Date.now() >= endTimeRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
            playChime()
            if (phaseRef.current === 'focus') {
              const newCount = pomodoroRef.current + 1
              pomodoroRef.current = newCount
              setPomodoroCount(newCount)
              const rpEarned = presetRef.current.study * RP_PER_FOCUS_MINUTE + RP_PER_POMODORO
              if (earnRP) earnRP(rpEarned)
              sessionRPRef.current += rpEarned
              setSessionRP(sessionRPRef.current)
              if (onPomodoroComplete) onPomodoroComplete(newCount)
              startPhase('break')
            } else {
              startPhase('focus')
            }
          } else {
            activeRef.current = true
            resumeSound()
            clearInterval(intervalRef.current)
            intervalRef.current = setInterval(tick, 1000)
          }
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [earnRP, onPomodoroComplete, tick, playChime, resumeSound, pauseSound])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      if (soundRef.current) {
        soundRef.current.pause()
        soundRef.current = null
      }
    }
  }, [])

  // Controls
  const start = useCallback(() => {
    if (phaseRef.current !== 'idle' && phaseRef.current !== 'done') return
    sessionStartRef.current = new Date().toISOString()
    pomodoroRef.current = 0
    sessionRPRef.current = 0
    setPomodoroCount(0)
    setSessionRP(0)
    startPhase('focus')
  }, [startSound])

  const pause = useCallback(() => {
    if (phaseRef.current !== 'focus' && phaseRef.current !== 'break') return
    prePausePhase.current = phaseRef.current
    activeRef.current = false
    clearInterval(intervalRef.current)
    intervalRef.current = null
    pauseSound()
    setPhase('paused')
    phaseRef.current = 'paused'
  }, [pauseSound])

  const resume = useCallback(() => {
    if (phaseRef.current !== 'paused') return
    const resumedPhase = prePausePhase.current
    phaseRef.current = resumedPhase
    setPhase(resumedPhase)
    endTimeRef.current = Date.now() + secsLeftRef.current * 1000
    activeRef.current = true
    if (resumedPhase === 'focus') {
      resumeSound()
    }
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(tick, 1000)
  }, [resumeSound, tick])

  const skip = useCallback(() => {
    if (phaseRef.current === 'idle' || phaseRef.current === 'done') return
    clearInterval(intervalRef.current)
    intervalRef.current = null
    pauseSound()
    const nextPhase = phaseRef.current === 'focus' ? 'break' : 'focus'
    startPhase(nextPhase)
  }, [pauseSound])

  const stop = useCallback(async () => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    activeRef.current = false
    stopSound()

    const inFocus = phaseRef.current === 'focus' || phaseRef.current === 'paused'
    const secsElapsed = inFocus ? (presetRef.current.study * 60 - secsLeftRef.current) : 0
    const partial = Math.floor(secsElapsed / 60)

    if (partial >= 1) {
      const partialRP = partial * RP_PER_FOCUS_MINUTE
      if (earnRP) earnRP(partialRP)
      sessionRPRef.current += partialRP
      setSessionRP(sessionRPRef.current)
    }

    setPartialMinutes(partial)
    phaseRef.current = 'done'
    setPhase('done')

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

    await saveSession(entry)
  }, [subject, todos, history, earnRP, stopSound])

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

  // Computed
  const cyclePosition = pomodoroCount % LONG_BREAK_AFTER
  const totalSecs = phase === 'focus' || phase === 'paused'
    ? preset.study * 60
    : (pomodoroCount > 0 && pomodoroCount % LONG_BREAK_AFTER === 0 ? LONG_BREAK_MIN * 60 : preset.break * 60)
  const progress = totalSecs > 0 ? 1 - (secondsLeft / totalSecs) : 0

  return {
    preset, setPreset,
    subject, setSubject,
    sound, setSound,
    sessionGoal, setSessionGoal,
    todos, addTodo, toggleTodo, clearTodos,
    phase, secondsLeft, pomodoroCount, sessionRP, partialMinutes, sessionXP: sessionRP,
    cyclePosition,
    start, pause, resume, skip, stop, reset,
    history,
    progress,
    FOCUS_PRESETS,
  }
}
