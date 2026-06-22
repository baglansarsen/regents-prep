import React, { useState } from 'react'
import ReggieAnim from '../components/ReggieAnim'

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
      {/* ── LEFT: Marketing / Mobile Upsell ── */}
      <div className="auth-hero">
        {/* Top brand lockup */}
        <div className="auth-hero-brand">
          <ReggieAnim scene="welcome" size={120} clip={false} style={{ margin: '0 auto' }} />
          <h1 className="auth-logo-text">
            Regent<span className="logo-accent">ify</span>
          </h1>
          <div className="auth-hero-badge">🦕 Meet Reggie, your study buddy</div>
        </div>

        {/* Phone mockup — direct lift from landing page */}
        <div className="auth-phone-wrap">
          <div className="auth-phone-xp-pop">+10 RP 🎉</div>
          <div className="auth-phone">
            <div className="auth-phone-notch" />
            <div className="auth-phone-header">
              <div className="auth-streak-badge">
                <span className="auth-streak-fire">🔥</span> 47 day streak
              </div>
              <div className="auth-xp-badge">⚡ 2,840 RP</div>
            </div>
            <div className="auth-xp-bar-wrap">
              <div className="auth-xp-bar-bg">
                <div className="auth-xp-bar-fill" />
              </div>
            </div>
            <div className="auth-phone-subject">🧬 Living Environment</div>
            <div className="auth-phone-question">
              Which organelle is primarily responsible for cellular respiration and ATP production?
            </div>
            <div className="auth-phone-options">
              <div className="auth-opt auth-opt-a"><span className="auth-opt-key">A</span> Nucleus</div>
              <div className="auth-opt auth-opt-b"><span className="auth-opt-key">B</span> Mitochondria</div>
              <div className="auth-opt auth-opt-c"><span className="auth-opt-key">C</span> Ribosome</div>
              <div className="auth-opt auth-opt-d"><span className="auth-opt-key">D</span> Vacuole</div>
            </div>
            <div className="auth-phone-nav">
              <span className="auth-phone-nav-active">🏠</span>
              <span>📚</span>
              <span>🏆</span>
              <span>👤</span>
            </div>
          </div>
        </div>

        {/* Stat pills */}
        <div className="auth-stat-pills">
          <div className="auth-stat-pill">
            <span className="auth-stat-num">200+</span>
            <span className="auth-stat-label">Real Exams</span>
          </div>
          <div className="auth-stat-pill">
            <span className="auth-stat-num">11</span>
            <span className="auth-stat-label">Subjects</span>
          </div>
          <div className="auth-stat-pill">
            <span className="auth-stat-num">Free</span>
            <span className="auth-stat-label">Forever</span>
          </div>
        </div>

        {/* Mobile app CTA */}
        <div className="auth-mobile-cta">
          <p className="auth-mobile-cta-label">📱 Study on your phone too</p>
          <a
            href="https://apps.apple.com/app/id6776260260"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-store-btn"
            id="login-ios-cta"
          >
            <span className="auth-store-icon"></span>
            <span className="auth-store-lbl">
              <span>Download on the</span>
              <span>App Store</span>
            </span>
          </a>
          <p className="auth-trust-line">
            Built on official <strong>NYSED</strong> past exams · No ads in the way of learning
          </p>
        </div>
      </div>

      {/* ── RIGHT: Auth Form ── */}
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
