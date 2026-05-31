import React, { useState, useEffect, useCallback, useRef } from 'react'

export default function ExamScreen({
  exam = {},
  onFinish,
  onClose,
  updateQuestProgress,
}) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [phase, setPhase] = useState('answering')
  const [score, setScore] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 minutes for mock practice

  const timerRef = useRef(null)

  const questions = exam.questions || []
  const currentQuestion = questions[index] || { text: 'Empty Question', choices: [], options: [], correct: 0 }
  const questionChoices = currentQuestion.choices || currentQuestion.options || []
  const total = questions.length
  const isLast = index === total - 1

  // Timing logic
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          handleFinish()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  const handleAnswer = useCallback((choiceIndex) => {
    if (phase !== 'answering') return
    
    // Normalize correct answer index
    const normalizedCorrect = currentQuestion.correct ?? questionChoices.indexOf(currentQuestion.correctAnswer)
    const isCorrect = choiceIndex === normalizedCorrect

    if (isCorrect) {
      setScore((s) => s + 20) // 20 XP per correct exam answer!
    } else {
      setWrongAnswers(prev => [...prev, currentQuestion])
    }

    setSelected(choiceIndex)
    setPhase('feedback')
  }, [phase, currentQuestion, questionChoices])

  const handleNext = useCallback(() => {
    if (isLast) {
      handleFinish()
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setPhase('answering')
    }
  }, [isLast, index, score, wrongAnswers])

  const handleFinish = useCallback(() => {
    clearInterval(timerRef.current)
    const accuracy = Math.round(((total - wrongAnswers.length) / total) * 100)
    
    // Update daily quests
    updateQuestProgress('complete_quiz', 1)

    onFinish({
      score,
      correct: total - wrongAnswers.length,
      total,
      pct: accuracy,
      wrongQuestions: wrongAnswers,
      bestStreak: 1
    })
  }, [score, total, wrongAnswers, onFinish, updateQuestProgress])

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
        if (confirm('Quit Exam? Your current progress will be lost.')) {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [phase, handleAnswer, handleNext, onClose])

  const normalizedCorrect = currentQuestion.correct ?? questionChoices.indexOf(currentQuestion.correctAnswer)
  const isSelectedCorrect = selected === normalizedCorrect

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="quiz-layout">
      {/* Exam Header */}
      <div className="quiz-header">
        <button className="quiz-close" onClick={() => {
          if (confirm('Quit Exam? Progress will be lost.')) onClose()
        }}>
          ✕
        </button>
        
        <div style={{ fontWeight: 800, fontFamily: 'var(--font-outfit)', fontSize: '18px' }}>
          📝 {exam.title || exam.name}
        </div>

        <div className="quiz-progress-container" style={{ margin: '0 24px', flexGrow: 1 }}>
          <div className="quiz-progress-fill" style={{ width: `${Math.round(((index + 1) / total) * 100)}%` }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            fontWeight: 800,
            fontSize: '15px',
            color: timeLeft < 60 ? 'var(--wrong)' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⏳</span> {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
          
          <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '15px', color: 'var(--text-dim)' }}>
            Q {index + 1} / {total}
          </div>
        </div>
      </div>

      {/* Exam Body */}
      <div className="quiz-body">
        <div className="quiz-content-wrapper">
          <div className="question-text">
            {currentQuestion.text}
          </div>

          {currentQuestion.context && (
            <div className="question-context">
              <strong>📖 Reading stimulus:</strong>
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

      {/* Exam Footer Action Banner */}
      <div className="quiz-footer">
        {phase === 'answering' ? (
          <div className="quiz-footer-wrapper" style={{ justifyContent: 'flex-end' }}>
            <button className="btn-duo btn-duo-outline" onClick={handleFinish}>
              Finish Exam Early
            </button>
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
                    {isSelectedCorrect ? '+20 XP Earned!' : `The correct answer was: ${questionChoices[normalizedCorrect]}`}
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
