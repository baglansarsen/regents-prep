import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { NY_SCHOOLS, BOROUGHS, getSchoolsSortedByDistance, distanceMi } from '@content/schools'

export default function OnboardingScreen({ saveSchool, onComplete }) {
  const [step, setStep] = useState('welcome') // 'welcome' | 'school'
  const [slideIndex, setSlideIndex] = useState(0)
  const [selectedBorough, setSelectedBorough] = useState('Manhattan')
  const [searchQuery, setSearchQuery] = useState('')
  const [chosenSchool, setChosenSchool] = useState(null)
  
  const [typeFilter, setTypeFilter] = useState(null)
  const [locLoading, setLocLoading] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [nearbySchools, setNearbySchools] = useState([])

  // CRITICAL: Allow body to scroll when school selector is shown
  useEffect(() => {
    if (step === 'school') {
      document.body.style.overflow = 'auto'
      document.body.style.height = 'auto'
      document.documentElement.style.overflow = 'auto'
      document.documentElement.style.height = 'auto'
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.height = ''
      document.documentElement.style.overflow = ''
      document.documentElement.style.height = ''
    }
  }, [step])

  const SLIDES = [
    {
      emoji: '🚀',
      title: 'Welcome to Regentify!',
      subtitle: 'Learn smarter. Score higher.',
      desc: 'Master New York State Regents exams with snack-sized practice questions, past papers, and timing simulators designed for Chromebooks.',
      accent: 'var(--brand-dark)'
    },
    {
      emoji: '🦎',
      title: 'Hatch your Study Buddy!',
      subtitle: 'A companion for consistency.',
      desc: 'Hatch an interactive study buddy pet that stays fed and happy when you study. Send your pet digging for real XP rewards!',
      accent: 'var(--purple-dark)'
    },
    {
      emoji: '⚔️',
      title: 'Battle Arena & School Leagues',
      subtitle: 'Duels and classmate pride.',
      desc: 'Challenge classmate friends or simulated opponents in rapid timed duels, claim treats, and represent your high school on borough leaderboards!',
      accent: 'var(--blue-dark)'
    }
  ]

  const filteredSchools = useMemo(() => {
    return NY_SCHOOLS.filter(school => {
      const matchBorough = school.borough === selectedBorough
      const matchSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          school.borough.toLowerCase().includes(searchQuery.toLowerCase())
      const matchType = typeFilter ? school.type === typeFilter : true
      
      if (searchQuery) {
        return matchSearch && matchType
      }
      return matchBorough && matchType
    })
  }, [selectedBorough, searchQuery, typeFilter])

  const handleLocate = useCallback(() => {
    if (navigator?.geolocation) {
      setLocLoading(true)
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude
          setUserLocation({ lat, lng })
          const sorted = getSchoolsSortedByDistance(lat, lng, 3)
          setNearbySchools(sorted)
          setLocLoading(false)
        },
        (err) => {
          console.error('[Geolocation] Failed or denied:', err)
          alert('Could not retrieve location. Please select your region manually or search by school name.')
          setLocLoading(false)
        },
        { enableHighAccuracy: false, timeout: 8000 }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }, [])

  function handleNextSlide() {
    if (slideIndex < SLIDES.length - 1) {
      setSlideIndex(prev => prev + 1)
    } else {
      setStep('school')
    }
  }

  async function handleConfirmSchool() {
    if (!chosenSchool) return
    await saveSchool(chosenSchool.name)
    onComplete()
  }

  // ─── WELCOME SLIDES ───────────────────────────────────────────────────────────
  if (step === 'welcome') {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-outfit)',
        padding: '24px',
      }}>
        <div className="card-glass" style={{
          maxWidth: '560px',
          width: '100%',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          animation: 'fade-in 0.3s ease-out'
        }}>
          <div style={{
            fontSize: '84px',
            lineHeight: 1,
            animation: 'float 2s ease-in-out infinite',
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))'
          }}>
            {SLIDES[slideIndex].emoji}
          </div>

          <div>
            <span style={{
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: SLIDES[slideIndex].accent,
              letterSpacing: '1.2px',
              backgroundColor: 'var(--surface-2)',
              padding: '4px 10px',
              borderRadius: '20px'
            }}>
              {SLIDES[slideIndex].subtitle}
            </span>
            <h1 style={{
              fontWeight: 900,
              fontSize: '28px',
              marginTop: '12px',
              fontFamily: 'var(--font-outfit)',
              lineHeight: '34px'
            }}>
              {SLIDES[slideIndex].title}
            </h1>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '15px',
              lineHeight: '22px',
              marginTop: '12px'
            }}>
              {SLIDES[slideIndex].desc}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {SLIDES.map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: idx === slideIndex ? '20px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: idx === slideIndex ? SLIDES[slideIndex].accent : 'var(--surface-3)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          <button
            className="btn-duo btn-duo-blue"
            style={{ width: '100%', padding: '14px', fontSize: '15px', background: SLIDES[slideIndex].accent }}
            onClick={handleNextSlide}
          >
            {slideIndex === SLIDES.length - 1 ? 'Get Started 🚀' : 'Continue'}
          </button>
        </div>
      </div>
    )
  }

  // ─── SCHOOL SELECTOR ──────────────────────────────────────────────────────────
  // Plain scrolling page — no inner scroll containers, no position:fixed.
  // Body overflow is set to 'auto' via useEffect so the whole page scrolls.
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font-outfit)',
      padding: '20px 16px 40px',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '40px' }}>🏫</span>
        <h1 style={{ fontWeight: 900, fontSize: '22px', marginTop: '6px', fontFamily: 'var(--font-outfit)' }}>
          Choose your School
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>
          Represent your NY campus on borough leaderboards!
        </p>
      </div>

      {/* Filters */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {/* GPS button */}
        {!userLocation && (
          <button
            onClick={handleLocate}
            disabled={locLoading}
            style={{
              padding: '10px',
              fontSize: '13px',
              fontWeight: 800,
              borderRadius: '10px',
              border: '2px dashed var(--brand)',
              background: 'var(--brand-bg)',
              color: 'var(--brand-dark)',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            {locLoading ? '⌛ Finding your campus...' : '📍 Find Schools Near Me'}
          </button>
        )}

        {/* Borough dropdown + Search row */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={selectedBorough}
            onChange={(e) => { setSelectedBorough(e.target.value); setChosenSchool(null); setSearchQuery('') }}
            style={{
              padding: '10px 12px',
              borderRadius: '10px',
              border: '2px solid var(--border)',
              fontSize: '14px',
              fontWeight: 800,
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              cursor: 'pointer',
              minWidth: '140px',
              outline: 'none',
            }}
          >
            {BOROUGHS.map((borough) => (
              <option key={borough} value={borough}>{borough}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="🔍 Search school..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              border: '2px solid var(--border)',
              fontSize: '14px',
              fontWeight: 700,
              backgroundColor: 'var(--surface)',
              outline: 'none',
              color: 'var(--text)',
            }}
          />
        </div>

        {/* Type filter dropdown */}
        <select
          value={typeFilter || ''}
          onChange={(e) => setTypeFilter(e.target.value || null)}
          style={{
            padding: '10px 12px',
            borderRadius: '10px',
            border: '2px solid var(--border)',
            fontSize: '14px',
            fontWeight: 800,
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="">All School Types</option>
          <option value="public">🏛️ Public Schools</option>
          <option value="private">🎓 Private Schools</option>
          <option value="charter">⭐ Charter Schools</option>
        </select>
      </div>

      {/* Nearby schools */}
      {nearbySchools.length > 0 && (
        <div style={{
          maxWidth: '600px',
          margin: '0 auto 16px',
          backgroundColor: 'var(--brand-bg)',
          borderRadius: '12px',
          padding: '14px',
          border: '1.5px solid var(--brand)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--brand-dark)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              📍 Schools Near You
            </span>
            <button
              onClick={() => { setUserLocation(null); setNearbySchools([]) }}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clear
            </button>
          </div>
          {nearbySchools.map((school) => {
            const isSelected = chosenSchool?.id === school.id
            const dist = userLocation ? distanceMi(userLocation.lat, userLocation.lng, school.lat, school.lng) : 0
            return (
              <div
                key={school.id}
                onClick={() => setChosenSchool(school)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'var(--brand)' : 'var(--surface)',
                  color: isSelected ? '#fff' : 'var(--text)',
                  border: '1.5px solid',
                  borderColor: isSelected ? 'var(--brand)' : 'var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '6px',
                }}
              >
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '14px', margin: 0 }}>{school.name}</h4>
                  <span style={{ fontSize: '11px', opacity: 0.8, fontWeight: 700 }}>
                    {school.borough} · ~{dist.toFixed(1)} mi away
                  </span>
                </div>
                {isSelected
                  ? <span style={{ fontSize: '18px' }}>✅</span>
                  : <span style={{ fontSize: '14px', opacity: 0.5 }}>📍</span>
                }
              </div>
            )
          })}
        </div>
      )}

      {/* School list — rendered as plain divs, page scrolls naturally */}
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {filteredSchools.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--text-muted)',
            background: 'var(--surface-2)',
            borderRadius: '12px',
            marginBottom: '20px',
          }}>
            No schools found. Try a different borough or search!
          </div>
        ) : (
          filteredSchools.map((school) => {
            const isSelected = chosenSchool?.id === school.id
            return (
              <div
                key={school.id}
                onClick={() => setChosenSchool(school)}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: isSelected ? 'var(--brand)' : 'var(--border)',
                  backgroundColor: isSelected ? 'var(--brand-bg)' : 'var(--surface)',
                  color: isSelected ? 'var(--brand-dark)' : 'var(--text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '14px', margin: 0 }}>{school.name}</h4>
                  <span style={{ fontSize: '11px', opacity: 0.75, fontWeight: 700 }}>
                    {school.borough} · {school.type.toUpperCase()} CAMPUS
                  </span>
                </div>
                {isSelected && <span style={{ fontSize: '20px', color: 'var(--brand-dark)' }}>✅</span>}
              </div>
            )
          })
        )}
      </div>

      {/* Action buttons — at the bottom of the page */}
      <div style={{
        maxWidth: '600px',
        margin: '24px auto 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {chosenSchool && (
          <div style={{
            textAlign: 'center',
            fontSize: '13px',
            fontWeight: 800,
            color: 'var(--brand-dark)',
            backgroundColor: 'var(--brand-bg)',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1.5px solid var(--brand)',
          }}>
            ✅ Selected: {chosenSchool.name}
          </div>
        )}
        <button
          className="btn-duo btn-duo-purple"
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '16px',
            opacity: chosenSchool ? 1 : 0.45,
            cursor: chosenSchool ? 'pointer' : 'not-allowed',
          }}
          disabled={!chosenSchool}
          onClick={handleConfirmSchool}
        >
          🎒 Confirm School & Hatch Egg!
        </button>

        <button
          className="btn-duo-outline"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '13px',
            color: 'var(--text-muted)',
            borderColor: 'var(--border)',
            fontWeight: 800,
          }}
          onClick={async () => {
            await saveSchool('Independent')
            onComplete()
          }}
        >
          🌐 Skip / Independent Study
        </button>
      </div>
    </div>
  )
}
