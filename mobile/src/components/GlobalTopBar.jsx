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
import { useCountdown, formatCountdown as formatSecs } from '../hooks/useCountdown'
import { useTourTarget } from '../context/TourContext'
import { T } from '../styles/duo'
import RewardsSheet from './RewardsSheet'
import SubjectSheet from './SubjectSheet'
import EnergyBattery from './EnergyBattery'

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

      {/* Subject + current-score combined into one course pill (Duolingo-style)
          → opens the subject/goal sheet */}
      <TouchableOpacity
        {...subjectTarget}
        style={s.coursePill}
        onPress={() => setSubjectSheetOpen(true)}
        activeOpacity={0.75}
        accessibilityLabel={`${activeMeta.name}${predicted != null ? `, predicted score ${predicted}` : ''}`}
        accessibilityRole="button"
        accessibilityHint="Opens a sheet to view your goal and switch subjects."
      >
        <Text style={s.subjectBtnText}>
          {activeMeta.icon} {activeMeta.shortName ?? activeMeta.name.slice(0, 2).toUpperCase()}
        </Text>
        <View style={[s.scoreChip, atGoal && s.scoreChipAtGoal]}>
          <Text style={[s.scoreChipText, atGoal && s.scoreChipTextAtGoal]}>{predicted ?? '—'}</Text>
        </View>
        <Text style={s.chevron}>{subjectSheetOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

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

        {/* Energy — taps open sheet focused on recharge state */}
        {isSubscribed ? (
          <TouchableOpacity
            {...livesTarget}
            style={s.stat}
            onPress={() => setSheet('lives')}
            activeOpacity={0.75}
            accessibilityLabel="Unlimited energy subscription active"
            accessibilityRole="button"
          >
            <EnergyBattery unlimited light size="compact" showLabel={false} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            {...livesTarget}
            style={s.stat}
            onPress={() => setSheet('lives')}
            activeOpacity={0.8}
            accessibilityLabel={`${lives} of ${maxLives} energy`}
            accessibilityRole="button"
            accessibilityHint={lives < maxLives ? 'Tap to recharge or watch an ad.' : 'Your energy is full. Tap to view.'}
          >
            <EnergyBattery lives={lives} maxLives={maxLives} light size="compact" showLabel={false} />
            {lives < maxLives && secsUntilRefill > 0 && (
              <Text style={s.statText}>{formatSecs(secsUntilRefill)}</Text>
            )}
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

    coursePill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      backgroundColor: 'rgba(255,255,255,0.18)',
      paddingLeft: 12,
      paddingRight: 9,
      paddingVertical: 5,
      borderRadius: 16,
      ...(Platform.OS === 'web' ? { backdropFilter: 'blur(16px)' } : {}),
    },
    subjectBtnText: { fontFamily: 'Fredoka_600SemiBold', fontSize: 13, color: '#fff' },
    chevron:        { fontSize: 10, color: 'rgba(255,255,255,0.85)' },

    // Inline score chip inside the course pill — light fill so the number reads
    // as a distinct value against the subject name; greens out when at goal.
    scoreChip: {
      backgroundColor: 'rgba(255,255,255,0.92)',
      minWidth: 26,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scoreChipAtGoal:     { backgroundColor: '#DCFCE7' },
    scoreChipText:       { fontFamily: 'Fredoka_600SemiBold', fontSize: 13, color: subjectColor },
    scoreChipTextAtGoal: { color: '#15803D' },

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
    statText: { fontFamily: 'Fredoka_600SemiBold', fontSize: 13, color: '#fff' },
  })
}
