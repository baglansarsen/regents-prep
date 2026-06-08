import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SpeechContext = createContext(null)

// ─── Subject display names for speech messages ───────────────────────────────
const SUBJECT_LABEL = {
  'living-environment': 'Living Environment',
  'earth-science':      'Earth Science',
  'chemistry':          'Chemistry',
  'physics':            'Physics',
  'algebra-1':          'Algebra 1',
  'algebra-2':          'Algebra 2',
  'geometry':           'Geometry',
  'life-science':       'Life Science: Biology',
}

// ─── Subject-specific practice hints ─────────────────────────────────────────
const SUBJECT_HINT = {
  'living-environment': 'a cell diagram',
  'earth-science':      'a rock cycle question',
  'chemistry':          'a stoichiometry problem',
  'physics':            'a force diagram',
  'algebra-1':          'a quadratic equation',
  'algebra-2':          'a logarithm problem',
  'geometry':           'a proof',
  'life-science':       'a genetics question',
}

// ─── Daily message templates (subject-aware) ─────────────────────────────────
const TEMPLATES = {
  dog: {
    morning:   [
      'Morning buddy! {daysUntilExam} days until {subject} Regents. Let\'s go! 🐶',
      'Rise and shine! {streak} days in a row — that\'s my loyal friend! 🐾',
      'Good morning! {subject} awaits. You and me, let\'s crush it together 🐶',
    ],
    afternoon: [
      'Afternoon study session? You know I\'m in 🐾',
      '{streak} days strong. Let\'s do one more {subject} quiz together!',
      '{daysUntilExam} days left. Your energy matters. Let\'s go 🐶',
    ],
    evening:   [
      'Evening {subject} review! I\'ll be right here cheering you on 🐶',
      '{streak} days! Almost there. One more {hint} before bed?',
      'Let\'s end the day strong with {subject}. I believe in you 🐾',
    ],
  },
  parrot: {
    morning:   [
      'Good morning! {daysUntilExam} days til {subject} Regents — let\'s go! 🦜',
      'SQUAWK! {streak} days of {subject}! That\'s amazing energy! 🦜',
      'Rise and shine! Ready to learn {subject}? I definitely am!',
    ],
    afternoon: [
      'Afternoon quiz time? Let\'s GO! Quick {subject} round! 🦜',
      '{daysUntilExam} days til {subject} Regents. Bring the energy!',
      '{streak} days! Keep that momentum flying! One more {subject} quiz?',
    ],
    evening:   [
      'Evening {subject} study — this is where we shine! 🦜',
      '{streak} days of consistency! One more {hint} before rest?',
      'Let\'s wrap the day with {subject}! Squawk! 🦜',
    ],
  },
  cat: {
    morning:   [
      '{daysUntilExam} days until {subject} Regents. Study. Alone. Focused. 🐱',
      'Morning. {streak} days. Your {subject} progress is noted.',
      'Another day, another chance to master {subject}. Let\'s begin.',
    ],
    afternoon: [
      'The afternoon is yours. One {subject} quiz in solitude.',
      '{daysUntilExam} days remain. The void watches your {subject} progress.',
      '{streak} days. Independent excellence. Keep it that way.',
    ],
    evening:   [
      'Alone with {subject}. That\'s where your power is. Study.',
      '{streak} days of introspection and growth. One more {hint}?',
      'The void does not sleep. Neither should your {subject} review. 🐱',
    ],
  },
  rabbit: {
    morning:   [
      'Good morning! {daysUntilExam} days until {subject} Regents. Let\'s work together 🐰',
      'Rise and shine! {streak} days — your dedication means everything 💗',
      'Morning! Time to show {subject} some care and attention 🌸',
    ],
    afternoon: [
      '{subject} afternoon study? Count me in. Let\'s build together 🐰',
      '{streak} days strong. Your consistency and kindness inspire me.',
      '{daysUntilExam} days left. Steady hops win the race. Let\'s go 🌸',
    ],
    evening:   [
      'Evening {subject} review. I\'m here every step of the way 🐰',
      '{streak} days of showing up for yourself. That\'s beautiful.',
      'One gentle {hint} before rest? Let\'s finish strong together 💗',
    ],
  },
  fish: {
    morning:   [
      'Morning calm. {daysUntilExam} days til {subject} Regents. One concept at a time. 🐠',
      'Good morning. {streak} days. Your steady {subject} progress flows beautifully.',
      'Rise and center yourself. {subject} study awaits with peace 🌊',
    ],
    afternoon: [
      '{subject} afternoon? Methodical. Calm. Mastery unfolds. 🐠',
      '{daysUntilExam} days. Manageable. Breathe. One quiz at a time.',
      '{streak} days of serene consistency. Keep that zen 🌊',
    ],
    evening:   [
      'Evening {subject} review. Calm waters, clear thinking. 🐠',
      '{streak} days. Peaceful progress compounds. One more {hint}?',
      'Organize, breathe, study. {subject} evening — your strength 🌊',
    ],
  },
  hamster: {
    morning:   [
      'Morning. {daysUntilExam} days til {subject} Regents. Your pace. Your way. 🐹',
      '{streak} days. Grounded progress. Keep running your race 🐹',
      'Another day at your pace. {subject} awaits. No rush.',
    ],
    afternoon: [
      '{subject} afternoon. Solo learner energy. That\'s your strength. 🐹',
      '{daysUntilExam} days left. You know your pace. Trust it.',
      '{streak} days of quiet, solid progress. Keep going 🐹',
    ],
    evening:   [
      '{subject} evening study on your terms. That\'s where you shine.',
      '{streak} days. Observant, grounded, dependable. You.',
      'One more {hint} at your own pace. Quiet wins are still wins. 🐹',
    ],
  },
}

const DAILY_KEY = (uid) => `@dailySpeech_v1_${uid}`

export function pickDailyMessage(petType, streak, daysUntilExam, subject = 'living-environment') {
  const hour    = new Date().getHours()
  const period  = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'
  const pool    = TEMPLATES[petType]?.[period] ?? []
  if (!pool.length) return null
  const idx     = Math.floor(Date.now() / 86_400_000) % pool.length
  const label   = SUBJECT_LABEL[subject] ?? subject
  const hint    = SUBJECT_HINT[subject] ?? 'a practice question'
  return pool[idx]
    .replace(/{streak}/g,        String(streak))
    .replace(/{daysUntilExam}/g, String(daysUntilExam))
    .replace(/{subject}/g,       label)
    .replace(/{hint}/g,          hint)
}

export function SpeechProvider({ children }) {
  const [queue,   setQueue]   = useState([])
  const [current, setCurrent] = useState(null)

  const say = useCallback((message) => {
    if (!message) return
    setQueue((prev) => [...prev, message])
  }, [])

  const onDone = useCallback(() => setCurrent(null), [])

  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0])
      setQueue((prev) => prev.slice(1))
    }
  }, [current, queue])

  return (
    <SpeechContext.Provider value={{ say, current, onDone }}>
      {children}
    </SpeechContext.Provider>
  )
}

export function useSpeechContext() {
  const ctx = useContext(SpeechContext)
  if (!ctx) throw new Error('useSpeechContext must be used inside <SpeechProvider>')
  return ctx
}

// Fetches (or returns cached) daily message. Call once on HomeScreen focus.
export async function loadDailyMessage({ uid, petType, streak, daysUntilExam, subject }) {
  if (!uid) return null
  const today = new Date().toISOString().slice(0, 10)
  const cacheKey = `${DAILY_KEY(uid)}_${subject ?? 'default'}`
  try {
    const raw = await AsyncStorage.getItem(cacheKey)
    if (raw) {
      const { date, message } = JSON.parse(raw)
      if (date === today) return message
    }
  } catch {}
  const message = pickDailyMessage(petType, streak, daysUntilExam, subject)
  if (message) {
    try {
      await AsyncStorage.setItem(cacheKey, JSON.stringify({ date: today, message }))
    } catch {}
  }
  return message
}
