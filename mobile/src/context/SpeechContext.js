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
  axolotl: {
    morning:   [
      '{daysUntilExam} days until your {subject} Regents. Let\'s make this morning count 🌊',
      'Good morning! {streak} days in a row. Your {subject} score will thank you 💗',
      'Rise and study {subject}! Your Regents score won\'t improve itself 🦎',
    ],
    afternoon: [
      'Hey! Quick {subject} quiz before your energy dips? 🦎',
      '{streak} days strong. {subject} afternoon grind time 💗',
      '{daysUntilExam} days left for {subject}. You\'ve totally got this 🌊',
    ],
    evening:   [
      'Evening {subject} study session? I love these 🌊',
      'Almost at {streak} days — one more {subject} quiz tonight?',
      'It\'s late but one more {hint} before bed? For me? 💗',
    ],
  },
  fox: {
    morning:   [
      '{daysUntilExam} days until {subject} Regents. Efficiency starts now.',
      'Morning. The difference between good and great {subject} scores? Showing up.',
      '{streak}-day streak. Sharp. Let\'s keep it that way.',
    ],
    afternoon: [
      'Afternoon slump? Not us. Quick {subject} quiz. Go.',
      '{daysUntilExam} days until {subject} Regents. Every session counts.',
      'Your streak is {streak}. Don\'t break it now.',
    ],
    evening:   [
      'One {hint} before you sleep. That\'s the deal.',
      '{streak} days. Don\'t let fatigue end what discipline started.',
      '{subject} evening review is where the real gains happen.',
    ],
  },
  capybara: {
    morning:   [
      'Morning 🦫 No rush. Just one {subject} unit when you\'re ready.',
      'Hey. {daysUntilExam} days til {subject} Regents. One concept at a time.',
      'Your {streak}-day streak? Very chill energy. Keep it up.',
    ],
    afternoon: [
      '{subject} afternoon study? Peak capybara energy. Let\'s go 🌿',
      'One {subject} flashcard deck. That\'s it. That\'s enough.',
      '{daysUntilExam} days left. Manageable. Breathe.',
    ],
    evening:   [
      'Evening. Maybe one {subject} quiz? Or rest. Both are valid.',
      '{streak} days. Legitimately impressive.',
      'Even capybaras review {subject} notes before bed 🦫',
    ],
  },
  voidCat: {
    morning:   [
      'The void greets you. {daysUntilExam} days remain. Study {subject}.',
      'Morning. {streak} days. The void is watching your {subject} progress.',
      'Another day. Another chance to master {subject}.',
    ],
    afternoon: [
      'The void requires a {subject} quiz. Now.',
      '{daysUntilExam} days until {subject} Regents. The void has kept count.',
      'Your {streak}-day streak is adequate. Do not ruin it.',
    ],
    evening:   [
      'The void does not sleep. Neither should your {subject} review.',
      '{streak} days. Impressive. For a mortal.',
      'One more {subject} topic. Then the void will let you rest.',
    ],
  },
  bear: {
    morning:   [
      'Morning! {daysUntilExam} days until {subject} Regents. Slow and steady 🐻',
      'Good morning! {streak} days of showing up for {subject}. Keep building 🍯',
      'One {subject} quiz, one step forward. That\'s all it takes 🐾',
    ],
    afternoon: [
      '{daysUntilExam} days left. {subject} afternoon grind with me? 🐾',
      'You\'ve been consistent with {subject}. {streak} days. That matters.',
      'One more {subject} unit today. Bears don\'t quit midway 🐻',
    ],
    evening:   [
      '{subject} evening review. I\'ll be right here with you 🐻',
      '{streak} days of showing up. That\'s everything.',
      'One {hint} before rest. Future you says thanks 🍯',
    ],
  },
  bunny: {
    morning:   [
      'Morning! {daysUntilExam} days until {subject} Regents — let\'s zoom! 🌸',
      'Hi! {streak} days straight of {subject} has me so excited! 🐰',
      'Ready for {subject}? Because I am! Let\'s hop into a quiz 🌸',
    ],
    afternoon: [
      'Afternoon energy! Quick {subject} quiz? I\'ll cheer you on 🐰',
      '{daysUntilExam} days left for {subject}. We can totally do this!',
      '{streak} days! You\'re hopping through {subject}! 🌸',
    ],
    evening:   [
      'Evening {subject} study! One more hop before we rest 🐰',
      '{streak} days. That\'s so impressive! One last {subject} quiz?',
      '{daysUntilExam} days. {subject} evening review = tomorrow\'s confidence 🌸',
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
