import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useProgress } from '../hooks/useProgress'
import { useUnlocks } from '../hooks/useUnlocks'

import * as leData from '@content/living-environment/index'
import * as esData from '@content/earth-science/index'
import * as chemData from '@content/chemistry/index'
import * as physData from '@content/physics/index'
import * as alg1Data from '@content/algebra-1/index'
import * as alg2Data from '@content/algebra-2/index'
import * as geomData from '@content/geometry/index'
import * as lsData from '@content/life-science/index'

const SUBJECT_DATA = {
  'living-environment': leData,
  'earth-science':      esData,
  'chemistry':          chemData,
  'physics':            physData,
  'algebra-1':          alg1Data,
  'algebra-2':          alg2Data,
  'geometry':           geomData,
  'life-science':       lsData,
}


const LETTERS = ['A', 'B', 'C', 'D']
const LETTER_COLORS = ['#34B3F1', '#7C5CFC', '#FF9600', '#FF5A5F']
const TARGET = 10
const UNLOCK_PCT = 80

function shuffle(array) {
  const next = [...array]
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = next[i]
    next[i] = next[j]
    next[j] = tmp
  }
  return next
}

function buildPlacementSet(topicOrder, questions, target = TARGET) {
  function pick(topic, n) {
    const pool = questions.filter((q) => q.topic === topic)
    return shuffle(pool).slice(0, n)
  }

  const guaranteed = topicOrder
    .map((t) => pick(t, 1)[0])
    .filter(Boolean)

  const extras = shuffle(topicOrder)
    .flatMap((t) => pick(t, 2).slice(1))

  const combined = [...guaranteed, ...extras]
  const used = new Set()
  const deduped = combined.filter((q) => {
    if (used.has(q.id)) return false
    used.add(q.id)
    return true
  })

  return shuffle(deduped).slice(0, target)
}

function scoreByTopic(questionSet, answers) {
  const map = {}
  questionSet.forEach((q, i) => {
    const t = q.topic
    if (!map[t]) map[t] = { correct: 0, total: 0 }
    map[t].total++
    const correctIdx = q.correct ?? q.correctIndex
    if (answers[i] === correctIdx) map[t].correct++
  })
  return map
}

export default function PlacementTestScreen({
  user,
  subject,
  onComplete,
}) {
  const uid = user?.uid
  const sd = SUBJECT_DATA[subject] ?? leData
  const { history, saveResult } = useProgress(uid)
  const { forceUnlock } = useUnlocks(history, sd.TOPIC_ORDER ?? [], subject)

  const questionSet = useMemo(
    () => buildPlacementSet(sd.TOPIC_ORDER ?? [], sd.questions ?? []),
    [sd]
  )
  const total = questionSet.length

  const [index,     setIndex]     = useState(0)
  const [selected,  setSelected]  = useState(null)
  const [answers,   setAnswers]   = useState([])
  const [phase,     setPhase]     = useState('intro') // 'intro' | 'quiz' | 'results'
  const [saving,    setSaving]    = useState(false)

  const autoTimer = useRef(null)

  function handleAnswer(idx) {
    if (selected !== null) return
    setSelected(idx)

    const newAnswers = [...answers, idx]
    autoTimer.current = setTimeout(() => {
      const next = index + 1
      if (next >= total) {
        setAnswers(newAnswers)
        setPhase('results')
      } else {
        setAnswers(newAnswers)
        setSelected(null)
        setIndex(next)
      }
    }, 1300)
  }

  useEffect(() => {
    return () => clearTimeout(autoTimer.current)
  }, [])

  async function handleSkip() {
    clearTimeout(autoTimer.current)
    await markDone()
    onComplete()
  }

  async function applyAndContinue() {
    setSaving(true)
    const topicScores = scoreByTopic(questionSet, answers)

    // Save history entries per topic
    const saves = Object.entries(topicScores).map(([topic, { correct, total: t }]) => {
      const pct = Math.round((correct / t) * 100)
      return saveResult({ topic, score: correct * 10, total: t, correct, pct, subject })
    })
    await Promise.all(saves)

    // Unlock aced topics (score >= 80%)
    const unlocks = Object.entries(topicScores)
      .filter(([, { correct, total: t }]) => Math.round((correct / t) * 100) >= UNLOCK_PCT)
      .map(([topic]) => forceUnlock(topic))
    await Promise.all(unlocks)

    await markDone()
    setSaving(false)
    onComplete()
  }

  async function markDone() {
    try {
      localStorage.setItem(`@placementDone_v1_${uid ?? 'guest'}`, '1')
    } catch {}
  }

  if (total === 0) {
    markDone().then(() => onComplete())
    return null
  }

  // ── A. INTRO SCREEN ──
  if (phase === 'intro') {
    return (
      <div className="screen-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '24px', animation: 'fade-in 0.25s ease' }}>
        <div className="card-glass" style={{ maxWidth: '520px', width: '100%', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--brand-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '42px' }}>🎯</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '26px', textAlign: 'center' }}>
            Diagnostic Placement Test
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', lineHeight: '22px' }}>
            Answer {total} quick questions so we can estimate your level, skip what you already know, and unlock advanced units!
          </p>

          <div style={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', backgroundColor: 'var(--surface-2)', borderRadius: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>⚡</span>
              <span style={{ fontSize: '13px', fontWeight: 700 }}>Takes less than 3 minutes</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>❤️</span>
              <span style={{ fontSize: '13px', fontWeight: 700 }}>No timer, no lives pressure</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '18px' }}>🔓</span>
              <span style={{ fontSize: '13px', fontWeight: 700 }}>Mastered topics unlock instantly</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginTop: '8px' }}>
            <button className="btn-duo btn-duo-correct" style={{ padding: '14px' }} onClick={() => setPhase('quiz')}>
              Start Diagnostic Test →
            </button>
            <button className="btn-duo-outline" style={{ padding: '12px', borderBottomWidth: '2.5px' }} onClick={handleSkip}>
              Skip for Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── B. QUIZ SCREEN ──
  if (phase === 'quiz') {
    const q = questionSet[index]
    const correctIdx = q.correct ?? q.correctIndex

    function choiceStyle(idx) {
      const base = {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '16px',
        padding: '14px 20px',
        gap: '14px',
        border: '2.5px solid var(--border)',
        backgroundColor: 'var(--surface)',
        width: '100%',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 700,
        color: 'var(--text)',
        transition: 'all 0.2s',
      }

      if (selected === null) return base
      if (idx === correctIdx) {
        return {
          ...base,
          backgroundColor: 'var(--correct-bg)',
          borderColor: 'var(--correct)'
        }
      }
      if (idx === selected) {
        return {
          ...base,
          backgroundColor: 'var(--wrong-bg)',
          borderColor: 'var(--wrong)'
        }
      }
      return {
        ...base,
        opacity: 0.4
      }
    }

    function letterStyle(idx) {
      const base = {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        backgroundColor: LETTER_COLORS[idx],
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-fredoka)',
        fontWeight: 700,
        fontSize: '13px'
      }

      if (selected === null) return base
      if (idx === correctIdx) return { ...base, backgroundColor: 'var(--correct)' }
      if (idx === selected) return { ...base, backgroundColor: 'var(--wrong)' }
      return { ...base, opacity: 0.5 }
    }

    return (
      <div className="screen-container" style={{ padding: '24px', maxWidth: '640px', margin: '0 auto', animation: 'fade-in 0.25s ease' }}>
        
        {/* Header progress info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--brand-dark)' }}>
              Diagnostic Onboarding
            </span>
            <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '18px', margin: '2px 0 0 0' }}>
              Question {index + 1} of {total}
            </h2>
          </div>
          <button className="btn-duo-outline" style={{ padding: '6px 12px', fontSize: '12px', borderBottomWidth: '1.5px' }} onClick={handleSkip}>
            Skip test →
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ height: '8px', backgroundColor: 'var(--surface-3)', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{
            height: '100%',
            backgroundColor: 'var(--brand)',
            width: `${((index + (selected !== null ? 1 : 0)) / total) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Topic Badge */}
        <div style={{
          alignSelf: 'flex-start',
          backgroundColor: 'var(--brand-bg)',
          color: 'var(--brand-dark)',
          padding: '6px 12px',
          borderRadius: '16px',
          fontSize: '12px',
          fontWeight: 800,
          marginBottom: '16px',
          display: 'inline-block'
        }}>
          {sd.TOPIC_ICONS?.[q.topic] ?? '📖'} {q.topic}
        </div>

        {/* Question Panel */}
        <div className="card-glass" style={{ padding: '24px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, lineHeight: '26px' }}>{q.text}</h3>
        </div>

        {/* Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {q.choices.map((choice, idx) => (
            <button
              key={idx}
              style={choiceStyle(idx)}
              onClick={() => handleAnswer(idx)}
              disabled={selected !== null}
            >
              <div style={letterStyle(idx)}>
                {LETTERS[idx]}
              </div>
              <span style={{ flex: 1, textAlign: 'left' }}>{choice}</span>
              {selected !== null && idx === correctIdx && <span>✅</span>}
              {selected === idx && idx !== correctIdx && <span>❌</span>}
            </button>
          ))}
        </div>

      </div>
    )
  }

  // ── C. RESULTS SCREEN ──
  const topicScores = scoreByTopic(questionSet, answers)
  const unlockedList = (sd.TOPIC_ORDER ?? []).filter((t) => {
    const sc = topicScores[t]
    if (!sc) return false
    return Math.round((sc.correct / sc.total) * 100) >= UNLOCK_PCT
  })
  const totalCorrect = answers.reduce((sum, ans, i) => {
    const q = questionSet[i]
    return sum + (ans === (q.correct ?? q.correctIndex) ? 1 : 0)
  }, 0)

  return (
    <div className="screen-container" style={{ padding: '24px', maxWidth: '640px', margin: '0 auto', animation: 'fade-in 0.25s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        
        <span style={{ fontSize: '64px' }}>🎯</span>
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', textAlign: 'center' }}>
          Diagnostic Complete!
        </h1>

        <div className="card-glass" style={{ padding: '12px 24px', borderRadius: '24px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--brand-dark)' }}>{totalCorrect}</span>
          <span style={{ fontSize: '18px', color: 'var(--text-muted)' }}>/ {total} correct</span>
        </div>

        {unlockedList.length > 0 ? (
          <div className="card-glass" style={{ width: '100%', padding: '20px', borderColor: 'var(--brand)', backgroundColor: 'var(--brand-bg)', color: 'var(--brand-dark)', textAlign: 'center' }}>
            <h3 style={{ fontWeight: 900, fontSize: '17px', margin: 0 }}>
              🔓 {unlockedList.length} topic{unlockedList.length > 1 ? 's' : ''} unlocked!
            </h3>
            <p style={{ fontSize: '13px', margin: '4px 0 0 0', opacity: 0.9 }}>
              You've demonstrated solid prior knowledge in these areas. We have unlocked them so you can skip ahead!
            </p>
          </div>
        ) : (
          <div className="card-glass" style={{ width: '100%', padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, fontWeight: 700 }}>
              📚 You will start learning from Unit 1. Let's build a solid foundation!
            </p>
          </div>
        )}

        {/* Topic Breakdown list */}
        <div style={{ width: '100%' }}>
          <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-muted)', fontWeight: 800, marginBottom: '10px' }}>
            Topic Performance Breakdown
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(sd.TOPIC_ORDER ?? []).map((topic) => {
              const sc = topicScores[topic]
              const icon = sd.TOPIC_ICONS?.[topic] ?? '📖'
              const tested = !!sc
              const pct = tested ? Math.round((sc.correct / sc.total) * 100) : null
              const unlocked = tested && pct >= UNLOCK_PCT

              return (
                <div
                  key={topic}
                  className="card-glass"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 18px',
                    borderLeft: `4px solid ${unlocked ? 'var(--correct)' : (tested ? 'var(--warn)' : 'var(--border)')}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>{icon}</span>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 800 }}>{topic}</h4>
                      <p style={{ fontSize: '11px', color: 'var(--text-dim)', margin: '2px 0 0 0' }}>
                        {tested ? `${sc.correct} / ${sc.total} correct (${pct}%)` : 'Not tested'}
                      </p>
                    </div>
                  </div>

                  <div>
                    {unlocked ? (
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--correct-dark)', backgroundColor: 'var(--correct-bg)', padding: '4px 8px', borderRadius: '12px' }}>
                        ✓ Unlocked
                      </span>
                    ) : tested ? (
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--warn-dark)', backgroundColor: 'var(--warn-bg)', padding: '4px 8px', borderRadius: '12px' }}>
                        📚 Practice
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', backgroundColor: 'var(--surface-2)', padding: '4px 8px', borderRadius: '12px' }}>
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <button
          className="btn-duo btn-duo-correct"
          style={{ width: '100%', padding: '16px', fontSize: '15px', fontWeight: 900, marginTop: '16px' }}
          onClick={applyAndContinue}
          disabled={saving}
        >
          {saving ? 'Saving results...' : 'Start Preparing! 🚀'}
        </button>

      </div>
    </div>
  )
}
