import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext'
import { T, duoBtn, duoBtnOutline } from '../styles/duo'
import ShareCard from './ShareCard'
import { useShareCard } from '../hooks/useShareCard'
import { SUBJECT_META } from '../content/subjects'
import { shareCardContent } from '../utils/shareCardCopy'
import { logEvent } from '../utils/analytics'

/**
 * Preview-then-share bottom sheet. Shows the branded ShareCard so the user
 * sees exactly what they're posting, with one-tap share to the native sheet.
 * `variant` selects the achievement story (see utils/shareCardCopy.js);
 * omit it for the classic quiz-result card.
 *
 * <ShareCardSheet visible={show} onClose={...} pct={92} correct={11} total={12}
 *                 subject="algebra-2" streak={5} topic="Polynomials" />
 * <ShareCardSheet visible variant="practice_exam" scaled={72} subject="algebra-2" ... />
 */
export default function ShareCardSheet({ visible, onClose, variant = 'quiz_result', ...cardProps }) {
  const { C } = useTheme()
  const { cardRef, sharing, shareCard } = useShareCard()
  const meta = SUBJECT_META[cardProps.subject] ?? { name: 'Regents' }
  const spec = shareCardContent(variant, { ...cardProps, subjectName: meta.name })

  useEffect(() => {
    if (visible) logEvent('share_sheet_opened', { variant, pct: cardProps.pct, subject: cardProps.subject })
  }, [visible])

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={s.backdrop} activeOpacity={1} onPress={onClose} />
      <View style={[s.sheet, { backgroundColor: C.surface }]}>
        <View style={[s.handle, { backgroundColor: C.border }]} />
        <Text style={[T.h3, { color: C.text, marginBottom: 14 }]}>{spec.sheetTitle}</Text>

        {/* collapsable={false} is required for captureRef on Android */}
        <View ref={cardRef} collapsable={false}>
          <ShareCard variant={variant} {...cardProps} />
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
              const ok = await shareCard({ message: spec.fallbackMessage })
              // iOS can't distinguish share vs dismiss — treat as upper bound
              if (ok) logEvent('share_completed', { variant, pct: cardProps.pct, subject: cardProps.subject })
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
