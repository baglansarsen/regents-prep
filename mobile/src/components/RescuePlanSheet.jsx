import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { T, duoBtn } from '../styles/duo'
import { URGENCY_OPTIONS, TARGET_MODE_OPTIONS, urgencyFromDays, targetModeFromTarget } from '../utils/rescuePlan'

/**
 * RescuePlanSheet — two quick questions right after a goal commit that produce
 * the rescue-plan profile { urgency, targetMode }. Answers are pre-selected
 * from the exam date + goal tier, so the fast path is a single tap.
 *
 * <RescuePlanSheet visible daysToExam={12} target={75}
 *                  onSave={(plan) => ...} onSkip={() => ...} />
 */
export default function RescuePlanSheet({ visible, daysToExam, target, onSave, onSkip }) {
  const { C } = useTheme()
  const s = makeStyles(C)

  const [urgency,    setUrgency]    = useState(() => urgencyFromDays(daysToExam))
  const [targetMode, setTargetMode] = useState(() => targetModeFromTarget(target ?? 65))

  function OptionRow({ options, value, onPick }) {
    return options.map((opt) => {
      const active = opt.value === value
      return (
        <TouchableOpacity
          key={opt.value}
          style={[s.option, active && { borderColor: C.brand, borderWidth: 2, backgroundColor: C.brand + '14' }]}
          onPress={() => onPick(opt.value)}
          activeOpacity={0.85}
        >
          <Text style={{ fontSize: 20 }}>{opt.icon}</Text>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={[T.body, { color: active ? C.brand : C.text, fontFamily: 'Fredoka_600SemiBold' }]}>
              {opt.label}
            </Text>
            <Text style={[T.small, { color: C.textMuted }]}>{opt.blurb}</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onSkip}>
      <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={onSkip} />
      <View style={[s.sheet, { backgroundColor: C.surface }]}>
        <View style={[s.handle, { backgroundColor: C.border }]} />
        <Text style={[T.h3, { color: C.text }]}>Want a game plan? 🧭</Text>
        <Text style={[T.small, { color: C.textMuted, textAlign: 'center', marginTop: 4, marginBottom: 14 }]}>
          Two questions and your missions get tuned to exactly what you need.
        </Text>

        <Text style={[T.label, { color: C.textMuted, alignSelf: 'flex-start', marginBottom: 6 }]}>
          HOW SOON IS YOUR REGENTS?
        </Text>
        <OptionRow options={URGENCY_OPTIONS} value={urgency} onPick={setUrgency} />

        <Text style={[T.label, { color: C.textMuted, alignSelf: 'flex-start', marginTop: 12, marginBottom: 6 }]}>
          WHAT DO YOU NEED?
        </Text>
        <OptionRow options={TARGET_MODE_OPTIONS} value={targetMode} onPick={setTargetMode} />

        <TouchableOpacity
          style={duoBtn(C.brand, C.brandDark, { alignSelf: 'stretch', marginTop: 16 })}
          onPress={() => onSave({ urgency, targetMode })}
          activeOpacity={0.85}
        >
          <Text style={[T.btn, { color: '#fff' }]}>SET MY PLAN 🚀</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.skipBtn} onPress={onSkip}>
          <Text style={[T.label, { color: C.textMuted, textTransform: 'none', letterSpacing: 0 }]}>
            Maybe later
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
    sheet: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      borderTopLeftRadius: 24, borderTopRightRadius: 24,
      padding: 20, paddingBottom: 28, alignItems: 'center',
    },
    handle: { width: 40, height: 4, borderRadius: 2, marginBottom: 14 },
    option: {
      flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch',
      backgroundColor: C.surface2 ?? C.bg, borderRadius: 14,
      borderWidth: 1, borderColor: C.border,
      paddingHorizontal: 12, paddingVertical: 10, marginBottom: 8,
    },
    skipBtn: { alignItems: 'center', paddingVertical: 12 },
  })
}
