import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useGoal } from '../context/GoalContext'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useRP } from '../hooks/useRP'
import { useLivesContext } from '../context/LivesContext'
import { SUBJECT_META } from '../content/subjects'
import { useDoubleRP } from '../context/DoubleRPContext'
import { useRewardedAd } from '../hooks/useRewardedAd'
import { useTourTarget } from '../context/TourContext'
import { T } from '../styles/duo'
import RewardsSheet from './RewardsSheet'
import SubjectSheet from './SubjectSheet'

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

  const [subjectSheetOpen, setSubjectSheetOpen] = useState(false)
  // null = closed; 'streak' | 'rp' | 'lives' = focused section
  const [sheet, setSheet] = useState(null)

  // Tour anchors — spread onto the top-bar controls so the guided tour can spotlight them.
  const subjectTarget = useTourTarget('subject')
  const streakTarget  = useTourTarget('streak')
  const rpTarget      = useTourTarget('rp')
  const livesTarget   = useTourTarget('lives')

  const { subject, setSubject }                          = useSubject()
  const { getGoal }                                      = useGoal()
  const { streak }                                       = useDailyStreak(uid)
  const { rp }                                           = useRP(uid)
  const { lives, maxLives, nextRefillAt, isSubscribed, addLife } = useLivesContext()
  const secsUntilRefill = useCountdown(lives < maxLives ? nextRefillAt : null)
  const { isActive: boostActive, timeLeft: boostTimeLeft } = useDoubleRP()
  const { ready: adReady, loading: adLoading, showAd } = useRewardedAd({ onReward: addLife })

  const subjectColor = SUBJECT_META[subject]?.color ?? '#16a34a'
  const s = makeStyles(insets.top, subjectColor)

  const activeMeta = SUBJECT_META[subject] ?? SUBJECT_META['living-environment']

  // Current predicted score for the badge — read the persisted anchor from the
  // goal (Home computes it via usePredictedScore and writes it here). Null when
  // no goal/prediction yet → show a dash.
  const subjectGoal = getGoal(subject)
  const predicted   = subjectGoal?.predicted?.value ?? null
  const atGoal      = predicted != null && subjectGoal?.target != null && predicted >= subjectGoal.target

  return (
    <View style={s.bar}>

      {/* Subject + current-score → opens the subject/goal sheet */}
      <View style={s.subjectGroup} {...subjectTarget}>
        <TouchableOpacity
          style={s.subjectBtn}
          onPress={() => setSubjectSheetOpen(true)}
          activeOpacity={0.75}
          accessibilityLabel={`Select Subject. Current subject is ${activeMeta.name}`}
          accessibilityRole="button"
          accessibilityHint="Opens a sheet to view your goal and switch subjects."
        >
          <Text style={s.subjectBtnText}>
            {activeMeta.icon} {activeMeta.shortName ?? activeMeta.name.slice(0, 2).toUpperCase()}
          </Text>
          <Text style={s.chevron}>{subjectSheetOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {/* Current predicted score badge */}
        <TouchableOpacity
          style={[s.scoreBadge, atGoal && s.scoreBadgeAtGoal]}
          onPress={() => setSubjectSheetOpen(true)}
          activeOpacity={0.75}
          accessibilityLabel={predicted != null ? `Predicted score ${predicted}` : 'No predicted score yet'}
          accessibilityRole="button"
          accessibilityHint="Opens your goal and subject switcher."
        >
          <Text style={s.scoreBadgeText}>🎯 {predicted ?? '—'}</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={s.stats}>

        {/* 🔥 Streak — taps open sheet focused on streak */}
        <TouchableOpacity
          {...streakTarget}
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
          {...rpTarget}
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
            {...livesTarget}
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
            {...livesTarget}
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

      {/* Subject + goal sheet */}
      <SubjectSheet
        visible={subjectSheetOpen}
        onClose={() => setSubjectSheetOpen(false)}
        subject={subject}
        setSubject={setSubject}
        goal={subjectGoal}
        predicted={predicted}
      />

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

    subjectGroup: { flexDirection: 'row', alignItems: 'center', gap: 6 },
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

    scoreBadge: {
      backgroundColor: 'rgba(255,255,255,0.92)',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.5)',
      ...(Platform.OS === 'web' ? { backdropFilter: 'blur(16px)' } : {}),
    },
    scoreBadgeAtGoal: { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' },
    scoreBadgeText:   { fontFamily: 'Nunito_800ExtraBold', fontSize: 13, color: subjectColor },

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
  })
}
