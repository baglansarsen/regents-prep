import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { T } from '../styles/duo'
import { SUBJECT_META } from '../content/subjects'

// ── Fixed brand palette ──────────────────────────────────────────────────────
// The card is always rendered in dark "brand" colors regardless of app theme,
// so every shared image looks consistent on Instagram / Snapchat / iMessage.
const CARD = {
  bg:      '#0F172A',
  surface: '#1E293B',
  border:  '#334155',
  text:    '#F8FAFC',
  muted:   '#94A3B8',
  brand:   '#58CC02',
  warn:    '#FFC800',
  fire:    '#FF9600',
}

/**
 * Branded, capture-able result card (square-ish, story-friendly).
 *
 * Render it inside a ref'd View (see useShareCard) — typically offscreen or
 * inside a preview modal — then capture + share.
 */
export default function ShareCard({
  pct = 0,
  correct = 0,
  total = 0,
  subject = 'living-environment',
  streak = 0,
  topic = null,
}) {
  const meta = SUBJECT_META[subject] ?? { name: 'Regents', icon: '🎓', color: CARD.brand }
  const ringColor = pct >= 85 ? CARD.brand : pct >= 65 ? CARD.warn : CARD.fire
  const flexLine =
    pct >= 95 ? 'Certified genius 🧠' :
    pct >= 85 ? 'Mastered it 🏆' :
    pct >= 65 ? 'Passed it ✅' :
    'Grinding 📚'

  return (
    <View style={s.card}>
      {/* Header */}
      <View style={s.header}>
        <Text style={[T.h3, { color: CARD.brand, letterSpacing: 1 }]}>REGENTIFY</Text>
        <View style={[s.subjectPill, { borderColor: meta.color + '80', backgroundColor: meta.color + '22' }]}>
          <Text style={[T.small, { color: CARD.text }]}>{meta.icon} {meta.name}</Text>
        </View>
      </View>

      {/* Score ring */}
      <View style={[s.ring, { borderColor: ringColor }]}>
        <Text style={[T.num, { color: ringColor, fontSize: 44 }]}>{pct}%</Text>
        <Text style={[T.small, { color: CARD.muted }]}>{correct} / {total} correct</Text>
      </View>

      <Text style={[T.h2, { color: CARD.text }]}>{flexLine}</Text>
      {topic ? (
        <Text style={[T.small, { color: CARD.muted }]} numberOfLines={1}>{topic}</Text>
      ) : null}

      {/* Streak */}
      {streak > 0 && (
        <View style={s.streakRow}>
          <Text style={{ fontSize: 18 }}>🔥</Text>
          <Text style={[T.body, { color: CARD.fire }]}>{streak}-day streak</Text>
        </View>
      )}

      {/* Footer / challenge hook */}
      <View style={s.footer}>
        <Text style={[T.body, { color: CARD.text }]}>Think you can beat me? 👀</Text>
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
