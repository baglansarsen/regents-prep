// Regression guard for the Learn Mode pilot removal (eng review R1 + R3, 2026-11-07)
// Plan: docs/designs/learn-mode-pilot-probe.md
//
// The pilot code lived on the line that renders every tutor tip
// (QuizScreen `getTutorHint(q) ?? getPilotHint(q, uid)`) and inside the CHECK
// button's onPress. Nothing rendered QuizScreen in tests (useQuiz.test.js tests
// copied functions), so a slip there would hide all tips or break CHECK silently.
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'

const mockCheck = jest.fn()

jest.mock('../hooks/useQuiz', () => {
  const actual = jest.requireActual('../hooks/useQuiz')
  return {
    useQuiz: (...args) => {
      const q = actual.useQuiz(...args)
      return { ...q, check: (...a) => { mockCheck(); return q.check(...a) } }
    },
  }
})

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native')
  return { SafeAreaView: View, useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) }
})
jest.mock('../context/ThemeContext', () => {
  const C = new Proxy({}, { get: () => '#123456' })
  return { useTheme: () => ({ C }) }
})
jest.mock('../context/AuthContext', () => ({ useAuthContext: () => ({ user: { uid: 'u1' } }) }))
jest.mock('../hooks/useProgress', () => ({ useProgress: () => ({ saveResult: jest.fn(), isMastered: () => false }) }))
jest.mock('../hooks/useDailyStreak', () => ({ useDailyStreak: () => ({ markStudied: jest.fn() }) }))
jest.mock('../hooks/useRP', () => ({ useRP: () => ({ rp: 0, earnRP: jest.fn(() => Promise.resolve(0)), spendRP: jest.fn() }) }))
jest.mock('../context/LivesContext', () => ({
  useLivesContext: () => ({ lives: 5, maxLives: 5, nextRefillAt: null, loseLife: jest.fn(), refillLives: jest.fn(), grantFullRefill: jest.fn(), refillCost: 0 }),
}))
jest.mock('../hooks/useRewardedAd', () => ({ useRewardedAd: () => ({ ready: false, showAd: jest.fn() }) }))
jest.mock('../hooks/useTutor', () => ({ useTutor: () => ({ loading: false, data: null, error: null, explain: jest.fn() }) }))
jest.mock('../context/SubscriptionContext', () => ({ useSubscription: () => ({ isSubscribed: false, isConfigured: false, presentPaywall: jest.fn() }) }))
jest.mock('../hooks/useMistakes', () => ({ appendMistakes: jest.fn(() => Promise.resolve()), resolveCorrect: jest.fn(() => Promise.resolve()) }))
jest.mock('../context/DoubleRPContext', () => ({ useDoubleRP: () => ({ rpMultiplier: 1 }) }))
jest.mock('../context/PetContext', () => ({
  usePetContext: () => ({ checkAndEvolve: jest.fn(), triggerReaction: jest.fn(), updateQuestProgress: jest.fn(() => Promise.resolve()), getPetMessage: () => '', studyBoost: jest.fn(), pet: null }),
}))
jest.mock('../context/SpeechContext', () => ({ useSpeechContext: () => ({ say: jest.fn() }) }))
jest.mock('../hooks/useStudyTime', () => ({ useStudyTime: () => ({ startSession: jest.fn(), endSession: () => ({ seconds: 0 }) }) }))
jest.mock('../utils/haptics', () => ({ hapticTick: jest.fn(), hapticHeavy: jest.fn(), hapticSuccess: jest.fn(), hapticWarning: jest.fn() }))
jest.mock('../motion/useFeedback', () => ({ useFeedback: () => ({ tap: jest.fn(), correct: jest.fn(), wrong: jest.fn(), unlock: jest.fn(), celebrate: jest.fn() }) }))
jest.mock('../motion/useReducedMotion', () => ({ useReducedMotion: () => true }))
jest.mock('../utils/activityLogger', () => ({ logActivity: jest.fn() }))
jest.mock('../utils/subjectData', () => ({ getSubjectData: () => ({}) }))
jest.mock('../components/PetWidget', () => () => null)
jest.mock('../components/StudyBuddyCompanion', () => () => null)
jest.mock('../motion/AnimatedReggie', () => () => null)
jest.mock('../motion/ReactingReggie', () => () => null)
jest.mock('../components/AiGradeButton', () => () => null)
jest.mock('../components/LivesRefillGate', () => () => null)
jest.mock('../components/EnergyBattery', () => () => null)
jest.mock('../components/ReadAloudButton', () => () => null)
jest.mock('../components/ExamImage', () => () => null)

const QuizScreen = require('../screens/QuizScreen').default

const PROOF_TIP = /Tutor Tip: For full credit on proofs/
const question = (extra = {}) => ({
  id: 'geo-test-1',
  text: 'Which reason justifies that a segment is congruent to itself?',
  choices: ['Reflexive Property', 'Transitive Property', 'Substitution', 'SAS'],
  correct: 0,
  ...extra,
})
const renderQuiz = (q) => render(
  <QuizScreen
    route={{ params: { questionSet: [q], topic: 'Proofs', subject: 'geometry', lessonIndex: 0, isChallenge: true } }}
    navigation={{ replace: jest.fn(), navigate: jest.fn(), goBack: jest.fn() }}
  />,
)

beforeEach(() => mockCheck.mockClear())

test('a proof-flagged question shows its tutor tip while answering', async () => {
  await renderQuiz(question({ isGeometricProof: true }))
  expect(screen.getByText(PROOF_TIP)).toBeTruthy()
})

test('a question with no tutor flags shows no tutor tip', async () => {
  await renderQuiz(question())
  expect(screen.queryByText(/Tutor Tip/)).toBeNull()
})

test('CHECK submits the answer once and the tip hides in feedback', async () => {
  await renderQuiz(question({ isGeometricProof: true }))
  await fireEvent.press(screen.getByText('Reflexive Property'))
  await fireEvent.press(screen.getByText('CHECK'))
  expect(mockCheck).toHaveBeenCalledTimes(1)
  expect(screen.queryByText(PROOF_TIP)).toBeNull()
})
