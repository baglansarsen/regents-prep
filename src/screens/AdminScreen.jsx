import { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

export const ADMIN_EMAIL = 'baglan.sarsen@gmail.com'

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

export default function AdminScreen({ user, onHome }) {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy,  setSortBy]  = useState('recent')

  useEffect(() => {
    if (user?.email !== ADMIN_EMAIL) return
    getDocs(query(collection(db, 'leaderboard'), orderBy('updatedAt', 'desc')))
      .then((snap) => setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
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

  const now        = Date.now()
  const totalUsers = users.length
  const activeToday  = users.filter((u) => u.updatedAt && now - u.updatedAt < 86400000).length
  const activeWeek   = users.filter((u) => u.updatedAt && now - u.updatedAt < 7 * 86400000).length
  const activeMonth  = users.filter((u) => u.updatedAt && now - u.updatedAt < 30 * 86400000).length
  const avgXP = totalUsers ? Math.round(users.reduce((s, u) => s + (u.xp || 0), 0) / totalUsers) : 0

  const schoolMap = {}
  for (const u of users) {
    const s = u.school || '—'
    schoolMap[s] = (schoolMap[s] || 0) + 1
  }
  const topSchools = Object.entries(schoolMap).sort((a, b) => b[1] - a[1]).slice(0, 10)
  const maxSchoolCount = topSchools[0]?.[1] ?? 1

  const sorted = [...users].sort((a, b) => {
    if (sortBy === 'xp')     return (b.xp || 0) - (a.xp || 0)
    if (sortBy === 'recent') return (b.updatedAt || 0) - (a.updatedAt || 0)
    return (a.displayName || '').localeCompare(b.displayName || '')
  })

  return (
    <div className="admin-screen">
      <div className="admin-header">
        <button className="admin-back-btn" onClick={onHome}>← Back</button>
        <h1 className="admin-title">Admin Dashboard</h1>
      </div>

      {loading ? (
        <div className="admin-loading">Loading users…</div>
      ) : (
        <div className="admin-body">

          {/* ── Overview stats ── */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <span className="admin-stat-val">{totalUsers}</span>
              <span className="admin-stat-lbl">Total Users</span>
            </div>
            <div className="admin-stat-card admin-stat-card--green">
              <span className="admin-stat-val">{activeToday}</span>
              <span className="admin-stat-lbl">Active Today</span>
            </div>
            <div className="admin-stat-card admin-stat-card--amber">
              <span className="admin-stat-val">{activeWeek}</span>
              <span className="admin-stat-lbl">This Week</span>
            </div>
            <div className="admin-stat-card admin-stat-card--blue">
              <span className="admin-stat-val">{activeMonth}</span>
              <span className="admin-stat-lbl">This Month</span>
            </div>
            <div className="admin-stat-card">
              <span className="admin-stat-val">{avgXP.toLocaleString()}</span>
              <span className="admin-stat-lbl">Avg XP</span>
            </div>
          </div>

          {/* ── School breakdown ── */}
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

          {/* ── User list ── */}
          <div className="admin-section">
            <div className="admin-section-head">
              <h2 className="admin-section-title">All Users ({totalUsers})</h2>
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
                <div key={u.id} className="admin-user-row">
                  <span className="admin-user-rank">#{i + 1}</span>
                  {u.photoURL
                    ? <img className="admin-user-avatar" src={u.photoURL} alt="" referrerPolicy="no-referrer" />
                    : <div className="admin-user-avatar admin-user-avatar--init">{(u.displayName || '?')[0].toUpperCase()}</div>
                  }
                  <div className="admin-user-info">
                    <span className="admin-user-name">{u.displayName || 'Anonymous'}</span>
                    <span className="admin-user-school">{u.school || '—'}</span>
                  </div>
                  <div className="admin-user-meta">
                    <span className="admin-user-xp">{(u.xp || 0).toLocaleString()} XP</span>
                    <span className="admin-user-time">{timeAgo(u.updatedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
