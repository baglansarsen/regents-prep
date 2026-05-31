import React, { useState } from 'react'

export default function LoginScreen({
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  signInAsGuest,
}) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter your email and password.')
      return
    }
    setLoading(true)
    setErrorMsg('')
    try {
      if (mode === 'login') {
        await signInWithEmail(email.trim(), password)
      } else {
        if (!name.trim()) {
          setErrorMsg('Please enter your name.')
          setLoading(false)
          return
        }
        await signUpWithEmail(email.trim(), password, name.trim())
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during authentication.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    setErrorMsg('')
    try {
      await signInWithGoogle()
    } catch (err) {
      setErrorMsg(err.message || 'Google Sign-In failed.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGuest() {
    setLoading(true)
    setErrorMsg('')
    try {
      await signInAsGuest()
    } catch (err) {
      setErrorMsg(err.message || 'Guest Sign-In failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      {/* Hero Pane */}
      <div className="auth-hero">
        <div style={{ transform: 'scale(1.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            fontSize: '100px',
            lineHeight: 1,
            animation: 'breathe 4s ease-in-out infinite',
            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.15))'
          }}>
            📚
          </div>
          <h1 className="auth-logo-text">Regentify</h1>
          <p className="auth-tagline">
            Complete NY Regents preparation optimized for Chromebook classrooms. Study smart, track your pet, and earn high scores!
          </p>
        </div>
      </div>

      {/* Form Pane */}
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <h2 className="auth-form-title">
            {mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </h2>

          {errorMsg && (
            <div style={{
              backgroundColor: 'var(--wrong-bg)',
              color: 'var(--wrong-dark)',
              border: '2px solid var(--wrong)',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '20px',
              fontWeight: 800,
              fontSize: '14px'
            }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="auth-input-group">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Mercer"
                  className="auth-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}

            <div className="auth-input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@school.edu"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-duo btn-duo-blue"
              style={{ width: '100%', marginTop: '8px' }}
              disabled={loading}
            >
              {loading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-divider">Or</div>

          <button
            onClick={handleGoogle}
            className="btn-duo-outline"
            style={{ width: '100%', marginBottom: '12px', display: 'flex', gap: '12px', justifyContent: 'center' }}
            disabled={loading}
          >
            <span style={{ fontSize: '20px' }}>🌐</span> Sign In with Google
          </button>

          <button
            onClick={handleGuest}
            className="btn-duo-outline"
            style={{ width: '100%' }}
            disabled={loading}
          >
            🚀 Study as Guest (Offline Mode)
          </button>

          <div style={{ marginTop: '28px', textAlign: 'center', fontWeight: 800 }}>
            {mode === 'login' ? (
              <p style={{ color: 'var(--text-muted)' }}>
                Don't have an account?{' '}
                <span
                  onClick={() => setMode('signup')}
                  style={{ color: 'var(--blue-dark)', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>
                Already have an account?{' '}
                <span
                  onClick={() => setMode('login')}
                  style={{ color: 'var(--blue-dark)', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Log In
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
