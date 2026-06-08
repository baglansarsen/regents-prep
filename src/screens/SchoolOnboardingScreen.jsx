import { useState, useMemo, useCallback } from 'react'
import { NY_SCHOOLS, BOROUGHS, getSuggestions, getSchoolsSortedByDistance, distanceMi } from '@content/schools'
import { SUBJECT_META } from '@content/subjects'

const TYPE_LABELS = { public: 'Public', private: 'Private', charter: 'Charter' }

function Avatar({ photoURL, name, size = 48 }) {
  if (photoURL) return <img style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} src={photoURL} alt="" referrerPolicy="no-referrer" />
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.4, color: '#fff', fontWeight: 700 }}>
      {(name ?? '?')[0].toUpperCase()}
    </div>
  )
}

// Step 1 — choose which Regents exam
function SubjectStep({ firstName, onPick }) {
  const subjects = Object.values(SUBJECT_META)
  return (
    <div className="onboard-screen">
      <div className="onboard-header">
        <div className="onboard-title-emoji">📚</div>
        <div className="onboard-header-text">
          <h1 className="onboard-title">Hi, {firstName}!</h1>
          <p className="onboard-subtitle">Which Regents exam are you preparing for?</p>
        </div>
      </div>

      <div className="onboard-subject-grid">
        {subjects.map(({ id, name, icon, color }) => (
          <button
            key={id}
            className="onboard-subject-card"
            style={{ '--subject-color': color }}
            onClick={() => onPick(id)}
          >
            <span className="onboard-subject-icon">{icon}</span>
            <span className="onboard-subject-name">{name} Regents</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Step 2 — find your school
function SchoolStep({ user, onSelect, onSkipSchool }) {
  const [search,       setSearch]       = useState('')
  const [borough,      setBorough]      = useState(null)
  const [typeFilter,   setTypeFilter]   = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [locLoading,   setLocLoading]   = useState(false)
  const [locError,     setLocError]     = useState(null)

  const suggestions = useMemo(() => getSuggestions(user?.email), [user?.email])

  const nearbySchools = useMemo(() => {
    if (!userLocation) return []
    return getSchoolsSortedByDistance(userLocation.lat, userLocation.lng, 5)
  }, [userLocation])

  const filtered = useMemo(() => {
    let list = NY_SCHOOLS
    if (borough)    list = list.filter((s) => s.borough === borough)
    if (typeFilter) list = list.filter((s) => s.type === typeFilter)
    if (search)     list = list.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    return list
  }, [borough, typeFilter, search])

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) { setLocError('Location not supported.'); return }
    setLocLoading(true); setLocError(null)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => { setUserLocation({ lat: coords.latitude, lng: coords.longitude }); setLocLoading(false) },
      () => { setLocError('Could not get location. Search manually below.'); setLocLoading(false) },
      { timeout: 8000 },
    )
  }, [])

  return (
    <div className="onboard-screen">
      <div className="onboard-header">
        <Avatar photoURL={user?.photoURL} name={user?.displayName} size={48} />
        <div className="onboard-header-text">
          <h1 className="onboard-title">Your School</h1>
          <p className="onboard-subtitle">Join your school leaderboard (optional).</p>
        </div>
      </div>

      <div className="onboard-picker">
        {/* GPS button */}
        {!userLocation && (
          <button className="onboard-locate-btn" onClick={handleLocate} disabled={locLoading}>
            {locLoading ? '⏳ Getting location…' : '📍 Find Schools Near Me'}
          </button>
        )}
        {locError && <p className="onboard-loc-error">{locError}</p>}

        {/* Nearby row */}
        {nearbySchools.length > 0 && (
          <div className="onboard-nearby">
            <p className="onboard-nearby-label">📍 Near You</p>
            <div className="onboard-nearby-list">
              {nearbySchools.map((s) => (
                <button key={s.id} className="onboard-nearby-chip" onClick={() => onSelect(s.name)}>
                  <span className="onboard-nearby-name">{s.name}</span>
                  <span className="onboard-nearby-dist">~{distanceMi(userLocation.lat, userLocation.lng, s.lat, s.lng).toFixed(1)} mi</span>
                </button>
              ))}
            </div>
            <button className="onboard-locate-btn onboard-locate-btn--sm" onClick={() => setUserLocation(null)}>Clear location</button>
          </div>
        )}

        {/* Domain suggestions */}
        {suggestions && (
          <div className="onboard-suggestions" style={{ margin: '0 0 10px' }}>
            <div className="onboard-suggestions-header">
              <span className="onboard-suggestions-icon">🏫</span>
              <div>
                <p className="onboard-suggestions-title">Your district</p>
                <p className="onboard-suggestions-district">{suggestions.districtName}</p>
              </div>
            </div>
            <div className="onboard-suggestions-list">
              {suggestions.schools.map((s) => (
                <button key={s.id} className="onboard-suggestion-btn" onClick={() => onSelect(s.name)}>
                  <span className="onboard-suggestion-name">{s.name}</span>
                  <span className="onboard-suggestion-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <input className="rankings-search" placeholder="Type school name…" value={search} autoFocus onChange={(e) => setSearch(e.target.value)} />

        {/* Borough filter */}
        <div className="rankings-borough-row">
          <button className={`rankings-borough-chip ${!borough ? 'rankings-borough-chip--active' : ''}`} onClick={() => setBorough(null)}>All</button>
          {BOROUGHS.map((b) => (
            <button key={b} className={`rankings-borough-chip ${borough === b ? 'rankings-borough-chip--active' : ''}`} onClick={() => setBorough(b)}>{b}</button>
          ))}
        </div>

        {/* Type filter */}
        <div className="rankings-borough-row rankings-type-row">
          {[null, 'public', 'private', 'charter'].map((t) => (
            <button key={t ?? 'all'} className={`rankings-borough-chip rankings-type-chip ${typeFilter === t ? 'rankings-borough-chip--active' : ''}`} onClick={() => setTypeFilter(t)}>
              {t === null ? 'All Types' : t === 'public' ? '🏛 Public' : t === 'private' ? '🎓 Private' : '⭐ Charter'}
            </button>
          ))}
        </div>

        <div className="onboard-school-list">
          {filtered.map((s) => {
            const dist = userLocation ? distanceMi(userLocation.lat, userLocation.lng, s.lat, s.lng) : null
            return (
              <button key={s.id} className="rankings-school-row" onClick={() => onSelect(s.name)}>
                <div>
                  <p className="rankings-school-name">{s.name}</p>
                  <p className="rankings-school-borough">
                    {s.borough}
                    <span className={`school-type-badge school-type-badge--${s.type}`}>{TYPE_LABELS[s.type]}</span>
                    {dist != null && <span className="school-dist-badge">~{dist.toFixed(1)} mi</span>}
                  </p>
                </div>
                <span className="rankings-school-arrow">›</span>
              </button>
            )
          })}
          {filtered.length === 0 && <p className="rankings-empty">No schools match.</p>}
        </div>
      </div>

      <button className="onboard-skip-btn" onClick={onSkipSchool}>Skip — no school leaderboard</button>
    </div>
  )
}

// Main export — 2-step wizard
export default function SchoolOnboardingScreen({ user, onComplete }) {
  const firstName = user?.displayName?.split(' ')[0] ?? 'there'
  const [step,    setStep]    = useState('subject')   // 'subject' | 'school'
  const [subject, setSubject] = useState(null)

  function handleSubjectPick(subjectId) {
    setSubject(subjectId)
    setStep('school')
  }

  function handleSchoolSelect(schoolName) {
    onComplete(subject, schoolName)
  }

  function handleSkipSchool() {
    onComplete(subject, '')
  }

  if (step === 'subject') {
    return <SubjectStep firstName={firstName} onPick={handleSubjectPick} />
  }

  return <SchoolStep user={user} onSelect={handleSchoolSelect} onSkipSchool={handleSkipSchool} />
}
