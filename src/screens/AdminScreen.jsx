import { useState, useEffect, useCallback } from 'react'
import {
  collection, getDocs, getDoc, doc,
  query, orderBy, where, limit, Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase'

export const ADMIN_EMAIL = 'baglan.sarsen@gmail.com'

// ── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(ms) {
  if (!ms) return 'never'
  const diff = Date.now() - ms
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(ms).toLocaleDateString()
}

function pct(num, den) {
  if (!den) return '—'
  return `${Math.round((num / den) * 100)}%`
}

const SUBJECT_LABELS = {
  'living-environment': 'Living Env',
  'earth-science':      'Earth Sci',
  'algebra-1':          'Algebra 1',
  'algebra-2':          'Algebra 2',
  'geometry':           'Geometry',
  'global-history':     'Global Hist',
  'us-history':         'US History',
  'english':            'English',
  'chemistry':          'Chemistry',
  'physics':            'Physics',
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ value, label, color }) {
  return (
    <div className="admin-stat-card" style={color ? { borderTop: `3px solid ${color}` } : {}}>
      <span className="admin-stat-val">{value}</span>
      <span className="admin-stat-lbl">{label}</span>
    </div>
  )
}

function RetentionBar({ label, active, total }) {
  const ratio = total ? active / total : 0
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{label}</span>
        <span style={{ color: 'var(--text)', fontSize: 13, fontWeight: 600 }}>
          {active} / {total} &nbsp;({pct(active, total)})
        </span>
      </div>
      <div style={{ background: 'var(--border)', borderRadius: 4, height: 8 }}>
        <div style={{ background: 'var(--brand)', borderRadius: 4, height: 8, width: `${Math.round(ratio * 100)}%`, transition: 'width .3s' }} />
      </div>
    </div>
  )
}

// ── Overview Tab ──────────────────────────────────────────────────────────────

function OverviewTab({ users }) {
  const now = Date.now()
  const totalUsers    = users.length
  const activeToday   = users.filter(u => u.updatedAt && now - u.updatedAt < 86400000).length
  const activeYest    = users.filter(u => u.updatedAt && now - u.updatedAt >= 86400000 && now - u.updatedAt < 2 * 86400000).length
  const activeWeek    = users.filter(u => u.updatedAt && now - u.updatedAt < 7 * 86400000).length
  const activeMonth   = users.filter(u => u.updatedAt && now - u.updatedAt < 30 * 86400000).length
  const subscribers   = users.filter(u => u.isSubscribed).length
  const avgXP = totalUsers ? Math.round(users.reduce((s, u) => s + (u.xp || 0), 0) / totalUsers) : 0

  const schoolMap = {}
  for (const u of users) { const s = u.school || '—'; schoolMap[s] = (schoolMap[s] || 0) + 1 }
  const topSchools = Object.entries(schoolMap).sort((a, b) => b[1] - a[1]).slice(0, 10)
  const maxSchoolCount = topSchools[0]?.[1] ?? 1

  return (
    <>
      <div className="admin-stats-grid">
        <StatCard value={totalUsers}           label="Total Users" />
        <StatCard value={activeToday}          label="Active Today"   color="#22c55e" />
        <StatCard value={activeWeek}           label="This Week"      color="#f59e0b" />
        <StatCard value={activeMonth}          label="This Month"     color="#3b82f6" />
        <StatCard value={avgXP.toLocaleString()} label="Avg XP" />
        <StatCard value={subscribers}          label="Subscribers"    color="#a855f7" />
      </div>

      <div className="admin-section">
        <h2 className="admin-section-title">Retention</h2>
        <RetentionBar label="Day 1  (active today)"     active={activeToday} total={totalUsers} />
        <RetentionBar label="D1 vs yesterday baseline"  active={activeToday} total={activeYest || 1} />
        <RetentionBar label="Week  (active 7 days)"     active={activeWeek}  total={totalUsers} />
        <RetentionBar label="Month (active 30 days)"    active={activeMonth} total={totalUsers} />
      </div>

      <div className="admin-section">
        <h2 className="admin-section-title">Students by School</h2>
        <div className="admin-school-list">
          {topSchools.map(([school, count]) => (
            <div key={school} className="admin-school-row">
              <span className="admin-school-name">{school}</span>
              <div className="admin-school-bar-track">
                <div className="admin-school-bar-fill" style={{ width: `${Math.round((count / maxSchoolCount) * 100)}%` }} />
              </div>
              <span className="admin-school-count">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ── Engagement Tab ────────────────────────────────────────────────────────────

function EngagementTab() {
  const [days,    setDays]    = useState(30)
  const [events,  setEvents]  = useState([])
  const [loading, setLoading] = useState(true)

  const loadEvents = useCallback(async (d) => {
    setLoading(true)
    try {
      const cutoff = Timestamp.fromMillis(Date.now() - d * 86400000)
      const snap = await getDocs(
        query(collection(db, 'events'), where('ts', '>=', cutoff), orderBy('ts', 'desc'), limit(500))
      )
      setEvents(snap.docs.map(doc => doc.data()))
    } catch (e) {
      console.warn('[Admin] events load error:', e)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadEvents(days) }, [days, loadEvents])

  // Goals
  const goalEvents    = events.filter(e => e.name === 'goal_committed')
  const tier65        = goalEvents.filter(e => e.params?.target === 65).length
  const tier75        = goalEvents.filter(e => e.params?.target === 75).length
  const tier85        = goalEvents.filter(e => e.params?.target === 85).length
  const goalSubjects  = {}
  for (const e of goalEvents) {
    const s = e.params?.subject || 'unknown'
    goalSubjects[s] = (goalSubjects[s] || 0) + 1
  }
  const topGoalSubjects = Object.entries(goalSubjects).sort((a, b) => b[1] - a[1]).slice(0, 5)

  // Quiz results
  const quizEvents    = events.filter(e => e.name === 'results_viewed')
  const quizPassed    = quizEvents.filter(e => e.params?.passed).length
  const quizBySubject = {}
  for (const e of quizEvents) {
    const s = e.params?.subject || 'unknown'
    if (!quizBySubject[s]) quizBySubject[s] = { attempts: 0, passed: 0 }
    quizBySubject[s].attempts++
    if (e.params?.passed) quizBySubject[s].passed++
  }
  const quizSubjectRows = Object.entries(quizBySubject)
    .sort((a, b) => b[1].attempts - a[1].attempts).slice(0, 8)

  // Social
  const shareOpened    = events.filter(e => e.name === 'share_sheet_opened').length
  const shareCompleted = events.filter(e => e.name === 'share_completed').length

  if (loading) return <div className="admin-loading">Loading events…</div>

  return (
    <>
      {/* Time filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[7, 30].map(d => (
          <button
            key={d}
            className={`admin-sort-btn ${days === d ? 'admin-sort-btn--active' : ''}`}
            onClick={() => setDays(d)}
          >
            Last {d} days
          </button>
        ))}
        <span style={{ color: 'var(--text-muted)', fontSize: 13, alignSelf: 'center', marginLeft: 8 }}>
          {events.length} events scanned
        </span>
      </div>

      {/* Goals */}
      <div className="admin-section">
        <h2 className="admin-section-title">Goals Committed — {goalEvents.length}</h2>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
          {[['65 Pass', tier65, '#22c55e'], ['75 Safe Pass', tier75, '#f59e0b'], ['85 Mastery', tier85, '#a855f7']].map(([lbl, n, color]) => (
            <div key={lbl} style={{ background: color + '22', border: `1px solid ${color}55`, borderRadius: 10, padding: '8px 16px', textAlign: 'center', minWidth: 90 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color }}>{n}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{lbl}</div>
            </div>
          ))}
        </div>
        {topGoalSubjects.length > 0 && (
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: 12, marginBottom: 6 }}>TOP SUBJECTS</div>
            {topGoalSubjects.map(([s, n]) => (
              <div key={s} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text)', fontSize: 14 }}>{SUBJECT_LABELS[s] ?? s}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{n}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quiz */}
      <div className="admin-section">
        <h2 className="admin-section-title">Quiz Results — {quizEvents.length} attempts</h2>
        <div style={{ marginBottom: 12 }}>
          <RetentionBar label="Overall pass rate (≥65%)" active={quizPassed} total={quizEvents.length} />
        </div>
        {quizSubjectRows.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ paddingBottom: 6 }}>Subject</th>
                <th style={{ paddingBottom: 6, textAlign: 'right' }}>Attempts</th>
                <th style={{ paddingBottom: 6, textAlign: 'right' }}>Pass rate</th>
              </tr>
            </thead>
            <tbody>
              {quizSubjectRows.map(([s, { attempts, passed }]) => (
                <tr key={s} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '5px 0', color: 'var(--text)' }}>{SUBJECT_LABELS[s] ?? s}</td>
                  <td style={{ padding: '5px 0', textAlign: 'right', color: 'var(--text-muted)' }}>{attempts}</td>
                  <td style={{ padding: '5px 0', textAlign: 'right', color: 'var(--text)' }}>{pct(passed, attempts)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Social */}
      <div className="admin-section">
        <h2 className="admin-section-title">Social / Sharing</h2>
        <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <StatCard value={shareOpened}    label="Share Sheets Opened" />
          <StatCard value={shareCompleted} label="Shares Completed" />
          <StatCard value={pct(shareCompleted, shareOpened)} label="Share-through rate" />
        </div>
      </div>
    </>
  )
}

// ── Users Tab ─────────────────────────────────────────────────────────────────

function UserDetail({ uid }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (!uid) return
    Promise.all([
      getDoc(doc(db, 'users', uid, 'meta', 'streak')),
      getDocs(query(collection(db, 'users', uid, 'quizHistory'), orderBy('timestamp', 'desc'), limit(10))),
    ]).then(([streakSnap, histSnap]) => {
      setData({
        streak: streakSnap.exists() ? streakSnap.data() : null,
        quizzes: histSnap.docs.map(d => d.data()),
      })
    }).catch(() => setData({}))
  }, [uid])

  if (!data) return <div style={{ padding: '10px 0', color: 'var(--text-muted)', fontSize: 13 }}>Loading…</div>

  return (
    <div style={{ padding: '10px 0 6px', borderTop: '1px solid var(--border)', marginTop: 6 }}>
      {data.streak && (
        <div style={{ display: 'flex', gap: 20, marginBottom: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            🔥 Streak <strong style={{ color: 'var(--text)' }}>{data.streak.streak ?? 0}</strong>
            &nbsp;· Best <strong style={{ color: 'var(--text)' }}>{data.streak.longestStreak ?? 0}</strong>
            &nbsp;· Days studied <strong style={{ color: 'var(--text)' }}>{(data.streak.studiedDates ?? []).length}</strong>
          </span>
        </div>
      )}
      {data.quizzes?.length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Last 10 quizzes</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {data.quizzes.map((q, i) => (
              <div key={i} style={{
                background: q.pct >= 65 ? '#22c55e22' : '#ef444422',
                border: `1px solid ${q.pct >= 65 ? '#22c55e55' : '#ef444455'}`,
                borderRadius: 8, padding: '3px 8px', fontSize: 12, color: 'var(--text)',
              }}>
                {SUBJECT_LABELS[q.subject] ?? q.subject ?? '?'} · {q.pct ?? Math.round((q.correct / q.total) * 100)}%
              </div>
            ))}
          </div>
        </div>
      )}
      {!data.streak && !data.quizzes?.length && (
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>No streak or quiz data found.</span>
      )}
    </div>
  )
}

function UsersTab({ users }) {
  const [sortBy,    setSortBy]    = useState('recent')
  const [expanded,  setExpanded]  = useState(null)

  const sorted = [...users].sort((a, b) => {
    if (sortBy === 'xp')     return (b.xp || 0) - (a.xp || 0)
    if (sortBy === 'recent') return (b.updatedAt || 0) - (a.updatedAt || 0)
    return (a.displayName || '').localeCompare(b.displayName || '')
  })

  return (
    <div className="admin-section">
      <div className="admin-section-head">
        <h2 className="admin-section-title">All Users ({users.length})</h2>
        <div className="admin-sort-row">
          {[['recent', 'Recent'], ['xp', 'By XP'], ['name', 'A–Z']].map(([val, label]) => (
            <button
              key={val}
              className={`admin-sort-btn ${sortBy === val ? 'admin-sort-btn--active' : ''}`}
              onClick={() => setSortBy(val)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-user-list">
        {sorted.map((u, i) => (
          <div key={u.id}>
            <div
              className="admin-user-row"
              style={{ cursor: 'pointer' }}
              onClick={() => setExpanded(expanded === u.id ? null : u.id)}
            >
              <span className="admin-user-rank">#{i + 1}</span>
              {u.photoURL
                ? <img className="admin-user-avatar" src={u.photoURL} alt="" referrerPolicy="no-referrer" />
                : <div className="admin-user-avatar admin-user-avatar--init">{(u.displayName || '?')[0].toUpperCase()}</div>
              }
              <div className="admin-user-info">
                <span className="admin-user-name">
                  {u.displayName || 'Anonymous'}
                  {u.isSubscribed && <span style={{ marginLeft: 6, fontSize: 11, background: '#a855f722', color: '#a855f7', borderRadius: 6, padding: '1px 6px' }}>PRO</span>}
                </span>
                <span className="admin-user-school">{u.school || '—'}</span>
              </div>
              <div className="admin-user-meta">
                <span className="admin-user-xp">{(u.xp || 0).toLocaleString()} XP</span>
                <span className="admin-user-time">{timeAgo(u.updatedAt)}</span>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: 12, marginLeft: 8 }}>
                {expanded === u.id ? '▲' : '▼'}
              </span>
            </div>
            {expanded === u.id && <UserDetail uid={u.id} />}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Root AdminScreen ───────────────────────────────────────────────────────────

export default function AdminScreen({ user, onHome }) {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [tab,     setTab]     = useState('overview')

  useEffect(() => {
    if (user?.email !== ADMIN_EMAIL) return
    getDocs(query(collection(db, 'leaderboard'), orderBy('updatedAt', 'desc')))
      .then(snap => setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user?.email])

  if (user?.email !== ADMIN_EMAIL) {
    return (
      <div className="tab-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <p style={{ color: 'var(--text-muted)' }}>Access denied.</p>
      </div>
    )
  }

  const TABS = [
    { id: 'overview',    label: '📊 Overview' },
    { id: 'engagement',  label: '📈 Engagement' },
    { id: 'users',       label: '👥 Users' },
  ]

  return (
    <div className="admin-screen">
      <div className="admin-header">
        <button className="admin-back-btn" onClick={onHome}>← Back</button>
        <h1 className="admin-title">Admin Dashboard</h1>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 8, padding: '0 0 20px', borderBottom: '1px solid var(--border)', marginBottom: 20 }}>
        {TABS.map(t => (
          <button
            key={t.id}
            className={`admin-sort-btn ${tab === t.id ? 'admin-sort-btn--active' : ''}`}
            style={{ fontSize: 14, padding: '8px 16px' }}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="admin-loading">Loading users…</div>
      ) : (
        <div className="admin-body">
          {tab === 'overview'   && <OverviewTab   users={users} />}
          {tab === 'engagement' && <EngagementTab />}
          {tab === 'users'      && <UsersTab      users={users} />}
        </div>
      )}
    </div>
  )
}
