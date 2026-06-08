import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function LeaderboardScreen({
  user,
  leaderboard = [],
  loading,
  refresh,
  school,
  friends = [],
  setScreen,
}) {
  const [tab, setTab] = useState('school') // 'school' | 'friends'
  const [schoolList, setSchoolList] = useState([])
  const [friendsList, setFriendsList] = useState([])
  const [localLoading, setLocalLoading] = useState(false)

  const loadLeaderboardData = useCallback(async () => {
    if (!user?.uid) {
      // Guest Mock Data
      const activeSchool = school || 'Brooklyn Technical High School'
      
      const sPeers = [
        { uid: 'peer1', displayName: 'Elena Rostova', xp: 1980, petType: 'axolotl', school: activeSchool },
        { uid: 'peer2', displayName: 'Raj Patel', xp: 1720, petType: 'capybara', school: activeSchool },
        { uid: 'peer3', displayName: 'Chloe Zhao', xp: 1450, petType: 'voidCat', school: activeSchool },
        { uid: 'peer4', displayName: 'Sofia Bianchi', xp: 950, petType: 'bunny', school: activeSchool },
        { uid: 'me', displayName: 'You (Guest Mode)', xp: 1250, petType: 'bear', school: activeSchool, isSelf: true }
      ].sort((a, b) => b.xp - a.xp)
      setSchoolList(sPeers)

      const fRank = [
        { uid: 'f1', displayName: 'Study Buddy Sophia', xp: 950, petType: 'bunny', school: activeSchool },
        { uid: 'f2', displayName: 'Alex from Chemistry', xp: 1420, petType: 'fox', school: activeSchool },
        { uid: 'me', displayName: 'You (Guest Mode)', xp: 1250, petType: 'bear', school: activeSchool, isSelf: true }
      ].sort((a, b) => b.xp - a.xp)
      setFriendsList(fRank)
      return
    }

    setLocalLoading(true)
    try {
      // 1. Fetch School mates
      if (school && school !== 'Independent') {
        const snap = await getDocs(
          query(collection(db, 'leaderboard'), where('school', '==', school))
        )
        const peers = snap.docs.map(d => ({
          uid: d.id,
          displayName: d.data().displayName || 'Classmate',
          xp: d.data().xp || 0,
          petType: d.data().petType || 'fox',
          school: d.data().school
        }))
        // Ensure current user is in the list
        if (!peers.some(p => p.uid === user.uid)) {
          const selfSnap = await getDoc(doc(db, 'leaderboard', user.uid))
          if (selfSnap.exists()) {
            peers.push({ uid: user.uid, ...selfSnap.data() })
          } else {
            // fallback if user doc has not propagated yet
            peers.push({
              uid: user.uid,
              displayName: user.displayName || 'You',
              xp: leaderboard.find(l => l.uid === user.uid)?.xp || 0,
              petType: 'bear',
              school: school
            })
          }
        }
        peers.sort((a, b) => b.xp - a.xp)
        setSchoolList(peers)
      } else {
        setSchoolList([])
      }

      // 2. Fetch Friends
      const allUids = [user.uid, ...friends.map(f => f.uid || f.id)].filter(Boolean)
      const lbDocs = await Promise.all(
        allUids.map(uid => getDoc(doc(db, 'leaderboard', uid)).catch(() => null))
      )
      
      const fRows = allUids.map((uid, i) => {
        const data = lbDocs[i]?.exists() ? lbDocs[i].data() : {}
        const isSelf = uid === user.uid
        
        let dName = data.displayName
        if (!dName) {
          if (isSelf) {
            dName = user.displayName || 'You'
          } else {
            const foundFriend = friends.find(f => (f.uid || f.id) === uid)
            dName = foundFriend?.displayName || 'Friend'
          }
        }

        return {
          uid,
          displayName: dName,
          xp: data.xp || 0,
          petType: data.petType || 'fox',
          school: data.school || 'Unaffiliated',
          isSelf
        }
      })
      fRows.sort((a, b) => b.xp - a.xp)
      setFriendsList(fRows)
    } catch (e) {
      console.warn('[LeaderboardScreen] Failed to load local ranking lists:', e)
    }
    setLocalLoading(false)
  }, [user, school, friends, leaderboard])

  useEffect(() => {
    loadLeaderboardData()
  }, [loadLeaderboardData])

  const activeList = tab === 'school' ? schoolList : friendsList
  const showLoading = loading || localLoading

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
            onClick={async () => {
              await loadLeaderboardData()
              if (refresh) refresh()
            }}
            disabled={showLoading}
          >
            {showLoading ? 'Refreshing...' : '🔄 Refresh'}
          </button>
        </div>

        {/* Tab Selectors */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          borderBottom: '2px solid var(--border)',
          paddingBottom: '16px'
        }}>
          {[
            { id: 'school', label: `🏫 My School (${school && school !== 'Independent' ? school.split(' ')[0] : 'None'})` },
            { id: 'friends', label: '🤝 Classmate Friends' }
          ].map((t) => {
            const isActive = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`btn-duo-outline ${isActive ? 'active' : ''}`}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: 800,
                  borderColor: isActive ? 'var(--brand)' : 'var(--border)',
                  background: isActive ? 'var(--brand-bg)' : 'var(--surface)',
                  color: isActive ? 'var(--brand-dark)' : 'var(--text-muted)',
                  borderBottomWidth: '2.5px'
                }}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Dynamic View Panel */}
        {tab === 'school' && (!school || school === 'Independent') ? (
          /* SCHOOL PLACEHOLDER */
          <div className="card-glass" style={{
            textAlign: 'center',
            padding: '48px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            animation: 'scale-up 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <div style={{ fontSize: '64px', animation: 'float 2s ease infinite' }}>🏫</div>
            <h3 style={{ fontWeight: 900, fontSize: '20px', fontFamily: 'var(--font-outfit)' }}>No High School Linked</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '440px', lineHeight: '22px' }}>
              Link your high school in your Profile Settings to represent your campus, compete against your school peers, and climb the local leaderboards!
            </p>
            <button
              className="btn-duo btn-duo-blue"
              onClick={() => setScreen('profile')}
              style={{ padding: '12px 24px', fontSize: '15px' }}
            >
              ⚙️ Go to Profile Settings
            </button>
          </div>
        ) : tab === 'friends' && friendsList.length <= 1 ? (
          /* FRIENDS PLACEHOLDER */
          <div className="card-glass" style={{
            textAlign: 'center',
            padding: '48px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            animation: 'scale-up 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <div style={{ fontSize: '64px', animation: 'float 2s ease infinite' }}>🤝</div>
            <h3 style={{ fontWeight: 900, fontSize: '20px', fontFamily: 'var(--font-outfit)' }}>No Classmates in Duel List</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '440px', lineHeight: '22px' }}>
              Duels and rankings are more fun with study buddies! Go to the Battle Arena lobby to share your friend code, add school classmates directly, and challenge peers!
            </p>
            <button
              className="btn-duo btn-duo-purple"
              onClick={() => setScreen('battle')}
              style={{ padding: '12px 24px', fontSize: '15px' }}
            >
              ⚔️ Open Battle Arena
            </button>
          </div>
        ) : showLoading && activeList.length === 0 ? (
          /* SKELETON LOADERS */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fade-in 0.25s ease' }}>
            <div className="card-glass skeleton-box" style={{ height: '140px', width: '100%' }} />
            <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '60%' }}>
                    <div className="skeleton-box" style={{ width: '24px', height: '24px', borderRadius: '4px' }} />
                    <div className="skeleton-box" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '120px' }}>
                      <div className="skeleton-box" style={{ width: '100%', height: '14px' }} />
                      <div className="skeleton-box" style={{ width: '60%', height: '10px' }} />
                    </div>
                  </div>
                  <div className="skeleton-box" style={{ width: '60px', height: '16px' }} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* RANKINGS VIEW */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', animation: 'fade-in 0.2s ease-out' }}>
            
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
              {activeList[1] && (
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
                    {activeList[1].petType === 'fox' ? '🦊' : activeList[1].petType === 'axolotl' ? '🦎' : activeList[1].petType === 'capybara' ? '🦫' : activeList[1].petType === 'voidCat' ? '🐱' : activeList[1].petType === 'bunny' ? '🐰' : '🐻'}
                  </div>
                  <div style={{ fontWeight: 800, marginTop: '8px', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>
                    {activeList[1].displayName}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{activeList[1].xp} XP</div>
                  <div style={{ height: '80px', width: '100%', background: 'linear-gradient(to top, var(--surface-2), var(--surface-3))', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', marginTop: '12px' }} />
                </div>
              )}

              {/* 1st Place */}
              {activeList[0] && (
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
                    {activeList[0].petType === 'fox' ? '🦊' : activeList[0].petType === 'axolotl' ? '🦎' : activeList[0].petType === 'capybara' ? '🦫' : activeList[0].petType === 'voidCat' ? '🐱' : activeList[0].petType === 'bunny' ? '🐰' : '🐻'}
                  </div>
                  <div style={{ fontWeight: 900, marginTop: '8px', fontSize: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>
                    {activeList[0].displayName}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--warn-dark)' }}>{activeList[0].xp} XP</div>
                  <div style={{ height: '120px', width: '100%', background: 'linear-gradient(to top, var(--warn-bg), var(--warn))', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', marginTop: '12px' }} />
                </div>
              )}

              {/* 3rd Place */}
              {activeList[2] && (
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
                    {activeList[2].petType === 'fox' ? '🦊' : activeList[2].petType === 'axolotl' ? '🦎' : activeList[2].petType === 'capybara' ? '🦫' : activeList[2].petType === 'voidCat' ? '🐱' : activeList[2].petType === 'bunny' ? '🐰' : '🐻'}
                  </div>
                  <div style={{ fontWeight: 800, marginTop: '8px', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>
                    {activeList[2].displayName}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{activeList[2].xp} XP</div>
                  <div style={{ height: '60px', width: '100%', background: 'linear-gradient(to top, var(--surface-2), var(--surface-3))', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', marginTop: '12px' }} />
                </div>
              )}
            </div>

            {/* Scrollable Leaderboard Table */}
            <div className="card-glass" style={{ padding: '8px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {activeList.slice(3).map((student, index) => {
                  const rank = index + 4
                  const isCurrentUser = student.uid === user?.uid || student.isSelf

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
                          {student.petType === 'fox' ? '🦊' : student.petType === 'axolotl' ? '🦎' : student.petType === 'capybara' ? '🦫' : student.petType === 'voidCat' ? '🐱' : student.petType === 'bunny' ? '🐰' : '🐻'}
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

                {activeList.length <= 3 && (
                  <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                    📭 Earn some XP to climb the podium!
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
