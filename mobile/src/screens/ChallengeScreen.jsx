import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useSubject } from '../context/SubjectContext'
import { useChallenges } from '../hooks/useChallenges'
import { getBattleQuestions, BATTLE_SIZE } from '../utils/battleQuestions'
import { SUBJECT_META } from '../content/subjects'
import ExamImage from '../components/ExamImage'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

// Battle modes:
//  - challenger: route has { friendUid, friendName } and NO challengeId.
//      Play first, then create a pending challenge with our questions + score.
//  - responder:  route has { challengeId } (and friendName = challenger's name).
//      Play the challenge's stored questions, then submit our score.
export default function ChallengeScreen({ route, navigation }) {
  const { friendUid, friendName, challengeId } = route.params ?? {}
  const isResponder = !!challengeId

  const { C } = useTheme()
  const { user } = useAuthContext()
  const uid = user?.uid
  const { subject } = useSubject()
  const { createChallenge, submitResult, getChallenge } = useChallenges(uid, user)

  const [phase,     setPhase]     = useState('loading')   // 'loading' | 'intro' | 'playing' | 'submitting'
  const [questions, setQuestions] = useState([])
  const [challenge, setChallenge] = useState(null)        // responder's source doc
  const [battleSubject, setBattleSubject] = useState(subject)

  const [index,    setIndex]    = useState(0)
  const [selected, setSelected] = useState(null)
  const [score,    setScore]    = useState(0)             // number correct

  const s = makeStyles(C)

  // ── Set up the question set ────────────────────────────────────────────────
  useEffect(() => {
    let alive = true
    ;(async () => {
      if (isResponder) {
        const ch = await getChallenge(challengeId)
        if (!alive) return
        if (!ch || !Array.isArray(ch.questions) || ch.questions.length === 0) {
          setPhase('error')
          return
        }
        setChallenge(ch)
        setQuestions(ch.questions)
        setBattleSubject(ch.subject ?? subject)
        setPhase('intro')
      } else {
        const qs = getBattleQuestions(subject, BATTLE_SIZE)
        if (!alive) return
        setQuestions(qs)
        setBattleSubject(subject)
        setPhase(qs.length > 0 ? 'intro' : 'error')
      }
    })()
    return () => { alive = false }
  }, [challengeId, isResponder, subject, getChallenge])

  const finish = useCallback(async (finalScore) => {
    setPhase('submitting')
    if (isResponder) {
      const result = await submitResult(challenge, finalScore)
      navigation.replace('ChallengeResult', {
        friendName: challenge?.fromName ?? friendName ?? 'Friend',
        score: finalScore,
        friendScore: challenge?.fromScore ?? 0,
      })
    } else {
      await createChallenge({
        toUid: friendUid,
        toName: friendName,
        subject: battleSubject,
        questions,
        fromScore: finalScore,
      })
      navigation.replace('ChallengeResult', {
        friendName: friendName ?? 'Friend',
        score: finalScore,
        friendScore: null,   // pending until the friend plays
      })
    }
  }, [isResponder, challenge, friendUid, friendName, battleSubject, questions, createChallenge, submitResult, navigation])

  function onAnswer(choiceIdx) {
    if (selected !== null) return
    const q = questions[index]
    const correct = choiceIdx === q.correct
    setSelected(choiceIdx)
    const newScore = correct ? score + 1 : score
    if (correct) setScore(newScore)
    setTimeout(() => {
      if (index + 1 >= questions.length) {
        finish(newScore)
      } else {
        setIndex(index + 1)
        setSelected(null)
      }
    }, 650)
  }

  const meta = SUBJECT_META[battleSubject] ?? {}

  // ── Render ─────────────────────────────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <SafeAreaView style={s.safe} edges={['bottom']}>
        <View style={s.center}><ActivityIndicator color={C.brand} /></View>
      </SafeAreaView>
    )
  }

  if (phase === 'error') {
    return (
      <SafeAreaView style={s.safe} edges={['bottom']}>
        <View style={s.center}>
          <Text style={s.emoji}>😕</Text>
          <Text style={s.title}>Battle unavailable</Text>
          <Text style={s.desc}>This challenge couldn't be loaded or has no questions.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={s.cancelText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  if (phase === 'intro') {
    return (
      <SafeAreaView style={s.safe} edges={['bottom']}>
        <View style={s.center}>
          <Text style={s.emoji}>⚔️</Text>
          <Text style={s.title}>Battle</Text>
          <Text style={s.subtitle}>
            {isResponder ? `${challenge?.fromName ?? friendName ?? 'Friend'} challenged you!` : `vs ${friendName ?? 'Friend'}`}
          </Text>
          <Text style={s.subjectChip}>{meta.icon ?? '📚'} {meta.name ?? 'Mixed'}</Text>
          <Text style={s.desc}>
            {BATTLE_SIZE} multiple-choice questions.{'\n'}
            {isResponder
              ? `Beat ${challenge?.fromName ?? 'their'} score of ${challenge?.fromScore ?? 0}/${questions.length}!`
              : 'Your friend will play the same questions — highest score wins!'}
          </Text>
          <TouchableOpacity style={s.startBtn} onPress={() => setPhase('playing')} activeOpacity={0.85}>
            <Text style={s.startBtnText}>{isResponder ? 'Accept & Play 🚀' : 'Start Battle 🚀'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={s.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  if (phase === 'submitting') {
    return (
      <SafeAreaView style={s.safe} edges={['bottom']}>
        <View style={s.center}><ActivityIndicator color={C.brand} /></View>
      </SafeAreaView>
    )
  }

  // phase === 'playing'
  const q = questions[index]
  const correctIdx = q.correct

  return (
    <SafeAreaView style={s.safe} edges={['bottom']}>
      <View style={s.playHeader}>
        <Text style={s.progress}>Question {index + 1} / {questions.length}</Text>
        <Text style={s.scorePill}>⚔️ {score}</Text>
      </View>
      <View style={s.progressTrack}>
        <View style={[s.progressFill, { width: `${((index) / questions.length) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={s.playBody} showsVerticalScrollIndicator={false}>
        {q.context ? <Text style={s.context}>{q.context}</Text> : null}
        {q.image ? <ExamImage path={q.image} style={s.qImage} /> : null}
        <Text style={s.qText}>{q.text}</Text>

        <View style={{ gap: 10, marginTop: 8 }}>
          {q.choices.map((choice, idx) => {
            let bg = C.surface, border = C.border
            if (selected !== null) {
              if (idx === correctIdx)      { bg = C.correctBg; border = C.correct }
              else if (idx === selected)   { bg = C.wrongBg;   border = C.wrong   }
            }
            return (
              <TouchableOpacity
                key={idx}
                style={[s.choice, { backgroundColor: bg, borderColor: border }]}
                onPress={() => onAnswer(idx)}
                disabled={selected !== null}
                activeOpacity={0.8}
              >
                <Text style={s.choiceText}>{LETTERS[idx]}. {choice}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    safe:        { flex: 1, backgroundColor: C.bg },
    center:      { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, gap: 16 },
    emoji:       { fontSize: 64 },
    title:       { fontSize: 28, fontWeight: '900', color: C.text },
    subtitle:    { fontSize: 18, color: C.textMuted, textAlign: 'center' },
    subjectChip: {
      fontSize: 14, fontWeight: '700', color: C.brand,
      backgroundColor: C.brand + '18', borderRadius: 999,
      paddingHorizontal: 14, paddingVertical: 6, overflow: 'hidden',
    },
    desc:        { fontSize: 15, color: C.textMuted, textAlign: 'center', lineHeight: 22 },
    startBtn:    { backgroundColor: C.brand, borderRadius: 16, paddingHorizontal: 32, paddingVertical: 16, marginTop: 8 },
    startBtnText:{ color: '#fff', fontWeight: '800', fontSize: 18 },
    cancelText:  { color: C.textMuted, fontSize: 14, marginTop: 8 },

    playHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 8 },
    progress:    { fontSize: 14, fontWeight: '700', color: C.textMuted },
    scorePill:   { fontSize: 15, fontWeight: '900', color: C.brand },
    progressTrack:{ height: 6, backgroundColor: C.surface2, marginHorizontal: 20, borderRadius: 3, overflow: 'hidden' },
    progressFill: { height: 6, backgroundColor: C.brand, borderRadius: 3 },

    playBody:    { padding: 20, paddingBottom: 40 },
    context:     { fontSize: 13, color: C.textMuted, lineHeight: 20, marginBottom: 12 },
    qImage:      { width: '100%', height: 200, borderRadius: 10, marginBottom: 12, backgroundColor: C.surface2 },
    qText:       { fontSize: 18, fontWeight: '700', color: C.text, lineHeight: 26 },
    choice:      { borderRadius: 14, padding: 16, borderWidth: 1.5 },
    choiceText:  { fontSize: 15, color: C.text, lineHeight: 21 },
  })
}
