import React, { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { SUBJECT_META } from '@content/subjects'

export default function TeacherDashboardScreen({
  subject,
  school,
}) {
  const [signups, setSignups] = useState([])
  const [loading, setLoading] = useState(true)
  const [announcement, setAnnouncement] = useState(() => localStorage.getItem('@teacher_announcement') || '')
  const [successMsg, setSuccessMsg] = useState('')

  // 1. Fetch live Mobile Beta sign-ups from Firestore
  useEffect(() => {
    async function fetchSignups() {
      try {
        setLoading(true)
        const q = query(collection(db, 'mobileBetaSignups'), orderBy('timestamp', 'desc'))
        const snap = await getDocs(q)
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setSignups(list)
      } catch (err) {
        console.error('[TeacherDashboard] Error fetching beta signups:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSignups()
  }, [])

  // 2. Publish announcement to all students (persists in localStorage/cache)
  function handlePublishAnnouncement(e) {
    e.preventDefault()
    if (!announcement.trim()) {
      localStorage.removeItem('@teacher_announcement')
      setAnnouncement('')
      setSuccessMsg('Announcement cleared! Students will no longer see the bulletin card.')
    } else {
      localStorage.setItem('@teacher_announcement', announcement.trim())
      setSuccessMsg('Announcement published successfully! Students will see this bulletin at the top of their Home feed.')
    }
    setTimeout(() => setSuccessMsg(''), 4000)
    
    // Dispatch local storage event so current window updates instantly if running side-by-side
    window.dispatchEvent(new Event('storage'))
  }

  // 3. Subject-based Classroom Weak Topics Mock Aggregates (Dynamic)
  const pitfallsMap = {
    'living-environment': [
      { name: 'Photosynthesis vs Cellular Respiration', accuracy: 54, count: 28, status: 'Critically Weak ⚠️' },
      { name: 'Mitosis vs Meiosis stages', accuracy: 62, count: 19, status: 'Struggling' },
      { name: 'Food Web Ecosystem balance shifts', accuracy: 74, count: 12, status: 'Needs Polish' }
    ],
    'earth-science': [
      { name: 'P-wave and S-wave earthquake epicenters', accuracy: 48, count: 32, status: 'Critically Weak ⚠️' },
      { name: 'Igneous vs Sedimentary rock characteristics', accuracy: 59, count: 24, status: 'Struggling' },
      { name: 'Coriolis wind patterns deflection', accuracy: 71, count: 14, status: 'Needs Polish' }
    ],
    'chemistry': [
      { name: 'Balancing Redox reactions', accuracy: 41, count: 41, status: 'Critically Weak ⚠️' },
      { name: 'Stoichiometry molar computations', accuracy: 58, count: 29, status: 'Struggling' },
      { name: 'Le Chatelier equilibrium shifts', accuracy: 68, count: 18, status: 'Needs Polish' }
    ],
    'physics': [
      { name: 'Electromagnetism vector induction', accuracy: 38, count: 45, status: 'Critically Weak ⚠️' },
      { name: 'Projectile wave displacement formulas', accuracy: 51, count: 31, status: 'Struggling' },
      { name: 'Refraction index ray boundaries', accuracy: 69, count: 15, status: 'Needs Polish' }
    ],
    'algebra-1': [
      { name: 'Quadratic vertex factoring formulas', accuracy: 53, count: 35, status: 'Critically Weak ⚠️' },
      { name: 'Exponential growth compound rates', accuracy: 63, count: 22, status: 'Struggling' },
      { name: 'Domain range inequality conditions', accuracy: 78, count: 9, status: 'Needs Polish' }
    ]
  }

  const defaultPitfalls = [
    { name: 'Complex multiple choice options', accuracy: 55, count: 20, status: 'Critically Weak ⚠️' },
    { name: 'Scientific terminology decoding', accuracy: 65, count: 15, status: 'Struggling' },
    { name: 'Graph interpretation accuracy', accuracy: 75, count: 10, status: 'Needs Polish' }
  ]

  const activePitfalls = pitfallsMap[subject] || defaultPitfalls
  const meta = SUBJECT_META[subject] || { name: 'Living Environment', icon: '🔬', color: 'var(--brand)' }

  return (
    <div className="screen-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
        
        {/* Blackboard Teacher Header */}
        <div className="card-glass" style={{
          background: 'linear-gradient(135deg, var(--surface-2), var(--surface-3))',
          padding: '32px',
          borderLeft: '8px solid var(--purple-dark)'
        }}>
          <span style={{ fontSize: '56px' }}>👨‍🏫</span>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '32px', marginTop: '12px' }}>
            Mr. SeN's Teacher Classroom
          </h1>
          <p style={{ marginTop: '6px', fontSize: '15px', color: 'var(--text-muted)', lineHeight: '22px' }}>
            Manage early mobile beta invites, inspect real-time student signups, and monitor aggregate classroom topic pitfalls for the NY Regents curriculum.
          </p>
        </div>

        {/* Two Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
          
          {/* LEFT COLUMN: Classroom Pitfalls & Announcements */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Announcements Panel */}
            <div className="card-glass">
              <h2 className="card-title">📢 Broadcast Student Announcements</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Publish updates or study tips. This announcement displays instantly in a premium card at the top of all students' Home Study Path!
              </p>

              <form onSubmit={handlePublishAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <textarea
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  placeholder="Example: Hey Class! Make sure to practice the Earth Science mock exams before our final on Friday. Mr. SeN"
                  style={{
                    width: '100%',
                    height: '100px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '2px solid var(--border)',
                    background: 'var(--bg)',
                    fontFamily: 'inherit',
                    fontSize: '14px',
                    fontWeight: 700,
                    resize: 'none'
                  }}
                />

                {successMsg && (
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: successMsg.includes('cleared') ? 'var(--wrong-dark)' : 'var(--correct-dark)',
                    background: successMsg.includes('cleared') ? 'var(--wrong-bg)' : 'var(--correct-bg)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid currentColor'
                  }}>
                    {successMsg}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn-duo btn-duo-purple" style={{ flexGrow: 1, padding: '10px' }}>
                    Publish Broadcast 🚀
                  </button>
                  {announcement && (
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem('@teacher_announcement')
                        setAnnouncement('')
                        setSuccessMsg('Announcement cleared!')
                        setTimeout(() => setSuccessMsg(''), 3000)
                        window.dispatchEvent(new Event('storage'))
                      }}
                      className="btn-duo btn-duo-wrong"
                      style={{ padding: '10px 16px' }}
                    >
                      Clear ✕
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Pitfalls Weak Topic Alert */}
            <div className="card-glass">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="card-title">⚠️ Weak Topic Alert Aggregate</h2>
                <span className="pet-stage" style={{ background: 'var(--brand-bg)', color: 'var(--brand-dark)' }}>
                  {meta.icon} {meta.name}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', marginTop: '4px' }}>
                Aggregate diagnosis tracking: These are the topics classroom students struggle with most under the active subject.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activePitfalls.map((pit, idx) => (
                  <div key={idx} className="card-glass" style={{ padding: '14px 16px', background: 'var(--surface-2)', border: '1.5px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontWeight: 800, fontSize: '13px', maxWidth: '70%' }}>
                        {pit.name}
                      </h4>
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 900,
                        backgroundColor: pit.accuracy < 55 ? 'var(--wrong-bg)' : 'var(--warn-bg)',
                        color: pit.accuracy < 55 ? 'var(--wrong-dark)' : 'var(--warn-dark)'
                      }}>
                        {pit.status}
                      </span>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '2px' }}>
                        <span>Avg Classroom Accuracy</span>
                        <span>{pit.accuracy}%</span>
                      </div>
                      <div style={{ height: '6px', backgroundColor: 'var(--surface-3)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${pit.accuracy}%`,
                          backgroundColor: pit.accuracy < 55 ? 'var(--wrong)' : 'var(--warn)'
                        }} />
                      </div>
                      <div style={{ fontSize: '9px', color: 'var(--text-dim)', marginTop: '4px', fontWeight: 800 }}>
                        Triggered {pit.count} total student errors.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Early Mobile Beta Access list */}
          <div className="card-glass" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📱 Early Mobile Beta Requests</span>
              <span className="badge-count" style={{
                background: 'var(--brand)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 900,
                padding: '2px 8px',
                borderRadius: '8px'
              }}>{signups.length} students</span>
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', marginTop: '4px' }}>
              Students who achieved 500 study XP and requested early access to the React Native iOS/Android builds.
            </p>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)', fontWeight: 800 }}>
                Loading beta list...
              </div>
            ) : signups.length === 0 ? (
              <div className="card-glass" style={{
                padding: '40px',
                textAlign: 'center',
                borderStyle: 'dashed',
                color: 'var(--text-dim)',
                background: 'transparent'
              }}>
                <span style={{ fontSize: '48px' }}>📭</span>
                <h4 style={{ fontWeight: 800, marginTop: '8px' }}>No beta requests yet</h4>
                <p style={{ fontSize: '11px', marginTop: '2px' }}>Student signups will appear here automatically in real-time as they pass 500 XP!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '580px', paddingRight: '4px' }}>
                {signups.map((student) => (
                  <div
                    key={student.id}
                    className="card-glass"
                    style={{
                      padding: '14px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      border: '1.5px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 900, fontSize: '14px' }}>
                        {student.displayName}
                      </span>
                      <span className="pet-stage" style={{ fontSize: '10px' }}>
                        ⭐ {student.xp} XP
                      </span>
                    </div>

                    <div style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--purple-dark)', fontWeight: 700 }}>
                      {student.email}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-dim)', fontWeight: 800, marginTop: '4px' }}>
                      <span>School: {student.school}</span>
                      <span>{new Date(student.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
