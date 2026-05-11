import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import StudyCard from '../components/StudyCard'
import { shuffled } from '../data/questions'
import { C } from '../theme'

export default function StudyScreen({ questionSet, onHome }) {
  const [deck, setDeck]     = useState(() => shuffled(questionSet))
  const [index, setIndex]   = useState(0)
  const [gotIt, setGotIt]   = useState(0)
  const [again, setAgain]   = useState(0)

  const total   = deck.length
  const current = deck[index]
  const done    = index >= total

  function handleGotIt() {
    setGotIt((n) => n + 1)
    advance()
  }

  function handleStudyMore() {
    setAgain((n) => n + 1)
    // move card to the end of the deck so it comes back around
    setDeck((d) => {
      const copy = [...d]
      const card = copy.splice(index, 1)[0]
      copy.push(card)
      return copy
    })
    // index stays the same — next card slides in
  }

  function advance() {
    setIndex((i) => i + 1)
  }

  function restart() {
    setDeck(shuffled(questionSet))
    setIndex(0)
    setGotIt(0)
    setAgain(0)
  }

  if (done) {
    return (
      <View style={s.doneScreen}>
        <Text style={s.doneEmoji}>🎉</Text>
        <Text style={s.doneTitle}>Deck Complete!</Text>
        <Text style={s.doneSub}>
          {gotIt} cards mastered · {again} marked for review
        </Text>
        <TouchableOpacity style={s.restartBtn} onPress={restart} activeOpacity={0.85}>
          <Text style={s.restartBtnText}>Study Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.homeBtn} onPress={onHome} activeOpacity={0.85}>
          <Text style={s.homeBtnText}>Choose Topic</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={s.screen}>
      <View style={s.topbar}>
        <TouchableOpacity onPress={onHome} activeOpacity={0.7}>
          <Text style={s.backText}>← Home</Text>
        </TouchableOpacity>
        <Text style={s.counter}>{index + 1} / {total}</Text>
      </View>

      <View style={s.progressTrack}>
        <View style={[s.progressFill, { width: `${Math.round((index / total) * 100)}%` }]} />
      </View>

      <View style={s.cardArea}>
        <StudyCard
          key={`${current.id}-${index}`}
          question={current}
          onGotIt={handleGotIt}
          onStudyMore={handleStudyMore}
        />
      </View>

      <View style={s.stats}>
        <Text style={s.statGot}>✓ {gotIt} mastered</Text>
        <Text style={s.statAgain}>↺ {again} to review</Text>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  topbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backText: { fontSize: 14, color: C.textMuted },
  counter:  { fontSize: 14, color: C.textMuted },
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

  // Done screen
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
  homeBtnText: { color: C.text, fontSize: 16, fontWeight: '700' },
})
