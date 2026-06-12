import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { T, duoBtn, duoBtnOutline } from '../styles/duo'
import CommitmentCard from './CommitmentCard'
import { useShareCard } from '../hooks/useShareCard'
import { SUBJECT_META } from '../content/subjects'
import { logEvent } from '../utils/analytics'

/**
 * Preview-then-share sheet for the goal commitment card. Sibling of
 * ShareCardSheet (kept separate — that sheet's copy/analytics are
 * quiz-result-specific).
 *
 * <GoalShareSheet visible onClose={...} subject="living-environment"
 *                 target={75} examDateStr="2026-06-16" daysToExam={23}
 *                 baselineScore={58} streak={5} name="Aisha" />
 */
export default function GoalShareSheet({ visible, onClose, ...cardProps }) {
  const { C } = useTheme()
  const { cardRef, sharing, shareCard } = useShareCard()
  const meta = SUBJECT_META[cardProps.subject] ?? { name: 'Regents' }

  useEffect(() => {
    if (visible) logEvent('goal_share_sheet_opened', { target: cardProps.target, subject: cardProps.subject })
  }, [visible])

  const fallbackMessage =
    `I'm committing to a ${cardProps.target} on the ${meta.name} Regents` +
    (cardProps.examDateStr ? ` (${cardProps.examDateStr})` : '') +
    '. Hold me to it. 🎯'

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={[s.sheet, { backgroundColor: C.surface }]}>
        <View style={[s.handle, { backgroundColor: C.border }]} />
        <Text style={[T.h3, { color: C.text, marginBottom: 14 }]}>Make it official 🤝</Text>

        {/* collapsable={false} is required for captureRef on Android */}
        <View ref={cardRef} collapsable={false}>
          <CommitmentCard {...cardProps} />
        </View>

        <View style={s.actions}>
          <TouchableOpacity
            style={duoBtnOutline(C.border, { flex: 1 })}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={[T.btn, { color: C.text }]}>CLOSE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={duoBtn(C.brand, C.brandDark, { flex: 1.4, opacity: sharing ? 0.6 : 1 })}
            onPress={async () => {
              const ok = await shareCard({ message: fallbackMessage })
              if (ok) logEvent('goal_share_completed', { target: cardProps.target, subject: cardProps.subject })
            }}
            disabled={sharing}
            activeOpacity={0.8}
          >
            <Text style={[T.btn, { color: '#fff' }]}>{sharing ? 'SHARING…' : '📤 SHARE'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 28,
    alignItems: 'center',
  },
  handle: { width: 40, height: 4, borderRadius: 2, marginBottom: 14 },
  actions: { flexDirection: 'row', gap: 12, alignSelf: 'stretch', marginTop: 18 },
})
