import React, { useState, useMemo, useCallback } from 'react'
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
      overflowY: 'auto'
    }}>
      
      {step === 'welcome' ? (
        /* PHASE 1: SLIDES */
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
          {/* Emoji Illustration */}
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

          {/* Indicator dots */}
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
      ) : (
        /* PHASE 2: SCHOOL SELECTOR */
        <div className="card-glass" style={{
          maxWidth: '800px',
          width: '100%',
          padding: '40px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          animation: 'scale-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '48px' }}>🏫</span>
            <h1 style={{ fontWeight: 900, fontSize: '28px', marginTop: '12px' }}>
              Choose your School
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '6px' }}>
              Select your NY high school to represent your campus on local borough leaderboards and challenge school peers!
            </p>
          </div>

          {/* GPS locate button */}
          {!userLocation && (
            <button
              className="btn-duo-outline"
              onClick={handleLocate}
              disabled={locLoading}
              style={{
                padding: '12px',
                fontSize: '14px',
                borderColor: 'var(--brand)',
                color: 'var(--brand-dark)',
                background: 'var(--brand-bg)',
                fontWeight: 800,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                borderStyle: 'dashed',
                borderWidth: '2px',
                width: '100%',
                transition: 'all 0.2s ease'
              }}
            >
              {locLoading ? '⌛ Finding your campus...' : '📍 Find High Schools Near Me'}
            </button>
          )}

          {/* Nearby schools section */}
          {nearbySchools.length > 0 && (
            <div style={{
              backgroundColor: 'var(--brand-bg)',
              borderRadius: '16px',
              padding: '16px',
              border: '1.5px solid var(--brand)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 900, color: 'var(--brand-dark)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  📍 Schools Closest to You
                </span>
                <button
                  onClick={() => {
                    setUserLocation(null)
                    setNearbySchools([])
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Clear GPS
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {nearbySchools.map((school) => {
                  const isSelected = chosenSchool?.id === school.id
                  const dist = userLocation ? distanceMi(userLocation.lat, userLocation.lng, school.lat, school.lng) : 0
                  return (
                    <div
                      key={school.id}
                      onClick={() => setChosenSchool(school)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? 'var(--brand)' : 'var(--surface)',
                        color: isSelected ? '#fff' : 'var(--text)',
                        border: '1.5px solid',
                        borderColor: isSelected ? 'var(--brand)' : 'var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div>
                        <h4 style={{ fontWeight: 800, fontSize: '14px', margin: 0 }}>{school.name}</h4>
                        <span style={{ fontSize: '11px', opacity: 0.8, fontWeight: 700 }}>
                          {school.borough} · ~{dist.toFixed(1)} miles away
                        </span>
                      </div>
                      {isSelected ? (
                        <span style={{ fontSize: '18px' }}>✅</span>
                      ) : (
                        <span style={{ fontSize: '14px', opacity: 0.5 }}>📍</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Borough selector tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            borderBottom: '2px solid var(--border)',
            paddingBottom: '12px'
          }}>
            {BOROUGHS.map((borough) => (
              <button
                key={borough}
                onClick={() => {
                  setSelectedBorough(borough)
                  setChosenSchool(null)
                }}
                className={`btn-duo-outline ${selectedBorough === borough ? 'active' : ''}`}
                style={{
                  padding: '8px 16px',
                  fontSize: '13px',
                  borderColor: selectedBorough === borough ? 'var(--blue)' : 'var(--border)',
                  background: selectedBorough === borough ? 'var(--blue-bg)' : 'var(--surface)',
                  color: selectedBorough === borough ? 'var(--blue-dark)' : 'var(--text-muted)',
                  borderBottomWidth: '2.5px'
                }}
              >
                {borough}
              </button>
            ))}
          </div>

          {/* Search school */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="🔍 Search high school name or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 18px',
                borderRadius: '12px',
                border: '2px solid var(--border)',
                fontSize: '15px',
                fontWeight: 700,
                backgroundColor: 'var(--surface)',
                outline: 'none',
                color: 'var(--text)'
              }}
            />
          </div>

          {/* Type filter chips */}
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 800
          }}>
            {[
              { key: null, label: 'All Schools' },
              { key: 'public', label: '🏛️ Public' },
              { key: 'private', label: '🎓 Private' },
              { key: 'charter', label: '⭐ Charter' }
            ].map((type) => (
              <button
                key={type.key ?? 'all'}
                onClick={() => setTypeFilter(type.key)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1.5px solid',
                  borderColor: typeFilter === type.key ? 'var(--brand)' : 'var(--border)',
                  background: typeFilter === type.key ? 'var(--brand-bg)' : 'var(--surface-2)',
                  color: typeFilter === type.key ? 'var(--brand-dark)' : 'var(--text-muted)',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Scrollable list of schools */}
          <div style={{
            maxHeight: '260px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingRight: '6px'
          }}>
            {filteredSchools.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: 'var(--text-dim)',
                background: 'var(--surface-2)',
                borderRadius: '12px'
              }}>
                No high schools found matching those search criteria. Try widening your search!
              </div>
            ) : (
              filteredSchools.map((school) => {
                const isSelected = chosenSchool?.id === school.id
                return (
                  <div
                    key={school.id}
                    onClick={() => setChosenSchool(school)}
                    className="card-glass"
                    style={{
                      padding: '14px 20px',
                      cursor: 'pointer',
                      borderColor: isSelected ? 'var(--brand)' : 'var(--border)',
                      background: isSelected ? 'var(--brand-bg)' : 'var(--surface)',
                      color: isSelected ? 'var(--brand-dark)' : 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 12px rgba(88,204,2,0.15)' : 'none'
                    }}
                  >
                    <div>
                      <h4 style={{ fontWeight: 800, fontSize: '15px' }}>{school.name}</h4>
                      <span style={{ fontSize: '11px', opacity: 0.8, fontWeight: 700 }}>
                        {school.borough} · {school.type.toUpperCase()} CAMPUS
                      </span>
                    </div>
                    {isSelected && (
                      <span style={{ fontSize: '20px', color: 'var(--brand-dark)' }}>✅</span>
                    )}
                  </div>
                )
              })
            )}
          </div>

          {/* Final Launch Action */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <button
              className="btn-duo btn-duo-purple"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                opacity: chosenSchool ? 1 : 0.5,
                cursor: chosenSchool ? 'pointer' : 'not-allowed'
              }}
              disabled={!chosenSchool}
              onClick={handleConfirmSchool}
            >
              🎒 Confirm High School & Hatch Egg!
            </button>

            <button
              className="btn-duo-outline"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '14px',
                color: 'var(--text-muted)',
                borderColor: 'var(--border)',
                fontWeight: 800
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
      )}

    </div>
  )
}
