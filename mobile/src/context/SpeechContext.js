import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SpeechContext = createContext(null)

// ─── Daily message templates (Regentify-aware) ───────────────────────────────
const TEMPLATES = {
  axolotl: {
    morning:   [
      '{daysUntilExam} days until Regents. Let\'s make this morning count 🌊',
      'Good morning! {streak} days in a row. You\'re unstoppable 💗',
      'Rise and study! Your Regents score won\'t improve itself 🦎',
    ],
    afternoon: [
      'Hey! Quick quiz before your energy dips? 🦎',
      '{streak} days strong. Afternoon grind time 💗',
      '{daysUntilExam} days left. You\'ve totally got this 🌊',
    ],
    evening:   [
      'Evening study session? I love these 🌊',
      'Almost at {streak} days — one more quiz tonight?',
      'It\'s late but one constructed response before bed? For me? 💗',
    ],
  },
  fox: {
    morning:   [
      '{daysUntilExam} days. Efficiency starts now.',
      'Morning. The difference between good and great? Showing up.',
      '{streak}-day streak. Sharp. Let\'s keep it that way.',
    ],
    afternoon: [
      'Afternoon slump? Not us. Quick quiz. Go.',
      '{daysUntilExam} days until Regents. Every session counts.',
      'Your streak is {streak}. Don\'t break it now.',
    ],
    evening:   [
      'One constructed response before you sleep. That\'s the deal.',
      '{streak} days. Don\'t let fatigue end what discipline started.',
      'Evening review is where the real gains happen.',
    ],
  },
  capybara: {
    morning:   [
      'Morning 🦫 No rush. Just one unit when you\'re ready.',
      'Hey. {daysUntilExam} days til Regents. One concept at a time.',
      'Your {streak}-day streak? Very chill energy. Keep it up.',
    ],
    afternoon: [
      'Afternoon study? Peak capybara energy. Let\'s go 🌿',
      'One flashcard deck. That\'s it. That\'s enough.',
      '{daysUntilExam} days left. Manageable. Breathe.',
    ],
    evening:   [
      'Evening. Maybe one quiz? Or rest. Both are valid.',
      '{streak} days. Legitimately impressive.',
      'Even capybaras review notes before bed 🦫',
    ],
  },
  voidCat: {
    morning:   [
      'The void greets you. {daysUntilExam} days remain. Study.',
      'Morning. {streak} days. The void is watching.',
      'Another day. Another chance to not disappoint me.',
    ],
    afternoon: [
      'The void requires a quiz. Now.',
      '{daysUntilExam} days until Regents. The void has kept count.',
      'Your {streak}-day streak is adequate. Do not ruin it.',
    ],
    evening:   [
      'The void does not sleep. Neither should your study session.',
      '{streak} days. Impressive. For a mortal.',
      'One more topic. Then the void will let you rest.',
    ],
  },
  bear: {
    morning:   [
      'Morning! {daysUntilExam} days until Regents. Slow and steady 🐻',
      'Good morning! {streak} days of showing up. Keep building 🍯',
      'One quiz, one step forward. That\'s all it takes 🐾',
    ],
    afternoon: [
      '{daysUntilExam} days left. Afternoon grind with me? 🐾',
      'You\'ve been consistent. {streak} days. That matters.',
      'One more unit today. Bears don\'t quit midway 🐻',
    ],
    evening:   [
      'Evening review. I\'ll be right here with you 🐻',
      '{streak} days of showing up. That\'s everything.',
      'One constructed response before rest. Future you says thanks 🍯',
    ],
  },
  bunny: {
    morning:   [
      'Morning! {daysUntilExam} days until Regents — let\'s zoom! 🌸',
      'Hi! {streak} days straight has me so excited! 🐰',
      'Ready? Because I am! Let\'s hop into a quiz 🌸',
    ],
    afternoon: [
      'Afternoon energy! Quick quiz? I\'ll cheer you on 🐰',
      '{daysUntilExam} days left. We can totally do this!',
      '{streak} days! You\'re hopping through this! 🌸',
    ],
    evening:   [
      'Evening study! One more hop before we rest 🐰',
      '{streak} days. That\'s so impressive! One last quiz?',
      '{daysUntilExam} days. Evening review = tomorrow\'s confidence 🌸',
    ],
  },
}

const DAILY_KEY = (uid) => `@dailySpeech_v1_${uid}`

export function pickDailyMessage(petType, streak, daysUntilExam) {
  const hour   = new Date().getHours()
  const period = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'
  const pool   = TEMPLATES[petType]?.[period] ?? []
  if (!pool.length) return null
  const idx      = Math.floor(Date.now() / 86_400_000) % pool.length
  return pool[idx]
    .replace(/{streak}/g,        String(streak))
    .replace(/{daysUntilExam}/g, String(daysUntilExam))
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
export async function loadDailyMessage({ uid, petType, streak, daysUntilExam }) {
  if (!uid) return null
  const today = new Date().toISOString().slice(0, 10)
  try {
    const raw = await AsyncStorage.getItem(DAILY_KEY(uid))
    if (raw) {
      const { date, message } = JSON.parse(raw)
      if (date === today) return message
    }
  } catch {}
  const message = pickDailyMessage(petType, streak, daysUntilExam)
  if (message) {
    try {
      await AsyncStorage.setItem(DAILY_KEY(uid), JSON.stringify({ date: today, message }))
    } catch {}
  }
  return message
}
