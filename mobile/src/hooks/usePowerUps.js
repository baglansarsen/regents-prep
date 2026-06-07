/**
 * usePowerUps — single source of truth for the three RP power-up items.
 *
 * Consumed by both RewardsSheet (top-bar popup) and ShopScreen (Profile tab)
 * so prices, owned-states, and buy handlers never drift between the two.
 *
 * Returns { items, rp } where each item has:
 *   { key, icon, name, desc, cost, accent, dark, owned, ownedLabel, canBuy, onBuy }
 */
import { Alert } from 'react-native'
import { useAuthContext }   from '../context/AuthContext'
import { useRP }            from './useRP'
import { useDailyStreak }   from './useDailyStreak'
import { useLivesContext }  from '../context/LivesContext'
import { useDoubleRP }      from '../context/DoubleRPContext'
import { useSubscription }  from '../context/SubscriptionContext'

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function usePowerUps() {
  const { user }                                         = useAuthContext()
  const uid                                              = user?.uid
  const { rp, spendRP }                                  = useRP(uid)
  const { hasFreeze, buyFreeze }                         = useDailyStreak(uid)
  const { lives, maxLives, refillLives }                 = useLivesContext()
  const { isActive, timeLeft, activateBoost, COST_RP }   = useDoubleRP()
  const { isSubscribed }                                 = useSubscription()

  async function handleBuyBoost() {
    if (isActive) return
    const result = await activateBoost(spendRP)
    if (result === 'success')
      Alert.alert('⚡ Boost Active!', 'All RP earned in the next 10 minutes is doubled!')
    else if (result === 'insufficient_rp')
      Alert.alert('Not enough RP', `You need ${COST_RP} RP. You have ${rp} RP.`)
    else if (result === 'already_active')
      Alert.alert('Boost already running!', `${formatTime(timeLeft)} remaining.`)
  }

  async function handleBuyFreeze() {
    if (hasFreeze) return
    const result = await buyFreeze(spendRP)
    if (result === 'success')
      Alert.alert('🧊 Freeze Activated!', 'Your streak is protected for one missed day.')
    else if (result === 'insufficient_xp')
      Alert.alert('Not enough RP', `You need 200 RP. You have ${rp} RP.`)
  }

  async function handleRefillLives() {
    if (lives >= maxLives) return
    const ok = await refillLives(spendRP)
    if (ok) Alert.alert('❤️ Lives Refilled!', 'All 5 lives restored.')
    else    Alert.alert('Not enough RP', `You need 300 RP. You have ${rp} RP.`)
  }

  const items = [
    {
      key:        'boost',
      icon:       '⚡',
      name:       '2× RP Boost',
      desc:       'Double all RP earned on correct answers for 10 minutes.',
      cost:       COST_RP,
      accent:     '#F59E0B',
      dark:       '#B45309',
      owned:      isActive,
      ownedLabel: `⏱ ${formatTime(timeLeft)} left`,
      canBuy:     !isActive && rp >= COST_RP,
      onBuy:      handleBuyBoost,
    },
    {
      key:        'freeze',
      icon:       '🧊',
      name:       'Streak Freeze',
      desc:       'Protect your streak for one missed day. Used automatically.',
      cost:       200,
      accent:     '#38BDF8',
      dark:       '#0369A1',
      owned:      hasFreeze,
      ownedLabel: '✓ Protected',
      canBuy:     !hasFreeze && rp >= 200,
      onBuy:      handleBuyFreeze,
    },
    {
      key:        'lives',
      icon:       '❤️',
      name:       'Refill Hearts',
      desc:       isSubscribed ? 'You have unlimited hearts with Premium!' : `Instantly restore all ${maxLives} lives.`,
      cost:       300,
      accent:     '#FF4B4B',
      dark:       '#CC0000',
      owned:      isSubscribed || lives >= maxLives,
      ownedLabel: isSubscribed ? '♾️ Unlimited' : '❤️ Full',
      canBuy:     !isSubscribed && lives < maxLives && rp >= 300,
      onBuy:      handleRefillLives,
    },
  ]

  return { items, rp, spendRP }
}
