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
import { FREEZE_COST }      from '../context/StreakContext'

function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function usePowerUps() {
  const { user }                                         = useAuthContext()
  const uid                                              = user?.uid
  const { rp, spendRP }                                  = useRP(uid)
  const { freezeCount, buyFreeze }                       = useDailyStreak(uid)
  const { lives, maxLives, refillLives }                 = useLivesContext()
  const { isActive, timeLeft, activateBoost, COST_RP }   = useDoubleRP()
  const { isSubscribed }                                 = useSubscription()

  // Each handler returns 'success' when the purchase went through, so callers
  // (e.g. the RewardsSheet) can auto-close after a successful buy.
  async function handleBuyBoost() {
    if (isActive) return 'already_active'
    const result = await activateBoost(spendRP)
    if (result === 'success')
      Alert.alert('⚡ Boost Active!', 'All RP earned in the next 10 minutes is doubled!')
    else if (result === 'insufficient_rp')
      Alert.alert('Not enough RP', `You need ${COST_RP} RP. You have ${rp} RP.`)
    else if (result === 'already_active')
      Alert.alert('Boost already running!', `${formatTime(timeLeft)} remaining.`)
    return result
  }

  async function handleBuyFreeze() {
    if (freezeCount >= 2) return 'already_have'
    const result = await buyFreeze(spendRP)
    if (result === 'success')
      Alert.alert('🧊 Freeze Added!', freezeCount + 1 >= 2
        ? 'You have 2 freezes stored. Each one saves your streak if you miss a day and open the app.'
        : 'Your streak is protected for one missed day.')
    else if (result === 'insufficient_xp')
      Alert.alert('Not enough RP', `You need ${FREEZE_COST} RP. You have ${rp} RP.`)
    return result
  }

  async function handleRefillLives() {
    if (lives >= maxLives) return 'already_full'
    const ok = await refillLives(spendRP)
    if (ok) Alert.alert('Energy recharged!', 'Your battery is back to 100%.')
    else    Alert.alert('Not enough RP', `You need 300 RP. You have ${rp} RP.`)
    return ok ? 'success' : 'insufficient_rp'
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
      cost:       FREEZE_COST,
      accent:     '#38BDF8',
      dark:       '#0369A1',
      owned:      freezeCount >= 2,
      ownedLabel: freezeCount === 2 ? '🧊🧊 Full (2/2)' : `🧊 ${freezeCount}/2`,
      canBuy:     freezeCount < 2 && rp >= FREEZE_COST,
      onBuy:      handleBuyFreeze,
    },
    {
      key:        'lives',
      icon:       '🔋',
      name:       'Refill Energy',
      desc:       isSubscribed ? 'You have unlimited energy with Premium!' : `Instantly recharge to 100% (${maxLives}/${maxLives}).`,
      cost:       300,
      accent:     '#FF5A5F',
      dark:       '#CC0000',
      owned:      isSubscribed || lives >= maxLives,
      ownedLabel: isSubscribed ? '♾️ Unlimited' : '🔋 100%',
      canBuy:     !isSubscribed && lives < maxLives && rp >= 300,
      onBuy:      handleRefillLives,
    },
  ]

  return { items, rp, spendRP }
}
