import React, { useState, useMemo, useCallback } from 'react'
import { NY_SCHOOLS, BOROUGHS, getSchoolsSortedByDistance, distanceMi } from '@content/schools'
import { usePredictedScore } from '../hooks/usePredictedScore'

export default function ProfileScreen({
  user,
  logOut,
  school,
  saveSchool,
  xp,
  level,
  streak,
  toggleTheme,
  mode,
  history = [],
  soundEnabled = true,
  setSoundEnabled,
  teacherMode = false,
  setTeacherMode,
  subject,
  subjectData,
  classroomHook = {}
}) {
  const { joinedClassroom, joinClassroom = () => {}, leaveClassroom = () => {} } = classroomHook
  const predictedScore = usePredictedScore(subject, subjectData?.UNITS || [], history, streak)
  const [selectedBorough, setSelectedBorough] = useState(() => {
    const matched = NY_SCHOOLS.find(s => s.name === school)
    return matched ? matched.borough : 'Manhattan'
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState(null)
  const [locLoading, setLocLoading] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [nearbySchools, setNearbySchools] = useState([])

  const filteredSchools = useMemo(() => {
    return NY_SCHOOLS.filter(s => {
      const matchBorough = s.borough === selectedBorough
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.borough.toLowerCase().includes(searchQuery.toLowerCase())
      const matchType = typeFilter ? s.type === typeFilter : true
      
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

  // Calculate achievements live!
  const achievements = useMemo(() => {
    const lessonCount = history.filter(h => h.score > 0).length
    const mistakesResolved = Number(localStorage.getItem('@achievement_mistakes_resolved') || '0')
    const bossSlayer = localStorage.getItem('@boss_slayer_unlocked') === 'true'

    return [
      {
        id: 'rookie',
        name: 'Class Rookie 👦',
        desc: 'Complete your first lesson quiz',
        progress: Math.min(lessonCount, 1),
        target: 1,
        unlocked: lessonCount >= 1,
        icon: '👦'
      },
      {
        id: 'streak',
        name: 'Streak Master 🔥',
        desc: 'Reach a 3-day study streak',
        progress: Math.min(streak, 3),
        target: 3,
        unlocked: streak >= 3,
        icon: '🔥'
      },
      {
        id: 'mistake',
        name: 'Mistake Pruner 💪',
        desc: 'Answer 5 mistakes correctly',
        progress: Math.min(mistakesResolved, 5),
        target: 5,
        unlocked: mistakesResolved >= 5,
        icon: '💪'
      },
      {
        id: 'boss',
        name: 'Boss Slayer 👑',
        desc: 'Defeat the Regents Emperor Titan',
        progress: bossSlayer ? 1 : 0,
        target: 1,
        unlocked: bossSlayer,
        icon: '👑'
      },
      {
        id: 'scholar',
        name: 'Scholar 🎓',
        desc: 'Accumulate 1,000 total study XP',
        progress: Math.min(xp, 1000),
        target: 1000,
        unlocked: xp >= 1000,
        icon: '🎓'
      }
    ]
  }, [history, streak, xp])

  return (
    <div className="screen-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        
        {/* Title Header */}
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>⚙️</span> Student Profile & Settings
        </h1>

        {/* User Card */}
        <div className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-outfit)',
            fontWeight: 900,
            fontSize: '32px',
            color: 'var(--text-muted)',
            boxShadow: '0 4px 12px var(--shadow)'
          }}>
            {user?.displayName ? user.displayName[0].toUpperCase() : 'S'}
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '22px' }}>
              {user?.displayName || 'Anonymous Student'}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {user?.email || 'Guest Mode (Data cached locally)'}
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <span className="pet-stage">Level {level.level} {level.name}</span>
              <span className="pet-stage" style={{ background: 'var(--warn-bg)', color: 'var(--warn-dark)' }}>🔥 {streak} Streak</span>
            </div>
          </div>
        </div>

        {/* Section: Achievement Badges Chest */}
        <div className="card-glass">
          <h2 className="card-title">🏆 Achievements Chest</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Earn badges as you hit major milestone markers in your Regents study journey!
          </p>

          <div className="achievements-grid">
            {achievements.map((ach) => (
              <div key={ach.id} className={`achievement-card ${ach.unlocked ? '' : 'locked'}`}>
                <div className="achievement-badge-icon">
                  {ach.icon}
                </div>
                <h3 className="achievement-name">{ach.name}</h3>
                <p className="achievement-desc">{ach.desc}</p>
                
                <div style={{ width: '100%', marginTop: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '2px' }}>
                    <span>Progress</span>
                    <span>{ach.progress} / {ach.target}</span>
                  </div>
                  <div className="achievement-progress-container">
                    <div
                      className="achievement-progress-bar"
                      style={{ width: `${(ach.progress / ach.target) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Academic Affiliation */}
        <div className="card-glass" style={{ overflow: 'visible' }}>
          <h2 className="card-title">🏫 High School Affiliation</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Linking your school connects you to your school's scoreboard so you can compete on points against your schoolmates!
          </p>

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
                marginBottom: '16px',
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
              gap: '10px',
              marginBottom: '16px'
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
                {nearbySchools.map((sch) => {
                  const isSelected = school === sch.name
                  const dist = userLocation ? distanceMi(userLocation.lat, userLocation.lng, sch.lat, sch.lng) : 0
                  return (
                    <div
                      key={sch.id}
                      onClick={() => saveSchool(sch.name)}
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
                        <h4 style={{ fontWeight: 800, fontSize: '14px', margin: 0 }}>{sch.name}</h4>
                        <span style={{ fontSize: '11px', opacity: 0.8, fontWeight: 700 }}>
                          {sch.borough} · ~{dist.toFixed(1)} miles away
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
            paddingBottom: '12px',
            marginBottom: '16px'
          }}>
            {BOROUGHS.map((borough) => (
              <button
                key={borough}
                onClick={() => {
                  setSelectedBorough(borough)
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
          <div style={{ position: 'relative', marginBottom: '16px' }}>
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
            fontWeight: 800,
            marginBottom: '16px'
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
            height: '300px',
            overflowY: 'scroll',
            WebkitOverflowScrolling: 'touch',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingRight: '6px',
            marginBottom: '16px',
            border: '1.5px solid var(--border)',
            borderRadius: '12px',
            padding: '12px',
            backgroundColor: 'var(--surface-2)'
          }}>
            {filteredSchools.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '30px',
                color: 'var(--text-dim)',
                background: 'var(--surface-2)',
                borderRadius: '12px'
              }}>
                No high schools found matching those search criteria.
              </div>
            ) : (
              filteredSchools.map((sch) => {
                const isSelected = school === sch.name
                return (
                  <div
                    key={sch.id}
                    onClick={() => saveSchool(sch.name)}
                    className="card-glass"
                    style={{
                      padding: '12px 18px',
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
                      <h4 style={{ fontWeight: 800, fontSize: '14px', margin: 0 }}>{sch.name}</h4>
                      <span style={{ fontSize: '11px', opacity: 0.8, fontWeight: 700 }}>
                        {sch.borough} · {sch.type.toUpperCase()} CAMPUS
                      </span>
                    </div>
                    {isSelected && (
                      <span style={{ fontSize: '18px', color: 'var(--brand-dark)' }}>✅</span>
                    )}
                  </div>
                )
              })
            )}
          </div>

          {school && (
            <div style={{
              backgroundColor: 'var(--brand-bg)',
              color: 'var(--brand-dark)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: 800,
              border: '1.5px solid var(--brand)',
              textAlign: 'center'
            }}>
              🎓 Affiliation Verified: Competing for <strong>{school}</strong>
            </div>
          )}
        </div>

        {/* Section: App Preferences */}
        <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 className="card-title">🛠️ Preferences</h2>

          {/* Theme Row */}
          <div className="settings-row">
            <div className="settings-info">
              <h3>Display Theme</h3>
              <p>Toggle between premium light and dark themes</p>
            </div>
            
            <button
              onClick={toggleTheme}
              className="btn-duo-outline"
              style={{ minWidth: '120px', padding: '8px 16px', textTransform: 'capitalize' }}
            >
              {mode === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>

          {/* Sound Effects Row */}
          <div className="settings-row">
            <div className="settings-info">
              <h3>Sound Effects</h3>
              <p>Enable satisfying tone oscillators on answering</p>
            </div>
            
            <button
              onClick={() => {
                const next = !soundEnabled
                setSoundEnabled(next)
                localStorage.setItem('@sound_effects_enabled', String(next))
              }}
              className="btn-duo-outline"
              style={{ minWidth: '120px', padding: '8px 16px' }}
            >
              {soundEnabled ? '🔊 Sounds On' : '🔇 Muted'}
            </button>
          </div>

          {/* Mr. SeN Teacher Switch */}
          <div className="settings-row" style={{ borderBottom: 'none' }}>
            <div className="settings-info">
              <h3>Teacher Dashboard Mode</h3>
              <p>Are you Mr. SeN? Access student mobile beta lists and pitfall analytics</p>
            </div>
            
            <button
              onClick={() => {
                const next = !teacherMode
                setTeacherMode(next)
                localStorage.setItem('@is_teacher_mode', String(next))
              }}
              className="btn-duo btn-duo-purple"
              style={{ minWidth: '120px', padding: '8px 16px', fontSize: '12px' }}
            >
              {teacherMode ? '🏫 Teacher Mode Active' : '🎓 Enter Teacher Mode'}
            </button>
          </div>

          {/* Level progress bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1.5px solid var(--border)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)' }}>
              <span>Level Progress ({Math.round(level.progress * 100)}%)</span>
              <span>Next Level: {level.next?.name || 'Grandmaster'}</span>
            </div>
            <div style={{ height: '10px', background: 'var(--surface-3)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${level.progress * 100}%`, backgroundColor: 'var(--brand)' }} />
            </div>
          </div>
        </div>

        {/* Classroom Connection Settings */}
        <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 className="card-title">🏫 Classroom Connection</h2>
          {!joinedClassroom ? (
            <div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 14px 0', lineHeight: '20px' }}>
                Enter the unique B2B classroom code shared by your teacher to link your study logs, track standards, and receive active assignments.
              </p>
              <form onSubmit={async (e) => {
                e.preventDefault()
                const code = e.target.classCode.value.trim()
                if (!code) return
                const res = await joinClassroom(code)
                if (res === 'success') {
                  alert('Successfully linked to classroom! 🎉')
                  e.target.reset()
                } else if (res === 'not_found') {
                  alert('Invalid classroom code. Please check with your teacher.')
                } else {
                  alert('Failed to join classroom.')
                }
              }} style={{ display: 'flex', gap: '12px' }}>
                <input
                  name="classCode"
                  type="text"
                  placeholder="e.g. LIF-ABCDE"
                  style={{
                    flexGrow: 1,
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '2px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontWeight: 700,
                    fontSize: '13px'
                  }}
                />
                <button type="submit" className="btn-duo btn-duo-purple" style={{ padding: '10px 20px', fontSize: '13px' }}>
                  Link Class
                </button>
              </form>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '15px' }}>Linked Class: {joinedClassroom.className}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Teacher: {joinedClassroom.teacherName} • Code: {joinedClassroom.classCode}
                </div>
              </div>
              <button
                onClick={() => {
                  if (confirm('Leave this classroom? You will no longer receive assignments.')) {
                    leaveClassroom(joinedClassroom.classCode)
                  }
                }}
                className="btn-duo-outline"
                style={{ padding: '8px 16px', fontSize: '12px', color: 'var(--wrong-dark)', borderColor: 'var(--wrong)' }}
              >
                Leave Class
              </button>
            </div>
          )}
        </div>

        {/* Predicted Regents Score Widget */}
        <div className="card-glass" style={{ background: 'linear-gradient(135deg, rgba(88,204,2,0.12), rgba(88,204,2,0.03))', border: '2px solid var(--brand)' }}>
          <h2 className="card-title" style={{ color: 'var(--brand-dark)' }}>🎯 Predicted Regents Score</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Based on your placement test performance, unit mastery, and study consistency.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: `conic-gradient(var(--brand) ${(predictedScore.score / 100) * 360}deg, var(--surface-3) 0deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 16px rgba(88,204,2,0.3)',
              position: 'relative',
            }}>
              <div style={{ width: '74px', height: '74px', borderRadius: '50%', background: 'var(--surface)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '22px', color: 'var(--brand-dark)', lineHeight: 1 }}>{predictedScore.score}</div>
                <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>/ 100</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '18px', color: predictedScore.score >= 65 ? 'var(--brand-dark)' : 'var(--wrong-dark)', marginBottom: '6px' }}>
                {predictedScore.score >= 85 ? '🌟 Mastery Level' : predictedScore.score >= 65 ? '✅ On Track to Pass' : '⚠️ Needs Improvement'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '18px' }}>
                {predictedScore.score >= 65
                  ? `You're predicted to score above the passing threshold. Keep studying to raise your score further!`
                  : `Focus on your weak units and take more practice quizzes to raise your predicted score above 65.`}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                {predictedScore.factors?.map((f, i) => (
                  <span key={i} style={{ fontSize: '11px', fontWeight: 700, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '3px 8px', color: 'var(--text-muted)' }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {predictedScore.confidence && (
            <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--text-dim)', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
              ℹ️ Confidence: <strong>{predictedScore.confidence}</strong> · Based on {predictedScore.dataPoints || 0} data points.
            </div>
          )}
        </div>

        {/* Logout Card */}
        <div className="card-glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '18px' }}>Log Out</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Disconnect your session. Local guest data will be cached.
            </p>
          </div>

          <button className="btn-duo btn-duo-wrong" onClick={() => {
            if (confirm('Are you sure you want to log out?')) logOut()
          }}>
            Log Out Session
          </button>
        </div>

      </div>
    </div>
  )
}
