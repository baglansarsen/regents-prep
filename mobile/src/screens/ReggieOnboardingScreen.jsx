import React, { useState, useMemo } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useSubject } from '../context/SubjectContext'
import { useGoal } from '../context/GoalContext'
import { SUBJECTS, SUBJECT_META } from '../content/subjects'
import { getUpcomingExamSessions } from '../utils/examDates'
import { GOAL_TIERS } from '../data/goalConfig'
import { T, duoBtn, elevatedCard } from '../styles/duo'
import ReggieMascot from '../components/ReggieMascot'

// All exam-offering subjects, in the order SUBJECTS defines them
const SUBJECTS_LIST = Object.values(SUBJECTS)
  .map((id) => SUBJECT_META[id])
  .filter(Boolean)

// Per-step: Reggie's pose and the speech-bubble copy
const STEPS = [
  {
    pose:   'wave',
    bubble: "Hi, I'm Reggie! 🦕\nI'll get you Regents-ready.\nReady to set up?",
  },
  {
    pose:   'think',
    bubble: 'Which Regents exam\nare you preparing for?',
  },
  {
    pose:   'think',
    bubble: "When's your Regents?",
  },
  {
    pose:   'encourage',
    bubble: "What score are you\naiming for? You've got this.",
  },
  {
    pose:   'celebrate',
    bubble: "You're all set! Let's\nmake that score happen. 🎯",
  },
]

/**
 * ReggieOnboardingScreen
 *
 * Conversational 5-step onboarding led by Reggie:
 *   0 — welcome / intro
 *   1 — pick Regents subject
 *   2 — pick exam session (subject-aware Jan/June/Aug rules)
 *   3 — pick goal tier (65 / 75 / 85)
 *   4 — confirmation + commitGoal → onComplete()
 *
 * Replaces the plain SubjectOnboardingScreen in AppNavigator. The gate flag
 * (@subject_chosen_v1_${uid}) and Firestore meta/subject doc are still the
 * correct completion signals — Reggie still picks the subject.
 *
 * Props:
 *   onComplete() — called after commitGoal; AppNavigator advances to School step
 */
export default function ReggieOnboardingScreen({ onComplete }) {
  const { C } = useTheme()
  const { setSubject } = useSubject()
  const { commitGoal } = useGoal()

  const [step,          setStep]         = useState(0)
  const [pickedSubject, setPickedSubject] = useState(null)
  const [examDateStr,   setExamDateStr]  = useState(null)
  const [target,        setTarget]       = useState(null)
  const [committing,    setCommitting]   = useState(false)

  // Recomputes when subject changes — subject-aware session offering rules
  const sessions = useMemo(
    () => pickedSubject ? getUpcomingExamSessions(pickedSubject) : [],
    [pickedSubject],
  )

  // Summary values used in step 4
  const summaryMeta  = pickedSubject ? SUBJECT_META[pickedSubject] : null
  const summaryTier  = target != null ? (GOAL_TIERS.find((t) => t.value === target) ?? GOAL_TIERS[0]) : null
  const summaryEntry = sessions.find((sn) => sn.dateStr === examDateStr) ?? null

  const s = makeStyles(C)
  const { pose, bubble } = STEPS[step]

  function goBack() {
    setStep((prev) => Math.max(0, prev - 1))
  }

  async function handleFinish() {
    if (committing || !pickedSubject || !target || !examDateStr) return
    setCommitting(true)
    try {
      await commitGoal(pickedSubject, target, null, examDateStr)
    } catch {}
    onComplete()
  }

  return (
    <SafeAreaView style={s.safe}>

      {/* ── Mascot area (fixed height) ── */}
      <View style={s.mascotArea}>

        {/* Back button — hidden on step 0 */}
        {step > 0 ? (
          <TouchableOpacity
            onPress={goBack}
            style={s.backBtn}
            hitSlop={{ top: 12, left: 12, bottom: 12, right: 12 }}
          >
            <Text style={[T.btn, { color: C.brand, fontSize: 14 }]}>‹ Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={s.backBtnPlaceholder} />
        )}

        {/* Reggie + speech bubble side by side */}
        <View style={s.mascotRow}>
          {/* Speech bubble (left) */}
          <View style={s.bubbleWrap}>
            <View style={[s.bubble, { backgroundColor: C.surface, borderColor: C.border, shadowColor: C.shadow }]}>
              <Text style={[s.bubbleText, { color: C.text }]}>{bubble}</Text>
            </View>
            {/* Tail points right toward Reggie */}
            <View style={[s.bubbleTail, { backgroundColor: C.surface, borderColor: C.border }]} />
          </View>

          {/* Reggie (right) */}
          <ReggieMascot pose={pose} size={110} />
        </View>

        {/* Progress dots */}
        <View style={s.dots}>
          {STEPS.map((_, i) => (
            <View
              key={i}
              style={[s.dot, { backgroundColor: i <= step ? C.brand : C.border }]}
            />
          ))}
        </View>
      </View>

      {/* ── Step body (scrollable) ── */}
      <ScrollView
        style={s.body}
        contentContainerStyle={s.bodyContent}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Step 0: Welcome ── */}
        {step === 0 && (
          <View style={s.centerWrap}>
            <Text style={[T.h2, { color: C.text, textAlign: 'center', marginBottom: 8 }]}>
              Welcome to Regentify
            </Text>
            <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginBottom: 36 }]}>
              Let me help you set up in under a minute.
            </Text>
            <TouchableOpacity
              style={duoBtn(C.brand, C.brandDark)}
              onPress={() => setStep(1)}
              activeOpacity={0.85}
            >
              <Text style={[T.btn, { color: '#fff' }]}>Let's go →</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── Step 1: Subject picker ── */}
        {step === 1 && (
          <>
            <Text style={[T.h3, { color: C.text, textAlign: 'center', marginBottom: 16 }]}>
              Pick your Regents exam
            </Text>
            <View style={s.subjectGrid}>
              {SUBJECTS_LIST.map(({ id, name, icon, color }) => (
                <TouchableOpacity
                  key={id}
                  style={[s.subjectCard, { borderColor: color, backgroundColor: color + '18' }]}
                  onPress={() => {
                    setPickedSubject(id)
                    setSubject(id)
                    setExamDateStr(null)   // reset downstream if they go back and re-pick
                    setTarget(null)
                    setStep(2)
                  }}
                  activeOpacity={0.75}
                >
                  <Text style={s.subjectIcon}>{icon}</Text>
                  <Text style={[s.subjectName, { color: C.text }]} numberOfLines={2}>
                    {name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* ── Step 2: Exam session picker ── */}
        {step === 2 && (
          <>
            <Text style={[T.h3, { color: C.text, textAlign: 'center', marginBottom: 16 }]}>
              Choose your exam session
            </Text>
            <View style={s.stackList}>
              {sessions.map((sn) => {
                const active = examDateStr === sn.dateStr
                return (
                  <TouchableOpacity
                    key={sn.dateStr}
                    style={[
                      elevatedCard(C),
                      s.rowCard,
                      active && { borderColor: C.brand, borderWidth: 2 },
                    ]}
                    onPress={() => {
                      setExamDateStr(sn.dateStr)
                      setStep(3)
                    }}
                    activeOpacity={0.85}
                  >
                    <Text style={[T.h3, { color: C.text }]}>{sn.label}</Text>
                    <Text style={[T.small, { color: C.textMuted, marginTop: 3 }]}>
                      {sn.days} days away
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </>
        )}

        {/* ── Step 3: Goal tier picker ── */}
        {step === 3 && (
          <>
            <Text style={[T.h3, { color: C.text, textAlign: 'center', marginBottom: 16 }]}>
              Pick your goal score
            </Text>
            <View style={s.stackList}>
              {GOAL_TIERS.map((tier) => {
                const active = target === tier.value
                return (
                  <TouchableOpacity
                    key={tier.value}
                    style={[
                      elevatedCard(C),
                      s.rowCard,
                      s.tierRow,
                      active && { borderColor: C.brand, borderWidth: 2 },
                    ]}
                    onPress={() => {
                      setTarget(tier.value)
                      setStep(4)
                    }}
                    activeOpacity={0.85}
                  >
                    <Text style={s.tierIcon}>{tier.icon}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={[T.h3, { color: C.text }]}>
                        {tier.label} · {tier.value}
                      </Text>
                      <Text style={[T.small, { color: C.textMuted, marginTop: 3 }]} numberOfLines={2}>
                        {tier.blurb}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </>
        )}

        {/* ── Step 4: Confirmation ── */}
        {step === 4 && summaryMeta && summaryTier && (
          <View style={s.centerWrap}>
            {/* Summary card */}
            <View style={[elevatedCard(C), s.summaryCard]}>
              {/* Subject row */}
              <View style={s.summaryRow}>
                <Text style={{ fontSize: 28 }}>{summaryMeta.icon}</Text>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[T.h3, { color: C.text }]} numberOfLines={1}>
                    {summaryMeta.name} Regents
                  </Text>
                  <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]} numberOfLines={1}>
                    {summaryEntry?.label ?? ''} · {summaryEntry?.days ?? '?'} days away
                  </Text>
                </View>
              </View>
              {/* Goal row */}
              <View style={[s.summaryRow, { marginTop: 12 }]}>
                <Text style={{ fontSize: 28 }}>{summaryTier.icon}</Text>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[T.h3, { color: C.text }]}>
                    Goal: {summaryTier.value} — {summaryTier.label}
                  </Text>
                  <Text style={[T.small, { color: C.textMuted, marginTop: 2 }]} numberOfLines={2}>
                    {summaryTier.blurb}
                  </Text>
                </View>
              </View>
            </View>

            {/* CTA */}
            <TouchableOpacity
              style={[duoBtn(C.brand, C.brandDark, { marginTop: 24, opacity: committing ? 0.6 : 1 })]}
              onPress={handleFinish}
              disabled={committing}
              activeOpacity={0.85}
            >
              <Text style={[T.btn, { color: '#fff' }]}>
                {committing ? 'Setting up…' : 'Start studying →'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.bg },

    // ── Mascot header ──
    mascotArea: {
      paddingTop: 6,
      paddingHorizontal: 20,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: C.border,
    },
    backBtn: {
      alignSelf: 'flex-start',
      marginBottom: 4,
    },
    backBtnPlaceholder: {
      height: 22,
      marginBottom: 4,
    },
    mascotRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: 10,
    },
    // Bubble (left side, speech points right toward Reggie)
    bubbleWrap: {
      flex: 1,
      maxWidth: 210,
      marginBottom: 10,
      position: 'relative',
    },
    bubble: {
      borderWidth: 1.5,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 10,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.18,
      shadowRadius: 6,
      elevation: 4,
    },
    bubbleText: {
      fontFamily: 'Nunito_600SemiBold',
      fontSize: 14,
      lineHeight: 21,
    },
    // Diamond tail at bottom-right of bubble, pointing toward Reggie
    bubbleTail: {
      position: 'absolute',
      bottom: -7,
      right: 12,
      width: 12,
      height: 12,
      borderRightWidth: 1.5,
      borderBottomWidth: 1.5,
      transform: [{ rotate: '45deg' }],
    },
    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 6,
      marginTop: 10,
    },
    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
    },

    // ── Body ──
    body: { flex: 1 },
    bodyContent: { padding: 20, paddingBottom: 48 },

    centerWrap: { alignItems: 'stretch' },

    // Subject 2-col grid
    subjectGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'center',
    },
    subjectCard: {
      width: '46%',
      borderWidth: 2,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      gap: 6,
    },
    subjectIcon: { fontSize: 32 },
    subjectName: {
      fontFamily: 'Nunito_700Bold',
      fontSize: 12,
      textAlign: 'center',
      lineHeight: 17,
    },

    // Vertical card list (sessions / tiers)
    stackList: { gap: 12 },
    rowCard: {
      padding: 18,
    },
    tierRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tierIcon: { fontSize: 28, marginRight: 14 },

    // Summary card (step 4)
    summaryCard: { padding: 18 },
    summaryRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}
