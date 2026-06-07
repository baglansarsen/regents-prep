import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useRP } from '../hooks/useRP'
import { useDailyStreak } from '../hooks/useDailyStreak'
import { useDoubleRP } from '../context/DoubleRPContext'
import { usePetContext } from '../context/PetContext'
import { logActivity } from '../utils/activityLogger'

const ROUND_SECONDS = 60
const BASE_POINTS   = 50

function streakMultiplier(streak) {
  if (streak >= 5) return 2.0
  if (streak >= 3) return 1.5
  if (streak >= 2) return 1.25
  return 1.0
}

export default function SpeedRoundScreen({ route, navigation }) {
  const { questionSet, subject } = route.params
  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { rp, earnRP } = useRP(uid)
  const { markStudied } = useDailyStreak(uid)
  const { rpMultiplier } = useDoubleRP()
  const { checkAndEvolve, updateQuestProgress } = usePetContext()

  const [index,     setIndex]     = useState(0)
  const [score,     setScore]     = useState(0)
  const [streak,    setStreak]    = useState(0)
  const [timeLeft,  setTimeLeft]  = useState(ROUND_SECONDS)
  const [selected,  setSelected]  = useState(null)
  const [phase,     setPhase]     = useState('playing') // 'playing' | 'done'
  const [correct,   setCorrect]   = useState(0)
  const timerRef = useRef(null)
  const s = makeStyles(C)

  const q = questionSet[index]

  useEffect(() => {
    if (phase !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); endRound(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase])

  function answer(idx) {
    if (selected !== null) return
    const correctIdx = q.correct ?? q.correctIndex
    const isCorrect  = idx === correctIdx
    setSelected(idx)

    if (isCorrect) {
      const mult  = streakMultiplier(streak + 1)
      const pts   = Math.round(BASE_POINTS * mult)
      setScore((s) => s + pts)
      setStreak((s) => s + 1)
      setCorrect((c) => c + 1)
    } else {
      setStreak(0)
    }

    setTimeout(() => {
      setSelected(null)
      if (index + 1 < questionSet.length) {
        setIndex((i) => i + 1)
      } else {
        endRound()
      }
    }, 400)
  }

  function endRound() {
    clearInterval(timerRef.current)
    setPhase('done')
    const rpEarned = Math.round(correct * 10 * rpMultiplier)
    earnRP(correct * 10, rpMultiplier)
    checkAndEvolve(rp + rpEarned)
    markStudied()
    updateQuestProgress('complete_speedround')

    // Log speed round activity
    const pct = Math.round((correct / index) * 100)
    logActivity(uid, 'speedround_complete', `Scored ${score} pts in Speed Round (${correct}/${index})`, {
      score, correct, total: index, pct, rpEarned,
    })
  }

  if (phase === 'done') {
    return (
      <SafeAreaView style={s.safe} edges={['bottom']}>
        <View style={s.doneScreen}>
          <Text style={s.doneEmoji}>⚡</Text>
          <Text style={s.doneTitle}>Speed Round Complete!</Text>
          <Text style={s.doneScore}>{score} pts</Text>
          <Text style={s.doneStat}>{correct} / {index} correct</Text>
          <TouchableOpacity style={[s.btn, { backgroundColor: C.brand }]} onPress={() => navigation.navigate('Home')}>
            <Text style={s.btnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  if (!q) return null

  const mult = streakMultiplier(streak)
  const timerPct = timeLeft / ROUND_SECONDS
  const timerColor = timeLeft > 20 ? C.brand : timeLeft > 10 ? C.warn : C.wrong

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      {/* Timer bar */}
      <View style={s.timerBg}>
        <Animated.View style={[s.timerFill, { width: `${timerPct * 100}%`, backgroundColor: timerColor }]} />
      </View>

      {/* Header */}
      <View style={s.header}>
        <Text style={[s.timeText, { color: timerColor }]}>{timeLeft}s</Text>
        <Text style={s.scoreText}>⭐ {score}</Text>
        {streak >= 2 && <Text style={s.multText}>🔥 ×{mult.toFixed(2)}</Text>}
      </View>

      {/* Question */}
      <View style={s.questionCard}>
        <Text style={s.questionText}>{q.text}</Text>
      </View>

      {/* Choices */}
      <View style={s.choices}>
        {q.choices.map((choice, idx) => {
          const correctIdx = q.correct ?? q.correctIndex
          let bg = C.surface
          if (selected !== null) {
            if (idx === correctIdx)         bg = C.correctBg
            else if (idx === selected)      bg = C.wrongBg
          }
          return (
            <TouchableOpacity
              key={idx}
              style={[s.choice, { backgroundColor: bg, borderColor: selected !== null && idx === correctIdx ? C.correct : selected === idx ? C.wrong : C.border }]}
              onPress={() => answer(idx)}
              disabled={selected !== null}
            >
              <Text style={s.choiceLetter}>{['A','B','C','D'][idx]}</Text>
              <Text style={s.choiceText}>{choice}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:         { flex: 1, backgroundColor: C.bg },
    timerBg:      { height: 6, backgroundColor: C.surface2 },
    timerFill:    { height: 6 },
    header:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    timeText:     { fontSize: 28, fontWeight: '900', minWidth: 60 },
    scoreText:    { fontSize: 18, fontWeight: '700', color: C.warn },
    multText:     { fontSize: 16, fontWeight: '700', color: C.wrong },
    questionCard: { margin: 16, backgroundColor: C.surface, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: C.border, flex: 1 },
    questionText: { fontSize: 18, fontWeight: '600', color: C.text, lineHeight: 26 },
    choices:      { padding: 16, gap: 10, paddingBottom: 24 },
    choice:       { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: 14, padding: 14, borderWidth: 1.5 },
    choiceLetter: { fontSize: 14, fontWeight: '800', color: C.textMuted, width: 20 },
    choiceText:   { flex: 1, fontSize: 15, color: C.text },
    doneScreen:   { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 24 },
    doneEmoji:    { fontSize: 56 },
    doneTitle:    { fontSize: 24, fontWeight: '800', color: C.text },
    doneScore:    { fontSize: 48, fontWeight: '900', color: C.brand },
    doneStat:     { fontSize: 16, color: C.textMuted },
    btn:          { borderRadius: 14, paddingHorizontal: 32, paddingVertical: 14, marginTop: 8 },
    btnText:      { color: '#fff', fontSize: 16, fontWeight: '700' },
  })
}
