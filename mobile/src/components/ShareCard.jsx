import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { T } from '../styles/duo'
import { SUBJECT_META } from '../content/subjects'
import { shareCardContent } from '../utils/shareCardCopy'

// ── Fixed brand palette ──────────────────────────────────────────────────────
// The card is always rendered in dark "brand" colors regardless of app theme,
// so every shared image looks consistent on Instagram / Snapchat / iMessage.
const CARD = {
  bg:      '#0F172A',
  surface: '#1E293B',
  border:  '#334155',
  text:    '#F8FAFC',
  muted:   '#94A3B8',
  brand:   '#1FC36B',
  fire:    '#FF9600',
}

/**
 * Branded, capture-able achievement card (square-ish, story-friendly).
 *
 * `variant` picks the readiness story (see utils/shareCardCopy.js):
 *   quiz_result (default) · predicted_up · goal_committed · practice_exam ·
 *   streak_milestone · weak_topic_mastered
 * Remaining props are the variant's inputs (pct/correct/total, scaled,
 * from/to, target, streak, topic) plus `subject`.
 *
 * Render it inside a ref'd View (see useShareCard) — typically offscreen or
 * inside a preview modal — then capture + share.
 */
export default function ShareCard({
  variant = 'quiz_result',
  subject = 'living-environment',
  streak = 0,
  ...props
}) {
  const meta = SUBJECT_META[subject] ?? { name: 'Regents', icon: '🎓', color: CARD.brand }
  const spec = shareCardContent(variant, { ...props, streak, subjectName: meta.name })

  return (
    <View style={s.card}>
      {/* Header */}
      <View style={s.header}>
        <Text style={[T.h3, { color: CARD.brand, letterSpacing: 1 }]}>REGENTIFY</Text>
        <View style={[s.subjectPill, { borderColor: meta.color + '80', backgroundColor: meta.color + '22' }]}>
          <Text style={[T.small, { color: CARD.text }]}>{meta.icon} {meta.name}</Text>
        </View>
      </View>

      {/* Variant kicker (e.g. PRACTICE REGENTS EXAM) */}
      {spec.kicker ? (
        <Text style={[T.label, { color: CARD.muted, letterSpacing: 2 }]}>{spec.kicker}</Text>
      ) : null}

      {/* Metric ring */}
      <View style={[s.ring, { borderColor: spec.ringColor }]}>
        <Text style={[T.num, { color: spec.ringColor, fontSize: 44 }]}>{spec.ringValue}</Text>
        <Text style={[T.small, { color: CARD.muted }]}>{spec.ringLabel}</Text>
      </View>

      <Text style={[T.h2, { color: CARD.text, textAlign: 'center' }]}>{spec.copy}</Text>
      {spec.subCopy ? (
        <Text style={[T.small, { color: CARD.muted, textAlign: 'center' }]} numberOfLines={2}>
          {spec.subCopy}
        </Text>
      ) : null}

      {/* Streak (hidden when the ring already shows it) */}
      {spec.showStreak && streak > 0 && (
        <View style={s.streakRow}>
          <Text style={{ fontSize: 18 }}>🔥</Text>
          <Text style={[T.body, { color: CARD.fire }]}>{streak}-day streak</Text>
        </View>
      )}

      {/* Footer / hook */}
      <View style={s.footer}>
        <Text style={[T.body, { color: CARD.text }]}>{spec.footerLine}</Text>
        <Text style={[T.label, { color: CARD.muted }]}>Regentify · NY Regents Prep</Text>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  card: {
    width: 340,
    backgroundColor: CARD.bg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: CARD.border,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  ring: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 7,
    backgroundColor: CARD.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    marginTop: 6,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: CARD.surface,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  footer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 4,
    borderTopWidth: 1,
    borderTopColor: CARD.border,
    paddingTop: 14,
    marginTop: 6,
  },
})
