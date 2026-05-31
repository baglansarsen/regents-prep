import { useState } from 'react'

export default function LoginScreen({ onSignInGoogle, onSignInEmail, onSignUpEmail, onGuest, onResetPassword }) {
  const [mode, setMode]       = useState('options') // 'options' | 'signin' | 'signup' | 'reset'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]       = useState('')
  const [error, setError]     = useState('')
  const [info, setInfo]       = useState('')
  const [loading, setLoading] = useState(false)

  function switchMode(m) { setMode(m); setError(''); setInfo('') }

  async function handleEmailSubmit(e) {
    e.preventDefault()
    setError(''); setInfo('')
    setLoading(true)
    try {
      if (mode === 'signin') {
        await onSignInEmail(email, password)
      } else {
        if (!name.trim()) { setError('Please enter your name.'); setLoading(false); return }
        await onSignUpEmail(email, password, name.trim())
      }
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use' ? 'Email already in use — try signing in.'
                : err.code === 'auth/user-not-found'       ? 'No account found — try signing up.'
                : err.code === 'auth/wrong-password'       ? 'Incorrect password.'
                : err.code === 'auth/invalid-credential'   ? 'Incorrect email or password.'
                : err.code === 'auth/weak-password'        ? 'Password must be at least 6 characters.'
                : err.code === 'auth/invalid-email'        ? 'Invalid email address.'
                : 'Something went wrong. Try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleReset(e) {
    e.preventDefault()
    if (!email) { setError('Enter your email address first.'); return }
    setError(''); setLoading(true)
    try {
      await onResetPassword(email)
      setInfo('Password reset email sent — check your inbox.')
    } catch (err) {
      setError(err.code === 'auth/user-not-found' ? 'No account found with that email.' : 'Could not send reset email. Try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError(''); setLoading(true)
    try {
      await onSignInGoogle()
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Try again or use email.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <h1 className="app-title">Regentify</h1>
        <p className="login-tagline">
          {mode === 'options' ? 'Sign in to track your progress and save your scores.'
            : mode === 'signin'  ? 'Sign in to your account.'
            : mode === 'signup'  ? 'Create a free account.'
            : 'Reset your password.'}
        </p>

        {mode === 'options' && (
          <div className="login-options">
            <button className="btn-google" onClick={handleGoogleSignIn} disabled={loading}>
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {loading ? 'Signing in…' : 'Sign in with Google'}
            </button>

            <div className="login-divider"><span>or</span></div>

            <button className="btn-email" onClick={() => switchMode('signup')}>Sign up with Email</button>
            <button className="btn-email btn-email--secondary" onClick={() => switchMode('signin')}>Sign in with Email</button>

            <div className="login-divider"><span>or</span></div>

            <button className="btn-guest" onClick={onGuest}>Continue as Guest</button>
            <p className="login-guest-note">Guest progress is saved on this device only.</p>
          </div>
        )}

        {(mode === 'signin' || mode === 'signup') && (
          <form className="login-email-form" onSubmit={handleEmailSubmit}>
            {mode === 'signup' && (
              <input className="login-input" type="text" placeholder="Your name" value={name}
                onChange={(e) => setName(e.target.value)} autoComplete="name" required />
            )}
            <input className="login-input" type="email" placeholder="Email address" value={email}
              onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            <input className="login-input" type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required />

            {error && <p className="login-error">{error}</p>}

            <button className="btn-email" type="submit" disabled={loading}>
              {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>

            {mode === 'signin' && (
              <button type="button" className="login-switch" style={{ fontSize: '0.8rem', opacity: 0.7 }}
                onClick={() => switchMode('reset')}>
                Forgot password?
              </button>
            )}
            <button type="button" className="login-switch"
              onClick={() => switchMode(mode === 'signin' ? 'signup' : 'signin')}>
              {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
            <button type="button" className="login-back" onClick={() => switchMode('options')}>← Back</button>
          </form>
        )}

        {mode === 'reset' && (
          <form className="login-email-form" onSubmit={handleReset}>
            <input className="login-input" type="email" placeholder="Email address" value={email}
              onChange={(e) => setEmail(e.target.value)} autoComplete="email" required autoFocus />
            {error && <p className="login-error">{error}</p>}
            {info  && <p style={{ color: '#22c55e', fontSize: '0.85rem', marginTop: 4 }}>{info}</p>}
            <button className="btn-email" type="submit" disabled={loading}>
              {loading ? 'Sending…' : 'Send Reset Email'}
            </button>
            <button type="button" className="login-back" onClick={() => switchMode('signin')}>← Back to Sign In</button>
          </form>
        )}
      </div>
    </div>
  )
}
