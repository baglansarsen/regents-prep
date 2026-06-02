import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { SUBJECT_META } from '@content/subjects'
import { FOOD_ITEMS, HAPPINESS_ITEMS, STAGE_NAMES } from '@content/petConfig'
import { useLessonProgress } from '../hooks/useLessonProgress'
import { useUnlocks } from '../hooks/useUnlocks'

export default function HomeScreen({
  user,
  subject,
  setSubject,
  subjectData,
  history,
  streak,
  studiedToday,
  weekDays,
  xp,
  level,
  hasFreeze,
  buyFreeze,
  pet,
  inventory,
  feedPet,
  playWithPet,
  drinkPotion,
  addInventory,
  earnXP,
  getTodayQuest,
  updateQuestProgress,
  petPet,
  dailyDig,
  activeReaction,
  activeFloatMessage,
  getPetMessage,
  onStartLesson,
  onStartChallenge,
  onStartPlacementTest,
  mistakeCount,
  setScreen,
}) {
  const units = subjectData.UNITS || []
  const { TOPIC_ORDER = [] } = subjectData
  const subjectHistory = useMemo(
    () => history.filter((h) => (h.subject ?? 'living-environment') === subject),
    [history, subject]
  )
  const { lessonComplete, unitLessonsCompleted, unitComplete } = useLessonProgress(subjectHistory)
  const { isUnlocked, unlockHint } = useUnlocks(subjectHistory, TOPIC_ORDER, subject)
  
  const [digReward, setDigReward] = useState(null)
  const [petMsg, setPetMsg] = useState('Welcome back! Ready to study today? 🎓')
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [dailyGoal, setDailyGoal] = useState(() => Number(localStorage.getItem('@dailyGoal') || '50'))

  // Daily Quests state
  const [dailyQuest, setDailyQuest] = useState(null)
  const [questClaimed, setQuestClaimed] = useState(false)
  const [showQuestCelebration, setShowQuestCelebration] = useState(false)
  const [questLootReward, setQuestLootReward] = useState(null)

  const loadQuest = useCallback(async () => {
    if (getTodayQuest) {
      const q = await getTodayQuest()
      setDailyQuest(q)
      const todayStr = new Date().toISOString().slice(0, 10)
      const claimed = localStorage.getItem(`@questClaimed_${todayStr}`) === 'true'
      setQuestClaimed(claimed)
    }
  }, [getTodayQuest])

  useEffect(() => {
    loadQuest()
  }, [loadQuest, history])

  async function handleClaimQuest() {
    if (!dailyQuest || questClaimed || dailyQuest.progress < dailyQuest.goal) return

    // Mark as claimed
    const todayStr = new Date().toISOString().slice(0, 10)
    localStorage.setItem(`@questClaimed_${todayStr}`, 'true')
    setQuestClaimed(true)

    // Earn 125 XP
    await earnXP(125)

    // Roll a consumable treat or boost drop!
    const drops = [
      { id: 'ramen', name: 'Ramen Bowl', icon: '🍜' },
      { id: 'toyBall', name: 'Toy Ball', icon: '⚽' },
      { id: 'apple', name: 'Crunchy Apple', icon: '🍎' },
      { id: 'xpPotion', name: 'XP Potion', icon: '🧪' }
    ]
    const rolled = drops[Math.floor(Math.random() * drops.length)]
    await addInventory(rolled.id, 1)

    setQuestLootReward(rolled)
    setShowQuestCelebration(true)
    setTimeout(() => {
      setShowQuestCelebration(false)
      setQuestLootReward(null)
    }, 4500)

    // Reload quest state
    loadQuest()
  }

  // Refresh pet greeting
  useEffect(() => {
    if (pet.chosen) {
      const msg = getPetMessage({ streak, daysSince: 1 })
      if (msg) setPetMsg(msg)
    }
  }, [pet.chosen, streak, getPetMessage])

  const earnedTodayXP = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    return history
      .filter((h) => h.timestamp && h.timestamp.slice(0, 10) === today)
      .reduce((sum, h) => sum + (h.score || 0), 0)
  }, [history])

  const goalProgress = Math.min(100, Math.round((earnedTodayXP / dailyGoal) * 100))

  async function handleDig() {
    const res = await dailyDig()
    if (res.ok) {
      if (res.type === 'xp') {
        setDigReward(`Found +${res.amount} XP! ⭐`)
      } else {
        const item = FOOD_ITEMS.find(f => f.id === res.itemId)
        setDigReward(`Found a fresh ${item?.name ?? 'item'}! ${item?.icon ?? '🍎'}`)
      }
      setTimeout(() => setDigReward(null), 3000)
    } else {
      setDigReward('Already dug today! Come back tomorrow. 🦫')
      setTimeout(() => setDigReward(null), 2500)
    }
  }

  async function handlePetTap() {
    const res = await petPet()
    if (res.ok) {
      setPetMsg('Hehehe that tickles! 💗')
      setTimeout(() => {
        const msg = getPetMessage({ streak, daysSince: 1 })
        if (msg) setPetMsg(msg)
      }, 3000)
    } else {
      setPetMsg('I am feeling so loved and full of energy! Let\'s go study! 🌟')
    }
  }

  // Dismiss announcement local state
  const [announcementDismissed, setAnnouncementDismissed] = useState(false)
  const teacherAnn = localStorage.getItem('@teacher_announcement')

  return (
    <div className="screen-container">
      <div className="dashboard-grid">
        {/* Left Column: Study Path */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Mr. SeN's Bulletin Board Announcement */}
          {teacherAnn && !announcementDismissed && (
            <div className="teacher-announcement-card">
              <div className="teacher-announcement-avatar">👨‍🏫</div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '16px', color: 'var(--purple-dark)' }}>
                    Mr. SeN's Bulletin Board
                  </h4>
                  <button 
                    onClick={() => setAnnouncementDismissed(true)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', opacity: 0.6 }}
                  >
                    ✕
                  </button>
                </div>
                <p style={{ fontSize: '13px', marginTop: '6px', lineHeight: '18px', fontWeight: 700 }}>
                  "{teacherAnn}"
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <span className="pet-stage" style={{ fontSize: '10px', padding: '2px 6px', background: 'var(--purple-bg)', color: 'var(--purple-dark)' }}>
                    Priority message
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Daily Streak Shield Warning Banner */}
          {!studiedToday && streak > 0 && (
            <div className="streak-warning-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '32px', animation: 'float 1s infinite alternate' }}>🔥</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '15px', color: 'var(--warn-dark)' }}>
                    Streak Alert: Keep the fire burning!
                  </h4>
                  <p style={{ fontSize: '12px', opacity: 0.85, marginTop: '2px' }}>
                    {hasFreeze ? (
                      <span>❄️ You have a <strong>Streak Freeze</strong> equipped, but studying today keeps your momentum going!</span>
                    ) : (
                      <span>⚠️ Your <strong>{streak}-day study streak</strong> is in danger! Complete a quiz now to save it.</span>
                    )}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setScreen('mistakes')}
                className="btn-duo-outline"
                style={{ 
                  padding: '6px 12px', 
                  fontSize: '11px', 
                  borderColor: 'var(--warn-dark)', 
                  color: 'var(--warn-dark)',
                  background: 'transparent'
                }}
              >
                Practice mistakes
              </button>
            </div>
          )}

          {/* Diagnostic Placement Test Alert if new user */}
          {history.length === 0 && (
            <div className="card-glass" style={{
              background: 'linear-gradient(135deg, var(--blue-dark), var(--purple-dark))',
              color: '#fff',
              border: 'none',
              boxShadow: '0 8px 24px rgba(28, 176, 246, 0.25)'
            }}>
              <h2 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '22px' }}>🎯 Quick Diagnosis Quiz</h2>
              <p style={{ marginTop: '8px', fontSize: '15px', opacity: 0.9, lineHeight: '22px' }}>
                Unsure where to start? Take our 5-question baseline Diagnostic Test to see which concepts you already master and instantly skip introductory levels!
              </p>
              <button
                className="btn-duo btn-duo-blue"
                style={{ marginTop: '16px', background: '#fff', color: 'var(--blue-dark)', borderBottomColor: '#cbd5e1' }}
                onClick={onStartPlacementTest}
              >
                Start Diagnostic baseline
              </button>
            </div>
          )}

          <div className="roadmap-container">
            <h1 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 900, fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>🚀</span> Study units
            </h1>

            {units.map((unit, unitIdx) => {
              const locked = !isUnlocked(unit.topic)
              const completedLessons = unitLessonsCompleted(unit.topic, unit.lessonCount)
              const totalLessons = unit.lessonCount
              const isUnitDone = unitComplete(unit.topic, unit.lessonCount)
              const activeColor = unit.color || 'var(--brand)'
              const progressPct = Math.round((completedLessons / totalLessons) * 100)

              return (
                <div key={unit.id || unitIdx} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Unit Banner */}
                  <div className={`unit-banner ${locked ? 'locked' : ''}`} style={{
                    background: locked
                      ? 'linear-gradient(135deg, var(--surface-3), var(--surface-2))'
                      : `linear-gradient(135deg, ${activeColor}, ${unit.darkColor || 'var(--brand-dark)'})`
                  }}>
                    <div className="unit-icon">{locked ? '🔒' : unit.icon || '🔬'}</div>
                    <div className="unit-info" style={{ flexGrow: 1 }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', opacity: 0.8, letterSpacing: '1px' }}>
                        Unit {unitIdx + 1}
                      </span>
                      <h2>{unit.title}</h2>
                      <p>{locked ? unlockHint(unit.topic) || 'Complete previous unit to unlock' : `${completedLessons}/${totalLessons} lessons finished · ${progressPct}% completed`}</p>
                      
                      {!locked && (
                        <div className="unit-progress-bar">
                          <div className="unit-progress-fill" style={{ width: `${progressPct}%` }} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lesson Nodes Grid */}
                  {!locked && (
                    <div className="lessons-grid">
                      {Array.from({ length: totalLessons }, (_, lessonIdx) => {
                        const isDone = lessonComplete(unit.topic, lessonIdx)
                        const isNext = completedLessons === lessonIdx

                        return (
                          <button
                            key={lessonIdx}
                            onClick={() => onStartLesson(unit.topic, lessonIdx, totalLessons)}
                            className={`lesson-node ${isDone ? 'completed' : ''}`}
                            style={{
                              borderColor: isDone ? 'var(--brand-dark)' : isNext ? activeColor : 'var(--border)',
                              boxShadow: isDone
                                ? '0 6px 0 var(--brand-dark)'
                                : isNext
                                  ? `0 6px 0 ${activeColor}`
                                  : '0 6px 0 var(--border)',
                              background: isDone
                                ? 'var(--brand)'
                                : isNext
                                  ? 'var(--surface-2)'
                                  : 'var(--surface)',
                              color: isDone ? '#fff' : 'var(--text)'
                            }}
                            title={`Lesson ${lessonIdx + 1}`}
                          >
                            <span className="node-icon">{isDone ? '✅' : unit.icon || '🔬'}</span>
                            <span className="node-label">L{lessonIdx + 1}</span>
                          </button>
                        )
                      })}

                      {/* Final Challenge Node */}
                      <button
                        onClick={() => onStartChallenge(unit.topic, totalLessons)}
                        className={`lesson-node challenge ${isUnitDone ? 'completed' : ''}`}
                        disabled={completedLessons < totalLessons}
                        style={{
                          opacity: completedLessons < totalLessons ? 0.4 : 1,
                          cursor: completedLessons < totalLessons ? 'not-allowed' : 'pointer',
                          borderColor: isUnitDone ? 'var(--brand-dark)' : 'var(--purple-dark)',
                          boxShadow: isUnitDone ? '0 6px 0 var(--brand-dark)' : '0 6px 0 var(--purple-dark)',
                          background: isUnitDone ? 'var(--brand)' : 'var(--purple)',
                        }}
                        title="Unit Challenge"
                      >
                        <span className="node-icon">{isUnitDone ? '🏆' : '👑'}</span>
                        <span className="node-label">CHALLENGE</span>
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Sidebar Stats & Pet widget */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '96px' }}>
          
          {/* Daily Goal Card */}
          <div className="card-glass">
            <h3 className="card-title">🎯 Daily Study Goal</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: `conic-gradient(var(--brand) ${goalProgress * 3.6}deg, var(--surface-3) 0deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 900,
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(88,204,2,0.15)'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {goalProgress}%
                </div>
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '15px' }}>{earnedTodayXP} / {dailyGoal} XP today</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {goalProgress >= 100 ? 'Goal met! Keep pushing! 🎉' : 'Study lessons to meet your goal.'}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Quest blackboard Card */}
          {dailyQuest && (
            <div className="card-glass" style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              border: '2px solid var(--border)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Blackboard decorative frame Accent */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '4px',
                background: 'linear-gradient(90deg, #b45309, #d97706, #b45309)'
              }} />
              
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f8fafc', fontSize: '16px' }}>
                <span>📝</span> Today's Quest
              </h3>

              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{dailyQuest.icon || '🎯'}</span>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: '#f1f5f9' }}>
                      {dailyQuest.label}
                    </div>
                    
                    {/* Progress details */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)' }}>
                        Progress: {Math.min(dailyQuest.progress, dailyQuest.goal)} / {dailyQuest.goal}
                      </span>
                      {dailyQuest.progress >= dailyQuest.goal && (
                        <span style={{ color: 'var(--brand)', fontWeight: 900, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ✅ Ready
                        </span>
                      )}
                    </div>
                    
                    {/* Linear Progress Bar */}
                    <div className="unit-progress-bar" style={{ height: '8px', marginTop: '6px', background: '#334155' }}>
                      <div className="unit-progress-fill" style={{
                        width: `${Math.min(100, (dailyQuest.progress / dailyQuest.goal) * 100)}%`,
                        background: 'linear-gradient(90deg, var(--brand), #a855f7)'
                      }} />
                    </div>
                  </div>
                </div>

                {/* Claim Button Area */}
                {dailyQuest.progress >= dailyQuest.goal ? (
                  questClaimed ? (
                    <div style={{
                      marginTop: '14px',
                      backgroundColor: 'rgba(88, 204, 2, 0.1)',
                      border: '1.5px solid rgba(88, 204, 2, 0.3)',
                      color: 'var(--brand-dark)',
                      borderRadius: '8px',
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: 800,
                      textAlign: 'center'
                    }}>
                      🎉 Quest Reward Claimed! Come back tomorrow!
                    </div>
                  ) : (
                    <button
                      className="btn-duo btn-duo-purple"
                      style={{
                        width: '100%',
                        marginTop: '14px',
                        padding: '10px',
                        fontSize: '13px',
                        animation: 'pulse 1s infinite',
                        borderBottomWidth: '3.5px'
                      }}
                      onClick={handleClaimQuest}
                    >
                      🎁 Claim +125 XP & Potion/Treat Loot!
                    </button>
                  )
                ) : (
                  <div style={{
                    marginTop: '12px',
                    fontSize: '11px',
                    color: 'var(--text-dim)',
                    textAlign: 'center',
                    borderTop: '1px solid #334155',
                    paddingTop: '8px'
                  }}>
                    Reward: ⭐ 125 XP & 1 Consumable Drop (Snack/Potion)
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Active Pet Sanctuary */}
          {pet.chosen ? (
            <div className="card-glass pet-breathe">
              <h3 className="card-title" style={{ justifyContent: 'space-between' }}>
                <span>🦫 Pet sanctuary</span>
                <span className="pet-stage">{STAGE_NAMES[pet.stage]}</span>
              </h3>
              
              <div className="pet-widget">
                <div className="pet-sprite-container" onClick={handlePetTap} style={{ cursor: 'pointer' }}>
                  {activeReaction && (
                    <div style={{
                      position: 'absolute',
                      top: '-16px',
                      fontSize: '32px',
                      animation: 'float 1s ease infinite'
                    }}>
                      {activeReaction === 'cheer' ? '🎉' : activeReaction === 'happy_dance' ? '🕺' : '💖'}
                    </div>
                  )}
                  {activeFloatMessage && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '-24px',
                      background: 'var(--surface-2)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      fontWeight: 800,
                      boxShadow: '0 4px 8px var(--shadow)'
                    }}>
                      {activeFloatMessage}
                    </div>
                  )}
                  <span className="pet-sprite">
                    {pet.petType === 'axolotl' ? '🦎' : pet.petType === 'fox' ? '🦊' : pet.petType === 'capybara' ? '🦫' : pet.petType === 'bear' ? '🐻' : pet.petType === 'bunny' ? '🐰' : '🐱'}
                  </span>
                  
                  {/* Cosmetic hats if equipped */}
                  {pet.accessories?.includes('graduationCap') && <span className="pet-accessory">🎓</span>}
                  {pet.accessories?.includes('wizardHat') && <span className="pet-accessory">🧙</span>}
                  {pet.accessories?.includes('cowboyHat') && <span className="pet-accessory">🤠</span>}
                  {pet.accessories?.includes('crown') && <span className="pet-accessory">👑</span>}
                  {pet.accessories?.includes('sunglasses') && <span style={{ position: 'absolute', top: '24px', fontSize: '24px' }}>🕶️</span>}
                  {pet.accessories?.includes('tinyBackpack') && <span style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '24px' }}>🎒</span>}
                  {pet.accessories?.includes('glowAura') && <span style={{ position: 'absolute', inset: 0, fontSize: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 1.5s infinite', opacity: 0.3 }}>✨</span>}
                </div>

                <div className="pet-name">{pet.name || 'Mochi'}</div>
                
                <div className="pet-speech-bubble">
                  "{petMsg}"
                </div>

                <div className="pet-stats">
                  <div className="pet-stat-row">
                    <span className="pet-stat-icon">🍖</span>
                    <div className="pet-progress-outer">
                      <div className="pet-progress-inner hunger" style={{ width: `${pet.hunger}%` }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800 }}>{Math.round(pet.hunger)}%</span>
                  </div>

                  <div className="pet-stat-row">
                    <span className="pet-stat-icon">❤️</span>
                    <div className="pet-progress-outer">
                      <div className="pet-progress-inner happiness" style={{ width: `${pet.happiness}%` }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800 }}>{Math.round(pet.happiness)}%</span>
                  </div>
                </div>

                <div className="pet-interaction-buttons" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <button
                    className="btn-duo-outline"
                    style={{ padding: '8px 4px', fontSize: '11px', borderBottomWidth: '2.5px' }}
                    onClick={() => feedPet(inventory['ramen'] > 0 ? 'ramen' : 'apple')}
                    disabled={(inventory['ramen'] ?? 0) <= 0 && (inventory['apple'] ?? 0) <= 0}
                  >
                    🍎 Feed ({(inventory['ramen'] ?? 0) + (inventory['apple'] ?? 0)})
                  </button>

                  <button
                    className="btn-duo-outline"
                    style={{ padding: '8px 4px', fontSize: '11px', borderBottomWidth: '2.5px' }}
                    onClick={() => playWithPet('toyBall')}
                    disabled={(inventory['toyBall'] ?? 0) <= 0}
                  >
                    ⚽ Play ({(inventory['toyBall'] ?? 0)})
                  </button>

                  <button
                    className="btn-duo-outline"
                    style={{ padding: '8px 4px', fontSize: '11px', borderBottomWidth: '2.5px' }}
                    onClick={() => drinkPotion('xpPotion')}
                    disabled={(inventory['xpPotion'] ?? 0) <= 0}
                  >
                    🧪 Boost ({(inventory['xpPotion'] ?? 0)})
                  </button>

                  <button
                    className="btn-duo btn-duo-purple"
                    style={{ gridColumn: 'span 3', padding: '10px', fontSize: '13px', borderBottomWidth: '3px' }}
                    onClick={handleDig}
                  >
                    ⛏️ Send Buddy Digging
                  </button>
                  
                  {digReward && (
                    <div style={{
                      gridColumn: 'span 2',
                      backgroundColor: 'var(--brand-bg)',
                      color: 'var(--brand-dark)',
                      border: '1.5px solid var(--brand)',
                      borderRadius: '8px',
                      padding: '6px',
                      fontSize: '12px',
                      fontWeight: 800,
                      marginTop: '4px'
                    }}>
                      {digReward}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="card-glass" style={{ textAlign: 'center', padding: '32px' }}>
              <span style={{ fontSize: '48px' }}>🥚</span>
              <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '18px', marginTop: '12px' }}>Hatch Study Buddy</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '18px' }}>
                Hatch an interactive pet that responds to your studying consistency, eats meals, and goes digging for real XP rewards!
              </p>
              <button
                className="btn-duo btn-duo-purple"
                style={{ marginTop: '16px', padding: '10px 20px', fontSize: '13px' }}
                onClick={() => setScreen('petPicker')}
              >
                Choose Buddy Egg
              </button>
            </div>
          )}

          {/* Mistakes Banner Alert */}
          {mistakeCount > 0 && (
            <div className="card-glass" style={{ borderLeftColor: 'var(--wrong)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--wrong)', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📕</span> Review Mistakes
                </span>
                <span style={{ background: 'var(--wrong-bg)', color: 'var(--wrong-dark)', padding: '2px 8px', borderRadius: '8px', fontWeight: 800, fontSize: '11px' }}>
                  {mistakeCount} wrong
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                You have collected {mistakeCount} wrong answers during your studying. Review them in a custom mistake quiz to earn back hearts!
              </p>
              <button
                className="btn-duo btn-duo-wrong"
                style={{ padding: '8px 12px', fontSize: '12px', marginTop: '4px' }}
                onClick={() => setScreen('mistakes')}
              >
                Review Mistakes Now
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quest Celebration Overlay */}
      {showQuestCelebration && questLootReward && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fade-in 0.3s ease-out'
        }}>
          <div className="card-glass" style={{
            maxWidth: '450px',
            width: '90%',
            textAlign: 'center',
            padding: '36px',
            background: 'linear-gradient(135deg, #1e1b4b, #111827)',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
            border: '2px solid var(--purple)',
            animation: 'scale-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <span style={{ fontSize: '72px', animation: 'float 2s infinite' }}>🏆</span>
            
            <h2 style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 900,
              fontSize: '28px',
              color: '#fff',
              marginTop: '16px'
            }}>
              Quest Completed!
            </h2>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
              Awesome job finishing today's studying objective! Here is your reward:
            </p>

            {/* Reward Badges */}
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              marginTop: '20px',
              marginBottom: '20px'
            }}>
              {/* XP Badge */}
              <div style={{
                background: 'rgba(234, 179, 8, 0.15)',
                border: '2px solid var(--warn)',
                borderRadius: '12px',
                padding: '12px 18px',
                textAlign: 'center',
                minWidth: '100px'
              }}>
                <div style={{ fontSize: '28px' }}>⭐</div>
                <div style={{ fontWeight: 900, fontSize: '18px', color: '#fff', marginTop: '4px' }}>+125</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', marginTop: '2px' }}>XP</div>
              </div>

              {/* Loot Badge */}
              <div style={{
                background: 'rgba(168, 85, 247, 0.15)',
                border: '2px solid var(--purple)',
                borderRadius: '12px',
                padding: '12px 18px',
                textAlign: 'center',
                minWidth: '100px'
              }}>
                <div style={{ fontSize: '28px' }}>{questLootReward.icon}</div>
                <div style={{ fontWeight: 900, fontSize: '16px', color: '#fff', marginTop: '4px' }}>+1 Qty</div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', marginTop: '2px' }}>{questLootReward.name}</div>
              </div>
            </div>

            <button
              className="btn-duo btn-duo-purple"
              style={{ width: '100%', padding: '12px', fontSize: '14px' }}
              onClick={() => setShowQuestCelebration(false)}
            >
              Hooray! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
