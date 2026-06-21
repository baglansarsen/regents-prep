import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReportQuestionModal from '../components/ReportQuestionModal'
import DynamicDiagram from '../components/DynamicDiagram'
import { Reggie } from '../components/brand/Reggie'

export default function ExamScreen({
  exam = {},
  onFinish,
  onClose,
  updateQuestProgress,
  pet = null,
}) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [phase, setPhase] = useState('answering')
  const [score, setScore] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [soundEnabled] = useState(() => localStorage.getItem('@sound_effects_enabled') !== 'false')
  const [xpAnimation, setXpAnimation] = useState(null) // null or { amount: number, x: number, y: number }
  const [showExplanationModal, setShowExplanationModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)

  const [writtenAnswer, setWrittenAnswer] = useState('')
  const [awardedPoints, setAwardedPoints] = useState(0) // Credits awarded by self-grading
  const fullResultsRef = useRef([])

  const questions = exam.questions || []
  const currentQuestion = questions[index] || { text: 'Empty Question', choices: [], options: [], correct: 0 }
  const questionChoices = currentQuestion.choices || currentQuestion.options || []
  const total = questions.length
  const isLast = index === total - 1

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

  const handleAnswer = useCallback((choiceIndex) => {
    if (phase !== 'answering') return
    
    // Normalize correct answer index
    const normalizedCorrect = currentQuestion.correct ?? questionChoices.indexOf(currentQuestion.correctAnswer)
    const isCorrect = choiceIndex === normalizedCorrect

    if (isCorrect) {
      setScore((s) => s + 20)
    } else {
      setWrongAnswers(prev => [...prev, currentQuestion])
    }

    fullResultsRef.current.push({ question: currentQuestion, correct: isCorrect, selected: choiceIndex })
    setSelected(choiceIndex)
    setPhase('feedback')
  }, [phase, currentQuestion, questionChoices, soundEnabled])

  const handleNext = useCallback(() => {
    if (isLast) {
      handleFinish()
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
      setWrittenAnswer('')
      setAwardedPoints(0)
      setPhase('answering')
      setShowExplanationModal(false)
      setShowReportModal(false)
    }
  }, [isLast, index, score, wrongAnswers, setShowExplanationModal, setShowReportModal])

  const handleFinish = useCallback(() => {
    const accuracy = Math.round(((total - wrongAnswers.length) / total) * 100)
    
    // Update daily quests
    updateQuestProgress('complete_quiz', 1)

    onFinish({
      score,
      correct: total - wrongAnswers.length,
      total,
      pct: accuracy,
      wrongQuestions: wrongAnswers,
      bestStreak: 1,
      fullResults: fullResultsRef.current,
    })
  }, [score, total, wrongAnswers, onFinish, updateQuestProgress])

  // Derived question state (must be declared before useEffect that references isWritten)
  const isWritten = currentQuestion.type === 'written'
  const normalizedCorrect = isWritten ? null : (currentQuestion.correct ?? questionChoices.indexOf(currentQuestion.correctAnswer))
  const isSelectedCorrect = isWritten ? awardedPoints > 0 : selected === normalizedCorrect

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (phase === 'answering' && !isWritten) {
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
  }, [phase, handleAnswer, handleNext, onClose, isWritten])

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

  // (isWritten, normalizedCorrect, isSelectedCorrect are now declared above the useEffect block)

  // Get short and extended explanations
  const getExplanationParts = () => {
    const rawExplanation = currentQuestion.explanation || currentQuestion.modelAnswer || '';
    const correctText = isWritten ? 'official model answer' : (questionChoices[normalizedCorrect] || '');
    
    if (rawExplanation) {
      const sentences = rawExplanation.split(/(?<=[.!?])\s+/);
      return {
        short: sentences[0],
        extended: rawExplanation
      };
    }
    return {
      short: isWritten
        ? `Review the official model answer and grading rubric to evaluate your written response.`
        : `Option ${normalizedCorrect + 1} ("${correctText}") is correct as it aligns with Regents standards for ${currentQuestion.topic || 'this topic'}.`,
      extended: isWritten
        ? `This constructed response question evaluates key curriculum principles in "${currentQuestion.topic || 'General Science/Math'}". Under standard Regents grading rubrics, students receive full credits by providing a scientifically accurate and complete explanation that directly addresses all parts of the prompt.`
        : `Under NYS Regents curriculum guidelines, this question evaluates concepts in "${currentQuestion.topic || 'General Science/Math'}". Reviewing "${correctText}" will solidify your understanding of these core principles. Keep practicing this area to achieve mastery.`
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
      {/* Exam Header */}
      <div className="quiz-header">
        <button className="quiz-close" onClick={() => {
          if (confirm('Quit Exam? Progress will be lost.')) onClose()
        }}>
          ✕
        </button>
        
        <div style={{ fontWeight: 800, fontFamily: 'var(--font-outfit)', fontSize: '18px' }}>
          📝 {exam.title || exam.name || `${exam.session} ${exam.year} Regents Exam`}
        </div>

        <div className="quiz-progress-container" style={{ margin: '0 24px', flexGrow: 1 }}>
          <div className="quiz-progress-fill" style={{ width: `${Math.round(((index + 1) / total) * 100)}%` }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
              <strong>📖 Reading stimulus:</strong>
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

          {isWritten ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              {phase === 'answering' ? (
                <>
                  <textarea
                    className="free-response-textarea card-glass"
                    placeholder="Type your answer or show your work here..."
                    value={writtenAnswer}
                    onChange={(e) => setWrittenAnswer(e.target.value)}
                    style={{
                      width: '100%',
                      minHeight: '140px',
                      padding: '16px',
                      fontSize: '15px',
                      color: 'var(--text)',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '12px',
                      resize: 'vertical',
                      outline: 'none',
                      fontFamily: 'inherit',
                      lineHeight: '22px'
                    }}
                  />
                  <button
                    className="btn-duo btn-duo-blue"
                    onClick={() => {
                      if (!writtenAnswer.trim()) {
                        alert('Please type your answer before submitting.');
                        return;
                      }
                      fullResultsRef.current.push({ question: currentQuestion, correct: false, selected: writtenAnswer })
                      setSelected(true);
                      setPhase('feedback');
                    }}
                    style={{ alignSelf: 'flex-start', padding: '12px 24px', fontSize: '15px' }}
                  >
                    Submit Written Answer
                  </button>
                </>
              ) : (
                <div className="card-glass" style={{ padding: '20px', borderLeft: '4px solid var(--brand)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '28px' }}>📝</span>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: '15px', color: 'var(--brand-dark)', margin: 0 }}>Answer recorded</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0' }}>You'll self-grade this at the end of the exam.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
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
          )}

          {/* Desktop Hotkey Instruction */}
          {!isWritten && (
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
          )}
        </div>
      </div>

      {/* Exam Footer */}
      <div className="quiz-footer">
        <div className="quiz-footer-wrapper" style={{ justifyContent: 'space-between' }}>
          <button className="btn-duo btn-duo-outline" onClick={handleFinish} style={{ opacity: 0.7 }}>
            Finish Early
          </button>
          {phase === 'feedback' && (
            <button className="btn-duo btn-duo-blue" onClick={handleNext} style={{ minWidth: '160px' }}>
              {isLast ? 'Submit Exam ✓' : 'Next Question →'}
            </button>
          )}
        </div>
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
            {selected === null ? '📝 Aced this mock!' : isSelectedCorrect ? '🎉 Excellent! +20 XP' : '🥺 You got this!'}
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

            {currentQuestion.diveDeep && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))',
                borderLeft: '4px solid var(--purple)',
                padding: '14px',
                borderRadius: '0 8px 8px 0',
              }}>
                <strong style={{ fontSize: '12px', color: 'var(--purple-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px' }}>
                  🔬 Dive Deep
                </strong>
                <p style={{ fontSize: '13px', lineHeight: '19px', color: 'var(--text)', margin: 0 }}>
                  {currentQuestion.diveDeep}
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
        subject={exam.subject || ''}
        examId={exam.id || ''}
      />
    </div>
  )
}
