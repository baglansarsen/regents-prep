import { useState, useRef, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import StudyCard from '../components/StudyCard'
import StudyBuddyCompanion from '../components/StudyBuddyCompanion'
import { shuffled } from '../data/questions'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useRP } from '../hooks/useRP'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { usePetContext } from '../context/PetContext'
import { useStudyTime, formatTime } from '../hooks/useStudyTime'

const RP_PER_CARD = 5

export default function StudyScreen({ route, navigation, questionSet: questionSetProp, onHome }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { earnXP } = useRP(uid)
  const { markStudied } = useDailyStreak(uid)
  const { triggerReaction, studyBoost, pet } = usePetContext()

  const questionSet = route?.params?.questionSet ?? questionSetProp ?? []

  const [deck,  setDeck]  = useState(() => shuffled(questionSet))
  const [index, setIndex] = useState(0)
  const [gotIt, setGotIt] = useState(0)
  const [again, setAgain] = useState(0)
  const [buddyMessage, setBuddyMessage] = useState(null)

  const xpPipOpacity = useRef(new Animated.Value(0)).current
  const xpPipY       = useRef(new Animated.Value(0)).current
  const lastMilestoneBoostRef = useRef(0)
  const doneHandledRef = useRef(false)  // prevent double-firing on done screen

  const handleMilestone = useCallback((milestone) => {
    setBuddyMessage(milestone.message)
    triggerReaction(milestone.reaction)
    studyBoost?.()
  }, [triggerReaction, studyBoost])

  const { startSession, endSession, sessionSeconds } = useStudyTime(uid, earnXP, handleMilestone)

  // Boost pet happiness every 10 min of study (beyond the milestone system)
  useEffect(() => {
    const mins10 = Math.floor(sessionSeconds / 600)
    if (mins10 > lastMilestoneBoostRef.current) {
      lastMilestoneBoostRef.current = mins10
      studyBoost?.()
    }
  }, [sessionSeconds, studyBoost])

  // Start/end session with screen lifecycle
  useEffect(() => {
    startSession('study')
    return () => { endSession() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const total   = deck.length
  const current = deck[index]
  const done    = index >= total

  // Fire done-screen side effects exactly once, in an effect (not during render)
  useEffect(() => {
    if (done && !doneHandledRef.current) {
      doneHandledRef.current = true
      markStudied()
      triggerReaction('happy')
    }
  }, [done])

  function goHome() {
    if (navigation?.goBack) { navigation.goBack(); return }
    if (onHome) onHome()
  }

  function floatXP() {
    xpPipOpacity.setValue(1)
    xpPipY.setValue(0)
    Animated.parallel([
      Animated.timing(xpPipOpacity, { toValue: 0, duration: 900, useNativeDriver: true }),
      Animated.timing(xpPipY,       { toValue: -36, duration: 900, useNativeDriver: true }),
    ]).start()
  }

  function handleGotIt() {
    earnXP(XP_PER_CARD)
    floatXP()
    setGotIt((n) => n + 1)
    setIndex((i) => i + 1)
  }

  function handleStudyMore() {
    setAgain((n) => n + 1)
    setDeck((d) => {
      const copy = [...d]
      const card = copy.splice(index, 1)[0]
      copy.push(card)
      return copy
    })
  }

  function restart() {
    doneHandledRef.current = false
    setDeck(shuffled(questionSet))
    setIndex(0)
    setGotIt(0)
    setAgain(0)
    startSession('study')
  }

  const s = makeStyles(C)

  if (done) {
    const timeXP = Math.floor(sessionSeconds / 60)
    return (
      <SafeAreaView style={s.safe} edges={['bottom']}>
        <View style={s.doneScreen}>
          <Text style={s.doneEmoji}>🎉</Text>
          <Text style={s.doneTitle}>Deck Complete!</Text>
          <Text style={s.doneSub}>
            {gotIt} cards mastered · {again} marked for review
          </Text>

          {/* RP summary row */}
          <View style={[s.xpRow, { backgroundColor: C.warnBg, borderColor: C.warn + '50' }]}>
            <Text style={[s.xpRowText, { color: C.warn }]}>+{gotIt * RP_PER_CARD} ⭐ card RP</Text>
            {sessionSeconds >= 60 && (
              <Text style={[s.xpRowText, { color: C.brand }]}>  ·  +{timeXP} ⏱ time RP</Text>
            )}
          </View>

          {sessionSeconds >= 60 && (
            <Text style={[s.timeSub, { color: C.textMuted }]}>
              Session: {formatTime(sessionSeconds)}
            </Text>
          )}

          <TouchableOpacity style={[s.restartBtn, { backgroundColor: C.brand }]} onPress={restart} activeOpacity={0.85}>
            <Text style={s.restartBtnText}>Study Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.homeBtn, { backgroundColor: C.surface2 }]} onPress={goHome} activeOpacity={0.85}>
            <Text style={[s.homeBtnText, { color: C.text }]}>← Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      {/* Top bar — always 3 slots so layout never jumps */}
      <View style={s.topbar}>
        <TouchableOpacity onPress={goHome} activeOpacity={0.7} style={s.topbarSlot}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={s.topbarCenter}>
          {sessionSeconds >= 5 ? (
            <View style={[s.timerPill, { backgroundColor: C.brand + '18', borderColor: C.brand + '40' }]}>
              <Text style={[s.timerText, { color: C.brand }]}>⏱ {formatTime(sessionSeconds)}</Text>
            </View>
          ) : null}
        </View>

        <View style={s.topbarSlot}>
          <Text style={[s.counter, { textAlign: 'right' }]}>{index + 1} / {total}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={s.progressTrack}>
        <View style={[s.progressFill, { width: `${Math.round((index / total) * 100)}%` }]} />
      </View>

      {/* Card */}
      <ScrollView
        style={s.cardScroll}
        contentContainerStyle={s.cardArea}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StudyCard
          key={`${current?.id}-${index}`}
          question={current}
          onGotIt={handleGotIt}
          onStudyMore={handleStudyMore}
        />
      </ScrollView>

      {/* Stats footer */}
      <View style={s.stats}>
        <View>
          <Text style={s.statGot}>✓ {gotIt} mastered</Text>
          <Animated.Text style={[s.xpPip, { opacity: xpPipOpacity, transform: [{ translateY: xpPipY }] }]}>
            +{XP_PER_CARD} ⭐
          </Animated.Text>
        </View>
        <Text style={s.statAgain}>↺ {again} to review</Text>
      </View>

      {/* Study Buddy floating companion */}
      {pet?.chosen && (
        <StudyBuddyCompanion
          petType={pet.petType}
          petName={pet.name}
          accessories={pet.accessories ?? []}
          message={buddyMessage}
          onPress={() => setBuddyMessage(null)}
        />
      )}
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: C.bg },

    topbar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 8,
    },
    topbarSlot: { flex: 1 },
    topbarCenter: { flex: 2, alignItems: 'center' },
    backText:  { fontSize: 14, color: C.textMuted },
    counter:   { fontSize: 14, color: C.textMuted },
    timerPill: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 99,
      borderWidth: 1,
    },
    timerText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.2 },

    progressTrack: {
      height: 4,
      backgroundColor: C.surface2,
      marginHorizontal: 16,
      borderRadius: 99,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: C.brand,
      borderRadius: 99,
    },

    cardScroll: { flex: 1 },
    cardArea: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },

    stats: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 28,
      paddingVertical: 16,
      paddingBottom: 20,
    },
    statGot:   { fontSize: 13, color: C.correct, fontWeight: '700' },
    statAgain: { fontSize: 13, color: C.textMuted, fontWeight: '600' },
    xpPip:     { position: 'absolute', top: -18, left: 0, fontSize: 13, fontWeight: '800', color: C.brand },

    // Done screen
    doneScreen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 28,
      gap: 12,
    },
    doneEmoji:  { fontSize: 64, marginBottom: 4 },
    doneTitle:  { fontSize: 28, fontWeight: '800', color: C.text },
    doneSub:    { fontSize: 15, color: C.textMuted, textAlign: 'center' },
    xpRow: {
      flexDirection: 'row',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderWidth: 1,
      marginTop: 4,
    },
    xpRowText:  { fontSize: 15, fontWeight: '700' },
    timeSub:    { fontSize: 13, marginTop: -4 },
    restartBtn: {
      width: '100%',
      borderRadius: 14,
      padding: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    restartBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
    homeBtn: {
      width: '100%',
      borderRadius: 14,
      padding: 16,
      alignItems: 'center',
    },
    homeBtnText: { fontSize: 16, fontWeight: '600' },
  })
}
