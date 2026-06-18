import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { T } from '../styles/duo'
import { SUBJECT_META } from '../content/subjects'
import { tierFor } from '../data/goalConfig'

// Fixed brand palette — matches ShareCard so every shared image is consistent
// regardless of the app theme.
const CARD = {
  bg:      '#0F172A',
  surface: '#1E293B',
  border:  '#334155',
  text:    '#F8FAFC',
  muted:   '#94A3B8',
  brand:   '#1FC36B',
  warn:    '#FFC93C',
  fire:    '#FF9600',
  purple:  '#7C5CFC',
}

function formatExamDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

/**
 * Capture-able commitment card — "I'm going to pass this thing, hold me to it."
 *
 * <CommitmentCard subject="living-environment" target={75}
 *                 examDateStr="2026-06-16" daysToExam={23}
 *                 baselineScore={58} streak={5} name="Aisha" />
 */
export default function CommitmentCard({
  subject = 'living-environment',
  target = 65,
  examDateStr = null,
  daysToExam = null,
  baselineScore = null,
  streak = 0,
  name = null,
}) {
  const meta = SUBJECT_META[subject] ?? { name: 'Regents', icon: '🎓', color: CARD.brand }
  const tier = tierFor(target)

  return (
    <View style={s.card}>
      {/* Header */}
      <View style={s.header}>
        <Text style={[T.h3, { color: CARD.brand, letterSpacing: 1 }]}>REGENTIFY</Text>
        <View style={[s.subjectPill, { borderColor: meta.color + '80', backgroundColor: meta.color + '22' }]}>
          <Text style={[T.small, { color: CARD.text }]}>{meta.icon} {meta.name}</Text>
        </View>
      </View>

      <Text style={[T.label, { color: CARD.muted, letterSpacing: 2 }]}>MY REGENTS GOAL</Text>

      {/* Target ring */}
      <View style={[s.ring, { borderColor: CARD.warn }]}>
        <Text style={[T.num, { color: CARD.warn, fontSize: 48 }]}>{target}</Text>
        <Text style={[T.small, { color: CARD.text }]}>{tier.icon} {tier.label}</Text>
      </View>

      <Text style={[T.h2, { color: CARD.text, textAlign: 'center' }]}>
        {name ? `${name} is` : "I'm"} committing to it. 🎯
      </Text>

      {/* Exam date */}
      {examDateStr ? (
        <Text style={[T.body, { color: CARD.muted }]}>
          📅 {formatExamDate(examDateStr)}{daysToExam != null && daysToExam >= 0 ? ` · ${daysToExam} days away` : ''}
        </Text>
      ) : null}

      {/* Baseline */}
      {baselineScore != null && (
        <View style={s.baselineRow}>
          <Text style={[T.body, { color: CARD.purple }]}>Starting from {baselineScore} — watch me climb 📈</Text>
        </View>
      )}

      {/* Streak */}
      {streak > 0 && (
        <View style={s.baselineRow}>
          <Text style={{ fontSize: 16 }}>🔥</Text>
          <Text style={[T.body, { color: CARD.fire }]}>{streak}-day streak already</Text>
        </View>
      )}

      {/* Footer */}
      <View style={s.footer}>
        <Text style={[T.body, { color: CARD.text }]}>Hold me to it. 🤝</Text>
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
  baselineRow: {
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
