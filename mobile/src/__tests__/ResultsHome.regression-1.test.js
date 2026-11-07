// Regression: Results screen HOME button was not exposed as a button
// Found by /qa re-run of C5 on 2026-11-06
// Report: .gstack/qa-reports/qa-report-localhost-2026-11-06.md
//
// HOME is a bare TouchableOpacity: on web it rendered with tabindex but no
// role, so screen readers announced "🏠 HOME" as plain text next to the
// TRY AGAIN button (which is a PressableDuo and does have the role).
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react-native'

jest.mock('../context/ThemeContext', () => {
  const C = new Proxy({}, { get: () => '#123456' })
  return { useTheme: () => ({ C }) }
})
jest.mock('../context/AuthContext', () => ({ useAuthContext: () => ({ user: { uid: 'u1' } }) }))
jest.mock('../hooks/useDailyStreak', () => ({ useDailyStreak: () => ({ streak: 1, weekDays: [] }) }))
jest.mock('../hooks/useRP', () => ({ useRP: () => ({ rp: 50, level: 1 }) }))
jest.mock('../motion/useReducedMotion', () => ({ useReducedMotion: () => true }))
jest.mock('../motion/RewardFlight', () => ({ useRewardFlight: () => ({ fly: jest.fn() }) }))
jest.mock('../hooks/useStudyTime', () => ({ formatTime: (s) => `${Math.round(s / 60)}m` }))
jest.mock('../utils/analytics', () => ({ logEvent: jest.fn() }))
jest.mock('../components/ShareCardSheet', () => () => null)
jest.mock('../components/MasteryCelebration', () => () => null)
jest.mock('../components/NudgeBanner', () => () => null)
jest.mock('../motion/ReactingReggie', () => () => null)

const ResultsScreen = require('../screens/ResultsScreen').default

const q = (id) => ({ id, question: `Q${id}`, choices: ['a', 'b'], answer: 0 })
const params = (correctCount) => ({
  score: correctCount * 10, total: 4, bestStreak: 1, topic: 'Atomic Structure', subject: 'chemistry',
  rpEarned: correctCount * 10, lessonIndex: 0, sessionTime: 60,
  results: [0, 1, 2, 3].map((i) => ({ question: q(i), correct: i < correctCount, selected: 0 })),
})

test.each([
  ['failed (TRY AGAIN + HOME)', 1],
  ['passed (HOME + next lesson)', 4],
])('%s: HOME is a named button that goes Home', async (_, correctCount) => {
  const navigation = { navigate: jest.fn(), replace: jest.fn() }
  await render(<ResultsScreen route={{ params: params(correctCount) }} navigation={navigation} />)
  await fireEvent.press(screen.getByRole('button', { name: 'Home' }))
  expect(navigation.navigate).toHaveBeenCalledWith('Home')
})
