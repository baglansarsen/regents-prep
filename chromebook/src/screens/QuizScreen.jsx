import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReportQuestionModal from '../components/ReportQuestionModal'
import DynamicDiagram from '../components/DynamicDiagram'
import { Reggie } from '../components/brand/Reggie'
import { useTutor } from '../hooks/useTutor'

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
  updateQuestProgress,
  pet = null,
  subject = '',
}) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [selected, setSelected] = useState(null) // null, 0-3
  const [phase, setPhase] = useState('answering') // 'answering' | 'feedback' | 'done'
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('@sound_effects_enabled') !== 'false')
  const [xpAnimation, setXpAnimation] = useState(null) // null or { amount: number, x: number, y: number }
  const [earnedXP, setEarnedXP] = useState(0)
  const [showExplanationModal, setShowExplanationModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showTutorDrawer, setShowTutorDrawer] = useState(false)
  const [tutorLevel, setTutorLevel] = useState(1) // 1 = nudge, 2 = method, 3 = full explanation
  
  const { loading: tutorLoading, data: tutorData, error: tutorError, explain: tutorExplain, reset: tutorReset } = useTutor()

  
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

  // Process selected choice
  const handleAnswer = useCallback((choiceIndex) => {
    if (phase !== 'answering') return

    // Questions in pool use either "correct" (0-based number index) or match option string
    // Let's normalize comparison:
    const isNumberCorrect = choiceIndex === currentQuestion.correct
    const isStringCorrect = questionChoices[choiceIndex] === currentQuestion.correctAnswer
    const isCorrect = isNumberCorrect || isStringCorrect

    let earned = 0

    if (isCorrect) {
      const newStreak = streak + 1
      const multiplier = streakMultiplier(newStreak)
      earned = Math.round(BASE_POINTS * multiplier)
      
      setScore((s) => s + earned)
      setEarnedXP(earned)
      setStreak(newStreak)
      setBestStreak((b) => Math.max(b, newStreak))
      
      // Update pet quest progress
      updateQuestProgress('answer_correct', 1)
      
      // Trigger floating XP animation
      setXpAnimation({ amount: earned, x: window.innerWidth / 2, y: window.innerHeight / 2 })
      setTimeout(() => setXpAnimation(null), 1200)

      // Play high pitch correct beep using standard AudioContext
      if (soundEnabled) playBeep(523.25, 'sine', 0.15) // C5
    } else {
      setWrongAnswers(prev => [...prev, currentQuestion])
      setEarnedXP(0)
      setStreak(0)
      
      // Play low pitch wrong buzz
      if (soundEnabled) playBeep(220, 'triangle', 0.25) // A3
    }

    setSelected(choiceIndex)
    setPhase('feedback')
  }, [phase, currentQuestion, questionChoices, streak, updateQuestProgress, soundEnabled, setEarnedXP])

  // Proceed to next question or end
  const handleNext = useCallback(() => {
    tutorReset()
    setShowTutorDrawer(false)
    setTutorLevel(1)
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
      setShowExplanationModal(false)
      setShowReportModal(false)
    }
  }, [isLast, score, total, wrongAnswers, bestStreak, onFinish, setShowExplanationModal, setShowReportModal, tutorReset])

  // Open AI Tutor and call the explainMistake Cloud Function
  const handleOpenTutor = useCallback(async () => {
    setShowTutorDrawer(true)
    if (!tutorData) {
      // Kick off the Cloud Function call — useTutor caches by (question, wrongIdx)
      const wrongIdx = selected
      if (wrongIdx !== null && currentQuestion) {
        await tutorExplain(currentQuestion, wrongIdx)
      }
    }
  }, [tutorData, tutorExplain, selected, currentQuestion])

  // Render the Socratic AI Tutor right-side drawer
  function renderTutorDrawer() {
    const isWrongAnswer = selected !== null && !isSelectedCorrect

    return (
      <div className={`tutor-drawer-backdrop ${showTutorDrawer ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setShowTutorDrawer(false) }}
      >
        <div className="tutor-drawer">
          <div className="tutor-drawer-header">
            <h2 className="tutor-drawer-title">🤔 Coach Reggie</h2>
            <button className="tutor-drawer-close" onClick={() => setShowTutorDrawer(false)}>✕</button>
          </div>
          <div className="tutor-drawer-body">
            {/* Mascot + intro bubble */}
            <div className="tutor-mascot-row">
              <Reggie size={64} pose="think" isAvatar />
              <div className="tutor-speech-bubble">
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Socratic Coaching
                </div>
                <div style={{ fontSize: '14px', lineHeight: '20px', color: 'var(--text)' }}>
                  {tutorLoading
                    ? 'Thinking…'
                    : tutorError
                    ? 'Hmm, couldn\'t load that — try again in a moment.'
                    : tutorData
                    ? 'I\'ll guide you step-by-step. Click to reveal more detail!'
                    : 'I\'ll help you understand why you missed this one.'}
                </div>
              </div>
            </div>

            {/* Loading spinner */}
            {tutorLoading && (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '14px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🦕</div>
                Reggie is thinking…
              </div>
            )}

            {/* Error state */}
            {tutorError && !tutorLoading && (
              <div style={{ background: 'var(--wrong-bg)', border: '1.5px solid var(--wrong)', borderRadius: '12px', padding: '16px', fontSize: '13px', color: 'var(--wrong-dark)' }}>
                ⚠️ Couldn't load explanation. Check your connection and try again.
                <button
                  onClick={() => tutorExplain(currentQuestion, selected)}
                  style={{ display: 'block', marginTop: '10px', background: 'var(--wrong)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Socratic steps — reveal one level at a time */}
            {tutorData && !tutorLoading && (
              <>
                {/* Level 1: Nudge */}
                <div className="tutor-step-card" style={{ borderColor: 'var(--brand)', background: 'var(--brand-bg)' }}>
                  <div className="tutor-step-header" style={{ color: 'var(--brand-dark)' }}>
                    <span>💡</span> Step 1 — Nudge
                  </div>
                  <div className="tutor-step-content">{tutorData.nudge}</div>
                </div>

                {/* Level 2: Method (revealed on click) */}
                {tutorLevel >= 2 ? (
                  <div className="tutor-step-card" style={{ borderColor: 'var(--warn)', background: 'var(--warn-bg)' }}>
                    <div className="tutor-step-header" style={{ color: 'var(--warn-dark)' }}>
                      <span>🧭</span> Step 2 — Strategy
                    </div>
                    <div className="tutor-step-content">{tutorData.method}</div>
                  </div>
                ) : (
                  <button
                    onClick={() => setTutorLevel(2)}
                    style={{ padding: '12px', borderRadius: '12px', border: '1.5px dashed var(--warn)', background: 'transparent', color: 'var(--warn-dark)', fontWeight: 800, fontSize: '13px', cursor: 'pointer', width: '100%' }}
                  >
                    🧭 Reveal Strategy Hint →
                  </button>
                )}

                {/* Level 3: Full Explanation (revealed on click) */}
                {tutorLevel >= 3 ? (
                  <div className="tutor-step-card" style={{ borderColor: 'var(--purple)', background: 'rgba(139,92,246,0.08)' }}>
                    <div className="tutor-step-header" style={{ color: 'var(--purple)' }}>
                      <span>🔍</span> Step 3 — Full Coaching
                    </div>
                    <div className="tutor-step-content">{tutorData.explanation}</div>
                  </div>
                ) : tutorLevel >= 2 ? (
                  <button
                    onClick={() => setTutorLevel(3)}
                    style={{ padding: '12px', borderRadius: '12px', border: '1.5px dashed var(--purple)', background: 'transparent', color: 'var(--purple)', fontWeight: 800, fontSize: '13px', cursor: 'pointer', width: '100%' }}
                  >
                    🔍 Reveal Full Coaching →
                  </button>
                ) : null}
              </>
            )}

            {/* Wrong answer context */}
            {isWrongAnswer && (
              <div style={{ background: 'var(--wrong-bg)', border: '1px solid var(--wrong)', borderRadius: '12px', padding: '14px', fontSize: '13px' }}>
                <div style={{ fontWeight: 700, color: 'var(--wrong-dark)', marginBottom: '4px' }}>❌ Your answer:</div>
                <div style={{ color: 'var(--text)' }}>{questionChoices[selected]}</div>
                <div style={{ fontWeight: 700, color: 'var(--brand-dark)', marginTop: '10px', marginBottom: '4px' }}>✅ Correct answer:</div>
                <div style={{ color: 'var(--text)' }}>{questionChoices[normalizedCorrect]}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
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
              <div style={{ marginTop: '8px' }}>
                <DynamicDiagram diagram={currentQuestion.diagram} />
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
          <div className="quiz-footer-wrapper" style={{ justifyContent: streak > 1 ? 'space-between' : 'flex-end' }}>
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
                    {isSelectedCorrect ? 'Awesome! Correct!' : 'Incorrect Answer'}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '4px' }}>
                    <p className="feedback-explanation" style={{ margin: 0 }}>
                      {isSelectedCorrect
                        ? `Earned +${earnedXP} XP!`
                        : `Correct option was: ${questionChoices[normalizedCorrect]}`}
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
                    {/* AI Tutor button — only on wrong answers */}
                    {!isSelectedCorrect && (
                      <button
                        onClick={handleOpenTutor}
                        className="btn-duo-outline"
                        style={{
                          padding: '6px 14px',
                          fontSize: '13px',
                          fontWeight: 900,
                          borderRadius: '16px',
                          borderWidth: '1.5px',
                          borderColor: 'var(--brand)',
                          color: 'var(--brand-dark)',
                          background: 'var(--brand-bg)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        🤔 Ask AI Tutor
                      </button>
                    )}
                  </div>
                  
                  {/* Detailed explanation text */}
                  {explanationParts.short && (
                    <div style={{ marginTop: '8px', fontSize: '13px', fontStyle: 'italic', maxWidth: '600px', opacity: 0.85 }}>
                      💡 <strong>Short Explanation:</strong> {explanationParts.short}
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

      {/* Floating XP Animation overlay */}
      {xpAnimation && (
        <div className="floating-xp" style={{ left: `${xpAnimation.x}px`, top: `${xpAnimation.y}px` }}>
          +{xpAnimation.amount} XP ⭐
        </div>
      )}

      {/* Pet companion reactions bubble */}
      {pet && pet.chosen && (
        <div className={`pet-quiz-companion ${selected === null ? 'thinking' : isSelectedCorrect ? 'correct' : 'wrong'}`}>
          <div className="pet-quiz-sprite-container" style={{ width: '48px', height: '48px', overflow: 'hidden' }}>
            {(() => {
              const companionPose = selected === null ? 'think' : isSelectedCorrect ? 'cheer' : 'sleepy';
              return <Reggie isAvatar={true} size={48} pose={companionPose} accessories={pet.accessories || []} />;
            })()}
          </div>
          <div className="pet-quiz-bubble-speech">
            {selected === null ? '🧐 Focus, buddy!' : isSelectedCorrect ? '🎉 Correct! +XP' : '🥺 You got this!'}
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

      {/* AI Tutor Socratic Drawer — always mounted, toggled via .open class */}
      {renderTutorDrawer()}
    </div>
  )
}
