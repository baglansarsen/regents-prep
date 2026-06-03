import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Animated, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSpacedRepetition, Q_AGAIN, Q_HARD, Q_GOOD, Q_EASY, nextReviewLabel } from '../hooks/useSpacedRepetition'
import * as leData from '../content/living-environment/index'
import * as esData from '../content/earth-science/index'
import { SUBJECTS } from '../content/subjects'

const { width } = Dimensions.get('window')

export default function FlashcardScreen({ route, navigation }) {
  const { topic, subject } = route.params ?? {}
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid

  const sd = subject === SUBJECTS.EARTH_SCIENCE ? esData : leData
  const { buildDeck, review, getStats } = useSpacedRepetition(uid, sd.flashcards)
  const deck = buildDeck(topic)

  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped]     = useState(false)
  const flipAnim = useRef(new Animated.Value(0)).current

  const s = makeStyles(C)
  const card = deck[cardIndex]
  const stats = getStats(topic)

  function flip() {
    if (flipped) return
    Animated.spring(flipAnim, { toValue: 1, useNativeDriver: true }).start()
    setFlipped(true)
  }

  function rate(quality) {
    if (card) review(card.id, quality)
    flipAnim.setValue(0)
    setFlipped(false)
    if (cardIndex + 1 < deck.length) {
      setCardIndex(i => i + 1)
    } else {
      navigation.goBack()
    }
  }

  const frontInterpolate = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] })
  const backInterpolate  = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] })

  if (!card) {
    return (
      <SafeAreaView style={s.safe} edges={['bottom']}>
        <View style={s.empty}>
          <Text style={s.emptyText}>🎉 All caught up!</Text>
          <Text style={s.emptySubtext}>No cards due right now.</Text>
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <Text style={s.backBtnText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.closeBtn}>✕</Text>
        </TouchableOpacity>
        <Text style={s.progress}>{cardIndex + 1} / {deck.length}</Text>
        <View style={s.statsRow}>
          <Text style={s.statChip}>📚 {stats.new}</Text>
          <Text style={s.statChip}>⏰ {stats.due}</Text>
          <Text style={s.statChip}>✅ {stats.mastered}</Text>
        </View>
      </View>

      {/* Card */}
      <TouchableOpacity style={s.cardContainer} onPress={flip} activeOpacity={0.9}>
        {/* Front */}
        <Animated.View style={[s.card, s.cardFront, { transform: [{ rotateY: frontInterpolate }] }]}>
          <Text style={s.cardTopic}>{card.topic}</Text>
          <Text style={s.cardTerm}>{card.term ?? card.front}</Text>
          {!flipped && <Text style={s.tapHint}>Tap to reveal →</Text>}
        </Animated.View>

        {/* Back */}
        <Animated.View style={[s.card, s.cardBack, { transform: [{ rotateY: backInterpolate }] }]}>
          <Text style={s.cardDefinition}>{card.definition ?? card.back}</Text>
          {card.example && <Text style={s.cardExample}>e.g. {card.example}</Text>}
          {card.id && nextReviewLabel(null) !== null && (
            <Text style={s.nextReview}>{nextReviewLabel(null)}</Text>
          )}
        </Animated.View>
      </TouchableOpacity>

      {/* Rating buttons — only shown when flipped */}
      {flipped && (
        <View style={s.ratingRow}>
          <TouchableOpacity style={[s.ratingBtn, { backgroundColor: C.wrongBg, borderColor: C.wrong }]} onPress={() => rate(Q_AGAIN)}>
            <Text style={s.ratingIcon}>😟</Text>
            <Text style={[s.ratingLabel, { color: C.wrong }]}>Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.ratingBtn, { backgroundColor: '#FF960022', borderColor: '#FF9600' }]} onPress={() => rate(Q_HARD)}>
            <Text style={s.ratingIcon}>😕</Text>
            <Text style={[s.ratingLabel, { color: '#FF9600' }]}>Hard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.ratingBtn, { backgroundColor: '#1CB0F622', borderColor: '#1CB0F6' }]} onPress={() => rate(Q_GOOD)}>
            <Text style={s.ratingIcon}>🙂</Text>
            <Text style={[s.ratingLabel, { color: '#1CB0F6' }]}>Good</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.ratingBtn, { backgroundColor: C.correctBg, borderColor: C.correct }]} onPress={() => rate(Q_EASY)}>
            <Text style={s.ratingIcon}>😄</Text>
            <Text style={[s.ratingLabel, { color: C.correct }]}>Easy</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:          { flex: 1, backgroundColor: C.bg },
    header:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
    closeBtn:      { fontSize: 18, color: C.textMuted, padding: 4 },
    progress:      { fontSize: 14, fontWeight: '700', color: C.textMuted },
    statsRow:      { flexDirection: 'row', gap: 6 },
    statChip:      { fontSize: 12, color: C.textMuted },
    cardContainer: { flex: 1, margin: 20, marginBottom: 8 },
    card:          { position: 'absolute', width: '100%', height: '100%', borderRadius: 20, padding: 28, justifyContent: 'center', alignItems: 'center', backfaceVisibility: 'hidden' },
    cardFront:     { backgroundColor: C.surface, borderWidth: 1, borderColor: C.border },
    cardBack:      { backgroundColor: C.brandBg, borderWidth: 1.5, borderColor: C.brand },
    cardTopic:     { position: 'absolute', top: 20, left: 20, fontSize: 12, color: C.textMuted, fontWeight: '600' },
    cardTerm:      { fontSize: 24, fontWeight: '800', color: C.text, textAlign: 'center', lineHeight: 32 },
    tapHint:       { position: 'absolute', bottom: 20, fontSize: 13, color: C.textDim },
    cardDefinition:{ fontSize: 17, color: C.text, textAlign: 'center', lineHeight: 26 },
    cardExample:   { marginTop: 16, fontSize: 13, color: C.textMuted, fontStyle: 'italic', textAlign: 'center' },
    nextReview:    { position: 'absolute', bottom: 20, fontSize: 12, color: C.textDim },
    ratingRow:     { flexDirection: 'row', gap: 8, padding: 16, paddingTop: 12 },
    ratingBtn:     { flex: 1, alignItems: 'center', paddingVertical: 12, paddingHorizontal: 4, borderRadius: 14, borderWidth: 1.5 },
    ratingIcon:    { fontSize: 22 },
    ratingLabel:   { fontSize: 11, fontWeight: '700', marginTop: 4 },
    empty:         { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
    emptyText:     { fontSize: 28 },
    emptySubtext:  { fontSize: 16, color: C.textMuted },
    backBtn:       { backgroundColor: C.brand, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, marginTop: 8 },
    backBtnText:   { color: '#fff', fontWeight: '700' },
  })
}
