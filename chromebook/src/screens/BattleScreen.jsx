import React, { useState, useMemo, useEffect } from 'react'
import { SUBJECT_META } from '@content/subjects'

export const OPPONENTS = [
  { id: 'freshman', name: 'Freshman Billy', icon: '👦', title: 'Class Rookie', difficulty: 'Easy', winRate: '35%', accuracy: 0.60, minTime: 6, maxTime: 9 },
  { id: 'buddy', name: 'Study Buddy Sophia', icon: '👧', title: 'Honor Roll Peer', difficulty: 'Medium', winRate: '58%', accuracy: 0.76, minTime: 4, maxTime: 7 },
  { id: 'overlord', name: 'Regents Overlord Kyle', icon: '🧑‍🎓', title: 'Varsity Quizmaster', difficulty: 'Hard', winRate: '82%', accuracy: 0.90, minTime: 3, maxTime: 5 },
  { id: 'grandmaster', name: 'AI Grandmaster G.P.T.', icon: '🤖', title: 'Virtual Oracle', difficulty: 'Expert', winRate: '96%', accuracy: 0.98, minTime: 2, maxTime: 4 },
]

export default function BattleScreen({
  user,
  subject,
  subjectData,
  friends = [],
  incomingRequests = [],
  friendCode,
  addByCode,
  addError,
  successMsg,
  acceptRequest,
  declineRequest,
  school,
  schoolPeers = [],
  loadSchoolPeers,
  addFriendDirectly,
  onStartBattle,
}) {
  const [activeTab, setActiveTab] = useState('bots') // 'bots' | 'friends'
  const [selectedOpponent, setSelectedOpponent] = useState(OPPONENTS[1])
  const [friendCodeInput, setFriendCodeInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [stats, setStats] = useState({ played: 0, wins: 0, losses: 0, draws: 0, streak: 0 })
  const [copied, setCopied] = useState(false)

  // Load school peers when tab is 'friends'
  useEffect(() => {
    if (activeTab === 'friends' && school && loadSchoolPeers) {
      loadSchoolPeers(school)
    }
  }, [activeTab, school, loadSchoolPeers])
  
  const meta = SUBJECT_META[subject] || { name: 'Subject', icon: '🔬', color: 'var(--brand)' }

  // Load local stats
  useEffect(() => {
    const raw = localStorage.getItem(`@battle_stats_${user?.uid || 'guest'}`)
    if (raw) {
      try { setStats(JSON.parse(raw)) } catch (_) {}
    }
  }, [user])

  const winRatio = useMemo(() => {
    if (stats.played === 0) return 0
    return Math.round((stats.wins / stats.played) * 100)
  }, [stats])

  function handleBeginDuel(customOpponent = null) {
    const questions = subjectData.questions || []
    if (questions.length === 0) {
      alert('We could not find questions for this subject. Try switching subjects in the topbar first!')
      return
    }

    // Sample 10 random questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    const sample = shuffled.slice(0, 10)

    const targetOpponent = customOpponent || selectedOpponent
    onStartBattle(targetOpponent, sample)
  }

  function handleAddFriend(e) {
    e.preventDefault()
    if (!friendCodeInput.trim()) return
    addByCode(friendCodeInput)
    setFriendCodeInput('')
  }

  function copyToClipboard() {
    if (!friendCode) return
    navigator.clipboard.writeText(friendCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="screen-container">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '900px', width: '100%', margin: '0 auto' }}>
        
        {/* Banner Card */}
        <div className="card-glass" style={{
          background: 'linear-gradient(135deg, var(--purple-dark), #1e293b)',
          color: '#fff',
          border: 'none',
          padding: '32px',
          boxShadow: '0 8px 30px rgba(168, 85, 247, 0.25)'
        }}>
          <span style={{ fontSize: '48px' }}>⚔️</span>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '30px', marginTop: '12px' }}>
            Regents Battle Arena
          </h1>
          <p style={{ marginTop: '6px', fontSize: '15px', opacity: 0.9, lineHeight: '22px' }}>
            Answer questions as fast and accurately as possible in a 10-question rapid-fire duel. Beat your rival classmates or study peers to claim glory, massive XP, and items for your Study Buddy!
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '16px', borderBottom: '2px solid var(--border)', paddingBottom: '12px' }}>
          <button
            onClick={() => setActiveTab('bots')}
            className={`btn-duo-outline ${activeTab === 'bots' ? 'active' : ''}`}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              borderBottomWidth: activeTab === 'bots' ? '4px' : '2px',
              borderColor: activeTab === 'bots' ? 'var(--purple-dark)' : 'var(--border)',
              color: activeTab === 'bots' ? 'var(--purple-dark)' : 'var(--text-muted)'
            }}
          >
            🤖 Rival Bots
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`btn-duo-outline ${activeTab === 'friends' ? 'active' : ''}`}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              borderBottomWidth: activeTab === 'friends' ? '4px' : '2px',
              borderColor: activeTab === 'friends' ? 'var(--purple-dark)' : 'var(--border)',
              color: activeTab === 'friends' ? 'var(--purple-dark)' : 'var(--text-muted)'
            }}
          >
            ⚔️ Peer Duels
          </button>
        </div>

        {/* Two-Column Grid for Stats and Matchmaking */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
          
          {/* Left Column: Matchmaking Lobby */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Subject Status indicator */}
            <div className="card-glass" style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', padding: '16px 20px', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '0.8px' }}>
                  Arena Field
                </span>
                <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '15px', marginTop: '2px' }}>
                  {meta.icon} {meta.name} questions
                </h3>
              </div>
              <span style={{ fontSize: '11px', padding: '4px 10px', background: 'var(--surface-3)', borderRadius: '6px', fontWeight: 800 }}>
                10 Duels Pool
              </span>
            </div>

            {/* TAB 1: BOTS MATCHMAKING */}
            {activeTab === 'bots' && (
              <>
                <div className="card-glass">
                  <h3 className="card-title">👥 Choose your rival opponent</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                    {OPPONENTS.map((opp) => {
                      const isSelected = selectedOpponent.id === opp.id
                      const diffColor = opp.difficulty === 'Easy' ? 'var(--brand-dark)' : opp.difficulty === 'Medium' ? 'var(--blue)' : opp.difficulty === 'Hard' ? 'var(--warn-dark)' : 'var(--wrong)'
                      
                      return (
                        <div
                          key={opp.id}
                          onClick={() => setSelectedOpponent(opp)}
                          className={`card-glass`}
                          style={{
                            padding: '16px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            borderColor: isSelected ? 'var(--purple-dark)' : 'var(--border)',
                            background: isSelected ? 'var(--purple-bg)' : 'var(--surface)',
                            color: isSelected ? 'var(--text)' : 'inherit',
                            boxShadow: isSelected ? '0 4px 14px rgba(168, 85, 247, 0.15)' : 'none',
                            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '32px' }}>{opp.icon}</span>
                            <div>
                              <h4 style={{ fontWeight: 800, fontSize: '15px' }}>{opp.name}</h4>
                              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>
                                {opp.title}
                              </span>
                            </div>
                          </div>
                          
                          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: diffColor, textTransform: 'uppercase' }}>
                              {opp.difficulty}
                            </span>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                              Winrate: <strong>{opp.winRate}</strong>
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Launch Action */}
                <button
                  onClick={() => handleBeginDuel()}
                  className="btn-duo btn-duo-purple"
                  style={{ padding: '16px', fontSize: '16px' }}
                >
                  ⚡ Enter Arena: Match vs {selectedOpponent.name}
                </button>
              </>
            )}

            {/* TAB 2: FRIENDS DUELS */}
            {activeTab === 'friends' && (
              <>
                {/* Social Actions Header: Code sharing and adding */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  
                  {/* Share My Code */}
                  <div className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                      My Friend Code
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: '20px', color: 'var(--purple-dark)' }}>
                        {friendCode || '---'}
                      </span>
                      <button onClick={copyToClipboard} className="btn-duo-outline" style={{ padding: '4px 8px', fontSize: '11px' }}>
                        {copied ? 'Copied! ✅' : 'Copy 📋'}
                      </button>
                    </div>
                  </div>

                  {/* Add Friend by Code */}
                  <form onSubmit={handleAddFriend} className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                      Add classmate by code
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="ENTER CODE"
                        value={friendCodeInput}
                        onChange={(e) => setFriendCodeInput(e.target.value)}
                        style={{
                          flexGrow: 1,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '2px solid var(--border)',
                          fontFamily: 'monospace',
                          fontWeight: 800,
                          fontSize: '14px',
                          backgroundColor: 'var(--surface)'
                        }}
                      />
                      <button type="submit" className="btn-duo btn-duo-purple" style={{ padding: '8px 14px', fontSize: '13px' }}>
                        Add
                      </button>
                    </div>
                  </form>
                </div>

                {/* Error/Success Feedbacks */}
                {addError && (
                  <div className="card-glass" style={{ borderColor: 'var(--wrong)', background: 'var(--wrong-bg)', color: 'var(--wrong-dark)', padding: '10px 16px', fontSize: '13px', fontWeight: 800 }}>
                    ⚠️ {addError}
                  </div>
                )}
                {successMsg && (
                  <div className="card-glass" style={{ borderColor: 'var(--brand)', background: 'var(--brand-bg)', color: 'var(--brand-dark)', padding: '10px 16px', fontSize: '13px', fontWeight: 800 }}>
                    🎉 {successMsg}
                  </div>
                )}

                {/* Pending Requests Incoming Section */}
                {incomingRequests.length > 0 && (
                  <div className="card-glass" style={{ borderLeft: '4px solid var(--purple-dark)' }}>
                    <h4 style={{ fontFamily: 'var(--font-outfit)', fontSize: '14px', fontWeight: 800, color: 'var(--purple-dark)' }}>
                      📨 Pending friend requests ({incomingRequests.length})
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                      {incomingRequests.map((req) => (
                        <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface-2)', padding: '8px 12px', borderRadius: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800 }}>🧑‍🎓 {req.fromName}</span>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => acceptRequest(req)} className="btn-duo btn-duo-purple" style={{ padding: '6px 10px', fontSize: '11px' }}>
                              Accept
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Friends duel list */}
                <div className="card-glass">
                  <h3 className="card-title">⚔️ Classmate Duel List</h3>
                  
                  {friends.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                      <span style={{ fontSize: '36px' }}>🤝</span>
                      <p style={{ marginTop: '8px', fontSize: '13px', lineHeight: '18px' }}>
                        No classmates added yet. Share your code above, or enter a classmate's code to add them as study friends!
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                      {friends.map((friend) => (
                        <div
                          key={friend.id}
                          className="card-glass"
                          style={{
                            padding: '16px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: 'var(--surface)'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '32px' }}>🧑‍🎓</span>
                            <div>
                              <h4 style={{ fontWeight: 800, fontSize: '15px' }}>{friend.displayName}</h4>
                              <span style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 700 }}>
                                Active Class Rival
                              </span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleBeginDuel({
                              id: friend.uid || friend.id,
                              name: friend.displayName,
                              icon: '🧑‍🎓',
                              difficulty: 'Medium',
                              accuracy: 0.78,
                              minTime: 4,
                              maxTime: 7
                            })}
                            className="btn-duo btn-duo-purple"
                            style={{ padding: '8px 16px', fontSize: '12px' }}
                          >
                            Challenge ⚔️
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 🏫 School Directory Section */}
                <div className="card-glass" style={{ marginTop: '24px' }}>
                  <h3 className="card-title">🏫 School Directory {school ? `(${school})` : ''}</h3>
                  
                  {!school ? (
                    <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                      <p style={{ fontSize: '13px' }}>
                        Join a school to instantly discover and add classmates to your duel list!
                      </p>
                      <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-dim)' }}>
                        Go to Settings (Sidebar Gear icon) to set your school.
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
                      {/* Search Bar */}
                      <input
                        type="text"
                        placeholder="🔍 Search classmates by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '2px solid var(--border)',
                          fontSize: '13px',
                          backgroundColor: 'var(--surface)',
                          outline: 'none'
                        }}
                      />

                      {/* Peers List */}
                      {schoolPeers.filter(p => p.displayName.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                          No classmates found matching your query.
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
                          {schoolPeers
                            .filter(p => p.displayName.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((peer) => {
                              const isFriend = friends.some((f) => f.id === peer.uid || f.uid === peer.uid)
                              return (
                                <div
                                  key={peer.uid}
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '10px 14px',
                                    backgroundColor: 'var(--surface-2)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)'
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontSize: '24px' }}>🧑‍🎓</span>
                                    <div>
                                      <div style={{ fontWeight: 800, fontSize: '14px' }}>{peer.displayName}</div>
                                      <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>⭐ {peer.xp} XP</div>
                                    </div>
                                  </div>
                                  
                                  {isFriend ? (
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-dark)', background: 'var(--brand-bg)', padding: '4px 10px', borderRadius: '6px' }}>
                                      Ready to Duel ⚔️
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => addFriendDirectly(peer.uid, peer.displayName)}
                                      className="btn-duo btn-duo-purple"
                                      style={{ padding: '6px 12px', fontSize: '11px', textTransform: 'capitalize', letterSpacing: 'normal' }}
                                    >
                                      ➕ Add Friend
                                    </button>
                                  )}
                                </div>
                              )
                            })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

          </div>

          {/* Right Column: Arena Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Arena stats */}
            <div className="card-glass" style={{ textAlign: 'center', padding: '28px 20px' }}>
              <div style={{ fontSize: '48px', animation: 'float 3s infinite ease-in-out' }}>🏆</div>
              <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '18px', marginTop: '12px' }}>
                Your Arena Stats
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
                <div style={{ background: 'var(--surface-2)', padding: '12px 6px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Played</div>
                  <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '20px', fontWeight: 900, marginTop: '2px' }}>{stats.played}</div>
                </div>
                <div style={{ background: 'var(--surface-2)', padding: '12px 6px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Win Ratio</div>
                  <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '20px', fontWeight: 900, marginTop: '2px', color: 'var(--brand-dark)' }}>{winRatio}%</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', textAlign: 'left', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Matches Won:</span>
                  <span style={{ fontWeight: 800 }}>🥇 {stats.wins}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Matches Lost:</span>
                  <span style={{ fontWeight: 800 }}>💀 {stats.losses}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Arena Draws:</span>
                  <span style={{ fontWeight: 800 }}>🤝 {stats.draws}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Current Streak:</span>
                  <span style={{ fontWeight: 900, color: 'var(--warn-dark)' }}>🔥 {stats.streak} wins</span>
                </div>
              </div>
            </div>

            {/* Pet Hunger Alert reminder */}
            <div className="card-glass" style={{ borderLeftColor: 'var(--warn)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🍖</span>
                <span style={{ fontWeight: 800, fontSize: '14px' }}>Feed your Buddy</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '16px' }}>
                Winning duels awards items like ramen treats and apples. Keep your study buddy fed to earn extra passive multipliers!
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
