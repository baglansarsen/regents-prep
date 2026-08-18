import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { T, duoBtn, elevatedCard } from '../styles/duo'
import GoalRing from './GoalRing'

/**
 * NextActionCard — the Home screen's single dominant "do this next" hero.
 *
 * Replaces what used to be four separate cards (predicted-score/outcome,
 * Today's Pass Plan, the single-action mission card, and the onboarding/rescue
 * card): one goal strip up top, one action below it, with the day's other
 * planned tasks tucked behind a "See today's full plan" disclosure instead of
 * rendered as their own rows.
 *
 * Presentational only — no hooks beyond useTheme/useState (disclosure toggle).
 * HomeScreen supplies the ladder's winner and dispatches taps through the
 * existing runMission().
 */
export default function NextActionCard({
  loading = false,
  goal,          // { subjectName, hasGoal, predicted, coldStart, target, examLabel, daysToExam }
  hero,          // mission-shaped: { icon, title, subtitle, cta, estimatedMinutes, actionType, topic, urgencyNote, rescue, planLabel }
  headline,      // plan.headline — the score-gap line, e.g. "You need +8 to reach 75"
  extras = [],   // plan.tasks.slice(1) — the rest of today's plan
  doneIds,       // Set — planDone.doneIds
  progress,      // { done, total } — planDone
  energyFree = true,
  pacing = 'steady',
  onPress,       // () => runMission(hero)
  onExtraPress,  // (task) => runMission(task)
  onOpenGoal,    // () => navigate('GoalDetail' | 'GoalSetup')
  onSkip,        // optional — only wired for snoozable heroes (e.g. level0_math's "Not now")
}) {
  const { C } = useTheme()
  const [expanded, setExpanded] = useState(false)
  const s = makeStyles(C)

  if (loading || !hero) {
    return (
      <View style={[s.card, elevatedCard(C), { minHeight: 168, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[T.small, { color: C.textDim }]}>Loading today's plan…</Text>
      </View>
    )
  }

  const showDisclosure = !hero.rescue && extras.length > 0
  const ringProgress = goal?.hasGoal && goal.predicted != null && !goal.coldStart
    ? Math.min(1, Math.max(0, (goal.predicted - 50) / Math.max(1, (goal.target ?? 75) - 50)))
    : 0
  const ringColor = goal?.hasGoal && goal.predicted != null && goal.target != null && goal.predicted >= goal.target
    ? C.correct : (C.warn ?? '#FFC93C')

  return (
    <View style={[s.card, elevatedCard(C)]}>
      {/* ── Goal strip — subject, predicted→target, exam countdown ── */}
      {goal && (
        <TouchableOpacity style={s.goalStrip} onPress={onOpenGoal} activeOpacity={0.75}>
          <GoalRing size={34} strokeWidth={4} progress={ringProgress} color={ringColor} trackColor={C.surface2}>
            <Text style={{ fontSize: 12 }}>{!goal.hasGoal ? '🎯' : goal.coldStart ? '—' : ''}</Text>
          </GoalRing>
          <Text style={[T.small, { color: C.textMuted, flex: 1, marginLeft: 8 }]} numberOfLines={1}>
            {goal.subjectName}
            {goal.hasGoal && !goal.coldStart && goal.predicted != null ? ` · ${goal.predicted}→${goal.target}` : ''}
            {goal.examLabel ? ` · ${goal.examLabel}` : ''}
          </Text>
          <Text style={[T.small, { color: C.textDim }]}>›</Text>
        </TouchableOpacity>
      )}

      {/* ── The one action ── */}
      <View style={s.heroHeader}>
        <Text style={s.heroIcon}>{hero.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[T.label, { color: hero.rescue ? C.warn : C.brand, marginBottom: 2 }]}>
            {hero.rescue ? `🧭 ${hero.planLabel}` : 'DO THIS NEXT'}
          </Text>
          <Text style={[T.h3, { color: C.text }]} numberOfLines={1}>{hero.title}</Text>
        </View>
        <View style={[s.timePill, { backgroundColor: C.brand + '18', borderColor: C.brand + '40' }]}>
          <Text style={[T.small, { color: C.brand, fontSize: 11 }]}>⏱ ~{hero.estimatedMinutes}m</Text>
        </View>
      </View>

      <Text style={[T.small, { color: C.textMuted, marginTop: 4, marginBottom: 4 }]} numberOfLines={2}>
        {hero.subtitle}
      </Text>
      {hero.urgencyNote && (
        <Text style={[T.small, { color: C.warn, marginBottom: 8, fontWeight: '700' }]} numberOfLines={1}>
          🔥 {hero.urgencyNote}
        </Text>
      )}

      {pacing === 'recover' && !energyFree && (
        <Text style={[T.small, { color: C.textDim, marginBottom: 8 }]}>
          Low energy — this may ask you to recharge partway through.
        </Text>
      )}

      <TouchableOpacity style={duoBtn(C.brand, C.brandDark)} onPress={onPress} activeOpacity={0.85}>
        <Text style={[T.btn, { color: '#fff' }]}>{hero.cta}</Text>
      </TouchableOpacity>

      {onSkip && (
        <TouchableOpacity onPress={onSkip} activeOpacity={0.7} style={{ alignSelf: 'center', marginTop: 8 }}>
          <Text style={[T.small, { color: C.textDim }]}>Not now</Text>
        </TouchableOpacity>
      )}

      {/* ── Footer — score gap + today's progress + the rest of the plan ── */}
      {(headline || showDisclosure) && (
        <View style={s.footer}>
          {headline ? (
            <Text style={[T.small, { color: C.textMuted }]} numberOfLines={1}>
              {headline}
              {progress?.total > 1 ? ` · ${progress.done} of ${progress.total} done today` : ''}
            </Text>
          ) : null}
          {showDisclosure && (
            <TouchableOpacity onPress={() => setExpanded((v) => !v)} activeOpacity={0.7}>
              <Text style={[T.small, { color: C.brand, marginTop: 4, fontWeight: '700' }]}>
                {expanded ? 'Hide the rest' : `See today's full plan (${extras.length} more)`} {expanded ? '⌃' : '›'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {showDisclosure && expanded && (
        <View style={s.extras}>
          {extras.map((t, i) => {
            const done = doneIds?.has(t.id)
            return (
              <TouchableOpacity
                key={t.id}
                onPress={() => onExtraPress?.(t)}
                activeOpacity={0.8}
                style={[s.extraRow, { borderTopWidth: i === 0 ? 0 : 1, borderTopColor: C.border + '55', opacity: done ? 0.6 : 1 }]}
              >
                <Text style={{ fontSize: 20 }}>{done ? '✅' : t.icon}</Text>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text
                    style={[T.body, { color: C.text, fontWeight: '700', textDecorationLine: done ? 'line-through' : 'none' }]}
                    numberOfLines={1}
                  >
                    {t.title}
                  </Text>
                  <Text style={[T.small, { color: C.textMuted, marginTop: 1 }]} numberOfLines={2}>
                    {done ? 'Done today — tap to go again' : t.subtitle}
                  </Text>
                </View>
                <Text style={[T.small, { color: done ? C.textDim : C.brand, fontSize: 12 }]}>
                  {done ? 'Again ›' : `${t.cta} ›`}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      )}
    </View>
  )
}

const makeStyles = (C) => StyleSheet.create({
  card: { marginHorizontal: 16, marginBottom: 12, padding: 16 },
  goalStrip: {
    flexDirection: 'row', alignItems: 'center',
    paddingBottom: 12, marginBottom: 12,
    borderBottomWidth: 1, borderBottomColor: C.border + '55',
  },
  heroHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heroIcon: { fontSize: 28 },
  timePill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, borderWidth: 1 },
  footer: { marginTop: 12 },
  extras: { marginTop: 8, borderTopWidth: 1, borderTopColor: C.border + '55', paddingTop: 4 },
  extraRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
})
