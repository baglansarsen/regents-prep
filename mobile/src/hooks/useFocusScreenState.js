/**
 * useFocusScreenState — orchestration hook for FocusScreen.jsx.
 *
 * FocusScreen.jsx calls this hook exactly once (FOCUS-02). It wraps the
 * existing, untouched useFocusSession domain hook (Pattern 1 in
 * 02-PATTERNS.md: "wrap, don't absorb") and owns everything that used to be
 * local state, effects, and handlers directly inside the screen component:
 * the buddy-message pet reactions, the session-goal celebration trigger, the
 * back-gesture end-session guard, the subject/custom-subject handlers, the
 * add-todo handler, and the background/goal-celebration-modal local state.
 *
 * Signature is `useFocusScreenState(navigation)` — not `(uid, navigation)` as
 * 02-PATTERNS.md's illustrative sample shows. Reading the uid from
 * useAuthContext() *inside* this hook while also taking it as a parameter
 * would be redundant; taking only `navigation` is what lets FocusScreen.jsx
 * stop importing AuthContext entirely (02-01-PLAN.md's documented deviation).
 *
 * This return shape is the contract plans 02-02 through 02-07 consume —
 * treat it as frozen.
 */
import { useState, useCallback, useRef, useEffect } from 'react'
import { Alert } from 'react-native'
import { useAuthContext } from '../context/AuthContext'
import { useRP } from './useRP'
import { usePetContext } from '../context/PetContext'
import { useFocusSession, SUBJECT_CHIPS, SOUND_OPTIONS } from './useFocusSession'

// ── Background scenes (Study Bunny-style) ─────────────────────────────────────
// Moved verbatim from FocusScreen.jsx. Exported — components receive it as
// data, mirroring how useFocusSession already exports SUBJECT_CHIPS/SOUND_OPTIONS.
export const BACKGROUNDS = [
  { id: 'sky',     emoji: '☀️', label: 'Sunny',   top: '#FEF3C7', bottom: '#FDE68A', accent: '#F59E0B' },
  { id: 'night',   emoji: '🌙', label: 'Night',   top: '#1E1B4B', bottom: '#312E81', accent: '#818CF8' },
  { id: 'forest',  emoji: '🌿', label: 'Forest',  top: '#D1FAE5', bottom: '#6EE7B7', accent: '#10B981' },
  { id: 'ocean',   emoji: '🌊', label: 'Ocean',   top: '#DBEAFE', bottom: '#93C5FD', accent: '#3B82F6' },
  { id: 'sunset',  emoji: '🌅', label: 'Sunset',  top: '#FEE2E2', bottom: '#FDBA74', accent: '#EF4444' },
  { id: 'space',   emoji: '🚀', label: 'Space',   top: '#0F172A', bottom: '#1E293B', accent: '#6366F1' },
]

const SESSION_GOAL_PET_MESSAGES = {
  dog:     'WOOF! You did all your pomodoros! Hero! 🐕',
  cat:     '*slow blink* I acknowledge your effort. Acceptable. 🐱',
  parrot:  'SESSION COMPLETE! SQUAWK! All goals crushed! 🦜',
  rabbit:  'You hopped through every pomodoro! Amazing! 🐰',
  fish:    '*excited bubble stream* You finished your set! 🐟',
  hamster: 'The wheel is done! Full session complete! 🐹',
  default: 'Session goal reached! You crushed it! 🌟',
}

export function useFocusScreenState(navigation) {
  const { user } = useAuthContext()
  const uid = user?.uid
  const { earnRP } = useRP(uid)
  const { triggerReaction, studyBoost, say, pet } = usePetContext()

  const [buddyMessage, setBuddyMessage] = useState(null)
  const [todoInput, setTodoInput]       = useState('')
  const [customSubject, setCustomSubject] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [background, setBackground] = useState(BACKGROUNDS[0])
  const [goalCelebModal, setGoalCelebModal] = useState(false)

  const handlePomodoroComplete = useCallback((count) => {
    triggerReaction('happy_dance')
    studyBoost?.()
    setBuddyMessage(`Amazing! ${count} pomodoro${count > 1 ? 's' : ''} done! 🍅`)
    setTimeout(() => setBuddyMessage(null), 3500)
  }, [triggerReaction, studyBoost])

  const session = useFocusSession(uid, earnRP, handlePomodoroComplete)  // WRAP, not absorb
  const { phase, setSubject, sessionGoal, pomodoroCount, addTodo, toggleTodo, stop, history } = session

  const isActive = phase === 'focus' || phase === 'break' || phase === 'paused'
  const isDone   = phase === 'done'

  // Pet reactions on phase transitions — moved verbatim from FocusScreen.jsx.
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

  // Session goal celebration — moved verbatim from FocusScreen.jsx.
  useEffect(() => {
    if (sessionGoal === 0 || pomodoroCount < sessionGoal) return
    if (pomodoroCount !== sessionGoal) return
    // Goal just reached
    triggerReaction('celebrate')
    studyBoost?.()
    const msg = SESSION_GOAL_PET_MESSAGES[pet?.petType] ?? SESSION_GOAL_PET_MESSAGES.default
    setBuddyMessage(msg)
    setTimeout(() => setGoalCelebModal(true), 600)
  }, [pomodoroCount, sessionGoal])

  // Back-gesture guard during active session — moved verbatim from
  // FocusScreen.jsx, using the shared confirmEndSession helper (see below)
  // so the dialog copy stays in exactly one place while the two post-stop
  // outcomes (dispatch the intercepted action vs. plain goBack) stay distinct.
  useEffect(() => {
    if (phase !== 'focus' && phase !== 'break' && phase !== 'paused') return
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
      confirmEndSession(() => navigation.dispatch(e.data.action))
    })
    return unsubscribe
  }, [phase, stop, navigation])

  function handleSubjectChip(chip) {
    setShowCustomInput(false)
    setCustomSubject('')
    setSubject(chip.emoji + ' ' + chip.label)
  }

  function showCustomSubjectInput() {
    setShowCustomInput(true)
    setSubject('')
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

  function clearBuddyMessage() {
    setBuddyMessage(null)
  }

  function dismissGoalCeleb() {
    setGoalCelebModal(false)
  }

  function goBack() {
    navigation.goBack()
  }

  function openHistory() {
    navigation.navigate('FocusHistory', { history })
  }

  // Two end-session confirmation paths share the same dialog copy but finish
  // differently — the back-gesture guard above dispatches the intercepted
  // navigation action, this one goes back. See 02-CHARACTERIZATION.md
  // "Leaving an active session": these are NOT byte-identical, so they stay
  // as two distinct call sites sharing one dialog-showing helper.
  function confirmEndSession(onStopped) {
    Alert.alert('End Session?', 'Stop now and save your progress?', [
      { text: 'Keep Going', onPress: () => {} },
      {
        text: 'Stop & Save',
        style: 'destructive',
        onPress: () => {
          stop()
          onStopped()
        }
      }
    ])
  }

  function confirmStopAndGoBack() {
    confirmEndSession(() => navigation.goBack())
  }

  return {
    // Everything the wrapped domain hook returns.
    ...session,
    // Derived booleans.
    isActive,
    isDone,
    // Option data.
    subjectChips: SUBJECT_CHIPS,
    soundOptions: SOUND_OPTIONS,
    backgrounds: BACKGROUNDS,
    // Screen-local values.
    buddyMessage,
    todoInput,
    setTodoInput,
    customSubject,
    setCustomSubject,
    showCustomInput,
    background,
    setBackground,
    goalCelebModal,
    pet,
    // Handlers.
    handleSubjectChip,
    showCustomSubjectInput,
    handleCustomSubject,
    handleAddTodo,
    clearBuddyMessage,
    dismissGoalCeleb,
    goBack,
    openHistory,
    confirmStopAndGoBack,
  }
}
