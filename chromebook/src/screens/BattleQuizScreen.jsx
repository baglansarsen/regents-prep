import React, { useState, useEffect, useCallback, useRef } from 'react'

export default function BattleQuizScreen({
  questions = [],
  opponent = {},
  subject,
  earnXP,
  addInventory,
  updateQuestProgress,
  onFinish,
  onClose,
}) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selected, setSelected] = useState(null) // null, 0-3
  const [phase, setPhase] = useState('answering') // 'answering' | 'feedback' | 'done'
  
  // Opponent states
  const [oppIndex, setOppIndex] = useState(0)
  const [oppCorrect, setOppCorrect] = useState(0)
  const [battleLogs, setBattleLogs] = useState([`Match started against ${opponent.name}! ⚔️`])
  
  const opponentTimerRef = useRef(null)
  const startTimestampRef = useRef(Date.now())

  const currentQuestion = questions[index] || { text: 'Loading...', choices: [], options: [], correct: 0 }
  const questionChoices = currentQuestion.choices || currentQuestion.options || []
  const total = questions.length
  const isLast = index === total - 1

  // simulated opponent AI engine
  useEffect(() => {
    if (oppIndex >= total) return

    // Opponent thinking time range
    const delay = Math.floor(Math.random() * (opponent.maxTime - opponent.minTime + 1) + opponent.minTime) * 1000

    opponentTimerRef.current = setTimeout(() => {
      // Determine if opponent is correct
      const isCorrect = Math.random() < opponent.accuracy
      
      setBattleLogs(prev => [
        ...prev,
        isCorrect 
          ? `🟢 ${opponent.name} solved Question ${oppIndex + 1} correctly! 🎯`
          : `🔴 ${opponent.name} made a mistake on Question ${oppIndex + 1}! ❌`
      ])

      setOppIndex(prev => prev + 1)
      if (isCorrect) setOppCorrect(prev => prev + 1)
    }, delay)

    return () => clearTimeout(opponentTimerRef.current)
  }, [oppIndex, opponent, total])

  // Check if both finished and transition
  useEffect(() => {
    if (index >= total && oppIndex >= total && phase !== 'done') {
      handleComplete()
    }
  }, [index, oppIndex, total, phase])

  function handleComplete() {
    setPhase('done')
    const totalTime = Math.round((Date.now() - startTimestampRef.current) / 1000)
    const accuracy = Math.round((correctCount / total) * 100)
    
    // Determine winner
    let outcome = 'draw'
    if (correctCount > oppCorrect) outcome = 'win'
    else if (correctCount < oppCorrect) outcome = 'loss'
    else {
      // Tie breaker by time if same correct count
      const oppTime = Math.round(total * (opponent.minTime + opponent.maxTime) / 2) // simulated opponent speed average
      if (totalTime < oppTime) outcome = 'win'
      else if (totalTime > oppTime) outcome = 'loss'
    }

    onFinish({
      score,
      correct: correctCount,
      oppCorrect,
      total,
      pct: accuracy,
      totalTime,
      outcome,
    })
  }

  // Answer selection callback
  const handleAnswer = useCallback((choiceIndex) => {
    if (phase !== 'answering') return

    const normalizedCorrect = currentQuestion.correct ?? questionChoices.indexOf(currentQuestion.correctAnswer)
    const isCorrect = choiceIndex === normalizedCorrect

    let earned = 0
    if (isCorrect) {
      // Speed bonus if you solve before opponent gets there!
      const speedBonus = index >= oppIndex ? 5 : 0
      earned = 10 + speedBonus
      setScore(s => s + earned)
      setCorrectCount(c => c + 1)

      setBattleLogs(prev => [
        ...prev,
        speedBonus > 0 
          ? `⚡ You answered Q${index + 1} correctly (SPEED BONUS +${earned} pts)! 🏃‍♂️`
          : `✅ You solved Q${index + 1} correctly (+10 pts)!`
      ])
      
      updateQuestProgress('answer_correct', 1)
    } else {
      setBattleLogs(prev => [...prev, `❌ You missed Question ${index + 1}! No points.`])
    }

    setSelected(choiceIndex)
    setPhase('feedback')
  }, [phase, currentQuestion, index, oppIndex, questionChoices, updateQuestProgress])

  // Proceed to next
  const handleNext = useCallback(() => {
    if (isLast) {
      setIndex(total) // mark finished
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setPhase('answering')
    }
  }, [isLast, total])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (phase === 'answering') {
        if (e.key === '1') handleAnswer(0)
        else if (e.key === '2') handleAnswer(1)
        else if (e.key === '3') handleAnswer(2)
        else if (e.key === '4') handleAnswer(3)
      } else if (phase === 'feedback') {
        if (e.key === 'Enter') handleNext()
      }
      if (e.key === 'Escape') {
        if (confirm('Forfeit battle? Progress will be recorded as a loss.')) {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [phase, handleAnswer, handleNext, onClose])

  const normalizedCorrect = currentQuestion.correct ?? questionChoices.indexOf(currentQuestion.correctAnswer)
  const isSelectedCorrect = selected === normalizedCorrect

  // Render Arena Progress Tracks
  function renderProgressTracks() {
    return (
      <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
        <h4 style={{ fontFamily: 'var(--font-outfit)', fontSize: '14px', fontWeight: 800 }}>⚔️ Live Duel Progress</h4>
        
        {/* User Track */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800 }}>
            <span>🏃‍♂️ You ({index}/10)</span>
            <span style={{ color: 'var(--purple-dark)' }}>{score} pts</span>
          </div>
          <div style={{ height: '14px', background: 'var(--surface-3)', borderRadius: '7px', overflow: 'hidden', border: '1.5px solid var(--border)', position: 'relative' }}>
            <div style={{
              height: '100%',
              width: `${Math.min(100, (index / total) * 100)}%`,
              backgroundColor: 'var(--purple)',
              borderRadius: '7px',
              transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }} />
          </div>
        </div>

        {/* Opponent Track */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800 }}>
            <span>{opponent.icon} {opponent.name} ({oppIndex}/10)</span>
            <span style={{ color: 'var(--text-dim)' }}>{oppCorrect * 10} pts</span>
          </div>
          <div style={{ height: '14px', background: 'var(--surface-3)', borderRadius: '7px', overflow: 'hidden', border: '1.5px solid var(--border)' }}>
            <div style={{
              height: '100%',
              width: `${Math.min(100, (oppIndex / total) * 100)}%`,
              backgroundColor: 'var(--text-muted)',
              borderRadius: '7px',
              transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }} />
          </div>
        </div>
      </div>
    )
  }

  // Display blank loading if finished and waiting for opponent
  if (index >= total && oppIndex < total) {
    return (
      <div className="quiz-layout" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="card-glass" style={{ textAlign: 'center', padding: '40px', maxWidth: '500px', width: '90%' }}>
          <span style={{ fontSize: '48px', animation: 'float 2s infinite ease-in-out' }}>⏳</span>
          <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '22px', marginTop: '16px' }}>
            Waiting for rival...
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '20px' }}>
            You completed all questions! Please wait while {opponent.name} finishes their remaining duel steps.
          </p>
          
          <div style={{ marginTop: '24px' }}>
            {renderProgressTracks()}
          </div>

          <div className="card-glass" style={{ marginTop: '16px', maxHeight: '120px', overflowY: 'auto', textAlign: 'left', padding: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', marginBottom: '4px' }}>Live Event Commentary</div>
            {battleLogs.slice(-2).map((log, idx) => (
              <div key={idx} style={{ fontSize: '12px', padding: '2px 0', borderBottom: '1px solid var(--border)' }}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-layout">
      {/* Battle Header */}
      <div className="quiz-header">
        <button className="quiz-close" onClick={() => {
          if (confirm('Forfeit battle? Progress will be recorded as a loss.')) onClose()
        }}>
          ✕
        </button>
        
        <div style={{ fontWeight: 800, fontFamily: 'var(--font-outfit)', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚔️</span> Arena: You vs {opponent.name}
        </div>

        <div style={{ flexGrow: 1 }} />
        
        <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '15px', color: 'var(--text-muted)' }}>
          Q {Math.min(total, index + 1)} / {total}
        </div>
      </div>

      {/* Battle Body split pane */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', flexGrow: 1, overflow: 'hidden' }}>
        
        {/* Left column: Widescreen Question details */}
        <div className="quiz-body" style={{ overflowY: 'auto', borderRight: '2px solid var(--border)' }}>
          <div className="quiz-content-wrapper">
            
            <div className="question-text">
              {currentQuestion.text}
            </div>

            {currentQuestion.context && (
              <div className="question-context">
                <strong>📖 Stimulus text:</strong>
                <div style={{ marginTop: '6px' }}>{currentQuestion.context}</div>
              </div>
            )}

            {currentQuestion.diagram && (
              <div className="question-context" style={{ textAlign: 'center', borderLeftColor: 'var(--brand)' }}>
                <strong>📊 Stimulus Diagram:</strong>
                <pre style={{ marginTop: '8px', fontSize: '13px', background: 'var(--surface)', padding: '12px', borderRadius: '8px', border: '1.5px solid var(--border)', fontFamily: 'monospace', overflowX: 'auto' }}>
                  {currentQuestion.diagram}
                </pre>
              </div>
            )}

            <div className="options-list">
              {questionChoices?.map((opt, optIdx) => {
                const isSelected = selected === optIdx
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswer(optIdx)}
                    disabled={phase !== 'answering'}
                    className={`option-btn ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="option-number-badge">{optIdx + 1}</div>
                    <div className="option-text">{opt}</div>
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

        {/* Right column: Battle arena visual track and log feed */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--surface-2)', overflowY: 'auto' }}>
          
          {/* Progress visual tracks */}
          {renderProgressTracks()}

          {/* Live events stream */}
          <div className="card-glass" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', overflow: 'hidden' }}>
            <h4 style={{ fontFamily: 'var(--font-outfit)', fontSize: '14px', fontWeight: 800 }}>📜 Duel Activity Log</h4>
            <div style={{
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '12px',
              fontFamily: 'monospace',
              marginTop: '8px'
            }}>
              {battleLogs.map((log, idx) => (
                <div key={idx} style={{
                  padding: '6px 8px',
                  backgroundColor: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '8px',
                  lineHeight: '16px'
                }}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Battle Feedback bottom banner */}
      <div className="quiz-footer">
        {phase === 'answering' ? (
          <div className="quiz-footer-wrapper" style={{ justifyContent: 'flex-end' }}>
            <div style={{ fontWeight: 800, color: 'var(--purple-dark)' }}>Score: {score} XP</div>
          </div>
        ) : (
          <div className={`quiz-feedback-banner ${isSelectedCorrect ? 'correct' : 'wrong'}`}>
            <div className="feedback-wrapper">
              <div className="feedback-message">
                <span className="feedback-icon">{isSelectedCorrect ? '🎉' : '❌'}</span>
                <div>
                  <h4 className="feedback-title">
                    {isSelectedCorrect ? 'Correct!' : 'Incorrect'}
                  </h4>
                  <p className="feedback-explanation">
                    {isSelectedCorrect ? `Answered correctly!` : `The correct answer was: ${questionChoices[normalizedCorrect]}`}
                  </p>
                  {currentQuestion.explanation && (
                    <div style={{ marginTop: '6px', fontSize: '13px', fontStyle: 'italic', opacity: 0.85 }}>
                      💡 {currentQuestion.explanation}
                    </div>
                  )}
                </div>
              </div>
              <button onClick={handleNext} className="btn-duo" style={{ top: 0 }}>
                Continue (Enter)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
