import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReportQuestionModal from '../components/ReportQuestionModal'
import DynamicDiagram from '../components/DynamicDiagram'

export default function BattleQuizScreen({
  questions = [],
  opponent = {},
  subject,
  earnXP,
  addInventory,
  updateQuestProgress,
  onFinish,
  onClose,
  pet = null,
}) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selected, setSelected] = useState(null) // null, 0-3
  const [phase, setPhase] = useState('answering') // 'answering' | 'feedback' | 'done'
  const [soundEnabled] = useState(() => localStorage.getItem('@sound_effects_enabled') !== 'false')
  const [xpAnimation, setXpAnimation] = useState(null) // null or { amount: number, x: number, y: number }
  const [showExplanationModal, setShowExplanationModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  
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

      // Trigger floating XP animation
      setXpAnimation({ amount: earned, x: window.innerWidth / 2, y: window.innerHeight / 2 })
      setTimeout(() => setXpAnimation(null), 1200)

      // Play C5 high-pitched tone
      if (soundEnabled) playBeep(523.25, 'sine', 0.15)
    } else {
      setBattleLogs(prev => [...prev, `❌ You missed Question ${index + 1}! No points.`])

      // Play A3 low buzz
      if (soundEnabled) playBeep(220, 'triangle', 0.25)
    }

    setSelected(choiceIndex)
    setPhase('feedback')
  }, [phase, currentQuestion, index, oppIndex, questionChoices, updateQuestProgress, soundEnabled])

  // Proceed to next
  const handleNext = useCallback(() => {
    if (isLast) {
      setIndex(total) // mark finished
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setPhase('answering')
      setShowExplanationModal(false)
      setShowReportModal(false)
    }
  }, [isLast, total, setShowExplanationModal, setShowReportModal])

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

  // Auto-render math formulas in the DOM using KaTeX
  useEffect(() => {
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    }
  }, [index, phase, showExplanationModal]);

  const normalizedCorrect = currentQuestion.correct ?? questionChoices.indexOf(currentQuestion.correctAnswer)
  const isSelectedCorrect = selected === normalizedCorrect

  // Get short and extended explanations
  const getExplanationParts = () => {
    const rawExplanation = currentQuestion.explanation || '';
    const correctText = questionChoices[normalizedCorrect] || '';
    
    if (rawExplanation) {
      const sentences = rawExplanation.split(/(?<=[.!?])\s+/);
      return {
        short: sentences[0],
        extended: rawExplanation
      };
    }
    return {
      short: `Option ${normalizedCorrect + 1} ("${correctText}") is correct as it aligns with Regents standards for ${currentQuestion.topic || 'this topic'}.`,
      extended: `Under NYS Regents curriculum guidelines, this question evaluates concepts in "${currentQuestion.topic || 'General Science/Math'}". Reviewing "${correctText}" will solidify your understanding of these core principles. Keep practicing this area to achieve mastery.`
    };
  };

  const explanationParts = getExplanationParts();
  const petName = pet?.name || 'Study Buddy';

  function renderVisualAid(question) {
    const topic = (question.topic || '').toLowerCase();
    
    // 1. If the question has an image diagram, always show it first
    const imageBlock = question.image ? (
      <div style={{ textAlign: 'center', margin: '8px 0', padding: '10px', background: 'var(--surface-3)', borderRadius: '8px', border: '1.5px dashed var(--border)' }}>
        <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.5px' }}>
          📊 Active Question Diagram
        </div>
        <img
          src={question.image}
          alt="Deep dive diagram"
          style={{ maxWidth: '100%', maxHeight: '180px', borderRadius: '6px', border: '1px solid var(--border)' }}
        />
      </div>
    ) : null;

    // 2. Identify if this is a complex topic that warrants a visual/formula sheet
    let aidCard = null;

    if (topic.includes('kinematics') || topic.includes('forces') || topic.includes('motion')) {
      aidCard = (
        <div className="card-glass" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))', border: '1.5px solid var(--purple)', padding: '12px', borderRadius: '8px', marginTop: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--purple-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>📐</span> Physics Formula Visualizer
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '8px 0', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--text)' }}>
            <div>v = d / t</div>
            <div style={{ borderLeft: '1px solid var(--border)', height: '16px' }} />
            <div>a = Δv / t</div>
            <div style={{ borderLeft: '1px solid var(--border)', height: '16px' }} />
            <div>F = m • a</div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: '15px' }}>
            <strong>Concept Tip:</strong> Vector quantities require both <em>magnitude</em> and <em>direction</em> (e.g. displacement, velocity, force). Scalar quantities only have magnitude (e.g. distance, speed, mass).
          </div>
        </div>
      );
    } else if (topic.includes('electricity') || topic.includes('circuit')) {
      aidCard = (
        <div className="card-glass" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))', border: '1.5px solid var(--warn)', padding: '12px', borderRadius: '8px', marginTop: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--warn-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>⚡</span> Electricity & Circuit Helper
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '8px 0', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--text)' }}>
            <div>V = I • R</div>
            <div style={{ borderLeft: '1px solid var(--border)', height: '16px' }} />
            <div>P = V • I</div>
            <div style={{ borderLeft: '1px solid var(--border)', height: '16px' }} />
            <div>W = Pt = VIt</div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: '15px' }}>
            <strong>Circuit Rules:</strong> In <em>series</em> circuits, current (I) is constant everywhere. In <em>parallel</em> circuits, voltage (V) is constant across all branches.
          </div>
        </div>
      );
    } else if (topic.includes('light') || topic.includes('optic') || topic.includes('wave') || topic.includes('sound')) {
      aidCard = (
        <div className="card-glass" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))', border: '1.5px solid var(--brand)', padding: '12px', borderRadius: '8px', marginTop: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--brand-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🌊</span> Wave Mechanics & Spectrum Guide
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '8px 0', background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--text)' }}>
            <div>v = f • λ</div>
            <div style={{ borderLeft: '1px solid var(--border)', height: '16px' }} />
            <div>T = 1 / f</div>
            <div style={{ borderLeft: '1px solid var(--border)', height: '16px' }} />
            <div>n = c / v</div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: '15px' }}>
            <strong>Wave Tip:</strong> Sound waves are <em>longitudinal</em> and require a medium. Light waves are <em>transverse</em> electromagnetic waves and can travel through a vacuum.
          </div>
        </div>
      );
    } else if (topic.includes('biology') || topic.includes('cell') || topic.includes('genetics') || topic.includes('evolution')) {
      aidCard = (
        <div className="card-glass" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))', border: '1.5px solid var(--purple)', padding: '12px', borderRadius: '8px', marginTop: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--purple-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🧬</span> Biological Blueprint Insights
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0', background: 'rgba(0,0,0,0.2)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', color: 'var(--text)' }}>
            <div>🧬 DNA ➔ mRNA ➔ Protein</div>
            <div style={{ borderLeft: '1px solid var(--border)', height: '16px' }} />
            <div>🧫 Mitosis (Growth) vs Meiosis (Gametes)</div>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: '15px' }}>
            <strong>Tutor Hint:</strong> Environmental factors (like temperature or chemicals) can influence gene expression without altering the underlying DNA sequence.
          </div>
        </div>
      );
    } else if (question.diagram || topic.includes('earth') || topic.includes('rock') || topic.includes('geology') || topic.includes('weathering')) {
      aidCard = (
        <div className="card-glass" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(16, 185, 129, 0.1))', border: '1.5px solid var(--brand)', padding: '12px', borderRadius: '8px', marginTop: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--brand-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🌎</span> Earth Dynamics & Geology Reference
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: '15px' }}>
            <strong>Superposition Rule:</strong> In undisturbed rock layers, the oldest layer is always at the bottom, and the youngest is at the top.
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontSize: '10px' }}>
            <span style={{ padding: '2px 6px', background: 'var(--surface-3)', borderRadius: '4px', border: '1px solid var(--border)' }}>🪨 Igneous (Cooling)</span>
            <span style={{ padding: '2px 6px', background: 'var(--surface-3)', borderRadius: '4px', border: '1px solid var(--border)' }}>🐚 Sedimentary (Layers)</span>
            <span style={{ padding: '2px 6px', background: 'var(--surface-3)', borderRadius: '4px', border: '1px solid var(--border)' }}>💎 Metamorphic (Heat/Pressure)</span>
          </div>
        </div>
      );
    } else {
      // Default help card for general/unclassified harder questions
      aidCard = (
        <div className="card-glass" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))', border: '1.5px dashed var(--border)', padding: '12px', borderRadius: '8px', marginTop: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>💡</span> Study Companion Topic Strategy
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '15px' }}>
            To answer Regents questions correctly, always eliminate options that contradict basic laws of conservation (energy/mass) or basic definitions. Focus on key terms in the question stem.
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        {imageBlock}
        {aidCard}
      </div>
    );
  }

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

            {/* Question image (diagrams, graphs, charts from CDN) */}
            {currentQuestion.image && (
              <div style={{ textAlign: 'center', margin: '12px 0' }}>
                <img
                  src={currentQuestion.image}
                  alt="Question diagram"
                  style={{ maxWidth: '100%', maxHeight: '320px', borderRadius: '8px', border: '1.5px solid var(--border)' }}
                />
              </div>
            )}

            {currentQuestion.context && (
              <div className="question-context">
                <strong>📖 Stimulus text:</strong>
                <div style={{ marginTop: '6px' }}>{currentQuestion.context}</div>
              </div>
            )}

            {currentQuestion.diagram && (
              <div className="question-context" style={{ textAlign: 'center', borderLeftColor: 'var(--brand)' }}>
                <strong>📊 Stimulus Diagram:</strong>
                <div style={{ marginTop: '8px' }}>
                  <DynamicDiagram diagram={currentQuestion.diagram} />
                </div>
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
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '4px' }}>
                    <p className="feedback-explanation" style={{ margin: 0 }}>
                      {isSelectedCorrect ? `Answered correctly!` : `The correct answer was: ${questionChoices[normalizedCorrect]}`}
                    </p>
                    <button
                      onClick={() => setShowExplanationModal(true)}
                      className="btn-duo-outline"
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 900,
                        borderRadius: '16px',
                        borderWidth: '1.5px',
                        borderColor: isSelectedCorrect ? 'var(--brand)' : 'var(--wrong)',
                        color: isSelectedCorrect ? 'var(--brand-dark)' : 'var(--wrong-dark)',
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      📖 Deep Dive
                    </button>
                    <button
                      onClick={() => setShowReportModal(true)}
                      className="btn-duo-outline"
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 900,
                        borderRadius: '16px',
                        borderWidth: '1.5px',
                        borderColor: 'var(--border)',
                        color: 'var(--text-muted)',
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      🚩 Report
                    </button>
                  </div>
                  {explanationParts.short && (
                    <div style={{ marginTop: '6px', fontSize: '13px', fontStyle: 'italic', opacity: 0.85 }}>
                      💡 <strong>Short Explanation:</strong> {explanationParts.short}
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

      {/* Floating XP Animation overlay */}
      {xpAnimation && (
        <div className="floating-xp" style={{ left: `${xpAnimation.x}px`, top: `${xpAnimation.y}px` }}>
          +{xpAnimation.amount} XP ⭐
        </div>
      )}

      {/* Pet companion reactions bubble */}
      {pet && pet.chosen && (
        <div className={`pet-quiz-companion ${selected === null ? 'thinking' : isSelectedCorrect ? 'correct' : 'wrong'}`}>
          <div className="pet-quiz-sprite-container">
            <span style={{ fontSize: '48px' }}>
              {pet.petType === 'axolotl' ? '🦎' : pet.petType === 'fox' ? '🦊' : pet.petType === 'capybara' ? '🦫' : pet.petType === 'bear' ? '🐻' : pet.petType === 'bunny' ? '🐰' : '🐱'}
            </span>
            {/* Accessories layers */}
            {pet.accessories?.includes('graduationCap') && <span className="pet-accessory" style={{ position: 'absolute', top: '-12px', left: '16px', fontSize: '24px' }}>🎓</span>}
            {pet.accessories?.includes('wizardHat') && <span className="pet-accessory" style={{ position: 'absolute', top: '-14px', left: '16px', fontSize: '24px' }}>🧙</span>}
            {pet.accessories?.includes('cowboyHat') && <span className="pet-accessory" style={{ position: 'absolute', top: '-14px', left: '16px', fontSize: '24px' }}>🤠</span>}
            {pet.accessories?.includes('crown') && <span className="pet-accessory" style={{ position: 'absolute', top: '-14px', left: '16px', fontSize: '24px' }}>👑</span>}
            {pet.accessories?.includes('sunglasses') && <span style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '18px' }}>🕶️</span>}
            {pet.accessories?.includes('tinyBackpack') && <span style={{ position: 'absolute', bottom: '0px', right: '0px', fontSize: '18px' }}>🎒</span>}
            {pet.accessories?.includes('glowAura') && <span style={{ position: 'absolute', inset: 0, fontSize: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 1.5s infinite', opacity: 0.3 }}>✨</span>}
          </div>
          <div className="pet-quiz-bubble-speech">
            {selected === null ? '⚔️ Defeat them!' : isSelectedCorrect ? '🎉 Boom! Correct!' : '🥺 You got this!'}
          </div>
          <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--text-muted)' }}>{pet.name}</div>
        </div>
      )}

      {/* Detailed Explanation Modal Pop-up */}
      {showExplanationModal && (
        <div
          className="modal-backdrop-animate"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            padding: '20px',
          }}
        >
          <div
            className="card-glass modal-content-animate"
            style={{
              maxWidth: '560px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              padding: '28px',
              textAlign: 'left',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border)', paddingBottom: '12px' }}>
              <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '20px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🧠</span> Deep Dive Insights
              </h3>
              <button
                onClick={() => setShowExplanationModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '20px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  padding: '0 4px',
                }}
              >
                ✕
              </button>
            </div>

            <div>
              <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.8px', marginBottom: '6px' }}>
                Question
              </div>
              <p style={{ fontWeight: 800, fontSize: '15px', lineHeight: '22px', margin: 0 }}>
                {currentQuestion.text}
              </p>
              {explanationParts.short && (
                <div style={{ marginTop: '10px', fontSize: '13px', background: 'var(--brand-bg)', borderLeft: '3px solid var(--brand)', padding: '8px 12px', borderRadius: '4px', color: 'var(--brand-dark)', fontWeight: 700 }}>
                  💡 <strong>Short Explanation:</strong> {explanationParts.short}
                </div>
              )}
              {/* Dynamic study guide visual aid for harder questions */}
              {renderVisualAid(currentQuestion)}
            </div>

            {explanationParts.extended && (
              <div style={{
                background: 'var(--surface-2)',
                borderLeft: '4px solid var(--brand)',
                padding: '14px',
                borderRadius: '0 8px 8px 0',
              }}>
                <strong style={{ fontSize: '12px', color: 'var(--brand-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                  📖 {petName}'s Full Explanation
                </strong>
                <p style={{ fontSize: '13px', lineHeight: '18px', fontStyle: 'italic', color: 'var(--text)', margin: 0 }}>
                  {explanationParts.extended}
                </p>
              </div>
            )}

            <button
              className="btn-duo btn-duo-purple"
              onClick={() => setShowExplanationModal(false)}
              style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: 800, marginTop: '4px', cursor: 'pointer' }}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      {/* Flag Incorrect Question Modal */}
      <ReportQuestionModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        question={currentQuestion}
        subject={subject}
      />
    </div>
  )
}
