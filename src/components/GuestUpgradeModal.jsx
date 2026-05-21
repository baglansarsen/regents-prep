import { useState } from 'react'

export default function GuestUpgradeModal({ onLinkEmail, onLinkGoogle, onDismiss }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name.'); return }
    setError('')
    setLoading(true)
    try {
      await onLinkEmail(email, password, name.trim())
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use'  ? 'That email already has an account.'
                : err.code === 'auth/weak-password'         ? 'Password must be at least 6 characters.'
                : err.code === 'auth/invalid-email'         ? 'Invalid email address.'
                : err.code === 'auth/credential-already-in-use' ? 'That account is already linked to another user.'
                : 'Something went wrong. Try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError('')
    try {
      await onLinkGoogle()
    } catch (err) {
      setError(err.code === 'auth/credential-already-in-use'
        ? 'That Google account is already linked to another user.'
        : 'Google sign-in failed. Try again.')
    }
  }

  return (
    <div className="modal-overlay" onClick={onDismiss}>
      <div className="modal-card guest-upgrade-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onDismiss} aria-label="Close">×</button>
        <div className="guest-upgrade-icon">🔒</div>
        <h2 className="guest-upgrade-title">Save Your Progress</h2>
        <p className="guest-upgrade-desc">
          Create a free account to keep your scores, streaks, and XP — even if you switch devices or clear your browser.
        </p>

        <button className="btn-google guest-upgrade-google" onClick={handleGoogle}>
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <div className="login-divider"><span>or</span></div>

        <form className="login-email-form" onSubmit={handleSubmit}>
          <input className="login-input" type="text" placeholder="Your name" value={name}
            onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          <input className="login-input" type="email" placeholder="Email address" value={email}
            onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
          <input className="login-input" type="password" placeholder="Password (min 6 chars)" value={password}
            onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
          {error && <p className="login-error">{error}</p>}
          <button className="btn-email" type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Free Account'}
          </button>
        </form>

        <button className="login-back" onClick={onDismiss}>Continue as guest</button>
      </div>
    </div>
  )
}
