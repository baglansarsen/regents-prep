import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Reggie } from '../components/brand/Reggie'
import {
  useFocusSession,
  FOCUS_PRESETS,
  SUBJECT_CHIPS,
  SOUND_OPTIONS
} from '../hooks/useFocusSession'

const BACKGROUNDS = [
  { id: 'sky',     emoji: '☀️', label: 'Sunny',   top: '#FEF3C7', bottom: '#FDE68A', accent: '#F59E0B' },
  { id: 'night',   emoji: '🌙', label: 'Night',   top: '#1E1B4B', bottom: '#312E81', accent: '#818CF8' },
  { id: 'forest',  emoji: '🌿', label: 'Forest',  top: '#D1FAE5', bottom: '#6EE7B7', accent: '#10B981' },
  { id: 'ocean',   emoji: '🌊', label: 'Ocean',   top: '#DBEAFE', bottom: '#93C5FD', accent: '#3B82F6' },
  { id: 'sunset',  emoji: '🌅', label: 'Sunset',  top: '#FEE2E2', bottom: '#FDBA74', accent: '#EF4444' },
  { id: 'space',   emoji: '🚀', label: 'Space',   top: '#0F172A', bottom: '#1E293B', accent: '#6366F1' },
]

const SESSION_GOAL_PET_MESSAGES = {
  reggie: 'ROAR! You completed all your study pomodoros! Super work! 🦖',
  default: 'Session goal reached! You crushed it! 🌟',
}

export default function FocusScreen({
  user,
  earnXP,
  pet,
  setScreen,
}) {
  const uid = user?.uid

  const [buddyMessage, setBuddyMessage] = useState(null)
  const [todoInput, setTodoInput] = useState('')
  const [customSubject, setCustomSubject] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [background, setBackground] = useState(BACKGROUNDS[0])
  const [goalCelebModal, setGoalCelebModal] = useState(false)

  const handlePomodoroComplete = useCallback((count) => {
    setBuddyMessage(`Amazing! ${count} pomodoro${count > 1 ? 's' : ''} done! 🍅`)
    if (earnXP) earnXP(15) // award XP on Chromebook for each completed pomodoro
    setTimeout(() => setBuddyMessage(null), 4000)
  }, [earnXP])

  const session = useFocusSession(uid, earnXP, handlePomodoroComplete)
  const {
    phase, secondsLeft, progress, pomodoroCount, sessionRP, partialMinutes, cyclePosition,
    preset, setPreset, subject, setSubject, sound, setSound, sessionGoal, setSessionGoal,
    todos, addTodo, toggleTodo,
    start, pause, resume, skip, stop, reset,
    history
  } = session

  // Determine Reggie Pose & Message based on Timer State
  const reggiePose = useMemo(() => {
    if (phase === 'paused' || phase === 'idle') return 'happy'
    if (phase === 'focus') return 'think'
    if (phase === 'break') return 'sleepy'
    if (phase === 'done') return 'cheer'
    return 'happy'
  }, [phase])

  // Phase Transition Messages
  const prevPhase = useRef(phase)
  useEffect(() => {
    if (prevPhase.current === phase) return
    const prev = prevPhase.current
    prevPhase.current = phase

    if (phase === 'focus' && prev === 'idle') {
      const name = pet?.name ?? 'Reggie'
      setBuddyMessage(`${name} is ready to focus! 📚`)
      setTimeout(() => setBuddyMessage(null), 3000)
    }
    if (phase === 'break') {
      setBuddyMessage('Take a break, you earned it! ☕')
      setTimeout(() => setBuddyMessage(null), 3500)
    }
    if (phase === 'focus' && prev === 'break') {
      setBuddyMessage("Let's focus again! 💪")
      setTimeout(() => setBuddyMessage(null), 2500)
    }
    if (phase === 'done') {
      setBuddyMessage('Incredible focus today! ⭐')
      setTimeout(() => setBuddyMessage(null), 4000)
    }
  }, [phase, pet])

  // Session Goal Celebration
  useEffect(() => {
    if (sessionGoal === 0 || pomodoroCount < sessionGoal) return
    if (pomodoroCount !== sessionGoal) return
    const msg = SESSION_GOAL_PET_MESSAGES.reggie
    setBuddyMessage(msg)
    setTimeout(() => setGoalCelebModal(true), 600)
  }, [pomodoroCount, sessionGoal])

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

  function handleAddTodo(e) {
    e.preventDefault()
    if (!todoInput.trim()) return
    addTodo(todoInput)
    setTodoInput('')
  }

  const formatCountdown = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const isActive = phase === 'focus' || phase === 'break' || phase === 'paused'
  const isDone   = phase === 'done'

  // Text Color calculations for Background
  const isDarkBg = background.id === 'night' || background.id === 'space'
  const textColor = isDarkBg ? '#fff' : 'var(--text)'
  const cardColor = isDarkBg ? 'rgba(30, 41, 59, 0.7)' : 'var(--surface)'
  const mutedColor = isDarkBg ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)'

  // ── 1. DONE VIEW ──
  if (isDone) {
    const doneTodos    = todos.filter((t) => t.done).length
    const totalTodos   = todos.length
    const displayMin   = pomodoroCount * preset.study + partialMinutes

    return (
      <div className="screen-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '24px' }}>
        <div className="card-glass" style={{ maxWidth: '520px', width: '100%', padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '72px' }}>🎉</span>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px' }}>Great session!</h1>

          {subject && (
            <div style={{ backgroundColor: 'var(--brand-bg)', color: 'var(--brand-dark)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 800 }}>
              {subject}
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', width: '100%', margin: '12px 0' }}>
            <div className="card-glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '24px' }}>⏱</span>
              <span style={{ fontWeight: 800, marginTop: '4px' }}>{displayMin} min</span>
            </div>
            {pomodoroCount > 0 && (
              <div className="card-glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }}>🍅</span>
                <span style={{ fontWeight: 800, marginTop: '4px' }}>×{pomodoroCount}</span>
              </div>
            )}
            <div className="card-glass" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '24px' }}>⭐</span>
              <span style={{ fontWeight: 800, marginTop: '4px', color: 'var(--warn-dark)' }}>+{sessionRP} XP</span>
            </div>
          </div>

          {totalTodos > 0 && (
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 700 }}>
              ✓ {doneTodos} of {totalTodos} tasks completed
            </p>
          )}

          {/* Dino companion */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
            <Reggie pose="cheer" size={120} accessories={pet?.accessories || []} />
            {buddyMessage && (
              <div className="chat-bubble" style={{ padding: '8px 16px', borderRadius: '12px', background: 'var(--brand-bg)', color: 'var(--brand-dark)', fontWeight: 800, fontSize: '13px' }}>
                {buddyMessage}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '12px' }}>
            <button className="btn-duo btn-duo-blue" style={{ flex: 1, padding: '12px' }} onClick={reset}>
              New Session
            </button>
            <button className="btn-duo-outline" style={{ flex: 1, padding: '12px', borderBottomWidth: '2.5px' }} onClick={() => setScreen('focusHistory')}>
              View History
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── 2. ACTIVE VIEW (Timer countdown) ──
  if (isActive) {
    const isBreak = phase === 'break'

    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(180deg, ${background.top}, ${background.bottom})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: textColor,
        transition: 'background 0.5s ease',
        zIndex: 10
      }}>
        <div style={{ maxWidth: '560px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <button
              className="btn-duo-outline"
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: textColor,
                borderColor: isDarkBg ? 'rgba(255,255,255,0.3)' : 'var(--border)',
                padding: '8px 16px',
                borderBottomWidth: '2px'
              }}
              onClick={() => {
                if (window.confirm('Stop session and save your study progress?')) {
                  stop()
                }
              }}
            >
              ✕ Stop
            </button>

            <div style={{ textAlign: 'center' }}>
              {subject && <h3 style={{ fontWeight: 800, fontSize: '16px', margin: 0 }}>{subject}</h3>}
              <p style={{ fontSize: '14px', opacity: 0.8, margin: '2px 0 0 0' }}>
                Session Goal: {pomodoroCount} / {sessionGoal || 'No goal'} 🍅
              </p>
            </div>

            <button
              className="btn-duo btn-duo-correct"
              style={{ padding: '8px 16px', backgroundColor: background.accent, borderColor: 'transparent' }}
              onClick={stop}
            >
              Finish
            </button>
          </div>

          {/* Dino Mascot reaction */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minHeight: '170px' }}>
            <Reggie pose={reggiePose} size={140} accessories={pet?.accessories || []} />
            {buddyMessage && (
              <div className="chat-bubble" style={{
                padding: '10px 16px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.92)',
                color: '#0F2018',
                fontWeight: 800,
                fontSize: '13px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                maxWidth: '280px',
                textAlign: 'center',
                animation: 'scale-up 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}>
                {buddyMessage}
              </div>
            )}
          </div>

          {/* Pomodoro cycle indicators */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: i < cyclePosition ? background.accent
                  : i === cyclePosition ? `${background.accent}80`
                  : 'rgba(0,0,0,0.15)',
                transition: 'background-color 0.3s'
              }} />
            ))}
          </div>

          {/* SVG Countdown Ring */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}>
            <svg width="220" height="220" viewBox="0 0 220 220">
              <circle cx="110" cy="110" r="95" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
              <circle cx="110" cy="110" r="95" fill="none" stroke={background.accent} strokeWidth="10"
                strokeDasharray={2 * Math.PI * 95}
                strokeDashoffset={2 * Math.PI * 95 * (1 - progress)}
                strokeLinecap="round"
                transform="rotate(-90 110 110)"
                style={{ transition: 'stroke-dashoffset 0.25s linear' }}
              />
            </svg>
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '38px', fontWeight: 900, fontFamily: 'var(--font-outfit)' }}>
                {formatCountdown(secondsLeft)}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, marginTop: '2px' }}>
                {isBreak ? '☕ Break' : '📚 Study'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
            {phase === 'paused' ? (
              <button className="btn-duo btn-duo-correct" style={{ flex: 2, padding: '14px', backgroundColor: background.accent }} onClick={resume}>
                ▶ Resume
              </button>
            ) : (
              <button className="btn-duo-outline" style={{ flex: 2, padding: '14px', backgroundColor: 'rgba(255,255,255,0.12)', color: textColor, borderColor: isDarkBg ? 'rgba(255,255,255,0.3)' : 'var(--border)', borderBottomWidth: '3px' }} onClick={pause}>
                ⏸ Pause
              </button>
            )}
            <button className="btn-duo-outline" style={{ flex: 1, padding: '14px', backgroundColor: 'rgba(255,255,255,0.08)', color: textColor, borderColor: isDarkBg ? 'rgba(255,255,255,0.2)' : 'var(--border)', borderBottomWidth: '3px' }} onClick={skip}>
              ⏭ Skip
            </button>
          </div>

          {/* Todo Active checklist */}
          {todos.length > 0 && (
            <div className="card-glass" style={{ width: '100%', backgroundColor: cardColor, padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
              {todos.map(t => (
                <div key={t.id} onClick={() => toggleTodo(t.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', cursor: 'pointer' }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    border: `1.5px solid ${t.done ? background.accent : (isDarkBg ? '#fff' : 'var(--text)')}`,
                    backgroundColor: t.done ? background.accent : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {t.done && <span style={{ color: '#fff', fontSize: '11px', fontWeight: 900 }}>✓</span>}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    textDecoration: t.done ? 'line-through' : 'none',
                    opacity: t.done ? 0.5 : 1
                  }}>{t.text}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    )
  }

  // ── 3. IDLE SETUP VIEW ──
  return (
    <div className="screen-container" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', animation: 'fade-in 0.25s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>🎯</span> Focus Mode Study Timer
          </h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="btn-duo-outline" style={{ padding: '8px 16px', fontSize: '13px', borderBottomWidth: '2px' }} onClick={() => setScreen('focusHistory')}>
              ⌛ History
            </button>
            <button className="btn-duo-outline" style={{ padding: '8px 16px', fontSize: '13px', borderBottomWidth: '2px' }} onClick={() => setScreen('home')}>
              ✕ Back
            </button>
          </div>
        </div>

        {/* Setup card */}
        <div className="card-glass" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Subject chip selection */}
          <div>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '12px' }}>
              What are you studying?
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {SUBJECT_CHIPS.map(chip => {
                const active = subject === `${chip.emoji} ${chip.label}`
                return (
                  <button
                    key={chip.id}
                    className={`btn-duo-outline ${active ? 'active' : ''}`}
                    onClick={() => handleSubjectChip(chip)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: 800,
                      borderColor: active ? 'var(--brand)' : 'var(--border)',
                      backgroundColor: active ? 'var(--brand-bg)' : 'var(--surface)',
                      color: active ? 'var(--brand-dark)' : 'var(--text)',
                      borderBottomWidth: '2.5px'
                    }}
                  >
                    <span>{chip.emoji}</span> {chip.label}
                  </button>
                )
              })}
              <button
                className={`btn-duo-outline ${showCustomInput ? 'active' : ''}`}
                onClick={() => { setShowCustomInput(true); setSubject('') }}
                style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 800, borderBottomWidth: '2.5px' }}
              >
                ✏️ Other
              </button>
            </div>

            {showCustomInput && (
              <input
                type="text"
                placeholder="e.g. History readings, Drawing..."
                value={customSubject}
                onChange={e => setCustomSubject(e.target.value)}
                onBlur={handleCustomSubject}
                onKeyDown={e => e.key === 'Enter' && handleCustomSubject()}
                style={{
                  width: '100%',
                  marginTop: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid var(--border)',
                  fontSize: '14px',
                  fontWeight: 700,
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text)',
                  outline: 'none'
                }}
              />
            )}
          </div>

          {/* Presets */}
          <div>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '12px' }}>
              Session Length
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              {FOCUS_PRESETS.map(p => {
                const active = preset.id === p.id
                return (
                  <button
                    key={p.id}
                    className="btn-duo-outline"
                    onClick={() => setPreset(p)}
                    style={{
                      flex: 1,
                      padding: '16px 8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      borderColor: active ? 'var(--brand)' : 'var(--border)',
                      backgroundColor: active ? 'var(--brand-bg)' : 'var(--surface)',
                      color: active ? 'var(--brand-dark)' : 'var(--text)',
                      borderBottomWidth: '3.5px'
                    }}
                  >
                    <span style={{ fontSize: '17px', fontWeight: 900 }}>{p.label}</span>
                    <span style={{ fontSize: '11px', opacity: 0.7 }}>{p.break}m break</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Session Goal */}
          <div>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '12px' }}>
              Session Goal
            </h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[0, 1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  className={`btn-duo-outline ${sessionGoal === n ? 'active' : ''}`}
                  onClick={() => setSessionGoal(n)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 800,
                    borderColor: sessionGoal === n ? 'var(--brand)' : 'var(--border)',
                    backgroundColor: sessionGoal === n ? 'var(--brand-bg)' : 'var(--surface)',
                    color: sessionGoal === n ? 'var(--brand-dark)' : 'var(--text)',
                    borderBottomWidth: '2.5px'
                  }}
                >
                  {n === 0 ? 'None' : `${n} 🍅`}
                </button>
              ))}
            </div>
          </div>

          {/* Tasks Todo list */}
          <div>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '12px' }}>
              Tasks (Optional)
            </h3>
            <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="What tasks do you want to accomplish?"
                value={todoInput}
                onChange={e => setTodoInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid var(--border)',
                  fontSize: '14px',
                  fontWeight: 700,
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text)',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-duo btn-duo-blue" style={{ padding: '12px 24px', fontSize: '14px' }}>
                Add
              </button>
            </form>

            {todos.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                {todos.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', backgroundColor: 'var(--surface-2)', borderRadius: '10px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>{t.text}</span>
                    <button type="button" onClick={() => toggleTodo(t.id)} style={{ border: 'none', background: 'none', color: 'var(--text-dim)', fontSize: '15px', cursor: 'pointer' }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Ambient Sounds */}
          <div>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '12px' }}>
              Background Ambient Sound
            </h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              {SOUND_OPTIONS.map(opt => {
                const active = sound.id === opt.id
                return (
                  <button
                    key={opt.id}
                    className={`btn-duo-outline ${active ? 'active' : ''}`}
                    onClick={() => setSound(opt)}
                    style={{
                      flex: 1,
                      padding: '10px 6px',
                      fontSize: '13px',
                      fontWeight: 800,
                      borderColor: active ? 'var(--brand)' : 'var(--border)',
                      backgroundColor: active ? 'var(--brand-bg)' : 'var(--surface)',
                      color: active ? 'var(--brand-dark)' : 'var(--text)',
                      borderBottomWidth: '2.5px'
                    }}
                  >
                    <span>{opt.emoji}</span> {opt.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Theme Background swatches */}
          <div>
            <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '12px' }}>
              Background Scene Theme
            </h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              {BACKGROUNDS.map(bg => (
                <button
                  key={bg.id}
                  onClick={() => setBackground(bg)}
                  style={{
                    flex: 1,
                    padding: '10px 4px',
                    borderRadius: '12px',
                    border: background.id === bg.id ? '3px solid var(--text)' : '2px solid transparent',
                    background: `linear-gradient(135deg, ${bg.top}, ${bg.bottom})`,
                    color: (bg.id === 'night' || bg.id === 'space') ? '#fff' : '#000',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{bg.emoji}</span>
                  <span style={{ fontSize: '11px', fontWeight: 800 }}>{bg.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mascot Preview widget */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', backgroundColor: 'var(--brand-bg)', borderRadius: '16px', padding: '16px' }}>
            <Reggie pose="happy" size={80} accessories={pet?.accessories || []} />
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontWeight: 800, color: 'var(--brand-dark)', fontSize: '15px' }}>Study Buddy focus companion</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0 0', lineHeight: '18px' }}>
                Your pet Reggie will study alongside you, bounce on completions, and rest during breaks!
              </p>
            </div>
          </div>

          {/* Start CTA */}
          <button
            className="btn-duo btn-duo-correct"
            onClick={start}
            style={{
              padding: '16px',
              fontSize: '16px',
              fontWeight: 900,
              backgroundColor: background.accent,
              borderColor: 'transparent',
              color: '#fff',
              marginTop: '10px'
            }}
          >
            ▶ Start Study Session
          </button>

        </div>

        {/* Goals celebration popup modal */}
        {goalCelebModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15,23,42,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            animation: 'fade-in 0.25s ease'
          }}>
            <div className="card-glass" style={{ maxWidth: '440px', width: '90%', padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', animation: 'scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              <span style={{ fontSize: '64px' }}>🎯</span>
              <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '24px' }}>Session Goal Reached!</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '22px' }}>
                Awesome! You completed your {sessionGoal} pomodoro set. Reggie is so proud of your consistency!
              </p>
              <div style={{ backgroundColor: 'var(--brand-bg)', borderRadius: '12px', padding: '16px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '32px' }}>🦖</span>
                <span style={{ color: 'var(--brand-dark)', fontWeight: 800, fontSize: '13px' }}>+8 Happiness bonus for Reggie!</span>
              </div>
              <button className="btn-duo btn-duo-correct" style={{ width: '100%', padding: '12px' }} onClick={() => setGoalCelebModal(false)}>
                Keep Studying! 🚀
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
