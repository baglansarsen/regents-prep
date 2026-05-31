import React from 'react'

export default function BattleResultsScreen({
  results = {},
  opponent = {},
  rewardItem = null,
  onContinue,
}) {
  const isWin = results.outcome === 'win'
  const isLoss = results.outcome === 'loss'
  const isDraw = results.outcome === 'draw'

  const bannerTitle = isWin ? 'VICTORY! 🏆' : isLoss ? 'DEFEAT 😤' : 'DRAW MATCH 🤝'
  const bannerBg = isWin 
    ? 'linear-gradient(135deg, var(--purple), #a855f7)'
    : isLoss
      ? 'linear-gradient(135deg, var(--wrong), var(--wrong-dark))'
      : 'linear-gradient(135deg, var(--blue), var(--blue-dark))'

  return (
    <div className="quiz-layout" style={{ justifyContent: 'center', alignItems: 'center', overflowY: 'auto' }}>
      <div style={{
        maxWidth: '700px',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        margin: '40px auto'
      }}>
        
        {/* Banner Victory Header */}
        <div className="card-glass" style={{
          background: bannerBg,
          color: '#fff',
          border: 'none',
          textAlign: 'center',
          padding: '40px 20px',
          boxShadow: isWin ? '0 12px 30px rgba(168, 85, 247, 0.35)' : 'none'
        }}>
          <h1 style={{ fontFamily: 'var(--font-outfit)', fontSize: '36px', fontWeight: 900, letterSpacing: '1px' }}>
            {bannerTitle}
          </h1>
          <p style={{ marginTop: '8px', opacity: 0.9, fontWeight: 700 }}>
            {isWin 
              ? `You dominated the arena against ${opponent.name}!`
              : isLoss
                ? `Opponent proved too quick. Better luck next time!`
                : `A perfectly matched faceoff with same accuracy!`}
          </p>
        </div>

        {/* Scorecard breakdown comparison */}
        <div className="card-glass">
          <h3 className="card-title" style={{ justifyContent: 'center' }}>📊 Widescreen Battle Scorecard</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: '20px', alignItems: 'center', marginTop: '20px' }}>
            {/* You Column */}
            <div style={{ background: 'var(--surface-2)', padding: '20px', borderRadius: '16px', border: '1.5px solid var(--border)', textAlign: 'center' }}>
              <span style={{ fontSize: '32px' }}>🏃‍♂️</span>
              <h4 style={{ fontWeight: 800, fontSize: '16px', marginTop: '4px' }}>You</h4>
              
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Accuracy</div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--brand-dark)' }}>{results.pct}%</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Correct Items</div>
                  <div style={{ fontSize: '20px', fontWeight: 900 }}>{results.correct} / {results.total}</div>
                </div>
              </div>
            </div>

            {/* VS divider */}
            <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '22px', fontWeight: 900, color: 'var(--text-dim)', textAlign: 'center' }}>
              VS
            </div>

            {/* Opponent Column */}
            <div style={{ background: 'var(--surface-2)', padding: '20px', borderRadius: '16px', border: '1.5px solid var(--border)', textAlign: 'center' }}>
              <span style={{ fontSize: '32px' }}>{opponent.icon}</span>
              <h4 style={{ fontWeight: 800, fontSize: '16px', marginTop: '4px' }}>{opponent.name}</h4>
              
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Accuracy</div>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-muted)' }}>{Math.round((results.oppCorrect / results.total) * 100)}%</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Correct Items</div>
                  <div style={{ fontSize: '20px', fontWeight: 900 }}>{results.oppCorrect} / {results.total}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>Time Elapsed</span>
              <div style={{ fontSize: '18px', fontWeight: 900, marginTop: '2px', textAlign: 'center' }}>⏱️ {results.totalTime}s</div>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>Total XP Gained</span>
              <div style={{ fontSize: '18px', fontWeight: 900, marginTop: '2px', color: 'var(--brand-dark)', textAlign: 'center' }}>⭐ +{results.score} XP</div>
            </div>
          </div>
        </div>

        {/* Loot Reward Display if won and item rewarded */}
        {isWin && rewardItem && (
          <div className="card-glass pet-breathe" style={{
            background: 'linear-gradient(135deg, var(--brand-bg), var(--surface))',
            borderColor: 'var(--brand)',
            textAlign: 'center',
            padding: '24px'
          }}>
            <span style={{ fontSize: '40px' }}>🎁 Arena Loot Reward!</span>
            <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '18px', fontWeight: 800, marginTop: '8px' }}>
              Hooray! You found a fresh {rewardItem.name}! {rewardItem.icon}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              This item has been added directly to your pet inventory cupboard. Go feed it to feed their stats!
            </p>
          </div>
        )}

        <button onClick={onContinue} className="btn-duo btn-duo-purple" style={{ padding: '14px', fontSize: '15px' }}>
          Leave Arena & Continue
        </button>

      </div>
    </div>
  )
}
