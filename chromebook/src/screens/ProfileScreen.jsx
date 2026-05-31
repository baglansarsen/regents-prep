import React, { useState, useMemo } from 'react'
import { NY_SCHOOLS, BOROUGHS } from '@content/schools'

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
}) {
  const [selectedBorough, setSelectedBorough] = useState(() => {
    const matched = NY_SCHOOLS.find(s => s.name === school)
    return matched ? matched.borough : BOROUGHS[0]
  })

  const filteredSchools = useMemo(() => {
    return NY_SCHOOLS.filter(s => s.borough === selectedBorough)
  }, [selectedBorough])

  function handleSchoolChange(e) {
    const val = e.target.value
    if (val) {
      saveSchool(val)
    }
  }

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

        {/* Section: Academic Affiliation */}
        <div className="card-glass">
          <h2 className="card-title">🏫 High School Affiliation</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Linking your school connects you to your school's scoreboard so you can compete on points against your schoolmates!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="auth-input-group">
              <label>Select Borough/Region</label>
              <select
                className="subject-selector"
                style={{ width: '100%', padding: '12px 16px' }}
                value={selectedBorough}
                onChange={(e) => setSelectedBorough(e.target.value)}
              >
                {BOROUGHS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="auth-input-group">
              <label>Select High School</label>
              <select
                className="subject-selector"
                style={{ width: '100%', padding: '12px 16px' }}
                value={school || ''}
                onChange={handleSchoolChange}
              >
                <option value="" disabled>-- Select School --</option>
                {filteredSchools.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {school && (
            <div style={{
              marginTop: '16px',
              backgroundColor: 'var(--brand-bg)',
              color: 'var(--brand-dark)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              fontWeight: 800,
              border: '1.5px solid var(--brand)'
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

          {/* Core local stats info */}
          <div className="settings-row">
            <div className="settings-info">
              <h3>XP Standing</h3>
              <p>Your current accumulated study standing</p>
            </div>
            <div style={{ fontWeight: 800, fontFamily: 'var(--font-outfit)', fontSize: '18px', color: 'var(--brand-dark)' }}>
              ⭐ {xp} XP
            </div>
          </div>

          {/* Level progress bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)' }}>
              <span>Level Progress ({Math.round(level.progress * 100)}%)</span>
              <span>Next Level: {level.next?.name || 'Grandmaster'}</span>
            </div>
            <div style={{ height: '10px', background: 'var(--surface-3)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${level.progress * 100}%`, backgroundColor: 'var(--brand)' }} />
            </div>
          </div>
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
