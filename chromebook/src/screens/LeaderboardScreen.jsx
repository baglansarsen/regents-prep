import React from 'react'

export default function LeaderboardScreen({
  user,
  leaderboard = [],
  loading,
  refresh,
}) {
  return (
    <div className="screen-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        
        {/* Title Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>🏆</span> High School Leaderboards
          </h1>
          
          <button
            className="btn-duo-outline"
            style={{ padding: '8px 16px', fontSize: '13px', borderBottomWidth: '2.5px' }}
            onClick={refresh}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : '🔄 Refresh'}
          </button>
        </div>

        {/* Global Podium */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          gap: '20px',
          margin: '20px 0 10px',
          padding: '20px 0'
        }}>
          {/* 2nd Place */}
          {leaderboard[1] && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, maxWidth: '140px' }}>
              <span style={{ fontSize: '32px' }}>🥈</span>
              <div style={{
                fontSize: '44px',
                background: 'var(--surface-2)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px var(--shadow)'
              }}>
                {leaderboard[1].petType === 'fox' ? '🦊' : leaderboard[1].petType === 'axolotl' ? '🦎' : leaderboard[1].petType === 'capybara' ? '🦫' : '🐻'}
              </div>
              <div style={{ fontWeight: 800, marginTop: '8px', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>
                {leaderboard[1].displayName}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{leaderboard[1].xp} XP</div>
              <div style={{ height: '80px', width: '100%', background: 'linear-gradient(to top, var(--surface-2), var(--surface-3))', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', marginTop: '12px' }} />
            </div>
          )}

          {/* 1st Place */}
          {leaderboard[0] && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, maxWidth: '160px', zIndex: 2 }}>
              <span style={{ fontSize: '48px', animation: 'float 2s ease infinite' }}>🥇</span>
              <div style={{
                fontSize: '56px',
                background: 'var(--warn-bg)',
                border: '3px solid var(--warn)',
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(255,200,0,0.2)'
              }}>
                {leaderboard[0].petType === 'fox' ? '🦊' : leaderboard[0].petType === 'axolotl' ? '🦎' : leaderboard[0].petType === 'capybara' ? '🦫' : '🐻'}
              </div>
              <div style={{ fontWeight: 900, marginTop: '8px', fontSize: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>
                {leaderboard[0].displayName}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--warn-dark)' }}>{leaderboard[0].xp} XP</div>
              <div style={{ height: '120px', width: '100%', background: 'linear-gradient(to top, var(--warn-bg), var(--warn))', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', marginTop: '12px' }} />
            </div>
          )}

          {/* 3rd Place */}
          {leaderboard[2] && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, maxWidth: '140px' }}>
              <span style={{ fontSize: '32px' }}>🥉</span>
              <div style={{
                fontSize: '44px',
                background: 'var(--surface-2)',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px var(--shadow)'
              }}>
                {leaderboard[2].petType === 'fox' ? '🦊' : leaderboard[2].petType === 'axolotl' ? '🦎' : leaderboard[2].petType === 'capybara' ? '🦫' : '🐻'}
              </div>
              <div style={{ fontWeight: 800, marginTop: '8px', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>
                {leaderboard[2].displayName}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{leaderboard[2].xp} XP</div>
              <div style={{ height: '60px', width: '100%', background: 'linear-gradient(to top, var(--surface-2), var(--surface-3))', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', marginTop: '12px' }} />
            </div>
          )}
        </div>

        {/* Scrollable Leaderboard Table */}
        <div className="card-glass" style={{ padding: '8px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {leaderboard.slice(3).map((student, index) => {
              const rank = index + 4
              const isCurrentUser = student.uid === user?.uid

              return (
                <div
                  key={student.uid || index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 24px',
                    borderBottom: '1px solid var(--border)',
                    backgroundColor: isCurrentUser ? 'var(--brand-bg)' : 'transparent',
                    fontWeight: isCurrentUser ? 800 : 'inherit'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ width: '24px', textAlign: 'center', fontWeight: 900, color: 'var(--text-dim)' }}>
                      {rank}
                    </span>
                    <span style={{ fontSize: '24px' }}>
                      {student.petType === 'fox' ? '🦊' : student.petType === 'axolotl' ? '🦎' : student.petType === 'capybara' ? '🦫' : student.petType === 'voidCat' ? '🐱' : '🐻'}
                    </span>
                    <div>
                      <div style={{ fontSize: '15px' }}>{student.displayName || 'Anonymous'}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>
                        {student.school || 'Unaffiliated'}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800 }}>
                    ⭐ {student.xp} XP
                  </div>
                </div>
              )
            })}

            {leaderboard.length <= 3 && (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                📭 Leaderboard is calculating... Earn some XP to join!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
