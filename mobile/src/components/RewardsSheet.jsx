/**
 * RewardsSheet — compact contextual bottom sheet.
 *
 * Renders only the section matching `focus` so the user sees exactly
 * what they tapped without scrolling past unrelated content.
 *
 * Props:
 *   visible  boolean
 *   focus    'streak' | 'rp' | 'lives'
 *   onClose  () => void
 */
import React, { useEffect, useState } from 'react'
import {
  View, Text, Modal, TouchableOpacity,
  StyleSheet, Alert, Platform,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme }         from '../context/ThemeContext'
import { useAuthContext }   from '../context/AuthContext'
import { useDailyStreak }  from '../hooks/useDailyStreak'
import { useRP, getLevel } from '../hooks/useRP'
import { useLivesContext } from '../context/LivesContext'
import { usePowerUps }     from '../hooks/usePowerUps'
import { useDoubleRP }     from '../context/DoubleRPContext'
import { useCountdown, formatCountdown as fmt } from '../hooks/useCountdown'
import { T, duoBtn }       from '../styles/duo'
import StreakCalendar      from './StreakCalendar'

// ── Shared sheet wrapper ──────────────────────────────────────────────────────
function Sheet({ title, children, C, insets, onClose }) {
  return (
    <View style={[ss.sheet, { backgroundColor: C.bg, paddingBottom: insets.bottom + 20 }]}>
      <View style={ss.handleWrap}>
        <View style={[ss.handle, { backgroundColor: C.surface3 }]} />
      </View>
      <Text style={[ss.sheetTitle, { color: C.text }]}>{title}</Text>
      <View style={ss.body}>{children}</View>
    </View>
  )
}

// ── Power-up row (used in RP sheet) ──────────────────────────────────────────
function PowerUpRow({ item, C, onClose }) {
  return (
    <View style={[ss.powerRow, { borderColor: C.border }]}>
      <View style={[ss.powerIcon, { backgroundColor: item.accent + '22', borderColor: item.accent + '55' }]}>
        <Text style={{ fontSize: 22 }}>{item.icon}</Text>
      </View>
      <View style={ss.powerInfo}>
        <Text style={[T.small, { color: C.text, fontFamily: 'Nunito_700Bold' }]}>{item.name}</Text>
        <Text style={{ fontSize: 11, fontFamily: 'Nunito_600SemiBold', color: item.accent }}>
          ⭐ {item.cost} RP
        </Text>
      </View>
      {item.owned ? (
        <View style={[ss.ownedBadge, { backgroundColor: item.accent + '22', borderColor: item.accent + '55' }]}>
          <Text style={{ fontSize: 11, fontFamily: 'Nunito_700Bold', color: item.accent }}>
            {item.ownedLabel}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={duoBtn(
            item.canBuy ? item.accent : C.surface3,
            item.canBuy ? item.dark   : C.border,
            { paddingVertical: 8, paddingHorizontal: 14, opacity: item.canBuy ? 1 : 0.5 },
          )}
          onPress={async () => { const r = await item.onBuy(); if (r === 'success') onClose?.() }}
          disabled={!item.canBuy}
          activeOpacity={0.8}
        >
          <Text style={[T.btn, { color: '#fff', fontSize: 11 }]}>BUY</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

// ── Streak section ────────────────────────────────────────────────────────────
function StreakSection({ C, onClose }) {
  const { user } = useAuthContext()
  const { streak, freezeCount, buyFreeze, studiedDates, frozenDates, longestStreak } = useDailyStreak(user?.uid)
  const { rp, spendRP } = useRP(user?.uid)

  const atMax    = freezeCount >= 2
  const canBuy   = !atMax && rp >= 200

  async function handleBuyFreeze() {
    const result = await buyFreeze(spendRP)
    if (result === 'success') {
      Alert.alert('🧊 Freeze Added!', freezeCount + 1 >= 2
        ? 'You have 2 freezes stored — your streak is protected for 2 missed days!'
        : 'Your streak is protected for one missed day.')
      onClose?.()
    }
    else if (result === 'insufficient_xp')
      Alert.alert('Not enough RP', `You need 200 RP. You have ${rp} RP.`)
  }

  return (
    <>
      {/* Count + week dots */}
      <View style={ss.streakHeader}>
        <Text style={[T.num, { color: C.text, fontSize: 48 }]}>{streak}</Text>
        <Text style={[T.body, { color: C.textMuted }]}>day streak</Text>
      </View>

      <View style={{ marginBottom: 16 }}>
        <StreakCalendar
          studiedDates={studiedDates}
          frozenDates={frozenDates}
          streak={streak}
          longestStreak={longestStreak}
          C={C}
        />
      </View>

      {/* Freeze status */}
      {freezeCount > 0 && (
        <View style={[ss.freezeStatus, { backgroundColor: '#BAE6FD22', borderColor: '#38BDF855', marginBottom: 12 }]}>
          <Text style={[T.body, { color: '#38BDF8' }]}>
            {'🧊'.repeat(freezeCount)} {freezeCount === 2 ? '2 freezes stored' : '1 freeze stored'}
          </Text>
        </View>
      )}

      {/* Buy freeze — disabled at max (2) */}
      <View style={{ gap: 6 }}>
        <TouchableOpacity
          style={duoBtn(
            canBuy ? '#38BDF8' : C.surface3,
            canBuy ? '#0369A1' : C.border,
            { opacity: canBuy ? 1 : 0.5 },
          )}
          disabled={!canBuy}
          onPress={handleBuyFreeze}
          activeOpacity={0.8}
        >
          <Text style={[T.btn, { color: '#fff' }]}>
            {atMax ? '🧊 Max freezes stored (2/2)' : `🧊 Buy Freeze · 200 RP  (${freezeCount}/2)`}
          </Text>
        </TouchableOpacity>
        {!atMax && rp < 200 && (
          <Text style={[T.small, { color: C.textMuted, textAlign: 'center' }]}>
            Need {200 - rp} more RP to unlock
          </Text>
        )}
      </View>
    </>
  )
}

// ── RP section ────────────────────────────────────────────────────────────────
function RPSection({ C, onClose }) {
  const { user } = useAuthContext()
  const { rp } = useRP(user?.uid)
  const { items: powerItems } = usePowerUps()
  const { isActive: boostActive, timeLeft: boostTimeLeft } = useDoubleRP()
  const level = getLevel(rp)

  return (
    <>
      {/* Balance + level */}
      <View style={ss.rpHeader}>
        <Text style={[T.num, { color: C.warn, fontSize: 40 }]}>
          {rp >= 1000 ? `${(rp / 1000).toFixed(1)}k` : rp}
        </Text>
        <Text style={[T.small, { color: C.textMuted }]}> RP</Text>
        <View style={[ss.levelChip, { backgroundColor: C.surface2, borderColor: C.border }]}>
          <Text style={[T.small, { color: C.text }]}>Lv.{level.level} · {level.name}</Text>
        </View>
      </View>

      {/* Active 2× boost countdown */}
      {boostActive && (
        <View style={[ss.boostBanner, { backgroundColor: '#FEF3C722', borderColor: '#F59E0B55' }]}>
          <Text style={[T.body, { color: '#F59E0B' }]}>
            ⚡ 2× RP active · {Math.floor(boostTimeLeft / 60)}:{String(boostTimeLeft % 60).padStart(2, '0')} left
          </Text>
        </View>
      )}

      {/* Progress bar */}
      {level.next && (
        <View style={{ marginBottom: 16 }}>
          <View style={[ss.progressBg, { backgroundColor: C.surface3 }]}>
            <View style={[ss.progressFill, { backgroundColor: C.warn, width: `${Math.round(level.progress * 100)}%` }]} />
          </View>
          <Text style={[{ fontFamily: 'Nunito_600SemiBold', fontSize: 11, color: C.textMuted, marginTop: 4 }]}>
            {rp} / {level.next.min} RP to Lv.{level.level + 1}
          </Text>
        </View>
      )}

      <View style={[ss.divider, { backgroundColor: C.border }]} />

      {powerItems.map((item) => (
        <PowerUpRow key={item.key} item={item} C={C} onClose={onClose} />
      ))}
    </>
  )
}

// ── Lives section ─────────────────────────────────────────────────────────────
function LivesSection({ C, adReady, adLoading, showAd, onClose }) {
  const { user } = useAuthContext()
  const { lives, maxLives, nextRefillAt, refillLives, isSubscribed } = useLivesContext()
  const { rp, spendRP } = useRP(user?.uid)
  const secsUntilRefill = useCountdown(lives < maxLives ? nextRefillAt : null)

  async function handleRefill() {
    const ok = await refillLives(spendRP)
    if (ok) { Alert.alert('❤️ Recharged!', 'Your energy is fully restored.'); onClose?.() }
    else    Alert.alert('Not enough RP', `You need 300 RP. You have ${rp} RP.`)
  }

  if (isSubscribed) {
    return (
      <Text style={[T.h3, { color: C.text, textAlign: 'center', marginVertical: 12 }]}>
        ♾️ Unlimited energy with Premium
      </Text>
    )
  }

  return (
    <>
      {/* Hearts */}
      <Text style={ss.heartsText}>
        {'❤️'.repeat(lives)}{'🖤'.repeat(maxLives - lives)}
      </Text>

      <Text style={[T.body, { color: lives >= maxLives ? C.brand : C.textMuted, textAlign: 'center', marginBottom: 20 }]}>
        {lives >= maxLives
          ? 'Energy full!'
          : secsUntilRefill > 0
            ? `Next recharge in ${fmt(secsUntilRefill)}`
            : 'Recharging…'}
      </Text>

      {/* Refill all */}
      <TouchableOpacity
        style={duoBtn(
          lives < maxLives && rp >= 300 ? '#FF5A5F' : C.surface3,
          lives < maxLives && rp >= 300 ? '#CC0000' : C.border,
          { marginBottom: 12, opacity: (lives < maxLives && rp >= 300) ? 1 : 0.5 },
        )}
        disabled={lives >= maxLives || rp < 300}
        onPress={handleRefill}
        activeOpacity={0.8}
      >
        <Text style={[T.btn, { color: '#fff' }]}>❤️ Recharge All · 300 RP</Text>
      </TouchableOpacity>

      {/* Watch ad — always visible */}
      <TouchableOpacity
        style={duoBtn(
          adReady && lives < maxLives ? '#7C3AED' : C.surface3,
          adReady && lives < maxLives ? '#5B21B6' : C.border,
          { opacity: (adReady && lives < maxLives) ? 1 : 0.5 },
        )}
        disabled={!adReady || lives >= maxLives}
        onPress={showAd}
        activeOpacity={0.8}
      >
        <Text style={[T.btn, { color: '#fff' }]}>
          {adReady ? '▶ Watch Ad  +1 ❤️' : adLoading ? 'Ad loading…' : 'Ad unavailable'}
        </Text>
      </TouchableOpacity>
    </>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
const TITLES = {
  streak: '🔥 Streak',
  rp:     '⭐ Regents Points',
  lives:  '❤️ Energy',
}

export default function RewardsSheet({ visible, focus, onClose, adReady, adLoading, showAd }) {
  const insets = useSafeAreaInsets()
  const { C }  = useTheme()

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableOpacity style={ss.backdrop} activeOpacity={1} onPress={onClose} />

      <Sheet title={TITLES[focus] ?? ''} C={C} insets={insets} onClose={onClose}>
        {focus === 'streak' && <StreakSection C={C} onClose={onClose} />}
        {focus === 'rp'     && <RPSection C={C} onClose={onClose} />}
        {focus === 'lives'  && <LivesSection C={C} adReady={adReady} adLoading={adLoading} showAd={showAd} onClose={onClose} />}
      </Sheet>
    </Modal>
  )
}

const ss = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },

  sheet: {
    borderTopLeftRadius:  28,
    borderTopRightRadius: 28,
    ...(Platform.OS !== 'web' ? {
      shadowColor: '#000', shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: -4 }, shadowRadius: 16, elevation: 20,
    } : {}),
  },
  handleWrap:  { alignItems: 'center', paddingTop: 10, paddingBottom: 4 },
  handle:      { width: 40, height: 4, borderRadius: 2 },
  sheetTitle:  { fontFamily: 'Fredoka_600SemiBold', fontSize: 20, paddingHorizontal: 20, paddingBottom: 4 },
  body:        { paddingHorizontal: 20, paddingTop: 12, gap: 0 },

  // Streak
  streakHeader: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 16 },
  weekRow:      { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  weekDay:      { alignItems: 'center', gap: 4 },
  weekDot:      { width: 32, height: 32, borderRadius: 16 },
  weekLabel:    { fontFamily: 'Nunito_700Bold', fontSize: 11 },
  freezeStatus: { borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 12, alignItems: 'center' },

  // RP
  rpHeader:     { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  boostBanner:  { borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10, alignItems: 'center', marginBottom: 12 },
  levelChip:    { borderRadius: 12, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, marginLeft: 4 },
  progressBg:   { height: 7, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  divider:      { height: 1, marginBottom: 8 },

  // Power-up row
  powerRow:  {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 11, borderBottomWidth: StyleSheet.hairlineWidth,
  },
  powerIcon:  {
    width: 46, height: 46, borderRadius: 13, flexShrink: 0,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1.5,
  },
  powerInfo:  { flex: 1 },
  ownedBadge: { borderRadius: 10, borderWidth: 1.5, paddingHorizontal: 10, paddingVertical: 7, alignItems: 'center' },

  // Lives
  heartsText: { fontSize: 32, textAlign: 'center', marginBottom: 8, letterSpacing: 4 },
})
