import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { T, duoBtn } from '../styles/duo'

/**
 * "How did your June Regents go?" — asked once the student's exam date has
 * passed, instead of silently moving the countdown (study plan Phase 4).
 *
 * onDone({ status: 'took'|'missed'|'moved', score: number|null }); onClose to dismiss.
 */
export const OUTCOME_OPTIONS = [
  { status: 'took',   icon: '✅', label: 'I took it',          blurb: 'Tell me your score if you have it.' },
  { status: 'missed', icon: '⏭️', label: "I didn't take it",    blurb: "No problem. We'll plan for the next one." },
  { status: 'moved',  icon: '📅', label: 'My exam date moved', blurb: "Pick the new date and I'll re-plan." },
]

/** Whole number 0–100, or null for blank / not a score. */
export function parseScore(text) {
  const t = (text ?? '').trim()
  if (!/^\d{1,3}$/.test(t)) return null
  const n = Number(t)
  return n >= 0 && n <= 100 ? n : null
}

export default function ExamOutcomeSheet({ visible, month, onDone, onClose }) {
  const { C } = useTheme()
  const s = makeStyles(C)
  const [step, setStep] = useState('ask')
  const [scoreText, setScoreText] = useState('')
  const score = parseScore(scoreText)
  const invalid = scoreText.trim() !== '' && score == null

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={onClose} accessibilityLabel="Close" />
      <View style={[s.sheet, { backgroundColor: C.surface }]}>
        <View style={[s.handle, { backgroundColor: C.border }]} />
        {step === 'ask' ? (
          <>
            <Text style={[T.h3, { color: C.text, textAlign: 'center' }]} accessibilityRole="header">
              How did your {month} Regents go?
            </Text>
            <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginTop: 4, marginBottom: 14 }]}>
              Your answer sets up what comes next.
            </Text>
            {OUTCOME_OPTIONS.map((o) => (
              <TouchableOpacity
                key={o.status}
                style={s.option}
                onPress={() => (o.status === 'took' ? setStep('score') : onDone({ status: o.status, score: null }))}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel={o.label}
                accessibilityHint={o.blurb}
              >
                <Text style={{ fontSize: 20 }}>{o.icon}</Text>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={[T.body, { color: C.text }]}>{o.label}</Text>
                  <Text style={[T.small, { color: C.textMuted }]}>{o.blurb}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <Text style={[T.h3, { color: C.text, textAlign: 'center' }]} accessibilityRole="header">Nice work finishing it 🎉</Text>
            <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginTop: 4, marginBottom: 14 }]}>
              What was your scaled score? Leave it blank if you don't know yet.
            </Text>
            <TextInput
              value={scoreText}
              onChangeText={setScoreText}
              keyboardType="number-pad"
              maxLength={3}
              placeholder="e.g. 78"
              placeholderTextColor={C.textMuted}
              accessibilityLabel="Scaled score, 0 to 100"
              style={[s.input, { color: C.text, borderColor: invalid ? C.wrong : C.border }]}
            />
            {invalid && <Text style={[T.small, { color: C.wrong, marginTop: 6 }]}>Enter a whole number from 0 to 100, or leave it blank.</Text>}
            <TouchableOpacity
              style={duoBtn(C.brand, C.brandDark, { alignSelf: 'stretch', marginTop: 16, opacity: invalid ? 0.5 : 1 })}
              onPress={() => { if (!invalid) onDone({ status: 'took', score }) }}
              disabled={invalid}
              accessibilityRole="button"
              accessibilityState={{ disabled: invalid }}
            >
              <Text style={[T.btn, { color: '#fff' }]}>{score != null ? 'Save score' : 'Save'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.skipBtn} onPress={() => setStep('ask')} accessibilityRole="button">
              <Text style={[T.small, { color: C.textMuted }]}>Back</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
    sheet: {
      borderTopLeftRadius: 24, borderTopRightRadius: 24,
      paddingHorizontal: 20, paddingTop: 10, paddingBottom: 32, alignItems: 'stretch',
    },
    handle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 14 },
    option: {
      flexDirection: 'row', alignItems: 'center', minHeight: 56,
      borderWidth: 1, borderColor: C.border, borderRadius: 14, padding: 12, marginBottom: 8,
    },
    input: { borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 18 },
    skipBtn: { alignItems: 'center', paddingVertical: 12, minHeight: 44, justifyContent: 'center' },
  })
}
