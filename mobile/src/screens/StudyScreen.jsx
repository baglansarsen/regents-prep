import { useState, useRef, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import StudyCard from '../components/StudyCard'
import StudyBuddyCompanion from '../components/StudyBuddyCompanion'
import { shuffled } from '../data/questions'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useXP } from '../hooks/useXP'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { usePetContext } from '../context/PetContext'
import { useStudyTime, formatTime } from '../hooks/useStudyTime'

const XP_PER_CARD = 5

export default function StudyScreen({ route, navigation, questionSet: questionSetProp, onHome }) {
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { earnXP } = useXP(uid)
  const { markStudied } = useDailyStreak(uid)
  const { triggerReaction, studyBoost, pet } = usePetContext()

  const questionSet = route?.params?.questionSet ?? questionSetProp ?? []

  const [deck,  setDeck]  = useState(() => shuffled(questionSet))
  const [index, setIndex] = useState(0)
  const [gotIt, setGotIt] = useState(0)
  const [again, setAgain] = useState(0)

  // Buddy companion message
  const [buddyMessage, setBuddyMessage] = useState(null)

  // Floating +XP pip animation
  const xpPipOpacity = useRef(new Animated.Value(0)).current
  const xpPipY       = useRef(new Animated.Value(0)).current

  // ── Study time tracking ──────────────────────────────────────────────────
  const lastMilestoneBoostRef = useRef(0)

  const handleMilestone = useCallback((milestone) => {
    setBuddyMessage(milestone.message)
    triggerReaction(milestone.reaction)
    // Boost pet happiness every milestone
    studyBoost?.()
  }, [triggerReaction, studyBoost])

  const { startSession, endSession, sessionSeconds } = useStudyTime(uid, earnXP, handleMilestone)

  // Also boost pet happiness every 10 mins (600s) beyond existing milestones
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

  // ──────────────────────────────────────────────────────────────────────────

  const total   = deck.length
  const current = deck[index]
  const done    = index >= total

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
    setDeck(shuffled(questionSet))
    setIndex(0)
    setGotIt(0)
    setAgain(0)
    startSession('study')
  }

  const s = makeStyles(C)

  if (done) {
    // Calculate time-based XP earned this session
    const timeXP = Math.floor(sessionSeconds / 60)  // 1 XP/min drip already awarded; show total
    markStudied()
    triggerReaction('happy')

    return (
      <SafeAreaView style={s.safe}>
        <View style={s.doneScreen}>
          <Text style={s.doneEmoji}>🎉</Text>
          <Text style={s.doneTitle}>Deck Complete!</Text>
          <Text style={s.doneSub}>
            {gotIt} cards mastered · {again} marked for review
          </Text>
          <Text style={[s.xpEarned, { color: C.brand }]}>+{gotIt * XP_PER_CARD} ⭐ XP earned</Text>
          {sessionSeconds >= 60 && (
            <Text style={[s.timeEarned, { color: C.textMuted }]}>
              ⏱ {formatTime(sessionSeconds)} studied · +{timeXP} time XP
            </Text>
          )}
          <TouchableOpacity style={s.restartBtn} onPress={restart} activeOpacity={0.85}>
            <Text style={s.restartBtnText}>Study Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.homeBtn} onPress={goHome} activeOpacity={0.85}>
            <Text style={[s.homeBtnText, { color: C.text }]}>← Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.topbar}>
        <TouchableOpacity onPress={goHome} activeOpacity={0.7}>
          <Text style={s.backText}>← Home</Text>
        </TouchableOpacity>

        {/* Session timer */}
        {sessionSeconds >= 10 && (
          <Text style={[s.timerText, { color: C.brand }]}>⏱ {formatTime(sessionSeconds)}</Text>
        )}

        <Text style={s.counter}>{index + 1} / {total}</Text>
      </View>

      <View style={s.progressTrack}>
        <View style={[s.progressFill, { width: `${Math.round((index / total) * 100)}%` }]} />
      </View>

      <View style={s.cardArea}>
        <StudyCard
          key={`${current?.id}-${index}`}
          question={current}
          onGotIt={handleGotIt}
          onStudyMore={handleStudyMore}
        />
      </View>

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
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 8,
    },
    backText:  { fontSize: 14, color: C.textMuted },
    timerText: { fontSize: 13, fontWeight: '700', letterSpacing: 0.3 },
    counter:   { fontSize: 14, color: C.textMuted },
    progressTrack: {
      height: 4,
      backgroundColor: C.surface2,
      marginHorizontal: 20,
      borderRadius: 99,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: C.brand,
      borderRadius: 99,
    },
    cardArea: { flex: 1, padding: 20, justifyContent: 'center' },
    stats: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 24,
      paddingBottom: 24,
    },
    statGot:   { fontSize: 13, color: C.correct, fontWeight: '600' },
    statAgain: { fontSize: 13, color: C.textMuted, fontWeight: '600' },
    xpPip:     { position: 'absolute', top: -18, left: 0, fontSize: 13, fontWeight: '800', color: C.brand },
    xpEarned:  { fontSize: 15, fontWeight: '700', marginTop: 4 },
    timeEarned:{ fontSize: 13, fontWeight: '500', marginTop: 2 },

    doneScreen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      gap: 14,
    },
    doneEmoji: { fontSize: 56, marginBottom: 4 },
    doneTitle: { fontSize: 28, fontWeight: '800', color: C.text },
    doneSub:   { fontSize: 15, color: C.textMuted, textAlign: 'center' },
    restartBtn: {
      width: '100%',
      backgroundColor: C.brand,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    restartBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
    homeBtn: {
      width: '100%',
      backgroundColor: C.surface2,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    homeBtnText: { fontSize: 16, fontWeight: '700' },
  })
}
