import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { T, cardShadow } from '../styles/duo'
import { describePlan, suggestionLabel } from '../utils/studyPlanCopy'

/**
 * The plan in one card, before the student commits: what they'll finish and
 * when, the time it takes, and whether it fits. When it doesn't fit, each fix
 * is one tap (onApply gets the engine's suggestion object).
 */
export default function PlanPreviewCard({ plan, nextSessionLabel = null, onApply }) {
  const { C } = useTheme()
  const copy = describePlan(plan)
  if (!copy) return null
  const s = makeStyles(C)

  const statusColor =
    copy.status === 'at_risk' ? C.wrong
    : copy.status === 'behind' ? C.warn
    : C.brand

  const fixes = copy.fits ? [] : (plan.feasibility.suggestions ?? [])
    .map((sg) => ({ sg, label: suggestionLabel(sg, { nextSessionLabel }) }))
    .filter((f) => f.label)

  return (
    <View style={[s.card, cardShadow(C.shadow), !copy.fits && { borderColor: C.wrong + '80' }]} accessibilityLabel="Your study plan">
      <View style={s.top}>
        <Text style={[T.label, { color: C.textMuted }]}>YOUR PLAN</Text>
        {copy.statusLabel && (
          <Text style={[T.small, s.pill, { color: copy.status === 'behind' ? C.text : statusColor, borderColor: statusColor + '90' }]}>{copy.statusLabel}</Text>
        )}
      </View>
      <Text style={[T.h3, { color: C.text, marginTop: 6 }]}>{copy.headline}</Text>
      <Text style={[T.small, { color: C.textMuted, marginTop: 4 }]}>{copy.detail}</Text>
      {fixes.length > 0 && (
        <View style={s.fixes}>
          {fixes.map(({ sg, label }) => (
            <TouchableOpacity
              key={sg.type}
              style={[s.fix, { borderColor: C.brand }]}
              onPress={() => onApply?.(sg)}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={label}
            >
              <Text style={[T.body, { color: C.brand }]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    card: {
      backgroundColor: C.surface, borderRadius: 18, borderWidth: 1, borderColor: C.border,
      marginHorizontal: 16, marginTop: 6, marginBottom: 12, padding: 16,
    },
    top:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    pill:  { borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 2, overflow: 'hidden' },
    fixes: { marginTop: 12, gap: 8 },
    fix:   { borderWidth: 1.5, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, minHeight: 44, justifyContent: 'center' },
  })
}
