import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../context/ThemeContext'
import { useAuthContext } from '../context/AuthContext'
import { useCoinsContext } from '../context/CoinsContext'
import { usePetContext } from '../context/PetContext'
import { getDayQuestion } from '../data/triviaPool'
import { T } from '../styles/duo'

function today() { return new Date().toISOString().slice(0, 10) }

export default function PetTriviaCard() {
  const { C }           = useTheme()
  const { user }        = useAuthContext()
  const uid             = user?.uid
  const { earnCoins }   = useCoinsContext()
  const { pet, triggerReaction } = usePetContext()

  const [q,         setQ]         = useState(null)
  const [selected,  setSelected]  = useState(null)
  const [answered,  setAnswered]  = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    if (!uid) return
    ;(async () => {
      const key  = `@triviaDate_v1_${uid}`
      const last = await AsyncStorage.getItem(key).catch(() => null)
      if (last === today()) { setAnswered(true); return }
      setQ(getDayQuestion())
    })()
  }, [uid])

  async function answer(idx) {
    if (selected !== null) return
    setSelected(idx)
    const correct = q.correct ?? q.correctIndex
    const ok      = idx === correct
    setIsCorrect(ok)
    setAnswered(true)
    await AsyncStorage.setItem(`@triviaDate_v1_${uid}`, today()).catch(() => {})
    if (ok) {
      await earnCoins(10)
      triggerReaction('cheer')
    } else {
      triggerReaction('sad')
    }
  }

  if (!pet.chosen) return null

  const s = makeStyles(C)

  if (answered && !q) {
    return (
      <View style={s.card}>
        <Text style={s.title}>❓ {pet.name}'s Question of the Day</Text>
        <Text style={[T.small, { color: C.textMuted, textAlign: 'center' }]}>
          Come back tomorrow for a new question!
        </Text>
      </View>
    )
  }

  if (!q) return null

  const correctIdx = q.correct ?? q.correctIndex

  return (
    <View style={s.card}>
      <Text style={s.title}>❓ {pet.name}'s Question of the Day</Text>
      <Text style={[T.small, { color: C.text, lineHeight: 20, marginBottom: 4 }]}>{q.text}</Text>
      <View style={{ gap: 6 }}>
        {q.choices.map((choice, idx) => {
          let bg     = C.surface2
          let border = C.border
          if (selected !== null) {
            if (idx === correctIdx)    { bg = C.correctBg; border = C.correct }
            else if (idx === selected) { bg = C.wrongBg;   border = C.wrong   }
          }
          return (
            <TouchableOpacity
              key={idx}
              style={[s.choice, { backgroundColor: bg, borderColor: border }]}
              onPress={() => answer(idx)}
              disabled={selected !== null}
              activeOpacity={0.75}
            >
              <Text style={[T.small, { color: C.text }]}>
                {['A','B','C','D'][idx]}. {choice}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
      {selected !== null && (
        <Text style={[T.small, { color: isCorrect ? C.correct : C.wrong, textAlign: 'center', marginTop: 6 }]}>
          {isCorrect ? '🎉 Correct! +10 💰' : `❌ Answer: ${q.choices[correctIdx]}`}
        </Text>
      )}
    </View>
  )
}

function makeStyles(C) {
  return StyleSheet.create({
    card:   {
      marginHorizontal: 16,
      marginTop:        12,
      backgroundColor:  C.surface,
      borderRadius:     16,
      padding:          16,
      borderWidth:      1,
      borderColor:      C.border,
      gap:              8,
    },
    title:  { fontSize: 12, fontFamily: 'Nunito_700Bold', color: C.textMuted, marginBottom: 2 },
    choice: { borderRadius: 10, padding: 10, borderWidth: 1.5 },
  })
}
