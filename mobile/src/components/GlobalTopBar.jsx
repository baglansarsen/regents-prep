import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useRP } from '../hooks/useRP'
import { useLivesContext } from '../context/LivesContext'
import { SUBJECTS, SUBJECT_META } from '../content/subjects'
import { useDoubleRP } from '../context/DoubleRPContext'
import { useRewardedAd } from '../hooks/useRewardedAd'
import { T } from '../styles/duo'
import RewardsSheet from './RewardsSheet'

function useCountdown(isoStr) {
  const [secs, setSecs] = useState(() =>
    isoStr ? Math.max(0, Math.ceil((new Date(isoStr).getTime() - Date.now()) / 1000)) : 0
  )
  useEffect(() => {
    if (!isoStr) { setSecs(0); return }
    const id = setInterval(() => {
      setSecs(Math.max(0, Math.ceil((new Date(isoStr).getTime() - Date.now()) / 1000)))
    }, 1000)
    return () => clearInterval(id)
  }, [isoStr])
  return secs
}

function formatSecs(s) {
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

export default function GlobalTopBar() {
  const insets = useSafeAreaInsets()
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid

  const [dropdownOpen, setDropdownOpen] = useState(false)
  // null = closed; 'streak' | 'rp' | 'lives' = focused section
  const [sheet, setSheet] = useState(null)

  const { subject, setSubject }                          = useSubject()
  const { streak }                                       = useDailyStreak(uid)
  const { rp }                                           = useRP(uid)
  const { lives, maxLives, nextRefillAt, isSubscribed, addLife } = useLivesContext()
  const secsUntilRefill = useCountdown(lives < maxLives ? nextRefillAt : null)
  const { isActive: boostActive, timeLeft: boostTimeLeft } = useDoubleRP()
  const { ready: adReady, loading: adLoading, showAd } = useRewardedAd({ onReward: addLife })

  const subjectColor = SUBJECT_META[subject]?.color ?? '#16a34a'
  const s = makeStyles(insets.top, subjectColor)

  const activeMeta = SUBJECT_META[subject] ?? SUBJECT_META['living-environment']
  const barTop = insets.top + 48

  return (
    <View style={s.bar}>

      {/* Subject dropdown button */}
      <TouchableOpacity
        style={s.subjectBtn}
        onPress={() => setDropdownOpen(true)}
        activeOpacity={0.75}
        accessibilityLabel={`Select Subject. Current subject is ${activeMeta.name}`}
        accessibilityRole="button"
        accessibilityHint="Opens a menu to switch between subjects."
      >
        <Text style={s.subjectBtnText}>
          {activeMeta.icon} {activeMeta.shortName ?? activeMeta.name.slice(0, 2).toUpperCase()}
        </Text>
        <Text style={s.chevron}>{dropdownOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Stats */}
      <View style={s.stats}>

        {/* 🔥 Streak — taps open sheet focused on streak */}
        <TouchableOpacity
          style={s.stat}
          onPress={() => setSheet('streak')}
          activeOpacity={0.75}
          accessibilityLabel={`${streak} day study streak`}
          accessibilityRole="button"
          accessibilityHint="Tap to view streak details and buy a streak freeze."
        >
          <Text style={s.statText}>🔥 {streak}</Text>
        </TouchableOpacity>

        {/* ⭐ RP — taps open sheet focused on RP & power-ups */}
        <TouchableOpacity
          style={s.stat}
          onPress={() => setSheet('rp')}
          activeOpacity={0.75}
          accessibilityLabel={`${rp} Regents Points earned`}
          accessibilityRole="button"
          accessibilityHint={boostActive ? `Double RP boost active. Tap to view RP and shop.` : 'Tap to view RP and buy power-ups.'}
        >
          <Text style={s.statText}>
            {boostActive ? '⚡' : '⭐'} {rp >= 1000 ? `${(rp / 1000).toFixed(1)}k` : rp}
          </Text>
        </TouchableOpacity>

        {/* ❤️ Lives — taps open sheet focused on lives (unless subscribed/full) */}
        {isSubscribed ? (
          <TouchableOpacity
            style={s.stat}
            onPress={() => setSheet('lives')}
            activeOpacity={0.75}
            accessibilityLabel="Unlimited lives subscription active"
            accessibilityRole="button"
          >
            <Text style={s.statText}>♾️ ❤️</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={s.stat}
            onPress={() => setSheet('lives')}
            activeOpacity={0.8}
            accessibilityLabel={`${lives} out of ${maxLives} lives remaining`}
            accessibilityRole="button"
            accessibilityHint={lives < maxLives ? 'Tap to refill lives or watch an ad.' : 'Your lives are fully charged. Tap to view.'}
          >
            <Text style={s.statText}>
              {'❤️'.repeat(lives)}{'🖤'.repeat(maxLives - lives)}
              {lives < maxLives && secsUntilRefill > 0 ? `  ${formatSecs(secsUntilRefill)}` : ''}
            </Text>
          </TouchableOpacity>
        )}

      </View>

      {/* Subject dropdown modal */}
      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={() => setDropdownOpen(false)}>
          <View style={[s.dropdown, { top: barTop }]}>
            {Object.values(SUBJECTS).map((sub) => {
              const meta   = SUBJECT_META[sub]
              const active = subject === sub
              return (
                <TouchableOpacity
                  key={sub}
                  style={[s.dropdownItem, active && s.dropdownItemActive]}
                  onPress={() => { setSubject(sub); setDropdownOpen(false) }}
                  activeOpacity={0.7}
                >
                  <Text style={s.dropdownIcon}>{meta.icon}</Text>
                  <Text style={[s.dropdownText, active && { color: subjectColor, fontFamily: 'Nunito_800ExtraBold' }]}>
                    {meta.name}
                  </Text>
                  {active && <Text style={[s.dropdownCheck, { color: subjectColor }]}>✓</Text>}
                </TouchableOpacity>
              )
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Rewards sheet — single instance, focus prop steers which section appears first */}
      <RewardsSheet
        visible={!!sheet}
        focus={sheet}
        onClose={() => setSheet(null)}
        adReady={adReady}
        adLoading={adLoading}
        showAd={showAd}
      />

    </View>
  )
}

function makeStyles(topInset, subjectColor) {
  return StyleSheet.create({
    bar: {
      flexDirection:     'row',
      alignItems:        'center',
      justifyContent:    'space-between',
      backgroundColor:   subjectColor,
      paddingTop:        topInset + 6,
      paddingBottom:     10,
      paddingHorizontal: 14,
      height:            topInset + 48,
    },

    subjectBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: 'rgba(255,255,255,0.18)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 14,
      ...(Platform.OS === 'web' ? { backdropFilter: 'blur(16px)' } : {}),
    },
    subjectBtnText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 13, color: '#fff' },
    chevron:        { fontSize: 10, color: 'rgba(255,255,255,0.85)' },

    stats: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    stat: {
      flexDirection:  'row',
      alignItems:     'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.18)',
      borderRadius:   14,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderWidth:    1,
      borderColor:    'rgba(255,255,255,0.08)',
      ...(Platform.OS === 'web' ? { backdropFilter: 'blur(16px)' } : {}),
    },
    statText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 13, color: '#fff' },

    backdrop: { flex: 1 },
    dropdown: {
      position:        'absolute',
      left:            14,
      backgroundColor: '#fff',
      borderRadius:    14,
      paddingVertical: 6,
      minWidth:        220,
      shadowColor:     '#000',
      shadowOpacity:   0.15,
      shadowOffset:    { width: 0, height: 4 },
      shadowRadius:    12,
      elevation:       8,
    },
    dropdownItem:       { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, gap: 10 },
    dropdownItemActive: { backgroundColor: 'rgba(0,0,0,0.04)' },
    dropdownIcon:       { fontSize: 18 },
    dropdownText:       { fontFamily: 'Nunito_700Bold', fontSize: 15, color: '#1f2937', flex: 1 },
    dropdownCheck:      { fontSize: 16, fontFamily: 'Nunito_800ExtraBold' },
  })
}
