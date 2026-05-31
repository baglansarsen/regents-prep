import React, { useState, useEffect, useCallback, useRef } from 'react'

const TIMER_SECONDS = 30
const BASE_POINTS = 10
const SPEED_BONUS_MAX = 5

function streakMultiplier(streak) {
  if (streak >= 5) return 2.0
  if (streak >= 3) return 1.5
  if (streak >= 2) return 1.25
  return 1.0
}

export default function QuizScreen({
  questions = [],
  onFinish,
  onClose,
  loseLife,
  updateQuestProgress,
}) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [selected, setSelected] = useState(null) // null, 0-3, 'timeout'
  const [phase, setPhase] = useState('answering') // 'answering' | 'feedback' | 'done'
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(true)

  const timerRef = useRef(null)
  
  const currentQuestion = questions[index] || { text: 'Loading Question...', choices: [], options: [], correct: 0 }
  const questionChoices = currentQuestion.choices || currentQuestion.options || []
  const total = questions.length
  const isLast = index === total - 1

  // Speech accessibility
  const speakQuestion = useCallback(() => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(currentQuestion.text)
    utterance.rate = 0.95
    window.speechSynthesis.speak(utterance)
  }, [currentQuestion])

  // Handle timeout
  const handleTimeout = useCallback(() => {
    if (phase !== 'answering') return
    setSelected('timeout')
    setWrongAnswers(prev => [...prev, currentQuestion])
    setStreak(0)
    loseLife() // Lose a heart on timeout
    setPhase('feedback')
  }, [phase, currentQuestion, loseLife])

  // Start question timer
  useEffect(() => {
    if (phase !== 'answering') return
    setTimeLeft(TIMER_SECONDS)

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [index, phase])

  // Listen for countdown completion
  useEffect(() => {
    if (phase === 'answering' && timeLeft <= 0) {
      clearInterval(timerRef.current)
      handleTimeout()
    }
  }, [timeLeft, phase, handleTimeout])

  // Process selected choice
  const handleAnswer = useCallback((choiceIndex) => {
    if (phase !== 'answering') return
    clearInterval(timerRef.current)

    // Questions in pool use either "correct" (0-based number index) or match option string
    // Let's normalize comparison:
    const isNumberCorrect = choiceIndex === currentQuestion.correct
    const isStringCorrect = questionChoices[choiceIndex] === currentQuestion.correctAnswer
    const isCorrect = isNumberCorrect || isStringCorrect

    let earned = 0

    if (isCorrect) {
      const speedBonus = Math.round((Math.max(0, timeLeft) / TIMER_SECONDS) * SPEED_BONUS_MAX)
      const newStreak = streak + 1
      const multiplier = streakMultiplier(newStreak)
      earned = Math.round((BASE_POINTS + speedBonus) * multiplier)
      
      setScore((s) => s + earned)
      setStreak(newStreak)
      setBestStreak((b) => Math.max(b, newStreak))
      
      // Update pet quest progress
      updateQuestProgress('answer_correct', 1)
      
      // Play high pitch correct beep using standard AudioContext
      if (soundEnabled) playBeep(523.25, 'sine', 0.15) // C5
    } else {
      setWrongAnswers(prev => [...prev, currentQuestion])
      setStreak(0)
      loseLife() // Lose a heart on wrong answer
      
      // Play low pitch wrong buzz
      if (soundEnabled) playBeep(220, 'triangle', 0.25) // A3
    }

    setSelected(choiceIndex)
    setPhase('feedback')
  }, [phase, currentQuestion, streak, timeLeft, loseLife, updateQuestProgress, soundEnabled])

  // Proceed to next question or end
  const handleNext = useCallback(() => {
    if (isLast) {
      // Calculate results and fire callback
      const accuracy = Math.round(((total - wrongAnswers.length) / total) * 100)
      onFinish({
        score,
        correct: total - wrongAnswers.length,
        total,
        pct: accuracy,
        wrongQuestions: wrongAnswers,
        bestStreak
      })
      setPhase('done')
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setPhase('answering')
    }
  }, [isLast, score, total, wrongAnswers, bestStreak, onFinish])

  // Audio synthesize beep
  function playBeep(freq, type, duration) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.type = type
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + duration)
    } catch {}
  }

  // Keyboard Hotkeys
  useEffect(() => {
    function handleKeyDown(e) {
      if (phase === 'answering') {
        if (e.key === '1') handleAnswer(0)
        else if (e.key === '2') handleAnswer(1)
        else if (e.key === '3') handleAnswer(2)
        else if (e.key === '4') handleAnswer(3)
        else if (e.key === ' ') { e.preventDefault(); speakQuestion() }
      } else if (phase === 'feedback') {
        if (e.key === 'Enter') handleNext()
      }
      if (e.key === 'Escape') {
        if (confirm('Quit studying? Progress of this session will be lost.')) {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [phase, handleAnswer, handleNext, speakQuestion, onClose])

  const normalizedCorrect = currentQuestion.correct ?? questionChoices.indexOf(currentQuestion.correctAnswer)
  const isSelectedCorrect = selected === normalizedCorrect

  return (
    <div className="quiz-layout">
      {/* Quiz Widescreen Header */}
      <div className="quiz-header">
        <button className="quiz-close" onClick={() => {
          if (confirm('Quit studying? Progress will be lost.')) onClose()
        }}>
          ✕
        </button>
        
        <div className="quiz-progress-container">
          <div className="quiz-progress-fill" style={{ width: `${Math.round(((index + 1) / total) * 100)}%` }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn-duo-outline"
            style={{ padding: '6px 12px', fontSize: '14px', borderBottomWidth: '2.5px' }}
            title="Toggle Beep Sounds"
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          
          <button
            onClick={speakQuestion}
            className="btn-duo-outline"
            style={{ padding: '6px 12px', fontSize: '14px', borderBottomWidth: '2.5px' }}
            title="Read Question Aloud (Space)"
          >
            🗣️ Listen
          </button>

          <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '16px', color: 'var(--text-muted)' }}>
            Q {index + 1} / {total}
          </div>
        </div>
      </div>

      {/* Quiz Body */}
      <div className="quiz-body">
        <div className="quiz-content-wrapper">
          
          {/* Question Text */}
          <div className="question-text">
            {currentQuestion.text}
          </div>

          {/* Side-by-side reading content or large visual diagrams */}
          {currentQuestion.context && (
            <div className="question-context">
              <strong>📖 Reading Context:</strong>
              <div style={{ marginTop: '6px' }}>{currentQuestion.context}</div>
            </div>
          )}

          {currentQuestion.diagram && (
            <div className="question-context" style={{ textAlign: 'center', borderLeftColor: 'var(--brand)' }}>
              <strong>📊 Diagram:</strong>
              <div style={{ marginTop: '8px', fontSize: '13px', background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1.5px solid var(--border)', fontFamily: 'monospace' }}>
                {currentQuestion.diagram}
              </div>
            </div>
          )}

          {/* Multiple Choice Options */}
          <div className="options-list">
            {questionChoices?.map((opt, optIdx) => {
              const isSelected = selected === optIdx
              
              let classNames = "option-btn"
              if (isSelected) classNames += " selected"

              return (
                <button
                  key={optIdx}
                  onClick={() => handleAnswer(optIdx)}
                  disabled={phase !== 'answering'}
                  className={classNames}
                >
                  <div className="option-number-badge">
                    {optIdx + 1}
                  </div>
                  <div className="option-text">
                    {opt}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Desktop Hotkey Instruction */}
          <div className="hotkey-instruction">
            <span>⌨️ Chromebook Hotkeys: Press</span>
            <span className="hotkey-key">1</span>
            <span className="hotkey-key">2</span>
            <span className="hotkey-key">3</span>
            <span className="hotkey-key">4</span>
            <span>to select, and</span>
            <span className="hotkey-key">Enter</span>
            <span>to proceed.</span>
          </div>
        </div>
      </div>

      {/* Action Footer banner */}
      <div className="quiz-footer">
        {phase === 'answering' ? (
          <div className="quiz-footer-wrapper" style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>⏳</span>
              <div style={{ fontWeight: 800 }}>Time Left: <span style={{ color: timeLeft < 10 ? 'var(--wrong)' : 'var(--text)', transition: 'color 0.2s' }}>{timeLeft}s</span></div>
            </div>
            {streak > 1 && (
              <div style={{ fontWeight: 800, color: 'var(--warn-dark)', background: 'var(--warn-bg)', border: '1.5px solid var(--warn)', borderRadius: '8px', padding: '6px 12px', fontSize: '13px' }}>
                🔥 {streak} Streak! ({streakMultiplier(streak)}x multiplier)
              </div>
            )}
          </div>
        ) : (
          <div className={`quiz-feedback-banner ${isSelectedCorrect ? 'correct' : 'wrong'}`}>
            <div className="feedback-wrapper">
              <div className="feedback-message">
                <span className="feedback-icon">{isSelectedCorrect ? '🎉' : '❌'}</span>
                <div>
                  <h4 className="feedback-title">
                    {selected === 'timeout' ? 'Time is up!' : isSelectedCorrect ? 'Awesome! Correct!' : 'Incorrect Answer'}
                  </h4>
                  <p className="feedback-explanation">
                    {isSelectedCorrect
                      ? `Earned +${score} XP!`
                      : `Correct option was: ${questionChoices[normalizedCorrect]}`}
                  </p>
                  
                  {/* Detailed explanation text */}
                  {currentQuestion.explanation && (
                    <div style={{ marginTop: '8px', fontSize: '13px', fontStyle: 'italic', maxWidth: '600px', opacity: 0.85 }}>
                      💡 {currentQuestion.explanation}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleNext}
                className={`btn-duo ${isSelectedCorrect ? 'btn-duo-correct' : 'btn-duo-wrong'}`}
                style={{ top: 0 }}
              >
                Continue (Enter)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
