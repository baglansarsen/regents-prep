import { useState, useMemo } from 'react'
import { NY_SCHOOLS, BOROUGHS, getSuggestions } from '../data/schools'

function Avatar({ photoURL, name, size = 48 }) {
  if (photoURL) return <img style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} src={photoURL} alt="" referrerPolicy="no-referrer" />
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.4, color: '#fff', fontWeight: 700 }}>
      {(name ?? '?')[0].toUpperCase()}
    </div>
  )
}

export default function SchoolOnboardingScreen({ user, onSelect }) {
  const [search,  setSearch]  = useState('')
  const [borough, setBorough] = useState(null)
  const [picking, setPicking] = useState(false)

  const firstName   = user?.displayName?.split(' ')[0] ?? 'there'
  const suggestions = useMemo(() => getSuggestions(user?.email), [user?.email])

  const filtered = useMemo(() => {
    let list = NY_SCHOOLS
    if (borough) list = list.filter((s) => s.borough === borough)
    if (search)  list = list.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    return list
  }, [borough, search])

  function select(schoolName) {
    onSelect(schoolName)
  }

  return (
    <div className="onboard-screen">
      {/* Welcome header */}
      <div className="onboard-header">
        <Avatar photoURL={user?.photoURL} name={user?.displayName} size={56} />
        <div className="onboard-header-text">
          <h1 className="onboard-title">Welcome, {firstName}!</h1>
          <p className="onboard-subtitle">Choose your school to join your class leaderboard.</p>
        </div>
      </div>

      {/* Suggested schools from recognized email domain */}
      {suggestions && !picking && (
        <div className="onboard-suggestions">
          <div className="onboard-suggestions-header">
            <span className="onboard-suggestions-icon">🏫</span>
            <div>
              <p className="onboard-suggestions-title">Looks like you're from</p>
              <p className="onboard-suggestions-district">{suggestions.districtName}</p>
            </div>
          </div>
          <div className="onboard-suggestions-list">
            {suggestions.schools.map((s) => (
              <button key={s.id} className="onboard-suggestion-btn" onClick={() => select(s.name)}>
                <span className="onboard-suggestion-name">{s.name}</span>
                <span className="onboard-suggestion-arrow">→</span>
              </button>
            ))}
          </div>
          <button className="onboard-browse-link" onClick={() => setPicking(true)}>
            My school isn't listed → Browse all schools
          </button>
        </div>
      )}

      {/* Full school browser — shown when no suggestions or user clicked browse */}
      {(!suggestions || picking) && (
        <div className="onboard-picker">
          <p className="onboard-picker-label">Search for your school</p>
          <input
            className="rankings-search"
            placeholder="Type school name…"
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="rankings-borough-row">
            <button className={`rankings-borough-chip ${!borough ? 'rankings-borough-chip--active' : ''}`} onClick={() => setBorough(null)}>All</button>
            {BOROUGHS.map((b) => (
              <button key={b} className={`rankings-borough-chip ${borough === b ? 'rankings-borough-chip--active' : ''}`} onClick={() => setBorough(b)}>{b}</button>
            ))}
          </div>
          <div className="onboard-school-list">
            {filtered.map((s) => (
              <button key={s.id} className="rankings-school-row" onClick={() => select(s.name)}>
                <div>
                  <p className="rankings-school-name">{s.name}</p>
                  <p className="rankings-school-borough">{s.borough}</p>
                </div>
                <span className="rankings-school-arrow">›</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="rankings-empty">No schools match.</p>}
          </div>
          {suggestions && picking && (
            <button className="onboard-browse-link" onClick={() => setPicking(false)}>← Back to suggestions</button>
          )}
        </div>
      )}

      {/* Skip option */}
      <button className="onboard-skip-btn" onClick={() => onSelect('')}>
        Skip for now
      </button>
    </div>
  )
}
