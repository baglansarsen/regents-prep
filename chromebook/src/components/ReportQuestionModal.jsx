import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../hooks/useAuth'

export default function ReportQuestionModal({
  isOpen,
  onClose,
  question,
  subject = '',
  examId = '',
}) {
  const { user } = useAuth()
  const [reason, setReason] = useState('typo')
  const [details, setDetails] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    try {
      await addDoc(collection(db, 'reportedQuestions'), {
        userId: user?.uid || 'anonymous',
        userEmail: user?.email || 'anonymous',
        userDisplayName: user?.displayName || 'Guest',
        question: {
          text: question?.text || '',
          choices: question?.choices || question?.options || [],
          correct: question?.correct !== undefined ? question?.correct : null,
          number: question?.number || null,
        },
        subject,
        examId,
        reason,
        details: details.trim(),
        timestamp: new Date().toISOString(),
        status: 'pending',
      })

      setIsSuccess(true)
      setTimeout(() => {
        // Reset and close
        setIsSuccess(false)
        setDetails('')
        setReason('typo')
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Error submitting question report:', err)
      setErrorMsg('Failed to submit report. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="modal-backdrop-animate"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 11000,
        padding: '20px',
      }}
    >
      <div
        className="card-glass modal-content-animate"
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: '28px',
          textAlign: 'left',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          border: '1.5px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid var(--border)',
            paddingBottom: '12px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 900,
              fontSize: '20px',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text)',
            }}
          >
            <span>🚩</span> Report Incorrect Question
          </h3>
          {!isSuccess && (
            <button
              onClick={onClose}
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
          )}
        </div>

        {isSuccess ? (
          <div
            style={{
              textAlign: 'center',
              padding: '24px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '48px', animation: 'scaleUp 0.3s ease-out' }}>✅</span>
            <h4 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '18px', margin: 0 }}>
              Report Submitted!
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
              Thank you for helping us make Regentify perfect.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.8px',
                  marginBottom: '6px',
                }}
              >
                Question Context
              </div>
              <div
                style={{
                  fontSize: '13px',
                  lineHeight: '18px',
                  background: 'var(--surface-2)',
                  padding: '12px',
                  borderRadius: '8px',
                  borderLeft: '3px solid var(--wrong)',
                  color: 'var(--text)',
                  maxHeight: '100px',
                  overflowY: 'auto',
                }}
              >
                <strong>Q{question?.number || ''}:</strong> {question?.text}
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.8px',
                  display: 'block',
                  marginBottom: '6px',
                }}
                htmlFor="report-reason"
              >
                What is the issue?
              </label>
              <select
                id="report-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'var(--surface-2)',
                  border: '1.5px solid var(--border)',
                  color: 'var(--text)',
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="typo">📝 Typo or text error in question/choices</option>
                <option value="wrong_key">🎯 Incorrect answer key</option>
                <option value="image_error">🖼️ Missing or wrong diagram/image</option>
                <option value="math_format">📐 Formatting or math formula issue</option>
                <option value="other">🛸 Other issue</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.8px',
                  display: 'block',
                  marginBottom: '6px',
                }}
                htmlFor="report-details"
              >
                Additional Details (Optional)
              </label>
              <textarea
                id="report-details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Explain what is incorrect so we can fix it quickly..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'var(--surface-2)',
                  border: '1.5px solid var(--border)',
                  color: 'var(--text)',
                  fontSize: '13px',
                  lineHeight: '18px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {errorMsg && (
              <div style={{ color: 'var(--wrong)', fontSize: '12px', fontWeight: 700, textAlign: 'center' }}>
                ⚠️ {errorMsg}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
              <button
                type="button"
                className="btn-duo-outline"
                onClick={onClose}
                disabled={isSubmitting}
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '13px',
                  fontWeight: 800,
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-duo btn-duo-blue"
                disabled={isSubmitting}
                style={{
                  flex: 1.5,
                  padding: '10px',
                  fontSize: '13px',
                  fontWeight: 800,
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
