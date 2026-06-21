import React, { useState, useMemo, useEffect } from 'react'
import { SUBJECTS } from '@content/subjects'
import * as leData from '@content/living-environment/index'
import * as esData from '@content/earth-science/index'
import * as chemData from '@content/chemistry/index'
import * as physData from '@content/physics/index'
import * as alg1Data from '@content/algebra-1/index'
import * as alg2Data from '@content/algebra-2/index'
import * as geomData from '@content/geometry/index'
import * as lsData from '@content/life-science/index'

import { useSpacedRepetition, Q_AGAIN, Q_HARD, Q_GOOD, Q_EASY, nextReviewLabel } from '../hooks/useSpacedRepetition'

export default function FlashcardScreen({
  user,
  subject,
  topic = null,
  onClose,
}) {
  const uid = user?.uid

  // Resolve flashcards for the selected subject
  const subjectFlashcards = useMemo(() => {
    let list = []
    if (subject === SUBJECTS.EARTH_SCIENCE) {
      list = esData.flashcards || []
    } else if (subject === SUBJECTS.CHEMISTRY) {
      list = chemData.flashcards || []
    } else if (subject === SUBJECTS.PHYSICS) {
      list = physData.flashcards || []
    } else if (subject === SUBJECTS.ALGEBRA_1) {
      list = alg1Data.flashcards || []
    } else if (subject === SUBJECTS.ALGEBRA_2) {
      list = alg2Data.flashcards || []
    } else if (subject === SUBJECTS.GEOMETRY) {
      list = geomData.flashcards || []
    } else if (subject === SUBJECTS.LIFE_SCIENCE) {
      list = lsData.flashcards || []
    } else {
      // Default: Living Environment (extract non-humanities cards)
      const humanitiesTopics = [
        'english', 'english-literature', 'english-rhetoric',
        'global-history', 'world-cultures', 'geography',
        'us-history', 'us-government', 'us-civics'
      ]
      list = (leData.flashcards || []).filter(c => !humanitiesTopics.includes(c.topic))
    }
    return list
  }, [subject])

  const { buildDeck, review, getStats } = useSpacedRepetition(uid, subjectFlashcards)

  const deck = useMemo(() => buildDeck(topic), [buildDeck, topic])
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = deck[cardIndex]
  const stats = useMemo(() => getStats(topic), [getStats, topic])

  function handleFlip() {
    setFlipped(!flipped)
  }

  function rate(quality) {
    if (card) {
      review(card.id, quality)
    }
    setFlipped(false)
    if (cardIndex + 1 < deck.length) {
      setCardIndex(cardIndex + 1)
    } else {
      onClose()
    }
  }

  if (deck.length === 0 || !card) {
    return (
      <div className="flashcard-screen-container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: '40px',
        animation: 'fade-in 0.3s ease'
      }}>
        <div className="card-glass" style={{
          maxWidth: '480px',
          width: '100%',
          padding: '48px 32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}>
          <span style={{ fontSize: '72px', animation: 'float 2s ease infinite' }}>🎉</span>
          <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '24px' }}>
            All caught up!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '22px' }}>
            No cards due for review right now. Nice job maintaining your spaced repetition!
          </p>
          <button
            className="btn-duo btn-duo-correct"
            onClick={onClose}
            style={{ width: '100%', padding: '14px', fontSize: '15px' }}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flashcard-screen-container" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      padding: '24px',
      maxWidth: '800px',
      margin: '0 auto',
      animation: 'fade-in 0.3s ease'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <button
          className="btn-duo-outline"
          onClick={onClose}
          style={{ padding: '8px 16px', fontSize: '14px', borderBottomWidth: '2px' }}
        >
          ✕ Close
        </button>

        <span style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-muted)' }}>
          Card {cardIndex + 1} of {deck.length}
        </span>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge-stat" style={{ backgroundColor: 'var(--blue-bg)', color: 'var(--blue-dark)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 800 }}>
            📚 New: {stats.new}
          </span>
          <span className="badge-stat" style={{ backgroundColor: 'var(--warn-bg)', color: 'var(--warn-dark)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 800 }}>
            ⏰ Due: {stats.due}
          </span>
          <span className="badge-stat" style={{ backgroundColor: 'var(--correct-bg)', color: 'var(--correct-dark)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 800 }}>
            ✅ Mastered: {stats.mastered}
          </span>
        </div>
      </div>

      {/* Card Flashing Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
        marginBottom: '24px'
      }}>
        <div
          onClick={handleFlip}
          className={`flashcard-3d-card ${flipped ? 'flipped' : ''}`}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            maxHeight: '380px',
            maxWidth: '560px',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }}
        >
          {/* Front Face */}
          <div
            className="card-glass flashcard-face flashcard-front"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid var(--border)',
              backgroundColor: 'var(--surface)'
            }}
          >
            <span style={{
              position: 'absolute',
              top: '20px',
              left: '24px',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
              letterSpacing: '0.8px'
            }}>
              Topic: {card.topic}
            </span>
            <h2 style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 900,
              fontSize: '28px',
              textAlign: 'center',
              lineHeight: '38px',
              color: 'var(--text)'
            }}>
              {card.term ?? card.front}
            </h2>
            <span style={{
              position: 'absolute',
              bottom: '24px',
              fontSize: '13px',
              fontWeight: 800,
              color: 'var(--text-dim)',
              animation: 'pulse 2s infinite'
            }}>
              Tap to Flip 🔄
            </span>
          </div>

          {/* Back Face */}
          <div
            className="card-glass flashcard-face flashcard-back"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2.5px solid var(--brand)',
              backgroundColor: 'var(--brand-bg)'
            }}
          >
            <span style={{
              position: 'absolute',
              top: '20px',
              left: '24px',
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'var(--brand-dark)',
              letterSpacing: '0.8px'
            }}>
              Definition
            </span>
            <p style={{
              fontSize: '18px',
              textAlign: 'center',
              lineHeight: '28px',
              color: 'var(--text)',
              fontWeight: 700
            }}>
              {card.definition ?? card.back}
            </p>
            {card.example && (
              <p style={{
                marginTop: '16px',
                fontSize: '14px',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                textAlign: 'center'
              }}>
                e.g. {card.example}
              </p>
            )}
            {card.id && nextReviewLabel && (
              <span style={{
                position: 'absolute',
                bottom: '20px',
                fontSize: '12px',
                color: 'var(--brand-dark)',
                fontWeight: 800
              }}>
                Next review: {nextReviewLabel()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Ratings Controls */}
      <div style={{
        minHeight: '80px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: flipped ? 1 : 0.15,
        pointerEvents: flipped ? 'auto' : 'none',
        transition: 'opacity 0.3s ease'
      }}>
        {[
          { quality: Q_AGAIN, label: 'Again', emoji: '😟', color: 'var(--wrong)', bg: 'var(--wrong-bg)' },
          { quality: Q_HARD, label: 'Hard', emoji: '😕', color: 'var(--warn-dark)', bg: 'var(--warn-bg)' },
          { quality: Q_GOOD, label: 'Good', emoji: '🙂', color: 'var(--blue-dark)', bg: 'var(--blue-bg)' },
          { quality: Q_EASY, label: 'Easy', emoji: '😄', color: 'var(--correct-dark)', bg: 'var(--correct-bg)' }
        ].map((btn) => (
          <button
            key={btn.label}
            className="btn-duo-outline"
            onClick={() => rate(btn.quality)}
            style={{
              flex: 1,
              padding: '12px 6px',
              borderColor: btn.color,
              backgroundColor: btn.bg,
              color: btn.color,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              borderBottomWidth: '3px'
            }}
          >
            <span style={{ fontSize: '20px' }}>{btn.emoji}</span>
            <span style={{ fontSize: '13px', fontWeight: 800 }}>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
