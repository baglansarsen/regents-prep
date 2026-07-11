import React, { useState, useMemo, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useGoal } from '../context/GoalContext'
import { useProgress } from '../hooks/useProgress'
import { usePredictedScore } from '../hooks/usePredictedScore'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useNotifications } from '../hooks/useNotifications'
import { GOAL_TIERS } from '../data/goalConfig'
import { SUBJECT_META } from '../content/subjects'
import { subjectData } from '../content/subjectData'
import { getUpcomingExamSessions, daysUntil } from '../utils/examDates'
import GoalShareSheet from '../components/GoalShareSheet'
import RescuePlanSheet from '../components/RescuePlanSheet'
import { T, duoBtn, cardShadow } from '../styles/duo'
import { logEvent } from '../utils/analytics'

/**
 * GoalSetupScreen — pick a target tier for the active subject's next Regents
 * sitting, commit, and (optionally) share the commitment card.
 */
export default function GoalSetupScreen({ navigation }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { subject } = useSubject()
  const { getGoal, commitGoal, setRescuePlan } = useGoal()
  const { history } = useProgress(uid)
  const { streak } = useDailyStreak(uid)
  const { enabled: notifEnabled, enable: enableNotifs } = useNotifications(streak)

  const sd    = subjectData(subject)
  const meta  = SUBJECT_META[subject] ?? { name: 'Regents', icon: '🎓' }
  const subjectHistory = useMemo(
    () => history.filter((h) => (h.subject ?? 'living-environment') === subject),
    [history, subject],
  )
  const { rawPredicted, coldStart } = usePredictedScore(subject, sd.UNITS ?? [], subjectHistory)

  const existing = getGoal(subject)
  const [target, setTarget] = useState(existing?.target ?? 65)
  const [showShare,  setShowShare]  = useState(false)
  const [showRescue, setShowRescue] = useState(false)
  const [committed,  setCommitted]  = useState(null)   // entry returned by commitGoal

  // Valid upcoming sessions the student can target for this subject (Jan/Jun/Aug
  // filtered to what this subject is actually offered in).
  const sessions = useMemo(() => getUpcomingExamSessions(subject), [subject])
  // Pre-select the existing goal's session if it's still upcoming, else the soonest.
  const [examDateStr, setExamDateStr] = useState(
    () => (sessions.find((sn) => sn.dateStr === existing?.examDateStr)?.dateStr) ?? sessions[0]?.dateStr,
  )
  // If the subject (and thus the valid sessions) changes while mounted, keep the
  // selection valid — snap to the soonest session when the current pick drops out.
  useEffect(() => {
    if (!sessions.some((sn) => sn.dateStr === examDateStr)) {
      setExamDateStr(sessions[0]?.dateStr)
    }
  }, [sessions]) // eslint-disable-line react-hooks/exhaustive-deps

  const days = daysUntil(examDateStr)

  async function handleCommit() {
    const entry = await commitGoal(subject, target, coldStart ? null : rawPredicted, examDateStr)
    setCommitted(entry)
    logEvent('goal_committed', { subject, target, daysToExam: days })
    // Rescue Plan first (two quick questions), then the share card.
    setShowRescue(true)
  }

  async function handleRescueSave(plan) {
    await setRescuePlan(subject, plan)
    logEvent('rescue_plan_set', { subject, ...plan })
    setShowRescue(false)
    setShowShare(true)
  }

  function handleRescueSkip() {
    setShowRescue(false)
    setShowShare(true)
  }

  function handleShareClose() {
    setShowShare(false)
    // Defer the pop one frame: unmounting the Modal portal and running the
    // stack transition in the same tick wedges react-navigation on web in an
    // infinite synchronous render (verified via CDP Debugger.pause).
    requestAnimationFrame(() => navigation.goBack())
  }

  async function handleRemindMe() {
    const ok = await enableNotifs()
    if (ok === false) {
      Alert.alert('Notifications Blocked', 'Go to Settings → Notifications → Regentify and enable notifications.')
    }
  }

  const s = makeStyles(C)

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={[T.body, { color: C.text }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[T.h2, { color: C.text }]}>🎯 My Goal</Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Exam line */}
        <View style={[s.examCard, cardShadow(C.shadow)]}>
          <Text style={{ fontSize: 30 }}>{meta.icon}</Text>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[T.h3, { color: C.text }]}>{meta.name} Regents</Text>
            <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>
              {sessions.length > 1 ? 'Which session are you taking?' : `📅 ${days} days away`}
            </Text>
          </View>
        </View>

        {/* Session picker — only the sittings this subject is offered in */}
        {sessions.length > 1 && (
          <View style={s.sessionRow}>
            {sessions.map((sn) => {
              const active = sn.dateStr === examDateStr
              return (
                <TouchableOpacity
                  key={sn.dateStr}
                  style={[s.sessionCard, cardShadow(C.shadow), active && { borderColor: C.brand, borderWidth: 2, backgroundColor: C.brand + '14' }]}
                  onPress={() => setExamDateStr(sn.dateStr)}
                  activeOpacity={0.85}
                >
                  <Text style={[T.small, { color: active ? C.brand : C.text, fontFamily: 'Fredoka_600SemiBold' }]} numberOfLines={1}>
                    {sn.label}
                  </Text>
                  <Text style={[T.label, { color: C.textMuted, marginTop: 4, textTransform: 'none', letterSpacing: 0 }]}>
                    {sn.days} days
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        )}

        {/* Where you stand */}
        <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginBottom: 14, marginHorizontal: 24 }]}>
          {coldStart
            ? 'Your predicted score unlocks after your first quiz or practice exam.'
            : `You're currently predicted around ${rawPredicted} (estimate).`}
        </Text>

        {/* Tier picker */}
        <Text style={[T.label, { color: C.textMuted, marginHorizontal: 16, marginBottom: 8 }]}>PICK YOUR TARGET</Text>
        {GOAL_TIERS.map((tier) => {
          const active = tier.value === target
          return (
            <TouchableOpacity
              key={tier.value}
              style={[s.tierCard, cardShadow(C.shadow), active && { borderColor: C.brand, borderWidth: 2, backgroundColor: C.brand + '14' }]}
              onPress={() => setTarget(tier.value)}
              activeOpacity={0.85}
            >
              <Text style={{ fontSize: 28 }}>{tier.icon}</Text>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[T.h3, { color: C.text }]}>{tier.label}</Text>
                <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]}>{tier.blurb}</Text>
              </View>
              <Text style={[T.num, { color: active ? C.brand : C.textMuted, fontSize: 30 }]}>{tier.value}</Text>
            </TouchableOpacity>
          )
        })}

        {/* Reminder nudge */}
        {!notifEnabled && (
          <TouchableOpacity style={[s.remindRow, cardShadow(C.shadow)]} onPress={handleRemindMe} activeOpacity={0.85}>
            <Text style={{ fontSize: 22 }}>🔔</Text>
            <Text style={[T.body, { color: C.text, flex: 1, marginLeft: 10 }]}>
              Remind me daily so I stay on track
            </Text>
            <Text style={[T.small, { color: C.brand }]}>Enable</Text>
          </TouchableOpacity>
        )}

        {/* Commit */}
        <TouchableOpacity
          style={duoBtn(C.brand, C.brandDark, { marginHorizontal: 16, marginTop: 20 })}
          onPress={handleCommit}
          activeOpacity={0.85}
        >
          <Text style={[T.btn, { color: '#fff' }]}>
            {existing ? 'UPDATE MY GOAL' : `COMMIT TO ${target} 🤝`}
          </Text>
        </TouchableOpacity>

        <Text style={[T.label, { color: C.textDim, textAlign: 'center', marginTop: 12, marginHorizontal: 24, textTransform: 'none', letterSpacing: 0 }]}>
          Predicted scores are study estimates only — official Regents conversions vary by exam.
        </Text>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Rescue Plan — two questions, pre-answered from exam date + tier.
          key remounts it per commit so the pre-selects re-derive. */}
      {showRescue && (
        <RescuePlanSheet
          key={committed?.committedAt ?? 'rescue'}
          visible={showRescue}
          daysToExam={days}
          target={committed?.target ?? target}
          onSave={handleRescueSave}
          onSkip={handleRescueSkip}
        />
      )}

      <GoalShareSheet
        visible={showShare}
        onClose={handleShareClose}
        subject={subject}
        target={committed?.target ?? target}
        examDateStr={committed?.examDateStr ?? examDateStr}
        daysToExam={days}
        baselineScore={committed?.baselineScore ?? null}
        streak={streak}
        name={user?.displayName?.split(' ')[0] ?? null}
      />
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:   { flex: 1, backgroundColor: C.bg },
    scroll: { paddingBottom: 24 },
    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 16, paddingVertical: 14,
    },
    backBtn: { paddingVertical: 6, paddingRight: 12 },
    examCard: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: C.surface, borderRadius: 18, borderWidth: 1, borderColor: C.border,
      marginHorizontal: 16, marginBottom: 14, padding: 16,
    },
    sessionRow: { flexDirection: 'row', gap: 10, marginHorizontal: 16, marginBottom: 14 },
    sessionCard: {
      flex: 1, alignItems: 'center',
      backgroundColor: C.surface, borderRadius: 16, borderWidth: 1, borderColor: C.border,
      paddingVertical: 14, paddingHorizontal: 8,
    },
    tierCard: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: C.surface, borderRadius: 18, borderWidth: 1, borderColor: C.border,
      marginHorizontal: 16, marginBottom: 10, padding: 16,
    },
    remindRow: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: C.surface, borderRadius: 14, borderWidth: 1, borderColor: C.border,
      marginHorizontal: 16, marginTop: 8, paddingHorizontal: 14, paddingVertical: 12,
    },
  })
}
